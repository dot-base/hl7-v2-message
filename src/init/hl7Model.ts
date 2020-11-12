import fs from "fs";
import Hl7IFields from "@/types/hl7IFields";
import Hl7ISegment from "@/types/hl7ISegment";
import Hl7IMessage from "@/types/hl7IMessage";
import Hl7IMessageDefinition from "@/types/hl7IMessageDefinition";
import ClassTemplate from "@/init/classTemplate";
import Hl7 from '@/types/hl7';

export default class Hl7Model {
public static createClassFiles(hl7Types:Hl7):void{
  hl7Types.messages.forEach(message=>Hl7Model.createMessage(message));
  hl7Types.segments.forEach(segments=>Hl7Model.createSegment(segments));
  hl7Types.fields.forEach(fields=>Hl7Model.createFields(fields.segmentType,fields.props));
}

  private static createMessage(message: Hl7IMessage): void {
    const content = Hl7Model.buildMessage(message);
    Hl7Model.createFile("messages", `${message.name.toLowerCase()}Message`, content);
  }

  private static createSegment(segment: Hl7ISegment): void {
    const content = Hl7Model.buildSegment(segment);
    Hl7Model.createFile("segments", `${segment.type.toLowerCase()}Segment`, content);
  }

  private static createFields(segmentType: string, fields: Hl7IFields): void {
    const content: string = Hl7Model.buildFields(segmentType, fields);
    Hl7Model.createFile("fields", `${segmentType.toLowerCase()}Fields`, content);
  }

  private static createFile(directory: string, fileName: string, fileContent: string) {
    fs.writeFileSync(`${Hl7Model.uploadDirectory(directory)}/${fileName}.ts`, fileContent);
  }

  private static uploadDirectory(dirName: string): string {
    const uploadDirectory =
      process.env.NODE_ENV === "development" ? `./src/model/${dirName}` : `src/model/${dirName}`;
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory);
    }
    return uploadDirectory;
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
        imports += `import ${messageDef.definition.type}_Segment from '@/model/segments/${messageDef.definition.type}Segment';\n`;
      } else messageProps += `public ${message[0]}:string = '${message[1].value}';\n`;
    });
    return ClassTemplate.message(message.name, messageProps, imports, message.description);
  }

  private static buildSegment(segment: Hl7ISegment): string {
    let segmentProps = "";
    Object.entries(Object.getOwnPropertyDescriptors(segment)).forEach((segmentProp) => {
      if (segmentProp[0] === "type" || segmentProp[0] === "description")
        segmentProps += `public ${segmentProp[0]}:string = ${JSON.stringify(
          segmentProp[1].value
        )}; \n`;
      else
        segmentProps += `public ${segmentProp[0]}:${segment.type}_Fields = new ${segment.type}_Fields(); \n`;
    });
    return ClassTemplate.segment(segment.type, segmentProps, segment.description);
  }

  private static buildFields(segmentType: string, fields: Hl7IFields): string {
    let fieldProps = "";
    Object.entries(Object.getOwnPropertyDescriptors(fields)).forEach(
      (field) =>
        (fieldProps += `\n/**\n* ${field[1].value.description}\n*/\npublic ${field[0]
          }:Hl7IField = ${JSON.stringify(field[1].value)}; \n`)
    );
    return ClassTemplate.fields(segmentType, fieldProps);
  }
}
