/**
 * Parser for ADT^A01 messages (HL7 v2.5): admit/visit notification.
 *
 * Structure (v2.5, identical in v2.5.1):
 *   MSH [{SFT}] EVN PID [PD1] [{ROL}] [{NK1}] PV1 [PV2] [{ROL}] [{DB1}] [{OBX}] [{AL1}] [{DG1}] [DRG]
 *   [{ PR1 [{ROL}] }] [{GT1}] [{ IN1 [IN2] [{IN3}] [{ROL}] }] [ACC] [UB1] [UB2] [PDA]
 *
 * Compared with v2.3: [{SFT}], the ROLs after PV2 and inside INSURANCE, repeating IN3 and the
 * trailing PDA are new. The other A01-shaped events (A02–A16, A21–A23, A25–A29, A31–A33, A38)
 * reuse this parser under their own names.
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
import { ROL } from "../../segments/v2.5/ROL.ts";
import { NK1 } from "../../segments/v2.5/NK1.ts";
import { PV1 } from "../../segments/v2.5/PV1.ts";
import { PV2 } from "../../segments/v2.5/PV2.ts";
import { DB1 } from "../../segments/v2.5/DB1.ts";
import { OBX } from "../../segments/v2.5/OBX.ts";
import { AL1 } from "../../segments/v2.5/AL1.ts";
import { DG1 } from "../../segments/v2.5/DG1.ts";
import { DRG } from "../../segments/v2.5/DRG.ts";
import { PR1 } from "../../segments/v2.5/PR1.ts";
import { GT1 } from "../../segments/v2.5/GT1.ts";
import { IN1 } from "../../segments/v2.5/IN1.ts";
import { IN2 } from "../../segments/v2.5/IN2.ts";
import { IN3 } from "../../segments/v2.5/IN3.ts";
import { ACC } from "../../segments/v2.5/ACC.ts";
import { UB1 } from "../../segments/v2.5/UB1.ts";
import { UB2 } from "../../segments/v2.5/UB2.ts";
import { PDA } from "../../segments/v2.5/PDA.ts";
import type { HL7Message } from "../../types/message.ts";
import type { EncodingCharacters } from "../../types/encoding.ts";
import {
  misplacedSegment,
  readMessageHeader,
  segmentParseFailure,
} from "../../utils/messageParsing.ts";

/** ParsedProcedure — a PR1 with its ROLs. */
export interface ParsedProcedure {
  /** The pr1 value. */
  pr1: PR1;
  /** The rol list value. */
  rolList?: ROL[];
}

/** ParsedInsuranceGroup — an IN1 with its IN2, IN3s and ROLs. */
export interface ParsedInsuranceGroup {
  /** The in1 value. */
  in1: IN1;
  /** The in2 value. */
  in2?: IN2;
  /** The in3 list value. */
  in3List?: IN3[];
  /** The rol list value. */
  rolList?: ROL[];
}

/** Structured result of parsing an HL7 ADT^A01 (v2.5) message. */
export interface ParsedADT_A01 {
  /** The message value. */
  message: HL7Message;
  /** The msh value. */
  msh: MSH;
  /** The software segments, which follow MSH. */
  sftList?: SFT[];
  /** The evn value. */
  evn?: EVN;
  /** The pid value. */
  pid: PID;
  /** The pd1 value. */
  pd1?: PD1;
  /** The rol list value (patient-level ROLs, after PD1). */
  rolList?: ROL[];
  /** The nk1 list value. */
  nk1List?: NK1[];
  /** The pv1 value. */
  pv1?: PV1;
  /** The pv2 value. */
  pv2?: PV2;
  /** The visit rol list value (ROLs after PV1/PV2). */
  visitRolList?: ROL[];
  /** The db1 list value. */
  db1List?: DB1[];
  /** The obx list value. */
  obxList?: OBX[];
  /** The al1 list value. */
  al1List?: AL1[];
  /** The dg1 list value. */
  dg1List?: DG1[];
  /** The drg value. */
  drg?: DRG;
  /** The procedures value. */
  procedures?: ParsedProcedure[];
  /** The gt1 list value. */
  gt1List?: GT1[];
  /** The insurance groups value. */
  insuranceGroups?: ParsedInsuranceGroup[];
  /** The acc value. */
  acc?: ACC;
  /** The ub1 value. */
  ub1?: UB1;
  /** The ub2 value. */
  ub2?: UB2;
  /** The pda value. */
  pda?: PDA;
}

const some = <T,>(list: T[]): T[] | undefined => (list.length ? list : undefined);

/** Parser for HL7 ADT^A01 (v2.5) messages. */
export class ADT_A01_Parser {
  /** The message name value. */
  protected readonly messageName: string = "ADT_A01";

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
  /** Parse rol. */
  protected parseROL(s: string, e: EncodingCharacters): Result<ROL> { return ROL.parse(s, e); }
  /** Parse nk1. */
  protected parseNK1(s: string, e: EncodingCharacters): Result<NK1> { return NK1.parse(s, e); }
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
  /** Parse ub1. */
  protected parseUB1(s: string, e: EncodingCharacters): Result<UB1> { return UB1.parse(s, e); }
  /** Parse ub2. */
  protected parseUB2(s: string, e: EncodingCharacters): Result<UB2> { return UB2.parse(s, e); }
  /** Parse pda. */
  protected parsePDA(s: string, e: EncodingCharacters): Result<PDA> { return PDA.parse(s, e); }

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedADT_A01> {
    try {
      const header = readMessageHeader(messageString, (s) => this.parseMSH(s));
      if (!header.ok || !header.val) return header as Result<never>;
      const { segments, msh, encoding, message } = header.val;

      const sftList: SFT[] = [];
      let evn: EVN | undefined;
      let pid: PID | undefined;
      let pd1: PD1 | undefined;
      const rolList: ROL[] = [];
      const nk1List: NK1[] = [];
      let pv1: PV1 | undefined;
      let pv2: PV2 | undefined;
      const visitRolList: ROL[] = [];
      const db1List: DB1[] = [];
      const obxList: OBX[] = [];
      const al1List: AL1[] = [];
      const dg1List: DG1[] = [];
      let drg: DRG | undefined;
      const procedures: { pr1: PR1; rolList: ROL[] }[] = [];
      const gt1List: GT1[] = [];
      const insuranceGroups: { in1: IN1; in2?: IN2; in3List: IN3[]; rolList: ROL[] }[] = [];
      let acc: ACC | undefined;
      let ub1: UB1 | undefined;
      let ub2: UB2 | undefined;
      let pda: PDA | undefined;
      let procedure: { pr1: PR1; rolList: ROL[] } | undefined;
      let insurance: { in1: IN1; in2?: IN2; in3List: IN3[]; rolList: ROL[] } | undefined;
      // ROLs directly after PV1/PV2 belong to the visit; any later segment ends that window.
      let visitRolOpen = false;
      const leaveVisitHeader = () => { visitRolOpen = false; };
      const leaveGroups = () => { visitRolOpen = false; procedure = undefined; insurance = undefined; };

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
            if (!pid || pd1 || pv1) return misplacedSegment("PD1", line, "must directly follow PID");
            pd1 = r.val; message.addSegment(r.val); break;
          }
          case "ROL": {
            const r = this.parseROL(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("ROL", line, r);
            if (insurance) insurance.rolList.push(r.val);
            else if (procedure) procedure.rolList.push(r.val);
            else if (visitRolOpen) visitRolList.push(r.val);
            else if (pid && !pv1) rolList.push(r.val);
            else return misplacedSegment("ROL", line, "must follow PD1, PV1/PV2, a PR1 or an insurance segment");
            message.addSegment(r.val); break;
          }
          case "NK1": {
            const r = this.parseNK1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("NK1", line, r);
            if (!pid || pv1) return misplacedSegment("NK1", line, "must follow PID and precede PV1");
            nk1List.push(r.val); message.addSegment(r.val); break;
          }
          case "PV1": {
            const r = this.parsePV1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("PV1", line, r);
            if (!pid) return misplacedSegment("PV1", line, "must follow PID");
            if (pv1) return misplacedSegment("PV1", line, "appears more than once");
            pv1 = r.val; visitRolOpen = true; message.addSegment(r.val); break;
          }
          case "PV2": {
            const r = this.parsePV2(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("PV2", line, r);
            if (!pv1 || pv2) return misplacedSegment("PV2", line, "must directly follow PV1");
            pv2 = r.val; visitRolOpen = true; message.addSegment(r.val); break;
          }
          case "DB1": {
            const r = this.parseDB1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("DB1", line, r);
            if (!pid) return misplacedSegment("DB1", line, "must follow PID");
            leaveVisitHeader();
            db1List.push(r.val); message.addSegment(r.val); break;
          }
          case "OBX": {
            const r = this.parseOBX(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("OBX", line, r);
            if (!pid) return misplacedSegment("OBX", line, "must follow PID");
            leaveVisitHeader();
            obxList.push(r.val); message.addSegment(r.val); break;
          }
          case "AL1": {
            const r = this.parseAL1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("AL1", line, r);
            if (!pid) return misplacedSegment("AL1", line, "must follow PID");
            leaveVisitHeader();
            al1List.push(r.val); message.addSegment(r.val); break;
          }
          case "DG1": {
            const r = this.parseDG1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("DG1", line, r);
            if (!pid) return misplacedSegment("DG1", line, "must follow PID");
            leaveVisitHeader();
            dg1List.push(r.val); message.addSegment(r.val); break;
          }
          case "DRG": {
            const r = this.parseDRG(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("DRG", line, r);
            if (!pid) return misplacedSegment("DRG", line, "must follow PID");
            if (drg) return misplacedSegment("DRG", line, "appears more than once");
            leaveVisitHeader();
            drg = r.val; message.addSegment(r.val); break;
          }
          case "PR1": {
            const r = this.parsePR1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("PR1", line, r);
            if (!pid) return misplacedSegment("PR1", line, "must follow PID");
            leaveGroups();
            procedure = { pr1: r.val, rolList: [] }; procedures.push(procedure); message.addSegment(r.val); break;
          }
          case "GT1": {
            const r = this.parseGT1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("GT1", line, r);
            if (!pid) return misplacedSegment("GT1", line, "must follow PID");
            leaveGroups();
            gt1List.push(r.val); message.addSegment(r.val); break;
          }
          case "IN1": {
            const r = this.parseIN1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("IN1", line, r);
            if (!pid) return misplacedSegment("IN1", line, "must follow PID");
            leaveGroups();
            insurance = { in1: r.val, in3List: [], rolList: [] }; insuranceGroups.push(insurance); message.addSegment(r.val); break;
          }
          case "IN2": {
            const r = this.parseIN2(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("IN2", line, r);
            if (!insurance || insurance.in2 || insurance.in3List.length || insurance.rolList.length) return misplacedSegment("IN2", line, "must directly follow an IN1 segment");
            insurance.in2 = r.val; message.addSegment(r.val); break;
          }
          case "IN3": {
            const r = this.parseIN3(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("IN3", line, r);
            if (!insurance || insurance.rolList.length) return misplacedSegment("IN3", line, "must follow IN1 or IN2 in the same insurance");
            insurance.in3List.push(r.val); message.addSegment(r.val); break;
          }
          case "ACC": {
            const r = this.parseACC(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("ACC", line, r);
            if (!pid) return misplacedSegment("ACC", line, "must follow PID");
            if (acc) return misplacedSegment("ACC", line, "appears more than once");
            leaveGroups();
            acc = r.val; message.addSegment(r.val); break;
          }
          case "UB1": {
            const r = this.parseUB1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("UB1", line, r);
            if (!pid) return misplacedSegment("UB1", line, "must follow PID");
            if (ub1) return misplacedSegment("UB1", line, "appears more than once");
            leaveGroups();
            ub1 = r.val; message.addSegment(r.val); break;
          }
          case "UB2": {
            const r = this.parseUB2(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("UB2", line, r);
            if (!pid) return misplacedSegment("UB2", line, "must follow PID");
            if (ub2) return misplacedSegment("UB2", line, "appears more than once");
            leaveGroups();
            ub2 = r.val; message.addSegment(r.val); break;
          }
          case "PDA": {
            const r = this.parsePDA(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("PDA", line, r);
            if (!pid) return misplacedSegment("PDA", line, "must follow PID");
            if (pda) return misplacedSegment("PDA", line, "appears more than once");
            leaveGroups();
            pda = r.val; message.addSegment(r.val); break;
          }
          default:
            console.warn(`Skipping unsupported segment type '${segmentType}' at line ${line}`);
            break;
        }
      }

      if (!pid) {
        return { ok: false, err: new Err(`${this.messageName} message must contain a PID segment`) };
      }

      return { ok: true, val: {
          message, msh, sftList: some(sftList), evn, pid, pd1,
          rolList: some(rolList), nk1List: some(nk1List), pv1, pv2, visitRolList: some(visitRolList),
          db1List: some(db1List), obxList: some(obxList), al1List: some(al1List), dg1List: some(dg1List), drg,
          procedures: some(procedures.map((p) => ({ pr1: p.pr1, rolList: some(p.rolList) }))),
          gt1List: some(gt1List),
          insuranceGroups: some(insuranceGroups.map((g) => ({ in1: g.in1, in2: g.in2, in3List: some(g.in3List), rolList: some(g.rolList) }))),
          acc, ub1, ub2, pda,
        } };
    } catch (error) {
      return { ok: false, err: new Err(`Failed to parse ${this.messageName} message: ${error}`) };
    }
  }
}

/** Parses an HL7 ADT^A01 (2.5) message string into a structured result. */
export function parseADT_A01(messageString: string): Result<ParsedADT_A01> {
  return new ADT_A01_Parser().parse(messageString);
}
