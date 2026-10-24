/**
 * Builder for MDM^T02 messages (HL7 v2.5): MSH [{SFT}] EVN PID PV1 [{ ORC [{ TQ1 [{TQ2}] }] OBR [{NTE}] }] TXA { OBX [{NTE}] }
 *
 * v2.5.1 is identical. Compared with v2.3/v2.4: SFT, the COMMON ORDER group and NTEs after each OBX are new.
 *
 * @module
 */
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { SFT } from "../../segments/v2.5/SFT.ts";
import type { EVN } from "../../segments/v2.5/EVN.ts";
import type { PID } from "../../segments/v2.5/PID.ts";
import type { PV1 } from "../../segments/v2.5/PV1.ts";
import type { ORC } from "../../segments/v2.5/ORC.ts";
import type { TQ1 } from "../../segments/v2.5/TQ1.ts";
import type { TQ2 } from "../../segments/v2.5/TQ2.ts";
import type { OBR } from "../../segments/v2.5/OBR.ts";
import type { NTE } from "../../segments/v2.5/NTE.ts";
import type { TXA } from "../../segments/v2.5/TXA.ts";
import type { OBX } from "../../segments/v2.5/OBX.ts";
import { type EncodingCharacters, DEFAULT_ENCODING } from "../../types/encoding.ts";

/** MDMTimingGroup — a TQ1 with its TQ2 segments. */
export interface MDMTimingGroup {
  /** The tq1 value. */
  tq1: TQ1;
  /** The tq2 list value. */
  tq2List?: TQ2[];
}

/** MDMOrderGroup — a COMMON ORDER group: ORC, timing, OBR and its NTEs. */
export interface MDMOrderGroup {
  /** The orc value. */
  orc: ORC;
  /** The timing value. */
  timing?: MDMTimingGroup[];
  /** The obr value. */
  obr: OBR;
  /** The nte list value (notes on the order). */
  nteList?: NTE[];
}

/** MDMObservationGroup — an OBX with the NTEs that follow it. */
export interface MDMObservationGroup {
  /** The obx value. */
  obx: OBX;
  /** The nte list value. */
  nteList?: NTE[];
}

/** Builder for HL7 MDM^T02 (v2.5) messages. */
export class MDM_T02<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1, TTXA extends TXA = TXA> {
  /** The message name value. */
  protected readonly messageName: string = "MDM_T02";

  /** Constructor. */
  constructor(
    public msh: TMSH,
    public evn: TEVN,
    public pid: TPID,
    public pv1: TPV1,
    public txa: TTXA,
    /** Document content; at least one observation is required. */
    public observations: MDMObservationGroup[],
    public options: {
      /** Software segments, which follow MSH. */
      sftList?: SFT[];
      /** COMMON ORDER groups, which precede TXA. */
      orders?: MDMOrderGroup[];
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
    if (!this.txa) errors.push("TXA segment is required");
    (this.options.orders ?? []).forEach((o, i) => {
      if (!o.orc) errors.push(`COMMON ORDER group ${i + 1}: ORC segment is required`);
      if (!o.obr) errors.push(`COMMON ORDER group ${i + 1}: OBR segment is required`);
      (o.timing ?? []).forEach((t, j) => {
        if (!t.tq1) errors.push(`COMMON ORDER group ${i + 1}, TIMING ${j + 1}: TQ1 segment is required`);
      });
    });
    if (!this.observations || this.observations.length === 0) errors.push("At least one OBSERVATION group (OBX) is required");
    (this.observations ?? []).forEach((ob, i) => {
      if (!ob.obx) errors.push(`OBSERVATION group ${i + 1}: OBX segment is required`);
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
    const out: string[] = [this.msh.encode(enc)];
    for (const sft of this.options.sftList ?? []) out.push(sft.encode(enc));
    out.push(this.evn.encode(enc), this.pid.encode(enc), this.pv1.encode(enc));
    for (const o of this.options.orders ?? []) {
      out.push(o.orc.encode(enc));
      for (const t of o.timing ?? []) {
        out.push(t.tq1.encode(enc));
        for (const tq2 of t.tq2List ?? []) out.push(tq2.encode(enc));
      }
      out.push(o.obr.encode(enc));
      for (const nte of o.nteList ?? []) out.push(nte.encode(enc));
    }
    out.push(this.txa.encode(enc));
    for (const ob of this.observations) {
      out.push(ob.obx.encode(enc));
      for (const nte of ob.nteList ?? []) out.push(nte.encode(enc));
    }
    return out.join("\r");
  }
}

/** Builds an HL7 MDM^T02 (v2.5) message. */
export function createMDM_T02<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1, TTXA extends TXA = TXA>(
  msh: TMSH,
  evn: TEVN,
  pid: TPID,
  pv1: TPV1,
  txa: TTXA,
  observations: MDMObservationGroup[],
  options: MDM_T02<TMSH, TEVN, TPID, TPV1, TTXA>["options"] = {},
  encoding?: EncodingCharacters,
): MDM_T02<TMSH, TEVN, TPID, TPV1, TTXA> {
  return new MDM_T02(msh, evn, pid, pv1, txa, observations, options, encoding);
}
