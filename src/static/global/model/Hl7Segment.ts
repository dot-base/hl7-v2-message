import Hl7ISegment from "../types/Hl7ISegment";
import Hl7IFields from "../types/Hl7IFields";

export default abstract class Hl7Segment implements Hl7ISegment {
  public abstract get type(): string;
  public abstract get description(): string | undefined;
  public abstract fields: Hl7IFields;
}
