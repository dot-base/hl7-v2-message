import Hl7IMessageDefinition from "@/types/hl7IMessageDefinition";

export default interface Hl7IMessage {
  [key: string]: Hl7IMessageDefinition | string;
  description: string;
  name: string;
}
