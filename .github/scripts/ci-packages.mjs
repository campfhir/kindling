// Prints the workspace packages CI checks, as a GitHub Actions matrix
// ("packages=[{folder,name},...]" on stdout for $GITHUB_OUTPUT).
//
// With BASE_SHA set (a pull request), only the packages the change touches: a package is checked
// when a file under packages/<folder>/ changed, and every package is checked when a file they share
// changed (root manifests, the lockfile, the shared lint and TypeScript configs, .github/). Without
// it (a push to main, a manual run), every package. Needs the history back to BASE_SHA.
import { execFileSync } from "node:child_process";
import { listPackages } from "./packages.mjs";

/** Files every package depends on. */
const SHARED = [/^package\.json$/, /^pnpm-lock\.yaml$/, /^pnpm-workspace\.yaml$/, /^tsconfig\.base\.json$/, /^eslint\.config\.mjs$/, /^\.npmrc$/, /^\.github\//];

const packages = listPackages().map(({ folder, name }) => ({ folder, name }));
const base = process.env.BASE_SHA;
let selected = packages;

if (base) {
  const changed = execFileSync("git", ["diff", "--name-only", `${base}...HEAD`], { encoding: "utf8" }).split("\n").filter(Boolean);
  const shared = changed.filter((file) => SHARED.some((pattern) => pattern.test(file)));
  if (shared.length > 0) {
    console.error(`Shared files changed (${shared.join(", ")}): checking every package.`);
  } else {
    selected = packages.filter(({ folder }) => changed.some((file) => file.startsWith(`packages/${folder}/`)));
  }
}

for (const { name } of packages) {
  console.error(`${name}: ${selected.some((p) => p.name === name) ? "checked" : "not touched, skipped"}`);
}
console.log(`packages=${JSON.stringify(selected)}`);
