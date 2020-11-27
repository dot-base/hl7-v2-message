import Hl7IMessage from "../types/Hl7IMessage";
import hl7IMessageElement from "../types/hl7IMessageElement";

export abstract class Hl7Message implements Hl7IMessage {
  
  public abstract name: string;
  public description: string;
  public segments: Hl7IMessage.segments;

  constructor(description?: string) {
    this.description = description ?? "";
  }
}
