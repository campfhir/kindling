/**
 * Builder for ADT^A20 messages (HL7 v2.5): bed status update. Structure: MSH EVN NPU.
 * Compared with v2.3 only [{SFT}] after MSH is new.
 *
 * @module
 */
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { SFT } from "../../segments/v2.5/SFT.ts";
import type { EVN } from "../../segments/v2.5/EVN.ts";
import type { NPU } from "../../segments/v2.5/NPU.ts";
import { type EncodingCharacters, DEFAULT_ENCODING } from "../../types/encoding.ts";

/** Builder for HL7 ADT^A20 (v2.3) messages. */
export class ADT_A20<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TNPU extends NPU = NPU> {
  /** The message name value. */
  protected readonly messageName: string = "ADT_A20";

  /** Constructor. */
  constructor(
    public msh: TMSH,
    public evn: TEVN,
    public npu: TNPU,
    public options: { /** Software segments, which follow MSH. */ sftList?: SFT[] } = {},
    private encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** Validates the message structure, returning a result. */
  verify(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    if (!this.msh) errors.push("MSH segment is required");
    if (!this.evn) errors.push("EVN segment is required");
    if (!this.npu) errors.push("NPU segment is required");
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
    return [this.msh.encode(enc), ...(this.options.sftList ?? []).map((s) => s.encode(enc)), this.evn.encode(enc), this.npu.encode(enc)].join("\r");
  }
}

/** Builds an HL7 ADT^A20 (v2.3) message. */
export function createADT_A20<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TNPU extends NPU = NPU>(
  msh: TMSH,
  evn: TEVN,
  npu: TNPU,
  options: ADT_A20<TMSH, TEVN, TNPU>["options"] = {},
  encoding?: EncodingCharacters,
): ADT_A20<TMSH, TEVN, TNPU> {
  return new ADT_A20(msh, evn, npu, options, encoding);
}
