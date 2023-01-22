import { Ordering } from "../ord/ordering";
import { Tuple2K } from "../../bench/tuple/tuple";
import { TupleNest, TupleSlice } from "../tuple/tuple";
import { UIntCmp } from "../int/unsigned";

export type TupleMerge<T extends number[], U extends number[]> = T extends [
  infer T0 extends number,
  ...infer TRest extends number[]
]
  ? U extends [infer U0 extends number, ...infer URest extends number[]]
    ? _TupleMerge<TRest, URest, [], T0, U0>
    : T
  : U;

type _TupleMerge<
  T extends number[],
  U extends number[],
  Merged extends number[],
  T0 extends number,
  U0 extends number
> = UIntCmp<T0, U0> extends Ordering.Less
  ? T extends [infer T1 extends number, ...infer TRest extends number[]]
    ? _TupleMerge<TRest, U, [...Merged, T0], T1, U0>
    : [...Merged, T0, U0, ...U]
  : U extends [infer U1 extends number, ...infer URest extends number[]]
  ? _TupleMerge<T, URest, [...Merged, U0], T0, U1>
  : [...Merged, U0, T0, ...T];

export type Merge<T extends number[]> = _Merge<TupleNest<T>>;
type _Merge<T extends number[][]> = T["length"] extends 0 | 1
  ? T[0]
  : _Merge<_MergeInner<[], T>>;
type _MergeInner<
  Merged extends number[][],
  Candidate extends number[][]
> = Candidate extends [
  infer R1 extends number[],
  infer R2 extends number[],
  ...infer Rest extends number[][]
]
  ? _MergeInner<[...Merged, TupleMerge<R1, R2>], Rest>
  : [...Merged, ...Candidate];

export type Test = {
  // merge
  tupleMerge: TupleMerge<[1, 2], []>;
  // this merge impl allows N ~ 900, and in this case, tuple slice seem to be the barrier
  tuple: TupleSlice<Tuple2K, 10>;
  merge: Merge<Test["tuple"]>;
};
