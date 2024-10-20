// ==UserScript==
// @name         The Movie DataBase TMDB
// @namespace    themoviedb
// @version      1.2
// @description  Agrega un boton para abrir las portadas
// @author       Diego Cabezas Coy
// @match        https://www.themoviedb.org/movie/*
// @match        https://www.themoviedb.org/tv/*
// @icon         https://www.themoviedb.org/assets/2/favicon-32x32-543a21832c8931d3494a68881f6afcafc58e96c5d324345377f3197a37b367b5.png
// @grant        GM_addStyle
// @downloadURL  https://192.168.100.74:1081/Tampermonkey/The_Movie_DataBase_TMDB.js
// @updateURL    https://192.168.100.74:1081/Tampermonkey/The_Movie_DataBase_TMDB.js
// ==/UserScript==

// ==========
// 2024-10-17
// ==========

(function () {
  const css = `
        .btncoy { margin: 0 2px !important; padding: 2px 5px !important; color: white; }
        `;

  GM_addStyle(css);

  var content = document.querySelector("header div.content");

  var esShow = window.location.href.indexOf("/tv/") >= 0;
  var esMovie = window.location.href.indexOf("/movie/") >= 0;
  var tieneImage = window.location.href.indexOf("/images") >= 0;
  var tieneTitle = window.location.href.indexOf("/titles") >= 0;
  var tieneSeason = window.location.href.indexOf("/seasons") >= 0;

  if (esShow || esMovie) {
    if (esShow && !tieneImage && !tieneTitle && !tieneSeason) {
      //5
      content.prepend(CreateButton("Season", "/seasons"));
    }

    if (esMovie && !tieneImage && !tieneTitle && !tieneSeason) {
      //4
      content.prepend(CreateButton("Title", "/titles"));
    }

    if (!tieneImage && !tieneTitle && !tieneSeason) {
      //3
      content.prepend(CreateButton("Logo", "/images/logos?image_language=en&language=en"));
      //2
      content.prepend(CreateButton("Back", "/images/backdrops?image_language=en&language=en"));
      //1
      content.prepend(CreateButton("Post", "/images/posters?image_language=en&language=en"));
    }
  }

  function CreateButton(nombre, data) {
    var btn = document.createElement("input");
    btn.setAttribute("type", "button");
    btn.setAttribute("class", "rounded btncoy");
    btn.setAttribute("name", nombre);
    btn.setAttribute("value", nombre);
    btn.setAttribute("data", data);
    btn.addEventListener("click", () => click(btn));
    return btn;
  }

  function click(btn, append) {
    window.open(window.location.href + btn.getAttribute("data"), "_blank");
  }
})();
