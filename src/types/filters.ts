type FilterMode = 'maximum' | 'equal' | 'minimum';

// Frequency types for most physical and environmental demands
export type FrequencyLevel = 
  | "Not Present" 
  | "Occasionally" 
  | "Frequently" 
  | "Constantly"
  | "";

// Specific types for certain fields
type StrengthLevel = 1 | 2 | 3 | 4 | 5; // Sedentary to Very Heavy
type SVPLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type NoiseLevel = 1 | 2 | 3 | 4 | 5; // Very Quiet to Very Loud
type WorkForceLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type GEDLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface FilterConfig<T> {
  value: T | null;
  mode: FilterMode;
}

export interface AdvancedSearchState {
  // Primary filters
  title: string;
  strength: FilterConfig<StrengthLevel>;
  svp: FilterConfig<SVPLevel>;
  definition: string;

  // Physical demands
  posturals: {
    climbing: FilterConfig<FrequencyLevel>;
    balancing: FilterConfig<FrequencyLevel>;
    stooping: FilterConfig<FrequencyLevel>;
    kneeling: FilterConfig<FrequencyLevel>;
    crouching: FilterConfig<FrequencyLevel>;
    crawling: FilterConfig<FrequencyLevel>;
  };

  manipulative: {
    reaching: FilterConfig<FrequencyLevel>;
    handling: FilterConfig<FrequencyLevel>;
    fingering: FilterConfig<FrequencyLevel>;
  };

  sensory: {
    feeling: FilterConfig<FrequencyLevel>;
    talking: FilterConfig<FrequencyLevel>;
    hearing: FilterConfig<FrequencyLevel>;
    tasteSmell: FilterConfig<FrequencyLevel>;
  };

  visual: {
    nearAcuity: FilterConfig<FrequencyLevel>;
    farAcuity: FilterConfig<FrequencyLevel>;
    depthPerception: FilterConfig<FrequencyLevel>;
    accommodation: FilterConfig<FrequencyLevel>;
    colorVision: FilterConfig<FrequencyLevel>;
    fieldOfVision: FilterConfig<FrequencyLevel>;
  };

  environmental: {
    weather: FilterConfig<FrequencyLevel>;
    extremeCold: FilterConfig<FrequencyLevel>;
    extremeHeat: FilterConfig<FrequencyLevel>;
    wetHumid: FilterConfig<FrequencyLevel>;
    noise: FilterConfig<FrequencyLevel>;
    vibration: FilterConfig<FrequencyLevel>;
    atmospheric: FilterConfig<FrequencyLevel>;
  };

  workForce: {
    data: FilterConfig<WorkForceLevel>;
    people: FilterConfig<WorkForceLevel>;
    things: FilterConfig<WorkForceLevel>;
  };

  generalEducationalDevelopment: {
    reasoning: FilterConfig<GEDLevel>;
    math: FilterConfig<GEDLevel>;
    language: FilterConfig<GEDLevel>;
  };
}

export type {
  FrequencyLevel,
  StrengthLevel,
  SVPLevel,
  NoiseLevel,
  WorkForceLevel,
  GEDLevel,
  FilterMode,
  FilterConfig,
  AdvancedSearchState
};