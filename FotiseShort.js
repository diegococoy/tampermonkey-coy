// ==UserScript==
// @name         Fotise Short
// @namespace    fotise
// @version      0.1
// @description	 Salta la espera
// @author       Diego Cabezas Coy
// @icon         https://out.fotise.com/favicon.ico
// @grant        GM_addStyle
// @grant        GM_setClipboard
// @homepage     https://github.com/diegococoy/tampermonkey-coy/blob/main/README.md
// @downloadURL  https://raw.githubusercontent.com/diegococoy/tampermonkey-coy/refs/heads/main/FotiseShort.js
// @updateURL    https://raw.githubusercontent.com/diegococoy/tampermonkey-coy/refs/heads/main/FotiseShort.js
// @match        https://out.fotise.com/*
// @require      https://code.jquery.com/jquery-1.12.4.js
// ==/UserScript==

/* globals app_vars, jQuery, $ */

// ==========
// 2025-11-06
// ==========

(function () {
  "use strict";
  const css = ``;

  GM_addStyle(css);

  const btncountdown = document.querySelector("#countdown");

  btncountdown.prepend(CreateButton("LINK"));

  //app_vars.counter_value = 100;

  $("#go-link").removeClass("hidden");
  $("#go-link").addClass("go-link");

  $("#go-submit").removeClass("hidden");
  $("#go-submit").removeAttr("disabled");

  let timeMili = 500;

  $(counter_start_object).on(app_vars["counter_start"] + ".adLinkFly.counter", function (e) {
    if (ad_type === "banner") {
      var timer = $("#timer");

      window.setTimeout(function () {
        var time = app_vars["counter_value"] * timeMili,
          delta = timeMili,
          tid;

        tid = setInterval(function () {
          if (window.blurred) {
            return;
          }
          time -= delta;
          timer.text(time / timeMili);
          if (time <= 0) {
            clearInterval(tid);

            $("#go-link").addClass("go-link");
            $("#go-link.go-link").submit();
          }
        }, delta);
      }, 500);

      window.onblur = function () {
        window.blurred = true;
      };
      window.onfocus = function () {
        window.blurred = false;
      };
    }

    if (ad_type === "interstitial") {
      var skip_ad = $(".skip-ad");
      var counter = $(".skip-ad .counter");

      window.setTimeout(function () {
        var time = app_vars["counter_value"] * timeMili,
          delta = timeMili,
          tid;

        tid = setInterval(function () {
          time -= delta;
          counter.text(time / timeMili + " s");
          if (time <= 0) {
            skip_ad.html('<a href="" class="btn" onclick="javascript: return false;">' + app_vars["skip_ad"] + "</a>");
            clearInterval(tid);
            $("#go-link").addClass("go-link");
            $("#go-link.go-link").submit();
          }
        }, delta);
      }, 500);
    }
  });

  $("#go-link").one("submit.adLinkFly.counterSubmit", function (e) {
    e.preventDefault();
    Enviar($(this));
  });

  function Enviar(goForm) {
    if (!goForm.hasClass("go-link")) {
      return;
    }

    var submitButton = goForm.find("button");

    $.ajax({
      dataType: "json", // The type of data that you're expecting back from the server.
      type: "POST", // he HTTP method to use for the request
      url: goForm.attr("action"),
      data: goForm.serialize(), // Data to be sent to the server.
      beforeSend: function (xhr) {
        if (ad_type === "banner") {
          //submitButton.attr("disabled", "disabled");
          $("a.get-link").text(app_vars["getting_link"]);
        }
        if (ad_type === "interstitial") {
          //submitButton.attr("disabled", "disabled");
        }
      },
      success: function (result, status, xhr) {
        if (result.url) {
          alert("ad_type: " + ad_type);

          if (ad_type === "banner") {
            window.location.href = result.url;
          }
          if (ad_type === "interstitial") {
            $(".skip-ad a").attr("href", result.url).removeAttr("onclick");
          }
        } else {
          alert(result.message);
        }
      },
      error: function (xhr, status, error) {
        console.log("An error occured: " + xhr.status + " " + xhr.statusText);
      },
      complete: function (xhr, status) {},
    });
  }

  function CreateButton(nombre) {
    var btn = document.createElement("input");
    btn.setAttribute("type", "button");
    btn.setAttribute("class", "btn btn-success");
    btn.setAttribute("name", nombre);
    btn.setAttribute("value", nombre);
    btn.addEventListener("click", () => {
      //$("#go-link.go-link").submit();
      Enviar($("#go-link"));
    });
    return btn;
  }
})();
