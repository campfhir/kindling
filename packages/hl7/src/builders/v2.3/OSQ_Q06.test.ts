/** OSQ^Q06 (MSH QRD [QRF] [DSC]) and OSR^Q06 (order status response, RESPONSE/PATIENT inlined as in ORR^O02) for HL7 v2.3. */
import { describe, test, expect } from "vitest";
import { createOSQ_Q06, OSQ_Q06 } from "./OSQ_Q06.ts";
import { createOSR_Q06, OSR_Q06 } from "./OSR_Q06.ts";
import { parseOSQ_Q06 } from "../../parsers/v2.3/OSQ_Q06_Parser.ts";
import { parseOSR_Q06 } from "../../parsers/v2.3/OSR_Q06_Parser.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { MSA } from "../../segments/v2.3/MSA.ts";
import { ERR } from "../../segments/v2.3/ERR.ts";
import { QRD } from "../../segments/v2.3/QRD.ts";
import { PID } from "../../segments/v2.3/PID.ts";
import { NTE } from "../../segments/v2.3/NTE.ts";
import { ORC } from "../../segments/v2.3/ORC.ts";
import { OBR } from "../../segments/v2.3/OBR.ts";
import { RXO } from "../../segments/v2.3/RXO.ts";
import { CTI } from "../../segments/v2.3/CTI.ts";
import { DSC } from "../../segments/v2.3/DSC.ts";

const msh = (type: string) => new MSH().messageType({ messageCode: type, triggerEvent: "Q06" }).messageControlId("O1");
const msa = () => new MSA().acknowledgmentCode("AA").messageControlId("Q1");
const qrd = () => new QRD().queryDateTime("20231015120000").queryFormatCode("R").queryPriority("I").queryId("Q1");
const names = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));

describe("OSQ_Q06 (v2.3)", () => {
  test("is MSH QRD [QRF] [DSC]", () => {
    expect(createOSQ_Q06(msh("OSQ"), qrd())).toBeInstanceOf(OSQ_Q06);
    const wire = createOSQ_Q06(msh("OSQ"), qrd(), { continuation: new DSC().continuationPointer("P2") }).encode();
    expect(names(wire)).toEqual(["MSH", "QRD", "DSC"]);
    expect(parseOSQ_Q06(wire).val!.message.encode()).toBe(wire);
  });
});

describe("OSR_Q06 (v2.3)", () => {
  test("orders carry an optional detail whose first segment is one of OBR, RQD, RQ1, RXO, ODS, ODT", () => {
    const msg = createOSR_Q06(msh("OSR"), msa(), qrd(), {
      error: new ERR().errorCodeAndLocation("0"),
      notes: [new NTE().setId("1").comment("response note")],
      patient: new PID().setId("1"),
      patientNotes: [new NTE().setId("1").comment("patient note")],
      orders: [
        { commonOrder: new ORC().orderControl("SC"), segment: new OBR().setId("1"), notes: [new NTE().setId("1")], clinicalTrials: [new CTI()] },
        { commonOrder: new ORC().orderControl("SC"), segment: new RXO() },
        { commonOrder: new ORC().orderControl("SC") },
      ],
    });
    expect(msg).toBeInstanceOf(OSR_Q06);
    const wire = msg.encode();
    expect(names(wire)).toEqual(["MSH", "MSA", "ERR", "NTE", "QRD", "PID", "NTE", "ORC", "OBR", "NTE", "CTI", "ORC", "RXO", "ORC"]);
    const result = parseOSR_Q06(wire);
    expect(result.ok).toBe(true);
    const parsed = result.val!;
    expect(parsed.notes).toHaveLength(1);
    expect(parsed.patientNotes).toHaveLength(1);
    expect(parsed.orders).toHaveLength(3);
    expect(parsed.orders![0].segment!.name).toBe("OBR");
    expect(parsed.orders![0].clinicalTrials).toHaveLength(1);
    expect(parsed.orders![1].segment!.name).toBe("RXO");
    expect(parsed.orders![2].segment).toBeUndefined();
    expect(parsed.message.encode()).toBe(wire);
  });

  test("a response without patient or orders is MSH MSA QRD", () => {
    const wire = createOSR_Q06(msh("OSR"), msa(), qrd()).encode();
    expect(names(wire)).toEqual(["MSH", "MSA", "QRD"]);
    const result = parseOSR_Q06(wire);
    expect(result.val!.patient).toBeUndefined();
    expect(result.val!.orders).toEqual([]);
  });

  test("verify() checks the ORC of each order and the detail segment choice", () => {
    const errors = createOSR_Q06(msh("OSR"), msa(), qrd(), {
      // @ts-expect-error missing required segments / wrong segment
      orders: [{ segment: new PID() }, { commonOrder: new ORC(), notes: [] }],
    }).verify().errors;
    expect(errors).toHaveLength(2);
    expect(errors[0]).toBe("ORDER group 1: ORC segment is required");
    expect(errors[1]).toMatch(/^ORDER group 1: .*OBR, RQD, RQ1, RXO, ODS, ODT/);
  });
});
