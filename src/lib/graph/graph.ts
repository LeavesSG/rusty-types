interface Vertex {
    /**
     * Unique key of the vertex, indicators its position in `Graph["vertices"]`
     */
    index: number;
    /**
     * The adjacent vertices index that this vertex connect to.
     */
    adjacent: Vertex["index"][];
}

export interface Graph {
    vertices: Vertex[];
}
