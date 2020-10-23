declare module "hl7-dictionary/lib" {
  let definitions: Hl7VersionDefiniton;
  let tables: { [key: string]: Table };

  export { definitions };
  export { tables };
}

interface Table {
  desc: string;
  values: { [key: string]: string };
}

interface Hl7VersionDefiniton {
  [key: string]: Hl7MessageDefintion;
}

interface Hl7MessageDefintion {
  fields: { [key: string]: Field };
  segments: { [key: string]: Segment };
  messages: { [key: string]: Message };
}

interface FieldDefintion {
  datatype: string;
  desc: string;
  opt: number;
  rep: number;
  len: number;
}

interface Segment {
  desc: string;
  fields: FieldDefintion[];
}

interface Field {
  desc: string;
  subfields: FieldDefintion[];
}

interface SegmentSpecification {
  name: string;
  desc: string;
  min: number;
  max: number;
  children?: SegmentSpecification;
}

interface MessageContent {
  desc: string;
  segments: SegmentSpecification[];
}

interface Message {
  desc: string;
  name: string;
  segments: MessageContent;
}
