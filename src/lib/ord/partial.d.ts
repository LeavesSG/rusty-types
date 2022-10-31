/** @format */

declare type PartOrd = Option<Ord>;

declare type ToPartial<T extends Ord | PartOrd> = T extends Option<Ord>
  ? T
  : Option<Ord>;
