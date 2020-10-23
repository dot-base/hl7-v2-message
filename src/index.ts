import Hl7Dictionary from "@/hl7Dictionary";
import Hl7Definition from "./definitions";
import ORU_Message from "./model/messageTypes/oruMessage";

const version: Hl7Dictionary = Hl7Dictionary.getInstance("2.3");
const message = Hl7Definition.init(version.definition, new ORU_Message());
