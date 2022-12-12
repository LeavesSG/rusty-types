export type Split<
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
