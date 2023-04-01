import {BenchSampleTuple2K} from "../../bench/tuple-sample/tuple";
import {UIntCmp} from "../number/unsigned";
import {Some} from "../option/option";
import {Ordering} from "../ordering/ordering";
import {Slice} from "../tuple/tuple";

export type Quick<T extends number[]> = T extends [
    infer Anchor extends number,
    ...infer Rest extends [number, ...number[]]
]
    ? Partition<Anchor, Rest> extends [
          infer Less extends number[],
          infer Equal extends number[],
          infer Greater extends number[]
      ]
        ? [...Quick<Less>, ...Equal, ...Quick<Greater>]
        : never
    : T;

type Partition<
    Anchor extends number,
    Rest extends number[],
    Less extends number[] = [],
    Equal extends number[] = [],
    Greater extends number[] = []
> = Rest extends [infer Ptr extends number, ...infer Rest extends number[]]
    ? UIntCmp<Ptr, Anchor> extends Some<Ordering.Less>
        ? Partition<Anchor, Rest, [...Less, Ptr], Equal, Greater>
        : UIntCmp<Ptr, Anchor> extends Some<Ordering.Greater>
        ? Partition<Anchor, Rest, Less, Equal, [...Greater, Ptr]>
        : Partition<Anchor, Rest, Less, [...Equal, Ptr], Greater>
    : [Less, [Anchor, ...Equal], Greater];

declare module Test {
    type Source = Slice<BenchSampleTuple2K, 30>;
    type Test = Quick<Source>;
}
