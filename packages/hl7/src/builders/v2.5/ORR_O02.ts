/**
 * Builder for ORR^O02 messages (HL7 v2.5).
 *
 * Structure: MSH MSA [{ERR}] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{CTI}] ] } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { ORR_O02_STRUCTURE } from "../../structures/v2.5/ORR_O02.ts";
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { MSA } from "../../segments/v2.5/MSA.ts";
import type { ERR } from "../../segments/v2.5/ERR.ts";
import type { NTE } from "../../segments/v2.5/NTE.ts";
import type { PID } from "../../segments/v2.5/PID.ts";
import type { ORC } from "../../segments/v2.5/ORC.ts";
import type { OBR } from "../../segments/v2.5/OBR.ts";
import type { RQD } from "../../segments/v2.5/RQD.ts";
import type { RQ1 } from "../../segments/v2.5/RQ1.ts";
import type { RXO } from "../../segments/v2.5/RXO.ts";
import type { ODS } from "../../segments/v2.5/ODS.ts";
import type { ODT } from "../../segments/v2.5/ODT.ts";
import type { CTI } from "../../segments/v2.5/CTI.ts";

/** The PATIENT group of an ORR^O02 (HL7 v2.5) message being built. */
export interface ResponsePatientGroup {
  /** The PID segment. */
  pid: PID;
  /** The NTE segments. */
  nteList?: NTE[];
}

/** The ORDER group of an ORR^O02 (HL7 v2.5) message being built. */
export interface ResponseOrderGroup {
  /** The ORC segment. */
  orc: ORC;
  /** The ORDER DETAIL group. */
  detail?: ResponseDetailGroup;
}

/** The ORDER DETAIL group of an ORR^O02 (HL7 v2.5) message being built. */
export interface ResponseDetailGroup {
  /** One of OBR, RQD, RQ1, RXO, ODS, ODT. */
  segment: OBR | RQD | RQ1 | RXO | ODS | ODT;
  /** The NTE segments. */
  nteList?: NTE[];
  /** The CTI segments. */
  ctiList?: CTI[];
}

/** The optional segments and groups of an ORR^O02 (HL7 v2.5) message. */
export interface ORR_O02Options {
  /** The ERR segments. */
  errList?: ERR[];
  /** The NTE segments. */
  nteList?: NTE[];
  /** The PATIENT group. */
  patient?: ResponsePatientGroup;
  /** The ORDER groups. */
  orders?: ResponseOrderGroup[];
}

/** Builder for HL7 ORR^O02 (HL7 v2.5) messages. */
export class ORR_O02<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORR_O02";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ORR_O02_STRUCTURE;

  /** Constructor. */
  constructor(
    public msh: TMSH,
    public msa: TMSA,
    public options: ORR_O02Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, msh: this.msh, msa: this.msa };
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

/** Builds an HL7 ORR^O02 (HL7 v2.5) message. */
export function createORR_O02<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  msh: TMSH,
  msa: TMSA,
  options: ORR_O02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ORR_O02<TMSH, TMSA> {
  return new ORR_O02(msh, msa, options, encoding);
}
