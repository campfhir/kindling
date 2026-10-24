/**
 * Parser for DFT^P03 messages (HL7 2.4): post detail financial transactions.
 *
 * Structure:
 *   MSH EVN PID [PD1] [{ROL}] [PV1] [PV2] [{ROL}] [{DB1}]
 *   [{ COMMON ORDER: [ORC] [ OBR [{NTE}] ] [{ OBX [{NTE}] }] }]
 *   { FINANCIAL: FT1 [{ PR1 [{ROL}] }] [{ FINANCIAL COMMON ORDER: same shape }] }
 *   [{DG1}] [DRG] [{GT1}] [{ IN1 [IN2] [{IN3}] [{ROL}] }] [ACC]
 *
 * Every member of a COMMON ORDER group is optional, so a new order group starts when an order
 * segment appears out of group order (a second ORC, an OBR after an OBX, …). Order groups that
 * follow an FT1 belong to that FINANCIAL group.
 * Compared with v2.3: the ROLs after PD1, PV2 and in INSURANCE, the order groups and repeating
 * IN3 are new. v2.5 adds [{SFT}], TQ1/TQ2 timing and an NTE after FT1.
 *
 * @module
 */
import { Err } from "../../utils/err.ts";
import type { Result } from "../../types/result.ts";
import { MSH } from "../../segments/v2.4/MSH.ts";
import { EVN } from "../../segments/v2.4/EVN.ts";
import { PID } from "../../segments/v2.4/PID.ts";
import { PD1 } from "../../segments/v2.4/PD1.ts";
import { ROL } from "../../segments/v2.4/ROL.ts";
import { PV1 } from "../../segments/v2.4/PV1.ts";
import { PV2 } from "../../segments/v2.4/PV2.ts";
import { DB1 } from "../../segments/v2.4/DB1.ts";
import { ORC } from "../../segments/v2.4/ORC.ts";
import { OBR } from "../../segments/v2.4/OBR.ts";
import { NTE } from "../../segments/v2.4/NTE.ts";
import { OBX } from "../../segments/v2.4/OBX.ts";
import { FT1 } from "../../segments/v2.4/FT1.ts";
import { PR1 } from "../../segments/v2.4/PR1.ts";
import { DG1 } from "../../segments/v2.4/DG1.ts";
import { DRG } from "../../segments/v2.4/DRG.ts";
import { GT1 } from "../../segments/v2.4/GT1.ts";
import { IN1 } from "../../segments/v2.4/IN1.ts";
import { IN2 } from "../../segments/v2.4/IN2.ts";
import { IN3 } from "../../segments/v2.4/IN3.ts";
import { ACC } from "../../segments/v2.4/ACC.ts";
import type { HL7Message } from "../../types/message.ts";
import type { EncodingCharacters } from "../../types/encoding.ts";
import {
  misplacedSegment,
  readMessageHeader,
  segmentParseFailure,
} from "../../utils/messageParsing.ts";

/** ParsedDFTObservation — an OBX with the NTEs that follow it. */
export interface ParsedDFTObservation {
  /** The obx value. */
  obx: OBX;
  /** The nte list value. */
  nteList: NTE[];
}

/** ParsedDFTOrder — a COMMON ORDER group: optional ORC, OBR with notes, observations. */
export interface ParsedDFTOrder {
  /** The orc value. */
  orc?: ORC;
  /** The obr value. */
  obr?: OBR;
  /** The obr nte list value (notes after OBR). */
  obrNteList: NTE[];
  /** The observations value. */
  observations: ParsedDFTObservation[];
}

/** The order groups inside a FINANCIAL group have the same shape as the top-level ones. */
export type ParsedDFTFinancialOrder = ParsedDFTOrder;
/** Observation inside a financial order group. */
export type ParsedDFTFinancialObservation = ParsedDFTObservation;

/** ParsedDFTProcedure — a PR1 with its ROLs, inside a FINANCIAL group. */
export interface ParsedDFTProcedure {
  /** The pr1 value. */
  pr1: PR1;
  /** The rol list value. */
  rolList: ROL[];
}

/** ParsedDFTFinancial — a FINANCIAL group: FT1, procedures and order groups. */
export interface ParsedDFTFinancial {
  /** The ft1 value. */
  ft1: FT1;
  /** The procedures value. */
  procedures: ParsedDFTProcedure[];
  /** The orders value (FINANCIAL COMMON ORDER groups). */
  orders: ParsedDFTFinancialOrder[];
}

/** ParsedDFTInsurance — an INSURANCE group: IN1 with its IN2, IN3s and ROLs. */
export interface ParsedDFTInsurance {
  /** The in1 value. */
  in1: IN1;
  /** The in2 value. */
  in2?: IN2;
  /** The in3 list value. */
  in3List: IN3[];
  /** The rol list value. */
  rolList: ROL[];
}

/** Structured result of parsing an HL7 DFT^P03 (2.4) message. */
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
  /** The rol list value (patient-level ROLs, after PD1). */
  rolList: ROL[];
  /** The pv1 value. */
  pv1?: PV1;
  /** The pv2 value. */
  pv2?: PV2;
  /** The visit rol list value (ROLs after PV1/PV2). */
  visitRolList: ROL[];
  /** The db1 list value. */
  db1List: DB1[];
  /** The orders value (COMMON ORDER groups before the first FT1). */
  orders: ParsedDFTOrder[];
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

/** Parser for HL7 DFT^P03 (2.4) messages. */
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
  /** Parse rol. */
  protected parseROL(s: string, e: EncodingCharacters): Result<ROL> { return ROL.parse(s, e); }
  /** Parse pv1. */
  protected parsePV1(s: string, e: EncodingCharacters): Result<PV1> { return PV1.parse(s, e); }
  /** Parse pv2. */
  protected parsePV2(s: string, e: EncodingCharacters): Result<PV2> { return PV2.parse(s, e); }
  /** Parse db1. */
  protected parseDB1(s: string, e: EncodingCharacters): Result<DB1> { return DB1.parse(s, e); }
  /** Parse orc. */
  protected parseORC(s: string, e: EncodingCharacters): Result<ORC> { return ORC.parse(s, e); }
  /** Parse obr. */
  protected parseOBR(s: string, e: EncodingCharacters): Result<OBR> { return OBR.parse(s, e); }
  /** Parse nte. */
  protected parseNTE(s: string, e: EncodingCharacters): Result<NTE> { return NTE.parse(s, e); }
  /** Parse obx. */
  protected parseOBX(s: string, e: EncodingCharacters): Result<OBX> { return OBX.parse(s, e); }
  /** Parse ft1. */
  protected parseFT1(s: string, e: EncodingCharacters): Result<FT1> { return FT1.parse(s, e); }
  /** Parse pr1. */
  protected parsePR1(s: string, e: EncodingCharacters): Result<PR1> { return PR1.parse(s, e); }
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
      const rolList: ROL[] = [];
      let pv1: PV1 | undefined;
      let pv2: PV2 | undefined;
      const visitRolList: ROL[] = [];
      const db1List: DB1[] = [];
      const orders: ParsedDFTOrder[] = [];
      const financials: ParsedDFTFinancial[] = [];
      const dg1List: DG1[] = [];
      let drg: DRG | undefined;
      const gt1List: GT1[] = [];
      const insurances: ParsedDFTInsurance[] = [];
      let acc: ACC | undefined;

      let financial: ParsedDFTFinancial | undefined;
      let procedure: ParsedDFTProcedure | undefined;
      let order: ParsedDFTOrder | undefined;
      let orderLastIndex = -1; // ORC 0, TQ1 1, OBR 2, OBX 3
      let observation: ParsedDFTObservation | undefined;
      let insurance: ParsedDFTInsurance | undefined;
      let visitRolOpen = false;
      let afterFinancials = false;

      // Returns the order group an order segment belongs to, opening a new one when the segment
      // cannot follow the previous order segment within the same group.
      const placeOrder = (index: number, single: boolean): ParsedDFTOrder => {
        visitRolOpen = false;
        if (!order || index < orderLastIndex || (single && index === orderLastIndex)) {
          order = { obrNteList: [], observations: [] };
          (financial ? financial.orders : orders).push(order);
        }
        orderLastIndex = index;
        if (index !== 3) observation = undefined;
        return order;
      };
      const closeOrders = () => { order = undefined; orderLastIndex = -1; observation = undefined; };

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
            if (!pid || pd1 || pv1 || rolList.length || db1List.length || order || financial) return misplacedSegment("PD1", line, "must directly follow PID");
            pd1 = r.val; message.addSegment(r.val); break;
          }
          case "ROL": {
            const r = this.parseROL(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("ROL", line, r);
            if (insurance) insurance.rolList.push(r.val);
            else if (procedure) procedure.rolList.push(r.val);
            else if (visitRolOpen) visitRolList.push(r.val);
            else if (pid && !pv1 && !db1List.length && !order && !financial) rolList.push(r.val);
            else return misplacedSegment("ROL", line, "must follow PD1, PV1/PV2, a PR1 or an insurance segment");
            message.addSegment(r.val); break;
          }
          case "PV1": {
            const r = this.parsePV1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("PV1", line, r);
            if (!pid || pv1 || db1List.length || order || financial) return misplacedSegment("PV1", line, "must follow PID and precede DB1, the order groups and FT1");
            pv1 = r.val; visitRolOpen = true; message.addSegment(r.val); break;
          }
          case "PV2": {
            const r = this.parsePV2(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("PV2", line, r);
            if (!pv1 || pv2 || visitRolList.length || db1List.length || order || financial) return misplacedSegment("PV2", line, "must directly follow PV1");
            pv2 = r.val; visitRolOpen = true; message.addSegment(r.val); break;
          }
          case "DB1": {
            const r = this.parseDB1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("DB1", line, r);
            if (!pid || order || financial) return misplacedSegment("DB1", line, "must follow PID and precede the order groups and FT1");
            visitRolOpen = false;
            db1List.push(r.val); message.addSegment(r.val); break;
          }
          case "ORC": {
            const r = this.parseORC(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("ORC", line, r);
            if (!pid) return misplacedSegment("ORC", line, "must follow PID");
            if (afterFinancials) return misplacedSegment("ORC", line, "must appear before DG1, DRG, GT1, IN1 and ACC");
            if (financial && financial.procedures.length && !financial.orders.length) procedure = undefined;
            order = placeOrder(0, true);
            order.orc = r.val; message.addSegment(r.val); break;
          }
          case "OBR": {
            const r = this.parseOBR(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("OBR", line, r);
            if (!pid) return misplacedSegment("OBR", line, "must follow PID");
            if (afterFinancials) return misplacedSegment("OBR", line, "must appear before DG1, DRG, GT1, IN1 and ACC");
            if (financial && financial.procedures.length && !financial.orders.length) procedure = undefined;
            order = placeOrder(2, true);
            order.obr = r.val; message.addSegment(r.val); break;
          }
          case "NTE": {
            const r = this.parseNTE(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("NTE", line, r);
            if (observation) observation.nteList.push(r.val);
            else if (order && order.obr && orderLastIndex === 2) order.obrNteList.push(r.val);
            else return misplacedSegment("NTE", line, "must follow an OBR or an OBX segment");
            message.addSegment(r.val); break;
          }
          case "OBX": {
            const r = this.parseOBX(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("OBX", line, r);
            if (!pid) return misplacedSegment("OBX", line, "must follow PID");
            if (afterFinancials) return misplacedSegment("OBX", line, "must appear before DG1, DRG, GT1, IN1 and ACC");
            if (financial && financial.procedures.length && !financial.orders.length) procedure = undefined;
            order = placeOrder(3, false);
            observation = { obx: r.val, nteList: [] }; order.observations.push(observation); message.addSegment(r.val); break;
          }
          case "FT1": {
            const r = this.parseFT1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("FT1", line, r);
            if (!pid) return misplacedSegment("FT1", line, "must follow PID");
            if (afterFinancials) return misplacedSegment("FT1", line, "must appear before DG1, DRG, GT1, IN1 and ACC");
            closeOrders(); procedure = undefined; visitRolOpen = false;
            financial = { ft1: r.val, procedures: [], orders: [] }; financials.push(financial); message.addSegment(r.val); break;
          }
          case "PR1": {
            const r = this.parsePR1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("PR1", line, r);
            if (!financial || afterFinancials) return misplacedSegment("PR1", line, "must follow an FT1 segment");
            if (financial.orders.length) return misplacedSegment("PR1", line, "must appear before the order groups of its FT1");
            closeOrders();
            procedure = { pr1: r.val, rolList: [] }; financial.procedures.push(procedure); message.addSegment(r.val); break;
          }
          case "DG1": {
            const r = this.parseDG1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("DG1", line, r);
            if (!financial) return misplacedSegment("DG1", line, "must follow the FT1 segments");
            afterFinancials = true; closeOrders(); procedure = undefined;
            dg1List.push(r.val); message.addSegment(r.val); break;
          }
          case "DRG": {
            const r = this.parseDRG(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("DRG", line, r);
            if (!financial) return misplacedSegment("DRG", line, "must follow the FT1 segments");
            if (drg) return misplacedSegment("DRG", line, "appears more than once");
            afterFinancials = true; closeOrders(); procedure = undefined;
            drg = r.val; message.addSegment(r.val); break;
          }
          case "GT1": {
            const r = this.parseGT1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("GT1", line, r);
            if (!financial) return misplacedSegment("GT1", line, "must follow the FT1 segments");
            afterFinancials = true; closeOrders(); procedure = undefined;
            gt1List.push(r.val); message.addSegment(r.val); break;
          }
          case "IN1": {
            const r = this.parseIN1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("IN1", line, r);
            if (!financial) return misplacedSegment("IN1", line, "must follow the FT1 segments");
            afterFinancials = true; closeOrders(); procedure = undefined;
            insurance = { in1: r.val, in3List: [], rolList: [] }; insurances.push(insurance); message.addSegment(r.val); break;
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
            if (!financial) return misplacedSegment("ACC", line, "must follow the FT1 segments");
            if (acc) return misplacedSegment("ACC", line, "appears more than once");
            afterFinancials = true; closeOrders(); procedure = undefined; insurance = undefined;
            acc = r.val; message.addSegment(r.val); break;
          }
          default:
            console.warn(`Skipping unsupported segment type '${segmentType}' at line ${line}`);
            break;
        }
      }

      if (!evn) return { ok: false, err: new Err(`${this.messageName} message must contain an EVN segment`) };
      if (!pid) return { ok: false, err: new Err(`${this.messageName} message must contain a PID segment`) };
      if (financials.length === 0) return { ok: false, err: new Err(`${this.messageName} message must contain at least one FT1 segment`) };

      return { ok: true, val: { message, msh, evn, pid, pd1, rolList, pv1, pv2, visitRolList, db1List, orders, financials, dg1List, drg, gt1List, insurances, acc } };
    } catch (error) {
      return { ok: false, err: new Err(`Failed to parse ${this.messageName} message: ${error}`) };
    }
  }
}

/** Parses an HL7 DFT^P03 (2.4) message string into a structured result. */
export function parseDFT_P03(messageString: string): Result<ParsedDFT_P03> {
  return new DFT_P03_Parser().parse(messageString);
}
