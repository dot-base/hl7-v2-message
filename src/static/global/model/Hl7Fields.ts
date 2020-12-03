import Hl7IFields from "../types/Hl7IFields";
import Hl7IField from "../types/Hl7IField";

export default abstract class Hl7Fields implements Hl7IFields {
  [key: string]: Hl7IField;
}
