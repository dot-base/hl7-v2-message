export {
    MDM_T01_Message,
    MDM_T02_Message,
    MDM_T03_Message
} from "./messages";

export {
    MSH_Segment,
    OBR_Segment,
    OBX_Segment
} from "./segments";

export {
    MSH_Fields,
    OBR_Fields,
    OBX_Fields
} from "./fields";

/**
import {
    MDM_T01_Message,
    MDM_T02_Message,
    MDM_T03_Message
} from "./messages";

import {
    MSH_Segment,
    OBR_Segment,
    OBX_Segment
} from "./segments";

import {
    MSH_Fields,
    OBR_Fields,
    OBX_Fields
} from "./fields";

declare module messages {
    let MDM_T01_Message:MDM_T01_Message;
let    MDM_T02_Message:MDM_T02_Message;
let MDM_T03_Message:MDM_T03_Message;
}

declare module segments {
    let     MSH_Segment:MSH_Segment;
    let OBR_Segment:OBR_Segment
    let  OBX_Segment:OBX_Segment
}

declare module fields {
    let     MSH_Fields:MSH_Fields;
    let OBR_Fields:OBR_Fields
    let  OBX_Fields:OBX_Fields
}
export {segments,messages,fields}
*/