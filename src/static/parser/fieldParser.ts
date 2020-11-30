import Hl7Segment from "../model/Hl7Segment";

interface RawSegment {
  type: string;
  fields: string[];
}
export default class FieldParser {
  public static initSegmentFields<T extends Hl7Segment>(segment: T, rawSegment: RawSegment): T {
    if (rawSegment.fields.length !== Object.entries(segment.fields).length) {
      throw Error(`Number of fields in raw segment ${rawSegment.type} does not match required number of fields`);
    }
    return FieldParser.setFieldValues(segment, rawSegment);
    //TODO: add validation by field length here?
  }

  private static setFieldValues<T extends Hl7Segment>(segment: T, rawSegment: RawSegment): T {
    rawSegment.fields.forEach((value, index) =>
      Object.entries(segment.fields).find((field) => {
        if (field[1].index === index) field[1].value = value;
      })
    );
    return segment;
  }
}
