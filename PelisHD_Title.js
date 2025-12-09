// ==UserScript==
// @name         PelisHD Title
// @namespace    themoviedbtitle
// @version      0.4
// @description	 Genera y copia el titulo de la pelicula o serie
// @author       Diego Cabezas Coy
// @icon         https://pelisenhd.org/wp-content/uploads/2023/09/logo.png
// @grant        GM_addStyle
// @grant        GM_setClipboard
// @homepage     https://github.com/diegococoy/tampermonkey-coy/blob/main/README.md
// @downloadURL  https://raw.githubusercontent.com/diegococoy/tampermonkey-coy/refs/heads/main/PelisHD_Title.js
// @updateURL    https://raw.githubusercontent.com/diegococoy/tampermonkey-coy/refs/heads/main/PelisHD_Title.js
// @match        https://pelisenhd.org/pelicula*/*
// @match        https://pelisenhd.org/series-tv*/*
// @match        https://pelisenhd.org/episodio-*/*
// ==/UserScript==

// ==========
// 2025-12-02
// ==========

(function () {
  "use strict";
  const css = `.btncoy {
    text-transform: uppercase;
    margin: 0px;
    padding: 0px 10px;
    min-width: 150px;
    background-color: rgb(24 32 49 / 50%);
    color: white;
    font-size: 16px;
  }
  .nav_epi { justify-content: start !important; }
        `;

  GM_addStyle(css);

  var url = window.location.href;

  var esMovie = include(url, "/pelicula");
  var esShow = include(url, "/series-tv");
  var esEspisode = include(url, "/episodio-");

  //console.log('esMovie: ' + esMovie);
  //console.log('esShow: ' + esShow);
  //console.log('esEspisode: ' + esEspisode);

  var titulo = "";
  var id = "";

  //Si es pelicula o serie
  if (esMovie || esShow) {
    let detailsTitle = document.querySelector(".details__title");

    let tituloEs = detailsTitle.querySelector("h1").textContent;
    let tituloEn = detailsTitle.querySelector("small").textContent;

    let resto = "";

    if (tituloEs === tituloEn) {
      if (esShow) {
        tituloEs = "";
      } else {
        tituloEn = "";
      }
    }

    let formatoTmp = "";
    if (include(tituloEs, "[")) {
      var pos1 = tituloEs.indexOf("[", 0);
      formatoTmp = tituloEs.substring(pos1 + 1, tituloEs.indexOf("]", pos1));
      resto = tituloEs.substring(pos1);
      tituloEs = tituloEs.substring(0, pos1);
    }

    let details_langs = document.querySelector(".details__langs");
    let idioma = findLanguage(details_langs);

    let sub_meta = document.querySelector(".sub-meta");
    let anio = findYear(sub_meta);

    let details_quality = document.querySelector(".details__quality");
    let calidad = findQuality(details_quality);
    let formato = findFormat(details_quality, formatoTmp);

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

    titulo = "";
    if (esMovie) {
      titulo = `${tituloEs} ${tituloEn} (${anio}) ${calidad} ${formato} ${idioma} BB`;
    }

    if (esShow) {
      titulo = `${tituloEn} (${anio}) ${tituloEs} Season ## [#] ${calidad} ${formato} ${idioma} BB`;
    }

    titulo = cleanText(titulo);

    console.log(titulo);

    saveTitle(tituloEs, titulo);

    detailsTitle.prepend(CreateButton("Copy Title", titulo));

    //Copy(titulo);
  }

  if (esEspisode) {
    let headerTitle = document.querySelector(".title");
    let title = headerTitle.querySelector("h2").textContent;
    let epi = headerTitle.querySelector("small").querySelector("span").textContent;
    const season = epi.split("Temporada ")[1].split(" - ")[0];
    let last = document.querySelector(".nav_content").querySelector("h3").textContent;
    const episodes = last.split(" al ")[1];
    console.log(last);
    console.log(episodes);
    let titulo = loadTitle(title);
    console.log(titulo);
    titulo = titulo.replaceAll("##", season);
    console.log(titulo);
    titulo = titulo.replaceAll("#", episodes);
    console.log(titulo);

    let navEpi = document.querySelector(".nav_epi");
    if (isNotNullOrEmpty(titulo)) {
      navEpi.prepend(CreateButton("Copy Title", titulo));
    }
  }

  function cleanText(text) {
    text = text.replaceAll(":", " ").trim();
    text = text.replaceAll(",", " ").trim();
    text = text.replaceAll("_", " ").trim();
    text = text.replaceAll("¿", " ").trim();
    text = text.replaceAll("?", " ").trim();
    text = text.replaceAll("!", " ").trim();
    text = text.replaceAll("  ", " ").trim();

    return text;
  }

  function saveTitle(id, value) {
    sessionStorage.setItem(id, value);
    //console.log('id->' + id);
    //console.log('value->' + value);
  }

  function loadTitle(id) {
    let value = sessionStorage.getItem(id);
    //console.log('id->' + id);
    //console.log('value->' + value);
    return value;
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

  function CreateButton(nombre, copiar) {
    var btn = document.createElement("input");
    btn.setAttribute("type", "button");
    btn.setAttribute("class", "header__sign-in btncoy");
    btn.setAttribute("name", nombre);
    btn.setAttribute("value", nombre);
    btn.addEventListener("click", () => Copy(copiar));
    return btn;
  }

  function Copy(copiar) {
    var msg = `Título: ${copiar}`;
    GM_setClipboard(copiar, "Title", () => {
      alert(msg);
      console.log(msg);
    });
  }
})();
