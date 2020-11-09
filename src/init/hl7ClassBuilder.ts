import fs from "fs";
import FieldDefinition from "@/model/fieldTypes/fieldDefinition";
import Hl7ISegment from "@/types/hl7ISegment";

export default class Hl7ClassBuilder {

  public static createSegment(segment: Hl7ISegment) {
    const content = Hl7ClassBuilder.buildSegment(segment);
    Hl7ClassBuilder.createFile("segmentTypes", `${segment.type.toLowerCase()}Segment`, content)
  }

  public static createFieldDefinition(
    segmentType: string,
    fieldDefinition: FieldDefinition
  ) {
    const content: string = Hl7ClassBuilder.buildFieldDefinition(
      segmentType,
      fieldDefinition
    );
    Hl7ClassBuilder.createFile("fieldTypes", `${segmentType.toLowerCase()}FieldDefinition`, content)
  }

  private static createFile(directory: string, fileName: string, fileContent: string) {
    fs.writeFileSync(
      `${Hl7ClassBuilder.uploadDirectory(
        directory
      )}/${fileName}.ts`,
      fileContent
    );
  }

  private static uploadDirectory(dirName: string): string {
    const uploadDirectory =
      process.env.NODE_ENV === "development"
        ? `./src/model/${dirName}`
        : `src/model/${dirName}`;
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory);
    }
    return uploadDirectory;
  }

  private static buildSegment(segment: Hl7ISegment): string {
    const segmentProps = `
   public type: SegmentType = SegmentType.${segment.type};
   public optional = false;
   public children: ${segment.type}_FieldDefinition = new ${segment.type}_FieldDefinition();\n\n
   `;
    return `import Hl7Segment from "@/model/segmentTypes/hl7Segment"\n;import { SegmentType } from "@/enums/hl7Enums";\nimport ${segment.type
      }_FieldDefinition from '@/model/fieldTypes/${segment.type.toLowerCase()}FieldDefinition';\n
    /**\n* ${segment.description}\n*/\nexport default class ${segment.type
      }_Segment extends Hl7Segment {\n${segmentProps}\n}`;
  }

  private static buildFieldDefinition(
    segmentType: string,
    fieldDefinition: FieldDefinition
  ): string {
    const props: {
      [key: string]: PropertyDescriptor;
    } = Object.getOwnPropertyDescriptors(fieldDefinition);
    let fieldDefintionProps = "";
    Object.entries(props).forEach(
      (entry) =>
        (fieldDefintionProps += `/**\n* ${entry[1].value.description
          }\n*/\npublic ${entry[0]}:Hl7Field = ${JSON.stringify(
            entry[1].value
          )}; \n\n`)
    );
    return `import FieldDefinition from '@/model/fieldTypes/fieldDefinition';\nimport Hl7Field from "@/types/hl7Field";\n
        export default class ${segmentType}_FieldDefinition extends FieldDefinition {\n
          ${fieldDefintionProps}\n
        }`;
  }
}
