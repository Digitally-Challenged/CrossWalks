import type { SortByType } from '../types/job';

interface SortOption {
  value: SortByType;
  label: string;
}

const SORT_OPTIONS: SortOption[] = [
  { value: 'Title', label: 'Title' },
  { value: 'SVPNum', label: 'SVP' },
  { value: 'Strength', label: 'Strength' },
  { value: 'Code', label: 'Code' }
];

interface JobSortControlsProps {
  sortField: SortByType;
  sortOrder: 'asc' | 'desc';
  onSortChange: (field: SortByType) => void;
  onOrderChange: (order: 'asc' | 'desc') => void;
}

export const JobSortControls: React.FC<JobSortControlsProps> = ({
  sortField,
  sortOrder,
  onSortChange,
  onOrderChange
}) => {
  return (
    <div className="w-full">
      <div className="text-sm text-gray-400 mb-2">Choose Primary Sort</div>
      <div className="flex w-full bg-blue-600/20 rounded-md">
        {SORT_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => {
              onSortChange(option.value);
              if (sortField === option.value) {
                onOrderChange(sortOrder === 'asc' ? 'desc' : 'asc');
              }
            }}
            className={`flex-1 px-4 py-2 text-center transition-colors
              ${sortField === option.value 
                ? 'bg-white text-gray-900 rounded-md shadow-sm' 
                : 'text-gray-100 hover:bg-blue-600/30'
              }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}; 