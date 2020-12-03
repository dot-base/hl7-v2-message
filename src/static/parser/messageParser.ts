import Utils from "../lib/2.5/utils";
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
    const formattedType: string = MessageParser.getMessageType(messageType);
    const message: Hl7Message = Utils.getMessage(formattedType);
    SegmentParser.initMessageSegments(message, mshSegment, rawSegments);
    return message;
  }

  //Edge Case: 'splitSubFields.length === 2'
  //due to different structure of field 'MSH.9 Message Type' in earlier hl7v2-x versions
  private static getMessageType(messageType: string): string {
    const splitSubFields: string[] = messageType.split("^");
    if (splitSubFields.length === 2) return `${splitSubFields[0]}_${splitSubFields[1]}`;
    return splitSubFields[splitSubFields.length - 1];
  }
}
