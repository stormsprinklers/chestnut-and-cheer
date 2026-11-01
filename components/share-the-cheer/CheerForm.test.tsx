import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { CheerForm } from "./CheerForm";

test("both forms render named controls and accessible verification/error regions", () => {
  for (const kind of ["nomination", "support"] as const) {
    const html = renderToStaticMarkup(createElement(CheerForm, { kind }));
    const ids = [...html.matchAll(/<(?:input|textarea|select)\b[^>]*\bid="([^"]+)"/g)].map((match) => match[1]);
    assert.ok(ids.length >= (kind === "nomination" ? 10 : 5));
    for (const id of ids) assert.match(html, new RegExp(`<label[^>]*for="${id}"`), `${kind}: missing label for ${id}`);
    assert.match(html, /aria-live="polite"/);
    assert.match(html, /aria-labelledby="(?:nomination|support)-title"/);
    assert.match(html, /type="submit"/);
  }
});

test("nomination form clearly separates the submitter from the nominated family", () => {
  const html = renderToStaticMarkup(createElement(CheerForm, { kind: "nomination" }));
  assert.match(html, />Your information</);
  assert.match(html, />Nominated family</);
  assert.match(html, /sponsor this family at cost/i);
});
