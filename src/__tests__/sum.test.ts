import { sum } from '../sum';

describe('sum', () => {
  test('should sum up results', () => {
    const behavior = sum();
    const result = behavior([1, 2, 3, 4]);

    expect(result).toEqual(1 + 2 + 3 + 4);
  });
});
