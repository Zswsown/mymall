(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b7691464"],{"0a06":function(e,t,r){"use strict";var n=r("c532"),o=r("30b5"),s=r("f6b4"),i=r("5270"),a=r("4a7b");function c(e){this.defaults=e,this.interceptors={request:new s,response:new s}}c.prototype.request=function(e){"string"===typeof e?(e=arguments[1]||{},e.url=arguments[0]):e=e||{},e=a(this.defaults,e),e.method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=[i,void 0],r=Promise.resolve(e);this.interceptors.request.forEach((function(e){t.unshift(e.fulfilled,e.rejected)})),this.interceptors.response.forEach((function(e){t.push(e.fulfilled,e.rejected)}));while(t.length)r=r.then(t.shift(),t.shift());return r},c.prototype.getUri=function(e){return e=a(this.defaults,e),o(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},n.forEach(["delete","get","head","options"],(function(e){c.prototype[e]=function(t,r){return this.request(n.merge(r||{},{method:e,url:t}))}})),n.forEach(["post","put","patch"],(function(e){c.prototype[e]=function(t,r,o){return this.request(n.merge(o||{},{method:e,url:t,data:r}))}})),e.exports=c},"0df6":function(e,t,r){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},"0fba":function(e,t,r){},"1bab":function(e,t,r){"use strict";r.d(t,"a",(function(){return s}));var n=r("bc3a"),o=r.n(n);function s(e){const t=o.a.create({baseURL:"http://152.136.185.210:8000/api/z8",timeout:1e4});return t.interceptors.request.use(e=>e,e=>{console.log(e)}),t.interceptors.response.use(e=>e,e=>{if(console.log(e),e&&e.response)switch(e.response.status){case 400:e.message="请求失败";break;case 401:e.message="未授权的访问";break}throw e}),t(e)}},"1d2b":function(e,t,r){"use strict";e.exports=function(e,t){return function(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return e.apply(t,r)}}},"1eb0":function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"goodsListItem",on:{click:e.goodsItemClick}},[r("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.getGoodsItemImage,expression:"getGoodsItemImage"}],attrs:{alt:""},on:{load:e.imageLoad}}),r("div",{staticClass:"goodsListItemInfo"},[r("p",{staticClass:"title"},[e._v(e._s(e.goodsItem.title))]),r("span",{staticClass:"price"},[e._v("￥"+e._s(e.goodsItem.price))]),r("span",{staticClass:"cfav"},[e._v(e._s(e.goodsItem.cfav))])])])},o=[],s={name:"GoodsListItem",props:{goodsItem:{type:Object,default(){return{}}}},data(){return{goodsItemID:null}},computed:{getGoodsItemImage(){if(this.goodsItem)return this.goodsItem.image||this.goodsItem.img||this.goodsItem.show.img}},methods:{imageLoad(){this.$bus.$emit("itemImageLoad")},goodsItemClick(){this.goodsItemID=this.goodsItem.iid||this.goodsItem.item_id,this.$router.push("/detail/"+this.goodsItemID)}}},i=s,a=(r("2322"),r("2877")),c=Object(a["a"])(i,n,o,!1,null,"a85a3f1c",null);t["a"]=c.exports},2322:function(e,t,r){"use strict";var n=r("0fba"),o=r.n(n);o.a},2444:function(e,t,r){"use strict";(function(t){var n=r("c532"),o=r("c8af"),s={"Content-Type":"application/x-www-form-urlencoded"};function i(e,t){!n.isUndefined(e)&&n.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}function a(){var e;return("undefined"!==typeof XMLHttpRequest||"undefined"!==typeof t&&"[object process]"===Object.prototype.toString.call(t))&&(e=r("b50d")),e}var c={adapter:a(),transformRequest:[function(e,t){return o(t,"Accept"),o(t,"Content-Type"),n.isFormData(e)||n.isArrayBuffer(e)||n.isBuffer(e)||n.isStream(e)||n.isFile(e)||n.isBlob(e)?e:n.isArrayBufferView(e)?e.buffer:n.isURLSearchParams(e)?(i(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):n.isObject(e)?(i(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"===typeof e)try{e=JSON.parse(e)}catch(t){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};n.forEach(["delete","get","head"],(function(e){c.headers[e]={}})),n.forEach(["post","put","patch"],(function(e){c.headers[e]=n.merge(s)})),e.exports=c}).call(this,r("4362"))},"2d83":function(e,t,r){"use strict";var n=r("387f");e.exports=function(e,t,r,o,s){var i=new Error(e);return n(i,t,r,o,s)}},"2e67":function(e,t,r){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},"30b5":function(e,t,r){"use strict";var n=r("c532");function o(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,r){if(!t)return e;var s;if(r)s=r(t);else if(n.isURLSearchParams(t))s=t.toString();else{var i=[];n.forEach(t,(function(e,t){null!==e&&"undefined"!==typeof e&&(n.isArray(e)?t+="[]":e=[e],n.forEach(e,(function(e){n.isDate(e)?e=e.toISOString():n.isObject(e)&&(e=JSON.stringify(e)),i.push(o(t)+"="+o(e))})))})),s=i.join("&")}if(s){var a=e.indexOf("#");-1!==a&&(e=e.slice(0,a)),e+=(-1===e.indexOf("?")?"?":"&")+s}return e}},"387f":function(e,t,r){"use strict";e.exports=function(e,t,r,n,o){return e.config=t,r&&(e.code=r),e.request=n,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},3934:function(e,t,r){"use strict";var n=r("c532");e.exports=n.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");function o(e){var n=e;return t&&(r.setAttribute("href",n),n=r.href),r.setAttribute("href",n),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}return e=o(window.location.href),function(t){var r=n.isString(t)?o(t):t;return r.protocol===e.protocol&&r.host===e.host}}():function(){return function(){return!0}}()},4362:function(e,t,r){t.nextTick=function(e){var t=Array.prototype.slice.call(arguments);t.shift(),setTimeout((function(){e.apply(null,t)}),0)},t.platform=t.arch=t.execPath=t.title="browser",t.pid=1,t.browser=!0,t.env={},t.argv=[],t.binding=function(e){throw new Error("No such module. (Possibly not yet loaded)")},function(){var e,n="/";t.cwd=function(){return n},t.chdir=function(t){e||(e=r("df7c")),n=e.resolve(t,n)}}(),t.exit=t.kill=t.umask=t.dlopen=t.uptime=t.memoryUsage=t.uvCounters=function(){},t.features={}},"467f":function(e,t,r){"use strict";var n=r("2d83");e.exports=function(e,t,r){var o=r.config.validateStatus;!o||o(r.status)?e(r):t(n("Request failed with status code "+r.status,r.config,null,r.request,r))}},"4a7b":function(e,t,r){"use strict";var n=r("c532");e.exports=function(e,t){t=t||{};var r={},o=["url","method","params","data"],s=["headers","auth","proxy"],i=["baseURL","url","transformRequest","transformResponse","paramsSerializer","timeout","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","maxContentLength","validateStatus","maxRedirects","httpAgent","httpsAgent","cancelToken","socketPath"];n.forEach(o,(function(e){"undefined"!==typeof t[e]&&(r[e]=t[e])})),n.forEach(s,(function(o){n.isObject(t[o])?r[o]=n.deepMerge(e[o],t[o]):"undefined"!==typeof t[o]?r[o]=t[o]:n.isObject(e[o])?r[o]=n.deepMerge(e[o]):"undefined"!==typeof e[o]&&(r[o]=e[o])})),n.forEach(i,(function(n){"undefined"!==typeof t[n]?r[n]=t[n]:"undefined"!==typeof e[n]&&(r[n]=e[n])}));var a=o.concat(s).concat(i),c=Object.keys(t).filter((function(e){return-1===a.indexOf(e)}));return n.forEach(c,(function(n){"undefined"!==typeof t[n]?r[n]=t[n]:"undefined"!==typeof e[n]&&(r[n]=e[n])})),r}},5270:function(e,t,r){"use strict";var n=r("c532"),o=r("c401"),s=r("2e67"),i=r("2444");function a(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){a(e),e.headers=e.headers||{},e.data=o(e.data,e.headers,e.transformRequest),e.headers=n.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),n.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]}));var t=e.adapter||i.adapter;return t(e).then((function(t){return a(e),t.data=o(t.data,t.headers,e.transformResponse),t}),(function(t){return s(t)||(a(e),t&&t.response&&(t.response.data=o(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},"7a77":function(e,t,r){"use strict";function n(e){this.message=e}n.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},n.prototype.__CANCEL__=!0,e.exports=n},"7aac":function(e,t,r){"use strict";var n=r("c532");e.exports=n.isStandardBrowserEnv()?function(){return{write:function(e,t,r,o,s,i){var a=[];a.push(e+"="+encodeURIComponent(t)),n.isNumber(r)&&a.push("expires="+new Date(r).toGMTString()),n.isString(o)&&a.push("path="+o),n.isString(s)&&a.push("domain="+s),!0===i&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},"83b9":function(e,t,r){"use strict";var n=r("d925"),o=r("e683");e.exports=function(e,t){return e&&!n(t)?o(e,t):t}},"8df4":function(e,t,r){"use strict";var n=r("7a77");function o(e){if("function"!==typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var r=this;e((function(e){r.reason||(r.reason=new n(e),t(r.reason))}))}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var e,t=new o((function(t){e=t}));return{token:t,cancel:e}},e.exports=o},"90b9":function(e,t,r){"use strict";function n(e,t){let r=null;return function(...n){r&&clearTimeout(r),r=setTimeout(()=>{e.apply(this,n)},t)}}function o(e,t){/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length)));let r={"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds()};for(let n in r)if(new RegExp(`(${n})`).test(t)){let e=r[n]+"";t=t.replace(RegExp.$1,1===RegExp.$1.length?e:s(e))}return t}function s(e){return("00"+e).substr(e.length)}r.d(t,"a",(function(){return n})),r.d(t,"b",(function(){return o}))},"95d6":function(e,t){e.exports="data:image/png;base64,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"},a7fc:function(e,t,r){"use strict";var n=r("ebff"),o=r.n(n);o.a},b50d:function(e,t,r){"use strict";var n=r("c532"),o=r("467f"),s=r("30b5"),i=r("83b9"),a=r("c345"),c=r("3934"),u=r("2d83");e.exports=function(e){return new Promise((function(t,f){var l=e.data,p=e.headers;n.isFormData(l)&&delete p["Content-Type"];var d=new XMLHttpRequest;if(e.auth){var h=e.auth.username||"",m=e.auth.password||"";p.Authorization="Basic "+btoa(h+":"+m)}var v=i(e.baseURL,e.url);if(d.open(e.method.toUpperCase(),s(v,e.params,e.paramsSerializer),!0),d.timeout=e.timeout,d.onreadystatechange=function(){if(d&&4===d.readyState&&(0!==d.status||d.responseURL&&0===d.responseURL.indexOf("file:"))){var r="getAllResponseHeaders"in d?a(d.getAllResponseHeaders()):null,n=e.responseType&&"text"!==e.responseType?d.response:d.responseText,s={data:n,status:d.status,statusText:d.statusText,headers:r,config:e,request:d};o(t,f,s),d=null}},d.onabort=function(){d&&(f(u("Request aborted",e,"ECONNABORTED",d)),d=null)},d.onerror=function(){f(u("Network Error",e,null,d)),d=null},d.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),f(u(t,e,"ECONNABORTED",d)),d=null},n.isStandardBrowserEnv()){var g=r("7aac"),A=(e.withCredentials||c(v))&&e.xsrfCookieName?g.read(e.xsrfCookieName):void 0;A&&(p[e.xsrfHeaderName]=A)}if("setRequestHeader"in d&&n.forEach(p,(function(e,t){"undefined"===typeof l&&"content-type"===t.toLowerCase()?delete p[t]:d.setRequestHeader(t,e)})),n.isUndefined(e.withCredentials)||(d.withCredentials=!!e.withCredentials),e.responseType)try{d.responseType=e.responseType}catch(b){if("json"!==e.responseType)throw b}"function"===typeof e.onDownloadProgress&&d.addEventListener("progress",e.onDownloadProgress),"function"===typeof e.onUploadProgress&&d.upload&&d.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){d&&(d.abort(),f(e),d=null)})),void 0===l&&(l=null),d.send(l)}))}},b95e:function(e,t,r){"use strict";r.d(t,"b",(function(){return n})),r.d(t,"a",(function(){return o})),r.d(t,"c",(function(){return s}));const n="pop",o="new",s="sell"},bc3a:function(e,t,r){e.exports=r("cee4")},c345:function(e,t,r){"use strict";var n=r("c532"),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,r,s,i={};return e?(n.forEach(e.split("\n"),(function(e){if(s=e.indexOf(":"),t=n.trim(e.substr(0,s)).toLowerCase(),r=n.trim(e.substr(s+1)),t){if(i[t]&&o.indexOf(t)>=0)return;i[t]="set-cookie"===t?(i[t]?i[t]:[]).concat([r]):i[t]?i[t]+", "+r:r}})),i):i}},c401:function(e,t,r){"use strict";var n=r("c532");e.exports=function(e,t,r){return n.forEach(r,(function(r){e=r(e,t)})),e}},c532:function(e,t,r){"use strict";var n=r("1d2b"),o=Object.prototype.toString;function s(e){return"[object Array]"===o.call(e)}function i(e){return"undefined"===typeof e}function a(e){return null!==e&&!i(e)&&null!==e.constructor&&!i(e.constructor)&&"function"===typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}function c(e){return"[object ArrayBuffer]"===o.call(e)}function u(e){return"undefined"!==typeof FormData&&e instanceof FormData}function f(e){var t;return t="undefined"!==typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer,t}function l(e){return"string"===typeof e}function p(e){return"number"===typeof e}function d(e){return null!==e&&"object"===typeof e}function h(e){return"[object Date]"===o.call(e)}function m(e){return"[object File]"===o.call(e)}function v(e){return"[object Blob]"===o.call(e)}function g(e){return"[object Function]"===o.call(e)}function A(e){return d(e)&&g(e.pipe)}function b(e){return"undefined"!==typeof URLSearchParams&&e instanceof URLSearchParams}function y(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}function w(){return("undefined"===typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!==typeof window&&"undefined"!==typeof document)}function x(e,t){if(null!==e&&"undefined"!==typeof e)if("object"!==typeof e&&(e=[e]),s(e))for(var r=0,n=e.length;r<n;r++)t.call(null,e[r],r,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}function T(){var e={};function t(t,r){"object"===typeof e[r]&&"object"===typeof t?e[r]=T(e[r],t):e[r]=t}for(var r=0,n=arguments.length;r<n;r++)x(arguments[r],t);return e}function C(){var e={};function t(t,r){"object"===typeof e[r]&&"object"===typeof t?e[r]=C(e[r],t):e[r]="object"===typeof t?C({},t):t}for(var r=0,n=arguments.length;r<n;r++)x(arguments[r],t);return e}function E(e,t,r){return x(t,(function(t,o){e[o]=r&&"function"===typeof t?n(t,r):t})),e}e.exports={isArray:s,isArrayBuffer:c,isBuffer:a,isFormData:u,isArrayBufferView:f,isString:l,isNumber:p,isObject:d,isUndefined:i,isDate:h,isFile:m,isBlob:v,isFunction:g,isStream:A,isURLSearchParams:b,isStandardBrowserEnv:w,forEach:x,merge:T,deepMerge:C,extend:E,trim:y}},c8af:function(e,t,r){"use strict";var n=r("c532");e.exports=function(e,t){n.forEach(e,(function(r,n){n!==t&&n.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[n])}))}},cee4:function(e,t,r){"use strict";var n=r("c532"),o=r("1d2b"),s=r("0a06"),i=r("4a7b"),a=r("2444");function c(e){var t=new s(e),r=o(s.prototype.request,t);return n.extend(r,s.prototype,t),n.extend(r,t),r}var u=c(a);u.Axios=s,u.create=function(e){return c(i(u.defaults,e))},u.Cancel=r("7a77"),u.CancelToken=r("8df4"),u.isCancel=r("2e67"),u.all=function(e){return Promise.all(e)},u.spread=r("0df6"),e.exports=u,e.exports.default=u},d925:function(e,t,r){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},df7c:function(e,t,r){(function(e){function r(e,t){for(var r=0,n=e.length-1;n>=0;n--){var o=e[n];"."===o?e.splice(n,1):".."===o?(e.splice(n,1),r++):r&&(e.splice(n,1),r--)}if(t)for(;r--;r)e.unshift("..");return e}function n(e){"string"!==typeof e&&(e+="");var t,r=0,n=-1,o=!0;for(t=e.length-1;t>=0;--t)if(47===e.charCodeAt(t)){if(!o){r=t+1;break}}else-1===n&&(o=!1,n=t+1);return-1===n?"":e.slice(r,n)}function o(e,t){if(e.filter)return e.filter(t);for(var r=[],n=0;n<e.length;n++)t(e[n],n,e)&&r.push(e[n]);return r}t.resolve=function(){for(var t="",n=!1,s=arguments.length-1;s>=-1&&!n;s--){var i=s>=0?arguments[s]:e.cwd();if("string"!==typeof i)throw new TypeError("Arguments to path.resolve must be strings");i&&(t=i+"/"+t,n="/"===i.charAt(0))}return t=r(o(t.split("/"),(function(e){return!!e})),!n).join("/"),(n?"/":"")+t||"."},t.normalize=function(e){var n=t.isAbsolute(e),i="/"===s(e,-1);return e=r(o(e.split("/"),(function(e){return!!e})),!n).join("/"),e||n||(e="."),e&&i&&(e+="/"),(n?"/":"")+e},t.isAbsolute=function(e){return"/"===e.charAt(0)},t.join=function(){var e=Array.prototype.slice.call(arguments,0);return t.normalize(o(e,(function(e,t){if("string"!==typeof e)throw new TypeError("Arguments to path.join must be strings");return e})).join("/"))},t.relative=function(e,r){function n(e){for(var t=0;t<e.length;t++)if(""!==e[t])break;for(var r=e.length-1;r>=0;r--)if(""!==e[r])break;return t>r?[]:e.slice(t,r-t+1)}e=t.resolve(e).substr(1),r=t.resolve(r).substr(1);for(var o=n(e.split("/")),s=n(r.split("/")),i=Math.min(o.length,s.length),a=i,c=0;c<i;c++)if(o[c]!==s[c]){a=c;break}var u=[];for(c=a;c<o.length;c++)u.push("..");return u=u.concat(s.slice(a)),u.join("/")},t.sep="/",t.delimiter=":",t.dirname=function(e){if("string"!==typeof e&&(e+=""),0===e.length)return".";for(var t=e.charCodeAt(0),r=47===t,n=-1,o=!0,s=e.length-1;s>=1;--s)if(t=e.charCodeAt(s),47===t){if(!o){n=s;break}}else o=!1;return-1===n?r?"/":".":r&&1===n?"/":e.slice(0,n)},t.basename=function(e,t){var r=n(e);return t&&r.substr(-1*t.length)===t&&(r=r.substr(0,r.length-t.length)),r},t.extname=function(e){"string"!==typeof e&&(e+="");for(var t=-1,r=0,n=-1,o=!0,s=0,i=e.length-1;i>=0;--i){var a=e.charCodeAt(i);if(47!==a)-1===n&&(o=!1,n=i+1),46===a?-1===t?t=i:1!==s&&(s=1):-1!==t&&(s=-1);else if(!o){r=i+1;break}}return-1===t||-1===n||0===s||1===s&&t===n-1&&t===r+1?"":e.slice(t,n)};var s="b"==="ab".substr(-1)?function(e,t,r){return e.substr(t,r)}:function(e,t,r){return t<0&&(t=e.length+t),e.substr(t,r)}}).call(this,r("4362"))},e683:function(e,t,r){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},ebff:function(e,t,r){},eecb:function(e,t,r){"use strict";r.d(t,"b",(function(){return l})),r.d(t,"a",(function(){return p}));var n=r("90b9"),o=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},s=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"backToTop"},[n("img",{attrs:{src:r("95d6"),alt:""}})])}],i={name:"BackToTop"},a=i,c=(r("a7fc"),r("2877")),u=Object(c["a"])(a,o,s,!1,null,"91c555f6",null),f=u.exports;r("b95e");const l={data(){return{goodsItemImageLoad:null,refresh:null,scrollToTop:null}},mounted(){this.refresh=Object(n["a"])(this.$refs.scroll.refresh,200),this.goodsItemImageLoad=()=>{this.refresh()},this.$bus.$on("itemImageLoad",this.goodsItemImageLoad),this.scrollToTop=()=>{this.$refs.scroll.scrollTo(0,0,300)},this.$bus.$on("tabMenuItemClick",this.scrollToTop)}},p={data(){return{criticalScrollY:1e3,isShowBackToTop:!1}},components:{BackToTop:f},methods:{backToTop(){this.$refs.scroll.scrollTo(0,0)},getBackToTopShow(e){this.isShowBackToTop=-e.y>this.criticalScrollY}}}},f6b4:function(e,t,r){"use strict";var n=r("c532");function o(){this.handlers=[]}o.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){n.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=o}}]);
//# sourceMappingURL=chunk-b7691464.f09e5f94.js.map