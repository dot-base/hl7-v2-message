import Hl7IFields from "./hl7IFields";

export default interface Hl7IFieldDefinition {
  segmentType: string;
  fields: Hl7IFields;
}
