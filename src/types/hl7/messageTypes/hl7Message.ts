import MSH_Segment from "@/types/hl7/segmentTypes/mshSegment";

export default class Hl7Message {
  public segment_msh: MSH_Segment;

  protected constructor() {
    this.segment_msh = new MSH_Segment(false)
  }
}
