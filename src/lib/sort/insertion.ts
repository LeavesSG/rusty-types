import {UIntCmp} from "../number/unsigned";
import {Ordering} from "../ordering/ordering";
import {TupleSlice} from "../tuple/tuple";
import {type BenchSampleTuple2K} from "../../bench/tuple-sample/tuple";

export type Insertion<T extends number[]> = _InsertionLoop<[], T>;
type _InsertionLoop<Left extends number[], Right extends number[]> = Right extends [
    infer T extends number,
    ...infer Rest extends number[]
]
    ? _InsertionLoop<_InsertElement<Left, T, []>, Rest>
    : Left;

type _InsertElement<
    L extends number[],
    T extends number,
    R extends number[]
> = L extends [...infer Rest extends number[], infer Probe extends number]
    ? UIntCmp<T, Probe> extends Ordering.Less
        ? _InsertElement<[...Rest], T, [Probe, ...R]>
        : [...Rest, Probe, T, ...R]
    : [T, ...R];

export module Bench {
    // default compiler configuration only support N ~ 302
    type Tuple = TupleSlice<BenchSampleTuple2K, 10>;
    export type Bench = Insertion<Tuple>;
}
