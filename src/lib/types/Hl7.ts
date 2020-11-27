import Hl7IMessage from "./Hl7IMessage";
import Hl7ISegment from "./Hl7ISegment";

export default class Hl7 {
  public messages: Hl7IMessage[];
  public segments: Hl7ISegment[];

  constructor(messages: Hl7IMessage[], segments: Hl7ISegment[]) {
    this.messages = messages;
    this.segments = segments;
  }
}
