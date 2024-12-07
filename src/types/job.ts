// Basic Types
export type FrequencyLevel = 'Not Present' | 'Occasionally' | 'Frequently' | 'Constantly';
export type StrengthFullName = 'Sedentary' | 'Light' | 'Medium' | 'Heavy' | 'Very Heavy';
export type StrengthAbbrev = 'Sed' | 'Lt' | 'Med' | 'Hvy' | 'V Hvy' | 'S' | 'L' | 'M' | 'H' | 'VH';
export type StrengthLevel = StrengthFullName | StrengthAbbrev | null;
export type SVPLevel = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
export type GEDLevel = '1' | '2' | '3' | '4' | '5' | '6';
export type WorkerFunctionLevel = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
export type AptitudeLevel = '1' | '2' | '3' | '4' | '5';
export type NoiseLevel = 'Very Quiet' | 'Quiet' | 'Moderate' | 'Loud' | 'Very Loud';

// Search Related Types
export type SearchMode = 'contains' | 'starts_with' | 'ends_with';
export type SearchColumn = 'Title' | 'Code';
export type SortOrder = 'asc' | 'desc';
export type SortByType = 'Title' | 'SVPNum' | 'Strength' | 'Code';

// Mapping Constants
export const NUMBER_TO_FREQUENCY: Record<number, FrequencyLevel> = {
  1: 'Not Present',
  2: 'Occasionally',
  3: 'Frequently',
  4: 'Constantly'
} as const;

export const FREQUENCY_TO_NUMBER: Record<FrequencyLevel, number> = {
  'Not Present': 1,
  'Occasionally': 2,
  'Frequently': 3,
  'Constantly': 4
} as const;

export const NOISE_LEVELS = {
  'Very Quiet': 1,
  'Quiet': 2,
  'Moderate': 3,
  'Loud': 4,
  'Very Loud': 5
} as const;

export const STRENGTH_MAPPINGS = {
  UI_TO_API: {
    'Sed': 'Sedentary',
    'Lt': 'Light',
    'Med': 'Medium',
    'Hvy': 'Heavy',
    'V Hvy': 'Very Heavy',
    'S': 'Sedentary',
    'L': 'Light',
    'M': 'Medium',
    'H': 'Heavy',
    'VH': 'Very Heavy'
  } as const,
  
  API_TO_UI: {
    'Sedentary': 'Sed',
    'Light': 'Lt',
    'Medium': 'Med',
    'Heavy': 'Hvy',
    'Very Heavy': 'V Hvy'
  } as const,
  
  API_TO_SHORT: {
    'Sedentary': 'S',
    'Light': 'L',
    'Medium': 'M',
    'Heavy': 'H',
    'Very Heavy': 'VH'
  } as const,
  
  TO_NUMBER: {
    'Sedentary': 1,
    'Light': 2,
    'Medium': 3,
    'Heavy': 4,
    'Very Heavy': 5
  } as const
} as const;

export const NUMBER_TO_NOISE: Record<number, NoiseLevel> = {
  1: 'Very Quiet',
  2: 'Quiet',
  3: 'Moderate',
  4: 'Loud',
  5: 'Very Loud'
} as const;

export const UI_FREQUENCY_DISPLAY = {
  'Not Present': 'Not Present',
  'Occasionally': 'Occasionally',
  'Frequently': 'Frequently',
  'Constantly': 'Constantly'
} as const;

// Interface Definitions
export interface SearchParams {
  search_term: string;
  search_column: SearchColumn;
  limit: number;
  offset: number;
  sort_field: SortByType;
  sort_order: 'asc' | 'desc';
}

export interface APIJobData {
  // Base Information
  Ncode?: number;
  DocumentNumber?: string;
  Code: string;
  DLU?: number;
  Title: string;
  CompleteTitle?: string;
  Industry?: string;
  AltTitles?: string;
  Definitions?: string;
  
  // Strength and SVP
  Strength?: string;
  StrengthNum?: number;
  SVPNum?: number;
  
  // Worker Functions
  WFData?: number;
  WFDataSig?: string;
  WFPeople?: number;
  WFPeopleSig?: string;
  WFThings?: number;
  WFThingsSig?: string;
  
  // GED Requirements
  GEDR?: number;
  GEDM?: number;
  GEDL?: number;
  
  // Work Fields
  WField1?: string;
  WField1Short?: string;
  WField2?: string;
  WField2Short?: string;
  WField3?: string;
  WField3Short?: string;
  
  // MPSMS Fields
  MPSMS1?: string;
  MPSMS1Short?: string;
  MPSMS2?: string;
  MPSMS2Short?: string;
  MPSMS3?: string;
  MPSMS3Short?: string;
  
  // GOE Fields
  GOE?: string;
  GOENum?: number;
  GOE1?: string;
  GOE2?: string;
  GOE3?: string;
  
  // Frequency-based Fields
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
  
  // Aptitudes
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
  
  // Temperaments
  Temp1?: string;
  Temp2?: string;
  Temp3?: string;
  Temp4?: string;
  Temp5?: string;
  
  // Additional Fields
  OccGroup?: string;
}

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
    readonly environmental: {
      readonly weather: FrequencyLevel;
      readonly extremeCold: FrequencyLevel;
      readonly extremeHeat: FrequencyLevel;
      readonly wet: FrequencyLevel;
      readonly noise: string;
      readonly vibration: FrequencyLevel;
      readonly atmosphericConditions: FrequencyLevel;
      readonly movingMechanicalParts: FrequencyLevel;
      readonly electricShock: FrequencyLevel;
      readonly highPlaces: FrequencyLevel;
      readonly radiation: FrequencyLevel;
      readonly explosives: FrequencyLevel;
      readonly toxicChemicals: FrequencyLevel;
      readonly other: FrequencyLevel;
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

export interface AdvancedSearchFilters {
  title: string;
  definition: string;
  strength: StrengthLevel | null;
  svp: SVPLevel | null;
  posturals: {
    climbing: FrequencyLevel | '';
    balancing: FrequencyLevel | '';
    stooping: FrequencyLevel | '';
    kneeling: FrequencyLevel | '';
    crouching: FrequencyLevel | '';
    crawling: FrequencyLevel | '';
  };
  manipulative: {
    reaching: FrequencyLevel | '';
    handling: FrequencyLevel | '';
    fingering: FrequencyLevel | '';
  };
  sensory: {
    feeling: FrequencyLevel | '';
    talking: FrequencyLevel | '';
    hearing: FrequencyLevel | '';
    tasteSmell: FrequencyLevel | '';
  };
  visual: {
    nearAcuity: FrequencyLevel | '';
    farAcuity: FrequencyLevel | '';
    depthPerception: FrequencyLevel | '';
    accommodation: FrequencyLevel | '';
    colorVision: FrequencyLevel | '';
    fieldOfVision: FrequencyLevel | '';
  };
  environmental: {
    weather: FrequencyLevel | '';
    extremeCold: FrequencyLevel | '';
    extremeHeat: FrequencyLevel | '';
    wet: FrequencyLevel | '';
    noise: FrequencyLevel | '';
    vibration: FrequencyLevel | '';
    atmosphericConditions: FrequencyLevel | '';
    movingMechanicalParts: FrequencyLevel | '';
    electricShock: FrequencyLevel | '';
    highPlaces: FrequencyLevel | '';
    radiation: FrequencyLevel | '';
    explosives: FrequencyLevel | '';
    toxicChemicals: FrequencyLevel | '';
    other: FrequencyLevel | '';
  };
  workerFunctions: {
    data: WorkerFunctionLevel | '';
    people: WorkerFunctionLevel | '';
    things: WorkerFunctionLevel | '';
  };
  generalEducationalDevelopment: {
    reasoning: GEDLevel | '';
    math: GEDLevel | '';
    language: GEDLevel | '';
  };
  ged: {
    reasoning: string;
    math: string;
    language: string;
  };
}

export interface AdvancedSearchParams extends SearchParams {
  definition?: string;
  strength?: StrengthLevel;
  svp?: SVPLevel;
  posturals?: Record<string, FrequencyLevel>;
  manipulative?: Record<string, FrequencyLevel>;
  sensory?: Record<string, FrequencyLevel>;
  visual?: Record<string, FrequencyLevel>;
  environmental?: Record<string, FrequencyLevel>;
  workerFunctions?: Record<string, WorkerFunctionLevel>;
  generalEducationalDevelopment?: Record<string, GEDLevel>;
}

// Type guard functions
export const isValidStrength = (value: unknown): value is StrengthLevel => {
  if (!value || typeof value !== 'string') return false;
  return (
    Object.keys(STRENGTH_MAPPINGS.UI_TO_API).includes(value) ||
    Object.values(STRENGTH_MAPPINGS.UI_TO_API).includes(value as StrengthFullName)
  );
};

export const isValidFrequency = (value: unknown): value is FrequencyLevel => {
  if (!value || typeof value !== 'string') return false;
  return Object.keys(FREQUENCY_TO_NUMBER).includes(value as string);
};