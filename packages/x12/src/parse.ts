/**
 * The X12 parser, in its own entry point `@campfhir/x12/parse`.
 *
 * `parse()` reads the delimiters from the ISA, splits the interchange into segments and groups them
 * into its envelopes: `ISA [TA1…] { GS { ST … SE } GE } IEA`. It is asynchronous, like
 * `@campfhir/hl7/parse`: typed transaction sets are dispatched on ST01 and the implementation guide
 * (ST03, or GS08) as HL7 messages are on MSH-9 and MSH-12, and a guide's module loads the first time
 * one of its transaction sets is parsed:
 *
 * ```ts
 * import { parse } from "@campfhir/x12/parse";
 *
 * const result = await parse(raw);
 * if (!result.ok) throw new Error(result.err.message);
 * for (const group of result.val.functionalGroups) {
 *   for (const set of group.transactionSets) {
 *     if (set.parsed?.ok && set.parsed.val.transactionSet === "271") {
 *       set.parsed.val.value.informationSources[0].informationReceivers[0].subscribers[0]; // 2000C, typed
 *     }
 *   }
 * }
 * ```
 *
 * @module
 */
import type { Result } from "./types/result.ts";
import { Err } from "./utils/err.ts";
import { tokenize } from "./tokenize.ts";
import type { GenericSegment } from "./types/segment.ts";
import { ISA } from "./envelope/ISA.ts";
import { GS } from "./envelope/GS.ts";
import { ST } from "./envelope/ST.ts";
import { GE, IEA, SE } from "./envelope/trailers.ts";
import type { ParsedFunctionalGroup, ParsedInterchange, ParsedTransactionSet } from "./interchange.ts";
import { selectTransactionSet, type TypedX12TransactionSet } from "./dispatch.ts";

export type { ParsedFunctionalGroup, ParsedInterchange, ParsedTransactionSet } from "./interchange.ts";
export { selectTransactionSet, SUPPORTED_GUIDES, type TypedX12TransactionSet } from "./dispatch.ts";

const fail = (message: string): Result<never> => ({ ok: false, err: new Err(message) });

type Open<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Parses one X12 interchange into its envelopes.
 *
 * Fails for an input that does not start with a readable ISA, a GS or ST outside the envelope that
 * holds it, a trailer without its header, an interchange that ends before SE, GE or IEA, a segment
 * after IEA, and a segment outside any transaction set. Trailer counts (SE01, GE01, IEA01), control
 * numbers that do not match their header (SE02, GE02, IEA02) and an ST03 other than GS08 are
 * reported in `warnings`, not as failures.
 */
export function parseInterchange(input: string): Result<ParsedInterchange> {
  const tokens = tokenize(input);
  if (!tokens.ok) return tokens;
  const { delimiters, segments } = tokens.val;

  const header = new ISA(segments[0].elements);
  const acknowledgments: GenericSegment[] = [];
  const functionalGroups: ParsedFunctionalGroup[] = [];
  const warnings: string[] = [];
  let group: Open<ParsedFunctionalGroup, "trailer"> | undefined;
  let set: Open<ParsedTransactionSet, "trailer"> | undefined;
  let trailer: IEA | undefined;

  const at = (i: number) => `at segment ${i + 1}`;
  const check = (expected: number, actual: string, what: string) => {
    if (actual !== "" && Number(actual) !== expected) warnings.push(`${what} counts ${actual}, the interchange holds ${expected}`);
  };
  const same = (header: string, trailer: string, what: string) => {
    if (header.trim() !== trailer.trim()) warnings.push(`${what} is '${trailer}', its header's is '${header}'`);
  };

  for (let i = 1; i < segments.length; i++) {
    const segment = segments[i];
    if (trailer) return fail(`${segment.id} segment ${at(i)} follows the IEA segment (one interchange per input)`);

    if (set) {
      if (segment.id !== "SE") {
        if (segment.id === "ST" || segment.id === "GE" || segment.id === "IEA" || segment.id === "ISA") {
          return fail(`${segment.id} segment ${at(i)}: transaction set ${set.header.getControlNumber()} has no SE segment`);
        }
        set.segments.push(segment);
        continue;
      }
      const se = new SE(segment.elements);
      check(set.segments.length + 2, se.getSegmentCount(), `SE01 of transaction set ${set.header.getControlNumber()} (${at(i)})`);
      same(set.header.getControlNumber(), se.getControlNumber(), `SE02 ${at(i)}`);
      group!.transactionSets.push({ ...set, trailer: se });
      set = undefined;
      continue;
    }

    switch (segment.id) {
      case "TA1":
        if (group || functionalGroups.length > 0) return fail(`TA1 segment ${at(i)} must come before the first GS segment`);
        acknowledgments.push(segment);
        break;
      case "GS":
        if (group) return fail(`GS segment ${at(i)}: functional group ${group.header.getControlNumber()} has no GE segment`);
        group = { header: new GS(segment.elements), transactionSets: [] };
        break;
      case "ST": {
        if (!group) return fail(`ST segment ${at(i)} is outside of any functional group (expected GS first)`);
        const st = new ST(segment.elements);
        const reference = st.getImplementationConventionReference();
        if (reference && reference !== group.header.getVersion()) {
          warnings.push(`ST03 ${at(i)} is '${reference}', GS08 of its group is '${group.header.getVersion()}'`);
        }
        set = { header: st, segments: [] };
        break;
      }
      case "GE": {
        if (!group) return fail(`GE segment ${at(i)} has no GS segment`);
        const ge = new GE(segment.elements);
        check(group.transactionSets.length, ge.getTransactionSetCount(), `GE01 of functional group ${group.header.getControlNumber()} (${at(i)})`);
        same(group.header.getControlNumber(), ge.getControlNumber(), `GE02 ${at(i)}`);
        functionalGroups.push({ ...group, trailer: ge });
        group = undefined;
        break;
      }
      case "IEA":
        if (group) return fail(`IEA segment ${at(i)}: functional group ${group.header.getControlNumber()} has no GE segment`);
        trailer = new IEA(segment.elements);
        check(functionalGroups.length, trailer.getFunctionalGroupCount(), `IEA01 (${at(i)})`);
        same(header.getControlNumber(), trailer.getControlNumber(), `IEA02 ${at(i)}`);
        break;
      case "SE":
        return fail(`SE segment ${at(i)} has no ST segment`);
      default:
        return fail(`${segment.id} segment ${at(i)} is outside of any transaction set (expected ST, GS, GE or IEA)`);
    }
  }

  if (set) return fail(`The interchange ends before the SE segment of transaction set ${set.header.getControlNumber()}`);
  if (group) return fail(`The interchange ends before the GE segment of functional group ${group.header.getControlNumber()}`);
  if (!trailer) return fail("The interchange ends before its IEA segment");
  return { ok: true, val: { delimiters, header, acknowledgments, functionalGroups, trailer, warnings } };
}

/** Options of `parse()`. */
export interface ParseOptions {
  /** Parse each transaction set against its implementation guide (`parsed`). Default true. */
  typed?: boolean;
}

/**
 * Parses an X12 interchange (see {@link parseInterchange}), then every transaction set of an
 * implementation guide this release types (`SUPPORTED_GUIDES`) against that guide: its `parsed` holds
 * the typed body, or the error that says where it departs from the guide. A transaction set that
 * does not fit its guide does not fail the interchange.
 */
export async function parse(input: string, options: ParseOptions = {}): Promise<Result<ParsedInterchange>> {
  const result = parseInterchange(input);
  if (!result.ok || options.typed === false) return result;
  for (const group of result.val.functionalGroups) {
    for (const set of group.transactionSets) {
      const guide = set.header.getImplementationConventionReference() || group.header.getVersion();
      const definition = await selectTransactionSet(set.header.getTransactionSetIdentifierCode(), guide);
      if (definition) set.parsed = definition.parse(set) as Result<TypedX12TransactionSet>;
    }
  }
  return result;
}
