declare module "2.3" {
  let fields: { [key: string]: Field };
  let segments: { [key: string]: Segment };
  let messages: { [key: string]: Message };

  export { fields };
  export { segments };
  export { messages };
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
