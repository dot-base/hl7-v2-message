import Hl7IMessage from "@/lib/types/hl7IMessage";
import Hl7ISegment from "@/lib/types/hl7ISegment";
import Hl7IFields from "@/lib/types/hl7IFields";
import Hl7IField from "@/lib/types/hl7IField";
import Hl7 from "@/lib/types/hl7";
import Hl7IFieldDefinition from "@/lib/types/hl7IFieldDefinition";
import Hl7IMessageDefinition from "@/lib/types/hl7IMessageDefinition";
import Hl7ICompoundDefinition from "@/lib/types/hl7ICompoundDefinition";

export default class Hl7DictionaryConverter {
  public static init(template: Hl7Defintion): Hl7 {
    const fields = Object.entries(template.segments).map(Hl7Types.initFieldDefinition);
    const segments: Hl7ISegment[] = Object.entries(template.segments).map(Hl7Types.initSegment);
    const messages = Object.entries(template.messages).map(Hl7Types.initMessage);
    return new Hl7(messages, segments, fields);
  }

  private static initMessage(message: [string, Message]): Hl7IMessage {
    let initMessage: Hl7IMessage = {
      name: message[1].name,
      description: message[1].desc.replace(/['"]/g, ""),
    };
    const segments = Hl7Types.initMessageDefinitions(message[1].segments.segments);
    segments.forEach((segment) => {
      initMessage = Hl7Types.addMessageProp(initMessage, segment);
    });
    return initMessage;
  }

  private static initMessageDefinitions<T extends Hl7ISegment>(
    segments: SegmentDefintion[]
  ): Array<Hl7IMessageDefinition<T> | Hl7ICompoundDefinition> {
    let initMessageDefinition: Array<Hl7IMessageDefinition<T> | Hl7ICompoundDefinition> = [];
    segments.forEach((segment) => {
      initMessageDefinition = Hl7Types.initMessageDefinition(initMessageDefinition, segment);
    });
    return initMessageDefinition;
  }

  private static initMessageDefinition(
    messageDefinitions: Array<Hl7IMessageDefinition<Hl7ISegment> | Hl7ICompoundDefinition>,
    segment: SegmentDefintion,
    compoundDef?: Hl7ICompoundDefinition
  ): Array<Hl7IMessageDefinition<Hl7ISegment> | Hl7ICompoundDefinition> {
    const segmentName = segment.name ? segment.name.replace(/[\W]/g, "_") : "";
    let compoundSegmentName = "";
    if (compoundDef && segment.name) {
      compoundSegmentName = `${compoundDef.definition.type}_${segmentName}`;
    }
    const messageDef: Hl7IMessageDefinition<Hl7ISegment> | Hl7ICompoundDefinition = {
      definition: {
        name: compoundSegmentName ? compoundSegmentName : segmentName,
        type: segmentName,
        isOptional: segment.min === 0,
        repeatable: segment.max === 0,
      },
      compoundDefinition: compoundDef ? compoundDef : undefined,
    };
    if (!segment.children && !segment.compounds) {
      Object.defineProperty(messageDef, "value", {
        value: [],
        writable: true,
      });
    }
    messageDefinitions.push(messageDef);
    if (segment.children)
      segment.children.map((childSegment) =>
        Hl7Types.initMessageDefinition(messageDefinitions, childSegment, messageDef)
      );

    if (segment.compounds)
      segment.compounds.map((childSegment) =>
        Hl7Types.initMessageDefinition(messageDefinitions, childSegment, messageDef)
      );

    return messageDefinitions;
  }

  private static addMessageProp(
    initMessage: Hl7IMessage,
    message: Hl7IMessageDefinition<Hl7ISegment> | Hl7ICompoundDefinition
  ) {
    return Object.defineProperty(initMessage, message.definition.type, {
      value: message,
      writable: true,
    });
  }

  private static initSegment(segment: [string, Segment]): Hl7ISegment {
    return {
      type: segment[0],
      children: {},
      description: segment[1].desc.replace(/['"]/g, ""),
    };
  }

  private static initFieldDefinition(segments: [string, Segment]): Hl7IFieldDefinition {
    const segmentType = segments[0];
    const fields: FieldDefintion[] = segments[1].fields;
    return {
      segmentType: segmentType,
      fields: Hl7Types.initFields(segmentType, fields),
    };
  }

  private static initFields(segmentType: string, fields: FieldDefintion[]): Hl7IFields {
    let initFields: Hl7IFields = {};
    let index = 0;
    fields.forEach((field) => {
      const initField: Hl7IField = Hl7Types.initField(segmentType, field, index);
      index = index + 1;
      initFields = Hl7Types.addFieldProp(initFields, initField);
    });
    return initFields;
  }

  private static initField(segmentType: string, field: FieldDefintion, index: number): Hl7IField {
    return {
      index: index,
      identifier: `${segmentType}_${index + 1}`,
      description: field.desc.replace(/['"]/g, ""),
      length: field.len,
      optional: field.opt === 1 ? true : false,
      repeatable: field.rep,
      value: "",
    };
  }

  private static addFieldProp(initFields: Hl7IFields, initField: Hl7IField) {
    return Object.defineProperty(initFields, initField.identifier, {
      value: initField,
      writable: true,
    });
  }
}