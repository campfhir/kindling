import { describe, expect, expectTypeOf, it } from "vitest";
import { parse } from "../parse.ts";
import { X837P } from "./837.ts";
import { CLM, CTP, LIN, PAT, SBR, SV1, SVD } from "../segments/claim.ts";
import { BHT, HL } from "../segments/hierarchy.ts";
import { NM1 } from "../segments/NM1.ts";
import { CAS, LX } from "../segments/remittance.ts";
import { GenericSegment } from "../types/segment.ts";

// Claims written for these tests (X12's own examples are not reproduced here; see
// src/examples.test.ts).
const HEADER = [
  "BHT*0019*00*BATCH0001*20241030*1200*CH",
  "NM1*41*2*RIVERSIDE FAMILY PRACTICE*****46*SUB0001",
  "PER*IC*BILLING OFFICE*TE*2175550100",
  "NM1*40*2*ACME HEALTH PLAN*****46*99999",
  "HL*1**20*1",
  "NM1*85*2*RIVERSIDE FAMILY PRACTICE*****XX*1999999984",
  "N3*2 CLINIC ROAD",
  "N4*SPRINGFIELD*IL*62702",
  "REF*EI*370000000",
];

// The subscriber is the patient: the claim sits under 2000B. The claim's REF and DTP uses arrive in
// another order than the guide lists them, the rendering provider (2310B) before the referring one
// (2310A), and the line has a drug and an other payer's adjudication.
const SUBSCRIBER_CLAIM = [
  ...HEADER,
  "HL*2*1*22*0",
  "SBR*P*18*GRP1******CI",
  "NM1*IL*1*DOE*JANE****MI*W000000001",
  "N3*100 MAIN STREET",
  "N4*SPRINGFIELD*IL*62701",
  "DMG*D8*19700101*F",
  "NM1*PR*2*ACME HEALTH PLAN*****PI*99999",
  "CLM*PCN1*150***11:B:1*Y*A*Y*Y",
  "DTP*439*D8*20241001",
  "DTP*431*D8*20240930",
  "REF*EA*MR0001",
  "REF*G1*PA0001",
  "HI*ABK:J029*ABF:R05",
  "NM1*82*1*KIM*ALEX****XX*1999999992",
  "PRV*PE*PXC*207Q00000X",
  "NM1*DN*1*LEE*SAM****XX*1999999976",
  "SBR*S*01*GRP2******CI",
  "AMT*D*40",
  "OI***Y***Y",
  "NM1*IL*1*DOE*JOHN****MI*S000000002",
  "NM1*PR*2*SECOND PLAN*****PI*88888",
  "LX*1",
  "SV1*HC:99213*100*UN*1***1:2",
  "DTP*472*D8*20241001",
  "REF*6R*LINE1",
  "LIN**N4*00000000000",
  "CTP****1*UN",
  "SVD*88888*40*HC:99213**1",
  "CAS*CO*45*60",
  "DTP*573*D8*20241015",
  "LX*2",
  "SV1*HC:87880*50*UN*1***1",
  "DTP*472*D8*20241001",
];

// The patient is the subscriber's dependent: the claim sits under 2000C.
const PATIENT_CLAIM = [
  ...HEADER,
  "HL*2*1*22*1",
  "SBR*P**GRP1******CI",
  "NM1*IL*1*DOE*JANE****MI*W000000001",
  "NM1*PR*2*ACME HEALTH PLAN*****PI*99999",
  "HL*3*2*23*0",
  "PAT*19",
  "NM1*QC*1*DOE*SAM",
  "N3*100 MAIN STREET",
  "N4*SPRINGFIELD*IL*62701",
  "DMG*D8*20150101*M",
  "CLM*PCN2*80***11:B:1*Y*A*Y*Y",
  "HI*ABK:J069",
  "LX*1",
  "SV1*HC:99212*80*UN*1***1",
  "DTP*472*D8*20241002",
];

const envelope = (body: string[]) =>
  [
    "ISA*00*          *00*          *ZZ*SUBMITTER      *ZZ*PAYER          *241030*1200*^*00501*000000001*0*T*:~",
    "GS*HC*SUBMITTER*PAYER*20241030*1200*1*X*005010X222A1~",
    "ST*837*0001*005010X222A1~",
    ...body.map((s) => `${s}~`),
    `SE*${body.length + 2}*0001~`,
    "GE*1*1~",
    "IEA*1*000000001~",
  ].join("\n");

const typed = async (body: string[]) => {
  const r = await parse(envelope(body));
  expect(r.val!.warnings).toEqual([]);
  const parsed = r.val!.functionalGroups[0].transactionSets[0].parsed!;
  expect(parsed.err?.message).toBeUndefined();
  if (!parsed.ok || parsed.val.transactionSet !== "837") throw new Error("not an 837");
  expect(parsed.val.warnings).toEqual([]);
  return parsed.val.value;
};

describe("837P", () => {
  it("parses a claim of a subscriber who is the patient", async () => {
    const value = await typed(SUBSCRIBER_CLAIM);
    expect(value.submitter.name.getLastOrOrganizationName()).toBe("RIVERSIDE FAMILY PRACTICE");
    const [billing] = value.billingProviders;
    expect(billing.billingProviderName.taxIdentification.get(2)).toBe("370000000");
    const [subscriber] = billing.subscribers;
    expect(subscriber.subscriber.get(2)).toBe("18");
    expect(subscriber.subscriberName.name.getFirstName()).toBe("JANE");
    expect(subscriber.payerName.name.getIdentificationCode()).toBe("99999");
    expect(subscriber.patients).toEqual([]);

    const [claim] = subscriber.claims;
    expect(claim.claim.getPatientControlNumber()).toBe("PCN1");
    expect(claim.accident?.get(3)).toBe("20241001");
    expect(claim.onsetOfCurrentIllness?.get(3)).toBe("20240930");
    expect(claim.medicalRecordNumber?.get(2)).toBe("MR0001");
    expect(claim.priorAuthorization?.get(2)).toBe("PA0001");
    expect(claim.diagnosisCodes.getComponent(1, 2)).toBe("J029");
    expect(claim.renderingProvider?.specialty?.get(3)).toBe("207Q00000X");
    expect(claim.referringProviders.map((p) => p.name.getLastOrOrganizationName())).toEqual(["LEE"]);

    const [other] = claim.otherSubscribers;
    expect(other.payerPaidAmount?.get(2)).toBe("40");
    expect(other.otherPayerName.name.getIdentificationCode()).toBe("88888");

    const [first, second] = claim.serviceLines;
    expect(first.professionalService.getProcedure()).toEqual({ qualifier: "HC", code: "99213" });
    expect(first.serviceDate.get(3)).toBe("20241001");
    expect(first.lineItemControlNumber?.get(2)).toBe("LINE1");
    expect(first.drugIdentification?.drug.get(3)).toBe("00000000000");
    expect(first.lineAdjudications[0].adjustments[0].getAdjustments()).toEqual([{ reason: "45", amount: "60" }]);
    expect(first.lineAdjudications[0].checkOrRemittanceDate.get(3)).toBe("20241015");
    expect(second.professionalService.getChargeAmount()).toBe("50");

    expectTypeOf(value.beginningOfHierarchicalTransaction).toEqualTypeOf<BHT>();
    expectTypeOf(billing.hierarchicalLevel).toEqualTypeOf<HL>();
    expectTypeOf(subscriber.subscriber).toEqualTypeOf<SBR>();
    expectTypeOf(claim.claim).toEqualTypeOf<CLM>();
    expectTypeOf(claim.diagnosisCodes).toEqualTypeOf<GenericSegment>();
    expectTypeOf(claim.conditionInformation).toEqualTypeOf<GenericSegment[]>();
    expectTypeOf(claim.priorAuthorization).toEqualTypeOf<GenericSegment | undefined>();
    expectTypeOf(claim.renderingProvider!.name).toEqualTypeOf<NM1>();
    expectTypeOf(claim.renderingProvider!.specialty).toEqualTypeOf<GenericSegment | undefined>();
    expectTypeOf(claim.renderingProvider!.secondaryIdentifications).toEqualTypeOf<GenericSegment[]>();
    expectTypeOf(first.lineNumber).toEqualTypeOf<LX>();
    expectTypeOf(first.professionalService).toEqualTypeOf<SV1>();
    expectTypeOf(first.testDates).toEqualTypeOf<GenericSegment[]>();
    expectTypeOf(first.drugIdentification!.drug).toEqualTypeOf<LIN>();
    expectTypeOf(first.drugIdentification!.drugQuantity).toEqualTypeOf<CTP>();
    expectTypeOf(first.lineAdjudications[0].adjudication).toEqualTypeOf<SVD>();
    expectTypeOf(first.lineAdjudications[0].adjustments).toEqualTypeOf<CAS[]>();
  });

  it("parses a claim of a dependent patient under the patient level", async () => {
    const value = await typed(PATIENT_CLAIM);
    const [subscriber] = value.billingProviders[0].subscribers;
    expect(subscriber.claims).toEqual([]);
    const [patient] = subscriber.patients;
    expect(patient.patient.get(1)).toBe("19");
    expect(patient.patientName.name.getFirstName()).toBe("SAM");
    expect(patient.claims[0].claim.getPatientControlNumber()).toBe("PCN2");
    expectTypeOf(patient.patient).toEqualTypeOf<PAT>();
  });

  it("round-trips, writing the uses of one position in the guide's order", async () => {
    const value = await typed(SUBSCRIBER_CLAIM);
    const encoded = X837P.create("0001", value).segments.map((s) => s.encode());
    const expected = [...SUBSCRIBER_CLAIM];
    const move = (line: string, before: string) => {
      expected.splice(expected.indexOf(line), 1);
      expected.splice(expected.indexOf(before), 0, line);
    };
    move("DTP*431*D8*20240930", "DTP*439*D8*20241001"); // onset of current illness is listed before accident
    move("REF*G1*PA0001", "REF*EA*MR0001"); // prior authorization before medical record number
    move("NM1*DN*1*LEE*SAM****XX*1999999976", "NM1*82*1*KIM*ALEX****XX*1999999992"); // 2310A before 2310B
    expect(encoded).toEqual(expected);
  });

  it("fails for a claim without a diagnosis", async () => {
    const r = await parse(envelope(PATIENT_CLAIM.filter((s) => !s.startsWith("HI*"))));
    expect(r.val!.functionalGroups[0].transactionSets[0].parsed?.err?.message).toBe("837 loop 2300 must contain HI (HI01 ABK/BK) (Health Care Diagnosis Code)");
  });

  it("builds a claim with the segment classes", () => {
    const set = X837P.create("0001", {
      beginningOfHierarchicalTransaction: new BHT().hierarchicalStructureCode("0019").transactionSetPurposeCode("00").referenceIdentification("BATCH0002").date("20241030").time("1200").transactionTypeCode("CH"),
      submitter: {
        name: new NM1().entityIdentifierCode("41").organization("RIVERSIDE FAMILY PRACTICE").identification("46", "SUB0001"),
        contacts: [new GenericSegment("PER").element(1, "IC").element(2, "BILLING OFFICE").element(3, "TE").element(4, "2175550100")],
      },
      receiver: { name: new NM1().entityIdentifierCode("40").organization("ACME HEALTH PLAN").identification("46", "99999") },
      billingProviders: [
        {
          hierarchicalLevel: new HL().hierarchicalIdNumber(1).hierarchicalLevelCode("20").hierarchicalChildCode("1"),
          billingProviderName: {
            name: new NM1().entityIdentifierCode("85").organization("RIVERSIDE FAMILY PRACTICE").identification("XX", "1999999984"),
            address: new GenericSegment("N3").element(1, "2 CLINIC ROAD"),
            cityStateZip: new GenericSegment("N4").element(1, "SPRINGFIELD").element(2, "IL").element(3, "62702"),
            taxIdentification: new GenericSegment("REF").element(1, "EI").element(2, "370000000"),
          },
          subscribers: [
            {
              hierarchicalLevel: new HL().hierarchicalIdNumber(2).hierarchicalParentIdNumber(1).hierarchicalLevelCode("22").hierarchicalChildCode("0"),
              subscriber: new SBR().payerResponsibilitySequenceNumberCode("P").individualRelationshipCode("18").claimFilingIndicatorCode("CI"),
              subscriberName: { name: new NM1().entityIdentifierCode("IL").person({ last: "DOE", first: "JANE" }).identification("MI", "W000000001") },
              payerName: { name: new NM1().entityIdentifierCode("PR").organization("ACME HEALTH PLAN").identification("PI", "99999") },
              claims: [
                {
                  claim: new CLM()
                    .patientControlNumber("PCN3")
                    .totalClaimChargeAmount(100)
                    .serviceLocation({ facilityTypeCode: "11", claimFrequencyCode: "1" })
                    .providerSignatureIndicator("Y")
                    .assignmentCode("A")
                    .benefitsAssignmentCertificationIndicator("Y")
                    .releaseOfInformationCode("Y"),
                  diagnosisCodes: new GenericSegment("HI").repeating(1, ["ABK", "J029"]),
                  serviceLines: [
                    {
                      lineNumber: new LX().assignedNumber(1),
                      professionalService: new SV1().procedure({ qualifier: "HC", code: "99213" }).lineItemChargeAmount(100).units("UN", 1).diagnosisCodePointer(1),
                      serviceDate: new GenericSegment("DTP").element(1, "472").element(2, "D8").element(3, "20241001"),
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
    expect(set.header.encode()).toBe("ST*837*0001*005010X222A1");
    expect(set.segments.map((s) => s.encode()).slice(-7)).toEqual([
      "NM1*IL*1*DOE*JANE****MI*W000000001",
      "NM1*PR*2*ACME HEALTH PLAN*****PI*99999",
      "CLM*PCN3*100***11:B:1*Y*A*Y*Y",
      "HI*ABK:J029",
      "LX*1",
      "SV1*HC:99213*100*UN*1***1",
      "DTP*472*D8*20241001",
    ]);
  });
});
