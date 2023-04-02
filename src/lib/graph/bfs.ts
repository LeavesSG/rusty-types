import {IntoGraph} from "../matrix/matrix";
import {None, Some, Option, Unwrap} from "../option/option";
import {Graph, Vertex} from "./graph";
import {SearchTarget} from "./search";

type Queue = number[];

interface Dict {
    [index: number]: Option<number>;
}
export type Bfs<
    G extends Graph,
    S extends SearchTarget,
    Vertices extends Graph["vertices"] = G["vertices"],
    Q extends Queue = [],
    Visited extends Dict = {}
> = Q extends [infer Ptr extends number, ...infer Rest extends Queue]
    ? G["vertices"][Ptr] extends S
        ? [Some<Ptr>, Visited]
        : PushQueue<Rest, G["vertices"][Ptr]["adjacent"], Visited, Ptr> extends [
              infer Q extends Queue,
              infer Visited extends Dict
          ]
        ? Bfs<G, S, Vertices, Q, Visited>
        : never // this never gonna happen
    : Vertices extends [infer Vert extends Vertex, ...infer VertRest extends Vertex[]]
    ? PushQueue<[], [Vert["index"]], Visited, -1> extends [
          infer Q extends Queue,
          infer Visited extends Dict
      ]
        ? Bfs<G, S, VertRest, Q, Visited>
        : never // this never gonna happen
    : [None, Visited];

export type PushQueue<
    Q extends Queue,
    Adj extends Queue,
    V extends Dict,
    Source extends number
> = Adj extends [infer Ptr extends number, ...infer Rest extends number[]]
    ? V extends {
          [key in Ptr]: Option<number>;
      }
        ? PushQueue<Q, Rest, V, Source>
        : PushQueue<
              [...Q, Ptr],
              Rest,
              V & {
                  [key in Ptr]: Source extends -1 ? None : Some<Source>;
              },
              Source
          >
    : [Q, V];

type BackTracingRoute<
    G extends Graph,
    Ptr extends number,
    D extends Dict,
    T extends Vertex[] = [G["vertices"][Ptr]]
> = D extends {
    [K in Ptr]: Some<infer Ptr extends number>;
}
    ? BackTracingRoute<G, Ptr, D, [...T, G["vertices"][Ptr]]>
    : T;

type BackTracing<G extends Graph, Res extends [Option<number>, Dict]> = Res extends [
    Some<infer Target extends number>,
    infer D extends Dict
]
    ? Some<BackTracingRoute<G, Target, D>>
    : None;

declare module Test {
    type Mat4 = {
        tier: 4;
        buf: [
            ["1", "2", "3", "4"],
            ["5", "6", "7", "8"],
            ["9", "10", "11", "12"],
            ["13", "14", "15", "16"]
        ];
    };
    type Graph4 = IntoGraph<Mat4>;
    type target = {
        buf: "16";
    };
    type Res = Bfs<Graph4, target>;
    type Route = Unwrap<BackTracing<Graph4, Res>>;
}
