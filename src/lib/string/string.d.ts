type StringToUnion<T extends string> = T extends `${infer First}${infer Reset}`
  ? First | StringToUnion<Reset>
  : never;

type CapitalLetter =
  | StringToUnion<"ABCDEFGH">
  | StringToUnion<"IJKLMNOPQRSTUVXYZ">;
declare type StringLiteralize<T> = T extends
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined
  ? `${T}`
  : "NOT_SUPPORT";

declare type Split<
  S extends string,
  SEP extends string
> = S extends `${infer L}${SEP}${infer R}`
  ? R extends ""
    ? [L]
    : [L, ...Split<R, SEP>]
  : S extends ""
  ? SEP extends ""
    ? []
    : [S]
  : S extends `${any}`
  ? [S]
  : string[];

declare type StringPattern<T extends string> = `${string}${T}${string}`;

declare type StringIncludes<T extends string, U extends string> = Extract<
  T,
  StringPattern<U>
>;

declare type StringExcludes<T extends string, U extends string> = Exclude<
  T,
  StringPattern<U>
>;

declare type IgnoreCase<T extends string> = Uppercase<T> | Lowercase<T>;

type SplitCamelCase<T extends string> = SplitRecursive<[T]>;
type Headed<T> = T extends `${infer R}${CapitalLetter}${string}`
  ? R extends Lowercase<R>
    ? R
    : never
  : never;
type Rested<T> = T extends `${Headed<T>}${infer R}` ? R : never;
type SplitRecursive<T extends [...string[], string]> = T extends [
  ...infer U extends [...string[]],
  infer R extends string
]
  ? Headed<R> extends never
    ? T
    : SplitRecursive<
        [...U, Headed<Uncapitalize<R>>, Uncapitalize<Rested<Uncapitalize<R>>>]
      >
  : never;
