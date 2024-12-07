import { Search, X } from 'lucide-react';
import type { SearchColumn } from '../types/job';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onModeChange: (mode: SearchColumn) => void;
  searchColumn: SearchColumn;
}

export function SearchInput({
  value,
  onChange,
  onModeChange,
  searchColumn,
}: SearchInputProps) {
  const formatDOTCode = (input: string): string => {
    // Remove all non-numeric characters
    const numbers = input.replace(/\D/g, '');
    
    // If we have exactly 9 digits, format as ###.###-###
    if (numbers.length === 9) {
      return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}-${numbers.slice(6)}`;
    }
    
    // Otherwise return the cleaned input
    return numbers;
  };

  const handleCodeInput = (input: string) => {
    if (searchColumn === 'Code') {
      const formattedValue = formatDOTCode(input);
      onChange(formattedValue);
    } else {
      onChange(input);
    }
  };

  return (
    <div className="w-full">
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="flex items-center">
            <input
              type="radio"
              checked={searchColumn === 'Title'}
              onChange={() => onModeChange('Title')}
              className="sr-only"
            />
            <div className={`relative flex-1 ${searchColumn === 'Title' ? 'opacity-100' : 'opacity-50'}`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchColumn === 'Title' ? value : ''}
                onChange={(e) => {
                  onModeChange('Title');
                  onChange(e.target.value);
                }}
                className="block w-full pl-10 pr-12 py-2 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                placeholder="Search by title..."
              />
              {searchColumn === 'Title' && value && (
                <button
                  onClick={() => onChange('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  aria-label="Clear search"
                >
                  <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </label>
        </div>

        <div className="flex-1">
          <label className="flex items-center">
            <input
              type="radio"
              checked={searchColumn === 'Code'}
              onChange={() => onModeChange('Code')}
              className="sr-only"
            />
            <div className={`relative flex-1 ${searchColumn === 'Code' ? 'opacity-100' : 'opacity-50'}`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchColumn === 'Code' ? value : ''}
                onChange={(e) => {
                  onModeChange('Code');
                  handleCodeInput(e.target.value);
                }}
                className="block w-full pl-10 pr-12 py-2 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                placeholder="###.###-### or #########"
                maxLength={11} // Max length for formatted code (###.###-###)
              />
              {searchColumn === 'Code' && value && (
                <button
                  onClick={() => onChange('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  aria-label="Clear search"
                >
                  <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}