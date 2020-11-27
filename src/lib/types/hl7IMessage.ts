import Hl7ICompoundDefinition from "./hl7ICompoundDefinition";
import Hl7IMessageDefinition from "./hl7IMessageDefinition";
import Hl7ISegment from "./hl7ISegment";

export default interface Hl7IMessage {
  [key: string]: Hl7IMessageDefinition<Hl7ISegment> | Hl7ICompoundDefinition | string;
  description: string;
  name: string;
}
