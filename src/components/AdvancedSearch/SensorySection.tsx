import React from 'react';
import { HelpCircle } from 'lucide-react';
import { 
  AdvancedSearchFilters, 
  FrequencyLevel,
  UI_FREQUENCY_DISPLAY 
} from '../../types/job';
import { renderOptions } from '../../utils/helpers';
import { Tooltip } from '../ui/ToolTip';

interface SensorySectionProps {
  sensory: AdvancedSearchFilters['sensory'];
  setSensory: (value: AdvancedSearchFilters['sensory']) => void;
}

const SENSORY_LABELS = {
  feeling: {
    label: "Feeling",
    description: "Perceiving attributes of objects through touch or hand manipulation"
  },
  talking: {
    label: "Talking",
    description: "Expressing or exchanging ideas by means of spoken word"
  },
  hearing: {
    label: "Hearing",
    description: "Perceiving the nature of sounds by ear"
  },
  tasteSmell: {
    label: "Taste/Smell",
    description: "Distinguishing differences in flavors and scents"
  }
} as const;

const SensorySection: React.FC<SensorySectionProps> = ({ 
  sensory, 
  setSensory 
}) => {
  const frequencyOptions = Object.values(UI_FREQUENCY_DISPLAY);

  const handleUpdate = (field: string, value: FrequencyLevel) => {
    setSensory({
      ...sensory,
      [field]: value
    });
  };

  return (
    <div className="space-y-4">
      {Object.entries(sensory).map(([field, value]) => (
        <div key={field} className="flex items-center">
          <div className="flex items-center w-48">
            <span className="text-sm text-gray-300">
              {SENSORY_LABELS[field as keyof typeof SENSORY_LABELS]?.label}
            </span>
            <Tooltip 
              content={SENSORY_LABELS[field as keyof typeof SENSORY_LABELS]?.description}
              position="right"
              delay={0.2}
            >
              <HelpCircle className="w-4 h-4 ml-2 text-gray-400 hover:text-gray-300 cursor-help" />
            </Tooltip>
          </div>
          <div className="flex-1 flex justify-center gap-2">
            {renderOptions(
              frequencyOptions,
              value,
              (newValue) => handleUpdate(field, newValue as FrequencyLevel)
            )}
          </div>
          <div className="w-48" />
        </div>
      ))}
    </div>
  );
};

export default SensorySection;