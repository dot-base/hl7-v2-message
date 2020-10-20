import { SegmentType } from "@/enums/hl7Enums";
import Hl7Segment from "@/segmentTypes/hl7Segment";
import MSH_FieldDefinition from "@/fieldDefintions/mshFieldDefinition";

export default class MSH_Segment extends Hl7Segment {
  public type: SegmentType = SegmentType.MSH;
  public children: MSH_FieldDefinition = new MSH_FieldDefinition();
  public optional = false;
}
