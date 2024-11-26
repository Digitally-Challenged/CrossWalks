import React, { useState, useCallback } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { Info } from 'lucide-react';
import {
  getSVPDescription,
  getStrengthDescription,
  getFrequencyLevelDescription,
  getGEDLevelDescription,
  getTemperamentDescription,
  getGOEInterestArea,
  WorkerFunctionLevelDescriptions,
} from '../../utils/tooltipDefinitions';
import { TooltipKey } from '../../types/tooltipTypes';
import { StrengthLevel, FrequencyLevel, GEDLevel, WorkerFunctionLevel } from '../../types/job';

interface DefinitionToolTipProps {
  type: TooltipKey;
  value: string;
  area?: string;
  children: React.ReactNode;
}

const DefinitionToolTip: React.FC<DefinitionToolTipProps> = ({ type, value, area, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getTooltipContent = useCallback(() => {
    switch (type) {
      case 'SVP':
        return getSVPDescription(value as '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9');
      case 'Strength':
        return getStrengthDescription(value as StrengthLevel);
      case 'FrequencyLevel':
        return getFrequencyLevelDescription(value as FrequencyLevel);
      case 'GED':
        return area ? getGEDLevelDescription(value as GEDLevel, area as 'reasoning' | 'math' | 'language') : value;
      case 'Temperament':
        return getTemperamentDescription(value);
      case 'GOE':
        return getGOEInterestArea(value);
      case 'WorkerFunction':
        if (!value) return 'Worker Function level not provided';
        const [level, ...descriptionParts] = value.split(' ');
        const description = descriptionParts.join(' ');
        const functionDescription = WorkerFunctionLevelDescriptions[level as WorkerFunctionLevel] || `Unknown level: ${level}`;
        return `${area ? `${area.charAt(0).toUpperCase() + area.slice(1)}: ` : ''}${level} - ${description}\n\n${functionDescription}`;
      default:
        return `Unknown tooltip type: ${type}`;
    }
  }, [type, value, area]);

  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
        <TooltipPrimitive.Trigger asChild>
          <button
            className="inline-flex items-center focus:outline-none focus:ring-2 focus:ring-blue-300 rounded"
            aria-label={`Definition for ${type}`}
          >
            {children}
            <Info className="ml-1 text-gray-400 hover:text-gray-200" size={16} />
          </button>
        </TooltipPrimitive.Trigger>

        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side="top"
            align="center"
            className="bg-gray-900 text-white p-3 rounded shadow-lg max-w-xs z-50 animate-in fade-in-0 zoom-in-95"
            sideOffset={5}
          >
            <p className="text-sm whitespace-pre-wrap">{getTooltipContent()}</p>
            <TooltipPrimitive.Arrow className="fill-gray-900" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

export default DefinitionToolTip;