import React from 'react';
import { 
  AdvancedSearchFilters, 
  UIFrequencyDisplay, 
  UI_FREQUENCY_DISPLAY 
} from '../../types/job';
import { renderOptions } from '../../utils/helpers';

interface PosturalsSectionProps {
  posturals: AdvancedSearchFilters['posturals'];
  onUpdate: (field: string, value: UIFrequencyDisplay) => void;
}

const PosturalsSection: React.FC<PosturalsSectionProps> = ({ posturals, onUpdate }) => {
  const frequencyOptions = Object.values(UI_FREQUENCY_DISPLAY) as UIFrequencyDisplay[];

  return (
    <section className="space-y-4">
      <h2 className="text-gray-400 text-sm font-medium mb-4">POSTURALS</h2>
      <div className="space-y-3">
        {Object.entries(posturals).map(([field, value]) => (
          <div key={field} className="flex items-center">
            <span className="w-24 text-sm capitalize">{field}</span>
            {renderOptions(
              frequencyOptions,
              value,
              (newValue) => onUpdate(field, newValue as UIFrequencyDisplay)
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PosturalsSection;