import { MessageSchema } from "../../../src/types/schema";
import { DFT_P03_SCHEMA as P03_V23 } from "../v2.3/DFT_P03";

/** DFT^P03 (HL7 v2.5.1): v2.3 structure with v2.5.1 segment classes; see the v2.3 schema for the gaps. */
export const DFT_P03_SCHEMA: MessageSchema = { ...P03_V23, version: "2.5.1" };
