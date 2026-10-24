/**
 * Parser for DFT^P03 messages (HL7 v2.3): post detail financial transaction.
 *
 * Structure:
 *   MSH EVN PID [PD1] [PV1] [PV2] [{DB1}] [{OBX}] { FT1 [{ PR1 [{ROL}] }] }
 *   [{DG1}] [DRG] [{GT1}] [{ IN1 [IN2] [IN3] }] [ACC]
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
import { FT1 } from "../../segments/v2.3/FT1.ts";
import { PR1 } from "../../segments/v2.3/PR1.ts";
import { ROL } from "../../segments/v2.3/ROL.ts";
import { DG1 } from "../../segments/v2.3/DG1.ts";
import { DRG } from "../../segments/v2.3/DRG.ts";
import { GT1 } from "../../segments/v2.3/GT1.ts";
import { IN1 } from "../../segments/v2.3/IN1.ts";
import { IN2 } from "../../segments/v2.3/IN2.ts";
import { IN3 } from "../../segments/v2.3/IN3.ts";
import { ACC } from "../../segments/v2.3/ACC.ts";
import type { HL7Message } from "../../types/message.ts";
import type { EncodingCharacters } from "../../types/encoding.ts";
import {
  misplacedSegment,
  readMessageHeader,
  segmentParseFailure,
} from "../../utils/messageParsing.ts";

/** ParsedDFTProcedure — a PR1 with its ROLs, inside a FINANCIAL group. */
export interface ParsedDFTProcedure {
  /** The pr1 value. */
  pr1: PR1;
  /** The rol list value. */
  rolList: ROL[];
}

/** ParsedDFTFinancial — a FINANCIAL group: the FT1 and its procedures. */
export interface ParsedDFTFinancial {
  /** The ft1 value. */
  ft1: FT1;
  /** The procedures value. */
  procedures: ParsedDFTProcedure[];
}

/** ParsedDFTInsurance — an INSURANCE group: IN1 with its optional IN2 and IN3. */
export interface ParsedDFTInsurance {
  /** The in1 value. */
  in1: IN1;
  /** The in2 value. */
  in2?: IN2;
  /** The in3 value. */
  in3?: IN3;
}

/** Structured result of parsing an HL7 DFT^P03 (v2.3) message. */
export interface ParsedDFT_P03 {
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
  /** The pv1 value. */
  pv1?: PV1;
  /** The pv2 value. */
  pv2?: PV2;
  /** The db1 list value. */
  db1List: DB1[];
  /** The obx list value. */
  obxList: OBX[];
  /** The financials value (FT1 groups; at least one). */
  financials: ParsedDFTFinancial[];
  /** The dg1 list value. */
  dg1List: DG1[];
  /** The drg value. */
  drg?: DRG;
  /** The gt1 list value. */
  gt1List: GT1[];
  /** The insurances value. */
  insurances: ParsedDFTInsurance[];
  /** The acc value. */
  acc?: ACC;
}

/** Parser for HL7 DFT^P03 (v2.3) messages. */
export class DFT_P03_Parser {
  /** The message name value. */
  protected readonly messageName: string = "DFT_P03";

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
  /** Parse ft1. */
  protected parseFT1(s: string, e: EncodingCharacters): Result<FT1> { return FT1.parse(s, e); }
  /** Parse pr1. */
  protected parsePR1(s: string, e: EncodingCharacters): Result<PR1> { return PR1.parse(s, e); }
  /** Parse rol. */
  protected parseROL(s: string, e: EncodingCharacters): Result<ROL> { return ROL.parse(s, e); }
  /** Parse dg1. */
  protected parseDG1(s: string, e: EncodingCharacters): Result<DG1> { return DG1.parse(s, e); }
  /** Parse drg. */
  protected parseDRG(s: string, e: EncodingCharacters): Result<DRG> { return DRG.parse(s, e); }
  /** Parse gt1. */
  protected parseGT1(s: string, e: EncodingCharacters): Result<GT1> { return GT1.parse(s, e); }
  /** Parse in1. */
  protected parseIN1(s: string, e: EncodingCharacters): Result<IN1> { return IN1.parse(s, e); }
  /** Parse in2. */
  protected parseIN2(s: string, e: EncodingCharacters): Result<IN2> { return IN2.parse(s, e); }
  /** Parse in3. */
  protected parseIN3(s: string, e: EncodingCharacters): Result<IN3> { return IN3.parse(s, e); }
  /** Parse acc. */
  protected parseACC(s: string, e: EncodingCharacters): Result<ACC> { return ACC.parse(s, e); }

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedDFT_P03> {
    try {
      const header = readMessageHeader(messageString, (s) => this.parseMSH(s));
      if (!header.ok || !header.val) return header as Result<never>;
      const { segments, msh, encoding, message } = header.val;

      let evn: EVN | undefined;
      let pid: PID | undefined;
      let pd1: PD1 | undefined;
      let pv1: PV1 | undefined;
      let pv2: PV2 | undefined;
      const db1List: DB1[] = [];
      const obxList: OBX[] = [];
      const financials: ParsedDFTFinancial[] = [];
      const dg1List: DG1[] = [];
      let drg: DRG | undefined;
      const gt1List: GT1[] = [];
      const insurances: ParsedDFTInsurance[] = [];
      let acc: ACC | undefined;
      let financial: ParsedDFTFinancial | undefined;
      let procedure: ParsedDFTProcedure | undefined;
      let insurance: ParsedDFTInsurance | undefined;
      // Once a segment after the FINANCIAL groups has been read, no further FT1/PR1 may follow.
      let afterFinancials = false;

      let line = 0;
      const beforeFinancials = (seg: string) =>
        financial ? misplacedSegment(seg, line, "must appear before the FT1 segments") : null;

      for (let i = 1; i < segments.length; i++) {
        const segmentStr = segments[i];
        const segmentType = segmentStr.substring(0, 3);
        line = i + 1;

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
            if (!pid || pd1) return misplacedSegment("PD1", line, "must follow PID and appear once");
            { const e = beforeFinancials("PD1"); if (e) return e; }
            pd1 = r.val; message.addSegment(r.val); break;
          }
          case "PV1": {
            const r = this.parsePV1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("PV1", line, r);
            if (!pid || pv1) return misplacedSegment("PV1", line, "must follow PID and appear once");
            { const e = beforeFinancials("PV1"); if (e) return e; }
            pv1 = r.val; message.addSegment(r.val); break;
          }
          case "PV2": {
            const r = this.parsePV2(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("PV2", line, r);
            if (!pv1 || pv2) return misplacedSegment("PV2", line, "must follow PV1 and appear once");
            { const e = beforeFinancials("PV2"); if (e) return e; }
            pv2 = r.val; message.addSegment(r.val); break;
          }
          case "DB1": {
            const r = this.parseDB1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("DB1", line, r);
            if (!pid) return misplacedSegment("DB1", line, "must follow PID");
            { const e = beforeFinancials("DB1"); if (e) return e; }
            db1List.push(r.val); message.addSegment(r.val); break;
          }
          case "OBX": {
            const r = this.parseOBX(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("OBX", line, r);
            if (!pid) return misplacedSegment("OBX", line, "must follow PID");
            { const e = beforeFinancials("OBX"); if (e) return e; }
            obxList.push(r.val); message.addSegment(r.val); break;
          }
          case "FT1": {
            const r = this.parseFT1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("FT1", line, r);
            if (!pid) return misplacedSegment("FT1", line, "must follow PID");
            if (afterFinancials) return misplacedSegment("FT1", line, "must appear before DG1, DRG, GT1, IN1 and ACC");
            financial = { ft1: r.val, procedures: [] }; financials.push(financial); procedure = undefined; message.addSegment(r.val); break;
          }
          case "PR1": {
            const r = this.parsePR1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("PR1", line, r);
            if (!financial || afterFinancials) return misplacedSegment("PR1", line, "must follow an FT1 segment");
            procedure = { pr1: r.val, rolList: [] }; financial.procedures.push(procedure); message.addSegment(r.val); break;
          }
          case "ROL": {
            const r = this.parseROL(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("ROL", line, r);
            if (!procedure || afterFinancials) return misplacedSegment("ROL", line, "must follow a PR1 segment");
            procedure.rolList.push(r.val); message.addSegment(r.val); break;
          }
          case "DG1": {
            const r = this.parseDG1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("DG1", line, r);
            if (!financial) return misplacedSegment("DG1", line, "must follow the FT1 segments");
            afterFinancials = true; dg1List.push(r.val); message.addSegment(r.val); break;
          }
          case "DRG": {
            const r = this.parseDRG(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("DRG", line, r);
            if (!financial) return misplacedSegment("DRG", line, "must follow the FT1 segments");
            if (drg) return misplacedSegment("DRG", line, "appears more than once");
            afterFinancials = true; drg = r.val; message.addSegment(r.val); break;
          }
          case "GT1": {
            const r = this.parseGT1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("GT1", line, r);
            if (!financial) return misplacedSegment("GT1", line, "must follow the FT1 segments");
            afterFinancials = true; gt1List.push(r.val); message.addSegment(r.val); break;
          }
          case "IN1": {
            const r = this.parseIN1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("IN1", line, r);
            if (!financial) return misplacedSegment("IN1", line, "must follow the FT1 segments");
            afterFinancials = true; insurance = { in1: r.val }; insurances.push(insurance); message.addSegment(r.val); break;
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
          case "ACC": {
            const r = this.parseACC(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("ACC", line, r);
            if (!financial) return misplacedSegment("ACC", line, "must follow the FT1 segments");
            if (acc) return misplacedSegment("ACC", line, "appears more than once");
            afterFinancials = true; acc = r.val; message.addSegment(r.val); break;
          }
          default:
            console.warn(`Skipping unsupported segment type '${segmentType}' at line ${line}`);
            break;
        }
      }

      if (!evn) return { ok: false, err: new Err(`${this.messageName} message must contain an EVN segment`) };
      if (!pid) return { ok: false, err: new Err(`${this.messageName} message must contain a PID segment`) };
      if (financials.length === 0) return { ok: false, err: new Err(`${this.messageName} message must contain at least one FT1 segment`) };

      return { ok: true, val: { message, msh, evn, pid, pd1, pv1, pv2, db1List, obxList, financials, dg1List, drg, gt1List, insurances, acc } };
    } catch (error) {
      return { ok: false, err: new Err(`Failed to parse ${this.messageName} message: ${error}`) };
    }
  }
}

/** Parses an HL7 DFT^P03 (v2.3) message string into a structured result. */
export function parseDFT_P03(messageString: string): Result<ParsedDFT_P03> {
  return new DFT_P03_Parser().parse(messageString);
}
