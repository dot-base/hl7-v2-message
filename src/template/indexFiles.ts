import fs from "fs";
import Hl7 from "@/lib/types/hl7";

export default class IndexFiles {
  public static createGlobalIndex(directory: string, versions: string[]): void {
    const indexContent: string = IndexFiles.globalIndex(versions);
    IndexFiles.createFile(directory, indexContent);
  }

  public static createVersionIndex(directory: string, version: string, hl7Types: Hl7): void {
    const indexContent: string = IndexFiles.versionIndex(version, hl7Types);
    IndexFiles.createFile(directory, indexContent);
  }

  private static versionIndex(version: string, hl7Types: Hl7): string {
    const imports: string = IndexFiles.printImports(hl7Types);
    const exports: string = IndexFiles.printExports(hl7Types);
    const namespace = `declare namespace ${IndexFiles.printVersion(version)} {\n${exports}};\n`;
    const namespaceExport = `export { ${IndexFiles.printVersion(version)} as default };`;
    return `${imports}\n${namespace}\n${namespaceExport}\n`;
  }

  private static printImports(hl7Types: Hl7) {
    let imports = "";
    hl7Types.messages.forEach((message) => {
      imports += IndexFiles.printImport(message.name, "Message");
    });
    hl7Types.segments.forEach((segment) => {
      imports += IndexFiles.printImport(segment.type, "Segment");
    });
    hl7Types.fields.forEach((field) => {
      imports += IndexFiles.printImport(field.segmentType, "Fields");
    });
    return imports;
  }

  private static printImport(element: string, type: string): string {
    const elemType = `${element}_${type}`;
    const fileName = `${element.toLowerCase()}_${type}`;
    const path = type.toLowerCase() === "fields" ? `${type.toLowerCase()}` : `${type.toLowerCase()}s`;
    return `import { ${elemType} } from "./${path}/${fileName}";\n`;
  }

  private static printExports(hl7Types: Hl7): string {
    let messageExports = "";
    let segmentExports = "";
    let fieldExports = "";
    hl7Types.messages.forEach((message) => {
      messageExports += `${message.name}_Message,`;
    });
    hl7Types.segments.forEach((segment) => {
      segmentExports += `${segment.type}_Segment,`;
    });
    hl7Types.fields.forEach((field) => {
      fieldExports += `${field.segmentType}_Fields,`;
    });
    return `export { ${messageExports} };\nexport { ${segmentExports} };\nexport { ${fieldExports} };\n`;
  }

  private static globalIndex(versions: string[]): string {
    const modelImports = `import { Hl7Message } from "../model/hl7Message";\nimport { Hl7Segment } from "../model/hl7Segment";\nimport { Hl7Fields } from "../model/hl7Fields";\nimport { Hl7Field } from "../model/hl7Field";\n`;
    const modelNamespace = `declare namespace hl7Model{\nexport { Hl7Message };\nexport { Hl7Segment };\nexport { Hl7Fields };\nexport { Hl7Field };\n}`;
    const versionImports = IndexFiles.versionImports(versions);
    const versionExport = IndexFiles.versionExports(versions);
    const versionNamespace = `declare namespace hl7 {\n${versionExport}}\n`;
    const namespaceExport = `export {hl7 as default}\nexport {hl7Model};`;
    return `${modelImports}\n${versionImports}\n${modelNamespace}\n${versionNamespace}\n${namespaceExport}`;
  }

  private static versionImports(versions: string[]): string {
    let imports = "";
    versions.forEach((version) => (imports += IndexFiles.versionImport(version)));
    return imports;
  }

  private static versionImport(version: string): string {
    return `import ${IndexFiles.printVersion(version)} from "../build/${version}";\n`;
  }

  private static versionExports(versions: string[]): string {
    let exports = "";
    versions.forEach((version) => (exports += IndexFiles.versionExport(version)));
    return exports;
  }

  private static versionExport(version: string): string {
    return `export { ${IndexFiles.printVersion(version)} };\n`;
  }

  private static printVersion(version: string): string {
    return `v${version.replace(/[.]/g, "_")}`;
  }

  private static createFile(directory: string, fileContent: string) {
    fs.writeFileSync(`${IndexFiles.setDirectory(directory)}/index.ts`, fileContent);
  }

  private static setDirectory(directory: string): string {
    if (!fs.existsSync(directory)) fs.mkdirSync(directory);
    return directory;
  }
}
