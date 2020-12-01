export default interface Hl7IMessageCompound {
  type: string;
  name: string;
  isOptional: boolean;
  isRepeatable: boolean;
  parentCompound?: Hl7IMessageCompound | string;
}
