import Hl7Types from "@/init/hl7Types";
import { definitions } from "hl7-dictionary";
import Hl7 from "@/types/hl7";
import Hl7Model from "@/init/hl7Model";

/**
 * Initializes HL7 Types based on stated version and
 * creates class files in /model for messages, segments and fields
 */

/**
 * TODO: how to handle different versions?
 * Init and export all versions on build here?
 */
const initTypes: Hl7 = Hl7Types.init(definitions["2.3"]);
Hl7Model.createClassFiles(initTypes);
