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

export type Test = [
  // DigitCmp
  Assert<IsEqual<DigitCmp<"6", "6">, Ordering.Equal>>,
  Assert<IsEqual<DigitCmp<5, "6">, Ordering.Less>>,
  Assert<IsEqual<DigitCmp<9, 1>, Ordering.Greater>>
];
