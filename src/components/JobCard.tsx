import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ChevronRight } from 'lucide-react';
import { JobData } from '../types/job';
import { DOTJobModal } from './JobModal';

interface JobCardProps {
  job: JobData;
  onClick: () => void;
}

const JobCard: React.FC<JobCardProps> = React.memo(({ job, onClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
    onClick();
  };

  return (
    <>
      <motion.div
        className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 p-4"
        layout
        layoutId={job.dotCode}
      >
        <motion.button
          className="w-full h-full text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleClick}
          whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
        >
          <div className="flex items-start justify-between">
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center">
                <Briefcase className="mr-2 h-5 w-5 text-blue-400" />
                <span className="truncate">{job.jobTitle || 'Untitled Job'}</span>
              </h3>
              <dl className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
                <div>
                  <dt className="sr-only">Industry</dt>
                  <dd className="text-gray-400">{job.industryDesignation || 'No industry designation'}</dd>
                </div>
                <div>
                  <dt className="sr-only">Alternative Titles</dt>
                  <dd className="text-blue-300">
                    {job.alternateTitles && job.alternateTitles.length > 0 
                      ? job.alternateTitles[0]
                      : 'No alternative titles'}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-300">Strength:</dt>
                  <dd className="text-blue-300 font-semibold">{job.strength?.level || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-gray-300">SVP:</dt>
                  <dd className="text-blue-300 font-semibold">{job.svp?.level || 'N/A'}</dd>
                </div>
              </dl>
            </div>
            <div className="flex flex-col items-end ml-4">
              <span className="text-lg font-semibold text-gray-300 mb-2">
                {job.dotCode || 'N/A'}
              </span>
              <ChevronRight className="h-6 w-6 text-blue-400" />
            </div>
          </div>
        </motion.button>
      </motion.div>

      <DOTJobModal
        job={job}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
});

JobCard.displayName = 'JobCard';

export default JobCard;