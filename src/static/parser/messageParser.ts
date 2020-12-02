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
    return SegmentParser.initMessageSegments(message, mshSegment, rawSegments);
  }

  //TODO: considers specific subfield structure for different hl7 v2.x versions
  //Could be considered when using hdb template as well
  private static getMessageType(messageType: string): string {
    const splitSubFields: string[] = messageType.split("^");
    if (splitSubFields.length === 2) return `${splitSubFields[0]}_${splitSubFields[1]}`;
    return splitSubFields[splitSubFields.length - 1];
  }
}
