import Hl7Message from "@/model/messageTypes/hl7Message";
import MSH_Segment from "@/model/segmentTypes/mshSegment";
import OBX_Segment from "@/model/segmentTypes/obxSegment";
import OBR_Segment from "@/model/segmentTypes/obrSegment";
import PID_Segment from "@/model/segmentTypes/pidSegment";

export default class ORU_Message extends Hl7Message {
  segment_msh: MSH_Segment = new MSH_Segment(false);
  segment_obx: OBX_Segment = new OBX_Segment(false);
  segment_obr: OBR_Segment = new OBR_Segment(false);
  segment_pid: PID_Segment = new PID_Segment(false);
}
