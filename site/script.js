/* Home page script — hero alternating loop player (hero-media, adapted
   from the intro-loop template per operator request 2026-07-06):
   the two clips ping-pong forever (A → B → A → B …) with an rAF
   crossfade at each handoff. Reduced-motion users keep the poster;
   if autoplay is blocked the poster frame stands. */
(function () {
  'use strict';

  var wrap = document.querySelector('[data-intro-loop]');
  if (!wrap) return;
  var a = wrap.querySelector('[data-il-intro]');
  var b = wrap.querySelector('[data-il-loop]');
  if (!a || !b) return;
  var FADE_MS = 400, LEAD = 0.4, rafId = null;
  var active = a, standby = b, handingOff = false;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    a.removeAttribute('autoplay');
    a.pause();
    b.pause();
    return; // poster stands
  }

  function crossfade() {
    if (handingOff) return;
    handingOff = true;
    var from = active, to = standby;
    to.currentTime = 0;
    var p = to.play();
    if (p && p.catch) p.catch(function () {});
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var f = Math.min((ts - start) / FADE_MS, 1);
      to.style.opacity = String(f);
      from.style.opacity = String(1 - f);
      if (f < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        from.pause();
        active = to;
        standby = from;
        handingOff = false;
      }
    }
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(step);
  }

  function watch() {
    if (this !== active || handingOff) return;
    var left = this.duration - this.currentTime;
    if (left <= LEAD && left > 0) crossfade();
  }

  a.addEventListener('timeupdate', watch);
  b.addEventListener('timeupdate', watch);
  a.addEventListener('ended', function () { if (active === a) crossfade(); });
  b.addEventListener('ended', function () { if (active === b) crossfade(); });
})();
