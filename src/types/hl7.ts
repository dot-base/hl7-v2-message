import Hl7IFields from "@/types/hl7IFields";
import Hl7IMessage from "@/types/hl7IMessage";
import Hl7ISegment from "@/types/hl7ISegment";

export default class Hl7 {
  public messages: Hl7IMessage[];
  public segments: Hl7ISegment[];
  public fields: { segmentType: string; props: Hl7IFields }[];

  constructor(
    messages: Hl7IMessage[],
    segments: Hl7ISegment[],
    fields: { segmentType: string; props: Hl7IFields }[]
  ) {
    this.messages = messages;
    this.segments = segments;
    this.fields = fields;
  }
}
