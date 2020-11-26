import Hl7ISegmentDefinition from "./hl7ISegmentDefinition";
import Hl7ISegment from "./hl7ISegment";
import Hl7ICompoundDefinition from "./hl7ICompoundDefinition";

export default interface Hl7IMessageDefinition<T extends Hl7ISegment> {
  definition: Hl7ISegmentDefinition;
  value: T[];
  compoundDefinition?: Hl7ICompoundDefinition;
}
