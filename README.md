# use-signals

[![CI](https://img.shields.io/github/actions/workflow/status/dai-shi/use-signals/ci.yml?branch=main)](https://github.com/dai-shi/use-signals/actions?query=workflow%3ACI)
[![npm](https://img.shields.io/npm/v/use-signals)](https://www.npmjs.com/package/use-signals)
[![size](https://img.shields.io/bundlephobia/minzip/use-signals)](https://bundlephobia.com/result?p=use-signals)
[![discord](https://img.shields.io/discord/627656437971288081)](https://discord.gg/MrQdmzd)

An experimental React hook for TC39 signals

## Install

```bash
npm install use-signals
```

## Usage

```jsx
import { Signal, useSignal } from 'use-signals';

const counter = new Signal.State(0);

const Counter = () => {
  const count = useSignal(counter);
  const inc = () => counter.set(counter.get() + 1);
  return (
    <>
      <div>Count: {count}</div>
      <button type="button" onClick={inc}>
        +1
      </button>
    </>
  );
};
```

## Examples

The [examples](examples) folder contains working examples.
You can run one of them with

```bash
PORT=8080 yarn run examples:01_typescript
```

and open <http://localhost:8080> in your web browser.

You can also try them in codesandbox.io:
[01](https://codesandbox.io/s/github/dai-shi/use-signals/tree/main/examples/01_counter)

## Tweets
