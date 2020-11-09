export default interface Hl7IField {
  index: number;
  identifier: string;
  description: string;
  length: number;
  optional?: boolean;
  repeatable?: number;
  value: string;
  subFields?: string[];
  //value:string|Hl7Subfield
}

/**
 * TODO: seperate type for Subfield useful?
 * Alternatievely just leave it as array within type Hl7Field
 * Depends on strictness of subfield definiton
 * */
export interface Hl7ISubfield extends Hl7IField {
  index: number;
  identifier: string;
  description: string;
  length: number;
  optional?: boolean;
  repeatable?: number;
  value: string;
}
