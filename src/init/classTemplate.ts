export default class ClassTemplate {
  public static fields(type: string, classProps: string, description?: string): string {
    const imports = `import Hl7Fields from '@/model/hl7Fields';\nimport Hl7IField from "@/types/hl7IField";`;
    const docs = description ? `/**\n* ${description}\n*/` : "";
    const classDeclaration = `export default class ${type}_Fields extends Hl7Fields`;
    return `${imports}\n${docs}\n${classDeclaration}{\n${classProps}\n}`;
  }

  public static segment(type: string, classProps: string, description?: string): string {
    const imports = `import Hl7Segment from "@/model/hl7Segment";\nimport ${type}_Fields from '@/model/hl7Fields/${type.toLowerCase()}Fields';\n`;
    const docs = description ? `/**\n* ${description}\n*/` : "";
    const classDeclaration = `export default class ${type}_Segment extends Hl7Segment`;
    return `${imports}\n${docs}\n${classDeclaration}{\n${classProps}\n}`;
  }

  public static message(
    type: string,
    classProps: string,
    imports?: string,
    description?: string
  ): string {
    const classImports = `import Hl7Message from '@/model/hl7Message';\nimport Hl7IMessageDefinition from '@/types/hl7IMessageDefinition';\n${imports}`;
    const docs = description ? `/**\n* ${description}\n*/` : "";
    const classDeclaration = `export default class ${type}_Message extends Hl7Message`;
    return `${classImports}\n${docs}\n${classDeclaration}{\n${classProps}\n}`;
  }
}
