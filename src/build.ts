import Hl7Types from "@/init/hl7Types";
import { definitions } from "hl7-dictionary";
import Hl7 from "@/types/hl7";
import Hl7Model from "@/init/hl7Model";

/**
 * Initializes HL7 Types based on stated version and
 * creates class files in /model/<version> for HL7 messages, segments and fields
 */
const versions: string[] = Object.keys(definitions);
versions.forEach((version) => {
  const initTypes: Hl7 = Hl7Types.init(definitions[version]);
  Hl7Model.createClassFiles(version, initTypes);
});
