import React, { useState, useCallback } from 'react';
import { SearchInput } from './SearchInput';
import SearchResults from './SearchResults';
import { JobSortControls } from './JobFilters';
import { useDebounce } from '../hooks/useDebounce';
import { useJobSearch } from '../hooks/useJobSearch';
import type { JobData, SearchColumn, SortByType } from '../types/job';
import { Sliders } from 'lucide-react';
import { Button } from './ui';

interface JobSearchProps {
  onAdvancedClick: () => void;
}

const JobSearch: React.FC<JobSearchProps> = ({ onAdvancedClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchColumn, setSearchColumn] = useState<SearchColumn>('Title');
  const [sortField, setSortField] = useState<SortByType>('Title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const limit = 20;

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { 
    data, 
    isLoading, 
    error, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage = false
  } = useJobSearch({
    search_term: debouncedSearchTerm,
    search_column: searchColumn,
    limit,
    offset: (page - 1) * limit,
    sort_field: sortField,
    sort_order: sortOrder,
  });

  const handleJobClick = useCallback((job: JobData) => {
    console.log('Selected job:', job);
  }, []);

  const handleLoadMore = useCallback(async () => {
    setPage(prevPage => prevPage + 1);
    await fetchNextPage();
  }, [fetchNextPage]);

  return (
    <div className="flex flex-col space-y-4 bg-gray-900 min-h-screen p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl text-white">Results ({data?.total_count || 0})</h1>
        <Button
          variant="ghost"
          onClick={onAdvancedClick}
          className="flex items-center gap-2 text-gray-300 hover:text-white"
        >
          <Sliders className="w-4 h-4" />
          Advanced Search
        </Button>
      </div>

      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        onModeChange={setSearchColumn}
        searchColumn={searchColumn}
      />

      <JobSortControls
        sortField={sortField}
        sortOrder={sortOrder}
        onSortChange={setSortField}
        onOrderChange={setSortOrder}
      />

      <SearchResults
        jobs={data?.results || []}
        isLoading={isLoading}
        error={error as Error | null}
        onJobSelect={handleJobClick}
        hasPerformedSearch={Boolean(debouncedSearchTerm)}
        onLoadMore={handleLoadMore}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
};

export default JobSearch;