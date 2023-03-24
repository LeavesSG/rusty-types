import {Ordering} from "./ordering";
/**
 * "PartialOrdering" indicates that the two values don't have to have a order.
 *
 * ### Usage:
 * ```
 * type PartialOrd = Cmp<Vec2<2,3>,Vec2<3,2>>; // expected undefined
 * ```
 */
export type PartialOrdering = Ordering | undefined;

/**
 * Make a total or partial order partial.
 *
 * ### Usage:
 * ```
 * type PartialOrd = ToPartial<Ordering.Equal>;  // expected Ordering.Equal | undefined
 * ```
 */
export type ToPartial<T extends Ordering | PartialOrdering> = T extends T | undefined
    ? T
    : T | undefined;
