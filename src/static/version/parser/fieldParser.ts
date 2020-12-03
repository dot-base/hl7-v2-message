import Hl7IFields from "../../../types/Hl7IFields";
import Hl7ISegment from "../../../types/Hl7ISegment";
import { RawSegment } from "./hl7Parser";

export default class FieldParser {
  public static initSegmentFields<T extends Hl7ISegment>(segment: T, rawSegment: RawSegment): T {
    if (!FieldParser.validateFieldLength(segment.fields, rawSegment.fields)) {
      throw Error(`Number of fields in raw segment ${rawSegment.type} does not match required number of fields`);
    }
    return FieldParser.setFieldValues(segment, rawSegment);
  }

  private static setFieldValues<T extends Hl7ISegment>(segment: T, rawSegment: RawSegment): T {
    rawSegment.fields.forEach((value, index) => FieldParser.setFieldValue(segment, value, index));
    return segment;
  }

  private static setFieldValue<T extends Hl7ISegment>(segment: T, rawValue: string, index: number): T {
    for (const field of Object.values(segment.fields)) {
      if (field.index === index) field.value = rawValue;
    }
    return segment;
  }

  private static validateFieldLength(segmentFields: Hl7IFields, rawSegmentFields: string[]): boolean {
    if (Object.entries(segmentFields).length && rawSegmentFields.length !== Object.entries(segmentFields).length)
      return false;
    return true;
  }
}
