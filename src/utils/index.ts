import { format, formatDistanceToNow } from 'date-fns';

/**
 * Convert centimeters to feet and inches
 */
export function cmToFeet(cm: number): { feet: number; inches: number } {
  const inches = cm / 2.54;
  const feet = Math.floor(inches / 12);
  const remainingInches = Math.round(inches % 12);
  return { feet, inches: remainingInches };
}

/**
 * Convert feet and inches to centimeters
 */
export function feetToCm(feet: number, inches: number): number {
  return Math.round((feet * 12 + inches) * 2.54);
}

/**
 * Generate height options from 4'0" to 8'0"
 */
type Option = { label: string; value: number };
export const HEIGHT_OPTIONS: Option[] = Array.from({ length: 49 }, (_, i) => {
  const totalInches = i + 48; // Starting from 48 inches (4 feet)
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;
  return {
    label: `${feet} feet ${inches} inches`,
    value: Math.round(totalInches * 2.54),
  };
});

/**
 * Format a date to "x time ago"
 */
export function formatTimeAgo(date: Date | string): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

/**
 * Format time as "h:mm a"
 */
export function formatMessageTime(date: Date | string): string {
  return format(new Date(date), 'h:mm a');
}

/**
 * Format date as "MMM d, yyyy"
 */
export function formatMessageDate(date: Date | string): string {
  return format(new Date(date), 'MMM d, yyyy');
}

/**
 * Get initials from full name
 */
export function getUserInitials(fullName: string): string {
  if (!fullName) return 'X';
  const names = fullName.trim().split(' ');
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return names[0].charAt(0).toUpperCase(); 
  // Optional: use first + last initials
  // return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
}