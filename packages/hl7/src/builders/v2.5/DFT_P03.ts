/**
 * Builder for DFT^P03 messages (HL7 2.5): post detail financial transactions.
 *
 * Structure:
 *   MSH [{SFT}] EVN PID [PD1] [{ROL}] [PV1] [PV2] [{ROL}] [{DB1}]
 *   [{ COMMON ORDER: [ORC] [{ TQ1 [{TQ2}] }] [ OBR [{NTE}] ] [{ OBX [{NTE}] }] }]
 *   { FINANCIAL: FT1 [NTE] [{ PR1 [{ROL}] }] [{ FINANCIAL COMMON ORDER: same shape }] }
 *   [{DG1}] [DRG] [{GT1}] [{ IN1 [IN2] [{IN3}] [{ROL}] }] [ACC]
 *
 * @module
 */
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { SFT } from "../../segments/v2.5/SFT.ts";
import type { EVN } from "../../segments/v2.5/EVN.ts";
import type { PID } from "../../segments/v2.5/PID.ts";
import type { PD1 } from "../../segments/v2.5/PD1.ts";
import type { ROL } from "../../segments/v2.5/ROL.ts";
import type { PV1 } from "../../segments/v2.5/PV1.ts";
import type { PV2 } from "../../segments/v2.5/PV2.ts";
import type { DB1 } from "../../segments/v2.5/DB1.ts";
import type { ORC } from "../../segments/v2.5/ORC.ts";
import type { TQ1 } from "../../segments/v2.5/TQ1.ts";
import type { TQ2 } from "../../segments/v2.5/TQ2.ts";
import type { OBR } from "../../segments/v2.5/OBR.ts";
import type { NTE } from "../../segments/v2.5/NTE.ts";
import type { OBX } from "../../segments/v2.5/OBX.ts";
import type { FT1 } from "../../segments/v2.5/FT1.ts";
import type { PR1 } from "../../segments/v2.5/PR1.ts";
import type { DG1 } from "../../segments/v2.5/DG1.ts";
import type { DRG } from "../../segments/v2.5/DRG.ts";
import type { GT1 } from "../../segments/v2.5/GT1.ts";
import type { IN1 } from "../../segments/v2.5/IN1.ts";
import type { IN2 } from "../../segments/v2.5/IN2.ts";
import type { IN3 } from "../../segments/v2.5/IN3.ts";
import type { ACC } from "../../segments/v2.5/ACC.ts";
import { type EncodingCharacters, DEFAULT_ENCODING } from "../../types/encoding.ts";

/** DFTTimingGroup — a TQ1 with its TQ2 segments. */
export interface DFTTimingGroup {
  /** The tq1 value. */
  tq1: TQ1;
  /** The tq2 list value. */
  tq2List?: TQ2[];
}

/** DFTObservationGroup — an OBX with the NTEs that follow it. */
export interface DFTObservationGroup {
  /** The obx value. */
  obx: OBX;
  /** The nte list value. */
  nteList?: NTE[];
}

/** DFTOrderGroup — a COMMON ORDER group; every member is optional, but the group must not be empty. */
export interface DFTOrderGroup {
  /** The orc value. */
  orc?: ORC;
  /** The timing value. */
  timing?: DFTTimingGroup[];
  /** The obr value. */
  obr?: OBR;
  /** The obr nte list value (notes after OBR). */
  obrNteList?: NTE[];
  /** The observations value. */
  observations?: DFTObservationGroup[];
}

/** DFTProcedureGroup — a PR1 with its ROLs. */
export interface DFTProcedureGroup {
  /** The pr1 value. */
  pr1: PR1;
  /** The rol list value. */
  rolList?: ROL[];
}

/** DFTFinancialGroup — an FT1 transaction with its note, procedures and order groups. */
export interface DFTFinancialGroup {
  /** The ft1 value. */
  ft1: FT1;
  /** The nte value (note after FT1). */
  nte?: NTE;
  /** The procedures value. */
  procedures?: DFTProcedureGroup[];
  /** The orders value (FINANCIAL COMMON ORDER groups). */
  orders?: DFTOrderGroup[];
}

/** DFTInsuranceGroup — an IN1 with its IN2, IN3s and ROLs. */
export interface DFTInsuranceGroup {
  /** The in1 value. */
  in1: IN1;
  /** The in2 value. */
  in2?: IN2;
  /** The in3 list value. */
  in3List?: IN3[];
  /** The rol list value. */
  rolList?: ROL[];
}

/** Encodes one COMMON ORDER group in spec order. */
function encodeOrder(o: DFTOrderGroup, enc: EncodingCharacters): string[] {
  const out: string[] = [];
  if (o.orc) out.push(o.orc.encode(enc));
  for (const t of o.timing ?? []) {
    out.push(t.tq1.encode(enc));
    for (const s of t.tq2List ?? []) out.push(s.encode(enc));
  }
  if (o.obr) out.push(o.obr.encode(enc));
  for (const s of o.obrNteList ?? []) out.push(s.encode(enc));
  for (const ob of o.observations ?? []) {
    out.push(ob.obx.encode(enc));
    for (const s of ob.nteList ?? []) out.push(s.encode(enc));
  }
  return out;
}

/** Builder for HL7 DFT^P03 (2.5) messages. */
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
      /** Software segments, which follow MSH. */
      sftList?: SFT[];
      pd1?: PD1;
      /** Patient-level ROLs (after PD1). */
      rolList?: ROL[];
      pv1?: PV1;
      pv2?: PV2;
      /** Visit-level ROLs (after PV1/PV2). */
      visitRolList?: ROL[];
      db1List?: DB1[];
      /** COMMON ORDER groups before the first FT1. */
      orders?: DFTOrderGroup[];
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
    const o = this.options;
    if (!this.msh) errors.push("MSH segment is required");
    if (!this.evn) errors.push("EVN segment is required");
    if (!this.pid) errors.push("PID segment is required");
    if (!this.financials || this.financials.length === 0) errors.push("At least one FINANCIAL group (FT1) is required");
    const checkOrders = (list: DFTOrderGroup[] | undefined, scope: string) => {
      const where = scope ? `${scope} ` : "";
      (list ?? []).forEach((g, i) => {
        if (encodeOrder(g, this.encoding).length === 0) errors.push(`${where}COMMON ORDER group ${i + 1} is empty`);
        if (g.obrNteList?.length && !g.obr) errors.push(`${where}COMMON ORDER group ${i + 1}: OBR notes require an OBR`);
        (g.timing ?? []).forEach((t, j) => {
          if (!t.tq1) errors.push(`${where}COMMON ORDER group ${i + 1}, TIMING ${j + 1}: TQ1 segment is required`);
        });
        (g.observations ?? []).forEach((ob, j) => {
          if (!ob.obx) errors.push(`${where}COMMON ORDER group ${i + 1}, observation ${j + 1}: OBX segment is required`);
        });
      });
    };
    checkOrders(o.orders, "");
    (this.financials ?? []).forEach((f, i) => {
      if (!f.ft1) errors.push(`FINANCIAL group ${i + 1}: FT1 segment is required`);
      (f.procedures ?? []).forEach((p, j) => {
        if (!p.pr1) errors.push(`FINANCIAL group ${i + 1}, procedure ${j + 1}: PR1 segment is required`);
      });
      checkOrders(f.orders, `FINANCIAL group ${i + 1}`);
    });
    (o.insurances ?? []).forEach((ins, i) => {
      if (!ins.in1) errors.push(`INSURANCE group ${i + 1}: IN1 segment is required`);
    });
    if (o.pv2 && !o.pv1) errors.push("PV2 requires PV1");
    if (o.visitRolList?.length && !o.pv1) errors.push("Visit-level ROLs require PV1");
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
    if (o.pv1) out.push(o.pv1.encode(enc));
    if (o.pv2) out.push(o.pv2.encode(enc));
    for (const s of o.visitRolList ?? []) out.push(s.encode(enc));
    for (const s of o.db1List ?? []) out.push(s.encode(enc));
    for (const g of o.orders ?? []) out.push(...encodeOrder(g, enc));
    for (const f of this.financials) {
      out.push(f.ft1.encode(enc));
      if (f.nte) out.push(f.nte.encode(enc));
      for (const p of f.procedures ?? []) {
        out.push(p.pr1.encode(enc));
        for (const rol of p.rolList ?? []) out.push(rol.encode(enc));
      }
      for (const g of f.orders ?? []) out.push(...encodeOrder(g, enc));
    }
    for (const s of o.dg1List ?? []) out.push(s.encode(enc));
    if (o.drg) out.push(o.drg.encode(enc));
    for (const s of o.gt1List ?? []) out.push(s.encode(enc));
    for (const ins of o.insurances ?? []) {
      out.push(ins.in1.encode(enc));
      if (ins.in2) out.push(ins.in2.encode(enc));
      for (const s of ins.in3List ?? []) out.push(s.encode(enc));
      for (const s of ins.rolList ?? []) out.push(s.encode(enc));
    }
    if (o.acc) out.push(o.acc.encode(enc));
    return out.join("\r");
  }
}

/** Builds an HL7 DFT^P03 (2.5) message. */
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
