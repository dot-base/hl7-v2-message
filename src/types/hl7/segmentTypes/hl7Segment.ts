import { SegmentType } from "@/types/hl7/enums/hl7Enums";
import FieldDefinition from "@/types/hl7/fieldDefintions/fieldDefinition";

export default abstract class Hl7Segment {
  public abstract type: SegmentType;
  public abstract children: FieldDefinition;
  public optional: boolean;

  constructor(optional: boolean) {
    this.optional = optional;
  }
}

export class Raw_Segment extends Hl7Segment {
  public type: SegmentType;
  public children: FieldDefinition;
  public rawFields: string[];

  constructor(optional: boolean, type: SegmentType, value: string) {
    super(optional);
    this.type = type;
    this.rawFields = value.split("|");
    this.children = new FieldDefinition();
  }
}
