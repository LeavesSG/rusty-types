import { Ordering } from "./ordering";
import { Option } from "../enum/option";

export type PartialOrdering = Ordering | undefined;
export type ToPartial<T extends Ordering | PartialOrdering> =
  T extends Option<Ordering> ? T : Option<Ordering>;
