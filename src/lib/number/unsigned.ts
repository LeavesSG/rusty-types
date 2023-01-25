import { Digit, DigitChar, DigitCmp } from "./digit";
import { Ordering } from "../ordering/ordering";
import { Split } from "../string/string";
import { ToPartial } from "../ordering/partial";

/**
 * Convert a integer to a tuple of digit chars
 */
type IntTuple<T extends number> = Split<`${T}`, "">;

/**
 * Compare two integers, return {@link Ordering}
 */
export type UIntCmp<
  T extends number,
  U extends number
> = IntTuple<T> extends infer TupleT extends DigitChar[]
  ? IntTuple<U> extends infer TupleU extends DigitChar[]
    ? _TupleLengthCompare<TupleT, TupleU> extends infer R extends Ordering
      ? R extends Ordering.Equal
        ? ToPartial<_TupleItemCompare<TupleT, TupleU>>
        : ToPartial<R>
      : never
    : never
  : never;
type _TupleItemCompare<
  T extends DigitChar[],
  U extends DigitChar[]
> = T extends [DigitChar, ...infer R extends DigitChar[]]
  ? U extends [DigitChar, ...infer S extends DigitChar[]]
    ? DigitCmp<T[0], U[0]> extends infer X
      ? X extends Ordering.Equal
        ? _TupleItemCompare<R, S>
        : X
      : never
    : Ordering.Equal
  : Ordering.Equal;
type _TupleLengthCompare<
  T extends [...DigitChar[]],
  U extends [...DigitChar[]]
> = T["length"] extends Digit
  ? U["length"] extends Digit
    ? DigitCmp<T["length"], U["length"]>
    : Ordering.Less
  : U["length"] extends Digit
  ? Ordering.Greater
  : UIntCmp<T["length"], U["length"]>;

export type Test = [
  // uint cmp
  Assert<IsEqual<UIntCmp<132, 133>, Ordering.Less>>
];
