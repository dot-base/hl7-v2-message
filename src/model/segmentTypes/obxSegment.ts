import { SegmentType } from "@/enums/hl7Enums";
import Hl7FieldDefinition, {
  RawFieldDefinition,
} from "@/model/fieldTypes/fieldDefinition";
import Hl7Segment from "@/model/segmentTypes/hl7Segment";

export default class OBX_ISegment extends Hl7Segment {
  type: SegmentType = SegmentType.OBX;
  children: Hl7FieldDefinition = new RawFieldDefinition();
  optional = false;
}
