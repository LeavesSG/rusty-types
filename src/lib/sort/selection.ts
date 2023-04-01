import {Tuple, RemoveFirstMatch, Min, Slice} from "../tuple/tuple";
import {BenchSampleTuple2K} from "../../bench/tuple-sample/tuple";

export type Selection<T extends Tuple> = _Selection<[], T>;
export type _Selection<
    Sorted extends any[],
    UnSorted extends any[]
> = UnSorted extends Tuple
    ? Min<UnSorted> extends infer Min
        ? _Selection<[...Sorted, Min], RemoveFirstMatch<UnSorted, Min>>
        : never
    : Sorted;

export module Bench {
    // default compiler configuration only support N ~ 230
    type Tuple = Slice<BenchSampleTuple2K, 10>;
    export type Bench = Selection<Tuple>;
}
