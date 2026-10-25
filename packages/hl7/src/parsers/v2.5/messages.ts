/**
 * The HL7 v2.5 messages, keyed by message structure name, each mapped to its parser.
 * The root `parse()` dispatches on this map once it has read MSH-9 and MSH-12.
 *
 * @module
 */
import type { Result } from "../../types/result.ts";
import type { ParsedMessageBase } from "../../types/structure.ts";
import { parseACK } from "./ACK_Parser.ts";
import { parseADR_A19 } from "./ADR_A19_Parser.ts";
import { parseADT_A01 } from "./ADT_A01_Parser.ts";
import { parseADT_A02 } from "./ADT_A02_Parser.ts";
import { parseADT_A03 } from "./ADT_A03_Parser.ts";
import { parseADT_A04 } from "./ADT_A04_Parser.ts";
import { parseADT_A05 } from "./ADT_A05_Parser.ts";
import { parseADT_A06 } from "./ADT_A06_Parser.ts";
import { parseADT_A07 } from "./ADT_A07_Parser.ts";
import { parseADT_A08 } from "./ADT_A08_Parser.ts";
import { parseADT_A09 } from "./ADT_A09_Parser.ts";
import { parseADT_A10 } from "./ADT_A10_Parser.ts";
import { parseADT_A11 } from "./ADT_A11_Parser.ts";
import { parseADT_A12 } from "./ADT_A12_Parser.ts";
import { parseADT_A13 } from "./ADT_A13_Parser.ts";
import { parseADT_A14 } from "./ADT_A14_Parser.ts";
import { parseADT_A15 } from "./ADT_A15_Parser.ts";
import { parseADT_A16 } from "./ADT_A16_Parser.ts";
import { parseADT_A17 } from "./ADT_A17_Parser.ts";
import { parseADT_A18 } from "./ADT_A18_Parser.ts";
import { parseADT_A20 } from "./ADT_A20_Parser.ts";
import { parseADT_A21 } from "./ADT_A21_Parser.ts";
import { parseADT_A22 } from "./ADT_A22_Parser.ts";
import { parseADT_A23 } from "./ADT_A23_Parser.ts";
import { parseADT_A24 } from "./ADT_A24_Parser.ts";
import { parseADT_A25 } from "./ADT_A25_Parser.ts";
import { parseADT_A26 } from "./ADT_A26_Parser.ts";
import { parseADT_A27 } from "./ADT_A27_Parser.ts";
import { parseADT_A28 } from "./ADT_A28_Parser.ts";
import { parseADT_A29 } from "./ADT_A29_Parser.ts";
import { parseADT_A30 } from "./ADT_A30_Parser.ts";
import { parseADT_A31 } from "./ADT_A31_Parser.ts";
import { parseADT_A32 } from "./ADT_A32_Parser.ts";
import { parseADT_A33 } from "./ADT_A33_Parser.ts";
import { parseADT_A34 } from "./ADT_A34_Parser.ts";
import { parseADT_A35 } from "./ADT_A35_Parser.ts";
import { parseADT_A36 } from "./ADT_A36_Parser.ts";
import { parseADT_A37 } from "./ADT_A37_Parser.ts";
import { parseADT_A38 } from "./ADT_A38_Parser.ts";
import { parseADT_A39 } from "./ADT_A39_Parser.ts";
import { parseADT_A40 } from "./ADT_A40_Parser.ts";
import { parseADT_A41 } from "./ADT_A41_Parser.ts";
import { parseADT_A42 } from "./ADT_A42_Parser.ts";
import { parseADT_A43 } from "./ADT_A43_Parser.ts";
import { parseADT_A44 } from "./ADT_A44_Parser.ts";
import { parseADT_A45 } from "./ADT_A45_Parser.ts";
import { parseADT_A46 } from "./ADT_A46_Parser.ts";
import { parseADT_A47 } from "./ADT_A47_Parser.ts";
import { parseADT_A48 } from "./ADT_A48_Parser.ts";
import { parseADT_A49 } from "./ADT_A49_Parser.ts";
import { parseADT_A50 } from "./ADT_A50_Parser.ts";
import { parseADT_A51 } from "./ADT_A51_Parser.ts";
import { parseADT_A52 } from "./ADT_A52_Parser.ts";
import { parseADT_A53 } from "./ADT_A53_Parser.ts";
import { parseADT_A54 } from "./ADT_A54_Parser.ts";
import { parseADT_A55 } from "./ADT_A55_Parser.ts";
import { parseADT_A60 } from "./ADT_A60_Parser.ts";
import { parseADT_A61 } from "./ADT_A61_Parser.ts";
import { parseADT_A62 } from "./ADT_A62_Parser.ts";
import { parseBAR_P01 } from "./BAR_P01_Parser.ts";
import { parseBAR_P02 } from "./BAR_P02_Parser.ts";
import { parseBAR_P05 } from "./BAR_P05_Parser.ts";
import { parseBAR_P06 } from "./BAR_P06_Parser.ts";
import { parseBAR_P10 } from "./BAR_P10_Parser.ts";
import { parseBAR_P12 } from "./BAR_P12_Parser.ts";
import { parseBPS_O29 } from "./BPS_O29_Parser.ts";
import { parseBRP_O30 } from "./BRP_O30_Parser.ts";
import { parseBRT_O32 } from "./BRT_O32_Parser.ts";
import { parseBTS_O31 } from "./BTS_O31_Parser.ts";
import { parseCRM_C01 } from "./CRM_C01_Parser.ts";
import { parseCRM_C02 } from "./CRM_C02_Parser.ts";
import { parseCRM_C03 } from "./CRM_C03_Parser.ts";
import { parseCRM_C04 } from "./CRM_C04_Parser.ts";
import { parseCRM_C05 } from "./CRM_C05_Parser.ts";
import { parseCRM_C06 } from "./CRM_C06_Parser.ts";
import { parseCRM_C07 } from "./CRM_C07_Parser.ts";
import { parseCRM_C08 } from "./CRM_C08_Parser.ts";
import { parseCSU_C09 } from "./CSU_C09_Parser.ts";
import { parseCSU_C10 } from "./CSU_C10_Parser.ts";
import { parseCSU_C11 } from "./CSU_C11_Parser.ts";
import { parseCSU_C12 } from "./CSU_C12_Parser.ts";
import { parseDFT_P03 } from "./DFT_P03_Parser.ts";
import { parseDFT_P11 } from "./DFT_P11_Parser.ts";
import { parseDOC_T12 } from "./DOC_T12_Parser.ts";
import { parseDSR_Q01 } from "./DSR_Q01_Parser.ts";
import { parseDSR_Q03 } from "./DSR_Q03_Parser.ts";
import { parseEAC_U07 } from "./EAC_U07_Parser.ts";
import { parseEAN_U09 } from "./EAN_U09_Parser.ts";
import { parseEAR_U08 } from "./EAR_U08_Parser.ts";
import { parseEDR_R07 } from "./EDR_R07_Parser.ts";
import { parseEQQ_Q04 } from "./EQQ_Q04_Parser.ts";
import { parseERP_R09 } from "./ERP_R09_Parser.ts";
import { parseESR_U02 } from "./ESR_U02_Parser.ts";
import { parseESU_U01 } from "./ESU_U01_Parser.ts";
import { parseINR_U06 } from "./INR_U06_Parser.ts";
import { parseINU_U05 } from "./INU_U05_Parser.ts";
import { parseLSR_U13 } from "./LSR_U13_Parser.ts";
import { parseLSU_U12 } from "./LSU_U12_Parser.ts";
import { parseMDM_T01 } from "./MDM_T01_Parser.ts";
import { parseMDM_T02 } from "./MDM_T02_Parser.ts";
import { parseMDM_T03 } from "./MDM_T03_Parser.ts";
import { parseMDM_T04 } from "./MDM_T04_Parser.ts";
import { parseMDM_T05 } from "./MDM_T05_Parser.ts";
import { parseMDM_T06 } from "./MDM_T06_Parser.ts";
import { parseMDM_T07 } from "./MDM_T07_Parser.ts";
import { parseMDM_T08 } from "./MDM_T08_Parser.ts";
import { parseMDM_T09 } from "./MDM_T09_Parser.ts";
import { parseMDM_T10 } from "./MDM_T10_Parser.ts";
import { parseMDM_T11 } from "./MDM_T11_Parser.ts";
import { parseMFK_M01 } from "./MFK_M01_Parser.ts";
import { parseMFK_M02 } from "./MFK_M02_Parser.ts";
import { parseMFK_M03 } from "./MFK_M03_Parser.ts";
import { parseMFK_M04 } from "./MFK_M04_Parser.ts";
import { parseMFK_M05 } from "./MFK_M05_Parser.ts";
import { parseMFK_M06 } from "./MFK_M06_Parser.ts";
import { parseMFK_M07 } from "./MFK_M07_Parser.ts";
import { parseMFK_M08 } from "./MFK_M08_Parser.ts";
import { parseMFK_M09 } from "./MFK_M09_Parser.ts";
import { parseMFK_M10 } from "./MFK_M10_Parser.ts";
import { parseMFK_M11 } from "./MFK_M11_Parser.ts";
import { parseMFK_M12 } from "./MFK_M12_Parser.ts";
import { parseMFK_M13 } from "./MFK_M13_Parser.ts";
import { parseMFK_M15 } from "./MFK_M15_Parser.ts";
import { parseMFN_M01 } from "./MFN_M01_Parser.ts";
import { parseMFN_M02 } from "./MFN_M02_Parser.ts";
import { parseMFN_M03 } from "./MFN_M03_Parser.ts";
import { parseMFN_M04 } from "./MFN_M04_Parser.ts";
import { parseMFN_M05 } from "./MFN_M05_Parser.ts";
import { parseMFN_M06 } from "./MFN_M06_Parser.ts";
import { parseMFN_M07 } from "./MFN_M07_Parser.ts";
import { parseMFN_M08 } from "./MFN_M08_Parser.ts";
import { parseMFN_M09 } from "./MFN_M09_Parser.ts";
import { parseMFN_M10 } from "./MFN_M10_Parser.ts";
import { parseMFN_M11 } from "./MFN_M11_Parser.ts";
import { parseMFN_M12 } from "./MFN_M12_Parser.ts";
import { parseMFN_M13 } from "./MFN_M13_Parser.ts";
import { parseMFN_M15 } from "./MFN_M15_Parser.ts";
import { parseMFQ_M01 } from "./MFQ_M01_Parser.ts";
import { parseMFQ_M02 } from "./MFQ_M02_Parser.ts";
import { parseMFQ_M03 } from "./MFQ_M03_Parser.ts";
import { parseMFQ_M04 } from "./MFQ_M04_Parser.ts";
import { parseMFQ_M05 } from "./MFQ_M05_Parser.ts";
import { parseMFQ_M06 } from "./MFQ_M06_Parser.ts";
import { parseMFQ_M07 } from "./MFQ_M07_Parser.ts";
import { parseMFQ_M08 } from "./MFQ_M08_Parser.ts";
import { parseMFQ_M09 } from "./MFQ_M09_Parser.ts";
import { parseMFQ_M10 } from "./MFQ_M10_Parser.ts";
import { parseMFQ_M11 } from "./MFQ_M11_Parser.ts";
import { parseMFQ_M12 } from "./MFQ_M12_Parser.ts";
import { parseMFQ_M13 } from "./MFQ_M13_Parser.ts";
import { parseMFR_M01 } from "./MFR_M01_Parser.ts";
import { parseMFR_M02 } from "./MFR_M02_Parser.ts";
import { parseMFR_M03 } from "./MFR_M03_Parser.ts";
import { parseMFR_M04 } from "./MFR_M04_Parser.ts";
import { parseMFR_M05 } from "./MFR_M05_Parser.ts";
import { parseMFR_M06 } from "./MFR_M06_Parser.ts";
import { parseMFR_M07 } from "./MFR_M07_Parser.ts";
import { parseMFR_M08 } from "./MFR_M08_Parser.ts";
import { parseMFR_M09 } from "./MFR_M09_Parser.ts";
import { parseMFR_M10 } from "./MFR_M10_Parser.ts";
import { parseMFR_M11 } from "./MFR_M11_Parser.ts";
import { parseMFR_M12 } from "./MFR_M12_Parser.ts";
import { parseMFR_M13 } from "./MFR_M13_Parser.ts";
import { parseNMD_N02 } from "./NMD_N02_Parser.ts";
import { parseNMQ_N01 } from "./NMQ_N01_Parser.ts";
import { parseNMR_N01 } from "./NMR_N01_Parser.ts";
import { parseOMB_O27 } from "./OMB_O27_Parser.ts";
import { parseOMD_O03 } from "./OMD_O03_Parser.ts";
import { parseOMG_O19 } from "./OMG_O19_Parser.ts";
import { parseOMI_O23 } from "./OMI_O23_Parser.ts";
import { parseOML_O21 } from "./OML_O21_Parser.ts";
import { parseOML_O33 } from "./OML_O33_Parser.ts";
import { parseOML_O35 } from "./OML_O35_Parser.ts";
import { parseOMN_O07 } from "./OMN_O07_Parser.ts";
import { parseOMP_O09 } from "./OMP_O09_Parser.ts";
import { parseOMS_O05 } from "./OMS_O05_Parser.ts";
import { parseORB_O28 } from "./ORB_O28_Parser.ts";
import { parseORD_O04 } from "./ORD_O04_Parser.ts";
import { parseORF_R04 } from "./ORF_R04_Parser.ts";
import { parseORF_W02 } from "./ORF_W02_Parser.ts";
import { parseORG_O20 } from "./ORG_O20_Parser.ts";
import { parseORI_O24 } from "./ORI_O24_Parser.ts";
import { parseORL_O22 } from "./ORL_O22_Parser.ts";
import { parseORL_O34 } from "./ORL_O34_Parser.ts";
import { parseORL_O36 } from "./ORL_O36_Parser.ts";
import { parseORM_O01 } from "./ORM_O01_Parser.ts";
import { parseORN_O08 } from "./ORN_O08_Parser.ts";
import { parseORP_O10 } from "./ORP_O10_Parser.ts";
import { parseORR_O02 } from "./ORR_O02_Parser.ts";
import { parseORS_O06 } from "./ORS_O06_Parser.ts";
import { parseORU_R01 } from "./ORU_R01_Parser.ts";
import { parseORU_R30 } from "./ORU_R30_Parser.ts";
import { parseORU_R31 } from "./ORU_R31_Parser.ts";
import { parseORU_R32 } from "./ORU_R32_Parser.ts";
import { parseORU_W01 } from "./ORU_W01_Parser.ts";
import { parseOSQ_Q06 } from "./OSQ_Q06_Parser.ts";
import { parseOSR_Q06 } from "./OSR_Q06_Parser.ts";
import { parseOUL_R21 } from "./OUL_R21_Parser.ts";
import { parseOUL_R22 } from "./OUL_R22_Parser.ts";
import { parseOUL_R23 } from "./OUL_R23_Parser.ts";
import { parseOUL_R24 } from "./OUL_R24_Parser.ts";
import { parsePEX_P07 } from "./PEX_P07_Parser.ts";
import { parsePEX_P08 } from "./PEX_P08_Parser.ts";
import { parsePGL_PC6 } from "./PGL_PC6_Parser.ts";
import { parsePGL_PC7 } from "./PGL_PC7_Parser.ts";
import { parsePGL_PC8 } from "./PGL_PC8_Parser.ts";
import { parsePIN_I07 } from "./PIN_I07_Parser.ts";
import { parsePMU_B01 } from "./PMU_B01_Parser.ts";
import { parsePMU_B02 } from "./PMU_B02_Parser.ts";
import { parsePMU_B03 } from "./PMU_B03_Parser.ts";
import { parsePMU_B04 } from "./PMU_B04_Parser.ts";
import { parsePMU_B05 } from "./PMU_B05_Parser.ts";
import { parsePMU_B06 } from "./PMU_B06_Parser.ts";
import { parsePMU_B07 } from "./PMU_B07_Parser.ts";
import { parsePMU_B08 } from "./PMU_B08_Parser.ts";
import { parsePPG_PCG } from "./PPG_PCG_Parser.ts";
import { parsePPG_PCH } from "./PPG_PCH_Parser.ts";
import { parsePPG_PCJ } from "./PPG_PCJ_Parser.ts";
import { parsePPP_PCB } from "./PPP_PCB_Parser.ts";
import { parsePPP_PCC } from "./PPP_PCC_Parser.ts";
import { parsePPP_PCD } from "./PPP_PCD_Parser.ts";
import { parsePPR_PC1 } from "./PPR_PC1_Parser.ts";
import { parsePPR_PC2 } from "./PPR_PC2_Parser.ts";
import { parsePPR_PC3 } from "./PPR_PC3_Parser.ts";
import { parsePPT_PCL } from "./PPT_PCL_Parser.ts";
import { parsePPV_PCA } from "./PPV_PCA_Parser.ts";
import { parsePRR_PC5 } from "./PRR_PC5_Parser.ts";
import { parsePTR_PCF } from "./PTR_PCF_Parser.ts";
import { parseQBP_Q11 } from "./QBP_Q11_Parser.ts";
import { parseQBP_Q13 } from "./QBP_Q13_Parser.ts";
import { parseQBP_Q15 } from "./QBP_Q15_Parser.ts";
import { parseQBP_Q21 } from "./QBP_Q21_Parser.ts";
import { parseQBP_Q22 } from "./QBP_Q22_Parser.ts";
import { parseQBP_Q23 } from "./QBP_Q23_Parser.ts";
import { parseQBP_Q24 } from "./QBP_Q24_Parser.ts";
import { parseQBP_Q25 } from "./QBP_Q25_Parser.ts";
import { parseQBP_Q31 } from "./QBP_Q31_Parser.ts";
import { parseQBP_Z73 } from "./QBP_Z73_Parser.ts";
import { parseQBP_Z75 } from "./QBP_Z75_Parser.ts";
import { parseQBP_Z77 } from "./QBP_Z77_Parser.ts";
import { parseQBP_Z79 } from "./QBP_Z79_Parser.ts";
import { parseQBP_Z81 } from "./QBP_Z81_Parser.ts";
import { parseQBP_Z85 } from "./QBP_Z85_Parser.ts";
import { parseQBP_Z87 } from "./QBP_Z87_Parser.ts";
import { parseQBP_Z89 } from "./QBP_Z89_Parser.ts";
import { parseQBP_Z91 } from "./QBP_Z91_Parser.ts";
import { parseQBP_Z93 } from "./QBP_Z93_Parser.ts";
import { parseQBP_Z95 } from "./QBP_Z95_Parser.ts";
import { parseQBP_Z97 } from "./QBP_Z97_Parser.ts";
import { parseQBP_Z99 } from "./QBP_Z99_Parser.ts";
import { parseQCK_Q02 } from "./QCK_Q02_Parser.ts";
import { parseQCN_J01 } from "./QCN_J01_Parser.ts";
import { parseQRY_A19 } from "./QRY_A19_Parser.ts";
import { parseQRY_PC4 } from "./QRY_PC4_Parser.ts";
import { parseQRY_PC9 } from "./QRY_PC9_Parser.ts";
import { parseQRY_PCE } from "./QRY_PCE_Parser.ts";
import { parseQRY_PCK } from "./QRY_PCK_Parser.ts";
import { parseQRY_Q01 } from "./QRY_Q01_Parser.ts";
import { parseQRY_Q02 } from "./QRY_Q02_Parser.ts";
import { parseQRY_Q26 } from "./QRY_Q26_Parser.ts";
import { parseQRY_Q27 } from "./QRY_Q27_Parser.ts";
import { parseQRY_Q28 } from "./QRY_Q28_Parser.ts";
import { parseQRY_Q29 } from "./QRY_Q29_Parser.ts";
import { parseQRY_Q30 } from "./QRY_Q30_Parser.ts";
import { parseQRY_R02 } from "./QRY_R02_Parser.ts";
import { parseQRY_T12 } from "./QRY_T12_Parser.ts";
import { parseQSB_Q16 } from "./QSB_Q16_Parser.ts";
import { parseQSB_Z83 } from "./QSB_Z83_Parser.ts";
import { parseQSX_J02 } from "./QSX_J02_Parser.ts";
import { parseQVR_Q17 } from "./QVR_Q17_Parser.ts";
import { parseRAR_RAR } from "./RAR_RAR_Parser.ts";
import { parseRAS_O17 } from "./RAS_O17_Parser.ts";
import { parseRCI_I05 } from "./RCI_I05_Parser.ts";
import { parseRCL_I06 } from "./RCL_I06_Parser.ts";
import { parseRDE_O11 } from "./RDE_O11_Parser.ts";
import { parseRDE_O25 } from "./RDE_O25_Parser.ts";
import { parseRDR_RDR } from "./RDR_RDR_Parser.ts";
import { parseRDS_O13 } from "./RDS_O13_Parser.ts";
import { parseRDY_K15 } from "./RDY_K15_Parser.ts";
import { parseRDY_Z80 } from "./RDY_Z80_Parser.ts";
import { parseRDY_Z98 } from "./RDY_Z98_Parser.ts";
import { parseREF_I12 } from "./REF_I12_Parser.ts";
import { parseREF_I13 } from "./REF_I13_Parser.ts";
import { parseREF_I14 } from "./REF_I14_Parser.ts";
import { parseREF_I15 } from "./REF_I15_Parser.ts";
import { parseRER_RER } from "./RER_RER_Parser.ts";
import { parseRGR_RGR } from "./RGR_RGR_Parser.ts";
import { parseRGV_O15 } from "./RGV_O15_Parser.ts";
import { parseROR_ROR } from "./ROR_ROR_Parser.ts";
import { parseRPA_I08 } from "./RPA_I08_Parser.ts";
import { parseRPA_I09 } from "./RPA_I09_Parser.ts";
import { parseRPA_I10 } from "./RPA_I10_Parser.ts";
import { parseRPA_I11 } from "./RPA_I11_Parser.ts";
import { parseRPI_I01 } from "./RPI_I01_Parser.ts";
import { parseRPI_I04 } from "./RPI_I04_Parser.ts";
import { parseRPL_I02 } from "./RPL_I02_Parser.ts";
import { parseRPR_I03 } from "./RPR_I03_Parser.ts";
import { parseRQA_I08 } from "./RQA_I08_Parser.ts";
import { parseRQA_I09 } from "./RQA_I09_Parser.ts";
import { parseRQA_I10 } from "./RQA_I10_Parser.ts";
import { parseRQA_I11 } from "./RQA_I11_Parser.ts";
import { parseRQC_I05 } from "./RQC_I05_Parser.ts";
import { parseRQC_I06 } from "./RQC_I06_Parser.ts";
import { parseRQI_I01 } from "./RQI_I01_Parser.ts";
import { parseRQI_I02 } from "./RQI_I02_Parser.ts";
import { parseRQI_I03 } from "./RQI_I03_Parser.ts";
import { parseRQP_I04 } from "./RQP_I04_Parser.ts";
import { parseRQQ_Q09 } from "./RQQ_Q09_Parser.ts";
import { parseRRA_O18 } from "./RRA_O18_Parser.ts";
import { parseRRD_O14 } from "./RRD_O14_Parser.ts";
import { parseRRE_O12 } from "./RRE_O12_Parser.ts";
import { parseRRE_O26 } from "./RRE_O26_Parser.ts";
import { parseRRG_O16 } from "./RRG_O16_Parser.ts";
import { parseRRI_I12 } from "./RRI_I12_Parser.ts";
import { parseRRI_I13 } from "./RRI_I13_Parser.ts";
import { parseRRI_I14 } from "./RRI_I14_Parser.ts";
import { parseRRI_I15 } from "./RRI_I15_Parser.ts";
import { parseRSP_K11 } from "./RSP_K11_Parser.ts";
import { parseRSP_K21 } from "./RSP_K21_Parser.ts";
import { parseRSP_K22 } from "./RSP_K22_Parser.ts";
import { parseRSP_K23 } from "./RSP_K23_Parser.ts";
import { parseRSP_K24 } from "./RSP_K24_Parser.ts";
import { parseRSP_K25 } from "./RSP_K25_Parser.ts";
import { parseRSP_K31 } from "./RSP_K31_Parser.ts";
import { parseRSP_Z82 } from "./RSP_Z82_Parser.ts";
import { parseRSP_Z84 } from "./RSP_Z84_Parser.ts";
import { parseRSP_Z86 } from "./RSP_Z86_Parser.ts";
import { parseRSP_Z88 } from "./RSP_Z88_Parser.ts";
import { parseRSP_Z90 } from "./RSP_Z90_Parser.ts";
import { parseRTB_K13 } from "./RTB_K13_Parser.ts";
import { parseRTB_Z74 } from "./RTB_Z74_Parser.ts";
import { parseRTB_Z76 } from "./RTB_Z76_Parser.ts";
import { parseRTB_Z78 } from "./RTB_Z78_Parser.ts";
import { parseRTB_Z92 } from "./RTB_Z92_Parser.ts";
import { parseRTB_Z94 } from "./RTB_Z94_Parser.ts";
import { parseRTB_Z96 } from "./RTB_Z96_Parser.ts";
import { parseSIU_S12 } from "./SIU_S12_Parser.ts";
import { parseSIU_S13 } from "./SIU_S13_Parser.ts";
import { parseSIU_S14 } from "./SIU_S14_Parser.ts";
import { parseSIU_S15 } from "./SIU_S15_Parser.ts";
import { parseSIU_S16 } from "./SIU_S16_Parser.ts";
import { parseSIU_S17 } from "./SIU_S17_Parser.ts";
import { parseSIU_S18 } from "./SIU_S18_Parser.ts";
import { parseSIU_S19 } from "./SIU_S19_Parser.ts";
import { parseSIU_S20 } from "./SIU_S20_Parser.ts";
import { parseSIU_S21 } from "./SIU_S21_Parser.ts";
import { parseSIU_S22 } from "./SIU_S22_Parser.ts";
import { parseSIU_S23 } from "./SIU_S23_Parser.ts";
import { parseSIU_S24 } from "./SIU_S24_Parser.ts";
import { parseSIU_S26 } from "./SIU_S26_Parser.ts";
import { parseSPQ_Q08 } from "./SPQ_Q08_Parser.ts";
import { parseSQM_S25 } from "./SQM_S25_Parser.ts";
import { parseSQR_S25 } from "./SQR_S25_Parser.ts";
import { parseSRM_S01 } from "./SRM_S01_Parser.ts";
import { parseSRM_S02 } from "./SRM_S02_Parser.ts";
import { parseSRM_S03 } from "./SRM_S03_Parser.ts";
import { parseSRM_S04 } from "./SRM_S04_Parser.ts";
import { parseSRM_S05 } from "./SRM_S05_Parser.ts";
import { parseSRM_S06 } from "./SRM_S06_Parser.ts";
import { parseSRM_S07 } from "./SRM_S07_Parser.ts";
import { parseSRM_S08 } from "./SRM_S08_Parser.ts";
import { parseSRM_S09 } from "./SRM_S09_Parser.ts";
import { parseSRM_S10 } from "./SRM_S10_Parser.ts";
import { parseSRM_S11 } from "./SRM_S11_Parser.ts";
import { parseSRR_S01 } from "./SRR_S01_Parser.ts";
import { parseSRR_S02 } from "./SRR_S02_Parser.ts";
import { parseSRR_S03 } from "./SRR_S03_Parser.ts";
import { parseSRR_S04 } from "./SRR_S04_Parser.ts";
import { parseSRR_S05 } from "./SRR_S05_Parser.ts";
import { parseSRR_S06 } from "./SRR_S06_Parser.ts";
import { parseSRR_S07 } from "./SRR_S07_Parser.ts";
import { parseSRR_S08 } from "./SRR_S08_Parser.ts";
import { parseSRR_S09 } from "./SRR_S09_Parser.ts";
import { parseSRR_S10 } from "./SRR_S10_Parser.ts";
import { parseSRR_S11 } from "./SRR_S11_Parser.ts";
import { parseSSR_U04 } from "./SSR_U04_Parser.ts";
import { parseSSU_U03 } from "./SSU_U03_Parser.ts";
import { parseSUR_P09 } from "./SUR_P09_Parser.ts";
import { parseTBR_R08 } from "./TBR_R08_Parser.ts";
import { parseTCR_U11 } from "./TCR_U11_Parser.ts";
import { parseTCU_U10 } from "./TCU_U10_Parser.ts";
import { parseUDM_Q05 } from "./UDM_Q05_Parser.ts";
import { parseVQQ_Q07 } from "./VQQ_Q07_Parser.ts";
import { parseVXQ_V01 } from "./VXQ_V01_Parser.ts";
import { parseVXR_V03 } from "./VXR_V03_Parser.ts";
import { parseVXU_V04 } from "./VXU_V04_Parser.ts";
import { parseVXX_V02 } from "./VXX_V02_Parser.ts";

/** Parses one message string into its structured form. */
type MessageParser = (messageString: string) => Result<ParsedMessageBase>;

/** The parsers of the HL7 v2.5 messages, keyed by message structure name (`ADT_A01`, `ACK`). */
export const MESSAGES = {
  ACK: parseACK,
  ADR_A19: parseADR_A19,
  ADT_A01: parseADT_A01,
  ADT_A02: parseADT_A02,
  ADT_A03: parseADT_A03,
  ADT_A04: parseADT_A04,
  ADT_A05: parseADT_A05,
  ADT_A06: parseADT_A06,
  ADT_A07: parseADT_A07,
  ADT_A08: parseADT_A08,
  ADT_A09: parseADT_A09,
  ADT_A10: parseADT_A10,
  ADT_A11: parseADT_A11,
  ADT_A12: parseADT_A12,
  ADT_A13: parseADT_A13,
  ADT_A14: parseADT_A14,
  ADT_A15: parseADT_A15,
  ADT_A16: parseADT_A16,
  ADT_A17: parseADT_A17,
  ADT_A18: parseADT_A18,
  ADT_A20: parseADT_A20,
  ADT_A21: parseADT_A21,
  ADT_A22: parseADT_A22,
  ADT_A23: parseADT_A23,
  ADT_A24: parseADT_A24,
  ADT_A25: parseADT_A25,
  ADT_A26: parseADT_A26,
  ADT_A27: parseADT_A27,
  ADT_A28: parseADT_A28,
  ADT_A29: parseADT_A29,
  ADT_A30: parseADT_A30,
  ADT_A31: parseADT_A31,
  ADT_A32: parseADT_A32,
  ADT_A33: parseADT_A33,
  ADT_A34: parseADT_A34,
  ADT_A35: parseADT_A35,
  ADT_A36: parseADT_A36,
  ADT_A37: parseADT_A37,
  ADT_A38: parseADT_A38,
  ADT_A39: parseADT_A39,
  ADT_A40: parseADT_A40,
  ADT_A41: parseADT_A41,
  ADT_A42: parseADT_A42,
  ADT_A43: parseADT_A43,
  ADT_A44: parseADT_A44,
  ADT_A45: parseADT_A45,
  ADT_A46: parseADT_A46,
  ADT_A47: parseADT_A47,
  ADT_A48: parseADT_A48,
  ADT_A49: parseADT_A49,
  ADT_A50: parseADT_A50,
  ADT_A51: parseADT_A51,
  ADT_A52: parseADT_A52,
  ADT_A53: parseADT_A53,
  ADT_A54: parseADT_A54,
  ADT_A55: parseADT_A55,
  ADT_A60: parseADT_A60,
  ADT_A61: parseADT_A61,
  ADT_A62: parseADT_A62,
  BAR_P01: parseBAR_P01,
  BAR_P02: parseBAR_P02,
  BAR_P05: parseBAR_P05,
  BAR_P06: parseBAR_P06,
  BAR_P10: parseBAR_P10,
  BAR_P12: parseBAR_P12,
  BPS_O29: parseBPS_O29,
  BRP_O30: parseBRP_O30,
  BRT_O32: parseBRT_O32,
  BTS_O31: parseBTS_O31,
  CRM_C01: parseCRM_C01,
  CRM_C02: parseCRM_C02,
  CRM_C03: parseCRM_C03,
  CRM_C04: parseCRM_C04,
  CRM_C05: parseCRM_C05,
  CRM_C06: parseCRM_C06,
  CRM_C07: parseCRM_C07,
  CRM_C08: parseCRM_C08,
  CSU_C09: parseCSU_C09,
  CSU_C10: parseCSU_C10,
  CSU_C11: parseCSU_C11,
  CSU_C12: parseCSU_C12,
  DFT_P03: parseDFT_P03,
  DFT_P11: parseDFT_P11,
  DOC_T12: parseDOC_T12,
  DSR_Q01: parseDSR_Q01,
  DSR_Q03: parseDSR_Q03,
  EAC_U07: parseEAC_U07,
  EAN_U09: parseEAN_U09,
  EAR_U08: parseEAR_U08,
  EDR_R07: parseEDR_R07,
  EQQ_Q04: parseEQQ_Q04,
  ERP_R09: parseERP_R09,
  ESR_U02: parseESR_U02,
  ESU_U01: parseESU_U01,
  INR_U06: parseINR_U06,
  INU_U05: parseINU_U05,
  LSR_U13: parseLSR_U13,
  LSU_U12: parseLSU_U12,
  MDM_T01: parseMDM_T01,
  MDM_T02: parseMDM_T02,
  MDM_T03: parseMDM_T03,
  MDM_T04: parseMDM_T04,
  MDM_T05: parseMDM_T05,
  MDM_T06: parseMDM_T06,
  MDM_T07: parseMDM_T07,
  MDM_T08: parseMDM_T08,
  MDM_T09: parseMDM_T09,
  MDM_T10: parseMDM_T10,
  MDM_T11: parseMDM_T11,
  MFK_M01: parseMFK_M01,
  MFK_M02: parseMFK_M02,
  MFK_M03: parseMFK_M03,
  MFK_M04: parseMFK_M04,
  MFK_M05: parseMFK_M05,
  MFK_M06: parseMFK_M06,
  MFK_M07: parseMFK_M07,
  MFK_M08: parseMFK_M08,
  MFK_M09: parseMFK_M09,
  MFK_M10: parseMFK_M10,
  MFK_M11: parseMFK_M11,
  MFK_M12: parseMFK_M12,
  MFK_M13: parseMFK_M13,
  MFK_M15: parseMFK_M15,
  MFN_M01: parseMFN_M01,
  MFN_M02: parseMFN_M02,
  MFN_M03: parseMFN_M03,
  MFN_M04: parseMFN_M04,
  MFN_M05: parseMFN_M05,
  MFN_M06: parseMFN_M06,
  MFN_M07: parseMFN_M07,
  MFN_M08: parseMFN_M08,
  MFN_M09: parseMFN_M09,
  MFN_M10: parseMFN_M10,
  MFN_M11: parseMFN_M11,
  MFN_M12: parseMFN_M12,
  MFN_M13: parseMFN_M13,
  MFN_M15: parseMFN_M15,
  MFQ_M01: parseMFQ_M01,
  MFQ_M02: parseMFQ_M02,
  MFQ_M03: parseMFQ_M03,
  MFQ_M04: parseMFQ_M04,
  MFQ_M05: parseMFQ_M05,
  MFQ_M06: parseMFQ_M06,
  MFQ_M07: parseMFQ_M07,
  MFQ_M08: parseMFQ_M08,
  MFQ_M09: parseMFQ_M09,
  MFQ_M10: parseMFQ_M10,
  MFQ_M11: parseMFQ_M11,
  MFQ_M12: parseMFQ_M12,
  MFQ_M13: parseMFQ_M13,
  MFR_M01: parseMFR_M01,
  MFR_M02: parseMFR_M02,
  MFR_M03: parseMFR_M03,
  MFR_M04: parseMFR_M04,
  MFR_M05: parseMFR_M05,
  MFR_M06: parseMFR_M06,
  MFR_M07: parseMFR_M07,
  MFR_M08: parseMFR_M08,
  MFR_M09: parseMFR_M09,
  MFR_M10: parseMFR_M10,
  MFR_M11: parseMFR_M11,
  MFR_M12: parseMFR_M12,
  MFR_M13: parseMFR_M13,
  NMD_N02: parseNMD_N02,
  NMQ_N01: parseNMQ_N01,
  NMR_N01: parseNMR_N01,
  OMB_O27: parseOMB_O27,
  OMD_O03: parseOMD_O03,
  OMG_O19: parseOMG_O19,
  OMI_O23: parseOMI_O23,
  OML_O21: parseOML_O21,
  OML_O33: parseOML_O33,
  OML_O35: parseOML_O35,
  OMN_O07: parseOMN_O07,
  OMP_O09: parseOMP_O09,
  OMS_O05: parseOMS_O05,
  ORB_O28: parseORB_O28,
  ORD_O04: parseORD_O04,
  ORF_R04: parseORF_R04,
  ORF_W02: parseORF_W02,
  ORG_O20: parseORG_O20,
  ORI_O24: parseORI_O24,
  ORL_O22: parseORL_O22,
  ORL_O34: parseORL_O34,
  ORL_O36: parseORL_O36,
  ORM_O01: parseORM_O01,
  ORN_O08: parseORN_O08,
  ORP_O10: parseORP_O10,
  ORR_O02: parseORR_O02,
  ORS_O06: parseORS_O06,
  ORU_R01: parseORU_R01,
  ORU_R30: parseORU_R30,
  ORU_R31: parseORU_R31,
  ORU_R32: parseORU_R32,
  ORU_W01: parseORU_W01,
  OSQ_Q06: parseOSQ_Q06,
  OSR_Q06: parseOSR_Q06,
  OUL_R21: parseOUL_R21,
  OUL_R22: parseOUL_R22,
  OUL_R23: parseOUL_R23,
  OUL_R24: parseOUL_R24,
  PEX_P07: parsePEX_P07,
  PEX_P08: parsePEX_P08,
  PGL_PC6: parsePGL_PC6,
  PGL_PC7: parsePGL_PC7,
  PGL_PC8: parsePGL_PC8,
  PIN_I07: parsePIN_I07,
  PMU_B01: parsePMU_B01,
  PMU_B02: parsePMU_B02,
  PMU_B03: parsePMU_B03,
  PMU_B04: parsePMU_B04,
  PMU_B05: parsePMU_B05,
  PMU_B06: parsePMU_B06,
  PMU_B07: parsePMU_B07,
  PMU_B08: parsePMU_B08,
  PPG_PCG: parsePPG_PCG,
  PPG_PCH: parsePPG_PCH,
  PPG_PCJ: parsePPG_PCJ,
  PPP_PCB: parsePPP_PCB,
  PPP_PCC: parsePPP_PCC,
  PPP_PCD: parsePPP_PCD,
  PPR_PC1: parsePPR_PC1,
  PPR_PC2: parsePPR_PC2,
  PPR_PC3: parsePPR_PC3,
  PPT_PCL: parsePPT_PCL,
  PPV_PCA: parsePPV_PCA,
  PRR_PC5: parsePRR_PC5,
  PTR_PCF: parsePTR_PCF,
  QBP_Q11: parseQBP_Q11,
  QBP_Q13: parseQBP_Q13,
  QBP_Q15: parseQBP_Q15,
  QBP_Q21: parseQBP_Q21,
  QBP_Q22: parseQBP_Q22,
  QBP_Q23: parseQBP_Q23,
  QBP_Q24: parseQBP_Q24,
  QBP_Q25: parseQBP_Q25,
  QBP_Q31: parseQBP_Q31,
  QBP_Z73: parseQBP_Z73,
  QBP_Z75: parseQBP_Z75,
  QBP_Z77: parseQBP_Z77,
  QBP_Z79: parseQBP_Z79,
  QBP_Z81: parseQBP_Z81,
  QBP_Z85: parseQBP_Z85,
  QBP_Z87: parseQBP_Z87,
  QBP_Z89: parseQBP_Z89,
  QBP_Z91: parseQBP_Z91,
  QBP_Z93: parseQBP_Z93,
  QBP_Z95: parseQBP_Z95,
  QBP_Z97: parseQBP_Z97,
  QBP_Z99: parseQBP_Z99,
  QCK_Q02: parseQCK_Q02,
  QCN_J01: parseQCN_J01,
  QRY_A19: parseQRY_A19,
  QRY_PC4: parseQRY_PC4,
  QRY_PC9: parseQRY_PC9,
  QRY_PCE: parseQRY_PCE,
  QRY_PCK: parseQRY_PCK,
  QRY_Q01: parseQRY_Q01,
  QRY_Q02: parseQRY_Q02,
  QRY_Q26: parseQRY_Q26,
  QRY_Q27: parseQRY_Q27,
  QRY_Q28: parseQRY_Q28,
  QRY_Q29: parseQRY_Q29,
  QRY_Q30: parseQRY_Q30,
  QRY_R02: parseQRY_R02,
  QRY_T12: parseQRY_T12,
  QSB_Q16: parseQSB_Q16,
  QSB_Z83: parseQSB_Z83,
  QSX_J02: parseQSX_J02,
  QVR_Q17: parseQVR_Q17,
  RAR_RAR: parseRAR_RAR,
  RAS_O17: parseRAS_O17,
  RCI_I05: parseRCI_I05,
  RCL_I06: parseRCL_I06,
  RDE_O11: parseRDE_O11,
  RDE_O25: parseRDE_O25,
  RDR_RDR: parseRDR_RDR,
  RDS_O13: parseRDS_O13,
  RDY_K15: parseRDY_K15,
  RDY_Z80: parseRDY_Z80,
  RDY_Z98: parseRDY_Z98,
  REF_I12: parseREF_I12,
  REF_I13: parseREF_I13,
  REF_I14: parseREF_I14,
  REF_I15: parseREF_I15,
  RER_RER: parseRER_RER,
  RGR_RGR: parseRGR_RGR,
  RGV_O15: parseRGV_O15,
  ROR_ROR: parseROR_ROR,
  RPA_I08: parseRPA_I08,
  RPA_I09: parseRPA_I09,
  RPA_I10: parseRPA_I10,
  RPA_I11: parseRPA_I11,
  RPI_I01: parseRPI_I01,
  RPI_I04: parseRPI_I04,
  RPL_I02: parseRPL_I02,
  RPR_I03: parseRPR_I03,
  RQA_I08: parseRQA_I08,
  RQA_I09: parseRQA_I09,
  RQA_I10: parseRQA_I10,
  RQA_I11: parseRQA_I11,
  RQC_I05: parseRQC_I05,
  RQC_I06: parseRQC_I06,
  RQI_I01: parseRQI_I01,
  RQI_I02: parseRQI_I02,
  RQI_I03: parseRQI_I03,
  RQP_I04: parseRQP_I04,
  RQQ_Q09: parseRQQ_Q09,
  RRA_O18: parseRRA_O18,
  RRD_O14: parseRRD_O14,
  RRE_O12: parseRRE_O12,
  RRE_O26: parseRRE_O26,
  RRG_O16: parseRRG_O16,
  RRI_I12: parseRRI_I12,
  RRI_I13: parseRRI_I13,
  RRI_I14: parseRRI_I14,
  RRI_I15: parseRRI_I15,
  RSP_K11: parseRSP_K11,
  RSP_K21: parseRSP_K21,
  RSP_K22: parseRSP_K22,
  RSP_K23: parseRSP_K23,
  RSP_K24: parseRSP_K24,
  RSP_K25: parseRSP_K25,
  RSP_K31: parseRSP_K31,
  RSP_Z82: parseRSP_Z82,
  RSP_Z84: parseRSP_Z84,
  RSP_Z86: parseRSP_Z86,
  RSP_Z88: parseRSP_Z88,
  RSP_Z90: parseRSP_Z90,
  RTB_K13: parseRTB_K13,
  RTB_Z74: parseRTB_Z74,
  RTB_Z76: parseRTB_Z76,
  RTB_Z78: parseRTB_Z78,
  RTB_Z92: parseRTB_Z92,
  RTB_Z94: parseRTB_Z94,
  RTB_Z96: parseRTB_Z96,
  SIU_S12: parseSIU_S12,
  SIU_S13: parseSIU_S13,
  SIU_S14: parseSIU_S14,
  SIU_S15: parseSIU_S15,
  SIU_S16: parseSIU_S16,
  SIU_S17: parseSIU_S17,
  SIU_S18: parseSIU_S18,
  SIU_S19: parseSIU_S19,
  SIU_S20: parseSIU_S20,
  SIU_S21: parseSIU_S21,
  SIU_S22: parseSIU_S22,
  SIU_S23: parseSIU_S23,
  SIU_S24: parseSIU_S24,
  SIU_S26: parseSIU_S26,
  SPQ_Q08: parseSPQ_Q08,
  SQM_S25: parseSQM_S25,
  SQR_S25: parseSQR_S25,
  SRM_S01: parseSRM_S01,
  SRM_S02: parseSRM_S02,
  SRM_S03: parseSRM_S03,
  SRM_S04: parseSRM_S04,
  SRM_S05: parseSRM_S05,
  SRM_S06: parseSRM_S06,
  SRM_S07: parseSRM_S07,
  SRM_S08: parseSRM_S08,
  SRM_S09: parseSRM_S09,
  SRM_S10: parseSRM_S10,
  SRM_S11: parseSRM_S11,
  SRR_S01: parseSRR_S01,
  SRR_S02: parseSRR_S02,
  SRR_S03: parseSRR_S03,
  SRR_S04: parseSRR_S04,
  SRR_S05: parseSRR_S05,
  SRR_S06: parseSRR_S06,
  SRR_S07: parseSRR_S07,
  SRR_S08: parseSRR_S08,
  SRR_S09: parseSRR_S09,
  SRR_S10: parseSRR_S10,
  SRR_S11: parseSRR_S11,
  SSR_U04: parseSSR_U04,
  SSU_U03: parseSSU_U03,
  SUR_P09: parseSUR_P09,
  TBR_R08: parseTBR_R08,
  TCR_U11: parseTCR_U11,
  TCU_U10: parseTCU_U10,
  UDM_Q05: parseUDM_Q05,
  VQQ_Q07: parseVQQ_Q07,
  VXQ_V01: parseVXQ_V01,
  VXR_V03: parseVXR_V03,
  VXU_V04: parseVXU_V04,
  VXX_V02: parseVXX_V02,
} as const satisfies Record<string, MessageParser>;

/** The name of an HL7 v2.5 message structure (`"ADT_A01" | "ACK" | ...`). */
export type MessageStructure = keyof typeof MESSAGES;

/** The parsed form of an HL7 v2.5 message structure (a union of all of them by default). */
export type ParsedMessage<S extends MessageStructure = MessageStructure> =
  (typeof MESSAGES)[S] extends (messageString: string) => Result<infer T> ? T : never;
