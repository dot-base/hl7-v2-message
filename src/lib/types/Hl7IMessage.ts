import Hl7IMessageCompound from "./Hl7IMessageCompound";
import Hl7IMessageSegment from "./Hl7IMessageSegment";
import Hl7ISegment from "./Hl7ISegment";

export default interface Hl7IMessage {
    name: string;
    description: string;
    segments: {
        [key: string]: Hl7IMessageSegment<Hl7ISegment> | Hl7IMessageCompound;
    }
}
