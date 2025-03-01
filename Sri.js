// ==UserScript==
// @name         Sri
// @namespace    Sri
// @version      1.1
// @description
// @author       Diego Cabezas Coy
// @icon         https://outlook-1.cdn.office.net/assets/mail/pwa/v1/pngs/apple-touch-icon.png
// @grant        GM_addStyle
// @homepage     https://github.com/diegococoy/tampermonkey-coy/blob/main/README.md
// @downloadURL  https://raw.githubusercontent.com/diegococoy/tampermonkey-coy/refs/heads/main/Sri.js
// @updateURL    https://raw.githubusercontent.com/diegococoy/tampermonkey-coy/refs/heads/main/Sri.js
// @match
// ==/UserScript==

// ==========
// 2025-01-17
// ==========

(function () {
  const css = `
        .help-block{margin-top:0px !important;margin-bottom:0px !important;}
        .panel-body{padding: 0px 5px 0px 5px !important;}
        .panel-heading{padding: 2px 5px !important;}
        `;

  GM_addStyle(css);
})();
