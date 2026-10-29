/** ORF^R04 / ORF^W02 (HL7 v2.3): MSH MSA QRD [QRF] { [ PID [{NTE}] ] { [ORC] OBR [{NTE}] { [OBX] [{NTE}] } [{CTI}] } } [DSC]. */
import { describe, test, expect } from "vitest";
import { createORF_R04, ORF_R04 } from "./ORF_R04.ts";
import { createORF_W02 } from "./ORF_W02.ts";
import { parseORF_R04 } from "./ORF_R04.ts";
import { parseORF_W02 } from "./ORF_W02.ts";
import { MSH } from "./MSH.ts";
import { MSA } from "./MSA.ts";
import { QRD } from "./QRD.ts";
import { PID } from "./PID.ts";
import { NTE } from "./NTE.ts";
import { ORC } from "./ORC.ts";
import { OBR } from "./OBR.ts";
import { OBX } from "./OBX.ts";
import { CTI } from "./CTI.ts";
import { DSC } from "./DSC.ts";
import { ParserUtils } from "../types/parser.ts";

const msh = (event: string) => new MSH().messageType({ messageCode: "ORF", triggerEvent: event }).messageControlId("R1");
const msa = () => new MSA().acknowledgmentCode("AA").messageControlId("Q1");
const qrd = () => new QRD().queryDateTime("20231015120000").queryFormatCode("R").queryPriority("I").queryId("Q1");
const obr = (n: string) => new OBR().setId(n).universalServiceIdentifier({ identifier: "CBC" });
const names = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));

describe("ORF_R04 (v2.3)", () => {
  test("each query response is an inlined patient followed by its orders and observations", () => {
    const msg = createORF_R04(msh("R04"), msa(), qrd(), [
      {
        patient: new PID().setId("1"),
        patientNotes: [new NTE().setId("1").comment("patient note")],
        orders: [
          {
            commonOrder: new ORC().orderControl("RE"),
            observationRequest: obr("1"),
            notes: [new NTE().setId("1").comment("order note")],
            observations: [
              { observation: new OBX().setId("1").valueType("NM"), notes: [new NTE().setId("1").comment("obx note")] },
              { observation: new OBX().setId("2").valueType("NM") },
            ],
            clinicalTrials: [new CTI().sponsorStudyId({ entityIdentifier: "T1" })],
          },
          { observationRequest: obr("2"), observations: [] },
        ],
      },
      { patient: new PID().setId("2"), orders: [{ observationRequest: obr("3"), observations: [{ notes: [new NTE().setId("1").comment("no result yet")] }] }] },
    ], { continuation: new DSC().continuationPointer("P2") });
    expect(msg).toBeInstanceOf(ORF_R04);
    const wire = msg.encode();
    expect(names(wire)).toEqual([
      "MSH", "MSA", "QRD",
      "PID", "NTE", "ORC", "OBR", "NTE", "OBX", "NTE", "OBX", "CTI", "OBR",
      "PID", "OBR", "NTE",
      "DSC",
    ]);
    const result = parseORF_R04(wire);
    expect(result.ok).toBe(true);
    const parsed = result.val!;
    expect(parsed.queryResponses).toHaveLength(2);
    const [first, second] = parsed.queryResponses;
    expect(first.patient!.name).toBe("PID");
    expect(first.patientNotes).toHaveLength(1);
    expect(first.orders).toHaveLength(2);
    expect(first.orders[0].observations).toHaveLength(2);
    expect(first.orders[0].observations[0].notes).toHaveLength(1);
    expect(first.orders[0].clinicalTrials).toHaveLength(1);
    expect(first.orders[1].observations).toEqual([]);
    expect(second.patient!.name).toBe("PID");
    // An OBSERVATION group may omit its OBX when building; on the wire that NTE is indistinguishable
    // from an order note, so the parser files it under the order's notes.
    expect(second.orders[0].observations).toEqual([]);
    expect(ParserUtils.getComponent(second.orders[0].notes![0].fields[2], 0)).toBe("no result yet");
    expect(parsed.message.encode()).toBe(wire);
  });

  test("verify() requires MSA, QRD, a response, and the OBR of each order", () => {
    // @ts-expect-error missing required segments
    expect(new ORF_R04(msh("R04"), undefined, undefined, []).verify().errors).toEqual([
      "MSA segment is required",
      "QRD segment is required",
      "At least one QUERY RESPONSE group (PID/ORC/OBR) is required",
    ]);
    // @ts-expect-error missing required segments
    expect(createORF_R04(msh("R04"), msa(), qrd(), [{ orders: [{ commonOrder: new ORC(), observations: [{}] }] }]).verify().errors).toEqual([
      "QUERY RESPONSE group 1: ORDER group 1: OBR segment is required",
      "QUERY RESPONSE group 1: ORDER group 1: OBSERVATION group 1 is empty",
    ]);
  });

  test("W02 wraps R04", () => {
    const wire = createORF_W02(msh("W02"), msa(), qrd(), [{ orders: [{ observationRequest: obr("1"), observations: [{ observation: new OBX().setId("1").valueType("ED") }] }] }]).encode();
    expect(names(wire)).toEqual(["MSH", "MSA", "QRD", "OBR", "OBX"]);
    expect(createORF_W02(msh("W02"), msa(), qrd(), [])).toBeInstanceOf(ORF_R04);
    expect(parseORF_W02(wire).val!.queryResponses[0].orders[0].observations[0].observation!.name).toBe("OBX");
    expect(parseORF_W02([msh("W02").encode(), "MSA|AA|Q1", "QRD|20231015120000|R|I|Q1"].join("\r")).err!.message).toBe("ORF_W02 message must contain at least one PID/ORC/OBR segment");
  });
});
