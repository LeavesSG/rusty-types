import {UIntCmp} from "../number/unsigned";
import {Ordering} from "../ordering/ordering";
import {Slice} from "../tuple/tuple";
import {type BenchSampleTuple2K} from "../../bench/tuple-sample/tuple";
import {Some} from "../option/option";

export type Insertion<T extends number[], Aux extends number[] = []> = T extends [
    infer T extends number,
    ...infer Rest extends number[]
]
    ? Insertion<Rest, Insert<Aux, T, []>>
    : Aux;

type Insert<L extends number[], T extends number, R extends number[]> = L extends [
    ...infer Rest extends number[],
    infer Probe extends number
]
    ? UIntCmp<T, Probe> extends Some<Ordering.Less>
        ? Insert<[...Rest], T, [Probe, ...R]>
        : [...Rest, Probe, T, ...R]
    : [T, ...R];

declare module Test {
    // default compiler configuration only support N ~ 302
    type Source = Slice<BenchSampleTuple2K, 30>;
    type Bench = Insertion<Source>;
}
