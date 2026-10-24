/**
 * Parser for MDM^T02 messages (HL7 v2.3): original document notification and content.
 *
 * Structure: MSH EVN PID PV1 TXA {OBX}. T04, T06, T08 and T10 share this structure; v2.4 is identical.
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
import { OBX } from "../../segments/v2.3/OBX.ts";
import type { HL7Message } from "../../types/message.ts";
import type { EncodingCharacters } from "../../types/encoding.ts";
import {
  misplacedSegment,
  readMessageHeader,
  segmentParseFailure,
} from "../../utils/messageParsing.ts";

/** Structured result of parsing an HL7 MDM^T02 (v2.3) message. */
export interface ParsedMDM_T02 {
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
  /** The obx list value (document content; at least one). */
  obxList: OBX[];
}

/** Parser for HL7 MDM^T02 (v2.3) messages. */
export class MDM_T02_Parser {
  /** The message name value. */
  protected readonly messageName: string = "MDM_T02";

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
  /** Parse obx. */
  protected parseOBX(s: string, e: EncodingCharacters): Result<OBX> { return OBX.parse(s, e); }

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMDM_T02> {
    try {
      const header = readMessageHeader(messageString, (s) => this.parseMSH(s));
      if (!header.ok || !header.val) return header as Result<never>;
      const { segments, msh, encoding, message } = header.val;

      let evn: EVN | undefined;
      let pid: PID | undefined;
      let pv1: PV1 | undefined;
      let txa: TXA | undefined;
      const obxList: OBX[] = [];

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
          case "OBX": {
            const r = this.parseOBX(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("OBX", line, r);
            if (!txa) return misplacedSegment("OBX", line, "must follow the TXA segment");
            obxList.push(r.val); message.addSegment(r.val); break;
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
      if (obxList.length === 0) {
        return { ok: false, err: new Err(`${this.messageName} message must contain at least one OBX segment`) };
      }

      return { ok: true, val: { message, msh, evn, pid, pv1, txa, obxList } };
    } catch (error) {
      return { ok: false, err: new Err(`Failed to parse ${this.messageName} message: ${error}`) };
    }
  }
}

/** Parses an HL7 MDM^T02 (v2.3) message string into a structured result. */
export function parseMDM_T02(messageString: string): Result<ParsedMDM_T02> {
  return new MDM_T02_Parser().parse(messageString);
}
