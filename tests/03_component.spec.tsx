import { test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { Signal, useSignal } from 'use-signals';

test('counter app', async () => {
  const user = userEvent.setup();
  const counter = new Signal.State(0);
  const App = () => {
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
  render(<App />);
  await screen.findByText('Count: 0');
  await user.click(screen.getByRole('button'));
  await screen.findByText('Count: 1');
  await user.click(screen.getByRole('button'));
  await screen.findByText('Count: 2');
});
