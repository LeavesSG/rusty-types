import { Digit } from "./digit";
import { Ordering } from "../ord/ordering";

// prettier-ignore
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
export type DigitCmp<
  T extends Digit | `${Digit}`,
  U extends Digit | `${Digit}`
> = DigitCmpSource[T][U];

type Assertion = Assert<IsEqual<DigitCmp<"6", "6">, Ordering.Equal>>;
