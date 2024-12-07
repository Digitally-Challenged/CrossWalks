import React, { useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import type { JobData } from '../types/job';
import JobCard from './JobCard';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { Alert } from 'flowbite-react';

interface JobListProps {
  jobs: JobData[];
  isLoading: boolean;
  error: Error | null;
  onJobSelect: (job: JobData) => void;
}

const JobList: React.FC<JobListProps> = React.memo(({ jobs, isLoading, error, onJobSelect }) => {
  if (isLoading && !jobs.length) {
    return (
      <div className="flex justify-center items-center h-full min-h-[400px] bg-gray-800 rounded-lg">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <Alert color="failure" className="mb-4">
        <span className="font-medium">Error!</span> {error.message}
      </Alert>
    );
  }

  if (jobs.length === 0) {
    return (
      <Alert color="info" className="mb-4">
        No jobs found. Please adjust your search criteria.
      </Alert>
    );
  }

  const Row = useCallback(({ index, style }: { index: number; style: React.CSSProperties }) => {
    const job = jobs[index];
    return job ? (
      <div style={style} className="px-3 py-2">
        <JobCard job={job} onClick={() => onJobSelect(job)} />
      </div>
    ) : null;
  }, [jobs, onJobSelect]);

  return (
    <div className="h-[600px] w-full bg-gray-800 rounded-lg shadow-lg border border-gray-700">
      <AutoSizer>
        {({ height, width }: { height: number; width: number }) => (
          <List
            height={height}
            itemCount={jobs.length}
            itemSize={166} // 150px card height + 16px padding
            width={width}
            className="scrollbar-thin scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500 scrollbar-track-gray-800"
            overscanCount={5}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </div>
  );
});

JobList.displayName = 'JobList';

export default JobList;