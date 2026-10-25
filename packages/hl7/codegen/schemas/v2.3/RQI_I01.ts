import type { MessageSchema, SegmentGroup, StructureItem } from "../../../src/types/schema";
import { group, opt, optList, req, wrappers } from "../helpers";

/**
 * The patient referral messages of HL7 v2.3 chapter 11: patient information (RQI/RPI, RQI/RPL,
 * RQI/RPR), demographics (RQP/RPI), clinical information (RQC/RCI, RQC/RCL), insurance (PIN),
 * treatment authorization (RQA/RPA) and referrals (REF/RRI). Every message opens with the PROVIDER
 * groups (`providers: [{ provider, contacts }]`). Unchanged through v2.4 except that RQC^I06's
 * GT1 repeats from v2.4; v2.5 adds [{SFT}].
 * Sources: https://www.hl7.eu/HL7v2x/v23/std23/ch11.htm (11.2–11.4), https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/RQI_I01 (and the other events)
 */
export const providers = (): SegmentGroup => group("PROVIDER", "required", "repeating", [req("PRD"), optList("CTD")], { exportTypeName: "ParsedProvider", builderTypeName: "Provider" });
/** [ GUARANTOR_INSURANCE: [{GT1}] { INSURANCE: IN1 [IN2] [IN3] } ], inlined (`guarantors`, `insurances`). */
export const guarantorInsurance = (): SegmentGroup =>
  group("GUARANTOR_INSURANCE", "optional", "single", [optList("GT1"), group("INSURANCE", "required", "repeating", [req("IN1"), opt("IN2"), opt("IN3")], { exportTypeName: "ParsedInsurance" })], { inline: true });
/** [ AUTHORIZATION: AUT [CTD] ], inlined (`authorization`, `authorizationContact`). */
export const authorization = (): SegmentGroup => group("AUTHORIZATION", "optional", "single", [req("AUT"), opt("CTD", { as: "authorizationContact" })], { inline: true });
/** [{ OBSERVATION: OBR [{NTE}] [{ RESULTS: OBX [{NTE}] }] }] */
export const referralObservations = (): SegmentGroup =>
  group("OBSERVATION", "optional", "repeating", [req("OBR"), optList("NTE"), group("RESULTS", "optional", "repeating", [req("OBX"), optList("NTE")], { exportTypeName: "ParsedResult", builderTypeName: "Result" })], { exportTypeName: "ParsedObservation", builderTypeName: "Observation" });
/** [{ PROCEDURE: PR1 [ AUTHORIZATION ] }] */
export const procedures = (usage: "required" | "optional" = "optional"): SegmentGroup => group("PROCEDURE", usage, "repeating", [req("PR1"), authorization()]);
const visit = () => group("PATIENT_VISIT", "optional", "single", [req("PV1"), opt("PV2")], { inline: true });
const insurances = () => group("INSURANCE", "optional", "repeating", [req("IN1"), opt("IN2"), opt("IN3")], { exportTypeName: "ParsedInsurance" });
const schema = (messageType: string, triggerEvent: string, structure: StructureItem[], version = "2.3"): MessageSchema => ({ messageType, triggerEvent, version, structure });

/** RQI^I01 - Request Patient Information: MSH { PROVIDER } PID [{NK1}] [ GUARANTOR_INSURANCE ] [{NTE}]; I02 and I03 wrap it. */
export const RQI_I01_SCHEMA = schema("RQI", "I01", [req("MSH"), providers(), req("PID"), optList("NK1"), guarantorInsurance(), optList("NTE")]);
export const RQI_FAMILY: MessageSchema[] = [RQI_I01_SCHEMA, ...wrappers(RQI_I01_SCHEMA, ["I02", "I03"])];
/** RPI^I01 - Return Patient Information: MSH MSA { PROVIDER } PID [{NK1}] [ GUARANTOR_INSURANCE ] [{NTE}]; I04 wraps it. */
export const RPI_I01_SCHEMA = schema("RPI", "I01", [req("MSH"), req("MSA"), providers(), req("PID"), optList("NK1"), guarantorInsurance(), optList("NTE")]);
export const RPI_FAMILY: MessageSchema[] = [RPI_I01_SCHEMA, ...wrappers(RPI_I01_SCHEMA, ["I04"])];
/** RPL^I02 - Return Patient Display List: MSH MSA { PROVIDER } [{NTE}] [{DSP}] [DSC] */
export const RPL_I02_SCHEMA = schema("RPL", "I02", [req("MSH"), req("MSA"), providers(), optList("NTE"), optList("DSP"), opt("DSC")]);
/** RPR^I03 - Return Patient List: MSH MSA { PROVIDER } [{PID}] [{NTE}] */
export const RPR_I03_SCHEMA = schema("RPR", "I03", [req("MSH"), req("MSA"), providers(), optList("PID"), optList("NTE")]);
/** RQP^I04 - Request Patient Demographics: MSH { PROVIDER } PID [{NK1}] [{GT1}] [{NTE}] */
export const RQP_I04_SCHEMA = schema("RQP", "I04", [req("MSH"), providers(), req("PID"), optList("NK1"), optList("GT1"), optList("NTE")]);
/** RQC^I05 - Request Clinical Information: MSH QRD [QRF] { PROVIDER } PID [{NK1}] [{GT1}] [{NTE}] */
export const RQC_I05_SCHEMA = schema("RQC", "I05", [req("MSH"), req("QRD"), opt("QRF"), providers(), req("PID"), optList("NK1"), optList("GT1"), optList("NTE")]);
/** RQC^I06 - Request Clinical Data Listing: as I05 with a single [GT1] (it repeats from v2.4). */
export const RQC_I06_SCHEMA = schema("RQC", "I06", [req("MSH"), req("QRD"), opt("QRF"), providers(), req("PID"), optList("NK1"), opt("GT1"), optList("NTE")]);
/** RCI^I05 - Return Clinical Information: MSH MSA QRD [QRF] { PROVIDER } PID [{DG1}] [{DRG}] [{AL1}] [{ OBSERVATION }] [{NTE}] */
export const RCI_I05_SCHEMA = schema("RCI", "I05", [req("MSH"), req("MSA"), req("QRD"), opt("QRF"), providers(), req("PID"), optList("DG1"), optList("DRG"), optList("AL1"), referralObservations(), optList("NTE")]);
/** RCL^I06 - Return Clinical List: MSH MSA QRD [QRF] { PROVIDER } PID [{DG1}] [{DRG}] [{AL1}] [{NTE}] [{DSP}] [DSC] */
export const RCL_I06_SCHEMA = schema("RCL", "I06", [req("MSH"), req("MSA"), req("QRD"), opt("QRF"), providers(), req("PID"), optList("DG1"), optList("DRG"), optList("AL1"), optList("NTE"), optList("DSP"), opt("DSC")]);
/** PIN^I07 - Unsolicited Insurance Information: MSH { PROVIDER } PID [{NK1}] [ GUARANTOR_INSURANCE ] [{NTE}] */
export const PIN_I07_SCHEMA = schema("PIN", "I07", [req("MSH"), providers(), req("PID"), optList("NK1"), guarantorInsurance(), optList("NTE")]);
/** RQA^I08 - Request Patient Authorization: MSH [RF1] [ AUTHORIZATION ] { PROVIDER } PID [{NK1}] [ GUARANTOR_INSURANCE ] [ACC] [{DG1}] [{DRG}] [{AL1}] [{ PROCEDURE }] [{ OBSERVATION }] [ PV1 [PV2] ] [{NTE}]; I09–I11 wrap it. */
export const RQA_I08_SCHEMA = schema("RQA", "I08", [req("MSH"), opt("RF1"), authorization(), providers(), req("PID"), optList("NK1"), guarantorInsurance(), opt("ACC"), optList("DG1"), optList("DRG"), optList("AL1"), procedures(), referralObservations(), visit(), optList("NTE")]);
export const RQA_FAMILY: MessageSchema[] = [RQA_I08_SCHEMA, ...wrappers(RQA_I08_SCHEMA, ["I09", "I10", "I11"])];
/** RPA^I08 - Return Patient Authorization: MSH MSA [RF1] [ AUTHORIZATION ] { PROVIDER } PID [{NK1}] [{GT1}] [{ INSURANCE }] [ACC] [{DG1}] [{DRG}] [{AL1}] { PROCEDURE } [{ OBSERVATION }] [ PV1 [PV2] ] [{NTE}]; I09–I11 wrap it. */
export const RPA_I08_SCHEMA = schema("RPA", "I08", [req("MSH"), req("MSA"), opt("RF1"), authorization(), providers(), req("PID"), optList("NK1"), optList("GT1"), insurances(), opt("ACC"), optList("DG1"), optList("DRG"), optList("AL1"), procedures("required"), referralObservations(), visit(), optList("NTE")]);
export const RPA_FAMILY: MessageSchema[] = [RPA_I08_SCHEMA, ...wrappers(RPA_I08_SCHEMA, ["I09", "I10", "I11"])];
/** REF^I12 - Patient Referral: MSH [RF1] [ AUTHORIZATION ] { PROVIDER } PID [{NK1}] [{GT1}] [{ INSURANCE }] [ACC] [{DG1}] [{DRG}] [{AL1}] [{ PROCEDURE }] [{ OBSERVATION }] [ PV1 [PV2] ] [{NTE}]; I13–I15 wrap it. */
export const REF_I12_SCHEMA = schema("REF", "I12", [req("MSH"), opt("RF1"), authorization(), providers(), req("PID"), optList("NK1"), optList("GT1"), insurances(), opt("ACC"), optList("DG1"), optList("DRG"), optList("AL1"), procedures(), referralObservations(), visit(), optList("NTE")]);
export const REF_FAMILY: MessageSchema[] = [REF_I12_SCHEMA, ...wrappers(REF_I12_SCHEMA, ["I13", "I14", "I15"])];
/** RRI^I12 - Return Referral Information: MSH [MSA] [RF1] [ AUTHORIZATION ] { PROVIDER } PID [ACC] [{DG1}] [{DRG}] [{AL1}] [{ PROCEDURE }] [{ OBSERVATION }] [ PV1 [PV2] ] [{NTE}]; I13–I15 wrap it. */
export const RRI_I12_SCHEMA = schema("RRI", "I12", [req("MSH"), opt("MSA"), opt("RF1"), authorization(), providers(), req("PID"), opt("ACC"), optList("DG1"), optList("DRG"), optList("AL1"), procedures(), referralObservations(), visit(), optList("NTE")]);
export const RRI_FAMILY: MessageSchema[] = [RRI_I12_SCHEMA, ...wrappers(RRI_I12_SCHEMA, ["I13", "I14", "I15"])];

/** Every v2.3 referral message. */
export const REFERRAL_MESSAGES: MessageSchema[] = [
  ...RQI_FAMILY, ...RPI_FAMILY, RPL_I02_SCHEMA, RPR_I03_SCHEMA, RQP_I04_SCHEMA, RQC_I05_SCHEMA, RQC_I06_SCHEMA, RCI_I05_SCHEMA, RCL_I06_SCHEMA, PIN_I07_SCHEMA,
  ...RQA_FAMILY, ...RPA_FAMILY, ...REF_FAMILY, ...RRI_FAMILY,
];
