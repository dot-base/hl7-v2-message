import { SegmentType } from "@/enums/hl7Enums";
import FieldDefinition, {
  RawFieldDefinition,
} from "@/model/fieldTypes/fieldDefinition";
import Hl7ISegment from "@/types/hl7ISegment";

export default abstract class Hl7Segment implements Hl7ISegment {
  public abstract type: SegmentType;
  public abstract children: FieldDefinition;
  public optional: boolean;

  constructor(optional: boolean) {
    this.optional = optional;
  }
}
/**
 * helper classes only - should be removed
 */
export class Raw_Segment extends Hl7Segment {
  public type: SegmentType;
  public children: RawFieldDefinition;
  public rawFields: string[];

  constructor(optional: boolean, type: SegmentType, value: string) {
    super(optional);
    this.type = type;
    this.rawFields = value.split("|");
    this.children = new RawFieldDefinition();
  }
}
