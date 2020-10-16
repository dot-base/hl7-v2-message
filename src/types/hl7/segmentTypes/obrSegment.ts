import { SegmentType } from "@/types/hl7/enums/hl7Enums";
import Hl7Segment from "@/types/hl7/segmentTypes/hl7Segment";
import FieldDefinition from "@/types/hl7/fieldDefintions/fieldDefinition";

export default class OBR_Segment extends Hl7Segment {
  public type: SegmentType = SegmentType.OBR;
  //TODO: define OBR_FieldDefinitions
  public children: FieldDefinition = new FieldDefinition();
}
