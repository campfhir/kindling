import { describe, test, expect } from "vitest";
import { HL7Message, MLLP_END, MLLP_START, stripWire, toWire } from "./message.ts";
import { encodeMessage, encodeStructure } from "./structure.ts";
import { DEFAULT_ENCODING } from "./encoding.ts";
import { MessageEditor } from "../utils/MessageEditor.ts";
import { createACK, parseACK } from "../v2.5.1/ACK.ts";
import { MSH } from "../v2.5.1/MSH.ts";
import { MSA } from "../v2.5.1/MSA.ts";
import { NTE } from "../v2.5.1/NTE.ts";

const ack = () =>
  createACK(
    new MSH().sendingApplication("APP").messageType({ messageCode: "ACK", triggerEvent: "" }).messageControlId("1").versionId("2.5.1"),
    new MSA().acknowledgmentCode("AA").messageControlId("9"),
  );

describe("message wire format", () => {
  test("toWire ends every segment with <CR> and frames with <VT> … <FS><CR>", () => {
    expect(toWire(["A|1", "B|2"])).toBe("A|1\rB|2\r");
    expect(toWire("A|1")).toBe("A|1\r");
    expect(toWire(["A|1", "B|2"], { mllp: true })).toBe("\x0bA|1\rB|2\r\x1c\r");
    expect(MLLP_START).toBe("\x0b");
    expect(MLLP_END).toBe("\x1c");
  });

  test("stripWire undoes toWire and leaves a bare string as it is", () => {
    for (const mllp of [false, true]) expect(stripWire(toWire(["A|1", "B|2"], { mllp }))).toBe("A|1\rB|2");
    expect(stripWire("A|1\rB|2")).toBe("A|1\rB|2");
    expect(stripWire("\x0bA|1\r\n\x1c\r\n")).toBe("A|1");
  });

  test("a builder's encode() ends with <CR>, and with { mllp: true } is framed", () => {
    const body = ack().encode();
    expect(body.endsWith("MSA|AA|9\r")).toBe(true);
    expect(body.split("\r")).toHaveLength(3);
    expect(ack().encode({ mllp: true })).toBe(`\x0b${body}\x1c\r`);
    expect(ack().encode({ mllp: false })).toBe(body);
  });

  test("encodeMessage terminates what encodeStructure joins", () => {
    const builder = ack();
    const structure = (builder as unknown as { structure: Parameters<typeof encodeStructure>[0] }).structure;
    const joined = encodeStructure(structure, builder.toInput(), DEFAULT_ENCODING);
    expect(encodeMessage(structure, builder.toInput(), DEFAULT_ENCODING)).toBe(`${joined}\r`);
    expect(encodeMessage(structure, builder.toInput(), DEFAULT_ENCODING, { mllp: true })).toBe(`\x0b${joined}\r\x1c\r`);
  });

  test("HL7Message.encode() takes the same options", () => {
    const message = new HL7Message();
    message.addSegment(new MSA().acknowledgmentCode("AA"));
    expect(message.encode()).toBe("MSA|AA\r");
    expect(message.encode({ mllp: true })).toBe("\x0bMSA|AA\r\x1c\r");
  });

  test("MessageEditor edits framed or terminated input and frames on request", () => {
    const framed = ack().encode({ mllp: true });
    const edited = new MessageEditor(framed).append(new NTE().setId("1")).encode({ mllp: true });
    expect(edited).toBe(`\x0b${ack().encode()}NTE|1\r\x1c\r`);
    expect(new MessageEditor(ack()).update("MSA-1", "AE").encode()).toBe(ack().encode().replace("MSA|AA", "MSA|AE"));
  });

  test("a terminated or framed message parses back to the same wire", () => {
    const wire = ack().encode();
    expect(parseACK(wire).val?.message.encode()).toBe(wire);
    expect(parseACK(stripWire(ack().encode({ mllp: true }))).val?.message.encode()).toBe(wire);
  });
});
