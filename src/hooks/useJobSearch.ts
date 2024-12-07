import { useInfiniteQuery } from '@tanstack/react-query';
import { searchJobs } from '../api/client';
import type { SearchParams, JobData } from '../types/job';
import type { 
  InfiniteData, 
  InfiniteQueryObserverResult,
  FetchNextPageOptions,
  QueryKey
} from '@tanstack/react-query';

interface JobResponse {
  results: JobData[];
  total_count: number;
}

interface JobSearchResult {
  data: {
    results: JobData[];
    total_count: number;
  };
  isLoading: boolean;
  error: Error | null;
  fetchNextPage: (options?: FetchNextPageOptions) => Promise<InfiniteQueryObserverResult<InfiniteData<JobResponse, unknown>, Error>>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export function useJobSearch(params: SearchParams): JobSearchResult {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery<JobResponse, Error, InfiniteData<JobResponse>, QueryKey, number>({
    queryKey: ['jobs', params] as const,
    queryFn: ({ pageParam }) => 
      searchJobs({
        ...params,
        offset: (pageParam as number || 0) * (params.limit || 20),
      }),
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.length * (params.limit || 20);
      return totalFetched < lastPage.total_count ? allPages.length : undefined;
    },
    enabled: Boolean(params.search_term),
    initialPageParam: 0,
  });

  const flattenedResults = data?.pages.flatMap(page => page.results) || [];
  const totalCount = data?.pages[0]?.total_count || 0;

  return {
    data: {
      results: flattenedResults,
      total_count: totalCount,
    },
    isLoading,
    error,
    fetchNextPage,
    hasNextPage: Boolean(hasNextPage),
    isFetchingNextPage: Boolean(isFetchingNextPage),
  };
}