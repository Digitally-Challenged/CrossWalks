import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import { useState, useCallback, useMemo, useEffect } from 'react';
import apiAdvDatabaseService from '../api/advDataBase/apiAdvDatabaseService';
import { 
  JobData, 
  FrequencyLevel, 
  SVPLevel,
  GEDLevel,
  WorkerFunctionLevel,
  StrengthLevel,
  StrengthFullName,
  StrengthAbbrev,
  STRENGTH_MAPPINGS
} from '../types/job';

interface InternalFilters {
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
}

export const UI_TO_API_FREQUENCY: Record<string, number> = {
  'NP': 0,
  'Occ.': 1,
  'Freq.': 2,
  'Const.': 3
};

export const getStrengthNumber = (strength: StrengthLevel): number => {
  if (!strength) return 0;
  const fullName = STRENGTH_MAPPINGS.UI_TO_API[strength as StrengthAbbrev] || strength;
  return STRENGTH_MAPPINGS.TO_NUMBER[fullName as StrengthFullName] || 0;
};

const initialFilters: InternalFilters = {
  title: '',
  definition: '',
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

interface SearchResponse {
  results: JobData[];
  total_count: number;
  limit: number;
  offset: number;
}

type SortOrder = 'asc' | 'desc';
type SortField = 'Title' | 'JobId';

interface PaginationParams {
  limit: number;
  offset: number;
  sort_field: SortField;
  sort_order: SortOrder;
}

type JobSearchData = InfiniteData<SearchResponse>;

const processSearchResults = (data: JobSearchData | undefined) => {
  return data?.pages.flatMap(page => page.results) || [];
};

// Update the APISearchParams interface to include all possible parameters
interface APISearchParams {
  // Basic fields
  Title?: string;
  Definitions?: string;
  StrengthNum?: number;
  SVPNum?: number;

  // Posturals
  ClimbingNum?: number;
  BalancingNum?: number;
  StoopingNum?: number;
  KneelingNum?: number;
  CrouchingNum?: number;
  CrawlingNum?: number;

  // Manipulative
  ReachingNum?: number;
  HandlingNum?: number;
  FingeringNum?: number;

  // Sensory
  FeelingNum?: number;
  TalkingNum?: number;
  HearingNum?: number;
  TastingNum?: number;

  // Visual
  NearAcuityNum?: number;
  FarAcuityNum?: number;
  DepthNum?: number;
  AccommodationNum?: number;
  ColorVisionNum?: number;
  FieldVisionNum?: number;

  // Environmental
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

  // Worker Functions
  WFData?: number;
  WFPeople?: number;
  WFThings?: number;

  // GED
  GEDR?: number;
  GEDM?: number;
  GEDL?: number;
}

// Improve parameter preparation
const prepareApiParams = (filters: InternalFilters): APISearchParams => {
  const apiParams: APISearchParams = {};

  // Title
  if (filters.title?.trim()) {
    apiParams.Title = filters.title.trim();
  }

  // Definition
  if (filters.definition?.trim()) {
    apiParams.Definitions = filters.definition.trim();
  }

  // Improved Strength handling
  if (filters.strength) {
    apiParams.StrengthNum = getStrengthNumber(filters.strength);
  }

  // Fixed SVP handling
  if (filters.svp) {
    const svpNum = parseInt(filters.svp.toString());
    apiParams.SVPNum = !isNaN(svpNum) ? svpNum : undefined;
  }

  // Posturals
  Object.entries(filters.posturals).forEach(([key, value]) => {
    if (value) {
      const numValue = UI_TO_API_FREQUENCY[value];
      if (numValue !== undefined) {
        switch (key) {
          case 'climbing': apiParams.ClimbingNum = numValue; break;
          case 'balancing': apiParams.BalancingNum = numValue; break;
          case 'stooping': apiParams.StoopingNum = numValue; break;
          case 'kneeling': apiParams.KneelingNum = numValue; break;
          case 'crouching': apiParams.CrouchingNum = numValue; break;
          case 'crawling': apiParams.CrawlingNum = numValue; break;
        }
      }
    }
  });

  // Manipulative
  Object.entries(filters.manipulative).forEach(([key, value]) => {
    if (value) {
      const numValue = UI_TO_API_FREQUENCY[value];
      if (numValue) {
        switch (key) {
          case 'reaching': apiParams.ReachingNum = numValue; break;
          case 'handling': apiParams.HandlingNum = numValue; break;
          case 'fingering': apiParams.FingeringNum = numValue; break;
        }
      }
    }
  });

  // Sensory
  Object.entries(filters.sensory).forEach(([key, value]) => {
    if (value) {
      const numValue = UI_TO_API_FREQUENCY[value];
      if (numValue) {
        switch (key) {
          case 'feeling': apiParams.FeelingNum = numValue; break;
          case 'talking': apiParams.TalkingNum = numValue; break;
          case 'hearing': apiParams.HearingNum = numValue; break;
          case 'tasteSmell': apiParams.TastingNum = numValue; break;
        }
      }
    }
  });

  // Visual
  Object.entries(filters.visual).forEach(([key, value]) => {
    if (value) {
      const numValue = UI_TO_API_FREQUENCY[value];
      if (numValue) {
        switch (key) {
          case 'nearAcuity': apiParams.NearAcuityNum = numValue; break;
          case 'farAcuity': apiParams.FarAcuityNum = numValue; break;
          case 'depthPerception': apiParams.DepthNum = numValue; break;
          case 'accommodation': apiParams.AccommodationNum = numValue; break;
          case 'colorVision': apiParams.ColorVisionNum = numValue; break;
          case 'fieldOfVision': apiParams.FieldVisionNum = numValue; break;
        }
      }
    }
  });

  // Environmental
  Object.entries(filters.environmental).forEach(([key, value]) => {
    if (value) {
      const numValue = UI_TO_API_FREQUENCY[value];
      if (numValue) {
        switch (key) {
          case 'weather': apiParams.WeatherNum = numValue; break;
          case 'extremeCold': apiParams.ColdNum = numValue; break;
          case 'extremeHeat': apiParams.HeatNum = numValue; break;
          case 'wet': apiParams.WetNum = numValue; break;
          case 'noise': apiParams.NoiseNum = numValue; break;
          case 'vibration': apiParams.VibrationNum = numValue; break;
          case 'atmosphericConditions': apiParams.AtmosphereNum = numValue; break;
          case 'movingMechanicalParts': apiParams.MovingNum = numValue; break;
          case 'electricShock': apiParams.ElectricityNum = numValue; break;
          case 'highPlaces': apiParams.HeightNum = numValue; break;
          case 'radiation': apiParams.RadiationNum = numValue; break;
          case 'explosives': apiParams.ExplosionNum = numValue; break;
          case 'toxicChemicals': apiParams.ToxicNum = numValue; break;
          case 'other': apiParams.OtherNum = numValue; break;
        }
      }
    }
  });

  // Worker Functions
  Object.entries(filters.workerFunctions).forEach(([key, value]) => {
    if (value) {
      const numValue = parseInt(value);
      if (!isNaN(numValue)) {
        switch (key) {
          case 'data': apiParams.WFData = numValue; break;
          case 'people': apiParams.WFPeople = numValue; break;
          case 'things': apiParams.WFThings = numValue; break;
        }
      }
    }
  });

  // GED
  Object.entries(filters.generalEducationalDevelopment).forEach(([key, value]) => {
    if (value) {
      const numValue = parseInt(value);
      if (!isNaN(numValue)) {
        switch (key) {
          case 'reasoning': apiParams.GEDR = numValue; break;
          case 'math': apiParams.GEDM = numValue; break;
          case 'language': apiParams.GEDL = numValue; break;
        }
      }
    }
  });

  console.log('🔍 Prepared API params:', apiParams);
  return Object.fromEntries(
    Object.entries(apiParams).filter(([_, value]) => 
      value !== undefined && value !== null && !isNaN(value as number)
    )
  ) as APISearchParams;
};

// Add validation before API call
const validateSearchParams = (params: APISearchParams): boolean => {
  return Object.values(params).every(value => 
    value !== undefined && value !== null && 
    (typeof value === 'string' || !isNaN(value as number))
  );
};

export const useAdvancedSearch = () => {
  const [filters, setFilters] = useState<InternalFilters>(initialFilters);
  const [hasPerformedSearch, setHasPerformedSearch] = useState(false);

  useEffect(() => {
    console.log('🔄 Current filters state:', JSON.stringify(filters, null, 2));
  }, [filters]);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch
  } = useInfiniteQuery<SearchResponse, Error>({
    queryKey: ['advancedJobs', filters],
    queryFn: async ({ pageParam = 0 }) => {
      const apiParams = prepareApiParams(filters);
      
      if (!validateSearchParams(apiParams)) {
        throw new Error('Invalid search parameters');
      }

      const paginationParams: PaginationParams = {
        limit: 20,
        offset: pageParam as number,
        sort_field: 'Title',
        sort_order: 'asc'
      };
      
      console.log('🔍 Search Parameters:', {
        filters: apiParams,
        pagination: paginationParams
      });

      const response = await apiAdvDatabaseService.advancedSearchJobs(
        apiParams as APISearchParams,
        paginationParams
      );

      if (!response) {
        throw new Error('No response received from search');
      }

      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.length * lastPage.limit;
      return totalFetched < lastPage.total_count ? totalFetched : undefined;
    },
    enabled: hasPerformedSearch,
    staleTime: 5 * 60 * 1000,
    retry: 1
  });

  const updateFilters = useCallback((path: string, value: any) => {
    console.group('🔄 Filter Update');
    console.log('Path:', path);
    console.log('Value:', {
      raw: value,
      type: typeof value,
      isNull: value === null,
      isEmptyString: value === ''
    });
    
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters };
      const keys = path.split('.');
      let current: any = newFilters;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      const lastKey = keys[keys.length - 1];
      
      if (lastKey === 'strength') {
        // Handle strength values directly since they're now in the correct format
        current[lastKey] = value as StrengthLevel;
        
        console.log('💪 Strength conversion:', {
          input: value,
          converted: value,
          number: value === 'Sedentary' ? 1 : parseInt(value),
          isValidStrength: true
        });
      } else {
        current[lastKey] = value;
      }
      
      console.log('Updated filters:', JSON.stringify(newFilters, null, 2));
      console.groupEnd();
      return newFilters;
    });
    
    setHasPerformedSearch(false);
  }, []);

  useEffect(() => {
    if (error) {
      console.group('🚨 Search Error');
      console.error('Error:', error);
      console.error('Current state:', {
        hasPerformedSearch,
        filters: JSON.stringify(filters, null, 2),
        isLoading,
        hasNextPage
      });
      console.groupEnd();
    }
  }, [error, filters, hasPerformedSearch, isLoading, hasNextPage]);

  const submitSearch = useCallback(async () => {
    setHasPerformedSearch(true);
    await refetch();
  }, [refetch]);

  const resetFilters = useCallback(() => {
    console.log('Resetting filters');
    setFilters(initialFilters);
    setHasPerformedSearch(false);
  }, []);

  const jobs = useMemo(() => 
    processSearchResults(data), 
    [data]
  );

  const totalCount = useMemo(() => 
    data?.pages[0]?.total_count || 0,
    [data?.pages]
  );

  const loadMore = useCallback(async (): Promise<void> => {
    await fetchNextPage();
  }, [fetchNextPage]);

  return {
    filters,
    updateFilters,
    jobs,
    isLoading,
    error,
    submitSearch,
    resetFilters,
    hasNextPage: Boolean(hasNextPage),
    isFetchingNextPage,
    fetchNextPage: loadMore,
    hasPerformedSearch,
    totalCount,
  };
};