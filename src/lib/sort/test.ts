export type a1 = [0, 1, 2, 3, 4, 5, 6];
type a2 = [0, 3, 2, 1, 4, 5, 6];
type Copy<T extends any[]> = _Copy<T, []>;
type _Copy<Source extends any[], Target extends any[]> = Source extends [
    infer Ptr,
    ...infer Rest extends any[]
]
    ? _Copy<Rest, [...Target, Ptr]>
    : Target;

type b = Copy<a1>;
type c1 = {
    [key in keyof a1]: key extends "1" | 1
        ? a1["3"]
        : key extends "3" | 3
        ? a1["1"]
        : key extends "sort"
        ? ChangeParameter<a1["sort"], a2>
        : key extends "fill"
        ? ChangeParameter<a1["fill"], a2>
        : key extends "copyWithin"
        ? ChangeParameter<a1["copyWithin"], a2>
        : a1[key];
};
type a = c1 extends [0, 3, 2, 1, 4, 5, 6] ? true : false;
type h = c1["0"];
type g = Copy<c1>;

type ChangeParameter<T extends (...args: any[]) => any, U> = T extends (
    ...args: infer P
) => infer Z
    ? (...args: P) => U
    : never;
