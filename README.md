# hl7-v2-message
Parses HL7 v2.x messages into typed javascript objects and makes them easily accessable.

## Installation
```
npm install hl7-v2-message
```


## How to use it
```
import { v2_5 } from "hl7-v2-message"

const hl7Message:string = `MSH|^~\&|CARDDAS|HZL|DOC|ADT|20050524163405||MDM^T02^MDM_T02|123456|T|2.5^DEU&&HL70399|||AL|NE|DEU|8859/1|||v70^^2.16.840.1.1.13883.2.6^ISO<cr>EVN||20050524163405|||||B1\nPID|||79471^^^Alpha-Krankenhaus^PI ||Müller^Hans^^^^^L\nPV1|||||||||||||||||||79237645^^^Alpha-Krankenhaus^VN |||||||||||||||||||||||||20040805\nTXA||transferReport|text/plain|||20040806|||37542341^Wohlfart^Peter^^^Dr.^^^^^^^L^HZL|||7952871424^^37459732765491768364593264738293^SHA-1||||Note01.txt^CARDDAS|AU|U|AV|||^Herzog^Reinhold^^^Prof.^^^^^^^L^HZL^20040807200200\nOBX|1|ED|^Document Content|1|^text/plain^^Base64^VGhpcyBpcyBhbiBleGFtcGxlIERvY3VtZW50Lg==||||||F`;

type MDM_T02_Message = typeof v2_5.messages.MDM_T02_Message.prototype;
type PID_Segment = typeof v2_5.segments.PID_Segment.prototype;

const parsedMessage: MDM_T02_Message = v2_5.parser.parse(hl7Message) as MDM_T02_Message;
const pidSegment: PID_Segment = parsedMessage.segments.PID.value[0];
const patientName = pidSegment.fields.PID_5;
```

```
console.log(patientName);

>>>
{
  index: 4,
  identifier: 'PID_5',
  description: 'Patient Name',
  length: 250,
  isOptional: false,
  isRepeatable: false,
  value: 'Müller^Hans^^^^^L'
}
```


