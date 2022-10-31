/**
 * @const Tuple Const that contains all various of number digit
 */
type DigitTuple = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

/**
 * Typeof a digit
 */
type Digit = DigitTuple[number];

/**
 * Typeof a digit char
 */
type DigitChar = `${Digit}`;

/**
 * Convert a digit from char, return {@link Digit}
 */
type DigitFromChar<T extends DigitChar> = DigitTuple[T];

/**
 * Compare two digits, return {@link Ord}
 */
type DigitCompare<T extends Digit, U extends Digit> = DigitCompareRec<
  T,
  U,
  DigitTuple
>;
type DigitCompareRec<
  T extends Digit,
  U extends Digit,
  P extends Digit[]
> = IsEmpty<P> extends true
  ? never
  : P[0] extends T
  ? P[0] extends U
    ? Ord.Eq
    : Ord.Less
  : P[0] extends U
  ? Ord.Greater
  : P extends [Digit, ...infer Q]
  ? Q extends Digit[]
    ? DigitCompareRec<T, U, Q>
    : never
  : never;

////////  TESTS  ////////
type Test_Digit = AssertEq<DigitCompare<1, 9>, Ord.Less>;
