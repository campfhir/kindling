/**
 * 835 Health Care Claim Payment/Advice, 005010X221A1: its structure, parser and builder.
 *
 * ```
 * ST BPR TRN [CUR] [REF(EV)] [REF(F2)] [DTM(405)]
 * N1(PR) N3 N4 [REF…] [PER(CX)] PER(BL) [PER(IC)]          1000A payer
 * N1(PE) [N3] N4 [REF…] [RDM]                              1000B payee
 * { [LX] [TS3] [TS2]                                       2000  header number
 *   { CLP [CAS…] NM1(QC) [NM1(IL/74/82/TT/PR/GB)…] [MIA] [MOA] [REF…] [DTM…] [PER…] [AMT…] [QTY…]
 *     { SVC [DTM…] [CAS…] [REF…] [AMT…] [QTY…] [LQ…] }    2110  service payment
 *   }                                                      2100  claim payment
 * }
 * [PLB…] SE
 * ```
 *
 * Order, usage, maximum uses and loop repeats from the CMS 835 4010A1 → 5010A1 crosswalk, checked
 * against CMS's 835 companion guides, Medicare contractor and state Medicaid guides, the guides'
 * printed page numbers and X12's 005010X221 examples (`docs/validation/005010X221A1-ledger.md`).
 * The uses of one position the guide names separately (the header REFs, the payer's three PER, the
 * claim's NM1, REF and DTM uses, the service's REF uses) are taken in any order. The guide's list of
 * 2100 Rendering Provider Identification qualifiers is not public, so that REF takes any REF01 the
 * Other Claim Related Identification REF does not.
 *
 * @module
 */
import { loop, segment, unordered, type InputOf, type ParsedOf } from "../types/schema.ts";
import { defineTransactionSet } from "../types/transaction.ts";
import { TRN } from "../segments/hierarchy.ts";
import { NM1 } from "../segments/NM1.ts";
import { BPR, CAS, CLP, LX, N1, PLB, SVC } from "../segments/remittance.ts";

/** REF01 of the 2100 Other Claim Related Identification (the crosswalk's codes and those CMS does not use). */
const OTHER_CLAIM_REFERENCES = ["1L", "1W", "28", "6P", "9A", "9C", "BB", "CE", "EA", "F8", "G1", "G3", "IG"];

const SERVICE_PAYMENT = loop(
  "2110",
  "servicePayments",
  "Service Payment Information",
  [
    segment("SVC", "service", "Service Payment Information", { required: true, segmentClass: SVC }),
    segment("DTM", "serviceDates", "Service Date", { repeating: true, max: 2, qualifier: [1, "150", "151", "472"] }),
    segment("CAS", "adjustments", "Service Adjustment", { repeating: true, max: 99, segmentClass: CAS }),
    unordered(
      segment("REF", "serviceIdentifications", "Service Identification", { repeating: true, max: 8, qualifier: [1, "LU", "1S", "APC", "RB", "BB", "E9", "G1", "G3"] }),
      segment("REF", "lineItemControlNumber", "Line Item Control Number", { qualifier: [1, "6R"] }),
      segment("REF", "renderingProviderInformation", "Rendering Provider Information", {
        repeating: true,
        max: 10,
        qualifier: [1, "HPI", "SY", "TJ", "1C", "1G", "0B", "1A", "1B", "1D", "1H", "1J", "D3", "G2"],
      }),
      segment("REF", "healthCarePolicyIdentifications", "HealthCare Policy Identification", { repeating: true, max: 5, qualifier: [1, "0K"] }),
    ),
    segment("AMT", "supplementalAmounts", "Service Supplemental Amount", { repeating: true, max: 9 }),
    segment("QTY", "supplementalQuantities", "Service Supplemental Quantity", { repeating: true, max: 6 }),
    segment("LQ", "remarkCodes", "Health Care Remark Codes", { repeating: true, max: 99 }),
  ],
  { repeating: true, max: 999 },
);

const CLAIM_PAYMENT = loop(
  "2100",
  "claimPayments",
  "Claim Payment Information",
  [
    segment("CLP", "claim", "Claim Payment Information", { required: true, segmentClass: CLP }),
    segment("CAS", "adjustments", "Claim Adjustment", { repeating: true, max: 99, segmentClass: CAS }),
    unordered(
      segment("NM1", "patientName", "Patient Name", { required: true, qualifier: [1, "QC"], segmentClass: NM1 }),
      segment("NM1", "insuredName", "Insured Name", { qualifier: [1, "IL"], segmentClass: NM1 }),
      segment("NM1", "correctedPatientName", "Corrected Patient/Insured Name", { qualifier: [1, "74"], segmentClass: NM1 }),
      segment("NM1", "serviceProviderName", "Service Provider Name", { qualifier: [1, "82"], segmentClass: NM1 }),
      segment("NM1", "crossoverCarrierName", "Crossover Carrier Name", { qualifier: [1, "TT"], segmentClass: NM1 }),
      segment("NM1", "correctedPriorityPayerName", "Corrected Priority Payer Name", { qualifier: [1, "PR"], segmentClass: NM1 }),
      segment("NM1", "otherSubscriberName", "Other Subscriber Name", { qualifier: [1, "GB"], segmentClass: NM1 }),
    ),
    segment("MIA", "inpatientAdjudication", "Inpatient Adjudication Information"),
    segment("MOA", "outpatientAdjudication", "Outpatient Adjudication Information"),
    unordered(
      segment("REF", "otherClaimIdentifications", "Other Claim Related Identification", { repeating: true, max: 5, qualifier: [1, ...OTHER_CLAIM_REFERENCES] }),
      segment("REF", "renderingProviderIdentifications", "Rendering Provider Identification", { repeating: true, max: 10 }),
    ),
    unordered(
      segment("DTM", "statementDates", "Statement From or To Date", { repeating: true, max: 2, qualifier: [1, "232", "233"] }),
      segment("DTM", "coverageExpirationDate", "Coverage Expiration Date", { qualifier: [1, "036"] }),
      segment("DTM", "claimReceivedDate", "Claim Received Date", { qualifier: [1, "050"] }),
    ),
    segment("PER", "claimContacts", "Claim Contact Information", { repeating: true, max: 2 }),
    segment("AMT", "supplementalAmounts", "Claim Supplemental Information", { repeating: true, max: 13 }),
    segment("QTY", "supplementalQuantities", "Claim Supplemental Information Quantity", { repeating: true, max: 14 }),
    SERVICE_PAYMENT,
  ],
  { required: true, repeating: true },
);

/** The 835's body, between ST and SE. */
export const X835_STRUCTURE = [
  segment("BPR", "financialInformation", "Financial Information", { required: true, segmentClass: BPR }),
  segment("TRN", "reassociationTraceNumber", "Reassociation Trace Number", { required: true, segmentClass: TRN }),
  segment("CUR", "foreignCurrency", "Foreign Currency Information"),
  unordered(
    segment("REF", "receiverIdentification", "Receiver Identification", { qualifier: [1, "EV"] }),
    segment("REF", "versionIdentification", "Version Identification", { qualifier: [1, "F2"] }),
  ),
  segment("DTM", "productionDate", "Production Date", { qualifier: [1, "405"] }),
  loop(
    "1000A",
    "payer",
    "Payer Identification",
    [
      segment("N1", "identification", "Payer Identification", { required: true, qualifier: [1, "PR"], segmentClass: N1 }),
      segment("N3", "address", "Payer Address", { required: true }),
      segment("N4", "cityStateZip", "Payer City, State, ZIP Code", { required: true }),
      segment("REF", "additionalIdentifications", "Additional Payer Identification", { repeating: true, max: 4 }),
      unordered(
        segment("PER", "businessContact", "Payer Business Contact Information", { qualifier: [1, "CX"] }),
        segment("PER", "technicalContacts", "Payer Technical Contact Information", { required: true, repeating: true, qualifier: [1, "BL"] }),
        segment("PER", "webSite", "Payer Web Site", { qualifier: [1, "IC"] }),
      ),
    ],
    { required: true },
  ),
  loop(
    "1000B",
    "payee",
    "Payee Identification",
    [
      segment("N1", "identification", "Payee Identification", { required: true, qualifier: [1, "PE"], segmentClass: N1 }),
      segment("N3", "address", "Payee Address"),
      segment("N4", "cityStateZip", "Payee City, State, ZIP Code", { required: true }),
      segment("REF", "additionalIdentifications", "Payee Additional Identification", { repeating: true }),
      segment("RDM", "remittanceDeliveryMethod", "Remittance Delivery Method"),
    ],
    { required: true },
  ),
  loop(
    "2000",
    "headerNumbers",
    "Header Number",
    [
      segment("LX", "headerNumber", "Header Number", { required: true, segmentClass: LX }),
      segment("TS3", "providerSummary", "Provider Summary Information"),
      segment("TS2", "providerSupplementalSummary", "Provider Supplemental Summary Information"),
      CLAIM_PAYMENT,
    ],
    { repeating: true },
  ),
  segment("PLB", "providerAdjustments", "Provider Adjustment", { repeating: true, segmentClass: PLB }),
] as const;

/** The 835 Health Care Claim Payment/Advice of 005010X221A1. */
export const X835 = defineTransactionSet({
  transactionSet: "835",
  version: "005010X221A1",
  name: "Health Care Claim Payment/Advice",
  structure: X835_STRUCTURE,
});

/** A parsed 835 body. */
export type Parsed835 = ParsedOf<typeof X835_STRUCTURE>;

/** The input of `X835.create()`. */
export type X835Input = InputOf<typeof X835_STRUCTURE>;
