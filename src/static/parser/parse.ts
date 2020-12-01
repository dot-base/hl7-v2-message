import Hl7Parser from "./hl7Parser";

export default class TestParser {
  public static parse(message: string) {
    const parsed = Hl7Parser.parse(message);
    console.log(JSON.stringify(parsed));
  }
}
const testMessage =
  "MSH|^~&|GLIMS^1.2.276.0.76.3.1.22.8.100.1.?.1.1.1.0^ISO|GLIMS^1.2.276.0.76.3.1.22.8.100.1.?.1.1.2.0^ISO|PEGASOS^1.2.276.0.76.3.1.22.8.100.1.800.9.1.1.17^ISO|PEGASOS^1.2.276.0.76.3.1.22.8.100.1.800.9.1.2.16^ISO|20150731135355||MDM^T02^MDM_T02|1000002318|P|2.5|||||D|8859/1|||\nEVN|T02||||||\nPID|1||0030002952^^^&1.2.276.0.76.3.1.22.8.100.1.1.5.50.3.1&ISO^PI||11TestAuftrag^Gerda^11TestAuftrag^^^||19561230|F|||^^^^^DE||||||||||||||||||||||||||||\nPV1||I|WNE-S7^^^WNEURO||||||||||||||||0391005425^^^&1.2.276.0.76.3.1.22.8.100.1.1.5.50.3.4.1&ISO|||||||||||||||||||||||||20071114134300| 20081203110923|||||||\nTXA|1|ZRADBEFUND|application/pdf|||20150703121856|||ACHI-ARZT^ACHI-ARZT^^^^^^^SAUGPT|||0000000000000010000065632-01^^1.2.276.0.76.3.1.22.8.100.1.?.1.1.3.2^ISO|^^^ISO||||AU|N||AC|||";
TestParser.parse(testMessage);
