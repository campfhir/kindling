import type { MessageSchema } from "../../../src/types/schema";
import { SFT, group, opt, optList, req, wrappers } from "../helpers";

/**
 * ORU^R30 - Unsolicited Point-Of-Care Observation Message Without Existing Order (HL7 v2.5,
 * identical in v2.5.1; chapter 7). R31 (search for an order) and R32 (pre-ordered observation)
 * share the structure.
 *
 * MSH [{SFT}] PID [PD1] [ VISIT: PV1 [PV2] ] ORC OBR [{NTE}] [{ TIMING_QTY: TQ1 [{TQ2}] }] { OBSERVATION: OBX [{NTE}] }
 *
 * One patient and one order per message (no PATIENT RESULT grouping); the VISIT group is inlined.
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.5.1/TriggerEvents/ORU_R30
 */
export const ORU_R30_SCHEMA: MessageSchema = {
  messageType: "ORU",
  triggerEvent: "R30",
  version: "2.5",
  structure: [
    req("MSH"),
    SFT,
    req("PID"),
    opt("PD1"),
    group("VISIT", false, false, [req("PV1"), opt("PV2")], { inline: true }),
    req("ORC"),
    req("OBR"),
    optList("NTE"),
    group("TIMING_QTY", false, true, [req("TQ1"), optList("TQ2")], { as: "timings", exportTypeName: "ParsedTimingQty", builderTypeName: "TimingQty" }),
    group("OBSERVATION", true, true, [req("OBX"), optList("NTE")], { as: "observations", exportTypeName: "ParsedObservation", builderTypeName: "ObservationGroup" }),
  ],
};

/** R30 and the R31/R32 events wrapping it. */
export const ORU_R30_FAMILY: MessageSchema[] = [ORU_R30_SCHEMA, ...wrappers(ORU_R30_SCHEMA, ["R31", "R32"])];
