import {None, Some} from "../option/option";
import {IndicesUnion, Tuple} from "../tuple/tuple";
import {IterableIter, IteratorNode} from "./iter";

export type IntoIterTuple<T extends any[], U extends any[] = []> = T extends [
    infer Ptr,
    ...infer Rest
]
    ? Some<IteratorNode<U["length"], Ptr, IntoIterTuple<[...U, Ptr], Rest>>>
    : None;

export type Map<T extends Tuple> = {
    [key in IndicesUnion<T>]: unknown;
};

export type Collect<
    IterPtr extends IterableIter,
    Collected extends any[] = [IterPtr["ptr"]]
> = IterPtr["next"] extends Some<infer NextPtr extends IterableIter>
    ? Collect<NextPtr, [...Collected, NextPtr["ptr"]]>
    : Collected;
