/**
 * 999 Implementation Acknowledgment, 005010X231A1: its structure, parser and builder.
 *
 * ```
 * ST AK1
 * { AK2                                   2000  transaction set response
 *     { IK3 [CTX segment] [CTX business]  2100  error identification
 *         { IK4 [CTX element] }           2110  data element note
 *     }
 *   IK5
 * }
 * AK9 SE
 * ```
 *
 * Order and usage from the Indiana and Wisconsin Medicaid 999 guides and X12's 999 example; the
 * guide's maximum uses and loop repeats are not in any public source, so none are enforced. The
 * structure of 005010X231 (before the errata) is the same. See
 * `docs/validation/005010X231A1-ledger.md`.
 *
 * @module
 */
import { loop, segment, type InputOf, type ParsedOf } from "../types/schema.ts";
import { defineTransactionSet } from "../types/transaction.ts";
import { AK1, AK2, AK9, CTX, IK3, IK4, IK5 } from "./segments.ts";

/** CTX01-1 of a Segment Context or Element Context. */
const SITUATIONAL_TRIGGER = "SITUATIONAL TRIGGER";

/** CTX01-1 of a Business Unit Identifier, by the acknowledged transaction set (Wisconsin's list). */
export const BUSINESS_UNIT_IDENTIFIERS = ["TRN02", "NM109", "PATIENT NAME NM109", "SUBSCRIBER NAME NM109", "ENT01", "SUBSCRIBER NUMBER REF02", "CLM01"] as const;

/** The 999's body, between ST and SE. */
export const X999_STRUCTURE = [
  segment("AK1", "functionalGroupResponseHeader", "Functional Group Response Header", { required: true, segmentClass: AK1 }),
  loop(
    "2000",
    "transactionSetResponses",
    "Transaction Set Response Header",
    [
      segment("AK2", "transactionSetResponseHeader", "Transaction Set Response Header", { required: true, segmentClass: AK2 }),
      loop(
        "2100",
        "errors",
        "Error Identification",
        [
          segment("IK3", "errorIdentification", "Error Identification", { required: true, segmentClass: IK3 }),
          segment("CTX", "segmentContext", "Segment Context", { qualifier: [1, SITUATIONAL_TRIGGER], segmentClass: CTX }),
          segment("CTX", "businessUnitIdentifier", "Business Unit Identifier", { qualifier: [1, ...BUSINESS_UNIT_IDENTIFIERS], segmentClass: CTX }),
          loop(
            "2110",
            "elementNotes",
            "Implementation Data Element Note",
            [
              segment("IK4", "dataElementNote", "Implementation Data Element Note", { required: true, segmentClass: IK4 }),
              segment("CTX", "elementContext", "Element Context", { qualifier: [1, SITUATIONAL_TRIGGER], segmentClass: CTX }),
            ],
            { repeating: true },
          ),
        ],
        { repeating: true },
      ),
      segment("IK5", "transactionSetResponseTrailer", "Transaction Set Response Trailer", { required: true, segmentClass: IK5 }),
    ],
    { repeating: true },
  ),
  segment("AK9", "functionalGroupResponseTrailer", "Functional Group Response Trailer", { required: true, segmentClass: AK9 }),
] as const;

/** The 999 Implementation Acknowledgment of 005010X231A1. */
export const X999 = defineTransactionSet({
  transactionSet: "999",
  version: "005010X231A1",
  name: "Implementation Acknowledgment",
  structure: X999_STRUCTURE,
});

/** A parsed 999 body. */
export type Parsed999 = ParsedOf<typeof X999_STRUCTURE>;

/** The input of `X999.create()`. */
export type X999Input = InputOf<typeof X999_STRUCTURE>;
