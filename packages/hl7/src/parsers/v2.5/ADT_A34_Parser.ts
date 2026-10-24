/**
 * Parser for ADT^A34 messages (HL7 v2.5): merge patient information, patient ID only.
 *
 * Structure: MSH [{SFT}] EVN PID [PD1] MRG, with an optional PV1 so the events that require it
 * (A18, A50, A51) can reuse this parser; the merge/move/change events A30, A35–A37, A39–A49 do
 * as well. Compared with v2.3 only [{SFT}] is new.
 *
 * @module
 */
import { Err } from "../../utils/err.ts";
import type { Result } from "../../types/result.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { EVN } from "../../segments/v2.5/EVN.ts";
import { PID } from "../../segments/v2.5/PID.ts";
import { PD1 } from "../../segments/v2.5/PD1.ts";
import { MRG } from "../../segments/v2.5/MRG.ts";
import { PV1 } from "../../segments/v2.5/PV1.ts";
import type { HL7Message } from "../../types/message.ts";
import type { EncodingCharacters } from "../../types/encoding.ts";
import {
  misplacedSegment,
  readMessageHeader,
  segmentParseFailure,
} from "../../utils/messageParsing.ts";

/** Structured result of parsing an HL7 ADT^A34 (v2.5) message. */
export interface ParsedADT_A34 {
  /** The message value. */
  message: HL7Message;
  /** The msh value. */
  msh: MSH;
  /** The software segments, which follow MSH. */
  sftList: SFT[];
  /** The evn value. */
  evn?: EVN;
  /** The pid value. */
  pid: PID;
  /** The pd1 value. */
  pd1?: PD1;
  /** The mrg value. */
  mrg: MRG;
  /** The pv1 value. */
  pv1?: PV1;
}

/** Parser for HL7 ADT^A34 (v2.5) messages. */
export class ADT_A34_Parser {
  /** The message name value. */
  protected readonly messageName: string = "ADT_A34";

  /** Parse msh. */
  protected parseMSH(s: string): Result<MSH> { return MSH.parse(s); }
  /** Parse sft. */
  protected parseSFT(s: string, e: EncodingCharacters): Result<SFT> { return SFT.parse(s, e); }
  /** Parse evn. */
  protected parseEVN(s: string, e: EncodingCharacters): Result<EVN> { return EVN.parse(s, e); }
  /** Parse pid. */
  protected parsePID(s: string, e: EncodingCharacters): Result<PID> { return PID.parse(s, e); }
  /** Parse pd1. */
  protected parsePD1(s: string, e: EncodingCharacters): Result<PD1> { return PD1.parse(s, e); }
  /** Parse mrg. */
  protected parseMRG(s: string, e: EncodingCharacters): Result<MRG> { return MRG.parse(s, e); }
  /** Parse pv1. */
  protected parsePV1(s: string, e: EncodingCharacters): Result<PV1> { return PV1.parse(s, e); }

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedADT_A34> {
    try {
      const header = readMessageHeader(messageString, (s) => this.parseMSH(s));
      if (!header.ok || !header.val) return header as Result<never>;
      const { segments, msh, encoding, message } = header.val;

      const sftList: SFT[] = [];
      let evn: EVN | undefined;
      let pid: PID | undefined;
      let pd1: PD1 | undefined;
      let mrg: MRG | undefined;
      let pv1: PV1 | undefined;

      for (let i = 1; i < segments.length; i++) {
        const segmentStr = segments[i];
        const segmentType = segmentStr.substring(0, 3);
        const line = i + 1;

        switch (segmentType) {
          case "SFT": {
            const r = this.parseSFT(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("SFT", line, r);
            if (evn || pid) return misplacedSegment("SFT", line, "must appear before the EVN segment");
            sftList.push(r.val); message.addSegment(r.val); break;
          }
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
          case "PD1": {
            const r = this.parsePD1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("PD1", line, r);
            if (!pid || pd1 || mrg) return misplacedSegment("PD1", line, "must directly follow PID");
            pd1 = r.val; message.addSegment(r.val); break;
          }
          case "MRG": {
            const r = this.parseMRG(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("MRG", line, r);
            if (!pid) return misplacedSegment("MRG", line, "must follow PID");
            if (mrg) return misplacedSegment("MRG", line, "appears more than once");
            mrg = r.val; message.addSegment(r.val); break;
          }
          case "PV1": {
            const r = this.parsePV1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("PV1", line, r);
            if (!mrg) return misplacedSegment("PV1", line, "must follow MRG");
            if (pv1) return misplacedSegment("PV1", line, "appears more than once");
            pv1 = r.val; message.addSegment(r.val); break;
          }
          default:
            console.warn(`Skipping unsupported segment type '${segmentType}' at line ${line}`);
            break;
        }
      }

      if (!pid) return { ok: false, err: new Err(`${this.messageName} message must contain a PID segment`) };
      if (!mrg) return { ok: false, err: new Err(`${this.messageName} message must contain a MRG segment`) };

      return { ok: true, val: { message, msh, sftList, evn, pid, pd1, mrg, pv1 } };
    } catch (error) {
      return { ok: false, err: new Err(`Failed to parse ${this.messageName} message: ${error}`) };
    }
  }
}

/** Parses an HL7 ADT^A34 (2.5) message string into a structured result. */
export function parseADT_A34(messageString: string): Result<ParsedADT_A34> {
  return new ADT_A34_Parser().parse(messageString);
}
