import { expect, test } from 'vitest';

import { useSignal } from 'use-signals';

test('export functions', () => {
  expect(useSignal).toBeDefined();
});
