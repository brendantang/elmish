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
