import Hl7ISegmentDefinition from "./hl7ISegmentDefinition";
import Hl7ISegment from "./hl7ISegment";

export default interface Hl7IMessageDefinition {
  definition: Hl7ISegmentDefinition;
  //value is only set, if isSegment true
  value?: Hl7ISegment;
  //isSegment may only be true, if value is defined
  isSegment: boolean;
  //compoundDefinition can be set regardless of isSegment true/false, because of nested compounds
  compoundDefinition?: Hl7ISegmentDefinition;
}
