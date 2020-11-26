import Hl7ISegmentDefinition from "./hl7ISegmentDefinition";
import Hl7ISegment from "./hl7ISegment";

export default interface Hl7ICompoundDefinition {
  definition: Hl7ISegmentDefinition;
  compoundDefinition?: Hl7ICompoundDefinition;
}
