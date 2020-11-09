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
