import { Hl7Fields } from "@/model/hl7Fields";
import Hl7ISegment from "@/types/hl7ISegment";

export abstract class Hl7Segment implements Hl7ISegment {
  public abstract type: string;
  public abstract children: Hl7Fields;
}
