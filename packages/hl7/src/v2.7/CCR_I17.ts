/**
 * Builder, parser and structure for CCR^I17 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] {RF1} { PROVIDER_CONTACT: PRD [{CTD}] } [{ CLINICAL_ORDER: ORC [{ CLINICAL_ORDER_TIMING: TQ1 [{TQ2}] }] { CLINICAL_ORDER_DETAIL: <OBR|RXO|ODS|PR1> [{OBX}] } [{CTI}] }] { PATIENT: PID [PD1] } [{NK1}] [{ INSURANCE: IN1 [IN2] [IN3] }] [{ APPOINTMENT_HISTORY: SCH [{ RESOURCES: RGS [{ RESOURCE_DETAIL: <AIS|AIG|AIL|AIP> [{OBX}] }] }] }] [{ CLINICAL_HISTORY: ORC [{ CLINICAL_HISTORY_DETAIL: <OBR|ODS|PR1|RF1|AL1|IAM|ACC|RMI|DB1|DG1|DRG> [{OBX}] }] [{ ROLE_CLINICAL_HISTORY: <ROL|PRD> [{VAR}] }] [{CTI}] }] { PATIENT_VISITS: PV1 [PV2] } [{ MEDICATION_HISTORY: ORC [ MEDICATION_ORDER_DETAIL: RXO {RXR} [{RXC}] [{OBX}] ] [ MEDICATION_ENCODING_DETAIL: RXE {RXR} [{RXC}] [{OBX}] ] [{ MEDICATION_ADMINISTRATION_DETAIL: {RXA} RXR [{OBX}] }] [{CTI}] }] [{ PROBLEM: PRB [{VAR}] [{ ROLE_PROBLEM: <ROL|PRD> [{VAR}] }] [{OBX}] }] [{ GOAL: GOL [{VAR}] [{ ROLE_GOAL:  ROLE_GOAL_OBJECT: ROL PRD  [{VAR}] }] [{OBX}] }] [{ PATHWAY: PTH [{VAR}] [{ ROLE_PATHWAY: <ROL|PRD> [{VAR}] }] [{OBX}] }] [{REL}]
 * Shares the CCR^I16 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { CCR_I16_Parser, type ParsedCCR_I16, CCR_I16, type CCR_I16Options, type ProviderContactGroup, type ClinicalOrderGroup, type ClinicalOrderTimingGroup, type ClinicalOrderDetailGroup, type PatientGroup, type InsuranceGroup, type AppointmentHistoryGroup, type ResourcesGroup, type ResourceDetailGroup, type ClinicalHistoryGroup, type ClinicalHistoryDetailGroup, type RoleClinicalHistoryGroup, type PatientVisitsGroup, type MedicationHistoryGroup, type MedicationOrderDetailGroup, type MedicationEncodingDetailGroup, type MedicationAdministrationDetailGroup, type ProblemGroup, type RoleProblemGroup, type GoalGroup, type RoleGoalGroup, type RoleGoalObjectGroup, type PathwayGroup, type RolePathwayGroup } from "./CCR_I16.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { RF1 } from "./RF1.ts";

export { CCR_I16_STRUCTURE as CCR_I17_STRUCTURE } from "./CCR_I16.ts";

export type { ParsedProviderContact, ParsedClinicalOrder, ParsedClinicalOrderTiming, ParsedClinicalOrderDetail, ParsedPatient, ParsedInsurance, ParsedAppointmentHistory, ParsedResources, ParsedResourceDetail, ParsedClinicalHistory, ParsedClinicalHistoryDetail, ParsedRoleClinicalHistory, ParsedPatientVisits, ParsedMedicationHistory, ParsedMedicationOrderDetail, ParsedMedicationEncodingDetail, ParsedMedicationAdministrationDetail, ParsedProblem, ParsedRoleProblem, ParsedGoal, ParsedRoleGoal, ParsedRoleGoalObject, ParsedPathway, ParsedRolePathway } from "./CCR_I16.ts";
/** Structured result of parsing an HL7 CCR^I17 (HL7 v2.7) message. */
export type ParsedCCR_I17 = ParsedCCR_I16;

/** Parser for HL7 CCR^I17 (HL7 v2.7) messages. */
export class CCR_I17_Parser extends CCR_I16_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "CCR_I17";
}

/** Parses an HL7 CCR^I17 (HL7 v2.7) message string into a structured result. */
export function parseCCR_I17(messageString: string): Result<ParsedCCR_I17> {
  return new CCR_I17_Parser().parse(messageString);
}

export type { ProviderContactGroup, ClinicalOrderGroup, ClinicalOrderTimingGroup, ClinicalOrderDetailGroup, PatientGroup, InsuranceGroup, AppointmentHistoryGroup, ResourcesGroup, ResourceDetailGroup, ClinicalHistoryGroup, ClinicalHistoryDetailGroup, RoleClinicalHistoryGroup, PatientVisitsGroup, MedicationHistoryGroup, MedicationOrderDetailGroup, MedicationEncodingDetailGroup, MedicationAdministrationDetailGroup, ProblemGroup, RoleProblemGroup, GoalGroup, RoleGoalGroup, RoleGoalObjectGroup, PathwayGroup, RolePathwayGroup };
/** The optional segments and groups of an CCR^I17 (HL7 v2.7) message. */
export type CCR_I17Options = CCR_I16Options;

/** Builder for HL7 CCR^I17 (HL7 v2.7) messages. */
export class CCR_I17<TMSH extends MSH = MSH> extends CCR_I16<TMSH> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "CCR_I17";
}

/** Builds an HL7 CCR^I17 (HL7 v2.7) message. */
export function createCCR_I17<TMSH extends MSH = MSH>(
  header: TMSH,
  referrals: RF1[],
  providerContacts: ProviderContactGroup[],
  patients: PatientGroup[],
  patientVisits: PatientVisitsGroup[],
  options: CCR_I17Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): CCR_I17<TMSH> {
  return new CCR_I17(header, referrals, providerContacts, patients, patientVisits, options, encoding);
}
