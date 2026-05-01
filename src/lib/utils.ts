import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatToIST(date: string | Date | null | undefined, options: Intl.DateTimeFormatOptions = { dateStyle: 'medium', timeStyle: 'short' }) {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '';

  return d.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour12: true,
    ...options
  });
}

/**
 * Format a phone number for display by adding a '+' prefix.
 * Meta sends numbers without '+' (e.g. "919672040456").
 * This makes them display as "+91 9672040456".
 */
export function formatPhoneDisplay(phone: string | null | undefined): string {
  if (!phone) return '';
  const digits = phone.replace(/\D/g, '');
  if (!digits) return phone;
  return `+${digits}`;
}
