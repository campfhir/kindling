/**
 * Builder, parser and structure for SIU^S17 messages (HL7 v2.3.1).
 *
 * Structure: MSH SCH [{NTE}] [{ PATIENT: PID [PD1] [PV1] [PV2] [{OBX}] [{DG1}] }] { RESOURCES: RGS [{ SERVICE: AIS [{NTE}] }] [{ GENERAL_RESOURCE: AIG [{NTE}] }] [{ LOCATION_RESOURCE: AIL [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [{NTE}] }] }
 * Shares the SIU^S12 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { SIU_S12_Parser, type ParsedSIU_S12, SIU_S12, type SIU_S12Options, type SIUPatientGroup, type SIUResourcesGroup, type SIUServiceGroup, type SIUGeneralResourceGroup, type SIULocationResourceGroup, type SIUPersonnelResourceGroup } from "./SIU_S12.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.3.1/MSH.ts";
import type { SCH } from "../../segments/v2.3.1/SCH.ts";

export { SIU_S12_STRUCTURE as SIU_S17_STRUCTURE } from "./SIU_S12.ts";

export type { ParsedSIUPatient, ParsedSIUResources, ParsedSIUService, ParsedSIUGeneralResource, ParsedSIULocationResource, ParsedSIUPersonnelResource } from "./SIU_S12.ts";
/** Structured result of parsing an HL7 SIU^S17 (HL7 v2.3.1) message. */
export type ParsedSIU_S17 = ParsedSIU_S12;

/** Parser for HL7 SIU^S17 (HL7 v2.3.1) messages. */
export class SIU_S17_Parser extends SIU_S12_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SIU_S17";
}

/** Parses an HL7 SIU^S17 (HL7 v2.3.1) message string into a structured result. */
export function parseSIU_S17(messageString: string): Result<ParsedSIU_S17> {
  return new SIU_S17_Parser().parse(messageString);
}

export type { SIUPatientGroup, SIUResourcesGroup, SIUServiceGroup, SIUGeneralResourceGroup, SIULocationResourceGroup, SIUPersonnelResourceGroup };
/** The optional segments and groups of an SIU^S17 (HL7 v2.3.1) message. */
export type SIU_S17Options = SIU_S12Options;

/** Builder for HL7 SIU^S17 (HL7 v2.3.1) messages. */
export class SIU_S17<TMSH extends MSH = MSH, TSCH extends SCH = SCH> extends SIU_S12<TMSH, TSCH> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SIU_S17";
}

/** Builds an HL7 SIU^S17 (HL7 v2.3.1) message. */
export function createSIU_S17<TMSH extends MSH = MSH, TSCH extends SCH = SCH>(
  header: TMSH,
  appointment: TSCH,
  resources: SIUResourcesGroup[],
  options: SIU_S17Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SIU_S17<TMSH, TSCH> {
  return new SIU_S17(header, appointment, resources, options, encoding);
}
