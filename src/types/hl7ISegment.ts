import Hl7IFields from "@/types/hl7IFields";

export default interface Hl7ISegment {
  type: string;
  children: Hl7IFields;
  description?: string;
}
