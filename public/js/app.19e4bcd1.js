(function(e){function t(t){for(var n,a,s=t[0],u=t[1],i=t[2],c=0,v=[];c<s.length;c++)a=s[c],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&v.push(o[a][0]),o[a]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(e[n]=u[n]);p&&p(t);while(v.length)v.shift()();return l.push.apply(l,i||[]),r()}function r(){for(var e,t=0;t<l.length;t++){for(var r=l[t],n=!0,a=1;a<r.length;a++){var s=r[a];0!==o[s]&&(n=!1)}n&&(l.splice(t--,1),e=u(u.s=r[0]))}return e}var n={},a={app:0},o={app:0},l=[];function s(e){return u.p+"js/"+({about:"about"}[e]||e)+"."+{about:"cbfb7328"}[e]+".js"}function u(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,u),r.l=!0,r.exports}u.e=function(e){var t=[],r={about:1};a[e]?t.push(a[e]):0!==a[e]&&r[e]&&t.push(a[e]=new Promise((function(t,r){for(var n="css/"+({about:"about"}[e]||e)+"."+{about:"2a67f382"}[e]+".css",o=u.p+n,l=document.getElementsByTagName("link"),s=0;s<l.length;s++){var i=l[s],c=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(c===n||c===o))return t()}var v=document.getElementsByTagName("style");for(s=0;s<v.length;s++){i=v[s],c=i.getAttribute("data-href");if(c===n||c===o)return t()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=t,p.onerror=function(t){var n=t&&t.target&&t.target.src||o,l=new Error("Loading CSS chunk "+e+" failed.\n("+n+")");l.code="CSS_CHUNK_LOAD_FAILED",l.request=n,delete a[e],p.parentNode.removeChild(p),r(l)},p.href=o;var f=document.getElementsByTagName("head")[0];f.appendChild(p)})).then((function(){a[e]=0})));var n=o[e];if(0!==n)if(n)t.push(n[2]);else{var l=new Promise((function(t,r){n=o[e]=[t,r]}));t.push(n[2]=l);var i,c=document.createElement("script");c.charset="utf-8",c.timeout=120,u.nc&&c.setAttribute("nonce",u.nc),c.src=s(e);var v=new Error;i=function(t){c.onerror=c.onload=null,clearTimeout(p);var r=o[e];if(0!==r){if(r){var n=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;v.message="Loading chunk "+e+" failed.\n("+n+": "+a+")",v.name="ChunkLoadError",v.type=n,v.request=a,r[1](v)}o[e]=void 0}};var p=setTimeout((function(){i({type:"timeout",target:c})}),12e4);c.onerror=c.onload=i,document.head.appendChild(c)}return Promise.all(t)},u.m=e,u.c=n,u.d=function(e,t,r){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(u.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)u.d(r,n,function(t){return e[t]}.bind(null,n));return r},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="",u.oe=function(e){throw console.error(e),e};var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=t,i=i.slice();for(var v=0;v<i.length;v++)t(i[v]);var p=c;l.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("nav",{staticClass:"navbar navbar-expand-lg navbar-dark bg-dark"},[r("a",{staticClass:"navbar-brand",attrs:{href:"#"}},[e._v("KD-DB")]),e._m(0),r("div",{staticClass:"collapse navbar-collapse",attrs:{id:"navbarSupportedContent"}},[r("ul",{staticClass:"navbar-nav ml-auto"},[r("li",{staticClass:"nav-item active"},[r("router-link",{staticClass:"nav-link",attrs:{to:"/"}},[r("i",{staticClass:"fas fa-user"}),e._v(" Home")])],1),r("li",{staticClass:"nav-item"},[r("router-link",{staticClass:"nav-link",attrs:{to:"/idol"}},[r("i",{staticClass:"fas fa-user"}),e._v(" idol")])],1)])])]),r("router-view")],1)},o=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("button",{staticClass:"navbar-toggler",attrs:{type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"}},[r("span",{staticClass:"navbar-toggler-icon"})])}],l=r("2877"),s={},u=Object(l["a"])(s,a,o,!1,null,null,null),i=u.exports,c=(r("d3b7"),r("8c4f")),v=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("img",{attrs:{alt:"Vue logo",src:r("cf05")}}),n("HelloWorld",{attrs:{msg:"Welcome to Your Vue.js App"}})],1)},p=[],f=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"hello"},[r("h1",[e._v(e._s(e.msg))]),e._m(0),r("h3",[e._v("Installed CLI Plugins")]),e._m(1),r("h3",[e._v("Essential Links")]),e._m(2),r("h3",[e._v("Ecosystem")]),e._m(3)])},h=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("p",[e._v(" For a guide and recipes on how to configure / customize this project,"),r("br"),e._v(" check out the "),r("a",{attrs:{href:"https://cli.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vue-cli documentation")]),e._v(". ")])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ul",[r("li",[r("a",{attrs:{href:"https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel",target:"_blank",rel:"noopener"}},[e._v("babel")])]),r("li",[r("a",{attrs:{href:"https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router",target:"_blank",rel:"noopener"}},[e._v("router")])]),r("li",[r("a",{attrs:{href:"https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint",target:"_blank",rel:"noopener"}},[e._v("eslint")])])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ul",[r("li",[r("a",{attrs:{href:"https://vuejs.org",target:"_blank",rel:"noopener"}},[e._v("Core Docs")])]),r("li",[r("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("Forum")])]),r("li",[r("a",{attrs:{href:"https://chat.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("Community Chat")])]),r("li",[r("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank",rel:"noopener"}},[e._v("Twitter")])]),r("li",[r("a",{attrs:{href:"https://news.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("News")])])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ul",[r("li",[r("a",{attrs:{href:"https://router.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vue-router")])]),r("li",[r("a",{attrs:{href:"https://vuex.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vuex")])]),r("li",[r("a",{attrs:{href:"https://github.com/vuejs/vue-devtools#vue-devtools",target:"_blank",rel:"noopener"}},[e._v("vue-devtools")])]),r("li",[r("a",{attrs:{href:"https://vue-loader.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vue-loader")])]),r("li",[r("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank",rel:"noopener"}},[e._v("awesome-vue")])])])}],d={name:"HelloWorld",props:{msg:String}},g=d,b=(r("7017"),Object(l["a"])(g,f,h,!1,null,"1161342c",null)),m=b.exports,_={name:"Home",components:{HelloWorld:m}},k=_,y=Object(l["a"])(k,v,p,!1,null,null,null),j=y.exports;n["a"].use(c["a"]);var C=[{path:"/",name:"Home",component:j},{path:"/idol",name:"Idol",component:function(){return r.e("about").then(r.bind(null,"5a98"))}},{path:"/about",name:"About",component:function(){return r.e("about").then(r.bind(null,"f820"))}}],w=new c["a"]({routes:C}),E=w,x=r("487a");n["a"].use(x),n["a"].config.productionTip=!1,new n["a"]({router:E,render:function(e){return e(i)}}).$mount("#app")},7017:function(e,t,r){"use strict";var n=r("cc98"),a=r.n(n);a.a},cc98:function(e,t,r){},cf05:function(e,t,r){e.exports=r.p+"img/logo.82b9c7a5.png"}});
//# sourceMappingURL=app.19e4bcd1.js.map