from sqlalchemy import create_engine, text, or_
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import SQLAlchemyError
import logging

# Configure logging
logging.basicConfig(
    filename='backend.log',
    level=logging.DEBUG,
    format='%(asctime)s %(levelname)s:%(message)s'
)

def get_db_session(database_path):
    engine = create_engine(f'sqlite:///{database_path}')
    SessionLocal = sessionmaker(bind=engine)
    return SessionLocal()

def search_table(
    database_path,
    table_name,
    model_class,  # Pass the SQLAlchemy model class (DOT)
    search_term=None,
    search_column='Title',
    search_mode='contains',
    limit=20,
    offset=0,
    sort_field='Title',
    sort_order='asc',
    advanced_filters=None
):
    """
    Search using SQLAlchemy ORM
    """
    try:
        session = get_db_session(database_path)
        query = session.query(model_class)

        # Basic search
        if search_term:
            column = getattr(model_class, search_column)
            if search_mode == 'starts_with':
                query = query.filter(column.like(f"{search_term}%"))
            elif search_mode == 'ends_with':
                query = query.filter(column.like(f"%{search_term}"))
            else:  # contains
                query = query.filter(column.like(f"%{search_term}%"))

        # Advanced filters
        if advanced_filters:
            for field, value in advanced_filters.items():
                column = getattr(model_class, field, None)
                if column is None:
                    continue

                if isinstance(value, list):
                    if len(value) == 2 and all(isinstance(v, (int, float)) for v in value):
                        query = query.filter(column.between(value[0], value[1]))
                    else:
                        query = query.filter(column.in_(value))
                else:
                    query = query.filter(column == value)

        # Sorting
        sort_column = getattr(model_class, sort_field)
        if sort_order.lower() == 'desc':
            query = query.order_by(sort_column.desc())
        else:
            query = query.order_by(sort_column.asc())

        # Pagination
        query = query.limit(limit).offset(offset)

        # Execute query
        results = query.all()
        
        # Convert to dict
        return [row.__dict__ for row in results]

    except SQLAlchemyError as e:
        logging.error(f"Database error in search_table: {str(e)}")
        raise
    finally:
        session.close()

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
