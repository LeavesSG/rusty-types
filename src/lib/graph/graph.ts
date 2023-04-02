/**
 * # Vertex
 * An interface of a `Vertex` in a `Graph`
 */
export interface Vertex {
    /**
     * Unique key of the vertex, indicators its position in `Graph["vertices"]`
     */
    index: number;
    /**
     * The value that a vertex may contain.
     */
    buf: unknown;
}

/**
 * Construct a `Vertex` type from its properties.
 * Returns {@link Vertex}
 */
export type VertexNew<I extends Vertex["index"], B extends Vertex["buf"]> = {
    index: I;
    buf: B;
};

/**
 * # Graph
 * An Interface of a `Graph` Api.
 */
export interface Graph {
    /**
     * Vertices inside the graph.
     */
    vertices: Vertex[];
    /**
     * Edges of the graph.
     */
    edges: number[][];
}

/**
 * Construct a `Graph` type from its vertices.
 * Returns {@link Graph}
 */
export type GraphNew<V extends Graph["vertices"], E extends Graph["edges"]> = {
    vertices: V;
    edges: E;
};

/**
 * Push a new `Vertex` into the given `Graph`.
 * Returns a new {@link Graph}
 */
export type PushVertex<
    G extends Graph,
    V extends Graph["vertices"][number],
    E extends Graph["edges"][number]
> = GraphNew<[...G["vertices"], V], [...G["edges"], E]>;

declare module Test {
    type NewVert = VertexNew<1, any>;
    type Assertion1 = AssertSatisfy<NewVert, Vertex>;

    type NewGraph = GraphNew<[NewVert], [[]]>;
    type Assertion2 = AssertSatisfy<NewGraph, Graph>;

    type NewVert2 = VertexNew<1, "">;
    type PushedGraph = PushVertex<NewGraph, NewVert2, [1]>;
    type Assertion3 = AssertSatisfy<PushedGraph, Graph>;
}
