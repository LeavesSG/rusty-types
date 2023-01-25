import { Ordering } from "./ordering";
export type PartialOrdering = Ordering | undefined;
export type ToPartial<T extends Ordering | PartialOrdering> = T extends
  | T
  | undefined
  ? T
  : T | undefined;
