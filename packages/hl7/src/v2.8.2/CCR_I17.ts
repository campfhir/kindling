/**
 * Builder, parser and structure for CCR^I17 messages (HL7 v2.8.2).
 *
 * Structure: MSH [{SFT}] [UAC] {RF1} { PROVIDER_CONTACT: PRD [{CTD}] } [{ CLINICAL_ORDER: ORC [{ CLINICAL_ORDER_TIMING: TQ1 [{TQ2}] }] { CLINICAL_ORDER_DETAIL: <OBR|RXO|ODS|PR1> [{ CLINICAL_ORDER_OBSERVATION: OBX [{PRT}] }] } [{CTI}] }] { PATIENT: PID [PD1] } [{NK1}] [{ INSURANCE: IN1 [IN2] [IN3] }] [{ APPOINTMENT_HISTORY: SCH [{ RESOURCES: RGS [{ RESOURCE_DETAIL: <AIS|AIG|AIL|AIP> [{ RESOURCE_OBSERVATION: OBX [{PRT}] }] }] }] }] [{ CLINICAL_HISTORY: ORC [{ CLINICAL_HISTORY_DETAIL: <OBR|ODS|PR1|RF1|AL1|IAM|ACC|RMI|DB1|DG1|DRG> [{ CLINICAL_HISTORY_OBSERVATION: OBX [{PRT}] }] }] [{ ROLE_CLINICAL_HISTORY: <ROL|PRD> [{VAR}] }] [{CTI}] }] { PATIENT_VISITS: PV1 [PV2] } [{ MEDICATION_HISTORY: ORC [ MEDICATION_ORDER_DETAIL: RXO {RXR} [{RXC}] [{ MEDICATION_ORDER_OBSERVATION: OBX [{PRT}] }] ] [ MEDICATION_ENCODING_DETAIL: RXE {RXR} [{RXC}] [{ MEDICATION_ENCODING_OBSERVATION: OBX [{PRT}] }] ] [{ MEDICATION_ADMINISTRATION_DETAIL: {RXA} RXR [{ MEDICATION_ADMINISTRATION_OBSERVATION: OBX [{PRT}] }] }] [{CTI}] }] [{ PROBLEM: PRB [{VAR}] [{ ROLE_PROBLEM: <ROL|PRD> [{VAR}] }] [{ ROLE_OBSERVATION: OBX [{PRT}] }] }] [{ GOAL: GOL [{VAR}] [{ ROLE_GOAL: <ROL|PRD> [{VAR}] }] [{ GOAL_OBSERVATION: OBX [{PRT}] }] }] [{ PATHWAY: PTH [{VAR}] [{ ROLE_PATHWAY: <ROL|PRD> [{VAR}] }] [{ PATHWAY_OBSERVATION: OBX [{PRT}] }] }] [{REL}]
 * Shares the CCR^I16 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { CCR_I16_Parser, type ParsedCCR_I16, CCR_I16, type CCR_I16Options, type ProviderContactGroup, type ClinicalOrderGroup, type ClinicalOrderTimingGroup, type ClinicalOrderDetailGroup, type ClinicalOrderObservationGroup, type PatientGroup, type InsuranceGroup, type AppointmentHistoryGroup, type ResourcesGroup, type ResourceDetailGroup, type ResourceObservationGroup, type ClinicalHistoryGroup, type ClinicalHistoryDetailGroup, type ClinicalHistoryObservationGroup, type RoleClinicalHistoryGroup, type PatientVisitsGroup, type MedicationHistoryGroup, type MedicationOrderDetailGroup, type MedicationOrderObservationGroup, type MedicationEncodingDetailGroup, type MedicationEncodingObservationGroup, type MedicationAdministrationDetailGroup, type MedicationAdministrationObservationGroup, type ProblemGroup, type RoleProblemGroup, type RoleObservationGroup, type GoalGroup, type RoleGoalGroup, type GoalObservationGroup, type PathwayGroup, type RolePathwayGroup, type PathwayObservationGroup } from "./CCR_I16.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { RF1 } from "./RF1.ts";

export { CCR_I16_STRUCTURE as CCR_I17_STRUCTURE } from "./CCR_I16.ts";

export type { ParsedProviderContact, ParsedClinicalOrder, ParsedClinicalOrderTiming, ParsedClinicalOrderDetail, ParsedClinicalOrderObservation, ParsedPatient, ParsedInsurance, ParsedAppointmentHistory, ParsedResources, ParsedResourceDetail, ParsedResourceObservation, ParsedClinicalHistory, ParsedClinicalHistoryDetail, ParsedClinicalHistoryObservation, ParsedRoleClinicalHistory, ParsedPatientVisits, ParsedMedicationHistory, ParsedMedicationOrderDetail, ParsedMedicationOrderObservation, ParsedMedicationEncodingDetail, ParsedMedicationEncodingObservation, ParsedMedicationAdministrationDetail, ParsedMedicationAdministrationObservation, ParsedProblem, ParsedRoleProblem, ParsedRoleObservation, ParsedGoal, ParsedRoleGoal, ParsedGoalObservation, ParsedPathway, ParsedRolePathway, ParsedPathwayObservation } from "./CCR_I16.ts";
/** Structured result of parsing an HL7 CCR^I17 (HL7 v2.8.2) message. */
export type ParsedCCR_I17 = ParsedCCR_I16;

/** Parser for HL7 CCR^I17 (HL7 v2.8.2) messages. */
export class CCR_I17_Parser extends CCR_I16_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "CCR_I17";
}

/** Parses an HL7 CCR^I17 (HL7 v2.8.2) message string into a structured result. */
export function parseCCR_I17(messageString: string): Result<ParsedCCR_I17> {
  return new CCR_I17_Parser().parse(messageString);
}

export type { ProviderContactGroup, ClinicalOrderGroup, ClinicalOrderTimingGroup, ClinicalOrderDetailGroup, ClinicalOrderObservationGroup, PatientGroup, InsuranceGroup, AppointmentHistoryGroup, ResourcesGroup, ResourceDetailGroup, ResourceObservationGroup, ClinicalHistoryGroup, ClinicalHistoryDetailGroup, ClinicalHistoryObservationGroup, RoleClinicalHistoryGroup, PatientVisitsGroup, MedicationHistoryGroup, MedicationOrderDetailGroup, MedicationOrderObservationGroup, MedicationEncodingDetailGroup, MedicationEncodingObservationGroup, MedicationAdministrationDetailGroup, MedicationAdministrationObservationGroup, ProblemGroup, RoleProblemGroup, RoleObservationGroup, GoalGroup, RoleGoalGroup, GoalObservationGroup, PathwayGroup, RolePathwayGroup, PathwayObservationGroup };
/** The optional segments and groups of an CCR^I17 (HL7 v2.8.2) message. */
export type CCR_I17Options = CCR_I16Options;

/** Builder for HL7 CCR^I17 (HL7 v2.8.2) messages. */
export class CCR_I17<TMSH extends MSH = MSH> extends CCR_I16<TMSH> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "CCR_I17";
}

/** Builds an HL7 CCR^I17 (HL7 v2.8.2) message. */
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
