enum ResultType {
  Ok = "result-type__ok",
  Err = "result-type__err",
}

interface Ok<T> {
  type: typeof ResultType.Ok;
  value: T;
}

interface Err<X> {
  type: typeof ResultType.Err;
  err: X;
}

export type Result<X, T> = Ok<T> | Err<X>;

// Constructors
export const Err = <X>(err: X): Err<X> => ({
  type: ResultType.Err,
  err: err,
});

export const Ok = <T>(value: T): Ok<T> => ({
  type: ResultType.Ok,
  value: value,
});

// Map

export const map = <X, A, B>(
  f: (value: A) => B,
  result: Result<X, A>,
): Result<X, B> => {
  switch (result.type) {
    case ResultType.Err:
      return Err(result.err);
    case ResultType.Ok:
      return Ok(f(result.value));
  }
};

export const map2 = <X, A, B, C>(
  f: (a: A, b: B) => C,
  r1: Result<X, A>,
  r2: Result<X, B>,
): Result<X, C> => {
  switch (r1.type) {
    case ResultType.Err:
      return Err(r1.err);
    case ResultType.Ok:
      switch (r2.type) {
        case ResultType.Err:
          return Err(r2.err);
        case ResultType.Ok:
          return Ok(f(r1.value, r2.value));
      }
  }
};

export const map3 = <X, A, B, C, D>(
  f: (a: A, b: B, c: C) => D,
  r1: Result<X, A>,
  r2: Result<X, B>,
  r3: Result<X, C>,
): Result<X, D> => {
  switch (r1.type) {
    case ResultType.Err:
      return Err(r1.err);
    case ResultType.Ok:
      switch (r2.type) {
        case ResultType.Err:
          return Err(r2.err);
        case ResultType.Ok:
          switch (r3.type) {
            case ResultType.Err:
              return Err(r3.err);
            case ResultType.Ok:
              return Ok(f(r1.value, r2.value, r3.value));
          }
      }
  }
};

export const map4 = <X, A, B, C, D, E>(
  f: (a: A, b: B, c: C, d: D) => E,
  r1: Result<X, A>,
  r2: Result<X, B>,
  r3: Result<X, C>,
  r4: Result<X, D>,
): Result<X, E> => {
  switch (r1.type) {
    case ResultType.Err:
      return Err(r1.err);
    case ResultType.Ok:
      switch (r2.type) {
        case ResultType.Err:
          return Err(r2.err);
        case ResultType.Ok:
          switch (r3.type) {
            case ResultType.Err:
              return Err(r3.err);
            case ResultType.Ok:
              switch (r4.type) {
                case ResultType.Err:
                  return Err(r4.err);
                case ResultType.Ok:
                  return Ok(f(r1.value, r2.value, r3.value, r4.value));
              }
          }
      }
  }
};
export const map5 = <X, A, B, C, D, E, F>(
  f: (a: A, b: B, c: C, d: D, e: E) => F,
  r1: Result<X, A>,
  r2: Result<X, B>,
  r3: Result<X, C>,
  r4: Result<X, D>,
  r5: Result<X, E>,
): Result<X, F> => {
  switch (r1.type) {
    case ResultType.Err:
      return Err(r1.err);
    case ResultType.Ok:
      switch (r2.type) {
        case ResultType.Err:
          return Err(r2.err);
        case ResultType.Ok:
          switch (r3.type) {
            case ResultType.Err:
              return Err(r3.err);
            case ResultType.Ok:
              switch (r4.type) {
                case ResultType.Err:
                  return Err(r4.err);
                case ResultType.Ok:
                  switch (r5.type) {
                    case ResultType.Err:
                      return Err(r5.err);
                    case ResultType.Ok:
                      return Ok(
                        f(r1.value, r2.value, r3.value, r4.value, r5.value),
                      );
                  }
              }
          }
      }
  }
};

export const andThen = <X, A, B>(
  f: (a: A) => Result<X, B>,
  r: Result<X, A>,
): Result<X, B> => {
  switch (r.type) {
    case ResultType.Err:
      return Err(r.err);
    case ResultType.Ok:
      return f(r.value);
  }
};
