import * as Result from "./result.ts";
import * as Maybe from "./maybe.ts";
import { assertEquals } from "https://deno.land/std@0.154.0/testing/asserts.ts";

const isEven = (n: number): Result.Result<string, number> => {
  if (n % 2 === 0) {
    return Result.Ok(n);
  } else {
    return Result.Err("number is not an even integer");
  }
};

const toIntResult = (s: string): Result.Result<string, number> => {
  const parsed = parseInt(s);
  if (isNaN(parsed)) {
    return Result.Err(`could not convert string '${s}' into an integer`);
  } else {
    return Result.Ok(parsed);
  }
};

const add3 = (a: number, b: number, c: number): number => {
  return a + b + c;
};

const add4 = (a: number, b: number, c: number, d: number): number => {
  return a + b + c + d;
};

const add5 = (a: number, b: number, c: number, d: number, e: number) => {
  return a + b + c + d + e;
};

Deno.test("map Tests", async (t) => {
  await t.step("map Ok", () => {
    assertEquals(
      Result.Ok(3),
      Result.map((a: number): number => {
        return a + 1;
      }, Result.Ok(2)),
    );
  });
  await t.step("map Err", () => {
    assertEquals(
      Result.Err("error"),
      Result.map((a: number): number => {
        return a + 1;
      }, Result.Err("error")),
    );
  });
});

Deno.test("mapNTests", async (t) => {
  await t.step("map2 Ok", () => {
    assertEquals(
      Result.Ok(3),
      Result.map2(
        (a: number, b: number): number => {
          return a + b;
        },
        Result.Ok(1),
        Result.Ok(2),
      ),
    );
  });

  await t.step("map2 Err", () => {
    assertEquals(
      Result.Err("x"),
      Result.map2(
        (a: number, b: number): number => {
          return a + b;
        },
        Result.Ok(1),
        Result.Err("x"),
      ),
    );
  });

  await t.step("map3 Ok", () => {
    assertEquals(
      Result.Ok(6),
      Result.map3(add3, Result.Ok(1), Result.Ok(2), Result.Ok(3)),
    );
  });

  await t.step("map3 Err", () => {
    assertEquals(
      Result.Err("x"),
      Result.map3(add3, Result.Ok(1), Result.Ok(2), Result.Err("x")),
    );
  });
  await t.step("map4 Ok", () => {
    assertEquals(
      Result.Ok(10),
      Result.map4(
        add4,
        Result.Ok(1),
        Result.Ok(2),
        Result.Ok(3),
        Result.Ok(4),
      ),
    );
  });

  await t.step("map4 Err", () => {
    assertEquals(
      Result.Err("x"),
      Result.map4(
        add4,
        Result.Ok(1),
        Result.Ok(2),
        Result.Ok(3),
        Result.Err("x"),
      ),
    );
  });

  await t.step("map5 Ok", () => {
    assertEquals(
      Result.Ok(15),
      Result.map5(
        add5,
        Result.Ok(1),
        Result.Ok(2),
        Result.Ok(3),
        Result.Ok(4),
        Result.Ok(5),
      ),
    );
  });

  await t.step("map5 Err", () => {
    assertEquals(
      Result.Err("x"),
      Result.map5(
        add5,
        Result.Ok(1),
        Result.Ok(2),
        Result.Ok(3),
        Result.Ok(4),
        Result.Err("x"),
      ),
    );
  });
});

Deno.test("andThenTests", async (t) => {
  await t.step("andThen Ok", () => {
    assertEquals(
      Result.Ok(42),
      Result.andThen(isEven, toIntResult("42")),
    );
  });
  await t.step("andThen first Err", () => {
    assertEquals(
      Result.Err("could not convert string 'foo' into an integer"),
      Result.andThen(isEven, toIntResult("foo")),
    );
  });
  await t.step("andThen second Err", () => {
    assertEquals(
      Result.Err("number is not an even integer"),
      Result.andThen(isEven, toIntResult("41")),
    );
  });
});

Deno.test("withDefault tests", async (t) => {
  await t.step("withDefault Err", () => {
    assertEquals(
      10,
      Result.withDefault(10, Result.Err("error")),
    );
  });
  await t.step("withDefault Ok", () => {
    assertEquals(
      11,
      Result.withDefault(10, Result.Ok(11)),
    );
  });
});

Deno.test("Maybe conversion tests", async (t) => {
  await t.step("toMaybe Err", () => {
    assertEquals(
      Maybe.Nothing(),
      Result.toMaybe(Result.Err("error")),
    );
  });
  await t.step("toMaybe Ok", () => {
    assertEquals(
      Maybe.Just(11),
      Result.toMaybe(Result.Ok(11)),
    );
  });
  await t.step("fromMaybe Nothing", () => {
    assertEquals(
      Result.Err("error"),
      Result.fromMaybe("error", Maybe.Nothing()),
    );
  });
  await t.step("fromMaybe Just", () => {
    assertEquals(
      Result.Ok(1),
      Result.fromMaybe("error", Maybe.Just(1)),
    );
  });
});

Deno.test("mapError tests", async (t) => {
  interface TestErr {
    message: string;
    code: number;
  }
  const getMessage = (err: TestErr): string => {
    return err.message;
  };

  await t.step("mapErr Err", () => {
    assertEquals(
      Result.Err("oops"),
      Result.mapError(getMessage, Result.Err({ message: "oops", code: 404 })),
    );
  });
  await t.step("mapErr Ok", () => {
    assertEquals(
      Result.Ok(1),
      Result.mapError(getMessage, Result.Ok(1)),
    );
  });
});

Deno.test("andMap tests", async (t) => {
  await t.step("on Err, Err", () => {
    assertEquals(
      Result.Err("oops"),
      Result.andMap(Result.Err("oops"), Result.Err("no function")),
    );
  });
  await t.step("on Ok, Err", () => {
    assertEquals(
      Result.Err("no function"),
      Result.andMap(Result.Ok(1), Result.Err("no function")),
    );
  });
  await t.step("on Ok, Ok", () => {
    assertEquals(
      Result.Ok(2),
      Result.andMap(Result.Ok(1), Result.Ok((n: number) => n + 1)),
    );
  });
});
