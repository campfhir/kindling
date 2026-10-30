import { DEFAULT_DELIMITERS, type Delimiters } from "./delimiters.ts";

/**
 * One data element of a segment. A simple element has one component; a composite has several.
 * X12 has no sub-components, so a component is a plain string.
 */
export interface Element {
  /** The components of the element (of its first repetition, when the element repeats). */
  components: string[];
  /**
   * Further repetitions of a repeating element, in order. The first repetition always lives in
   * `components`, so code that only reads `components` keeps seeing the first one.
   */
  repetitions?: Element[];
}

/** A segment: its identifier and its data elements, `elements[0]` being element 01. */
export interface Segment {
  /** The segment identifier (`ISA`, `NM1`, …). */
  id: string;
  /** The data elements, `elements[0]` being element 01 (`NM101`). */
  elements: Element[];
  /** Encodes the segment, without its terminator. */
  encode(delimiters?: Delimiters): string;
}

/** A raw element value: a string, or the components of a composite. */
export type ElementValue = string | readonly (string | undefined | null)[];

/**
 * The segment classes' common base: element storage, positional access and encoding. Positions are
 * 1-based as the standard numbers them (`get(3)` is `NM103`).
 */
export abstract class BaseSegment implements Segment {
  /** The segment identifier. */
  abstract id: string;
  /** The data elements, `elements[0]` being element 01. */
  elements: Element[] = [];

  /** Encodes the segment, without its terminator. Trailing empty elements are left out. */
  encode(delimiters: Delimiters = DEFAULT_DELIMITERS): string {
    const encoded = this.elements.map((e) => encodeElement(e, delimiters));
    while (encoded.length > 0 && encoded[encoded.length - 1] === "") encoded.pop();
    return encoded.length === 0 ? this.id : `${this.id}${delimiters.element}${encoded.join(delimiters.element)}`;
  }

  /** The first component of element `position` (1-based), or "" when absent. */
  get(position: number): string {
    return this.elements[position - 1]?.components[0] ?? "";
  }

  /** Component `component` (1-based) of element `position` (1-based), or "" when absent. */
  getComponent(position: number, component: number): string {
    return this.elements[position - 1]?.components[component - 1] ?? "";
  }

  /** Every repetition of element `position` (1-based); an absent element has none. */
  getRepetitions(position: number): Element[] {
    const element = this.elements[position - 1];
    if (!element || isEmpty(element)) return [];
    return [{ components: element.components }, ...(element.repetitions ?? [])];
  }

  /** Sets element `position` (1-based) to a simple value or a composite's components. */
  protected set(position: number, value: ElementValue): this {
    this.place(position, createElement(value));
    return this;
  }

  /** Sets element `position` (1-based) to one or more repetitions. */
  protected setRepeating(position: number, values: readonly ElementValue[]): this {
    const [first, ...rest] = values.map(createElement);
    if (!first) return this.set(position, "");
    this.place(position, rest.length > 0 ? { components: first.components, repetitions: rest } : first);
    return this;
  }

  private place(position: number, element: Element): void {
    while (this.elements.length < position - 1) this.elements.push({ components: [""] });
    this.elements[position - 1] = element;
  }
}

/**
 * Builds an element from a value. A composite's nullish components become empty ones, which keeps
 * interior gaps (`["HC", undefined, "25"]` encodes as `HC::25`); trailing empty components are
 * trimmed.
 */
export function createElement(value: ElementValue): Element {
  if (typeof value === "string") return { components: [value] };
  const components = value.map((v) => v ?? "");
  while (components.length > 1 && components[components.length - 1] === "") components.pop();
  return { components: components.length > 0 ? components : [""] };
}

/** Encodes one element: its components, then each further repetition. */
export function encodeElement(element: Element, delimiters: Delimiters): string {
  const first = element.components.join(delimiters.component);
  if (!element.repetitions?.length) return first;
  return [first, ...element.repetitions.map((r) => encodeElement(r, delimiters))].join(delimiters.repetition);
}

function isEmpty(element: Element): boolean {
  return !element.repetitions?.length && element.components.every((c) => c === "");
}

/**
 * A segment of any identifier with positional setters, for the segments of a transaction set that
 * has no typed classes yet, and for what a parser does not recognise.
 */
export class GenericSegment extends BaseSegment {
  /** The segment identifier. */
  id: string;

  constructor(id: string, elements: Element[] = []) {
    super();
    this.id = id;
    this.elements = elements;
  }

  /** Sets element `position` (1-based) to a simple value or a composite's components. */
  element(position: number, value: ElementValue): this {
    return this.set(position, value);
  }

  /** Sets element `position` (1-based) to one or more repetitions, one per argument. */
  repeating(position: number, ...values: ElementValue[]): this {
    return this.setRepeating(position, values);
  }
}
