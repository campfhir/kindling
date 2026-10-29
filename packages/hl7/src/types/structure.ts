/**
 * Structure-driven parsing, validation and encoding of HL7 messages.
 *
 * A message's structure (the ordered list of segments, choices and groups from the standard's
 * message table) is data, and the generated parsers and builders hand it to the three functions
 * here together with the segment classes of their version:
 *
 * - {@link parseStructure} walks the raw segments of a message against the structure, like a
 *   recursive-descent parser: each item consumes what it can, in order, and a repeating group
 *   starts a new instance whenever the next segment can begin one. Required items that are
 *   missing, and known segments that appear where the structure does not allow them, are
 *   errors; segments the structure never mentions (Z segments) are skipped with a warning.
 * - {@link verifyStructure} checks a builder's input object against the structure.
 * - {@link encodeStructure} writes a builder's input object out in structure order.
 *
 * @module
 */
import { Err } from "../utils/err.ts";
import type { Result } from "./result.ts";
import type { EncodingCharacters } from "./encoding.ts";
import type { Segment } from "./segment.ts";
import { HL7Message } from "./message.ts";
import {
  type SegmentGroup,
  type StructureItem,
  firstSegments,
  isRequired,
  isSegmentChoice,
  isSegmentGroup,
  itemField,
  segmentNames,
} from "./schema.ts";
import { readMessageHeader, segmentParseFailure } from "../utils/messageParsing.ts";
import type { MSH } from "../v2.3/MSH.ts";

/** Parses one raw segment string (not MSH) into a segment of the right class. */
export type SegmentParser = (segmentString: string, encoding: EncodingCharacters) => Result<Segment>;

/** The segment parsers of a message: `MSH` parses the header, every other entry a segment type. */
export interface SegmentParsers {
  MSH: (segmentString: string) => Result<MSH>;
  [segment: string]: ((s: string, e: EncodingCharacters) => Result<Segment>) | ((s: string) => Result<MSH>);
}

/** The parsed value of a group instance (or of the whole message), keyed by item field name. */
export type StructureValue = Record<string, unknown>;

/** What every parsed message carries besides its structure fields. */
export interface ParsedMessageBase {
  /** All segments in wire order. */
  message: HL7Message;
  /** The message header (MSH). */
  header: MSH;
}

/** "an MSH segment", "a PID segment": segment names are spelled out letter by letter. */
const article = (name: string) => (/^[AEFHILMNORSX]/.test(name) ? "an" : "a");

/** Describes what a missing required item is, for error messages. */
function describeMissing(messageName: string, item: StructureItem): string {
  if (isSegmentChoice(item)) return `${messageName} message must contain one of ${item.oneOf.join(", ")}`;
  if (isSegmentGroup(item)) {
    return `${messageName} message must contain at least one ${firstSegments(item).join("/")} segment`;
  }
  return item.repeating
    ? `${messageName} message must contain at least one ${item.name} segment`
    : `${messageName} message must contain ${article(item.name)} ${item.name} segment`;
}

/**
 * Parses `messageString` against `structure` (whose first item is MSH) using `parsers`.
 * The result holds `message`, `header` (MSH) and one property per structure item (see `itemField`).
 */
export function parseStructure<T extends ParsedMessageBase = ParsedMessageBase & StructureValue>(
  messageName: string,
  structure: StructureItem[],
  parsers: SegmentParsers,
  messageString: string,
): Result<T> {
  try {
    const header = readMessageHeader(messageString, (s) => parsers.MSH(s));
    if (!header.ok || !header.val) return header as Result<never>;
    const { segments, msh, encoding, message } = header.val;
    const known = new Set(segmentNames(structure));
    const items = structure.filter((item) => isSegmentChoice(item) || isSegmentGroup(item) || item.name !== "MSH");

    let pos = 1;
    let failure: Result<never> | undefined;

    // The name of the next known segment, skipping the ones the structure never mentions.
    const peek = (): string | undefined => {
      while (pos < segments.length) {
        const name = segments[pos].substring(0, 3);
        if (known.has(name)) return name;
        console.warn(`Skipping unsupported segment type '${name}' at line ${pos + 1}`);
        pos++;
      }
      return undefined;
    };
    const consume = (name: string): Segment | undefined => {
      const parser = parsers[name] as SegmentParser | undefined;
      if (!parser) {
        failure = { ok: false, err: new Err(`No parser registered for ${name} segments`) } as Result<never>;
        return undefined;
      }
      const r = parser(segments[pos], encoding);
      if (!r.ok || !r.val) {
        failure = segmentParseFailure(name, pos + 1, r) as Result<never>;
        return undefined;
      }
      pos++;
      message.addSegment(r.val);
      return r.val;
    };

    // Repeating items are always arrays in a parsed result, even inside an absent inline group.
    const emptyLists = (list: StructureItem[], out: StructureValue) => {
      for (const item of list) {
        if (isSegmentGroup(item) && item.inline) emptyLists(item.segments, out);
        else if (!isSegmentChoice(item) && item.repeating) out[itemField(item)] = [];
      }
    };

    // Parses one sequence of items into `out`; returns false when a required item is missing.
    // `outer` names the segments the enclosing groups could take next instead (another instance
    // of a repeating group, or the start of a sibling that follows it).
    const parseSequence = (list: StructureItem[], out: StructureValue, outer: ReadonlySet<string> = NO_SEGMENTS): boolean => {
      for (const item of list) {
        if (failure) return false;
        const field = itemField(item);
        if (isSegmentChoice(item)) {
          const next = peek();
          if (next && item.oneOf.includes(next)) {
            const seg = consume(next);
            if (!seg) return false;
            out[field] = seg;
          } else if (item.required) {
            failure = { ok: false, err: new Err(describeMissing(messageName, item)) } as Result<never>;
            return false;
          }
          continue;
        }
        if (isSegmentGroup(item) && item.inline) {
          const next = peek();
          if (next && firstSegments(item).includes(next)) {
            if (!parseSequence(item.segments, out, outer)) return false;
          } else if (!isRequired(item)) {
            emptyLists(item.segments, out);
          } else {
            failure = { ok: false, err: new Err(describeMissing(messageName, item)) } as Result<never>;
            return false;
          }
          continue;
        }
        if (isSegmentGroup(item)) {
          const starts = new Set(firstSegments(item));
          const siblings = list.slice(list.indexOf(item) + 1);
          const instances: StructureValue[] = [];
          const min = item.required ? (item.minOccurrences ?? 1) : (item.minOccurrences ?? 0);
          while (instances.length < (item.repeating ? (item.maxOccurrences ?? Infinity) : 1)) {
            const next = peek();
            if (!next || !starts.has(next)) break;
            const instance: StructureValue = {};
            // What the enclosing groups could take after this instance: another instance of this
            // group, a sibling up to the first required one, and whatever `outer` already names.
            const inner = new Set(outer);
            if (item.repeating && instances.length + 1 < (item.maxOccurrences ?? Infinity)) for (const s of starts) inner.add(s);
            for (const s of openers(siblings)) inner.add(s);
            // A segment that also opens a later sibling (ORC opens both the diet and the tray orders
            // of OMD^O01; PSH opens the PRODUCT group of SUR^P09 and follows it) is parsed
            // speculatively once this group's minimum is met: when the instance fails, or stops at a
            // segment that only the inside of a sibling can take, it is handed over to the sibling.
            // The same goes for a segment an enclosing group could take (the ORC of a new ORDER of
            // OMG^O19 also opens the optional PRIOR_RESULT group inside the previous order): a
            // failed instance is undone and left to the enclosing group.
            const rivals = instances.length >= min ? rivalItems(siblings, next) : [];
            if (rivals.length > 0 || (instances.length >= min && outer.has(next))) {
              const snapshot = { pos, count: message.segments.length };
              const ok = parseSequence(item.segments, instance, inner);
              const after = ok && !failure ? peek() : undefined;
              const rivalNames = new Set(segmentNames(rivals));
              const rivalStarts = new Set(rivals.flatMap(firstSegments));
              if (!ok || failure || (after !== undefined && !starts.has(after) && rivalNames.has(after) && !rivalStarts.has(after))) {
                pos = snapshot.pos;
                message.segments.splice(snapshot.count);
                failure = undefined;
                break;
              }
              instances.push(instance);
              continue;
            }
            if (!parseSequence(item.segments, instance, inner)) return false;
            instances.push(instance);
          }
          if (instances.length < min && isRequired(item)) {
            failure = { ok: false, err: new Err(min > 1 ? `${messageName} message must contain at least ${min} ${item.name} groups` : describeMissing(messageName, item)) } as Result<never>;
            return false;
          }
          if (item.repeating) out[field] = instances;
          else out[field] = instances[0];
          continue;
        }
        if (item.repeating) {
          const list2: Segment[] = [];
          while (list2.length < (item.maxOccurrences ?? Infinity) && peek() === item.name) {
            const seg = consume(item.name);
            if (!seg) return false;
            list2.push(seg);
          }
          const min = item.required ? (item.minOccurrences ?? 1) : (item.minOccurrences ?? 0);
          if (list2.length < min) {
            failure = { ok: false, err: new Err(min > 1 ? `${messageName} message must contain at least ${min} ${item.name} segments` : describeMissing(messageName, item)) } as Result<never>;
            return false;
          }
          out[field] = list2;
        } else if (peek() === item.name) {
          const seg = consume(item.name);
          if (!seg) return false;
          out[field] = seg;
        } else if (item.required) {
          failure = { ok: false, err: new Err(describeMissing(messageName, item)) } as Result<never>;
          return false;
        }
      }
      return true;
    };

    const value: StructureValue = {};
    const ok = parseSequence(items, value);
    if (failure) return failure;
    if (!ok) return { ok: false, err: new Err(`Failed to parse ${messageName} message`) };
    const leftover = peek();
    if (leftover) {
      return { ok: false, err: new Err(`${leftover} segment at line ${pos + 1} is not allowed at this position in ${messageName}`) };
    }
    return { ok: true, val: { message, header: msh, ...value } } as unknown as Result<T>;
  } catch (error) {
    return { ok: false, err: new Err(`Failed to parse ${messageName} message: ${error}`) };
  }
}

const NO_SEGMENTS: ReadonlySet<string> = new Set();

/** The segments that open any of `siblings`, up to and including the first required one. */
function openers(siblings: StructureItem[]): string[] {
  const out: string[] = [];
  for (const sibling of siblings) {
    out.push(...firstSegments(sibling));
    if (isRequired(sibling)) break;
  }
  return out;
}

/** The siblings (groups or segments), up to and including the first required one, that `next` can open. */
function rivalItems(siblings: StructureItem[], next: string): StructureItem[] {
  const out: StructureItem[] = [];
  for (const sibling of siblings) {
    if (firstSegments(sibling).includes(next)) out.push(sibling);
    if (isRequired(sibling)) break;
  }
  return out;
}

/** The fields an inline group contributes to its enclosing object (through nested inline groups too). */
function inlineFields(group: SegmentGroup): string[] {
  return group.segments.flatMap((child) => (isSegmentGroup(child) && child.inline ? inlineFields(child) : [itemField(child)]));
}

/** Builder input: segments (or lists of segments) and group objects keyed by item field name. */
export type StructureInput = Record<string, unknown>;

const isSegmentLike = (v: unknown): v is Segment =>
  typeof v === "object" && v !== null && typeof (v as Segment).encode === "function";

/** Encodes one sequence of items from `value`, in structure order. */
function encodeItems(items: StructureItem[], value: StructureInput, encoding: EncodingCharacters, out: string[]): void {
  for (const item of items) {
    if (isSegmentGroup(item) && item.inline) {
      encodeItems(item.segments, value, encoding, out);
      continue;
    }
    const v = value[itemField(item)];
    if (v === undefined || v === null) continue;
    if (isSegmentGroup(item)) {
      const instances = item.repeating ? (v as StructureInput[]) : [v as StructureInput];
      for (const instance of instances) encodeItems(item.segments, instance, encoding, out);
    } else if (!isSegmentChoice(item) && item.repeating) {
      for (const seg of v as Segment[]) out.push(seg.encode(encoding));
    } else {
      out.push((v as Segment).encode(encoding));
    }
  }
}

/** Encodes a builder's input (including `header`) against `structure` into the wire string. */
export function encodeStructure(structure: StructureItem[], value: StructureInput, encoding: EncodingCharacters): string {
  const out: string[] = [];
  encodeItems(structure, value, encoding, out);
  return out.join("\r");
}

/** Validates a builder's input against `structure`; returns the list of problems (empty when valid). */
export function verifyStructure(structure: StructureItem[], value: StructureInput): string[] {
  const errors: string[] = [];
  // `ownLevel` is false while checking the items of an inline group, whose enclosing level already
  // validated the property names.
  const check = (items: StructureItem[], input: StructureInput, scope: string, ownLevel = true) => {
    if (ownLevel) {
      const known = new Set(items.flatMap((item) => (isSegmentGroup(item) && item.inline ? inlineFields(item) : [itemField(item)])));
      for (const key of Object.keys(input)) {
        if (!known.has(key) && !(scope === "" && key === "message")) errors.push(`${scope ? `${scope}: ` : ""}Unknown property "${key}"`);
      }
    }
    for (const item of items) {
      const field = itemField(item);
      const v = input[field];
      const where = scope ? `${scope}: ` : "";
      if (isSegmentChoice(item)) {
        if (v === undefined || v === null) {
          if (item.required) errors.push(`${where}One of ${item.oneOf.join(", ")} is required`);
        } else if (!isSegmentLike(v) || !item.oneOf.includes((v as Segment).name)) {
          errors.push(`${where}${field} must be one of ${item.oneOf.join(", ")}`);
        }
        continue;
      }
      if (isSegmentGroup(item) && item.inline) {
        const present = inlineFields(item).some((f) => input[f] !== undefined && input[f] !== null);
        if (present) check(item.segments, input, scope, false);
        else if (isRequired(item)) {
          errors.push(`${where}At least one ${item.name.replace(/_/g, " ")} group (${firstSegments(item).join("/")}) is required`);
        }
        continue;
      }
      if (isSegmentGroup(item)) {
        const label = item.name.replace(/_/g, " ");
        if (item.repeating && v !== undefined && v !== null && !Array.isArray(v)) {
          errors.push(`${where}${field} must be an array of ${label} groups`);
          continue;
        }
        const instances = v === undefined || v === null ? [] : item.repeating ? (v as StructureInput[]) : [v as StructureInput];
        const min = item.required ? (item.minOccurrences ?? 1) : (item.minOccurrences ?? 0);
        if (instances.length < min && (isRequired(item) || instances.length === 0)) {
          if (item.required && isRequired(item)) {
            const first = firstSegments(item).join("/");
            errors.push(min > 1 ? `${where}At least ${min} ${label} groups are required` : `${where}At least one ${label} group (${first}) is required`);
          }
        }
        if (item.maxOccurrences !== undefined && instances.length > item.maxOccurrences) {
          errors.push(`${where}At most ${item.maxOccurrences} ${label} group${item.maxOccurrences === 1 ? "" : "s"} allowed`);
        }
        instances.forEach((instance, i) => {
          const groupScope = `${where}${label} group ${i + 1}`;
          const encoded: string[] = [];
          encodeItems(item.segments, instance, { fieldSeparator: "|", componentSeparator: "^", repetitionSeparator: "~", escapeCharacter: "\\", subComponentSeparator: "&" } as EncodingCharacters, encoded);
          // An empty group only needs its own message when no required child will flag it.
          if (encoded.length === 0 && !item.segments.some(isRequired)) errors.push(`${groupScope} is empty`);
          check(item.segments, instance, groupScope);
        });
        continue;
      }
      if (item.repeating) {
        if (v !== undefined && v !== null && !Array.isArray(v)) {
          errors.push(`${where}${field} must be an array of ${item.name} segments`);
          continue;
        }
        const list = v === undefined || v === null ? [] : (v as unknown[]);
        const min = item.required ? (item.minOccurrences ?? 1) : (item.minOccurrences ?? 0);
        if (list.length < min) errors.push(min > 1 ? `${where}At least ${min} ${item.name} segments are required` : `${where}At least one ${item.name} segment is required`);
        if (item.maxOccurrences !== undefined && list.length > item.maxOccurrences) errors.push(`${where}At most ${item.maxOccurrences} ${item.name} segments allowed`);
        list.forEach((seg, i) => {
          if (!isSegmentLike(seg) || seg.name !== item.name) errors.push(`${where}${field}[${i}] is not ${article(item.name)} ${item.name} segment`);
        });
      } else if (v === undefined || v === null) {
        if (item.required) errors.push(`${where}${item.name} segment is required`);
      } else if (!isSegmentLike(v) || v.name !== item.name) {
        errors.push(`${where}${field} is not ${article(item.name)} ${item.name} segment`);
      }
    }
  };
  check(structure, value, "");
  return errors;
}
