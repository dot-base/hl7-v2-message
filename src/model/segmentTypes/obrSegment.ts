import { SegmentType } from "@/enums/hl7Enums";
import Hl7IFieldDefinition from "@/types/hl7IFieldDefinition";
import Hl7Segment from "@/model/segmentTypes/hl7Segment";
import { RawFieldDefinition } from "@/model/fieldTypes/fieldDefinition";

export default class OBR_ISegment extends Hl7Segment {
  type: SegmentType = SegmentType.OBR;
  children: Hl7IFieldDefinition = new RawFieldDefinition();
  optional = false;
}
