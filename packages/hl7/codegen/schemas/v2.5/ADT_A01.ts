import type { MessageSchema } from "../../../src/types/schema";
import { reversion, withSft, wrappers } from "../helpers";
import { ADT_A01_EVENTS } from "../v2.3/ADT_A01";
import { ADT_A01_SCHEMA as A01_V24 } from "../v2.4/ADT_A01";

/**
 * ADT^A01 (HL7 v2.5, identical in v2.5.1): the v2.4 structure with [{SFT}] after MSH.
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/ADT_A01
 */
export const ADT_A01_SCHEMA: MessageSchema = withSft(reversion(A01_V24, "2.5"));

/** A02–A38 as wrappers around the v2.5 ADT_A01. */
export const ADT_A01_FAMILY: MessageSchema[] = [ADT_A01_SCHEMA, ...wrappers(ADT_A01_SCHEMA, ADT_A01_EVENTS)];
