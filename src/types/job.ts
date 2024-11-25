export type FrequencyLevel = 'Not Present' | 'Occasionally' | 'Frequently' | 'Constantly';
export type StrengthLevel = 'Sedentary' | 'Light' | 'Medium' | 'Heavy' | 'Very Heavy';
export type SVPLevel = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
export type GEDLevel = '1' | '2' | '3' | '4' | '5' | '6';
export type WorkerFunctionLevel = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
export type AptitudeLevel = '1' | '2' | '3' | '4' | '5';
export type SearchMode = 'contains' | 'starts_with' | 'ends_with';

export type SortOrder = 'asc' | 'desc';
export type SortByType = 'SVP' | 'titleAsc' | 'titleDesc' | 'codeAsc' | 'codeDesc' | 'SVPNum' | 'Title' | 'Code' | 'Strength';

export interface JobData {
  readonly jobTitle: string;
  readonly dotCode: string;
  readonly industryDesignation: string;
  readonly alternateTitles: readonly string[];
  readonly goe: {
    readonly code: string;
    readonly title: string;
  };
  readonly svp: {
    readonly level: SVPLevel;
    readonly description: string;
  };
  readonly definition: string;
  readonly strength: {
    readonly level: StrengthLevel;
    readonly description: string;
  };
  readonly characteristics: {
    readonly postural: {
      readonly climbing: FrequencyLevel;
      readonly balancing: FrequencyLevel;
      readonly stooping: FrequencyLevel;
      readonly kneeling: FrequencyLevel;
      readonly crouching: FrequencyLevel;
      readonly crawling: FrequencyLevel;
    };
    readonly manipulative: {
      readonly reaching: FrequencyLevel;
      readonly handling: FrequencyLevel;
      readonly fingering: FrequencyLevel;
    };
    readonly sensory: {
      readonly feeling: FrequencyLevel;
      readonly talking: FrequencyLevel;
      readonly hearing: FrequencyLevel;
      readonly tasteSmell: FrequencyLevel;
    };
    readonly visual: {
      readonly nearAcuity: FrequencyLevel;
      readonly farAcuity: FrequencyLevel;
      readonly depthPerception: FrequencyLevel;
      readonly accommodation: FrequencyLevel;
      readonly colorVision: FrequencyLevel;
      readonly fieldOfVision: FrequencyLevel;
    };
    environmental: {
      weather: FrequencyLevel;
      extremeCold: FrequencyLevel;
      extremeHeat: FrequencyLevel;
      wet: FrequencyLevel;
      noise: string;
      vibration: FrequencyLevel;
      atmosphericConditions: FrequencyLevel;
      movingMechanicalParts: FrequencyLevel;
      electricShock: FrequencyLevel;
      highPlaces: FrequencyLevel;
      radiation: FrequencyLevel;
      explosives: FrequencyLevel;
      toxicChemicals: FrequencyLevel;
      other: FrequencyLevel;
    };
  };
  readonly generalEducationalDevelopment: {
    readonly reasoning: {
      readonly level: GEDLevel;
      readonly description: string;
    };
    readonly math: {
      readonly level: GEDLevel;
      readonly description: string;
    };
    readonly language: {
      readonly level: GEDLevel;
      readonly description: string;
    };
  };
  readonly workerFunctions: {
    readonly data: {
      readonly level: WorkerFunctionLevel;
      readonly description: string;
    };
    readonly people: {
      readonly level: WorkerFunctionLevel;
      readonly description: string;
    };
    readonly things: {
      readonly level: WorkerFunctionLevel;
      readonly description: string;
    };
  };
  readonly workField: {
    readonly code: string;
    readonly description: string;
  };
  readonly mpsmsCode: {
    readonly code: string;
    readonly description: string;
  };
  readonly aptitudes: {
    readonly generalLearningAbility: {
      readonly level: AptitudeLevel;
      readonly description: string;
      readonly aptitude: string;
    };
    readonly verbalAptitude: {
      readonly level: AptitudeLevel;
      readonly description: string;
      readonly aptitude: string;
    };
    readonly numericalAptitude: {
      readonly level: AptitudeLevel;
      readonly description: string;
      readonly aptitude: string;
    };
    readonly spatialAptitude: {
      readonly level: AptitudeLevel;
      readonly description: string;
      readonly aptitude: string;
    };
    readonly formPerception: {
      readonly level: AptitudeLevel;
      readonly description: string;
      readonly aptitude: string;
    };
    readonly clericalPerception: {
      readonly level: AptitudeLevel;
      readonly description: string;
      readonly aptitude: string;
    };
    readonly motorCoordination: {
      readonly level: AptitudeLevel;
      readonly description: string;
      readonly aptitude: string;
    };
    readonly fingerDexterity: {
      readonly level: AptitudeLevel;
      readonly description: string;
      readonly aptitude: string;
    };
    readonly manualDexterity: {
      readonly level: AptitudeLevel;
      readonly description: string;
      readonly aptitude: string;
    };
    readonly eyeHandFootCoordination: {
      readonly level: AptitudeLevel;
      readonly description: string;
      readonly aptitude: string;
    };
    readonly colorDiscrimination: {
      readonly level: AptitudeLevel;
      readonly description: string;
      readonly aptitude: string;
    };
  };
  readonly temperaments: {
    readonly code: string;
    readonly description: string;
  };
}

// SearchParams: Defines the parameters used for job searches
// This interface is crucial for structuring search requests to the API
export interface SearchParams {
  search_term?: string;
  title_search?: string;
  code_search?: string;
  limit?: number;
  search_mode?: SearchMode;
  sort_field?: SortByType;
  sort_order?: 'asc' | 'desc';
  page?: number;
}

export interface APIResponse<T> {
  status: 'success' | 'error';
  message?: string;
  results?: T[];
  record?: T;
  // ... any other properties your API response might have
}

// APIJobData: Represents the job data structure returned by the API
// This interface maps directly to the raw data format from the backend
export interface APIJobData {
  Ncode?: number;
  DocumentNumber?: string;
  Code: string;
  DLU?: number;
  WFData?: number;
  WFDataSig?: string;
  WFPeople?: number;
  WFPeopleSig?: string;
  WFThings?: number;
  WFThingsSig?: string;
  GEDR?: number;
  GEDM?: number;
  GEDL?: number;
  SVPNum?: number;
  AptGenLearn?: number;
  AptVerbal?: number;
  AptNumerical?: number;
  AptSpacial?: number;
  AptFormPer?: number;
  AptClericalPer?: number;
  AptMotor?: number;
  AptFingerDext?: number;
  AptManualDext?: number;
  AptEyeHandCoord?: number;
  AptColorDisc?: number;
  WField1?: string;
  WField2?: string;
  WField3?: string;
  MPSMS1?: string;
  MPSMS2?: string;
  MPSMS3?: string;
  Temp1?: string;
  Temp2?: string;
  Temp3?: string;
  Temp4?: string;
  Temp5?: string;
  GOE?: string;
  GOENum?: number;
  Strength?: string;
  StrengthNum?: number;
  ClimbingNum?: number;
  BalancingNum?: number;
  StoopingNum?: number;
  KneelingNum?: number;
  CrouchingNum?: number;
  CrawlingNum?: number;
  ReachingNum?: number;
  HandlingNum?: number;
  FingeringNum?: number;
  FeelingNum?: number;
  TalkingNum?: number;
  HearingNum?: number;
  TastingNum?: number;
  NearAcuityNum?: number;
  FarAcuityNum?: number;
  DepthNum?: number;
  AccommodationNum?: number;
  ColorVisionNum?: number;
  FieldVisionNum?: number;
  WeatherNum?: number;
  ColdNum?: number;
  HeatNum?: number;
  WetNum?: number;
  NoiseNum?: number;
  VibrationNum?: number;
  AtmosphereNum?: number;
  MovingNum?: number;
  ElectricityNum?: number;
  HeightNum?: number;
  RadiationNum?: number;
  ExplosionNum?: number;
  ToxicNum?: number;
  OtherNum?: number;
  Title: string;
  AltTitles?: string;
  CompleteTitle?: string;
  Industry?: string;
  Definitions?: string;
  GOE1?: string;
  GOE2?: string;
  GOE3?: string;
  WField1Short?: string;
  WField2Short?: string;
  WField3Short?: string;
  MPSMS1Short?: string;
  MPSMS2Short?: string;
  MPSMS3Short?: string;
  OccGroup?: string;
}

export type AdvancedSearchParams = Partial<Omit<APIJobData, 'Ncode' | 'Code' | 'DLU'>>;

export type StringifyLevels<T> = {
  [K in keyof T]: T[K] extends number ? string : T[K];
};

// FrontendJobData: Converts all number properties in APIJobData to strings
// This type is used for frontend representation where all values are strings
export type FrontendJobData = StringifyLevels<APIJobData>;

export type ApiSortField = 'SVPNum' | 'Title' | 'Code' | 'Strength';