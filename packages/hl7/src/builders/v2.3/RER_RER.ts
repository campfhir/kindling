/**
 * Builder for RER^RER messages (HL7 v2.3).
 *
 * Structure: MSH MSA [ERR] { DEFINITION: QRD [QRF] [ PATIENT: PID [{NTE}] ] { ORDER: ORC RXE {RXR} [{RXC}] } } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { RER_RER_STRUCTURE } from "../../structures/v2.3/RER_RER.ts";
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
import type { DSC } from "../../segments/v2.3/DSC.ts";

/** The DEFINITION group of an RER^RER (HL7 v2.3) message being built. */
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

/** The ORDER group of an RER^RER (HL7 v2.3) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The optional segments and groups of an RER^RER (HL7 v2.3) message. */
export interface RER_REROptions {
  /** The ERR segment. */
  error?: ERR;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 RER^RER (HL7 v2.3) messages. */
export class RER_RER<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RER_RER";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RER_RER_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public definitions: DefinitionGroup[],
    public options: RER_REROptions = {},
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

/** Builds an HL7 RER^RER (HL7 v2.3) message. */
export function createRER_RER<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  definitions: DefinitionGroup[],
  options: RER_REROptions = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RER_RER<TMSH, TMSA> {
  return new RER_RER(header, acknowledgment, definitions, options, encoding);
}
