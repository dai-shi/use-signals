import { afterEach, expect, test } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { Signal, useSignal } from 'use-signals';

afterEach(cleanup);

test('counter app', async () => {
  const user = userEvent.setup();
  const counter = new Signal.State(0);
  const App = () => {
    const count = useSignal(counter);
    const inc = () => counter.set(counter.get() + 1);
    return (
      <>
        <div data-testid="count">{count}</div>
        <button type="button" onClick={inc}>
          +1
        </button>
      </>
    );
  };
  render(<App />);
  expect(screen.getByTestId('count')).toHaveTextContent('0');
  await user.click(screen.getByRole('button'));
  expect(screen.getByTestId('count')).toHaveTextContent('1');
  await user.click(screen.getByRole('button'));
  expect(screen.getByTestId('count')).toHaveTextContent('2');
});
