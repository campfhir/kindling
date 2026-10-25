import { describe, test, expect } from "vitest";
import { parseBatch, encodeBatch } from "./batch.ts";
import { parse } from "./parse.ts";
import { BHS, BTS, FHS, FTS, MSH, MSA, QRD } from "./segments/v2.3/index.ts";
import { createACK } from "./builders/v2.3/index.ts";

const MSH_ = (type: string, id: string, version = "2.3") => `MSH|^~\\&|APP|FAC|EMR|HOSP|20231015120000||${type}|${id}|P|${version}`;
const A01 = (id: string) => [MSH_("ADT^A01", id), "EVN|A01|20231015120000", "PID|1||12345^^^HOSP^MR||Doe^John", "PV1|1|I|ICU^1^A"].join("\r");
const R01 = (id: string) => [MSH_("ORU^R01", id), "PID|1||12345", "OBR|1|||CBC", "OBX|1|NM|718-7^Hemoglobin^LN||15.5|g/dL"].join("\r");
const ACK = (id: string) => [MSH_("ACK^A01", id), "MSA|AA|MSG001"].join("\r");

const FILE = [
  "FHS|^~\\&|APP|FAC|EMR|HOSP|20231015120000||nightly|comment|F001",
  "BHS|^~\\&|APP|FAC|EMR|HOSP|20231015120000||adt|comment|B001",
  A01("M1"),
  R01("M2"),
  "BTS|2|done|10~20",
  "BHS|^~\\&|APP|FAC|EMR|HOSP|20231015120000||acks||B002",
  ACK("M3"),
  "BTS|1",
  "FTS|2|end of file",
].join("\r");

const structures = (file: { batches: { messages: { val?: { structure: string } }[] }[] }) =>
  file.batches.map((b) => b.messages.map((m) => m.val?.structure ?? "error"));

describe("parseBatch", () => {
  test("parses a file of two batches with mixed message types", () => {
    const result = parseBatch(FILE);
    expect(result.ok).toBe(true);
    const file = result.val!;
    expect(file.fileHeader?.encode()).toBe("FHS|^~\\&|APP|FAC|EMR|HOSP|20231015120000||nightly|comment|F001");
    expect(file.fileTrailer?.encode()).toBe("FTS|2|end of file");
    expect(file.warnings).toEqual([]);
    expect(structures(file)).toEqual([["ADT_A01", "ORU_R01"], ["ACK"]]);
    expect(file.batches[0].header?.encode()).toContain("|B001");
    expect(file.batches[0].trailer?.encode()).toBe("BTS|2|done|10~20");
    expect(file.batches[1].header).toBeInstanceOf(BHS);
    expect(file.batches[1].trailer).toBeInstanceOf(BTS);
    // Each message is exactly what the root parse() returns for it.
    expect(file.batches[0].messages[0].val).toEqual(parse(A01("M1")).val);
    const first = file.batches[0].messages[0].val!;
    if (first.structure === "ADT_A01") expect(first.parsed.visit.fields[1].components[0].subComponents[0]).toBe("I");
  });

  test("round trips through encodeBatch", () => {
    const file = parseBatch(FILE).val!;
    const encoded = encodeBatch({
      fileHeader: file.fileHeader,
      batches: file.batches.map((b) => ({ header: b.header, messages: b.messages.map((m) => m.val!.parsed.message), trailer: b.trailer })),
      fileTrailer: file.fileTrailer,
    });
    expect(encoded).toBe(FILE);
    expect(encodeBatch({ batches: [{ messages: [A01("X") + "\r"] }] }, { terminator: "\n" })).toBe(A01("X").split("\r").join("\n"));
  });

  test("every envelope segment is optional", () => {
    // A bare run of messages is one batch without header or trailer.
    const bare = parseBatch([A01("1"), ACK("2"), R01("3")].join("\r")).val!;
    expect(bare.fileHeader).toBeUndefined();
    expect(bare.fileTrailer).toBeUndefined();
    expect(bare.batches).toHaveLength(1);
    expect(bare.batches[0].header).toBeUndefined();
    expect(structures(bare)).toEqual([["ADT_A01", "ACK", "ORU_R01"]]);

    // A single message is a batch of one; a batch without a file header; a trailer without messages.
    expect(structures(parseBatch(A01("1")).val!)).toEqual([["ADT_A01"]]);
    expect(structures(parseBatch(["BHS|^~\\&|APP", A01("1"), "BTS|1"].join("\r")).val!)).toEqual([["ADT_A01"]]);
    const empty = parseBatch(["BHS|^~\\&|APP", "BTS|0"].join("\r")).val!;
    expect(empty.batches).toHaveLength(1);
    expect(empty.batches[0].messages).toEqual([]);
    expect(empty.warnings).toEqual([]);
  });

  test("a BTS ends a batch and the next MSH opens a new one even without BHS", () => {
    const file = parseBatch([A01("1"), "BTS|1", ACK("2"), ACK("3"), "FTS|2"].join("\r")).val!;
    expect(structures(file)).toEqual([["ADT_A01"], ["ACK", "ACK"]]);
    expect(file.batches[0].trailer).toBeDefined();
    expect(file.batches[1].trailer).toBeUndefined();
    expect(file.warnings).toEqual([]);
  });

  test("a batch sent as a query response carries QRD and QRF after BHS", () => {
    const file = parseBatch(["BHS|^~\\&|APP", "QRD|20231015|R|I|Q1|||10^RD|PAT|RES", "QRF|APP||20231015", A01("1"), "BTS|1"].join("\r")).val!;
    expect(file.batches[0].query).toBeInstanceOf(QRD);
    expect(file.batches[0].query?.encode()).toBe("QRD|20231015|R|I|Q1|||10^RD|PAT|RES");
    expect(file.batches[0].queryFilter?.encode()).toBe("QRF|APP||20231015");
    expect(structures(file)).toEqual([["ADT_A01"]]);
    // QRD elsewhere is a segment outside any message.
    expect(parseBatch(["QRD|20231015|R", A01("1")].join("\r")).err?.message).toBe("QRD segment at line 1 is outside of any message (expected MSH, BHS, BTS or FTS)");
  });

  test("reports count mismatches as warnings, not failures", () => {
    const file = parseBatch(["FHS|^~\\&|APP", "BHS|^~\\&|APP", A01("1"), ACK("2"), "BTS|3", "FTS|2"].join("\r")).val!;
    expect(structures(file)).toEqual([["ADT_A01", "ACK"]]);
    expect(file.warnings).toEqual([
      "BTS-1 of batch 1 (line 9) counts 3 messages, the batch holds 2",
      "FTS-1 (line 10) counts 2 batches, the file holds 1",
    ]);
  });

  test("a message that fails to parse keeps its place and names where it is", () => {
    const file = parseBatch(["BHS|^~\\&|APP", A01("1"), [MSH_("ADT^A01", "2"), "EVN|A01", "PV1|1"].join("\r"), MSH_("ZZZ^Z01", "3"), ACK("4"), "BTS|4"].join("\r")).val!;
    expect(file.warnings).toEqual([]);
    const [ok1, bad2, bad3, ok4] = file.batches[0].messages;
    expect(ok1.ok && ok4.ok).toBe(true);
    expect(bad2.err?.message).toBe("ADT_A01 message must contain a PID segment");
    expect(bad2.err?.meta).toEqual({ batch: 1, message: 2, line: 6 });
    expect(bad3.err?.message).toBe("Unknown HL7 v2.3 message type 'ZZZ^Z01' (MSH-9)");
    expect(bad3.err?.meta).toEqual({ batch: 1, message: 3, line: 9 });
  });

  test("passes parse options to every message", () => {
    const file = parseBatch([A01("1").replace("|P|2.3", "|P|2.5.1"), ACK("2").replace("|P|2.3", "|P|")].join("\r"));
    expect(file.val!.batches[0].messages.map((m) => m.ok)).toEqual([false, false]);
    const forced = parseBatch([A01("1").replace("|P|2.3", "|P|2.5.1"), ACK("2").replace("|P|2.3", "|P|")].join("\r"), { version: "2.3" });
    expect(structures(forced.val!)).toEqual([["ADT_A01", "ACK"]]);
  });

  test("the batch's own encoding characters apply to its BTS, QRD and QRF", () => {
    const file = parseBatch(["BHS#$%*&#APP#FAC", A01("1"), "BTS#1#one$two"].join("\r")).val!;
    expect(file.batches[0].header?.encoding.fieldSeparator).toBe("#");
    expect(file.batches[0].trailer?.fields[1].components).toHaveLength(2);
    expect(file.warnings).toEqual([]);
  });

  test("accepts LF and CRLF terminators and ignores blank lines", () => {
    expect(structures(parseBatch(FILE.split("\r").join("\n")).val!)).toEqual([["ADT_A01", "ORU_R01"], ["ACK"]]);
    expect(structures(parseBatch(FILE.split("\r").join("\r\n") + "\r\n\r\n").val!)).toEqual([["ADT_A01", "ORU_R01"], ["ACK"]]);
  });

  test("rejects what the structure does not allow", () => {
    expect(parseBatch("").err?.message).toBe("Empty batch");
    expect(parseBatch("  \r\n").err?.message).toBe("Empty batch");
    expect(parseBatch("PID|1").err?.message).toBe("PID segment at line 1 is outside of any message (expected MSH, BHS, BTS or FTS)");
    expect(parseBatch(["BHS|^~\\&|APP", "PID|1"].join("\r")).err?.message).toBe("PID segment at line 2 is outside of any message (expected MSH, BHS, BTS or FTS)");
    expect(parseBatch([A01("1"), "FTS|1", ACK("2")].join("\r")).err?.message).toBe("MSH segment at line 6 follows the FTS segment");
    expect(parseBatch(["FHS|^~\\&|APP", "FHS|^~\\&|APP"].join("\r")).err?.message).toBe("FHS segment at line 2 must be the first segment of the file");
    expect(parseBatch(["BHS|^~\\&|APP", "FHS|^~\\&|APP"].join("\r")).err?.message).toBe("FHS segment at line 2 must be the first segment of the file");
    expect(parseBatch("BHS|^~").err?.message).toBe("Failed to parse BHS segment at line 1: Invalid encoding characters in BHS segment");
    expect(parseBatch("FHS|^~").err?.message).toBe("Failed to parse FHS segment at line 1: Invalid encoding characters in FHS segment");
  });

  test("parse() points a batch at parseBatch()", () => {
    expect(parse(FILE).err?.message).toBe("Message starts with FHS: it is a batch file, use parseBatch()");
    expect(parse(["BHS|^~\\&|APP", A01("1")].join("\r")).err?.message).toBe("Message starts with BHS: it is a batch file, use parseBatch()");
  });
});

describe("encodeBatch", () => {
  test("writes headers, query segments, messages and trailers in structure order", () => {
    const msh = new MSH().sendingApplication("EMR").messageType({ messageCode: "ACK", triggerEvent: "A01" }).messageControlId("1").processingId("P").versionId("2.3");
    const ack = createACK(msh, new MSA().acknowledgmentCode("AA").messageControlId("MSG001"));
    const wire = encodeBatch({
      fileHeader: new FHS().sendingApplication("EMR").nameId("acks"),
      batches: [
        { header: new BHS().sendingApplication("EMR"), query: new QRD().queryDateTime("20231015"), messages: [ack], trailer: new BTS().messageCount("1") },
        { messages: ["MSH|^~\\&|X||||||ACK^A01|2|P|2.3\rMSA|AA|MSG002\r"] },
      ],
      fileTrailer: new FTS().fileBatchCount("2"),
    });
    expect(wire.split("\r")).toEqual([
      "FHS|^~\\&|EMR||||||acks",
      "BHS|^~\\&|EMR",
      "QRD|20231015",
      "MSH|^~\\&|EMR||||||ACK^A01|1|P|2.3",
      "MSA|AA|MSG001",
      "BTS|1",
      "MSH|^~\\&|X||||||ACK^A01|2|P|2.3",
      "MSA|AA|MSG002",
      "FTS|2",
    ]);
    const back = parseBatch(wire).val!;
    expect(structures(back)).toEqual([["ACK"], ["ACK"]]);
    expect(back.warnings).toEqual([]);
  });
});
