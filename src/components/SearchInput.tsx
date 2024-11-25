import { Search, X } from 'lucide-react';
import { useState } from 'react';
import type { SearchColumn } from '../types/job';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onModeChange: (mode: SearchColumn) => void;
  searchColumn: SearchColumn;
  isLoading?: boolean;
}

export function SearchInput({
  value,
  onChange,
  onModeChange,
  searchColumn,
  isLoading,
}: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={`Search by ${searchColumn.toLowerCase()}...`}
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      <div className="mt-2 flex gap-4">
        <label className="flex items-center">
          <input
            type="radio"
            checked={searchColumn === 'Title'}
            onChange={() => onModeChange('Title')}
            className="form-radio h-4 w-4 text-blue-600"
          />
          <span className="ml-2 text-sm text-gray-700">Title</span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            checked={searchColumn === 'Code'}
            onChange={() => onModeChange('Code')}
            className="form-radio h-4 w-4 text-blue-600"
          />
          <span className="ml-2 text-sm text-gray-700">DOT Code</span>
        </label>
      </div>
    </div>
  );
}