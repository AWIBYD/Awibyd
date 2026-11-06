/* BYD Karebosi Connect – service worker (aplikasi terpasang + cadangan offline) */
var V = "bkc-v1";
var SHELL = ["/", "/haka-care/", "/manifest.json", "/favicon.svg", "/icons/icon-192.png", "/icons/icon-512.png"];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(V).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== V; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  var r = e.request, u = new URL(r.url);
  if (r.method !== "GET" || u.origin !== location.origin) return; // API & pihak ketiga tidak di-cache
  if (u.pathname.indexOf("/cro") === 0) return;                   // dashboard internal tidak di-cache
  if (r.mode === "navigate") {
    // Halaman: selalu ambil versi terbaru, pakai cache hanya saat offline
    e.respondWith(fetch(r).then(function (res) {
      var cp = res.clone(); caches.open(V).then(function (c) { c.put(u.pathname, cp); }); return res;
    }).catch(function () {
      return caches.match(u.pathname).then(function (m) { return m || caches.match("/"); });
    }));
    return;
  }
  // Aset statis: cache dulu, perbarui di belakang
  e.respondWith(caches.match(r).then(function (m) {
    var net = fetch(r).then(function (res) {
      if (res.ok) { var cp = res.clone(); caches.open(V).then(function (c) { c.put(r, cp); }); }
      return res;
    }).catch(function () { return m; });
    return m || net;
  }));
});
