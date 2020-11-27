import Hl7 from "@/lib/types/Hl7";
import Hl7IMessage from "@/lib/types/Hl7IMessage";
import Hl7ISegment from "@/lib/types/Hl7ISegment";
import Hl7IField from "@/lib/types/Hl7IField";
import Hl7IMessageSegment from "@/lib/types/Hl7IMessageSegment";
import Hl7IMessageCompound from "@/lib/types/Hl7IMessageCompound";

export default class Hl7DictionaryConverter {
  public static init(hl7Dictionary: Hl7Defintion): Hl7 {
    const messages = Object.values(hl7Dictionary.messages).map(Hl7DictionaryConverter.initMessage);
    const segments = Object.entries(hl7Dictionary.segments).map(([type, segment]) =>
      Hl7DictionaryConverter.initSegment(type, segment)
    );

    return new Hl7(messages, segments);
  }

  //   MESSAGES   //

  private static initMessage(hl7DictionaryMessage: Message): Hl7IMessage {
    const message = {
      name: hl7DictionaryMessage.name,
      description: hl7DictionaryMessage.desc,
      segments: {},
    };
    Hl7DictionaryConverter.addMessageSegments(message, hl7DictionaryMessage.segments.segments);
    return message;
  }

  private static addMessageSegments(
    message: Hl7IMessage,
    hl7DictionarySegments: SegmentDefintion[],
    parentCompound?: Hl7IMessageSegment<Hl7ISegment> | Hl7IMessageCompound
  ) {
    for (const hl7DictionarySegment of hl7DictionarySegments) {
      const messageSegmentName = Hl7DictionaryConverter.messageSegmentName(hl7DictionarySegment, parentCompound);
      const messageSegment: any = Hl7DictionaryConverter.initMessageSegment(hl7DictionarySegment, parentCompound);
      message.segments[messageSegmentName] = messageSegment;

      if (hl7DictionarySegment.children)
        Hl7DictionaryConverter.addMessageSegments(
          message,
          hl7DictionarySegment.children,
          message.segments[messageSegmentName]
        );
      if (hl7DictionarySegment.compounds)
        Hl7DictionaryConverter.addMessageSegments(
          message,
          hl7DictionarySegment.compounds,
          message.segments[messageSegmentName]
        );
    }
  }

  private static messageSegmentName(
    hl7DictionarySegment: SegmentDefintion,
    parentCompound?: Hl7IMessageSegment<Hl7ISegment> | Hl7IMessageCompound
  ): string {
    return parentCompound && parentCompound.name
      ? `${parentCompound.name}_${hl7DictionarySegment.name}`
      : hl7DictionarySegment.name;
  }

  private static initMessageSegment(
    hl7DictionarySegment: SegmentDefintion,
    parentCompound?: Hl7IMessageSegment<Hl7ISegment> | Hl7IMessageCompound
  ): Hl7IMessage {
    const messageSegmentName = Hl7DictionaryConverter.messageSegmentName(hl7DictionarySegment, parentCompound);
    const messageSegment: any = {
      type: hl7DictionarySegment.name,
      name: messageSegmentName,
      isOptional: hl7DictionarySegment.min === 0,
      isRepeatable: hl7DictionarySegment.max === 0,
      parentCompound: parentCompound,
    };
    if (!hl7DictionarySegment.children && !hl7DictionarySegment.compounds) messageSegment.value = [];

    return messageSegment;
  }

  //   SEGMENTS   //

  private static initSegment(type: string, hl7DictionarySegment: Segment): Hl7ISegment {
    const segment = {
      type: type,
      description: hl7DictionarySegment.desc.replace(/['"]/g, ""),
      fields: {},
    };
    Hl7DictionaryConverter.addSegmentFields(segment, hl7DictionarySegment);

    return segment;
  }

  //   FIELDS   //

  private static addSegmentFields(segment: Hl7ISegment, hl7DictionarySegment: Segment) {
    for (const [fieldIndex, hl7DictionaryField] of hl7DictionarySegment.fields.entries()) {
      const field: Hl7IField = Hl7DictionaryConverter.initField(segment.type, hl7DictionaryField, fieldIndex);
      segment.fields[field.identifier] = field;
    }
  }

  private static initField(segmentType: string, field: FieldDefintion, index: number): Hl7IField {
    return {
      index: index,
      identifier: `${segmentType}_${index + 1}`,
      description: field.desc.replace(/['"]/g, ""),
      length: field.len,
      isOptional: field.opt === 1 ? true : false,
      isRepeatable: field.rep,
      value: "",
    };
  }
}
