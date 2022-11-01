# Why no `mapN` / `andMap` / "applicative?"
There's a great blog post about what to do when you "run out of maps":
https://thoughtbot.com/blog/running-out-of-maps

Because Elm is a curried language, the `andMap` function allows you to easily chain together an arbitrary amount of `Maybe` or `Result` values.

`andMap` in TypeScript, for this library, would look like this:

```typescript
export const andMap = <A, B>(
  maybeItem: Maybe<A>,
  maybeFunction: Maybe<(a: A) => B>,
): Maybe<B> => {
  switch (maybeItem.type) {
    case MaybeType.Just:
      switch (maybeFunction.type) {
        case MaybeType.Just:
          return Just(maybeFunction.value(maybeItem.value));
        default:
          return Nothing();
      }
    default:
      return Nothing();
  }
};
```

Except it's not actually useful! You would hope that you could define `map3` in terms of `andMap`, like this:

```typescript
export const map3 = <A, B, C, D>(
  f: (a: A, b: B, c: C) => D,
  m1: Maybe<A>,
  m2: Maybe<B>,
  m3: Maybe<C>,
): Maybe<D> => {
  return andMap(m3, andMap(m2, andMap(m1, Just(f))));
};
```

This would work great if TypeScript were a curried language! Then `andMap(m1, Just(f))` would return type `Maybe<(b: B, c: C) => D>`, which would be exactly the type we're looking to pass up to the next `andMap`. But since TypeScript doesn't have currying, we get this type error instead:

```
error: TS2345 [ERROR]: Argument of type 'Maybe<D>' is not assignable to parameter of type 'Maybe<(a: B) => (a: C) => D>'.
  Type 'Just<D>' is not assignable to type 'Maybe<(a: B) => (a: C) => D>'.
    Type 'Just<D>' is not assignable to type 'Just<(a: B) => (a: C) => D>'.
      Type 'D' is not assignable to type '(a: B) => (a: C) => D'.
  return andMap(m3, andMap(m2, andMap(m1, Just(f))));
```

Of course you can implement currying in Javascript! It's used in libraries like lodash and Ramda. Assuming we have a `curry` function, we could implement `andMap` like this:

```typescript
const andMap = <A, B>(
  maybeItem: Maybe<A>,
  maybeFunction: Maybe<Function>, // Note the sacrifice to our type annotation
): Maybe<B> => {
  switch (maybeItem.type) {
    case MaybeType.Just:
      switch (maybeFunction.type) {
        case MaybeType.Just:
          return Just(curry(maybeFunction.value)(maybeItem.value));
        default:
          return Nothing();
      }
    default:
      return Nothing();
  }
};
```

...and our nice concise `map3` implementation would work as expected! Unfortunately, though, we would lose all the nice type hints that the compiler gives us. The `andMap`-less implementation gives us a type error if we try to write some nonsense like this:

```typescript
map3(
  (a: number, b: number, c: number) => a + b + c,
  Just("foo"),
  Just(1),
  Just(1),
),

//  [deno-ts] Argument of type 'Just<string>' is not assignable to parameter of type 'Maybe<number>'.
//    Type 'Just<string>' is not assignable to type 'Just<number>'.
//      Type 'string' is not assignable to type 'number'.
```

...which is kind of the whole point of using a library like this! Unfortunately the `map3` implementation that uses `andMap` and `curry` would be totally silent about this kind of error at compile time. So I didn't include `andMap` in this module.
