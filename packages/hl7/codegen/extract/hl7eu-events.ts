/**
 * Reads the hl7.eu event pages of a version that has no chapter pages (v2.1, v2.2), as fetched by
 * codegen/validate/fetch-sources.sh into hl7eu/events/<EVENT>.htm. Shared by the extraction (from-hl7eu.ts) and
 * the message ledger (codegen/validate/message-ledger.ts --hl7eu-events), so both read the pages the same way.
 *
 * Each event page prints, for every message of the event, the sending message type with its structure and the
 * receiving message type with its structure, in the abstract syntax: `[ ]` optional, `{ }` repeating, a group's name
 * right after its opening bracket ("[ INSURANCE { IN1 [IN2] [IN3] } ]"), and "< CHOICE A | B >" for a choice.
 * These versions define no message structure IDs: a message is known by its type and event (TYPE_EVENT).
 *
 * @module
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

/** One item of a printed structure, in the extraction's shape (codegen/extract/BRIEF.md). */
export interface EventItem {
  kind: "segment" | "group" | "choice" | "placeholder";
  name?: string; oneOf?: string[]; items?: EventItem[]; text?: string; notation?: string;
  minOccurs: number; maxOccurs: number | "*";
  usage: null; page: null;
}
/** One message printed on an event page. `items` is empty when the page prints no structure for it. */
export interface EventMessage { type: string; event: string; title: string; file: string; items: EventItem[]; problems: string[] }
export interface EventPages {
  /** Every message the pages print, the receiving ACKs excepted. */
  messages: EventMessage[];
  /** The general acknowledgment (see generalAck), or undefined when no page prints one. */
  ack?: { items: EventItem[]; file: string; reading: string; misfits: string[] };
  /** Readings applied while parsing, for the extraction's README. */
  readings: string[];
  /** How many receiving ACKs the pages print. */
  ackCount: number;
}

const ENTITIES: Record<string, string> = { lt: "<", gt: ">", amp: "&", nbsp: " ", quot: '"', auml: "ä", ouml: "ö", uuml: "ü", szlig: "ß", Auml: "Ä", Ouml: "Ö", Uuml: "Ü" };
const decode = (s: string) => s.replace(/&(#\d+|[a-z]+);/gi, (m, e: string) => (e[0] === "#" ? String.fromCodePoint(Number(e.slice(1))) : ENTITIES[e] ?? m));
const text = (html: string) => decode(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const SEGMENT = /^[A-Z][A-Z0-9]{2}$/;
/** A site-defined segment ("Zxx"), printed where a master file message carries the file's own segment. */
const PLACEHOLDER = /^Z[a-z]{2}$/;

/** Reads one printed structure. Brackets are read as tokens, so a row's indentation and line breaks do not matter. */
export function parseNotation(pre: string, label: string, problems: string[], readings: string[]): EventItem[] {
  const src = decode(pre.replace(/<A\b[^>]*>([\s\S]*?)<\/A>/gi, "$1"));
  const tokens = [...src.matchAll(/\[|\]|\{|\}|<|>|\||[A-Za-z][A-Za-z0-9_]*/g)].map((m) => m[0]);
  type Open = { open: string; name?: string; items: EventItem[]; choice?: string[] };
  const stack: Open[] = [{ open: "", items: [] }];
  const base = { usage: null, page: null } as const;
  for (const t of tokens) {
    const top = stack[stack.length - 1];
    if (t === "[" || t === "{" || t === "<") { stack.push({ open: t, items: [], ...(t === "<" ? { choice: [] } : {}) }); continue; }
    if (t === "|") continue;
    if (t === ">" || t === "]" || t === "}") {
      const want = t === ">" ? "<" : t === "]" ? "[" : "{";
      if (top.open !== want || stack.length === 1) { problems.push(`${label}: "${t}" closes ${top.open ? `"${top.open}"` : "nothing"}`); continue; }
      stack.pop();
      const into = stack[stack.length - 1].items;
      if (top.choice) { into.push({ kind: "choice", oneOf: top.choice, minOccurs: 1, maxOccurs: 1, ...base }); continue; }
      const min = t === "]" ? 0 : 1, max = t === "}" ? "*" as const : 1;
      const combine = (i: EventItem): EventItem => ({ ...i, minOccurs: min === 0 || i.minOccurs === 0 ? 0 : 1, maxOccurs: max === "*" || i.maxOccurs === "*" ? "*" : 1 });
      const items = top.items;
      // "[ INSURANCE { IN1 [IN2] [IN3] } ]": the name follows the outer bracket and the inner pair holds the segments.
      // That is one group, optional and repeating.
      if (top.name && items.length === 1 && items[0].kind === "group" && !items[0].name) {
        into.push(combine({ ...combine(items[0]), name: top.name }));
        continue;
      }
      // A group of one segment and a site-defined placeholder ("{ MF MFE [Zxx] }") is that segment, the way the chapter
      // tables of the later versions are read (from-hl7eu.ts closeGroup).
      const real = items.filter((i) => i.kind !== "placeholder");
      if (real.length === 1 && real[0].kind === "segment" && items.length > 1) {
        readings.push(`${top.name ?? "(unnamed)"}: a group of ${real[0].name} and a placeholder is read as ${real[0].name} alone`);
        into.push(combine(real[0]));
        continue;
      }
      if (!top.name && items.length === 1) { into.push(combine(items[0])); continue; }
      into.push({ kind: "group", ...(top.name ? { name: top.name } : {}), items, minOccurs: min, maxOccurs: max, ...base });
      continue;
    }
    if (top.choice) {
      if (SEGMENT.test(t)) top.choice.push(t);
      else if (t !== "CHOICE") problems.push(`${label}: "${t}" inside a choice`);
      continue;
    }
    if (SEGMENT.test(t)) { top.items.push({ kind: "segment", name: t, minOccurs: 1, maxOccurs: 1, ...base }); continue; }
    if (PLACEHOLDER.test(t)) { top.items.push({ kind: "placeholder", text: t, notation: t, minOccurs: 1, maxOccurs: 1, ...base }); continue; }
    // any other word names the group whose bracket was just opened
    if (stack.length > 1 && top.name === undefined && top.items.length === 0) top.name = t;
    else problems.push(`${label}: unexpected word "${t}"`);
  }
  if (stack.length > 1) problems.push(`${label}: ${stack.length - 1} bracket(s) not closed`);
  // A group left without a name once every name has been matched to its brackets is reported.
  (function walk(list: EventItem[]): void {
    for (const i of list) if (i.kind === "group") { if (!i.name) problems.push(`${label}: a group the page does not name`); walk(i.items!); }
  })(stack[0].items);
  return stack[0].items;
}

/** Items compared for identity: kinds, names, cardinality, nesting. */
const shape = (items: EventItem[]): unknown => items.map((i) => [i.kind, i.name ?? i.oneOf, i.minOccurs, i.maxOccurs, i.items ? shape(i.items) : null]);

/** Reads every event page in `dir` (hl7eu/events). Returns no messages when the folder does not exist. */
export function readEventPages(dir: string): EventPages {
  const messages: EventMessage[] = [];
  const readings: string[] = [];
  const acks: { event: string; file: string; items: EventItem[] }[] = [];
  const files = existsSync(dir) ? readdirSync(dir).filter((f) => /^[A-Z][A-Z0-9]{2}\.htm$/.test(f)).sort() : [];
  for (const file of files) {
    const event = file.slice(0, 3);
    const html = readFileSync(join(dir, file)).toString("latin1");
    // the page's "Description:" row ("Admit a Patient"); its heading adds the German interpretation in parentheses
    const title = text(html.match(/Description:\s*<\/TD>\s*<TD>([\s\S]*?)<\/TD>/i)?.[1] ?? "");
    const used = html.slice(html.indexOf("Message used by"));
    // one block per message of the event: a row naming the sending and receiving types, then a row with their structures
    const types = [...used.matchAll(/sending application\/facility:[\s\S]*?<H4>([^<]*)<\/H4>[\s\S]*?receiving application\/facility:[\s\S]*?<H4>([^<]*)<\/H4>/gi)];
    for (const [n, m] of types.entries()) {
      const block = used.slice(m.index!, n + 1 < types.length ? types[n + 1].index! : used.length);
      const [send, receive] = [...block.matchAll(/<PRE>([\s\S]*?)<\/PRE>/gi)].map((p) => p[1]);
      for (const [type, pre] of [[text(m[1]), send], [text(m[2]), receive]] as const) {
        if (!type) continue;
        const problems: string[] = [];
        const items = pre === undefined ? [] : parseNotation(pre, `${type}^${event}`, problems, readings);
        if (type === "ACK") { if (items.length) acks.push({ event, file, items }); continue; }
        messages.push({ type, event, title, file, items, problems });
      }
    }
  }
  return { messages, readings, ack: generalAck(acks), ackCount: acks.length };
}

/**
 * The general acknowledgment. The event pages print it after each event, some as MSH MSA and some as MSH MSA [ERR]; it
 * is the fullest print, when every other print is that one with optional items left out (the others are `misfits`).
 */
function generalAck(acks: { event: string; file: string; items: EventItem[] }[]): EventPages["ack"] {
  if (!acks.length) return undefined;
  const fullest = acks.reduce((a, b) => (b.items.length > a.items.length ? b : a));
  const sig = (i: EventItem) => JSON.stringify(shape([i]));
  const fits = (items: EventItem[]) => {
    let k = 0;
    for (const i of fullest.items) if (k < items.length && sig(items[k]) === sig(i)) k++; else if (i.minOccurs !== 0) return false;
    return k === items.length;
  };
  const prints = new Map<string, string[]>();
  for (const p of acks) prints.set(JSON.stringify(shape(p.items)), [...(prints.get(JSON.stringify(shape(p.items))) ?? []), p.event]);
  const reading = `ACK: the general acknowledgment is the fullest of the ${acks.length} prints after the events (${[...prints.values()].map((events) => `${events.length} print${events.length > 1 ? "s" : ""} like ${events[0]}'s`).join(", ")}); the others leave out its optional items`;
  return { items: fullest.items, file: fullest.file, reading, misfits: acks.filter((p) => !fits(p.items)).map((p) => p.event) };
}
