import { SegmentType } from "@/enums/hl7Enums";
import Hl7IFieldDefinition from "@/types/Hl7IFieldDefinition";

export default interface Hl7ISegment {
  type: SegmentType;
  children: Hl7IFieldDefinition;
  optional?: boolean;
  description?: string;
}
