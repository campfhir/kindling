import type { MessageSchema } from "../../../src/types/schema";
import { group, opt, optList, req, reversion } from "../helpers";
import { VXR_V03_SCHEMA as V03_V23 } from "../v2.3/VXQ_V01";

/**
 * VXR^V03 (HL7 v2.4): the v2.3 structure with [{GT1}] after the PATIENT_VISIT group, as in VXU^V04.
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/VXR_V03
 */
export const VXR_V03_SCHEMA: MessageSchema = {
  ...reversion(V03_V23, "2.4"),
  structure: [
    req("MSH"), req("MSA"), req("QRD"), opt("QRF"), req("PID"), opt("PD1"), optList("NK1"),
    group("PATIENT_VISIT", "optional", "single", [req("PV1"), opt("PV2")], { inline: true }),
    optList("GT1"),
    ...V03_V23.structure.slice(8),
  ],
};
