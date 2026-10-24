/**
 * Parser for BAR^P02 messages (HL7 2.5): purge patient accounts. Structure: MSH [{SFT}] EVN { PID [PD1] [PV1] [{DB1}] }
 * Compared with v2.3/v2.4 only [{SFT}] is new (identical in v2.5.1).
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
import { PV1 } from "../../segments/v2.5/PV1.ts";
import { DB1 } from "../../segments/v2.5/DB1.ts";
import type { HL7Message } from "../../types/message.ts";
import type { EncodingCharacters } from "../../types/encoding.ts";
import {
  misplacedSegment,
  readMessageHeader,
  segmentParseFailure,
} from "../../utils/messageParsing.ts";

/** ParsedBARPurgePatient — one PATIENT group of a BAR^P02 message. */
export interface ParsedBARPurgePatient {
  /** The pid value. */
  pid: PID;
  /** The pd1 value. */
  pd1?: PD1;
  /** The pv1 value. */
  pv1?: PV1;
  /** The db1 list value. */
  db1List: DB1[];
}

/** Structured result of parsing an HL7 BAR^P02 (v2.3) message. */
export interface ParsedBAR_P02 {
  /** The message value. */
  message: HL7Message;
  /** The msh value. */
  msh: MSH;
  /** The software segments, which follow MSH. */
  sftList: SFT[];
  /** The evn value. */
  evn: EVN;
  /** The patients value (at least one). */
  patients: ParsedBARPurgePatient[];
}

/** Parser for HL7 BAR^P02 (v2.3) messages. */
export class BAR_P02_Parser {
  /** The message name value. */
  protected readonly messageName: string = "BAR_P02";

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
  /** Parse pv1. */
  protected parsePV1(s: string, e: EncodingCharacters): Result<PV1> { return PV1.parse(s, e); }
  /** Parse db1. */
  protected parseDB1(s: string, e: EncodingCharacters): Result<DB1> { return DB1.parse(s, e); }

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedBAR_P02> {
    try {
      const header = readMessageHeader(messageString, (s) => this.parseMSH(s));
      if (!header.ok || !header.val) return header as Result<never>;
      const { segments, msh, encoding, message } = header.val;

      const sftList: SFT[] = [];
      let evn: EVN | undefined;
      const patients: ParsedBARPurgePatient[] = [];
      let patient: ParsedBARPurgePatient | undefined;

      for (let i = 1; i < segments.length; i++) {
        const segmentStr = segments[i];
        const segmentType = segmentStr.substring(0, 3);
        const line = i + 1;

        switch (segmentType) {
          case "SFT": {
            const r = this.parseSFT(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("SFT", line, r);
            if (evn) return misplacedSegment("SFT", line, "must appear before the EVN segment");
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
            if (!evn) return misplacedSegment("PID", line, "must follow the EVN segment");
            patient = { pid: r.val, db1List: [] }; patients.push(patient); message.addSegment(r.val); break;
          }
          case "PD1": {
            const r = this.parsePD1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("PD1", line, r);
            if (!patient) return misplacedSegment("PD1", line, "must follow a PID segment");
            if (patient.pd1) return misplacedSegment("PD1", line, "appears more than once for the same patient");
            patient.pd1 = r.val; message.addSegment(r.val); break;
          }
          case "PV1": {
            const r = this.parsePV1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("PV1", line, r);
            if (!patient) return misplacedSegment("PV1", line, "must follow a PID segment");
            if (patient.pv1) return misplacedSegment("PV1", line, "appears more than once for the same patient");
            patient.pv1 = r.val; message.addSegment(r.val); break;
          }
          case "DB1": {
            const r = this.parseDB1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("DB1", line, r);
            if (!patient) return misplacedSegment("DB1", line, "must follow a PID segment");
            patient.db1List.push(r.val); message.addSegment(r.val); break;
          }
          default:
            console.warn(`Skipping unsupported segment type '${segmentType}' at line ${line}`);
            break;
        }
      }

      if (!evn) return { ok: false, err: new Err(`${this.messageName} message must contain an EVN segment`) };
      if (patients.length === 0) return { ok: false, err: new Err(`${this.messageName} message must contain at least one PID segment`) };

      return { ok: true, val: { message, msh, sftList, evn, patients } };
    } catch (error) {
      return { ok: false, err: new Err(`Failed to parse ${this.messageName} message: ${error}`) };
    }
  }
}

/** Parses an HL7 BAR^P02 (v2.3) message string into a structured result. */
export function parseBAR_P02(messageString: string): Result<ParsedBAR_P02> {
  return new BAR_P02_Parser().parse(messageString);
}
