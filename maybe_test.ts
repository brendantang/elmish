import { assertEquals } from "https://deno.land/std@0.154.0/testing/asserts.ts";
import * as Maybe from "./maybe.ts";

Deno.test("withDefault Tests", async (t) => {
  await t.step("no default used", () => {
    assertEquals(0, Maybe.withDefault(5, Maybe.Just(0)));
  });

  await t.step("default used", () => {
    assertEquals(5, Maybe.withDefault(5, Maybe.Nothing()));
  });
});

Deno.test("map Tests", async (t) => {
  const f = (n: number) => {
    return n + 1;
  };
  await t.step("on Nothing", () => {
    assertEquals(Maybe.Nothing(), Maybe.map(f, Maybe.Nothing()));
  });
  await t.step("on Just", () => {
    assertEquals(Maybe.Just(1), Maybe.map(f, Maybe.Just(0)));
  });
});

Deno.test("map2 Tests", async (t) => {
  const f = (a: number, b: number) => {
    return a + b;
  };
  await t.step(
    "on (Just, Just)",
    () => {
      assertEquals(Maybe.Just(1), Maybe.map2(f, Maybe.Just(0), Maybe.Just(1)));
    },
  );

  await t.step("on (Just, Nothing)", () => {
    assertEquals(
      Maybe.Nothing(),
      Maybe.map2(f, Maybe.Just(0), Maybe.Nothing()),
    );
  });
  await t.step("on (Nothing, Just)", () => {
    assertEquals(
      Maybe.Nothing(),
      Maybe.map2(f, Maybe.Nothing(), Maybe.Just(1)),
    );
  });
});

Deno.test("andThen Tests", async (t) => {
  await t.step(
    "succeeding chain",
    () => {
      assertEquals(
        Maybe.Just(1),
        Maybe.andThen((a) => Maybe.Just(a), Maybe.Just(1)),
      );
    },
  );

  await t.step("failing chain (original Maybe failed)", () => {
    assertEquals(
      Maybe.Nothing(),
      Maybe.andThen((a) => Maybe.Just(a), Maybe.Nothing()),
    );
  });
  await t.step("failing chain (chained function failed)", () => {
    assertEquals(
      Maybe.Nothing(),
      Maybe.andThen((_a) => Maybe.Nothing(), Maybe.Just(1)),
    );
  });
});

Deno.test("map3 Tests", async (t) => {
  const f = (a: number, b: number, c: number) => {
    return a + b + c;
  };
  await t.step("on (Just, Just, Just)", () => {
    assertEquals(
      Maybe.Just(3),
      Maybe.map3(f, Maybe.Just(1), Maybe.Just(1), Maybe.Just(1)),
    );
  });
  await t.step("on (Just, Just, Nothing)", () => {
    assertEquals(
      Maybe.Nothing(),
      Maybe.map3(f, Maybe.Just(1), Maybe.Just(1), Maybe.Nothing()),
    );
  });
  await t.step("on (Just, Nothing, Maybe.Just())", () => {
    assertEquals(
      Maybe.Nothing(),
      Maybe.map3(f, Maybe.Just(1), Maybe.Nothing(), Maybe.Just(1)),
    );
  });
  await t.step("on (Nothing, Maybe.Just(), Maybe.Just())", () => {
    assertEquals(
      Maybe.Nothing(),
      Maybe.map3(f, Maybe.Nothing(), Maybe.Just(1), Maybe.Just(1)),
    );
  });
});

Deno.test("map4 Tests", async (t) => {
  const f = (a: number, b: number, c: number, d: number) => {
    return a + b + c + d;
  };
  await t.step("on (Just, Just, Just, Just)", () => {
    assertEquals(
      Maybe.Just(4),
      Maybe.map4(f, Maybe.Just(1), Maybe.Just(1), Maybe.Just(1), Maybe.Just(1)),
    );
  });
  await t.step("on (Just, Just, Just, Nothing)", () => {
    assertEquals(
      Maybe.Nothing(),
      Maybe.map4(
        f,
        Maybe.Just(1),
        Maybe.Just(1),
        Maybe.Just(1),
        Maybe.Nothing(),
      ),
    );
  });
  await t.step("on (Just, Just, Nothing, Just)", () => {
    assertEquals(
      Maybe.Nothing(),
      Maybe.map4(
        f,
        Maybe.Just(1),
        Maybe.Just(1),
        Maybe.Nothing(),
        Maybe.Just(1),
      ),
    );
  });
  await t.step("on (Just, Nothing, Just, Just)", () => {
    assertEquals(
      Maybe.Nothing(),
      Maybe.map4(
        f,
        Maybe.Just(1),
        Maybe.Nothing(),
        Maybe.Just(1),
        Maybe.Just(1),
      ),
    );
  });
  await t.step("on (Nothing, Just, Just, Just)", () => {
    assertEquals(
      Maybe.Nothing(),
      Maybe.map4(
        f,
        Maybe.Nothing(),
        Maybe.Just(1),
        Maybe.Just(1),
        Maybe.Just(1),
      ),
    );
  });
});

Deno.test("map5 Tests", async (t) => {
  const f = (a: number, b: number, c: number, d: number, e: number) => {
    return a + b + c + d + e;
  };
  await t.step(
    "on (Just, Maybe.Just(), Maybe.Just(), Maybe.Just(), Maybe.Just())",
    () => {
      assertEquals(
        Maybe.Just(5),
        Maybe.map5(
          f,
          Maybe.Just(1),
          Maybe.Just(1),
          Maybe.Just(1),
          Maybe.Just(1),
          Maybe.Just(1),
        ),
      );
    },
  );
  await t.step(
    "on Maybe.Just, Maybe.Just(), Maybe.Just(), Maybe.Just(), Nothing)",
    () => {
      assertEquals(
        Maybe.Nothing(),
        Maybe.map5(
          f,
          Maybe.Just(1),
          Maybe.Just(1),
          Maybe.Just(1),
          Maybe.Just(1),
          Maybe.Nothing(),
        ),
      );
    },
  );
  await t.step(
    "on Maybe.Just, Maybe.Just(), Maybe.Just(), Nothing, Maybe.Just())",
    () => {
      assertEquals(
        Maybe.Nothing(),
        Maybe.map5(
          f,
          Maybe.Just(1),
          Maybe.Just(1),
          Maybe.Just(1),
          Maybe.Nothing(),
          Maybe.Just(1),
        ),
      );
    },
  );
  await t.step(
    "on Maybe.Just, Maybe.Just(), Nothing, Maybe.Just(), Maybe.Just())",
    () => {
      assertEquals(
        Maybe.Nothing(),
        Maybe.map5(
          f,
          Maybe.Just(1),
          Maybe.Just(1),
          Maybe.Nothing(),
          Maybe.Just(1),
          Maybe.Just(1),
        ),
      );
    },
  );
  await t.step(
    "on Maybe.Just, Nothing, Maybe.Just(), Maybe.Just(), Maybe.Just())",
    () => {
      assertEquals(
        Maybe.Nothing(),
        Maybe.map5(
          f,
          Maybe.Just(1),
          Maybe.Nothing(),
          Maybe.Just(1),
          Maybe.Just(1),
          Maybe.Just(1),
        ),
      );
    },
  );
  await t.step(
    "on (Nothing, Maybe.Just(), Maybe.Just(), Maybe.Just(), Maybe.Just())",
    () => {
      assertEquals(
        Maybe.Nothing(),
        Maybe.map5(
          f,
          Maybe.Nothing(),
          Maybe.Just(1),
          Maybe.Just(1),
          Maybe.Just(1),
          Maybe.Just(1),
        ),
      );
    },
  );
});
