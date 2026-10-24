/**
 * Builder for SRR^S01 messages (HL7 2.3): scheduled request response, new appointment booking.
 *
 * Structure:
 *   MSH MSA [ERR] [ SCH [{NTE}] [{ PID [PV1] [PV2] [{DG1}] }]
 *   { RGS [{ AIS [{NTE}] }] [{ AIG [{NTE}] }] [{ AIL [{NTE}] }] [{ AIP [{NTE}] }] } ]
 *
 * @module
 */
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { MSA } from "../../segments/v2.3/MSA.ts";
import type { ERR } from "../../segments/v2.3/ERR.ts";
import type { SCH } from "../../segments/v2.3/SCH.ts";
import type { NTE } from "../../segments/v2.3/NTE.ts";
import type { PID } from "../../segments/v2.3/PID.ts";
import type { PV1 } from "../../segments/v2.3/PV1.ts";
import type { PV2 } from "../../segments/v2.3/PV2.ts";
import type { DG1 } from "../../segments/v2.3/DG1.ts";
import type { RGS } from "../../segments/v2.3/RGS.ts";
import type { AIS } from "../../segments/v2.3/AIS.ts";
import type { AIG } from "../../segments/v2.3/AIG.ts";
import type { AIL } from "../../segments/v2.3/AIL.ts";
import type { AIP } from "../../segments/v2.3/AIP.ts";
import { type EncodingCharacters, DEFAULT_ENCODING } from "../../types/encoding.ts";

/** SRRPatientGroup — a PATIENT group of an SRR message. */
export interface SRRPatientGroup {
  /** The pid value. */
  pid: PID;
  /** The pv1 value. */
  pv1?: PV1;
  /** The pv2 value. */
  pv2?: PV2;
  /** The dg1 list value. */
  dg1List?: DG1[];
}

/** SRRServiceGroup — an AIS with its NTEs. */
export interface SRRServiceGroup {
  /** The ais value. */
  ais: AIS;
  /** The nte list value. */
  nteList?: NTE[];
}

/** SRRGeneralResourceGroup — an AIG with its NTEs. */
export interface SRRGeneralResourceGroup {
  /** The aig value. */
  aig: AIG;
  /** The nte list value. */
  nteList?: NTE[];
}

/** SRRLocationResourceGroup — an AIL with its NTEs. */
export interface SRRLocationResourceGroup {
  /** The ail value. */
  ail: AIL;
  /** The nte list value. */
  nteList?: NTE[];
}

/** SRRPersonnelResourceGroup — an AIP with its NTEs. */
export interface SRRPersonnelResourceGroup {
  /** The aip value. */
  aip: AIP;
  /** The nte list value. */
  nteList?: NTE[];
}

/** SRRResourcesGroup — a RESOURCES group: the RGS and the resources under it. */
export interface SRRResourcesGroup {
  /** The rgs value. */
  rgs: RGS;
  /** The services value. */
  services?: SRRServiceGroup[];
  /** The general resources value. */
  generalResources?: SRRGeneralResourceGroup[];
  /** The location resources value. */
  locationResources?: SRRLocationResourceGroup[];
  /** The personnel resources value. */
  personnelResources?: SRRPersonnelResourceGroup[];
}

/** SRRScheduleGroup — the SCHEDULE group: the SCH with its patients and resources. */
export interface SRRScheduleGroup {
  /** The sch value. */
  sch: SCH;
  /** The nte list value (notes on the schedule). */
  nteList?: NTE[];
  /** The patients value. */
  patients?: SRRPatientGroup[];
  /** At least one RESOURCES group is required when the schedule is present. */
  resources: SRRResourcesGroup[];
}

/** Builder for HL7 SRR^S01 (2.3) messages. */
export class SRR_S01<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name value. */
  protected readonly messageName: string = "SRR_S01";

  /** Constructor. */
  constructor(
    public msh: TMSH,
    public msa: TMSA,
    public options: {
      err?: ERR;
      schedule?: SRRScheduleGroup;
    } = {},
    private encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** Validates the message structure, returning a result. */
  verify(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    const s = this.options.schedule;

    if (!this.msh) errors.push("MSH segment is required");
    if (!this.msa) errors.push("MSA segment is required");
    if (s) {
      if (!s.sch) errors.push("SCH segment is required in the SCHEDULE group");
      if (!s.resources || s.resources.length === 0) errors.push("At least one RESOURCES group (RGS) is required in the SCHEDULE group");
      (s.resources ?? []).forEach((rg, i) => {
        if (!rg.rgs) errors.push(`RESOURCES group ${i + 1}: RGS segment is required`);
      });
      (s.patients ?? []).forEach((p, i) => {
        if (!p.pid) errors.push(`PATIENT group ${i + 1}: PID segment is required`);
      });
    }

    return { valid: errors.length === 0, errors };
  }

  /** Encodes this message to its HL7 wire string. */
  encode(): string {
    const verification = this.verify();
    if (!verification.valid) {
      throw new Error(
        `Cannot encode invalid ${this.messageName} message:\n${verification.errors.join("\n")}`,
      );
    }

    const out: string[] = [];
    const enc = this.encoding;
    const o = this.options;

    out.push(this.msh.encode(enc));
    out.push(this.msa.encode(enc));
    if (o.err) out.push(o.err.encode(enc));

    const s = o.schedule;
    if (s) {
      out.push(s.sch.encode(enc));
      for (const nte of s.nteList ?? []) out.push(nte.encode(enc));
      for (const p of s.patients ?? []) {
        out.push(p.pid.encode(enc));
        if (p.pv1) out.push(p.pv1.encode(enc));
        if (p.pv2) out.push(p.pv2.encode(enc));
        for (const dg1 of p.dg1List ?? []) out.push(dg1.encode(enc));
      }
      for (const rg of s.resources) {
        out.push(rg.rgs.encode(enc));
        const entries: { seg: { encode(e: EncodingCharacters): string }; nteList?: NTE[] }[] = [
          ...(rg.services ?? []).map((x) => ({ seg: x.ais, nteList: x.nteList })),
          ...(rg.generalResources ?? []).map((x) => ({ seg: x.aig, nteList: x.nteList })),
          ...(rg.locationResources ?? []).map((x) => ({ seg: x.ail, nteList: x.nteList })),
          ...(rg.personnelResources ?? []).map((x) => ({ seg: x.aip, nteList: x.nteList })),
        ];
        for (const e of entries) {
          out.push(e.seg.encode(enc));
          for (const nte of e.nteList ?? []) out.push(nte.encode(enc));
        }
      }
    }

    return out.join("\r");
  }
}

/** Builds an HL7 SRR^S01 (2.3) message. */
export function createSRR_S01<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  msh: TMSH,
  msa: TMSA,
  options: SRR_S01<TMSH, TMSA>["options"] = {},
  encoding?: EncodingCharacters,
): SRR_S01<TMSH, TMSA> {
  return new SRR_S01(msh, msa, options, encoding);
}
