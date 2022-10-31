/** @format */

/**
 * Convert a integer to a tuple of digit chars
 */
type IntTuple<T extends number> = Split<`${T}`, "">;

/**
 * Type of a char tuple
 */
type CharTuple = DigitChar[];

/**
 * Compare two integers, return {@link PartOrd}
 */
type IntCmp<
  T extends number,
  U extends number
> = IntTuple<T> extends infer TupleT
  ? IntTuple<U> extends infer TupleU
    ? TupleT extends CharTuple
      ? TupleU extends CharTuple
        ? TupleLengthCompare<TupleT, TupleU> extends infer R extends Ord
          ? R extends Ord.Eq
            ? ToPartial<TupleItemCompare<TupleT, TupleU>>
            : ToPartial<R>
          : never
        : None
      : None
    : never
  : never;
type TupleItemCompare<T extends CharTuple, U extends CharTuple> = T extends [
  DigitChar,
  ...infer R extends CharTuple
]
  ? U extends [DigitChar, ...infer S extends CharTuple]
    ? DigitCompare<DigitFromChar<T[0]>, DigitFromChar<U[0]>> extends infer X
      ? X extends Ord.Eq
        ? TupleItemCompare<R, S>
        : X
      : never
    : Ord.Eq
  : Ord.Eq;
type TupleLengthCompare<
  T extends [...DigitChar[]],
  U extends [...DigitChar[]]
> = T["length"] extends Digit
  ? U["length"] extends Digit
    ? DigitCompare<T["length"], U["length"]>
    : Ord.Less
  : U["length"] extends Digit
  ? Ord.Greater
  : IntCmp<T["length"], U["length"]>;
