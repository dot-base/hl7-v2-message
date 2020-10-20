import Hl7Field from "@/fieldDefintions/hl7Field";

export default class Hl7Definition {
  public static initFields<T extends Hl7Definition>(type: T): T {
    const properties: PropertyDescriptorMap = {
      property1: {
        value: 42,
        writable: true,
      },
      blablabla: {
        value: 42,
        writable: true,
      },
    };
    Object.defineProperties(type, properties);
    return type;
  }
}
