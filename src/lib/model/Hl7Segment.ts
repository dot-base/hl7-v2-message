import Hl7ISegment from "../types/Hl7ISegment";
import Hl7IFields from "../types/Hl7IFields";

export abstract class Hl7Segment implements Hl7ISegment {
  public abstract type: string;
  public abstract description?: string;
  public abstract fields: Hl7IFields;
}
