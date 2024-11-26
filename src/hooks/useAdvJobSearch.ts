import { useState, useCallback, useMemo } from 'react';
import apiAdvDatabaseService from '../services/apiAdvDatabaseService';
import { 
  JobData, 
  FrequencyLevel, 
  StrengthLevel, 
  SVPLevel,
  GEDLevel,
  WorkerFunctionLevel 
} from '../types/job';

interface InternalFilters {
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
}

export const UI_TO_API_FREQUENCY: Record<string, FrequencyLevel> = {
  'NP': 'Not Present',
  'Occ.': 'Occasionally',
  'Freq.': 'Frequently',
  'Const.': 'Constantly'
};

export const UI_TO_API_STRENGTH: Record<string, StrengthLevel> = {
  'Sed': 'Sedentary',
  'Light': 'Light',
  'Med': 'Medium',
  'Heavy': 'Heavy',
  'V Hvy': 'Very Heavy'
};

const initialFilters: InternalFilters = {
  title: '',
  strength: null,
  svp: null,
  posturals: { climbing: '', balancing: '', stooping: '', kneeling: '', crouching: '', crawling: '' },
  manipulative: { reaching: '', handling: '', fingering: '' },
  sensory: { feeling: '', talking: '', hearing: '', tasteSmell: '' },
  visual: { nearAcuity: '', farAcuity: '', depthPerception: '', accommodation: '', colorVision: '', fieldOfVision: '' },
  environmental: { weather: '', extremeCold: '', extremeHeat: '', wet: '', noise: '', vibration: '', atmosphericConditions: '', movingMechanicalParts: '', electricShock: '', highPlaces: '', radiation: '', explosives: '', toxicChemicals: '', other: '' },
  workerFunctions: { data: '', people: '', things: '' },
  generalEducationalDevelopment: { reasoning: '', math: '', language: '' },
};

export const useAdvancedSearch = () => {
  const [filters, setFilters] = useState<InternalFilters>(initialFilters);
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateFilters = useCallback((path: string, value: any) => {
    console.log(`Updating filter: ${path} = ${value}`);
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters };
      const keys = path.split('.');
      let current: any = newFilters;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newFilters;
    });
  }, []);

  const submitSearch = useCallback(async () => {
    console.log('Submitting search with filters:', filters);
    setIsLoading(true);
    setError(null);

    try {
      const apiParams = apiAdvDatabaseService.prepareAdvancedSearchParams(filters);
      const results = await apiAdvDatabaseService.advancedSearchJobs(apiParams);
      console.log('Search results:', results);
      setJobs(results);
    } catch (err) {
      console.error('Error during job search:', err);
      setError('An error occurred while fetching jobs. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  const resetFilters = useCallback(() => {
    console.log('Resetting filters');
    setFilters(initialFilters);
    setJobs([]);
  }, []);

  const memoizedValue = useMemo(() => ({
    filters,
    updateFilters,
    jobs,
    isLoading,
    error,
    submitSearch,
    resetFilters,
  }), [filters, updateFilters, jobs, isLoading, error, submitSearch, resetFilters]);

  return memoizedValue;
};