import ReactExports from 'react';
import { Signal } from 'signal-polyfill';
import { createReactSignals } from 'create-react-signals';

type AnySignal<T> = Signal.State<T> | Signal.Computed<T>;

type Unsubscribe = () => void;
type Subscribe = (callback: () => void) => Unsubscribe;
type GetValue = () => unknown;
type SetValue = (path: unknown[], value: unknown) => void;

const createSignalWrapper = <T>(
  signal: AnySignal<T>,
): [Subscribe, GetValue, SetValue] => {
  const sub: Subscribe = (callback) => {
    let needsEnqueue = true;
    const watcher = new Signal.subtle.Watcher(() => {
      if (needsEnqueue) {
        needsEnqueue = false;
        queueMicrotask(processPending);
      }
    });
    function processPending() {
      needsEnqueue = true;
      callback();
      watcher.watch(); // re-watch
    }
    watcher.watch(signal);
    return () => watcher.unwatch(signal);
  };
  const get: GetValue = () => signal.get();
  const set: SetValue = () => {
    throw new Error('Not implemented');
  };
  return [sub, get, set];
};

const { getSignal: getSignalWrapper, inject } =
  createReactSignals(createSignalWrapper);

export const createElement = inject(ReactExports.createElement);

export function $<T>(signal: AnySignal<T>): T {
  return getSignalWrapper(signal as AnySignal<unknown>) as T;
}
