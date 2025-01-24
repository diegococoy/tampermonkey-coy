// ==UserScript==
// @name         PelisHD
// @namespace    acortados
// @version      0.1
// @description  Acortador
// @author       Diego Cabezas Coy
// @icon         https://acortados.com/assets/img/icon.png
// @grant        GM_addStyle
// @homepage     https://github.com/diegococoy/tampermonkey-coy/blob/main/README.md
// @downloadURL  https://raw.githubusercontent.com/diegococoy/tampermonkey-coy/refs/heads/main/PelisHD.js
// @updateURL    https://raw.githubusercontent.com/diegococoy/tampermonkey-coy/refs/heads/main/PelisHD.js
// @match        https://acortados.com/*
// ==/UserScript==

// ==========
// 2025-01-17
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

  //Clipboard(url);

  function Clipboard(text) {
    const a = document.querySelector(".main");

    navigator.clipboard.writeText(text);
    console.log(text);
    alert(text);

    var btn = CreateButton("Abrir", text);
    //a.appendChild(btn);
    a.prepend(btn);
  }

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
