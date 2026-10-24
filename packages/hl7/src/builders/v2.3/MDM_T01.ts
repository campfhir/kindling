/**
 * Builder for MDM^T01 messages (HL7 v2.3): MSH EVN PID PV1 TXA.
 *
 * @module
 */
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { EVN } from "../../segments/v2.3/EVN.ts";
import type { PID } from "../../segments/v2.3/PID.ts";
import type { PV1 } from "../../segments/v2.3/PV1.ts";
import type { TXA } from "../../segments/v2.3/TXA.ts";
import { type EncodingCharacters, DEFAULT_ENCODING } from "../../types/encoding.ts";

/** Builder for HL7 MDM^T01 (v2.3) messages. */
export class MDM_T01<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1, TTXA extends TXA = TXA> {
  /** The message name value. */
  protected readonly messageName: string = "MDM_T01";

  /** Constructor. */
  constructor(
    public msh: TMSH,
    public evn: TEVN,
    public pid: TPID,
    public pv1: TPV1,
    public txa: TTXA,
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
    return out.join("\r");
  }
}

/** Builds an HL7 MDM^T01 (v2.3) message. */
export function createMDM_T01<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1, TTXA extends TXA = TXA>(
  msh: TMSH,
  evn: TEVN,
  pid: TPID,
  pv1: TPV1,
  txa: TTXA,
  encoding?: EncodingCharacters,
): MDM_T01<TMSH, TEVN, TPID, TPV1, TTXA> {
  return new MDM_T01(msh, evn, pid, pv1, txa, encoding);
}
