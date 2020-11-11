import Hl7IFields from "@/types/hl7IFields";
import Hl7IField from "@/types/hl7IField";

export default abstract class Hl7Fields implements Hl7IFields {
  [key: string]: Hl7IField;
}
