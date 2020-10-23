import Hl7ISegment from "@/types/hl7ISegment";

export default interface Hl7IMessage {
  [key: string]: Hl7ISegment;
}
