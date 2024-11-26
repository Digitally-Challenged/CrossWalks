// src/components/DOTJobModal/WFMPSMSTab.tsx
import React from 'react';
import { JobData } from '../../types/job';

interface WFMPSMSTabProps {
  job: JobData;
}

const WFMPSMSTab: React.FC<WFMPSMSTabProps> = ({ job }) => {
  const renderSection = (title: string, data: { code: string; description: string }[]) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-blue-300 mb-2">{title}</h3>
      {data.map((item, index) => (
        <div key={index} className="mb-2">
          <span className="font-medium text-gray-300">{item.code}</span>
          <span className="ml-2">{item.description}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {renderSection('Work Fields', [
        { code: job.workField.code, description: job.workField.description },
      ])}
      {renderSection('MPSMS', [
        { code: job.mpsmsCode.code, description: job.mpsmsCode.description },
      ])}
    </div>
  );
};

export default WFMPSMSTab;