/** The v2.5 pharmacy shapes: SFT, TIMING after ORC, TIMING_ENCODED after RXE, TIMING_GIVE after RXG, COMPONENT groups, grouped administrations, repeating ERR in the acknowledgments and query responses. */
import { describe, test, expect } from "vitest";
import { createRDE_O11 } from "./RDE_O11.ts";
import { createRGV_O15 } from "./RGV_O15.ts";
import { createRAS_O17 } from "./RAS_O17.ts";
import { createRRE_O12 } from "./RRE_O12.ts";
import { createRAR_RAR } from "./RAR_RAR.ts";
import { createOMD_O03 } from "./OMD_O03.ts";
import { createORU_W01 } from "./ORU_W01.ts";
import { parseRDE_O11 } from "../../parsers/v2.5/RDE_O11_Parser.ts";
import { parseRGV_O15 } from "../../parsers/v2.5/RGV_O15_Parser.ts";
import { parseRAS_O17 } from "../../parsers/v2.5/RAS_O17_Parser.ts";
import { parseRRE_O12 } from "../../parsers/v2.5/RRE_O12_Parser.ts";
import { parseRAR_RAR } from "../../parsers/v2.5/RAR_RAR_Parser.ts";
import { parseOMD_O03 } from "../../parsers/v2.5/OMD_O03_Parser.ts";
import { parseORU_W01 } from "../../parsers/v2.5/ORU_W01_Parser.ts";
import { parseRDE_O11 as parseRDE_O11_v24 } from "../../parsers/v2.4/RDE_O11_Parser.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { MSA } from "../../segments/v2.5/MSA.ts";
import { ERR } from "../../segments/v2.5/ERR.ts";
import { NTE } from "../../segments/v2.5/NTE.ts";
import { PID } from "../../segments/v2.5/PID.ts";
import { ORC } from "../../segments/v2.5/ORC.ts";
import { TQ1 } from "../../segments/v2.5/TQ1.ts";
import { TQ2 } from "../../segments/v2.5/TQ2.ts";
import { RXO } from "../../segments/v2.5/RXO.ts";
import { RXE } from "../../segments/v2.5/RXE.ts";
import { RXG } from "../../segments/v2.5/RXG.ts";
import { RXA } from "../../segments/v2.5/RXA.ts";
import { RXR } from "../../segments/v2.5/RXR.ts";
import { RXC } from "../../segments/v2.5/RXC.ts";
import { ODS } from "../../segments/v2.5/ODS.ts";
import { ODT } from "../../segments/v2.5/ODT.ts";
import { OBR } from "../../segments/v2.5/OBR.ts";
import { OBX } from "../../segments/v2.5/OBX.ts";
import { SPM } from "../../segments/v2.5/SPM.ts";
import { QRD } from "../../segments/v2.5/QRD.ts";
import { BLG } from "../../segments/v2.5/BLG.ts";

const msh = (type: string, event: string) => new MSH().messageType({ messageCode: type, triggerEvent: event }).messageControlId("P1");
const msa = () => new MSA().acknowledgmentCode("AA").messageControlId("P1");
const orc = () => new ORC().orderControl("NW");
const rxr = () => new RXR().route({ code: "PO" });
const tq1 = (n: string) => new TQ1().setId(n);
const names = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));

describe("pharmacy (v2.5)", () => {
  test("RDE^O11 gains SFT, the timing groups, RXE notes, COMPONENT groups, FT1 and BLG", () => {
    const msg = createRDE_O11(msh("RDE", "O11"), [{
      commonOrder: orc(),
      timings: [{ timing: tq1("1"), timingRelationships: [new TQ2()] }],
      detail: { pharmacyOrder: new RXO(), routes: [rxr()], components: [{ component: new RXC(), notes: [new NTE()] }, { component: new RXC() }] },
      encodedOrder: new RXE(),
      notes: [new NTE()],
      encodedTimings: [{ timing: tq1("1") }],
      routes: [rxr()],
      billing: new BLG(),
    }], { software: [new SFT()] });
    const wire = msg.encode();
    expect(names(wire)).toEqual(["MSH", "SFT", "ORC", "TQ1", "TQ2", "RXO", "RXR", "RXC", "NTE", "RXC", "RXE", "NTE", "TQ1", "RXR", "BLG"]);
    const parsed = parseRDE_O11(wire).val!;
    expect(parsed.orders[0].timings![0].timingRelationships).toHaveLength(1);
    expect(parsed.orders[0].detail!.components).toHaveLength(2);
    expect(parsed.orders[0].detail!.components![0].notes).toHaveLength(1);
    expect(parsed.orders[0].encodedTimings).toHaveLength(1);
    expect(parsed.message.encode()).toBe(wire);
    // @ts-expect-error the encoded timing is required
    expect(createRDE_O11(msh("RDE", "O11"), [{ commonOrder: orc(), encodedOrder: new RXE(), routes: [rxr()] }]).verify().errors).toEqual(["ORDER group 1: At least one TIMING ENCODED group (TQ1) is required"]);
    // In v2.4 the components are one RXC list followed by its notes, so the second RXC stops the detail before the RXE.
    expect(parseRDE_O11_v24(wire).err!.message).toBe("RDE_O11 message must contain an RXE segment");
  });

  test("RGV^O15 gives carry a required TIMING_GIVE; RAS^O17 groups its administrations", () => {
    const rgv = createRGV_O15(msh("RGV", "O15"), [{ commonOrder: orc(), gives: [{ give: new RXG(), giveTimings: [{ timing: tq1("1") }], routes: [rxr()], observations: [] }] }]).encode();
    expect(names(rgv)).toEqual(["MSH", "ORC", "RXG", "TQ1", "RXR"]);
    expect(parseRGV_O15(rgv).val!.orders[0].gives[0].giveTimings).toHaveLength(1);

    const ras = createRAS_O17(msh("RAS", "O17"), [{
      commonOrder: orc(),
      administrations: [
        { administrations: [new RXA(), new RXA()], route: rxr(), observations: [{ observation: new OBX().setId("1") }] },
        { administrations: [new RXA()], route: rxr() },
      ],
    }]).encode();
    expect(names(ras)).toEqual(["MSH", "ORC", "RXA", "RXA", "RXR", "OBX", "RXA", "RXR"]);
    const parsed = parseRAS_O17(ras).val!;
    expect(parsed.orders[0].administrations).toHaveLength(2);
    expect(parsed.orders[0].administrations[0].observations).toHaveLength(1);
  });

  test("acknowledgments and query responses: ERR repeats before SFT; the orders carry timings", () => {
    const rre = createRRE_O12(msh("RRE", "O12"), msa(), { errors: [new ERR(), new ERR()], software: [new SFT()], orders: [{ commonOrder: orc(), timings: [{ timing: tq1("1") }], encodedOrder: new RXE(), encodedTimings: [{ timing: tq1("2") }], routes: [rxr()] }] }).encode();
    expect(names(rre)).toEqual(["MSH", "MSA", "ERR", "ERR", "SFT", "ORC", "TQ1", "RXE", "TQ1", "RXR"]);
    const parsed = parseRRE_O12(rre).val!;
    expect(parsed.errors).toHaveLength(2);
    expect(parsed.orders![0].timings).toHaveLength(1);
    expect(parsed.orders![0].encodedTimings).toHaveLength(1);

    const rar = createRAR_RAR(msh("RAR", "RAR"), msa(), [{ query: new QRD().queryFormatCode("R").queryPriority("I").queryId("Q1"), orders: [{ commonOrder: orc(), administrations: [new RXA()], route: rxr() }] }], { software: [new SFT()] }).encode();
    expect(names(rar)).toEqual(["MSH", "MSA", "SFT", "QRD", "ORC", "RXA", "RXR"]);
    expect(parseRAR_RAR(rar).val!.definitions[0].orders[0].administrations).toHaveLength(1);
  });

  test("OMD^O03 diet and tray orders carry their own timing groups; ORU^W01 gains SFT and specimens", () => {
    const omd = createOMD_O03(msh("OMD", "O03"), [{ commonOrder: orc(), timings: [{ timing: tq1("1") }], diets: [new ODS()] }], { trayOrders: [{ commonOrder: orc(), timings: [{ timing: tq1("2") }], dietTrays: [new ODT()] }] }).encode();
    expect(names(omd)).toEqual(["MSH", "ORC", "TQ1", "ODS", "ORC", "TQ1", "ODT"]);
    expect(parseOMD_O03(omd).val!.dietOrders[0].timings).toHaveLength(1);

    const oru = createORU_W01(msh("ORU", "W01"), [{ patient: new PID().setId("1"), orderObservations: [{ observationRequest: new OBR().setId("1"), observations: [{ observation: new OBX().setId("1").valueType("NA") }], specimens: [{ specimen: new SPM(), observations: [new OBX().setId("2")] }] }] }], { software: [new SFT()] }).encode();
    expect(names(oru)).toEqual(["MSH", "SFT", "PID", "OBR", "OBX", "SPM", "OBX"]);
    expect(parseORU_W01(oru).val!.patientResults[0].orderObservations[0].specimens![0].observations).toHaveLength(1);
  });
});
