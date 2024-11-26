import { z } from 'zod';

// DOT code format: ###.###-### or #########
const dotCodePattern = /^(\d{3}\.?\d{3}-?\d{3})$/;

export const formatDOTCode = (code: string): string => {
  // Remove any existing formatting
  const cleanCode = code.replace(/[.-]/g, '');
  
  // If we have 9 digits, format as ###.###-###
  if (cleanCode.length === 9) {
    return `${cleanCode.slice(0, 3)}.${cleanCode.slice(3, 6)}-${cleanCode.slice(6)}`;
  }
  
  // Return original input if it doesn't match expected format
  return code;
};

export const validateDOTCode = (code: string): boolean => {
  const cleanCode = code.replace(/[.-]/g, '');
  return /^\d{9}$/.test(cleanCode);
};

export const dotCodeSchema = z.string().refine(
  (val) => dotCodePattern.test(val.replace(/[.-]/g, '')),
  {
    message: 'Invalid DOT code format. Must be ###.###-### or #########',
  }
);