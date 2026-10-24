import { MessageSchema } from "../../../src/types/schema";
import * as V23 from "../v2.3/SRM_S01";

/** SRM^S01–S11 (HL7 v2.5.1): the structure is unchanged from v2.3 (no SFT in SRM). */
export const SRM_S01_SCHEMA: MessageSchema = { ...V23.SRM_S01_SCHEMA, version: "2.5.1" };
export const SRM_S02_SCHEMA: MessageSchema = { ...V23.SRM_S02_SCHEMA, version: "2.5.1" };
export const SRM_S03_SCHEMA: MessageSchema = { ...V23.SRM_S03_SCHEMA, version: "2.5.1" };
export const SRM_S04_SCHEMA: MessageSchema = { ...V23.SRM_S04_SCHEMA, version: "2.5.1" };
export const SRM_S05_SCHEMA: MessageSchema = { ...V23.SRM_S05_SCHEMA, version: "2.5.1" };
export const SRM_S06_SCHEMA: MessageSchema = { ...V23.SRM_S06_SCHEMA, version: "2.5.1" };
export const SRM_S07_SCHEMA: MessageSchema = { ...V23.SRM_S07_SCHEMA, version: "2.5.1" };
export const SRM_S08_SCHEMA: MessageSchema = { ...V23.SRM_S08_SCHEMA, version: "2.5.1" };
export const SRM_S09_SCHEMA: MessageSchema = { ...V23.SRM_S09_SCHEMA, version: "2.5.1" };
export const SRM_S10_SCHEMA: MessageSchema = { ...V23.SRM_S10_SCHEMA, version: "2.5.1" };
export const SRM_S11_SCHEMA: MessageSchema = { ...V23.SRM_S11_SCHEMA, version: "2.5.1" };
