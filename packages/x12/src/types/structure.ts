/**
 * Structure-driven parsing, verification and encoding of a transaction set's body against its
 * schema (see `./schema.ts`), as `@campfhir/hl7`'s `parseStructure()` does for a message.
 *
 * {@link parseStructure} walks the segments between ST and SE like a recursive-descent parser: each
 * item consumes what matches it (segment ID and qualifier), in order, and a repeating loop starts a
 * new instance whenever the next segment opens one. A required item that is missing and a segment
 * that fits nowhere are errors, reported with the segment's position in the transaction set (ST is
 * 1, as a 999's IK302 counts) and, inside a loop, the loop's ID (IK303) in `err.meta`
 * ({@link StructureErrorMeta}). Repeats past the guide's maximum are warnings.
 *
 * @module
 */
import type { Result } from "./result.ts";
import { Err } from "../utils/err.ts";
import type { GenericSegment, Segment } from "./segment.ts";
import { describe, opener, type SegmentItem, type StructureItem } from "./schema.ts";

type Value = Record<string, unknown>;

/**
 * What a failed parse found, in `err.meta.problem`: a required segment or loop that is `missing` (its
 * first segment in `meta.segment`, the position where it was expected in `meta.segmentPosition`), or
 * a segment that is `unexpected` where it stands.
 */
export type StructureProblem = "missing" | "unexpected";

/** The `err.meta` of a failed `parseStructure()`. */
export interface StructureErrorMeta {
  problem: StructureProblem;
  /** Position in the transaction set, ST being 1. */
  segmentPosition: number;
  /** The segment ID: the missing one, or the unexpected one. */
  segment: string;
  /** The loop the problem is in, when it is inside one. */
  loop?: string;
}

/** A parsed body, with the warnings the walk raised. */
export interface StructureResult<T> {
  /** The parsed value. */
  value: T;
  /** Repeats past the guide's maximum. */
  warnings: string[];
}

/** Every segment ID a structure mentions. */
function segmentIds(structure: readonly StructureItem[], out = new Set<string>()): Set<string> {
  for (const item of structure) {
    if (item.kind === "segment") out.add(item.id);
    else segmentIds(item.segments, out);
  }
  return out;
}

/** Whether a segment is the one a segment item describes. */
export function matches(item: SegmentItem, segment: Segment): boolean {
  if (segment.id !== item.id) return false;
  const q = item.qualifier;
  if (!q || q.values.length === 0) return true;
  const value = segment.elements[q.element - 1]?.components[0] ?? "";
  return q.values.includes(value);
}

/**
 * Parses the segments between ST and SE against `structure`. `name` names the transaction set in
 * error messages (`270`).
 */
export function parseStructure<T>(name: string, structure: readonly StructureItem[], segments: readonly GenericSegment[]): Result<StructureResult<T>> {
  const warnings: string[] = [];
  const known = segmentIds(structure);
  let pos = 0;
  // ST is position 1 of the transaction set, so the body starts at 2.
  const position = (i: number) => i + 2;

  const failAt = (message: string, problem: StructureProblem, i: number, segment: string, loopId?: string): Result<never> => ({
    ok: false,
    err: new Err(message).withMetadata({ problem, segmentPosition: position(i), segment, ...(loopId ? { loop: loopId } : {}) }),
  });

  const walk = (items: readonly StructureItem[], out: Value, loopId?: string): Result<never> | undefined => {
    const where = loopId ? `loop ${loopId}` : "transaction set";
    for (const item of items) {
      const first = opener(item);
      const count = () => {
        let n = 0;
        while (pos < segments.length && matches(first, segments[pos])) {
          if (n > 0 && !item.repeating) break;
          if (item.kind === "segment") {
            const parsed = item.segmentClass ? new item.segmentClass(segments[pos].elements) : segments[pos];
            if (item.repeating) ((out[item.as] ??= []) as Segment[]).push(parsed);
            else out[item.as] = parsed;
            pos++;
          } else {
            const instance: Value = {};
            const failure = walk(item.segments, instance, item.loop);
            if (failure) return failure;
            if (item.repeating) ((out[item.as] ??= []) as Value[]).push(instance);
            else out[item.as] = instance;
          }
          n++;
        }
        if (item.repeating) out[item.as] ??= [];
        if (item.max !== undefined && n > item.max) {
          const what = item.kind === "loop" ? `Loop ${item.loop}` : `${describe(item)} in ${where}`;
          warnings.push(`${what} occurs ${n} times, the guide allows ${item.max}`);
        }
        if (n === 0 && item.required) {
          // A segment the guide never mentions standing where the required item belongs is the error.
          if (pos < segments.length && !known.has(segments[pos].id)) {
            return failAt(`${segments[pos].id} segment at position ${position(pos)} of the ${name} transaction set is not in the guide`, "unexpected", pos, segments[pos].id, loopId);
          }
          const what = item.kind === "loop" ? `loop ${item.loop} (${item.name}, opened by ${describe(first)})` : `${describe(item)} (${item.name})`;
          return failAt(`${name} ${where} must contain ${what}`, "missing", pos, first.id, item.kind === "loop" ? item.loop : loopId);
        }
        return undefined;
      };
      const failure = count();
      if (failure) return failure;
    }
    return undefined;
  };

  const out: Value = {};
  const failure = walk(structure, out);
  if (failure) return failure;
  if (pos < segments.length) {
    return failAt(`${segments[pos].id} segment at position ${position(pos)} of the ${name} transaction set is not allowed there`, "unexpected", pos, segments[pos].id);
  }
  return { ok: true, val: { value: out as T, warnings } };
}

/** Lists what a builder input misses: every required item that is absent, with its path. */
export function verifyStructure(name: string, structure: readonly StructureItem[], input: unknown): string[] {
  const problems: string[] = [];
  const visit = (items: readonly StructureItem[], value: Value, path: string) => {
    for (const item of items) {
      const v = value[item.as];
      const present = Array.isArray(v) ? v.length > 0 : v !== undefined;
      if (!present) {
        if (item.required) problems.push(`${name} ${path}${item.as} is required (${item.kind === "loop" ? `loop ${item.loop}` : describe(item)})`);
        continue;
      }
      if (item.kind === "loop") {
        const instances = Array.isArray(v) ? v : [v];
        instances.forEach((instance, i) => visit(item.segments, instance as Value, `${path}${item.as}${Array.isArray(v) ? `[${i}]` : ""}.`));
      }
    }
  };
  visit(structure, input as Value, "");
  return problems;
}

/** Writes a builder input out in structure order. */
export function encodeStructure(structure: readonly StructureItem[], input: unknown): Segment[] {
  const out: Segment[] = [];
  const visit = (items: readonly StructureItem[], value: Value) => {
    for (const item of items) {
      const v = value[item.as];
      if (v === undefined) continue;
      for (const entry of Array.isArray(v) ? v : [v]) {
        if (item.kind === "segment") out.push(entry as Segment);
        else visit(item.segments, entry as Value);
      }
    }
  };
  visit(structure, input as Value);
  return out;
}
