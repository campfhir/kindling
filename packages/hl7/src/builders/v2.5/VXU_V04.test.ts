import { describe, test, expect } from "vitest";
import { VXU_V04, createVXU_V04 } from "./VXU_V04.ts";
import { parseVXU_V04 } from "../../parsers/v2.5/VXU_V04_Parser.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { PID } from "../../segments/v2.5/PID.ts";
import { PV1 } from "../../segments/v2.5/PV1.ts";
import { GT1 } from "../../segments/v2.5/GT1.ts";
import { IN1 } from "../../segments/v2.5/IN1.ts";
import { ORC } from "../../segments/v2.5/ORC.ts";
import { TQ1 } from "../../segments/v2.5/TQ1.ts";
import { TQ2 } from "../../segments/v2.5/TQ2.ts";
import { RXA } from "../../segments/v2.5/RXA.ts";
import { RXR } from "../../segments/v2.5/RXR.ts";
import { OBX } from "../../segments/v2.5/OBX.ts";
import { NTE } from "../../segments/v2.5/NTE.ts";

const makeMSH = () => new MSH().messageType({ messageCode: "VXU", triggerEvent: "V04" }).messageControlId("V1");
const makePID = () => new PID().setId("1");
const makeRXA = (n = "1") => new RXA().giveSubIdCounter("0").administrationSubIdCounter(n).administeredCode({ code: "08", text: "Hep B" });
const makeORC = () => new ORC().orderControl("RE");
const names = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));
const msh = () => makeMSH().encode();

function fullMessage() {
  return createVXU_V04(makeMSH(), makePID(), {
    software: [new SFT(), new SFT()],
    visit: new PV1().patientClass("O"),
    guarantors: [new GT1().setId("1")],
    insurances: [{ insurance: new IN1().setId("1") }],
    orders: [
      {
        commonOrder: makeORC(),
        timings: [
          { timing: new TQ1().setId("1"), timingRelationships: [new TQ2().setId("1"), new TQ2().setId("2")] },
          { timing: new TQ1().setId("2") },
        ],
        administration: makeRXA("1"),
        route: new RXR().route({ code: "IM" }),
        observations: [{ observation: new OBX().setId("1").valueType("CE"), notes: [new NTE().setId("1").comment("n")] }],
      },
      { commonOrder: makeORC(), administration: makeRXA("2") },
    ],
  });
}

describe("VXU_V04 builder (v2.5)", () => {
  test("a minimal message is MSH + PID", () => {
    expect(names(createVXU_V04(makeMSH(), makePID()).encode())).toEqual(["MSH", "PID"]);
    expect(createVXU_V04(makeMSH(), makePID())).toBeInstanceOf(VXU_V04);
  });

  test("encodes SFT first and the timing group between ORC and RXA", () => {
    expect(names(fullMessage().encode())).toEqual([
      "MSH", "SFT", "SFT", "PID", "PV1", "GT1", "IN1",
      "ORC", "TQ1", "TQ2", "TQ2", "TQ1", "RXA", "RXR", "OBX", "NTE",
      "ORC", "RXA",
    ]);
  });

  test("verify() requires the ORC and RXA of every order and the TQ1 of every timing group", () => {
    const msg = new VXU_V04(makeMSH(), makePID(), {
      // @ts-expect-error missing required segments
      orders: [{ administration: makeRXA() }, { commonOrder: makeORC() }, { commonOrder: makeORC(), administration: makeRXA(), timings: [{ timingRelationships: [] }] }],
    });
    expect(msg.verify().errors).toEqual([
      "ORDER group 1: ORC segment is required",
      "ORDER group 2: RXA segment is required",
      "ORDER group 3: TIMING group 1: TQ1 segment is required",
    ]);
    expect(() => msg.encode()).toThrow(/ORC segment is required/);
  });
});

describe("VXU_V04 parser (v2.5)", () => {
  test("round-trips a full message", () => {
    const wire = fullMessage().encode();
    const result = parseVXU_V04(wire);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const { val } = result;
    expect(val.software).toHaveLength(2);
    expect(val.guarantors).toHaveLength(1);
    expect(val.orders).toHaveLength(2);
    expect(val.orders![0].commonOrder).toBeInstanceOf(ORC);
    expect(val.orders![0].timings!.map((t) => t.timingRelationships!.length)).toEqual([2, 0]);
    expect(val.orders![0].timings![0].timing).toBeInstanceOf(TQ1);
    expect(val.orders![0].timings![0].timingRelationships![0]).toBeInstanceOf(TQ2);
    expect(val.orders![0].administration).toBeInstanceOf(RXA);
    expect(val.orders![0].observations![0].notes).toHaveLength(1);
    expect(val.orders![1].timings).toEqual([]);
    expect(val.message.segments).toHaveLength(wire.split("\r").length);
  });

  test("the vaccination groups are optional", () => {
    const result = parseVXU_V04([msh(), "PID|1"].join("\r"));
    expect(result.ok).toBe(true);
  });

  test.each([
    ["empty", ""],
    ["no PID", msh()],
    ["an RXA without an ORC (ORC is required in v2.5)", [msh(), "PID|1", "RXA|0|1"].join("\r")],
    ["a second RXA without a new ORC", [msh(), "PID|1", "ORC|RE", "RXA|0|1", "RXA|0|2"].join("\r")],
    ["an ORC with no RXA at the end", [msh(), "PID|1", "ORC|RE"].join("\r")],
    ["an ORC with no RXA before the next group", [msh(), "PID|1", "ORC|RE", "ORC|RE", "RXA|0|1"].join("\r")],
    ["TQ1 without an ORC", [msh(), "PID|1", "TQ1|1"].join("\r")],
    ["TQ1 after the RXA", [msh(), "PID|1", "ORC|RE", "RXA|0|1", "TQ1|1"].join("\r")],
    ["TQ2 without a TQ1", [msh(), "PID|1", "ORC|RE", "TQ2|1", "RXA|0|1"].join("\r")],
    ["SFT after PID", [msh(), "PID|1", "SFT|x"].join("\r")],
    ["RXR without RXA", [msh(), "PID|1", "ORC|RE", "RXR|IM"].join("\r")],
    ["NTE without OBX", [msh(), "PID|1", "ORC|RE", "RXA|0|1", "NTE|1"].join("\r")],
  ])("rejects: %s", (_label, wire) => {
    expect(parseVXU_V04(wire).ok).toBe(false);
  });
});
