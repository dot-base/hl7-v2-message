import Hl7Dictionary from "@/hl7Dictionary";
import Hl7MessageTemplate from "./hl7MessageTemplate";
import ORU_Message from "./model/messageTypes/oruMessage";

const hl7Dictionary: Hl7Dictionary = Hl7Dictionary.getInstance("2.3");
Hl7MessageTemplate.init(hl7Dictionary.definition, new ORU_Message());
