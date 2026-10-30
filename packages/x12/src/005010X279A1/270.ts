/**
 * 270 Eligibility, Coverage or Benefit Inquiry, 005010X279A1: its structure, parser and builder.
 *
 * ```
 * ST BHT
 * { HL(20)                          2000A information source
 *     NM1                           2100A
 *   { HL(21)                        2000B information receiver
 *       NM1 [REF…] [N3] [N4] [PRV]  2100B
 *     { HL(22) [TRN…]               2000C subscriber
 *         NM1(IL) … [DTP…]          2100C
 *           { EQ … }                2110C eligibility inquiry
 *       { HL(23) [TRN…]             2000D dependent
 *           NM1(03) …               2100D
 *             { EQ … }              2110D
 * } } } }
 * SE
 * ```
 *
 * Order, usage, maximum uses and loop repeats from the CMS 270/271 4010A1 → 5010A1 crosswalk,
 * checked against the CMS HETS companion guide, X12's 005010X279 examples and state Medicaid guides
 * (`docs/validation/005010X279A1-ledger.md`, section 2). Payer limits (one 2000A, one subscriber per
 * 270, no dependents at HETS) are not the guide's and are not enforced.
 *
 * @module
 */
import { loop, segment, type InputOf, type ParsedOf } from "../types/schema.ts";
import { defineTransactionSet } from "../types/transaction.ts";
import { BHT, HL, TRN } from "../segments/hierarchy.ts";
import { NM1 } from "../segments/NM1.ts";
import { EQ } from "../segments/eligibility.ts";

const SUBSCRIBER_INQUIRY = loop(
  "2110C",
  "eligibilityInquiries",
  "Subscriber Eligibility/Benefit Inquiry",
  [
    segment("EQ", "inquiry", "Subscriber Eligibility/Benefit Inquiry Information", { required: true, segmentClass: EQ }),
    segment("AMT", "spendDownAmount", "Subscriber Spend Down Amount", { qualifier: [1, "R"] }),
    segment("AMT", "spendDownTotalBilledAmount", "Subscriber Spend Down Total Billed Amount", { qualifier: [1, "PB"] }),
    segment("III", "additionalInquiryInformation", "Subscriber Eligibility/Benefit Additional Inquiry Information", { repeating: true, max: 10 }),
    segment("REF", "additionalInformation", "Subscriber Additional Information"),
    segment("DTP", "date", "Subscriber Eligibility/Benefit Date"),
  ],
  { repeating: true, max: 99 },
);

const DEPENDENT_INQUIRY = loop(
  "2110D",
  "eligibilityInquiries",
  "Dependent Eligibility/Benefit Inquiry",
  [
    segment("EQ", "inquiry", "Dependent Eligibility/Benefit Inquiry Information", { required: true, segmentClass: EQ }),
    segment("III", "additionalInquiryInformation", "Dependent Eligibility/Benefit Additional Inquiry Information", { repeating: true, max: 10 }),
    segment("REF", "additionalInformation", "Dependent Additional Information"),
    segment("DTP", "date", "Dependent Eligibility/Benefit Date"),
  ],
  { required: true, repeating: true, max: 99 },
);

const DEPENDENT = loop(
  "2000D",
  "dependents",
  "Dependent Level",
  [
    segment("HL", "hierarchicalLevel", "Dependent Level", { required: true, qualifier: [3, "23"], segmentClass: HL }),
    segment("TRN", "traceNumbers", "Dependent Trace Number", { repeating: true, max: 2, segmentClass: TRN }),
    loop(
      "2100D",
      "dependentName",
      "Dependent Name",
      [
        segment("NM1", "name", "Dependent Name", { required: true, qualifier: [1, "03"], segmentClass: NM1 }),
        segment("REF", "additionalIdentifications", "Dependent Additional Identification", { repeating: true, max: 9 }),
        segment("N3", "address", "Dependent Address"),
        segment("N4", "cityStateZip", "Dependent City/State/ZIP Code"),
        segment("PRV", "providerInformation", "Provider Information"),
        segment("DMG", "demographicInformation", "Dependent Demographic Information"),
        segment("INS", "relationship", "Dependent Relationship"),
        segment("HI", "diagnosisCode", "Dependent Health Care Diagnosis Code"),
        segment("DTP", "dates", "Dependent Date", { repeating: true, max: 2 }),
        DEPENDENT_INQUIRY,
      ],
      { required: true },
    ),
  ],
  { repeating: true },
);

const SUBSCRIBER = loop(
  "2000C",
  "subscribers",
  "Subscriber Level",
  [
    segment("HL", "hierarchicalLevel", "Subscriber Level", { required: true, qualifier: [3, "22"], segmentClass: HL }),
    segment("TRN", "traceNumbers", "Subscriber Trace Number", { repeating: true, max: 2, segmentClass: TRN }),
    loop(
      "2100C",
      "subscriberName",
      "Subscriber Name",
      [
        segment("NM1", "name", "Subscriber Name", { required: true, qualifier: [1, "IL"], segmentClass: NM1 }),
        segment("REF", "additionalIdentifications", "Subscriber Additional Identification", { repeating: true, max: 9 }),
        segment("N3", "address", "Subscriber Address"),
        segment("N4", "cityStateZip", "Subscriber City/State/ZIP Code"),
        segment("PRV", "providerInformation", "Provider Information"),
        segment("DMG", "demographicInformation", "Subscriber Demographic Information"),
        segment("INS", "multipleBirthSequenceNumber", "Multiple Birth Sequence Number"),
        segment("HI", "diagnosisCode", "Subscriber Health Care Diagnosis Code"),
        segment("DTP", "dates", "Subscriber Date", { repeating: true, max: 2 }),
        SUBSCRIBER_INQUIRY,
      ],
      { required: true },
    ),
    DEPENDENT,
  ],
  { required: true, repeating: true },
);

/** The 270's body, between ST and SE. */
export const X270_STRUCTURE = [
  segment("BHT", "beginningOfHierarchicalTransaction", "Beginning of Hierarchical Transaction", { required: true, segmentClass: BHT }),
  loop(
    "2000A",
    "informationSources",
    "Information Source Level",
    [
      segment("HL", "hierarchicalLevel", "Information Source Level", { required: true, qualifier: [3, "20"], segmentClass: HL }),
      loop(
        "2100A",
        "informationSourceName",
        "Information Source Name",
        [segment("NM1", "name", "Information Source Name", { required: true, qualifier: [1, "2B", "36", "GP", "P5", "PR"], segmentClass: NM1 })],
        { required: true },
      ),
      loop(
        "2000B",
        "informationReceivers",
        "Information Receiver Level",
        [
          segment("HL", "hierarchicalLevel", "Information Receiver Level", { required: true, qualifier: [3, "21"], segmentClass: HL }),
          loop(
            "2100B",
            "informationReceiverName",
            "Information Receiver Name",
            [
              segment("NM1", "name", "Information Receiver Name", { required: true, qualifier: [1, "1P", "2B", "36", "80", "FA", "GP", "P5", "PR"], segmentClass: NM1 }),
              segment("REF", "additionalIdentifications", "Information Receiver Additional Identification", { repeating: true, max: 9 }),
              segment("N3", "address", "Information Receiver Address"),
              segment("N4", "cityStateZip", "Information Receiver City/State/ZIP Code"),
              segment("PRV", "providerInformation", "Information Receiver Provider Information"),
            ],
            { required: true },
          ),
          SUBSCRIBER,
        ],
        { required: true, repeating: true },
      ),
    ],
    { required: true, repeating: true },
  ),
] as const;

/** The 270 Eligibility, Coverage or Benefit Inquiry of 005010X279A1. */
export const X270 = defineTransactionSet({
  transactionSet: "270",
  version: "005010X279A1",
  name: "Eligibility, Coverage or Benefit Inquiry",
  structure: X270_STRUCTURE,
});

/** A parsed 270 body. */
export type Parsed270 = ParsedOf<typeof X270_STRUCTURE>;

/** The input of `X270.create()`. */
export type X270Input = InputOf<typeof X270_STRUCTURE>;

