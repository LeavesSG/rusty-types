import {Option} from "../option/option";

/**
 * Following define an interface of `Rust` style iterator.
 * Each stage was wrapped with `Some` variant of the `Option` enum.
 * If done, the final stage will be Option::None.
 *
 *
 * ### Usage
 * ```typescript
 * type NextItem<Iter extends IterableIter> = Iter["next"] extends Some<
 *    infer Next extends IterableIter> ? Next["ptr"]: never;
 *
 * type Item2 = NextItem<IntoIterTuple<[1,2,3]>> // 2;
 * ```
 */
export interface IterableIter {
    /**
     * Index of current item, used in Enumerate.
     */
    index: number;
    /**
     * Current item.
     */
    ptr: unknown;
    /**
     * Iter next state.
     */
    next: Option<IterableIter>;
}

/**
 * Construct an Iterable Node.
 * Proper use of this interface will help ensure defining the correct
 * type to build an iterator.
 */
export interface IteratorNode<I extends number, Ptr, N extends Option<IterableIter>>
    extends IterableIter {
    index: I;
    ptr: Ptr;
    next: N;
}
