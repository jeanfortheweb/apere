import { Plugin, Behavior } from './hook';

/**
 * Plugin decorator which captures errors on plugin execution.
 * Errors are passed to the given callback which, in turn, should return a replacement value for the plugin.
 *
 * @param plugin Plugin to decorate.
 * @param callback Callback.
 */
export function rescue<P extends Plugin>(
  plugin: P,
  callback: (
    error: Error,
  ) => ReturnType<P> extends Promise<infer R> ? R : ReturnType<P>,
): P {
  return ((...args: any[]) => {
    try {
      const result = plugin(...args);

      if (result && typeof result.catch === 'function') {
        return new Promise(resolve => {
          result
            .then((value: any) => resolve(value))
            .catch((error: any) => {
              resolve(callback(error));
            });
        });
      }

      return result;
    } catch (error) {
      return callback(error);
    }
  }) as P;
}

/**
 * Behavior decorator which will wait for async plugins before passing their results to the given
 * behavior.
 *
 * @param behavior Behavior to decorate.
 */
export function wait<T, R>(
  behavior: Behavior<(...args: any[]) => R, T>,
): Behavior<(...args: any[]) => Promise<R>, Promise<T>> {
  return async results => Promise.all(results).then(behavior);
}
