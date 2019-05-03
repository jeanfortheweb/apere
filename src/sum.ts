import { reducer } from './reducer';

/**
 * Creates a sum behavior.
 * This is just an alias for a reducer behavior which sums up numeric values.
 */
export function sum() {
  return reducer(0, (a: number, b: number) => a + b);
}
