// components/ui/SegmentedControl.tsx
import React, { useCallback } from 'react';
import { cn } from '../../utils/cn';
import type { FilterMode } from '../../types/filters';

interface SegmentedControlProps<T extends number> {
  value: T | null;
  mode: FilterMode;
  options: Array<{ label: string; value: T }>;
  onChange: (value: T | null, mode: FilterMode) => void;
  className?: string;
  showDetails?: boolean;
  name?: string;
}

export const SegmentedControl = <T extends number>({
  value,
  mode,
  options,
  onChange,
  className,
  showDetails = true,
  name
}: SegmentedControlProps<T>): React.ReactElement => {
  const handleModeChange = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const newMode: FilterMode = 
      mode === 'maximum' ? 'equal' :
      mode === 'equal' ? 'minimum' : 'maximum';
    
    onChange(value, newMode);
  }, [mode, value, onChange]);

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="flex items-center justify-center gap-2">
        <div className="inline-flex rounded-lg bg-gray-900 p-1">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => onChange(option.value, mode)}
              className={cn(
                'flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors min-w-[2.5rem]',
                value === option.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-transparent text-gray-400 hover:text-white'
              )}
              aria-label={`Set ${name} to ${option.label}`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleModeChange}
          className="ml-2 rounded-lg p-2 text-sm text-gray-400 hover:text-white"
          title={`Current: ${mode} mode. Click to change.`}
          aria-label={`Change filter mode for ${name}`}
        >
          {mode === 'maximum' && '≤'}
          {mode === 'equal' && '='}
          {mode === 'minimum' && '≥'}
        </button>
      </div>
      {showDetails && (
        <div className="text-center text-xs text-gray-400">
          {mode === 'maximum' && 'Showing values up to selected'}
          {mode === 'equal' && 'Showing exact value match'}
          {mode === 'minimum' && 'Showing values from selected up'}
        </div>
      )}
    </div>
  );
};