/**
 * Behavior.
 * Defines how a hook executes it's plugins.
 */
export interface Behavior<P extends Plugin, R> {
  (results: ReturnType<P>[]): R;
}

/**
 * Executer.
 * Defines the signature of the hook executer function which is derived from the used
 * behavior.
 *
 * @see Behavior
 */
export interface Executer<P extends Plugin, B extends Behavior<P, any>> {
  (...args: Parameters<P>): ReturnType<B>;
}

/**
 * Plugin.
 * Defines a loose signature of a plugin.
 */
export interface Plugin {
  (...args: any[]): any;
}

/**
 * Attach.
 * Defines the signature of the function which is used to attach plugins to a hook.
 */
export interface Attach<P extends Plugin> {
  (plugin: P): Detach;
}

/**
 * Detach.
 * A function, returned by attach, which is used to detach a previosly attached plugin.
 */
export interface Detach {
  (): void;
}

/**
 * Creates a hook.
 *
 * @param behavior Behavior to use.
 */
export function hook<P extends Plugin, R>(
  behavior: Behavior<P, R>,
): [Executer<P, Behavior<P, R>>, Attach<P>] {
  let plugins: P[] = [];

  const attach = (plugin: P): Detach => {
    plugins = [...plugins, plugin];

    return () => {
      plugins = [...plugins.filter(other => other !== plugin)];
    };
  };

  const execute = (...args: any[]) =>
    behavior(plugins.map(plugin => plugin(...args)));

  return [execute, attach];
}
