import React from 'react';
import { Activity } from 'lucide-react';
import { renderOptions } from '../../utils/helpers';

interface ManipulativeSectionProps {
  manipulative: {
    reaching: string;
    handling: string;
    fingering: string;
  };
  setManipulative: (value: ManipulativeSectionProps['manipulative']) => void;
}

const ManipulativeSection: React.FC<ManipulativeSectionProps> = ({ manipulative, setManipulative }) => {
  const frequencyOptions = ['Not Present', 'Occasionally', 'Frequently', 'Constantly'];

  return (
    <div className="mb-6">
      <h3 className="flex items-center mb-4 text-lg font-medium text-gray-100">
        <Activity className="w-5 h-5 text-blue-500" />
        <span className="ml-2">Manipulative</span>
      </h3>
      <div className="space-y-4">
        {Object.entries(manipulative).map(([key, value]) => (
          <div key={key}>
            <label className="block mb-2 text-sm font-medium text-gray-300 capitalize">
              {key}
            </label>
            {renderOptions(
              frequencyOptions,
              value,
              (newValue: string) =>
                setManipulative({ ...manipulative, [key]: newValue })
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManipulativeSection;