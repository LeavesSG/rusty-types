import {Ordering} from "../ordering/ordering";
import {Nest, Slice} from "../tuple/tuple";
import {UIntCmp} from "../number/unsigned";
import {BenchSampleTuple2K} from "../../bench/tuple-sample/tuple";

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

export type Merge<T extends number[]> = _Merge<Nest<T>>;
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

declare module Test {
    // default compiler configuration only support N ~ 302
    type Source = Slice<BenchSampleTuple2K, 50>;
    type Bench = Merge<Source>;
}
