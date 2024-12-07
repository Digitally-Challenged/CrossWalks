import React, { useCallback } from 'react';
import { TextInput, Label, Textarea, Button } from 'flowbite-react';
import { Search } from 'lucide-react';
import { SegmentedControl } from '../ui/SegmentedControl';
import type { FilterMode, StrengthLevel, SVPLevel } from '../../types/filters';

interface BasicInfoProps {
  // Basic search props
  title: string;
  definition: string;
  // Advanced filter props
  strength: { value: StrengthLevel | null; mode: FilterMode };
  svp: { value: SVPLevel | null; mode: FilterMode };
  // Handlers
  setTitle: (value: string) => void;
  setDefinition: (value: string) => void;
  setStrength: (value: StrengthLevel | null, mode: FilterMode) => void;
  setSvp: (value: SVPLevel | null, mode: FilterMode) => void;
  onSearch: () => void; // Add search handler
}

const STRENGTH_OPTIONS: Array<{ label: string; value: StrengthLevel }> = [
  { value: 1, label: 'Sedentary' },
  { value: 2, label: 'Light' },
  { value: 3, label: 'Medium' },
  { value: 4, label: 'Heavy' },
  { value: 5, label: 'Very Heavy' }
] as const;

const SVP_OPTIONS: Array<{ label: string; value: SVPLevel }> = Array.from(
  { length: 9 }, 
  (_, i) => ({ 
    value: (i + 1) as SVPLevel, 
    label: String(i + 1) 
  })
);

const THEME_CLASSES = {
  label: "text-sm font-medium text-gray-300 mb-1",
  input: {
    base: "block w-full rounded-lg border disabled:cursor-not-allowed disabled:opacity-50",
    colors: "bg-gray-900 border-gray-600 text-white placeholder-gray-400"
  }
} as const;

const BasicInfo: React.FC<BasicInfoProps> = React.memo(({
  title,
  definition,
  strength,
  svp,
  setTitle,
  setDefinition,
  setStrength,
  setSvp,
  onSearch
}) => {
  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, [setTitle]);

  const handleDefinitionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDefinition(e.target.value);
  }, [setDefinition]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  }, [onSearch]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  }, [onSearch]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title Search Section */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Label htmlFor="title" className={THEME_CLASSES.label}>
            Job Title
          </Label>
          <TextInput
            id="title"
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter job title..."
            className={THEME_CLASSES.input.colors}
            theme={{
              base: THEME_CLASSES.input.base,
              colors: {
                gray: THEME_CLASSES.input.colors
              }
            }}
          />
        </div>
        <div className="flex items-end">
          <Button
            type="submit"
            color="blue"
            disabled={!title.trim() && !definition.trim()}
          >
            <Search className="h-4 w-4 mr-2" aria-hidden="true" />
            <span>Search</span>
          </Button>
        </div>
      </div>

      {/* Definition Search */}
      <div>
        <Label htmlFor="definition" className="text-sm font-medium text-gray-300 mb-1">
          Definition Keywords
        </Label>
        <Textarea
          id="definition"
          value={definition}
          onChange={handleDefinitionChange}
          placeholder="Enter keywords or phrases from job definition..."
          className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
          rows={3}
          theme={{
            base: "block w-full rounded-lg border disabled:cursor-not-allowed disabled:opacity-50",
            colors: {
              gray: "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            }
          }}
        />
      </div>

      {/* Advanced Filters */}
      <div className="pt-4 border-t border-gray-700">
        <h3 className="text-sm font-medium text-gray-300 mb-4">Advanced Filters</h3>
        
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-gray-300 mb-1">
              Strength Required
            </Label>
            <SegmentedControl
              value={strength.value}
              mode={strength.mode}
              options={STRENGTH_OPTIONS}
              onChange={setStrength}
              name="strength"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-300 mb-1">
              SVP Level
            </Label>
            <SegmentedControl
              value={svp.value}
              mode={svp.mode}
              options={SVP_OPTIONS}
              onChange={setSvp}
              name="svp"
              showDetails
            />
          </div>
        </div>
      </div>
    </form>
  );
});

BasicInfo.displayName = 'BasicInfo';

export default BasicInfo; 