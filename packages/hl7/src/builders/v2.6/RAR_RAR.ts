/**
 * Builder for RAR^RAR messages (HL7 v2.6).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] [UAC] { DEFINITION: QRD [QRF] [ PATIENT: PID [{NTE}] ] { ORDER: ORC [ ENCODING: RXE {RXR} [{RXC}] ] {RXA} RXR } } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { RAR_RAR_STRUCTURE } from "../../structures/v2.6/RAR_RAR.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { MSA } from "../../segments/v2.6/MSA.ts";
import type { ERR } from "../../segments/v2.6/ERR.ts";
import type { SFT } from "../../segments/v2.6/SFT.ts";
import type { UAC } from "../../segments/v2.6/UAC.ts";
import type { QRD } from "../../segments/v2.6/QRD.ts";
import type { QRF } from "../../segments/v2.6/QRF.ts";
import type { PID } from "../../segments/v2.6/PID.ts";
import type { NTE } from "../../segments/v2.6/NTE.ts";
import type { ORC } from "../../segments/v2.6/ORC.ts";
import type { RXE } from "../../segments/v2.6/RXE.ts";
import type { RXR } from "../../segments/v2.6/RXR.ts";
import type { RXC } from "../../segments/v2.6/RXC.ts";
import type { RXA } from "../../segments/v2.6/RXA.ts";
import type { DSC } from "../../segments/v2.6/DSC.ts";

/** The DEFINITION group of an RAR^RAR (HL7 v2.6) message being built. */
export interface DefinitionGroup {
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The PATIENT group. */
  patient?: PatientGroup;
  /** The ORDER groups. */
  orders: OrderGroup[];
}

/** The PATIENT group of an RAR^RAR (HL7 v2.6) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER group of an RAR^RAR (HL7 v2.6) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ENCODING group. */
  encoding?: EncodingGroup;
  /** The RXA segments. */
  administrations: RXA[];
  /** The RXR segment. */
  route: RXR;
}

/** The ENCODING group of an RAR^RAR (HL7 v2.6) message being built. */
export interface EncodingGroup {
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The optional segments and groups of an RAR^RAR (HL7 v2.6) message. */
export interface RAR_RAROptions {
  /** The ERR segments. */
  errors?: ERR[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 RAR^RAR (HL7 v2.6) messages. */
export class RAR_RAR<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RAR_RAR";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RAR_RAR_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public definitions: DefinitionGroup[],
    public options: RAR_RAROptions = {},
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

/** Builds an HL7 RAR^RAR (HL7 v2.6) message. */
export function createRAR_RAR<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  definitions: DefinitionGroup[],
  options: RAR_RAROptions = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RAR_RAR<TMSH, TMSA> {
  return new RAR_RAR(header, acknowledgment, definitions, options, encoding);
}
