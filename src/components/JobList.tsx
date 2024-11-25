import React, { useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import type { JobData } from '../types/job';
import JobCard from './JobCard';
import { LoadingSpinner } from './ui/LoadingSpinner';

interface JobListProps {
  jobs: JobData[];
  isLoading: boolean;
  error: Error | null;
  onJobSelect: (job: JobData) => void;
}

const JobList: React.FC<JobListProps> = React.memo(({ jobs, isLoading, error, onJobSelect }) => {
  if (isLoading && !jobs.length) {
    return (
      <div className="flex justify-center items-center h-full">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error.message}</div>;
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No jobs found. Please adjust your search criteria.
      </div>
    );
  }

  const Row = React.memo(({ index, style }: { index: number; style: React.CSSProperties }) => {
    const job = jobs[index];
    return job ? (
      <div style={style}>
        <JobCard job={job} onClick={() => onJobSelect(job)} />
      </div>
    ) : null;
  });

  Row.displayName = 'JobRow';

  return (
    <div className="h-[600px] w-full">
      <AutoSizer>
        {({ height, width }: { height: number; width: number }) => (
          <List
            height={height}
            itemCount={jobs.length}
            itemSize={150}
            width={width}
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