/**
 * Parser for ADT^A20 messages (HL7 v2.3): bed status update. Structure: MSH EVN NPU.
 *
 * @module
 */
import { Err } from "../../utils/err.ts";
import type { Result } from "../../types/result.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { EVN } from "../../segments/v2.3/EVN.ts";
import { NPU } from "../../segments/v2.3/NPU.ts";
import type { HL7Message } from "../../types/message.ts";
import type { EncodingCharacters } from "../../types/encoding.ts";
import {
  misplacedSegment,
  readMessageHeader,
  segmentParseFailure,
} from "../../utils/messageParsing.ts";

/** Structured result of parsing an HL7 ADT^A20 (v2.3) message. */
export interface ParsedADT_A20 {
  /** The message value. */
  message: HL7Message;
  /** The msh value. */
  msh: MSH;
  /** The evn value. */
  evn: EVN;
  /** The npu value. */
  npu: NPU;
}

/** Parser for HL7 ADT^A20 (v2.3) messages. */
export class ADT_A20_Parser {
  /** The message name value. */
  protected readonly messageName: string = "ADT_A20";

  /** Parse msh. */
  protected parseMSH(s: string): Result<MSH> { return MSH.parse(s); }
  /** Parse evn. */
  protected parseEVN(s: string, e: EncodingCharacters): Result<EVN> { return EVN.parse(s, e); }
  /** Parse npu. */
  protected parseNPU(s: string, e: EncodingCharacters): Result<NPU> { return NPU.parse(s, e); }

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedADT_A20> {
    try {
      const header = readMessageHeader(messageString, (s) => this.parseMSH(s));
      if (!header.ok || !header.val) return header as Result<never>;
      const { segments, msh, encoding, message } = header.val;

      let evn: EVN | undefined;
      let npu: NPU | undefined;

      for (let i = 1; i < segments.length; i++) {
        const segmentStr = segments[i];
        const segmentType = segmentStr.substring(0, 3);
        const line = i + 1;

        switch (segmentType) {
          case "EVN": {
            const r = this.parseEVN(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("EVN", line, r);
            if (evn) return misplacedSegment("EVN", line, "appears more than once");
            evn = r.val; message.addSegment(r.val); break;
          }
          case "NPU": {
            const r = this.parseNPU(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("NPU", line, r);
            if (!evn) return misplacedSegment("NPU", line, "must follow the EVN segment");
            if (npu) return misplacedSegment("NPU", line, "appears more than once");
            npu = r.val; message.addSegment(r.val); break;
          }
          default:
            console.warn(`Skipping unsupported segment type '${segmentType}' at line ${line}`);
            break;
        }
      }

      if (!evn) return { ok: false, err: new Err(`${this.messageName} message must contain an EVN segment`) };
      if (!npu) return { ok: false, err: new Err(`${this.messageName} message must contain an NPU segment`) };

      return { ok: true, val: { message, msh, evn, npu } };
    } catch (error) {
      return { ok: false, err: new Err(`Failed to parse ${this.messageName} message: ${error}`) };
    }
  }
}

/** Parses an HL7 ADT^A20 (v2.3) message string into a structured result. */
export function parseADT_A20(messageString: string): Result<ParsedADT_A20> {
  return new ADT_A20_Parser().parse(messageString);
}
