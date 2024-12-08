// components/ui/SegmentedControl.tsx
import React, { useCallback } from 'react';
import { cn } from '../../utils/cn';
import type { FilterMode } from '../../types/filters';

interface SegmentedControlProps<T extends number> {
  value: T | null;
  mode: FilterMode;
  options: Array<{ label: string; value: T }>;
  onChange: (value: T | null) => void;
  onModeChange: (mode: FilterMode) => void;
  className?: string;
  showDetails?: boolean;
  name?: string;
}

export const SegmentedControl = <T extends number>({
  value,
  mode,
  options,
  onChange,
  onModeChange,
  className,
  showDetails = true,
  name
}: SegmentedControlProps<T>): React.ReactElement => {
  const handleModeChange = useCallback(() => {
    const modes: FilterMode[] = ['=', '≤', '≥'];
    const currentModeIndex = modes.indexOf(mode);
    const newModeIndex = (currentModeIndex + 1) % modes.length;
    const newMode = modes[newModeIndex];
    
    onModeChange(newMode);
  }, [mode, onModeChange]);

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="flex items-center justify-center gap-2">
        <div className="inline-flex rounded-lg bg-gray-900 p-1">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => onChange(option.value)}
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
          {mode === '≥' && '≥'}
          {mode === '=' && '='}
          {mode === '≤' && '≤'}
        </button>
      </div>
      {showDetails && (
        <div className="text-center text-xs text-gray-400">
          {mode === '≥' && 'Showing values from selected up'}
          {mode === '=' && 'Showing exact value match'}
          {mode === '≤' && 'Showing values up to selected'}
        </div>
      )}
    </div>
  );
};