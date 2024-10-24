// ==UserScript==
// @name         Saludsa Centrical
// @namespace    minigames.gameffective.me
// @version      0.3
// @description  Permite manipular los puzzle
// @author       Diego Cabezas Coy
// @match        http://minigames.gameffective.me/*
// @match        https://minigames.gameffective.me/*
// @match        http://minigames.centrical.me/*
// @match        https://minigames.centrical.me/*
// @match        https://saludsa.centrical.me/w/game/missions/3306
// @icon         https://centrical.com/wp-content/themes/centrical-master/assets/img/favicon/favicon-32x32.png
// @grant        GM_addStyle
// @homepage     https://github.com/diegococoy/tampermonkey-coy/blob/main/README.md
// @updateURL    https://raw.githubusercontent.com/diegococoy/tampermonkey-coy/refs/heads/main/Saludsa_Centrical.js
// @downloadURL  https://raw.githubusercontent.com/diegococoy/tampermonkey-coy/refs/heads/main/Saludsa_Centrical.js
// ==/UserScript==

// 2024-10-16

(function () {
  const css = `
        .hola {  }
        `;

  GM_addStyle(css);

  //debugger;

  console.clear();

  console.log("LOAD------------------------------------------------");
  console.log("CFG");
  console.log("PuzzleSize: " + Config.defaultPuzzleSize);

  Config = {
    //'R,G,B'
    color: "0, 180, 255", // Main colors and gradients first color, Default: '0, 180, 255'
    color2: "0, 90, 122", // Gradients second color, Default: '0, 90, 122'
    foreGround: "255, 255, 255", // text, borders and size selector
    backGround: "0, 0, 0", // background and grid
    buttons: "white", // Button colors: 'white' or 'black'
    fullScreen: true, // true/false, false=run in fixed canvas, true=run in full window
    hintMovePenalty: 0, // Hint Move Penalty (classic mode), Default: 5
    hintTimePenalty: 10, // Hint Time Penalty (challenge mode), Default: 10
    fullImageMovePenalty: 0, // Show Full Image Move Penalty (classic mode), Default: 10
    fullImageTimePenalty: 15, // Show Full Image Time Penalty (challenge mode), Default: 15
    quickMode: 0, // Quick mode without menu: 0=off,1=classic,2=challenge,3=fun (random image v1.2.4)
    versionCheck: false, // true/false
    // v1.2.3
    simpleMode: false, // Simple mode without buttons and timer - true/false
    // v1.2.4
    defaultPuzzleSize: 5, // Default puzzle size (useful for quickMode)
    gestureStyle: "swipe", // gestureStyle default setting: 'swipe' or 'tap' (same as in main menu swith at bottom, useful for quickMode with simpleMode which there is no menu)
    packNum: 4, // The number of image packs in images folder, the following packages should be named: pack0, pack1, pack2... and etc.
    // v1.2.7
    openOwnImages: true, // Allow open own images
    videoFPS: 30, // Video Puzzle frame/second
    // v1.2.8
    //imageForQuickMode: 'images/pack3/pack3_1.jpg',   // Image path for quickMode, use the word 'default' to use the default random image
    imageForQuickMode: "default", // Image path for quickMode, use the word 'default' to use the default random image
    defaultImagePack: "1", // You can specify the default image pack, (2 is the video pack by default)
    // v1.2.9
    nextButton: false, // Next button for the quickMode
    winCallback: "wonFunc", // External function for saving scores or something like that
  };

  console.log("PuzzleSize: " + Config.defaultPuzzleSize);

  repaint();
  repaint2();
  buttonRepaint();
  console.log("FINAL");
})();
