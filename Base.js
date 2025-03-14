// ==UserScript==
// @name         .
// @namespace    .
// @version      0.0
// @description  .
// @author       Diego Cabezas Coy
// @icon         .
// @grant        GM_addStyle
// @homepage     https://github.com/diegococoy/tampermonkey-coy/blob/main/README.md
// @downloadURL  https://raw.githubusercontent.com/diegococoy/tampermonkey-coy/refs/heads/main/..js
// @updateURL    https://raw.githubusercontent.com/diegococoy/tampermonkey-coy/refs/heads/main/..js
// @match        https://*
// ==/UserScript==

/* globals jQuery, $ */

// ==========
// YYYY-MM-DD
// ==========

(function () {
  "use strict";

  const css = `
    .sty {  }
    `;

  GM_addStyle(css);

  //document.querySelector(".classname");
})();
