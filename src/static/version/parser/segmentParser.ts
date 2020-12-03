import Hl7Message from "../../../model/Hl7Message";
import Hl7Segment from "../../../model/Hl7Segment";
import { RawSegment } from "./hl7Parser";
import Hl7ISegment from "../../../types/Hl7ISegment";
import Hl7IMessageCompound from "../../../types/Hl7IMessageCompound";
import Hl7IMessageSegment from "../../../types/Hl7IMessageSegment";
import FieldParser from "./fieldParser";
import version from "..";

type MSH_Segment = typeof version.segments.MSH_Segment.prototype;

export default class SegmentParser {
  public static initMessageSegments<T extends Hl7Message>(
    message: T,
    mshSegment: MSH_Segment,
    rawSegments: RawSegment[]
  ):void {
    if (!SegmentParser.validateMandatorySegments(message, rawSegments)) {
      throw Error(
        `Number of mandatory segments in raw message ${message.name} does not match required number of segments`
      );
    }
    SegmentParser.setSegmentValues(message, mshSegment, rawSegments);
  }

  private static setSegmentValues<T extends Hl7Message>(
    message: T,
    mshSegment: MSH_Segment,
    rawSegments: RawSegment[]
  ) {
    SegmentParser.setMessageHeader(message, mshSegment);
    rawSegments.shift();
    rawSegments.forEach((rawSegment) => {
      SegmentParser.setSegmentValue(message, rawSegment);
    });
  }

  private static setSegmentValue<T extends Hl7Message>(message: T, rawSegment: RawSegment) {
    for (const segment of Object.values(message.segments)) {
      if (segment.name === rawSegment.type) {
        const initSegment: Hl7Segment = version.utils.getSegment(segment.type);
        FieldParser.initSegmentFields(initSegment, rawSegment);
        segment.value[0] = initSegment;
      }
    }
  }

  private static setMessageHeader<T extends Hl7Message>(message: T, mshSegment: MSH_Segment) {
    for (const segment of Object.values(message.segments)) if (segment.name === "MSH") segment.value[0] = mshSegment;
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
