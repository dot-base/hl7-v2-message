import ADT_A01_Message from "../lib/2.5/message/ADT_A01_Message";
import ADT_A02_Message from "../lib/2.5/message/ADT_A02_Message";
import ADT_A03_Message from "../lib/2.5/message/ADT_A03_Message";
import MDM_T02_Message from "../lib/2.5/message/MDM_T02_Message";

import MSH_Segment from "../lib/2.5/segment/MSH_Segment";
import Hl7Message from "../model/Hl7Message";
import FieldParser from "./fieldParser";

interface RawSegment {
  type: string;
  fields: string[];
}

//TODO: add versioned Parser dynamically on build via handlebar template
export default class Hl7Parser {
  public static parse(rawMessage: string) {
    const rawSegments: RawSegment[] = Hl7Parser.splitSegments(rawMessage);
    const mshSegment: MSH_Segment = Hl7Parser.getMessageHeader(rawSegments);
    const messageType: string = Hl7Parser.getMessageType(mshSegment);
    Hl7Parser.parseByType(messageType, rawMessage);
  }

  public static parseByType(messageType: string, rawMessage: string) {
    if (messageType.includes("ADT_A01"))
      return Hl7Parser.parseMessage(new ADT_A01_Message(), rawMessage) as ADT_A01_Message;
    if (messageType.includes("ADT_A02"))
      return Hl7Parser.parseMessage(new ADT_A02_Message(), rawMessage) as ADT_A02_Message;
    if (messageType.includes("ADT_A03"))
      return Hl7Parser.parseMessage(new ADT_A03_Message(), rawMessage) as ADT_A03_Message;
    if (messageType.includes("MDM_T02"))
      return Hl7Parser.parseMessage(new MDM_T02_Message(), rawMessage) as ADT_A03_Message;
    //TODO: add all types for specific verion on build
  }

  public static parseMessage<T extends Hl7Message>(message: T, rawMessage: string): T {
    return message;
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
    return FieldParser.initSegmentFields(new MSH_Segment(), rawMSH) as MSH_Segment;
  }

  static getMessageType(mshSegment: MSH_Segment): string {
    return mshSegment.fields.MSH_9.value;
  }
}
