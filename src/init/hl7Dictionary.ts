import { definitions, tables } from "hl7-dictionary";

export default class Hl7Dictionary {
  public static instance: Hl7Dictionary;
  public version: version;
  public definition: Hl7Defintion;
  public tables: Hl7Tables;

  private constructor(version: version) {
    this.version = version;
    this.definition = this.initDefintion(version);
    this.tables = tables;
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
