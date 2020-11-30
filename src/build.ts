import fs from "fs";
import Handlebars from "handlebars";
import { definitions } from "hl7-dictionary";
import Hl7 from "@/utils/Hl7";
import Hl7DictionaryConverter from "./template/Hl7DictionaryParser";

class LibraryBuilder {
  // region public static methods
  private static buildDirectory = "src/lib/build";
  private static templateDirectory = "src/template";
  private static partialDirectory = "src/template/partials";
  private static versions: string[] = Object.keys(definitions);

  private static createBuildDirectory() {
    if (!fs.existsSync(this.buildDirectory)) fs.mkdirSync(this.buildDirectory);
  }

  private static createVersionDirectory(version: string) {
    if (!fs.existsSync(`${this.buildDirectory}/${version}`)) fs.mkdirSync(`${this.buildDirectory}/${version}`);
  }

  private static registerHelpers() {
    Handlebars.registerHelper("replaceDot", function (version: string) {
      return version.replace(/[.]/g, "_");
    });

    Handlebars.registerHelper("toLowerCase", function (text: string) {
      return text.toLowerCase();
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

  private static createVersionIndex(version: string, versionTypes: Hl7) {
    const templateString = fs.readFileSync(`${this.templateDirectory}/versionIndex.hbs`).toString();
    const template = Handlebars.compile(templateString);
    const filledTemplate = template({ version, versionTypes });
    fs.writeFileSync(`${this.buildDirectory}/${version}/globalIndex.hbs`, filledTemplate);
  }

  public static build() {
    this.registerHelpers();
    this.registerPartials();
    this.createBuildDirectory();
    this.createGlobalIndex();

    for (const version of this.versions) {
      this.createVersionDirectory(version);
      const versionTypes = Hl7DictionaryConverter.init(definitions[version]);
      this.createVersionIndex(version, versionTypes);
      
      return;
      // TODO: Create class files
    }
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
