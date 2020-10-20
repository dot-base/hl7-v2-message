import { SegmentType } from "@/enums/hl7Enums";
import Hl7Segment from "@/segmentTypes/hl7Segment";
import FieldDefinition from "@/fieldDefintions/fieldDefinition";

export default class OBR_Segment extends Hl7Segment {
  public type: SegmentType = SegmentType.OBR;
  //TODO: define OBR_FieldDefinitions
  public children: FieldDefinition = new FieldDefinition();
}
