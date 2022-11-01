import { assertEquals } from "https://deno.land/std@0.154.0/testing/asserts.ts";
import {
  andThen,
  Just,
  map,
  map2,
  map3,
  map4,
  map5,
  Nothing,
  withDefault,
} from "./maybe.ts";

Deno.test("withDefault Tests", async (t) => {
  await t.step("no default used", () => {
    assertEquals(0, withDefault(5, Just(0)));
  });

  await t.step("default used", () => {
    assertEquals(5, withDefault(5, Nothing()));
  });
});

Deno.test("map Tests", async (t) => {
  const f = (n: number) => {
    return n + 1;
  };
  await t.step("on Nothing", () => {
    assertEquals(Nothing(), map(f, Nothing()));
  });
  await t.step("on Just", () => {
    assertEquals(Just(1), map(f, Just(0)));
  });
});

Deno.test("map2 Tests", async (t) => {
  const f = (a: number, b: number) => {
    return a + b;
  };
  await t.step(
    "on (Just, Just)",
    () => {
      assertEquals(Just(1), map2(f, Just(0), Just(1)));
    },
  );

  await t.step("on (Just, Nothing)", () => {
    assertEquals(
      Nothing(),
      map2(f, Just(0), Nothing()),
    );
  });
  await t.step("on (Nothing, Just)", () => {
    assertEquals(
      Nothing(),
      map2(f, Nothing(), Just(1)),
    );
  });
});

Deno.test("andThen Tests", async (t) => {
  await t.step(
    "succeeding chain",
    () => {
      assertEquals(
        Just(1),
        andThen((a) => Just(a), Just(1)),
      );
    },
  );

  await t.step("failing chain (original Maybe failed)", () => {
    assertEquals(
      Nothing(),
      andThen((a) => Just(a), Nothing()),
    );
  });
  await t.step("failing chain (chained function failed)", () => {
    assertEquals(
      Nothing(),
      andThen((_a) => Nothing(), Just(1)),
    );
  });
});

Deno.test("map3 Tests", async (t) => {
  const f = (a: number, b: number, c: number) => {
    return a + b + c;
  };
  await t.step("on (Just, Just, Just)", () => {
    assertEquals(
      Just(3),
      map3(f, Just(1), Just(1), Just(1)),
    );
  });
  await t.step("on (Just, Just, Nothing)", () => {
    assertEquals(
      Nothing(),
      map3(f, Just(1), Just(1), Nothing()),
    );
  });
  await t.step("on (Just, Nothing, Just)", () => {
    assertEquals(
      Nothing(),
      map3(f, Just(1), Nothing(), Just(1)),
    );
  });
  await t.step("on (Nothing, Just, Just)", () => {
    assertEquals(
      Nothing(),
      map3(f, Nothing(), Just(1), Just(1)),
    );
  });
});

Deno.test("map4 Tests", async (t) => {
  const f = (a: number, b: number, c: number, d: number) => {
    return a + b + c + d;
  };
  await t.step("on (Just, Just, Just, Just)", () => {
    assertEquals(
      Just(4),
      map4(f, Just(1), Just(1), Just(1), Just(1)),
    );
  });
  await t.step("on (Just, Just, Just, Nothing)", () => {
    assertEquals(
      Nothing(),
      map4(
        f,
        Just(1),
        Just(1),
        Just(1),
        Nothing(),
      ),
    );
  });
  await t.step("on (Just, Just, Nothing, Just)", () => {
    assertEquals(
      Nothing(),
      map4(
        f,
        Just(1),
        Just(1),
        Nothing(),
        Just(1),
      ),
    );
  });
  await t.step("on (Just, Nothing, Just, Just)", () => {
    assertEquals(
      Nothing(),
      map4(
        f,
        Just(1),
        Nothing(),
        Just(1),
        Just(1),
      ),
    );
  });
  await t.step("on (Nothing, Just, Just, Just)", () => {
    assertEquals(
      Nothing(),
      map4(
        f,
        Nothing(),
        Just(1),
        Just(1),
        Just(1),
      ),
    );
  });
});

Deno.test("map5 Tests", async (t) => {
  const f = (a: number, b: number, c: number, d: number, e: number) => {
    return a + b + c + d + e;
  };
  await t.step(
    "on (Just, Just, Just, Just, Just)",
    () => {
      assertEquals(
        Just(5),
        map5(
          f,
          Just(1),
          Just(1),
          Just(1),
          Just(1),
          Just(1),
        ),
      );
    },
  );
  await t.step(
    "on Just, Just, Just, Just, Nothing)",
    () => {
      assertEquals(
        Nothing(),
        map5(
          f,
          Just(1),
          Just(1),
          Just(1),
          Just(1),
          Nothing(),
        ),
      );
    },
  );
  await t.step(
    "on Just, Just, Just, Nothing, Just)",
    () => {
      assertEquals(
        Nothing(),
        map5(
          f,
          Just(1),
          Just(1),
          Just(1),
          Nothing(),
          Just(1),
        ),
      );
    },
  );
  await t.step(
    "on Just, Just, Nothing, Just, Just)",
    () => {
      assertEquals(
        Nothing(),
        map5(
          f,
          Just(1),
          Just(1),
          Nothing(),
          Just(1),
          Just(1),
        ),
      );
    },
  );
  await t.step(
    "on Just, Nothing, Just, Just, Just)",
    () => {
      assertEquals(
        Nothing(),
        map5(
          f,
          Just(1),
          Nothing(),
          Just(1),
          Just(1),
          Just(1),
        ),
      );
    },
  );
  await t.step(
    "on (Nothing, Just, Just, Just, Just)",
    () => {
      assertEquals(
        Nothing(),
        map5(
          f,
          Nothing(),
          Just(1),
          Just(1),
          Just(1),
          Just(1),
        ),
      );
    },
  );
});
