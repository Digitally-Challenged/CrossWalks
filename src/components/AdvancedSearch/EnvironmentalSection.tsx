import React, { useCallback } from 'react';
import { CloudLightning, HelpCircle } from 'lucide-react';
import { renderOptions } from '../../utils/helpers';
import { FrequencyLevel } from '../../types/job';
import { Tooltip } from '../ui/ToolTip';

interface EnvironmentalConditions {
  weather: FrequencyLevel | '';
  extremeCold: FrequencyLevel | '';
  extremeHeat: FrequencyLevel | '';
  wet: FrequencyLevel | '';
  noise: FrequencyLevel | '';
  vibration: FrequencyLevel | '';
  atmosphericConditions: FrequencyLevel | '';
  movingMechanicalParts: FrequencyLevel | '';
  electricShock: FrequencyLevel | '';
  highPlaces: FrequencyLevel | '';
  radiation: FrequencyLevel | '';
  explosives: FrequencyLevel | '';
  toxicChemicals: FrequencyLevel | '';
  other: FrequencyLevel | '';
}

interface EnvironmentalSectionProps {
  environmental: EnvironmentalConditions;
  setEnvironmental: (value: EnvironmentalConditions) => void;
  disabled?: boolean;
}

const ENVIRONMENTAL_LABELS: Record<keyof EnvironmentalConditions, { label: string; description: string }> = {
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

const FREQUENCY_OPTIONS: FrequencyLevel[] = [
  'Not Present',
  'Occasionally',
  'Frequently',
  'Constantly'
];

export const EnvironmentalSection: React.FC<EnvironmentalSectionProps> = ({ 
  environmental, 
  setEnvironmental,
  disabled = false
}) => {
  const handleUpdate = useCallback((key: keyof EnvironmentalConditions, newValue: FrequencyLevel | '') => {
    if (!disabled) {
      setEnvironmental({
        ...environmental,
        [key]: newValue
      });
    }
  }, [setEnvironmental, environmental, disabled]);

  return (
    <div className="mb-6">
      <h3 className="flex items-center mb-4 text-lg font-medium text-gray-100">
        <CloudLightning className="w-5 h-5 text-blue-500" />
        <span className="ml-2">Environmental Conditions</span>
      </h3>
      <div className="space-y-4">
        {(Object.entries(ENVIRONMENTAL_LABELS) as Array<[keyof EnvironmentalConditions, { label: string; description: string }]>).map(([key, { label, description }]) => (
          <div key={key} className="group">
            <div className="flex items-center mb-2">
              <label className="text-sm font-medium text-gray-300">
                {label}
              </label>
              <Tooltip 
                content={description}
                position="right"
                delay={0.2}
              >
                <HelpCircle className="w-4 h-4 ml-2 text-gray-400 hover:text-gray-300 cursor-help" />
              </Tooltip>
            </div>
            {renderOptions(
              FREQUENCY_OPTIONS,
              environmental[key] || null,
              (newValue: string) => handleUpdate(key, newValue as FrequencyLevel | '')
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnvironmentalSection;