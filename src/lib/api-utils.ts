/**
 * Parse integer parameter from query string with fallback
 */
export function parseIntParam(value: string | null, fallback: number): number {
  if (!value) {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

/**
 * Clamp a number between min and max values
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/**
 * Normalize page number within valid range
 */
export function normalizePage(page: number, pageCount: number): number {
  if (pageCount < 1) {
    return 0;
  }

  return ((page % pageCount) + pageCount) % pageCount;
}
