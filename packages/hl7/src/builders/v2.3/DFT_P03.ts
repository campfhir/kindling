/**
 * Builder for DFT^P03 messages (HL7 v2.3): post detail financial transaction.
 *
 * Structure:
 *   MSH EVN PID [PD1] [PV1] [PV2] [{DB1}] [{OBX}] { FT1 [{ PR1 [{ROL}] }] }
 *   [{DG1}] [DRG] [{GT1}] [{ IN1 [IN2] [IN3] }] [ACC]
 *
 * @module
 */
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { EVN } from "../../segments/v2.3/EVN.ts";
import type { PID } from "../../segments/v2.3/PID.ts";
import type { PD1 } from "../../segments/v2.3/PD1.ts";
import type { PV1 } from "../../segments/v2.3/PV1.ts";
import type { PV2 } from "../../segments/v2.3/PV2.ts";
import type { DB1 } from "../../segments/v2.3/DB1.ts";
import type { OBX } from "../../segments/v2.3/OBX.ts";
import type { FT1 } from "../../segments/v2.3/FT1.ts";
import type { PR1 } from "../../segments/v2.3/PR1.ts";
import type { ROL } from "../../segments/v2.3/ROL.ts";
import type { DG1 } from "../../segments/v2.3/DG1.ts";
import type { DRG } from "../../segments/v2.3/DRG.ts";
import type { GT1 } from "../../segments/v2.3/GT1.ts";
import type { IN1 } from "../../segments/v2.3/IN1.ts";
import type { IN2 } from "../../segments/v2.3/IN2.ts";
import type { IN3 } from "../../segments/v2.3/IN3.ts";
import type { ACC } from "../../segments/v2.3/ACC.ts";
import { type EncodingCharacters, DEFAULT_ENCODING } from "../../types/encoding.ts";

/** DFTProcedureGroup — a PR1 with its ROLs, inside a financial group. */
export interface DFTProcedureGroup {
  /** The pr1 value. */
  pr1: PR1;
  /** The rol list value. */
  rolList?: ROL[];
}

/** DFTFinancialGroup — an FT1 transaction with its procedures. */
export interface DFTFinancialGroup {
  /** The ft1 value. */
  ft1: FT1;
  /** The procedures value. */
  procedures?: DFTProcedureGroup[];
}

/** DFTInsuranceGroup — an IN1 with its optional IN2 and IN3. */
export interface DFTInsuranceGroup {
  /** The in1 value. */
  in1: IN1;
  /** The in2 value. */
  in2?: IN2;
  /** The in3 value. */
  in3?: IN3;
}

/** Builder for HL7 DFT^P03 (v2.3) messages. */
export class DFT_P03<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID> {
  /** The message name value. */
  protected readonly messageName: string = "DFT_P03";

  /** Constructor. */
  constructor(
    public msh: TMSH,
    public evn: TEVN,
    public pid: TPID,
    /** The FT1 transactions; at least one is required. */
    public financials: DFTFinancialGroup[],
    public options: {
      pd1?: PD1;
      pv1?: PV1;
      pv2?: PV2;
      db1List?: DB1[];
      obxList?: OBX[];
      dg1List?: DG1[];
      drg?: DRG;
      gt1List?: GT1[];
      insurances?: DFTInsuranceGroup[];
      acc?: ACC;
    } = {},
    private encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** Validates the message structure, returning a result. */
  verify(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    if (!this.msh) errors.push("MSH segment is required");
    if (!this.evn) errors.push("EVN segment is required");
    if (!this.pid) errors.push("PID segment is required");
    if (!this.financials || this.financials.length === 0) errors.push("At least one FINANCIAL group (FT1) is required");
    (this.financials ?? []).forEach((f, i) => {
      if (!f.ft1) errors.push(`FINANCIAL group ${i + 1}: FT1 segment is required`);
      (f.procedures ?? []).forEach((p, j) => {
        if (!p.pr1) errors.push(`FINANCIAL group ${i + 1}, procedure ${j + 1}: PR1 segment is required`);
      });
    });
    (this.options.insurances ?? []).forEach((ins, i) => {
      if (!ins.in1) errors.push(`INSURANCE group ${i + 1}: IN1 segment is required`);
    });
    if (this.options.pv2 && !this.options.pv1) errors.push("PV2 requires PV1");
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
    const enc = this.encoding;
    const o = this.options;
    const out = [this.msh.encode(enc), this.evn.encode(enc), this.pid.encode(enc)];
    if (o.pd1) out.push(o.pd1.encode(enc));
    if (o.pv1) out.push(o.pv1.encode(enc));
    if (o.pv2) out.push(o.pv2.encode(enc));
    for (const s of o.db1List ?? []) out.push(s.encode(enc));
    for (const s of o.obxList ?? []) out.push(s.encode(enc));
    for (const f of this.financials) {
      out.push(f.ft1.encode(enc));
      for (const p of f.procedures ?? []) {
        out.push(p.pr1.encode(enc));
        for (const rol of p.rolList ?? []) out.push(rol.encode(enc));
      }
    }
    for (const s of o.dg1List ?? []) out.push(s.encode(enc));
    if (o.drg) out.push(o.drg.encode(enc));
    for (const s of o.gt1List ?? []) out.push(s.encode(enc));
    for (const ins of o.insurances ?? []) {
      out.push(ins.in1.encode(enc));
      if (ins.in2) out.push(ins.in2.encode(enc));
      if (ins.in3) out.push(ins.in3.encode(enc));
    }
    if (o.acc) out.push(o.acc.encode(enc));
    return out.join("\r");
  }
}

/** Builds an HL7 DFT^P03 (v2.3) message. */
export function createDFT_P03<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID>(
  msh: TMSH,
  evn: TEVN,
  pid: TPID,
  financials: DFTFinancialGroup[],
  options: DFT_P03<TMSH, TEVN, TPID>["options"] = {},
  encoding?: EncodingCharacters,
): DFT_P03<TMSH, TEVN, TPID> {
  return new DFT_P03(msh, evn, pid, financials, options, encoding);
}
