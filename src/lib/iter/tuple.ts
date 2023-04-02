import {Some, Unwrap} from "../option/option";
import {Tuple} from "../tuple/tuple";
import {IterableIter} from "./iter";
import {IntoIter as ArrayIntoIter} from "./array";

/**
 * Convert a tuple type T into IterableIter type. Returns {@link IterableIter}
 *
 * ## Usage
 * ```typescript
 * type Source = [1,2,3];
 *
 * type IterableSource = IntoIter<Source>;
 * // expected: IteratorNode<0,1,Some<IteratorNode<1,2,Some<IteratorNode<2,3,None>>>>>
 * ```
 */

export type IntoIter<T extends Tuple> = Unwrap<ArrayIntoIter<T>>;

/**
 * Collect an IterableIter type into tuple form. Returns {@link Tuple}
 *
 * ## Usage
 * ```typescript
 * type Source = Some<IteratorNode<0,1,Some<IteratorNode<1,2,Some<IteratorNode<2,3,None>>>>>>;
 * type Res = Collect<Source>;  // expected [1,2,3];
 * ```
 *
 */
export type Collect<
    IterPtr extends IterableIter,
    Collected extends any[] = [IterPtr["ptr"]]
> = IterPtr["next"] extends Some<infer NextPtr extends IterableIter>
    ? Collect<NextPtr, [...Collected, NextPtr["ptr"]]>
    : Collected;
