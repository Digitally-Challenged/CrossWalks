import React, { useCallback } from 'react';
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
  error: Error | null;
  onJobSelect: (job: JobData) => void;
  hasPerformedSearch: boolean;
  onLoadMore: () => Promise<void>;
  hasNextPage: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  jobs,
  isLoading,
  error,
  onJobSelect,
  hasPerformedSearch,
  onLoadMore,
  hasNextPage,
}) => {
  const itemCount = hasNextPage ? jobs.length + 1 : jobs.length;

  const isItemLoaded = useCallback(
    (index: number) => !hasNextPage || index < jobs.length,
    [hasNextPage, jobs.length]
  );

  const loadMoreItems = useCallback(
    () => {
      if (!hasNextPage) return Promise.resolve();
      return onLoadMore();
    },
    [hasNextPage, onLoadMore]
  );

  const Row = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      if (!isItemLoaded(index)) {
        return (
          <div style={style} className="flex items-center justify-center p-4">
            <LoadingSpinner size="sm" />
          </div>
        );
      }

      const job = jobs[index];
      if (!job) return null;

      return (
        <div style={style} className="p-2">
          <JobCard job={job} onClick={() => onJobSelect(job)} />
        </div>
      );
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
        <LoadingSpinner size="lg" />
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-red-50 border-l-4 border-red-400 p-4 rounded"
      >
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-red-700">
              {error.message}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!hasPerformedSearch) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-center text-gray-500 mt-8"
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
        className="text-center text-gray-500 mt-8"
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
      className="h-[600px] w-full mt-4"
    >
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={itemCount}
            loadMoreItems={loadMoreItems}
          >
            {({ onItemsRendered, ref }) => (
              <List
                height={height}
                itemCount={itemCount}
                itemSize={166} // 150px card + 16px padding
                width={width}
                onItemsRendered={onItemsRendered}
                ref={ref}
              >
                {Row}
              </List>
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </motion.div>
  );
};

export default SearchResults;