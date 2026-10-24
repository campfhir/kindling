/**
 * Parser for BAR^P01 messages (HL7 v2.3): add patient accounts.
 *
 * Structure:
 *   MSH EVN PID [PD1] { [PV1] [PV2] [{DB1}] [{OBX}] [{AL1}] [{DG1}] [DRG] [{ PR1 [{ROL}] }]
 *   [{GT1}] [{NK1}] [{ IN1 [IN2] [IN3] }] [ACC] [UB1] [UB2] }
 *
 * Every segment of the repeating VISIT group is optional, so a new visit starts whenever a
 * segment appears out of group order: a second PV1, or a DB1 after a DRG, for example. P05
 * (update account) shares this structure.
 *
 * @module
 */
import { Err } from "../../utils/err.ts";
import type { Result } from "../../types/result.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { EVN } from "../../segments/v2.3/EVN.ts";
import { PID } from "../../segments/v2.3/PID.ts";
import { PD1 } from "../../segments/v2.3/PD1.ts";
import { PV1 } from "../../segments/v2.3/PV1.ts";
import { PV2 } from "../../segments/v2.3/PV2.ts";
import { DB1 } from "../../segments/v2.3/DB1.ts";
import { OBX } from "../../segments/v2.3/OBX.ts";
import { AL1 } from "../../segments/v2.3/AL1.ts";
import { DG1 } from "../../segments/v2.3/DG1.ts";
import { DRG } from "../../segments/v2.3/DRG.ts";
import { PR1 } from "../../segments/v2.3/PR1.ts";
import { ROL } from "../../segments/v2.3/ROL.ts";
import { GT1 } from "../../segments/v2.3/GT1.ts";
import { NK1 } from "../../segments/v2.3/NK1.ts";
import { IN1 } from "../../segments/v2.3/IN1.ts";
import { IN2 } from "../../segments/v2.3/IN2.ts";
import { IN3 } from "../../segments/v2.3/IN3.ts";
import { ACC } from "../../segments/v2.3/ACC.ts";
import { UB1 } from "../../segments/v2.3/UB1.ts";
import { UB2 } from "../../segments/v2.3/UB2.ts";
import type { HL7Message } from "../../types/message.ts";
import type { EncodingCharacters } from "../../types/encoding.ts";
import {
  misplacedSegment,
  readMessageHeader,
  segmentParseFailure,
} from "../../utils/messageParsing.ts";

/** ParsedBARProcedure — a PR1 with its ROLs, inside a VISIT group. */
export interface ParsedBARProcedure {
  /** The pr1 value. */
  pr1: PR1;
  /** The rol list value. */
  rolList: ROL[];
}

/** ParsedBARInsurance — an IN1 with its optional IN2 and IN3, inside a VISIT group. */
export interface ParsedBARInsurance {
  /** The in1 value. */
  in1: IN1;
  /** The in2 value. */
  in2?: IN2;
  /** The in3 value. */
  in3?: IN3;
}

/** ParsedBARVisit — one VISIT group (account) of a BAR message. */
export interface ParsedBARVisit {
  /** The pv1 value. */
  pv1?: PV1;
  /** The pv2 value. */
  pv2?: PV2;
  /** The db1 list value. */
  db1List: DB1[];
  /** The obx list value. */
  obxList: OBX[];
  /** The al1 list value. */
  al1List: AL1[];
  /** The dg1 list value. */
  dg1List: DG1[];
  /** The drg value. */
  drg?: DRG;
  /** The procedures value. */
  procedures: ParsedBARProcedure[];
  /** The gt1 list value. */
  gt1List: GT1[];
  /** The nk1 list value. */
  nk1List: NK1[];
  /** The insurances value. */
  insurances: ParsedBARInsurance[];
  /** The acc value. */
  acc?: ACC;
  /** The ub1 value. */
  ub1?: UB1;
  /** The ub2 value. */
  ub2?: UB2;
}

/** Structured result of parsing an HL7 BAR^P01 (v2.3) message. */
export interface ParsedBAR_P01 {
  /** The message value. */
  message: HL7Message;
  /** The msh value. */
  msh: MSH;
  /** The evn value. */
  evn: EVN;
  /** The pid value. */
  pid: PID;
  /** The pd1 value. */
  pd1?: PD1;
  /** The visits value (at least one). */
  visits: ParsedBARVisit[];
}

/** Parser for HL7 BAR^P01 (v2.3) messages. */
export class BAR_P01_Parser {
  /** The message name value. */
  protected readonly messageName: string = "BAR_P01";

  /** Parse msh. */
  protected parseMSH(s: string): Result<MSH> { return MSH.parse(s); }
  /** Parse evn. */
  protected parseEVN(s: string, e: EncodingCharacters): Result<EVN> { return EVN.parse(s, e); }
  /** Parse pid. */
  protected parsePID(s: string, e: EncodingCharacters): Result<PID> { return PID.parse(s, e); }
  /** Parse pd1. */
  protected parsePD1(s: string, e: EncodingCharacters): Result<PD1> { return PD1.parse(s, e); }
  /** Parse pv1. */
  protected parsePV1(s: string, e: EncodingCharacters): Result<PV1> { return PV1.parse(s, e); }
  /** Parse pv2. */
  protected parsePV2(s: string, e: EncodingCharacters): Result<PV2> { return PV2.parse(s, e); }
  /** Parse db1. */
  protected parseDB1(s: string, e: EncodingCharacters): Result<DB1> { return DB1.parse(s, e); }
  /** Parse obx. */
  protected parseOBX(s: string, e: EncodingCharacters): Result<OBX> { return OBX.parse(s, e); }
  /** Parse al1. */
  protected parseAL1(s: string, e: EncodingCharacters): Result<AL1> { return AL1.parse(s, e); }
  /** Parse dg1. */
  protected parseDG1(s: string, e: EncodingCharacters): Result<DG1> { return DG1.parse(s, e); }
  /** Parse drg. */
  protected parseDRG(s: string, e: EncodingCharacters): Result<DRG> { return DRG.parse(s, e); }
  /** Parse pr1. */
  protected parsePR1(s: string, e: EncodingCharacters): Result<PR1> { return PR1.parse(s, e); }
  /** Parse rol. */
  protected parseROL(s: string, e: EncodingCharacters): Result<ROL> { return ROL.parse(s, e); }
  /** Parse gt1. */
  protected parseGT1(s: string, e: EncodingCharacters): Result<GT1> { return GT1.parse(s, e); }
  /** Parse nk1. */
  protected parseNK1(s: string, e: EncodingCharacters): Result<NK1> { return NK1.parse(s, e); }
  /** Parse in1. */
  protected parseIN1(s: string, e: EncodingCharacters): Result<IN1> { return IN1.parse(s, e); }
  /** Parse in2. */
  protected parseIN2(s: string, e: EncodingCharacters): Result<IN2> { return IN2.parse(s, e); }
  /** Parse in3. */
  protected parseIN3(s: string, e: EncodingCharacters): Result<IN3> { return IN3.parse(s, e); }
  /** Parse acc. */
  protected parseACC(s: string, e: EncodingCharacters): Result<ACC> { return ACC.parse(s, e); }
  /** Parse ub1. */
  protected parseUB1(s: string, e: EncodingCharacters): Result<UB1> { return UB1.parse(s, e); }
  /** Parse ub2. */
  protected parseUB2(s: string, e: EncodingCharacters): Result<UB2> { return UB2.parse(s, e); }

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedBAR_P01> {
    try {
      const header = readMessageHeader(messageString, (s) => this.parseMSH(s));
      if (!header.ok || !header.val) return header as Result<never>;
      const { segments, msh, encoding, message } = header.val;

      let evn: EVN | undefined;
      let pid: PID | undefined;
      let pd1: PD1 | undefined;
      const visits: ParsedBARVisit[] = [];
      let visit: ParsedBARVisit | undefined;
      let procedure: ParsedBARProcedure | undefined;
      let insurance: ParsedBARInsurance | undefined;
      // Position (in group order) of the last segment placed in the current visit.
      let lastIndex = -1;

      const newVisit = (): ParsedBARVisit => ({
        db1List: [], obxList: [], al1List: [], dg1List: [], procedures: [], gt1List: [], nk1List: [], insurances: [],
      });
      // Returns the visit a segment at `index` belongs to, opening a new one when the segment
      // cannot follow the previous segment within the same visit.
      const place = (index: number, single: boolean): ParsedBARVisit => {
        if (!visit || index < lastIndex || (single && index === lastIndex)) {
          visit = newVisit();
          visits.push(visit);
        }
        lastIndex = index;
        procedure = undefined;
        insurance = undefined;
        return visit;
      };

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
          case "PD1": {
            const r = this.parsePD1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("PD1", line, r);
            if (!pid || pd1 || visit) return misplacedSegment("PD1", line, "must directly follow PID");
            pd1 = r.val; message.addSegment(r.val); break;
          }
          case "PV1": {
            const r = this.parsePV1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("PV1", line, r);
            if (!pid) return misplacedSegment("PV1", line, "must follow PID");
            visit = place(0, true);
            visit.pv1 = r.val; message.addSegment(r.val); break;
          }
          case "PV2": {
            const r = this.parsePV2(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("PV2", line, r);
            if (!pid) return misplacedSegment("PV2", line, "must follow PID");
            visit = place(1, true);
            visit.pv2 = r.val; message.addSegment(r.val); break;
          }
          case "DB1": {
            const r = this.parseDB1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("DB1", line, r);
            if (!pid) return misplacedSegment("DB1", line, "must follow PID");
            visit = place(2, false);
            visit.db1List.push(r.val); message.addSegment(r.val); break;
          }
          case "OBX": {
            const r = this.parseOBX(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("OBX", line, r);
            if (!pid) return misplacedSegment("OBX", line, "must follow PID");
            visit = place(3, false);
            visit.obxList.push(r.val); message.addSegment(r.val); break;
          }
          case "AL1": {
            const r = this.parseAL1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("AL1", line, r);
            if (!pid) return misplacedSegment("AL1", line, "must follow PID");
            visit = place(4, false);
            visit.al1List.push(r.val); message.addSegment(r.val); break;
          }
          case "DG1": {
            const r = this.parseDG1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("DG1", line, r);
            if (!pid) return misplacedSegment("DG1", line, "must follow PID");
            visit = place(5, false);
            visit.dg1List.push(r.val); message.addSegment(r.val); break;
          }
          case "DRG": {
            const r = this.parseDRG(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("DRG", line, r);
            if (!pid) return misplacedSegment("DRG", line, "must follow PID");
            visit = place(6, true);
            visit.drg = r.val; message.addSegment(r.val); break;
          }
          case "PR1": {
            const r = this.parsePR1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("PR1", line, r);
            if (!pid) return misplacedSegment("PR1", line, "must follow PID");
            visit = place(7, false);
            procedure = { pr1: r.val, rolList: [] }; visit.procedures.push(procedure); message.addSegment(r.val); break;
          }
          case "GT1": {
            const r = this.parseGT1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("GT1", line, r);
            if (!pid) return misplacedSegment("GT1", line, "must follow PID");
            visit = place(8, false);
            visit.gt1List.push(r.val); message.addSegment(r.val); break;
          }
          case "NK1": {
            const r = this.parseNK1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("NK1", line, r);
            if (!pid) return misplacedSegment("NK1", line, "must follow PID");
            visit = place(9, false);
            visit.nk1List.push(r.val); message.addSegment(r.val); break;
          }
          case "IN1": {
            const r = this.parseIN1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("IN1", line, r);
            if (!pid) return misplacedSegment("IN1", line, "must follow PID");
            visit = place(10, false);
            insurance = { in1: r.val }; visit.insurances.push(insurance); message.addSegment(r.val); break;
          }
          case "ACC": {
            const r = this.parseACC(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("ACC", line, r);
            if (!pid) return misplacedSegment("ACC", line, "must follow PID");
            visit = place(11, true);
            visit.acc = r.val; message.addSegment(r.val); break;
          }
          case "UB1": {
            const r = this.parseUB1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("UB1", line, r);
            if (!pid) return misplacedSegment("UB1", line, "must follow PID");
            visit = place(12, true);
            visit.ub1 = r.val; message.addSegment(r.val); break;
          }
          case "UB2": {
            const r = this.parseUB2(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("UB2", line, r);
            if (!pid) return misplacedSegment("UB2", line, "must follow PID");
            visit = place(13, true);
            visit.ub2 = r.val; message.addSegment(r.val); break;
          }
          case "ROL": {
            const r = this.parseROL(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("ROL", line, r);
            if (!procedure) return misplacedSegment("ROL", line, "must follow a PR1 segment");
            procedure.rolList.push(r.val); message.addSegment(r.val); break;
          }
          case "IN2": {
            const r = this.parseIN2(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("IN2", line, r);
            if (!insurance || insurance.in2 || insurance.in3) return misplacedSegment("IN2", line, "must directly follow an IN1 segment");
            insurance.in2 = r.val; message.addSegment(r.val); break;
          }
          case "IN3": {
            const r = this.parseIN3(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("IN3", line, r);
            if (!insurance || insurance.in3) return misplacedSegment("IN3", line, "must follow IN1 or IN2 and appear once per insurance");
            insurance.in3 = r.val; message.addSegment(r.val); break;
          }
          default:
            console.warn(`Skipping unsupported segment type '${segmentType}' at line ${line}`);
            break;
        }
      }

      if (!evn) return { ok: false, err: new Err(`${this.messageName} message must contain an EVN segment`) };
      if (!pid) return { ok: false, err: new Err(`${this.messageName} message must contain a PID segment`) };
      if (visits.length === 0) return { ok: false, err: new Err(`${this.messageName} message must contain at least one VISIT group segment (PV1, PV2, DB1, OBX, AL1, DG1, DRG, PR1, GT1, NK1, IN1, ACC, UB1 or UB2)`) };

      return { ok: true, val: { message, msh, evn, pid, pd1, visits } };
    } catch (error) {
      return { ok: false, err: new Err(`Failed to parse ${this.messageName} message: ${error}`) };
    }
  }
}

/** Parses an HL7 BAR^P01 (v2.3) message string into a structured result. */
export function parseBAR_P01(messageString: string): Result<ParsedBAR_P01> {
  return new BAR_P01_Parser().parse(messageString);
}
