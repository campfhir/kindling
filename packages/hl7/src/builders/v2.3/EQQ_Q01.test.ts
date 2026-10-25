/** The enhanced-mode queries of HL7 v2.3: EQQ/RQQ/SPQ/VQQ^Q01, their TBR^Q01 tabular response, EDR^R07 and ERP^R09. */
import { describe, test, expect } from "vitest";
import { createEQQ_Q01, EQQ_Q01 } from "./EQQ_Q01.ts";
import { createRQQ_Q01 } from "./RQQ_Q01.ts";
import { createSPQ_Q01 } from "./SPQ_Q01.ts";
import { createVQQ_Q01 } from "./VQQ_Q01.ts";
import { createTBR_Q01, TBR_Q01 } from "./TBR_Q01.ts";
import { createEDR_R07 } from "./EDR_R07.ts";
import { createERP_R09, ERP_R09 } from "./ERP_R09.ts";
import { parseEQQ_Q01 } from "../../parsers/v2.3/EQQ_Q01_Parser.ts";
import { parseRQQ_Q01 } from "../../parsers/v2.3/RQQ_Q01_Parser.ts";
import { parseSPQ_Q01 } from "../../parsers/v2.3/SPQ_Q01_Parser.ts";
import { parseVQQ_Q01 } from "../../parsers/v2.3/VQQ_Q01_Parser.ts";
import { parseTBR_Q01 } from "../../parsers/v2.3/TBR_Q01_Parser.ts";
import { parseEDR_R07 } from "../../parsers/v2.3/EDR_R07_Parser.ts";
import { parseERP_R09 } from "../../parsers/v2.3/ERP_R09_Parser.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { MSA } from "../../segments/v2.3/MSA.ts";
import { ERR } from "../../segments/v2.3/ERR.ts";
import { QAK } from "../../segments/v2.3/QAK.ts";
import { EQL } from "../../segments/v2.3/EQL.ts";
import { ERQ } from "../../segments/v2.3/ERQ.ts";
import { SPR } from "../../segments/v2.3/SPR.ts";
import { VTQ } from "../../segments/v2.3/VTQ.ts";
import { RDF } from "../../segments/v2.3/RDF.ts";
import { RDT } from "../../segments/v2.3/RDT.ts";
import { DSP } from "../../segments/v2.3/DSP.ts";
import { DSC } from "../../segments/v2.3/DSC.ts";
import { ParserUtils } from "../../types/parser.ts";

const msh = (type: string, event: string) => new MSH().messageType({ messageCode: type, triggerEvent: event }).messageControlId("E1");
const msa = () => new MSA().acknowledgmentCode("AA").messageControlId("E1");
const qak = () => new QAK().queryTag("TAG1").queryResponseStatus("OK");
const names = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));

describe("enhanced-mode queries (v2.3)", () => {
  test("EQQ^Q01 is MSH EQL [DSC]", () => {
    const msg = createEQQ_Q01(msh("EQQ", "Q01"), new EQL().queryTag("TAG1").queryResponseFormatCode("T").eqlQueryStatement("select * from patients"), { continuation: new DSC().continuationPointer("P2") });
    expect(msg).toBeInstanceOf(EQQ_Q01);
    const wire = msg.encode();
    expect(names(wire)).toEqual(["MSH", "EQL", "DSC"]);
    const result = parseEQQ_Q01(wire);
    expect(result.ok).toBe(true);
    expect(ParserUtils.getComponent(result.val!.embeddedQuery.fields[3], 0)).toBe("select * from patients");
    expect(result.val!.message.encode()).toBe(wire);
    // @ts-expect-error missing required segment
    expect(new EQQ_Q01(msh("EQQ", "Q01"), undefined).verify().errors).toEqual(["EQL segment is required"]);
  });

  test("RQQ^Q01 is MSH ERQ [DSC]", () => {
    const wire = createRQQ_Q01(msh("RQQ", "Q01"), new ERQ().queryTag("TAG1")).encode();
    expect(names(wire)).toEqual(["MSH", "ERQ"]);
    expect(parseRQQ_Q01(wire).val!.eventReplayQuery.name).toBe("ERQ");
    expect(parseRQQ_Q01(msh("RQQ", "Q01").encode()).err!.message).toBe("RQQ_Q01 message must contain an ERQ segment");
  });

  test("SPQ^Q01 and VQQ^Q01 carry an optional row definition", () => {
    const rdf = () => new RDF().numberOfColumnsPerRow("2").columnDescription("PID.3^ST^20", "PID.5^ST^48");
    const spq = createSPQ_Q01(msh("SPQ", "Q01"), new SPR().queryTag("TAG1"), { rowDefinition: rdf() }).encode();
    expect(names(spq)).toEqual(["MSH", "SPR", "RDF"]);
    expect(parseSPQ_Q01(spq).val!.storedProcedureRequest.name).toBe("SPR");
    expect(ParserUtils.getComponent(parseSPQ_Q01(spq).val!.rowDefinition!.fields[0], 0)).toBe("2");
    const vqq = createVQQ_Q01(msh("VQQ", "Q01"), new VTQ().queryTag("TAG1"), { rowDefinition: rdf(), continuation: new DSC().continuationPointer("P2") }).encode();
    expect(names(vqq)).toEqual(["MSH", "VTQ", "RDF", "DSC"]);
    expect(parseVQQ_Q01(vqq).val!.virtualTableQuery.name).toBe("VTQ");
    expect(parseVQQ_Q01(vqq).val!.message.encode()).toBe(vqq);
  });

  test("TBR^Q01 is MSH MSA [ERR] QAK RDF {RDT} [DSC]", () => {
    const msg = createTBR_Q01(msh("TBR", "Q01"), msa(), qak(), new RDF().numberOfColumnsPerRow("2").columnDescription("PID.3^ST^20", "PID.5^ST^48"), [
      new RDT().columnValue("12345"),
      new RDT().columnValue("DOE^JOHN"),
    ], { error: new ERR().errorCodeAndLocation("0") });
    expect(msg).toBeInstanceOf(TBR_Q01);
    const wire = msg.encode();
    expect(names(wire)).toEqual(["MSH", "MSA", "ERR", "QAK", "RDF", "RDT", "RDT"]);
    const result = parseTBR_Q01(wire);
    expect(result.ok).toBe(true);
    expect(result.val!.rows).toHaveLength(2);
    expect(ParserUtils.getComponent(result.val!.rows[1].fields[0], 1)).toBe("JOHN");
    expect(result.val!.message.encode()).toBe(wire);
    // @ts-expect-error missing required segments
    expect(new TBR_Q01(msh("TBR", "Q01"), msa(), undefined, undefined, []).verify().errors).toEqual([
      "QAK segment is required",
      "RDF segment is required",
      "At least one RDT segment is required",
    ]);
  });

  test("EDR^R07 returns display lines, ERP^R09 echoes the ERQ", () => {
    const edr = createEDR_R07(msh("EDR", "R07"), msa(), qak(), [new DSP().setId("1").dataLine("line 1")]).encode();
    expect(names(edr)).toEqual(["MSH", "MSA", "QAK", "DSP"]);
    expect(parseEDR_R07(edr).val!.displayLines).toHaveLength(1);
    expect(parseEDR_R07([msh("EDR", "R07").encode(), "MSA|AA|E1", "QAK|TAG1|OK"].join("\r")).err!.message).toBe("EDR_R07 message must contain at least one DSP segment");

    const erp = createERP_R09(msh("ERP", "R09"), msa(), qak(), new ERQ().queryTag("TAG1"));
    expect(erp).toBeInstanceOf(ERP_R09);
    expect(names(erp.encode())).toEqual(["MSH", "MSA", "QAK", "ERQ"]);
    expect(parseERP_R09(erp.encode()).val!.eventReplayQuery.name).toBe("ERQ");
  });
});
