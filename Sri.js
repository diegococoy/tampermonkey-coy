// ==UserScript==
// @name         Sri
// @namespace    Sri
// @version      1.2
// @description
// @author       Diego Cabezas Coy
// @icon         https://outlook-1.cdn.office.net/assets/mail/pwa/v1/pngs/apple-touch-icon.png
// @grant        GM_addStyle
// @homepage     https://github.com/diegococoy/tampermonkey-coy/blob/main/README.md
// @downloadURL  https://raw.githubusercontent.com/diegococoy/tampermonkey-coy/refs/heads/main/Sri.js
// @updateURL    https://raw.githubusercontent.com/diegococoy/tampermonkey-coy/refs/heads/main/Sri.js
// @match        https://sriservicios.sri.gob.ec/anexo-gastos-personales*
// @match        https://srienlinea.sri.gob.ec/auth*
// ==/UserScript==

// ==========
// 2025-03-28
// ==========

(function () {
  const css = `
        .help-block{margin-top:0px !important;margin-bottom:0px !important;}
        .panel-body{padding: 0px 5px 0px 5px !important;}
        .panel-heading{padding: 2px 5px !important;}
        .fa-2x { font-size: 1em !important;}
        .input-group .form-control:not(:first-child):not(:last-child) { width: 100px !important;}
        `;

  var usuario = document.querySelector("#usuario");
  usuario.onpaste = function () {
    return true;
  };
  var password = document.querySelector("#password");
  password.onpaste = function () {
    return true;
  };

  GM_addStyle(css);
})();
