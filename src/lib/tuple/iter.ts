import { Iter } from "../iter/iter";

export type TupleIter<T extends any[]> = Iter<never, T>;
export type NextIter<T extends TupleIter<any>> = T extends {
  value: infer Value;
  done: true;
  _next: infer Next;
}
  ? {
      value: Value;
      done: true;
      _next: Next;
    }
  : T extends {
      value: any;
      done: false;
      _next: [infer Next, ...infer Rest];
    }
  ? {
      value: Next;
      done: Rest["length"] extends 0 ? true : false;
      _next: Rest;
    }
  : never;
