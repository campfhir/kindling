/**
 * Builder for CRM^C01 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] { PATIENT: PID [{PRT}] [ PATIENT_VISIT: PV1 [{PRT}] ] CSR [{CSP}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { CRM_C01_STRUCTURE } from "../../structures/v2.7/CRM_C01.ts";
import type { MSH } from "../../segments/v2.7/MSH.ts";
import type { SFT } from "../../segments/v2.7/SFT.ts";
import type { UAC } from "../../segments/v2.7/UAC.ts";
import type { PID } from "../../segments/v2.7/PID.ts";
import type { PRT } from "../../segments/v2.7/PRT.ts";
import type { PV1 } from "../../segments/v2.7/PV1.ts";
import type { CSR } from "../../segments/v2.7/CSR.ts";
import type { CSP } from "../../segments/v2.7/CSP.ts";

/** The PATIENT group of an CRM^C01 (HL7 v2.7) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The PATIENT VISIT group. */
  patientVisit?: PatientVisitGroup;
  /** The CSR segment. */
  studyRegistration: CSR;
  /** The CSP segments. */
  clinicalStudyPhases?: CSP[];
}

/** The PATIENT VISIT group of an CRM^C01 (HL7 v2.7) message being built. */
export interface PatientVisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The optional segments and groups of an CRM^C01 (HL7 v2.7) message. */
export interface CRM_C01Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 CRM^C01 (HL7 v2.7) messages. */
export class CRM_C01<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "CRM_C01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = CRM_C01_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public patients: PatientGroup[],
    public options: CRM_C01Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, patients: this.patients };
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

/** Builds an HL7 CRM^C01 (HL7 v2.7) message. */
export function createCRM_C01<TMSH extends MSH = MSH>(
  header: TMSH,
  patients: PatientGroup[],
  options: CRM_C01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): CRM_C01<TMSH> {
  return new CRM_C01(header, patients, options, encoding);
}
