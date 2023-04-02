import {VertexNew} from "./graph";

type Indexed = {
    index: number;
};

type Valued = {
    buf: unknown;
};

export type SearchTarget = Indexed | Valued;

declare module Test {
    type Assertion1 = AssertSatisfy<
        VertexNew<1, "Tom">,
        {
            index: 1;
        }
    >;
    type Assertion2 = AssertSatisfy<
        VertexNew<1, "Tom">,
        {
            buf: "Tom";
        }
    >;
    type Assertion3 = Assert<
        VertexNew<1, "Tom"> extends {
            buf: "Tommy";
        }
            ? false
            : true
    >;
}
