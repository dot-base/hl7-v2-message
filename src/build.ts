import fs from "fs";
import { definitions } from "hl7-dictionary";
// import Hl7Model from "@/template/hl7Model";
// import Hl7Types from "@/template/hl7Types";
// import Hl7 from "@/lib/types/hl7";
// import IndexFiles from "./template/indexFiles";
import Handlebars from "handlebars";

class Build {
  private static partialDirectory = "src/template/partials";

  constructor() {
    this.registerHelpers();
    this.registerPartials();
    this.loadTemplates();
  }

  private registerHelpers() {
    Handlebars.registerHelper("replaceDot", function (version: string) {
      return version.replace(/[.]/g, "_");
    });
  }

  private registerPartials() {
    const partialFileNames = fs.readdirSync(Build.partialDirectory);

    for (const partialFileName of partialFileNames) {
      const partial = fs.readFileSync(`${Build.partialDirectory}/${partialFileName}`).toString();
      const partialName = partialFileName.replace(".hbs", "");
      Handlebars.registerPartial(partialName, partial);
    }
  }

  private loadTemplates() {
    const templateString = fs.readFileSync("./src/template/globalIndex.hbs");
    const template = Handlebars.compile(templateString.toString());
    const versions: string[] = Object.keys(definitions);
    const filledTemplate = template({ versions });
    console.log(filledTemplate);
  }
}

new Build();

/**
 * Initializes HL7 Types based on stated version and
 * creates class files in /model/<version> for HL7 messages, segments and fields
 */
// const versions: string[] = Object.keys(definitions);
// versions.forEach((version) => {
//   const initTypes: Hl7 = Hl7Types.init(definitions[version]);
//   Hl7Model.createClassFiles(getBaseDirectory(), version, initTypes);
// });

// /**
//  * Creates global index.ts based on stated versions and Hl7Model
//  */
// IndexFiles.createGlobalIndex(getBaseDirectory(), versions);

// function getBaseDirectory(): string {
//   const baseDirectory = './src/lib/build';
//   if (!fs.existsSync(baseDirectory)) fs.mkdirSync(baseDirectory);
//   return baseDirectory;
// }
