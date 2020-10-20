import Hl7Parser from "@/hl7Parser";

const module = {
  Hl7Parser: Hl7Parser,
};

export { module as default };

class Test {
  public static handleIncoming() {
    const message =
      "MSH|^~&|MDT^DBS|DBS|||20200820081115||ORU^R01|fdd727bd-2e61-405b-aa6d-75a98a93e6aa|P|2.3\nPID|1||MRN:123456^^^MID||Smith^John^||19590624|\nOBR|1||f45d6db-22ba-42e8-8fd6-796553ce8447|DBS^Session Report|||20200820|||||||||^ordering^provider\nOBX|1|ED|REPORT^Session Report|1|^^PDF^Base64^JVBERi0xLjMKJcTl8uXr";
    console.log("parsed: " + module.Hl7Parser.buildMessage(message));
  }
}

Test.handleIncoming();
