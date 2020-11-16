declare module "hl7-dictionary" {
  let definitions: Hl7VersionDefiniton;
  let tables: Hl7Tables;
}
  
interface Hl7Tables {
  [key: string]: Hl7Table
}

interface Hl7Table {
  desc: string;
  values: { [key: string]: string };
}
  
type Hl7VersionDefiniton = {
  [key :string]: Hl7Defintion;
};
  
interface Hl7Defintion {
  fields: { [key: string]: Field };
  segments: { [key: string]: Segment };
  messages: { [key: string]: Message };
}
  
interface Message {
  desc: string;
  name: string;
  segments: MessageDefinition;
}
  
interface MessageDefinition {
  desc: string;
  segments: SegmentDefintion[];
}
  
interface Segment {
  desc: string;
  fields: FieldDefintion[];
}
  
interface SegmentDefintion {
  name: string;
  desc: string;
  min: number;
  max: number;
  children?: SegmentDefintion;
}
  
interface Field {
  desc: string;
  subfields: FieldDefintion[];
}
  
interface FieldDefintion {
  datatype: string;
  desc: string;
  opt: number;
  rep: number;
  len: number;
}
  