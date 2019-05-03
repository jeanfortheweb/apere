/**
 * Creates a reducer behavior.
 * This behavior will call every plugin with the initial input data, where each plugin should
 * reduce its own values into the resulting output data.
 */
export function reducer<T, R>(initial: R, reduce: (a: R, b: T) => R) {
  return (results: T[]) => {
    return results.reduce(
      (current, result) => reduce(current, result),
      initial,
    );
  };
}
