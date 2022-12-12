export interface Iter<Value, Next extends any[]> {
  value: Value;
  done: false;
  _next: Next;
}
