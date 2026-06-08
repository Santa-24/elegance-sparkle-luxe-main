// ============================================
// ARRAY UTILITIES - Array Manipulation
// ============================================

/**
 * Debounce function for search
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Group array by key
 */
export function groupBy<T extends Record<string, string | number | boolean | null | undefined>>(
  array: T[],
  key: keyof T,
): Record<string, T[]> {
  return array.reduce(
    (result, item) => {
      const groupKey = String(item[key]);
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(item);
      return result;
    },
    {} as Record<string, T[]>,
  );
}

/**
 * Sort array by property
 */
export function sortBy<T extends Record<string, string | number | boolean | null | undefined>>(
  array: T[],
  key: keyof T,
  order: "asc" | "desc" = "asc",
): T[] {
  return [...array].sort((a, b) => {
    const aVal = String(a[key] ?? "");
    const bVal = String(b[key] ?? "");

    if (aVal < bVal) return order === "asc" ? -1 : 1;
    if (aVal > bVal) return order === "asc" ? 1 : -1;
    return 0;
  });
}

/**
 * Filter array by multiple criteria
 */
export function filterByMultiple<
  T extends Record<string, string | number | boolean | null | undefined>,
>(array: T[], filters: Record<string, string | number | boolean | null | undefined>): T[] {
  return array.filter((item) =>
    Object.entries(filters).every(([key, value]) => item[key] === value),
  );
}

/**
 * Search array by text in multiple fields
 */
export function searchInArray<
  T extends Record<string, string | number | boolean | null | undefined>,
>(array: T[], query: string, fields: Array<keyof T>): T[] {
  const lowerQuery = query.toLowerCase();
  return array.filter((item) =>
    fields.some((field) => String(item[field]).toLowerCase().includes(lowerQuery)),
  );
}
