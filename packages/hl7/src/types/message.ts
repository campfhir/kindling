import type { Segment } from './segment.ts';
import { type EncodingCharacters, DEFAULT_ENCODING } from './encoding.ts';

/** Message. */
export interface Message {
  /** The segments value. */
  segments: Segment[];
  /** The encoding value. */
  encoding: EncodingCharacters;
  /** Encodes this message to its HL7 wire string. */
  encode(options?: EncodeOptions): string;
}

/** MLLP start block character, `<VT>` (0x0B). */
export const MLLP_START = "\x0b";
/** MLLP end block character, `<FS>` (0x1C); the frame closes with `<FS><CR>`. */
export const MLLP_END = "\x1c";

/** Options of a message's `encode()`. */
export interface EncodeOptions {
  /**
   * Wraps the message in an MLLP frame: `<VT>` (0x0B) before it and `<FS><CR>` (0x1C 0x0D)
   * after its last segment terminator. `false` by default.
   */
  mllp?: boolean;
}

/**
 * Turns encoded segments into a message's wire string: every segment, the last included, ends
 * with the segment terminator `\r`, and with `options.mllp` the message is framed as
 * `<VT>message<FS><CR>`.
 */
export function toWire(segments: string | readonly string[], options: EncodeOptions = {}): string {
  const lines = typeof segments === "string" ? [segments] : segments;
  const body = lines.map((line) => `${line}\r`).join("");
  return options.mllp ? `${MLLP_START}${body}${MLLP_END}\r` : body;
}

/**
 * Removes what {@link toWire} adds: an MLLP frame (`<VT>` … `<FS><CR>`) and trailing segment
 * terminators. A string without them is returned unchanged.
 */
export function stripWire(wire: string): string {
  let s = wire;
  if (s.startsWith(MLLP_START)) s = s.slice(1);
  const end = s.lastIndexOf(MLLP_END);
  if (end !== -1 && /^[\r\n]*$/.test(s.slice(end + 1))) s = s.slice(0, end);
  return s.replace(/[\r\n]+$/, "");
}

/** HL7 Message. */
export class HL7Message implements Message {
  /** The segments value. */
  segments: Segment[] = [];
  /** The encoding value. */
  encoding: EncodingCharacters;

  /** Constructor. */
  constructor(encoding: EncodingCharacters = DEFAULT_ENCODING) {
    this.encoding = encoding;
  }

  /** Add segment. */
  addSegment(segment: Segment): void {
    this.segments.push(segment);
  }

  /** Encodes this message to its HL7 wire string. */
  encode(options?: EncodeOptions): string {
    return toWire(this.segments.map(segment => segment.encode(this.encoding)), options);
  }
}
