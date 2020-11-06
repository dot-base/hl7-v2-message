import fs from "fs";
import FieldDefinition from "@/model/fieldTypes/fieldDefinition";


export default class Hl7Types {
    public static createClassFile(
        segmentType: string,
        fieldDefinition: FieldDefinition
    ) {
        const content: string = Hl7Types.buildFromTemplate(
            segmentType,
            fieldDefinition
        );
        fs.writeFileSync(
            `${Hl7Types.uploadDirectory
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

    private static buildFromTemplate<T extends FieldDefinition>(
        segmentType: string,
        fieldDefinition: T
    ): string {
        const props: {
            [key: string]: PropertyDescriptor;
        } = Object.getOwnPropertyDescriptors(fieldDefinition);
        const propEntries = Object.entries(props);
        let fieldDefintionCode = "";
        propEntries.forEach(
            (entry) =>
                (fieldDefintionCode += `/**\n* ${entry[1].value.description
                    }\n*/\npublic ${entry[0]}:Hl7Field = ${JSON.stringify(
                        entry[1].value
                    )}; \n\n`)
        );
        const content = `import FieldDefinition from '@/model/fieldTypes/fieldDefinition';\n;import Hl7Field from "@/types/hl7Field";\n\n
        export default class ${segmentType.toLowerCase()}FieldDefinition extends FieldDefinition {\n
          ${fieldDefintionCode}\n
        }`;
        return content;
    }
}