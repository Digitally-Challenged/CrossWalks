import React from 'react';

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'white';
  className?: string;
  thickness?: 'thin' | 'normal' | 'thick';
  label?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md',
  variant = 'primary',
  className,
  thickness = 'normal',
  label = 'Loading...'
}) => {
  const sizeClasses = {
    xs: 'h-4 w-4',
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const thicknessClasses = {
    thin: 'border',
    normal: 'border-2',
    thick: 'border-4'
  };

  const variantClasses = {
    primary: 'border-blue-500 border-t-transparent',
    secondary: 'border-gray-300 border-t-transparent dark:border-gray-600',
    white: 'border-white border-t-transparent'
  };

  const combineClasses = (...classes: (string | undefined)[]) => {
    return classes.filter(Boolean).join(' ');
  };

  return (
    <div 
      role="status" 
      className={combineClasses(
        "inline-flex items-center justify-center",
        className
      )}
    >
      <div 
        className={combineClasses(
          'animate-spin rounded-full',
          sizeClasses[size],
          thicknessClasses[thickness],
          variantClasses[variant]
        )}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
};

export default LoadingSpinner;