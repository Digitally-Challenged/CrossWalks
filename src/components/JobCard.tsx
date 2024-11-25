import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ChevronRight } from 'lucide-react';
import { JobData } from '../types/job';

interface JobCardProps {
  job: JobData;
  onClick: () => void;
}

const JobCard: React.FC<JobCardProps> = React.memo(
  ({ job, onClick }) => {
    // Early return if job data is not available
    if (!job) {
      console.warn('JobCard received null or undefined job data');
      return null;
    }

    console.log(`Rendering JobCard for job: ${job.dotCode}`, job);

    return (
      <motion.div
        className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
        layout
        layoutId={job.dotCode}
      >
        <motion.button
          className="w-full h-full p-6 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => {
            console.log(`JobCard clicked: ${job.dotCode}`);
            onClick();
          }}
          whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
          aria-label={`View details for ${job.jobTitle || 'Untitled Job'}`}
        >
          {/* Job title and icon */}
          <div className="flex items-start justify-between">
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center">
                <Briefcase className="mr-2 h-5 w-5 text-blue-400" aria-hidden="true" />
                <span className="truncate">{job.jobTitle || 'Untitled Job'}</span>
              </h3>
              {/* Job details grid */}
              <dl className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
                {/* Industry designation */}
                <div>
                  <dt className="sr-only">Industry</dt>
                  <dd className="text-gray-400">{job.industryDesignation || 'No industry designation'}</dd>
                </div>
                {/* Alternative titles */}
                <div>
                  <dt className="sr-only">Alternative Titles</dt>
                  <dd className="text-blue-300">
                    {job.alternateTitles && job.alternateTitles.length > 0 
                      ? job.alternateTitles.join(', ') 
                      : 'No alternative titles'}
                  </dd>
                </div>
                {/* Strength level */}
                <div>
                  <dt className="text-gray-300">Strength:</dt>
                  <dd className="text-blue-300 font-semibold">{job.strength?.level || 'N/A'}</dd>
                </div>
                {/* SVP level */}
                <div>
                  <dt className="text-gray-300">SVP:</dt>
                  <dd className="text-blue-300 font-semibold">{job.svp?.level || 'N/A'}</dd>
                </div>
              </dl>
            </div>
            {/* DOT code and chevron icon */}
            <div className="flex flex-col items-end ml-4">
              <span className="text-lg font-semibold text-gray-300 mb-2">
                {job.dotCode || 'N/A'}
              </span>
              <ChevronRight className="h-6 w-6 text-blue-400" aria-hidden="true" />
            </div>
          </div>
        </motion.button>
      </motion.div>
    );
  },
  // Memoization comparison function
  (prevProps, nextProps) => {
    const areEqual = prevProps.job.dotCode === nextProps.job.dotCode;
    console.log(`JobCard memoization check: ${areEqual ? 'Skipping re-render' : 'Re-rendering'}`);
    return areEqual;
  }
);

JobCard.displayName = 'JobCard';

export default JobCard;