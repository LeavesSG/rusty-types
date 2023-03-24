import {Ordering} from "../ordering/ordering";
import {UIntCmp} from "../number/unsigned";

/**
 * "Tuple" is a type of array that contains fixed number of elements and fixed type on each position.
 *
 * ### Usage:
 * ```typescript
 * type ExmTuple = [1, 2, 3, 4, 5];
 * ```
 */
export type Tuple = [any, ...any];

/**
 * A Tuple that all of its elements is type `T`.
 *
 * ### Usage:
 * ```typescript
 * type ExmTuple<number> = [1, 2, 3, 4, 5];
 * type ExmTuple<string> = ["", "hello", "world"];
 * ```
 */
export type TypedTuple<T> = [T, ...T[]];

/**
 * Whether a tuple is empty;
 *
 * ### Usage:
 * ```typescript
 * type Check = IsEmpty<[1,2,3]>; // expected false
 * type Check2 = IsEmpty<[]>; // expected true
 * ```
 */
export type IsEmpty<T extends [...any[]]> = IsEqual<T["length"], 0>;

export type Indices<T extends Tuple> = Extract<keyof T, `${number}`>;

type TupleSliceNaive<T extends Tuple, U extends number> = UIntCmp<
    T["length"],
    U
> extends Ordering.Greater
    ? _TupleSliceNaive<[], T, U>
    : T;
type _TupleSliceNaive<
    Picked extends any[],
    Rest extends any[],
    U extends number
> = UIntCmp<Picked["length"], U> extends Ordering.Equal
    ? Picked
    : Rest extends [infer S extends any, ...infer R2 extends any[]]
    ? _TupleSliceNaive<[...Picked, S], R2, U>
    : never;

export type TupleSlice<T extends Tuple, U extends number> = TupleSliceNaive<T, U>;

type TupleSliceRest<T extends Tuple, U extends number> = T extends [
    ...TupleSliceNaive<T, U>,
    ...infer Rest
]
    ? Rest
    : never;

type ArrayMin<T extends any[], U extends number> = T extends Tuple
    ? UIntCmp<T[0], U> extends Ordering.Less
        ? ArrayMin<TupleSliceRest<T, 1>, T[0]>
        : ArrayMin<TupleSliceRest<T, 1>, U>
    : U;
export type TupleMin<T extends Tuple> = ArrayMin<TupleSliceRest<T, 1>, T[0]>;

export type TupleUnShift<T extends Tuple> = T extends [any, ...infer Rest] ? Rest : never;

export type TupleExclude<T extends Tuple, U> = _TupleExclude<
    [],
    T[0],
    TupleUnShift<T>,
    U
>;
type _TupleExclude<Checked extends any[], Checking, UnChecked extends any[], U> = IsEqual<
    Checking,
    U
> extends true
    ? [...Checked, ...UnChecked]
    : UnChecked extends Tuple
    ? _TupleExclude<[...Checked, Checking], UnChecked[0], TupleUnShift<UnChecked>, U>
    : [Checked, Checking, UnChecked];

export type TupleNest<T extends any[]> = _TupleNest<[], T>;
type _TupleNest<Nested extends any[][], T extends any[]> = T extends [
    infer R,
    ...infer Rest extends any[]
]
    ? _TupleNest<[...Nested, [R]], Rest>
    : Nested;
