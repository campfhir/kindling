/**
 * `acknowledge()`: the 999 for a parsed interchange, one per functional group (X12 RFI 2086: one 999
 * answers one functional group).
 *
 * What it reports is what `parse()` checks: the envelope (SE01, SE02, GE01, GE02) and, for a
 * transaction set whose implementation guide this release types, the guide's loops and segments.
 * Element-level checks (IK4) are not made. The mapping from those checks to the 999's codes is this
 * library's choice, not something the public sources prescribe:
 *
 * | Found | 999 |
 * |---|---|
 * | A required segment or loop missing | IK3 with IK304 `3` (Required segment missing), IK5 `R` with IK502 `5` |
 * | A segment where the guide allows none | IK3 with IK304 `2` (Unexpected segment), IK5 `R` with IK502 `5` |
 * | SE02 other than ST02 | IK5 `R` with IK502 `3` |
 * | SE01 other than the segment count | IK5 `R` with IK502 `4` |
 * | GE02 other than GS06 | AK905 `4` |
 * | GE01 other than the transaction set count | AK905 `5` |
 *
 * AK901 is `A` when every transaction set is accepted and the group has no error, `E` when they are
 * all accepted but the group has one, `R` when none is accepted, and `P` otherwise.
 *
 * @module
 */
import type { ParsedFunctionalGroup, ParsedInterchange, ParsedTransactionSet, TransactionSetInput } from "../interchange.ts";
import type { StructureErrorMeta } from "../types/structure.ts";
import { X999, type X999Input } from "./999.ts";
import { AK1, AK2, AK9, IK3, IK5 } from "./segments.ts";

/** Options of `acknowledge()`. */
export interface AcknowledgeOptions {
  /** ST02 of the first 999, at least four characters; each further 999 adds one. Default `0001`. */
  controlNumber?: string | number;
}

type Response = NonNullable<X999Input["transactionSetResponses"]>[number];

function respond(set: ParsedTransactionSet): { response: Response; accepted: boolean } {
  const header = new AK2().transactionSetIdentifierCode(set.header.getTransactionSetIdentifierCode()).transactionSetControlNumber(set.header.getControlNumber());
  const reference = set.header.getImplementationConventionReference();
  if (reference) header.implementationConventionReference(reference);

  const codes: string[] = [];
  const errors: NonNullable<Response["errors"]>[number][] = [];
  if (set.parsed && !set.parsed.ok) {
    const meta = set.parsed.err.meta as StructureErrorMeta | undefined;
    if (meta) {
      const ik3 = new IK3()
        .segmentIdCode(meta.segment)
        .segmentPositionInTransactionSet(meta.segmentPosition)
        .segmentSyntaxErrorCode(meta.problem === "missing" ? "3" : "2");
      if (meta.loop) ik3.loopIdentifierCode(meta.loop);
      errors.push({ errorIdentification: ik3 });
    }
    codes.push("5");
  }
  if (set.trailer.getControlNumber().trim() !== set.header.getControlNumber().trim()) codes.push("3");
  if (Number(set.trailer.getSegmentCount()) !== set.segments.length + 2) codes.push("4");

  const accepted = codes.length === 0;
  const trailer = new IK5().transactionSetAcknowledgmentCode(accepted ? "A" : "R").syntaxErrorCodes(...codes);
  return { response: { transactionSetResponseHeader: header, errors, transactionSetResponseTrailer: trailer }, accepted };
}

function acknowledgeGroup(group: ParsedFunctionalGroup): X999Input {
  const responses = group.transactionSets.map(respond);
  const accepted = responses.filter((r) => r.accepted).length;
  const groupCodes: string[] = [];
  if (group.trailer.getControlNumber().trim() !== group.header.getControlNumber().trim()) groupCodes.push("4");
  if (Number(group.trailer.getTransactionSetCount()) !== group.transactionSets.length) groupCodes.push("5");

  const all = accepted === responses.length;
  const code = all ? (groupCodes.length > 0 ? "E" : "A") : accepted === 0 ? "R" : "P";
  return {
    functionalGroupResponseHeader: new AK1()
      .functionalIdentifierCode(group.header.getFunctionalIdentifierCode())
      .groupControlNumber(group.header.getControlNumber())
      .versionReleaseIndustryIdentifierCode(group.header.getVersion()),
    transactionSetResponses: responses.map((r) => r.response),
    functionalGroupResponseTrailer: new AK9()
      .functionalGroupAcknowledgeCode(code)
      .numberOfTransactionSetsIncluded(group.trailer.getTransactionSetCount() || group.transactionSets.length)
      .numberOfReceivedTransactionSets(group.transactionSets.length)
      .numberOfAcceptedTransactionSets(accepted)
      .syntaxErrorCodes(...groupCodes),
  };
}

/**
 * The 999s for an interchange parsed by `parse()`, one per functional group, ready to go in a
 * functional group with GS01 `FA` and GS08 `005010X231A1`.
 */
export function acknowledge(interchange: ParsedInterchange, options: AcknowledgeOptions = {}): TransactionSetInput[] {
  const first = String(options.controlNumber ?? "1");
  return interchange.functionalGroups.map((group, i) => {
    const controlNumber = String(Number(first) + i).padStart(Math.max(4, first.length), "0");
    return X999.create(controlNumber, acknowledgeGroup(group));
  });
}
