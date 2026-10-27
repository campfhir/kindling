/**
 * Builder for MFN^M18 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] MFI { MF_PAYER: MFE { PAYER_MF_ENTRY: PM1 { PAYER_MF_COVERAGE: MCP [{DPS}] } } } MSH [{SFT}] [UAC] MSA [{ERR}] MFI [{MFA}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MFN_M18_STRUCTURE } from "../../structures/v2.9.1/MFN_M18.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { SFT } from "../../segments/v2.9.1/SFT.ts";
import type { UAC } from "../../segments/v2.9.1/UAC.ts";
import type { MFI } from "../../segments/v2.9.1/MFI.ts";
import type { MFE } from "../../segments/v2.9.1/MFE.ts";
import type { PM1 } from "../../segments/v2.9.1/PM1.ts";
import type { MCP } from "../../segments/v2.9.1/MCP.ts";
import type { DPS } from "../../segments/v2.9.1/DPS.ts";
import type { MSA } from "../../segments/v2.9.1/MSA.ts";
import type { ERR } from "../../segments/v2.9.1/ERR.ts";
import type { MFA } from "../../segments/v2.9.1/MFA.ts";

/** The MF PAYER group of an MFN^M18 (HL7 v2.9.1) message being built. */
export interface MfPayerGroup {
  /** The MFE segment. */
  entry: MFE;
  /** The PAYER MF ENTRY groups. */
  payerMfEntrys: PayerMfEntryGroup[];
}

/** The PAYER MF ENTRY group of an MFN^M18 (HL7 v2.9.1) message being built. */
export interface PayerMfEntryGroup {
  /** The PM1 segment. */
  pm1: PM1;
  /** The PAYER MF COVERAGE groups. */
  payerMfCoverages: PayerMfCoverageGroup[];
}

/** The PAYER MF COVERAGE group of an MFN^M18 (HL7 v2.9.1) message being built. */
export interface PayerMfCoverageGroup {
  /** The MCP segment. */
  mcp: MCP;
  /** The DPS segments. */
  dpsList?: DPS[];
}

/** The optional segments and groups of an MFN^M18 (HL7 v2.9.1) message. */
export interface MFN_M18Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The SFT segments. */
  sft2?: SFT[];
  /** The UAC segment. */
  uac2?: UAC;
  /** The ERR segments. */
  errors?: ERR[];
  /** The MFA segments. */
  entryAcknowledgments?: MFA[];
}

/** Builder for HL7 MFN^M18 (HL7 v2.9.1) messages. */
export class MFN_M18<TMSH extends MSH = MSH, TMFI extends MFI = MFI, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M18";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFN_M18_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public masterFile: TMFI,
    public mfPayers: MfPayerGroup[],
    public msh2: MSH,
    public acknowledgment: TMSA,
    public mfi2: MFI,
    public options: MFN_M18Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, masterFile: this.masterFile, mfPayers: this.mfPayers, msh2: this.msh2, acknowledgment: this.acknowledgment, mfi2: this.mfi2 };
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

/** Builds an HL7 MFN^M18 (HL7 v2.9.1) message. */
export function createMFN_M18<TMSH extends MSH = MSH, TMFI extends MFI = MFI, TMSA extends MSA = MSA>(
  header: TMSH,
  masterFile: TMFI,
  mfPayers: MfPayerGroup[],
  msh2: MSH,
  acknowledgment: TMSA,
  mfi2: MFI,
  options: MFN_M18Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFN_M18<TMSH, TMFI, TMSA> {
  return new MFN_M18(header, masterFile, mfPayers, msh2, acknowledgment, mfi2, options, encoding);
}
