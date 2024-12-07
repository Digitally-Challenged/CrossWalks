import React from 'react';
import { HelpCircle } from 'lucide-react';
import { 
  AdvancedSearchFilters, 
  FrequencyLevel,
  UI_FREQUENCY_DISPLAY 
} from '../../types/job';
import { renderOptions } from '../../utils/helpers';
import { Tooltip } from '../ui/ToolTip';

interface VisualSectionProps {
  visual: AdvancedSearchFilters['visual'];
  setVisual: (value: AdvancedSearchFilters['visual']) => void;
}

const VISUAL_LABELS = {
  nearAcuity: {
    label: "Near Acuity",
    description: "Clarity of vision at 20 inches or less"
  },
  farAcuity: {
    label: "Far Acuity",
    description: "Clarity of vision at 20 feet or more"
  },
  depthPerception: {
    label: "Depth Perception",
    description: "Three-dimensional vision; ability to judge distances and spatial relationships"
  },
  accommodation: {
    label: "Accommodation",
    description: "Adjustment of eye lens to bring objects into sharp focus"
  },
  colorVision: {
    label: "Color Vision",
    description: "Ability to identify and distinguish colors"
  },
  fieldOfVision: {
    label: "Field of Vision",
    description: "Area that can be seen up and down or to right or left while eyes are fixed on a point"
  }
} as const;

const VisualSection: React.FC<VisualSectionProps> = ({ 
  visual, 
  setVisual 
}) => {
  const frequencyOptions = Object.values(UI_FREQUENCY_DISPLAY);

  const handleUpdate = (field: string, value: FrequencyLevel) => {
    setVisual({
      ...visual,
      [field]: value
    });
  };

  return (
    <div className="space-y-4">
      {Object.entries(visual).map(([field, value]) => (
        <div key={field} className="flex items-center">
          <div className="flex items-center w-48">
            <span className="text-sm text-gray-300">
              {VISUAL_LABELS[field as keyof typeof VISUAL_LABELS]?.label}
            </span>
            <Tooltip 
              content={VISUAL_LABELS[field as keyof typeof VISUAL_LABELS]?.description}
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

export default VisualSection;