import { describe, test, expect } from "vitest";
import { EDU } from "./EDU.ts";
import { EDU as EDU_v24 } from "../v2.4/EDU.ts";
import { DEFAULT_ENCODING } from "../types/encoding.ts";

describe("EDU (v2.5)", () => {
  test("extends the v2.4 EDU and adds EDU-9 Major Field of Study (repeating CWE)", () => {
    const edu = new EDU()
      .setId("1")
      .academicDegree("MD")
      .school({ organizationName: "State University", organizationIdentifier: "SU1" })
      .majorFieldOfStudy({ code: "MED", text: "Medicine" }, "SURG");
    expect(edu).toBeInstanceOf(EDU_v24);
    expect(edu.encode()).toBe("EDU|1|MD||||State University^^^^^^^^^SU1|||MED^Medicine~SURG");
  });

  test("parse() returns the v2.5 class and keeps EDU-9", () => {
    const wire = "EDU|1|MD||||State University|||MED^Medicine~SURG";
    const result = EDU.parse(wire, DEFAULT_ENCODING);
    expect(result.ok).toBe(true);
    expect(result.val).toBeInstanceOf(EDU);
    expect(result.val!.fields[8].components[0].subComponents[0]).toBe("MED");
    expect(result.val!.encode()).toBe(wire);
    expect(EDU.parse("ORG|1", DEFAULT_ENCODING).ok).toBe(false);
  });
});
