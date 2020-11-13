export default interface Hl7IField {
  index: number;
  identifier: string;
  description: string;
  length: number;
  optional?: boolean;
  repeatable?: number;
  value: string;
  subFields?: string[];
}
