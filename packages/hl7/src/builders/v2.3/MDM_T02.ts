/**
 * Builder for MDM^T02 messages (HL7 v2.3): MSH EVN PID PV1 TXA {OBX}.
 *
 * @module
 */
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { EVN } from "../../segments/v2.3/EVN.ts";
import type { PID } from "../../segments/v2.3/PID.ts";
import type { PV1 } from "../../segments/v2.3/PV1.ts";
import type { TXA } from "../../segments/v2.3/TXA.ts";
import type { OBX } from "../../segments/v2.3/OBX.ts";
import { type EncodingCharacters, DEFAULT_ENCODING } from "../../types/encoding.ts";

/** Builder for HL7 MDM^T02 (v2.3) messages. */
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
    /** Document content; at least one OBX is required. */
    public obxList: OBX[],
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
    if (!this.obxList || this.obxList.length === 0) errors.push("At least one OBX segment is required");
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
    const out = [this.msh.encode(enc), this.evn.encode(enc), this.pid.encode(enc), this.pv1.encode(enc), this.txa.encode(enc)];
    for (const obx of this.obxList) out.push(obx.encode(enc));
    return out.join("\r");
  }
}

/** Builds an HL7 MDM^T02 (v2.3) message. */
export function createMDM_T02<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1, TTXA extends TXA = TXA>(
  msh: TMSH,
  evn: TEVN,
  pid: TPID,
  pv1: TPV1,
  txa: TTXA,
  obxList: OBX[],
  encoding?: EncodingCharacters,
): MDM_T02<TMSH, TEVN, TPID, TPV1, TTXA> {
  return new MDM_T02(msh, evn, pid, pv1, txa, obxList, encoding);
}
