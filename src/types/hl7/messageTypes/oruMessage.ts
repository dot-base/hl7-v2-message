import Hl7Message from "@/types/hl7/messageTypes/hl7Message";
import OBX_Segment from "@/types/hl7/segmentTypes/obxSegment";
import PID_Segment from "@/types/hl7/segmentTypes/pidSegment";
import OBR_Segment from "@/types/hl7/segmentTypes/obrSegment";

export default class ORU_Message extends Hl7Message {
  public segment_obx: OBX_Segment = new OBX_Segment(false);
  public segment_obr: OBR_Segment = new OBR_Segment(false);
  public segment_pid: PID_Segment = new PID_Segment(false);

  constructor() {
    super();
  }
}
