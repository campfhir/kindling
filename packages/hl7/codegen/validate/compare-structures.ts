/**
 * Compares the message structures we implement for one version with the Caristix trigger-event
 * tables of that version, or two Caristix versions with each other.
 *
 * Usage:
 *   npx tsx codegen/validate/compare-structures.ts <version> <caristix-dir>
 *       e.g. v2.3.1 /tmp/caristix/v2.3.1  (holds <EVENT>.json from
 *       https://hl7-definition.caristix.com/v2-api/1/HL7v2.3.1/TriggerEvents/<EVENT>)
 *   npx tsx codegen/validate/compare-structures.ts --caristix <dir-a> <dir-b>
 *       prints the events whose Caristix structure differs between the two directories
 *
 * Both sides are rendered as the standard's abstract message syntax, one item per line, with
 * groups indented. Caristix has no choice construct: a group whose members are all conditional,
 * single segments is read as a choice (<OBR|RQD|RQ1|RXO|ODS|ODT>). Usage C and O both read as
 * optional, as our structures treat them. Reads are local only; nothing is fetched here.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import type { StructureItem } from "../../src/types/schema.ts";
import { isSegmentChoice, isSegmentGroup } from "../../src/types/schema.ts";

const ROOT = join(fileURLToPath(import.meta.url), "../../..");
const args = process.argv.slice(2);

interface CaristixItem {
  id: string | null;
  name: string;
  usage: string;
  rpt: string;
  isGroup: boolean;
  segments?: CaristixItem[];
}

const mark = (required: boolean, repeating: boolean) => (required ? "" : "[") + (repeating ? "{" : "") + "%" + (repeating ? "}" : "") + (required ? "" : "]");

function renderOurs(items: StructureItem[], depth = 0): string[] {
  const pad = "  ".repeat(depth);
  const out: string[] = [];
  for (const item of items) {
    if (isSegmentChoice(item)) {
      out.push(pad + mark(item.required, false).replace("%", `<${item.oneOf.join("|")}>`));
    } else if (isSegmentGroup(item)) {
      out.push(pad + mark(item.required, item.repeating).replace("%", `${item.name}:`));
      out.push(...renderOurs(item.segments, depth + 1));
    } else {
      out.push(pad + mark(item.required, item.repeating).replace("%", item.name));
    }
  }
  return out;
}

function renderCaristix(items: CaristixItem[], depth = 0): string[] {
  const pad = "  ".repeat(depth);
  const out: string[] = [];
  for (const item of items) {
    const required = item.usage === "R";
    const repeating = item.rpt === "*" || (/^\d+$/.test(item.rpt) && Number(item.rpt) > 1);
    if (item.isGroup) {
      const members = item.segments ?? [];
      const isChoice = members.length > 1 && members.every((m) => !m.isGroup && m.usage === "C" && m.rpt === "1");
      if (isChoice) {
        out.push(pad + mark(required, false).replace("%", `<${members.map((m) => m.name).join("|")}>`));
        continue;
      }
      out.push(pad + mark(required, repeating).replace("%", `${item.name.replace(/\s+/g, "_")}:`));
      out.push(...renderCaristix(members, depth + 1));
    } else {
      out.push(pad + mark(required, repeating).replace("%", item.name));
    }
  }
  return out;
}

const readCaristix = (dir: string, event: string): CaristixItem[] | undefined => {
  const file = join(dir, `${event}.json`);
  if (!existsSync(file)) return undefined;
  return (JSON.parse(readFileSync(file, "utf8")) as { segments: CaristixItem[] }).segments;
};

/** Group names differ between us and Caristix; compare shapes with group names blanked, report with them. */
const shape = (lines: string[]) => lines.map((l) => l.replace(/[A-Z0-9_]+:/, "GROUP:")).join("\n");

function sideBySide(left: string[], right: string[], leftTitle: string, rightTitle: string): string {
  const width = Math.max(leftTitle.length, ...left.map((l) => l.length)) + 2;
  const rows = Math.max(left.length, right.length);
  const lines = [leftTitle.padEnd(width) + rightTitle];
  for (let i = 0; i < rows; i++) {
    const l = left[i] ?? "";
    const r = right[i] ?? "";
    lines.push((l.replace(/[A-Z0-9_]+:/, "GROUP:") === r.replace(/[A-Z0-9_]+:/, "GROUP:") ? "  " : "! ") + l.padEnd(width) + r);
  }
  return lines.join("\n");
}

async function main(): Promise<void> {
if (args[0] === "--caristix") {
  const [, a, b] = args;
  const events = readdirSync(a).filter((f) => f.endsWith(".json")).map((f) => f.slice(0, -5)).sort();
  let changed = 0;
  for (const event of events) {
    const left = readCaristix(a, event);
    const right = readCaristix(b, event);
    if (!left || !right) {
      console.log(`${event}: only in ${left ? a : b}`);
      continue;
    }
    const l = renderCaristix(left);
    const r = renderCaristix(right);
    if (shape(l) !== shape(r)) {
      changed++;
      console.log(`\n== ${event}\n${sideBySide(l, r, a, b)}`);
    }
  }
  console.log(`\n${changed} of ${events.length} events differ between ${a} and ${b}`);
} else {
  const [version, dir] = args;
  if (!version || !dir) throw new Error("usage: compare-structures.ts <version> <caristix-dir> | --caristix <dir-a> <dir-b>");
  const mod = (await import(`../../src/${version}/index.ts`)) as Record<string, StructureItem[]>;
  const ours = Object.entries(mod)
    .filter(([k]) => k.endsWith("_STRUCTURE"))
    .map(([k, v]) => [k.replace(/_STRUCTURE$/, ""), v] as const)
    .sort(([a], [b]) => a.localeCompare(b));
  const theirs = new Set(readdirSync(dir).filter((f) => f.endsWith(".json")).map((f) => f.slice(0, -5)));
  let differ = 0;
  for (const [event, items] of ours) {
    const c = readCaristix(dir, event);
    theirs.delete(event);
    if (!c) {
      console.log(`${event}: not in Caristix ${version}`);
      differ++;
      continue;
    }
    const l = renderOurs(items);
    const r = renderCaristix(c);
    if (shape(l) !== shape(r)) {
      differ++;
      console.log(`\n== ${event}\n${sideBySide(l, r, `ours (${version})`, "Caristix")}`);
    }
  }
  for (const event of [...theirs].sort()) console.log(`${event}: in Caristix ${version}, not implemented`);
  console.log(`\n${differ} of ${ours.length} structures differ from Caristix ${version}; ${theirs.size} Caristix events not implemented`);
}
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
