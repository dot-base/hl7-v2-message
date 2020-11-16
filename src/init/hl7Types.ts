import Hl7IField from "@/types/hl7IField";
import Hl7IFields from "@/types/hl7IFields";
import Hl7ISegment from "@/types/hl7ISegment";
import Hl7IMessage from "@/types/hl7IMessage";
import Hl7ISegmentDefinition from "@/types/hl7ISegmentDefinition";
import Hl7 from "@/types/hl7";
import { Hl7Field } from "@/model/hl7Field";
import Hl7IFieldDefinition from "@/types/hl7FieldDefinition";

export default class Hl7Types {
  public static init(template: Hl7Defintion): Hl7 {
    const segments: Hl7ISegment[] = Object.entries(template.segments).map(
      Hl7Types.initSegment
    );
    const messages = Object.entries(template.messages).map(
      Hl7Types.initMessage
    );
    const fields = Object.entries(template.segments).map(
      Hl7Types.initFieldDefinition
    );
    return new Hl7(messages, segments, fields);
  }

  private static initMessage(message: [string, Message]): Hl7IMessage {
    let initMessage: Hl7IMessage = {
      name: message[1].name,
      description: message[1].desc,
    };
    const segments = Hl7Types.retrieveSegments(message[1].segments.segments);
    segments.forEach((segment) => {
      initMessage = Hl7Types.addMessageProp(initMessage, segment);
    });
    return initMessage;
  }

  private static retrieveSegments(
    segments: SegmentDefintion[]
  ): Hl7ISegmentDefinition[] {
    const initSegments: Hl7ISegmentDefinition[] = [];
    segments.forEach((segment) => {
      const initSegment = Hl7Types.retrieveSegment(segment);
      if (initSegment) initSegments.push(initSegment);
    });
    return initSegments;
  }

  private static retrieveSegment(
    segment: SegmentDefintion
  ): Hl7ISegmentDefinition | undefined {
    if (!segment.children) {
      return {
        type: segment.name,
        isOptional: segment.min === 0,
        repeatable: segment.max === 0,
      };
    }
    Hl7Types.retrieveSegment(segment.children);
  }

  private static addMessageProp(
    initMessage: Hl7IMessage,
    segment: Hl7ISegmentDefinition
  ) {
    return Object.defineProperty(initMessage, segment.type, {
      value: { definition: segment },
      writable: true,
    });
  }

  private static initSegment(segment: [string, Segment]): Hl7ISegment {
    return {
      type: segment[0],
      children: {},
      description: segment[1].desc,
    };
  }

  private static initFieldDefinition(
    segments: [string, Segment]
  ): Hl7IFieldDefinition {
    const segmentType = segments[0];
    const fields: FieldDefintion[] = segments[1].fields;
    return {
      segmentType: segments[0],
      fields: Hl7Types.initFields(segments[0], segments[1].fields),
    };
  }

  private static initFields(
    segmentType: string,
    fields: FieldDefintion[]
  ): Hl7IFields {
    let initFields: Hl7IFields = {};
    let index = 0;
    fields.forEach((field) => {
      const initField: Hl7IField = Hl7Types.initField(
        segmentType,
        field,
        index
      );
      index = index + 1;
      initFields = Hl7Types.addFieldProp(initFields, initField);
    });
    return initFields;
  }

  private static initField(
    segmentType: string,
    field: FieldDefintion,
    index: number
  ): Hl7IField {
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

  private static addFieldProp(initFields: Hl7IFields, initField: Hl7Field) {
    return Object.defineProperty(initFields, initField.identifier, {
      value: initField,
      writable: true,
    });
  }
}
