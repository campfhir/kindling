import type { MessageSchema } from "../../../src/types/schema";
import { reversion } from "../helpers";
import { RAS_O02_SCHEMA } from "../v2.3/RAS_O02";

/**
 * RAS^O01 (HL7 v2.3.1): the v2.3 RAS^O02 structure under the renumbered trigger event (v2.3.1
 * lists RAS/RRA as O01/O02; v2.4 renumbers again to O17/O18). RAS^O02 is withdrawn.
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.3.1/TriggerEvents/RAS_O01
 */
export const RAS_O01_SCHEMA: MessageSchema = { ...reversion(RAS_O02_SCHEMA, "2.3.1"), triggerEvent: "O01" };
