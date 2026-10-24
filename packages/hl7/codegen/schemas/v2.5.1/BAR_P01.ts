import { MessageSchema } from "../../../src/types/schema";
import * as V23 from "../v2.3/BAR_P01";

/** BAR^P01/P02/P05/P06 (HL7 v2.5.1): v2.3 structures with v2.5.1 segment classes; see the v2.3 schema for the gaps. */
export const BAR_P01_SCHEMA: MessageSchema = { ...V23.BAR_P01_SCHEMA, version: "2.5.1" };
export const BAR_P02_SCHEMA: MessageSchema = { ...V23.BAR_P02_SCHEMA, version: "2.5.1" };
export const BAR_P05_SCHEMA: MessageSchema = { ...V23.BAR_P05_SCHEMA, version: "2.5.1" };
export const BAR_P06_SCHEMA: MessageSchema = { ...V23.BAR_P06_SCHEMA, version: "2.5.1" };
