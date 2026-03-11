import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

// Utility function to use clsx (create CSS className strings conditionally)
// and tailwind-merge together
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
