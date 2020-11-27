import Hl7IMessage from "../types/Hl7IMessage";
import Hl7IMessageSegment from "../types/Hl7IMessageSegment";
import Hl7ISegment from "../types/Hl7ISegment";
import Hl7IMessageCompound from "../types/Hl7IMessageCompound";

export abstract class Hl7Message implements Hl7IMessage {
  public abstract name: string;
  public abstract description: string;
  public abstract segments: {
    [key: string]: Hl7IMessageSegment<Hl7ISegment> | Hl7IMessageCompound;
  };
}
