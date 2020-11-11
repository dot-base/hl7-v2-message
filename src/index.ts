import Hl7Dictionary from "@/init/hl7Dictionary";
import Hl7DefinitionBuilder from "@/init/hl7Types";

const hl7Dictionary: Hl7Dictionary = Hl7Dictionary.getInstance("2.3");
Hl7DefinitionBuilder.init(hl7Dictionary.definition);
