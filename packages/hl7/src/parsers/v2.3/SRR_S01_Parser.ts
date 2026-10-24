/**
 * Parser for SRR^S01 messages (HL7 2.3): scheduled request response, new appointment booking.
 *
 * Structure:
 *   MSH MSA [ERR] [ SCH [{NTE}] [{ PID [PV1] [PV2] [{DG1}] }]
 *   { RGS [{ AIS [{NTE}] }] [{ AIG [{NTE}] }] [{ AIL [{NTE}] }] [{ AIP [{NTE}] }] } ]
 *
 * S02–S11 share this structure; v2.4 is identical. v2.5 makes ERR repeat and adds [{TQ1}].
 *
 * @module
 */
import { Err } from "../../utils/err.ts";
import type { Result } from "../../types/result.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { MSA } from "../../segments/v2.3/MSA.ts";
import { ERR } from "../../segments/v2.3/ERR.ts";
import { SCH } from "../../segments/v2.3/SCH.ts";
import { NTE } from "../../segments/v2.3/NTE.ts";
import { PID } from "../../segments/v2.3/PID.ts";
import { PV1 } from "../../segments/v2.3/PV1.ts";
import { PV2 } from "../../segments/v2.3/PV2.ts";
import { DG1 } from "../../segments/v2.3/DG1.ts";
import { RGS } from "../../segments/v2.3/RGS.ts";
import { AIS } from "../../segments/v2.3/AIS.ts";
import { AIG } from "../../segments/v2.3/AIG.ts";
import { AIL } from "../../segments/v2.3/AIL.ts";
import { AIP } from "../../segments/v2.3/AIP.ts";
import type { HL7Message } from "../../types/message.ts";
import type { EncodingCharacters } from "../../types/encoding.ts";
import {
  misplacedSegment,
  readMessageHeader,
  segmentParseFailure,
} from "../../utils/messageParsing.ts";

/** ParsedSRRPatient — one PATIENT group of a parsed SRR message. */
export interface ParsedSRRPatient {
  /** The pid value. */
  pid: PID;
  /** The pv1 value. */
  pv1?: PV1;
  /** The pv2 value. */
  pv2?: PV2;
  /** The dg1 list value. */
  dg1List: DG1[];
}

/** ParsedSRRService — an AIS with its NTEs. */
export interface ParsedSRRService {
  /** The ais value. */
  ais: AIS;
  /** The nte list value. */
  nteList: NTE[];
}

/** ParsedSRRGeneralResource — an AIG with its NTEs. */
export interface ParsedSRRGeneralResource {
  /** The aig value. */
  aig: AIG;
  /** The nte list value. */
  nteList: NTE[];
}

/** ParsedSRRLocationResource — an AIL with its NTEs. */
export interface ParsedSRRLocationResource {
  /** The ail value. */
  ail: AIL;
  /** The nte list value. */
  nteList: NTE[];
}

/** ParsedSRRPersonnelResource — an AIP with its NTEs. */
export interface ParsedSRRPersonnelResource {
  /** The aip value. */
  aip: AIP;
  /** The nte list value. */
  nteList: NTE[];
}

/** ParsedSRRResources — one RESOURCES group (RGS and its resource segments). */
export interface ParsedSRRResources {
  /** The rgs value. */
  rgs: RGS;
  /** The services value. */
  services: ParsedSRRService[];
  /** The general resources value. */
  generalResources: ParsedSRRGeneralResource[];
  /** The location resources value. */
  locationResources: ParsedSRRLocationResource[];
  /** The personnel resources value. */
  personnelResources: ParsedSRRPersonnelResource[];
}

/** ParsedSRRSchedule — the SCHEDULE group: the SCH with its patients and resources. */
export interface ParsedSRRSchedule {
  /** The sch value. */
  sch: SCH;
  /** The nte list value (notes on the schedule). */
  nteList: NTE[];
  /** The patients value. */
  patients: ParsedSRRPatient[];
  /** The resources value. */
  resources: ParsedSRRResources[];
}

/** Structured result of parsing an HL7 SRR^S01 (2.3) message. */
export interface ParsedSRR_S01 {
  /** The message value. */
  message: HL7Message;
  /** The msh value. */
  msh: MSH;
  /** The msa value. */
  msa: MSA;
  /** The err value. */
  err?: ERR;
  /** The schedule value. */
  schedule?: ParsedSRRSchedule;
}

/** Parser for HL7 SRR^S01 (2.3) messages. */
export class SRR_S01_Parser {
  /** The message name value. */
  protected readonly messageName: string = "SRR_S01";

  /** Parse msh. */
  protected parseMSH(s: string): Result<MSH> { return MSH.parse(s); }
  /** Parse msa. */
  protected parseMSA(s: string, e: EncodingCharacters): Result<MSA> { return MSA.parse(s, e); }
  /** Parse err. */
  protected parseERR(s: string, e: EncodingCharacters): Result<ERR> { return ERR.parse(s, e); }
  /** Parse sch. */
  protected parseSCH(s: string, e: EncodingCharacters): Result<SCH> { return SCH.parse(s, e); }
  /** Parse nte. */
  protected parseNTE(s: string, e: EncodingCharacters): Result<NTE> { return NTE.parse(s, e); }
  /** Parse pid. */
  protected parsePID(s: string, e: EncodingCharacters): Result<PID> { return PID.parse(s, e); }
  /** Parse pv1. */
  protected parsePV1(s: string, e: EncodingCharacters): Result<PV1> { return PV1.parse(s, e); }
  /** Parse pv2. */
  protected parsePV2(s: string, e: EncodingCharacters): Result<PV2> { return PV2.parse(s, e); }
  /** Parse dg1. */
  protected parseDG1(s: string, e: EncodingCharacters): Result<DG1> { return DG1.parse(s, e); }
  /** Parse rgs. */
  protected parseRGS(s: string, e: EncodingCharacters): Result<RGS> { return RGS.parse(s, e); }
  /** Parse ais. */
  protected parseAIS(s: string, e: EncodingCharacters): Result<AIS> { return AIS.parse(s, e); }
  /** Parse aig. */
  protected parseAIG(s: string, e: EncodingCharacters): Result<AIG> { return AIG.parse(s, e); }
  /** Parse ail. */
  protected parseAIL(s: string, e: EncodingCharacters): Result<AIL> { return AIL.parse(s, e); }
  /** Parse aip. */
  protected parseAIP(s: string, e: EncodingCharacters): Result<AIP> { return AIP.parse(s, e); }

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedSRR_S01> {
    try {
      const header = readMessageHeader(messageString, (s) => this.parseMSH(s));
      if (!header.ok || !header.val) return header as Result<never>;
      const { segments, msh, encoding, message } = header.val;

      let msa: MSA | undefined;
      let err: ERR | undefined;
      let schedule: ParsedSRRSchedule | undefined;
      let patient: ParsedSRRPatient | undefined;
      let resource: ParsedSRRResources | undefined;
      let entry: { nteList: NTE[] } | undefined;

      for (let i = 1; i < segments.length; i++) {
        const segmentStr = segments[i];
        const segmentType = segmentStr.substring(0, 3);
        const line = i + 1;

        switch (segmentType) {
          case "MSA": {
            const r = this.parseMSA(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("MSA", line, r);
            if (msa) return misplacedSegment("MSA", line, "appears more than once");
            msa = r.val; message.addSegment(r.val); break;
          }
          case "ERR": {
            const r = this.parseERR(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("ERR", line, r);
            if (!msa || schedule) return misplacedSegment("ERR", line, "must follow MSA and precede SCH");
            if (err) return misplacedSegment("ERR", line, "appears more than once");
            err = r.val; message.addSegment(r.val); break;
          }
          case "SCH": {
            const r = this.parseSCH(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("SCH", line, r);
            if (!msa) return misplacedSegment("SCH", line, "found without preceding MSA segment");
            if (schedule) return misplacedSegment("SCH", line, "appears more than once");
            schedule = { sch: r.val, nteList: [], patients: [], resources: [] };
            message.addSegment(r.val); break;
          }
          case "NTE": {
            const r = this.parseNTE(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("NTE", line, r);
            if (entry) entry.nteList.push(r.val);
            else if (schedule && !patient && !resource) schedule.nteList.push(r.val);
            else return misplacedSegment("NTE", line, "must follow SCH or a resource segment (AIS, AIG, AIL, AIP)");
            message.addSegment(r.val); break;
          }
          case "PID": {
            const r = this.parsePID(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("PID", line, r);
            if (!schedule) return misplacedSegment("PID", line, "found without preceding SCH segment");
            if (resource) return misplacedSegment("PID", line, "must appear before the RESOURCES groups");
            patient = { pid: r.val, dg1List: [] };
            schedule.patients.push(patient); message.addSegment(r.val); break;
          }
          case "PV1": {
            const r = this.parsePV1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("PV1", line, r);
            if (!patient || resource) return misplacedSegment("PV1", line, "must follow a PID segment");
            if (patient.pv1) return misplacedSegment("PV1", line, "appears more than once for the same patient");
            patient.pv1 = r.val; message.addSegment(r.val); break;
          }
          case "PV2": {
            const r = this.parsePV2(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("PV2", line, r);
            if (!patient || resource) return misplacedSegment("PV2", line, "must follow a PID segment");
            if (patient.pv2) return misplacedSegment("PV2", line, "appears more than once for the same patient");
            patient.pv2 = r.val; message.addSegment(r.val); break;
          }
          case "DG1": {
            const r = this.parseDG1(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("DG1", line, r);
            if (!patient || resource) return misplacedSegment("DG1", line, "must follow a PID segment");
            patient.dg1List.push(r.val); message.addSegment(r.val); break;
          }
          case "RGS": {
            const r = this.parseRGS(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("RGS", line, r);
            if (!schedule) return misplacedSegment("RGS", line, "found without preceding SCH segment");
            resource = { rgs: r.val, services: [], generalResources: [], locationResources: [], personnelResources: [] };
            schedule.resources.push(resource); entry = undefined; patient = undefined;
            message.addSegment(r.val); break;
          }
          case "AIS": {
            const r = this.parseAIS(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("AIS", line, r);
            if (!resource) return misplacedSegment("AIS", line, "must follow an RGS segment");
            const e: ParsedSRRService = { ais: r.val, nteList: [] };
            resource.services.push(e); entry = e; message.addSegment(r.val); break;
          }
          case "AIG": {
            const r = this.parseAIG(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("AIG", line, r);
            if (!resource) return misplacedSegment("AIG", line, "must follow an RGS segment");
            const e: ParsedSRRGeneralResource = { aig: r.val, nteList: [] };
            resource.generalResources.push(e); entry = e; message.addSegment(r.val); break;
          }
          case "AIL": {
            const r = this.parseAIL(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("AIL", line, r);
            if (!resource) return misplacedSegment("AIL", line, "must follow an RGS segment");
            const e: ParsedSRRLocationResource = { ail: r.val, nteList: [] };
            resource.locationResources.push(e); entry = e; message.addSegment(r.val); break;
          }
          case "AIP": {
            const r = this.parseAIP(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("AIP", line, r);
            if (!resource) return misplacedSegment("AIP", line, "must follow an RGS segment");
            const e: ParsedSRRPersonnelResource = { aip: r.val, nteList: [] };
            resource.personnelResources.push(e); entry = e; message.addSegment(r.val); break;
          }
          default:
            console.warn(`Skipping unsupported segment type '${segmentType}' at line ${line}`);
            break;
        }
      }

      if (!msa) {
        return { ok: false, err: new Err(`${this.messageName} message must contain an MSA segment`) };
      }
      if (schedule && schedule.resources.length === 0) {
        return { ok: false, err: new Err(`${this.messageName} message must contain at least one RGS segment when SCH is present`) };
      }

      return { ok: true, val: { message, msh, msa, err, schedule } };
    } catch (error) {
      return { ok: false, err: new Err(`Failed to parse ${this.messageName} message: ${error}`) };
    }
  }
}

/** Parses an HL7 SRR^S01 (2.3) message string into a structured result. */
export function parseSRR_S01(messageString: string): Result<ParsedSRR_S01> {
  return new SRR_S01_Parser().parse(messageString);
}
