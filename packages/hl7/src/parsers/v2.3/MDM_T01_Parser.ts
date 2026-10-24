/**
 * Parser for MDM^T01 messages (HL7 v2.3): original document notification.
 *
 * Structure: MSH EVN PID PV1 TXA. T03, T05, T07, T09 and T11 share this structure; v2.4 is identical.
 *
 * @module
 */
import { Err } from "../../utils/err.ts";
import type { Result } from "../../types/result.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { EVN } from "../../segments/v2.3/EVN.ts";
import { PID } from "../../segments/v2.3/PID.ts";
import { PV1 } from "../../segments/v2.3/PV1.ts";
import { TXA } from "../../segments/v2.3/TXA.ts";
import type { HL7Message } from "../../types/message.ts";
import type { EncodingCharacters } from "../../types/encoding.ts";
import {
  misplacedSegment,
  readMessageHeader,
  segmentParseFailure,
} from "../../utils/messageParsing.ts";

/** Structured result of parsing an HL7 MDM^T01 (v2.3) message. */
export interface ParsedMDM_T01 {
  /** The message value. */
  message: HL7Message;
  /** The msh value. */
  msh: MSH;
  /** The evn value. */
  evn: EVN;
  /** The pid value. */
  pid: PID;
  /** The pv1 value. */
  pv1: PV1;
  /** The txa value. */
  txa: TXA;
}

/** Parser for HL7 MDM^T01 (v2.3) messages. */
export class MDM_T01_Parser {
  /** The message name value. */
  protected readonly messageName: string = "MDM_T01";

  /** Parse msh. */
  protected parseMSH(s: string): Result<MSH> { return MSH.parse(s); }
  /** Parse evn. */
  protected parseEVN(s: string, e: EncodingCharacters): Result<EVN> { return EVN.parse(s, e); }
  /** Parse pid. */
  protected parsePID(s: string, e: EncodingCharacters): Result<PID> { return PID.parse(s, e); }
  /** Parse pv1. */
  protected parsePV1(s: string, e: EncodingCharacters): Result<PV1> { return PV1.parse(s, e); }
  /** Parse txa. */
  protected parseTXA(s: string, e: EncodingCharacters): Result<TXA> { return TXA.parse(s, e); }

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMDM_T01> {
    try {
      const header = readMessageHeader(messageString, (s) => this.parseMSH(s));
      if (!header.ok || !header.val) return header as Result<never>;
      const { segments, msh, encoding, message } = header.val;

      let evn: EVN | undefined;
      let pid: PID | undefined;
      let pv1: PV1 | undefined;
      let txa: TXA | undefined;

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
          case "PID": {
            const r = this.parsePID(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("PID", line, r);
            if (pid) return misplacedSegment("PID", line, "appears more than once");
            pid = r.val; message.addSegment(r.val); break;
          }
          case "PV1": {
            const r = this.parsePV1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("PV1", line, r);
            if (!pid) return misplacedSegment("PV1", line, "must follow the PID segment");
            if (pv1) return misplacedSegment("PV1", line, "appears more than once");
            pv1 = r.val; message.addSegment(r.val); break;
          }
          case "TXA": {
            const r = this.parseTXA(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("TXA", line, r);
            if (!pv1) return misplacedSegment("TXA", line, "must follow the PV1 segment");
            if (txa) return misplacedSegment("TXA", line, "appears more than once");
            txa = r.val; message.addSegment(r.val); break;
          }
          default:
            console.warn(`Skipping unsupported segment type '${segmentType}' at line ${line}`);
            break;
        }
      }

      if (!evn) return { ok: false, err: new Err(`${this.messageName} message must contain an EVN segment`) };
      if (!pid) return { ok: false, err: new Err(`${this.messageName} message must contain a PID segment`) };
      if (!pv1) return { ok: false, err: new Err(`${this.messageName} message must contain a PV1 segment`) };
      if (!txa) return { ok: false, err: new Err(`${this.messageName} message must contain a TXA segment`) };

      return { ok: true, val: { message, msh, evn, pid, pv1, txa } };
    } catch (error) {
      return { ok: false, err: new Err(`Failed to parse ${this.messageName} message: ${error}`) };
    }
  }
}

/** Parses an HL7 MDM^T01 (v2.3) message string into a structured result. */
export function parseMDM_T01(messageString: string): Result<ParsedMDM_T01> {
  return new MDM_T01_Parser().parse(messageString);
}
