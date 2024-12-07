from sqlalchemy import create_engine, text, or_
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import SQLAlchemyError
import logging
from typing import Dict, Any, Union, List
from contextlib import contextmanager

# Configure logging
logging.basicConfig(
    filename='backend.log',
    level=logging.DEBUG,
    format='%(asctime)s %(levelname)s:%(message)s'
)

@contextmanager
def get_db_session(database_path: str):
    """
    Context manager for database sessions to ensure proper cleanup
    """
    engine = create_engine(f'sqlite:///{database_path}')
    SessionLocal = sessionmaker(bind=engine)
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()

def apply_filter(query, column, value: Union[Dict, Any]):
    """
    Apply appropriate filter based on value type and operator
    """
    # Add debug logging
    logging.debug(f"Applying filter for column {column.key} with value {value}")

    if isinstance(value, dict) and 'operator' in value:
        op = value['operator']
        val = value['value']
        
        # Special handling for Strength
        if column.key == 'Strength':
            strength_map = {
                1: 'S',  # Sedentary
                2: 'L',  # Light
                3: 'M',  # Medium
                4: 'H',  # Heavy
                5: 'V'   # Very Heavy
            }
            if isinstance(val, (int, float)):
                val = strength_map.get(int(val))
            logging.debug(f"Mapped strength value: {val}")
        
        # Special handling for SVPNum
        elif column.key == 'SVPNum':
            val = int(val)
            logging.debug(f"Converted SVP value to int: {val}")
        
        operators = {
            'eq': lambda col, v: col == v,
            'lt': lambda col, v: col < v,
            'gt': lambda col, v: col > v,
            'lte': lambda col, v: col <= v,
            'gte': lambda col, v: col >= v
        }
        
        if op in operators:
            filter_expr = operators[op](column, val)
            logging.debug(f"Applied operator {op} with expression: {filter_expr}")
            return query.filter(filter_expr)
    
    elif isinstance(value, (int, float)):
        if column.key == 'Strength':
            strength_map = {
                1: 'S', 2: 'L', 3: 'M', 4: 'H', 5: 'V'
            }
            mapped_value = strength_map.get(int(value))
            logging.debug(f"Direct strength mapping: {value} -> {mapped_value}")
            return query.filter(column == mapped_value)
        elif column.key == 'SVPNum':
            logging.debug(f"Direct SVP filter: {value}")
            return query.filter(column == int(value))
        else:
            return query.filter(column == value)
    
    elif isinstance(value, str):
        if column.key == 'Strength':
            logging.debug(f"Direct strength string filter: {value}")
            return query.filter(column == value.upper())
        return query.filter(column.ilike(f"%{value}%"))
    
    logging.debug(f"No specific filter applied, using direct comparison")
    return query.filter(column == value)

def search_table(
    database_path: str,
    table_name: str,
    model_class: Any,
    search_term: str = None,
    search_column: str = 'Title',
    search_mode: str = 'contains',
    limit: int = 20,
    offset: int = 0,
    sort_field: str = 'Title',
    sort_order: str = 'asc',
    advanced_filters: Dict[str, Any] = None
) -> List[Dict[str, Any]]:
    """
    Perform a search on the database table with various filters and sorting options
    """
    try:
        with get_db_session(database_path) as session:
            query = session.query(model_class)

            # Apply basic search if provided
            if search_term:
                column = getattr(model_class, search_column)
                search_patterns = {
                    'starts_with': f"{search_term}%",
                    'ends_with': f"%{search_term}",
                    'contains': f"%{search_term}%"
                }
                pattern = search_patterns.get(search_mode, search_patterns['contains'])
                query = query.filter(column.like(pattern))

            # Apply advanced filters
            if advanced_filters:
                for field, value in advanced_filters.items():
                    if (column := getattr(model_class, field, None)) is not None:
                        query = apply_filter(query, column, value)

            # Apply sorting
            sort_column = getattr(model_class, sort_field)
            query = query.order_by(
                sort_column.desc() if sort_order.lower() == 'desc' 
                else sort_column.asc()
            )

            # Apply pagination
            results = query.limit(limit).offset(offset).all()
            
            # Convert to dict and remove SQLAlchemy internal state
            return [
                {k: v for k, v in row.__dict__.items() if not k.startswith('_')}
                for row in results
            ]

    except SQLAlchemyError as e:
        logging.error(f"Database error in search_table: {str(e)}")
        raise

def get_record_by_code(database_path, model_class, code: str):
    """
    Get record using SQLAlchemy ORM
    """
    try:
        session = get_db_session(database_path)
        record = session.query(model_class).filter(model_class.Code == code).first()
        return record.__dict__ if record else None
    except SQLAlchemyError as e:
        logging.error(f"Error in get_record_by_code: {str(e)}")
        raise
    finally:
        session.close()

def get_first_n_records(database_path, model_class, no_of_records=250, sort_field='Title', sort_order='asc'):
    """
    Get records using SQLAlchemy ORM
    """
    try:
        session = get_db_session(database_path)
        query = session.query(model_class)

        sort_column = getattr(model_class, sort_field)
        if sort_order.lower() == 'desc':
            query = query.order_by(sort_column.desc())
        else:
            query = query.order_by(sort_column.asc())

        results = query.limit(no_of_records).all()
        return [row.__dict__ for row in results]
    except SQLAlchemyError as e:
        logging.error(f"Error in get_first_n_records: {str(e)}")
        raise
    finally:
        session.close()
