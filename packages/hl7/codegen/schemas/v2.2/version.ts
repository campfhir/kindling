import type { VersionSchema } from "../../../src/types/schema";
import { V2_2_MESSAGES } from "./messages";

/**
 * v2.2: HL7 v2 release 2.2, a version of its own: it extends no other version and none extends it.
 * Every segment is generated from codegen/spec/v2.2-segments.json (MSH, BHS and FHS on top of the shared
 * header base in src/types/header.ts). Messages are imported from the hl7.eu event pages (codegen/extracted/v2.2,
 * IMPORT.md); v2.2 defines no message structure IDs, so each message is TYPE_EVENT.
 */
export const V2_2: VersionSchema = {
  version: "v2.2",
  withdrawnMessages: [],
  segments: [],
  messages: V2_2_MESSAGES,
};
