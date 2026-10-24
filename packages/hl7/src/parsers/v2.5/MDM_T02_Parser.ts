/**
 * Parser for MDM^T02 messages (HL7 v2.5): original document notification and content.
 *
 * Structure: MSH [{SFT}] EVN PID PV1 [{ ORC [{ TQ1 [{TQ2}] }] OBR [{NTE}] }] TXA { OBX [{NTE}] }
 *
 * T04, T06, T08 and T10 share this structure; v2.5.1 is identical. Compared with v2.3/v2.4: SFT, the COMMON ORDER group
 * (ORC, timing, OBR, NTE) and NTEs after each OBX are new.
 *
 * @module
 */
import { Err } from "../../utils/err.ts";
import type { Result } from "../../types/result.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { EVN } from "../../segments/v2.5/EVN.ts";
import { PID } from "../../segments/v2.5/PID.ts";
import { PV1 } from "../../segments/v2.5/PV1.ts";
import { ORC } from "../../segments/v2.5/ORC.ts";
import { TQ1 } from "../../segments/v2.5/TQ1.ts";
import { TQ2 } from "../../segments/v2.5/TQ2.ts";
import { OBR } from "../../segments/v2.5/OBR.ts";
import { NTE } from "../../segments/v2.5/NTE.ts";
import { TXA } from "../../segments/v2.5/TXA.ts";
import { OBX } from "../../segments/v2.5/OBX.ts";
import type { HL7Message } from "../../types/message.ts";
import type { EncodingCharacters } from "../../types/encoding.ts";
import {
  misplacedSegment,
  readMessageHeader,
  segmentParseFailure,
} from "../../utils/messageParsing.ts";

/** ParsedMDMTiming — a TQ1 with its TQ2 segments. */
export interface ParsedMDMTiming {
  /** The tq1 value. */
  tq1: TQ1;
  /** The tq2 list value. */
  tq2List: TQ2[];
}

/** ParsedMDMOrder — a COMMON ORDER group: ORC, timing, OBR and its NTEs. */
export interface ParsedMDMOrder {
  /** The orc value. */
  orc: ORC;
  /** The timing value. */
  timing: ParsedMDMTiming[];
  /** The obr value. */
  obr: OBR;
  /** The nte list value (notes on the order). */
  nteList: NTE[];
}

/** ParsedMDMObservation — an OBX with the NTEs that follow it. */
export interface ParsedMDMObservation {
  /** The obx value. */
  obx: OBX;
  /** The nte list value. */
  nteList: NTE[];
}

/** Structured result of parsing an HL7 MDM^T02 (v2.5) message. */
export interface ParsedMDM_T02 {
  /** The message value. */
  message: HL7Message;
  /** The msh value. */
  msh: MSH;
  /** The software segments, which follow MSH. */
  sftList: SFT[];
  /** The evn value. */
  evn: EVN;
  /** The pid value. */
  pid: PID;
  /** The pv1 value. */
  pv1: PV1;
  /** The orders value (COMMON ORDER groups). */
  orders: ParsedMDMOrder[];
  /** The txa value. */
  txa: TXA;
  /** The observations value (document content; at least one). */
  observations: ParsedMDMObservation[];
}

/** An order while it is being filled: OBR is only known once it has been read. */
type OrderInProgress = Omit<ParsedMDMOrder, "obr"> & { obr?: OBR };

/** Parser for HL7 MDM^T02 (v2.5) messages. */
export class MDM_T02_Parser {
  /** The message name value. */
  protected readonly messageName: string = "MDM_T02";

  /** Parse msh. */
  protected parseMSH(s: string): Result<MSH> { return MSH.parse(s); }
  /** Parse sft. */
  protected parseSFT(s: string, e: EncodingCharacters): Result<SFT> { return SFT.parse(s, e); }
  /** Parse evn. */
  protected parseEVN(s: string, e: EncodingCharacters): Result<EVN> { return EVN.parse(s, e); }
  /** Parse pid. */
  protected parsePID(s: string, e: EncodingCharacters): Result<PID> { return PID.parse(s, e); }
  /** Parse pv1. */
  protected parsePV1(s: string, e: EncodingCharacters): Result<PV1> { return PV1.parse(s, e); }
  /** Parse orc. */
  protected parseORC(s: string, e: EncodingCharacters): Result<ORC> { return ORC.parse(s, e); }
  /** Parse tq1. */
  protected parseTQ1(s: string, e: EncodingCharacters): Result<TQ1> { return TQ1.parse(s, e); }
  /** Parse tq2. */
  protected parseTQ2(s: string, e: EncodingCharacters): Result<TQ2> { return TQ2.parse(s, e); }
  /** Parse obr. */
  protected parseOBR(s: string, e: EncodingCharacters): Result<OBR> { return OBR.parse(s, e); }
  /** Parse nte. */
  protected parseNTE(s: string, e: EncodingCharacters): Result<NTE> { return NTE.parse(s, e); }
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

      const sftList: SFT[] = [];
      let evn: EVN | undefined;
      let pid: PID | undefined;
      let pv1: PV1 | undefined;
      let txa: TXA | undefined;
      const orders: OrderInProgress[] = [];
      let order: OrderInProgress | undefined;
      let timing: ParsedMDMTiming | undefined;
      const observations: ParsedMDMObservation[] = [];
      let observation: ParsedMDMObservation | undefined;

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
          case "ORC": {
            const r = this.parseORC(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("ORC", line, r);
            if (!pv1 || txa) return misplacedSegment("ORC", line, "must appear between PV1 and TXA");
            if (order && !order.obr) return misplacedSegment("ORC", line, "starts a new order before the previous order has its OBR");
            order = { orc: r.val, timing: [], nteList: [] }; orders.push(order); timing = undefined; message.addSegment(r.val); break;
          }
          case "TQ1": {
            const r = this.parseTQ1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("TQ1", line, r);
            if (!order || order.obr) return misplacedSegment("TQ1", line, "must appear between ORC and OBR");
            timing = { tq1: r.val, tq2List: [] }; order.timing.push(timing); message.addSegment(r.val); break;
          }
          case "TQ2": {
            const r = this.parseTQ2(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("TQ2", line, r);
            if (!timing) return misplacedSegment("TQ2", line, "must follow a TQ1 segment");
            timing.tq2List.push(r.val); message.addSegment(r.val); break;
          }
          case "OBR": {
            const r = this.parseOBR(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("OBR", line, r);
            if (!order) return misplacedSegment("OBR", line, "must follow an ORC segment");
            if (order.obr) return misplacedSegment("OBR", line, "appears more than once for the same order");
            order.obr = r.val; timing = undefined; message.addSegment(r.val); break;
          }
          case "NTE": {
            const r = this.parseNTE(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("NTE", line, r);
            if (observation) observation.nteList.push(r.val);
            else if (order && order.obr) order.nteList.push(r.val);
            else return misplacedSegment("NTE", line, "must follow an OBR or OBX segment");
            message.addSegment(r.val); break;
          }
          case "TXA": {
            const r = this.parseTXA(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("TXA", line, r);
            if (!pv1) return misplacedSegment("TXA", line, "must follow the PV1 segment");
            if (txa) return misplacedSegment("TXA", line, "appears more than once");
            if (order && !order.obr) return misplacedSegment("TXA", line, "found before the last order has its OBR");
            txa = r.val; order = undefined; timing = undefined; message.addSegment(r.val); break;
          }
          case "OBX": {
            const r = this.parseOBX(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("OBX", line, r);
            if (!txa) return misplacedSegment("OBX", line, "must follow the TXA segment");
            observation = { obx: r.val, nteList: [] }; observations.push(observation); message.addSegment(r.val); break;
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
      const incomplete = orders.findIndex((o) => !o.obr);
      if (incomplete !== -1) {
        return { ok: false, err: new Err(`${this.messageName} message: order ${incomplete + 1} has no OBR segment`) };
      }
      if (observations.length === 0) {
        return { ok: false, err: new Err(`${this.messageName} message must contain at least one OBX segment`) };
      }

      return { ok: true, val: { message, msh, sftList, evn, pid, pv1, orders: orders as ParsedMDMOrder[], txa, observations } };
    } catch (error) {
      return { ok: false, err: new Err(`Failed to parse ${this.messageName} message: ${error}`) };
    }
  }
}

/** Parses an HL7 MDM^T02 (v2.5) message string into a structured result. */
export function parseMDM_T02(messageString: string): Result<ParsedMDM_T02> {
  return new MDM_T02_Parser().parse(messageString);
}
