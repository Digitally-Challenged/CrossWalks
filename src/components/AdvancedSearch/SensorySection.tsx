import React from 'react';
import { Eye } from 'lucide-react';
import { renderOptions } from '../../utils/helpers';

interface SensorySectionProps {
  sensory: {
    feeling: string;
    talking: string;
    hearing: string;
    tasteSmell: string;
  };
  setSensory: (value: SensorySectionProps['sensory']) => void;
}

const SensorySection: React.FC<SensorySectionProps> = ({ sensory, setSensory }) => {
  const frequencyOptions = ['Not Present', 'Occasionally', 'Frequently', 'Constantly'];

  return (
    <div className="mb-6">
      <h3 className="flex items-center mb-4 text-lg font-medium text-gray-100">
        <Eye className="w-5 h-5 text-blue-500" />
        <span className="ml-2">Sensory</span>
      </h3>
      <div className="space-y-4">
        {Object.entries(sensory).map(([key, value]) => (
          <div key={key}>
            <label className="block mb-2 text-sm font-medium text-gray-300 capitalize">
              {key}
            </label>
            {renderOptions(
              frequencyOptions,
              value,
              (newValue: string) =>
                setSensory({ ...sensory, [key]: newValue })
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SensorySection;