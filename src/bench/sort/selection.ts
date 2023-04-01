import {BenchSampleBenchSampleTuple2K} from "../tuple-sample/tuple";
import {Selection} from "../../lib/sort/selection";
import {Slice} from "../../lib/tuple/tuple";

// @ts-ignore
type MaxLoad = Selection<Slice<BenchSampleBenchSampleTuple2K, 100>>;
// @ts-expect-error
type OverLoad = Selection<Slice<BenchSampleBenchSampleTuple2K, 230>>;
