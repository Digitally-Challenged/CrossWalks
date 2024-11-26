// src/features/CrossWalk/components/DOTJobModal/TempAptTab.tsx
import React from 'react';
import { JobData, AptitudeLevel } from './../../types/job';
import DefinitionToolTip from './DefinitionToolTip';
import { ChevronRight } from 'lucide-react';
import { Temperaments, Aptitudes, AptitudeLevelDescriptions } from '../../utils/tooltipDefinitions';

interface TempAptTabProps {
  job: JobData;
}

const TempAptTab: React.FC<TempAptTabProps> = ({ job }) => {
  const renderSection = (title: string, content: React.ReactNode) => (
    <div className="mb-6 bg-gray-800 p-4 rounded-lg">
      <h3 className="text-xl font-semibold text-blue-300 mb-4">{title}</h3>
      {content}
    </div>
  );

  const renderTemperament = (code: string, description: string) => (
    <div key={code} className="mb-4">
      <h4 className="text-lg font-semibold text-white">
        <DefinitionToolTip type="Temperament" value={code}>
          <span>{code} {Temperaments[code]}</span>
        </DefinitionToolTip>
      </h4>
      <p className="text-gray-300 mt-1">{description}</p>
    </div>
  );

  const renderAptitude = (name: string, aptitude: { level: AptitudeLevel; description: string }) => (
    <div key={name} className="flex justify-between items-center py-2 border-b border-gray-700">
      <DefinitionToolTip type="Aptitude" value={name}>
        <span className="text-gray-300">{Aptitudes[name]}</span>
      </DefinitionToolTip>
      <div className="flex items-center">
        <DefinitionToolTip type="AptitudeLevel" value={aptitude.level.toString()}>
          <span className="font-medium text-white">
            {aptitude.level} - {AptitudeLevelDescriptions[aptitude.level]?.interpretation}
          </span>
        </DefinitionToolTip>
        <ChevronRight className="ml-2 text-gray-400" size={18} />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {renderSection('Temperaments', (
        <>
          {job.temperaments.code.split('').map((code) =>
            renderTemperament(code, job.temperaments.description)
          )}
        </>
      ))}

      {renderSection('Aptitudes', (
        <>
          {Object.entries(job.aptitudes).map(([key, value]) =>
            renderAptitude(key, value)
          )}
        </>
      ))}
    </div>
  );
};

export default React.memo(TempAptTab);