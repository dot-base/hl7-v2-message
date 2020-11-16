import Hl7ISegmentDefinition from "./hl7ISegmentDefinition";
import Hl7ISegment from "./hl7ISegment";

export default interface Hl7IMessageDefinition {
  definition: Hl7ISegmentDefinition;
  value?: Hl7ISegment;
}
