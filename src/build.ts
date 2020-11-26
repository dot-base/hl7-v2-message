import fs from "fs";
import { definitions } from "hl7-dictionary";
// import Hl7Model from "@/template/hl7Model";
import Hl7Types from "@/template/hl7Types";
import Hl7 from "@/lib/types/hl7";
// import IndexFiles from "./template/indexFiles";
import Handlebars from "handlebars";

class LibraryBuilder {
  // region public static methods
  private static buildDirectory = "src/lib/build";
  private static templateDirectory = "src/template";
  private static partialDirectory = "src/template/partials";
  private static versions: string[] = Object.keys(definitions);

  private static createBuildDirectory() {
    if (!fs.existsSync(this.buildDirectory)) fs.mkdirSync(this.buildDirectory);
  }

  private static registerHelpers() {
    Handlebars.registerHelper("replaceDot", function (version: string) {
      return version.replace(/[.]/g, "_");
    });
  }

  private static registerPartials() {
    const partialFileNames = fs.readdirSync(this.partialDirectory);

    for (const partialFileName of partialFileNames) {
      const partial = fs.readFileSync(`${this.partialDirectory}/${partialFileName}`).toString();
      const partialName = partialFileName.replace(".hbs", "");
      Handlebars.registerPartial(partialName, partial);
    }
  }

  private static createGlobalIndex() {
    const templateString = fs.readFileSync(`${this.templateDirectory}/globalIndex.hbs`).toString();
    const template = Handlebars.compile(templateString);
    const filledTemplate = template({ versions: this.versions });
    fs.writeFileSync(`${this.buildDirectory}/globalIndex.hbs`, filledTemplate);
  }

  private createVersionIndex(version: string) {
    Hl7Types.init(definitions[version]);
  }

  public static build() {
    this.registerHelpers();
    this.registerPartials();
    this.createBuildDirectory();
    this.createGlobalIndex();
  }
  // endregion

  // region private static methods
  // endregion

  // region public members
  // endregion

  // region private members
  // endregion

  // region public methods
  // endregion

  // region private methods
  // endregion
}

LibraryBuilder.build();

/**
 * Initializes HL7 Types based on stated version and
 * creates class files in /model/<version> for HL7 messages, segments and fields
 */
// const versions: string[] = Object.keys(definitions);
// versions.forEach((version) => {
//   const initTypes: Hl7 = Hl7Types.init(definitions[version]);
//   Hl7Model.createClassFiles(getBaseDirectory(), version, initTypes);
// });

/**
 * Creates global index.ts based on stated versions and Hl7Model
 */
// IndexFiles.createGlobalIndex(getBaseDirectory(), versions);

// function getBaseDirectory(): string {
//   const baseDirectory = "./src/lib/build";
//   if (!fs.existsSync(baseDirectory)) fs.mkdirSync(baseDirectory);
//   return baseDirectory;
// }
