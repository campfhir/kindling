/** ROL role segment: the instance id, role, person and reason composites, dates and a round trip. */
import { test, expect, describe } from "vitest";
import { ROL } from "./ROL.ts";
import { DEFAULT_ENCODING } from "../types/encoding.ts";
import type { BaseSegment } from "../types/segment.ts";

/** Component `c` (1-based) of field `f` (1-based) of the first repetition. */
const comp = (seg: BaseSegment, f: number, c: number) => seg.fields[f - 1]?.components[c - 1]?.subComponents[0];

describe("ROL", () => {
  test("encodes a realistic role", () => {
    const rol = new ROL()
      .roleInstanceId({ entityId: "R1", namespaceId: "HOSP" })
      .actionCode("AD")
      .role({ code: "PP", text: "Primary care provider", codingSystem: "HL70443" })
      .rolePerson({ id: "1234", familyName: "Smith", givenName: "Jane", middleName: "Q" })
      .roleBeginDateTime("20230101000000")
      .roleEndDateTime("20231231235959")
      .roleDuration({ code: "1Y", text: "One year" })
      .roleActionReason({ code: "NEW", text: "New assignment" });
    expect(rol.encode()).toBe("ROL|R1^HOSP|AD|PP^Primary care provider^HL70443|1234^Smith^Jane^Q|20230101000000|20231231235959|1Y^One year|NEW^New assignment");
  });

  test("formats Dates for ROL-5 and ROL-6", () => {
    expect(new ROL().roleBeginDateTime(new Date(2023, 0, 1, 0, 0, 0)).roleEndDateTime(new Date(2023, 11, 31, 23, 59, 59)).encode()).toBe("ROL|||||20230101000000|20231231235959");
  });

  test("round-trips", () => {
    const wire = "ROL|R1^HOSP|AD|PP^Primary care provider^HL70443|1234^Smith^Jane^Q|20230101000000|20231231235959|1Y|NEW";
    const parsed = ROL.parse(wire, DEFAULT_ENCODING);
    expect(parsed.ok).toBe(true);
    expect(parsed.val!.encode()).toBe(wire);
    expect(comp(parsed.val!, 4, 4)).toBe("Q");
  });
});
