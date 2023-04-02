import {Unwrap} from "./../option/option";
import {Digit, DigitChar, DigitCmp} from "./digit";
import {Ordering} from "../ordering/ordering";
import {ToPartial} from "../ordering/partial";
import {Split} from "../string/string";

/**
 * Convert a integer to a tuple of digit chars.
 *
 * ## Usage:
 * ```typescript
 * type Tuple = UIntTuple<417655> // expected ['4','1','7','6','5','5']
 * ```
 */
type UIntTuple<T extends number> = Split<`${T}`, "">;

/**
 * # Unsigned integer comparison.
 * Compare two integers, return {@link Ordering}.
 * Use CharTuple as its media, as string literals didn't have
 * a compile time length.
 *
 * ## Usage:
 * ```typescript
 * type Ord = UIntCmp<37,73>; // expected Some<Ordering.Less>
 * ```
 */
export type UIntCmp<
    T extends number,
    U extends number
> = UIntTuple<T> extends infer TupleT extends DigitChar[]
    ? UIntTuple<U> extends infer TupleU extends DigitChar[]
        ? __TupleLengthCompare<TupleT, TupleU> extends infer R extends Ordering
            ? R extends Ordering.Equal
                ? ToPartial<__TupleItemCompare<TupleT, TupleU>>
                : ToPartial<R>
            : never
        : never
    : never;
type __TupleItemCompare<T extends DigitChar[], U extends DigitChar[]> = T extends [
    DigitChar,
    ...infer R extends DigitChar[]
]
    ? U extends [DigitChar, ...infer S extends DigitChar[]]
        ? DigitCmp<T[0], U[0]> extends infer X
            ? X extends Ordering.Equal
                ? __TupleItemCompare<R, S>
                : X
            : never
        : Ordering.Equal
    : Ordering.Equal;
type __TupleLengthCompare<
    T extends [...DigitChar[]],
    U extends [...DigitChar[]]
> = T["length"] extends Digit
    ? U["length"] extends Digit
        ? DigitCmp<T["length"], U["length"]>
        : Ordering.Less
    : U["length"] extends Digit
    ? Ordering.Greater
    : UIntCmp<T["length"], U["length"]>;

declare module Test {
    type Num1 = 12315;
    type Num2 = 13214;
    type ExpectedLess = AssertSatisfy<Unwrap<UIntCmp<Num1, Num2>>, Ordering.Less>;
    type ExpectedEqual = AssertSatisfy<Unwrap<UIntCmp<Num1, Num1>>, Ordering.Equal>;
    type ExpectedGreater = AssertSatisfy<Unwrap<UIntCmp<Num2, Num1>>, Ordering.Greater>;
}
