import type { MessageSchema } from "../../../src/types/schema";
import { wrappers } from "../helpers";
import { ORU_R01_SCHEMA } from "./ORU_R01";

/**
 * ORU^W01 - Waveform Result, Unsolicited (HL7 v2.3, chapter 7 section 7.19.1): the ORU message
 * structure under the W01 trigger event, so it wraps ORU^R01. v2.4 and v2.5 give it their own
 * shapes (see those schemas).
 * Sources: https://www.hl7.eu/HL7v2x/v23/std23/ch7.htm (7.19.1), https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/ORU_W01
 */
export const ORU_W01_SCHEMA: MessageSchema = wrappers(ORU_R01_SCHEMA, ["W01"])[0];
