#!/bin/bash
# Downloads the three segment tables that codegen/validate/ledger.mjs compares for one HL7 version:
# hl7.eu segment pages, Caristix segment JSON and HAPI's generated segment classes (field
# definitions only; HAPI is MPL 1.1 / GPL and is read, not copied).
#
# Usage: codegen/validate/fetch-sources.sh <version> <target-dir>     e.g. v2.3.1 /tmp/hl7-sources/v2.3.1
# Files already present are kept, so a rerun only fetches what is missing.
set -u
VERSION=${1:?version directory name, e.g. v2.3 or v2.3.1}
OUT=${2:?target directory}
HL7=$(cd "$(dirname "$0")/../.." && pwd)
short=${VERSION#v}; short=${short//./}          # v2.3.1 -> 231 (hl7.eu directory and HAPI module names)
api=${VERSION#v}                                # Caristix API version: 2.3.1
mkdir -p "$OUT/hl7eu" "$OUT/caristix" "$OUT/hapi"
for f in "$HL7"/src/segments/"$VERSION"/*.ts; do
  seg=$(basename "$f" .ts)
  case "$seg" in index|*.test|*.sample) continue ;; esac
  [ -s "$OUT/hl7eu/$seg.htm" ] || curl -sf --max-time 40 "https://www.hl7.eu/HL7v2x/v$short/hl7v${short}segm$seg.htm" -o "$OUT/hl7eu/$seg.htm"
  [ -s "$OUT/caristix/$seg.json" ] || curl -sf --max-time 40 "https://hl7-definition.caristix.com/v2-api/1/HL7v$api/Segments/$seg" -o "$OUT/caristix/$seg.json"
  [ -s "$OUT/hapi/$seg.java" ] || curl -sf --max-time 40 "https://raw.githubusercontent.com/hapifhir/hapi-hl7v2/master/hapi-structures-v$short/src/main/java/ca/uhn/hl7v2/model/v$short/segment/$seg.java" -o "$OUT/hapi/$seg.java"
done
date -u +%Y-%m-%d > "$OUT/fetched.txt"
for d in hl7eu caristix hapi; do echo "$d: $(ls "$OUT/$d" | wc -l) file(s)"; done
