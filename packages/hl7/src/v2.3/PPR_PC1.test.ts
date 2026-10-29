/** The patient care messages of HL7 v2.3: PPR (problems), PGL (goals), PPP/PPG (pathways), their query responses and QRY^PC4–PCK. */
import { describe, test, expect } from "vitest";
import { createPPR_PC1, PPR_PC1 } from "./PPR_PC1.ts";
import { createPPR_PC2 } from "./PPR_PC2.ts";
import { createPGL_PC6, PGL_PC6 } from "./PGL_PC6.ts";
import { createPPP_PCB, PPP_PCB } from "./PPP_PCB.ts";
import { createPPG_PCG, PPG_PCG } from "./PPG_PCG.ts";
import { createPRR_PC5, PRR_PC5 } from "./PRR_PC5.ts";
import { createPPT_PCL } from "./PPT_PCL.ts";
import { createQRY_PC4, QRY_PC4 } from "./QRY_PC4.ts";
import { createQRY_PCK } from "./QRY_PCK.ts";
import { parsePPR_PC1 } from "./PPR_PC1.ts";
import { parsePGL_PC6 } from "./PGL_PC6.ts";
import { parsePPP_PCB } from "./PPP_PCB.ts";
import { parsePPG_PCG } from "./PPG_PCG.ts";
import { parsePRR_PC5 } from "./PRR_PC5.ts";
import { parsePPT_PCL } from "./PPT_PCL.ts";
import { MSH } from "./MSH.ts";
import { MSA } from "./MSA.ts";
import { PID } from "./PID.ts";
import { PV1 } from "./PV1.ts";
import { PRB } from "./PRB.ts";
import { GOL } from "./GOL.ts";
import { PTH } from "./PTH.ts";
import { VAR } from "./VAR.ts";
import { ROL } from "./ROL.ts";
import { NTE } from "./NTE.ts";
import { OBX } from "./OBX.ts";
import { ORC } from "./ORC.ts";
import { OBR } from "./OBR.ts";
import { QRD } from "./QRD.ts";

const msh = (type: string, event: string) => new MSH().messageType({ messageCode: type, triggerEvent: event }).messageControlId("C1");
const qrd = () => new QRD().queryFormatCode("R").queryPriority("I").queryId("Q1");
const names = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));
const problem = () => ({
  problem: new PRB().actionCode("AD"),
  notes: [new NTE()],
  variances: [new VAR()],
  roles: [{ role: new ROL(), variances: [new VAR()] }],
  observations: [{ observation: new OBX().setId("1"), notes: [new NTE()] }],
});
const order = () => ({ commonOrder: new ORC().orderControl("NW"), detail: { segment: new OBR().setId("1"), notes: [new NTE()], variances: [new VAR()], observations: [{ observation: new OBX().setId("2"), variances: [new VAR()] }] } });

describe("patient care (v2.3)", () => {
  test("PPR^PC1: problems with roles, pathways, observations, goals and orders", () => {
    const msg = createPPR_PC1(msh("PPR", "PC1"), new PID().setId("1"), [
      { ...problem(), pathways: [{ pathway: new PTH().actionCode("AD"), variances: [new VAR()] }], goals: [{ goal: new GOL().actionCode("AD"), roles: [{ role: new ROL() }], observations: [{ observation: new OBX().setId("3") }] }], orders: [order()] },
      { problem: new PRB().actionCode("UP") },
    ], { visit: new PV1().patientClass("I") });
    expect(msg).toBeInstanceOf(PPR_PC1);
    const wire = msg.encode();
    expect(names(wire)).toEqual(["MSH", "PID", "PV1", "PRB", "NTE", "VAR", "ROL", "VAR", "PTH", "VAR", "OBX", "NTE", "GOL", "ROL", "OBX", "ORC", "OBR", "NTE", "VAR", "OBX", "VAR", "PRB"]);
    const parsed = parsePPR_PC1(wire).val!;
    expect(parsed.problems).toHaveLength(2);
    const first = parsed.problems[0];
    expect(first.roles![0].variances).toHaveLength(1);
    expect(first.pathways).toHaveLength(1);
    expect(first.goals![0].observations).toHaveLength(1);
    expect(first.orders![0].detail!.segment.name).toBe("OBR");
    expect(first.orders![0].detail!.observations![0].variances).toHaveLength(1);
    expect(parsed.problems[1].goals).toEqual([]);
    expect(parsed.message.encode()).toBe(wire);
    expect(createPPR_PC2(msh("PPR", "PC2"), new PID(), [{ problem: new PRB() }])).toBeInstanceOf(PPR_PC1);
    // @ts-expect-error a problem needs its PRB
    expect(createPPR_PC1(msh("PPR", "PC1"), new PID(), [{ notes: [] }]).verify().errors).toEqual(["PROBLEM group 1: PRB segment is required"]);
  });

  test("PGL^PC6 nests problems under goals; PPP^PCB and PPG^PCG nest both under pathways", () => {
    const pgl = createPGL_PC6(msh("PGL", "PC6"), new PID().setId("1"), [{ goal: new GOL(), pathways: [{ pathway: new PTH() }], problems: [{ ...problem() }], orders: [order()] }]);
    expect(pgl).toBeInstanceOf(PGL_PC6);
    expect(names(pgl.encode())).toEqual(["MSH", "PID", "GOL", "PTH", "PRB", "NTE", "VAR", "ROL", "VAR", "OBX", "NTE", "ORC", "OBR", "NTE", "VAR", "OBX", "VAR"]);
    expect(parsePGL_PC6(pgl.encode()).val!.goals[0].problems![0].observations).toHaveLength(1);

    const ppp = createPPP_PCB(msh("PPP", "PCB"), new PID().setId("1"), [{ pathway: new PTH(), notes: [new NTE()], roles: [{ role: new ROL() }], problems: [{ problem: new PRB(), goals: [{ goal: new GOL() }], orders: [order()] }] }]);
    expect(ppp).toBeInstanceOf(PPP_PCB);
    expect(names(ppp.encode())).toEqual(["MSH", "PID", "PTH", "NTE", "ROL", "PRB", "GOL", "ORC", "OBR", "NTE", "VAR", "OBX", "VAR"]);
    expect(parsePPP_PCB(ppp.encode()).val!.pathways[0].problems![0].goals).toHaveLength(1);

    const ppg = createPPG_PCG(msh("PPG", "PCG"), new PID().setId("1"), [{ pathway: new PTH(), goals: [{ goal: new GOL(), problems: [{ problem: new PRB() }], orders: [order()] }] }]);
    expect(ppg).toBeInstanceOf(PPG_PCG);
    expect(names(ppg.encode())).toEqual(["MSH", "PID", "PTH", "GOL", "PRB", "ORC", "OBR", "NTE", "VAR", "OBX", "VAR"]);
    expect(parsePPG_PCG(ppg.encode()).val!.pathways[0].goals![0].problems).toHaveLength(1);
  });

  test("the responses carry PATIENT groups after MSA [ERR] QRD", () => {
    const prr = createPRR_PC5(msh("PRR", "PC5"), new MSA().acknowledgmentCode("AA").messageControlId("Q1"), qrd(), [
      { patient: new PID().setId("1"), visit: new PV1(), problems: [{ problem: new PRB() }] },
      { patient: new PID().setId("2"), problems: [{ problem: new PRB() }, { problem: new PRB() }] },
    ]);
    expect(prr).toBeInstanceOf(PRR_PC5);
    const wire = prr.encode();
    expect(names(wire)).toEqual(["MSH", "MSA", "QRD", "PID", "PV1", "PRB", "PID", "PRB", "PRB"]);
    const parsed = parsePRR_PC5(wire).val!;
    expect(parsed.patients).toHaveLength(2);
    expect(parsed.patients[1].problems).toHaveLength(2);
    expect(parsed.message.encode()).toBe(wire);

    const ppt = createPPT_PCL(msh("PPT", "PCL"), new MSA().acknowledgmentCode("AA").messageControlId("Q1"), qrd(), [{ patient: new PID(), pathways: [{ pathway: new PTH(), goals: [{ goal: new GOL() }] }] }]).encode();
    expect(names(ppt)).toEqual(["MSH", "MSA", "QRD", "PID", "PTH", "GOL"]);
    expect(parsePPT_PCL(ppt).val!.patients[0].pathways[0].goals).toHaveLength(1);
    // @ts-expect-error at least one patient is required
    expect(new PRR_PC5(msh("PRR", "PC5"), new MSA(), undefined, []).verify().errors).toEqual(["QRD segment is required", "At least one PATIENT group (PID) is required"]);
  });

  test("QRY^PC4 is MSH QRD [QRF]; PC9, PCE and PCK wrap it", () => {
    expect(createQRY_PC4(msh("QRY", "PC4"), qrd())).toBeInstanceOf(QRY_PC4);
    expect(createQRY_PCK(msh("QRY", "PCK"), qrd())).toBeInstanceOf(QRY_PC4);
    expect(names(createQRY_PC4(msh("QRY", "PC4"), qrd()).encode())).toEqual(["MSH", "QRD"]);
  });
});
