import type { MessageSchema } from "../../../src/types/schema";
import { opt, optList, replaceDeep, reversion } from "../helpers";
import { adtMessages } from "../v2.3/ADT";

/**
 * The ADT messages of HL7 v2.3.1: the v2.3 structures (codegen/schemas/v2.3/ADT*.ts) with the
 * 2.3.1 changes, which Caristix and HAPI v231 agree on (hl7.eu publishes no 2.3.1 chapters):
 *
 * - IN3 repeats inside INSURANCE (A01 and the events sharing its shape, A06/A07);
 * - A06/A07 lose the stray first [DRG] of the v2.3 table (the erratum fix) and gain the repeating IN3;
 * - A16's DG1 repeats;
 * - A37's second patient gains [PD1], so the two patients read alike.
 *
 * Sources: https://hl7-definition.caristix.com/v2/HL7v2.3.1/TriggerEvents/ADT_A01 (and A06, A16,
 * A37), HAPI v231 ADT_A01_IN1IN2IN3, ADT_A06, ADT_A16, ADT_A37.
 */
export const ADT_MESSAGES_V231: MessageSchema[] = adtMessages((base, name) => {
  const s = reversion(base, "2.3.1");
  switch (name) {
    case "ADT_A01":
      return replaceDeep(s, "IN3", optList("IN3"));
    case "ADT_A06": {
      const withoutFirstDrg = { ...s, structure: s.structure.filter((item) => !("as" in item && item.as === "preliminaryDiagnosisRelatedGroup")) };
      return replaceDeep(withoutFirstDrg, "IN3", optList("IN3"));
    }
    case "ADT_A16":
      return replaceDeep(s, "DG1", optList("DG1"));
    case "ADT_A37": {
      const second = s.structure.findIndex((item) => "as" in item && item.as === "otherPatient");
      return { ...s, structure: [...s.structure.slice(0, second + 1), opt("PD1", { as: "otherPatientDemographics" }), ...s.structure.slice(second + 1)] };
    }
    default:
      return s;
  }
});
