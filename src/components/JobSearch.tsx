import { useState, useCallback } from 'react';
import { SearchInput } from './SearchInput';
import SearchResults from './SearchResults';
import { useDebounce } from '../hooks/useDebounce';
import { useJobSearch } from '../hooks/useJobSearch';
import type { JobData, SearchColumn } from '../types/job';

export function JobSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchColumn, setSearchColumn] = useState<SearchColumn>('Title');
  const [page, setPage] = useState(1);
  const limit = 20;

  const debouncedSearchTerm = useDebounce(searchTerm);

  const { data, isLoading, error, fetchNextPage, hasNextPage } = useJobSearch({
    search_term: debouncedSearchTerm,
    search_column: searchColumn,
    limit,
    offset: (page - 1) * limit,
    sort_field: searchColumn,
    sort_order: 'asc',
  });

  const handleJobClick = useCallback((job: JobData) => {
    console.log('Selected job:', job);
  }, []);

  const handleLoadMore = useCallback(async () => {
    await fetchNextPage();
  }, [fetchNextPage]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          DOT Job Search
        </h1>

        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          onModeChange={setSearchColumn}
          searchColumn={searchColumn}
          isLoading={isLoading}
        />

        <SearchResults
          jobs={data?.results || []}
          isLoading={isLoading}
          error={error as Error | null}
          onJobSelect={handleJobClick}
          hasPerformedSearch={Boolean(debouncedSearchTerm)}
          onLoadMore={handleLoadMore}
          hasNextPage={hasNextPage}
        />
      </div>
    </div>
  );
}