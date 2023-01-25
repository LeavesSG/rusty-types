import { Ordering } from "../ordering/ordering";
import { Tuple2K } from "../../bench/tuple/tuple";
import { TupleSlice } from "../tuple/tuple";
import { UIntCmp } from "../number/unsigned";

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

type Partition<Anchor extends number, Rest extends number[]> = PartitionInner<
  Anchor,
  Rest,
  [],
  [],
  []
>;
type PartitionInner<
  Anchor extends number,
  Rest extends number[],
  Less extends number[],
  Equal extends number[],
  Greater extends number[]
> = Rest extends [infer Ptr extends number, ...infer Rest extends number[]]
  ? UIntCmp<Ptr, Anchor> extends Ordering.Less
    ? PartitionInner<Anchor, Rest, [...Less, Ptr], Equal, Greater>
    : UIntCmp<Ptr, Anchor> extends Ordering.Greater
    ? PartitionInner<Anchor, Rest, Less, Equal, [...Greater, Ptr]>
    : PartitionInner<Anchor, Rest, Less, [...Equal, Ptr], Greater>
  : [Less, [Anchor, ...Equal], Greater];

export module Test {
  type TestTuple = TupleSlice<Tuple2K, 10>;
  type a = Quick<TestTuple>;
}
