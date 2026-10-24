/**
 * Builder for BAR^P05 messages (HL7 2.4): update account.
 *
 * Structure:
 *   MSH EVN PID [PD1] [{ROL}] { [PV1] [PV2] [{ROL}] [{DB1}] [{OBX}] [{AL1}] [{DG1}] [DRG]
 *   [{ PR1 [{ROL}] }] [{GT1}] [{NK1}] [{ IN1 [IN2] [{IN3}] [{ROL}] }] [ACC] [UB1] [UB2] [ABS] [{BLC}] [RMI] }
 *
 * @module
 */
import type { MSH } from "../../segments/v2.4/MSH.ts";
import type { EVN } from "../../segments/v2.4/EVN.ts";
import type { PID } from "../../segments/v2.4/PID.ts";
import type { PD1 } from "../../segments/v2.4/PD1.ts";
import type { ROL } from "../../segments/v2.4/ROL.ts";
import type { PV1 } from "../../segments/v2.4/PV1.ts";
import type { PV2 } from "../../segments/v2.4/PV2.ts";
import type { DB1 } from "../../segments/v2.4/DB1.ts";
import type { OBX } from "../../segments/v2.4/OBX.ts";
import type { AL1 } from "../../segments/v2.4/AL1.ts";
import type { DG1 } from "../../segments/v2.4/DG1.ts";
import type { DRG } from "../../segments/v2.4/DRG.ts";
import type { PR1 } from "../../segments/v2.4/PR1.ts";
import type { GT1 } from "../../segments/v2.4/GT1.ts";
import type { NK1 } from "../../segments/v2.4/NK1.ts";
import type { IN1 } from "../../segments/v2.4/IN1.ts";
import type { IN2 } from "../../segments/v2.4/IN2.ts";
import type { IN3 } from "../../segments/v2.4/IN3.ts";
import type { ACC } from "../../segments/v2.4/ACC.ts";
import type { UB1 } from "../../segments/v2.4/UB1.ts";
import type { UB2 } from "../../segments/v2.4/UB2.ts";
import type { ABS } from "../../segments/v2.4/ABS.ts";
import type { BLC } from "../../segments/v2.4/BLC.ts";
import type { RMI } from "../../segments/v2.4/RMI.ts";
import { type EncodingCharacters, DEFAULT_ENCODING } from "../../types/encoding.ts";

/** BARProcedureGroup — a PR1 with its ROLs. */
export interface BARProcedureGroup {
  /** The pr1 value. */
  pr1: PR1;
  /** The rol list value. */
  rolList?: ROL[];
}

/** BARInsuranceGroup — an IN1 with its IN2, IN3s and ROLs. */
export interface BARInsuranceGroup {
  /** The in1 value. */
  in1: IN1;
  /** The in2 value. */
  in2?: IN2;
  /** The in3 list value. */
  in3List?: IN3[];
  /** The rol list value. */
  rolList?: ROL[];
}

/** BARVisitGroup — one VISIT group (account). Every member is optional, but a visit must not be empty. */
export interface BARVisitGroup {
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
  procedures?: BARProcedureGroup[];
  /** The gt1 list value. */
  gt1List?: GT1[];
  /** The nk1 list value. */
  nk1List?: NK1[];
  /** The insurances value. */
  insurances?: BARInsuranceGroup[];
  /** The acc value. */
  acc?: ACC;
  /** The ub1 value. */
  ub1?: UB1;
  /** The ub2 value. */
  ub2?: UB2;
  /** The abs value. */
  abs?: ABS;
  /** The blc list value. */
  blcList?: BLC[];
  /** The rmi value. */
  rmi?: RMI;
}

/** Encodes one VISIT group in spec order. */
export function encodeBARVisit(v: BARVisitGroup, enc: EncodingCharacters): string[] {
  const out: string[] = [];
  if (v.pv1) out.push(v.pv1.encode(enc));
  if (v.pv2) out.push(v.pv2.encode(enc));
  for (const s of v.visitRolList ?? []) out.push(s.encode(enc));
  for (const s of v.db1List ?? []) out.push(s.encode(enc));
  for (const s of v.obxList ?? []) out.push(s.encode(enc));
  for (const s of v.al1List ?? []) out.push(s.encode(enc));
  for (const s of v.dg1List ?? []) out.push(s.encode(enc));
  if (v.drg) out.push(v.drg.encode(enc));
  for (const p of v.procedures ?? []) {
    out.push(p.pr1.encode(enc));
    for (const rol of p.rolList ?? []) out.push(rol.encode(enc));
  }
  for (const s of v.gt1List ?? []) out.push(s.encode(enc));
  for (const s of v.nk1List ?? []) out.push(s.encode(enc));
  for (const ins of v.insurances ?? []) {
    out.push(ins.in1.encode(enc));
    if (ins.in2) out.push(ins.in2.encode(enc));
    for (const s of ins.in3List ?? []) out.push(s.encode(enc));
    for (const s of ins.rolList ?? []) out.push(s.encode(enc));
  }
  if (v.acc) out.push(v.acc.encode(enc));
  if (v.ub1) out.push(v.ub1.encode(enc));
  if (v.ub2) out.push(v.ub2.encode(enc));
  if (v.abs) out.push(v.abs.encode(enc));
  for (const s of v.blcList ?? []) out.push(s.encode(enc));
  if (v.rmi) out.push(v.rmi.encode(enc));
  return out;
}

/** Builder for HL7 BAR^P05 (2.4) messages. */
export class BAR_P05<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID> {
  /** The message name value. */
  protected readonly messageName: string = "BAR_P05";

  /** Constructor. */
  constructor(
    public msh: TMSH,
    public evn: TEVN,
    public pid: TPID,
    /** The VISIT groups (accounts); at least one, none empty. */
    public visits: BARVisitGroup[],
    public options: {
      pd1?: PD1;
      /** Patient-level ROLs (after PD1). */
      rolList?: ROL[];
    } = {},
    private encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** Validates the message structure, returning a result. */
  verify(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    if (!this.msh) errors.push("MSH segment is required");
    if (!this.evn) errors.push("EVN segment is required");
    if (!this.pid) errors.push("PID segment is required");
    if (!this.visits || this.visits.length === 0) errors.push("At least one VISIT group is required");
    (this.visits ?? []).forEach((v, i) => {
      if (encodeBARVisit(v, this.encoding).length === 0) errors.push(`VISIT group ${i + 1} is empty`);
      if (v.pv2 && !v.pv1) errors.push(`VISIT group ${i + 1}: PV2 requires PV1`);
      if (v.visitRolList?.length && !v.pv1) errors.push(`VISIT group ${i + 1}: visit-level ROLs require PV1`);
      (v.procedures ?? []).forEach((p, j) => {
        if (!p.pr1) errors.push(`VISIT group ${i + 1}, procedure ${j + 1}: PR1 segment is required`);
      });
      (v.insurances ?? []).forEach((ins, j) => {
        if (!ins.in1) errors.push(`VISIT group ${i + 1}, insurance ${j + 1}: IN1 segment is required`);
      });
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
    const out = [this.msh.encode(enc)];
    out.push(this.evn.encode(enc), this.pid.encode(enc));
    if (o.pd1) out.push(o.pd1.encode(enc));
    for (const s of o.rolList ?? []) out.push(s.encode(enc));
    for (const v of this.visits) out.push(...encodeBARVisit(v, enc));
    return out.join("\r");
  }
}

/** Builds an HL7 BAR^P05 (2.4) message. */
export function createBAR_P05<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID>(
  msh: TMSH,
  evn: TEVN,
  pid: TPID,
  visits: BARVisitGroup[],
  options: BAR_P05<TMSH, TEVN, TPID>["options"] = {},
  encoding?: EncodingCharacters,
): BAR_P05<TMSH, TEVN, TPID> {
  return new BAR_P05(msh, evn, pid, visits, options, encoding);
}
