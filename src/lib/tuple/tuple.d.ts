/** @format */

type IsEmpty<T extends [...any[]]> = IsEqual<T["length"], 0>;
type TEST_IsEmpty = IsEmpty<[123, 1231]>;

type TEST_TUPLE = [1, 2, 3, 4, 5, 6, 7];
type IndexOf<T extends any[]> = Exclude<keyof T, keyof []>;

type TupleSlice<
  T extends any[],
  U extends IndexOf<T>,
  V extends IndexOf<T>
> = 1;

// type Exch<
//   T extends [any, ...any],
//   U extends IndexOf<T>,
//   V extends IndexOf<T>
// > = 1;
