import fs from "fs";
import Handlebars from "handlebars";
import { definitions } from "hl7-dictionary";
import Hl7DictionaryConverter from "@/utils/Hl7DictionaryParser";
import Hl7 from "@/utils/Hl7";
import fsextra from "fs-extra";

class LibraryBuilder {
  // region public static methods
  private static buildDirectory = "build";
  private static libDirectory = LibraryBuilder.buildDirectory + "/lib";
  private static staticDirectory = "src/static";
  private static templateDirectory = "src/template";
  private static partialDirectory = LibraryBuilder.templateDirectory + "/partials";
  private static versions: string[] = Object.keys(definitions);

  private static createBuildDirectory() {
    fsextra.removeSync(this.buildDirectory);
    if (!fs.existsSync(this.buildDirectory)) fs.mkdirSync(this.buildDirectory);
    if (!fs.existsSync(this.libDirectory)) fs.mkdirSync(this.libDirectory);
    this.copyStaticFiles();
  }

  private static copyStaticFiles() {
    fsextra.copySync(this.staticDirectory, this.buildDirectory);
  }

  private static createVersionDirectory(version: string) {
    if (!fs.existsSync(`${this.libDirectory}/${version}`)) fs.mkdirSync(`${this.libDirectory}/${version}`);
    if (!fs.existsSync(`${this.libDirectory}/${version}/message`))
      fs.mkdirSync(`${this.libDirectory}/${version}/message`);
    if (!fs.existsSync(`${this.libDirectory}/${version}/segment`))
      fs.mkdirSync(`${this.libDirectory}/${version}/segment`);
    if (!fs.existsSync(`${this.libDirectory}/${version}/fields`))
      fs.mkdirSync(`${this.libDirectory}/${version}/fields`);
  }

  private static registerHelpers() {
    Handlebars.registerHelper("replaceDot", function (version: string) {
      return version.replace(/[.]/g, "_");
    });

    Handlebars.registerHelper("toLowerCase", function (text: string) {
      return text.toLowerCase();
    });

    Handlebars.registerHelper("isDefined", function (object: any) {
      return !!object;
    });

    Handlebars.registerHelper("values", function (object: any) {
      return Object.values(object);
    });

    Handlebars.registerHelper("unique", function (array: any[]) {
      const seen = new Set();
      return array.filter((segment) => {
        return seen.has(segment.type) ? false : seen.add(segment.type);
      });
    });

    Handlebars.registerHelper("variableSafeString", function (str: string) {
      if (!str) return str;
      return str.replace(/,/g, "");
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
    fs.writeFileSync(`${this.buildDirectory}/index.ts`, filledTemplate);
  }

  private static createVersionIndex(version: string, versionTypes: Hl7) {
    const templateString = fs.readFileSync(`${this.templateDirectory}/versionIndex.hbs`).toString();
    const template = Handlebars.compile(templateString);
    const filledTemplate = template({ version, versionTypes });
    fs.writeFileSync(`${this.libDirectory}/${version}/index.ts`, filledTemplate);
  }

  private static createUtils(version: string, versionTypes: Hl7) {
    const templateString = fs.readFileSync(`${this.templateDirectory}/versionUtils.hbs`).toString();
    const template = Handlebars.compile(templateString);
    const filledTemplate = template({ version, versionTypes });
    fs.writeFileSync(`${this.libDirectory}/${version}/utils.ts`, filledTemplate);
  }

  private static createMessages(version: string, versionTypes: Hl7) {
    const templateString = fs.readFileSync(`${this.templateDirectory}/message.hbs`).toString();
    const template = Handlebars.compile(templateString);

    for (const message of versionTypes.messages.values()) {
      const filledTemplate = template(message);
      fs.writeFileSync(`${this.libDirectory}/${version}/message/${message.name}_Message.ts`, filledTemplate);
    }
  }

  private static createSegments(version: string, versionTypes: Hl7) {
    const templateString = fs.readFileSync(`${this.templateDirectory}/segment.hbs`).toString();
    const template = Handlebars.compile(templateString);

    for (const segment of versionTypes.segments.values()) {
      const filledTemplate = template(segment);
      fs.writeFileSync(`${this.libDirectory}/${version}/segment/${segment.type}_Segment.ts`, filledTemplate);
    }
  }

  private static createFields(version: string, versionTypes: Hl7) {
    const templateString = fs.readFileSync(`${this.templateDirectory}/fields.hbs`).toString();
    const template = Handlebars.compile(templateString);

    for (const segment of versionTypes.segments.values()) {
      const filledTemplate = template(segment);
      fs.writeFileSync(`${this.libDirectory}/${version}/fields/${segment.type}_Fields.ts`, filledTemplate);
    }
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
      this.createUtils(version, versionTypes);
      this.createMessages(version, versionTypes);
      this.createSegments(version, versionTypes);
      this.createFields(version, versionTypes);
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
