/**
 * Builder for RDR^RDR messages (HL7 v2.3).
 *
 * Structure: MSH MSA [ERR] { DEFINITION: QRD [QRF] [ PATIENT: PID [{NTE}] ] { ORDER: ORC [ ENCODING: RXE {RXR} [{RXC}] ] { DISPENSE: RXD {RXR} [{RXC}] } } } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { RDR_RDR_STRUCTURE } from "../../structures/v2.3/RDR_RDR.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { MSA } from "../../segments/v2.3/MSA.ts";
import type { ERR } from "../../segments/v2.3/ERR.ts";
import type { QRD } from "../../segments/v2.3/QRD.ts";
import type { QRF } from "../../segments/v2.3/QRF.ts";
import type { PID } from "../../segments/v2.3/PID.ts";
import type { NTE } from "../../segments/v2.3/NTE.ts";
import type { ORC } from "../../segments/v2.3/ORC.ts";
import type { RXE } from "../../segments/v2.3/RXE.ts";
import type { RXR } from "../../segments/v2.3/RXR.ts";
import type { RXC } from "../../segments/v2.3/RXC.ts";
import type { RXD } from "../../segments/v2.3/RXD.ts";
import type { DSC } from "../../segments/v2.3/DSC.ts";

/** The DEFINITION group of an RDR^RDR (HL7 v2.3) message being built. */
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

/** The ORDER group of an RDR^RDR (HL7 v2.3) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ENCODING group. */
  encoding?: Encoding;
  /** The DISPENSE groups. */
  dispenses: Dispense[];
}

/** The ENCODING group of an RDR^RDR (HL7 v2.3) message being built. */
export interface Encoding {
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The DISPENSE group of an RDR^RDR (HL7 v2.3) message being built. */
export interface Dispense {
  /** The RXD segment. */
  dispense: RXD;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The optional segments and groups of an RDR^RDR (HL7 v2.3) message. */
export interface RDR_RDROptions {
  /** The ERR segment. */
  error?: ERR;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 RDR^RDR (HL7 v2.3) messages. */
export class RDR_RDR<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RDR_RDR";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RDR_RDR_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public definitions: DefinitionGroup[],
    public options: RDR_RDROptions = {},
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

/** Builds an HL7 RDR^RDR (HL7 v2.3) message. */
export function createRDR_RDR<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  definitions: DefinitionGroup[],
  options: RDR_RDROptions = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RDR_RDR<TMSH, TMSA> {
  return new RDR_RDR(header, acknowledgment, definitions, options, encoding);
}
