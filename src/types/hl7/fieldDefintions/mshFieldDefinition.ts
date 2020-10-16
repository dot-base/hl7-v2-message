import Hl7Field from "@/types/hl7/fieldDefintions/hl7Field";
import FieldDefinition from "@/types/hl7/fieldDefintions/fieldDefinition";

/**
 * MSH Field Defintions
 * as specified in HL7 veriosn 2.3
 */
export default class MSH_FieldDefinition extends FieldDefinition {
  /**
   * Field Seperator
   */
  public msh_1: Hl7Field = {
    index: 0,
    identifier: "msh_1",
    description: "Field Separator",
    optional: false,
    length: 1,
    value: "",
  };

  public msh_2: Hl7Field = {
    index: 1,
    identifier: "msh_2",
    description: "Encoding Characters",
    optional: false,
    length: 1,
    value: "",
  };

  public msh_3: Hl7Field = {
    index: 2,
    identifier: "msh_3",
    description: "Sending Application",
    optional: true,
    length: 180,
    value: "",
  };

  public msh_4: Hl7Field = {
    index: 3,
    identifier: "msh_4",
    description: "Sending Facility",
    optional: true,
    length: 180,
    value: "",
  };

  public msh_5: Hl7Field = {
    index: 4,
    identifier: "msh_5",
    description: "Receiving Application",
    optional: true,
    length: 180,
    value: "",
  };

  public msh_6: Hl7Field = {
    index: 5,
    identifier: "msh_6",
    description: "Receiving Facility",
    optional: true,
    length: 180,
    value: "",
  };

  public msh_7: Hl7Field = {
    index: 6,
    identifier: "msh_7",
    description: "Date/Time Of Message",
    optional: true,
    length: 26,
    value: "",
  };

  public msh_8: Hl7Field = {
    index: 7,
    identifier: "msh_8",
    description: "Security",
    optional: true,
    length: 40,
    value: "",
  };

  public msh_9: Hl7Field = {
    index: 8,
    identifier: "msh_9",
    description: "Message Type",
    optional: true,
    length: 7,
    value: "",
  };

  public msh_10: Hl7Field = {
    index: 9,
    identifier: "msh_10",
    description: "Message Control ID",
    optional: false,
    length: 20,
    value: "",
  };

  public msh_11: Hl7Field = {
    index: 10,
    identifier: "msh_11",
    description: "Processing ID",
    optional: false,
    length: 3,
    value: "",
  };

  public msh_12: Hl7Field = {
    index: 11,
    identifier: "msh_12",
    description: "Version ID",
    optional: false,
    length: 8,
    value: "",
  };

  public msh_13: Hl7Field = {
    index: 12,
    identifier: "msh_13",
    description: "Sequence Number",
    optional: false,
    length: 15,
    value: "",
  };

  public msh_14: Hl7Field = {
    index: 13,
    identifier: "msh_14",
    description: "Continuation Pointer",
    optional: true,
    length: 180,
    value: "",
  };

  public msh_15: Hl7Field = {
    index: 14,
    identifier: "msh_15",
    description: "Accept Acknowledgment Type",
    optional: true,
    length: 2,
    value: "",
  };

  public msh_16: Hl7Field = {
    index: 15,
    identifier: "msh_16",
    description: "Application Acknowledgment Type",
    optional: true,
    length: 2,
    value: "",
  };

  public msh_17: Hl7Field = {
    index: 16,
    identifier: "msh_17",
    description: "Country Code",
    optional: true,
    length: 2,
    value: "",
  };

  public msh_18: Hl7Field = {
    index: 17,
    identifier: "msh_18",
    description: "Character Set",
    optional: true,
    length: 6,
    value: "",
  };

  public msh_19: Hl7Field = {
    index: 18,
    identifier: "msh_19",
    description: "Principal Language Of Message",
    optional: true,
    length: 60,
    value: "",
  };
}
