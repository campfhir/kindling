// Fetches the external HL7 sample messages the fixture tests read (src/fixtures.test.ts) into
// fixtures/external/, which is not committed: the sample collections carry no license, so they are
// cloned at a pinned commit instead of being copied into this repository.
//
//   pnpm fixtures:fetch
//
// Needs git and network access to github.com; CI runs it before the tests.
/* global console */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const EXTERNAL = join(ROOT, "fixtures", "external");

/** Repositories pinned by commit; a newer commit is taken on purpose, with the expectations reviewed. */
export const SOURCES = [
  {
    name: "sample-hl7-messages",
    url: "https://github.com/bqfan/sample-hl7-messages.git",
    commit: "7a0525a7bb4bb2526c9206ede4daeb4198ef5ba9",
  },
];

for (const source of SOURCES) {
  const dir = join(EXTERNAL, source.name);
  if (existsSync(join(dir, ".git"))) {
    const head = execFileSync("git", ["-C", dir, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
    if (head === source.commit) {
      console.log(`${source.name}: already at ${source.commit.slice(0, 12)}`);
      continue;
    }
    rmSync(dir, { recursive: true, force: true });
  }
  mkdirSync(dir, { recursive: true });
  execFileSync("git", ["init", "-q", dir]);
  execFileSync("git", ["-C", dir, "fetch", "-q", "--depth", "1", source.url, source.commit]);
  execFileSync("git", ["-C", dir, "checkout", "-q", "FETCH_HEAD"]);
  console.log(`${source.name}: fetched ${source.commit.slice(0, 12)} into ${dir}`);
}
