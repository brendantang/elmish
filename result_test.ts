import * as Result from "./result.ts";
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
  if (parsed == NaN) {
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
      Result.Err("could not convert string '4.2' into an Int"),
      Result.andThen(isEven, toIntResult("4.2")),
    );
  });
  await t.step("andThen second Err", () => {
    assertEquals(
      Result.Err("number is odd"),
      Result.andThen(isEven, toIntResult("41")),
    );
  });
});
