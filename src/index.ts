import Hl7Dictionary from "@/init/hl7Dictionary";
import Hl7MessageTemplate from "./init/hl7MessageTemplate";
import ORU_Message from "./model/messageTypes/oruMessage";

const hl7Dictionary: Hl7Dictionary = Hl7Dictionary.getInstance("2.3");
Hl7MessageTemplate.init(hl7Dictionary.definition, new ORU_Message());
