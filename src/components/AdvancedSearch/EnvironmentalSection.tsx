import React from 'react';
import { HelpCircle } from 'lucide-react';
import { 
  AdvancedSearchFilters, 
  FrequencyLevel,
  UI_FREQUENCY_DISPLAY 
} from '../../types/job';
import { renderOptions } from '../../utils/helpers';
import { Tooltip } from '../ui/ToolTip';

interface EnvironmentalSectionProps {
  environmental: AdvancedSearchFilters['environmental'];
  setEnvironmental: (value: AdvancedSearchFilters['environmental']) => void;
}

const ENVIRONMENTAL_LABELS = {
  weather: {
    label: 'Weather',
    description: 'Exposure to outside weather conditions'
  },
  extremeCold: {
    label: 'Extreme Cold',
    description: 'Exposure to non-weather-related cold temperatures'
  },
  extremeHeat: {
    label: 'Extreme Heat',
    description: 'Exposure to non-weather-related hot temperatures'
  },
  wet: {
    label: 'Wet/Humid',
    description: 'Contact with water or other liquids, or humid conditions'
  },
  noise: {
    label: 'Noise',
    description: 'Exposure to loud sounds and noises'
  },
  vibration: {
    label: 'Vibration',
    description: 'Exposure to oscillating movements of the extremities or whole body'
  },
  atmosphericConditions: {
    label: 'Atmospheric Conditions',
    description: 'Exposure to conditions such as fumes, noxious odors, dusts, etc.'
  },
  movingMechanicalParts: {
    label: 'Moving Mechanical Parts',
    description: 'Exposure to possible bodily injury from moving mechanical parts'
  },
  electricShock: {
    label: 'Electric Shock',
    description: 'Exposure to possible electrical shock'
  },
  highPlaces: {
    label: 'High Places',
    description: 'Possible bodily injury from falling'
  },
  radiation: {
    label: 'Radiation',
    description: 'Exposure to possible radiation'
  },
  explosives: {
    label: 'Explosives',
    description: 'Exposure to possible injury from explosions'
  },
  toxicChemicals: {
    label: 'Toxic/Caustic Chemicals',
    description: 'Exposure to possible bodily injury from toxic or caustic chemicals'
  },
  other: {
    label: 'Other Environmental Conditions',
    description: 'Other environmental conditions not specified above'
  }
} as const;

const EnvironmentalSection: React.FC<EnvironmentalSectionProps> = ({ 
  environmental, 
  setEnvironmental 
}) => {
  const frequencyOptions = Object.values(UI_FREQUENCY_DISPLAY);

  const handleUpdate = (field: string, value: FrequencyLevel) => {
    setEnvironmental({
      ...environmental,
      [field]: value
    });
  };

  return (
    <div className="space-y-4">
      {Object.entries(environmental).map(([field, value]) => (
        <div key={field} className="flex items-center">
          <div className="flex items-center w-48">
            <span className="text-sm text-gray-300">
              {ENVIRONMENTAL_LABELS[field as keyof typeof ENVIRONMENTAL_LABELS]?.label}
            </span>
            <Tooltip 
              content={ENVIRONMENTAL_LABELS[field as keyof typeof ENVIRONMENTAL_LABELS]?.description}
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

export default EnvironmentalSection;