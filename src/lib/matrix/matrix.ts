import {GraphNew, VertexNew} from "../graph/graph";
import {Graph, PushVertex} from "../graph/graph";
import {Distribute, RemoveFirstMatch} from "../lib";

export type Matrix<Tier extends number> = {
    tier: Tier;
    buf: unknown[][];
};

type BaseMatrix<
    T extends number,
    Rows extends number[][] = [],
    Row extends number[] = [],
    Counter extends unknown[] = []
> = Row["length"] extends T
    ? Rows["length"] extends T
        ? Rows
        : BaseMatrix<T, [...Rows, Row], [], Counter>
    : BaseMatrix<T, Rows, [...Row, Counter["length"]], [...Counter, unknown]>;

export type IntoGraph<
    M extends Matrix<number>,
    RI extends unknown[] = [],
    CI extends unknown[] = [],
    G extends Graph = GraphNew<[], []>,
    B extends number[][] = BaseMatrix<M["tier"]>
> = RI["length"] extends M["tier"]
    ? G
    : CI["length"] extends M["tier"]
    ? IntoGraph<M, [...RI, unknown], [], G, B>
    : IntoGraph<
          M,
          RI,
          [...CI, unknown],
          PushVertex<
              G,
              VertexNew<G["vertices"]["length"], M["buf"][CI["length"]][RI["length"]]>,
              GetAdjacent<CI, RI, M, B>
          >,
          B
      >;

type GetAdjacentNumber<Index extends unknown[], T extends number> = [
    ...(Index extends [unknown, ...infer Rest extends unknown[]] ? [Rest["length"]] : []),
    Index["length"],
    ...([...Index, unknown]["length"] extends T ? [] : [[...Index, unknown]["length"]])
];

type GetAdjacent<
    RBuf extends unknown[],
    LBuf extends unknown[],
    M extends Matrix<number>,
    B extends number[][] = BaseMatrix<M["tier"]>
> = Distribute<
    GetAdjacentNumber<LBuf, M["tier"]>,
    GetAdjacentNumber<RBuf, M["tier"]>
> extends infer Indices extends [number, number][]
    ? MapToMatrixValue<RemoveFirstMatch<Indices, [LBuf["length"], RBuf["length"]]>, B>
    : never;

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
