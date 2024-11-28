import React from 'react';
import { Activity } from 'lucide-react';
import { 
  AdvancedSearchFilters, 
  UIFrequencyDisplay, 
  UI_FREQUENCY_DISPLAY 
} from '../../types/job';
import { renderOptions } from '../../utils/helpers';

interface ManipulativeSectionProps {
  manipulative: AdvancedSearchFilters['manipulative'];
  setManipulative: (value: AdvancedSearchFilters['manipulative']) => void;
}

const ManipulativeSection: React.FC<ManipulativeSectionProps> = ({ 
  manipulative, 
  setManipulative 
}) => {
  const frequencyOptions = Object.values(UI_FREQUENCY_DISPLAY) as UIFrequencyDisplay[];

  const handleUpdate = (field: string, value: UIFrequencyDisplay) => {
    setManipulative({
      ...manipulative,
      [field]: value
    });
  };

  return (
    <section className="w-full space-y-4">
      <h2 className="flex items-center text-lg font-medium text-gray-100 mb-4">
        <Activity className="w-5 h-5 text-blue-500 mr-2" />
        <span>MANIPULATIVE</span>
      </h2>
      <div className="space-y-4">
        {Object.entries(manipulative).map(([field, value]) => (
          <div key={field} className="w-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-300 capitalize">
                {field}
              </span>
            </div>
            <div className="flex space-x-2">
              {renderOptions(
                frequencyOptions,
                value,
                (newValue) => handleUpdate(field, newValue as UIFrequencyDisplay)
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ManipulativeSection;