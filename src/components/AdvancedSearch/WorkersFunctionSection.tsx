import React from 'react';
import { HelpCircle } from 'lucide-react';
import { renderOptions } from '../../utils/helpers';
import { Tooltip } from '../ui/ToolTip';

interface WorkerFunctionsSectionProps {
  workForce: {
    data: string;
    people: string;
    things: string;
  };
  setWorkForce: (value: WorkerFunctionsSectionProps['workForce']) => void;
}

const WORKER_FUNCTION_LABELS = {
  data: {
    label: "Data",
    description: "Dealing with information and ideas"
  },
  people: {
    label: "People",
    description: "Interacting with people"
  },
  things: {
    label: "Things",
    description: "Working with objects, tools, or equipment"
  }
} as const;

const WorkerFunctionsSection: React.FC<WorkerFunctionsSectionProps> = React.memo(({ 
  workForce, 
  setWorkForce 
}) => {
  const workForceOptions = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];

  return (
    <div className="space-y-4">
      {Object.entries(workForce).map(([field, value]) => (
        <div key={field} className="flex items-center">
          <div className="flex items-center w-48">
            <span className="text-sm text-gray-300">
              {WORKER_FUNCTION_LABELS[field as keyof typeof WORKER_FUNCTION_LABELS]?.label}
            </span>
            <Tooltip 
              content={WORKER_FUNCTION_LABELS[field as keyof typeof WORKER_FUNCTION_LABELS]?.description}
              position="right"
              delay={0.2}
            >
              <HelpCircle className="w-4 h-4 ml-2 text-gray-400 hover:text-gray-300 cursor-help" />
            </Tooltip>
          </div>
          <div className="flex-1 flex justify-center gap-2">
            {renderOptions(
              workForceOptions,
              value,
              (newValue: string) => setWorkForce({ ...workForce, [field]: newValue })
            )}
          </div>
          <div className="w-48" />
        </div>
      ))}
    </div>
  );
});

WorkerFunctionsSection.displayName = 'WorkerFunctionsSection';

export default WorkerFunctionsSection;