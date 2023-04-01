import {Tuple, RemoveFirstMatch, Min, Slice} from "../tuple/tuple";
import {BenchSampleTuple2K} from "../../bench/tuple-sample/tuple";

export type Selection<
    UnSorted extends any[],
    Sorted extends any[] = []
> = UnSorted extends Tuple
    ? Min<UnSorted> extends infer Min
        ? Selection<RemoveFirstMatch<UnSorted, Min>, [...Sorted, Min]>
        : never
    : Sorted;

export module Bench {
    // default compiler configuration only support N ~ 230
    type Tuple = Slice<BenchSampleTuple2K, 10>;
    export type Bench = Selection<Tuple>;
}
