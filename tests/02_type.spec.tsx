import { test } from 'vitest';
import { expectType } from 'ts-expect';

import { Signal } from 'use-signals';

test('signal type', () => {
  const counter = new Signal.State(0);
  expectType<Signal.State<number>>(counter);
});
