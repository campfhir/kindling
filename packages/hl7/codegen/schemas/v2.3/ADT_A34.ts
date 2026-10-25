import type { MessageSchema } from "../../../src/types/schema";
import { group, opt, optList, req, wrappers } from "../helpers";

/**
 * The merge, link and move events of HL7 v2.3 chapter 3 (section 3.2.18 and 3.2.30–3.2.51), which
 * carry an MRG segment. Each structure was read from the hl7.eu chapter 3 table of its event and
 * checked against Caristix and HAPI v23 (docs/validation/v2.3-message-ledger.md); v2.5 adds [{SFT}]
 * after MSH (see the v2.5 schemas).
 *
 * Sources: https://www.hl7.eu/HL7v2x/v23/std23/ch3.htm,
 * https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/ADT_A34 (and the other events).
 */

const adt = (triggerEvent: string, structure: MessageSchema["structure"]): MessageSchema => ({ messageType: "ADT", triggerEvent, version: "2.3", structure });

/**
 * ADT^A34 - Merge Patient Information, Patient ID Only: MSH EVN PID [PD1] MRG
 * Shared by A30 (merge person), A35 (account number only), A36 (patient ID and account number)
 * and A46–A49 (change external ID, internal ID, alternate patient ID, account number).
 */
export const ADT_A34_SCHEMA = adt("A34", [req("MSH"), req("EVN"), req("PID"), opt("PD1"), req("MRG")]);
/** The trigger events that share the A34 structure. */
export const ADT_A34_EVENTS = ["A30", "A35", "A36", "A46", "A47", "A48", "A49"];
/** A34 and the events wrapping it. */
export const ADT_A34_FAMILY: MessageSchema[] = [ADT_A34_SCHEMA, ...wrappers(ADT_A34_SCHEMA, ADT_A34_EVENTS)];

/** ADT^A18 - Merge Patient Information (retained for backward compatibility): MSH EVN PID [PD1] [MRG] PV1 */
export const ADT_A18_SCHEMA = adt("A18", [req("MSH"), req("EVN"), req("PID"), opt("PD1"), opt("MRG"), req("PV1")]);

/**
 * ADT^A37 - Unlink Patient Information: MSH EVN PID [PD1] [PV1] [{DB1}] PID [PV1] [{DB1}]
 *
 * The two patients are listed flat and are not symmetrical in v2.3 (the second has no PD1; 2.3.1
 * adds it), so unlike A17 and A24 they are not modelled as a repeating group: the second patient
 * is `otherPatient`, `otherVisit` and `otherDisabilities`.
 */
export const ADT_A37_SCHEMA = adt("A37", [
  req("MSH"), req("EVN"), req("PID"), opt("PD1"), opt("PV1"), optList("DB1"),
  req("PID", { as: "otherPatient" }), opt("PV1", { as: "otherVisit" }), optList("DB1", { as: "otherDisabilities" }),
]);

/**
 * ADT^A39 - Merge Person, External ID: MSH EVN { PATIENT: PID [PD1] MRG [PV1] }
 * Shared by A40 (internal ID), A41 (account number) and A42 (visit number). Each repetition of
 * `patients` is one merge: the surviving PID and the MRG that names the prior identifiers.
 */
export const ADT_A39_SCHEMA = adt("A39", [
  req("MSH"), req("EVN"),
  group("PATIENT", "required", "repeating", [req("PID"), opt("PD1"), req("MRG"), opt("PV1")], { exportTypeName: "ParsedMergePatient", builderTypeName: "MergePatient" }),
]);
/** A39 and the events wrapping it. */
export const ADT_A39_FAMILY: MessageSchema[] = [ADT_A39_SCHEMA, ...wrappers(ADT_A39_SCHEMA, ["A40", "A41", "A42"])];

/**
 * ADT^A43 - Move Patient Information, Internal ID: MSH EVN { PATIENT: PID [PD1] MRG }
 * Shared by A44 (account number).
 */
export const ADT_A43_SCHEMA = adt("A43", [
  req("MSH"), req("EVN"),
  group("PATIENT", "required", "repeating", [req("PID"), opt("PD1"), req("MRG")], { exportTypeName: "ParsedMovePatient", builderTypeName: "MovePatient" }),
]);
/** A43 and A44. */
export const ADT_A43_FAMILY: MessageSchema[] = [ADT_A43_SCHEMA, ...wrappers(ADT_A43_SCHEMA, ["A44"])];

/**
 * ADT^A45 - Move Visit Information, Visit Number: MSH EVN PID [PD1] { MERGE_INFO: MRG PV1 }
 * Each repetition of `moves` names the prior visit (MRG) and the visit it moves to (PV1).
 */
export const ADT_A45_SCHEMA = adt("A45", [
  req("MSH"), req("EVN"), req("PID"), opt("PD1"),
  group("MERGE_INFO", "required", "repeating", [req("MRG"), req("PV1")], { as: "moves", exportTypeName: "ParsedVisitMove", builderTypeName: "VisitMove" }),
]);

/** ADT^A50 - Change Visit Number: MSH EVN PID [PD1] MRG PV1. Shared by A51 (change alternate visit ID). */
export const ADT_A50_SCHEMA = adt("A50", [req("MSH"), req("EVN"), req("PID"), opt("PD1"), req("MRG"), req("PV1")]);
/** A50 and A51. */
export const ADT_A50_FAMILY: MessageSchema[] = [ADT_A50_SCHEMA, ...wrappers(ADT_A50_SCHEMA, ["A51"])];
