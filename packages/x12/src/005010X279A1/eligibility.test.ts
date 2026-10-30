import { describe, expect, expectTypeOf, it } from "vitest";
import { parse } from "../parse.ts";
import { encodeInterchange } from "../interchange.ts";
import { ISA } from "../envelope/ISA.ts";
import { GS } from "../envelope/GS.ts";
import { X270 } from "./270.ts";
import { X271 } from "./271.ts";
import { BHT, HL, TRN } from "../segments/hierarchy.ts";
import { NM1 } from "../segments/NM1.ts";
import { EB, EQ, AAA } from "../segments/eligibility.ts";
import { GenericSegment } from "../types/segment.ts";

const isa = (receiverOrSender: string) =>
  `ISA*00*          *00*          *ZZ*${receiverOrSender.padEnd(15)}*ZZ*PAYER          *241030*1200*^*00501*000000001*0*T*:~`;

const envelope = (body: string[], st01: string) =>
  [
    isa("SUBMITTER"),
    `GS*${st01 === "270" ? "HS" : "HB"}*SUBMITTER*PAYER*20241030*1200*1*X*005010X279A1~`,
    `ST*${st01}*0001*005010X279A1~`,
    ...body.map((s) => `${s}~`),
    `SE*${body.length + 2}*0001~`,
    "GE*1*1~",
    "IEA*1*000000001~",
  ].join("\n");

// Fixtures written for these tests (X12's own examples are not reproduced here; see src/examples.test.ts).
// A subscriber inquiry.
const INQUIRY = [
  "BHT*0022*13*REQ0001*20241030*1319",
  "HL*1**20*1",
  "NM1*PR*2*ACME HEALTH PLAN*****PI*99999",
  "HL*2*1*21*1",
  "NM1*1P*2*RIVERSIDE FAMILY PRACTICE*****XX*1234567893",
  "HL*3*2*22*0",
  "TRN*1*TRC-20241030-1*1000000001",
  "NM1*IL*1*DOE*JANE****MI*W000000001",
  "DMG*D8*19700101",
  "DTP*291*D8*20241030",
  "EQ*30",
];

// A dependent inquiry: the dependent HL names the subscriber HL.
const DEPENDENT_INQUIRY = [
  ...INQUIRY.slice(0, 5),
  "HL*3*2*22*1",
  "NM1*IL*1******MI*W000000001",
  "HL*4*3*23*0",
  "TRN*1*TRC-20241030-1*1000000001",
  "NM1*03*1*DOE*SAM",
  "DMG*D8*20100101",
  "DTP*291*D8*20241030",
  "EQ*30^1^35",
];

// A response with two benefits, the second with a benefit related entity between LS and LE and an
// additional information loop.
const RESPONSE = [
  "BHT*0022*11*REQ0001*20241030*1320",
  "HL*1**20*1",
  "NM1*PR*2*ACME HEALTH PLAN*****PI*99999",
  "PER*IC**TE*8005551212",
  "HL*2*1*21*1",
  "NM1*1P*2*RIVERSIDE FAMILY PRACTICE*****XX*1234567893",
  "HL*3*2*22*0",
  "TRN*2*TRC-20241030-1*1000000001",
  "NM1*IL*1*DOE*JANE****MI*W000000001",
  "N3*100 MAIN STREET",
  "N4*SPRINGFIELD*IL*62701",
  "DMG*D8*19700101*M",
  "DTP*346*D8*20240101",
  "EB*1**30^1^33*MA",
  "DTP*291*D8*20240101",
  "EB*B**98***27*25",
  "MSG*COPAY PER VISIT",
  "III*ZZ*11",
  "LS*2120",
  "NM1*P3*1*LEE*ALEX****XX*1999999984",
  "PER*IC**TE*8005553434",
  "LE*2120",
];

// A response that stops after the receiver (2000C is situational in the 271).
const REJECTION = [
  "BHT*0022*11*REQ0001*20241030*1320",
  "HL*1**20*1",
  "NM1*PR*2*ACME HEALTH PLAN*****PI*99999",
  "HL*2*1*21*0",
  "NM1*1P*2*RIVERSIDE FAMILY PRACTICE*****XX*1234567893",
  "AAA*Y**50*N",
];

const typed = async (input: string) => {
  const r = await parse(input);
  expect(r.ok).toBe(true);
  const parsed = r.val!.functionalGroups[0].transactionSets[0].parsed;
  expect(parsed?.err?.message).toBeUndefined();
  return parsed!.val!;
};

describe("270", () => {
  it("parses a subscriber inquiry into its levels", async () => {
    const val = await typed(envelope(INQUIRY, "270"));
    if (val.transactionSet !== "270") throw new Error("not a 270");
    const [source] = val.value.informationSources;
    expect(source.informationSourceName.name.getLastOrOrganizationName()).toBe("ACME HEALTH PLAN");
    const [receiver] = source.informationReceivers;
    expect(receiver.informationReceiverName.name.getIdentificationCode()).toBe("1234567893");
    const [subscriber] = receiver.subscribers;
    expect(subscriber.traceNumbers[0].get(2)).toBe("TRC-20241030-1");
    const name = subscriber.subscriberName;
    expect(name.name.getFirstName()).toBe("JANE");
    expect(name.demographicInformation?.get(2)).toBe("19700101");
    expect(name.eligibilityInquiries[0].inquiry.getServiceTypeCodes()).toEqual(["30"]);
    expect(subscriber.dependents).toEqual([]);
    expectTypeOf(name.name).toEqualTypeOf<NM1>();
    expectTypeOf(name.eligibilityInquiries[0].inquiry).toEqualTypeOf<EQ>();
    expectTypeOf(subscriber.traceNumbers).toEqualTypeOf<TRN[]>();
    expectTypeOf(name.demographicInformation).toEqualTypeOf<GenericSegment | undefined>();
  });

  it("parses a dependent inquiry", async () => {
    const val = await typed(envelope(DEPENDENT_INQUIRY, "270"));
    if (val.transactionSet !== "270") throw new Error("not a 270");
    const [subscriber] = val.value.informationSources[0].informationReceivers[0].subscribers;
    const [dependent] = subscriber.dependents;
    expect(dependent.hierarchicalLevel.getParentId()).toBe("3");
    expect(dependent.dependentName.name.getFirstName()).toBe("SAM");
    expect(dependent.dependentName.eligibilityInquiries[0].inquiry.getServiceTypeCodes()).toEqual(["30", "1", "35"]);
    expect(subscriber.subscriberName.eligibilityInquiries).toEqual([]);
  });

  it("keeps a transaction set that departs from the guide, with the error, without failing the interchange", async () => {
    const r = await parse(envelope(INQUIRY.filter((s) => !s.startsWith("NM1*IL")), "270"));
    expect(r.ok).toBe(true);
    const parsed = r.val!.functionalGroups[0].transactionSets[0].parsed!;
    expect(parsed.ok).toBe(false);
    expect(parsed.err?.message).toBe("270 loop 2000C must contain loop 2100C (Subscriber Name, opened by NM1 (NM101 IL))");
    expect(parsed.err?.meta).toEqual({ problem: "missing", segmentPosition: 9, segment: "NM1", loop: "2100C" });
  });

  it("builds the inquiry with the segment classes", () => {
    const set = X270.create("0001", {
      beginningOfHierarchicalTransaction: new BHT().hierarchicalStructureCode("0022").transactionSetPurposeCode("13").referenceIdentification("REQ0001").date("20241030").time("1319"),
      informationSources: [
        {
          hierarchicalLevel: new HL().hierarchicalIdNumber(1).hierarchicalLevelCode("20").hierarchicalChildCode("1"),
          informationSourceName: { name: new NM1().entityIdentifierCode("PR").organization("ACME HEALTH PLAN").identification("PI", "99999") },
          informationReceivers: [
            {
              hierarchicalLevel: new HL().hierarchicalIdNumber(2).hierarchicalParentIdNumber(1).hierarchicalLevelCode("21").hierarchicalChildCode("1"),
              informationReceiverName: { name: new NM1().entityIdentifierCode("1P").organization("RIVERSIDE FAMILY PRACTICE").identification("XX", "1234567893") },
              subscribers: [
                {
                  hierarchicalLevel: new HL().hierarchicalIdNumber(3).hierarchicalParentIdNumber(2).hierarchicalLevelCode("22").hierarchicalChildCode("0"),
                  traceNumbers: [new TRN().traceTypeCode("1").referenceIdentification("TRC-20241030-1").originatingCompanyIdentifier("1000000001")],
                  subscriberName: {
                    name: new NM1().entityIdentifierCode("IL").person({ last: "DOE", first: "JANE" }).identification("MI", "W000000001"),
                    demographicInformation: new GenericSegment("DMG").element(1, "D8").element(2, "19700101"),
                    dates: [new GenericSegment("DTP").element(1, "291").element(2, "D8").element(3, "20241030")],
                    eligibilityInquiries: [{ inquiry: new EQ().serviceTypeCode("30") }],
                  },
                },
              ],
            },
          ],
        },
      ],
    });
    const wire = encodeInterchange({
      header: new ISA().sender("ZZ", "SUBMITTER").receiver("ZZ", "PAYER").interchangeDate("241030").interchangeTime("1200").interchangeControlNumber(1).usageIndicator("T"),
      functionalGroups: [
        {
          header: new GS().functionalIdentifierCode("HS").applicationSenderCode("SUBMITTER").applicationReceiverCode("PAYER").date("20241030").time("1200").groupControlNumber(1).versionReleaseIndustryIdentifierCode("005010X279A1"),
          transactionSets: [set],
        },
      ],
    }, { lineBreak: "\n" });
    expect(wire).toBe(`${envelope(INQUIRY, "270")}\n`);
  });

  it("refuses to build an inquiry that misses a required loop", () => {
    expect(() =>
      X270.create("0001", { beginningOfHierarchicalTransaction: new BHT(), informationSources: [] }),
    ).toThrow("Invalid 270 transaction set: 270 informationSources is required (loop 2000A)");
  });
});

describe("271", () => {
  it("parses benefits, additional information and benefit related entities", async () => {
    const val = await typed(envelope(RESPONSE, "271"));
    if (val.transactionSet !== "271") throw new Error("not a 271");
    const [source] = val.value.informationSources;
    expect(source.informationSourceName.contacts.map((p) => p.get(4))).toEqual(["8005551212"]);
    const name = source.informationReceivers[0].subscribers[0].subscriberName;
    expect(name.address?.get(1)).toBe("100 MAIN STREET");
    const [active, copay] = name.eligibilityBenefits;
    expect(active.benefit.getInformationCode()).toBe("1");
    expect(active.benefit.getServiceTypeCodes()).toEqual(["30", "1", "33"]);
    expect(active.dates.map((d) => d.get(3))).toEqual(["20240101"]);
    expect(active.loopHeader).toBeUndefined();
    expect(copay.messages.map((m) => m.get(1))).toEqual(["COPAY PER VISIT"]);
    expect(copay.additionalInformation.map((a) => a.information.get(2))).toEqual(["11"]);
    expect(copay.loopHeader?.get(1)).toBe("2120");
    expect(copay.relatedEntities.map((e) => e.name.getLastOrOrganizationName())).toEqual(["LEE"]);
    expect(copay.relatedEntities[0].contacts).toHaveLength(1);
    expect(copay.loopTrailer?.get(1)).toBe("2120");
    expectTypeOf(active.benefit).toEqualTypeOf<EB>();
  });

  it("parses a response that stops after the receiver", async () => {
    const val = await typed(envelope(REJECTION, "271"));
    if (val.transactionSet !== "271") throw new Error("not a 271");
    const [receiver] = val.value.informationSources[0].informationReceivers;
    expect(receiver.subscribers).toEqual([]);
    expect(receiver.informationReceiverName.requestValidations.map((a) => a.getRejectReasonCode())).toEqual(["50"]);
    expectTypeOf(receiver.informationReceiverName.requestValidations).toEqualTypeOf<AAA[]>();
  });

  it("round-trips", async () => {
    const input = envelope(RESPONSE, "271");
    const r = await parse(input);
    const set = r.val!.functionalGroups[0].transactionSets[0];
    if (!set.parsed?.ok || set.parsed.val.transactionSet !== "271") throw new Error("not a 271");
    const rebuilt = X271.create("0001", set.parsed.val.value);
    expect(rebuilt.segments.map((s) => s.encode())).toEqual(RESPONSE);
  });
});

describe("parse({ typed: false })", () => {
  it("leaves the transaction sets untyped", async () => {
    const r = await parse(envelope(INQUIRY, "270"), { typed: false });
    expect(r.val!.functionalGroups[0].transactionSets[0].parsed).toBeUndefined();
  });
});
