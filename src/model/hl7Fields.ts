import Hl7IFields from "@/types/hl7IFields";
import Hl7IField from "@/types/hl7IField";

export abstract class Hl7Fields implements Hl7IFields {
  [key: string]: Hl7IField;
}
