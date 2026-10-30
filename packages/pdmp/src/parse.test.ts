import { describe, expect, it } from "vitest";
import { parse, parseReport } from "./parse.ts";
import { encodeReport } from "./report.ts";
import { identifyReport, isAsapInput } from "./identify.ts";
import { readDelimiters } from "./tokenize.ts";
import { TH } from "./envelope/TH.ts";
import { IS } from "./envelope/segments.ts";
import { GenericSegment } from "./types/segment.ts";

// The ASAP 4.2B zero report of the South Carolina PMP dispenser guide v4.0, p.60, verbatim.
const ZERO_REPORT = [
  "TH*4.2B*123456*01**20220108*223000*P**\\\\",
  "IS*7705555555*PHARMACY NAME*#20220107#-#20220107#\\",
  "PHA*** ZZ1234567\\",
  "PAT*******REPORT*ZERO************\\",
  "DSP*****20220108******\\",
  "PRE*\\",
  "CDI*\\",
  "AIR*\\",
  "TP*7\\",
  "TT*123456*10\\",
].join("\n");

// Two pharmacies, a compound (DSP07 06 with three CDI) and a patient with two dispensations; the
// segments are shaped like the Nebraska PDMP dispenser guide's 4.2A samples (p.45-46).
const REPORT = [
  "TH*4.2A*CTRL0001*01**20241030*0800*T**~~",
  "IS*9999999994*Test Source*~",
  "PHA*9876543210*9876543*FA9999999*Test Pharmacy 1*1 Any Street**Any City*NE*98765*4025599992*Test Pharmacist**~",
  "PAT**06*N9999999*NE***Patient*Test****1 Test Avenue**Test City*NE*98765*1111111111*19850315*M*01***~",
  "DSP*00*RX1*20241001*00*20241001*00*06*99999999999*180*30*01*05*00***01*20241001***Compound***Use as directed**~",
  "PRE*1234567890*AS1234567***Prescriber*Test**8001234567*~",
  "CDI*1*01*00406921630*180*01~",
  "CDI*2*01*38779056708*0.9*03~",
  "CDI*3*01*00591024105*180*03~",
  "DSP*00*RX2*20241002*00*20241002*00*01*42543070001*15*5*01*05*00*1234567893*NE9999*01*******Take 1 tablet daily**~",
  "PRE*1234567890*AS1234567***Prescriber*Test**8001234567*~",
  "AIR*NE*RX2~",
  "TP*11~",
  "PHA*9876543211*9876544*FA9999998*Test Pharmacy 2*2 Any Street**Any City*NE*98765*4025599993*Test Pharmacist**~",
  "PAT**06*N9999998*NE***Patient*Other****2 Test Avenue**Test City*NE*98765*1111111112*19900101*F*01***~",
  "DSP*00*RX3*20241003*00*20241003*00*01*42543070001*30*30*01*05*00***01*20241003*******Take 1 tablet daily**~",
  "PRE*1234567890*AS1234567***Prescriber*Test**8001234567*~",
  "TP*5~",
  "TT*CTRL0001*19~",
].join("\n");

describe("readDelimiters", () => {
  it("reads the element separator after TH and the terminator in TH09", () => {
    expect(readDelimiters(ZERO_REPORT)).toEqual({ ok: true, val: { element: "*", segment: "\\" } });
    expect(readDelimiters(REPORT)).toEqual({ ok: true, val: { element: "*", segment: "~" } });
    expect(readDelimiters("TH|4.1|857463|||20101213|112620|P||\n\nIS|1|X")).toEqual({ ok: true, val: { element: "|", segment: "\n" } });
  });

  it.each([
    ["no TH", "IS*1*X~", "must start with a TH"],
    ["a truncated TH", "TH*4.2B*1*01", "ends before TH04"],
    ["a TH09 that is the element separator", "TH*4.2B*1*01**20241030*0800*P***~", "names the data element separator"],
    ["a TH that does not end with its terminator twice", "TH*4.2B*1*01**20241030*0800*P**~IS*1~", "terminator twice"],
  ])("fails for %s", (_, input, message) => {
    const r = readDelimiters(input);
    expect(r.ok).toBe(false);
    expect(r.err?.message).toContain(message);
  });
});

describe("parse", () => {
  it("parses the South Carolina zero report", async () => {
    const r = await parse(ZERO_REPORT);
    expect(r.ok).toBe(true);
    const val = r.val!;
    expect(val.header.getVersion()).toBe("4.2B");
    expect(val.informationSource?.getName()).toBe("PHARMACY NAME");
    const [d] = val.pharmacies[0].patients[0].dispensations;
    expect(d.dispensation.get(5)).toBe("20220108");
    expect(d.compoundIngredients).toHaveLength(1);
    expect(d.additionalInformation).toHaveLength(1);
    expect(val.warnings).toEqual([]);
  });

  it("groups pharmacies, patients and dispensations", () => {
    const val = parseReport(REPORT).val!;
    expect(val.pharmacies).toHaveLength(2);
    const [compound, tablet] = val.pharmacies[0].patients[0].dispensations;
    expect(compound.compoundIngredients.map((c) => c.get(1))).toEqual(["1", "2", "3"]);
    expect(tablet.additionalInformation).toHaveLength(1);
    expect(val.pharmacies[1].trailer.getSegmentCount()).toBe("5");
    expect(val.warnings).toEqual([]);
  });

  it.each([
    ["the zero report", ZERO_REPORT, "\\"],
    ["a multi-pharmacy report", REPORT, "~"],
  ])("round-trips %s", (_, input) => {
    const r = parseReport(input);
    expect(encodeReport(r.val!, { delimiters: r.val!.delimiters, lineBreak: "\n" })).toBe(`${input}\n`);
  });

  it("warns about counts, the control number and a missing PRE", () => {
    const bad = REPORT.replace("TP*11~", "TP*9~").replace("TT*CTRL0001*19~", "TT*CTRL0002*21~").replace(/\nPRE\*[^\n]*\nTP\*5/, "\nTP*4");
    expect(parseReport(bad).val!.warnings).toEqual([
      "TP01 at segment 13 counts 9 segments, the pharmacy holds 11",
      "DSP at segment 16 has no PRE segment",
      "TT02 at segment 18 counts 21 segments, the report holds 18",
      "TT01 at segment 18 is 'CTRL0002', TH02 is 'CTRL0001'",
    ]);
  });

  it("accepts a void, which is TH and TT alone", () => {
    const r = parseReport("TH*4.2B*CTRL9*04**20241030*0800*P**~~TT*CTRL9*2~");
    expect(r.ok).toBe(true);
    expect(r.val!.informationSource).toBeUndefined();
  });

  it.each([
    ["a missing IS", REPORT.replace("IS*9999999994*Test Source*~\n", ""), "followed by an IS"],
    ["a PAT outside a pharmacy", REPORT.replace(/PHA\*9876543210[^\n]*\n/, ""), "outside of any pharmacy"],
    ["a DSP outside a patient", REPORT.replace(/PAT\*\*06\*N9999998[^\n]*\n/, ""), "outside of any patient"],
    ["a CDI before PRE", REPORT.replace("PRE*1234567890*AS1234567***Prescriber*Test**8001234567*~\nCDI*1", "CDI*1*01*X*1*01~\nPRE*1234567890~\nCDI*1"), "out of order"],
    ["a pharmacy without TP", REPORT.replace("TP*11~\n", ""), "has no TP"],
    ["a report without TT", REPORT.replace("TT*CTRL0001*19~", ""), "ends before its TT"],
    ["a segment after TT", `${REPORT}\nPHA*1~`, "follows the TT"],
    ["a segment ASAP does not define", REPORT.replace("AIR*NE*RX2~", "ZZZ*1~"), "not an ASAP segment"],
  ])("fails for %s", (_, input, message) => {
    const r = parseReport(input);
    expect(r.ok).toBe(false);
    expect(r.err?.message).toContain(message);
  });
});

describe("encodeReport", () => {
  it("builds a report and computes the trailers", () => {
    const wire = encodeReport({
      header: new TH().versionReleaseNumber("4.2B").transactionControlNumber("123456").transactionType("01").creationDate("20220108").creationTime("223000").fileType("P"),
      informationSource: new IS().uniqueInformationSourceId("7705555555").informationSourceEntityName("PHARMACY NAME").message("#20220107#-#20220107#"),
      pharmacies: [
        {
          pharmacy: new GenericSegment("PHA").element(3, " ZZ1234567"),
          patients: [
            {
              patient: new GenericSegment("PAT").element(7, "REPORT").element(8, "ZERO").element(20, ""),
              dispensations: [
                {
                  dispensation: new GenericSegment("DSP").element(5, "20220108").element(11, ""),
                  prescriber: new GenericSegment("PRE").element(1, ""),
                  compoundIngredients: [new GenericSegment("CDI").element(1, "")],
                  additionalInformation: [new GenericSegment("AIR").element(1, "")],
                },
              ],
            },
          ],
        },
      ],
    }, { delimiters: { element: "*", segment: "\\" }, lineBreak: "\n" });
    expect(wire).toBe(`${ZERO_REPORT}\n`);
  });
});

describe("identifyReport", () => {
  it("reads TH and IS", () => {
    expect(isAsapInput(`\r\n${REPORT}`)).toBe(true);
    expect(isAsapInput("THE END")).toBe(false);
    expect(identifyReport(REPORT).val).toEqual({
      delimiters: { element: "*", segment: "~" },
      version: "4.2A",
      controlNumber: "CTRL0001",
      transactionType: "01",
      fileType: "T",
      informationSourceId: "9999999994",
      informationSourceName: "Test Source",
    });
  });
});
