import { Ordering } from "./ordering";

export type Option<T> = T | undefined;

export type PartialOrdering = Ordering | undefined;
export type ToPartial<T extends Ordering | PartialOrdering> =
  T extends Option<Ordering> ? T : Option<Ordering>;
