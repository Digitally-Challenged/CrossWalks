import { useState, useCallback, useMemo } from 'react';
import apiAdvDatabaseService from '../services/apiAdvDatabaseService';
import type { JobData } from '../types/job';

interface InternalFilters {
  title: string;
  strength: string | null;
  svp: string | null;
  posturals: {
    climbing: string;
    balancing: string;
    stooping: string;
    kneeling: string;
    crouching: string;
    crawling: string;
  };
  manipulative: {
    reaching: string;
    handling: string;
    fingering: string;
  };
  sensory: {
    feeling: string;
    talking: string;
    hearing: string;
    tasteSmell: string;
  };
  visual: {
    nearAcuity: string;
    farAcuity: string;
    depthPerception: string;
    accommodation: string;
    colorVision: string;
    fieldOfVision: string;
  };
  environmental: {
    weather: string;
    extremeCold: string;
    extremeHeat: string;
    wet: string;
    noise: string;
    vibration: string;
    atmosphericConditions: string;
    movingMechanicalParts: string;
    electricShock: string;
    highPlaces: string;
    radiation: string;
    explosives: string;
    toxicChemicals: string;
    other: string;
  };
  workerFunctions: {
    data: string;
    people: string;
    things: string;
  };
  generalEducationalDevelopment: {
    reasoning: string;
    math: string;
    language: string;
  };
}

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