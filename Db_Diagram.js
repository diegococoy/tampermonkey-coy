// ==UserScript==
// @name         dbdiagram.io
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Quita publicidad
// @author       Diego Cabezas Coy
// @icon         https://cdn.holistics.io/logo-dbdiagram-notext.ico
// @grant        GM_addStyle
// @homepage     https://github.com/diegococoy/tampermonkey-coy/blob/main/README.md
// @updateURL    https://raw.githubusercontent.com/diegococoy/tampermonkey-coy/refs/heads/main/Db_Diagram.js
// @downloadURL  https://raw.githubusercontent.com/diegococoy/tampermonkey-coy/refs/heads/main/Db_Diagram.js
// @match        https://dbdiagram.io/*
// ==/UserScript==

/* globals jQuery, $ */

// ==========
// 2025-01-17
// ==========

(function () {
  const css = `
    .pro-btn { border: 1px solid red; display: none !important; }
  `;

  GM_addStyle(css);

  var editor = document.querySelector("div.editor");
  for (const node of editor.childNodes) {
    if (node.tagName === "SPAN") {
      node.style.display = "none";
    }
  }
})();
