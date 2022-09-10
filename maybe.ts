enum MaybeType {
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

export type Maybe<T> = Just<T> | Nothing;

// Constructors
export const Nothing = (): Nothing => ({
  type: MaybeType.Nothing,
});

export const Just = <T>(value: T): Just<T> => ({
  type: MaybeType.Just,
  value: value,
});

export const withDefault = <T>(defaultValue: T, maybe: Maybe<T>): T => {
  switch (maybe.type) {
    case MaybeType.Nothing:
      return defaultValue;
    case MaybeType.Just:
      return maybe.value;
  }
};

export const map = <A, B>(f: (a: A) => B, maybe: Maybe<A>): Maybe<B> => {
  switch (maybe.type) {
    case MaybeType.Nothing:
      return Nothing();
    case MaybeType.Just:
      return Just(f(maybe.value));
  }
};

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
