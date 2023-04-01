/**
 * Represent the order of two element in one set.
 *
 * ## Usage:
 * ```typescript
 * type Ord = Ordering.Equal;
 * ```
 */
export enum Ordering {
    /**
     * indicates that the first element is less than the second.
     */
    Less = "Less",
    /**
     * indicates that the first element is equal to the second.
     */
    Equal = "Equal",
    /**
     * indicates that the first element is greater than the second.
     */
    Greater = "Greater",
}
