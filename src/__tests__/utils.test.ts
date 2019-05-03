import { rescue } from '..';
import { wait } from '../utils';

describe('safe', () => {
  test('should capture errors from plugins', () => {
    const error = new Error('error');
    const callback = jest.fn<string, [Error]>(() => 'error');
    const plugin = rescue((): string => {
      throw error;
    }, callback);
    const result = plugin();

    expect(callback).toHaveBeenCalledWith(error);
    expect(result).toEqual('error');
  });

  test('should capture async errors from plugins', async () => {
    const error = new Error('error');
    const callback = jest.fn<string, [Error]>(() => 'error');
    const plugin = rescue(async (): Promise<string> => {
      throw error;
    }, callback);
    const result = await plugin();

    expect(callback).toHaveBeenCalledWith(error);
    expect(result).toEqual('error');
  });

  test('should return result when no error', () => {
    const callback = jest.fn<string, [Error]>(() => 'error');
    const plugin = rescue((): string => 'foo', callback);
    const result = plugin();

    expect(callback).not.toHaveBeenCalled();
    expect(result).toEqual('foo');
  });

  test('should async return result when no error', async () => {
    const callback = jest.fn<string, [Error]>(() => 'error');
    const plugin = rescue(async (): Promise<string> => 'foo', callback);
    const result = await plugin();

    expect(callback).not.toHaveBeenCalled();
    expect(result).toEqual('foo');
  });
});

describe('wait', () => {
  test('should wait for plugins to execute', async () => {
    const plugins = [
      jest.fn(async () => 'a'),
      jest.fn(async () => 'b'),
      jest.fn(async () => 'c'),
    ];

    const behavior = wait((plugins: string[]) => plugins.join(','));
    const result = await behavior(plugins.map(plugin => plugin()));

    expect(result).toEqual('a,b,c');
  });
});
