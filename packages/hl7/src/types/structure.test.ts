import { describe, test, expect } from "vitest";
import { parseStructure, verifyStructure, encodeStructure, type SegmentParsers } from "./structure.ts";
import type { StructureItem } from "./schema.ts";
import { itemField, firstSegments, isRequired } from "./schema.ts";
import { DEFAULT_ENCODING } from "./encoding.ts";
import { MSH } from "../segments/v2.3/MSH.ts";
import { EVN } from "../segments/v2.3/EVN.ts";
import { PID } from "../segments/v2.3/PID.ts";
import { PV1 } from "../segments/v2.3/PV1.ts";
import { PV2 } from "../segments/v2.3/PV2.ts";
import { NTE } from "../segments/v2.3/NTE.ts";
import { OBR } from "../segments/v2.3/OBR.ts";
import { OBX } from "../segments/v2.3/OBX.ts";
import { ORC } from "../segments/v2.3/ORC.ts";
import { RQD } from "../segments/v2.3/RQD.ts";
import { DG1 } from "../segments/v2.3/DG1.ts";

const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  RQD: (s, e) => RQD.parse(s, e),
  DG1: (s, e) => DG1.parse(s, e),
};
const MSH_LINE = "MSH|^~\\&|APP|FAC|APP2|FAC2|20231015120000||ORU^R01|MSG1|P|2.3";
const wire = (...lines: string[]) => [MSH_LINE, ...lines].join("\r");
const names = (v: { message: { segments: { name: string }[] } }) => v.message.segments.map((s) => s.name);

// MSH {PATIENT_RESULT: [PATIENT: PID [{NTE}] [PV1]] {ORDER: [ORC] <OBR|RQD> [{NTE}] {OBSERVATION: [OBX] [{NTE}]} [{DG1}]}}
const STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  {
    name: "PATIENT_RESULT", required: true, repeating: true,
    segments: [
      { name: "PATIENT", required: false, repeating: false, segments: [
        { name: "PID", required: true, repeating: false },
        { name: "NTE", required: false, repeating: true },
        { name: "PV1", required: false, repeating: false },
      ] },
      { name: "ORDER", required: true, repeating: true, as: "orders", segments: [
        { name: "ORC", required: false, repeating: false },
        { oneOf: ["OBR", "RQD"], required: true, as: "detail" },
        { name: "NTE", required: false, repeating: true },
        { name: "OBSERVATION", required: true, repeating: true, segments: [
          { name: "OBX", required: false, repeating: false },
          { name: "NTE", required: false, repeating: true },
        ] },
        { name: "DG1", required: false, repeating: true },
      ] },
    ],
  },
];

describe("schema helpers", () => {
  test("field names, first segments and effective requiredness", () => {
    expect(itemField({ name: "NTE", required: false, repeating: true })).toBe("notes");
    expect(itemField({ name: "ZPD", required: false, repeating: true })).toBe("zpdList");
    expect(itemField({ name: "PATIENT_RESULT", required: true, repeating: true, segments: [] })).toBe("patientResults");
    expect(itemField({ name: "RESOURCES", required: true, repeating: true, segments: [] })).toBe("resources");
    expect(itemField({ oneOf: ["OBR", "RQD"], required: true })).toBe("segment");
    const order = (STRUCTURE[1] as { segments: StructureItem[] }).segments[1];
    expect(firstSegments(order)).toEqual(["ORC", "OBR", "RQD"]);
    expect(firstSegments(STRUCTURE[1])).toEqual(["PID", "ORC", "OBR", "RQD"]);
    const observation = (order as { segments: StructureItem[] }).segments[3];
    expect(isRequired(observation)).toBe(false); // required group of optional members
  });
});

describe("parseStructure", () => {
  test("nests groups, splits repeating groups and routes NTEs by position", () => {
    const r = parseStructure("TEST", STRUCTURE, PARSERS, wire(
      "PID|1||1||Doe", "NTE|1||patient note", "PV1|1|I",
      "ORC|NW", "OBR|1", "NTE|1||obr note", "OBX|1|ST|A||x", "NTE|1||obx note", "OBX|2|ST|B||y", "DG1|1",
      "RQD|1", "OBX|1|ST|C||z",
      "PID|2||2||Roe", "OBR|9",
    ));
    expect(r.ok).toBe(true);
    const v = r.val as any;
    expect(v.header).toBeInstanceOf(MSH);
    expect(v.patientResults).toHaveLength(2);
    const [first, second] = v.patientResults;
    expect(first.patient.notes).toHaveLength(1);
    expect(first.patient.visit).toBeInstanceOf(PV1);
    expect(first.orders).toHaveLength(2);
    expect(first.orders[0].commonOrder).toBeInstanceOf(ORC);
    expect(first.orders[0].detail).toBeInstanceOf(OBR);
    expect(first.orders[0].notes).toHaveLength(1);
    expect(first.orders[0].observations.map((o: any) => [o.observation.fields[0].components[0].subComponents[0], o.notes.length])).toEqual([["1", 1], ["2", 0]]);
    expect(first.orders[0].diagnoses).toHaveLength(1);
    expect(first.orders[1].commonOrder).toBeUndefined();
    expect(first.orders[1].detail).toBeInstanceOf(RQD);
    expect(first.orders[1].observations).toHaveLength(1);
    expect(second.patient.patient).toBeInstanceOf(PID);
    expect(second.orders[0].detail).toBeInstanceOf(OBR);
    expect(names(v)).toEqual(["MSH", "PID", "NTE", "PV1", "ORC", "OBR", "NTE", "OBX", "NTE", "OBX", "DG1", "RQD", "OBX", "PID", "OBR"]);
    expect(v.message.encode()).toBe(wire(
      "PID|1||1||Doe", "NTE|1||patient note", "PV1|1|I",
      "ORC|NW", "OBR|1", "NTE|1||obr note", "OBX|1|ST|A||x", "NTE|1||obx note", "OBX|2|ST|B||y", "DG1|1",
      "RQD|1", "OBX|1|ST|C||z",
      "PID|2||2||Roe", "OBR|9",
    ));
  });

  test("an order without a patient is allowed, since PATIENT is optional", () => {
    const r = parseStructure("TEST", STRUCTURE, PARSERS, wire("OBR|1"));
    expect(r.ok).toBe(true);
    expect((r.val as any).patientResults[0].patient).toBeUndefined();
  });

  test("reports missing required items and out-of-order segments", () => {
    expect(parseStructure("TEST", STRUCTURE, PARSERS, MSH_LINE).err!.message).toBe("TEST message must contain at least one PID/ORC/OBR/RQD segment");
    expect(parseStructure("TEST", STRUCTURE, PARSERS, wire("PID|1")).err!.message).toBe("TEST message must contain at least one ORC/OBR/RQD segment");
    expect(parseStructure("TEST", STRUCTURE, PARSERS, wire("ORC|NW", "DG1|1")).err!.message).toBe("TEST message must contain one of OBR, RQD");
    expect(parseStructure("TEST", STRUCTURE, PARSERS, wire("OBR|1", "PV1|1")).err!.message).toBe("PV1 segment at line 3 is not allowed at this position in TEST");
    expect(parseStructure("TEST", STRUCTURE, PARSERS, wire("OBR|1", "OBR|2")).ok).toBe(true); // a second OBR opens a new order
    expect(parseStructure("TEST", STRUCTURE, PARSERS, "PID|1").err!.message).toMatch(/must start with MSH/);
  });

  test("skips segments the structure never mentions, with a warning", () => {
    const warn = console.warn;
    const warnings: string[] = [];
    console.warn = (m: string) => warnings.push(m);
    try {
      const r = parseStructure("TEST", STRUCTURE, PARSERS, wire("ZZZ|custom", "OBR|1", "ZZ1|other"));
      expect(r.ok).toBe(true);
      expect(names(r.val!)).toEqual(["MSH", "OBR"]);
      expect(warnings).toEqual(["Skipping unsupported segment type 'ZZZ' at line 2", "Skipping unsupported segment type 'ZZ1' at line 4"]);
    } finally {
      console.warn = warn;
    }
  });

  test("honours min and max occurrences", () => {
    const two: StructureItem[] = [
      { name: "MSH", required: true, repeating: false },
      { name: "EVN", required: true, repeating: false },
      { name: "PATIENT", required: true, repeating: true, minOccurrences: 2, maxOccurrences: 2, segments: [{ name: "PID", required: true, repeating: false }] },
    ];
    expect(parseStructure("TEST", two, PARSERS, wire("EVN|1", "PID|1")).err!.message).toBe("TEST message must contain at least 2 PATIENT groups");
    expect(parseStructure("TEST", two, PARSERS, wire("EVN|1", "PID|1", "PID|2", "PID|3")).err!.message).toBe("PID segment at line 5 is not allowed at this position in TEST");
    expect((parseStructure("TEST", two, PARSERS, wire("EVN|1", "PID|1", "PID|2")).val as any).patients).toHaveLength(2);
  });

  test("reports a segment that fails to parse", () => {
    const r = parseStructure("TEST", STRUCTURE, PARSERS, wire("PID|1", "OBR|1", "OBX|1", "NTE"));
    // NTE with no fields still parses; make a parser fail instead
    expect(r.ok).toBe(true);
    const failing: SegmentParsers = { ...PARSERS, OBR: () => ({ ok: false as const, err: new Error("boom") as any }) };
    expect(parseStructure("TEST", STRUCTURE, failing, wire("OBR|1")).err!.message).toBe("Failed to parse OBR segment at line 2: boom");
  });
});

describe("verifyStructure and encodeStructure", () => {
  const msh = new MSH().sendingApplication("APP").messageType({ messageCode: "ORU", triggerEvent: "R01" });

  test("encodes builder input in structure order, including choices and nested groups", () => {
    const input = {
      header: msh,
      patientResults: [{
        patient: { patient: new PID().setId("1"), notes: [new NTE().setId("1")] },
        orders: [
          { commonOrder: new ORC().orderControl("NW"), detail: new OBR().setId("1"), observations: [{ observation: new OBX().setId("1"), notes: [new NTE().setId("2")] }], diagnoses: [new DG1()] },
          { detail: new RQD(), observations: [] },
        ],
      }],
    };
    expect(verifyStructure(STRUCTURE, input)).toEqual([]);
    expect(encodeStructure(STRUCTURE, input, DEFAULT_ENCODING).split("\r").map((s) => s.slice(0, 3))).toEqual([
      "MSH", "PID", "NTE", "ORC", "OBR", "OBX", "NTE", "DG1", "RQD",
    ]);
  });

  test("lists what is missing, with group context", () => {
    expect(verifyStructure(STRUCTURE, {})).toEqual(["MSH segment is required", "At least one PATIENT RESULT group (PID/ORC/OBR/RQD) is required"]);
    expect(verifyStructure(STRUCTURE, { header: msh, patientResults: [{ patient: {}, orders: [{ detail: new EVN() }] }] })).toEqual([
      "PATIENT RESULT group 1: PATIENT group 1: PID segment is required",
      "PATIENT RESULT group 1: ORDER group 1: detail must be one of OBR, RQD",
    ]);
    expect(verifyStructure(STRUCTURE, { header: msh, patientResults: [{ orders: [{}] }] })).toEqual([
      "PATIENT RESULT group 1: ORDER group 1: One of OBR, RQD is required",
    ]);
  });

  test("checks min and max occurrences of repeating items", () => {
    const s: StructureItem[] = [
      { name: "MSH", required: true, repeating: false },
      { name: "OBX", required: true, repeating: true, minOccurrences: 2, maxOccurrences: 3 },
    ];
    expect(verifyStructure(s, { header: msh, observations: [new OBX()] })).toEqual(["At least 2 OBX segments are required"]);
    expect(verifyStructure(s, { header: msh, observations: [new OBX(), new OBX(), new OBX(), new OBX()] })).toEqual(["At most 3 OBX segments allowed"]);
    expect(verifyStructure(s, { header: msh })).toEqual(["At least 2 OBX segments are required"]);
  });
});

describe("inline groups", () => {
  const INLINE: StructureItem[] = [
    { name: "MSH", required: true, repeating: false },
    {
      name: "PATIENT_RESULT",
      required: true,
      repeating: true,
      segments: [
        {
          name: "PATIENT",
          required: false,
          repeating: false,
          inline: true,
          segments: [
            { name: "PID", required: true, repeating: false },
            { name: "VISIT", required: false, repeating: false, inline: true, segments: [{ name: "PV1", required: true, repeating: false }, { name: "PV2", required: false, repeating: false }] },
          ],
        },
        { name: "OBR", required: true, repeating: true },
      ],
    },
  ];

  test("parses the group's fields into the enclosing object", () => {
    const r = parseStructure("TEST", INLINE, PARSERS, wire("PID|1", "PV1|1", "OBR|1", "OBR|2", "PID|2", "OBR|3"));
    expect(r.ok).toBe(true);
    const results = (r.val as any).patientResults;
    expect(results).toHaveLength(2);
    expect(results[0].patient.name).toBe("PID");
    expect(results[0].visit.name).toBe("PV1");
    expect(results[0].observationRequests).toHaveLength(2);
    expect(results[1].visit).toBeUndefined();
    // PV1 cannot open a PATIENT RESULT group, so none is found at all.
    expect(parseStructure("TEST", INLINE, PARSERS, wire("PV1|1", "OBR|1")).err!.message).toBe("TEST message must contain at least one PID/OBR segment");
  });

  test("encodes and verifies the flattened fields", () => {
    const msh = new MSH().sendingApplication("APP").messageType({ messageCode: "ORU", triggerEvent: "R01" });
    const input = { header: msh, patientResults: [{ patient: new PID(), visit: new PV1(), observationRequests: [new OBR()] }, { visitDetails: new PV2(), observationRequests: [new OBR()] }] };
    expect(encodeStructure(INLINE, input, DEFAULT_ENCODING).split("\r").map((s) => s.slice(0, 3))).toEqual(["MSH", "PID", "PV1", "OBR", "PV2", "OBR"]);
    expect(verifyStructure(INLINE, input)).toEqual([
      "PATIENT RESULT group 2: PID segment is required",
      "PATIENT RESULT group 2: PV1 segment is required",
    ]);
  });
});

