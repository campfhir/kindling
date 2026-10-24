/**
 * Builder for ADT^A34 messages (HL7 v2.5): MSH [{SFT}] EVN PID [PD1] MRG [PV1].
 *
 * The merge/move/change events (A18, A30, A35–A37, A39–A51) reuse this builder; PV1 is an
 * option so the events that require it can pass it.
 *
 * @module
 */
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { SFT } from "../../segments/v2.5/SFT.ts";
import type { EVN } from "../../segments/v2.5/EVN.ts";
import type { PID } from "../../segments/v2.5/PID.ts";
import type { PD1 } from "../../segments/v2.5/PD1.ts";
import type { MRG } from "../../segments/v2.5/MRG.ts";
import type { PV1 } from "../../segments/v2.5/PV1.ts";
import { type EncodingCharacters, DEFAULT_ENCODING } from "../../types/encoding.ts";

/** Builder for HL7 ADT^A34 (v2.5) messages. */
export class ADT_A34<
  TMSH extends MSH = MSH,
  TEVN extends EVN = EVN,
  TPID extends PID = PID,
  TPD1 extends PD1 = PD1,
  TMRG extends MRG = MRG,
  TPV1 extends PV1 = PV1,
> {
  /** The message name value. */
  protected readonly messageName: string = "ADT_A34";

  /** Constructor. */
  constructor(
    public msh: TMSH,
    public pid: TPID,
    public mrg: TMRG,
    public options: {
      /** Software segments, which follow MSH. */
      sftList?: SFT[];
      evn?: TEVN;
      pd1?: TPD1;
      pv1?: TPV1;
    } = {},
    private encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** Validates the message structure, returning a result. */
  verify(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    if (!this.msh) errors.push("MSH segment is required");
    if (!this.pid) errors.push("PID segment is required");
    if (!this.mrg) errors.push("MRG segment is required");
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
    if (o.evn) out.push(o.evn.encode(enc));
    out.push(this.pid.encode(enc));
    if (o.pd1) out.push(o.pd1.encode(enc));
    out.push(this.mrg.encode(enc));
    if (o.pv1) out.push(o.pv1.encode(enc));
    return out.join("\r");
  }
}

/** Builds an HL7 ADT^A34 (v2.5) message. */
export function createADT_A34<
  TMSH extends MSH = MSH,
  TEVN extends EVN = EVN,
  TPID extends PID = PID,
  TPD1 extends PD1 = PD1,
  TMRG extends MRG = MRG,
  TPV1 extends PV1 = PV1,
>(
  msh: TMSH,
  pid: TPID,
  mrg: TMRG,
  options: ADT_A34<TMSH, TEVN, TPID, TPD1, TMRG, TPV1>["options"] = {},
  encoding?: EncodingCharacters,
): ADT_A34<TMSH, TEVN, TPID, TPD1, TMRG, TPV1> {
  return new ADT_A34(msh, pid, mrg, options, encoding);
}
