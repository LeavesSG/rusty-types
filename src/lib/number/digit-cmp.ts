import {Digit} from "./digit";
import {Ordering} from "../ordering/ordering";

// prettier-ignore
/**
 * @constant Table for fast digit comparison.
 */
type DigitCmpSource = [
    [Ordering.Equal, Ordering.Less, Ordering.Less, Ordering.Less, Ordering.Less, Ordering.Less, Ordering.Less,Ordering.Less,Ordering.Less,Ordering.Less],
    [Ordering.Greater, Ordering.Equal, Ordering.Less, Ordering.Less, Ordering.Less, Ordering.Less, Ordering.Less,Ordering.Less,Ordering.Less,Ordering.Less],
    [Ordering.Greater, Ordering.Greater, Ordering.Equal, Ordering.Less, Ordering.Less, Ordering.Less, Ordering.Less,Ordering.Less,Ordering.Less,Ordering.Less],
    [Ordering.Greater, Ordering.Greater, Ordering.Greater, Ordering.Equal, Ordering.Less, Ordering.Less, Ordering.Less,Ordering.Less,Ordering.Less,Ordering.Less],
    [Ordering.Greater, Ordering.Greater, Ordering.Greater, Ordering.Greater, Ordering.Equal, Ordering.Less, Ordering.Less,Ordering.Less,Ordering.Less,Ordering.Less],
    [Ordering.Greater, Ordering.Greater, Ordering.Greater, Ordering.Greater, Ordering.Greater, Ordering.Equal, Ordering.Less,Ordering.Less,Ordering.Less,Ordering.Less],
    [Ordering.Greater, Ordering.Greater, Ordering.Greater, Ordering.Greater, Ordering.Greater, Ordering.Greater, Ordering.Equal,Ordering.Less,Ordering.Less,Ordering.Less],
    [Ordering.Greater, Ordering.Greater, Ordering.Greater, Ordering.Greater, Ordering.Greater, Ordering.Greater, Ordering.Greater,Ordering.Equal,Ordering.Less,Ordering.Less],
    [Ordering.Greater, Ordering.Greater, Ordering.Greater, Ordering.Greater, Ordering.Greater, Ordering.Greater, Ordering.Greater,Ordering.Greater,Ordering.Equal,Ordering.Less],
    [Ordering.Greater, Ordering.Greater, Ordering.Greater, Ordering.Greater, Ordering.Greater, Ordering.Greater, Ordering.Greater,Ordering.Greater,Ordering.Greater,Ordering.Equal],
  ];

/**
 * Compare two digits, return {@link Ordering};
 *
 * ### Usage:
 * ```typescript
 * type Example = DigitCmp<1,2> // expected Ordering.Less
 * type Example2 = DigitCmp<'2',2>  // expected Ordering.Equal
 * type Example3 = DigitCmp<'3',2>  // expected Ordering.Greater
 * ```
 */
export type DigitCmp<
    T extends Digit | `${Digit}`,
    U extends Digit | `${Digit}`
> = DigitCmpSource[T][U];
