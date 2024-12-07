# Standard library imports
import logging
from typing import List, Optional, Union
from contextlib import contextmanager

# Third-party imports
from fastapi import FastAPI, HTTPException, Query, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import Column, Float, Integer, String, create_engine, inspect, or_
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session, sessionmaker
import uvicorn

# Local imports
from database import search_table

# Configure logging
logging.basicConfig(
    filename='backend.log',
    level=logging.DEBUG,
    format='%(asctime)s %(levelname)s:%(message)s'
)

# Application Constants
DATABASE_PATH = "dotdb061814 (1).db"
ALLOWED_SEARCH_FIELDS = {
    'Title': 'Job title',
    'Definitions': 'Job definition',
    'Code': 'DOT code',
    # ... other fields with descriptions
}

ALLOWED_SORT_FIELDS = {
    'Title': 'Sort by job title',
    'SVPNum': 'Sort by SVP level',
    'Strength': 'Sort by strength requirement',
    'Code': 'Sort by DOT code'
}

# Update the constants to include mapping information
STRENGTH_MAP = {
    1: 'S',  # Sedentary
    2: 'L',  # Light
    3: 'M',  # Medium
    4: 'H',  # Heavy
    5: 'V'   # Very Heavy
}

# FastAPI setup with metadata
app = FastAPI(
    title="DOT Database API",
    description="API for searching Dictionary of Occupational Titles data",
    version="2.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database setup
engine = create_engine(f'sqlite:///{DATABASE_PATH}')
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@contextmanager
def get_db():
    """Database session context manager"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

Base = declarative_base()

class DOT(Base):
    __tablename__ = 'DOT'
    
    Ncode = Column(Integer, primary_key=True)
    DocumentNumber = Column(String)
    Code = Column(Float)
    DLU = Column(Integer)
    WFData = Column(Integer)
    WFDataSig = Column(String)
    WFPeople = Column(Integer)
    WFPeopleSig = Column(String)
    WFThings = Column(Integer)
    WFThingsSig = Column(String)
    GEDR = Column(Integer)
    GEDM = Column(Integer)
    GEDL = Column(Integer)
    SVPNum = Column(Integer)
    AptGenLearn = Column(Integer)
    AptVerbal = Column(Integer)
    AptNumerical = Column(Integer)
    AptSpacial = Column(Integer)
    AptFormPer = Column(Integer)
    AptClericalPer = Column(Integer)
    AptMotor = Column(Integer)
    AptFingerDext = Column(Integer)
    AptManualDext = Column(Integer)
    AptEyeHandCoord = Column(Integer)
    AptColorDisc = Column(Integer)
    WField1 = Column(String)
    WField2 = Column(String)
    WField3 = Column(String)
    MPSMS1 = Column(String)
    MPSMS2 = Column(String)
    MPSMS3 = Column(String)
    Temp1 = Column(String)
    Temp2 = Column(String)
    Temp3 = Column(String)
    Temp4 = Column(String)
    Temp5 = Column(String)
    GOE = Column(Float)
    GOENum = Column(Integer)
    Strength = Column(String)
    StrengthNum = Column(Integer)
    ClimbingNum = Column(Integer)
    BalancingNum = Column(Integer)
    StoopingNum = Column(Integer)
    KneelingNum = Column(Integer)
    CrouchingNum = Column(Integer)
    CrawlingNum = Column(Integer)
    ReachingNum = Column(Integer)
    HandlingNum = Column(Integer)
    FingeringNum = Column(Integer)
    FeelingNum = Column(Integer)
    TalkingNum = Column(Integer)
    HearingNum = Column(Integer)
    TastingNum = Column(Integer)
    NearAcuityNum = Column(Integer)
    FarAcuityNum = Column(Integer)
    DepthNum = Column(Integer)
    AccommodationNum = Column(Integer)
    ColorVisionNum = Column(Integer)
    FieldVisionNum = Column(Integer)
    WeatherNum = Column(Integer)
    ColdNum = Column(Integer)
    HeatNum = Column(Integer)
    WetNum = Column(Integer)
    NoiseNum = Column(Integer)
    VibrationNum = Column(Integer)
    AtmosphereNum = Column(Integer)
    MovingNum = Column(Integer)
    ElectricityNum = Column(Integer)
    HeightNum = Column(Integer)
    RadiationNum = Column(Integer)
    ExplosionNum = Column(Integer)
    ToxicNum = Column(Integer)
    OtherNum = Column(Integer)
    Title = Column(String)
    AltTitles = Column(String)
    CompleteTitle = Column(String)
    Industry = Column(String)
    Definitions = Column(String)
    GOE1 = Column(String)
    GOE2 = Column(String)
    GOE3 = Column(String)
    WField1Short = Column(String)
    WField2Short = Column(String)
    WField3Short = Column(String)
    MPSMS1Short = Column(String)
    MPSMS2Short = Column(String)
    MPSMS3Short = Column(String)
    OccGroup = Column(String)



class ComparisonValue(BaseModel):
    operator: str  # 'eq', 'lt', 'gt', 'lte', 'gte'
    value: Union[int, float, str]



class AdvancedSearchParams(BaseModel):
    Ncode: Optional[int] = None
    DocumentNumber: Optional[str] = None
    Code: Optional[Union[float, ComparisonValue]] = None
    DLU: Optional[Union[int, ComparisonValue]] = None
    WFData: Optional[Union[int, ComparisonValue]] = None
    WFDataSig: Optional[str] = None
    WFPeople: Optional[int] = None
    WFPeopleSig: Optional[str] = None
    WFThings: Optional[int] = None
    WFThingsSig: Optional[str] = None
    GEDR: Optional[Union[int, ComparisonValue]] = None
    GEDM: Optional[Union[int, ComparisonValue]] = None
    GEDL: Optional[Union[int, ComparisonValue]] = None
    SVPNum: Optional[Union[int, ComparisonValue]] = None
    AptGenLearn: Optional[int] = None
    AptVerbal: Optional[int] = None
    AptNumerical: Optional[int] = None
    AptSpacial: Optional[int] = None
    AptFormPer: Optional[int] = None
    AptClericalPer: Optional[int] = None
    AptMotor: Optional[int] = None
    AptFingerDext: Optional[int] = None
    AptManualDext: Optional[int] = None
    AptEyeHandCoord: Optional[int] = None
    AptColorDisc: Optional[int] = None
    WField1: Optional[str] = None
    WField2: Optional[str] = None
    WField3: Optional[str] = None
    MPSMS1: Optional[str] = None
    MPSMS2: Optional[str] = None
    MPSMS3: Optional[str] = None
    Temp1: Optional[str] = None
    Temp2: Optional[str] = None
    Temp3: Optional[str] = None
    Temp4: Optional[str] = None
    Temp5: Optional[str] = None
    GOE: Optional[float] = None
    GOENum: Optional[int] = None
    Strength: Optional[Union[str, int, ComparisonValue]] = None
    StrengthNum: Optional[int] = None
    ClimbingNum: Optional[int] = None
    BalancingNum: Optional[int] = None
    StoopingNum: Optional[int] = None
    KneelingNum: Optional[int] = None
    CrouchingNum: Optional[int] = None
    CrawlingNum: Optional[int] = None
    ReachingNum: Optional[int] = None
    HandlingNum: Optional[int] = None
    FingeringNum: Optional[int] = None
    FeelingNum: Optional[int] = None
    TalkingNum: Optional[int] = None
    HearingNum: Optional[int] = None
    TastingNum: Optional[int] = None
    NearAcuityNum: Optional[int] = None
    FarAcuityNum: Optional[int] = None
    DepthNum: Optional[int] = None
    AccommodationNum: Optional[int] = None
    ColorVisionNum: Optional[int] = None
    FieldVisionNum: Optional[int] = None
    WeatherNum: Optional[int] = None
    ColdNum: Optional[int] = None
    HeatNum: Optional[int] = None
    WetNum: Optional[int] = None
    NoiseNum: Optional[int] = None
    VibrationNum: Optional[int] = None
    AtmosphereNum: Optional[int] = None
    MovingNum: Optional[int] = None
    ElectricityNum: Optional[int] = None
    HeightNum: Optional[int] = None
    RadiationNum: Optional[int] = None
    ExplosionNum: Optional[int] = None
    ToxicNum: Optional[int] = None
    OtherNum: Optional[int] = None
    Title: Optional[str] = None
    AltTitles: Optional[str] = None
    CompleteTitle: Optional[str] = None
    Industry: Optional[str] = None
    Definitions: Optional[str] = None
    GOE1: Optional[str] = None
    GOE2: Optional[str] = None
    GOE3: Optional[str] = None
    WField1Short: Optional[str] = None
    WField2Short: Optional[str] = None
    WField3Short: Optional[str] = None
    MPSMS1Short: Optional[str] = None
    MPSMS2Short: Optional[str] = None
    MPSMS3Short: Optional[str] = None
    OccGroup: Optional[str] = None



@app.get("/search")
def search(
    search_term: str = Query(..., description="Term to search for."),
    search_column: str = Query('Title', description="Column to search in"),
    limit: int = Query(20, ge=1, le=1000, description="Number of records to return."),
    search_mode: str = Query('contains', description="Mode of search ('contains', 'starts_with', 'ends_with')."),
    sort_field: str = Query('Title', description="Name of the column to sort by (Title, SVPNum, Strength, or Code)."),
    sort_order: str = Query('asc', description="Sort order ('asc', 'desc')."),
    offset: int = Query(0, ge=0, description="Number of records to skip for pagination.")
):
    if search_column not in ALLOWED_SEARCH_FIELDS:
        raise HTTPException(status_code=400, detail=f"Invalid search column")

    if sort_field not in ALLOWED_SORT_FIELDS:
        raise HTTPException(status_code=400, detail=f"Invalid sort field. Allowed fields are: Title, SVPNum, Strength, Code")

    try:
        results = search_table(
            database_path='dotdb061814 (1).db',
            table_name='DOT',
            model_class=DOT,  # Pass the SQLAlchemy model
            search_term=search_term,
            search_column=search_column,
            search_mode=search_mode,
            limit=limit,
            offset=offset,
            sort_field=sort_field,
            sort_order=sort_order
        )
        
        # Remove SQLAlchemy internal state
        for result in results:
            result.pop('_sa_instance_state', None)
            
        return {"results": results}
    except ValueError as ve:
        logging.warning(f"Basic search validation error: {str(ve)}")
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        logging.error(f"Basic search error: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@app.post("/v2/advanced-search")
def advanced_search_v2(
    search_params: AdvancedSearchParams,
    db: Session = Depends(get_db),
    limit: int = Query(20, ge=1, le=1000),
    offset: int = Query(0, ge=0),
    sort_field: str = Query('Title', max_length=100),
    sort_order: str = Query('asc', regex="^(asc|desc)$")
):
    try:
        # Convert search params to advanced filters format
        advanced_filters = {}
        for field, value in search_params.dict(exclude_unset=True).items():
            if value is not None:
                # Add debug logging
                logging.debug(f"Processing field {field} with value {value}")
                
                if field == 'Strength' and isinstance(value, (int, float)):
                    # Map numeric strength values to letters
                    value = STRENGTH_MAP.get(int(value))
                    logging.debug(f"Mapped strength value to: {value}")
                
                if field == 'SVPNum' and isinstance(value, (int, float)):
                    # Ensure SVP is an integer
                    value = int(value)
                    logging.debug(f"Converted SVP to integer: {value}")
                
                if isinstance(value, dict) and 'operator' in value:
                    if field == 'Strength' and isinstance(value['value'], (int, float)):
                        value['value'] = STRENGTH_MAP.get(int(value['value']))
                        logging.debug(f"Mapped strength comparison value to: {value['value']}")
                    advanced_filters[field] = value
                else:
                    advanced_filters[field] = value

        logging.debug(f"Final advanced filters: {advanced_filters}")

        results = search_table(
            database_path=DATABASE_PATH,
            table_name='DOT',
            model_class=DOT,
            advanced_filters=advanced_filters,
            limit=limit,
            offset=offset,
            sort_field=sort_field,
            sort_order=sort_order
        )

        return {
            "total_count": len(results),
            "results": results,
            "limit": limit,
            "offset": offset
        }

    except SQLAlchemyError as e:
        logging.error(f"Database error in advanced search: {str(e)}")
        raise HTTPException(status_code=500, detail="Database error occurred")
    except Exception as e:
        logging.error(f"Unexpected error in advanced search: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred")
    

# Add health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=8002,  # Updated port
        reload=True
    )
    
