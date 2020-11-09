import Hl7Field from "@/types/hl7Field";
import FieldDefinition from "@/model/fieldTypes/fieldDefinition";
import Hl7ClassBuilder from "@/init/hl7ClassBuilder";
import { SegmentType } from "@/enums/hl7Enums";
import Hl7ISegment from "@/types/hl7ISegment";

export default class Hl7DefinitionBuilder {
  public static init(template: Hl7Defintion) {
    Object.entries(template.segments).forEach((templateSegment) => {
      Hl7DefinitionBuilder.createFieldDefinition(
        templateSegment[0],
        templateSegment[1].fields
      );
      Hl7DefinitionBuilder.createSegmentDefinition(templateSegment);
    });
  }

  private static createSegmentDefinition(segment: [string, Segment]) {
    const initSegment = Hl7DefinitionBuilder.initSegment(segment);
    if (initSegment) Hl7ClassBuilder.createSegment(initSegment);
  }

  private static initSegment(
    segment: [string, Segment]
  ): Hl7ISegment | undefined {
    const validType = Object.entries(SegmentType).find(
      (type) => type[1] === segment[0]
    );
    if (!validType) return;
    return {
      type: validType[1],
      children: {},
      optional: true,
      description: segment[1].desc,
    };
  }

  private static createFieldDefinition(
    segmentType: string,
    fields: FieldDefintion[]
  ): FieldDefinition {
    const initFields: FieldDefinition = Hl7DefinitionBuilder.initFields(
      segmentType,
      fields
    );
    Hl7ClassBuilder.createFieldDefinition(segmentType, initFields);
    return initFields;
  }

  private static initFields(segmentType: string, fields: FieldDefintion[]) {
    let initFields: FieldDefinition = {};
    let index = 0;
    fields.forEach((field) => {
      const initField: Hl7Field = Hl7DefinitionBuilder.initField(
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

  private static initField(
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
