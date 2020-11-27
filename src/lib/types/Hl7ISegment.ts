import Hl7IFields from "./Hl7IFields";

export default interface Hl7ISegment {
  type: string;
  description?: string;
  fields: Hl7IFields;
}
