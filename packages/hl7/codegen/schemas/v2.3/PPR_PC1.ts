import type { MessageSchema, SegmentGroup, StructureItem } from "../../../src/types/schema";
import { choice, group, opt, optList, req, wrappers } from "../helpers";
import { ORDER_DETAIL_SEGMENTS } from "./ORM_O01";

/**
 * The patient care messages of HL7 v2.3 chapter 12: problems (PPR/PRR), goals (PGL/PPV) and
 * pathways, problem-oriented (PPP/PTR) and goal-oriented (PPG/PPT), plus the QRY^PC4/PC9/PCE/PCK
 * queries that the responses answer. Every message nests the same blocks: a PRB, GOL or PTH with
 * notes and variances, ROL roles with variances, OBX observations with notes, and orders whose
 * detail is the ORM order detail choice with notes, variances and observations.
 * Unchanged through v2.4 except that the responses gain [QAK] in v2.3.1; v2.5 adds [{SFT}] and
 * makes the responses' ERR repeat.
 * Sources: https://www.hl7.eu/HL7v2x/v23/std23/ch12.htm (12.2), https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/PPR_PC1 (and the other events)
 */
const roles = (name: string, type: string) => group(name, "optional", "repeating", [req("ROL"), optList("VAR")], { as: "roles", exportTypeName: `Parsed${type}Role`, builderTypeName: `${type}Role` });
const obs = (name: string, type: string) => group(name, "optional", "repeating", [req("OBX"), optList("NTE")], { as: "observations", exportTypeName: `Parsed${type}Observation`, builderTypeName: `${type}Observation` });
const simplePathways = (type: string) => group(`${type.toUpperCase()}_PATHWAY`, "optional", "repeating", [req("PTH"), optList("VAR")], { as: "pathways", exportTypeName: `Parsed${type}Pathway`, builderTypeName: `${type}Pathway` });

/** [{ ORDER: ORC [ ORDER_DETAIL: <OBR|...> [{NTE}] [{VAR}] [{ ORDER_OBSERVATION: OBX [{NTE}] [{VAR}] }] ] }] */
export const careOrders = (): SegmentGroup =>
  group("ORDER", "optional", "repeating", [
    req("ORC"),
    group("ORDER_DETAIL", "optional", "single", [
      choice(ORDER_DETAIL_SEGMENTS, "required"),
      optList("NTE"),
      optList("VAR"),
      group("ORDER_OBSERVATION", "optional", "repeating", [req("OBX"), optList("NTE"), optList("VAR")], { as: "observations", exportTypeName: "ParsedOrderObservation", builderTypeName: "OrderObservation" }),
    ], { as: "detail", exportTypeName: "ParsedOrderDetail", builderTypeName: "OrderDetail" }),
  ], { exportTypeName: "ParsedCareOrder", builderTypeName: "CareOrder" });

/** [{ GOAL: GOL [{NTE}] [{VAR}] [{ GOAL_ROLE }] <extra> [{ GOAL_OBSERVATION }] <tail> }] */
export const goals = (usage: "required" | "optional", extra: StructureItem[], tail: StructureItem[]): SegmentGroup =>
  group("GOAL", usage, "repeating", [req("GOL"), optList("NTE"), optList("VAR"), roles("GOAL_ROLE", "Goal"), ...extra, obs("GOAL_OBSERVATION", "Goal"), ...tail], { exportTypeName: "ParsedGoal", builderTypeName: "Goal" });
/** [{ PROBLEM: PRB [{NTE}] [{VAR}] [{ PROBLEM_ROLE }] <extra> [{ PROBLEM_OBSERVATION }] <tail> }] */
export const problems = (usage: "required" | "optional", extra: StructureItem[], tail: StructureItem[]): SegmentGroup =>
  group("PROBLEM", usage, "repeating", [req("PRB"), optList("NTE"), optList("VAR"), roles("PROBLEM_ROLE", "Problem"), ...extra, obs("PROBLEM_OBSERVATION", "Problem"), ...tail], { exportTypeName: "ParsedProblem", builderTypeName: "Problem" });
/** { PATHWAY: PTH [{NTE}] [{VAR}] [{ PATHWAY_ROLE }] <tail> } */
export const pathways = (tail: StructureItem[]): SegmentGroup =>
  group("PATHWAY", "required", "repeating", [req("PTH"), optList("NTE"), optList("VAR"), roles("PATHWAY_ROLE", "Pathway"), ...tail], { exportTypeName: "ParsedPathway", builderTypeName: "Pathway" });

const visit = () => group("PATIENT_VISIT", "optional", "single", [req("PV1"), opt("PV2")], { inline: true });
const care = (messageType: string, triggerEvent: string, body: SegmentGroup): MessageSchema => ({ messageType, triggerEvent, version: "2.3", structure: [req("MSH"), req("PID"), visit(), body] });
const careResponse = (messageType: string, triggerEvent: string, body: SegmentGroup, head: StructureItem[] = [req("MSH"), req("MSA"), opt("ERR")]): MessageSchema => ({
  messageType, triggerEvent, version: "2.3",
  structure: [...head, req("QRD"), group("PATIENT", "required", "repeating", [req("PID"), visit(), body], { exportTypeName: "ParsedCarePatient", builderTypeName: "CarePatient" })],
});

/** The problem body: PROBLEM with pathways, then goals and orders. */
export const problemBody = () => problems("required", [simplePathways("Problem")], [goals("optional", [], []), careOrders()]);
/** The goal body: GOAL with pathways, then problems and orders. */
export const goalBody = () => goals("required", [simplePathways("Goal")], [problems("optional", [], []), careOrders()]);
/** The problem-oriented pathway body: PATHWAY with problems (each with goals and orders). */
export const problemPathwayBody = () => pathways([problems("optional", [], [goals("optional", [], []), careOrders()])]);
/** The goal-oriented pathway body: PATHWAY with goals (each with problems and orders). */
export const goalPathwayBody = () => pathways([goals("optional", [], [problems("optional", [], []), careOrders()])]);

/** PPR^PC1 - Patient Problem (add); PC2 (update) and PC3 (delete) wrap it. */
export const PPR_PC1_SCHEMA = care("PPR", "PC1", problemBody());
export const PPR_FAMILY: MessageSchema[] = [PPR_PC1_SCHEMA, ...wrappers(PPR_PC1_SCHEMA, ["PC2", "PC3"])];
/** PGL^PC6 - Patient Goal (add); PC7 and PC8 wrap it. */
export const PGL_PC6_SCHEMA = care("PGL", "PC6", goalBody());
export const PGL_FAMILY: MessageSchema[] = [PGL_PC6_SCHEMA, ...wrappers(PGL_PC6_SCHEMA, ["PC7", "PC8"])];
/** PPP^PCB - Patient Pathway, problem-oriented (add); PCC and PCD wrap it. */
export const PPP_PCB_SCHEMA = care("PPP", "PCB", problemPathwayBody());
export const PPP_FAMILY: MessageSchema[] = [PPP_PCB_SCHEMA, ...wrappers(PPP_PCB_SCHEMA, ["PCC", "PCD"])];
/** PPG^PCG - Patient Pathway, goal-oriented (add); PCH and PCJ wrap it. */
export const PPG_PCG_SCHEMA = care("PPG", "PCG", goalPathwayBody());
export const PPG_FAMILY: MessageSchema[] = [PPG_PCG_SCHEMA, ...wrappers(PPG_PCG_SCHEMA, ["PCH", "PCJ"])];

/** QRY^PC4 - Patient Problem Query: MSH QRD [QRF]; PC9 (goal), PCE and PCK (pathway) wrap it. */
export const QRY_PC4_SCHEMA: MessageSchema = { messageType: "QRY", triggerEvent: "PC4", version: "2.3", structure: [req("MSH"), req("QRD"), opt("QRF")] };
export const QRY_PC4_EVENTS = ["PC9", "PCE", "PCK"];
export const QRY_PC4_FAMILY: MessageSchema[] = [QRY_PC4_SCHEMA, ...wrappers(QRY_PC4_SCHEMA, QRY_PC4_EVENTS)];

/** The responses: MSH MSA [ERR] QRD { PATIENT: PID [ PV1 [PV2] ] <body> } */
export const careResponses = (head?: StructureItem[]): MessageSchema[] => [
  careResponse("PRR", "PC5", problemBody(), head),
  careResponse("PPV", "PCA", goalBody(), head),
  careResponse("PTR", "PCF", problemPathwayBody(), head),
  careResponse("PPT", "PCL", goalPathwayBody(), head),
];
/** PRR^PC5, PPV^PCA, PTR^PCF and PPT^PCL. */
export const CARE_RESPONSES: MessageSchema[] = careResponses();

/** Every v2.3 patient care message. */
export const PATIENT_CARE_MESSAGES: MessageSchema[] = [...PPR_FAMILY, ...PGL_FAMILY, ...PPP_FAMILY, ...PPG_FAMILY, ...QRY_PC4_FAMILY, ...CARE_RESPONSES];
