// ==UserScript==
// @name         AVAC
// @namespace    AVAC
// @version      1.1
// @description
// @author       Diego Cabezas Coy
// @icon
// @grant        GM_addStyle
// @homepage     https://github.com/diegococoy/tampermonkey-coy/blob/main/README.md
// @downloadURL  https://raw.githubusercontent.com/diegococoy/tampermonkey-coy/refs/heads/main/Avac.js
// @updateURL    https://raw.githubusercontent.com/diegococoy/tampermonkey-coy/refs/heads/main/Avac.js
// @match        https://avac.ups.edu.ec/*
// @match        https://avac.ups.edu.ec/posgrados/course/view.php?id=*
// @match        https://avac.ups.edu.ec/posgrados/mod/quiz/view.php?id=*
// ==/UserScript==

// ==========
// 2025-01-17
// ==========

(function () {
  const css = `
        body:not(.focusmode) .navbar:not(.fm-navbar) { display: none }
        .floating-buttons { display: none }
        `;

  GM_addStyle(css);

  var e = $("body").find("#module-30656");

  var ol = e.find("ol").first();

  ol.html(
    "<li>Septiembre 14;&nbsp; 18:00-20:00&nbsp; &nbsp; &nbsp; &nbsp; MASTERCLASS&nbsp; UNIDAD 1&nbsp;</li>" +
      "<li>Septiembre 15;&nbsp; 20:00-22:00&nbsp; &nbsp; &nbsp; &nbsp; MASTERCLASS&nbsp; UNIDAD 1&nbsp;</li>" +
      "<li>Septiembre 16;&nbsp; 18:00-20:00&nbsp; &nbsp; &nbsp; &nbsp; MASTERCLASS&nbsp; UNIDAD 1&nbsp;</li>" +
      "<li>Septiembre 17;&nbsp; 08:00-14:00&nbsp; &nbsp; &nbsp; &nbsp; MASTERCLASS&nbsp; UNIDAD 1 LABORATORIO MALWARE</li>" +
      "<li>Septiembre 21;&nbsp; 18:00-20:00&nbsp; &nbsp; &nbsp;&nbsp;&nbsp; MASTERCLASS&nbsp; UNIDAD 2</li>" +
      "<li>Septiembre 22;&nbsp; 20:00-22:00&nbsp; &nbsp; &nbsp;&nbsp;&nbsp; MASTERCLASS&nbsp; UNIDAD 2</li>" +
      "<li>Septiembre 23;&nbsp; 18:00-20:00&nbsp; &nbsp; &nbsp;&nbsp;&nbsp; MASTERCLASS&nbsp; UNIDAD 2</li>" +
      "<li>Septiembre 24;&nbsp; 10:00-14:00&nbsp; &nbsp; &nbsp; &nbsp; MASTERCLASS&nbsp; UNIDAD 2 LABORATORIO SYSLOGS</li>" +
      "<li>Septiembre 28;&nbsp; 18:00-20:00&nbsp; &nbsp; &nbsp;&nbsp;&nbsp; MASTERCLASS&nbsp; UNIDAD 3</li>" +
      "<li>Septiembre 29;&nbsp; 20:00-22:00&nbsp; &nbsp; &nbsp;&nbsp;&nbsp; MASTERCLASS&nbsp; UNIDAD 3</li>" +
      "<li>Septiembre 30;&nbsp; 18:00-20:00&nbsp; &nbsp; &nbsp;&nbsp;&nbsp; MASTERCLASS&nbsp; UNIDAD 3</li>" +
      "<li>Octubre 01;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 08:00-14:00&nbsp; &nbsp; &nbsp; &nbsp; MASTERCLASS&nbsp; UNIDAD 3 LABORATORIO FORENSE</li>" +
      "<li>Octubre 05;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 18:00-20:00&nbsp; &nbsp; &nbsp; &nbsp; MASTERCLASS&nbsp; UNIDAD 4</li>" +
      "<li>Octubre 06;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 20:00-22:00&nbsp; &nbsp; &nbsp; &nbsp; MASTERCLASS&nbsp; UNIDAD 4</li>" +
      "<li>Octubre 07;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 18:00-20:00&nbsp; &nbsp; &nbsp; &nbsp; MASTERCLASS&nbsp; UNIDAD 4</li>" +
      "<li>Octubre 08;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 10:00-12:00&nbsp; &nbsp; &nbsp; &nbsp; EXAMEN FIN UNIDAD</li>"
  );
})();
