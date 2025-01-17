// ==UserScript==
// @name         Magnet Links
// @namespace    links
// @version      1.3
// @description  Omite los magnet links
// @author       Diego Cabezas Coy
// @icon         https://iwalif.com/img/cloud.svg
// @grant        GM_addStyle
// @homepage     https://github.com/diegococoy/tampermonkey-coy/blob/main/README.md
// @downloadURL  https://raw.githubusercontent.com/diegococoy/tampermonkey-coy/refs/heads/main/Magnet_Links.js
// @updateURL    https://raw.githubusercontent.com/diegococoy/tampermonkey-coy/refs/heads/main/Magnet_Links.js
// @match        http://pelkex.net/*
// @match        http://freshpelis.com/*
// @match        https://iwalif.com/*
// ==/UserScript==

/* globals jQuery, $, keyuser, Ok, getAfterSharp, kj_decode, waitForKeyElements */

// ==========
// 2025-01-17
// ==========

(function () {
  var url = window.location.href;

  if (url.includes("pelkex")) {
    if (url.includes("sitorrent")) {
      window.open(url + "?k=" + keyuser, "_self");
    } else if (url.includes("pelix")) {
      window.open(url + "?k=" + keyuser, "_self");
    } else {
      window.open(url + "?k=" + keyuser, "_self");
    }
    return;
  }

  if (url.includes("freshpelis")) {
    if (url.includes("solotorrent")) {
      window.open(url + "?k=" + keyuser, "_self");
    } else {
      window.open(url + "?k=" + keyuser, "_self");
    }
    return;
  }

  if (url.includes("iwalif")) {
    window.open(kj_decode(atob(getAfterSharp())), "_self");
    return;
  }

  Ok = 0;

  $("body").find("script").remove();

  $("html").unbind();

  $("#contador").unbind();

  $("footer").remove();

  var parent = $("#contador").parent();

  var newButton = $("<input/>").attr({
    type: "button",
    id: "contadornuevo",
    value: "Go to download link",
    class: "btn button",
  });

  parent.append(newButton);

  $("#contador").remove();

  $("#contadornuevo").on("click", function () {
    var url = window.location.href;
    if (url.includes("pelkex")) {
      if (url.includes("sitorrent")) {
        window.open(url + "?k=" + keyuser, "_self");
      } else if (url.includes("pelix")) {
        window.open(url + "?k=" + keyuser, "_self");
      } else {
        window.open(url + "?k=" + keyuser, "_self");
      }
    }
    if (url.includes("freshpelis")) {
      if (url.includes("solotorrent")) {
        window.open(url + "?k=" + keyuser, "_self");
      } else {
        window.open(url + "?k=" + keyuser, "_self");
      }
    }
    if (url.includes("iwalif")) {
      console.log(getAfterSharp());
      window.open(kj_decode(atob(getAfterSharp())), "_blank");
      console.log("Finalizado");
    }
  });
})();
