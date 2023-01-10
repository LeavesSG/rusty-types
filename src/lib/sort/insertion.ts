import { Tuple100, Tuple500 } from "../bench/tuple";
import { UIntCmp } from "../integer/unsigned";
import { Ordering } from "../ord/ordering";

export type Insertion<T extends number[]> = _InsertionLoop<[], T>;
type _InsertionLoop<
  Left extends number[],
  Right extends number[]
> = Right extends [infer T extends number, ...infer Rest extends number[]]
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

type z = Insertion<Tuple100>;
