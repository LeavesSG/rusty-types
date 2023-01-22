/**
 * Assert if Condition `T` is true, return {@link AssertPass}, **panic** on condition false
 */
declare type Assert<T extends true> = T extends true ? AssertPass.Pass : never;

declare type AssertNot<T extends false> = T extends false
  ? AssertPass.Pass
  : never;

/**
 * Determine whether type `T` equals type `U`, return boolean
 */
declare type IsEqual<T, U> = T extends U ? (U extends T ? true : false) : false;

/**
 * Type of assertion result
 */
declare enum AssertPass {
  Pass = "Pass",
}

declare type Todo = any;
