import React, { useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';
import LoadingSpinner from './ui/LoadingSpinner';
import JobCard from './JobCard';
import type { JobData } from '../types/job';

interface SearchResultsProps {
  jobs: JobData[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  error: Error | null;
  onJobSelect: (job: JobData) => void;
  hasPerformedSearch: boolean;
  onLoadMore: () => Promise<void>;
  hasNextPage: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = React.memo(({
  jobs,
  isLoading,
  isFetchingNextPage,
  error,
  onJobSelect,
  hasPerformedSearch,
  onLoadMore,
  hasNextPage,
}) => {
  // Memoize itemCount calculation
  const itemCount = useMemo(() => 
    hasNextPage ? jobs.length + 1 : jobs.length,
    [hasNextPage, jobs.length]
  );

  const isItemLoaded = useCallback(
    (index: number) => !hasNextPage || index < jobs.length,
    [hasNextPage, jobs.length]
  );

  const loadMoreItems = useCallback(
    async (startIndex: number, stopIndex: number) => {
      if (!hasNextPage || isFetchingNextPage) {
        return;
      }
      try {
        await onLoadMore();
      } catch (error) {
        console.error('[SearchResults] Error loading more items:', error);
      }
    },
    [hasNextPage, isFetchingNextPage, onLoadMore]
  );

  const Row = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      if (!isItemLoaded(index)) {
        return (
          <div style={style} className="flex items-center justify-center p-4">
            <LoadingSpinner 
              size="sm" 
              className="transition-opacity duration-200"
              aria-label="Loading more items"
            />
          </div>
        );
      }

      const job = jobs[index];
      return job ? (
        <div style={style} className="p-2">
          <JobCard job={job} onClick={() => onJobSelect(job)} />
        </div>
      ) : null;
    },
    [jobs, onJobSelect, isItemLoaded]
  );

  if (isLoading && !jobs.length) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex justify-center items-center h-64"
      >
        <LoadingSpinner size="lg" aria-label="Loading results" />
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-4 rounded"
      >
        <p className="text-sm text-red-700 dark:text-red-400">
          {error.message}
        </p>
      </motion.div>
    );
  }

  if (!hasPerformedSearch) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-center text-gray-500 dark:text-gray-400 mt-8"
      >
        Enter a search term to find jobs
      </motion.div>
    );
  }

  if (jobs.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-center text-gray-500 dark:text-gray-400 mt-8"
      >
        No jobs found. Please try a different search.
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-[600px] w-full mt-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
    >
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={itemCount}
            loadMoreItems={loadMoreItems}
            threshold={5}
          >
            {({ onItemsRendered, ref }) => (
              <List
                height={height}
                itemCount={itemCount}
                itemSize={166}
                width={width}
                onItemsRendered={onItemsRendered}
                ref={ref}
                className="scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
                overscanCount={3}
              >
                {Row}
              </List>
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </motion.div>
  );
});

SearchResults.displayName = 'SearchResults';

export default SearchResults;