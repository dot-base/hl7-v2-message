import Utils from "../lib/2.5/utils";
import MSH_Segment from "../lib/2.5/segment/MSH_Segment";
import Hl7Message from "../model/Hl7Message";
import Hl7Segment from "../model/Hl7Segment";
import Hl7IMessageCompound from "../types/Hl7IMessageCompound";
import Hl7IMessageSegment from "../types/Hl7IMessageSegment";
import Hl7ISegment from "../types/Hl7ISegment";
import FieldParser from "./fieldParser";
import { RawSegment } from "./hl7Parser";

export default class SegmentParser {
  public static initMessageSegments<T extends Hl7Message>(
    message: T,
    mshSegment: MSH_Segment,
    rawSegments: RawSegment[]
  ): T {
    if (!SegmentParser.validateMandatorySegments(message, rawSegments)) {
      throw Error(
        `Number of mandatory segments in raw message ${message.name} does not match required number of segments`
      );
    }
    return SegmentParser.setSegmentValues(message, mshSegment, rawSegments);
  }

  private static setSegmentValues<T extends Hl7Message>(
    message: T,
    mshSegment: MSH_Segment,
    rawSegments: RawSegment[]
  ): T {
    message = SegmentParser.setMessageHeader(message, mshSegment);
    rawSegments.shift();
    rawSegments.forEach((rawSegment) => {
      message = SegmentParser.setSegmentValue(message, rawSegment);
    });
    return message;
  }

  private static setSegmentValue<T extends Hl7Message>(message: T, rawSegment: RawSegment): T {
    for (const segment of Object.values(message.segments)) {
      if (segment.name === rawSegment.type) {
        const initSegment: Hl7Segment = Utils.getSegment(segment.type);
        segment.value[0] = FieldParser.initSegmentFields(initSegment, rawSegment);
      }
    }
    return message;
  }

  private static setMessageHeader<T extends Hl7Message>(message: T, mshSegment: MSH_Segment): T {
    for (const segment of Object.values(message.segments)) if (segment.name === "MSH") segment.value[0] = mshSegment;
    return message;
  }

  private static validateMandatorySegments<T extends Hl7Message>(message: T, rawSegments: RawSegment[]): boolean {
    const mandatorySegments: string[] = SegmentParser.getMandatorySegments(message);
    return mandatorySegments.every((segmentType) => rawSegments.some((raw) => raw.type === segmentType));
  }

  private static getMandatorySegments<T extends Hl7Message>(message: T): string[] {
    const mandatorySegments: string[] = [];
    Object.values(message.segments).forEach((segment) => {
      if (SegmentParser.isMandatorySegment(message, segment)) mandatorySegments.push(segment.type);
    });
    return mandatorySegments;
  }

  private static isMandatorySegment<T extends Hl7Message>(
    message: T,
    segment: Hl7IMessageSegment<Hl7ISegment>
  ): boolean {
    if (!segment.isOptional && segment.parentCompound)
      return SegmentParser.isMandatoryCompound(message, segment.parentCompound);
    return !segment.isOptional;
  }

  private static isMandatoryCompound<T extends Hl7Message>(message: T, compound: Hl7IMessageCompound): boolean {
    if (!compound.isOptional && compound.parentCompound) {
      const parentCompound: Hl7IMessageCompound = SegmentParser.getCompound(message, compound.parentCompound);
      return SegmentParser.isMandatoryCompound(message, parentCompound);
    }
    return !compound.isOptional;
  }

  private static getCompound<T extends Hl7Message>(message: T, compoundName: string): Hl7IMessageCompound {
    let compound: Hl7IMessageCompound | undefined;
    if (message.compounds)
      compound = Object.values(message.compounds).find((compound) => compound.name === compoundName);
    if (!compound) throw Error(`Message of type ${message.name} does not have a compound named ${compoundName}`);
    return compound;
  }
}
