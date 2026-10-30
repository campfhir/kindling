#!/bin/bash
# Pulls every external source the HL7 v2 ledgers compare, for one version, with curl, git and jq.
# Nothing is chosen by hand: the segment and event lists come from the sources themselves.
#
#   hl7.eu     the version's segment index (hl7v<n>segm.htm) names every segment page and the chapter
#              pages; both are fetched. A missing page answers HTTP 200 with a "Page Not Found" title,
#              so the content is checked and such a page is recorded as "absent", not as a fetch.
#   Caristix   the trigger-event index (TriggerEvents) names every message event; each event and each
#              segment of the hl7.eu index is fetched as JSON. Failures are retried and then reported.
#   HAPI       a sparse, shallow clone of hapi-hl7v2 (the repository's commit is recorded); the
#              version's segment, message and group classes and its event map are copied out. HAPI is
#              MPL 1.1 / GPL: its files are read to compare field tables, never copied into the repo.
#
# Usage:  codegen/validate/fetch-sources.sh <version> <target-dir> [--record]
#         e.g. codegen/validate/fetch-sources.sh v2.8.2 ~/hl7-sources/v2.8.2 --record
#
# Layout of <target-dir>:
#   hl7eu/<SEG>.htm            segment pages        -> ledger.mjs (segment ledger)
#   hl7eu/chapters/chNN.htm    chapter pages        -> message-ledger.ts --hl7eu
#   hl7eu/msgstruct.htm        message structure list (every structure, its syntax and its events)
#                                                   -> from-msgstruct.ts (v2.9, whose chapter tables have no captions)
#   caristix/<SEG>.json        segment tables       -> ledger.mjs
#   caristix/events/<EVENT>.json                    -> message-ledger.ts --caristix
#   hapi/<SEG>.java, hapi/message/, hapi/group/, hapi/eventmap.properties
#                                                   -> ledger.mjs, message-ledger.ts --hapi
#   MANIFEST.tsv               one line per fetch: source, key, URL, status, bytes, SHA-256
#
# --record also copies the manifest to codegen/validate/sources/<version>.tsv, so the commit that
# updates a ledger carries the URLs, HTTP outcomes and SHA-256 sums it was built from.
# Exit status is 1 when any source failed (network or server errors); "absent" is not a failure.
# Files already present are kept, so a rerun only fetches what is missing. Set HAPI_CACHE to choose
# where the HAPI clone lives (default: a .hapi-hl7v2 folder next to the target directory).
set -u
VERSION=${1:?version, e.g. v2.5.1 or v2.8.2}
OUT=${2:?target directory}
RECORD=${3:-}
HL7=$(cd "$(dirname "$0")/../.." && pwd)
short=${VERSION#v}; short=${short//./}          # v2.8.2 -> 282 (hl7.eu and HAPI names)
api=${VERSION#v}                                 # Caristix and HAPI dotted version: 2.8.2
mkdir -p "$OUT/hl7eu/chapters" "$OUT/caristix/events" "$OUT/hapi"
MANIFEST="$OUT/MANIFEST.tsv"
: > "$MANIFEST"
failed=0

# fetch <source> <key> <url> <dest>: GET with retries; writes one manifest line.
fetch() {
  local source=$1 key=$2 url=$3 dest=$4 http=000 attempt status bytes sha
  if [ -s "$dest" ]; then http=cached
  else
    for attempt in 1 2 3; do
      http=$(curl -s --max-time 60 -o "$dest.part" -w '%{http_code}' "$url")
      # 500 is the server's answer, not a passing fault: it is recorded as failed without retrying
      case "$http" in 200|404|500) break ;; esac
      sleep $((attempt * 2))
    done
    if [ "$http" = 200 ] && [ -s "$dest.part" ] && grep -q '<title>Page Not Found' "$dest.part"; then http="200-not-found"; fi
    if [ "$http" = 200 ] && [ -s "$dest.part" ]; then mv "$dest.part" "$dest"; fi
    rm -f "$dest.part"
  fi
  case "$http" in
    200|cached) status=ok ;;
    404|200-not-found) status=absent ;;
    *) status=failed; failed=1; echo "FAILED $source $key ($http): $url" >&2 ;;
  esac
  bytes=0; sha=-
  if [ "$status" = ok ]; then bytes=$(wc -c < "$dest"); sha=$(sha256sum "$dest" | cut -d' ' -f1); fi
  printf '%s\t%s\t%s\t%s\t%s\t%s\n' "$source" "$key" "$url" "$status" "$bytes" "$sha" >> "$MANIFEST"
}

# ---- hl7.eu: segment index, then the segment pages and chapter pages it names -------------------
index="$OUT/hl7eu/index.htm"
fetch hl7eu index "https://www.hl7.eu/HL7v2x/v$short/hl7v${short}segm.htm" "$index"
if [ -s "$index" ]; then
  for seg in $(grep -oE "segm[A-Z0-9]{3}\.html?" "$index" | sed -E 's/^segm//; s/\.html?$//' | sort -u); do
    fetch hl7eu "segment $seg" "https://www.hl7.eu/HL7v2x/v$short/hl7v${short}segm$seg.htm" "$OUT/hl7eu/$seg.htm"
  done
  # chapter pages are named in the index (ch02.html …); they sit in std<n>/ and are saved as .htm
  for ch in $(grep -oE "ch[0-9]{1,2}[A-Za-z]?\.html?" "$index" | sort -u); do   # ch04a.html: chapter 4A from v2.7 on
    name=${ch%.*}
    fetch hl7eu "chapter $name" "https://www.hl7.eu/HL7v2x/v$short/std$short/$ch" "$OUT/hl7eu/chapters/$name.htm"
  done
fi
fetch hl7eu msgstruct "https://www.hl7.eu/HL7v2x/v$short/hl7v${short}msgstruct.htm" "$OUT/hl7eu/msgstruct.htm"
# v2.1 and v2.2 have no chapter pages: their message structures are printed on the event pages the event index names
if ! ls "$OUT/hl7eu/chapters/"*.htm >/dev/null 2>&1; then
  mkdir -p "$OUT/hl7eu/events"
  fetch hl7eu events "https://www.hl7.eu/HL7v2x/v$short/hl7v${short}event.htm" "$OUT/hl7eu/events/_index.htm"
  if [ -s "$OUT/hl7eu/events/_index.htm" ]; then
    for event in $(grep -oE "hl7v${short}event[A-Z0-9]{3}\.htm" "$OUT/hl7eu/events/_index.htm" | sed -E "s/^hl7v${short}event//; s/\.htm$//" | sort -u); do
      fetch hl7eu "event $event" "https://www.hl7.eu/HL7v2x/v$short/hl7v${short}event$event.htm" "$OUT/hl7eu/events/$event.htm"
    done
  fi
fi

# ---- Caristix: the event index, each event and each segment ---------------------------------------
# Events live in caristix/events/ so a message named like a segment (ACK) is not read as a segment.
fetch caristix _events "https://hl7-definition.caristix.com/v2-api/1/HL7v$api/TriggerEvents" "$OUT/caristix/events/_index.json"
if [ -s "$OUT/caristix/events/_index.json" ]; then
  for event in $(jq -r '.[] | select(.type == "Message") | .id' "$OUT/caristix/events/_index.json"); do
    fetch caristix "event $event" "https://hl7-definition.caristix.com/v2-api/1/HL7v$api/TriggerEvents/$event" "$OUT/caristix/events/$event.json"
  done
fi
if [ -s "$index" ]; then
  for seg in $(grep -oE "segm[A-Z0-9]{3}\.html?" "$index" | sed -E 's/^segm//; s/\.html?$//' | sort -u); do
    fetch caristix "segment $seg" "https://hl7-definition.caristix.com/v2-api/1/HL7v$api/Segments/$seg" "$OUT/caristix/$seg.json"
  done
fi

# ---- HAPI: sparse clone of the version's module, pinned to the commit it was read at ---------------
HAPI_DIR=${HAPI_CACHE:-$(dirname "$OUT")/.hapi-hl7v2}
HAPI_URL=https://github.com/hapifhir/hapi-hl7v2.git
module="hapi-structures-v$short"
if [ ! -d "$HAPI_DIR/.git" ]; then
  git clone -q --depth 1 --filter=blob:none --sparse "$HAPI_URL" "$HAPI_DIR" 2>/dev/null || { failed=1; echo "FAILED hapi clone: $HAPI_URL" >&2; }
fi
if [ -d "$HAPI_DIR/.git" ]; then
  commit=$(git -C "$HAPI_DIR" rev-parse --short HEAD)
  git -C "$HAPI_DIR" sparse-checkout set "$module/src/main/java/ca/uhn/hl7v2/model/v$short" "$module/src/main/resources/ca/uhn/hl7v2/parser/eventmap" >/dev/null 2>&1
  model="$HAPI_DIR/$module/src/main/java/ca/uhn/hl7v2/model/v$short"
  if [ -d "$model" ]; then
    mkdir -p "$OUT/hapi/message" "$OUT/hapi/group"
    cp "$model"/segment/*.java "$OUT/hapi/"
    cp "$model"/message/*.java "$OUT/hapi/message/"
    cp "$model"/group/*.java "$OUT/hapi/group/"
    cp "$HAPI_DIR/$module/src/main/resources/ca/uhn/hl7v2/parser/eventmap/$api.properties" "$OUT/hapi/eventmap.properties" 2>/dev/null
    printf 'hapi\t%s\t%s\tok\t%s\t-\n' "$commit" "$HAPI_URL" "$(ls "$OUT/hapi/" | wc -l)" >> "$MANIFEST"
  else
    printf 'hapi\t%s\t%s\tabsent\t0\t-\n' "$commit" "$HAPI_URL" >> "$MANIFEST"
  fi
fi

# ---- summary --------------------------------------------------------------------------------------
echo "$VERSION -> $OUT"
for source in hl7eu caristix hapi; do
  echo "  $source: $(awk -F'\t' -v s="$source" '$1 == s && $4 == "ok" {n++} END {print n+0}' "$MANIFEST") ok, $(awk -F'\t' -v s="$source" '$1 == s && $4 == "absent" {n++} END {print n+0}' "$MANIFEST") absent, $(awk -F'\t' -v s="$source" '$1 == s && $4 == "failed" {n++} END {print n+0}' "$MANIFEST") failed"
done
if [ "$RECORD" = --record ]; then
  mkdir -p "$HL7/codegen/validate/sources"
  cp "$MANIFEST" "$HL7/codegen/validate/sources/$VERSION.tsv"
  echo "manifest recorded: codegen/validate/sources/$VERSION.tsv"
fi
exit $failed
