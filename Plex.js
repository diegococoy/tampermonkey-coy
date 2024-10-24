// ==UserScript==
// @name         Plex
// @namespace    Plex
// @version      2.0
// @description  Permite mover el panel en editar
// @author       Diego Cabezas Coy
// @match        http://127.0.0.1:32400/*
// @match        http://localhost:32400/*
// @match        http://192.168.100.74:32400/*
// @match        https://192.168.100.74:32400/*
// @require      https://code.jquery.com/jquery-1.12.4.js
// @require      https://code.jquery.com/ui/1.12.1/jquery-ui.js
// @icon         http://192.168.100.74:32400/web/favicon.ico
// @grant        GM_addStyle
// @homepage     https://github.com/diegococoy/tampermonkey-coy/blob/main/README.md
// @downloadURL  https://raw.githubusercontent.com/diegococoy/tampermonkey-coy/refs/heads/main/Plex.js
// @updateURL    https://raw.githubusercontent.com/diegococoy/tampermonkey-coy/refs/heads/main/Plex.js
// ==/UserScript==

/* globals jQuery, $, waitForKeyElements */

// ==========
// 2024-10-25
// ==========

(function () {
  const css = `
        .modal-header { cursor: move }
        .MetadataPosterTitle-singleLineTitle-24_DNu, .MetadataPosterCardTitle-singleLineTitle-_v31WY { text-transform: capitalize }
        `;

  GM_addStyle(css);

  $("body").on("DOMNodeInserted", function (e) {
    if (e.target.className == "modal-dialog") {
      $("div." + e.target.firstElementChild.className).draggable({
        handle: "h4",
      });
      copyToClipboard();
    }

    if (e.target.className.includes("match-modal")) {
      $("div." + e.target.firstElementChild.firstElementChild.className).draggable({
        handle: "h4",
      });
      copyToClipboard();
    }
  });

  function copyToClipboard() {
    $(".media-info-file-list.well").on("click", "li", function () {
      var aux = document.createElement("input");
      var txt = $(this).text().trim();
      aux.setAttribute("value", txt);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
      console.log("copiado: " + txt);
    });
  }
})();
