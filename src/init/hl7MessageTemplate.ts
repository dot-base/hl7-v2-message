import ORU_Message from "@/model/messageTypes/oruMessage";
import Hl7Field from "@/types/hl7Field";
import FieldDefinition from "../model/fieldTypes/fieldDefinition";
import Hl7Types from "@/init/hl7Types";

export default class Hl7MessageTemplate {
  public static init(
    template: Hl7Defintion,
    message: ORU_Message
  ): ORU_Message {
    Object.values(message).forEach((segment) => {
      Object.entries(template.segments).forEach((templateSegment) => {
        if (templateSegment[0] === segment.type)
          segment.children = Hl7MessageTemplate.initFieldDefinition(
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
  ): FieldDefinition {
    const initFields: FieldDefinition = Hl7MessageTemplate.setFields(segmentType, fields)
    Hl7Types.createClassFile(segmentType, initFields);
    return initFields;
  }

  private static setFields(segmentType: string, fields: FieldDefintion[]) {
    let initFields: FieldDefinition = {};
    let index = 0;
    fields.forEach((field) => {
      const initField: Hl7Field = Hl7MessageTemplate.setField(
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
    return initFields;
  }

  private static setField(
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
}
