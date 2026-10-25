import type { MessageSchema, SegmentGroup, StructureItem } from "../../../src/types/schema";
import { SFT, group, opt, optList, req, reqList, reversion, withSft, wrappers } from "../helpers";
import { generalOrderPatient, observations, pharmacyPatient, response } from "../v2.3/orders";
import { PHARMACY_QUERY_RESPONSES, QRY_Q26_EVENTS, QRY_Q26_SCHEMA as QRY_Q26_V23, pharmacyQueryResponse } from "../v2.3/QRY_Q26";
import { oruW01 } from "../v2.4/orders";

/**
 * The order and pharmacy messages of HL7 v2.5 (identical in v2.5.1; chapter 4). Compared with v2.4
 * every message gains [{SFT}] (after a repeating ERR in the acknowledgments and query responses),
 * every ORC is followed by [{ TIMING: TQ1 [{TQ2}] }], every RXE by { TIMING_ENCODED: TQ1 [{TQ2}] }
 * and every RXG by { TIMING_GIVE: TQ1 [{TQ2}] }; RXE and RXD gain [{NTE}]; the RXO components
 * become repeating COMPONENT groups (RXC [{NTE}]); RDE^O11 gains [{FT1}] [BLG]; RAS^O17 groups
 * its administrations ({ {RXA} RXR [{OBX [{NTE}]}] }); ORU^W01 gains SFT and SPECIMEN groups.
 * Sources: https://www.hl7.eu/HL7v2x/v25/std25/ch04.html, https://www.hl7.eu/HL7v2x/v251/std251/ch04.html
 * (4.7, 4.10, 4.13), https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/<MESSAGE>
 */
const timing = (name: string, as: string, usage: "required" | "optional" = "optional"): SegmentGroup =>
  group(name, usage, "repeating", [req("TQ1"), optList("TQ2")], { as, exportTypeName: `Parsed${name.split("_").map((w) => w[0] + w.slice(1).toLowerCase()).join("")}` });
const orderTiming = () => timing("TIMING", "timings");
const encodedTiming = () => timing("TIMING_ENCODED", "encodedTimings", "required");
const giveTiming = () => timing("TIMING_GIVE", "giveTimings", "required");
/** The v2.5 components: [{ COMPONENT: RXC [{NTE}] }], as `components`. */
const components = () => group("COMPONENT", "optional", "repeating", [req("RXC"), optList("NTE")], { as: "components", exportTypeName: "ParsedComponent", builderTypeName: "Component" });
/** [ ORDER_DETAIL: RXO [{NTE}] {RXR} [{ COMPONENT }] ] */
const orderDetail = () => group("ORDER_DETAIL", "optional", "single", [req("RXO"), optList("NTE"), reqList("RXR"), components()], { as: "detail", exportTypeName: "ParsedOrderDetail", builderTypeName: "OrderDetail" });
/** [ ORDER_DETAIL: RXO [ ORDER_DETAIL_SUPPLEMENT: {NTE} {RXR} [{ COMPONENT }] ] ] */
const orderDetailWithSupplement = () => group("ORDER_DETAIL", "optional", "single", [
  req("RXO"),
  group("ORDER_DETAIL_SUPPLEMENT", "optional", "single", [reqList("NTE"), reqList("RXR"), components()], { inline: true }),
], { as: "detail", exportTypeName: "ParsedOrderDetail", builderTypeName: "OrderDetail" });
/** [ ENCODING: RXE [{NTE}]? { TIMING_ENCODED } {RXR} [{RXC}] ] */
const encoding = (withNotes: boolean) => group("ENCODING", "optional", "single", [req("RXE"), ...(withNotes ? [optList("NTE")] : []), encodedTiming(), reqList("RXR"), optList("RXC")], { exportTypeName: "ParsedEncoding", builderTypeName: "Encoding" });
const orderHead = (): StructureItem[] => [req("MSH"), SFT, optList("NTE")];
const ackHead = (): StructureItem[] => [req("MSH"), req("MSA"), optList("ERR"), SFT, optList("NTE")];
const order = (messageType: string, triggerEvent: string, patient: SegmentGroup, orderItems: StructureItem[]): MessageSchema => ({
  messageType, triggerEvent, version: "2.5",
  structure: [...orderHead(), patient, group("ORDER", "required", "repeating", orderItems)],
});
const ack = (messageType: string, triggerEvent: string, orderItems: StructureItem[]): MessageSchema => ({
  messageType, triggerEvent, version: "2.5",
  structure: [...ackHead(), response(orderItems)],
});

/** OMD^O03: { ORDER_DIET: ORC [{ TIMING_DIET }] [ DIET: {ODS} [{NTE}] [{ OBX [{NTE}] }] ] } [{ ORDER_TRAY: ORC [{ TIMING_TRAY }] {ODT} [{NTE}] }] */
export const OMD_O03_SCHEMA: MessageSchema = {
  messageType: "OMD", triggerEvent: "O03", version: "2.5",
  structure: [
    ...orderHead(),
    generalOrderPatient(),
    group("ORDER_DIET", "required", "repeating", [
      req("ORC"), timing("TIMING_DIET", "timings"),
      group("DIET", "optional", "single", [reqList("ODS"), optList("NTE"), observations("optional")], { inline: true }),
    ], { as: "dietOrders", exportTypeName: "ParsedDietOrder", builderTypeName: "DietOrder" }),
    group("ORDER_TRAY", "optional", "repeating", [req("ORC"), timing("TIMING_TRAY", "timings"), reqList("ODT"), optList("NTE")], { as: "trayOrders", exportTypeName: "ParsedTrayOrder", builderTypeName: "TrayOrder" }),
  ],
};
/** ORD^O04: MSH MSA [{ERR}] [{SFT}] [{NTE}] [ [ PID [{NTE}] ] { ORC [{ TIMING_DIET }] [{ODS}] [{NTE}] } [{ ORC [{ TIMING_TRAY }] [{ODT}] [{NTE}] }] ] */
export const ORD_O04_SCHEMA: MessageSchema = {
  messageType: "ORD", triggerEvent: "O04", version: "2.5",
  structure: [
    ...ackHead(),
    group("RESPONSE", "optional", "single", [
      group("PATIENT", "optional", "single", [req("PID"), optList("NTE", { as: "patientNotes" })], { inline: true }),
      group("ORDER_DIET", "required", "repeating", [req("ORC"), timing("TIMING_DIET", "timings"), optList("ODS"), optList("NTE")], { as: "dietOrders", exportTypeName: "ParsedDietOrder", builderTypeName: "DietOrder" }),
      group("ORDER_TRAY", "optional", "repeating", [req("ORC"), timing("TIMING_TRAY", "timings"), optList("ODT"), optList("NTE")], { as: "trayOrders", exportTypeName: "ParsedTrayOrder", builderTypeName: "TrayOrder" }),
    ], { inline: true }),
  ],
};
/** OMS^O05 / OMN^O07: { ORC [{ TIMING }] RQD [RQ1] [{NTE}] [{ OBX [{NTE}] }] [BLG] } */
export const OMS_O05_SCHEMA = order("OMS", "O05", generalOrderPatient(), [req("ORC"), orderTiming(), req("RQD"), opt("RQ1"), optList("NTE"), observations("optional"), opt("BLG")]);
export const OMN_O07_SCHEMA = order("OMN", "O07", generalOrderPatient(), [req("ORC"), orderTiming(), req("RQD"), opt("RQ1"), optList("NTE"), observations("optional"), opt("BLG")]);
/** ORS^O06 / ORN^O08: { ORC [{ TIMING }] RQD [RQ1] [{NTE}] } */
export const ORS_O06_SCHEMA = ack("ORS", "O06", [req("ORC"), orderTiming(), req("RQD"), opt("RQ1"), optList("NTE")]);
export const ORN_O08_SCHEMA = ack("ORN", "O08", [req("ORC"), orderTiming(), req("RQD"), opt("RQ1"), optList("NTE")]);
/** RDE^O11: { ORC [{ TIMING }] [ ORDER_DETAIL ] RXE [{NTE}] { TIMING_ENCODED } {RXR} [{RXC}] [{ OBX [{NTE}] }] [{FT1}] [BLG] [{CTI}] } */
export const RDE_O11_SCHEMA = order("RDE", "O11", generalOrderPatient(), [
  req("ORC"), orderTiming(), orderDetail(), req("RXE"), optList("NTE"), encodedTiming(), reqList("RXR"), optList("RXC"), observations("optional"), optList("FT1"), opt("BLG"), optList("CTI"),
]);
/** RRE^O12: { ORC [{ TIMING }] [ ENCODING: RXE [{NTE}] { TIMING_ENCODED } {RXR} [{RXC}] ] } */
export const RRE_O12_SCHEMA = ack("RRE", "O12", [req("ORC"), orderTiming(), { ...encoding(true), inline: true }]);
/** RDS^O13: { ORC [{ TIMING }] [ ORDER_DETAIL w/ supplement ] [ ENCODING w/ notes ] RXD [{NTE}] {RXR} [{RXC}] [{ OBX [{NTE}] }] [{FT1}] } */
export const RDS_O13_SCHEMA = order("RDS", "O13", pharmacyPatient(), [
  req("ORC"), orderTiming(), orderDetailWithSupplement(), encoding(true), req("RXD"), optList("NTE"), reqList("RXR"), optList("RXC"), observations("optional"), optList("FT1"),
]);
/** RRD^O14: { ORC [{ TIMING }] [ DISPENSE: RXD [{NTE}] {RXR} [{RXC}] ] } */
export const RRD_O14_SCHEMA = ack("RRD", "O14", [req("ORC"), orderTiming(), group("DISPENSE", "optional", "single", [req("RXD"), optList("NTE"), reqList("RXR"), optList("RXC")], { inline: true })]);
/** RGV^O15: { ORC [{ TIMING }] [ ORDER_DETAIL w/ supplement ] [ ENCODING ] { GIVE: RXG { TIMING_GIVE } {RXR} [{RXC}] { [OBX] [{NTE}] } } } */
export const RGV_O15_SCHEMA = order("RGV", "O15", pharmacyPatient(false), [
  req("ORC"), orderTiming(), orderDetailWithSupplement(), encoding(false),
  group("GIVE", "required", "repeating", [req("RXG"), giveTiming(), reqList("RXR"), optList("RXC"), observations("required", "optional")], { exportTypeName: "ParsedGive", builderTypeName: "Give" }),
]);
/** RRG^O16: { ORC [{ TIMING }] [ GIVE: RXG { TIMING_GIVE } {RXR} [{RXC}] ] } */
export const RRG_O16_SCHEMA = ack("RRG", "O16", [req("ORC"), orderTiming(), group("GIVE", "optional", "single", [req("RXG"), giveTiming(), reqList("RXR"), optList("RXC")], { inline: true })]);
/** RAS^O17: { ORC [{ TIMING }] [ ORDER_DETAIL w/ supplement ] [ ENCODING ] { ADMINISTRATION: {RXA} RXR [{ OBX [{NTE}] }] } [{CTI}] } */
export const RAS_O17_SCHEMA = order("RAS", "O17", pharmacyPatient(), [
  req("ORC"), orderTiming(), orderDetailWithSupplement(), encoding(false),
  group("ADMINISTRATION", "required", "repeating", [reqList("RXA"), req("RXR"), observations("optional")], { exportTypeName: "ParsedAdministration", builderTypeName: "Administration" }),
  optList("CTI"),
]);
/** RRA^O18: { ORC [{ TIMING }] [ ADMINISTRATION: {RXA} RXR ] } */
export const RRA_O18_SCHEMA = ack("RRA", "O18", [req("ORC"), orderTiming(), group("ADMINISTRATION", "optional", "single", [reqList("RXA"), req("RXR")], { inline: true })]);

/** QRY^Q26–Q30 with [{SFT}]. */
export const QRY_Q26_SCHEMA: MessageSchema = withSft(reversion(QRY_Q26_V23, "2.5"));
export const QRY_Q26_FAMILY: MessageSchema[] = [QRY_Q26_SCHEMA, ...wrappers(QRY_Q26_SCHEMA, QRY_Q26_EVENTS)];
/** The pharmacy query responses: MSH MSA [{ERR}] [{SFT}] { DEFINITION } [DSC], with the v2.3 orders. */
const responseHead = [req("MSH"), req("MSA"), optList("ERR"), SFT];
export const PHARMACY_QUERY_RESPONSES_V25: MessageSchema[] = PHARMACY_QUERY_RESPONSES.map((r) => {
  const definition = r.structure.find((item) => "name" in item && item.name === "DEFINITION") as SegmentGroup;
  const orderGroup = definition.segments.find((item) => "name" in item && item.name === "ORDER") as SegmentGroup;
  return pharmacyQueryResponse(r.messageType, orderGroup.segments, "2.5", responseHead);
});

/** ORU^W01: the v2.4 structure with [{SFT}] and the SPECIMEN groups. */
export const ORU_W01_SCHEMA: MessageSchema = oruW01("2.5", [req("MSH"), SFT], [group("SPECIMEN", "optional", "repeating", [req("SPM"), optList("OBX")], { exportTypeName: "ParsedSpecimen", builderTypeName: "Specimen" })]);

/** Every v2.5 order and pharmacy message. */
export const ORDER_MESSAGES: MessageSchema[] = [
  OMD_O03_SCHEMA, ORD_O04_SCHEMA, OMS_O05_SCHEMA, ORS_O06_SCHEMA, OMN_O07_SCHEMA, ORN_O08_SCHEMA,
  RDE_O11_SCHEMA, RRE_O12_SCHEMA, RDS_O13_SCHEMA, RRD_O14_SCHEMA, RGV_O15_SCHEMA, RRG_O16_SCHEMA, RAS_O17_SCHEMA, RRA_O18_SCHEMA,
  ...QRY_Q26_FAMILY, ...PHARMACY_QUERY_RESPONSES_V25, ORU_W01_SCHEMA,
];
