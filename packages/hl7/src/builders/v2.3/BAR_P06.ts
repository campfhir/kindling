/**
 * Builder for BAR^P06 messages (HL7 v2.3): end account. Structure: MSH EVN { PID [PV1] }
 *
 * @module
 */
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { EVN } from "../../segments/v2.3/EVN.ts";
import type { PID } from "../../segments/v2.3/PID.ts";
import type { PV1 } from "../../segments/v2.3/PV1.ts";
import { type EncodingCharacters, DEFAULT_ENCODING } from "../../types/encoding.ts";

/** BAREndPatientGroup — one PATIENT group of a BAR^P06 message. */
export interface BAREndPatientGroup {
  /** The pid value. */
  pid: PID;
  /** The pv1 value. */
  pv1?: PV1;
}

/** Builder for HL7 BAR^P06 (v2.3) messages. */
export class BAR_P06<TMSH extends MSH = MSH, TEVN extends EVN = EVN> {
  /** The message name value. */
  protected readonly messageName: string = "BAR_P06";

  /** Constructor. */
  constructor(
    public msh: TMSH,
    public evn: TEVN,
    /** The PATIENT groups; at least one is required. */
    public patients: BAREndPatientGroup[],
    private encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** Validates the message structure, returning a result. */
  verify(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    if (!this.msh) errors.push("MSH segment is required");
    if (!this.evn) errors.push("EVN segment is required");
    if (!this.patients || this.patients.length === 0) errors.push("At least one PATIENT group (PID) is required");
    (this.patients ?? []).forEach((p, i) => {
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
    const enc = this.encoding;
    const out = [this.msh.encode(enc), this.evn.encode(enc)];
    for (const p of this.patients) {
      out.push(p.pid.encode(enc));
      if (p.pv1) out.push(p.pv1.encode(enc));
    }
    return out.join("\r");
  }
}

/** Builds an HL7 BAR^P06 (v2.3) message. */
export function createBAR_P06<TMSH extends MSH = MSH, TEVN extends EVN = EVN>(
  msh: TMSH,
  evn: TEVN,
  patients: BAREndPatientGroup[],
  encoding?: EncodingCharacters,
): BAR_P06<TMSH, TEVN> {
  return new BAR_P06(msh, evn, patients, encoding);
}
