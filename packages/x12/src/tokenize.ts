/**
 * The X12 syntax: reading the delimiters from the ISA segment, splitting an interchange into
 * segments and a segment into elements, components and repetitions. X12 has no escape character, so
 * a delimiter can never occur inside a value.
 *
 * @module
 */
import type { Result } from "./types/result.ts";
import { Err } from "./utils/err.ts";
import type { Delimiters } from "./types/delimiters.ts";
import { GenericSegment, type Element } from "./types/segment.ts";

const fail = (message: string): Result<never> => ({ ok: false, err: new Err(message) });

/** The number of data elements of the ISA segment. */
const ISA_ELEMENTS = 16;

/** Strips a byte order mark and leading whitespace, which some senders put before the ISA. */
export function stripLeader(input: string): string {
  return input.replace(/^\uFEFF/, "").replace(/^\s+/, "");
}

/**
 * Reads the delimiters an interchange announces in its ISA segment: the data element separator is
 * the character right after `ISA`, the repetition separator ISA11, the component element separator
 * ISA16 and the segment terminator the character right after ISA16.
 *
 * The ISA is fixed length, but the elements are counted rather than the offsets trusted, so an ISA
 * whose elements are not padded to their widths still reads. In version 00401 and earlier ISA11 is
 * the Interchange Control Standards Identifier (`U`), not a separator: the repetition separator is
 * then `""` (none).
 */
export function readDelimiters(input: string): Result<Delimiters> {
  const text = stripLeader(input);
  if (!text.startsWith("ISA")) return fail("An X12 interchange must start with an ISA segment");
  const element = text[3];
  if (!element || /[A-Za-z0-9 ]/.test(element)) return fail("The ISA segment has no data element separator after 'ISA'");

  // Position of the separator before each element: ISA16 follows the 16th separator.
  let pos = 3;
  for (let i = 1; i < ISA_ELEMENTS; i++) {
    pos = text.indexOf(element, pos + 1);
    if (pos < 0) return fail(`The ISA segment ends before ISA${String(i + 1).padStart(2, "0")}`);
  }
  const component = text[pos + 1];
  const segment = text[pos + 2];
  if (component === undefined || segment === undefined) return fail("The ISA segment ends before its segment terminator");

  const isa = text.substring(0, pos + 2).split(element);
  const isa11 = isa[11] ?? "";
  const version = (isa[12] ?? "").trim();
  const repetition = isa11 === "U" && version <= "00401" ? "" : isa11;

  const delimiters = { element, repetition, component, segment };
  const seen = new Set<string>();
  for (const [name, value] of Object.entries(delimiters)) {
    if (value === "") continue;
    if (seen.has(value)) return fail(`The ISA segment uses '${value}' for more than one delimiter (${name})`);
    seen.add(value);
  }
  return { ok: true, val: delimiters };
}

/**
 * Splits an interchange into its segment strings. Line breaks around a segment terminator, which
 * many senders add for readability, are dropped, as are empty segments.
 */
export function splitSegments(input: string, delimiters: Delimiters): string[] {
  return stripLeader(input)
    .split(delimiters.segment)
    .map((s) => s.replace(/^[\r\n]+|[\r\n]+$/g, ""))
    .filter((s) => s !== "");
}

/** Splits one element string into its repetitions and components. */
export function parseElement(raw: string, delimiters: Delimiters): Element {
  const reps = delimiters.repetition ? raw.split(delimiters.repetition) : [raw];
  const [first, ...rest] = reps.map((r) => ({ components: r.split(delimiters.component) }));
  return rest.length > 0 ? { components: first.components, repetitions: rest } : first;
}

/**
 * Parses one segment string. The ISA segment's elements are kept whole: ISA11 and ISA16 hold the
 * repetition and component separators themselves.
 */
export function parseSegment(raw: string, delimiters: Delimiters): GenericSegment {
  const [id, ...values] = raw.split(delimiters.element);
  const elements = id === "ISA" ? values.map((v) => ({ components: [v] })) : values.map((v) => parseElement(v, delimiters));
  return new GenericSegment(id, elements);
}

/** Reads the delimiters and splits an interchange into parsed segments. */
export function tokenize(input: string): Result<{ delimiters: Delimiters; segments: GenericSegment[] }> {
  const delimiters = readDelimiters(input);
  if (!delimiters.ok) return delimiters;
  const segments = splitSegments(input, delimiters.val).map((s) => parseSegment(s, delimiters.val));
  return { ok: true, val: { delimiters: delimiters.val, segments } };
}
