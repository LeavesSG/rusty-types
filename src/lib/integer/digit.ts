import { Ordering } from "../ord/ordering";
import { IsEmpty } from "../tuple/tuple";

/**
 * Typeof a digit.
 *
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
 * Typeof a digit char.
 */
export type DigitChar = `${Digit}`;

/**
 * @const Tuple Const that contains all variant of number digit.
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
 * Convert a digit from char, return {@link Digit}.
 */
export type DigitFromChar<T extends DigitChar> = DigitTuple[T];

/**
 * @deprecated
 * Compare two digits, return {@link Ordering}.
 */
export type DigitCompareRec<
  T extends Digit,
  U extends Digit
> = _DigitCompareRec<T, U, DigitTuple>;
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

export type { DigitCmp } from "./digit-cmp";

type Assertion = Assert<IsEqual<DigitCompareRec<2, 2>, Ordering.Equal>>;
