import type { MessageSchema, SegmentGroup } from "../../../src/types/schema";
import { SFT, group, opt, optList, req, reversion, withSft, wrappers } from "../helpers";
import { DSR_Q01_SCHEMA as DSR_Q01_V23, DSR_Q03_SCHEMA as DSR_Q03_V23 } from "../v2.3/DSR_Q01";
import { EDR_R07_SCHEMA as EDR_R07_V23, ERP_R09_SCHEMA as ERP_R09_V23 } from "../v2.3/EQQ_Q01";
import { OSQ_Q06_SCHEMA as OSQ_Q06_V23, OSR_ORDER_DETAIL, osrResponse } from "../v2.3/OSQ_Q06";
import { ORF_OBSERVATION, orfQueryResponse } from "../v2.3/ORF_R04";
import { QRY_A19_SCHEMA as QRY_A19_V23 } from "../v2.3/QRY_A19";
import { QCK_Q02_SCHEMA as QCK_Q02_V23, QRY_Q01_SCHEMA as QRY_Q01_V23, QRY_R02_SCHEMA as QRY_R02_V23 } from "../v2.3/QRY_Q01";
import { SQR_S25_SCHEMA as SQR_S25_V23 } from "../v2.3/SQM_S25";
import { UDM_Q05_SCHEMA as UDM_Q05_V23 } from "../v2.3/UDM_Q05";
import { VXQ_V01_SCHEMA as VXQ_V01_V23, VXR_V03_SCHEMA as VXR_V03_V23, VXX_V02_SCHEMA as VXX_V02_V23 } from "../v2.3/VXQ_V01";
import { EQQ_Q04_SCHEMA as EQQ_Q04_V231, RQQ_Q09_SCHEMA as RQQ_Q09_V231, SPQ_Q08_SCHEMA as SPQ_Q08_V231, TBR_R08_SCHEMA as TBR_R08_V231, VQQ_Q07_SCHEMA as VQQ_Q07_V231 } from "../v2.3.1/EQQ_Q04";
import { ADR_A19_SCHEMA as ADR_A19_V24 } from "../v2.4/ADR_A19";

/**
 * The query messages of HL7 v2.5 (identical in v2.5.1). Every one of them gains [{SFT}]; the
 * responses whose ERR repeats and the orders that gain the TQ1/TQ2 timing groups are spelled out
 * below. v2.5 no longer lists QRY^P04, DSR^P04 (withdrawn here) or UDM^R06 (withdrawn in v2.4).
 * Sources: https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/<MESSAGE> for each
 * message, cross-checked against the v2.5.1 pages.
 */
const sft = (schema: MessageSchema) => withSft(reversion(schema, "2.5"));

/** QRY^A19: MSH [{SFT}] QRD [QRF] */
export const QRY_A19_SCHEMA: MessageSchema = sft(QRY_A19_V23);
/** QRY^Q01: MSH [{SFT}] QRD [QRF] [DSC]; Q02 shares it (P04 is withdrawn). */
export const QRY_Q01_SCHEMA: MessageSchema = sft(QRY_Q01_V23);
/** Q01 and Q02. */
export const QRY_Q01_FAMILY: MessageSchema[] = [QRY_Q01_SCHEMA, ...wrappers(QRY_Q01_SCHEMA, ["Q02"])];
/** QRY^R02: MSH [{SFT}] QRD QRF */
export const QRY_R02_SCHEMA: MessageSchema = sft(QRY_R02_V23);
/** QCK^Q02: MSH [{SFT}] MSA [ERR] [QAK] */
export const QCK_Q02_SCHEMA: MessageSchema = sft(QCK_Q02_V23);
/** DSR^Q01: MSH [{SFT}] MSA [ERR] [QAK] QRD [QRF] {DSP} [DSC] (P04 is withdrawn). */
export const DSR_Q01_SCHEMA: MessageSchema = sft(DSR_Q01_V23);
/** DSR^Q03: MSH [{SFT}] [MSA] [ERR] [QAK] QRD [QRF] {DSP} [DSC] */
export const DSR_Q03_SCHEMA: MessageSchema = sft(DSR_Q03_V23);
/** UDM^Q05: MSH [{SFT}] URD [URS] {DSP} [DSC] */
export const UDM_Q05_SCHEMA: MessageSchema = sft(UDM_Q05_V23);
/** EDR^R07: MSH [{SFT}] MSA [ERR] QAK {DSP} [DSC] */
export const EDR_R07_SCHEMA: MessageSchema = sft(EDR_R07_V23);
/** ERP^R09: MSH [{SFT}] MSA [ERR] QAK ERQ [DSC] */
export const ERP_R09_SCHEMA: MessageSchema = sft(ERP_R09_V23);
/** EQQ^Q04: MSH [{SFT}] EQL [DSC] */
export const EQQ_Q04_SCHEMA: MessageSchema = sft(EQQ_Q04_V231);
/** VQQ^Q07: MSH [{SFT}] VTQ [RDF] [DSC] */
export const VQQ_Q07_SCHEMA: MessageSchema = sft(VQQ_Q07_V231);
/** SPQ^Q08: MSH [{SFT}] SPR [RDF] [DSC] */
export const SPQ_Q08_SCHEMA: MessageSchema = sft(SPQ_Q08_V231);
/** RQQ^Q09: MSH [{SFT}] ERQ [DSC] */
export const RQQ_Q09_SCHEMA: MessageSchema = sft(RQQ_Q09_V231);
/** TBR^R08: MSH [{SFT}] MSA [ERR] QAK RDF {RDT} [DSC] */
export const TBR_R08_SCHEMA: MessageSchema = sft(TBR_R08_V231);
/** OSQ^Q06: MSH [{SFT}] QRD [QRF] [DSC] */
export const OSQ_Q06_SCHEMA: MessageSchema = sft(OSQ_Q06_V23);
/** VXQ^V01: MSH [{SFT}] QRD [QRF] */
export const VXQ_V01_SCHEMA: MessageSchema = sft(VXQ_V01_V23);

/** ADR^A19: the v2.4 structure (the v2.5 ADT^A01 body without PDA) with [{SFT}] after MSH. */
export const ADR_A19_SCHEMA: MessageSchema = sft(ADR_A19_V24);

/** The TIMING group of v2.5 orders: TQ1 [{TQ2}], as `timings`. */
const timing = (name: string, exportTypeName: string, builderTypeName?: string) =>
  group(name, "optional", "repeating", [req("TQ1"), optList("TQ2")], { as: "timings", exportTypeName, ...(builderTypeName ? { builderTypeName } : {}) });

/**
 * VXX^V02: MSH MSA [{SFT}] QRD [QRF] { PATIENT: PID [{NK1}] } — the SFT follows MSA here.
 */
export const VXX_V02_SCHEMA: MessageSchema = {
  ...reversion(VXX_V02_V23, "2.5"),
  structure: [req("MSH"), req("MSA"), SFT, ...VXX_V02_V23.structure.slice(2)],
};

/**
 * VXR^V03: MSH MSA [{SFT}] QRD [QRF] PID [PD1] [{NK1}] [ PATIENT_VISIT: PV1 [PV2] ] [{GT1}] [{ INSURANCE: IN1 [IN2] [IN3] }]
 * [{ ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] RXA [RXR] [{ OBSERVATION: OBX [{NTE}] }] }]
 *
 * Compared with v2.4: SFT after MSA, a required ORC and the TIMING group in each order (as VXU^V04).
 */
export const VXR_V03_SCHEMA: MessageSchema = {
  ...reversion(VXR_V03_V23, "2.5"),
  structure: [
    req("MSH"), req("MSA"), SFT, req("QRD"), opt("QRF"), req("PID"), opt("PD1"), optList("NK1"),
    group("PATIENT_VISIT", "optional", "single", [req("PV1"), opt("PV2")], { inline: true }),
    optList("GT1"),
    group("INSURANCE", "optional", "repeating", [req("IN1"), opt("IN2"), opt("IN3")], { exportTypeName: "ParsedInsurance" }),
    group("ORDER", "optional", "repeating", [
      req("ORC"),
      timing("TIMING", "ParsedTiming"),
      req("RXA"),
      opt("RXR"),
      group("OBSERVATION", "optional", "repeating", [req("OBX"), optList("NTE")], { exportTypeName: "ParsedObservation" }),
    ], { exportTypeName: "ParsedVaccination" }),
  ],
};

/**
 * ORF^R04: MSH [{SFT}] MSA QRD [QRF] { QUERY_RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: [ORC] OBR [{NTE}] [{ TIMING_QTY: TQ1 [{TQ2}] }] [CTD]
 *   { OBSERVATION: [OBX] [{NTE}] } [{CTI}] } } [{ERR}] [QAK] [DSC]
 *
 * Compared with v2.4: SFT, the TIMING QTY groups and a repeating ERR.
 */
export const ORF_R04_SCHEMA: MessageSchema = {
  messageType: "ORF",
  triggerEvent: "R04",
  version: "2.5",
  structure: [
    req("MSH"), SFT, req("MSA"), req("QRD"), opt("QRF"),
    orfQueryResponse([opt("ORC"), req("OBR"), optList("NTE"), timing("TIMING_QTY", "ParsedTimingQty", "TimingQty"), opt("CTD"), ORF_OBSERVATION, optList("CTI")]),
    optList("ERR"), opt("QAK"), opt("DSC"),
  ],
};

/**
 * ORF^W02: as ORF^R04 but without the TIMING QTY groups (Caristix v2.5 and v2.5.1 list the
 * waveform response without them), so it is its own message from v2.5 on.
 */
export const ORF_W02_SCHEMA: MessageSchema = {
  messageType: "ORF",
  triggerEvent: "W02",
  version: "2.5",
  structure: [
    req("MSH"), SFT, req("MSA"), req("QRD"), opt("QRF"),
    orfQueryResponse([opt("ORC"), req("OBR"), optList("NTE"), opt("CTD"), ORF_OBSERVATION, optList("CTI")]),
    optList("ERR"), opt("QAK"), opt("DSC"),
  ],
};

/**
 * OSR^Q06: MSH MSA [{ERR}] [{SFT}] [{NTE}] QRD [QRF] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }]
 *   [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{CTI}] ] } ] [DSC]
 *
 * Compared with v2.3: ERR repeats, SFT follows it, and each order gains the TIMING group.
 */
export const OSR_Q06_SCHEMA: MessageSchema = {
  messageType: "OSR",
  triggerEvent: "Q06",
  version: "2.5",
  structure: [
    req("MSH"), req("MSA"), optList("ERR"), SFT, optList("NTE"), req("QRD"), opt("QRF"),
    osrResponse([req("ORC"), timing("TIMING", "ParsedTiming"), OSR_ORDER_DETAIL]),
    opt("DSC"),
  ],
};

/**
 * SQR^S25: MSH MSA [{ERR}] QAK [{ SCHEDULE: SCH [{TQ1}] [{NTE}] [ PATIENT: PID [PV1] [PV2] [DG1] ] { RESOURCES: ... } }] [DSC]
 *
 * Compared with v2.3: ERR repeats and [{TQ1}] follows SCH (no SFT). SQM^S25 is unchanged since v2.3.
 */
const schedule23 = SQR_S25_V23.structure[4] as SegmentGroup;
export const SQR_S25_SCHEMA: MessageSchema = {
  ...reversion(SQR_S25_V23, "2.5"),
  structure: [
    req("MSH"), req("MSA"), optList("ERR"), req("QAK"),
    { ...schedule23, segments: [req("SCH"), optList("TQ1"), ...schedule23.segments.slice(1)] },
    opt("DSC"),
  ],
};

/** Every query message whose structure changed in 2.5. */
export const QUERY_MESSAGES: MessageSchema[] = [
  QRY_A19_SCHEMA,
  ADR_A19_SCHEMA,
  ...QRY_Q01_FAMILY,
  QRY_R02_SCHEMA,
  QCK_Q02_SCHEMA,
  DSR_Q01_SCHEMA,
  DSR_Q03_SCHEMA,
  UDM_Q05_SCHEMA,
  EQQ_Q04_SCHEMA,
  VQQ_Q07_SCHEMA,
  SPQ_Q08_SCHEMA,
  RQQ_Q09_SCHEMA,
  TBR_R08_SCHEMA,
  EDR_R07_SCHEMA,
  ERP_R09_SCHEMA,
  SQR_S25_SCHEMA,
  VXQ_V01_SCHEMA,
  VXX_V02_SCHEMA,
  VXR_V03_SCHEMA,
  ORF_R04_SCHEMA,
  ORF_W02_SCHEMA,
  OSQ_Q06_SCHEMA,
  OSR_Q06_SCHEMA,
];
