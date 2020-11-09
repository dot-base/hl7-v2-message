import Hl7IMessage from "@/types/hl7IMessage";
import Hl7ISegment from "@/types/hl7ISegment";

export default abstract class Hl7Message implements Hl7IMessage {
  [key: string]: Hl7ISegment;
}
