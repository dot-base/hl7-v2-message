import { SegmentType } from "@/enums/hl7Enums";
import Hl7IFieldDefinition from "@/types/hl7IFieldDefinition";
import Hl7Segment from "@/model/segmentTypes/hl7Segment";
import { RawFieldDefinition } from "@/model/fieldTypes/fieldDefinition";

export default class MSH_Segment extends Hl7Segment {
  public type: SegmentType = SegmentType.MSH;
  children: Hl7IFieldDefinition = new RawFieldDefinition();
  public optional = false;
}
