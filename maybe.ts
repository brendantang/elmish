import { Func } from "./internal.ts"
export enum MaybeType {
  Just = "maybe-type__just",
  Nothing = "maybe-type__nothing",
}

interface Just<T> {
  type: typeof MaybeType.Just;
  value: T;
}

interface Nothing {
  type: typeof MaybeType.Nothing;
}

/**
 * Represent values that may or may not exist.
 *
 * @example
 * // A person, but maybe we do not know their age.
 * interface Person {
 *   name: string;
 *   age: Maybe<number>;
 * }
 * const tom = { name: "Tom", age: Just(42) };
 * const sue = { name: "Sue", age: Nothing() };
 */
export type Maybe<T> = Just<T> | Nothing;

/** Construct a `Nothing` value */
export const Nothing = (): Nothing => ({
  type: MaybeType.Nothing,
});

/** Create a `Just` value */
export const Just = <T>(value: T): Just<T> => ({
  type: MaybeType.Just,
  value: value,
});

/**
 * Provide a default value, turning an optional value into a normal value.
 *
 * @example
 * withDefault(100, Just(42))  // 42
 * withDefault(100, Nothing()  // 100
 */
export const withDefault = <T>(defaultValue: T, maybe: Maybe<T>): T => {
  switch (maybe.type) {
    case MaybeType.Nothing:
      return defaultValue;
    case MaybeType.Just:
      return maybe.value;
  }
};

/**
 * Transform a `Maybe` value with a given function:
 * @example
 * map(Math.sqrt, Just(9))    // Just(3)
 * map(Math.sqrt, Nothing())  // Nothing()
 */
export const map = <A, B>(f: (a: A) => B, maybe: Maybe<A>): Maybe<B> => {
  switch (maybe.type) {
    case MaybeType.Nothing:
      return Nothing();
    case MaybeType.Just:
      return Just(f(maybe.value));
  }
};

/** Chain together many computations that may fail. */
export const andThen = <A, B>(
  f: (val: A) => Maybe<B>,
  maybe: Maybe<A>,
): Maybe<B> => {
  switch (maybe.type) {
    case MaybeType.Nothing:
      return Nothing();
    case MaybeType.Just:
      return f(maybe.value);
  }
};

/** Apply a function if all the arguments are `Just` a value. */
export const map2 = <A, B, C>(
  f: (a: A, b: B) => C,
  m1: Maybe<A>,
  m2: Maybe<B>,
): Maybe<C> => {
  switch (m1.type) {
    case MaybeType.Nothing:
      return Nothing();
    case MaybeType.Just:
      switch (m2.type) {
        case MaybeType.Nothing:
          return Nothing();
        case MaybeType.Just:
          return Just(f(m1.value, m2.value));
      }
  }
};

export const map3 = <A, B, C, D>(
  f: (a: A, b: B, c: C) => D,
  m1: Maybe<A>,
  m2: Maybe<B>,
  m3: Maybe<C>,
): Maybe<D> => {
  switch (m1.type) {
    case MaybeType.Nothing:
      return Nothing();
    case MaybeType.Just:
      switch (m2.type) {
        case MaybeType.Nothing:
          return Nothing();
        case MaybeType.Just:
          switch (m3.type) {
            case MaybeType.Nothing:
              return Nothing();
            case MaybeType.Just:
              return Just(f(m1.value, m2.value, m3.value));
          }
      }
  }
};
export const map4 = <A, B, C, D, E>(
  f: (a: A, b: B, c: C, d: D) => E,
  m1: Maybe<A>,
  m2: Maybe<B>,
  m3: Maybe<C>,
  m4: Maybe<D>,
): Maybe<E> => {
  switch (m1.type) {
    case MaybeType.Nothing:
      return Nothing();
    case MaybeType.Just:
      switch (m2.type) {
        case MaybeType.Nothing:
          return Nothing();
        case MaybeType.Just:
          switch (m3.type) {
            case MaybeType.Nothing:
              return Nothing();
            case MaybeType.Just:
              switch (m4.type) {
                case MaybeType.Nothing:
                  return Nothing();
                case MaybeType.Just:
                  return Just(f(m1.value, m2.value, m3.value, m4.value));
              }
          }
      }
  }
};
export const map5 = <A, B, C, D, E, F>(
  f: (a: A, b: B, c: C, d: D, e: E) => F,
  m1: Maybe<A>,
  m2: Maybe<B>,
  m3: Maybe<C>,
  m4: Maybe<D>,
  m5: Maybe<E>,
): Maybe<F> => {
  switch (m1.type) {
    case MaybeType.Nothing:
      return Nothing();
    case MaybeType.Just:
      switch (m2.type) {
        case MaybeType.Nothing:
          return Nothing();
        case MaybeType.Just:
          switch (m3.type) {
            case MaybeType.Nothing:
              return Nothing();
            case MaybeType.Just:
              switch (m4.type) {
                case MaybeType.Nothing:
                  return Nothing();
                case MaybeType.Just:
                  switch (m5.type) {
                    case MaybeType.Nothing:
                      return Nothing();
                    case MaybeType.Just:
                      return Just(
                        f(m1.value, m2.value, m3.value, m4.value, m5.value),
                      );
                  }
              }
          }
      }
  }
};


export const andMap = <A, B>(
  maybeItem: Maybe<A>,
  maybeFunction: Maybe<Func<A, B>>,
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
