// src/components/ui/LoadingSpinner.tsx

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'blue-500' 
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-16 w-16',
    lg: 'h-32 w-32'
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div 
        className={`animate-spin rounded-full border-t-2 border-b-2 border-${color} ${sizeClasses[size]}`}
        aria-label="Loading"
      ></div>
    </div>
  );
};

export default LoadingSpinner;