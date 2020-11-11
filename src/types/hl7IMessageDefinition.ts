import Hl7ISegmentDefinition from "@/types/hl7ISegmentDefinition";
import Hl7ISegment from "@/types/hl7ISegment";

export default interface Hl7IMessageDefinition {
  definition: Hl7ISegmentDefinition;
  value?: Hl7ISegment;
}
