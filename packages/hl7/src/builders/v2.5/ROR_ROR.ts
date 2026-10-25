/**
 * Builder for ROR^ROR messages (HL7 v2.5).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] { DEFINITION: QRD [QRF] [ PATIENT: PID [{NTE}] ] { ORDER: ORC RXO {RXR} [{RXC}] } } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { ROR_ROR_STRUCTURE } from "../../structures/v2.5/ROR_ROR.ts";
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { MSA } from "../../segments/v2.5/MSA.ts";
import type { ERR } from "../../segments/v2.5/ERR.ts";
import type { SFT } from "../../segments/v2.5/SFT.ts";
import type { QRD } from "../../segments/v2.5/QRD.ts";
import type { QRF } from "../../segments/v2.5/QRF.ts";
import type { PID } from "../../segments/v2.5/PID.ts";
import type { NTE } from "../../segments/v2.5/NTE.ts";
import type { ORC } from "../../segments/v2.5/ORC.ts";
import type { RXO } from "../../segments/v2.5/RXO.ts";
import type { RXR } from "../../segments/v2.5/RXR.ts";
import type { RXC } from "../../segments/v2.5/RXC.ts";
import type { DSC } from "../../segments/v2.5/DSC.ts";

/** The DEFINITION group of an ROR^ROR (HL7 v2.5) message being built. */
export interface DefinitionGroup {
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The PID segment. */
  patient?: PID;
  /** The NTE segments. */
  patientNotes?: NTE[];
  /** The ORDER groups. */
  orders: OrderGroup[];
}

/** The ORDER group of an ROR^ROR (HL7 v2.5) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The RXO segment. */
  pharmacyOrder: RXO;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The optional segments and groups of an ROR^ROR (HL7 v2.5) message. */
export interface ROR_ROROptions {
  /** The ERR segments. */
  errors?: ERR[];
  /** The SFT segments. */
  software?: SFT[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 ROR^ROR (HL7 v2.5) messages. */
export class ROR_ROR<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ROR_ROR";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ROR_ROR_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public definitions: DefinitionGroup[],
    public options: ROR_ROROptions = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, definitions: this.definitions };
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

/** Builds an HL7 ROR^ROR (HL7 v2.5) message. */
export function createROR_ROR<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  definitions: DefinitionGroup[],
  options: ROR_ROROptions = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ROR_ROR<TMSH, TMSA> {
  return new ROR_ROR(header, acknowledgment, definitions, options, encoding);
}
