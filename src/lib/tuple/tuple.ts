import {Ordering} from "../ordering/ordering";
import {UIntCmp} from "../number/unsigned";
import {Some} from "../option/option";
import {IsEqual} from "../bool/eq";

/**
 * # Tuple
 * "Tuple" is type of a array-like linear structure that contains
 * fixed number of elements and fixed type on each position.
 *
 * ## Usage:
 * ```typescript
 * type ExmTuple = [1, 2, 3, 4, 5];
 * ```
 */
export type Tuple = [unknown, ...unknown[]];

/**
 * A Tuple that all of its elements satisfy type `T`.
 */
export type TypedTuple<T> = [T, ...T[]];

/**
 * Return whether a tuple is empty;
 *
 * ## Usage:
 * ```typescript
 * type Check = IsEmpty<[1,2,3]>; // expected false
 * type Check2 = IsEmpty<[]>; // expected true
 * ```
 */
export type IsEmpty<T extends [...any[]]> = IsEqual<T["length"], 0>;

/**
 * Return the indices of a tuple, in union type.
 *
 * ## Usage:
 * ```typescript
 * type IndicesT = IndicesUnion<[1, 2, 3]>; // expected "0"|"1"|"2"
 * ```
 */
export type IndicesUnion<T extends Tuple> = Extract<keyof T, `${number}`>;

/**
 * Remove the first element from tuple.
 * Return both the removed item and the rest array, as a new tuple.
 */
export type UnShift<T extends any[]> = T extends [infer Removed, ...infer Rest]
    ? [Removed, Rest]
    : never;

/**
 * Remove the first element from tuple.
 * Return both the removed item and the rest array, as a new tuple.
 */
export type Pop<T extends any[]> = T extends [...infer Rest, infer Removed]
    ? [Removed, Rest]
    : never;

/**
 * Pick out **first** n element in a tuple, and return them as a new tuple.
 *
 * ## Usage:
 * ```typescript
 * type Sliced = Slice<[1, 2, 3, 4, 5], 3>; // expected [1,2,3]
 * type SlicedOutOfBound = Slice<[1, 2, 3, 4, 5], 10>; // expected [1,2,3,4,5]
 * ```
 */
export type Slice<
    T extends any[],
    N extends number,
    Picked extends number[] = []
> = Picked["length"] extends 0
    ? UIntCmp<T["length"], N> extends Some<Ordering.Greater>
        ? UnShift<T> extends [infer First extends number, infer Rest extends number[]]
            ? Slice<Rest, N, [First]>
            : []
        : T
    : Picked["length"] extends N
    ? Picked
    : UnShift<T> extends [infer First extends number, infer Rest extends number[]]
    ? Slice<Rest, N, [...Picked, First]>
    : Picked;

/**
 * Pick out **last** n element in a tuple, and return them as a new tuple.
 *
 * ## Usage:
 * ```typescript
 * type Sliced = SliceRev<[1, 2, 3, 4, 5], 3>; // expected [3,4,5]
 * type SlicedOutOfBound = SliceRev<[1, 2, 3, 4, 5], 10>; // expected [1,2,3,4,5]
 * ```
 */
type SliceRev<T extends Tuple, U extends number> = T extends [
    ...Slice<T, U>,
    ...infer Rest
]
    ? Rest
    : never;

type Extremum<
    T extends any[],
    U extends number = T extends [infer First] ? First : number,
    V extends Ordering.Greater | Ordering.Less = Ordering.Less
> = T extends [infer First extends number, ...any[]]
    ? UIntCmp<First, U> extends Some<V>
        ? Extremum<SliceRev<T, 1>, T[0], V>
        : Extremum<SliceRev<T, 1>, U, V>
    : U;

/**
 * Find the min number in a number tuple.
 *
 * ## Usage
 * ```typescript
 * type Source = [1,2,3,4];
 * type Res = Min<Source>;   // expected 1
 * ```
 */
export type Min<
    T extends any[],
    U extends number = T extends [infer First] ? First : number
> = Extremum<T, U, Ordering.Less>;

/**
 * Find the max number in a number tuple.
 *
 * ## Usage
 * ```typescript
 * type Source = [1,2,3,4];
 * type Res = Max<Source>;   // expected 4
 * ```
 */
export type Max<
    T extends any[],
    U extends number = T extends [infer First] ? First : number
> = Extremum<T, U, Ordering.Greater>;

/**
 * Convert every item in Tuple in to its nested form.
 *
 * ## Usage
 * ```typescript
 * type Source = [1,2,3];
 * type Res = Nest<Source>; // expected [[1],[2],[3]]
 * ```
 */
export type Nest<T extends any[], N extends any[][] = []> = T extends [
    infer R,
    ...infer Rest extends any[]
]
    ? Nest<Rest, [...N, [R]]>
    : N;

/**
 * Distribute every element in tuple T to tuple U, return a new tuple
 * with elements of combinations of items in T and U.
 *
 * ## Usage
 * ```typescript
 * type Source1 = [1, 2];
 * type Source2 = ["A", "B"];
 * type Res = Distribute<Source1, Source2>; // expected: [[1, "A"], [1, "B"], [2, "A"], [2, "B"]]
 * ```
 */
export type Distribute<
    T extends any[],
    U extends any[],
    Inner extends any[] = U,
    Done extends any[] = []
> = Inner extends [infer InPtr, ...infer InRest]
    ? Distribute<T, U, InRest, [...Done, [T[0], InPtr]]>
    : T extends [any, ...infer OutRest extends Tuple]
    ? Case<"Next", Distribute<OutRest, U, U, Done>>
    : Case<"Escape", Done>;

/**
 * Given a tuple T and a type U, return subset without
 * its first element assignable to U.
 *
 * ## Usage
 * ```typescript
 * type Source = [1,2,3,4];
 * type Res = RemoveFirstMatch<Source,2>;   // expected [1,3,4]
 * ```
 */
export type RemoveFirstMatch<T extends any[], U, Done extends any[] = []> = T extends [
    infer Ptr,
    ...infer Rest extends any[]
]
    ? IsEqual<Ptr, U> extends true
        ? [...Done, ...Rest]
        : RemoveFirstMatch<Rest, U, [...Done, Ptr]>
    : [...T, ...Done];

export type TupleNewIndex<
    L extends number,
    D extends number[] = []
> = D["length"] extends L ? D : TupleNewIndex<L, [...D, D["length"]]>;
