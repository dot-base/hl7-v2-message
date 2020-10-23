import ORU_Message from "@/model/messageTypes/oruMessage";
import Hl7Field from "@/types/hl7Field";
import Hl7IFieldDefinition from "@/types/hl7IFieldDefinition";
import fs from "fs";

export default class Hl7Definition {
  public static init(
    template: Hl7MessageDefintion,
    message: ORU_Message
  ): ORU_Message {
    Object.values(message).forEach((segment) => {
      Object.entries(template.segments).forEach((templateSegment) => {
        if (templateSegment[0] === segment.type)
          segment.children = Hl7Definition.initFieldDefinition(
            templateSegment[0],
            templateSegment[1].fields
          );
      });
    });
    return message;
  }

  private static initFieldDefinition(
    segmentType: string,
    fields: FieldDefintion[]
  ): Hl7IFieldDefinition {
    let initFields: Hl7IFieldDefinition = {};
    let index = 0;
    fields.forEach((field) => {
      const initField: Hl7Field = Hl7Definition.mapField(
        segmentType,
        field,
        index
      );
      index = index + 1;
      initFields = Object.defineProperty(initFields, initField.identifier, {
        value: initField,
        writable: true,
      });
    });
    Hl7Definition.createClassFile(segmentType, initFields);
    return initFields;
  }

  private static mapField(
    segmentType: string,
    field: FieldDefintion,
    index: number
  ): Hl7Field {
    return {
      index: index,
      identifier: `${segmentType}_${index + 1}`,
      description: field.desc,
      length: field.len,
      optional: field.opt === 1 ? true : false,
      repeatable: field.rep,
      value: "",
    };
  }

  private static createClassFile(
    segmentType: string,
    fieldDefinition: Hl7IFieldDefinition
  ) {
    const content: string = Hl7Definition.buildFromTemplate(
      segmentType,
      fieldDefinition
    );
    fs.writeFileSync(
      `${
        Hl7Definition.uploadDirectory
      }/${segmentType.toLowerCase()}FieldDefinition.ts`,
      content
    );
    console.log("createClassFile");
  }

  public static get uploadDirectory(): string {
    const uploadDirectory =
      process.env.NODE_ENV === "development"
        ? "./src/model/fieldTypes"
        : "src/model/fieldTypes";
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory);
    }
    return uploadDirectory;
  }

  private static buildFromTemplate(
    segmentType: string,
    fieldDefinition: Hl7IFieldDefinition
  ): string {
    const params: string[] = [];
    Object.entries(fieldDefinition).forEach((field) =>
      params.push(`${field[0]}:${JSON.stringify(field[1])}`)
    );
    console.log(JSON.stringify(fieldDefinition));
    return `import Hl7IFieldDefinition from "@/types/hl7IFieldDefinition"\n;import Hl7Field from "@/types/hl7Field";\n\n
    export default class ${segmentType.toLowerCase()}FieldDefinition extends FieldDefinition {\n
      someCodeComesHere\n
    }`;
  }
}
