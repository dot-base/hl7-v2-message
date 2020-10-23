import Hl7IFieldDefinition from "@/types/hl7IFieldDefinition";
import Hl7Field from "@/types/hl7Field";

export default abstract class FieldDefinition implements Hl7IFieldDefinition {
  [key: string]: Hl7Field;
}

/**
 * helper classes only - should be removed
 */
export class RawFieldDefinition extends FieldDefinition {}
