// ==UserScript==
// @name         The Movie DataBase TMDB Title
// @namespace    themoviedbtitle
// @version      0.1
// @description	 Genera y copia el titulo de la pelicula o serie
// @author       Diego Cabezas Coy
// @icon         https://www.themoviedb.org/assets/2/favicon-32x32-543a21832c8931d3494a68881f6afcafc58e96c5d324345377f3197a37b367b5.png
// @grant        GM_addStyle
// @grant        GM_setClipboard
// @homepage     https://github.com/diegococoy/tampermonkey-coy/blob/main/README.md
// @downloadURL  https://raw.githubusercontent.com/diegococoy/tampermonkey-coy/refs/heads/main/The_Movie_DataBase_TMDB_Title.js
// @updateURL    https://raw.githubusercontent.com/diegococoy/tampermonkey-coy/refs/heads/main/The_Movie_DataBase_TMDB_Title.js
// @match        https://pelisenhd.org/pelicula*/*
// @match        https://pelisenhd.org/series-tv*/*
// ==/UserScript==

// ==========
// 2025-09-05
// ==========

(function () {
  "use strict";
  const css = `
        `;

  GM_addStyle(css);

  var esMovie = include(window.location.href, "/pelicula");
  var esShow = include(window.location.href, "/series-tv");

  //Si es pelicula o serie
  if (esMovie || esShow) {
    var detailsTitle = document.querySelector(".details__title");

    var tituloEs = detailsTitle.querySelector("h1").textContent;
    var tituloEn = detailsTitle.querySelector("small").textContent;
    var resto = "";

    if (include(tituloEs, tituloEn)) {
      tituloEn = "";
    }

    var formatoTmp = "";
    if (include(tituloEs, "[")) {
      var pos1 = tituloEs.indexOf("[", 0);
      formatoTmp = tituloEs.substring(pos1 + 1, tituloEs.indexOf("]", pos1));
      resto = tituloEs.substring(pos1);
      tituloEs = tituloEs.substring(0, pos1);
    }

    var details_langs = document.querySelector(".details__langs");
    var idioma = findLanguage(details_langs);

    var sub_meta = document.querySelector(".sub-meta");
    var anio = findYear(sub_meta);

    var details_quality = document.querySelector(".details__quality");
    var calidad = findQuality(details_quality);
    var formato = findFormat(details_quality, formatoTmp);

    if (include(resto, "pesada") || include(window.location.href, "pesada")) {
      formato += " PESADA";
    }

    /*
        console.log(tituloEs);
        console.log(tituloEn);
        console.log(anio);
        console.log(calidad);
        console.log(formato);
        console.log(idioma);
        */

    var titulo = "";
    if (esMovie) {
      titulo = `${tituloEs} ${tituloEn} (${anio}) ${calidad} ${formato} ${idioma} BB`.replace("  ", " ").trim();
    }

    if (esShow) {
      titulo = `${tituloEn} (${anio}) ${tituloEs} Season ## [] ${calidad} ${formato} ${idioma} BB`.replace("  ", " ").trim();
    }

    //console.log(titulo);

    var msg = `${msg} ${titulo}`;
    GM_setClipboard(titulo, "Title", () => {
      alert(msg);
      console.log(msg);
    });
  }

  function include(source, text) {
    return source.toLowerCase().indexOf(text.toLowerCase()) >= 0;
  }

  function isNotNullOrEmpty(text) {
    return text !== null && text !== "" && text !== undefined;
  }

  function isNullOrEmpty(text) {
    return text === null || text === "" || text === undefined;
  }

  function findYear(sub_meta) {
    var anio = sub_meta.querySelector('[itemprop="dateCreated"]');

    if (isNotNullOrEmpty(anio)) {
      return anio.textContent;
    }
    return "####";
  }

  function findQuality(details_quality) {
    var quality = details_quality.querySelector('[class="card__quality"]');

    var calidad = "";
    if (isNotNullOrEmpty(quality)) {
      calidad = quality.textContent;
    }

    switch (calidad) {
      case "4K UHD":
        calidad = "3840p";
        break;
      default:
        calidad = "1080p";
    }

    return calidad;
  }

  function findFormat(details_quality, formatoTmp) {
    var format = details_quality.querySelector('[class*="card__quality formato"]');

    var formato = formatoTmp;

    if (isNotNullOrEmpty(format)) {
      formato = format.textContent;
    }

    if (isNotNullOrEmpty(formato)) {
      switch (formato) {
        case "BRRIP":
          formato = "BR";
          break;
        case "WEB-DL":
          formato = "WD";
          break;
      }
    } else {
      formato = "WD";
    }

    return formato;
  }

  function findLanguage(details_langs) {
    var lang = details_langs.querySelector('[alt="Latino"]');
    if (isNotNullOrEmpty(lang)) {
      return lang.getAttribute("alt");
    }

    lang = details_langs.querySelector('[alt="Castellano"]');
    if (isNotNullOrEmpty(lang)) {
      return lang.getAttribute("alt");
    }

    lang = details_langs.querySelector('[alt="Inglés"]');
    if (isNotNullOrEmpty(lang)) {
      return lang.getAttribute("alt");
    }

    var imgs = details_langs.querySelectorAll("img");

    for (const img of imgs) {
      idioma += `${img.getAttribute("alt").trim()} `;
    }

    return idioma;
  }
})();
