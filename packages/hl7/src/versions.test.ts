import { describe, test, expect } from "vitest";
import * as seg23 from "./segments/v2.3/index.ts";
import * as seg231 from "./segments/v2.3.1/index.ts";
import * as seg24 from "./segments/v2.4/index.ts";
import * as seg25 from "./segments/v2.5/index.ts";
import * as seg251 from "./segments/v2.5.1/index.ts";
import * as par23 from "./parsers/v2.3/index.ts";
import * as par231 from "./parsers/v2.3.1/index.ts";
import * as par24 from "./parsers/v2.4/index.ts";
import * as par25 from "./parsers/v2.5/index.ts";
import * as par251 from "./parsers/v2.5.1/index.ts";
import * as bld23 from "./builders/v2.3/index.ts";
import * as bld24 from "./builders/v2.4/index.ts";
import * as bld231 from "./builders/v2.3.1/index.ts";
import * as bld25 from "./builders/v2.5/index.ts";
import * as bld251 from "./builders/v2.5.1/index.ts";

describe("segment introduction by version", () => {
  test("PDA, ABS, BLC and RMI are introduced in v2.4", () => {
    for (const name of ["PDA", "ABS", "BLC", "RMI"]) {
      expect(name in seg23).toBe(false);
      expect(name in seg231).toBe(false);
      expect(name in seg24).toBe(true);
      expect(name in seg25).toBe(true);
      expect(name in seg251).toBe(true);
    }
  });

  test("ORG, AFF, LAN and EDU are introduced in v2.4", () => {
    for (const name of ["ORG", "AFF", "LAN", "EDU"]) {
      expect(name in seg23).toBe(false);
      expect(name in seg231).toBe(false);
      expect(name in seg24).toBe(true);
      expect(name in seg25).toBe(true);
      expect(name in seg251).toBe(true);
    }
    // EDU gains EDU-9 in v2.5 and an ORG field's length changes, so v2.5 has its own subclass of each; AFF and LAN are re-exported.
    expect(Object.getPrototypeOf(seg25.ORG)).toBe(seg24.ORG);
    expect(Object.getPrototypeOf(seg25.EDU)).toBe(seg24.EDU);
    expect(seg25.AFF).toBe(seg24.AFF);
    expect(seg25.LAN).toBe(seg24.LAN);
  });

  test("OM7 is introduced in v2.4", () => {
    expect("OM7" in seg23).toBe(false);
    expect("OM7" in seg231).toBe(false);
    expect("OM7" in seg24).toBe(true);
    expect(seg25.OM7).toBe(seg24.OM7);
    expect(Object.getPrototypeOf(seg251.OM7)).toBe(seg25.OM7);
  });

  test("CER and IIM are introduced in v2.5", () => {
    for (const name of ["CER", "IIM"]) {
      expect(name in seg24).toBe(false);
      expect(name in seg25).toBe(true);
      expect(name in seg251).toBe(true);
    }
  });

  test("SFT, SPM and TQ1 are introduced in v2.5", () => {
    for (const name of ["SFT", "SPM", "TQ1"]) {
      expect(name in seg23).toBe(false);
      expect(name in seg231).toBe(false);
      expect(name in seg24).toBe(false);
      expect(name in seg25).toBe(true);
      expect(name in seg251).toBe(true);
    }
  });

  test("ROL and DB1 exist from v2.3", () => {
    for (const name of ["ROL", "DB1"]) {
      expect(name in seg23).toBe(true);
    }
  });
});

describe("re-export versions", () => {
  test("unchanged segments are the very same class as v2.3; a field change gives a subclass of the previous class, which later versions re-export", () => {
    expect(seg231.DSC).toBe(seg23.DSC);
    expect(Object.getPrototypeOf(seg24.DSC)).toBe(seg23.DSC); // DSC-2 is new in 2.4
    expect(Object.getPrototypeOf(seg231.PID)).toBe(seg23.PID); // PID-6, PID-10 and PID-22 repeat in 2.3.1
    expect(Object.getPrototypeOf(seg24.PID)).toBe(seg231.PID); // PID-31 to PID-38 are new in 2.4
    expect(Object.getPrototypeOf(seg24.OBX)).toBe(seg231.OBX); // OBX-18 and OBX-19 are new in 2.4
    expect(Object.getPrototypeOf(seg25.OBX)).toBe(seg24.OBX); // OBX-5's length changes in 2.5 (the table is recorded in the 2.5 spec)
    expect(seg24.NK1).toBe(seg231.NK1); // unchanged through 2.4
    expect(seg25.AL1).toBe(seg24.AL1); // unchanged through 2.5
  });

  test("v2.5.1 builds on v2.5, not v2.3", () => {
    expect(Object.getPrototypeOf(seg251.PID)).toBe(seg25.PID);
    expect(seg251.SFT.prototype).toBeInstanceOf(seg25.SFT);
  });

  test("v2.3.1 and v2.4 generate every message against their own segments; v2.5 re-exports v2.4's parsers and builders where nothing changed", () => {
    expect(par231.parseADT_A01).not.toBe(par23.parseADT_A01);
    expect(par24.parseORU_R01).not.toBe(par231.parseORU_R01); // CTD and FT1 in 2.4
    expect(par25.parseORU_R01).not.toBe(par24.parseORU_R01); // v2.5 ORU^R01 gains SFT, TQ1, SPM, ...
    expect(bld24.createSIU_S12).not.toBe(bld231.createSIU_S12);
    expect(bld25.createSIU_S12).not.toBe(bld24.createSIU_S12); // SFT
  });

  test("ADT has its own shapes in v2.4 (PDA) and v2.5 (SFT), and the wrapper events follow", () => {
    expect(par231.parseADT_A02).not.toBe(par23.parseADT_A02);
    expect(bld24.createADT_A01).not.toBe(bld23.createADT_A01);
    expect(par24.parseADT_A02).not.toBe(par23.parseADT_A02);
    expect(par25.parseADT_A02).not.toBe(par24.parseADT_A02);
    // A34-shaped events keep their shape through v2.4 (generated against the 2.4 segments) and gain SFT in v2.5; SRR/MDM wrappers follow their v2.5 bases.
    expect(par24.parseADT_A47).not.toBe(par231.parseADT_A47);
    expect(par25.parseADT_A47).not.toBe(par24.parseADT_A47);
    expect(par24.parseSRR_S02).not.toBe(par231.parseSRR_S02);
    expect(par25.parseSRR_S02).not.toBe(par24.parseSRR_S02);
    expect(par25.parseMDM_T03).not.toBe(par23.parseMDM_T03);
  });
});

describe("ACK, ORM^O01 and ORR^O02", () => {
  test("v2.3.1 has its own implementations (generated against the 2.3.1 segments)", () => {
    for (const fn of ["parseACK", "parseORM_O01", "parseORR_O02"] as const) {
      expect(par231[fn]).not.toBe(par23[fn]);
    }
  });

  test("v2.4 has its own three (ORM^O01 adds CTD and FT1, ORR^O02 requires the order detail, ACK is generated against the 2.4 MSH)", () => {
    expect(par24.parseACK).not.toBe(par231.parseACK);
    expect(par24.parseORR_O02).not.toBe(par231.parseORR_O02);
    expect(par24.parseORM_O01).not.toBe(par23.parseORM_O01);
    expect(bld24.createORM_O01).not.toBe(bld23.createORM_O01);
  });

  test("v2.5 has its own ACK (SFT, repeating ERR), ORR^O02 (repeating ERR) and ORM^O01 (repeating IN3)", () => {
    expect(par25.parseACK).not.toBe(par23.parseACK);
    expect(par25.parseORR_O02).not.toBe(par23.parseORR_O02);
    expect(par25.parseORM_O01).not.toBe(par24.parseORM_O01);
  });

  test("v2.5.1 has all three (parsers derived from v2.5)", () => {
    for (const fn of ["parseACK", "parseORM_O01", "parseORR_O02"] as const) {
      expect(typeof par251[fn]).toBe("function");
      expect(par251[fn]).not.toBe(par25[fn]);
    }
  });

  test("the order detail and billing segments exist from v2.3; FT1 and CTD too", () => {
    for (const name of ["RQD", "RQ1", "ODS", "ODT", "BLG", "FT1", "CTD"]) {
      expect(name in seg23).toBe(true);
      expect(name in seg251).toBe(true);
    }
  });
});

describe("VXU^V04", () => {
  test("v2.3.1 re-exports v2.3; v2.4 and v2.5 each have their own; v2.5.1 derives from v2.5", () => {
    expect(par231.parseVXU_V04).not.toBe(par23.parseVXU_V04);
    expect(par24.parseVXU_V04).not.toBe(par23.parseVXU_V04);
    expect(par25.parseVXU_V04).not.toBe(par24.parseVXU_V04);
    expect(par251.parseVXU_V04).not.toBe(par25.parseVXU_V04);
    expect(bld24.createVXU_V04).not.toBe(bld23.createVXU_V04);
  });

  test("TQ2 is introduced in v2.5", () => {
    expect("TQ2" in seg24).toBe(false);
    expect("TQ2" in seg25).toBe(true);
    expect("TQ2" in seg251).toBe(true);
  });
});

describe("queries", () => {
  test("the query segments exist from v2.3", () => {
    for (const name of ["QRD", "QRF", "QAK", "DSP", "DSC", "URD", "URS", "EQL", "ERQ", "SPR", "VTQ", "RDF", "RDT"]) {
      expect(name in seg23).toBe(true);
      expect(name in seg251).toBe(true);
    }
  });

  test("v2.3.1 renumbers the enhanced-mode queries and withdraws the Q01 events", () => {
    for (const name of ["EQQ_Q01", "RQQ_Q01", "SPQ_Q01", "VQQ_Q01", "TBR_Q01"]) {
      expect(`create${name}` in bld23).toBe(true);
      expect(`create${name}` in bld231).toBe(false);
      expect(`create${name}` in bld24).toBe(false);
      expect(`create${name}` in bld25).toBe(false);
      expect(`create${name}` in bld251).toBe(false);
    }
    for (const name of ["EQQ_Q04", "RQQ_Q09", "SPQ_Q08", "VQQ_Q07", "TBR_R08"]) {
      expect(`create${name}` in bld23).toBe(false);
      expect(`create${name}` in bld231).toBe(true);
      expect(`create${name}` in bld251).toBe(true);
    }
    expect(bld24.createEQQ_Q04).not.toBe(bld231.createEQQ_Q04); // generated against the 2.4 segments
    expect(bld25.createEQQ_Q04).not.toBe(bld24.createEQQ_Q04); // SFT
  });

  test("UDM^R06 is withdrawn in v2.4; QRY^P04 and DSR^P04 in v2.5", () => {
    expect("createUDM_R06" in bld231).toBe(true);
    expect("createUDM_R06" in bld24).toBe(false);
    expect("createUDM_R06" in bld25).toBe(false);
    expect("createQRY_P04" in bld24).toBe(true);
    expect("createDSR_P04" in bld24).toBe(true);
    for (const name of ["createQRY_P04", "createDSR_P04"]) {
      expect(name in bld25).toBe(false);
      expect(name in bld251).toBe(false);
    }
    expect("createUDM_Q05" in bld251).toBe(true);
  });

  test("messages that change in 2.3.1 (QAK): ADR^A19, ORF^R04/W02, DOC^T12", () => {
    for (const fn of ["parseADR_A19", "parseORF_R04", "parseORF_W02", "parseDOC_T12"] as const) {
      expect(par231[fn]).not.toBe(par23[fn]);
    }
    expect(par231.parseQRY_A19).not.toBe(par23.parseQRY_A19);
    expect(par231.parseSQM_S25).not.toBe(par23.parseSQM_S25);
    // DOC^T12 is then unchanged (v2.5 re-exports v2.4's); ADR^A19 and ORF^R04 change again in v2.4 and v2.5.
    expect(par24.parseDOC_T12).not.toBe(par231.parseDOC_T12);
    expect(par25.parseDOC_T12).toBe(par24.parseDOC_T12);
    expect(par24.parseADR_A19).not.toBe(par231.parseADR_A19);
    expect(par25.parseADR_A19).not.toBe(par24.parseADR_A19);
    expect(par24.parseORF_R04).not.toBe(par231.parseORF_R04);
    expect(par25.parseORF_W02).not.toBe(par24.parseORF_W02);
  });

  test("v2.4 changes VXR^V03 (GT1) and OSR^Q06 (required detail) among the remaining queries; v2.5 adds SFT to nearly all", () => {
    expect(par24.parseVXR_V03).not.toBe(par23.parseVXR_V03);
    expect(par24.parseOSR_Q06).not.toBe(par23.parseOSR_Q06);
    for (const fn of ["parseQRY_Q01", "parseQRY_Q02", "parseDSR_Q01", "parseDSR_Q03", "parseQCK_Q02", "parseUDM_Q05", "parseEDR_R07", "parseERP_R09", "parseSQM_S25", "parseSQR_S25", "parseVXQ_V01", "parseVXX_V02", "parseOSQ_Q06", "parseQRY_T12", "parseQRY_R02"] as const) {
      expect(par24[fn]).not.toBe(par231[fn]); // same structure, generated against the 2.4 segments
    }
    for (const fn of ["parseQRY_Q01", "parseQRY_Q02", "parseDSR_Q01", "parseDSR_Q03", "parseQCK_Q02", "parseUDM_Q05", "parseEDR_R07", "parseERP_R09", "parseSQR_S25", "parseVXQ_V01", "parseVXX_V02", "parseVXR_V03", "parseOSQ_Q06", "parseOSR_Q06", "parseQRY_R02", "parseQRY_A19"] as const) {
      expect(par25[fn]).not.toBe(par24[fn]);
    }
    // SQM^S25 and QRY^T12 never change: v2.5 re-exports v2.4's.
    expect(par25.parseSQM_S25).toBe(par24.parseSQM_S25);
    expect(par25.parseQRY_T12).toBe(par24.parseQRY_T12);
  });

  test("v2.5.1 has every query message of v2.5 (derived, not re-exported)", () => {
    for (const fn of ["parseQRY_A19", "parseADR_A19", "parseQRY_Q01", "parseQRY_Q02", "parseQRY_R02", "parseQCK_Q02", "parseDSR_Q01", "parseDSR_Q03", "parseUDM_Q05", "parseEQQ_Q04", "parseVQQ_Q07", "parseSPQ_Q08", "parseRQQ_Q09", "parseTBR_R08", "parseEDR_R07", "parseERP_R09", "parseSQM_S25", "parseSQR_S25", "parseVXQ_V01", "parseVXX_V02", "parseVXR_V03", "parseORF_R04", "parseORF_W02", "parseOSQ_Q06", "parseOSR_Q06", "parseQRY_T12", "parseDOC_T12"] as const) {
      expect(typeof par251[fn]).toBe("function");
      expect(par251[fn]).not.toBe(par25[fn as keyof typeof par25]);
    }
  });
});

describe("master files", () => {
  test("the master file segments exist from v2.3", () => {
    for (const name of ["MFI", "MFE", "MFA", "CDM", "PRC", "LOC", "LCH", "LRL", "LDP", "LCC", "CM0", "CM1", "CM2", "OM1", "OM2", "OM3", "OM4", "OM5", "OM6"]) {
      expect(name in seg23).toBe(true);
      expect(name in seg251).toBe(true);
    }
  });

  test("MFN and MFD keep their shape through v2.4; MFR gains QAK and MFK/MFQ the M12 event in v2.4", () => {
    for (const fn of ["parseMFN_M01", "parseMFN_M05", "parseMFN_M11", "parseMFK_M01", "parseMFK_M11", "parseMFD_MFA", "parseMFQ_M01", "parseMFQ_M11", "parseMFR_M01", "parseMFR_M05"] as const) {
      expect(par231[fn]).not.toBe(par23[fn]);
    }
    for (const fn of ["parseMFN_M01", "parseMFN_M05", "parseMFN_M11", "parseMFD_MFA"] as const) {
      expect(par24[fn]).not.toBe(par231[fn]); // same structure, generated against the 2.4 segments
    }
    for (const fn of ["parseMFR_M01", "parseMFR_M02", "parseMFR_M05", "parseMFR_M11", "parseMFK_M01", "parseMFK_M11", "parseMFQ_M01", "parseMFQ_M11"] as const) {
      expect(par24[fn]).not.toBe(par23[fn]);
    }
  });

  test("v2.5 has its own master file messages, adds MFN^M13 and withdraws MFD^MFA", () => {
    for (const fn of ["parseMFN_M01", "parseMFN_M04", "parseMFK_M01", "parseMFK_M07", "parseMFQ_M01", "parseMFQ_M11", "parseMFR_M01", "parseMFR_M05"] as const) {
      expect(par25[fn]).not.toBe(par24[fn]);
      expect(typeof par251[fn]).toBe("function");
    }
    expect("createMFN_M13" in bld24).toBe(false);
    expect("createMFN_M13" in bld25).toBe(true);
    // M12 (OM7) arrives in v2.4, M15 (IIM) in v2.5; MFK follows.
    for (const name of ["createMFN_M12", "createMFK_M12", "createMFQ_M12", "createMFR_M12"]) {
      expect(name in bld231).toBe(false);
      expect(name in bld24).toBe(true);
      expect(name in bld251).toBe(true);
    }
    for (const name of ["createMFN_M15", "createMFK_M15"]) {
      expect(name in bld24).toBe(false);
      expect(name in bld25).toBe(true);
      expect(name in bld251).toBe(true);
    }
    expect("createMFK_M13" in bld251).toBe(true);
    expect("createMFD_MFA" in bld24).toBe(true);
    expect("createMFD_MFA" in bld25).toBe(false);
    expect("createMFD_MFA" in bld251).toBe(false);
  });
});

describe("orders and pharmacy", () => {
  test("the pharmacy, diet and supply segments exist from v2.3", () => {
    for (const name of ["RXO", "RXE", "RXD", "RXG", "RXA", "RXR", "RXC", "ODS", "ODT", "RQD", "RQ1", "BLG"]) {
      expect(name in seg23).toBe(true);
      expect(name in seg251).toBe(true);
    }
  });

  test("v2.3.1 renumbers RAS^O02 to O01; v2.4 renumbers everything and withdraws the v2.3 events", () => {
    expect("createRAS_O02" in bld23).toBe(true);
    expect("createRAS_O02" in bld231).toBe(false);
    expect("createRAS_O01" in bld231).toBe(true);
    expect("createRAS_O01" in bld24).toBe(false);
    for (const name of ["OMD_O01", "ORD_O02", "OMS_O01", "ORS_O02", "OMN_O01", "ORN_O02", "RDO_O01", "RRO_O02", "RDE_O01", "RRE_O02", "RDS_O01", "RRD_O02", "RGV_O01", "RRG_O02", "RRA_O02"]) {
      expect(`create${name}` in bld231).toBe(true);
      expect(`create${name}` in bld24).toBe(false);
      expect(`create${name}` in bld251).toBe(false);
    }
    for (const name of ["OMD_O03", "ORD_O04", "OMS_O05", "ORS_O06", "OMN_O07", "ORN_O08", "RDE_O11", "RRE_O12", "RDS_O13", "RRD_O14", "RGV_O15", "RRG_O16", "RAS_O17", "RRA_O18"]) {
      expect(`create${name}` in bld231).toBe(false);
      expect(`create${name}` in bld24).toBe(true);
      expect(`create${name}` in bld25).toBe(true);
      expect(`create${name}` in bld251).toBe(true);
    }
    expect("createRDO_O01" in bld24).toBe(false);
    expect("createRRO_O02" in bld24).toBe(false);
  });

  test("the pharmacy queries keep their shape through v2.4 and gain SFT in v2.5; ORU^W01 wraps R01 only in v2.3", () => {
    for (const fn of ["parseQRY_Q26", "parseQRY_Q30", "parseROR_ROR", "parseRAR_RAR", "parseRDR_RDR", "parseRER_RER", "parseRGR_RGR"] as const) {
      expect(par231[fn]).not.toBe(par23[fn]);
      expect(par24[fn]).not.toBe(par231[fn]);
      expect(par25[fn]).not.toBe(par24[fn]);
      expect(typeof par251[fn]).toBe("function");
    }
    expect(par231.parseORU_W01).not.toBe(par23.parseORU_W01);
    expect(par24.parseORU_W01).not.toBe(par23.parseORU_W01);
    expect(par25.parseORU_W01).not.toBe(par24.parseORU_W01);
    expect(par25.parseRDE_O11).not.toBe(par24.parseRDE_O11);
  });
});

describe("patient care, referrals and the rest", () => {
  test("the problem, goal, pathway, referral, clinical study, product experience and network segments exist from v2.3", () => {
    for (const name of ["PRB", "GOL", "PTH", "VAR", "ROL", "PRD", "CTD", "RF1", "AUT", "CSR", "CSP", "CSS", "PEO", "PES", "PCR", "PSH", "PDC", "FAC", "NCK", "NST", "NSC"]) {
      expect(name in seg23).toBe(true);
      expect(name in seg251).toBe(true);
    }
  });

  test("v2.3.1 adds QAK to the care responses and requires the CSU observations; every version generates its own modules", () => {
    for (const fn of ["parsePRR_PC5", "parsePPV_PCA", "parsePTR_PCF", "parsePPT_PCL", "parseCSU_C09", "parseCSU_C12"] as const) {
      expect(par231[fn]).not.toBe(par23[fn]);
    }
    for (const fn of ["parsePRR_PC5", "parsePPV_PCA", "parsePTR_PCF", "parsePPT_PCL", "parsePPR_PC1", "parsePGL_PC6", "parsePPP_PCB", "parsePPG_PCG", "parseQRY_PC4", "parseRQI_I01", "parseREF_I12", "parseRRI_I12", "parseCRM_C01", "parsePEX_P07", "parseNMQ_N01", "parseNMD_N02"] as const) {
      expect(par231[fn]).not.toBe(par23[fn]);
      expect(par24[fn]).not.toBe(par231[fn]);
    }
  });

  test("v2.4 changes CSU^C09 (optional CSP) and RQC^I05/I06 (repeating GT1); NMR^N01 keeps its shape", () => {
    for (const fn of ["parseCSU_C09", "parseRQC_I06"] as const) {
      expect(par24[fn]).not.toBe(par231[fn]);
      expect(par25[fn]).not.toBe(par24[fn]);
    }
    expect(par231.parseNMR_N01).not.toBe(par23.parseNMR_N01);
    expect(par24.parseNMR_N01).not.toBe(par231.parseNMR_N01);
    expect(par25.parseNMR_N01).not.toBe(par24.parseNMR_N01);
    expect(par24.parseRQC_I05).not.toBe(par23.parseRQC_I05);
  });

  test("v2.5 adds SFT to everything but QRY^PC4 and SUR^P09, which keep the v2.3 shape in every version", () => {
    for (const fn of ["parsePPR_PC1", "parsePRR_PC5", "parseQRY_PC9", "parseRQI_I01", "parseREF_I15", "parseRRI_I12", "parsePIN_I07", "parseCRM_C08", "parsePEX_P08", "parseNMQ_N01", "parseNMD_N02"] as const) {
      expect(par25[fn]).not.toBe(par24[fn]);
      expect(typeof par251[fn]).toBe("function");
    }
    for (const fn of ["parseQRY_PC4", "parseSUR_P09"] as const) {
      expect(par231[fn]).not.toBe(par23[fn]);
      expect(par24[fn]).not.toBe(par231[fn]);
      expect(par25[fn]).toBe(par24[fn]); // v2.5 lists neither, so it re-exports v2.4's
      expect(typeof par251[fn]).toBe("function");
    }
    expect("createQRY_PC9" in bld23).toBe(true);
    expect("createQRY_PC9" in bld251).toBe(true);
  });
});

describe("message registries", () => {
  test("every version maps each of its parsers under its structure name", () => {
    for (const [par, count] of [[par23, 276], [par231, 276], [par24, 334], [par25, 340], [par251, 340]] as const) {
      const names = Object.keys(par.MESSAGES);
      expect(names).toHaveLength(count);
      for (const name of names) {
        expect(par.MESSAGES[name as keyof typeof par.MESSAGES]).toBe(par[`parse${name}` as keyof typeof par]);
      }
    }
    expect(par231.MESSAGES.ADT_A01).not.toBe(par23.MESSAGES.ADT_A01);
    expect(par24.MESSAGES.ACK).not.toBe(par231.MESSAGES.ACK);
    expect(par24.MESSAGES.OML_O21).toBe(par24.parseOML_O21); // new in 2.4
    expect(par25.MESSAGES.ACK).not.toBe(par23.MESSAGES.ACK);
  });
});
