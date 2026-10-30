// Whether a package version is already staged on npm, waiting for a maintainer's approval, so the
// Publish workflow does not stage it again (npm refuses with E409 "Cannot stage previously
// published version"). `npm view`, which unpublished.mjs asks, only sees live versions.
//
//   node .github/scripts/staged.mjs <name> <version>
//
// Prints "staged=true", "staged=false" or "staged=unknown" for $GITHUB_OUTPUT. Listing stages needs
// npm credentials, and `npm stage list` does not do the trusted-publishing exchange that
// `npm stage publish` does, so this script does it itself, the way npm's own OIDC helper does: a
// GitHub Actions ID token (audience npm:registry.npmjs.org, needs `id-token: write`) is exchanged at
// /-/npm/v1/oidc/token/exchange/package/<name> for a short-lived token, which then lists the
// package's stages at /-/stage. "unknown" (no ID token, an exchange or a listing refused) leaves
// the decision to the caller, which stages as before.
/* global console, fetch, process */

const REGISTRY = process.env.NPM_REGISTRY ?? "https://registry.npmjs.org";
const [name, version] = process.argv.slice(2);

/** The package's stages, or undefined with the reason logged. */
async function listStages() {
  const { ACTIONS_ID_TOKEN_REQUEST_URL: requestUrl, ACTIONS_ID_TOKEN_REQUEST_TOKEN: requestToken } = process.env;
  if (!requestUrl || !requestToken) {
    console.error("No GitHub Actions ID token available (the job needs `permissions: id-token: write`).");
    return undefined;
  }
  const idUrl = new URL(requestUrl);
  idUrl.searchParams.append("audience", `npm:${new URL(REGISTRY).hostname}`);
  const id = await fetch(idUrl, { headers: { Accept: "application/json", Authorization: `Bearer ${requestToken}` } });
  const idToken = id.ok ? (await id.json()).value : undefined;
  if (!idToken) {
    console.error(`GitHub refused an ID token: HTTP ${id.status}.`);
    return undefined;
  }

  const escaped = name.startsWith("@") ? `@${encodeURIComponent(name.slice(1))}` : encodeURIComponent(name);
  const exchange = await fetch(new URL(`/-/npm/v1/oidc/token/exchange/package/${escaped}`, REGISTRY), {
    method: "POST",
    headers: { Accept: "application/json", Authorization: `Bearer ${idToken}` },
  });
  const token = exchange.ok ? (await exchange.json()).token : undefined;
  if (!token) {
    console.error(`npm refused the token exchange for ${name}: HTTP ${exchange.status} (is its trusted publisher set up?).`);
    return undefined;
  }

  const items = [];
  for (let page = 0; ; page++) {
    const url = new URL("/-/stage", REGISTRY);
    url.search = new URLSearchParams({ page: String(page), perPage: "100", package: name }).toString();
    const response = await fetch(url, { headers: { Accept: "application/json", Authorization: `Bearer ${token}` } });
    if (!response.ok) {
      console.error(`npm refused to list the stages of ${name}: HTTP ${response.status}.`);
      return undefined;
    }
    const body = await response.json();
    items.push(...(body.items ?? []));
    if (items.length >= (body.total ?? 0) || (body.items ?? []).length < 100) return items;
  }
}

if (!name || !version) {
  console.error("Usage: node .github/scripts/staged.mjs <name> <version>");
  process.exit(2);
}

let stages;
try {
  stages = await listStages();
} catch (error) {
  console.error(`Could not list the stages of ${name}: ${error.message}`);
}

if (!stages) {
  console.log("staged=unknown");
} else {
  const stage = stages.find((s) => s.packageName === name && s.version === version);
  if (stage) console.error(`${name}@${version} is already staged (stage ${stage.id}, status ${stage.status ?? "unknown"}).`);
  else console.error(`${name}@${version} is not staged yet.`);
  console.log(`staged=${stage ? "true" : "false"}`);
}
