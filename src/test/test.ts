type AssertAllTestPass<T extends AssertPass.Pass[]> =
  T extends AssertPass.Pass[] ? AssertPass.Pass : never;

export module Test {
  export type ALL_TESTS = AssertAllTestPass<
    [
      // unsigned
      ...import("../lib/int/unsigned").Test
    ]
  >;
}
