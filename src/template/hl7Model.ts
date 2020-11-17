import fs from "fs";
import ClassTemplate from "@/template/classTemplate";
import Hl7IFields from "@/lib/types/hl7IFields";
import Hl7 from "@/lib/types/hl7";
import Hl7IMessage from "@/lib/types/hl7IMessage";
import Hl7ISegment from "@/lib/types/hl7ISegment";
import Hl7IMessageDefinition from "@/lib/types/hl7IMessageDefinition";
import Hl7IFieldDefinition from "@/lib/types/hl7FieldDefinition";
import { dir } from 'console';

export default class Hl7Model {
  private static versionDirectory: string;

  public static createClassFiles(baseDirectory: string, version: string, hl7Types: Hl7): void {
    Hl7Model.versionDirectory = Hl7Model.setVersionDirectory(baseDirectory, version);
    hl7Types.messages.forEach(Hl7Model.createMessage);
    hl7Types.segments.forEach(Hl7Model.createSegment);
    hl7Types.fields.forEach(Hl7Model.createFields);
  }

  private static createMessage(message: Hl7IMessage): void {
    const content = Hl7Model.buildMessage(message);
    Hl7Model.createFile("messages", `${message.name.toLowerCase()}Message`, content);
  }

  private static createSegment(segment: Hl7ISegment): void {
    const content = Hl7Model.buildSegment(segment);
    Hl7Model.createFile("segments", `${segment.type.toLowerCase()}Segment`, content);
  }

  private static createFields(field: Hl7IFieldDefinition): void {
    const segmentType = field.segmentType;
    const fields = field.fields;
    const content: string = Hl7Model.buildFields(segmentType, fields);
    Hl7Model.createFile("fields", `${segmentType.toLowerCase()}Fields`, content);
  }

  private static createFile(directory: string, fileName: string, fileContent: string) {
    fs.writeFileSync(`${Hl7Model.setDirectory(directory)}/${fileName}.ts`, fileContent);
  }

  private static setVersionDirectory(baseDirectory: string, version: string):string {
    const directory = `${baseDirectory}/${version}`;
    if (!fs.existsSync(Hl7Model.versionDirectory)) fs.mkdirSync(Hl7Model.versionDirectory);
    return directory;
  }

  private static setDirectory(dirName: string): string {
    const directory = `${Hl7Model.versionDirectory}/${dirName}`;
    if (!fs.existsSync(directory)) fs.mkdirSync(directory);
    return directory;
  }

  private static buildMessage(message: Hl7IMessage): string {
    let imports = "";
    let messageProps = "";
    Object.entries(Object.getOwnPropertyDescriptors(message)).forEach((message) => {
      if (message[0] !== "name" && message[0] !== "description") {
        const messageDef: Hl7IMessageDefinition = message[1].value;
        messageProps += `public ${message[0]}:Hl7IMessageDefinition = { definition:${JSON.stringify(
          messageDef.definition
        )},value: new ${messageDef.definition.type}_Segment() };\n`;
        imports += `import { ${
          messageDef.definition.type
        }_Segment } from '../segments/${messageDef.definition.type.toLowerCase()}Segment';\n`;
      } else messageProps += `public ${message[0]}:string = '${message[1].value}';\n`;
    });
    return ClassTemplate.message(message.name, messageProps, imports, message.description);
  }

  private static buildSegment(segment: Hl7ISegment): string {
    let segmentProps = "";
    Object.entries(Object.getOwnPropertyDescriptors(segment)).forEach((segmentProp) => {
      if (segmentProp[0] === "type" || segmentProp[0] === "description")
        segmentProps += `public ${segmentProp[0]}:string = ${JSON.stringify(segmentProp[1].value)}; \n`;
      else segmentProps += `public ${segmentProp[0]}:${segment.type}_Fields = new ${segment.type}_Fields(); \n`;
    });
    return ClassTemplate.segment(segment.type, segmentProps, segment.description);
  }

  private static buildFields(segmentType: string, fields: Hl7IFields): string {
    let fieldProps = "";
    Object.entries(Object.getOwnPropertyDescriptors(fields)).forEach(
      (field) =>
        (fieldProps += `\n/**\n* ${field[1].value.description}\n*/\npublic ${field[0]}:Hl7Field = ${JSON.stringify(
          field[1].value
        )}; \n`)
    );
    return ClassTemplate.fields(segmentType, fieldProps);
  }
}
