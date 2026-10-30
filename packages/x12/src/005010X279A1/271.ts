/**
 * 271 Eligibility, Coverage or Benefit Information, 005010X279A1: its structure, parser and builder.
 *
 * ```
 * ST BHT
 * { HL(20) [AAA…]                          2000A information source
 *     NM1 [PER…] [AAA…]                    2100A
 *   { HL(21)                               2000B information receiver
 *       NM1 … [AAA…] [PRV]                 2100B
 *     { HL(22) [TRN…]                      2000C subscriber
 *         NM1(IL) … [MPI]                  2100C
 *           { EB [HSD…] [REF…] [DTP…] [AAA…] [MSG…]
 *             { III }                      2115C
 *             [LS { NM1 [N3] [N4] [PER…] [PRV] } LE]   2120C
 *           }                              2110C eligibility or benefit information
 *       { HL(23) … the same for the dependent (2000D, 2100D, 2110D, 2115D, 2120D) }
 * } } }
 * SE
 * ```
 *
 * Order, usage, maximum uses and loop repeats from the CMS 270/271 4010A1 → 5010A1 crosswalk,
 * checked against the CMS HETS companion guide, X12's 005010X279 examples, X12 RFI 1807 (LS and LE
 * once per 2110C around up to 23 2120C loops) and state Medicaid guides
 * (`docs/validation/005010X279A1-ledger.md`, section 3). The crosswalk puts LE in loop 2120C and the
 * dependent LS in 2115D; Nevada's guide and RFI 1807 put them in 2110C/2110D, as here.
 *
 * @module
 */
import { loop, segment, type InputOf, type ParsedOf } from "../types/schema.ts";
import { defineTransactionSet } from "../types/transaction.ts";
import { BHT, HL, TRN } from "../segments/hierarchy.ts";
import { NM1 } from "../segments/NM1.ts";
import { AAA, EB, LE, LS } from "../segments/eligibility.ts";

/** NM101 of a benefit related entity (2120C/2120D). */
const BENEFIT_RELATED_ENTITIES = ["13", "1I", "1P", "2B", "36", "73", "FA", "GP", "GW", "I3", "IL", "LR", "OC", "P3", "P4", "P5", "PR", "PRP", "SEP", "TTP", "VER", "VN", "VY", "X3", "Y2"];

const benefitInformation = <const L extends string, const A extends string, const R extends string, const W extends string>(
  loopId: L,
  additionalLoop: A,
  relatedLoop: R,
  who: W,
) =>
  loop(
    loopId,
    "eligibilityBenefits",
    `${who} Eligibility or Benefit Information`,
    [
      segment("EB", "benefit", `${who} Eligibility or Benefit Information`, { required: true, segmentClass: EB }),
      segment("HSD", "healthCareServicesDelivery", "Health Care Services Delivery", { repeating: true, max: 9 }),
      segment("REF", "additionalIdentifications", `${who} Additional Identification`, { repeating: true, max: 9 }),
      segment("DTP", "dates", `${who} Eligibility/Benefit Date`, { repeating: true, max: 20 }),
      segment("AAA", "requestValidations", `${who} Request Validation`, { repeating: true, max: 9, segmentClass: AAA }),
      segment("MSG", "messages", "Message Text", { repeating: true, max: 10 }),
      loop(additionalLoop, "additionalInformation", `${who} Eligibility or Benefit Additional Information`, [segment("III", "information", `${who} Eligibility or Benefit Additional Information`, { required: true })], {
        repeating: true,
        max: 10,
      }),
      segment("LS", "loopHeader", "Loop Header", { qualifier: [1, "2120"], segmentClass: LS }),
      loop(
        relatedLoop,
        "relatedEntities",
        `${who} Benefit Related Entity Name`,
        [
          segment("NM1", "name", `${who} Benefit Related Entity Name`, { required: true, qualifier: [1, ...BENEFIT_RELATED_ENTITIES], segmentClass: NM1 }),
          segment("N3", "address", `${who} Benefit Related Entity Address`),
          segment("N4", "cityStateZip", `${who} Benefit Related Entity City/State/ZIP Code`),
          segment("PER", "contacts", `${who} Benefit Related Entity Contact Information`, { repeating: true, max: 3 }),
          segment("PRV", "providerInformation", `${who} Benefit Related Provider Information`),
        ],
        { repeating: true, max: 23 },
      ),
      segment("LE", "loopTrailer", "Loop Trailer", { qualifier: [1, "2120"], segmentClass: LE }),
    ],
    { repeating: true },
  );

const DEPENDENT = loop(
  "2000D",
  "dependents",
  "Dependent Level",
  [
    segment("HL", "hierarchicalLevel", "Dependent Level", { required: true, qualifier: [3, "23"], segmentClass: HL }),
    segment("TRN", "traceNumbers", "Dependent Trace Number", { repeating: true, max: 3, segmentClass: TRN }),
    loop(
      "2100D",
      "dependentName",
      "Dependent Name",
      [
        segment("NM1", "name", "Dependent Name", { required: true, qualifier: [1, "03"], segmentClass: NM1 }),
        segment("REF", "additionalIdentifications", "Dependent Additional Identification", { repeating: true, max: 9 }),
        segment("N3", "address", "Dependent Address"),
        segment("N4", "cityStateZip", "Dependent City/State/ZIP Code"),
        segment("AAA", "requestValidations", "Dependent Request Validation", { repeating: true, max: 9, segmentClass: AAA }),
        segment("PRV", "providerInformation", "Provider Information"),
        segment("DMG", "demographicInformation", "Dependent Demographic Information"),
        segment("INS", "relationship", "Dependent Relationship"),
        segment("HI", "diagnosisCode", "Dependent Health Care Diagnosis Code"),
        segment("DTP", "dates", "Dependent Date", { repeating: true, max: 9 }),
        segment("MPI", "militaryPersonnelInformation", "Military Personnel Information"),
        benefitInformation("2110D", "2115D", "2120D", "Dependent"),
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
    segment("TRN", "traceNumbers", "Subscriber Trace Number", { repeating: true, max: 3, segmentClass: TRN }),
    loop(
      "2100C",
      "subscriberName",
      "Subscriber Name",
      [
        segment("NM1", "name", "Subscriber Name", { required: true, qualifier: [1, "IL"], segmentClass: NM1 }),
        segment("REF", "additionalIdentifications", "Subscriber Additional Identification", { repeating: true, max: 9 }),
        segment("N3", "address", "Subscriber Address"),
        segment("N4", "cityStateZip", "Subscriber City/State/ZIP Code"),
        segment("AAA", "requestValidations", "Subscriber Request Validation", { repeating: true, max: 9, segmentClass: AAA }),
        segment("PRV", "providerInformation", "Provider Information"),
        segment("DMG", "demographicInformation", "Subscriber Demographic Information"),
        segment("INS", "relationship", "Subscriber Relationship"),
        segment("HI", "diagnosisCode", "Subscriber Health Care Diagnosis Code"),
        segment("DTP", "dates", "Subscriber Date", { repeating: true, max: 9 }),
        segment("MPI", "militaryPersonnelInformation", "Subscriber Military Personnel Information"),
        benefitInformation("2110C", "2115C", "2120C", "Subscriber"),
      ],
      { required: true },
    ),
    DEPENDENT,
  ],
  { repeating: true },
);

/** The 271's body, between ST and SE. */
export const X271_STRUCTURE = [
  segment("BHT", "beginningOfHierarchicalTransaction", "Beginning of Hierarchical Transaction", { required: true, segmentClass: BHT }),
  loop(
    "2000A",
    "informationSources",
    "Information Source Level",
    [
      segment("HL", "hierarchicalLevel", "Information Source Level", { required: true, qualifier: [3, "20"], segmentClass: HL }),
      segment("AAA", "requestValidations", "Request Validation", { repeating: true, max: 9, segmentClass: AAA }),
      loop(
        "2100A",
        "informationSourceName",
        "Information Source Name",
        [
          segment("NM1", "name", "Information Source Name", { required: true, qualifier: [1, "2B", "36", "GP", "P5", "PR"], segmentClass: NM1 }),
          segment("PER", "contacts", "Payer Contact Information", { repeating: true, max: 3 }),
          segment("AAA", "requestValidations", "Request Validation", { repeating: true, max: 9, segmentClass: AAA }),
        ],
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
              segment("AAA", "requestValidations", "Information Receiver Request Validation", { repeating: true, max: 9, segmentClass: AAA }),
              segment("PRV", "providerInformation", "Information Receiver Provider Information"),
            ],
            { required: true },
          ),
          SUBSCRIBER,
        ],
        { repeating: true },
      ),
    ],
    { required: true, repeating: true },
  ),
] as const;

/** The 271 Eligibility, Coverage or Benefit Information of 005010X279A1. */
export const X271 = defineTransactionSet({
  transactionSet: "271",
  version: "005010X279A1",
  name: "Eligibility, Coverage or Benefit Information",
  structure: X271_STRUCTURE,
});

/** A parsed 271 body. */
export type Parsed271 = ParsedOf<typeof X271_STRUCTURE>;

/** The input of `X271.create()`. */
export type X271Input = InputOf<typeof X271_STRUCTURE>;
