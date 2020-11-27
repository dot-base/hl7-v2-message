import Hl7IField from "../types/Hl7IField";

export abstract class Hl7Field implements Hl7IField {
  public abstract index: number;
  public abstract identifier: string;
  public abstract description: string;
  public abstract length: number;
  public abstract isOptional?: boolean;
  public abstract isRepeatable?: number;
  public abstract value: string;
  public abstract subFields?: string[];
}
