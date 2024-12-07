import React from 'react';
import { HelpCircle } from 'lucide-react';
import { renderOptions } from '../../utils/helpers';
import { Tooltip } from '../ui/ToolTip';

interface GEDSectionProps {
  ged: {
    reasoning: string;
    math: string;
    language: string;
  };
  setGed: (value: GEDSectionProps['ged']) => void;
}

const GED_LABELS = {
  reasoning: {
    label: "Reasoning",
    description: "Ability to understand and carry out instructions, and make judgments"
  },
  math: {
    label: "Mathematical",
    description: "Ability to perform arithmetic operations and solve mathematical problems"
  },
  language: {
    label: "Language",
    description: "Knowledge and ability to read, write, and speak English"
  }
} as const;

const GEDSection: React.FC<GEDSectionProps> = React.memo(({ 
  ged, 
  setGed 
}) => {
  const gedOptions = ['1', '2', '3', '4', '5', '6'];

  return (
    <div className="space-y-4">
      {Object.entries(ged).map(([field, value]) => (
        <div key={field} className="flex items-center">
          <div className="flex items-center w-48">
            <span className="text-sm text-gray-300">
              {GED_LABELS[field as keyof typeof GED_LABELS]?.label}
            </span>
            <Tooltip 
              content={GED_LABELS[field as keyof typeof GED_LABELS]?.description}
              position="right"
              delay={0.2}
            >
              <HelpCircle className="w-4 h-4 ml-2 text-gray-400 hover:text-gray-300 cursor-help" />
            </Tooltip>
          </div>
          <div className="flex-1 flex justify-center gap-2">
            {renderOptions(
              gedOptions,
              value,
              (newValue: string) => setGed({ ...ged, [field]: newValue })
            )}
          </div>
          <div className="w-48" />
        </div>
      ))}
    </div>
  );
});

GEDSection.displayName = 'GEDSection';

export default GEDSection;