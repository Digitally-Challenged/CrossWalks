import React from 'react';
import { HelpCircle } from 'lucide-react';
import { 
  AdvancedSearchFilters, 
  FrequencyLevel,
  UI_FREQUENCY_DISPLAY 
} from '../../types/job';
import { renderOptions } from '../../utils/helpers';
import { Tooltip } from '../ui/ToolTip';

interface ManipulativeSectionProps {
  manipulative: AdvancedSearchFilters['manipulative'];
  setManipulative: (value: AdvancedSearchFilters['manipulative']) => void;
}

const MANIPULATIVE_LABELS = {
  reaching: {
    label: "Reaching",
    description: "Extending hand(s) and arm(s) in any direction"
  },
  handling: {
    label: "Handling",
    description: "Seizing, holding, grasping, turning, or otherwise working with hand or hands"
  },
  fingering: {
    label: "Fingering",
    description: "Picking, pinching, or otherwise working with fingers primarily (rather than whole hand)"
  }
} as const;

const ManipulativeSection: React.FC<ManipulativeSectionProps> = ({ 
  manipulative, 
  setManipulative 
}) => {
  const frequencyOptions = Object.values(UI_FREQUENCY_DISPLAY);

  const handleUpdate = (field: string, value: FrequencyLevel) => {
    setManipulative({
      ...manipulative,
      [field]: value
    });
  };

  return (
    <div className="space-y-4">
      {Object.entries(manipulative).map(([field, value]) => (
        <div key={field} className="flex items-center">
          <div className="flex items-center w-48">
            <span className="text-sm text-gray-300 capitalize">
              {MANIPULATIVE_LABELS[field as keyof typeof MANIPULATIVE_LABELS]?.label}
            </span>
            <Tooltip 
              content={MANIPULATIVE_LABELS[field as keyof typeof MANIPULATIVE_LABELS]?.description}
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

export default ManipulativeSection;