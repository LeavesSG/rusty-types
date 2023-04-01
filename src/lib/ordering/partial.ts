import {Option, Some} from "./../option/option";
import {Ordering} from "./ordering";
/**
 * "PartialOrdering" indicates that the two values may or may not to have an order..
 *
 * ## Usage:
 * ```
 * type PartialOrd = Cmp<Vec2<2,3>,Vec2<3,2>>; // expected None
 * ```
 */
export type PartialOrdering = Option<Ordering>;

/**
 * Make a total or partial order partial.
 *
 * ## Usage:
 * ```
 * type PartialOrd = ToPartial<Ordering.Equal>;  // expected Some<Ordering.Equal>
 * ```
 */
export type ToPartial<T extends Ordering | PartialOrdering> = T extends Option<T>
    ? T
    : Some<T>;
