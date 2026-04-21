#!/usr/bin/env node
// Copy the 9 capability demos from the source repo into public/demos/ so
// we can iframe them live at /demos/{id}.html (no remote fetch).
// Demos flagged as having audio get a mute-bootstrap injected into <head>
// so the parent page can toggle audio via postMessage without reloading.

import { readdirSync, readFileSync, writeFileSync, mkdirSync, copyFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC_DIR = resolve(__dirname, "../vendor/huashu-design/demos");
const OUT_DIR = resolve(__dirname, "../public/demos");

// Demos that produce sound — inject the mute bootstrap into these.
const AUDIO_DEMOS = new Set([
  "c1-ios-prototype-en.html",
  "c1-ios-prototype-zh.html",
]);

const BOOTSTRAP = `<script>(function(){
  var __muted = true; // start muted; parent unmutes via postMessage
  var __contexts = [];
  var __media = [];
  function apply(el){
    try { el.muted = __muted; if (__muted) { if (typeof el.volume === 'number') el.volume = 0; } else { el.volume = 1; } } catch(e){}
  }
  function applyAll(){
    __media.forEach(apply);
    __contexts.forEach(function(ctx){
      try { if (__muted) ctx.suspend && ctx.suspend(); else ctx.resume && ctx.resume(); } catch(e){}
    });
  }
  ['AudioContext','webkitAudioContext'].forEach(function(k){
    var Orig = window[k];
    if (!Orig) return;
    function Wrapped(opts){
      var ctx = new Orig(opts);
      __contexts.push(ctx);
      if (__muted) { try { ctx.suspend(); } catch(e){} }
      return ctx;
    }
    Wrapped.prototype = Orig.prototype;
    try { window[k] = Wrapped; } catch(e){}
  });
  var OrigCreate = document.createElement.bind(document);
  document.createElement = function(tag){
    var el = OrigCreate.apply(document, arguments);
    if (tag && /^(audio|video)$/i.test(tag)) { __media.push(el); apply(el); }
    return el;
  };
  function scan(root){
    if (!root || !root.querySelectorAll) return;
    root.querySelectorAll('audio,video').forEach(function(el){
      if (__media.indexOf(el) === -1) { __media.push(el); apply(el); }
    });
  }
  function boot(){
    scan(document);
    var mo = new MutationObserver(function(muts){
      muts.forEach(function(m){
        m.addedNodes.forEach(function(n){
          if (n.nodeType !== 1) return;
          if (/^(AUDIO|VIDEO)$/.test(n.tagName)) { __media.push(n); apply(n); }
          scan(n);
        });
      });
    });
    mo.observe(document.body || document.documentElement, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
  window.addEventListener('message', function(e){
    if (!e.data || typeof e.data !== 'object') return;
    if (e.data.__mute === undefined) return;
    __muted = !!e.data.__mute;
    applyAll();
  });
  // Announce readiness so parent can send initial state.
  try { parent.postMessage({ __muteReady: true, href: location.pathname }, '*'); } catch(e){}
})();<\/script>`;

mkdirSync(OUT_DIR, { recursive: true });

const files = readdirSync(SRC_DIR).filter((f) => f.endsWith(".html"));
let injected = 0;
for (const f of files) {
  const srcPath = resolve(SRC_DIR, f);
  const outPath = resolve(OUT_DIR, f);
  if (AUDIO_DEMOS.has(f)) {
    let html = readFileSync(srcPath, "utf8");
    if (html.includes("<head>")) {
      html = html.replace("<head>", `<head>\n${BOOTSTRAP}`);
    } else {
      html = BOOTSTRAP + html;
    }
    writeFileSync(outPath, html);
    injected++;
  } else {
    copyFileSync(srcPath, outPath);
  }
}
console.log(`✓ Copied ${files.length} demo HTML files → public/demos/ (mute bootstrap injected into ${injected})`);
