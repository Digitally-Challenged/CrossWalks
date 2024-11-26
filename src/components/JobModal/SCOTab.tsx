// src/components/DOTJobModal/SCOTab.tsx
import React from 'react';
import { JobData, FrequencyLevel } from '../../types/job';
import DefinitionToolTip from './DefinitionToolTip';
import { ChevronRight, User, Hand, Eye, Ear, CloudSun } from 'lucide-react';

interface SCOTabProps {
  job: JobData;
}

const FrequencyLevelMap: Record<FrequencyLevel, string> = {
  'Not Present': 'NP',
  'Occasionally': 'O',
  'Frequently': 'F',
  'Constantly': 'C',
};

const SectionHeader: React.FC<{ title: string; Icon: React.ElementType }> = ({ title, Icon }) => (
  <h3 className="text-lg font-semibold text-gray-400 mb-2 flex items-center">
    <Icon className="mr-2" size={20} />
    {title}
  </h3>
);

const CharacteristicItem: React.FC<{ label: string; value: FrequencyLevel | string }> = ({ label, value }) => {
  const displayValue = typeof value === 'string' ? FrequencyLevelMap[value as FrequencyLevel] || value : value;
  
  return (
    <div className="flex items-center justify-between p-3 border-b border-gray-700 last:border-b-0">
      <span className="text-white text-lg capitalize">{label}</span>
      <div className="flex items-center">
        <DefinitionToolTip type="FrequencyLevel" value={value as string}>
          <span className="text-gray-300 mr-2">{displayValue}</span>
        </DefinitionToolTip>
        <ChevronRight className="text-gray-500" size={20} />
      </div>
    </div>
  );
};

const CharacteristicsSection: React.FC<{ title: string; data: Record<string, FrequencyLevel | string>; Icon: React.ElementType }> = ({ title, data, Icon }) => (
  <section className="mb-6">
    <SectionHeader title={title} Icon={Icon} />
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      {Object.entries(data).map(([key, value]) => (
        <CharacteristicItem key={key} label={key} value={value} />
      ))}
    </div>
  </section>
);

const SCOTab: React.FC<SCOTabProps> = ({ job }) => {
  if (!job.characteristics) {
    return <div className="text-red-500">Error: Job data is incomplete</div>;
  }

  return (
    <div className="space-y-6">
      <CharacteristicsSection title="POSTURAL CHARACTERISTICS" data={job.characteristics.postural} Icon={User} />
      <CharacteristicsSection title="MANIPULATIVE CHARACTERISTICS" data={job.characteristics.manipulative} Icon={Hand} />
      <CharacteristicsSection title="SENSORY CHARACTERISTICS" data={job.characteristics.sensory} Icon={Ear} />
      <CharacteristicsSection title="VISUAL CHARACTERISTICS" data={job.characteristics.visual} Icon={Eye} />
      <CharacteristicsSection title="ENVIRONMENTAL CHARACTERISTICS" data={job.characteristics.environmental} Icon={CloudSun} />
    </div>
  );
};

export default React.memo(SCOTab);