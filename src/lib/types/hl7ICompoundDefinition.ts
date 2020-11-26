import Hl7ISegmentDefinition from "./hl7ISegmentDefinition";

export default interface Hl7ICompoundDefinition {
  definition: Hl7ISegmentDefinition;
  compoundDefinition?: Hl7ICompoundDefinition;
}
