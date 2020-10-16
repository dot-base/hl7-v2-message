import ORU_Message from "@/types/hl7/messageTypes/oruMessage";
import Hl7Segment, { Raw_Segment } from "@/types/hl7/segmentTypes/hl7Segment";
import { SegmentType, Hl7MessageType } from "@/types/hl7/enums/hl7Enums";
import Hl7Message from "@/types/hl7/messageTypes/hl7Message";
import Hl7Field from "@/types/hl7/fieldDefintions/hl7Field";
import FieldDefinition from "@/types/hl7/fieldDefintions/fieldDefinition";

export default class Hl7Parser {
  public static buildMessage(rawMessage: string): Hl7Message {
    const rawSegments: Raw_Segment[] = Hl7Parser.getrawSegments(rawMessage);
    const messageType: Hl7MessageType = Hl7Parser.getMessageType(rawSegments);
    return Hl7Parser.buildByType(rawSegments, messageType);
  }

  public static buildByType(rawSegments: Raw_Segment[], messageType: Hl7MessageType): Hl7Message {
    if (messageType === "ORU") return Hl7Parser.initSegments(new ORU_Message(), rawSegments);
    throw "Unknown or invalid HL7 message type.";
  }

  private static getrawSegments(rawMessage: string): Raw_Segment[] {
    const segments: Raw_Segment[] = rawMessage.split("\n").map((segment) => {
      return Hl7Parser.getRawSegment(segment);
    });
    return segments;
  }

  private static getRawSegment(segment: string): Raw_Segment {
    const typeStr = segment.substring(0, segment.indexOf("|"));
    return new Raw_Segment(
      false,
      Hl7Parser.getSegmentType(typeStr),
      segment.substring(segment.indexOf("|") + 1)
    );
  }

  private static getSegmentType(segmentType: string): SegmentType {
    const validType = Object.values(SegmentType).find((type) => type === segmentType);
    if (validType) return validType;
    throw Error("Parsing failed due to unknown or invalid segment type");
  }

  private static getMessageType(segments: Raw_Segment[]): Hl7MessageType {
    const segment_msh = Hl7Parser.findSegmentByType(segments, SegmentType.MSH);
    const validType = Object.values(Hl7MessageType).find((type) =>
      segment_msh.rawFields[7].includes(type)
    );
    if (validType) return validType;
    throw Error("Parsing failed due to unknown or invalid message type");
  }

  private static findSegmentByType(segments: Raw_Segment[], type: SegmentType): Raw_Segment {
    const segment = segments.find((segment) => segment.type === type);
    if (!segment) throw "Stated SegmentType was not found";
    return segment;
  }

  private static initSegments<T extends Hl7Message>(
    messageTemplate: T,
    rawSegments: Raw_Segment[]
  ): T {
    const message: T = messageTemplate;
    Object.values(message).forEach((baseSegment) => {
      const segment = Hl7Parser.initSegment(baseSegment, rawSegments);
      return (baseSegment.children = Hl7Parser.initFields(baseSegment, segment.rawFields));
    });
    return message;
  }

  private static initSegment(baseSegment: Hl7Segment, rawSegments: Raw_Segment[]): Raw_Segment {
    const segment = rawSegments.find((rawSegment) => baseSegment.type === rawSegment.type);
    if (!segment || (!baseSegment.optional && !segment))
      throw Error(`Required segment of type ${baseSegment.type} is missing to build message.`);
    return segment;
  }

  private static initFields(baseSegment: Hl7Segment, rawFields: string[]): FieldDefinition {
    const fieldDefinition: FieldDefinition = baseSegment.children;
    Object.values(FieldDefinition).forEach((field) =>
      Hl7Parser.initField(field, rawFields[field.index])
    );
    return fieldDefinition;
  }

  private static initField(field: Hl7Field, rawValue: string) {
    const initField = field;
    if (!Hl7Parser.validateField(field, rawValue)) {
      throw Error(
        `Parsing failed due to invalid value for field ${field.identifier}: ${field.description}`
      );
    }
    initField.value = rawValue;
    initField.subFields = Hl7Parser.initSubField(field.value);
    return initField;
  }

  private static initSubField(fieldValue: string): string[] {
    return fieldValue ? fieldValue.split("^") : [];
  }

  private static validateField(field: Hl7Field, rawValue: string): boolean {
    /**
     * TODO:check if all non optional fields are set?
     * !field.optional && rawValue === ""
     *
     * TODO:all check if value matches field length
     * field.length===rawValue.length
     * */
    return true;
  }
}
