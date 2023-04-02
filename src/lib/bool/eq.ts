/**
 * Determine whether type `T` equals type `U`, return `boolean`
 * TODO: need to be optimized.
 */
export type IsEqual<T, U> = T extends U ? (U extends T ? true : false) : false;
