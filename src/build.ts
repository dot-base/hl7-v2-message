import fs from "fs";
import { definitions } from "hl7-dictionary";
import Hl7Model from "@/template/hl7Model";
import Hl7Types from "@/template/hl7Types";
import Hl7 from "@/lib/types/hl7";
import IndexFiles from "./template/indexFiles";

/**
 * Initializes HL7 Types based on stated version and
 * creates class files in /model/<version> for HL7 messages, segments and fields
 */
const versions: string[] = Object.keys(definitions);
versions.forEach((version) => {
  const initTypes: Hl7 = Hl7Types.init(definitions[version]);
  Hl7Model.createClassFiles(getBaseDirectory(), version, initTypes);
});

/**
 * Creates global index.ts based on stated versions and Hl7Model
 */
IndexFiles.createGlobalIndex(getBaseDirectory(), versions);

function getBaseDirectory(): string {
  const baseDirectory = process.env.NODE_ENV === "development" ? `./src/lib/build` : `lib/build/`;
  if (!fs.existsSync(baseDirectory)) fs.mkdirSync(baseDirectory);
  return baseDirectory;
}
