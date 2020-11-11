import Hl7IField from "@/types/hl7IField";
import Hl7IFields from "@/types/hl7IFields";
import Hl7Model from "@/init/hl7Model";
import Hl7ISegment from "@/types/hl7ISegment";
import Hl7IMessage from "@/types/hl7IMessage";
import Hl7ISegmentDefinition from "@/types/hl7ISegmentDefinition";

export default class Hl7TypeBuilder {
  public static init(template: Hl7Defintion): void {
    Object.entries(template.segments).forEach((templateSegment) => {
      Hl7TypeBuilder.createFieldDefinition(templateSegment);
      Hl7TypeBuilder.createSegmentDefinition(templateSegment);
    });
    Object.entries(template.messages).forEach((templateMessage) => {
      Hl7TypeBuilder.createMessageDefinition(templateMessage);
    });
  }

  private static createMessageDefinition(message: [string, Message]) {
    const initMessage: Hl7IMessage = Hl7TypeBuilder.initMessage(message);
    Hl7Model.createMessage(initMessage);
  }

  private static createSegmentDefinition(segment: [string, Segment]) {
    const initSegment: Hl7ISegment = Hl7TypeBuilder.initSegment(segment);
    Hl7Model.createSegment(initSegment);
  }

  private static createFieldDefinition(segment: [string, Segment]) {
    const segmentType = segment[0];
    const fields: FieldDefintion[] = segment[1].fields;
    const initFields: Hl7IFields = Hl7TypeBuilder.initFields(segmentType, fields);
    Hl7Model.createFields(segmentType, initFields);
  }

  private static initMessage(message: [string, Message]): Hl7IMessage {
    let initMessage: Hl7IMessage = {
      name: message[1].name,
      description: message[1].desc,
    };
    const segments = Hl7TypeBuilder.retrieveSegments(message[1].segments.segments);
    segments.forEach((segment) => {
      initMessage = Object.defineProperty(initMessage, segment.type, {
        value: { definition: segment },
        writable: true,
      });
    });

    return initMessage;
  }

  private static retrieveSegments(segments: SegmentDefintion[]): Hl7ISegmentDefinition[] {
    const initSegments: Hl7ISegmentDefinition[] = [];
    segments.forEach((segment) => {
      const initSegment = Hl7TypeBuilder.retrieveSegment(segment);
      if (initSegment) initSegments.push(initSegment);
    });
    return initSegments;
  }

  private static retrieveSegment(segment: SegmentDefintion): Hl7ISegmentDefinition | undefined {
    if (!segment.children) {
      return {
        type: segment.name,
        isOptional: segment.min === 0,
        repeatable: segment.max === 0,
      };
    }
    Hl7TypeBuilder.retrieveSegment(segment.children);
  }

  private static initSegment(segment: [string, Segment]): Hl7ISegment {
    return {
      type: segment[0],
      children: {},
      description: segment[1].desc,
    };
  }

  private static initFields(segmentType: string, fields: FieldDefintion[]): Hl7IFields {
    let initFields: Hl7IFields = {};
    let index = 0;
    fields.forEach((field) => {
      const initField: Hl7IField = Hl7TypeBuilder.initField(segmentType, field, index);
      index = index + 1;
      initFields = Object.defineProperty(initFields, initField.identifier, {
        value: initField,
        writable: true,
      });
    });
    return initFields;
  }

  private static initField(segmentType: string, field: FieldDefintion, index: number): Hl7IField {
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
