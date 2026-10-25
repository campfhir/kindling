import type { MessageSchema } from "../../../src/types/schema";
import { insertAfter, opt, optList, replaceDeep, reversion, wrappers } from "../helpers";
import { BAR_P01_SCHEMA as BAR_P01_V23 } from "../v2.3/BAR_P01";
import { DFT_P03_SCHEMA as DFT_P03_V23 } from "../v2.3/DFT_P03";
import { ORM_O01_SCHEMA as ORM_O01_V23 } from "../v2.3/ORM_O01";
import { ORU_R01_SCHEMA as ORU_R01_V23 } from "../v2.3/ORU_R01";
import { SIU_EVENTS, SIU_S12_SCHEMA as SIU_S12_V23 } from "../v2.3/SIU_S12";

/**
 * The non-ADT messages whose structure changed between 2.3 and 2.3.1, each the v2.3 structure
 * with the change applied. Caristix and HAPI v231 agree on every one (hl7.eu publishes no 2.3.1
 * chapters); docs/validation/v2.3.1-message-ledger.md records the comparison.
 *
 * Sources: https://hl7-definition.caristix.com/v2/HL7v2.3.1/TriggerEvents/BAR_P01 (and BAR_P05,
 * DFT_P03, ORM_O01, ORU_R01, ORU_W01, SIU_S12); HAPI v231 BAR_P01, DFT_P03, ORM_O01, ORU_R01, SIU_S12.
 */

const in3Repeats = (schema: MessageSchema) => replaceDeep(reversion(schema, "2.3.1"), "IN3", optList("IN3"));

/** BAR^P01 (and P05): IN3 repeats inside the visit's INSURANCE group. */
export const BAR_P01_SCHEMA = in3Repeats(BAR_P01_V23);
export const BAR_P05_SCHEMA = wrappers(BAR_P01_SCHEMA, ["P05"])[0];
/** DFT^P03: IN3 repeats inside INSURANCE. */
export const DFT_P03_SCHEMA = in3Repeats(DFT_P03_V23);
/** ORM^O01: IN3 repeats inside the patient's INSURANCE group. */
export const ORM_O01_SCHEMA = in3Repeats(ORM_O01_V23);
/** ORU^R01 (and W01, which wraps it): [{NK1}] joins the PATIENT group after PD1. */
export const ORU_R01_SCHEMA = insertAfter(reversion(ORU_R01_V23, "2.3.1"), "PD1", optList("NK1"));
export const ORU_W01_SCHEMA = wrappers(ORU_R01_SCHEMA, ["W01"])[0];
/** SIU^S12 and the events sharing it: [PD1] joins the PATIENT group after PID. */
export const SIU_S12_SCHEMA = insertAfter(reversion(SIU_S12_V23, "2.3.1"), "PID", opt("PD1"));
export const SIU_FAMILY: MessageSchema[] = [SIU_S12_SCHEMA, ...wrappers(SIU_S12_SCHEMA, SIU_EVENTS)];

/** Every message of this module. */
export const CHANGED_MESSAGES: MessageSchema[] = [BAR_P01_SCHEMA, BAR_P05_SCHEMA, DFT_P03_SCHEMA, ORM_O01_SCHEMA, ORU_R01_SCHEMA, ORU_W01_SCHEMA, ...SIU_FAMILY];
