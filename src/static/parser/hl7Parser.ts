import Hl7Message from "../../../model/Hl7Message";
import MessageParser from "./messageParser";
import FieldParser from "./fieldParser";
import version from "..";

type MSH_Segment = typeof version.segments.MSH_Segment.prototype;

export interface RawSegment {
  type: string;
  fields: string[];
}

export class Hl7Parser {
  public static parse(rawMessage: string): Hl7Message {
    type MSH_Segment = typeof version.segments.MSH_Segment.prototype;
    const rawSegments: RawSegment[] = Hl7Parser.splitSegments(rawMessage);
    const mshSegment: MSH_Segment = Hl7Parser.getMessageHeader(rawSegments);
    const messageType: string = mshSegment.fields.MSH_9.value;
    return MessageParser.initMessageSegments(messageType, mshSegment, rawSegments);
  }

  private static splitSegments(rawMessage: string): RawSegment[] {
    return rawMessage.split("\n").map((segment) => this.splitSegment(segment));
  }

  private static splitSegment(rawSegment: string): RawSegment {
    const type: string = rawSegment.substring(0, rawSegment.indexOf("|"));
    let splitValue: string = rawSegment.substring(rawSegment.indexOf("|") + 1);
    if (type === "MSH") splitValue = `|${splitValue}`;
    return {
      type: type,
      fields: Hl7Parser.splitFields(splitValue),
    };
  }

  private static splitFields(rawFields: string): string[] {
    return rawFields.split("|");
  }

  private static getMessageHeader(rawSegments: RawSegment[]): MSH_Segment {
    const rawMSH = rawSegments.find((segment) => segment.type === "MSH");
    if (!rawMSH) throw Error("Missing mandatory segment of type MSH");
    return FieldParser.initSegmentFields(new version.segments.MSH_Segment(), rawMSH);
  }
}

export default Hl7Parser.parse;
