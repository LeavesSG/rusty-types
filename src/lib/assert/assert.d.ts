/**
 * Assert if Condition `T` is boolean, return {@link AssertRes}
 */
declare type Assert<T extends boolean> = T extends true
  ? AssertRes.Success
  : AssertRes.Fail;

/**
 * Assert if type `T` equals type `U`, return {@link AssertRes}
 */
declare type AssertEq<T, U> = Assert<IsEqual<T, U>>;

/**
 * Determine whether type `T` equals type `U`, return boolean
 */
declare type IsEqual<T, U> = T extends U ? (U extends T ? true : false) : false;

/**
 * Type of assertion result
 */
declare enum AssertRes {
  Success = "Success",
  Fail = "Failed",
}
