import type { MessageSchema } from "../../../src/types/schema";
import { group, opt, optList, req, wrappers } from "../helpers";

/**
 * The ADT events of HL7 v2.3 chapter 3 whose structure is shorter than A01's: they carry the
 * patient and the visit, without the admit details (NK1, AL1, GT1, INSURANCE, ACC, UB1, UB2).
 * Every structure below was read per event from the hl7.eu chapter 3 tables and checked against
 * Caristix and HAPI v23 (docs/validation/v2.3-message-ledger.md).
 *
 * Sources: https://www.hl7.eu/HL7v2x/v23/std23/ch3.htm (3.2.2–3.2.38),
 * https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/ADT_A02 (and the other events).
 */

const adt = (triggerEvent: string, structure: MessageSchema["structure"]): MessageSchema => ({ messageType: "ADT", triggerEvent, version: "2.3", structure });

/** The transfer-shaped body: MSH EVN PID [PD1] PV1 [PV2] [{DB1}] [{OBX}]. */
const transfer = [req("MSH"), req("EVN"), req("PID"), opt("PD1"), req("PV1"), opt("PV2"), optList("DB1"), optList("OBX")];

/**
 * ADT^A02 - Transfer a Patient: MSH EVN PID [PD1] PV1 [PV2] [{DB1}] [{OBX}]
 * Shared by A21–A23 (leave of absence, return, delete record), A25–A27 (cancel pending events),
 * A29 (delete person), A32 and A33 (cancel tracking events).
 */
export const ADT_A02_SCHEMA = adt("A02", transfer);
/** The events that share the A02 structure. */
export const ADT_A02_EVENTS = ["A21", "A22", "A23", "A25", "A26", "A27", "A29", "A32", "A33"];
/** A02 and the events wrapping it. */
export const ADT_A02_FAMILY: MessageSchema[] = [ADT_A02_SCHEMA, ...wrappers(ADT_A02_SCHEMA, ADT_A02_EVENTS)];

/** ADT^A03 - Discharge/End Visit: MSH EVN PID [PD1] PV1 [PV2] [{DB1}] [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] }] [{OBX}] */
export const ADT_A03_SCHEMA = adt("A03", [
  ...transfer.slice(0, 7),
  optList("DG1"),
  opt("DRG"),
  group("PROCEDURE", "optional", "repeating", [req("PR1"), optList("ROL")]),
  optList("OBX"),
]);

/**
 * ADT^A06 - Change an Outpatient to an Inpatient (and A07, the reverse): the A01 body with [MRG]
 * after PD1. The v2.3 table lists [DRG] twice, once after DB1 and once after DG1 (an erratum
 * 2.3.1 corrects by dropping the first); both are kept here so a v2.3 message with either parses.
 * The first is `preliminaryDiagnosisRelatedGroup`, the second `diagnosisRelatedGroup`.
 */
export const ADT_A06_SCHEMA = adt("A06", [
  req("MSH"), req("EVN"), req("PID"), opt("PD1"), opt("MRG"), optList("NK1"), req("PV1"), opt("PV2"), optList("DB1"),
  opt("DRG", { as: "preliminaryDiagnosisRelatedGroup" }),
  optList("OBX"), optList("AL1"), optList("DG1"), opt("DRG"),
  group("PROCEDURE", "optional", "repeating", [req("PR1"), optList("ROL")]),
  optList("GT1"),
  group("INSURANCE", "optional", "repeating", [req("IN1"), opt("IN2"), opt("IN3")], { as: "insuranceGroups", exportTypeName: "ParsedInsuranceGroup" }),
  opt("ACC"), opt("UB1"), opt("UB2"),
]);
/** A06 and A07. */
export const ADT_A06_FAMILY: MessageSchema[] = [ADT_A06_SCHEMA, ...wrappers(ADT_A06_SCHEMA, ["A07"])];

/**
 * ADT^A09 - Patient Departing, Tracking: MSH EVN PID [PD1] PV1 [PV2] [{DB1}] [{OBX}] [{DG1}]
 * Shared by A10 (arriving), A11 (cancel admit) and A15 (pending transfer).
 */
export const ADT_A09_SCHEMA = adt("A09", [...transfer, optList("DG1")]);
/** A09 and the events wrapping it. */
export const ADT_A09_FAMILY: MessageSchema[] = [ADT_A09_SCHEMA, ...wrappers(ADT_A09_SCHEMA, ["A10", "A11", "A15"])];

/** ADT^A12 - Cancel Transfer: MSH EVN PID [PD1] PV1 [PV2] [{DB1}] [{OBX}] [DG1] (one DG1, as the v2.3 table reads). */
export const ADT_A12_SCHEMA = adt("A12", [...transfer, opt("DG1")]);

/** ADT^A16 - Pending Discharge: MSH EVN PID [PD1] PV1 [PV2] [{DB1}] [{OBX}] [DG1] [DRG] (DG1 repeats from 2.3.1). */
export const ADT_A16_SCHEMA = adt("A16", [...transfer, opt("DG1"), opt("DRG")]);

/** ADT^A38 - Cancel Pre-Admit: MSH EVN PID [PD1] PV1 [PV2] [{DB1}] [{OBX}] [{DG1}] [DRG] */
export const ADT_A38_SCHEMA = adt("A38", [...transfer, optList("DG1"), opt("DRG")]);
