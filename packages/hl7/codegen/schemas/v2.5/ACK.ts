import type { MessageSchema } from "../../../src/types/schema";
import { SFT, optList, req } from "../helpers";

/**
 * ACK - General Acknowledgment (HL7 v2.5, chapter 2): MSH [{SFT}] MSA [{ERR}].
 * Compared with v2.3: SFT, and ERR repeats. Identical in v2.5.1.
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/ACK
 */
export const ACK_SCHEMA: MessageSchema = {
  messageType: "ACK",
  version: "2.5",
  structure: [req("MSH"), SFT, req("MSA"), optList("ERR")],
};
