// import {Graph} from "../graph/graph";

// export type Matrix<Tier extends number> = {
//     tier: Tier;
//     buf: any[][];
// };

// export type IntoGraph<T extends number, M extends Matrix<T>> = 1;
// type _IntoGraph<
//     T extends number,
//     M extends Matrix<T>,
//     RI extends any[],
//     CI extends any[],
//     G extends Graph
// > = RI["length"] extends M["tier"]
//     ? G
//     : CI["length"] extends M["tier"]
//     ? _IntoGraph<T, M, [...RI, any], [], G>
//     : {
//           [_RI in GetAdjacentNumber<RI, T>[number] extends infer Indices extends number
//               ? Indices
//               : never]: {
//               [_CI in GetAdjacentNumber<
//                   CI,
//                   T
//               >[number] extends infer Indices extends number
//                   ? Indices
//                   : never]: [_RI, _CI];
//           };
//       };

// type GetAdjacentNumber<Index extends any[], T extends number> = [
//     ...(Index extends [any, ...infer Rest extends any[]] ? [Rest["length"]] : []),
//     Index["length"],
//     ...([...Index, any]["length"] extends T ? [] : [[...Index, any]["length"]])
// ];

// type GetAdjacent<
//     T extends number,
//     RBuf extends any[],
//     LBuf extends any[],
//     M extends Matrix<T>
// > = {
//     [RI in GetAdjacentNumber<RBuf, T>[number] extends infer Indices extends number
//         ? Indices
//         : never]: {
//         [CI in GetAdjacentNumber<LBuf, T>[number] extends infer Indices extends number
//             ? Indices
//             : never]: M["buf"][CI][RI];
//     };
// };

// type Mat4 = {
//     tier: 4;
//     buf: [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]];
// };

// type z = GetAdjacent<4, [1, 1], [1, 1], Mat4>;
