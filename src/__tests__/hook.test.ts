import { hook } from '../';
import { array } from '../array';

describe('hook', () => {
  test('should create an executer and attach function', () => {
    interface Plugin {
      (input: string): string;
    }

    const plugin = jest.fn<string, []>(() => 'bar');
    const behavior = jest.fn<string, [string[]]>(() => 'foo');
    const [execute, attach] = hook<Plugin, string>(behavior);

    expect(typeof execute).toEqual('function');
    expect(typeof attach).toEqual('function');

    const detach = attach(plugin);

    expect(typeof detach).toEqual('function');

    execute('foo');

    expect(behavior).toHaveBeenCalledWith(['bar']);
    expect(plugin).toHaveBeenCalledTimes(1);

    detach();

    execute('foo');

    expect(plugin).toHaveBeenCalledTimes(1);
  });
});
