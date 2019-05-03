/**
 * Creates an array behavior.
 * This behavior will call every plugin and gathers their return values as an array.
 * Optionally, a mapper function can be passed to remap the values.
 */
export function array<T, R>(map: (value: T) => R = value => value as any) {
  return (results: T[]): R[] => {
    return results.map(map);
  };
}
