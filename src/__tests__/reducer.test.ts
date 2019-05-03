import { reducer } from '../';

describe('reducer', () => {
  test('should setup a reducer behavior as expected', () => {
    type Shape = { a?: number; b?: number };

    const behavior = reducer<Shape, Shape>({}, (a, b) => ({
      ...a,
      ...b,
    }));

    const result = behavior([{ a: 1 }, { b: 2 }]);

    expect(result).toEqual({
      a: 1,
      b: 2,
    });
  });
});
