import {None, Some} from "../option/option";
import {Indices, Tuple} from "../tuple/tuple";
import {IterableIter, IteratorNode} from "./iter";

export type IntoIterTuple<T extends Tuple> = T extends [infer First, ...infer Rest]
    ? IteratorNode<0, First, __IntoIterTuple<[First], Rest>>
    : never;
type __IntoIterTuple<Cached extends unknown[], Rest extends unknown[]> = Rest extends [
    infer Ptr,
    ...infer Rest
]
    ? Some<IteratorNode<Cached["length"], Ptr, __IntoIterTuple<[...Cached, Ptr], Rest>>>
    : None;

export type Map<T extends Tuple> = {
    [key in Indices<T>]: unknown;
};

export type Collect<T extends IterableIter> = __Collect<T, [T["ptr"]]>;
type __Collect<
    IterPtr extends IterableIter,
    Collected extends any[]
> = IterPtr["next"] extends Some<infer NextPtr extends IterableIter>
    ? __Collect<NextPtr, [...Collected, NextPtr["ptr"]]>
    : Collected;
