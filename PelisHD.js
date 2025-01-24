// ==UserScript==
// @name         PelisHD
// @namespace    acortados
// @version      0.2
// @description  Acortador
// @author       Diego Cabezas Coy
// @icon         https://acortados.com/assets/img/icon.png
// @grant        GM_addStyle
// @homepage     https://github.com/diegococoy/tampermonkey-coy/blob/main/README.md
// @downloadURL  https://raw.githubusercontent.com/diegococoy/tampermonkey-coy/refs/heads/main/PelisHD.js
// @updateURL    https://raw.githubusercontent.com/diegococoy/tampermonkey-coy/refs/heads/main/PelisHD.js
// @match        https://acortados.com/*
// ==/UserScript==

/* globals jQuery, $, main_site, DYykkzwP, api_key */

// ==========
// 2025-01-24
// ==========

(function () {
  "use strict";

  const css = `
    .green { background-color:#94CC72 !important }
    `;

  GM_addStyle(css);

  function f(a) {
    return a.replace(/[a-z]/gi, (a) => {
      return String.fromCharCode(a.charCodeAt(0) + (a.toLowerCase() <= "m" ? 13 : -13));
    });
  }
  //setTimeout(function () { window.location.href = MzJempbs; }, 3000);

  var url = f(atob(main_site)) + "/r.php?f=" + DYykkzwP + "&t=" + api_key;

  const main = document.querySelector(".main");
  var btn = CreateButton("Abrir", url);
  main.prepend(btn);

  function CreateButton(nombre, url) {
    var btn = document.createElement("input");
    btn.setAttribute("type", "button");
    btn.setAttribute("class", "button button-purple green");
    btn.setAttribute("name", nombre);
    btn.setAttribute("value", nombre);
    btn.addEventListener("click", () => click(url));
    return btn;
  }

  function click(url) {
    window.open(url, "_blank");
  }
})();
