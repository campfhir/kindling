import type { MessageSchema } from "../../../src/types/schema";
import { SFT, group, opt, optList, req, reversion, withSft, wrappers } from "../helpers";
import { PATIENT_CARE_MESSAGES, QRY_PC4_EVENTS, QRY_PC4_SCHEMA as QRY_PC4_V23, careResponses } from "../v2.3/PPR_PC1";
import { REFERRAL_MESSAGES } from "../v2.3/RQI_I01";
import { CRM_C01_SCHEMA as CRM_V23, CSU_EVENTS, csu, nmd, nmq, nmr, pex, pexCauses, studyObservations } from "../v2.3/CRM_C01";
import { RQC_FAMILY as RQC_V24 } from "../v2.4/care";

/**
 * The v2.5 shapes (identical in v2.5.1) of the patient care, referral, clinical trial, product
 * experience and network management messages: [{SFT}] after MSH everywhere except QRY^PC4 and
 * SUR^P09 (the hl7.eu and Caristix tables list none there), repeating ERR in the care responses
 * and NMR, the TIMING QTY groups after OBR in CSU and after RXE in PEX (where they are required).
 * Sources: https://www.hl7.eu/HL7v2x/v25/std25/ch07.html, ch11.html, ch12.html, ch14.html;
 * https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/<MESSAGE>
 */
const sft = (m: MessageSchema) => withSft(reversion(m, "2.5"));
const timing = (name: string, as: string, usage: "required" | "optional") =>
  group(name, usage, "repeating", [req("TQ1"), optList("TQ2")], { as, exportTypeName: `Parsed${name.split("_").map((w) => w[0] + w.slice(1).toLowerCase()).join("")}` });

/** PPR, PGL, PPP and PPG with SFT; QRY^PC9/PCE/PCK with SFT (PC4 keeps the v2.3 shape). */
const careMessages = PATIENT_CARE_MESSAGES.filter((m) => m.messageType !== "QRY" && !["PRR", "PPV", "PTR", "PPT"].includes(m.messageType)).map(sft);
export const QRY_PC9_SCHEMA: MessageSchema = { ...sft(QRY_PC4_V23), triggerEvent: "PC9" };
export const QRY_PC9_FAMILY: MessageSchema[] = [QRY_PC9_SCHEMA, ...wrappers(QRY_PC9_SCHEMA, QRY_PC4_EVENTS.filter((e) => e !== "PC9"))];
/** PRR, PPV, PTR, PPT: MSH [{SFT}] MSA [{ERR}] [QAK] QRD { PATIENT } */
export const CARE_RESPONSES: MessageSchema[] = careResponses([req("MSH"), SFT, req("MSA"), optList("ERR"), opt("QAK")]).map((m) => ({ ...m, version: "2.5" }));
export const PATIENT_CARE_MESSAGES_V25: MessageSchema[] = [...careMessages, ...QRY_PC9_FAMILY, ...CARE_RESPONSES];

/** Every referral message with SFT; RQC^I06 keeps the v2.4 I05 shape. */
export const REFERRAL_MESSAGES_V25: MessageSchema[] = [...REFERRAL_MESSAGES.filter((m) => m.messageType !== "RQC").map(sft), ...RQC_V24.map(sft)];

/** CRM with SFT; CSU with SFT and [{ TIMING_QTY }] after OBR; PEX with SFT and the required TIMING QTY groups after each RXE. */
export const CRM_C01_SCHEMA: MessageSchema = sft(CRM_V23);
export const CRM_FAMILY: MessageSchema[] = [CRM_C01_SCHEMA, ...wrappers(CRM_C01_SCHEMA, ["C02", "C03", "C04", "C05", "C06", "C07", "C08"])];
export const CSU_C09_SCHEMA: MessageSchema = csu("2.5", [req("MSH"), SFT], studyObservations("required", [timing("TIMING_QTY", "timings", "optional")]), opt("CSP"));
export const CSU_FAMILY: MessageSchema[] = [CSU_C09_SCHEMA, ...wrappers(CSU_C09_SCHEMA, CSU_EVENTS)];
export const PEX_P07_SCHEMA: MessageSchema = pex("2.5", [req("MSH"), SFT], pexCauses([timing("TIMING_QTY", "timings", "required")], [timing("NK1_TIMING_QTY", "timings", "required")]));
export const PEX_FAMILY: MessageSchema[] = [PEX_P07_SCHEMA, ...wrappers(PEX_P07_SCHEMA, ["P08"])];
/** NMQ, NMR (repeating ERR) and NMD with SFT. */
export const NMQ_N01_SCHEMA: MessageSchema = nmq("2.5", [req("MSH"), SFT]);
export const NMR_N01_SCHEMA: MessageSchema = nmr("2.5", [req("MSH"), SFT, req("MSA"), optList("ERR")]);
export const NMD_N02_SCHEMA: MessageSchema = nmd("2.5", [req("MSH"), SFT]);
export const MISC_MESSAGES_V25: MessageSchema[] = [...CRM_FAMILY, ...CSU_FAMILY, ...PEX_FAMILY, NMQ_N01_SCHEMA, NMR_N01_SCHEMA, NMD_N02_SCHEMA];

/** Everything in this file. */
export const CARE_REFERRAL_MISC_MESSAGES: MessageSchema[] = [...PATIENT_CARE_MESSAGES_V25, ...REFERRAL_MESSAGES_V25, ...MISC_MESSAGES_V25];
