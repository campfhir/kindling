/**
 * Drafts message schemas for events we do not implement yet, from the Caristix trigger-event
 * tables of one version (https://hl7-definition.caristix.com/v2-api/1/HL7v<n>/TriggerEvents/<EVENT>).
 *
 * The output is TypeScript source in the shape of codegen/schemas/<version>/*.ts (req/opt/reqList/
 * optList/group/choice), with Caristix's group names. It is a starting point, not a fact: run
 * codegen/validate/message-ledger.ts afterwards, which compares the draft with hl7.eu and HAPI and
 * applies the rule (hl7.eu decides unless Caristix and HAPI agree against it), and fix what differs.
 *
 * Usage:
 *   npx tsx codegen/validate/scaffold-messages.ts <version> --caristix <dir> --events OML_O21,ORL_O22 [--out file.ts]
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const args = process.argv.slice(2);
const VERSION = args[0];
const option = (name: string): string | undefined => (args.includes(name) ? args[args.indexOf(name) + 1] : undefined);
const caristixDir = option("--caristix");
const events = (option("--events") ?? "").split(",").filter(Boolean);
const out = option("--out");
if (!/^v\d+\.\d+(\.\d+)?$/.test(VERSION ?? "") || !caristixDir || !events.length) {
  console.error("Usage: scaffold-messages.ts <version> --caristix <dir> --events A_B,C_D [--out file.ts]");
  process.exit(1);
}
const API = VERSION.slice(1);

interface CaristixItem { id: string | null; name: string; usage: string; rpt: string; isGroup: boolean; segments?: CaristixItem[] }

const usageOf = (item: CaristixItem) => (item.usage === "R" ? "required" : "optional");
const repeats = (item: CaristixItem) => item.rpt === "*" || (/^\d+$/.test(item.rpt) && Number(item.rpt) > 1);
const groupName = (name: string) => name.trim().toUpperCase().replace(/[^A-Z0-9]+/g, "_").replace(/^_|_$/g, "");

function render(items: CaristixItem[], depth: number): string[] {
  const pad = "  ".repeat(depth);
  const lines: string[] = [];
  for (const item of items) {
    if (item.isGroup) {
      const members = item.segments ?? [];
      // A group whose members are all conditional, single segments is a choice of one of them.
      if (members.length > 1 && members.every((m) => !m.isGroup && m.usage === "C" && m.rpt === "1")) {
        lines.push(`${pad}choice([${members.map((m) => `"${m.name}"`).join(", ")}], "${usageOf(item)}"),`);
        continue;
      }
      lines.push(`${pad}group("${groupName(item.name)}", "${usageOf(item)}", "${repeats(item) ? "repeating" : "single"}", [`);
      lines.push(...render(members, depth + 1));
      lines.push(`${pad}]),`);
    } else {
      const helper = item.usage === "R" ? (repeats(item) ? "reqList" : "req") : repeats(item) ? "optList" : "opt";
      lines.push(`${pad}${helper}("${item.name}"),`);
    }
  }
  return lines;
}

const chunks: string[] = [];
const names: string[] = [];
for (const event of events) {
  const file = join(caristixDir, `${event}.json`);
  if (!existsSync(file)) {
    console.error(`${event}: no Caristix file ${file}`);
    continue;
  }
  const j = JSON.parse(readFileSync(file, "utf8")) as { eventDesc?: string; description?: string; segments: CaristixItem[] };
  const [messageType, triggerEvent] = event.split("_");
  const desc = (j.eventDesc ?? "").trim();
  names.push(`${event}_SCHEMA`);
  chunks.push(`/**
 * ${messageType}^${triggerEvent}${desc ? ` - ${desc}` : ""} (HL7 v${API}).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v${API}/TriggerEvents/${event}; checked against the hl7.eu
 * chapter table and HAPI v${API.replace(/\./g, "")} by codegen/validate/message-ledger.ts (docs/validation/${VERSION}-message-ledger.md).
 */
export const ${event}_SCHEMA: MessageSchema = {
  messageType: "${messageType}",
  triggerEvent: "${triggerEvent}",
  version: "${API}",
  structure: [
${render(j.segments, 2).join("\n")}
  ],
};`);
}
const source = `import type { MessageSchema } from "../../../src/types/schema";
import { choice, group, opt, optList, req, reqList } from "../helpers";

${chunks.join("\n\n")}

export const SCAFFOLDED_MESSAGES: MessageSchema[] = [${names.join(", ")}];
`;
if (out) {
  writeFileSync(out, source);
  console.log(`wrote ${out} (${names.length} schemas)`);
} else process.stdout.write(source);
