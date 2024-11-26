import React from 'react';
import { JobData } from '../../types/job';
import DefinitionToolTip from './DefinitionToolTip';

interface DOTTabProps {
  job: JobData;
}

const DOTTab: React.FC<DOTTabProps> = ({ job }) => {
  return (
    <div className="space-y-6">
      {/* Header Information */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-300">DOT Code</h3>
            <p className="text-blue-400 font-mono">{job.dotCode}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-300">Industry</h3>
            <p className="text-blue-400">{job.industryDesignation || 'Not specified'}</p>
          </div>
        </div>
      </div>

      {/* Definition */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-300 mb-2">Definition</h3>
        <p className="text-gray-200 whitespace-pre-wrap">{job.definition}</p>
      </div>

      {/* Worker Functions */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-300 mb-4">Worker Functions</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <DefinitionToolTip
              type="WorkerFunction"
              value={`${job.workerFunctions.data.level} ${job.workerFunctions.data.description}`}
              area="data"
            >
              <h4 className="text-gray-300">Data</h4>
            </DefinitionToolTip>
            <p className="text-blue-400">{job.workerFunctions.data.description}</p>
          </div>
          <div>
            <DefinitionToolTip
              type="WorkerFunction"
              value={`${job.workerFunctions.people.level} ${job.workerFunctions.people.description}`}
              area="people"
            >
              <h4 className="text-gray-300">People</h4>
            </DefinitionToolTip>
            <p className="text-blue-400">{job.workerFunctions.people.description}</p>
          </div>
          <div>
            <DefinitionToolTip
              type="WorkerFunction"
              value={`${job.workerFunctions.things.level} ${job.workerFunctions.things.description}`}
              area="things"
            >
              <h4 className="text-gray-300">Things</h4>
            </DefinitionToolTip>
            <p className="text-blue-400">{job.workerFunctions.things.description}</p>
          </div>
        </div>
      </div>

      {/* SVP and Strength */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <DefinitionToolTip type="SVP" value={job.svp.level}>
            <h3 className="text-lg font-semibold text-gray-300">SVP Level</h3>
          </DefinitionToolTip>
          <p className="text-blue-400">{job.svp.level} - {job.svp.description}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <DefinitionToolTip type="Strength" value={job.strength.level}>
            <h3 className="text-lg font-semibold text-gray-300">Physical Demands</h3>
          </DefinitionToolTip>
          <p className="text-blue-400">{job.strength.level} - {job.strength.description}</p>
        </div>
      </div>

      {/* GED */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-300 mb-4">General Educational Development</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <DefinitionToolTip
              type="GED"
              value={job.generalEducationalDevelopment.reasoning.level}
              area="reasoning"
            >
              <h4 className="text-gray-300">Reasoning</h4>
            </DefinitionToolTip>
            <p className="text-blue-400">Level {job.generalEducationalDevelopment.reasoning.level}</p>
          </div>
          <div>
            <DefinitionToolTip
              type="GED"
              value={job.generalEducationalDevelopment.math.level}
              area="math"
            >
              <h4 className="text-gray-300">Mathematical</h4>
            </DefinitionToolTip>
            <p className="text-blue-400">Level {job.generalEducationalDevelopment.math.level}</p>
          </div>
          <div>
            <DefinitionToolTip
              type="GED"
              value={job.generalEducationalDevelopment.language.level}
              area="language"
            >
              <h4 className="text-gray-300">Language</h4>
            </DefinitionToolTip>
            <p className="text-blue-400">Level {job.generalEducationalDevelopment.language.level}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DOTTab;