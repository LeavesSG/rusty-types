/**
 * Split the given string with given string.
 *
 * ## Usage:
 * ```typescript
 * type Splitted = Split<"123321","3">; // expected ["12","","21"];
 * type Splitted2 = Split<"123321","">; // expected ["1","2","3","3","2","1"];
 * ```
 */
export type Split<
    Str extends string,
    Separator extends string
> = Str extends `${infer L}${Separator}${infer R}`
    ? R extends ""
        ? [L]
        : [L, ...Split<R, Separator>]
    : Str extends ""
    ? Separator extends ""
        ? []
        : [Str]
    : Str extends `${any}`
    ? [Str]
    : string[];
