/**
 * Header segments: MSH, BHS and FHS carry the field separator and the encoding characters as their
 * first two fields, so field n is `fields[n - 2]` and encoding writes them back from the encoding.
 *
 * Every version's MSH satisfies `MessageHeaderSegment`, which is what the shared parsing code
 * needs from a header. The v2.3 classes are hand-written; versions that do not extend another
 * version (v2.1, v2.2) get generated classes on top of `HeaderSegment`.
 *
 * @module
 */
import type { Result } from "./result.ts";
import { Err } from "../utils/err.ts";
import { BaseSegment, type Segment } from "./segment.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "./encoding.ts";
import { ParserUtils } from "./parser.ts";

/** MSH-9 as sent: message type, trigger event and, from v2.3.1, message structure. */
export interface MessageTypeValue {
  /** MSH-9.1 Message Type (`ADT`). */
  messageCode: string;
  /** MSH-9.2 Trigger Event (`A01`). */
  triggerEvent: string;
  /** MSH-9.3 Message Structure (`ADT_A01`), when sent. */
  messageStructure?: string;
}

/** What the shared parsing code needs from a message header (MSH) of any version. */
export interface MessageHeaderSegment extends Segment {
  /** The encoding characters (parsed or default). */
  getEncoding(): EncodingCharacters;
  /** Sets the encoding characters. Called by the parser. */
  setEncoding(encoding: EncodingCharacters): void;
  /** MSH-9 Message Type as sent. */
  getMessageType(): MessageTypeValue;
  /** MSH-12 Version ID as sent (the first component when the field is a VID). */
  getVersionId(): string;
}

/** A header segment (MSH, BHS, FHS): keeps its encoding and writes MSH-1 and MSH-2 from it. */
export abstract class HeaderSegment extends BaseSegment {
  private _encoding?: EncodingCharacters;

  constructor() {
    super();
    this.fields = [this.createEmptyField()];
  }

  /** The encoding characters used by this segment (parsed or default). */
  get encoding(): EncodingCharacters {
    return this._encoding ?? DEFAULT_ENCODING;
  }

  /** The encoding characters used by this segment (parsed or default). */
  getEncoding(): EncodingCharacters {
    return this.encoding;
  }

  /** Sets the encoding characters for this segment. Called by the parser. */
  setEncoding(encoding: EncodingCharacters): void {
    this._encoding = encoding;
  }

  /** Encodes this segment to its HL7 wire string. */
  override encode(_encoding?: EncodingCharacters): string {
    const encoding = _encoding ?? this._encoding ?? DEFAULT_ENCODING;
    const encodedFields = this.fields.slice(1).map((field) => this.encodeField(field, encoding));
    const encodingChars =
      encoding.componentSeparator + encoding.repetitionSeparator + encoding.escapeCharacter + encoding.subComponentSeparator;
    return `${this.name}${encoding.fieldSeparator}${encodingChars}${encoding.fieldSeparator}${encodedFields.join(encoding.fieldSeparator)}`;
  }

  /**
   * Reads `segmentString` into `segment`: the encoding from its first eight characters, then field 3
   * onward. Used by the generated `parse` of each header class.
   */
  protected static readHeader<T extends HeaderSegment>(segment: T, segmentString: string): Result<T> {
    const code = segment.name;
    if (!segmentString.startsWith(code)) return { ok: false, err: new Err(`Expected ${code} segment, got ${segmentString.slice(0, 3)}`) };
    const encodingChars = segmentString.substring(4, 8);
    if (encodingChars.length < 4) return { ok: false, err: new Err(`Invalid encoding characters in ${code} segment`) };
    const encoding: EncodingCharacters = {
      fieldSeparator: segmentString[3],
      componentSeparator: encodingChars[0],
      repetitionSeparator: encodingChars[1],
      escapeCharacter: encodingChars[2],
      subComponentSeparator: encodingChars[3],
    };
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== code) return { ok: false, err: new Err(`Expected ${code} segment, got ${parts[0]}`) };
    segment.fields = [ParserUtils.parseField("", encoding)];
    segment.setEncoding(encoding);
    for (let i = 2; i < parts.length; i++) segment.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    return { ok: true, val: segment } as Result<T>;
  }
}

/**
 * A message header (MSH) on top of `HeaderSegment`, with the readers the dispatcher and the
 * shared parsing code use. MSH-9 is field 9 (`fields[7]`) and MSH-12 field 12 (`fields[10]`) in
 * every version.
 */
export abstract class MessageHeaderBase extends HeaderSegment implements MessageHeaderSegment {
  /** MSH-9 Message Type as sent. */
  getMessageType(): MessageTypeValue {
    const field = this.fields[7];
    if (!field?.components?.length) return { messageCode: "", triggerEvent: "" };
    return {
      messageCode: field.components[0]?.subComponents[0] || "",
      triggerEvent: field.components[1]?.subComponents[0] || "",
      messageStructure: field.components[2]?.subComponents[0] || undefined,
    };
  }

  /** MSH-12 Version ID as sent (`2.2`), the first component when the field is a VID. */
  getVersionId(): string {
    const field = this.fields[10];
    return field ? ParserUtils.getComponent(field, 0).trim() : "";
  }
}
