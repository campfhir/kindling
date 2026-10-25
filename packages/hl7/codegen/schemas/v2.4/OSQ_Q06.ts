import type { MessageSchema } from "../../../src/types/schema";
import { opt, optList, req, reversion } from "../helpers";
import { OSR_Q06_SCHEMA as OSR_Q06_V23, osrOrderDetail, osrResponse } from "../v2.3/OSQ_Q06";

/**
 * OSR^Q06 (HL7 v2.4): MSH MSA [ERR] [{NTE}] QRD [QRF] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{CTI}] } ] [DSC]
 *
 * Compared with v2.3 the order detail is required: the hl7.eu v2.4 table puts the choice in the
 * segment column without brackets (ORM^O01 on the same page has an explicit `[` row, OSR^Q06 does
 * not), HAPI v24 adds the choice members as required, and Caristix marks the group R.
 * Sources: https://www.hl7.eu/HL7v2x/v24/std24/ch04.htm (4.4.3),
 * https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/OSR_Q06
 */
export const OSR_Q06_SCHEMA: MessageSchema = {
  ...reversion(OSR_Q06_V23, "2.4"),
  structure: [
    req("MSH"), req("MSA"), opt("ERR"), optList("NTE"), req("QRD"), opt("QRF"),
    osrResponse([req("ORC"), ...osrOrderDetail("required")]),
    opt("DSC"),
  ],
};
