import Hl7IMessage from "../types/hl7IMessage";
import Hl7ISegment from "../types/hl7ISegment";
import Hl7IFieldDefinition from "../types/hl7FieldDefinition";

export default class Hl7 {
  public messages: Hl7IMessage[];
  public segments: Hl7ISegment[];
  public fields: Hl7IFieldDefinition[];

  constructor(messages: Hl7IMessage[], segments: Hl7ISegment[], fields: Hl7IFieldDefinition[]) {
    this.messages = messages;
    this.segments = segments;
    this.fields = fields;
  }
}
