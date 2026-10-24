import { VersionSchema } from "../../../src/types/schema";

/**
 * v2.4 — identical to v2.3.1 for the structures implemented here; everything is re-exported,
 * plus the PDA (Patient Death and Autopsy) segment introduced in 2.4.
 */
export const V2_4: VersionSchema = {
  version: "v2.4",
  baseVersion: "v2.3.1",
  reexport: true,
  ownSegments: ["PDA"],
  segments: [],
  messages: [],
};
