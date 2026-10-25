import type { VersionSchema } from "../../../src/types/schema";
import { ACK_SCHEMA } from "./ACK";
import { ORM_O01_SCHEMA } from "./ORM_O01";
import { ORR_O02_SCHEMA } from "./ORR_O02";
import { ORU_R01_SCHEMA } from "./ORU_R01";
import { VXU_V04_SCHEMA } from "./VXU_V04";
import { MFN_M02_SCHEMA } from "./MFN_M02";
import { ADT_MESSAGES } from "./ADT";
import { DFT_P03_SCHEMA } from "./DFT_P03";
import { BAR_P01_SCHEMA, BAR_P02_SCHEMA, BAR_P05_SCHEMA, BAR_P06_SCHEMA } from "./BAR_P01";
import { SIU_FAMILY } from "./SIU_S12";
import { SRM_FAMILY } from "./SRM_S01";
import { SRR_FAMILY } from "./SRR_S01";
import { MDM_FAMILY } from "./MDM_T01";
import { ADR_A19_SCHEMA, QRY_A19_SCHEMA } from "./QRY_A19";
import { QCK_Q02_SCHEMA, QRY_Q01_FAMILY, QRY_R02_SCHEMA } from "./QRY_Q01";
import { DSR_Q01_FAMILY, DSR_Q03_SCHEMA } from "./DSR_Q01";
import { UDM_Q05_FAMILY } from "./UDM_Q05";
import { ENHANCED_QUERY_MESSAGES } from "./EQQ_Q01";
import { SQM_S25_SCHEMA, SQR_S25_SCHEMA } from "./SQM_S25";
import { VXQ_V01_SCHEMA, VXR_V03_SCHEMA, VXX_V02_SCHEMA } from "./VXQ_V01";
import { ORF_R04_FAMILY } from "./ORF_R04";
import { OSQ_Q06_SCHEMA, OSR_Q06_SCHEMA } from "./OSQ_Q06";
import { DOC_T12_SCHEMA, QRY_T12_SCHEMA } from "./QRY_T12";
import { MFN_MESSAGES } from "./MFN_M01";
import { MFD_MFA_SCHEMA, MFK_FAMILY } from "./MFK_M01";
import { MFQ_FAMILY } from "./MFQ_M01";
import { MFR_MESSAGES } from "./MFR_M01";
import { OMD_O01_SCHEMA, ORD_O02_SCHEMA } from "./OMD_O01";
import { OMN_O01_SCHEMA, OMS_O01_SCHEMA, ORN_O02_SCHEMA, ORS_O02_SCHEMA } from "./OMS_O01";
import { RDO_O01_SCHEMA, RRO_O02_SCHEMA } from "./RDO_O01";
import { RDE_O01_SCHEMA, RRE_O02_SCHEMA } from "./RDE_O01";
import { RDS_O01_SCHEMA, RRD_O02_SCHEMA } from "./RDS_O01";
import { RGV_O01_SCHEMA, RRG_O02_SCHEMA } from "./RGV_O01";
import { RAS_O02_SCHEMA, RRA_O02_SCHEMA } from "./RAS_O02";
import { PHARMACY_QUERY_RESPONSES, QRY_Q26_FAMILY } from "./QRY_Q26";
import { ORU_W01_SCHEMA } from "./ORU_W01";
import { PATIENT_CARE_MESSAGES } from "./PPR_PC1";
import { REFERRAL_MESSAGES } from "./RQI_I01";
import { MISC_MESSAGES } from "./CRM_C01";

/** The query messages of v2.3 (chapters 2, 3, 4, 6, 7, 9 and 10). */
export const QUERY_MESSAGES = [
  QRY_A19_SCHEMA,
  ADR_A19_SCHEMA,
  ...QRY_Q01_FAMILY,
  QRY_R02_SCHEMA,
  QCK_Q02_SCHEMA,
  ...DSR_Q01_FAMILY,
  DSR_Q03_SCHEMA,
  ...UDM_Q05_FAMILY,
  ...ENHANCED_QUERY_MESSAGES,
  SQM_S25_SCHEMA,
  SQR_S25_SCHEMA,
  VXQ_V01_SCHEMA,
  VXX_V02_SCHEMA,
  VXR_V03_SCHEMA,
  ...ORF_R04_FAMILY,
  OSQ_Q06_SCHEMA,
  OSR_Q06_SCHEMA,
  QRY_T12_SCHEMA,
  DOC_T12_SCHEMA,
];

/** The master file messages of v2.3 (chapter 8); MFN^M02 is registered separately. */
export const MASTER_FILE_MESSAGES = [...MFN_MESSAGES, ...MFK_FAMILY, MFD_MFA_SCHEMA, ...MFQ_FAMILY, ...MFR_MESSAGES];

/** The order and pharmacy messages of v2.3 (chapter 4 sections 4.6–4.8, chapter 7 W01). */
export const ORDER_MESSAGES = [
  OMD_O01_SCHEMA, ORD_O02_SCHEMA,
  OMS_O01_SCHEMA, ORS_O02_SCHEMA, OMN_O01_SCHEMA, ORN_O02_SCHEMA,
  RDO_O01_SCHEMA, RRO_O02_SCHEMA,
  RDE_O01_SCHEMA, RRE_O02_SCHEMA,
  RDS_O01_SCHEMA, RRD_O02_SCHEMA,
  RGV_O01_SCHEMA, RRG_O02_SCHEMA,
  RAS_O02_SCHEMA, RRA_O02_SCHEMA,
  ...QRY_Q26_FAMILY, ...PHARMACY_QUERY_RESPONSES,
  ORU_W01_SCHEMA,
];

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
    ...ADT_MESSAGES,
    DFT_P03_SCHEMA,
    BAR_P01_SCHEMA,
    BAR_P02_SCHEMA,
    BAR_P05_SCHEMA,
    BAR_P06_SCHEMA,
    ...SIU_FAMILY,
    ...SRM_FAMILY,
    ...SRR_FAMILY,
    ...MDM_FAMILY,
    ...QUERY_MESSAGES,
    ...MASTER_FILE_MESSAGES,
    ...ORDER_MESSAGES,
    ...PATIENT_CARE_MESSAGES,
    ...REFERRAL_MESSAGES,
    ...MISC_MESSAGES,
  ],
};
