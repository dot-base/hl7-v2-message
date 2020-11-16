import Hl7ISegment from "../types/hl7ISegment";
import Hl7IFields from "../types/hl7IFields";

export abstract class Hl7Segment implements Hl7ISegment {
  public abstract type: string;
  public abstract children: Hl7IFields;
}
