import React from 'react';
import { Eye } from 'lucide-react';
import { 
  AdvancedSearchFilters, 
  UIFrequencyDisplay, 
  UI_FREQUENCY_DISPLAY 
} from '../../types/job';
import { renderOptions } from '../../utils/helpers';

interface SensorySectionProps {
  sensory: AdvancedSearchFilters['sensory'];
  setSensory: (value: AdvancedSearchFilters['sensory']) => void;
}

const SensorySection: React.FC<SensorySectionProps> = ({ 
  sensory, 
  setSensory 
}) => {
  const frequencyOptions = Object.values(UI_FREQUENCY_DISPLAY) as UIFrequencyDisplay[];

  const handleUpdate = (field: string, value: UIFrequencyDisplay) => {
    setSensory({
      ...sensory,
      [field]: value
    });
  };

  return (
    <section className="space-y-4">
      <h2 className="text-gray-400 text-sm font-medium mb-4">
        <Eye className="w-5 h-5 text-blue-500 inline mr-2" />
        SENSORY
      </h2>
      <div className="space-y-3">
        {Object.entries(sensory).map(([field, value]) => (
          <div key={field} className="flex items-center">
            <span className="w-24 text-sm capitalize">{field}</span>
            {renderOptions(
              frequencyOptions,
              value,
              (newValue) => handleUpdate(field, newValue as UIFrequencyDisplay)
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SensorySection;