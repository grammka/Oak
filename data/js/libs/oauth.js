(function(){"use strict";function a(e){if(e[0]==="/")e=document.location.protocol+"//"+document.location.host+e;else if(!e.match(/^.{2,5}:\/\//))e=document.location.protocol+"//"+document.location.host+document.location.pathname+"/"+e;return e}function f(e,t,n){e=e.replace(/\{\{(.*?)\}\}/g,function(e,n){return t[n]||""});if(n)e=e.replace(/\{(.*?)\}/g,function(e,t){return n[t]||""});return e}function l(e){var t;var n;try{t=JSON.parse(e.data)}catch(r){}if(!t||!t.provider)return;if(e.provider&&t.provider.toLowerCase()!==e.provider.toLowerCase())return;if(t.status==="error"||t.status==="fail"){n=new Error(t.message);n.body=t.data;return e.callback(n)}if(t.status!=="success"||!t.data){n=new Error;n.body=t.data;return e.callback(n)}if(!t.state||o.indexOf(t.state)==-1)return e.callback(new Error("State is not matching"));if(!e.provider)t.data.provider=t.provider;var i=t.data;var s=i.request;delete i.request;var u;if(i.access_token)u={token:i.access_token};else if(i.oauth_token&&i.oauth_token_secret)u={oauth_token:i.oauth_token,oauth_token_secret:i.oauth_token_secret};if(s.required)for(var a in s.required)u[s.required[a]]=i[s.required[a]];var f=function(e,n){return function(r){var i={};if(typeof r==="string")i={url:r};else if(typeof r==="object")for(var s in r){i[s]=r[s]}i.type=i.type||n;i.oauthio={provider:t.provider,tokens:u,request:e};return OAuth.http(i)}};i.get=f(s,"GET");i.post=f(s,"POST");i.put=f(s,"PUT");i.patch=f(s,"PATCH");i.del=f(s,"DELETE");return e.callback(null,i,s)}function c(t){window.OAuth={initialize:function(t){e.key=t},setOAuthdURL:function(t){e.oauthd_url=t;e.oauthd_base=a(e.oauthd_url).match(/^.{2,5}:\/\/[^/]+/)[0]},popup:function(t,n,r){function c(t){if(t.source!==i||t.origin!==e.oauthd_base)return;n.data=t.data;return l(n)}var i;if(!e.key)return r(new Error("OAuth object must be initialized"));if(arguments.length==2){r=n;n={}}if(!n.state){n.state=h();n.state_type="client"}o.push(n.state);var s=e.oauthd_url+"/auth/"+t+"?k="+e.key;s+="&d="+encodeURIComponent(a("/"));if(n)s+="&opts="+encodeURIComponent(JSON.stringify(n));var u={width:Math.floor(window.outerWidth*.8),height:Math.floor(window.outerHeight*.5)};if(u.height<350)u.height=350;if(u.width<800)u.width=800;u.left=window.screenX+(window.outerWidth-u.width)/2;u.top=window.screenY+(window.outerHeight-u.height)/8;var f="width="+u.width+",height="+u.height;f+=",toolbar=0,scrollbars=1,status=1,resizable=1,location=1,menuBar=0";f+=",left="+u.left+",top="+u.top;n={provider:t};n.callback=function(e,t){if(window.removeEventListener)window.removeEventListener("message",c,false);else if(window.detachEvent)window.detachEvent("onmessage",c);else if(document.detachEvent)document.detachEvent("onmessage",c);n.callback=function(){};return r(e,t)};if(window.attachEvent)window.attachEvent("onmessage",c);else if(document.attachEvent)document.attachEvent("onmessage",c);else if(window.addEventListener)window.addEventListener("message",c,false);setTimeout(function(){n.callback(new Error("Authorization timed out"))},600*1e3);i=window.open(s,"Authorization",f);if(i)i.focus()},redirect:function(t,n,r){if(arguments.length==2){r=n;n={}}if(!n.state){n.state=h();n.state_type="client"}p("oauthio_state",n.state);var i=encodeURIComponent(a(r));r=e.oauthd_url+"/auth/"+t+"?k="+e.key;r+="&redirect_uri="+i;if(n)r+="&opts="+encodeURIComponent(JSON.stringify(n));document.location.href=r},callback:function(e,t){if(!u)return;if(arguments.length===1)return l({data:u,callback:e});return l({data:u,provider:e,callback:t})},http:function(n){var r={};var i;for(i in n){r[i]=n[i]}if(!r.oauthio.request.cors){r.url=encodeURIComponent(r.url);if(r.url[0]!="/")r.url="/"+r.url;r.url=e.oauthd_url+"/request/"+r.oauthio.provider+r.url;r.headers=r.headers||{};r.headers.oauthio="k="+e.key;if(r.oauthio.tokens.oauth_token&&r.oauthio.tokens.oauth_token_secret)r.headers.oauthio+="&oauthv=1";for(var s in r.oauthio.tokens)r.headers.oauthio+="&"+encodeURIComponent(s)+"="+encodeURIComponent(r.oauthio.tokens[s]);delete r.oauthio;return t.ajax(r)}if(r.oauthio.tokens.token){if(!r.url.match(/^[a-z]{2,16}:\/\//)){if(r.url[0]!=="/")r.url="/"+r.url;r.url=r.oauthio.request.url+r.url}r.url=f(r.url,r.oauthio.tokens,r.oauthio.request.parameters);if(r.oauthio.request.query){var o=[];for(i in r.oauthio.request.query)o.push(encodeURIComponent(i)+"="+encodeURIComponent(f(r.oauthio.request.query[i],r.oauthio.tokens,r.oauthio.request.parameters)));o=o.join("&");if(r.url.indexOf("?")!==-1)r.url+="&"+o;else r.url+="?"+o}if(r.oauthio.request.headers){r.headers=r.headers||{};for(i in r.oauthio.request.headers)r.headers[i]=f(r.oauthio.request.headers[i],r.oauthio.tokens,r.oauthio.request.parameters)}delete r.oauthio;return t.ajax(r)}}}}function h(){var e=b((new Date).getTime()+":"+Math.floor(Math.random()*9999999));return e.replace(/\+/g,"-").replace(/\//g,"_").replace(/\=+$/,"")}function p(e,t){v(e);var n=new Date;n.setTime(n.getTime()+6e5);var r="; expires="+n.toGMTString();document.cookie=e+"="+t+r+"; path=/"}function d(e){var t=e+"=";var n=document.cookie.split(";");for(var r=0;r<n.length;r++){var i=n[r];while(i.charAt(0)===" ")i=i.substring(1,i.length);if(i.indexOf(t)===0)return i.substring(t.length,i.length)}return null}function v(e){var t=new Date;t.setTime(t.getTime()-864e5);document.cookie=e+"=; expires="+t.toGMTString()+"; path=/"}function y(e){return k(N(O(e)))}function b(e){return L(N(O(e)))}function w(e,t){return A(N(O(e)),t)}function E(e,t){return k(C(O(e),O(t)))}function S(e,t){return L(C(O(e),O(t)))}function x(e,t,n){return A(C(O(e),O(t)),n)}function T(){return y("abc").toLowerCase()=="a9993e364706816aba3e25717850c26c9cd0d89d"}function N(e){return P(H(D(e),e.length*8))}function C(e,t){var n=D(e);if(n.length>16)n=H(n,e.length*8);var r=Array(16),i=Array(16);for(var s=0;s<16;s++){r[s]=n[s]^909522486;i[s]=n[s]^1549556828}var o=H(r.concat(D(t)),512+t.length*8);return P(H(i.concat(o),512+160))}function k(e){try{m}catch(t){m=0}var n=m?"0123456789ABCDEF":"0123456789abcdef";var r="";var i;for(var s=0;s<e.length;s++){i=e.charCodeAt(s);r+=n.charAt(i>>>4&15)+n.charAt(i&15)}return r}function L(e){try{g}catch(t){g=""}var n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var r="";var i=e.length;for(var s=0;s<i;s+=3){var o=e.charCodeAt(s)<<16|(s+1<i?e.charCodeAt(s+1)<<8:0)|(s+2<i?e.charCodeAt(s+2):0);for(var u=0;u<4;u++){if(s*8+u*6>e.length*8)r+=g;else r+=n.charAt(o>>>6*(3-u)&63)}}return r}function A(e,t){var n=t.length;var r=Array();var i,s,o,u;var a=Array(Math.ceil(e.length/2));for(i=0;i<a.length;i++){a[i]=e.charCodeAt(i*2)<<8|e.charCodeAt(i*2+1)}while(a.length>0){u=Array();o=0;for(i=0;i<a.length;i++){o=(o<<16)+a[i];s=Math.floor(o/n);o-=s*n;if(u.length>0||s>0)u[u.length]=s}r[r.length]=o;a=u}var f="";for(i=r.length-1;i>=0;i--)f+=t.charAt(r[i]);var l=Math.ceil(e.length*8/(Math.log(t.length)/Math.log(2)));for(i=f.length;i<l;i++)f=t[0]+f;return f}function O(e){var t="";var n=-1;var r,i;while(++n<e.length){r=e.charCodeAt(n);i=n+1<e.length?e.charCodeAt(n+1):0;if(55296<=r&&r<=56319&&56320<=i&&i<=57343){r=65536+((r&1023)<<10)+(i&1023);n++}if(r<=127)t+=String.fromCharCode(r);else if(r<=2047)t+=String.fromCharCode(192|r>>>6&31,128|r&63);else if(r<=65535)t+=String.fromCharCode(224|r>>>12&15,128|r>>>6&63,128|r&63);else if(r<=2097151)t+=String.fromCharCode(240|r>>>18&7,128|r>>>12&63,128|r>>>6&63,128|r&63)}return t}function M(e){var t="";for(var n=0;n<e.length;n++)t+=String.fromCharCode(e.charCodeAt(n)&255,e.charCodeAt(n)>>>8&255);return t}function _(e){var t="";for(var n=0;n<e.length;n++)t+=String.fromCharCode(e.charCodeAt(n)>>>8&255,e.charCodeAt(n)&255);return t}function D(e){var t=Array(e.length>>2);for(var n=0;n<t.length;n++)t[n]=0;for(var n=0;n<e.length*8;n+=8)t[n>>5]|=(e.charCodeAt(n/8)&255)<<24-n%32;return t}function P(e){var t="";for(var n=0;n<e.length*32;n+=8)t+=String.fromCharCode(e[n>>5]>>>24-n%32&255);return t}function H(e,t){e[t>>5]|=128<<24-t%32;e[(t+64>>9<<4)+15]=t;var n=Array(80);var r=1732584193;var i=-271733879;var s=-1732584194;var o=271733878;var u=-1009589776;for(var a=0;a<e.length;a+=16){var f=r;var l=i;var c=s;var h=o;var p=u;for(var d=0;d<80;d++){if(d<16)n[d]=e[a+d];else n[d]=I(n[d-3]^n[d-8]^n[d-14]^n[d-16],1);var v=F(F(I(r,5),B(d,i,s,o)),F(F(u,n[d]),j(d)));u=o;o=s;s=I(i,30);i=r;r=v}r=F(r,f);i=F(i,l);s=F(s,c);o=F(o,h);u=F(u,p)}return Array(r,i,s,o,u)}function B(e,t,n,r){if(e<20)return t&n|~t&r;if(e<40)return t^n^r;if(e<60)return t&n|t&r|n&r;return t^n^r}function j(e){return e<20?1518500249:e<40?1859775393:e<60?-1894007588:-899497514}function F(e,t){var n=(e&65535)+(t&65535);var r=(e>>16)+(t>>16)+(n>>16);return r<<16|n&65535}function I(e,t){return e<<t|e>>>32-t}var e={oauthd_url:"https://oauth.io"};if(!window.OAuth){if(typeof jQuery=="undefined"){var t=[];var n=document.createElement("script");n.src="http://code.jquery.com/jquery.min.js";n.type="text/javascript";n.onload=function(){c(jQuery);for(var e in t)window.OAuth[t[e].method].apply(window.OAuth,t[e].args)};document.getElementsByTagName("head")[0].appendChild(n);var r=["initialize","setOAuthdURL","popup","redirect","callback","http"];window.OAuth={};var i=function(e){window.OAuth[e]=function(){var n=[];for(var r in arguments)n[r]=arguments[r];t.push({method:e,args:n})}};for(var s in r)i(r[s])}else c(jQuery)}e.oauthd_base=a(e.oauthd_url).match(/^.{2,5}:\/\/[^/]+/)[0];var o=[];var u;(function(){var t=/[\\#&]oauthio=([^&]*)/.exec(document.location.hash);if(t){document.location.hash="";u=decodeURIComponent(t[1].replace(/\+/g," "));var n=d("oauthio_state");if(n){o.push(n);v("oauthio_state")}}})();var m=0;var g=""})()