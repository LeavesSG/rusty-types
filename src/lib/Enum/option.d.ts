/**
 * Rust lang Option enum
 */
declare namespace Option {
  type None = null;
  type Some<T> = T;
  type Option<T> = Some<T> | None;
}

declare type Option<T> = Option.Option<T>;
declare type Some<T> = Option.Some<T>;
declare type None = Option.None;

declare type IsNone<T extends Option<any>> = T extends None ? true : false;
declare type IsSome<T extends Option<any>> = T extends Some<T> ? true : false;
declare type MatchSome<T extends Some<any>> = T extends Some<infer R>
  ? R
  : never;
