// ============================================
// STATE UTILITIES - Object Comparisons
// ============================================

/**
 * Check if form has unsaved changes
 */
export function hasChanges(
  original: Record<string, unknown>,
  current: Record<string, unknown>,
): boolean {
  return JSON.stringify(original) !== JSON.stringify(current);
}

/**
 * Get the difference between two objects
 */
export function getDifferences(
  original: Record<string, unknown>,
  current: Record<string, unknown>,
): Record<string, { old: unknown; new: unknown }> {
  const differences: Record<string, { old: unknown; new: unknown }> = {};

  const keys = new Set([...Object.keys(original), ...Object.keys(current)]);

  for (const key of keys) {
    if (original[key] !== current[key]) {
      differences[key] = { old: original[key], new: current[key] };
    }
  }

  return differences;
}

/**
 * Create a deep copy of an object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Merge two objects (shallow merge)
 */
export function mergeObjects<T extends Record<string, unknown>>(target: T, source: Partial<T>): T {
  return { ...target, ...source };
}
