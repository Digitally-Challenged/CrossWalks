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
  StrengthAbbrev
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

export const UI_TO_API_STRENGTH: Record<StrengthAbbrev, StrengthFullName> = {
  'Sed': 'Sedentary',
  'Lt': 'Light',
  'Med': 'Medium',
  'Hvy': 'Heavy',
  'V Hvy': 'Very Heavy'
};

export const API_TO_UI_STRENGTH: Record<StrengthFullName, StrengthAbbrev> = {
  'Sedentary': 'Sed',
  'Light': 'Lt',
  'Medium': 'Med',
  'Heavy': 'Hvy',
  'Very Heavy': 'V Hvy'
};

export const STRENGTH_TO_NUMBER: Record<StrengthFullName, number> = {
  'Sedentary': 1,
  'Light': 2,
  'Medium': 3,
  'Heavy': 4,
  'Very Heavy': 5
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
  } = useInfiniteQuery<
    SearchResponse,
    Error,
    JobSearchData,
    ['advancedJobs', InternalFilters],
    number
  >({
    queryKey: ['advancedJobs', filters],
    queryFn: async ({ pageParam }) => {
      try {
        console.group('🔍 Advanced Search Request');
        console.log('Page Parameter:', pageParam);
        console.log('Current Filters:', JSON.stringify(filters, null, 2));

        if (filters.strength) {
          console.log('Strength Details:', {
            value: filters.strength,
            type: typeof filters.strength,
            number: getStrengthNumber(filters.strength),
            isAbbrev: Object.keys(UI_TO_API_STRENGTH).includes(filters.strength)
          });
        }

        const apiParams = apiAdvDatabaseService.prepareAdvancedSearchParams(filters);
        console.log('📝 API Parameters:', JSON.stringify(apiParams, null, 2));

        const paginationParams: PaginationParams = {
          limit: 20,
          offset: pageParam * 20,
          sort_field: 'Title',
          sort_order: 'asc'
        };
        console.log('📄 Pagination Parameters:', paginationParams);

        const response = await apiAdvDatabaseService.advancedSearchJobs(
          apiParams,
          paginationParams
        );

        console.log('✅ Search Response:', {
          total_count: response.total_count,
          results_count: response.results.length,
          first_result: response.results[0]?.Title || 'No results'
        });
        console.groupEnd();

        return response;
      } catch (err) {
        console.group('❌ Search Error');
        console.error('Error details:', err);
        console.error('Failed request details:', {
          filters,
          pageParam,
          hasPerformedSearch
        });
        console.groupEnd();
        throw err;
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      console.log('📊 Pagination Info:', {
        currentPages: allPages.length,
        totalFetched: allPages.length * lastPage.limit,
        totalAvailable: lastPage.total_count,
        hasMore: (allPages.length * lastPage.limit) < lastPage.total_count
      });

      const totalFetched = allPages.length * lastPage.limit;
      const hasMore = totalFetched < lastPage.total_count;
      return hasMore ? allPages.length : undefined;
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
        const strengthValue = UI_TO_API_STRENGTH[value as StrengthAbbrev] || value;
        current[lastKey] = strengthValue as StrengthLevel;
        
        console.log('💪 Strength conversion:', {
          input: value,
          converted: strengthValue,
          number: getStrengthNumber(strengthValue),
          isValidStrength: strengthValue in STRENGTH_TO_NUMBER
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
    loadMore: fetchNextPage,
    hasPerformedSearch,
    totalCount,
  };
};

export const getStrengthNumber = (strength: StrengthLevel): number => {
  const fullName = UI_TO_API_STRENGTH[strength as StrengthAbbrev] || strength;
  return STRENGTH_TO_NUMBER[fullName as StrengthFullName];
};