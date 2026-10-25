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
    // EDU gains EDU-9 in v2.5, so v2.5 has its own subclass; the others are re-exported.
    expect(seg25.ORG).toBe(seg24.ORG);
    expect(Object.getPrototypeOf(seg25.EDU)).toBe(seg24.EDU);
  });

  test("CER is introduced in v2.5", () => {
    for (const name of ["CER"]) {
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
  test("unchanged segments are the very same class as v2.3", () => {
    expect(seg231.PID).toBe(seg23.PID);
    expect(seg24.PID).toBe(seg23.PID);
    expect(seg25.OBX).toBe(seg23.OBX);
  });

  test("v2.5.1 builds on v2.5, not v2.3", () => {
    expect(Object.getPrototypeOf(seg251.PID)).toBe(seg25.PID);
    expect(seg251.SFT.prototype).toBeInstanceOf(seg25.SFT);
  });

  test("parsers and builders are re-exported", () => {
    expect(par231.parseADT_A01).toBe(par23.parseADT_A01);
    expect(par24.parseORU_R01).toBe(par23.parseORU_R01);
    expect(par25.parseORU_R01).not.toBe(par23.parseORU_R01); // v2.5 ORU^R01 gains SFT, TQ1, SPM, ...
    expect(bld24.createSIU_S12).toBe(bld23.createSIU_S12);
  });

  test("ADT has its own shapes in v2.4 (PDA) and v2.5 (SFT), and the wrapper events follow", () => {
    expect(par231.parseADT_A02).toBe(par23.parseADT_A02);
    expect(bld24.createADT_A01).not.toBe(bld23.createADT_A01);
    expect(par24.parseADT_A02).not.toBe(par23.parseADT_A02);
    expect(par25.parseADT_A02).not.toBe(par24.parseADT_A02);
    // A34-shaped events change only in v2.5 (SFT); SRR/MDM wrappers follow their v2.5 bases.
    expect(par24.parseADT_A47).toBe(par23.parseADT_A47);
    expect(par25.parseADT_A47).not.toBe(par23.parseADT_A47);
    expect(par24.parseSRR_S02).toBe(par23.parseSRR_S02);
    expect(par25.parseSRR_S02).not.toBe(par23.parseSRR_S02);
    expect(par25.parseMDM_T03).not.toBe(par23.parseMDM_T03);
  });
});

describe("ACK, ORM^O01 and ORR^O02", () => {
  test("v2.3.1 re-exports the v2.3 implementations", () => {
    for (const fn of ["parseACK", "parseORM_O01", "parseORR_O02"] as const) {
      expect(par231[fn]).toBe(par23[fn]);
    }
  });

  test("v2.4 changes only ORM^O01 (adds CTD and FT1); ACK and ORR^O02 are v2.3's", () => {
    expect(par24.parseACK).toBe(par23.parseACK);
    expect(par24.parseORR_O02).toBe(par23.parseORR_O02);
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
    expect(par231.parseVXU_V04).toBe(par23.parseVXU_V04);
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
    expect(bld24.createEQQ_Q04).toBe(bld231.createEQQ_Q04);
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
    expect(par231.parseQRY_A19).toBe(par23.parseQRY_A19);
    expect(par231.parseSQM_S25).toBe(par23.parseSQM_S25);
    // DOC^T12 is then unchanged; ADR^A19 and ORF^R04 change again in v2.4 and v2.5.
    expect(par24.parseDOC_T12).toBe(par231.parseDOC_T12);
    expect(par25.parseDOC_T12).toBe(par231.parseDOC_T12);
    expect(par24.parseADR_A19).not.toBe(par231.parseADR_A19);
    expect(par25.parseADR_A19).not.toBe(par24.parseADR_A19);
    expect(par24.parseORF_R04).not.toBe(par231.parseORF_R04);
    expect(par25.parseORF_W02).not.toBe(par24.parseORF_W02);
  });

  test("v2.4 changes VXR^V03 (GT1) and OSR^Q06 (required detail) among the remaining queries; v2.5 adds SFT to nearly all", () => {
    expect(par24.parseVXR_V03).not.toBe(par23.parseVXR_V03);
    expect(par24.parseOSR_Q06).not.toBe(par23.parseOSR_Q06);
    for (const fn of ["parseQRY_Q01", "parseQRY_Q02", "parseDSR_Q01", "parseDSR_Q03", "parseQCK_Q02", "parseUDM_Q05", "parseEDR_R07", "parseERP_R09", "parseSQM_S25", "parseSQR_S25", "parseVXQ_V01", "parseVXX_V02", "parseOSQ_Q06", "parseQRY_T12", "parseQRY_R02"] as const) {
      expect(par24[fn]).toBe(par23[fn]);
    }
    for (const fn of ["parseQRY_Q01", "parseQRY_Q02", "parseDSR_Q01", "parseDSR_Q03", "parseQCK_Q02", "parseUDM_Q05", "parseEDR_R07", "parseERP_R09", "parseSQR_S25", "parseVXQ_V01", "parseVXX_V02", "parseVXR_V03", "parseOSQ_Q06", "parseOSR_Q06", "parseQRY_R02", "parseQRY_A19"] as const) {
      expect(par25[fn]).not.toBe(par24[fn]);
    }
    // SQM^S25 and QRY^T12 never change.
    expect(par25.parseSQM_S25).toBe(par23.parseSQM_S25);
    expect(par25.parseQRY_T12).toBe(par23.parseQRY_T12);
  });

  test("v2.5.1 has every query message of v2.5 (derived, not re-exported)", () => {
    for (const fn of ["parseQRY_A19", "parseADR_A19", "parseQRY_Q01", "parseQRY_Q02", "parseQRY_R02", "parseQCK_Q02", "parseDSR_Q01", "parseDSR_Q03", "parseUDM_Q05", "parseEQQ_Q04", "parseVQQ_Q07", "parseSPQ_Q08", "parseRQQ_Q09", "parseTBR_R08", "parseEDR_R07", "parseERP_R09", "parseSQM_S25", "parseSQR_S25", "parseVXQ_V01", "parseVXX_V02", "parseVXR_V03", "parseORF_R04", "parseORF_W02", "parseOSQ_Q06", "parseOSR_Q06", "parseQRY_T12", "parseDOC_T12"] as const) {
      expect(typeof par251[fn]).toBe("function");
      expect(par251[fn]).not.toBe(par25[fn as keyof typeof par25]);
    }
  });
});
