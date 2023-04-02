import {Some, None} from "../lib";
import {IteratorNode} from "./iter";

export type IntoIter<T extends any[], U extends any[] = []> = T extends [
    infer Ptr,
    ...infer Rest
]
    ? Some<IteratorNode<U["length"], Ptr, IntoIter<Rest, [...U, Ptr]>>>
    : None;
