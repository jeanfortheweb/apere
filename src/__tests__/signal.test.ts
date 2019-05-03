import { signal } from '../';

describe('signal', () => {
  test('should setup a signal behavior as expected', () => {
    const behavior = signal();
    const result = behavior([]);

    expect(result).not.toBeDefined();
  });
});
