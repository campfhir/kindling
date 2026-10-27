/**
 * Builder for CCQ^I19 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] RF1 [{ PROVIDER_CONTACT: PRD [{CTD}] }] [{REL}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { CCQ_I19_STRUCTURE } from "../../structures/v2.9.1/CCQ_I19.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { SFT } from "../../segments/v2.9.1/SFT.ts";
import type { UAC } from "../../segments/v2.9.1/UAC.ts";
import type { RF1 } from "../../segments/v2.9.1/RF1.ts";
import type { PRD } from "../../segments/v2.9.1/PRD.ts";
import type { CTD } from "../../segments/v2.9.1/CTD.ts";
import type { REL } from "../../segments/v2.9.1/REL.ts";

/** The PROVIDER CONTACT group of an CCQ^I19 (HL7 v2.9.1) message being built. */
export interface ProviderContactGroup {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** The optional segments and groups of an CCQ^I19 (HL7 v2.9.1) message. */
export interface CCQ_I19Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The PROVIDER CONTACT groups. */
  providerContacts?: ProviderContactGroup[];
  /** The REL segments. */
  relList?: REL[];
}

/** Builder for HL7 CCQ^I19 (HL7 v2.9.1) messages. */
export class CCQ_I19<TMSH extends MSH = MSH, TRF1 extends RF1 = RF1> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "CCQ_I19";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = CCQ_I19_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public referral: TRF1,
    public options: CCQ_I19Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, referral: this.referral };
  }

  /** Validates the message structure, returning a result. */
  verify(): { valid: boolean; errors: string[] } {
    const errors = verifyStructure(this.structure, this.toInput());
    return { valid: errors.length === 0, errors };
  }

  /** Encodes this message to its HL7 wire string. */
  encode(): string {
    const verification = this.verify();
    if (!verification.valid) {
      throw new Error(`Cannot encode invalid ${this.messageName} message:\n${verification.errors.join("\n")}`);
    }
    return encodeStructure(this.structure, this.toInput(), this.encoding);
  }
}

/** Builds an HL7 CCQ^I19 (HL7 v2.9.1) message. */
export function createCCQ_I19<TMSH extends MSH = MSH, TRF1 extends RF1 = RF1>(
  header: TMSH,
  referral: TRF1,
  options: CCQ_I19Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): CCQ_I19<TMSH, TRF1> {
  return new CCQ_I19(header, referral, options, encoding);
}
