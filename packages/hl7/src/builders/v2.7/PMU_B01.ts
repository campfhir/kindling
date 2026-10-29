/**
 * Builder for PMU^B01 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] EVN STF [{PRA}] [{ORG}] [{AFF}] [{LAN}] [{EDU}] [{CER}] [{NK1}] [{ROL}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { PMU_B01_STRUCTURE } from "../../structures/v2.7/PMU_B01.ts";
import type { MSH } from "../../segments/v2.7/MSH.ts";
import type { SFT } from "../../segments/v2.7/SFT.ts";
import type { UAC } from "../../segments/v2.7/UAC.ts";
import type { EVN } from "../../segments/v2.7/EVN.ts";
import type { STF } from "../../segments/v2.7/STF.ts";
import type { PRA } from "../../segments/v2.7/PRA.ts";
import type { ORG } from "../../segments/v2.7/ORG.ts";
import type { AFF } from "../../segments/v2.7/AFF.ts";
import type { LAN } from "../../segments/v2.7/LAN.ts";
import type { EDU } from "../../segments/v2.7/EDU.ts";
import type { CER } from "../../segments/v2.7/CER.ts";
import type { NK1 } from "../../segments/v2.7/NK1.ts";
import type { ROL } from "../../segments/v2.7/ROL.ts";

/** The optional segments and groups of an PMU^B01 (HL7 v2.7) message. */
export interface PMU_B01Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The PRA segments. */
  practitioners?: PRA[];
  /** The ORG segments. */
  organizationUnits?: ORG[];
  /** The AFF segments. */
  affiliations?: AFF[];
  /** The LAN segments. */
  languages?: LAN[];
  /** The EDU segments. */
  educations?: EDU[];
  /** The CER segments. */
  certificates?: CER[];
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The ROL segments. */
  roles?: ROL[];
}

/** Builder for HL7 PMU^B01 (HL7 v2.7) messages. */
export class PMU_B01<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TSTF extends STF = STF> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "PMU_B01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = PMU_B01_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public staff: TSTF,
    public options: PMU_B01Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, event: this.event, staff: this.staff };
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

/** Builds an HL7 PMU^B01 (HL7 v2.7) message. */
export function createPMU_B01<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TSTF extends STF = STF>(
  header: TMSH,
  event: TEVN,
  staff: TSTF,
  options: PMU_B01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): PMU_B01<TMSH, TEVN, TSTF> {
  return new PMU_B01(header, event, staff, options, encoding);
}
