export type FrequencyLevel = 'Not Present' | 'Occasionally' | 'Frequently' | 'Constantly';
export type StrengthFullName = 'Sedentary' | 'Light' | 'Medium' | 'Heavy' | 'Very Heavy';
export type StrengthAbbrev = 'Sed' | 'Lt' | 'Med' | 'Hvy' | 'V Hvy';
export type StrengthLevel = StrengthFullName | StrengthAbbrev;
export type SVPLevel = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
export type GEDLevel = '1' | '2' | '3' | '4' | '5' | '6';
export type WorkerFunctionLevel = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
export type AptitudeLevel = '1' | '2' | '3' | '4' | '5';
export type SearchMode = 'contains' | 'starts_with' | 'ends_with';
export type SearchColumn = 'Title' | 'Code';

export type SortOrder = 'asc' | 'desc';
export type SortByType = 'SVP' | 'titleAsc' | 'titleDesc' | 'codeAsc' | 'codeDesc' | 'SVPNum' | 'Title' | 'Code' | 'Strength';

export interface SearchParams {
  search_term?: string;
  title_search?: string;
  code_search?: string;
  limit?: number;
  search_mode?: SearchMode;
  sort_field?: SortByType;
  sort_order?: SortOrder;
  page?: number;
  search_column?: SearchColumn;
  offset?: number;
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

export interface AdvancedSearchFilters {
  title: string;
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

export const UI_FREQUENCY_DISPLAY = {
  'Not Present': 'Not Present',
  'Occasionally': 'Occasionally',
  'Frequently': 'Frequently',
  'Constantly': 'Constantly'
} as const;

export const UI_STRENGTH_DISPLAY = {
  'Sedentary': 'Sed',
  'Light': 'Light',
  'Medium': 'Med',
  'Heavy': 'Heavy',
  'Very Heavy': 'V Hvy'
} as const;

export type UIFrequencyDisplay = typeof UI_FREQUENCY_DISPLAY[keyof typeof UI_FREQUENCY_DISPLAY];
export type UIStrengthDisplay = typeof UI_STRENGTH_DISPLAY[keyof typeof UI_STRENGTH_DISPLAY];

export interface AdvancedSearchParams extends SearchParams {
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

export interface APIJobData {
  Title: string;
  Code: string;
  Industry?: string;
  AltTitles?: string;
  GOE?: string;
  SVPNum?: number;
  Definitions?: string;
  Strength?: string;
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
  GEDR?: number;
  GEDM?: number;
  GEDL?: number;
  WFData?: number;
  WFDataSig?: string;
  WFPeople?: number;
  WFPeopleSig?: string;
  WFThings?: number;
  WFThingsSig?: string;
  WField1?: string;
  WField1Short?: string;
  MPSMS1?: string;
  MPSMS1Short?: string;
  Temp1?: string;
  Temp2?: string;
  Temp3?: string;
  Temp4?: string;
  Temp5?: string;
}