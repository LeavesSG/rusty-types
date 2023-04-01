/**
 * Determine whether type `T` equals type `U`, return boolean
 */
export type IsEqual<T, U> = T extends U ? (U extends T ? true : false) : false;
