import EVN_Segment from "../lib/2.5/segment/EVN_Segment";
import MSH_Segment from "../lib/2.5/segment/MSH_Segment";
import PID_Segment from "../lib/2.5/segment/PID_Segment";
import PV1_Segment from "../lib/2.5/segment/PV1_Segment";
import TXA_Segment from "../lib/2.5/segment/TXA_Segment";
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
    Object.entries(message.segments).find((segment) => {
      if (segment[1].name === rawSegment.type) {
        //TODO: Alternatively init Segments by type in lib in segment[1].value[0] (several, if repeatable)
        const initSegment: Hl7Segment = SegmentParser.initSegmentByType(segment[1].type);
        segment[1].value[0] = FieldParser.initSegmentFields(initSegment, rawSegment);
      }
    });
    return message;
  }

  //TODO: generate for all types via template
  private static initSegmentByType(segmentType: string): Hl7Segment {
    if (segmentType === "EVN") return new EVN_Segment();
    if (segmentType === "PID") return new PID_Segment();
    if (segmentType === "PV1") return new PV1_Segment();
    if (segmentType === "TXA") return new TXA_Segment();
    throw new Error(`Unknown segment type not ${segmentType}`);
  }

  private static setMessageHeader<T extends Hl7Message>(message: T, mshSegment: MSH_Segment): T {
    Object.entries(message.segments).find((segment) => {
      if (segment[1].name === "MSH") segment[1].value[0] = mshSegment;
    });
    return message;
  }

  private static validateMandatorySegments<T extends Hl7Message>(message: T, rawSegments: RawSegment[]): boolean {
    const mandatorySegments: string[] = SegmentParser.getMandatorySegments(message);
    return mandatorySegments.every((segmentType) => {
      return rawSegments.some((raw) => raw.type === segmentType);
    });
  }

  private static getMandatorySegments<T extends Hl7Message>(message: T): string[] {
    const mandatorySegments: string[] = [];
    Object.values(message.segments).forEach((segment) => {
      if (SegmentParser.isMandatorySegment(segment)) mandatorySegments.push(segment.type);
    });
    return mandatorySegments;
  }

  private static isMandatorySegment(segment: Hl7IMessageSegment<Hl7ISegment>): boolean {
    let isMandatory: boolean = segment.isOptional ? false : true;
    if (isMandatory && segment.parentCompound) isMandatory = SegmentParser.isMandatoryCompound(segment.parentCompound);
    return isMandatory;
  }

  private static isMandatoryCompound(compound: Hl7IMessageCompound): boolean {
    const isMandatory: boolean = compound.isOptional ? false : true;
    //TODO: nested compounds - compounds with parentCompounds
    //if(compound.parentCompound){
    //TODO: implement getCompoundByType(type:string):Hl7IMessageCompound{}
    //const parentCompund : Hl7IMessageCompound = getCompoundByType(compound.parentCompound);
    //isMandatory = SegmentParser.isMandatoryCompound(compound.parentCompound);
    //}
    return isMandatory;
  }
}
