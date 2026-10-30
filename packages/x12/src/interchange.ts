/**
 * The X12 envelopes, `ISA [TA1…] { GS { ST … SE } GE } IEA`, as data: what `parse()` returns and
 * what `encodeInterchange()` writes.
 *
 * A transaction set's body is its list of segments; `parse()` adds the body parsed against its
 * implementation guide (`parsed`) for the transaction sets it types.
 *
 * @module
 */
import { DEFAULT_DELIMITERS, type Delimiters } from "./types/delimiters.ts";
import type { GenericSegment, Segment } from "./types/segment.ts";
import type { ISA } from "./envelope/ISA.ts";
import type { GS } from "./envelope/GS.ts";
import type { ST } from "./envelope/ST.ts";
import { GE, IEA, SE } from "./envelope/trailers.ts";
import type { Result } from "./types/result.ts";
import type { TypedX12TransactionSet } from "./dispatch.ts";

/** A parsed transaction set: ST, the segments between ST and SE, and SE. */
export interface ParsedTransactionSet {
  /** ST. */
  header: ST;
  /** The segments between ST and SE, in order. */
  segments: GenericSegment[];
  /** SE. */
  trailer: SE;
  /**
   * The body parsed against its implementation guide (ST03, or GS08), when `parse()` types that
   * transaction set: its loops and segments, or why it does not fit the guide. Absent for a
   * transaction set this release does not type, and from `parseInterchange()`.
   */
  parsed?: Result<TypedX12TransactionSet>;
}

/** A parsed functional group: GS, its transaction sets, and GE. */
export interface ParsedFunctionalGroup {
  /** GS. */
  header: GS;
  /** The transaction sets of the group, in order. */
  transactionSets: ParsedTransactionSet[];
  /** GE. */
  trailer: GE;
}

/** A parsed interchange. */
export interface ParsedInterchange {
  /** The delimiters the interchange announced in its ISA. */
  delimiters: Delimiters;
  /** ISA. */
  header: ISA;
  /** TA1 interchange acknowledgments between ISA and the first GS. */
  acknowledgments: GenericSegment[];
  /** The functional groups, in order. */
  functionalGroups: ParsedFunctionalGroup[];
  /** IEA. */
  trailer: IEA;
  /** Counts and control numbers in the trailers that disagree with what the interchange holds. */
  warnings: string[];
}

/** A transaction set to encode. SE is computed when left out. */
export interface TransactionSetInput {
  /** ST. */
  header: ST;
  /** The segments between ST and SE. */
  segments: readonly Segment[];
  /** SE; computed from the segments and ST02 when left out. */
  trailer?: SE;
}

/** A functional group to encode. GE is computed when left out. */
export interface FunctionalGroupInput {
  /** GS. */
  header: GS;
  /** The transaction sets of the group. */
  transactionSets: readonly TransactionSetInput[];
  /** GE; computed from the transaction sets and GS06 when left out. */
  trailer?: GE;
}

/** An interchange to encode. IEA is computed when left out. */
export interface InterchangeInput {
  /** ISA. */
  header: ISA;
  /** TA1 interchange acknowledgments. */
  acknowledgments?: readonly Segment[];
  /** The functional groups. */
  functionalGroups: readonly FunctionalGroupInput[];
  /** IEA; computed from the groups and ISA13 when left out. */
  trailer?: IEA;
}

/** Options of `encodeInterchange()`. */
export interface EncodeInterchangeOptions {
  /** The delimiters to write with, and announce in ISA11 and ISA16. Default `* ^ : ~`. */
  delimiters?: Delimiters;
  /** A line break written after each segment terminator, for readability. Default none. */
  lineBreak?: "" | "\n" | "\r\n";
}

/** SE for a transaction set: SE01 counts the body and ST and SE, SE02 is ST02. */
export function transactionSetTrailer(set: TransactionSetInput): SE {
  return new SE().numberOfIncludedSegments(set.segments.length + 2).transactionSetControlNumber(set.header.getControlNumber());
}

/** GE for a functional group: GE01 counts its transaction sets, GE02 is GS06. */
export function functionalGroupTrailer(group: FunctionalGroupInput): GE {
  return new GE().numberOfTransactionSetsIncluded(group.transactionSets.length).groupControlNumber(group.header.getControlNumber());
}

/** IEA for an interchange: IEA01 counts its functional groups, IEA02 is ISA13. */
export function interchangeTrailer(interchange: InterchangeInput): IEA {
  return new IEA()
    .numberOfIncludedFunctionalGroups(interchange.functionalGroups.length)
    .interchangeControlNumber(interchange.header.getControlNumber());
}

/**
 * Writes an interchange out, every envelope in order. A trailer left out is computed (counts and
 * the header's control number); a trailer given is written as it is.
 */
export function encodeInterchange(interchange: InterchangeInput, options: EncodeInterchangeOptions = {}): string {
  const delimiters = options.delimiters ?? DEFAULT_DELIMITERS;
  const segments: Segment[] = [interchange.header, ...(interchange.acknowledgments ?? [])];
  for (const group of interchange.functionalGroups) {
    segments.push(group.header);
    for (const set of group.transactionSets) {
      segments.push(set.header, ...set.segments, set.trailer ?? transactionSetTrailer(set));
    }
    segments.push(group.trailer ?? functionalGroupTrailer(group));
  }
  segments.push(interchange.trailer ?? interchangeTrailer(interchange));
  const end = delimiters.segment + (options.lineBreak ?? "");
  return segments.map((s) => s.encode(delimiters) + end).join("");
}

