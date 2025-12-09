// ==UserScript==
// @name         The Movie DataBase TMDB Season List
// @namespace    themoviedblist
// @version      0.8
// @description	 Permite copiar el listado de capítulos
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
// 2025-10-18
// ==========

(function () {
  "use strict";
  const css = `
        `;

  GM_addStyle(css);

  var esSeason = window.location.href.indexOf("/season/") >= 0;

  var esImages = window.location.href.indexOf("/images/") >= 0;

  var lista = "";

  //Si es season y no tiene images en la url
  if (esSeason && !esImages) {
    var tags = document.querySelectorAll(".episode_title");

    var episodes = Array.from(tags);

    var no = ("" + episodes.length).length;

    if (episodes.length < 10) {
      no = no + 1;
    }

    //console.log(no);

    episodes.forEach((ep) => {
      var a = ep.querySelector(".no_click");
      var name = a.innerText;

      name = cleanText(name);

      var season = a.getAttribute("data-season-number") + "";
      season = season.padStart(2, "0");

      var episode = a.getAttribute("data-episode-number") + "";
      episode = episode.padStart(no, "0");

      //let line = "S" + season + "E" + episode + "\t" + name + "\tS" + season + "E" + episode + " " + name;
      let line = "S" + season + "E" + episode + " " + name;

      //console.log(line);

      lista = lista + line + "\n";
    });

    var h2 = document.querySelector(".title.ott_true");

    h2.append(CreateButton("Copiar", lista));

    //Copy("Copiado", lista);
  }

  function CreateButton(nombre, texto) {
    var btn = document.createElement("input");
    btn.setAttribute("type", "button");
    btn.setAttribute("class", "rounded btncoy");
    btn.setAttribute("name", nombre);
    btn.setAttribute("value", nombre);
    btn.addEventListener("click", () => Copy("Copiado", texto));
    return btn;
  }

  function cleanText(texto) {
    texto = texto.replaceAll(":", " ").trim();
    texto = texto.replaceAll(",", " ").trim();
    texto = texto.replaceAll("_", " ").trim();
    texto = texto.replaceAll("¿", " ").trim();
    texto = texto.replaceAll("?", " ").trim();
    texto = texto.replaceAll("!", " ").trim();
    texto = texto.replaceAll("  ", " ").trim();

    return texto;
  }

  function Copy(msg, texto) {
    GM_setClipboard(texto, "text", () => {
      alert(msg);
      console.log(msg);
    });
  }
})();
