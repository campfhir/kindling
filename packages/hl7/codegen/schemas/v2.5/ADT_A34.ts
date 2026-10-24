import type { MessageSchema } from "../../../src/types/schema";
import { reversion, withSft, wrappers } from "../helpers";
import { ADT_A34_EVENTS, ADT_A34_SCHEMA as A34_V23 } from "../v2.3/ADT_A34";

/**
 * ADT^A34 (HL7 v2.5, identical in v2.5.1): MSH [{SFT}] EVN PID [PD1] MRG [PV1]. Only SFT is new
 * compared with v2.3; the merge/link/move events wrap it as in v2.3.
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/ADT_A34
 */
export const ADT_A34_SCHEMA: MessageSchema = withSft(reversion(A34_V23, "2.5"));

/** A34 and the merge/link/move events wrapping it. */
export const ADT_A34_FAMILY: MessageSchema[] = [ADT_A34_SCHEMA, ...wrappers(ADT_A34_SCHEMA, ADT_A34_EVENTS)];
