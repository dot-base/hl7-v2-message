import Hl7IMessage from "@/types/hl7IMessage";
import Hl7MessageDefinition from "@/types/hl7IMessageDefinition";

export abstract class Hl7Message implements Hl7IMessage {
  [key: string]: string | Hl7MessageDefinition;
  public abstract name: string;
  public description: string;

  constructor(description?: string) {
    this.description = description ?? "";
  }
}
