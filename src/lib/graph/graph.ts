interface Vertex {
    /**
     * Unique key of the vertex, indicators its position in `Graph["vertices"]`
     */
    index: number;
    /**
     * The value that a vertex may contain.
     */
    buf: unknown;
    /**
     * The adjacent vertices index that this vertex connect to.
     */
    adjacent: Vertex["index"][];
}

export type VertexNew<
    I extends Vertex["index"],
    B extends Vertex["buf"],
    A extends Vertex["adjacent"]
> = {
    index: I;
    buf: B;
    adjacent: A;
};

export interface Graph {
    // the graph vertices
    vertices: Vertex[];
}

export type GraphNew<V extends Graph["vertices"]> = {
    vertices: V;
};

export type PushVertex<G extends Graph, V extends Vertex> = GraphNew<
    [...G["vertices"], V]
>;

declare module Test {
    type NewVert = VertexNew<1, any, [2, 3]>;
    type Assertion1 = AssertSatisfy<NewVert, Vertex>;

    type NewGraph = GraphNew<[NewVert]>;
    type Assertion2 = AssertSatisfy<NewGraph, Graph>;

    type NewVert2 = VertexNew<1, "", [1]>;
    type PushedGraph = PushVertex<NewGraph, NewVert2>;
    type Assertion3 = AssertSatisfy<PushedGraph, Graph>;
}
