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
    const maxFields = Object.entries(segmentFields).length;
    const minFields:number = FieldParser.getMandatoryFields(segmentFields)+1;
    if (rawSegmentFields.length < minFields || rawSegmentFields.length > maxFields)
      return false;
    return true;
  }

  private static getMandatoryFields(segmentFields: Hl7IFields):number{
    let minFieldIndex:number = 0;
    for (const field of Object.values(segmentFields)) {
      if(field.isOptional===false && field.index >= minFieldIndex) minFieldIndex=field.index;
    }
    return minFieldIndex;
  }
}
