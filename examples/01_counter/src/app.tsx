import { Signal, useSignal } from 'use-signals';

const counter = new Signal.State(0);
const doubleCounter = new Signal.Computed(() => counter.get() * 2);

const Counter = () => {
  const count = useSignal(counter);
  const doubleCount = useSignal(doubleCounter);
  const inc = () => counter.set(counter.get() + 1);
  return (
    <>
      <div>Count: {count}</div>
      <div>Double Count: {doubleCount}</div>
      <button type="button" onClick={inc}>
        +1
      </button>
    </>
  );
};

const App = () => (
  <div>
    <Counter />
  </div>
);

export default App;
