import assert from "node:assert/strict";
import test from "node:test";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

test("la sanitización conserva SVG útil y elimina contenido activo", () => {
  const { window } = new JSDOM("");
  try {
    const sanitize = createDOMPurify(window);
    const clean = sanitize.sanitize(
      '<svg xmlns="http://www.w3.org/2000/svg"><g><text>Puntazo</text></g><script>alert(1)</script><a href="javascript:alert(1)" onclick="alert(1)"><text>Local</text></a></svg>',
      { USE_PROFILES: { svg: true } },
    );
    const document = new window.DOMParser().parseFromString(clean, "image/svg+xml");
    assert.equal(document.querySelector("g text")?.textContent, "Puntazo");
    assert.equal(document.querySelector("script"), null);
    assert.equal(document.querySelector("[onclick]"), null);
    assert.doesNotMatch(clean, /javascript:/i);
  } finally {
    window.close();
  }
});

test("SAFE_FOR_TEMPLATES elimina expresiones unidas dentro de shadow roots", () => {
  const { window } = new JSDOM("");
  try {
    const sanitize = createDOMPurify(window);
    const host = window.document.createElement("div");
    const shadow = host.attachShadow({ mode: "open" });
    shadow.append(
      window.document.createTextNode("$"),
      window.document.createElement("object"),
      window.document.createTextNode("{untrustedTemplateExpression}"),
    );

    sanitize.sanitize(host, { IN_PLACE: true, SAFE_FOR_TEMPLATES: true });
    shadow.normalize();

    assert.doesNotMatch(shadow.textContent ?? "", /\$\{untrustedTemplateExpression\}/);
    assert.equal(shadow.querySelector("object"), null);
  } finally {
    window.close();
  }
});
