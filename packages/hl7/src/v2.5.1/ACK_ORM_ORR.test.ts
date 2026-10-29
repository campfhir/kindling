// v2.5.1 parsers for ACK, ORM^O01 and ORR^O02 (structure identical to v2.5; codegen overrides
// each segment parse so results are v2.5.1 segment classes).
import { describe, test, expect } from "vitest";
import { parseACK } from "./ACK.ts";
import { parseORM_O01 } from "./ORM_O01.ts";
import { parseORR_O02 } from "./ORR_O02.ts";
import { createACK } from "./ACK.ts";
import { createORM_O01 } from "./ORM_O01.ts";
import { createORR_O02 } from "./ORR_O02.ts";
import { MSH } from "./MSH.ts";
import { MSA } from "./MSA.ts";
import { ERR } from "./ERR.ts";
import { SFT } from "./SFT.ts";
import { PID } from "./PID.ts";
import { ORC } from "./ORC.ts";
import { OBR } from "./OBR.ts";
import { CTD } from "./CTD.ts";
import { FT1 } from "./FT1.ts";
import { IN1 } from "./IN1.ts";
import { IN3 } from "./IN3.ts";

const msh = (code: string, event?: string) =>
  new MSH().messageType({ messageCode: code, triggerEvent: event ?? "" }).messageControlId("1");

describe("v2.5.1 ACK", () => {
  test("parses SFT, MSA and repeating ERR into v2.5.1 classes", () => {
    const wire = createACK(msh("ACK"), new MSA().acknowledgmentCode("AE").messageControlId("9"), {
      software: [new SFT()],
      errors: [new ERR().helpDeskContactPoint({ telephoneNumber: "555" }), new ERR().overrideType({ code: "O" })],
    }).encode();
    const result = parseACK(wire);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.val.software![0]).toBeInstanceOf(SFT);
    expect(result.val.acknowledgment).toBeInstanceOf(MSA);
    expect(result.val.errors).toHaveLength(2);
    expect(result.val.errors![0]).toBeInstanceOf(ERR);
    expect(result.val.errors![0].encode()).toBe("ERR" + "|".repeat(12) + "555");
  });

  test("still rejects a message with no MSA", () => {
    expect(parseACK(msh("ACK").encode()).ok).toBe(false);
  });
});

describe("v2.5.1 ORM^O01", () => {
  test("parses CTD, FT1 and the IN3 into v2.5.1 classes", () => {
    const wire = createORM_O01(
      msh("ORM", "O01"),
      [{
        commonOrder: new ORC().orderControl("NW"),
        detail: { segment: new OBR().setId("1"), contact: new CTD().contactRole({ identifier: "EP" }, { identifier: "CP" }) },
        transactions: [new FT1().setId("1").transactionReferenceKey("7")],
      }],
      { patient: new PID().setId("1"), insurances: [{ insurance: new IN1().setId("1"), insuranceCertification: new IN3() }] },
    ).encode();
    const result = parseORM_O01(wire);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const order = result.val.orders[0];
    expect(order.detail?.segment).toBeInstanceOf(OBR);
    expect(order.detail?.contact).toBeInstanceOf(CTD);
    expect(order.detail?.contact?.encode()).toBe("CTD|EP~CP");
    expect(order.transactions![0]).toBeInstanceOf(FT1);
    expect(order.transactions![0].encode().split("|")[31]).toBe("7");
    expect(result.val.patient).toBeInstanceOf(PID);
    expect(result.val.insurances![0].insuranceCertification).toBeInstanceOf(IN3);
  });
});

describe("v2.5.1 ORR^O02", () => {
  test("parses repeating ERR and the order group into v2.5.1 classes", () => {
    const wire = createORR_O02(msh("ORR", "O02"), new MSA().acknowledgmentCode("AA").messageControlId("1"), {
      errors: [new ERR().severity("W"), new ERR().severity("I")],
      patient: new PID().setId("1"),
      orders: [{ commonOrder: new ORC().orderControl("OK"), segment: new OBR().setId("1") }],
    }).encode();
    const result = parseORR_O02(wire);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.val.errors).toHaveLength(2);
    expect(result.val.errors![0]).toBeInstanceOf(ERR);
    expect(result.val.orders![0].segment).toBeInstanceOf(OBR);
  });
});
