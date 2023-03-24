import {BenchSampleBenchSampleTuple2K} from "../tuple-sample/tuple";
import {Selection} from "../../lib/sort/selection";
import {TupleSlice} from "../../lib/tuple/tuple";

// @ts-ignore
type MaxLoad = Selection<TupleSlice<BenchSampleBenchSampleTuple2K, 100>>;
// @ts-expect-error
type OverLoad = Selection<TupleSlice<BenchSampleBenchSampleTuple2K, 230>>;
