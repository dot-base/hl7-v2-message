export default interface Hl7IField {
  index: number;
  identifier: string;
  description: string;
  length: number;
  isOptional?: boolean;
  isRepeatable?: number;
  value: string;
  subFields?: string[];
}
