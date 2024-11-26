import React, { useState, useCallback } from 'react';
import { SearchInput } from './SearchInput';
import SearchResults from './SearchResults';
import { useDebounce } from '../hooks/useDebounce';
import { useJobSearch } from '../hooks/useJobSearch';
import type { JobData, SearchColumn } from '../types/job';
import { Sliders } from 'lucide-react';
import { Button } from './ui';

interface JobSearchProps {
  onAdvancedClick: () => void;
}

const JobSearch: React.FC<JobSearchProps> = ({ onAdvancedClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchColumn, setSearchColumn] = useState<SearchColumn>('Title');
  const [page, setPage] = useState(1);
  const limit = 20;

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

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
    <div>
      <div className="flex justify-end mb-8">
        <Button
          variant="outline"
          onClick={onAdvancedClick}
          className="flex items-center gap-2"
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
  );
};

export default JobSearch;