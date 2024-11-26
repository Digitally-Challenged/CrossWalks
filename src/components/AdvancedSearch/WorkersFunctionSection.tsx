import React from 'react';
import { Users, HelpCircle } from 'lucide-react';
import { renderOptions } from '../../utils/helpers';

interface WorkerFunctionsSectionProps {
  workForce: {
    data: string;
    people: string;
    things: string;
  };
  setWorkForce: (value: WorkerFunctionsSectionProps['workForce']) => void;
}

const workerFunctionDescriptions = {
  data: "Dealing with information and ideas",
  people: "Interacting with people",
  things: "Working with objects, tools, or equipment"
};

const WorkerFunctionsSection: React.FC<WorkerFunctionsSectionProps> = React.memo(({ workForce, setWorkForce }) => {
  const workForceOptions = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];

  return (
    <div className="mb-6">
      <h3 className="flex items-center mb-4 text-lg font-medium text-gray-100">
        <Users className="w-5 h-5 text-blue-500" />
        <span className="ml-2">Worker Functions</span>
      </h3>
      <div className="space-y-4">
        {Object.entries(workForce).map(([key, value]) => (
          <div key={key}>
            <label className="flex items-center mb-2 text-sm font-medium text-gray-300 capitalize">
              {key}
              <HelpCircle 
                className="w-4 h-4 ml-2 text-gray-400 cursor-help" 
                aria-label={workerFunctionDescriptions[key as keyof typeof workerFunctionDescriptions]}
              />
            </label>
            {renderOptions(
              workForceOptions,
              value,
              (newValue: string) =>
                setWorkForce({ ...workForce, [key]: newValue })
            )}
          </div>
        ))}
      </div>
    </div>
  );
});

WorkerFunctionsSection.displayName = 'WorkerFunctionsSection';

export default WorkerFunctionsSection;