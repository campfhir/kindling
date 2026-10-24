import type { MessageSchema } from "../../../src/types/schema";
import { reversion, withSft } from "../helpers";
import { ADT_A17_SCHEMA as A17_V23 } from "../v2.3/ADT_A17";
import { ADT_A24_SCHEMA as A24_V23 } from "../v2.3/ADT_A24";
import { ADT_A20_SCHEMA as A20_V23 } from "../v2.3/ADT_A20";

/**
 * ADT^A17 (Swap Patients), ADT^A24 (Link Patient Information) and ADT^A20 (Bed Status Update)
 * in HL7 v2.5 (identical in v2.5.1): the v2.3 structures with [{SFT}] after MSH.
 * Sources: https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/ADT_A17, ADT_A24, ADT_A20
 */
export const ADT_A17_SCHEMA: MessageSchema = withSft(reversion(A17_V23, "2.5"));
export const ADT_A24_SCHEMA: MessageSchema = withSft(reversion(A24_V23, "2.5"));
export const ADT_A20_SCHEMA: MessageSchema = withSft(reversion(A20_V23, "2.5"));
