/**
 * The ASAP syntax: reading the delimiters from the TH segment and splitting a report into segments
 * and a segment into elements.
 *
 * Two state guides (Nebraska, Maryland) name the caret `^` as ASAP's escape character; no other
 * source does, so it is not applied here (see `docs/validation/asap-ledger.md`, section 6).
 *
 * @module
 */
import type { Result } from "./types/result.ts";
import { Err } from "./utils/err.ts";
import type { Delimiters } from "./types/delimiters.ts";
import { GenericSegment } from "./types/segment.ts";

const fail = (message: string): Result<never> => ({ ok: false, err: new Err(message) });

/** TH09, the segment terminator, is the TH segment's last element. */
const TH_ELEMENTS = 9;

/** Strips a byte order mark and leading whitespace, which some senders put before the TH. */
export function stripLeader(input: string): string {
  return input.replace(/^\uFEFF/, "").replace(/^\s+/, "");
}

/** Where the TH segment's TH09 is, with the delimiters it announces. */
function readHeader(text: string): Result<{ delimiters: Delimiters; th09: number }> {
  if (!text.startsWith("TH")) return fail("An ASAP report must start with a TH segment");
  const element = text[2];
  if (!element || /[A-Za-z0-9 ]/.test(element)) return fail("The TH segment has no data element separator after 'TH'");
  let pos = 2;
  for (let i = 1; i < TH_ELEMENTS; i++) {
    pos = text.indexOf(element, pos + 1);
    if (pos < 0) return fail(`The TH segment ends before TH${String(i + 1).padStart(2, "0")}`);
  }
  const segment = text[pos + 1];
  if (segment === undefined || segment === "") return fail("The TH segment has no segment terminator in TH09");
  if (segment === element) return fail("TH09 names the data element separator as the segment terminator");
  if (text[pos + 2] !== segment) {
    return fail(`The TH segment must end with its segment terminator twice (TH09 '${segment}', then the terminator itself)`);
  }
  return { ok: true, val: { delimiters: { element, segment }, th09: pos + 1 } };
}

/**
 * Reads the delimiters a report announces in its TH segment: the data element separator is the
 * character right after `TH`, the segment terminator TH09.
 */
export function readDelimiters(input: string): Result<Delimiters> {
  const header = readHeader(stripLeader(input));
  return header.ok ? { ok: true, val: header.val.delimiters } : header;
}

/** Parses one segment string. */
export function parseSegment(raw: string, delimiters: Delimiters): GenericSegment {
  const [id, ...elements] = raw.split(delimiters.element);
  return new GenericSegment(id, elements);
}

/**
 * Reads the delimiters and splits a report into parsed segments. Line breaks around a segment
 * terminator are dropped, as are empty segments. The TH segment's TH09 holds the terminator itself.
 */
export function tokenize(input: string): Result<{ delimiters: Delimiters; segments: GenericSegment[] }> {
  const text = stripLeader(input);
  const header = readHeader(text);
  if (!header.ok) return header;
  const { delimiters, th09 } = header.val;
  const th = parseSegment(text.substring(0, th09 + 1), delimiters);
  const rest = text
    .substring(th09 + 2)
    .split(delimiters.segment)
    .map((s) => s.replace(/^[\r\n]+|[\r\n]+$/g, ""))
    .filter((s) => s !== "")
    .map((s) => parseSegment(s, delimiters));
  return { ok: true, val: { delimiters, segments: [th, ...rest] } };
}
