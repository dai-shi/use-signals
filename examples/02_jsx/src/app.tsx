/** @jsxImportSource use-signals */

import { Signal, $ } from 'use-signals';

const counter = new Signal.State(0);
const doubleCounter = new Signal.Computed(() => counter.get() * 2);

const Counter = () => (
  <>
    <div>Count: {$(counter)}</div>
    <div>Double Count: {$(doubleCounter)}</div>
    <button type="button" onClick={() => counter.set(counter.get() + 1)}>
      +1
    </button>
    <div>Random: {Math.random()}</div>
  </>
);

const App = () => (
  <div>
    <Counter />
  </div>
);

export default App;
