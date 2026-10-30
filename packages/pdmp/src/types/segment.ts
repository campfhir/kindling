import { DEFAULT_DELIMITERS, type Delimiters } from "./delimiters.ts";

/**
 * A segment: its identifier and its data elements, `elements[0]` being element 01. ASAP defines no
 * component or repetition separator, so an element is a plain string.
 */
export interface Segment {
  /** The segment identifier (`TH`, `PAT`, …). */
  id: string;
  /** The data elements, `elements[0]` being element 01 (`PAT01`). */
  elements: string[];
  /** Encodes the segment, without its terminator. */
  encode(delimiters?: Delimiters): string;
}

/**
 * The segment classes' common base: element storage, positional access and encoding. Positions are
 * 1-based as the standard numbers them (`get(7)` is `DSP07`).
 */
export abstract class BaseSegment implements Segment {
  /** The segment identifier. */
  abstract id: string;
  /** The data elements, `elements[0]` being element 01. */
  elements: string[] = [];

  /**
   * Encodes the segment, without its terminator. Every element is written, trailing empty ones too:
   * the state guides ask for a separator per blank element, and a parsed segment encodes as it was
   * read.
   */
  encode(delimiters: Delimiters = DEFAULT_DELIMITERS): string {
    return [this.id, ...this.elements].join(delimiters.element);
  }

  /** Element `position` (1-based), or "" when absent. */
  get(position: number): string {
    return this.elements[position - 1] ?? "";
  }

  /** Sets element `position` (1-based), filling any gap before it with empty elements. */
  protected set(position: number, value: string): this {
    while (this.elements.length < position - 1) this.elements.push("");
    this.elements[position - 1] = value;
    return this;
  }
}

/**
 * A segment of any identifier with positional setters, for the detail segments that have no typed
 * classes yet, and for what a parser does not recognise.
 */
export class GenericSegment extends BaseSegment {
  /** The segment identifier. */
  id: string;

  constructor(id: string, elements: string[] = []) {
    super();
    this.id = id;
    this.elements = elements;
  }

  /** Sets element `position` (1-based). */
  element(position: number, value: string): this {
    return this.set(position, value);
  }
}
