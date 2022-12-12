export type Tuple = [any, ...any];

export type IsEmpty<T extends [...any[]]> = IsEqual<T["length"], 0>;

export type IsTuple<T extends any[]> = T extends Tuple ? true : false;

type Assertion = Assert<IsTuple<[1, 2, 3]>>;
