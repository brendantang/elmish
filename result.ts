enum ResultType {
  Ok = "result-type__ok",
  Err = "result-type__err",
}

interface Ok<T> {
  type: typeof ResultType.Ok;
  value: T;
}

interface Err<E> {
  type: typeof ResultType.Err;
  err: E;
}

export type Result<E, T> = Ok<T> | Err<E>;

// Constructors
export const Err = <E>(err: E): Err<E> => ({
  type: ResultType.Err,
  err: err,
});

export const Ok = <T>(value: T): Ok<T> => ({
  type: ResultType.Ok,
  value: value,
});

// Map

export const map = <E, A, B>(
  f: (value: A) => B,
  result: Result<E, A>,
): Result<E, B> => {
  switch (result.type) {
    case ResultType.Err:
      return Err(result.err);
    case ResultType.Ok:
      return Ok(f(result.value));
  }
};
export const map2 = <E, A, B, C>(
  f: (a: A, b: B) => C,
  r1: Result<E, A>,
  r2: Result<E, B>,
): Result<E, C> => {
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
