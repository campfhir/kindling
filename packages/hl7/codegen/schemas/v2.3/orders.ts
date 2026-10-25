import type { SegmentGroup, StructureItem } from "../../../src/types/schema";
import { group, opt, optList, req, reqList } from "../helpers";

/**
 * Building blocks shared by the order and pharmacy messages of HL7 v2.3 chapter 4 (and reused
 * by the later versions where the shapes carry over).
 */

/** The inlined PATIENT group of an order: PID [PD1] [{NTE}] [ PATIENT_VISIT: PV1 [PV2] ] followed by `tail`. */
export const orderPatient = (tail: StructureItem[], withPd1 = true): SegmentGroup =>
  group("PATIENT", "optional", "single", [
    req("PID"),
    ...(withPd1 ? [opt("PD1")] : []),
    optList("NTE", { as: "patientNotes" }),
    ...tail,
  ], { inline: true });

/** The ORM-style patient: PID [PD1] [{NTE}] [ PV1 [PV2] ] [{ INSURANCE: IN1 [IN2] [IN3] }] [GT1] [{AL1}]. */
export const generalOrderPatient = (): SegmentGroup => orderPatient([
  group("PATIENT_VISIT", "optional", "single", [req("PV1"), opt("PV2")], { inline: true }),
  group("INSURANCE", "optional", "repeating", [req("IN1"), opt("IN2"), opt("IN3")], { exportTypeName: "ParsedInsurance" }),
  opt("GT1"),
  optList("AL1"),
]);

/** The pharmacy dispense/give/administration patient: PID [PD1] [{NTE}] [{AL1}] [ PV1 [PV2] ]. */
export const pharmacyPatient = (withPd1 = true): SegmentGroup => orderPatient([
  optList("AL1"),
  group("PATIENT_VISIT", "optional", "single", [req("PV1"), opt("PV2")], { inline: true }),
], withPd1);

/** The inlined RESPONSE group of an acknowledgment: [ PATIENT: PID [{NTE}] ] { ORDER: <order> }. */
export const response = (order: StructureItem[], orderExtras: Parameters<typeof group>[4] = {}): SegmentGroup =>
  group("RESPONSE", "optional", "single", [
    group("PATIENT", "optional", "single", [req("PID"), optList("NTE", { as: "patientNotes" })], { inline: true }),
    group("ORDER", "required", "repeating", order, orderExtras),
  ], { inline: true });

/** The head of every order acknowledgment: MSH MSA [ERR] [{NTE}]. */
export const ackHead = (): StructureItem[] => [req("MSH"), req("MSA"), opt("ERR"), optList("NTE")];

/** An OBSERVATION group OBX [{NTE}], as `observations`. */
export const observations = (usage: "required" | "optional", obxUsage: "required" | "optional" = "required"): SegmentGroup =>
  group("OBSERVATION", usage, "repeating", [obxUsage === "required" ? req("OBX") : opt("OBX"), optList("NTE")], { as: "observations", exportTypeName: "ParsedObservation", builderTypeName: "ObservationGroup" });

/** The RXO order detail of RDE/RDO: [ ORDER_DETAIL: RXO [{NTE}] {RXR} [ COMPONENT: {RXC} [{NTE}] ] <tail> ], as `detail`. */
export const pharmacyOrderDetail = (tail: StructureItem[] = []): SegmentGroup =>
  group("ORDER_DETAIL", "optional", "single", [
    req("RXO"),
    optList("NTE"),
    reqList("RXR"),
    group("COMPONENT", "optional", "single", [reqList("RXC"), optList("NTE", { as: "componentNotes" })], { inline: true }),
    ...tail,
  ], { as: "detail", exportTypeName: "ParsedOrderDetail", builderTypeName: "OrderDetail" });

/** The RXO order detail of RDS/RGV/RAS: [ ORDER_DETAIL: RXO [ ORDER_DETAIL_SUPPLEMENT: {NTE} {RXR} [ COMPONENT: {RXC} [{NTE}] ] ] ], as `detail`. */
export const pharmacyOrderDetailWithSupplement = (): SegmentGroup =>
  group("ORDER_DETAIL", "optional", "single", [
    req("RXO"),
    group("ORDER_DETAIL_SUPPLEMENT", "optional", "single", [
      reqList("NTE"),
      reqList("RXR"),
      group("COMPONENT", "optional", "single", [reqList("RXC"), optList("NTE", { as: "componentNotes" })], { inline: true }),
    ], { inline: true }),
  ], { as: "detail", exportTypeName: "ParsedOrderDetail", builderTypeName: "OrderDetail" });

/** The ENCODING group [ RXE {RXR} {[RXC]} ], as `encoding`. */
export const encoding = (): SegmentGroup =>
  group("ENCODING", "optional", "single", [req("RXE"), reqList("RXR"), optList("RXC")], { exportTypeName: "ParsedEncoding", builderTypeName: "Encoding" });
