import { createElement } from 'use-signals';

export { Fragment } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const jsx = (type: any, props: any, key: any) => {
  const { children, ...rest } = props || {};
  if (Array.isArray(children)) {
    return createElement(type, { ...rest, key }, ...children);
  }
  return createElement(type, { ...rest, key }, children);
};

export const jsxs = jsx;
export const jsxDEV = jsx;
