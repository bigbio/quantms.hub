(()=>{"use strict";var e={1566:(e,t,r)=>{var n=r(9963),o=r(6252);function a(e,t){const r=(0,o.up)("router-view");return(0,o.wg)(),(0,o.j4)(r)}var i=r(3744);const s={},l=(0,i.Z)(s,[["render",a]]),d=l;var u=r(2201);const c=[{path:"/",name:"index",redirect:"/home",component:()=>Promise.all([r.e(584),r.e(503),r.e(558),r.e(443)]).then(r.bind(r,8027)),children:[{path:"/datasets",name:"information",component:()=>Promise.all([r.e(584),r.e(503),r.e(757),r.e(21),r.e(281),r.e(670),r.e(675)]).then(r.bind(r,6675))},{path:"/ae",name:"overview",component:()=>Promise.all([r.e(584),r.e(503),r.e(757),r.e(21),r.e(281),r.e(444)]).then(r.bind(r,6444)),children:[{path:"/ae/tissues",name:"tissues",component:()=>Promise.all([r.e(584),r.e(503),r.e(21),r.e(670),r.e(558),r.e(972)]).then(r.bind(r,7813))}]},{path:"/home",name:"home",component:()=>Promise.all([r.e(584),r.e(757),r.e(367)]).then(r.bind(r,2348))}]}],p=(0,u.p7)({history:(0,u.PO)(),routes:c}),m=p;var f=r(3907);const h=(0,f.MT)({state:{proteinTable:[]},getters:{},mutations:{GETPROTEINS(e,t){e.proteinTable.push(...t)}},actions:{getProteins(e,t){this.commit("GETPROTEINS",t)}},modules:{}});var v=r(5781);const b=(0,n.ri)(d);m.afterEach((()=>{window.scrollTo(0,0)}));for(const g in v)b.component(g,v[g]);b.use(h).use(m).mount("#app")}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var a=t[n]={exports:{}};return e[n](a,a.exports,r),a.exports}r.m=e,(()=>{var e=[];r.O=(t,n,o,a)=>{if(!n){var i=1/0;for(u=0;u<e.length;u++){for(var[n,o,a]=e[u],s=!0,l=0;l<n.length;l++)(!1&a||i>=a)&&Object.keys(r.O).every((e=>r.O[e](n[l])))?n.splice(l--,1):(s=!1,a<i&&(i=a));if(s){e.splice(u--,1);var d=o();void 0!==d&&(t=d)}}return t}a=a||0;for(var u=e.length;u>0&&e[u-1][2]>a;u--)e[u]=e[u-1];e[u]=[n,o,a]}})(),(()=>{r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}})(),(()=>{r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce(((t,n)=>(r.f[n](e,t),t)),[]))})(),(()=>{r.u=e=>"js/"+(443===e?"about":e)+"."+{21:"710a4a8c",281:"dddb0ada",367:"957b2c24",443:"ccd8d797",444:"88506177",503:"168a8f02",558:"9698464e",584:"fcc007a4",670:"110cf88f",675:"720bd239",757:"d9a0a415",972:"31694590"}[e]+".js"})(),(()=>{r.miniCssF=e=>"css/"+(443===e?"about":e)+"."+{281:"9e9004d3",367:"a2e6e043",443:"1d9db05b",444:"537499c8",675:"a4772cac",757:"b0fb9916",972:"243dca06"}[e]+".css"})(),(()=>{r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})(),(()=>{var e={},t="quantms.org:";r.l=(n,o,a,i)=>{if(e[n])e[n].push(o);else{var s,l;if(void 0!==a)for(var d=document.getElementsByTagName("script"),u=0;u<d.length;u++){var c=d[u];if(c.getAttribute("src")==n||c.getAttribute("data-webpack")==t+a){s=c;break}}s||(l=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,r.nc&&s.setAttribute("nonce",r.nc),s.setAttribute("data-webpack",t+a),s.src=n),e[n]=[o];var p=(t,r)=>{s.onerror=s.onload=null,clearTimeout(m);var o=e[n];if(delete e[n],s.parentNode&&s.parentNode.removeChild(s),o&&o.forEach((e=>e(r))),t)return t(r)},m=setTimeout(p.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=p.bind(null,s.onerror),s.onload=p.bind(null,s.onload),l&&document.head.appendChild(s)}}})(),(()=>{r.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}})(),(()=>{r.p="/"})(),(()=>{if("undefined"!==typeof document){var e=(e,t,r,n,o)=>{var a=document.createElement("link");a.rel="stylesheet",a.type="text/css";var i=r=>{if(a.onerror=a.onload=null,"load"===r.type)n();else{var i=r&&("load"===r.type?"missing":r.type),s=r&&r.target&&r.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=i,l.request=s,a.parentNode&&a.parentNode.removeChild(a),o(l)}};return a.onerror=a.onload=i,a.href=t,r?r.parentNode.insertBefore(a,r.nextSibling):document.head.appendChild(a),a},t=(e,t)=>{for(var r=document.getElementsByTagName("link"),n=0;n<r.length;n++){var o=r[n],a=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(a===e||a===t))return o}var i=document.getElementsByTagName("style");for(n=0;n<i.length;n++){o=i[n],a=o.getAttribute("data-href");if(a===e||a===t)return o}},n=n=>new Promise(((o,a)=>{var i=r.miniCssF(n),s=r.p+i;if(t(i,s))return o();e(n,s,null,o,a)})),o={143:0};r.f.miniCss=(e,t)=>{var r={281:1,367:1,443:1,444:1,675:1,757:1,972:1};o[e]?t.push(o[e]):0!==o[e]&&r[e]&&t.push(o[e]=n(e).then((()=>{o[e]=0}),(t=>{throw delete o[e],t})))}}})(),(()=>{var e={143:0};r.f.j=(t,n)=>{var o=r.o(e,t)?e[t]:void 0;if(0!==o)if(o)n.push(o[2]);else{var a=new Promise(((r,n)=>o=e[t]=[r,n]));n.push(o[2]=a);var i=r.p+r.u(t),s=new Error,l=n=>{if(r.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var a=n&&("load"===n.type?"missing":n.type),i=n&&n.target&&n.target.src;s.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",s.name="ChunkLoadError",s.type=a,s.request=i,o[1](s)}};r.l(i,l,"chunk-"+t,t)}},r.O.j=t=>0===e[t];var t=(t,n)=>{var o,a,[i,s,l]=n,d=0;if(i.some((t=>0!==e[t]))){for(o in s)r.o(s,o)&&(r.m[o]=s[o]);if(l)var u=l(r)}for(t&&t(n);d<i.length;d++)a=i[d],r.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return r.O(u)},n=self["webpackChunkquantms_org"]=self["webpackChunkquantms_org"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var n=r.O(void 0,[998],(()=>r(1566)));n=r.O(n)})();
//# sourceMappingURL=app.3330488d.js.map