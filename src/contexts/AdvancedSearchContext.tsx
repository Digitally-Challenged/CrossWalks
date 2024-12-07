import React, { createContext, useContext, useCallback, useReducer } from 'react';
import { set } from 'lodash';
import { 
  FrequencyLevel, 
  SVPLevel,
  GEDLevel,
  WorkerFunctionLevel,
  StrengthLevel 
} from '../types/job';

// Types
export type FilterMode = 'maximum' | 'equal' | 'minimum';

export interface FilterState<T> {
  value: T | null;
  mode: FilterMode;
}

interface AdvancedSearchState {
  title: string;
  definition: string;
  strength: FilterState<StrengthLevel>;
  svp: FilterState<SVPLevel>;
  posturals: {
    climbing: FilterState<FrequencyLevel>;
    balancing: FilterState<FrequencyLevel>;
    stooping: FilterState<FrequencyLevel>;
    kneeling: FilterState<FrequencyLevel>;
    crouching: FilterState<FrequencyLevel>;
    crawling: FilterState<FrequencyLevel>;
  };
  manipulative: {
    reaching: FilterState<FrequencyLevel>;
    handling: FilterState<FrequencyLevel>;
    fingering: FilterState<FrequencyLevel>;
    feeling: FilterState<FrequencyLevel>;
  };
  sensory: {
    talking: FilterState<FrequencyLevel>;
    hearing: FilterState<FrequencyLevel>;
    tasteSmell: FilterState<FrequencyLevel>;
  };
  visual: {
    nearAcuity: FilterState<FrequencyLevel>;
    farAcuity: FilterState<FrequencyLevel>;
    depthPerception: FilterState<FrequencyLevel>;
    accommodation: FilterState<FrequencyLevel>;
    colorVision: FilterState<FrequencyLevel>;
    fieldOfVision: FilterState<FrequencyLevel>;
  };
  environmental: {
    weather: FilterState<FrequencyLevel>;
    extremeCold: FilterState<FrequencyLevel>;
    extremeHeat: FilterState<FrequencyLevel>;
    wet: FilterState<FrequencyLevel>;
    noise: FilterState<FrequencyLevel>;
    vibration: FilterState<FrequencyLevel>;
    atmosphericConditions: FilterState<FrequencyLevel>;
    movingMechanicalParts: FilterState<FrequencyLevel>;
    electricShock: FilterState<FrequencyLevel>;
    highPlaces: FilterState<FrequencyLevel>;
    radiation: FilterState<FrequencyLevel>;
    explosives: FilterState<FrequencyLevel>;
    toxicChemicals: FilterState<FrequencyLevel>;
    other: FilterState<FrequencyLevel>;
  };
  workerFunctions: {
    data: FilterState<WorkerFunctionLevel>;
    people: FilterState<WorkerFunctionLevel>;
    things: FilterState<WorkerFunctionLevel>;
  };
  generalEducationalDevelopment: {
    reasoning: FilterState<GEDLevel>;
    math: FilterState<GEDLevel>;
    language: FilterState<GEDLevel>;
  };
}

type AdvancedSearchAction = 
  | { type: 'SET_FILTER_VALUE'; path: string; value: any }
  | { type: 'SET_FILTER_MODE'; path: string; mode: FilterMode }
  | { type: 'RESET_FILTERS' };

// Create empty filter state with default mode
const createEmptyFilterState = (defaultMode: FilterMode = 'maximum'): FilterState<any> => ({
  value: null,
  mode: defaultMode
});

// Initial state
const createInitialState = (): AdvancedSearchState => ({
  title: '',
  definition: '',
  strength: createEmptyFilterState(),
  svp: createEmptyFilterState('equal'),
  posturals: {
    climbing: createEmptyFilterState(),
    balancing: createEmptyFilterState(),
    stooping: createEmptyFilterState(),
    kneeling: createEmptyFilterState(),
    crouching: createEmptyFilterState(),
    crawling: createEmptyFilterState()
  },
  // ... initialize other categories similarly
});

// Reducer
const advancedSearchReducer = (
  state: AdvancedSearchState, 
  action: AdvancedSearchAction
): AdvancedSearchState => {
  switch (action.type) {
    case 'SET_FILTER_VALUE':
      return set({ ...state }, `${action.path}.value`, action.value);
    
    case 'SET_FILTER_MODE':
      return set({ ...state }, `${action.path}.mode`, action.mode);
    
    case 'RESET_FILTERS':
      return createInitialState();
    
    default:
      return state;
  }
};

// Hook
export const useAdvancedFilters = () => {
  const [state, dispatch] = useReducer(advancedSearchReducer, createInitialState());

  const setFilterValue = useCallback((path: string, value: any) => {
    dispatch({ type: 'SET_FILTER_VALUE', path, value });
  }, []);

  const setFilterMode = useCallback((path: string, mode: FilterMode) => {
    dispatch({ type: 'SET_FILTER_MODE', path, mode });
  }, []);

  const resetFilters = useCallback(() => {
    dispatch({ type: 'RESET_FILTERS' });
  }, []);

  const getApiParams = useCallback(() => {
    const params: Record<string, any> = {};
    
    const processFilter = (path: string, filter: FilterState<any>) => {
      if (!filter.value) return;
      
      const paramName = path.replace(/\./g, '');
      switch (filter.mode) {
        case 'maximum':
          params[`${paramName}Max`] = filter.value;
          break;
        case 'equal':
          params[`${paramName}`] = filter.value;
          break;
        case 'minimum':
          params[`${paramName}Min`] = filter.value;
          break;
      }
    };

    // Process all filters recursively
    const processFilters = (obj: any, basePath = '') => {
      Object.entries(obj).forEach(([key, value]) => {
        const currentPath = basePath ? `${basePath}.${key}` : key;
        if (value && typeof value === 'object') {
          if ('value' in value && 'mode' in value) {
            processFilter(currentPath, value as FilterState<any>);
          } else {
            processFilters(value, currentPath);
          }
        }
      });
    };

    processFilters(state);
    return params;
  }, [state]);

  return {
    filters: state,
    setFilterValue,
    setFilterMode,
    resetFilters,
    getApiParams
  };
};