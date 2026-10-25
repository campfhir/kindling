import type { MessageSchema, StructureItem } from "../../../src/types/schema";
import { group, opt, optList, req, reqList, wrappers } from "../helpers";
import { encoding } from "./orders";

/**
 * The pharmacy/treatment queries of HL7 v2.3 chapter 4 section 4.8.15: QRY^Q26–Q30 ask for order
 * (Q26), administration (Q27), dispense (Q28), encoded order (Q29) and dose (Q30) information,
 * answered by ROR, RAR, RDR, RER and RGR. The responses carry one DEFINITION group per query
 * (`definitions`): QRD [QRF] [ PATIENT: PID [{NTE}] ] { ORDER: ORC <record> }. Unchanged through
 * v2.4; v2.5 adds [{SFT}] (after a repeating ERR in the responses).
 * Sources: https://www.hl7.eu/HL7v2x/v23/std23/ch4.htm (4.8.17–4.8.21), https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/QRY_Q26 (and ROR_ROR, RAR_RAR, RDR_RDR, RER_RER, RGR_RGR)
 */
export const QRY_Q26_SCHEMA: MessageSchema = {
  messageType: "QRY",
  triggerEvent: "Q26",
  version: "2.3",
  structure: [req("MSH"), req("QRD"), opt("QRF"), opt("DSC")],
};

/** The pharmacy query events that share the Q26 structure. */
export const QRY_Q26_EVENTS = ["Q27", "Q28", "Q29", "Q30"];

/** Q26 and the events wrapping it. */
export const QRY_Q26_FAMILY: MessageSchema[] = [QRY_Q26_SCHEMA, ...wrappers(QRY_Q26_SCHEMA, QRY_Q26_EVENTS)];

/** A pharmacy query response: MSH MSA [ERR] { DEFINITION: QRD [QRF] [ PID [{NTE}] ] { ORDER: ORC <order> } } [DSC]. */
export const pharmacyQueryResponse = (messageType: string, order: StructureItem[], version = "2.3", head: StructureItem[] = [req("MSH"), req("MSA"), opt("ERR")]): MessageSchema => ({
  messageType,
  triggerEvent: messageType,
  version,
  structure: [
    ...head,
    group("DEFINITION", "required", "repeating", [
      req("QRD"),
      opt("QRF"),
      group("PATIENT", "optional", "single", [req("PID"), optList("NTE", { as: "patientNotes" })], { inline: true }),
      group("ORDER", "required", "repeating", order),
    ]),
    opt("DSC"),
  ],
});

/** ROR^ROR - Pharmacy/Treatment Order Response: the order is ORC RXO {RXR} [{RXC}]. */
export const ROR_ROR_SCHEMA = pharmacyQueryResponse("ROR", [req("ORC"), req("RXO"), reqList("RXR"), optList("RXC")]);
/** RAR^RAR - Pharmacy/Treatment Administration Information: the order is ORC [ ENCODING ] {RXA} RXR. */
export const RAR_RAR_SCHEMA = pharmacyQueryResponse("RAR", [req("ORC"), encoding(), reqList("RXA"), req("RXR")]);
/** RDR^RDR - Pharmacy/Treatment Dispense Information: the order is ORC [ ENCODING ] { DISPENSE: RXD {RXR} [{RXC}] }. */
export const RDR_RDR_SCHEMA = pharmacyQueryResponse("RDR", [req("ORC"), encoding(), group("DISPENSE", "required", "repeating", [req("RXD"), reqList("RXR"), optList("RXC")], { exportTypeName: "ParsedDispense", builderTypeName: "Dispense" })]);
/** RER^RER - Pharmacy/Treatment Encoded Order Information: the order is ORC RXE {RXR} [{RXC}]. */
export const RER_RER_SCHEMA = pharmacyQueryResponse("RER", [req("ORC"), req("RXE"), reqList("RXR"), optList("RXC")]);
/** RGR^RGR - Pharmacy/Treatment Dose Information: the order is ORC [ ENCODING ] {RXG} {RXR} [{RXC}]. */
export const RGR_RGR_SCHEMA = pharmacyQueryResponse("RGR", [req("ORC"), encoding(), reqList("RXG"), reqList("RXR"), optList("RXC")]);

/** The pharmacy query responses. */
export const PHARMACY_QUERY_RESPONSES: MessageSchema[] = [ROR_ROR_SCHEMA, RAR_RAR_SCHEMA, RDR_RDR_SCHEMA, RER_RER_SCHEMA, RGR_RGR_SCHEMA];
