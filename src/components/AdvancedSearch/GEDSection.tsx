import React from 'react';
import { BookOpen } from 'lucide-react';
import { renderOptions } from '../../utils/helpers';

interface GEDSectionProps {
  ged: {
    reasoning: string;
    math: string;
    language: string;
  };
  setGed: (value: GEDSectionProps['ged']) => void;
}

const GEDSection: React.FC<GEDSectionProps> = ({ ged, setGed }) => {
  const gedOptions = ['1', '2', '3', '4', '5', '6'];

  return (
    <div className="mb-6">
      <h3 className="flex items-center mb-4 text-lg font-medium text-gray-100">
        <BookOpen className="w-5 h-5 text-blue-500" />
        <span className="ml-2">General Educational Development</span>
      </h3>
      <div className="space-y-4">
        {Object.entries(ged).map(([key, value]) => (
          <div key={key}>
            <label className="block mb-2 text-sm font-medium text-gray-300 capitalize">
              {key}
            </label>
            {renderOptions(
              gedOptions,
              value,
              (newValue: string) => setGed({ ...ged, [key]: newValue })
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GEDSection;