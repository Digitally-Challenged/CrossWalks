import { useInfiniteQuery } from '@tanstack/react-query';
import { searchJobs } from '../api/client';
import type { SearchParams } from '../types/job';

export function useJobSearch(params: SearchParams) {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['jobs', params],
    queryFn: ({ pageParam = 0 }) => 
      searchJobs({
        ...params,
        offset: pageParam * (params.limit || 20),
      }),
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.length * (params.limit || 20);
      return totalFetched < (lastPage.total_count || 0)
        ? allPages.length
        : undefined;
    },
    enabled: Boolean(params.search_term),
    keepPreviousData: true,
  });

  const flattenedResults = data?.pages.flatMap(page => page.results) || [];

  return {
    data: {
      results: flattenedResults,
      total_count: data?.pages[0]?.total_count || 0,
    },
    isLoading,
    error,
    fetchNextPage,
    hasNextPage: Boolean(hasNextPage),
  };
}