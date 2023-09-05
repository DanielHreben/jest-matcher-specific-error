# jest-matcher-specific-error
Make sure your function really throws what you expect

Workaround for https://github.com/facebook/jest/issues/8140

# Installation
With npm:
> npm install --save-dev jest-matcher-specific-error

With yarn:
> yarn add -D jest-matcher-specific-error

# Setup
Same as [Other Jest matchers](https://jest-extended.jestcommunity.dev/docs/getting-started/setup).

# Typescript

Same as [Other Jest matchers](https://jest-extended.jestcommunity.dev/docs/getting-started/typescript).

# Usage
```typescript
await expect(yourPromise).rejects.toMatchError(expectedError);
await expect(yourFunction).rejects.toMatchError(expectedError);
expect(yourError).toMatchError(expectedError);
```

# Match logic
Errors threated as equal if ALL conditions satisfied:
 * Errors are instances of same class (strict `===` comparison by reference)
 * Error messages are equal
 * All error public fields are deeply equal (default `jest` helper comparison)

Error stack traces are ignored.

