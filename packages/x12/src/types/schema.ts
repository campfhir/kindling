/**
 * The structure of a transaction set as data: its segments and loops in the implementation guide's
 * order, as `@campfhir/hl7`'s message schemas hold a message's segments and groups.
 *
 * X12 reuses segment IDs inside one transaction set (`NM1` names the payer, the provider and the
 * subscriber; `HL` opens four levels), so a segment item may carry a {@link Qualifier}: the element
 * value that tells its uses apart (`NM101` `PR`, `HL03` `20`). A loop starts with its first item,
 * qualifier included.
 *
 * The parsed shape and the builder input of a transaction set are derived from its schema at the
 * type level ({@link ParsedOf}, {@link InputOf}), so they cannot drift from it.
 *
 * @module
 */
import type { Element, GenericSegment, Segment } from "./segment.ts";

/** A segment class a schema item parses its segment into. */
export type SegmentClass<T extends Segment = Segment> = new (elements: Element[]) => T;

/** The values of one element that select a segment's use: `{ element: 1, values: ["PR"] }` is NM101 `PR`. */
export interface Qualifier {
  /** The element's position (1-based). */
  element: number;
  /** The accepted values; any value when empty. */
  values: readonly string[];
}

/** A segment at one position of the structure. */
export interface SegmentItem<A extends string = string, R extends boolean = boolean, P extends boolean = boolean, C extends Segment = Segment> {
  kind: "segment";
  /** The class the parsed segment is made into; a `GenericSegment` when absent. */
  segmentClass?: SegmentClass<C>;
  /** The segment identifier. */
  id: string;
  /** The property holding it in the parsed value and the builder input. */
  as: A;
  /** The guide's name for this use of the segment (`Information Source Name`). */
  name: string;
  /** Usage R (required) rather than S (situational). */
  required: R;
  /** Whether it may occur more than once here. */
  repeating: P;
  /** The guide's maximum use, for a repeating segment (more is a warning). */
  max?: number;
  /** The element value that selects this use of the segment. */
  qualifier?: Qualifier;
}

/** A loop: a run of items that starts with its first item and may repeat. */
export interface LoopItem<
  A extends string = string,
  S extends readonly StructureItem[] = readonly StructureItem[],
  R extends boolean = boolean,
  P extends boolean = boolean,
> {
  kind: "loop";
  /** The loop ID (`2100A`). */
  loop: string;
  /** The property holding it in the parsed value and the builder input. */
  as: A;
  /** The guide's name for the loop. */
  name: string;
  /** Usage R (required) rather than S (situational). */
  required: R;
  /** Whether it may occur more than once here. */
  repeating: P;
  /** The guide's loop repeat, for a repeating loop (more is a warning). */
  max?: number;
  /** The loop's items; the first opens it. */
  segments: S;
}

/**
 * Uses of one base-standard position that the guide names separately (the 837's REF and DTP uses
 * told apart by their qualifiers, its 2310A to 2310F provider loops): they may arrive in any order.
 * Each member still has its own property, and is encoded in the order listed.
 */
export interface UnorderedItem<M extends readonly (SegmentItem | LoopItem)[] = readonly (SegmentItem | LoopItem)[]> {
  kind: "unordered";
  /** The uses, each a segment or a loop with its qualifier. */
  members: M;
}

/** An item of a structure: a segment, a loop, or uses of one position in any order. */
export type StructureItem = SegmentItem | LoopItem | UnorderedItem;

/** A transaction set's schema: the body between ST and SE. */
export interface TransactionSetSchema<S extends readonly StructureItem[] = readonly StructureItem[]> {
  /** ST01 (`270`). */
  transactionSet: string;
  /** The implementation guide, GS08 and ST03 (`005010X279A1`). */
  version: string;
  /** The guide's name for the transaction set. */
  name: string;
  /** The items between ST and SE. */
  structure: S;
}

interface ItemOptions<R extends boolean, P extends boolean> {
  required?: R;
  repeating?: P;
  max?: number;
}

/** A segment item. */
export function segment<
  const A extends string,
  const R extends boolean = false,
  const P extends boolean = false,
  C extends Segment = GenericSegment,
>(
  id: string,
  as: A,
  name: string,
  options: ItemOptions<R, P> & { qualifier?: [element: number, ...values: string[]]; segmentClass?: SegmentClass<C> } = {},
): SegmentItem<A, R, P, C> {
  const { qualifier, segmentClass, ...rest } = options;
  return {
    kind: "segment",
    ...(segmentClass ? { segmentClass } : {}),
    id,
    as,
    name,
    required: (rest.required ?? false) as R,
    repeating: (rest.repeating ?? false) as P,
    ...(rest.max !== undefined ? { max: rest.max } : {}),
    ...(qualifier ? { qualifier: { element: qualifier[0], values: qualifier.slice(1) as string[] } } : {}),
  };
}

/** A loop item. */
export function loop<const A extends string, const S extends readonly StructureItem[], const R extends boolean = false, const P extends boolean = false>(
  id: string,
  as: A,
  name: string,
  segments: S,
  options: ItemOptions<R, P> = {},
): LoopItem<A, S, R, P> {
  return {
    kind: "loop",
    loop: id,
    as,
    name,
    required: (options.required ?? false) as R,
    repeating: (options.repeating ?? false) as P,
    ...(options.max !== undefined ? { max: options.max } : {}),
    segments,
  };
}

/** Segment or loop uses of one position that may arrive in any order. */
export function unordered<const M extends readonly (SegmentItem | LoopItem)[]>(...members: M): UnorderedItem<M> {
  return { kind: "unordered", members };
}

/** The first segment item of a segment or loop: the item itself, or the one that opens the loop. */
export function opener(item: SegmentItem | LoopItem): SegmentItem {
  if (item.kind === "segment") return item;
  const [first] = item.segments;
  if (!first || first.kind === "unordered") throw new Error(`Loop ${item.loop} must open with a segment or a loop`);
  return opener(first);
}

/** The segment and loop items of a list, with the members of unordered items in their place. */
export function flatten(items: readonly StructureItem[]): (SegmentItem | LoopItem)[] {
  return items.flatMap((item) => (item.kind === "unordered" ? [...item.members] : [item]));
}

/** "NM1 (NM101 PR)": a segment item as error messages name it. */
export function describe(item: SegmentItem): string {
  const q = item.qualifier;
  if (!q || q.values.length === 0) return item.id;
  return `${item.id} (${item.id}${String(q.element).padStart(2, "0")} ${q.values.join("/")})`;
}

type Value<I, Seg> = I extends LoopItem<string, infer S>
  ? Shape<S, Seg>
  : I extends SegmentItem<string, boolean, boolean, infer C>
    ? Segment extends C
      ? Seg
      : C
    : Seg;

/** The items of a list, with the members of unordered items in their place. */
type Flat<I> = I extends UnorderedItem<infer M> ? M[number] : I;

/** Repeating items are always arrays, required ones always present, situational ones optional. */
type Shape<S extends readonly StructureItem[], Seg> = {
  [I in Flat<S[number]> as I extends { repeating: true } | { required: true } ? I["as"] : never]: I extends { repeating: true }
    ? Value<I, Seg>[]
    : Value<I, Seg>;
} & {
  [I in Flat<S[number]> as I extends { repeating: true } | { required: true } ? never : I["as"]]?: Value<I, Seg>;
};

/** Like {@link Shape}, but a situational repeating item may be left out. */
type InputShape<S extends readonly StructureItem[]> = {
  [I in Flat<S[number]> as I extends { required: true } ? I["as"] : never]: I extends { repeating: true }
    ? readonly InputValue<I>[]
    : InputValue<I>;
} & {
  [I in Flat<S[number]> as I extends { required: true } ? never : I["as"]]?: I extends { repeating: true }
    ? readonly InputValue<I>[]
    : InputValue<I>;
};

type InputValue<I> = I extends LoopItem<string, infer S> ? InputShape<S> : Segment;

/** The parsed value of a structure: one property per item, segments as `GenericSegment`. */
export type ParsedOf<S extends readonly StructureItem[]> = Shape<S, GenericSegment>;

/** The builder input of a structure: one property per item, segments as any `Segment`. */
export type InputOf<S extends readonly StructureItem[]> = InputShape<S>;

/** The parsed value of a transaction set schema. */
export type ParsedTransactionOf<T extends TransactionSetSchema> = ParsedOf<T["structure"]>;

/** The builder input of a transaction set schema. */
export type TransactionInputOf<T extends TransactionSetSchema> = InputOf<T["structure"]>;
