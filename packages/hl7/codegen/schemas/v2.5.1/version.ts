import type { MessageSchema, VersionSchema } from "../../../src/types/schema";
import { nameOf, reversionAll } from "../helpers";
import { V2_4_MESSAGES } from "../v2.4/version";
import { V2_5, V2_5_MESSAGES } from "../v2.5/version";

const own = new Set(V2_5_MESSAGES.map(nameOf));
const withdrawn = new Set(V2_5.withdrawnMessages ?? []);
/** The v2.4 messages v2.5 carries unchanged (re-exported), so that v2.5.1 derives every message v2.5 has. */
const mirrored: MessageSchema[] = V2_4_MESSAGES.filter((m) => !own.has(nameOf(m)) && !withdrawn.has(nameOf(m)));

/**
 * v2.5.1 — derived from v2.5: every message v2.5 defines or re-exports, re-versioned, generated
 * against wrapper classes of the v2.5 segments (nothing changed in the structures between 2.5 and
 * 2.5.1; the 2.5.1 field tables await their own release).
 */
export const V2_5_1: VersionSchema = {
  version: "v2.5.1",
  baseVersion: "v2.5",
  segments: [],
  messages: reversionAll([...V2_5_MESSAGES, ...mirrored], "2.5.1"),
};
