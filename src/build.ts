import Hl7DefinitionBuilder from "@/init/hl7Types";
import { definitions } from "hl7-dictionary";

//TODO: how to handle different versions? init all versions on build here or init only on usage?
Hl7DefinitionBuilder.init(definitions["2.3"]);