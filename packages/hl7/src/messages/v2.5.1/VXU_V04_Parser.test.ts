// v2.5.1 VXU^V04: identical to v2.5; codegen overrides each segment parse so results are
// v2.5.1 segment classes.
import { test, expect } from "vitest";
import { parseVXU_V04 } from "./VXU_V04.ts";
import { createVXU_V04 } from "../v2.5.1/VXU_V04.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { SFT } from "../../segments/v2.5.1/SFT.ts";
import { PID } from "../../segments/v2.5.1/PID.ts";
import { ORC } from "../../segments/v2.5.1/ORC.ts";
import { TQ1 } from "../../segments/v2.5.1/TQ1.ts";
import { TQ2 } from "../../segments/v2.5.1/TQ2.ts";
import { RXA } from "../../segments/v2.5.1/RXA.ts";

test("parses SFT and the timing group into v2.5.1 classes", () => {
  const wire = createVXU_V04(new MSH().messageType({ messageCode: "VXU", triggerEvent: "V04" }), new PID().setId("1"), {
    software: [new SFT()],
    orders: [{
      commonOrder: new ORC().orderControl("RE"),
      timings: [{ timing: new TQ1().setId("1"), timingRelationships: [new TQ2().setId("1")] }],
      administration: new RXA().giveSubIdCounter("0").administrationSubIdCounter("1"),
    }],
  }).encode();
  const result = parseVXU_V04(wire);
  expect(result.ok).toBe(true);
  if (!result.ok) return;
  expect(result.val.software![0]).toBeInstanceOf(SFT);
  expect(result.val.patient).toBeInstanceOf(PID);
  expect(result.val.orders![0].timings![0].timing).toBeInstanceOf(TQ1);
  expect(result.val.orders![0].timings![0].timingRelationships![0]).toBeInstanceOf(TQ2);
  expect(result.val.orders![0].administration).toBeInstanceOf(RXA);
});

test("still requires the ORC", () => {
  const msh = new MSH().messageType({ messageCode: "VXU", triggerEvent: "V04" }).encode();
  expect(parseVXU_V04([msh, "PID|1", "RXA|0|1"].join("\r")).ok).toBe(false);
});
