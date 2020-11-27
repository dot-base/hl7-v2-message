import Hl7IMessage from "./Hl7IMessage";
import Hl7ISegment from "./Hl7ISegment";
import Hl7IFields from "./Hl7IFields";

export default class Hl7 {
  public messages: Hl7IMessage[];
  public segments: Hl7ISegment[];
  public fields: Hl7IFields[];

  constructor(messages: Hl7IMessage[], segments: Hl7ISegment[], fields: Hl7IFields[]) {
    this.messages = messages;
    this.segments = segments;
    this.fields = fields;
  }
}
