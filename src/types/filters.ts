export type FilterMode = '=' | '≤' | '≥';

// Frequency types for most physical and environmental demands
type Frequency = 'NP' | 'Occ' | 'Freq' | 'Const';
type FrequencyNum = 0 | 1 | 2 | 3;

// Specific types for certain fields
type StrengthLevel = 1 | 2 | 3 | 4 | 5; // Sedentary to Very Heavy
type SVPLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type NoiseLevel = 1 | 2 | 3 | 4 | 5; // Very Quiet to Very Loud
type WorkForceLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type GEDLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface FilterConfig<T = number> {
  value: T | null;
  mode: FilterMode;
}

interface AdvancedSearchState {
  // Primary filters
  title: string;
  strength: FilterConfig<StrengthLevel>;
  svp: FilterConfig<SVPLevel>;
  definition: string;

  // Physical demands
  posturals: {
    climbing: FilterConfig<FrequencyNum>;
    balancing: FilterConfig<FrequencyNum>;
    stooping: FilterConfig<FrequencyNum>;
    kneeling: FilterConfig<FrequencyNum>;
    crouching: FilterConfig<FrequencyNum>;
    crawling: FilterConfig<FrequencyNum>;
  };

  manipulative: {
    reaching: FilterConfig<FrequencyNum>;
    handling: FilterConfig<FrequencyNum>;
    fingering: FilterConfig<FrequencyNum>;
  };

  sensory: {
    feeling: FilterConfig<FrequencyNum>;
    talking: FilterConfig<FrequencyNum>;
    hearing: FilterConfig<FrequencyNum>;
    tasteSmell: FilterConfig<FrequencyNum>;
  };

  visual: {
    nearAcuity: FilterConfig<FrequencyNum>;
    farAcuity: FilterConfig<FrequencyNum>;
    depthPerception: FilterConfig<FrequencyNum>;
    accommodation: FilterConfig<FrequencyNum>;
    colorVision: FilterConfig<FrequencyNum>;
    fieldOfVision: FilterConfig<FrequencyNum>;
  };

  environmental: {
    weather: FilterConfig<FrequencyNum>;
    extremeCold: FilterConfig<FrequencyNum>;
    extremeHeat: FilterConfig<FrequencyNum>;
    wet: FilterConfig<FrequencyNum>;
    noise: FilterConfig<NoiseLevel>;
    vibration: FilterConfig<FrequencyNum>;
    atmosphericConditions: FilterConfig<FrequencyNum>;
    movingMechanicalParts: FilterConfig<FrequencyNum>;
    electricShock: FilterConfig<FrequencyNum>;
    highPlaces: FilterConfig<FrequencyNum>;
    radiation: FilterConfig<FrequencyNum>;
    explosives: FilterConfig<FrequencyNum>;
    toxicChemicals: FilterConfig<FrequencyNum>;
    other: FilterConfig<FrequencyNum>;
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
  Frequency,
  FrequencyNum,
  StrengthLevel,
  SVPLevel,
  NoiseLevel,
  WorkForceLevel,
  GEDLevel,
  FilterConfig,
  AdvancedSearchState
};