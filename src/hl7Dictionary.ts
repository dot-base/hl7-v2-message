import { definitions, tables } from "hl7-dictionary";

type version =
  | "2.1"
  | "2.2"
  | "2.3"
  | "2.3.1"
  | "2.4"
  | "2.5"
  | "2.5.1"
  | "2.6"
  | "2.7"
  | "2.7.1";

export default class Hl7Dictionary {
  public static instance: Hl7Dictionary;
  public version: version;
  public definition: Hl7Defintion;

  private constructor(version: version) {
    this.version = version;
    this.definition = this.initDefintion(version);
  }

  public static getInstance(version: version): Hl7Dictionary {
    if (Hl7Dictionary.instance && Hl7Dictionary.instance.version === version)
      return Hl7Dictionary.instance;
    return new Hl7Dictionary(version);
  }

  private initDefintion(version: version): Hl7Defintion {
    const versionDefinition = Object.entries(definitions).find((definition) => {
      if (definition[0] === version) return definition[1];
    });
    if (versionDefinition) return versionDefinition[1];
    throw Error(`No HL7 defintion was found for invalid or unknown version ${version}`);
  }
}
