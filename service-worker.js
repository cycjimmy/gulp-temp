var __wpo = {"assets":{"main":[],"additional":[],"optional":["./images/icons/index.03a72a.svg","./manifest.json","./scripts/vendor.bundle.fd7eb847.min.js","./scripts/main.bundle.725798fd.min.js","./style/main.725798fd.min.css","./favicon.ico"]},"externals":[],"hashesMap":{"3cf8c7aecb323cc6e9605040e770241fd20c9822":"./images/icons/index.03a72a.svg","5e9065612d8fc289927e36c8bbfc71bb10d6cf35":"./manifest.json","78f01c73920eba6db3ecc3d8514615c6ac66b007":"./scripts/vendor.bundle.fd7eb847.min.js","c67ece7924bea10ca4f5edef349e3c1b99850f9d":"./scripts/main.bundle.725798fd.min.js","ec9e11b89639bb30cef613a8a7e1814e9dce7d5a":"./style/main.725798fd.min.css","e7d0963ce52e499d7dba6f485bb87a4b3feda19a":"./favicon.ico"},"strategy":"changed","responseStrategy":"cache-first","version":"2017-4-6 12:35:24","name":"webpack-offline:gulp-temp","pluginVersion":"4.6.2","relativePaths":true};

!function(n){function e(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return n[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var t={};e.m=n,e.c=t,e.i=function(n){return n},e.d=function(n,t,r){e.o(n,t)||Object.defineProperty(n,t,{configurable:!1,enumerable:!0,get:r})},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},e.p="",e(e.s="3CDH")}({"/ZHD":function(n,e){},"3CDH":function(n,e,t){"use strict";function r(n,e){return caches.match(n,{cacheName:e}).catch(function(){})}function o(n,e){return n+(n.indexOf("?")!==-1?"&":"?")+"__uncache="+encodeURIComponent(e)}function i(n){return"navigate"===n.mode||n.headers.get("Upgrade-Insecure-Requests")||(n.headers.get("Accept")||"").indexOf("text/html")!==-1}function c(n){return Object.keys(n).reduce(function(e,t){return e[t]=n[t],e},{})}function a(n,e){console.groupCollapsed("[SW]:",n),e.forEach(function(n){console.log("Asset:",n)}),console.groupEnd()}if(void 0===u)var u=!1;!function(n,e){function t(){if(!L.additional.length)return Promise.resolve();u&&console.log("[SW]:","Caching additional");var n=void 0;return n="changed"===S?f("additional"):s("additional"),n.catch(function(n){console.error("[SW]:","Cache section `additional` failed to load")})}function s(e){var t=L[e];return caches.open(P).then(function(e){return m(e,t,{bust:n.version,request:n.prefetchRequest})}).then(function(){a("Cached assets: "+e,t)}).catch(function(n){throw console.error(n),n})}function f(e){return h().then(function(t){if(!t)return s(e);var r=t[0],o=t[1],i=t[2],c=i.hashmap,u=i.version;if(!i.hashmap||u===n.version)return s(e);var f=Object.keys(c).map(function(n){return c[n]}),l=o.map(function(n){var e=new URL(n.url);return e.search="",e.toString()}),h=L[e],d=[],v=h.filter(function(n){return l.indexOf(n)===-1||f.indexOf(n)===-1});Object.keys(W).forEach(function(n){var e=W[n];if(h.indexOf(e)!==-1&&v.indexOf(e)===-1&&d.indexOf(e)===-1){var t=c[n];t&&l.indexOf(t)!==-1?d.push([t,e]):v.push(e)}}),a("Changed assets: "+e,v),a("Moved assets: "+e,d);var p=Promise.all(d.map(function(n){return r.match(n[0]).then(function(e){return[n[1],e]})}));return caches.open(P).then(function(e){var t=p.then(function(n){return Promise.all(n.map(function(n){return e.put(n[0],n[1])}))});return Promise.all([t,m(e,v,{bust:n.version,request:n.prefetchRequest})])})})}function l(){return caches.keys().then(function(n){var e=n.map(function(n){if(0===n.indexOf(b)&&0!==n.indexOf(P))return console.log("[SW]:","Delete cache:",n),caches.delete(n)});return Promise.all(e)})}function h(){return caches.keys().then(function(n){for(var e=n.length,t=void 0;e--&&(t=n[e],0!==t.indexOf(b)););if(t){var r=void 0;return caches.open(t).then(function(n){return r=n,n.match(new URL(E,location).toString())}).then(function(n){if(n)return Promise.all([r,r.keys(),n.json()])})}})}function d(){return caches.open(P).then(function(e){var t=new Response(JSON.stringify({version:n.version,hashmap:W}));return e.put(new URL(E,location).toString(),t)})}function v(n,e,t){return r(t,P).then(function(r){return r?(u&&console.log("[SW]:","URL ["+t+"]("+e+") from cache"),r):fetch(n.request).then(function(n){return n.ok?(u&&console.log("[SW]:","URL ["+e+"] from network"),t===e&&function(){var t=n.clone();caches.open(P).then(function(n){return n.put(e,t)}).then(function(){console.log("[SW]:","Cache asset: "+e)})}(),n):(u&&console.log("[SW]:","URL ["+e+"] wrong response: ["+n.status+"] "+n.type),n)})})}function p(n,e,t){return fetch(n.request).then(function(n){if(n.ok)return u&&console.log("[SW]:","URL ["+e+"] from network"),n;throw new Error("response is not ok")}).catch(function(){return u&&console.log("[SW]:","URL ["+e+"] from cache if possible"),r(t,P)})}function g(n){return n.catch(function(){}).then(function(n){return n&&n.ok?n:(u&&console.log("[SW]:","Loading navigation fallback ["+_+"] from cache"),r(_,P))})}function m(n,e,t){var r=t.allowLoaders!==!1,i=t&&t.bust,a=t.request||{credentials:"omit",mode:"cors"};return Promise.all(e.map(function(n){return i&&(n=o(n,i)),fetch(n,a)})).then(function(o){if(o.some(function(n){return!n.ok}))return Promise.reject(new Error("Wrong response status"));var i=[],a=o.map(function(t,o){return r&&i.push(O(e[o],t)),n.put(e[o],t)});return i.length?function(){var r=c(t);r.allowLoaders=!1;var o=a;a=Promise.all(i).then(function(t){var i=[].concat.apply([],t);return e.length&&(o=o.concat(m(n,i,r))),Promise.all(o)})}():a=Promise.all(a),a})}function O(n,e){var t=Object.keys(R).map(function(t){if(R[t].indexOf(n)!==-1&&w[t])return w[t](e.clone())}).filter(function(n){return!!n});return Promise.all(t).then(function(n){return[].concat.apply([],n)})}function x(n){var e=n.url,t=new URL(e),r=void 0;r="navigate"===n.mode?"navigate":t.origin===location.origin?"same-origin":"cross-origin";for(var o=0;o<k.length;o++){var i=k[o];if(i&&(!i.requestTypes||i.requestTypes.indexOf(r)!==-1)){var c=void 0;if((c="function"==typeof i.match?i.match(t,n):e.replace(i.match,i.to))&&c!==e)return c}}}var w=e.loaders,k=e.cacheMaps,S=n.strategy,y=n.responseStrategy,L=n.assets,R=n.loaders||{},W=n.hashesMap,U=n.externals,b=n.name,q=n.version,P=b+":"+q,E="__offline_webpack__data";!function(){Object.keys(L).forEach(function(n){L[n]=L[n].map(function(n){var e=new URL(n,location);return U.indexOf(n)===-1?e.search="":e.hash="",e.toString()})}),Object.keys(R).forEach(function(n){R[n]=R[n].map(function(n){var e=new URL(n,location);return U.indexOf(n)===-1?e.search="":e.hash="",e.toString()})}),W=Object.keys(W).reduce(function(n,e){var t=new URL(W[e],location);return t.search="",n[e]=t.toString(),n},{}),U=U.map(function(n){var e=new URL(n,location);return e.hash="",e.toString()})}();var j=[].concat(L.main,L.additional,L.optional),_=n.navigateFallbackURL;self.addEventListener("install",function(n){console.log("[SW]:","Install event");var e=void 0;e="changed"===S?f("main"):s("main"),n.waitUntil(e)}),self.addEventListener("activate",function(n){console.log("[SW]:","Activate event");var e=t();e=e.then(d),e=e.then(l),e=e.then(function(){if(self.clients&&self.clients.claim)return self.clients.claim()}),n.waitUntil(e)}),self.addEventListener("fetch",function(n){var e=n.request.url,t=new URL(e),r=void 0;U.indexOf(e)!==-1?r=e:(t.search="",r=t.toString());var o="GET"===n.request.method,c=j.indexOf(r)!==-1,a=r;if(!c){var u=x(n.request);u&&(a=u,c=!0)}if(!c&&o&&_&&i(n.request))return void n.respondWith(g(fetch(n.request)));if(!c||!o)return void(t.origin!==location.origin&&navigator.userAgent.indexOf("Firefox/44.")!==-1&&n.respondWith(fetch(n.request)));var s=void 0;s="network-first"===y?p(n,r,a):v(n,r,a),_&&i(n.request)&&(s=g(s)),n.respondWith(s)}),self.addEventListener("message",function(n){var e=n.data;if(e)switch(e.action){case"skipWaiting":self.skipWaiting&&self.skipWaiting()}})}(__wpo,{loaders:{},cacheMaps:[]}),n.exports=t("/ZHD")}});