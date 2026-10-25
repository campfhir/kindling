import type { MessageSchema } from "../../../src/types/schema";
import { reversion, withSft } from "../helpers";
import { adtMessages } from "../v2.3/ADT";
import { ADT_A01_SCHEMA as A01_V24 } from "../v2.4/ADT_A01";

/**
 * ADT^A01 (HL7 v2.5, identical in v2.5.1): the v2.4 structure with [{SFT}] after MSH.
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/ADT_A01
 */
export const ADT_A01_SCHEMA: MessageSchema = withSft(reversion(A01_V24, "2.5"));

/**
 * Every ADT message of v2.5 (identical in v2.5.1): A01 as above, and every other v2.3 ADT family
 * with [{SFT}] after MSH (A17, A24, A20 and the merge-shaped events were checked on Caristix v2.5;
 * the transfer-shaped events A02–A16, A21–A33 and A38 carry the v2.3 shape plus SFT until the 2.5
 * sweep adds their ROLs and PDA).
 * Sources: https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/ADT_A17, ADT_A24, ADT_A20, ADT_A34
 */
export const ADT_MESSAGES: MessageSchema[] = adtMessages((base, name) => (name === "ADT_A01" ? ADT_A01_SCHEMA : withSft(reversion(base, "2.5"))));
