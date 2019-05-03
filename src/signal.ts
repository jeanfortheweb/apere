/**
 * Creates a signal behavior.
 * This behavior acts almost like an event. Each plugin receives the given object as readonly data
 * where none of the plugins should return a value.
 */
export function signal<T = any>() {
  return (results: T[]) => {
    return;
  };
}
