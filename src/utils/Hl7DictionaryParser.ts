import Hl7 from "@/utils/Hl7";
import Hl7IMessage from "@/static/global/types/Hl7IMessage";
import Hl7ISegment from "@/static/global/types/Hl7ISegment";
import Hl7IField from "@/static/global/types/Hl7IField";
import Hl7IMessageSegment from "@/static/global/types/Hl7IMessageSegment";
import Hl7IMessageCompound from "@/static/global/types/Hl7IMessageCompound";

export default class Hl7DictionaryParser {
  public static init(hl7Dictionary: Hl7Defintion): Hl7 {
    const messages: Hl7IMessage[] = Object.values(hl7Dictionary.messages).map(Hl7DictionaryParser.initMessage);
    const segments: Hl7ISegment[] = Object.entries(hl7Dictionary.segments).map(([type, segment]) =>
      Hl7DictionaryParser.initSegment(type, segment)
    );
    Hl7DictionaryParser.validateMessages(messages, segments);
    return new Hl7(messages, segments);
  }

  //   MESSAGES   //

  private static initMessage(hl7DictionaryMessage: Message): Hl7IMessage {
    const message = {
      name: hl7DictionaryMessage.name,
      description: hl7DictionaryMessage.desc,
      segments: {},
      compounds: {},
    };
    Hl7DictionaryParser.addMessageElements(message, hl7DictionaryMessage.segments.segments);
    return message;
  }

  private static addMessageElements(
    message: Hl7IMessage,
    hl7DictionarySegments: SegmentDefintion[],
    parentCompound?: Hl7IMessageCompound
  ) {
    for (const hl7DictionarySegment of hl7DictionarySegments) {
      if (!hl7DictionarySegment.children && !hl7DictionarySegment.compounds)
        Hl7DictionaryParser.addMessageSegment(message, hl7DictionarySegment, parentCompound);
      else Hl7DictionaryParser.addMessageCompound(message, hl7DictionarySegment, parentCompound);
    }
  }

  private static addMessageSegment(
    message: Hl7IMessage,
    hl7DictionarySegment: SegmentDefintion,
    parentCompound?: Hl7IMessageCompound
  ) {
    const messageSegment: Hl7IMessageSegment<Hl7ISegment> = Hl7DictionaryParser.initMessageSegment(
      hl7DictionarySegment,
      parentCompound
    );
    message.segments[messageSegment.name] = messageSegment;
  }

  private static addMessageCompound(
    message: Hl7IMessage,
    hl7DictionarySegment: SegmentDefintion,
    parentCompound?: Hl7IMessageCompound
  ) {
    const messageCompound: Hl7IMessageCompound = Hl7DictionaryParser.initMessageCompound(
      hl7DictionarySegment,
      parentCompound
    );
    message.compounds ? (message.compounds[messageCompound.name] = messageCompound) : messageCompound;
    Hl7DictionaryParser.addCompoundSegments(message, hl7DictionarySegment, messageCompound);
  }

  private static addCompoundSegments(
    message: Hl7IMessage,
    hl7DictionarySegment: SegmentDefintion,
    messageCompound?: Hl7IMessageCompound
  ) {
    if (hl7DictionarySegment.children)
      Hl7DictionaryParser.addMessageElements(message, hl7DictionarySegment.children, messageCompound);
    if (hl7DictionarySegment.compounds)
      Hl7DictionaryParser.addMessageElements(message, hl7DictionarySegment.compounds, messageCompound);
  }

  private static messageElementName(
    hl7DictionarySegment: SegmentDefintion,
    parentCompound?: Hl7IMessageSegment<Hl7ISegment> | Hl7IMessageCompound
  ): string {
    return parentCompound && parentCompound.name
      ? `${parentCompound.name}_${hl7DictionarySegment.name}`
      : hl7DictionarySegment.name;
  }

  private static initMessageSegment(
    hl7DictionarySegment: SegmentDefintion,
    parentCompound?: Hl7IMessageCompound
  ): Hl7IMessageSegment<Hl7ISegment> {
    const messageSegmentName = Hl7DictionaryParser.messageElementName(hl7DictionarySegment, parentCompound);
    const messageSegment: Hl7IMessageSegment<Hl7ISegment> = {
      type: hl7DictionarySegment.name,
      name: messageSegmentName.replace(/[/]/g, "_"),
      isOptional: hl7DictionarySegment.min === 0,
      isRepeatable: hl7DictionarySegment.max === 0,
      parentCompound: parentCompound,
      value: [],
    };
    return messageSegment;
  }

  private static initMessageCompound(
    hl7DictionarySegment: SegmentDefintion,
    parentCompound?: Hl7IMessageCompound
  ): Hl7IMessageCompound {
    const messageCompoundName = Hl7DictionaryParser.messageElementName(hl7DictionarySegment, parentCompound);
    const messageCompound: Hl7IMessageCompound = {
      name: messageCompoundName.replace(/[/]/g, "_"),
      isOptional: hl7DictionarySegment.min === 0,
      isRepeatable: hl7DictionarySegment.max === 0,
      parentCompound: parentCompound?.name,
    };
    return messageCompound;
  }

  //   SEGMENTS   //

  private static initSegment(type: string, hl7DictionarySegment: Segment): Hl7ISegment {
    const segment = {
      type: type,
      description: hl7DictionarySegment.desc.replace(/['"]/g, ""),
      fields: {},
    };
    Hl7DictionaryParser.addSegmentFields(segment, hl7DictionarySegment);
    return segment;
  }

  //   FIELDS   //

  private static addSegmentFields(segment: Hl7ISegment, hl7DictionarySegment: Segment) {
    for (const [fieldIndex, hl7DictionaryField] of hl7DictionarySegment.fields.entries()) {
      const field: Hl7IField = Hl7DictionaryParser.initField(segment.type, hl7DictionaryField, fieldIndex);
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
      isRepeatable: field.rep === 0,
      value: "",
    };
  }

  // VALIDATION //

  private static validateMessages(messages: Hl7IMessage[], segments: Hl7ISegment[]) {
    messages.forEach((message) => {
      Hl7DictionaryParser.removeInvalidSegments(message, segments);
    });
  }

  private static removeInvalidSegments(message: Hl7IMessage, segments: Hl7ISegment[]) {
    for (const messageSegment of Object.values(message.segments)) {
      if (!Hl7DictionaryParser.isValidSegment(messageSegment, segments)) delete message.segments[messageSegment.name];
    }
  }

  private static isValidSegment(messageSegment: Hl7IMessageSegment<Hl7ISegment>, segments: Hl7ISegment[]): boolean {
    return segments.some((segment) => segment.type === messageSegment.type);
  }
}
