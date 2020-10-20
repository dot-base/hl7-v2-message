import Hl7Definition from "./definitions";
import Hl7Field from "./fieldDefintions/hl7Field";

class Test extends Hl7Definition {
  [key: string]: Hl7Field;

  public static handleIncoming() {
    const some: Test = Hl7Definition.initFields(new Test());
    if (some.blablabla) console.log(true);
    if (some.property1) console.log(true, true);
    else console.log(false);
    const message =
      "MSH|^~&|MDT^DBS|DBS|||20200820081115||ORU^R01|fdd727bd-2e61-405b-aa6d-75a98a93e6aa|P|2.3\nPID|1||MRN:123456^^^MID||Smith^John^||19590624|\nOBR|1||f45d6db-22ba-42e8-8fd6-796553ce8447|DBS^Session Report|||20200820|||||||||^ordering^provider\nOBX|1|ED|REPORT^Session Report|1|^^PDF^Base64^JVBERi0xLjMKJcTl8uXr";
    //console.log("parsed: " + module.Hl7Parser.buildMessage(message));
  }
}

Test.handleIncoming();
