import type { VersionSchema } from "../../../src/types/schema";
import { ACK_SCHEMA } from "./ACK";
import { ORM_O01_SCHEMA } from "./ORM_O01";
import { ORR_O02_SCHEMA } from "./ORR_O02";
import { ORU_R01_SCHEMA } from "./ORU_R01";
import { VXU_V04_SCHEMA } from "./VXU_V04";
import { MFN_M02_SCHEMA } from "./MFN_M02";
import { ADT_A01_FAMILY } from "./ADT_A01";
import { ADT_A17_SCHEMA } from "./ADT_A17";
import { ADT_A24_SCHEMA } from "./ADT_A24";
import { ADT_A20_SCHEMA } from "./ADT_A20";
import { ADT_A34_FAMILY } from "./ADT_A34";
import { DFT_P03_SCHEMA } from "./DFT_P03";
import { BAR_P01_SCHEMA, BAR_P02_SCHEMA, BAR_P05_SCHEMA, BAR_P06_SCHEMA } from "./BAR_P01";
import { SIU_FAMILY } from "./SIU_S12";
import { SRM_FAMILY } from "./SRM_S01";
import { SRR_FAMILY } from "./SRR_S01";
import { MDM_FAMILY } from "./MDM_T01";

/**
 * v2.3 is the base version: its segments are hand-written, and every message listed here gets a
 * generated structure, parser and builder.
 */
export const V2_3: VersionSchema = {
  version: "v2.3",
  segments: [],
  messages: [
    ACK_SCHEMA,
    ORM_O01_SCHEMA,
    ORR_O02_SCHEMA,
    ORU_R01_SCHEMA,
    VXU_V04_SCHEMA,
    MFN_M02_SCHEMA,
    ...ADT_A01_FAMILY,
    ADT_A17_SCHEMA,
    ADT_A24_SCHEMA,
    ADT_A20_SCHEMA,
    ...ADT_A34_FAMILY,
    DFT_P03_SCHEMA,
    BAR_P01_SCHEMA,
    BAR_P02_SCHEMA,
    BAR_P05_SCHEMA,
    BAR_P06_SCHEMA,
    ...SIU_FAMILY,
    ...SRM_FAMILY,
    ...SRR_FAMILY,
    ...MDM_FAMILY,
  ],
};
