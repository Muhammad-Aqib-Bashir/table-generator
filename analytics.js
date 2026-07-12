/**
 * analytics.js
 * ------------------------------------------------------------------
 * Single source of truth for all analytics/tracking on this site.
 * Include this one file on every page:
 *
 *   <script src="analytics.js"></script>
 *
 * It handles:
 *   1. Loading & initializing Google Analytics 4 (gtag.js)
 *   2. A reusable window.trackEvent(name, params) helper that any
 *      page-specific script (script.js, grid.js, etc.) can call
 *   3. Automatic tracking of outbound link clicks (GitHub, license, etc.)
 *   4. Automatic tracking of internal nav clicks
 *
 * To change the GA4 property, or add a new tracked interaction that
 * should apply site-wide, do it here ONCE instead of editing every page.
 * ------------------------------------------------------------------
 */
(function () {
  "use strict";

  // ---- Configuration ----------------------------------------------------
  var GA_MEASUREMENT_ID = "G-EPNVMBMHW4";

  // ---- 1. Load & initialize GA4 -----------------------------------------
  var gaScript = document.createElement("script");
  gaScript.async = true;
  gaScript.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
  document.head.appendChild(gaScript);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
  });

  // ---- 2. Reusable event tracking helper --------------------------------
  /**
   * window.trackEvent(eventName, params)
   * Call this from any page script to send a GA4 event, e.g.:
   *   window.trackEvent("table_generated", { number: 5, from: 1, to: 10 });
   */
  window.trackEvent = function (eventName, params) {
    if (typeof gtag !== "function") return;
    gtag("event", eventName, params || {});
  };

  // ---- 3 & 4. Automatic link tracking + shared UI helpers ---------------
  document.addEventListener("DOMContentLoaded", function () {
    // Track every outbound (external) link click site-wide
    document.querySelectorAll('a[href^="http"]').forEach(function (link) {
      var isExternal = link.hostname && link.hostname !== window.location.hostname;
      if (!isExternal) return;

      link.addEventListener("click", function () {
        window.trackEvent("outbound_link_click", {
          link_url: link.href,
          link_text: link.textContent.trim(),
        });
      });
    });

    // Track internal navigation (header nav links)
    document.querySelectorAll(".site-nav a").forEach(function (link) {
      link.addEventListener("click", function () {
        window.trackEvent("internal_nav_click", {
          link_url: link.getAttribute("href"),
          link_text: link.textContent.trim(),
        });
      });
    });
  });
})();
