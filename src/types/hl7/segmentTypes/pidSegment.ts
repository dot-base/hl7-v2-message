import { SegmentType } from "@/types/hl7/enums/hl7Enums";
import Hl7Segment from "@/types/hl7/segmentTypes/hl7Segment";
import FieldDefinition from "@/types/hl7/fieldDefintions/fieldDefinition";

export default class PID_Segment extends Hl7Segment {
  public type: SegmentType = SegmentType.PID;
  //TODO: define PID_FieldDefinitions
  public children: FieldDefinition = new FieldDefinition();
}
