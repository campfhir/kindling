/**
 * Parser for SRM^S01 messages (HL7 v2.3): schedule request, new appointment booking.
 *
 * Structure:
 *   MSH ARQ [APR] [{NTE}] [{ PID [PV1] [PV2] [{OBX}] [{DG1}] }]
 *   { RGS [{ AIS [APR] [{NTE}] }] [{ AIG [APR] [{NTE}] }] [{ AIL [APR] [{NTE}] }] [{ AIP [APR] [{NTE}] }] }
 *
 * S02–S11 share this structure, which is unchanged through v2.5.1.
 *
 * @module
 */
import { Err } from "../../utils/err.ts";
import type { Result } from "../../types/result.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { ARQ } from "../../segments/v2.3/ARQ.ts";
import { APR } from "../../segments/v2.3/APR.ts";
import { NTE } from "../../segments/v2.3/NTE.ts";
import { PID } from "../../segments/v2.3/PID.ts";
import { PV1 } from "../../segments/v2.3/PV1.ts";
import { PV2 } from "../../segments/v2.3/PV2.ts";
import { OBX } from "../../segments/v2.3/OBX.ts";
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

/** ParsedSRMPatient — one PATIENT group of a parsed SRM message. */
export interface ParsedSRMPatient {
  /** The pid value. */
  pid: PID;
  /** The pv1 value. */
  pv1?: PV1;
  /** The pv2 value. */
  pv2?: PV2;
  /** The obx list value. */
  obxList: OBX[];
  /** The dg1 list value. */
  dg1List: DG1[];
}

/** ParsedSRMService — an AIS with its optional APR and NTEs. */
export interface ParsedSRMService {
  /** The ais value. */
  ais: AIS;
  /** The apr value. */
  apr?: APR;
  /** The nte list value. */
  nteList: NTE[];
}

/** ParsedSRMGeneralResource — an AIG with its optional APR and NTEs. */
export interface ParsedSRMGeneralResource {
  /** The aig value. */
  aig: AIG;
  /** The apr value. */
  apr?: APR;
  /** The nte list value. */
  nteList: NTE[];
}

/** ParsedSRMLocationResource — an AIL with its optional APR and NTEs. */
export interface ParsedSRMLocationResource {
  /** The ail value. */
  ail: AIL;
  /** The apr value. */
  apr?: APR;
  /** The nte list value. */
  nteList: NTE[];
}

/** ParsedSRMPersonnelResource — an AIP with its optional APR and NTEs. */
export interface ParsedSRMPersonnelResource {
  /** The aip value. */
  aip: AIP;
  /** The apr value. */
  apr?: APR;
  /** The nte list value. */
  nteList: NTE[];
}

/** ParsedSRMResources — one RESOURCES group (RGS and its resource segments). */
export interface ParsedSRMResources {
  /** The rgs value. */
  rgs: RGS;
  /** The services value. */
  services: ParsedSRMService[];
  /** The general resources value. */
  generalResources: ParsedSRMGeneralResource[];
  /** The location resources value. */
  locationResources: ParsedSRMLocationResource[];
  /** The personnel resources value. */
  personnelResources: ParsedSRMPersonnelResource[];
}

/** Structured result of parsing an HL7 SRM^S01 (v2.3) message. */
export interface ParsedSRM_S01 {
  /** The message value. */
  message: HL7Message;
  /** The msh value. */
  msh: MSH;
  /** The arq value. */
  arq: ARQ;
  /** The apr value (appointment preferences for the whole request). */
  apr?: APR;
  /** The nte list value (notes on the request). */
  nteList: NTE[];
  /** The patients value. */
  patients: ParsedSRMPatient[];
  /** The resources value. */
  resources: ParsedSRMResources[];
}

/** A resource entry while it is being filled: the APR and NTEs that follow its segment. */
type ResourceEntry = { apr?: APR; nteList: NTE[] };

/** Parser for HL7 SRM^S01 (v2.3) messages. */
export class SRM_S01_Parser {
  /** The message name value. */
  protected readonly messageName: string = "SRM_S01";


  /** Parse msh. */
  protected parseMSH(s: string): Result<MSH> { return MSH.parse(s); }
  /** Parse arq. */
  protected parseARQ(s: string, e: EncodingCharacters): Result<ARQ> { return ARQ.parse(s, e); }
  /** Parse apr. */
  protected parseAPR(s: string, e: EncodingCharacters): Result<APR> { return APR.parse(s, e); }
  /** Parse nte. */
  protected parseNTE(s: string, e: EncodingCharacters): Result<NTE> { return NTE.parse(s, e); }
  /** Parse pid. */
  protected parsePID(s: string, e: EncodingCharacters): Result<PID> { return PID.parse(s, e); }
  /** Parse pv1. */
  protected parsePV1(s: string, e: EncodingCharacters): Result<PV1> { return PV1.parse(s, e); }
  /** Parse pv2. */
  protected parsePV2(s: string, e: EncodingCharacters): Result<PV2> { return PV2.parse(s, e); }
  /** Parse obx. */
  protected parseOBX(s: string, e: EncodingCharacters): Result<OBX> { return OBX.parse(s, e); }
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
  parse(messageString: string): Result<ParsedSRM_S01> {
    try {
      const header = readMessageHeader(messageString, (s) => this.parseMSH(s));
      if (!header.ok || !header.val) return header as Result<never>;
      const { segments, msh, encoding, message } = header.val;

      let arq: ARQ | undefined;
      let apr: APR | undefined;
      const nteList: NTE[] = [];
      const patients: ParsedSRMPatient[] = [];
      const resources: ParsedSRMResources[] = [];
      let patient: ParsedSRMPatient | undefined;
      let resource: ParsedSRMResources | undefined;
      let entry: ResourceEntry | undefined;

      for (let i = 1; i < segments.length; i++) {
        const segmentStr = segments[i];
        const segmentType = segmentStr.substring(0, 3);
        const line = i + 1;

        switch (segmentType) {
          case "ARQ": {
            const r = this.parseARQ(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("ARQ", line, r);
            if (arq) return misplacedSegment("ARQ", line, "appears more than once");
            arq = r.val; message.addSegment(r.val); break;
          }
          case "APR": {
            const r = this.parseAPR(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("APR", line, r);
            if (entry) {
              if (entry.apr) return misplacedSegment("APR", line, "appears more than once for the same resource");
              entry.apr = r.val;
            } else if (arq && !apr && !patient && !resource && nteList.length === 0) {
              apr = r.val;
            } else {
              return misplacedSegment("APR", line, "must directly follow ARQ or a resource segment (AIS, AIG, AIL, AIP)");
            }
            message.addSegment(r.val); break;
          }
          case "NTE": {
            const r = this.parseNTE(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("NTE", line, r);
            if (entry) entry.nteList.push(r.val);
            else if (arq && !patient && !resource) nteList.push(r.val);
            else return misplacedSegment("NTE", line, "must follow ARQ/APR or a resource segment (AIS, AIG, AIL, AIP)");
            message.addSegment(r.val); break;
          }
          case "PID": {
            const r = this.parsePID(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("PID", line, r);
            if (!arq) return misplacedSegment("PID", line, "found without preceding ARQ segment");
            if (resource) return misplacedSegment("PID", line, "must appear before the RESOURCES groups");
            patient = { pid: r.val, obxList: [], dg1List: [] };
            patients.push(patient); message.addSegment(r.val); break;
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
          case "OBX": {
            const r = this.parseOBX(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("OBX", line, r);
            if (!patient || resource) return misplacedSegment("OBX", line, "must follow a PID segment");
            patient.obxList.push(r.val); message.addSegment(r.val); break;
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
            if (!arq) return misplacedSegment("RGS", line, "found without preceding ARQ segment");
            resource = { rgs: r.val, services: [], generalResources: [], locationResources: [], personnelResources: [] };
            resources.push(resource); entry = undefined; patient = undefined;
            message.addSegment(r.val); break;
          }
          case "AIS": {
            const r = this.parseAIS(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("AIS", line, r);
            if (!resource) return misplacedSegment("AIS", line, "must follow an RGS segment");
            const e: ParsedSRMService = { ais: r.val, nteList: [] };
            resource.services.push(e); entry = e; message.addSegment(r.val); break;
          }
          case "AIG": {
            const r = this.parseAIG(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("AIG", line, r);
            if (!resource) return misplacedSegment("AIG", line, "must follow an RGS segment");
            const e: ParsedSRMGeneralResource = { aig: r.val, nteList: [] };
            resource.generalResources.push(e); entry = e; message.addSegment(r.val); break;
          }
          case "AIL": {
            const r = this.parseAIL(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("AIL", line, r);
            if (!resource) return misplacedSegment("AIL", line, "must follow an RGS segment");
            const e: ParsedSRMLocationResource = { ail: r.val, nteList: [] };
            resource.locationResources.push(e); entry = e; message.addSegment(r.val); break;
          }
          case "AIP": {
            const r = this.parseAIP(segmentStr, encoding);
            if (!r.ok || !r.val) return segmentParseFailure("AIP", line, r);
            if (!resource) return misplacedSegment("AIP", line, "must follow an RGS segment");
            const e: ParsedSRMPersonnelResource = { aip: r.val, nteList: [] };
            resource.personnelResources.push(e); entry = e; message.addSegment(r.val); break;
          }
          default:
            console.warn(`Skipping unsupported segment type '${segmentType}' at line ${line}`);
            break;
        }
      }

      if (!arq) {
        return { ok: false, err: new Err(`${this.messageName} message must contain an ARQ segment`) };
      }
      if (resources.length === 0) {
        return { ok: false, err: new Err(`${this.messageName} message must contain at least one RGS segment`) };
      }

      return { ok: true, val: { message, msh, arq, apr, nteList, patients, resources } };
    } catch (error) {
      return { ok: false, err: new Err(`Failed to parse ${this.messageName} message: ${error}`) };
    }
  }
}

/** Parses an HL7 SRM^S01 (v2.3) message string into a structured result. */
export function parseSRM_S01(messageString: string): Result<ParsedSRM_S01> {
  return new SRM_S01_Parser().parse(messageString);
}
