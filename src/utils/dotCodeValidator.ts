export function isValidDOTCode(code: string): boolean {
  // Remove dots and dashes
  const cleanCode = code.replace(/[.-]/g, '');
  
  // Check if the cleaned code is exactly 9 digits
  return /^\d{9}$/.test(cleanCode);
}