import { array } from '../';

describe('array', () => {
  test('should setup an array behavior as expected', () => {
    const behavior = array<string, string>();
    const result = behavior(['foo', 'bar']);

    expect(result).toEqual(['foo', 'bar']);
  });

  test('should setup an array behavior with custom mapping', () => {
    const map = (value: number) => value * value;
    const behavior = array(map);
    const result = behavior([2, 4]);

    expect(result).toEqual([2 * 2, 4 * 4]);
  });
});
