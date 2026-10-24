/**
 * Builder for BAR^P02 messages (HL7 2.5): purge patient accounts. Structure: MSH [{SFT}] EVN { PID [PD1] [PV1] [{DB1}] }
 *
 * @module
 */
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { SFT } from "../../segments/v2.5/SFT.ts";
import type { EVN } from "../../segments/v2.5/EVN.ts";
import type { PID } from "../../segments/v2.5/PID.ts";
import type { PD1 } from "../../segments/v2.5/PD1.ts";
import type { PV1 } from "../../segments/v2.5/PV1.ts";
import type { DB1 } from "../../segments/v2.5/DB1.ts";
import { type EncodingCharacters, DEFAULT_ENCODING } from "../../types/encoding.ts";

/** BARPurgePatientGroup — one PATIENT group of a BAR^P02 message. */
export interface BARPurgePatientGroup {
  /** The pid value. */
  pid: PID;
  /** The pd1 value. */
  pd1?: PD1;
  /** The pv1 value. */
  pv1?: PV1;
  /** The db1 list value. */
  db1List?: DB1[];
}

/** Builder for HL7 BAR^P02 (v2.3) messages. */
export class BAR_P02<TMSH extends MSH = MSH, TEVN extends EVN = EVN> {
  /** The message name value. */
  protected readonly messageName: string = "BAR_P02";

  /** Constructor. */
  constructor(
    public msh: TMSH,
    public evn: TEVN,
    /** The PATIENT groups; at least one is required. */
    public patients: BARPurgePatientGroup[],
    public options: { /** Software segments, which follow MSH. */ sftList?: SFT[] } = {},
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
    const out = [this.msh.encode(enc), ...(this.options.sftList ?? []).map((s) => s.encode(enc)), this.evn.encode(enc)];
    for (const p of this.patients) {
      out.push(p.pid.encode(enc));
      if (p.pd1) out.push(p.pd1.encode(enc));
      if (p.pv1) out.push(p.pv1.encode(enc));
      for (const s of p.db1List ?? []) out.push(s.encode(enc));
    }
    return out.join("\r");
  }
}

/** Builds an HL7 BAR^P02 (v2.3) message. */
export function createBAR_P02<TMSH extends MSH = MSH, TEVN extends EVN = EVN>(
  msh: TMSH,
  evn: TEVN,
  patients: BARPurgePatientGroup[],
  options: BAR_P02<TMSH, TEVN>["options"] = {},
  encoding?: EncodingCharacters,
): BAR_P02<TMSH, TEVN> {
  return new BAR_P02(msh, evn, patients, options, encoding);
}
