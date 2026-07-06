/* Home page script — hero intro-loop player (hero-media template).
   Intro plays once, rAF crossfade hands off to the natively-looping
   loop video. Reduced-motion users keep the poster. */
(function () {
  'use strict';

  var wrap = document.querySelector('[data-intro-loop]');
  if (!wrap) return;
  var intro = wrap.querySelector('[data-il-intro]');
  var loop = wrap.querySelector('[data-il-loop]');
  if (!intro || !loop) return;
  var FADE_MS = 400, LEAD = 0.4, rafId = null, handedOff = false;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    intro.removeAttribute('autoplay');
    intro.pause();
    loop.pause();
    return; // poster stands
  }

  function crossfade() {
    if (handedOff) return;
    handedOff = true;
    var p = loop.play();
    if (p && p.catch) p.catch(function () {});
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var f = Math.min((ts - start) / FADE_MS, 1);
      loop.style.opacity = String(f);
      intro.style.opacity = String(1 - f);
      if (f < 1) rafId = requestAnimationFrame(step);
      else intro.pause();
    }
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(step);
  }

  intro.addEventListener('timeupdate', function () {
    var left = intro.duration - intro.currentTime;
    if (left <= LEAD && left > 0) crossfade();
  });
  intro.addEventListener('ended', crossfade); // safety if timeupdate missed
})();
