import React, { useState } from 'react';
import { TextInput, Label, Textarea } from 'flowbite-react';
import { SegmentedControl } from '../ui/SegmentedControl';
import type { FilterMode } from '../../types/filters';

interface BasicInfoProps {
  title: string;
  definition: string;
  strength: number | null;
  svp: number | null;
  svpMode: FilterMode;
  setTitle: (value: string) => void;
  setDefinition: (value: string) => void;
  setStrength: (value: number | null) => void;
  setSvp: (value: number | null) => void;
  setSvpMode: (value: FilterMode) => void;
}

const STRENGTH_OPTIONS = [
  { label: 'Sedentary', value: 1 },
  { label: 'Light', value: 2 },
  { label: 'Medium', value: 3 },
  { label: 'Heavy', value: 4 },
  { label: 'Very Heavy', value: 5 }
];

const SVP_OPTIONS = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
  { label: '6', value: 6 },
  { label: '7', value: 7 },
  { label: '8', value: 8 },
  { label: '9', value: 9 }
];

const BasicInfo = React.memo(({ title, definition, strength, svp, svpMode, setTitle, setDefinition, setStrength, setSvp, setSvpMode }: BasicInfoProps) => {
  const [strengthMode, setStrengthMode] = useState<FilterMode>('eq');

  return (
    <div className="space-y-4">
      <div>
        <div className="mb-2">
          <Label className="text-sm font-medium text-gray-300">
            Title
          </Label>
        </div>
        <TextInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
        />
      </div>

      <div>
        <div className="mb-2">
          <Label className="text-sm font-medium text-gray-300">
            Definition
          </Label>
        </div>
        <Textarea
          value={definition}
          onChange={(e) => setDefinition(e.target.value)}
          placeholder="Enter definition"
        />
      </div>

      <div>
        <div className="mb-2">
          <Label className="text-sm font-medium text-gray-300">
            Strength
          </Label>
        </div>
        <SegmentedControl
          value={strength}
          onChange={(value: number | null) => setStrength(value)}
          options={STRENGTH_OPTIONS}
          mode={strengthMode}
          onModeChange={setStrengthMode}
          name="strength"
        />
      </div>

      <div>
        <div className="mb-2">
          <Label className="text-sm font-medium text-gray-300">
            SVP Level
          </Label>
        </div>
        <SegmentedControl
          value={svp}
          onChange={(value: number | null) => setSvp(value)}
          options={SVP_OPTIONS}
          mode={svpMode}
          onModeChange={(value: FilterMode) => setSvpMode(value)}
          name="svp"
          showDetails
        />
      </div>
    </div>
  );
});

BasicInfo.displayName = 'BasicInfo';

export default BasicInfo;