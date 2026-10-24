import type { MessageSchema } from "../../../src/types/schema";
import { reversion, withSft } from "../helpers";
import { BAR_P02_SCHEMA as P02_V23, BAR_P06_SCHEMA as P06_V23 } from "../v2.3/BAR_P01";
import { BAR_P01_SCHEMA as P01_V24, BAR_P05_SCHEMA as P05_V24 } from "../v2.4/BAR_P01";

/**
 * BAR^P01, BAR^P05, BAR^P02 and BAR^P06 (HL7 v2.5, identical in v2.5.1): the v2.4 (P01, P05) and
 * v2.3 (P02, P06) structures with [{SFT}] after MSH.
 * Sources: https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/BAR_P01, BAR_P05, BAR_P02, BAR_P06
 */
export const BAR_P01_SCHEMA: MessageSchema = withSft(reversion(P01_V24, "2.5"));
export const BAR_P05_SCHEMA: MessageSchema = withSft(reversion(P05_V24, "2.5"));
export const BAR_P02_SCHEMA: MessageSchema = withSft(reversion(P02_V23, "2.5"));
export const BAR_P06_SCHEMA: MessageSchema = withSft(reversion(P06_V23, "2.5"));
