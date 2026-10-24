import type { VersionSchema } from "../../../src/types/schema";
import { ADT_A01_FAMILY } from "./ADT_A01";
import { BAR_P01_SCHEMA, BAR_P05_SCHEMA } from "./BAR_P01";
import { DFT_P03_SCHEMA } from "./DFT_P03";
import { ORM_O01_SCHEMA } from "./ORM_O01";
import { VXU_V04_SCHEMA } from "./VXU_V04";
import { MFN_M02_SCHEMA } from "./MFN_M02";

/**
 * v2.4 — re-exports v2.3.1, except for the messages whose structure changed in 2.4 (listed
 * below, generated against the v2.4 segments) and the segments introduced in 2.4: PDA (Patient
 * Death and Autopsy), ABS (Abstract), BLC (Blood Code), RMI (Risk Management Incident) and the
 * staff master file segments ORG, AFF, LAN and EDU.
 */
export const V2_4: VersionSchema = {
  version: "v2.4",
  baseVersion: "v2.3.1",
  reexport: true,
  ownSegments: ["PDA", "ABS", "BLC", "RMI", "ORG", "AFF", "LAN", "EDU"],
  segments: [],
  messages: [...ADT_A01_FAMILY, BAR_P01_SCHEMA, BAR_P05_SCHEMA, DFT_P03_SCHEMA, MFN_M02_SCHEMA, ORM_O01_SCHEMA, VXU_V04_SCHEMA],
};
