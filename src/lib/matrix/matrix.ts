import {GraphNew, VertexNew} from "../graph/graph";
import {Graph, PushVertex} from "../graph/graph";
import {Distribute, Option, Some, None} from "../lib";

export interface Matrix<Tier extends number> {
    /**
     * The tier of the matrix, a matrix with tier = 4 will be a 4x4 matrix.
     */
    tier: Tier;
    /**
     * The buffer array of the matrix.
     */
    buf: any[][];
}

export interface HollowMatrix<Tier extends number> extends Matrix<Tier> {
    tier: Tier;
    /**
     * The buffer array of the matrix. Either {@link Some<any>} indicates there was a value,
     * or {@link None} indicates that there's not.
     */
    buf: Option<any>[][];
}

/**
 * Base Matrix. With each item is its index in buffer array.
 */
type BaseMatrix<
    T extends number,
    __Rows extends number[][] = [],
    __Row extends number[] = [],
    __Counter extends unknown[] = []
> = __Row["length"] extends T
    ? __Rows["length"] extends T
        ? __Rows
        : BaseMatrix<T, [...__Rows, __Row], [], __Counter>
    : BaseMatrix<T, __Rows, [...__Row, __Counter["length"]], [...__Counter, unknown]>;

export type IntoGraph<
    M extends Matrix<number>,
    __RI extends unknown[] = [],
    __CI extends unknown[] = [],
    __G extends Graph = GraphNew<[], []>,
    __B extends number[][] = BaseMatrix<M["tier"]>
> = __RI["length"] extends M["tier"]
    ? __G
    : __CI["length"] extends M["tier"]
    ? IntoGraph<M, [...__RI, unknown], [], __G, __B>
    : IntoGraph<
          M,
          __RI,
          [...__CI, unknown],
          PushVertex<
              __G,
              VertexNew<
                  __G["vertices"]["length"],
                  M["buf"][__CI["length"]][__RI["length"]]
              >,
              GetAdjacent<__CI, __RI, M, __B>
          >,
          __B
      >;

type GetAdjacentNumber<Index extends unknown[], T extends number> = [
    ...(Index extends [unknown, ...infer Rest extends unknown[]] ? [Rest["length"]] : []),
    Index["length"],
    ...([...Index, unknown]["length"] extends T ? [] : [[...Index, unknown]["length"]])
];

type GetAdjacent<
    RBuf extends unknown[],
    CBuf extends unknown[],
    M extends Matrix<number>,
    B extends number[][] = BaseMatrix<M["tier"]>
> = Distribute<
    GetAdjacentNumber<CBuf, M["tier"]>,
    GetAdjacentNumber<RBuf, M["tier"]>
> extends infer Indices extends [number, number][]
    ? MapToMatrixValue<FilterDistance1<Indices, [CBuf["length"], RBuf["length"]]>, B>
    : never;

type FilterDistance1<
    T extends [number, number][],
    Source extends [number, number],
    Filtered extends [number, number][] = []
> = T extends [
    [infer RI extends number, infer CI extends number],
    ...infer Rest extends [number, number][]
]
    ? [RI extends Source[0] ? 1 : 0, CI extends Source[1] ? 1 : 0] extends [1, 0] | [0, 1]
        ? FilterDistance1<Rest, Source, [...Filtered, [RI, CI]]>
        : FilterDistance1<Rest, Source, Filtered>
    : Filtered;

type MapToMatrixValue<
    T extends [number, number][],
    D extends number[][],
    Mapped extends unknown[] = []
> = T extends [
    [infer RI extends number, infer CI extends number],
    ...infer Rest extends [number, number][]
]
    ? MapToMatrixValue<Rest, D, [...Mapped, D[RI][CI]]>
    : Mapped;

declare module Test {
    type Mat4 = {
        tier: 4;
        buf: [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]];
    };
    type Mat2 = {
        tier: 2;
        buf: [["first", "second"], ["third", "fourth"]];
    };

    type M1 = IntoGraph<Mat4>;
    type Assertion1 = AssertSatisfy<M1["vertices"]["length"], 16>;

    type M2 = IntoGraph<Mat2>;
    type Assertion2 = AssertSatisfy<
        M2["vertices"],
        [
            VertexNew<0, "first">,
            VertexNew<1, "third">,
            VertexNew<2, "second">,
            VertexNew<3, "fourth">
        ]
    >;
}
