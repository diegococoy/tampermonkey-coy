// ==UserScript==
// @name         The Movie DataBase TMDB Season List
// @namespace    themoviedblist
// @version      0.6
// @description	 Agrega un boton para abrir las portadas
// @author       Diego Cabezas Coy
// @icon         https://www.themoviedb.org/assets/2/favicon-32x32-543a21832c8931d3494a68881f6afcafc58e96c5d324345377f3197a37b367b5.png
// @grant        GM_addStyle
// @grant        GM_setClipboard
// @homepage     https://github.com/diegococoy/tampermonkey-coy/blob/main/README.md
// @downloadURL  https://raw.githubusercontent.com/diegococoy/tampermonkey-coy/refs/heads/main/The_Movie_DataBase_TMDB_Season_List.js
// @updateURL    https://raw.githubusercontent.com/diegococoy/tampermonkey-coy/refs/heads/main/The_Movie_DataBase_TMDB_Season_List.js
// @match        https://www.themoviedb.org/tv/*/season/*
// @match        https://www.themoviedb.org/*
// ==/UserScript==

// ==========
// 2025-08-14
// ==========

(function () {
  "use strict";
  const css = `
        
        `;

  GM_addStyle(css);

  var esSeason = window.location.href.indexOf("/season/") >= 0;

  var esImages = window.location.href.indexOf("/images/") >= 0;

  if (esSeason && !esImages) {
    var tags = document.querySelectorAll(".episode_title");

    var episodes = Array.from(tags);

    var no = ("" + episodes.length).length;

    if (episodes.length < 10) {
      no = no + 1;
    }

    console.log(no);

    var lista = "";

    episodes.forEach((ep) => {
      var a = ep.querySelector(".no_click");
      var name = a.innerText;

      name = name.replace(":", "");
      name = name.replace("¿", "");
      name = name.replace("?", "");
      name = name.replace("  ", "");
      name = name.replace("..", ".");
      name = name.trim();

      var season = a.getAttribute("data-season-number") + "";
      season = season.padStart(2, "0");

      var episode = a.getAttribute("data-episode-number") + "";
      episode = episode.padStart(no, "0");

      //let line = "S" + season + "E" + episode + "\t" + name + "\tS" + season + "E" + episode + " " + name;
      let line = season + "E" + episode + " " + name;

      console.log(line);

      lista = lista + line + "\n";
    });

    var msg = "Texto copiado!";

    GM_setClipboard(lista, "text", () => console.log(msg));

    alert(msg);
  }
})();
