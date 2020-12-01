import ADT_A01_Message from "../lib/2.5/message/ADT_A01_Message";
import ADT_A02_Message from "../lib/2.5/message/ADT_A02_Message";
import ADT_A03_Message from "../lib/2.5/message/ADT_A03_Message";
import MDM_T02_Message from "../lib/2.5/message/MDM_T02_Message";

import MSH_Segment from "../lib/2.5/segment/MSH_Segment";
import Hl7Message from "../model/Hl7Message";
import { RawSegment } from "./hl7Parser";
import SegmentParser from "./segmentParser";

export default class MessageParser {
  public static initMessageSegments(
    messageType: string,
    mshSegment: MSH_Segment,
    rawSegments: RawSegment[]
  ): Hl7Message {
    if (messageType.includes("ADT_A01"))
      return SegmentParser.initMessageSegments(new ADT_A01_Message(), mshSegment, rawSegments) as ADT_A01_Message;
    if (messageType.includes("ADT_A02"))
      return SegmentParser.initMessageSegments(new ADT_A02_Message(), mshSegment, rawSegments) as ADT_A02_Message;
    if (messageType.includes("ADT_A03"))
      return SegmentParser.initMessageSegments(new ADT_A03_Message(), mshSegment, rawSegments) as ADT_A03_Message;
    if (messageType.includes("MDM_T02"))
      return SegmentParser.initMessageSegments(new MDM_T02_Message(), mshSegment, rawSegments) as ADT_A03_Message;
    //TODO: add all types for specific version on build
    throw Error(`Unknown message type ${messageType}`);
  }
}
