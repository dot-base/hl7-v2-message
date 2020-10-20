import { SegmentType } from "@/enums/hl7Enums";
import Hl7Segment from "@/segmentTypes/hl7Segment";
import FieldDefinition from "@/fieldDefintions/fieldDefinition";

export default class PV1_Segment extends Hl7Segment {
  public type: SegmentType = SegmentType.PV1;
  //TODO: define PV1_FieldDefinitions
  public children: FieldDefinition = new FieldDefinition();
}
