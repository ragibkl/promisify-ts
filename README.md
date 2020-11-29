# promisify-ts

Promisify utility function that preserves the original type annotation

# Introduction

Node's `util.promisify` function transforms a callback-style function, into a function that returns a promise.

However, I've noticed that some transformation do not preserve the TypeScript type annotations of the original function.

This package is an attempt to create a similar promisify utility function, with proper typescript support.

# Installation

Install using npm or yarn

```shell
# install using npm
npm install @ragibkl/promisify-ts
```

```shell
# install using yarn
yarn add @ragibkl/promisify-ts
```

# Usage

```typescript
import promisify from '@ragibkl/promisify-ts';

// Sample function that calculates division of a by b
function divide(a: number, b: number, cb: (err: Error | null, data?: number) => void) {
  setTimeout(() => {
    try {
      if (!b) {
        throw new TypeError('Cannot divide by zero!');
      }

      cb(null, a / b);
    } catch (err) {
      cb(err);
    }
  }, 100);
}

const divideAsync = promisify(divide);
// (a: number, b: number) => Promise<number>

divideAsync(10, 2).then(console.log);
// 5

divideAsync(0, 0).then(console.log).catch(console.log);
// TypeError: Cannot divide by zero!
//     at Timeout._onTimeout (/home/ragib/Projects/ragibkl/promisify-ts/src/divide.ts:7:15)
//     at listOnTimeout (internal/timers.js:549:17)
//     at processTimers (internal/timers.js:492:7)
```
