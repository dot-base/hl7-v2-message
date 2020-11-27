import Hl7ISegment from "./Hl7ISegment";
import Hl7IMessageCompound from "./Hl7IMessageCompound";

export default interface Hl7IMessageSegment<T extends Hl7ISegment> {
  type: string;
  name: string;
  isOptional: boolean;
  isRepeatable: boolean;
  parentCompound?: Hl7IMessageCompound;
  value: T[];
}
