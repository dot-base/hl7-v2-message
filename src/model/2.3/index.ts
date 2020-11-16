import { MSH_Fields } from "./fields/mshFields";
import { OBX_Fields } from "./fields/obxFields";
import { OBR_Fields } from "./fields/obrFields";

import { MSH_Segment } from "./segments/mshSegment";
import { OBX_Segment } from "./segments/obxSegment";
import { OBR_Segment } from "./segments/obrSegment";

import { MDM_T01_Message } from "./messages/mdm_t01Message";
import { MDM_T02_Message } from "./messages/mdm_t02Message";
import { MDM_T03_Message } from "./messages/mdm_t03Message";

declare namespace v2_3 {
  export { MDM_T01_Message, MDM_T02_Message, MDM_T03_Message as messages };
  export { MSH_Segment, OBX_Segment, OBR_Segment as segments };
  export { MSH_Fields, OBX_Fields, OBR_Fields as fields };
}

export { v2_3 as default };
