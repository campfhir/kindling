#!/bin/bash
# Adds one HL7 version from the hl7.eu pages, the steps of codegen/extract/README.md in order:
# extract, import, register, generate, adopt MSH/BHS/FHS, write the decided values, rebuild, check.
#
# Usage:  codegen/extract/add-version.sh <version> <sources-dir> [--keep-extraction]
#   <sources-dir> is the folder codegen/validate/fetch-sources.sh wrote for the version.
#   --keep-extraction skips the hl7.eu parse (an extraction from the PDFs is already in codegen/extracted/<version>).
# The message ledger runs only when Caristix events were pulled; a missing HAPI module is passed as empty folders.
set -euo pipefail
v=${1:?version, e.g. v2.7}
dir=$(cd "${2:?sources dir}" && pwd)
keep=${3:-}
cd "$(dirname "$0")/../.."
const="V$(echo "${v#v}" | tr . _)"

[ "$keep" = --keep-extraction ] || npx tsx codegen/extract/from-hl7eu.ts "$v" "$dir" "codegen/extracted/$v"
npx tsx codegen/extract/import-extraction.ts "$v"

# Register the version in codegen/generate.ts (after the last registered one) if it is not there yet.
if ! grep -q "schemas/$v/version.ts" codegen/generate.ts; then
  node -e '
    const fs = require("fs"); const [v, c] = process.argv.slice(1); const p = "codegen/generate.ts";
    let s = fs.readFileSync(p, "utf8");
    const imports = [...s.matchAll(/^import \{ V\d[\w]* \} from "\.\/schemas\/v[\d.]+\/version\.ts";$/gm)];
    const last = imports[imports.length - 1];
    s = s.slice(0, last.index + last[0].length) + `\nimport { ${c} } from "./schemas/${v}/version.ts";` + s.slice(last.index + last[0].length);
    s = s.replace(/const VERSIONS: VersionSchema\[\] = \[([^\]]*)\];/, (m, list) => `const VERSIONS: VersionSchema[] = [${list}, ${c}];`);
    fs.writeFileSync(p, s);
  ' "$v" "$const"
fi

regenerate() {
  # src/<v> holds the segments and the messages: clear the segments (every module that is not a message,
  # a test, the barrel or the registry) so the generator writes them again from the spec
  mkdir -p "src/$v"
  for f in "src/$v"/*.ts; do
    [ -e "$f" ] || continue   # a new version's folder is empty
    case "$f" in *.test.ts|*/index.ts|*/registry.ts) continue ;; esac
    grep -q -e "@generated message" -e "^ \* [A-Z0-9_]* message for HL7 " "$f" || rm -f "$f"
  done
  npx tsx codegen/generate-segments.ts --version "$v" | tail -1
  # one command per line: under set -e a failure inside an && chain would not stop the script
  pnpm -s codegen >/dev/null
  pnpm -s barrels >/dev/null
  pnpm -s exports >/dev/null
}
regenerate
node codegen/validate/ledger.mjs "$v" "$dir" --adopt MSH,BHS,FHS | tail -1
node codegen/validate/ledger.mjs "$v" "$dir" --fix-spec | tail -1
regenerate

npx tsx codegen/extract/verify-import.ts "$v"
node codegen/validate/ledger.mjs "$v" "$dir" | tail -1
if [ -n "$(ls "$dir/caristix/events" 2>/dev/null | grep -v _index)" ]; then
  hapi="$dir/hapi"; mkdir -p "$hapi/message" "$hapi/group"
  npx tsx codegen/validate/message-ledger.ts "$v" --caristix "$dir/caristix/events" \
    --hapi "$hapi/message" "$hapi/group" "$hapi/eventmap.properties" --hl7eu "$dir/hl7eu/chapters" | grep -v '^  differs'
fi
