// ==UserScript==
// @name         Outlook 365
// @namespace    outlook
// @version      3.7
// @description  Agrega un boton para abrir las portadas
// @author       Diego Cabezas Coy
// @icon         https://outlook-1.cdn.office.net/assets/mail/pwa/v1/pngs/apple-touch-icon.png
// @grant        GM_addStyle
// @homepage     https://github.com/diegococoy/tampermonkey-coy/blob/main/README.md
// @downloadURL  https://raw.githubusercontent.com/diegococoy/tampermonkey-coy/refs/heads/main/Outlook_365.js
// @updateURL    https://raw.githubusercontent.com/diegococoy/tampermonkey-coy/refs/heads/main/Outlook_365.js
// @match        http://*.mail.live.com/*
// @match        https://*.mail.live.com/*
// @match        http://mail.live.com/*
// @match        https://mail.live.com/*
// @match        https://snt153.mail.live.com/*
// @match        http://outlook.live.com/*
// @match        https://outlook.live.com/*
// ==/UserScript==

// ==========
// 2025-01-17
// ==========

(function () {
  const css = "";
  //Se quito boton "Actualizar a Premium"
  //css = css + "._n_15{display:none !important; position:absolute !important}"
  //css = css + "._2F6rWwLisyawGGg32JOcop{display:none !important}"
  css += `
        css = css + ".CCkr1.jYY8g{display:none !important}"
        `;

  //Se alargo el arbol de carpetas
  css += `
        ._n_X4._n_05{bottom:30px !important}
        `;

  //Se quito la barra derecha de publicidad
  css += `
        ._n_h{display:none !important}";
        ._1fti_QgAzqGWPGlqh_FSvI{display:none !important}
        `;

  //Se quito mensaje de publicidad
  //css = css + ".FiPRo>div:first-of-type>div:first-of-type>div:first-of-type{display:none !important}"
  css += `
        #OwaContainer{display:none !important}";
        #a5d0f061-4eb2-6123-c4aa-8332301092b3{display:none !important}"
        `;

  //Se amplio el contenedor del mail para ocupar el ancho del explorador
  //css = css + "#primaryContainer>div:nth-last-child(1){right:0px !important}";
  css += `
        ._3a6SuYqdwIspGohT1zu16B{display:none !important}
        `;

  //Se quito el boton "Probar la version beta"
  //css = css + "._28ithXDZzMqSN0YAG2rCVn{display:none !important}"
  css += `
        .Ogqyq{display:none !important}
        `;

  GM_addStyle(css);
})();
