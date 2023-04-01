/**
 * Assert if Condition `T` is true, return `true`, **panic** on condition false
 */
declare type Assert<T extends true> = T extends true ? true : never;

declare type AssertNot<T extends false> = T extends false ? true : never;

/**
 * Assert if type `T` extends type `U`, return `true`, **panic** on false,
 */
declare type AssertExtends<T extends U, U> = T extends U ? true : never;

/**
 * Type of assertion result
 */
declare type Todo = never;
