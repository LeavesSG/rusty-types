import { Ordering } from "../ordering/ordering";
import { Tuple2K } from "../../bench/tuple/tuple";
import { UIntCmp } from "../number/unsigned";

export type Tuple = [any, ...any];
export type TypedTuple<T> = [T, ...T[]];

export type IsEmpty<T extends [...any[]]> = IsEqual<T["length"], 0>;

export type IsTuple<T extends any[]> = T extends Tuple ? true : false;

type TupleSliceNaive<T extends Tuple, U extends number> = UIntCmp<
  T["length"],
  U
> extends Ordering.Greater
  ? _TupleSliceNaive<[], T, U>
  : T;
type _TupleSliceNaive<
  Picked extends any[],
  Rest extends any[],
  U extends number
> = UIntCmp<Picked["length"], U> extends Ordering.Equal
  ? Picked
  : Rest extends [infer S extends any, ...infer R2 extends any[]]
  ? _TupleSliceNaive<[...Picked, S], R2, U>
  : never;

export type TupleSlice<T extends Tuple, U extends number> = TupleSliceNaive<
  T,
  U
>;

type TupleSliceRest<T extends Tuple, U extends number> = T extends [
  ...TupleSliceNaive<T, U>,
  ...infer Rest
]
  ? Rest
  : never;

type ArrayMin<T extends any[], U extends number> = T extends Tuple
  ? UIntCmp<T[0], U> extends Ordering.Less
    ? ArrayMin<TupleSliceRest<T, 1>, T[0]>
    : ArrayMin<TupleSliceRest<T, 1>, U>
  : U;
export type TupleMin<T extends Tuple> = ArrayMin<TupleSliceRest<T, 1>, T[0]>;

export type TupleUnShift<T extends Tuple> = T extends [any, ...infer Rest]
  ? Rest
  : never;

export type TupleExclude<T extends Tuple, U> = _TupleExclude<
  [],
  T[0],
  TupleUnShift<T>,
  U
>;
export type _TupleExclude<
  Checked extends any[],
  Checking,
  UnChecked extends any[],
  U
> = IsEqual<Checking, U> extends true
  ? [...Checked, ...UnChecked]
  : UnChecked extends Tuple
  ? _TupleExclude<
      [...Checked, Checking],
      UnChecked[0],
      TupleUnShift<UnChecked>,
      U
    >
  : [Checked, Checking, UnChecked];

export type TupleNest<T extends any[]> = _TupleNest<[], T>;
type _TupleNest<Nested extends any[][], T extends any[]> = T extends [
  infer R,
  ...infer Rest extends any[]
]
  ? _TupleNest<[...Nested, [R]], Rest>
  : Nested;

export type Test = {
  IS_TUPLE: Assert<IsTuple<[1, 2, 3]>>;
  TSlice: TupleSliceNaive<Tuple2K, 10>;
  TMin: TupleMin<Test["TSlice"]>;
  Exclude: TupleExclude<[1, 2, 3, 4, 5, 6, 7, 8, 9], 2>;
  Nest: TupleNest<[1, 2, 3, 4, 5, 6, 7, 8, 9]>;
};
