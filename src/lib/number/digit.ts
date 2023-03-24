import {IsEmpty} from "../tuple/tuple";
import {Ordering} from "../ordering/ordering";

/**
 * Enum of a digit.
 * The minimal unit of a number that could be directly compared.
 *
 * ### Usage:
 * ```typescript
 * const one = Digit.One;
 * Assert<IsEqual<Digit.Two,2>> // expected: true
 * ```
 */
export enum Digit {
    Zero = 0,
    One = 1,
    Two = 2,
    Three = 3,
    Four = 4,
    Five = 5,
    Six = 6,
    Seven = 7,
    Eight = 8,
    Nine = 9,
}

/**
 * Typeof a digit character.
 * A media type used for number comparison.
 */
export type DigitChar = `${Digit}`;

/**
 * @deprecated
 * @constant Tuple Const that contains all variant of number digit.
 * Used for recursion based digit comparison.
 */
export type DigitTuple = [
    Digit.Zero,
    Digit.One,
    Digit.Two,
    Digit.Three,
    Digit.Four,
    Digit.Five,
    Digit.Six,
    Digit.Seven,
    Digit.Eight,
    Digit.Nine
];

/**
 * @deprecated
 * Compare two digits, return {@link Ordering}.
 */
export type DigitCompareRec<T extends Digit, U extends Digit> = _DigitCompareRec<
    T,
    U,
    DigitTuple
>;
type _DigitCompareRec<
    T extends Digit,
    U extends Digit,
    P extends Digit[]
> = IsEmpty<P> extends true
    ? never
    : P[0] extends T
    ? P[0] extends U
        ? Ordering.Equal
        : Ordering.Less
    : P[0] extends U
    ? Ordering.Greater
    : P extends [Digit, ...infer Q]
    ? Q extends Digit[]
        ? _DigitCompareRec<T, U, Q>
        : never
    : never;

export type {DigitCmp} from "./digit-cmp";
