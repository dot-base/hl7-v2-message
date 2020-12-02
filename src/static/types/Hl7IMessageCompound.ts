export default interface Hl7IMessageCompound {
  name: string;
  isOptional: boolean;
  isRepeatable: boolean;
  parentCompound?: string;
}
