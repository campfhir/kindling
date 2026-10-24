/**
 * Builder for SRM^S01 messages (HL7 v2.3): schedule request, new appointment booking.
 *
 * Structure:
 *   MSH ARQ [APR] [{NTE}] [{ PID [PV1] [PV2] [{OBX}] [{DG1}] }]
 *   { RGS [{ AIS [APR] [{NTE}] }] [{ AIG [APR] [{NTE}] }] [{ AIL [APR] [{NTE}] }] [{ AIP [APR] [{NTE}] }] }
 *
 * S02–S11 share this structure, which is unchanged through v2.5.1.
 *
 * @module
 */
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { ARQ } from "../../segments/v2.3/ARQ.ts";
import type { APR } from "../../segments/v2.3/APR.ts";
import type { NTE } from "../../segments/v2.3/NTE.ts";
import type { PID } from "../../segments/v2.3/PID.ts";
import type { PV1 } from "../../segments/v2.3/PV1.ts";
import type { PV2 } from "../../segments/v2.3/PV2.ts";
import type { OBX } from "../../segments/v2.3/OBX.ts";
import type { DG1 } from "../../segments/v2.3/DG1.ts";
import type { RGS } from "../../segments/v2.3/RGS.ts";
import type { AIS } from "../../segments/v2.3/AIS.ts";
import type { AIG } from "../../segments/v2.3/AIG.ts";
import type { AIL } from "../../segments/v2.3/AIL.ts";
import type { AIP } from "../../segments/v2.3/AIP.ts";
import { type EncodingCharacters, DEFAULT_ENCODING } from "../../types/encoding.ts";

/** SRMPatientGroup — a PATIENT group of an SRM message. */
export interface SRMPatientGroup {
  /** The pid value. */
  pid: PID;
  /** The pv1 value. */
  pv1?: PV1;
  /** The pv2 value. */
  pv2?: PV2;
  /** The obx list value. */
  obxList?: OBX[];
  /** The dg1 list value. */
  dg1List?: DG1[];
}

/** SRMServiceGroup — an AIS with its optional APR and NTEs. */
export interface SRMServiceGroup {
  /** The ais value. */
  ais: AIS;
  /** The apr value. */
  apr?: APR;
  /** The nte list value. */
  nteList?: NTE[];
}

/** SRMGeneralResourceGroup — an AIG with its optional APR and NTEs. */
export interface SRMGeneralResourceGroup {
  /** The aig value. */
  aig: AIG;
  /** The apr value. */
  apr?: APR;
  /** The nte list value. */
  nteList?: NTE[];
}

/** SRMLocationResourceGroup — an AIL with its optional APR and NTEs. */
export interface SRMLocationResourceGroup {
  /** The ail value. */
  ail: AIL;
  /** The apr value. */
  apr?: APR;
  /** The nte list value. */
  nteList?: NTE[];
}

/** SRMPersonnelResourceGroup — an AIP with its optional APR and NTEs. */
export interface SRMPersonnelResourceGroup {
  /** The aip value. */
  aip: AIP;
  /** The apr value. */
  apr?: APR;
  /** The nte list value. */
  nteList?: NTE[];
}

/** SRMResourcesGroup — a RESOURCES group: the RGS and the resources requested under it. */
export interface SRMResourcesGroup {
  /** The rgs value. */
  rgs: RGS;
  /** The services value. */
  services?: SRMServiceGroup[];
  /** The general resources value. */
  generalResources?: SRMGeneralResourceGroup[];
  /** The location resources value. */
  locationResources?: SRMLocationResourceGroup[];
  /** The personnel resources value. */
  personnelResources?: SRMPersonnelResourceGroup[];
}

/** Builder for HL7 SRM^S01 (v2.3) messages. */
export class SRM_S01<TMSH extends MSH = MSH, TARQ extends ARQ = ARQ> {
  /** The message name value. */
  protected readonly messageName: string = "SRM_S01";

  /** Constructor. */
  constructor(
    public msh: TMSH,
    public arq: TARQ,
    public options: {
      /** Appointment preferences for the whole request (follows ARQ). */
      apr?: APR;
      /** Notes on the request (follow ARQ/APR). */
      nteList?: NTE[];
      patients?: SRMPatientGroup[];
      /** At least one RESOURCES group is required. */
      resources?: SRMResourcesGroup[];
    } = {},
    private encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** Validates the message structure, returning a result. */
  verify(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    const resources = this.options.resources ?? [];

    if (!this.msh) errors.push("MSH segment is required");
    if (!this.arq) errors.push("ARQ segment is required");
    if (resources.length === 0) errors.push("At least one RESOURCES group (RGS) is required");
    resources.forEach((rg, i) => {
      if (!rg.rgs) errors.push(`RESOURCES group ${i + 1}: RGS segment is required`);
    });
    (this.options.patients ?? []).forEach((p, i) => {
      if (!p.pid) errors.push(`PATIENT group ${i + 1}: PID segment is required`);
    });

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
    out.push(this.arq.encode(enc));
    if (o.apr) out.push(o.apr.encode(enc));
    for (const nte of o.nteList ?? []) out.push(nte.encode(enc));

    for (const p of o.patients ?? []) {
      out.push(p.pid.encode(enc));
      if (p.pv1) out.push(p.pv1.encode(enc));
      if (p.pv2) out.push(p.pv2.encode(enc));
      for (const obx of p.obxList ?? []) out.push(obx.encode(enc));
      for (const dg1 of p.dg1List ?? []) out.push(dg1.encode(enc));
    }

    for (const rg of o.resources ?? []) {
      out.push(rg.rgs.encode(enc));
      const entries: { seg: { encode(e: EncodingCharacters): string }; apr?: APR; nteList?: NTE[] }[] = [
        ...(rg.services ?? []).map((s) => ({ seg: s.ais, apr: s.apr, nteList: s.nteList })),
        ...(rg.generalResources ?? []).map((g) => ({ seg: g.aig, apr: g.apr, nteList: g.nteList })),
        ...(rg.locationResources ?? []).map((l) => ({ seg: l.ail, apr: l.apr, nteList: l.nteList })),
        ...(rg.personnelResources ?? []).map((p) => ({ seg: p.aip, apr: p.apr, nteList: p.nteList })),
      ];
      for (const e of entries) {
        out.push(e.seg.encode(enc));
        if (e.apr) out.push(e.apr.encode(enc));
        for (const nte of e.nteList ?? []) out.push(nte.encode(enc));
      }
    }

    return out.join("\r");
  }
}

/** Builds an HL7 SRM^S01 (v2.3) message. */
export function createSRM_S01<TMSH extends MSH = MSH, TARQ extends ARQ = ARQ>(
  msh: TMSH,
  arq: TARQ,
  options: SRM_S01<TMSH, TARQ>["options"] = {},
  encoding?: EncodingCharacters,
): SRM_S01<TMSH, TARQ> {
  return new SRM_S01(msh, arq, options, encoding);
}
