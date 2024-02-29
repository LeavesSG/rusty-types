# TypeGymPlayGround

This is a Typescript playground that implement various basic data structures with the type system in Rust lang style.

## Implemented

### Option

An enum from Rust, indicates a "nullable" value. It's implemented with 2 unique symbol type as its two enum variant: `Some` and `None`. We'll avoid using `undefined`, as its an exhausting feature in Javascript. Any types in this lib that may or may not contains a value will return `Option<T>`.

### Ordering

An enum indicate the possible order between two types if there has one.
It contains 3 variants: `Greater`, `Equal` and `Less`.

### Partial Ordering

In some cases, two types in the comparison may or may not have an order, like a `string` and a `number`. In this case, `Option<Ordering>` will be returned and its aliased as `PartialOrdering`.

### Tuple

Indicates an Array-liked type that contains fixed length at compile-time and fixed type at each position. It's pretty the same thing of a runtime array in javascript. This is a basic media in Typescript type system and we'll used it a lot to implement other engaging features.

### Sort

Currently only `Selection`, `Insertion`, `Merge` and `Quick` were implemented. Other fundamental sorting methods are either not suitable for type system, or tricky for me to implement.

Each method provides ability to sort tuple with 300~1000 unsigned integers. And this capability might slightly affected after supporting signed integers and floats in the future.

## Struggling

- Exchange tuple item directly through index and still be able to recognized as tuple literal by ts-server.
- Shell sort, heap sort, tim sort.

## Planned

- ~~Graph Api and Graph searching algorithms.~~
