/**
 * Unique symbol to mark a type as `None` variant.
 */
const __None = Symbol("None");

/**
 * Unique symbol to mark a type as `Some` variant.
 */
const __Some = Symbol("Some");

/**
 * Some value of type T.
 */
export type Some<T> = {
    __ptr: T;
    __marker: typeof __Some;
};

/**
 * No value of type T.
 *
 * In `Rust`, `None` variant has a generic type T.
 * However, in a language which wholely lives before compilation,
 * this seems to be uncalled for.
 */
export type None = {
    __marker: typeof __None;
};

/**
 * The `Option` type, indicate that a value could be exist or not.
 */
export type Option<T> = Some<T> | None;

/**
 * Check whether an `Option` type is in `Some` variant.
 */
export type IsSome<T extends Option<unknown>> = T extends Some<any> ? true : false;

/**
 * Check whether an `Option` type is in `None` variant.
 */
export type IsNone<T extends Option<unknown>> = T extends None ? true : false;

/**
 * Unwrap an `Option` type and get its inner value, throw an error if it's in `None`
 * variant.
 */
export type Unwrap<T extends Some<unknown>> = T extends Some<infer R> ? R : never;
