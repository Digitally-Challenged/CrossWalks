import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDOTCode(code: string): string {
  if (code.length !== 9) return code;
  return `${code.slice(0, 4)}.${code.slice(4, 7)}-${code.slice(7)}`;
}

export function validateDOTCode(code: string): boolean {
  const cleanCode = code.replace(/[.-]/g, '');
  return /^\d{9}$/.test(cleanCode);
}