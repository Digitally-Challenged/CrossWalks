import logging
from typing import List, Optional, Union
from fastapi import Body, Depends, FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import Column, Float, Integer, String, create_engine, inspect, or_
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session, sessionmaker
from database import search_table


app = FastAPI()

# Configure logging
logging.basicConfig(
    filename='backend.log',
    level=logging.DEBUG,
    format='%(asctime)s %(levelname)s:%(message)s'
)

# CORS configuration
origins = [
    "*"  # Adjust this in production to restrict origins
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE_PATH = "dotdb061814 (1).db"
engine = create_engine(f'sqlite:///{DATABASE_PATH}')
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
def get_db():
    db = SessionLocal()
    yield db

# Define allowed columns for sorting and searching
ALLOWED_SORT_FIELDS = set([
    'Ncode', 'DocumentNumber', 'Code', 'DLU', 'WFData', 'WFDataSig', 'WFPeople', 'WFPeopleSig',
    'WFThings', 'WFThingsSig', 'GEDR', 'GEDM', 'GEDL', 'SVPNum', 'AptGenLearn', 'AptVerbal',
    'AptNumerical', 'AptSpacial', 'AptFormPer', 'AptClericalPer', 'AptMotor', 'AptFingerDext',
    'AptManualDext', 'AptEyeHandCoord', 'AptColorDisc', 'WField1', 'WField2', 'WField3',
    'MPSMS1', 'MPSMS2', 'MPSMS3', 'Temp1', 'Temp2', 'Temp3', 'Temp4', 'Temp5', 'GOE',
    'GOENum', 'Strength', 'StrengthNum', 'ClimbingNum', 'BalancingNum', 'StoopingNum',
    'KneelingNum', 'CrouchingNum', 'CrawlingNum', 'ReachingNum', 'HandlingNum', 'FingeringNum',
    'FeelingNum', 'TalkingNum', 'HearingNum', 'TastingNum', 'NearAcuityNum', 'FarAcuityNum',
    'DepthNum', 'AccommodationNum', 'ColorVisionNum', 'FieldVisionNum', 'WeatherNum',
    'ColdNum', 'HeatNum', 'WetNum', 'NoiseNum', 'VibrationNum', 'AtmosphereNum', 'MovingNum',
    'ElectricityNum', 'HeightNum', 'RadiationNum', 'ExplosionNum', 'ToxicNum', 'OtherNum',
    'Title', 'AltTitles', 'CompleteTitle', 'Industry', 'Definitions', 'GOE1', 'GOE2', 'GOE3',
    'WField1Short', 'WField2Short', 'WField3Short', 'MPSMS1Short', 'MPSMS2Short',
    'MPSMS3Short', 'OccGroup'
])

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



class AdvancedSearchParams(BaseModel):
    Ncode: Optional[int] = None
    DocumentNumber: Optional[str] = None
    Code: Optional[float] = None
    DLU: Optional[int] = None
    WFData: Optional[int] = None
    WFDataSig: Optional[str] = None
    WFPeople: Optional[int] = None
    WFPeopleSig: Optional[str] = None
    WFThings: Optional[int] = None
    WFThingsSig: Optional[str] = None
    GEDR: Optional[int] = None
    GEDM: Optional[int] = None
    GEDL: Optional[int] = None
    SVPNum: Optional[int] = None
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
    Strength: Optional[str] = None
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
    search_column: str = Query('Title', description="Column to search in ('Title' or 'Code')"),
    limit: int = Query(20, ge=1, le=1000, description="Number of records to return."),
    search_mode: str = Query('contains', description="Mode of search ('contains', 'starts_with', 'ends_with')."),
    sort_field: str = Query('Title', description="Name of the column to sort by."),
    sort_order: str = Query('asc', description="Sort order ('asc', 'desc')."),
    offset: int = Query(0, ge=0, description="Number of records to skip for pagination.")
):
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
        query = db.query(DOT)

        for field, value in search_params.dict(exclude_unset=True).items():
            if value is not None:
                column = getattr(DOT, field, None)
                if column is None:
                    continue

                if isinstance(value, str):
                    if field in ['Strength', 'StrengthNum', 'WFDataSig', 'WFPeopleSig', 'WFThingsSig']:
                        query = query.filter(column == value)
                    elif '%' in value:
                        query = query.filter(column.ilike(value))
                    else:
                        query = query.filter(column.ilike(f"%{value}%"))

                elif isinstance(value, (int, float)):
                    query = query.filter(column == value)

                elif isinstance(value, list):
                    if len(value) == 2 and isinstance(value[0], (int, float)) and isinstance(value[1], (int, float)):
                        query = query.filter(column.between(value[0], value[1]))
                    else:
                        query = query.filter(column.in_(value))

        # Apply sorting
        if sort_field in ALLOWED_SORT_FIELDS:
            if sort_order.lower() == 'desc':
                query = query.order_by(getattr(DOT, sort_field).desc())
            else:
                query = query.order_by(getattr(DOT, sort_field))


        total_count = query.count()

        results = query.offset(offset).limit(limit).all()
        results = [row.__dict__ for row in results]
        for result in results:
            result.pop('_sa_instance_state', None)  

        return {
            "total_count": total_count,
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
    
