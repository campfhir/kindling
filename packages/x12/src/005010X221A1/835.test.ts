import { describe, expect, expectTypeOf, it } from "vitest";
import { parse } from "../parse.ts";
import { X835 } from "./835.ts";
import { BPR, CAS, CLP, LX, N1, PLB, SVC } from "../segments/remittance.ts";
import { TRN } from "../segments/hierarchy.ts";
import { NM1 } from "../segments/NM1.ts";
import { GenericSegment } from "../types/segment.ts";

// A remittance written for these tests (X12's own examples are not reproduced here; see
// src/examples.test.ts): one check paying two claims, the second with two service lines, a
// corrected patient name, a claim received date sent before the statement dates, and a provider
// level adjustment.
const BODY = [
  "BPR*C*230*C*CHK************20241030",
  "TRN*1*CHK0001*1999999999",
  "REF*EV*RECEIVER01",
  "DTM*405*20241029",
  "N1*PR*ACME HEALTH PLAN*XV*99999",
  "N3*1 PAYER WAY",
  "N4*SPRINGFIELD*IL*62701",
  "PER*BL*EDI SUPPORT*TE*8005550100",
  "PER*CX*CLAIMS*TE*8005550101",
  "N1*PE*RIVERSIDE FAMILY PRACTICE*XX*1999999984",
  "N3*2 CLINIC ROAD",
  "N4*SPRINGFIELD*IL*62702",
  "REF*TJ*999999999",
  "LX*1",
  "CLP*PCN1*1*100*80*20*12*PAYERCLAIM1",
  "NM1*QC*1*DOE*JANE****MI*W000000001",
  "DTM*050*20241001",
  "SVC*HC:99213*100*80**1",
  "DTM*472*20240930",
  "CAS*PR*2*20",
  "REF*6R*LINE1",
  "AMT*B6*100",
  "CLP*PCN2*1*200*150*50*12*PAYERCLAIM2",
  "CAS*CO*45*10",
  "NM1*74*1*DOE*JANET",
  "NM1*QC*1*DOE*JANE****MI*W000000001",
  "DTM*050*20241002",
  "DTM*232*20240915",
  "DTM*233*20240915",
  "SVC*HC:99214*120*90**1",
  "DTM*472*20240915",
  "CAS*PR*1*30",
  "SVC*HC:80053*80*60**1",
  "DTM*472*20240915",
  "CAS*PR*2*10*1*3*5",
  "LQ*HE*N130",
  "PLB*1999999984*20241231*WO:PAYERCLAIM0*-50",
];

const envelope = (body: string[]) =>
  [
    "ISA*00*          *00*          *ZZ*PAYER          *ZZ*PROVIDER       *241030*1200*^*00501*000000001*0*T*:~",
    "GS*HP*PAYER*PROVIDER*20241030*1200*1*X*005010X221A1~",
    "ST*835*0001*005010X221A1~",
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
  if (!parsed.ok || parsed.val.transactionSet !== "835") throw new Error("not an 835");
  return parsed.val;
};

describe("835", () => {
  it("parses the payment, the parties, the claims and their service lines", async () => {
    const { value, warnings } = await typed(BODY);
    expect(warnings).toEqual([]);
    expect(value.financialInformation.getPaymentAmount()).toBe("230");
    expect(value.reassociationTraceNumber.get(2)).toBe("CHK0001");
    expect(value.receiverIdentification?.get(2)).toBe("RECEIVER01");
    expect(value.payer.identification.getName()).toBe("ACME HEALTH PLAN");
    expect(value.payer.technicalContacts.map((p) => p.get(2))).toEqual(["EDI SUPPORT"]);
    expect(value.payer.businessContact?.get(2)).toBe("CLAIMS");
    expect(value.payee.identification.getIdentificationCode()).toBe("1999999984");

    const [first, second] = value.headerNumbers[0].claimPayments;
    expect(first.claim.getClaimSubmitterIdentifier()).toBe("PCN1");
    expect(first.patientName.getLastOrOrganizationName()).toBe("DOE");
    expect(first.servicePayments[0].lineItemControlNumber?.get(2)).toBe("LINE1");
    expect(second.adjustments[0].getAdjustments()).toEqual([{ reason: "45", amount: "10" }]);
    expect(second.correctedPatientName?.getFirstName()).toBe("JANET");
    expect(second.statementDates.map((d) => d.get(2))).toEqual(["20240915", "20240915"]);
    expect(second.claimReceivedDate?.get(2)).toBe("20241002");
    expect(second.servicePayments.map((s) => s.service.getProcedure().code)).toEqual(["99214", "80053"]);
    expect(second.servicePayments[1].adjustments.map((c) => c.getGroupCode())).toEqual(["PR"]);
    expect(second.servicePayments[1].adjustments[0].getAdjustments()).toEqual([
      { reason: "2", amount: "10", quantity: "1" },
      { reason: "3", amount: "5" },
    ]);
    expect(second.servicePayments[1].remarkCodes.map((l) => l.get(2))).toEqual(["N130"]);
    expect(value.providerAdjustments[0].getAdjustments()).toEqual([{ reason: "WO", identifier: "PAYERCLAIM0", amount: "-50" }]);

    expectTypeOf(value.financialInformation).toEqualTypeOf<BPR>();
    expectTypeOf(value.reassociationTraceNumber).toEqualTypeOf<TRN>();
    expectTypeOf(value.payer.identification).toEqualTypeOf<N1>();
    expectTypeOf(first.claim).toEqualTypeOf<CLP>();
    expectTypeOf(first.patientName).toEqualTypeOf<NM1>();
    expectTypeOf(first.servicePayments[0].service).toEqualTypeOf<SVC>();
    expectTypeOf(first.servicePayments[0].adjustments).toEqualTypeOf<CAS[]>();
    expectTypeOf(value.providerAdjustments).toEqualTypeOf<PLB[]>();
  });

  it("round-trips, writing the uses of one position in the guide's order", async () => {
    const { value } = await typed(BODY);
    const encoded = X835.create("0001", value).segments.map((s) => s.encode());
    const reordered = [...BODY];
    // The guide lists PER CX before PER BL, NM1 QC before NM1 74, and DTM 232/233 before DTM 050.
    const swap = (a: string, b: string) => {
      const i = reordered.indexOf(a);
      const j = reordered.indexOf(b);
      [reordered[i], reordered[j]] = [reordered[j], reordered[i]];
    };
    swap("PER*BL*EDI SUPPORT*TE*8005550100", "PER*CX*CLAIMS*TE*8005550101");
    const corrected = reordered.indexOf("NM1*74*1*DOE*JANET"); // directly before its claim's NM1 QC
    [reordered[corrected], reordered[corrected + 1]] = [reordered[corrected + 1], reordered[corrected]];
    reordered.splice(reordered.indexOf("DTM*050*20241002"), 1);
    reordered.splice(reordered.indexOf("DTM*233*20240915") + 1, 0, "DTM*050*20241002");
    expect(encoded).toEqual(reordered);
  });

  it("fails for a claim without its patient name", async () => {
    const r = await parse(envelope(BODY.filter((s, i) => !(s === "NM1*QC*1*DOE*JANE****MI*W000000001" && i === BODY.indexOf(s)))));
    const parsed = r.val!.functionalGroups[0].transactionSets[0].parsed!;
    expect(parsed.err?.message).toBe("835 loop 2100 must contain NM1 (NM101 QC) (Patient Name)");
  });

  it("builds a remittance with the segment classes", () => {
    const set = X835.create("0001", {
      financialInformation: new BPR().transactionHandlingCode("I").totalActualProviderPaymentAmount(0).creditOrDebitFlagCode("C").paymentMethodCode("NON").checkIssueOrEftEffectiveDate("20241030"),
      reassociationTraceNumber: new TRN().traceTypeCode("1").referenceIdentification("RA0001").originatingCompanyIdentifier("1999999999"),
      payer: {
        identification: new N1().entityIdentifierCode("PR").name("ACME HEALTH PLAN"),
        address: new GenericSegment("N3").element(1, "1 PAYER WAY"),
        cityStateZip: new GenericSegment("N4").element(1, "SPRINGFIELD").element(2, "IL").element(3, "62701"),
        technicalContacts: [new GenericSegment("PER").element(1, "BL").element(3, "TE").element(4, "8005550100")],
      },
      payee: {
        identification: new N1().entityIdentifierCode("PE").name("RIVERSIDE FAMILY PRACTICE").identification("XX", "1999999984"),
        cityStateZip: new GenericSegment("N4").element(1, "SPRINGFIELD").element(2, "IL").element(3, "62702"),
      },
      headerNumbers: [
        {
          headerNumber: new LX().assignedNumber(1),
          claimPayments: [
            {
              claim: new CLP().claimSubmitterIdentifier("PCN9").claimStatusCode("4").totalClaimChargeAmount(50).claimPaymentAmount(0).claimFilingIndicatorCode("12"),
              adjustments: [new CAS().claimAdjustmentGroupCode("CO").adjustments({ reason: "29", amount: 50 })],
              patientName: new NM1().entityIdentifierCode("QC").person({ last: "DOE", first: "JANE" }),
            },
          ],
        },
      ],
      providerAdjustments: [new PLB().providerIdentifier("1999999984").fiscalPeriodDate("20241231").adjustments({ reason: "FB", amount: "25.5" })],
    });
    expect(set.segments.map((s) => s.encode())).toEqual([
      "BPR*I*0*C*NON************20241030",
      "TRN*1*RA0001*1999999999",
      "N1*PR*ACME HEALTH PLAN",
      "N3*1 PAYER WAY",
      "N4*SPRINGFIELD*IL*62701",
      "PER*BL**TE*8005550100",
      "N1*PE*RIVERSIDE FAMILY PRACTICE*XX*1999999984",
      "N4*SPRINGFIELD*IL*62702",
      "LX*1",
      "CLP*PCN9*4*50*0**12",
      "CAS*CO*29*50",
      "NM1*QC*1*DOE*JANE",
      "PLB*1999999984*20241231*FB*25.5",
    ]);
  });
});
