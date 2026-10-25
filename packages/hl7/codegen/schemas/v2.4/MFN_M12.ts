import type { MessageSchema } from "../../../src/types/schema";
import { opt, req, reversion, wrappers } from "../helpers";
import { entries } from "../v2.3/MFN_M01";
import { MFK_EVENTS, MFK_M01_SCHEMA as MFK_M01_V23 } from "../v2.3/MFK_M01";
import { MFQ_EVENTS, MFQ_M01_SCHEMA as MFQ_M01_V23 } from "../v2.3/MFQ_M01";

/** MFN^M12 record: MFE OM1 [OM7] (additional basic observation/service attributes). */
export const additionalAttributesEntries = (name = "MF_OBS_ATTRIBUTES") => entries(name, "AdditionalAttributes", [req("MFE"), req("OM1"), opt("OM7")]);

/**
 * MFN^M12 - Master File Notification - Additional Basic Observation/Service Attributes (HL7 v2.4, new in 2.4).
 *
 * MSH MFI { MF_OBS_ATTRIBUTES: MFE OM1 [OM7] }
 *
 * The OM7 segment is new in 2.4. v2.5 adds [{SFT}].
 * Sources: https://www.hl7.eu/HL7v2x/v24/std24/ch08.htm (8.8.2), https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/MFN_M12
 */
export const MFN_M12_SCHEMA: MessageSchema = {
  messageType: "MFN",
  triggerEvent: "M12",
  version: "2.4",
  structure: [req("MSH"), req("MFI"), additionalAttributesEntries()],
};

/** MFK^M01 (v2.4): the v2.3 structure, now also wrapped by M12. */
export const MFK_M01_SCHEMA: MessageSchema = reversion(MFK_M01_V23, "2.4");
/** The master file events acknowledged with the M01 structure in v2.4. */
export const MFK_EVENTS_V24 = [...MFK_EVENTS, "M12"];
/** M01 and the events wrapping it. */
export const MFK_FAMILY: MessageSchema[] = [MFK_M01_SCHEMA, ...wrappers(MFK_M01_SCHEMA, MFK_EVENTS_V24)];

/** MFQ^M01 (v2.4): the v2.3 structure, now also wrapped by M12. */
export const MFQ_M01_SCHEMA: MessageSchema = reversion(MFQ_M01_V23, "2.4");
/** The master file events queried with the M01 structure in v2.4. */
export const MFQ_EVENTS_V24 = [...MFQ_EVENTS, "M12"];
/** M01 and the events wrapping it. */
export const MFQ_FAMILY: MessageSchema[] = [MFQ_M01_SCHEMA, ...wrappers(MFQ_M01_SCHEMA, MFQ_EVENTS_V24)];
