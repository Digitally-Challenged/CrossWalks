import React from 'react';

export const renderOptions = (
  options: string[],
  value: string | null,
  onChange: (value: string) => void
) => (
  <div className="flex flex-wrap justify-center gap-2">
    {options.map((option) => (
      <button
        key={option}
        className={`px-3 py-1 text-sm font-medium rounded-full ${
          value === option
            ? 'bg-blue-600 text-white'
            : 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
        }`}
        onClick={() => onChange(value === option ? '' : option)}
      >
        {option}
      </button>
    ))}
  </div>
);