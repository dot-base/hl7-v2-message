import Hl7IField from "../types/Hl7IField";

export default abstract class Hl7Field implements Hl7IField {
  public abstract get index(): number;
  public abstract get identifier(): string;
  public abstract get description(): string;
  public abstract get length(): number | undefined;
  public abstract get isOptional(): boolean | undefined;
  public abstract get isRepeatable(): number | undefined;
  public abstract value: string;
  public abstract subFields?: string[];
}
