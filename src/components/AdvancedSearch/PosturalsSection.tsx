import React from 'react';
import { HelpCircle } from 'lucide-react';
import { 
  AdvancedSearchFilters, 
  FrequencyLevel,
  UI_FREQUENCY_DISPLAY
} from '../../types/job';
import { renderOptions } from '../../utils/helpers';
import { Tooltip } from '../ui/ToolTip';

interface PosturalsSectionProps {
  posturals: AdvancedSearchFilters['posturals'];
  setPosturals: (value: AdvancedSearchFilters['posturals']) => void;
}

const POSTURAL_LABELS = {
  sitting: {
    label: "Sitting",
    description: "Remaining in a seated position"
  },
  standing: {
    label: "Standing",
    description: "Remaining on one's feet in an upright position"
  },
  walking: {
    label: "Walking",
    description: "Moving about on foot"
  },
  climbing: {
    label: "Climbing",
    description: "Ascending or descending ladders, stairs, scaffolding, ramps, poles, etc."
  },
  balancing: {
    label: "Balancing",
    description: "Maintaining body equilibrium to prevent falling"
  },
  stooping: {
    label: "Stooping",
    description: "Bending body downward and forward by bending spine at the waist"
  },
  kneeling: {
    label: "Kneeling",
    description: "Bending legs at knees to come to rest on knee or knees"
  },
  crouching: {
    label: "Crouching",
    description: "Bending body downward and forward by bending legs and spine"
  },
  crawling: {
    label: "Crawling",
    description: "Moving about on hands and knees or hands and feet"
  },
  reaching: {
    label: "Reaching",
    description: "Extending hand(s) and arm(s) in any direction"
  }
} as const;

const PosturalsSection: React.FC<PosturalsSectionProps> = React.memo(({ 
  posturals, 
  setPosturals 
}) => {
  const frequencyOptions = Object.values(UI_FREQUENCY_DISPLAY);

  const handleUpdate = (field: string, value: FrequencyLevel) => {
    setPosturals({
      ...posturals,
      [field]: value
    });
  };

  return (
    <div className="space-y-4">
      {Object.entries(posturals).map(([field, value]) => (
        <div key={field} className="flex items-center">
          <div className="flex items-center w-48">
            <span className="text-sm text-gray-300">
              {POSTURAL_LABELS[field as keyof typeof POSTURAL_LABELS]?.label}
            </span>
            <Tooltip 
              content={POSTURAL_LABELS[field as keyof typeof POSTURAL_LABELS]?.description}
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
});

PosturalsSection.displayName = 'PosturalsSection';

export default PosturalsSection;