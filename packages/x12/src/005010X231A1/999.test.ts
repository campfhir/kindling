import { describe, expect, expectTypeOf, it } from "vitest";
import { parse } from "../parse.ts";
import { encodeInterchange } from "../interchange.ts";
import { ISA } from "../envelope/ISA.ts";
import { GS } from "../envelope/GS.ts";
import { acknowledge } from "./acknowledge.ts";
import { AK2, CTX, IK3 } from "./segments.ts";

// A 999 written for these tests: it acknowledges three 270s, accepting one, rejecting one for an
// element error (business unit CTX, IK4 with an element context CTX) and one for an unexpected
// segment (segment context CTX, business unit CTX). X12's own example is not reproduced here
// (see src/examples.test.ts).
const ACKNOWLEDGMENT = [
  "ISA*00*          *00*          *ZZ*PAYER          *ZZ*SUBMITTER      *241030*1201*^*00501*000000002*0*T*:~",
  "GS*FA*PAYER*SUBMITTER*20241030*1201*8*X*005010X231A1~",
  "ST*999*0001*005010X231A1~",
  "AK1*HS*7*005010X279A1~",
  "AK2*270*0001*005010X279A1~",
  "IK5*A~",
  "AK2*270*0002*005010X279A1~",
  "IK3*NM1*9*2100C*8~",
  "CTX*TRN02:TRC-2~",
  "IK4*9*67*7~",
  "CTX*SITUATIONAL TRIGGER*NM1*9*2100C*8~",
  "IK5*R*5~",
  "AK2*270*0003*005010X279A1~",
  "IK3*DMG*10*2100C*2~",
  "CTX*SITUATIONAL TRIGGER*NM1*9*2100C*2~",
  "CTX*TRN02:TRC-3~",
  "IK5*R*5~",
  "AK9*P*3*3*1~",
  "SE*17*0001~",
  "GE*1*8~",
  "IEA*1*000000002~",
].join("\n");

const INQUIRY = (body: string[], seCount = body.length + 2) =>
  [
    "ISA*00*          *00*          *ZZ*SUBMITTER      *ZZ*PAYER          *241030*1200*^*00501*000000001*0*T*:~",
    "GS*HS*SUBMITTER*PAYER*20241030*1200*7*X*005010X279A1~",
    "ST*270*0001*005010X279A1~",
    ...body.map((s) => `${s}~`),
    `SE*${seCount}*0001~`,
    "GE*1*7~",
    "IEA*1*000000001~",
  ].join("\n");

const BODY = [
  "BHT*0022*13*REQ0001*20241030*1319",
  "HL*1**20*1",
  "NM1*PR*2*ACME HEALTH PLAN*****PI*99999",
  "HL*2*1*21*1",
  "NM1*1P*2*RIVERSIDE FAMILY PRACTICE*****XX*1234567893",
  "HL*3*2*22*0",
  "NM1*IL*1*DOE*JANE****MI*W000000001",
  "EQ*30",
];

describe("999", () => {
  it("parses a 999, telling the three CTX uses apart", async () => {
    const r = await parse(ACKNOWLEDGMENT);
    const parsed = r.val!.functionalGroups[0].transactionSets[0].parsed!;
    expect(parsed.err?.message).toBeUndefined();
    if (!parsed.ok || parsed.val.transactionSet !== "999") throw new Error("not a 999");
    const { transactionSetResponses: responses, functionalGroupResponseTrailer: ak9 } = parsed.val.value;
    expect(responses.map((t) => t.transactionSetResponseTrailer.getAcknowledgmentCode())).toEqual(["A", "R", "R"]);
    const [, second, third] = responses;
    expect(second.errors[0].segmentContext).toBeUndefined();
    expect(second.errors[0].businessUnitIdentifier?.getComponent(1, 2)).toBe("TRC-2");
    expect(second.errors[0].elementNotes[0].dataElementNote.get(2)).toBe("67");
    expect(second.errors[0].elementNotes[0].elementContext?.get(2)).toBe("NM1");
    expect(third.errors[0].segmentContext?.get(2)).toBe("NM1");
    expect(third.errors[0].businessUnitIdentifier?.getComponent(1, 2)).toBe("TRC-3");
    expect(ak9.getAcknowledgeCode()).toBe("P");
    expectTypeOf(second.errors[0].errorIdentification).toEqualTypeOf<IK3>();
    expectTypeOf(third.errors[0].segmentContext).toEqualTypeOf<CTX | undefined>();
    expectTypeOf(second.transactionSetResponseHeader).toEqualTypeOf<AK2>();
  });

  it("reads 005010X231, the guide before the errata, with the same structure", async () => {
    const r = await parse(ACKNOWLEDGMENT.replaceAll("005010X231A1", "005010X231"));
    expect(r.val!.functionalGroups[0].transactionSets[0].parsed?.ok).toBe(true);
  });
});

describe("acknowledge", () => {
  const ack = async (input: string) => {
    const r = await parse(input);
    return acknowledge(r.val!).map((set) => [set.header.encode(), ...set.segments.map((s) => s.encode())]);
  };

  it("accepts a 270 that fits the guide", async () => {
    expect(await ack(INQUIRY(BODY))).toEqual([["ST*999*0001*005010X231A1", "AK1*HS*7*005010X279A1", "AK2*270*0001*005010X279A1", "IK5*A", "AK9*A*1*1*1"]]);
  });

  it("rejects a 270 with a missing segment, naming it and its loop", async () => {
    expect(await ack(INQUIRY(BODY.filter((s) => !s.startsWith("NM1*IL")), 9))).toEqual([
      ["ST*999*0001*005010X231A1", "AK1*HS*7*005010X279A1", "AK2*270*0001*005010X279A1", "IK3*NM1*8*2100C*3", "IK5*R*5", "AK9*R*1*1*0"],
    ]);
  });

  it("rejects an unexpected segment and a wrong SE01", async () => {
    const body = [...BODY.slice(0, 2), "ZZZ*1", ...BODY.slice(2)];
    expect(await ack(INQUIRY(body, 99))).toEqual([
      ["ST*999*0001*005010X231A1", "AK1*HS*7*005010X279A1", "AK2*270*0001*005010X279A1", "IK3*ZZZ*4*2000A*2", "IK5*R*5*4", "AK9*R*1*1*0"],
    ]);
  });

  it("writes a 999 that parses as one, in a functional group of its own", async () => {
    const r = await parse(INQUIRY(BODY));
    const wire = encodeInterchange({
      header: new ISA().sender("ZZ", "PAYER").receiver("ZZ", "SUBMITTER").interchangeDate("241030").interchangeTime("1201").interchangeControlNumber(2).usageIndicator("T"),
      functionalGroups: [
        {
          header: new GS().functionalIdentifierCode("FA").applicationSenderCode("PAYER").applicationReceiverCode("SUBMITTER").date("20241030").time("1201").groupControlNumber(8).versionReleaseIndustryIdentifierCode("005010X231A1"),
          transactionSets: acknowledge(r.val!),
        },
      ],
    });
    const back = await parse(wire);
    expect(back.val!.warnings).toEqual([]);
    expect(back.val!.functionalGroups[0].transactionSets[0].parsed?.ok).toBe(true);
  });
});
