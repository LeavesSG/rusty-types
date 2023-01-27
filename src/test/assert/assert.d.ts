/**
 * Assert if Condition `T` is true, return {@link AssertPass}, **panic** on condition false
 */
declare type Assert<T extends true> = T extends true ? true : never;

declare type AssertNot<T extends false> = T extends false ? true : never;

/**
 * Determine whether type `T` equals type `U`, return boolean
 */
declare type IsEqual<T, U> = T extends U ? (U extends T ? true : false) : false;

/**
 * Type of assertion result
 */
declare type Todo = never;
