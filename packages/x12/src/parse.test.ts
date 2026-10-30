import { describe, expect, it } from "vitest";
import { parse, parseInterchange } from "./parse.ts";
import { encodeInterchange } from "./interchange.ts";
import { identifyInterchange, isX12Input } from "./identify.ts";
import { ISA } from "./envelope/ISA.ts";
import { GS } from "./envelope/GS.ts";
import { ST } from "./envelope/ST.ts";
import { GenericSegment } from "./types/segment.ts";

// A 270 eligibility inquiry shaped like the HETS 270/271 companion guide's sample envelope.
const INTERCHANGE = [
  "ISA*00*          *00*          *ZZ*SUBMITTERID    *ZZ*CMS            *241030*1200*^*00501*000000001*1*T*:~",
  "GS*HS*SUBMITTERID*CMS*20241030*1200*5014*X*005010X279A1~",
  "ST*270*0001*005010X279A1~",
  "BHT*0022*13*TRACE0001*20241030*1200~",
  "HL*1**20*1~",
  "NM1*PR*2*CMS*****PI*CMS~",
  "SE*5*0001~",
  "GE*1*5014~",
  "IEA*1*000000001~",
].join("\n");

describe("parse", () => {
  it("groups an interchange into its envelopes", async () => {
    const r = await parse(INTERCHANGE);
    expect(r.ok).toBe(true);
    const val = r.val!;
    expect(val.header.getSenderId()).toBe("SUBMITTERID");
    expect(val.functionalGroups).toHaveLength(1);
    const [set] = val.functionalGroups[0].transactionSets;
    expect(set.header.getTransactionSetIdentifierCode()).toBe("270");
    expect(set.segments.map((s) => s.id)).toEqual(["BHT", "HL", "NM1"]);
    expect(set.trailer.getSegmentCount()).toBe("5");
    expect(val.warnings).toEqual([]);
  });

  it("round-trips through encodeInterchange", () => {
    const r = parseInterchange(INTERCHANGE);
    expect(encodeInterchange(r.val!, { delimiters: r.val!.delimiters, lineBreak: "\n" })).toBe(`${INTERCHANGE}\n`);
  });

  it("round-trips other delimiters", () => {
    const other = INTERCHANGE.replaceAll("*", "|").replace("|^|", "|}|").replace("|:~", "|>~");
    const r = parseInterchange(other);
    expect(r.ok).toBe(true);
    expect(encodeInterchange(r.val!, { delimiters: r.val!.delimiters, lineBreak: "\n" })).toBe(`${other}\n`);
  });

  it("warns about counts and control numbers that disagree", () => {
    const bad = INTERCHANGE.replace("SE*5*0001", "SE*4*0002").replace("GE*1*5014", "GE*2*5015").replace("IEA*1*000000001", "IEA*3*000000002");
    expect(parseInterchange(bad).val!.warnings).toEqual([
      "SE01 of transaction set 0001 (at segment 7) counts 4, the interchange holds 5",
      "SE02 at segment 7 is '0002', its header's is '0001'",
      "GE01 of functional group 5014 (at segment 8) counts 2, the interchange holds 1",
      "GE02 at segment 8 is '5015', its header's is '5014'",
      "IEA01 (at segment 9) counts 3, the interchange holds 1",
      "IEA02 at segment 9 is '000000002', its header's is '000000001'",
    ]);
  });

  it("warns when ST03 is not GS08", () => {
    const r = parseInterchange(INTERCHANGE.replace("ST*270*0001*005010X279A1", "ST*270*0001*005010X279"));
    expect(r.val!.warnings).toEqual(["ST03 at segment 3 is '005010X279', GS08 of its group is '005010X279A1'"]);
  });

  it("keeps TA1 acknowledgments", () => {
    const ta1 = INTERCHANGE.replace("~\nGS*", "~\nTA1*000000009*241029*1321*A*000~\nGS*");
    expect(parseInterchange(ta1).val!.acknowledgments.map((s) => s.get(1))).toEqual(["000000009"]);
  });

  it.each([
    ["no ISA", "GS*HS~", "must start with an ISA"],
    ["a missing SE", INTERCHANGE.replace("SE*5*0001~\n", ""), "transaction set 0001 has no SE"],
    ["a missing GE", INTERCHANGE.replace("GE*1*5014~\n", ""), "functional group 5014 has no GE"],
    ["a missing IEA", INTERCHANGE.replace("IEA*1*000000001~", ""), "ends before its IEA"],
    ["an ST outside a group", INTERCHANGE.replace("GS*HS*SUBMITTERID*CMS*20241030*1200*5014*X*005010X279A1~\n", ""), "outside of any functional group"],
    ["a segment outside a transaction set", INTERCHANGE.replace("ST*270*0001*005010X279A1~\n", ""), "outside of any transaction set"],
    ["a segment after IEA", `${INTERCHANGE}\nGS*HS~`, "follows the IEA"],
    ["a truncated transaction set", INTERCHANGE.split("\n").slice(0, 5).join("\n"), "ends before the SE segment"],
  ])("fails for %s", (_, input, message) => {
    const r = parseInterchange(input);
    expect(r.ok).toBe(false);
    expect(r.err?.message).toContain(message);
  });
});

describe("encodeInterchange", () => {
  it("builds an interchange and computes the trailers", () => {
    const wire = encodeInterchange(
      {
        header: new ISA()
          .sender("ZZ", "SUBMITTERID")
          .receiver("ZZ", "CMS")
          .interchangeDate("241030")
          .interchangeTime("1200")
          .interchangeControlNumber(1)
          .acknowledgmentRequested("1")
          .usageIndicator("T"),
        functionalGroups: [
          {
            header: new GS()
              .functionalIdentifierCode("HS")
              .applicationSenderCode("SUBMITTERID")
              .applicationReceiverCode("CMS")
              .date("20241030")
              .time("1200")
              .groupControlNumber(5014)
              .versionReleaseIndustryIdentifierCode("005010X279A1"),
            transactionSets: [
              {
                header: new ST().transactionSetIdentifierCode("270").transactionSetControlNumber("0001").implementationConventionReference("005010X279A1"),
                segments: [
                  new GenericSegment("BHT").element(1, "0022").element(2, "13").element(3, "TRACE0001").element(4, "20241030").element(5, "1200"),
                  new GenericSegment("HL").element(1, "1").element(3, "20").element(4, "1"),
                  new GenericSegment("NM1").element(1, "PR").element(2, "2").element(3, "CMS").element(8, "PI").element(9, "CMS"),
                ],
              },
            ],
          },
        ],
      },
      { lineBreak: "\n" },
    );
    expect(wire).toBe(`${INTERCHANGE}\n`);
  });

  it("writes a fixed-length ISA announcing the delimiters it encodes with", () => {
    const isa = new ISA().sender("ZZ", "A").receiver("ZZ", "B").interchangeDate("241030").interchangeTime("1200").interchangeControlNumber(7).usageIndicator("P");
    const encoded = isa.encode({ element: "|", repetition: "}", component: ">", segment: "\n" });
    expect(encoded.length + 1).toBe(106);
    expect(encoded[82]).toBe("}");
    expect(encoded[104]).toBe(">");
  });

  it("keeps the standards identifier of a 00401 ISA", () => {
    const isa = parseInterchange(INTERCHANGE.replace("*^*00501*", "*U*00401*")).val!.header;
    expect(isa.encode()).toContain("*U*00401*");
  });
});

describe("identifyInterchange", () => {
  it("reads the envelope headers", () => {
    expect(isX12Input(`\n${INTERCHANGE}`)).toBe(true);
    expect(identifyInterchange(INTERCHANGE).val).toMatchObject({
      version: "00501",
      senderId: "SUBMITTERID",
      receiverId: "CMS",
      controlNumber: "000000001",
      usageIndicator: "T",
      transactionSets: [{ functionalIdentifierCode: "HS", version: "005010X279A1", transactionSet: "270", controlNumber: "0001", implementationConventionReference: "005010X279A1" }],
    });
  });
});
