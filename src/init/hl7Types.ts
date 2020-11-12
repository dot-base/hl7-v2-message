import Hl7IField from "@/types/hl7IField";
import Hl7IFields from "@/types/hl7IFields";
import Hl7Model from "@/init/hl7Model";
import Hl7ISegment from "@/types/hl7ISegment";
import Hl7IMessage from "@/types/hl7IMessage";
import Hl7ISegmentDefinition from "@/types/hl7ISegmentDefinition";
import Hl7 from '@/types/hl7';

export default class Hl7Types {

  public static init(template: Hl7Defintion): Hl7 {
    const fields = Object.entries(template.segments).map((templateSegment) => {
      const segmentType = templateSegment[0];
      const fields: FieldDefintion[] = templateSegment[1].fields;
      return {segmentType:segmentType ,props:Hl7Types.initFields(segmentType, fields)};
    });
    const segments:Hl7ISegment[] = Object.entries(template.segments).map((templateSegment) => {
      return Hl7Types.initSegment(templateSegment);
    });
    const messages = Object.entries(template.messages).map((templateMessage) => {
      return Hl7Types.initMessage(templateMessage);
    });
    return new Hl7(messages,segments,fields)
    
  }

  private static initMessage(message: [string, Message]): Hl7IMessage {
    let initMessage: Hl7IMessage = {
      name: message[1].name,
      description: message[1].desc,
    };
    const segments = Hl7Types.retrieveSegments(message[1].segments.segments);
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
      const initSegment = Hl7Types.retrieveSegment(segment);
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
    Hl7Types.retrieveSegment(segment.children);
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
      const initField: Hl7IField = Hl7Types.initField(segmentType, field, index);
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
