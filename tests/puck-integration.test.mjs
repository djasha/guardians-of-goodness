import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));

function source(path) {
  return readFileSync(join(root, path), "utf8");
}

const puckComponentNames = [
  "PageHero",
  "Hero",
  "FeatureGrid",
  "CTABand",
  "Image",
  "RichText",
  "Stats",
  "Quote",
  "Columns",
  "SocialLinks",
  "ArticleGrid",
  "PartnersStrip",
  "ImpactStats",
  "ContactInfo",
];

test("legacy /p route resolves dynamic Puck data before rendering", () => {
  const page = source("src/app/(site)/p/[slug]/page.tsx");

  assert.match(page, /resolveAllData/);
  assert.match(page, /puckServerConfig/);
  assert.match(page, /resolveAllData\(\s*puckData,\s*puckServerConfig\s*\)/);
  assert.match(page, /<Render\s+config=\{puckServerConfig\}\s+data=\{resolvedData\}/);
});

test("publishing clears pending draft autosaves", () => {
  const editor = source("src/app/admin/editor/[slug]/EditorClient.tsx");

  assert.match(editor, /clearPendingDraftSave/);
  assert.match(editor, /mode === "publish"[\s\S]{0,240}clearPendingDraftSave\(\)/);
  assert.match(editor, /pendingSerializedData\.current = null/);
  assert.match(editor, /setLastPublishedAt/);
});

test("autosave ignores unchanged initial Puck data", () => {
  const editor = source("src/app/admin/editor/[slug]/EditorClient.tsx");

  assert.match(editor, /lastPersistedData = useRef\(serializePuckData/);
  assert.match(editor, /serialized === lastPersistedData\.current/);
  assert.match(editor, /lastPersistedData\.current = serializePuckData\(data\)/);
  assert.match(editor, /function sortPuckValue/);
  assert.match(editor, /Object\.keys\(value\)[\s\S]{0,80}\.sort\(\)/);
  assert.match(editor, /function normalizePuckValue/);
  assert.match(editor, /key === "overlay"/);
  assert.match(editor, /key === "zones"/);
  assert.match(editor, /key\.startsWith\("_"\)/);
});

test("editor entry points address pages by document id with slug fallback", () => {
  const admin = source("src/app/admin/page.tsx");
  const action = source("src/sanity/actions/editInPageBuilder.tsx");
  const presentation = source("src/sanity/presentation/resolve.ts");
  const editorPage = source("src/app/admin/editor/[slug]/page.tsx");
  const apiRoute = source("src/app/api/puck/[slug]/route.ts");

  assert.match(admin, /encodeURIComponent\(page\._id\)/);
  assert.match(action, /props\.id/);
  assert.match(presentation, /id: "_id"/);
  assert.match(presentation, /pageBuilderHref/);
  assert.match(presentation, /encodeURIComponent/);
  assert.match(editorPage, /_id == \$identifier/);
  assert.match(editorPage, /slug\.current == \$identifier/);
  assert.match(editorPage, /!\(_id in path\("drafts\.\*\*"\)\)/);
  assert.match(apiRoute, /_id == \$identifier/);
  assert.match(apiRoute, /slug\.current == \$identifier/);
  assert.match(apiRoute, /!\(_id in path\("drafts\.\*\*"\)\)/);
});

test("public Puck renders use the server-safe config", () => {
  const catchAll = source("src/app/(site)/[...path]/page.tsx");
  const legacy = source("src/app/(site)/p/[slug]/page.tsx");
  const serverConfig = source("src/puck/config.server.tsx");

  assert.match(catchAll, /@\/puck\/config\.server/);
  assert.match(legacy, /@\/puck\/config\.server/);
  assert.doesNotMatch(catchAll, /@\/puck\/config["']/);
  assert.doesNotMatch(legacy, /@\/puck\/config["']/);
  assert.doesNotMatch(serverConfig, /ImagePickerField/);
});

test("client and server Puck configs expose the same block set", () => {
  const clientConfig = source("src/puck/config.tsx");
  const serverConfig = source("src/puck/config.server.tsx");

  for (const componentName of puckComponentNames) {
    const componentKeyPattern = new RegExp(`\\b${componentName}:`);
    assert.match(clientConfig, componentKeyPattern, `${componentName} missing from client config`);
    assert.match(serverConfig, componentKeyPattern, `${componentName} missing from server config`);
  }
});

test("draft-aware editor and API reads use the token-backed Sanity client", () => {
  const writeClient = source("src/sanity/writeClient.ts");
  const editorPage = source("src/app/admin/editor/[slug]/page.tsx");
  const apiRoute = source("src/app/api/puck/[slug]/route.ts");

  assert.match(writeClient, /draftReadClient/);
  assert.match(writeClient, /perspective:\s*"raw"/);
  assert.match(editorPage, /@\/sanity\/writeClient/);
  assert.match(editorPage, /draftReadClient\.fetch\(EDITOR_QUERY/);
  assert.match(apiRoute, /draftReadClient\.fetch\(LANDING_PAGE_QUERY/);
  assert.match(apiRoute, /writeClient\.getDocument\(publishedId\)/);
  assert.doesNotMatch(apiRoute, /client\.getDocument/);
});
