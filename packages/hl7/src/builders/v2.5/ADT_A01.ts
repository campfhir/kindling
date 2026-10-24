/**
 * Builder for ADT^A01 messages (HL7 2.5): admit/visit notification.
 *
 * Structure:
 *   MSH [{SFT}] EVN PID [PD1] [{ROL}] [{NK1}] PV1 [PV2] [{ROL}] [{DB1}] [{OBX}] [{AL1}] [{DG1}] [DRG]
 *   [{ PR1 [{ROL}] }] [{GT1}] [{ IN1 [IN2] [{IN3}] [{ROL}] }] [ACC] [UB1] [UB2] [PDA]
 *
 * The other A01-shaped events (A02–A16, A21–A23, A25–A29, A31–A33, A38) reuse this builder.
 *
 * @module
 */
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { SFT } from "../../segments/v2.5/SFT.ts";
import type { EVN } from "../../segments/v2.5/EVN.ts";
import type { PID } from "../../segments/v2.5/PID.ts";
import type { PD1 } from "../../segments/v2.5/PD1.ts";
import type { ROL } from "../../segments/v2.5/ROL.ts";
import type { NK1 } from "../../segments/v2.5/NK1.ts";
import type { PV1 } from "../../segments/v2.5/PV1.ts";
import type { PV2 } from "../../segments/v2.5/PV2.ts";
import type { DB1 } from "../../segments/v2.5/DB1.ts";
import type { OBX } from "../../segments/v2.5/OBX.ts";
import type { AL1 } from "../../segments/v2.5/AL1.ts";
import type { DG1 } from "../../segments/v2.5/DG1.ts";
import type { DRG } from "../../segments/v2.5/DRG.ts";
import type { PR1 } from "../../segments/v2.5/PR1.ts";
import type { GT1 } from "../../segments/v2.5/GT1.ts";
import type { IN1 } from "../../segments/v2.5/IN1.ts";
import type { IN2 } from "../../segments/v2.5/IN2.ts";
import type { IN3 } from "../../segments/v2.5/IN3.ts";
import type { ACC } from "../../segments/v2.5/ACC.ts";
import type { UB1 } from "../../segments/v2.5/UB1.ts";
import type { UB2 } from "../../segments/v2.5/UB2.ts";
import type { PDA } from "../../segments/v2.5/PDA.ts";
import { type EncodingCharacters, DEFAULT_ENCODING } from "../../types/encoding.ts";

/** ProcedureGroup — a PR1 with its ROLs. */
export interface ProcedureGroup<TPR1 extends PR1 = PR1> {
  /** The pr1 value. */
  pr1: TPR1;
  /** The rol list value. */
  rolList?: ROL[];
}

/** InsuranceGroup — an IN1 with its IN2, IN3s and ROLs. */
export interface InsuranceGroup<TIN1 extends IN1 = IN1> {
  /** The in1 value. */
  in1: TIN1;
  /** The in2 value. */
  in2?: IN2;
  /** The in3 list value. */
  in3List?: IN3[];
  /** The rol list value. */
  rolList?: ROL[];
}

/** Builder for HL7 ADT^A01 (2.5) messages. */
export class ADT_A01<
  TMSH extends MSH = MSH,
  TEVN extends EVN = EVN,
  TPID extends PID = PID,
  TPV1 extends PV1 = PV1,
  TPR1 extends PR1 = PR1,
  TIN1 extends IN1 = IN1,
> {
  /** The message name value. */
  protected readonly messageName: string = "ADT_A01";

  /** Constructor. */
  constructor(
    public msh: TMSH,
    public evn: TEVN,
    public pid: TPID,
    public pv1: TPV1,
    public options: {
      /** Software segments, which follow MSH. */
      sftList?: SFT[];
      pd1?: PD1;
      /** Patient-level ROLs (after PD1). */
      rolList?: ROL[];
      nk1List?: NK1[];
      pv2?: PV2;
      /** Visit-level ROLs (after PV1/PV2). */
      visitRolList?: ROL[];
      db1List?: DB1[];
      obxList?: OBX[];
      al1List?: AL1[];
      dg1List?: DG1[];
      drg?: DRG;
      procedures?: ProcedureGroup<TPR1>[];
      gt1List?: GT1[];
      insuranceGroups?: InsuranceGroup<TIN1>[];
      acc?: ACC;
      ub1?: UB1;
      ub2?: UB2;
      pda?: PDA;
    } = {},
    private encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** Validates the message structure, returning a result. */
  verify(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    if (!this.msh) errors.push("MSH segment is required");
    if (!this.evn) errors.push("EVN segment is required");
    if (!this.pid) errors.push("PID segment is required");
    if (!this.pv1) errors.push("PV1 segment is required");
    (this.options.procedures ?? []).forEach((p, i) => {
      if (!p.pr1) errors.push(`PROCEDURE group ${i + 1}: PR1 segment is required`);
    });
    (this.options.insuranceGroups ?? []).forEach((g, i) => {
      if (!g.in1) errors.push(`INSURANCE group ${i + 1}: IN1 segment is required`);
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
    const enc = this.encoding;
    const o = this.options;
    const out: string[] = [this.msh.encode(enc)];
    for (const s of o.sftList ?? []) out.push(s.encode(enc));
    out.push(this.evn.encode(enc), this.pid.encode(enc));
    if (o.pd1) out.push(o.pd1.encode(enc));
    for (const s of o.rolList ?? []) out.push(s.encode(enc));
    for (const s of o.nk1List ?? []) out.push(s.encode(enc));
    out.push(this.pv1.encode(enc));
    if (o.pv2) out.push(o.pv2.encode(enc));
    for (const s of o.visitRolList ?? []) out.push(s.encode(enc));
    for (const s of o.db1List ?? []) out.push(s.encode(enc));
    for (const s of o.obxList ?? []) out.push(s.encode(enc));
    for (const s of o.al1List ?? []) out.push(s.encode(enc));
    for (const s of o.dg1List ?? []) out.push(s.encode(enc));
    if (o.drg) out.push(o.drg.encode(enc));
    for (const p of o.procedures ?? []) {
      out.push(p.pr1.encode(enc));
      for (const rol of p.rolList ?? []) out.push(rol.encode(enc));
    }
    for (const s of o.gt1List ?? []) out.push(s.encode(enc));
    for (const g of o.insuranceGroups ?? []) {
      out.push(g.in1.encode(enc));
      if (g.in2) out.push(g.in2.encode(enc));
      for (const s of g.in3List ?? []) out.push(s.encode(enc));
      for (const s of g.rolList ?? []) out.push(s.encode(enc));
    }
    if (o.acc) out.push(o.acc.encode(enc));
    if (o.ub1) out.push(o.ub1.encode(enc));
    if (o.ub2) out.push(o.ub2.encode(enc));
    if (o.pda) out.push(o.pda.encode(enc));
    return out.join("\r");
  }
}

/** Builds an HL7 ADT^A01 (2.5) message. */
export function createADT_A01<
  TMSH extends MSH = MSH,
  TEVN extends EVN = EVN,
  TPID extends PID = PID,
  TPV1 extends PV1 = PV1,
  TPR1 extends PR1 = PR1,
  TIN1 extends IN1 = IN1,
>(
  msh: TMSH,
  evn: TEVN,
  pid: TPID,
  pv1: TPV1,
  options: ADT_A01<TMSH, TEVN, TPID, TPV1, TPR1, TIN1>["options"] = {},
  encoding?: EncodingCharacters,
): ADT_A01<TMSH, TEVN, TPID, TPV1, TPR1, TIN1> {
  return new ADT_A01(msh, evn, pid, pv1, options, encoding);
}
