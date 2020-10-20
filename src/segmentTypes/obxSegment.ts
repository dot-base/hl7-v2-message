import { SegmentType } from "@/enums/hl7Enums";
import Hl7Segment from "@/segmentTypes/hl7Segment";
import FieldDefinition from "@/fieldDefintions/fieldDefinition";

export default class OBX_Segment extends Hl7Segment {
  public type: SegmentType = SegmentType.OBX;
  //TODO: define OBX_FieldDefinitions
  public children: FieldDefinition = new FieldDefinition();
}
