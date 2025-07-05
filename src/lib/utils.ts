import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Function to combine and merge Tailwind CSS class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to truncate description text if its too long
export const truncateText = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const calculateReadTime = (
  content: string,
  wordsPerMinute: number = 200
): string => {
  const wordCount = content.trim().split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readTime} min read`;
};

// Calculate average rating
export function calculateAverageRating<T extends { rating: string | number }>(
  items: T[]
): number {
  if (!items || items.length === 0) return 0;

  const total = items.reduce((sum, item) => sum + Number(item.rating), 0);
  return Number((total / items.length).toFixed(1));
}
