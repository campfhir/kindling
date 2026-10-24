import { MessageSchema } from "../../../src/types/schema";
import { ADT_A20_SCHEMA as A20_V23 } from "../v2.3/ADT_A20";

/** ADT^A20 (HL7 v2.5.1): v2.3 structure; the optional [{SFT}] after MSH is not modelled yet. */
export const ADT_A20_SCHEMA: MessageSchema = { ...A20_V23, version: "2.5.1" };
