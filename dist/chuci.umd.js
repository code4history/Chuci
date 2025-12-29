(function(ft,Dt){typeof exports=="object"&&typeof module<"u"?Dt(exports):typeof define=="function"&&define.amd?define(["exports"],Dt):(ft=typeof globalThis<"u"?globalThis:ft||self,Dt(ft.Chuci={}))})(this,(function(ft){"use strict";var n_=Object.defineProperty;var s_=(ft,Dt,xi)=>Dt in ft?n_(ft,Dt,{enumerable:!0,configurable:!0,writable:!0,value:xi}):ft[Dt]=xi;var Se=(ft,Dt,xi)=>s_(ft,typeof Dt!="symbol"?Dt+"":Dt,xi);var Dt=typeof document<"u"?document.currentScript:null;class xi extends HTMLElement{constructor(){super();Se(this,"_shadowRoot");Se(this,"_connected",!1);this._shadowRoot=this.attachShadow({mode:"open"})}connectedCallback(){this._connected?this.render():(this._connected=!0,this.render(),this.firstUpdated())}disconnectedCallback(){this._connected=!1}attributeChangedCallback(t,i,n){i!==n&&this.render()}firstUpdated(){}html(t,...i){return t.reduce((n,r,a)=>n+r+(i[a]||""),"")}css(t,...i){return`<style>${t.reduce((r,a,o)=>r+a+(i[o]||""),"")}</style>`}updateShadowRoot(t){this._shadowRoot.innerHTML=t}query(t){return this._shadowRoot.querySelector(t)}queryAll(t){return this._shadowRoot.querySelectorAll(t)}dispatch(t,i){this.dispatchEvent(new CustomEvent(t,{detail:i,bubbles:!0,composed:!0}))}}function ll(s){return s!==null&&typeof s=="object"&&"constructor"in s&&s.constructor===Object}function jr(s,e){s===void 0&&(s={}),e===void 0&&(e={});const t=["__proto__","constructor","prototype"];Object.keys(e).filter(i=>t.indexOf(i)<0).forEach(i=>{typeof s[i]>"u"?s[i]=e[i]:ll(e[i])&&ll(s[i])&&Object.keys(e[i]).length>0&&jr(s[i],e[i])})}const cl={body:{},addEventListener(){},removeEventListener(){},activeElement:{blur(){},nodeName:""},querySelector(){return null},querySelectorAll(){return[]},getElementById(){return null},createEvent(){return{initEvent(){}}},createElement(){return{children:[],childNodes:[],style:{},setAttribute(){},getElementsByTagName(){return[]}}},createElementNS(){return{}},importNode(){return null},location:{hash:"",host:"",hostname:"",href:"",origin:"",pathname:"",protocol:"",search:""}};function Ot(){const s=typeof document<"u"?document:{};return jr(s,cl),s}const Ah={document:cl,navigator:{userAgent:""},location:{hash:"",host:"",hostname:"",href:"",origin:"",pathname:"",protocol:"",search:""},history:{replaceState(){},pushState(){},go(){},back(){}},CustomEvent:function(){return this},addEventListener(){},removeEventListener(){},getComputedStyle(){return{getPropertyValue(){return""}}},Image(){},Date(){},screen:{},setTimeout(){},clearTimeout(){},matchMedia(){return{}},requestAnimationFrame(s){return typeof setTimeout>"u"?(s(),null):setTimeout(s,0)},cancelAnimationFrame(s){typeof setTimeout>"u"||clearTimeout(s)}};function Mt(){const s=typeof window<"u"?window:{};return jr(s,Ah),s}function Wi(s){return s===void 0&&(s=""),s.trim().split(" ").filter(e=>!!e.trim())}function _h(s){const e=s;Object.keys(e).forEach(t=>{try{e[t]=null}catch{}try{delete e[t]}catch{}})}function qr(s,e){return e===void 0&&(e=0),setTimeout(s,e)}function Ps(){return Date.now()}function Sh(s){const e=Mt();let t;return e.getComputedStyle&&(t=e.getComputedStyle(s,null)),!t&&s.currentStyle&&(t=s.currentStyle),t||(t=s.style),t}function Eh(s,e){e===void 0&&(e="x");const t=Mt();let i,n,r;const a=Sh(s);return t.WebKitCSSMatrix?(n=a.transform||a.webkitTransform,n.split(",").length>6&&(n=n.split(", ").map(o=>o.replace(",",".")).join(", ")),r=new t.WebKitCSSMatrix(n==="none"?"":n)):(r=a.MozTransform||a.OTransform||a.MsTransform||a.msTransform||a.transform||a.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),i=r.toString().split(",")),e==="x"&&(t.WebKitCSSMatrix?n=r.m41:i.length===16?n=parseFloat(i[12]):n=parseFloat(i[4])),e==="y"&&(t.WebKitCSSMatrix?n=r.m42:i.length===16?n=parseFloat(i[13]):n=parseFloat(i[5])),n||0}function ps(s){return typeof s=="object"&&s!==null&&s.constructor&&Object.prototype.toString.call(s).slice(8,-1)==="Object"}function xh(s){return typeof window<"u"&&typeof window.HTMLElement<"u"?s instanceof HTMLElement:s&&(s.nodeType===1||s.nodeType===11)}function Yt(){const s=Object(arguments.length<=0?void 0:arguments[0]),e=["__proto__","constructor","prototype"];for(let t=1;t<arguments.length;t+=1){const i=t<0||arguments.length<=t?void 0:arguments[t];if(i!=null&&!xh(i)){const n=Object.keys(Object(i)).filter(r=>e.indexOf(r)<0);for(let r=0,a=n.length;r<a;r+=1){const o=n[r],c=Object.getOwnPropertyDescriptor(i,o);c!==void 0&&c.enumerable&&(ps(s[o])&&ps(i[o])?i[o].__swiper__?s[o]=i[o]:Yt(s[o],i[o]):!ps(s[o])&&ps(i[o])?(s[o]={},i[o].__swiper__?s[o]=i[o]:Yt(s[o],i[o])):s[o]=i[o])}}}return s}function Vs(s,e,t){s.style.setProperty(e,t)}function dl(s){let{swiper:e,targetPosition:t,side:i}=s;const n=Mt(),r=-e.translate;let a=null,o;const c=e.params.speed;e.wrapperEl.style.scrollSnapType="none",n.cancelAnimationFrame(e.cssModeFrameID);const l=t>r?"next":"prev",d=(u,p)=>l==="next"&&u>=p||l==="prev"&&u<=p,h=()=>{o=new Date().getTime(),a===null&&(a=o);const u=Math.max(Math.min((o-a)/c,1),0),p=.5-Math.cos(u*Math.PI)/2;let g=r+p*(t-r);if(d(g,t)&&(g=t),e.wrapperEl.scrollTo({[i]:g}),d(g,t)){e.wrapperEl.style.overflow="hidden",e.wrapperEl.style.scrollSnapType="",setTimeout(()=>{e.wrapperEl.style.overflow="",e.wrapperEl.scrollTo({[i]:g})}),n.cancelAnimationFrame(e.cssModeFrameID);return}e.cssModeFrameID=n.requestAnimationFrame(h)};h()}function di(s,e){e===void 0&&(e="");const t=Mt(),i=[...s.children];return t.HTMLSlotElement&&s instanceof HTMLSlotElement&&i.push(...s.assignedElements()),e?i.filter(n=>n.matches(e)):i}function wh(s,e){const t=[e];for(;t.length>0;){const i=t.shift();if(s===i)return!0;t.push(...i.children,...i.shadowRoot?i.shadowRoot.children:[],...i.assignedElements?i.assignedElements():[])}}function bh(s,e){const t=Mt();let i=e.contains(s);return!i&&t.HTMLSlotElement&&e instanceof HTMLSlotElement&&(i=[...e.assignedElements()].includes(s),i||(i=wh(s,e))),i}function ks(s){try{console.warn(s);return}catch{}}function ms(s,e){e===void 0&&(e=[]);const t=document.createElement(s);return t.classList.add(...Array.isArray(e)?e:Wi(e)),t}function hl(s){const e=Mt(),t=Ot(),i=s.getBoundingClientRect(),n=t.body,r=s.clientTop||n.clientTop||0,a=s.clientLeft||n.clientLeft||0,o=s===e?e.scrollY:s.scrollTop,c=s===e?e.scrollX:s.scrollLeft;return{top:i.top+o-r,left:i.left+c-a}}function yh(s,e){const t=[];for(;s.previousElementSibling;){const i=s.previousElementSibling;e?i.matches(e)&&t.push(i):t.push(i),s=i}return t}function Ch(s,e){const t=[];for(;s.nextElementSibling;){const i=s.nextElementSibling;e?i.matches(e)&&t.push(i):t.push(i),s=i}return t}function Gi(s,e){return Mt().getComputedStyle(s,null).getPropertyValue(e)}function Os(s){let e=s,t;if(e){for(t=0;(e=e.previousSibling)!==null;)e.nodeType===1&&(t+=1);return t}}function zs(s,e){const t=[];let i=s.parentElement;for(;i;)e?i.matches(e)&&t.push(i):t.push(i),i=i.parentElement;return t}function $r(s,e,t){const i=Mt();return s[e==="width"?"offsetWidth":"offsetHeight"]+parseFloat(i.getComputedStyle(s,null).getPropertyValue(e==="width"?"margin-right":"margin-top"))+parseFloat(i.getComputedStyle(s,null).getPropertyValue(e==="width"?"margin-left":"margin-bottom"))}function xt(s){return(Array.isArray(s)?s:[s]).filter(e=>!!e)}function ul(s,e){e===void 0&&(e=""),typeof trustedTypes<"u"?s.innerHTML=trustedTypes.createPolicy("html",{createHTML:t=>t}).createHTML(e):s.innerHTML=e}let ea;function Uh(){const s=Mt(),e=Ot();return{smoothScroll:e.documentElement&&e.documentElement.style&&"scrollBehavior"in e.documentElement.style,touch:!!("ontouchstart"in s||s.DocumentTouch&&e instanceof s.DocumentTouch)}}function fl(){return ea||(ea=Uh()),ea}let ta;function Mh(s){let{userAgent:e}=s===void 0?{}:s;const t=fl(),i=Mt(),n=i.navigator.platform,r=e||i.navigator.userAgent,a={ios:!1,android:!1},o=i.screen.width,c=i.screen.height,l=r.match(/(Android);?[\s\/]+([\d.]+)?/);let d=r.match(/(iPad).*OS\s([\d_]+)/);const h=r.match(/(iPod)(.*OS\s([\d_]+))?/),u=!d&&r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),p=n==="Win32";let g=n==="MacIntel";const v=["1024x1366","1366x1024","834x1194","1194x834","834x1112","1112x834","768x1024","1024x768","820x1180","1180x820","810x1080","1080x810"];return!d&&g&&t.touch&&v.indexOf(`${o}x${c}`)>=0&&(d=r.match(/(Version)\/([\d.]+)/),d||(d=[0,1,"13_0_0"]),g=!1),l&&!p&&(a.os="android",a.android=!0),(d||u||h)&&(a.os="ios",a.ios=!0),a}function pl(s){return s===void 0&&(s={}),ta||(ta=Mh(s)),ta}let ia;function Th(){const s=Mt(),e=pl();let t=!1;function i(){const o=s.navigator.userAgent.toLowerCase();return o.indexOf("safari")>=0&&o.indexOf("chrome")<0&&o.indexOf("android")<0}if(i()){const o=String(s.navigator.userAgent);if(o.includes("Version/")){const[c,l]=o.split("Version/")[1].split(" ")[0].split(".").map(d=>Number(d));t=c<16||c===16&&l<2}}const n=/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(s.navigator.userAgent),r=i(),a=r||n&&e.ios;return{isSafari:t||r,needPerspectiveFix:t,need3dFix:a,isWebView:n}}function ml(){return ia||(ia=Th()),ia}function Fh(s){let{swiper:e,on:t,emit:i}=s;const n=Mt();let r=null,a=null;const o=()=>{!e||e.destroyed||!e.initialized||(i("beforeResize"),i("resize"))},c=()=>{!e||e.destroyed||!e.initialized||(r=new ResizeObserver(h=>{a=n.requestAnimationFrame(()=>{const{width:u,height:p}=e;let g=u,v=p;h.forEach(m=>{let{contentBoxSize:f,contentRect:A,target:_}=m;_&&_!==e.el||(g=A?A.width:(f[0]||f).inlineSize,v=A?A.height:(f[0]||f).blockSize)}),(g!==u||v!==p)&&o()})}),r.observe(e.el))},l=()=>{a&&n.cancelAnimationFrame(a),r&&r.unobserve&&e.el&&(r.unobserve(e.el),r=null)},d=()=>{!e||e.destroyed||!e.initialized||i("orientationchange")};t("init",()=>{if(e.params.resizeObserver&&typeof n.ResizeObserver<"u"){c();return}n.addEventListener("resize",o),n.addEventListener("orientationchange",d)}),t("destroy",()=>{l(),n.removeEventListener("resize",o),n.removeEventListener("orientationchange",d)})}function Ih(s){let{swiper:e,extendParams:t,on:i,emit:n}=s;const r=[],a=Mt(),o=function(d,h){h===void 0&&(h={});const u=a.MutationObserver||a.WebkitMutationObserver,p=new u(g=>{if(e.__preventObserver__)return;if(g.length===1){n("observerUpdate",g[0]);return}const v=function(){n("observerUpdate",g[0])};a.requestAnimationFrame?a.requestAnimationFrame(v):a.setTimeout(v,0)});p.observe(d,{attributes:typeof h.attributes>"u"?!0:h.attributes,childList:e.isElement||(typeof h.childList>"u"?!0:h).childList,characterData:typeof h.characterData>"u"?!0:h.characterData}),r.push(p)},c=()=>{if(e.params.observer){if(e.params.observeParents){const d=zs(e.hostEl);for(let h=0;h<d.length;h+=1)o(d[h])}o(e.hostEl,{childList:e.params.observeSlideChildren}),o(e.wrapperEl,{attributes:!1})}},l=()=>{r.forEach(d=>{d.disconnect()}),r.splice(0,r.length)};t({observer:!1,observeParents:!1,observeSlideChildren:!1}),i("init",c),i("destroy",l)}var Rh={on(s,e,t){const i=this;if(!i.eventsListeners||i.destroyed||typeof e!="function")return i;const n=t?"unshift":"push";return s.split(" ").forEach(r=>{i.eventsListeners[r]||(i.eventsListeners[r]=[]),i.eventsListeners[r][n](e)}),i},once(s,e,t){const i=this;if(!i.eventsListeners||i.destroyed||typeof e!="function")return i;function n(){i.off(s,n),n.__emitterProxy&&delete n.__emitterProxy;for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];e.apply(i,a)}return n.__emitterProxy=e,i.on(s,n,t)},onAny(s,e){const t=this;if(!t.eventsListeners||t.destroyed||typeof s!="function")return t;const i=e?"unshift":"push";return t.eventsAnyListeners.indexOf(s)<0&&t.eventsAnyListeners[i](s),t},offAny(s){const e=this;if(!e.eventsListeners||e.destroyed||!e.eventsAnyListeners)return e;const t=e.eventsAnyListeners.indexOf(s);return t>=0&&e.eventsAnyListeners.splice(t,1),e},off(s,e){const t=this;return!t.eventsListeners||t.destroyed||!t.eventsListeners||s.split(" ").forEach(i=>{typeof e>"u"?t.eventsListeners[i]=[]:t.eventsListeners[i]&&t.eventsListeners[i].forEach((n,r)=>{(n===e||n.__emitterProxy&&n.__emitterProxy===e)&&t.eventsListeners[i].splice(r,1)})}),t},emit(){const s=this;if(!s.eventsListeners||s.destroyed||!s.eventsListeners)return s;let e,t,i;for(var n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return typeof r[0]=="string"||Array.isArray(r[0])?(e=r[0],t=r.slice(1,r.length),i=s):(e=r[0].events,t=r[0].data,i=r[0].context||s),t.unshift(i),(Array.isArray(e)?e:e.split(" ")).forEach(c=>{s.eventsAnyListeners&&s.eventsAnyListeners.length&&s.eventsAnyListeners.forEach(l=>{l.apply(i,[c,...t])}),s.eventsListeners&&s.eventsListeners[c]&&s.eventsListeners[c].forEach(l=>{l.apply(i,t)})}),s}};function Bh(){const s=this;let e,t;const i=s.el;typeof s.params.width<"u"&&s.params.width!==null?e=s.params.width:e=i.clientWidth,typeof s.params.height<"u"&&s.params.height!==null?t=s.params.height:t=i.clientHeight,!(e===0&&s.isHorizontal()||t===0&&s.isVertical())&&(e=e-parseInt(Gi(i,"padding-left")||0,10)-parseInt(Gi(i,"padding-right")||0,10),t=t-parseInt(Gi(i,"padding-top")||0,10)-parseInt(Gi(i,"padding-bottom")||0,10),Number.isNaN(e)&&(e=0),Number.isNaN(t)&&(t=0),Object.assign(s,{width:e,height:t,size:s.isHorizontal()?e:t}))}function Dh(){const s=this;function e(E,M){return parseFloat(E.getPropertyValue(s.getDirectionLabel(M))||0)}const t=s.params,{wrapperEl:i,slidesEl:n,size:r,rtlTranslate:a,wrongRTL:o}=s,c=s.virtual&&t.virtual.enabled,l=c?s.virtual.slides.length:s.slides.length,d=di(n,`.${s.params.slideClass}, swiper-slide`),h=c?s.virtual.slides.length:d.length;let u=[];const p=[],g=[];let v=t.slidesOffsetBefore;typeof v=="function"&&(v=t.slidesOffsetBefore.call(s));let m=t.slidesOffsetAfter;typeof m=="function"&&(m=t.slidesOffsetAfter.call(s));const f=s.snapGrid.length,A=s.slidesGrid.length;let _=t.spaceBetween,S=-v,C=0,y=0;if(typeof r>"u")return;typeof _=="string"&&_.indexOf("%")>=0?_=parseFloat(_.replace("%",""))/100*r:typeof _=="string"&&(_=parseFloat(_)),s.virtualSize=-_,d.forEach(E=>{a?E.style.marginLeft="":E.style.marginRight="",E.style.marginBottom="",E.style.marginTop=""}),t.centeredSlides&&t.cssMode&&(Vs(i,"--swiper-centered-offset-before",""),Vs(i,"--swiper-centered-offset-after",""));const U=t.grid&&t.grid.rows>1&&s.grid;U?s.grid.initSlides(d):s.grid&&s.grid.unsetSlides();let I;const x=t.slidesPerView==="auto"&&t.breakpoints&&Object.keys(t.breakpoints).filter(E=>typeof t.breakpoints[E].slidesPerView<"u").length>0;for(let E=0;E<h;E+=1){I=0;let M;if(d[E]&&(M=d[E]),U&&s.grid.updateSlide(E,M,d),!(d[E]&&Gi(M,"display")==="none")){if(t.slidesPerView==="auto"){x&&(d[E].style[s.getDirectionLabel("width")]="");const R=getComputedStyle(M),F=M.style.transform,B=M.style.webkitTransform;if(F&&(M.style.transform="none"),B&&(M.style.webkitTransform="none"),t.roundLengths)I=s.isHorizontal()?$r(M,"width"):$r(M,"height");else{const z=e(R,"width"),Q=e(R,"padding-left"),N=e(R,"padding-right"),D=e(R,"margin-left"),Z=e(R,"margin-right"),$=R.getPropertyValue("box-sizing");if($&&$==="border-box")I=z+D+Z;else{const{clientWidth:ae,offsetWidth:be}=M;I=z+Q+N+D+Z+(be-ae)}}F&&(M.style.transform=F),B&&(M.style.webkitTransform=B),t.roundLengths&&(I=Math.floor(I))}else I=(r-(t.slidesPerView-1)*_)/t.slidesPerView,t.roundLengths&&(I=Math.floor(I)),d[E]&&(d[E].style[s.getDirectionLabel("width")]=`${I}px`);d[E]&&(d[E].swiperSlideSize=I),g.push(I),t.centeredSlides?(S=S+I/2+C/2+_,C===0&&E!==0&&(S=S-r/2-_),E===0&&(S=S-r/2-_),Math.abs(S)<1/1e3&&(S=0),t.roundLengths&&(S=Math.floor(S)),y%t.slidesPerGroup===0&&u.push(S),p.push(S)):(t.roundLengths&&(S=Math.floor(S)),(y-Math.min(s.params.slidesPerGroupSkip,y))%s.params.slidesPerGroup===0&&u.push(S),p.push(S),S=S+I+_),s.virtualSize+=I+_,C=I,y+=1}}if(s.virtualSize=Math.max(s.virtualSize,r)+m,a&&o&&(t.effect==="slide"||t.effect==="coverflow")&&(i.style.width=`${s.virtualSize+_}px`),t.setWrapperSize&&(i.style[s.getDirectionLabel("width")]=`${s.virtualSize+_}px`),U&&s.grid.updateWrapperSize(I,u),!t.centeredSlides){const E=[];for(let M=0;M<u.length;M+=1){let R=u[M];t.roundLengths&&(R=Math.floor(R)),u[M]<=s.virtualSize-r&&E.push(R)}u=E,Math.floor(s.virtualSize-r)-Math.floor(u[u.length-1])>1&&u.push(s.virtualSize-r)}if(c&&t.loop){const E=g[0]+_;if(t.slidesPerGroup>1){const M=Math.ceil((s.virtual.slidesBefore+s.virtual.slidesAfter)/t.slidesPerGroup),R=E*t.slidesPerGroup;for(let F=0;F<M;F+=1)u.push(u[u.length-1]+R)}for(let M=0;M<s.virtual.slidesBefore+s.virtual.slidesAfter;M+=1)t.slidesPerGroup===1&&u.push(u[u.length-1]+E),p.push(p[p.length-1]+E),s.virtualSize+=E}if(u.length===0&&(u=[0]),_!==0){const E=s.isHorizontal()&&a?"marginLeft":s.getDirectionLabel("marginRight");d.filter((M,R)=>!t.cssMode||t.loop?!0:R!==d.length-1).forEach(M=>{M.style[E]=`${_}px`})}if(t.centeredSlides&&t.centeredSlidesBounds){let E=0;g.forEach(R=>{E+=R+(_||0)}),E-=_;const M=E>r?E-r:0;u=u.map(R=>R<=0?-v:R>M?M+m:R)}if(t.centerInsufficientSlides){let E=0;g.forEach(R=>{E+=R+(_||0)}),E-=_;const M=(t.slidesOffsetBefore||0)+(t.slidesOffsetAfter||0);if(E+M<r){const R=(r-E-M)/2;u.forEach((F,B)=>{u[B]=F-R}),p.forEach((F,B)=>{p[B]=F+R})}}if(Object.assign(s,{slides:d,snapGrid:u,slidesGrid:p,slidesSizesGrid:g}),t.centeredSlides&&t.cssMode&&!t.centeredSlidesBounds){Vs(i,"--swiper-centered-offset-before",`${-u[0]}px`),Vs(i,"--swiper-centered-offset-after",`${s.size/2-g[g.length-1]/2}px`);const E=-s.snapGrid[0],M=-s.slidesGrid[0];s.snapGrid=s.snapGrid.map(R=>R+E),s.slidesGrid=s.slidesGrid.map(R=>R+M)}if(h!==l&&s.emit("slidesLengthChange"),u.length!==f&&(s.params.watchOverflow&&s.checkOverflow(),s.emit("snapGridLengthChange")),p.length!==A&&s.emit("slidesGridLengthChange"),t.watchSlidesProgress&&s.updateSlidesOffset(),s.emit("slidesUpdated"),!c&&!t.cssMode&&(t.effect==="slide"||t.effect==="fade")){const E=`${t.containerModifierClass}backface-hidden`,M=s.el.classList.contains(E);h<=t.maxBackfaceHiddenSlides?M||s.el.classList.add(E):M&&s.el.classList.remove(E)}}function Qh(s){const e=this,t=[],i=e.virtual&&e.params.virtual.enabled;let n=0,r;typeof s=="number"?e.setTransition(s):s===!0&&e.setTransition(e.params.speed);const a=o=>i?e.slides[e.getSlideIndexByData(o)]:e.slides[o];if(e.params.slidesPerView!=="auto"&&e.params.slidesPerView>1)if(e.params.centeredSlides)(e.visibleSlides||[]).forEach(o=>{t.push(o)});else for(r=0;r<Math.ceil(e.params.slidesPerView);r+=1){const o=e.activeIndex+r;if(o>e.slides.length&&!i)break;t.push(a(o))}else t.push(a(e.activeIndex));for(r=0;r<t.length;r+=1)if(typeof t[r]<"u"){const o=t[r].offsetHeight;n=o>n?o:n}(n||n===0)&&(e.wrapperEl.style.height=`${n}px`)}function Nh(){const s=this,e=s.slides,t=s.isElement?s.isHorizontal()?s.wrapperEl.offsetLeft:s.wrapperEl.offsetTop:0;for(let i=0;i<e.length;i+=1)e[i].swiperSlideOffset=(s.isHorizontal()?e[i].offsetLeft:e[i].offsetTop)-t-s.cssOverflowAdjustment()}const gl=(s,e,t)=>{e&&!s.classList.contains(t)?s.classList.add(t):!e&&s.classList.contains(t)&&s.classList.remove(t)};function Lh(s){s===void 0&&(s=this&&this.translate||0);const e=this,t=e.params,{slides:i,rtlTranslate:n,snapGrid:r}=e;if(i.length===0)return;typeof i[0].swiperSlideOffset>"u"&&e.updateSlidesOffset();let a=-s;n&&(a=s),e.visibleSlidesIndexes=[],e.visibleSlides=[];let o=t.spaceBetween;typeof o=="string"&&o.indexOf("%")>=0?o=parseFloat(o.replace("%",""))/100*e.size:typeof o=="string"&&(o=parseFloat(o));for(let c=0;c<i.length;c+=1){const l=i[c];let d=l.swiperSlideOffset;t.cssMode&&t.centeredSlides&&(d-=i[0].swiperSlideOffset);const h=(a+(t.centeredSlides?e.minTranslate():0)-d)/(l.swiperSlideSize+o),u=(a-r[0]+(t.centeredSlides?e.minTranslate():0)-d)/(l.swiperSlideSize+o),p=-(a-d),g=p+e.slidesSizesGrid[c],v=p>=0&&p<=e.size-e.slidesSizesGrid[c],m=p>=0&&p<e.size-1||g>1&&g<=e.size||p<=0&&g>=e.size;m&&(e.visibleSlides.push(l),e.visibleSlidesIndexes.push(c)),gl(l,m,t.slideVisibleClass),gl(l,v,t.slideFullyVisibleClass),l.progress=n?-h:h,l.originalProgress=n?-u:u}}function Ph(s){const e=this;if(typeof s>"u"){const d=e.rtlTranslate?-1:1;s=e&&e.translate&&e.translate*d||0}const t=e.params,i=e.maxTranslate()-e.minTranslate();let{progress:n,isBeginning:r,isEnd:a,progressLoop:o}=e;const c=r,l=a;if(i===0)n=0,r=!0,a=!0;else{n=(s-e.minTranslate())/i;const d=Math.abs(s-e.minTranslate())<1,h=Math.abs(s-e.maxTranslate())<1;r=d||n<=0,a=h||n>=1,d&&(n=0),h&&(n=1)}if(t.loop){const d=e.getSlideIndexByData(0),h=e.getSlideIndexByData(e.slides.length-1),u=e.slidesGrid[d],p=e.slidesGrid[h],g=e.slidesGrid[e.slidesGrid.length-1],v=Math.abs(s);v>=u?o=(v-u)/g:o=(v+g-p)/g,o>1&&(o-=1)}Object.assign(e,{progress:n,progressLoop:o,isBeginning:r,isEnd:a}),(t.watchSlidesProgress||t.centeredSlides&&t.autoHeight)&&e.updateSlidesProgress(s),r&&!c&&e.emit("reachBeginning toEdge"),a&&!l&&e.emit("reachEnd toEdge"),(c&&!r||l&&!a)&&e.emit("fromEdge"),e.emit("progress",n)}const na=(s,e,t)=>{e&&!s.classList.contains(t)?s.classList.add(t):!e&&s.classList.contains(t)&&s.classList.remove(t)};function Vh(){const s=this,{slides:e,params:t,slidesEl:i,activeIndex:n}=s,r=s.virtual&&t.virtual.enabled,a=s.grid&&t.grid&&t.grid.rows>1,o=h=>di(i,`.${t.slideClass}${h}, swiper-slide${h}`)[0];let c,l,d;if(r)if(t.loop){let h=n-s.virtual.slidesBefore;h<0&&(h=s.virtual.slides.length+h),h>=s.virtual.slides.length&&(h-=s.virtual.slides.length),c=o(`[data-swiper-slide-index="${h}"]`)}else c=o(`[data-swiper-slide-index="${n}"]`);else a?(c=e.find(h=>h.column===n),d=e.find(h=>h.column===n+1),l=e.find(h=>h.column===n-1)):c=e[n];c&&(a||(d=Ch(c,`.${t.slideClass}, swiper-slide`)[0],t.loop&&!d&&(d=e[0]),l=yh(c,`.${t.slideClass}, swiper-slide`)[0],t.loop&&!l===0&&(l=e[e.length-1]))),e.forEach(h=>{na(h,h===c,t.slideActiveClass),na(h,h===d,t.slideNextClass),na(h,h===l,t.slidePrevClass)}),s.emitSlidesClasses()}const Ws=(s,e)=>{if(!s||s.destroyed||!s.params)return;const t=()=>s.isElement?"swiper-slide":`.${s.params.slideClass}`,i=e.closest(t());if(i){let n=i.querySelector(`.${s.params.lazyPreloaderClass}`);!n&&s.isElement&&(i.shadowRoot?n=i.shadowRoot.querySelector(`.${s.params.lazyPreloaderClass}`):requestAnimationFrame(()=>{i.shadowRoot&&(n=i.shadowRoot.querySelector(`.${s.params.lazyPreloaderClass}`),n&&n.remove())})),n&&n.remove()}},sa=(s,e)=>{if(!s.slides[e])return;const t=s.slides[e].querySelector('[loading="lazy"]');t&&t.removeAttribute("loading")},ra=s=>{if(!s||s.destroyed||!s.params)return;let e=s.params.lazyPreloadPrevNext;const t=s.slides.length;if(!t||!e||e<0)return;e=Math.min(e,t);const i=s.params.slidesPerView==="auto"?s.slidesPerViewDynamic():Math.ceil(s.params.slidesPerView),n=s.activeIndex;if(s.params.grid&&s.params.grid.rows>1){const a=n,o=[a-e];o.push(...Array.from({length:e}).map((c,l)=>a+i+l)),s.slides.forEach((c,l)=>{o.includes(c.column)&&sa(s,l)});return}const r=n+i-1;if(s.params.rewind||s.params.loop)for(let a=n-e;a<=r+e;a+=1){const o=(a%t+t)%t;(o<n||o>r)&&sa(s,o)}else for(let a=Math.max(n-e,0);a<=Math.min(r+e,t-1);a+=1)a!==n&&(a>r||a<n)&&sa(s,a)};function kh(s){const{slidesGrid:e,params:t}=s,i=s.rtlTranslate?s.translate:-s.translate;let n;for(let r=0;r<e.length;r+=1)typeof e[r+1]<"u"?i>=e[r]&&i<e[r+1]-(e[r+1]-e[r])/2?n=r:i>=e[r]&&i<e[r+1]&&(n=r+1):i>=e[r]&&(n=r);return t.normalizeSlideIndex&&(n<0||typeof n>"u")&&(n=0),n}function Oh(s){const e=this,t=e.rtlTranslate?e.translate:-e.translate,{snapGrid:i,params:n,activeIndex:r,realIndex:a,snapIndex:o}=e;let c=s,l;const d=p=>{let g=p-e.virtual.slidesBefore;return g<0&&(g=e.virtual.slides.length+g),g>=e.virtual.slides.length&&(g-=e.virtual.slides.length),g};if(typeof c>"u"&&(c=kh(e)),i.indexOf(t)>=0)l=i.indexOf(t);else{const p=Math.min(n.slidesPerGroupSkip,c);l=p+Math.floor((c-p)/n.slidesPerGroup)}if(l>=i.length&&(l=i.length-1),c===r&&!e.params.loop){l!==o&&(e.snapIndex=l,e.emit("snapIndexChange"));return}if(c===r&&e.params.loop&&e.virtual&&e.params.virtual.enabled){e.realIndex=d(c);return}const h=e.grid&&n.grid&&n.grid.rows>1;let u;if(e.virtual&&n.virtual.enabled&&n.loop)u=d(c);else if(h){const p=e.slides.find(v=>v.column===c);let g=parseInt(p.getAttribute("data-swiper-slide-index"),10);Number.isNaN(g)&&(g=Math.max(e.slides.indexOf(p),0)),u=Math.floor(g/n.grid.rows)}else if(e.slides[c]){const p=e.slides[c].getAttribute("data-swiper-slide-index");p?u=parseInt(p,10):u=c}else u=c;Object.assign(e,{previousSnapIndex:o,snapIndex:l,previousRealIndex:a,realIndex:u,previousIndex:r,activeIndex:c}),e.initialized&&ra(e),e.emit("activeIndexChange"),e.emit("snapIndexChange"),(e.initialized||e.params.runCallbacksOnInit)&&(a!==u&&e.emit("realIndexChange"),e.emit("slideChange"))}function zh(s,e){const t=this,i=t.params;let n=s.closest(`.${i.slideClass}, swiper-slide`);!n&&t.isElement&&e&&e.length>1&&e.includes(s)&&[...e.slice(e.indexOf(s)+1,e.length)].forEach(o=>{!n&&o.matches&&o.matches(`.${i.slideClass}, swiper-slide`)&&(n=o)});let r=!1,a;if(n){for(let o=0;o<t.slides.length;o+=1)if(t.slides[o]===n){r=!0,a=o;break}}if(n&&r)t.clickedSlide=n,t.virtual&&t.params.virtual.enabled?t.clickedIndex=parseInt(n.getAttribute("data-swiper-slide-index"),10):t.clickedIndex=a;else{t.clickedSlide=void 0,t.clickedIndex=void 0;return}i.slideToClickedSlide&&t.clickedIndex!==void 0&&t.clickedIndex!==t.activeIndex&&t.slideToClickedSlide()}var Wh={updateSize:Bh,updateSlides:Dh,updateAutoHeight:Qh,updateSlidesOffset:Nh,updateSlidesProgress:Lh,updateProgress:Ph,updateSlidesClasses:Vh,updateActiveIndex:Oh,updateClickedSlide:zh};function Gh(s){s===void 0&&(s=this.isHorizontal()?"x":"y");const e=this,{params:t,rtlTranslate:i,translate:n,wrapperEl:r}=e;if(t.virtualTranslate)return i?-n:n;if(t.cssMode)return n;let a=Eh(r,s);return a+=e.cssOverflowAdjustment(),i&&(a=-a),a||0}function Hh(s,e){const t=this,{rtlTranslate:i,params:n,wrapperEl:r,progress:a}=t;let o=0,c=0;const l=0;t.isHorizontal()?o=i?-s:s:c=s,n.roundLengths&&(o=Math.floor(o),c=Math.floor(c)),t.previousTranslate=t.translate,t.translate=t.isHorizontal()?o:c,n.cssMode?r[t.isHorizontal()?"scrollLeft":"scrollTop"]=t.isHorizontal()?-o:-c:n.virtualTranslate||(t.isHorizontal()?o-=t.cssOverflowAdjustment():c-=t.cssOverflowAdjustment(),r.style.transform=`translate3d(${o}px, ${c}px, ${l}px)`);let d;const h=t.maxTranslate()-t.minTranslate();h===0?d=0:d=(s-t.minTranslate())/h,d!==a&&t.updateProgress(s),t.emit("setTranslate",t.translate,e)}function Jh(){return-this.snapGrid[0]}function Zh(){return-this.snapGrid[this.snapGrid.length-1]}function Xh(s,e,t,i,n){s===void 0&&(s=0),e===void 0&&(e=this.params.speed),t===void 0&&(t=!0),i===void 0&&(i=!0);const r=this,{params:a,wrapperEl:o}=r;if(r.animating&&a.preventInteractionOnTransition)return!1;const c=r.minTranslate(),l=r.maxTranslate();let d;if(i&&s>c?d=c:i&&s<l?d=l:d=s,r.updateProgress(d),a.cssMode){const h=r.isHorizontal();if(e===0)o[h?"scrollLeft":"scrollTop"]=-d;else{if(!r.support.smoothScroll)return dl({swiper:r,targetPosition:-d,side:h?"left":"top"}),!0;o.scrollTo({[h?"left":"top"]:-d,behavior:"smooth"})}return!0}return e===0?(r.setTransition(0),r.setTranslate(d),t&&(r.emit("beforeTransitionStart",e,n),r.emit("transitionEnd"))):(r.setTransition(e),r.setTranslate(d),t&&(r.emit("beforeTransitionStart",e,n),r.emit("transitionStart")),r.animating||(r.animating=!0,r.onTranslateToWrapperTransitionEnd||(r.onTranslateToWrapperTransitionEnd=function(u){!r||r.destroyed||u.target===this&&(r.wrapperEl.removeEventListener("transitionend",r.onTranslateToWrapperTransitionEnd),r.onTranslateToWrapperTransitionEnd=null,delete r.onTranslateToWrapperTransitionEnd,r.animating=!1,t&&r.emit("transitionEnd"))}),r.wrapperEl.addEventListener("transitionend",r.onTranslateToWrapperTransitionEnd))),!0}var Yh={getTranslate:Gh,setTranslate:Hh,minTranslate:Jh,maxTranslate:Zh,translateTo:Xh};function Kh(s,e){const t=this;t.params.cssMode||(t.wrapperEl.style.transitionDuration=`${s}ms`,t.wrapperEl.style.transitionDelay=s===0?"0ms":""),t.emit("setTransition",s,e)}function vl(s){let{swiper:e,runCallbacks:t,direction:i,step:n}=s;const{activeIndex:r,previousIndex:a}=e;let o=i;o||(r>a?o="next":r<a?o="prev":o="reset"),e.emit(`transition${n}`),t&&o==="reset"?e.emit(`slideResetTransition${n}`):t&&r!==a&&(e.emit(`slideChangeTransition${n}`),o==="next"?e.emit(`slideNextTransition${n}`):e.emit(`slidePrevTransition${n}`))}function jh(s,e){s===void 0&&(s=!0);const t=this,{params:i}=t;i.cssMode||(i.autoHeight&&t.updateAutoHeight(),vl({swiper:t,runCallbacks:s,direction:e,step:"Start"}))}function qh(s,e){s===void 0&&(s=!0);const t=this,{params:i}=t;t.animating=!1,!i.cssMode&&(t.setTransition(0),vl({swiper:t,runCallbacks:s,direction:e,step:"End"}))}var $h={setTransition:Kh,transitionStart:jh,transitionEnd:qh};function eu(s,e,t,i,n){s===void 0&&(s=0),t===void 0&&(t=!0),typeof s=="string"&&(s=parseInt(s,10));const r=this;let a=s;a<0&&(a=0);const{params:o,snapGrid:c,slidesGrid:l,previousIndex:d,activeIndex:h,rtlTranslate:u,wrapperEl:p,enabled:g}=r;if(!g&&!i&&!n||r.destroyed||r.animating&&o.preventInteractionOnTransition)return!1;typeof e>"u"&&(e=r.params.speed);const v=Math.min(r.params.slidesPerGroupSkip,a);let m=v+Math.floor((a-v)/r.params.slidesPerGroup);m>=c.length&&(m=c.length-1);const f=-c[m];if(o.normalizeSlideIndex)for(let U=0;U<l.length;U+=1){const I=-Math.floor(f*100),x=Math.floor(l[U]*100),E=Math.floor(l[U+1]*100);typeof l[U+1]<"u"?I>=x&&I<E-(E-x)/2?a=U:I>=x&&I<E&&(a=U+1):I>=x&&(a=U)}if(r.initialized&&a!==h&&(!r.allowSlideNext&&(u?f>r.translate&&f>r.minTranslate():f<r.translate&&f<r.minTranslate())||!r.allowSlidePrev&&f>r.translate&&f>r.maxTranslate()&&(h||0)!==a))return!1;a!==(d||0)&&t&&r.emit("beforeSlideChangeStart"),r.updateProgress(f);let A;a>h?A="next":a<h?A="prev":A="reset";const _=r.virtual&&r.params.virtual.enabled;if(!(_&&n)&&(u&&-f===r.translate||!u&&f===r.translate))return r.updateActiveIndex(a),o.autoHeight&&r.updateAutoHeight(),r.updateSlidesClasses(),o.effect!=="slide"&&r.setTranslate(f),A!=="reset"&&(r.transitionStart(t,A),r.transitionEnd(t,A)),!1;if(o.cssMode){const U=r.isHorizontal(),I=u?f:-f;if(e===0)_&&(r.wrapperEl.style.scrollSnapType="none",r._immediateVirtual=!0),_&&!r._cssModeVirtualInitialSet&&r.params.initialSlide>0?(r._cssModeVirtualInitialSet=!0,requestAnimationFrame(()=>{p[U?"scrollLeft":"scrollTop"]=I})):p[U?"scrollLeft":"scrollTop"]=I,_&&requestAnimationFrame(()=>{r.wrapperEl.style.scrollSnapType="",r._immediateVirtual=!1});else{if(!r.support.smoothScroll)return dl({swiper:r,targetPosition:I,side:U?"left":"top"}),!0;p.scrollTo({[U?"left":"top"]:I,behavior:"smooth"})}return!0}const y=ml().isSafari;return _&&!n&&y&&r.isElement&&r.virtual.update(!1,!1,a),r.setTransition(e),r.setTranslate(f),r.updateActiveIndex(a),r.updateSlidesClasses(),r.emit("beforeTransitionStart",e,i),r.transitionStart(t,A),e===0?r.transitionEnd(t,A):r.animating||(r.animating=!0,r.onSlideToWrapperTransitionEnd||(r.onSlideToWrapperTransitionEnd=function(I){!r||r.destroyed||I.target===this&&(r.wrapperEl.removeEventListener("transitionend",r.onSlideToWrapperTransitionEnd),r.onSlideToWrapperTransitionEnd=null,delete r.onSlideToWrapperTransitionEnd,r.transitionEnd(t,A))}),r.wrapperEl.addEventListener("transitionend",r.onSlideToWrapperTransitionEnd)),!0}function tu(s,e,t,i){s===void 0&&(s=0),t===void 0&&(t=!0),typeof s=="string"&&(s=parseInt(s,10));const n=this;if(n.destroyed)return;typeof e>"u"&&(e=n.params.speed);const r=n.grid&&n.params.grid&&n.params.grid.rows>1;let a=s;if(n.params.loop)if(n.virtual&&n.params.virtual.enabled)a=a+n.virtual.slidesBefore;else{let o;if(r){const u=a*n.params.grid.rows;o=n.slides.find(p=>p.getAttribute("data-swiper-slide-index")*1===u).column}else o=n.getSlideIndexByData(a);const c=r?Math.ceil(n.slides.length/n.params.grid.rows):n.slides.length,{centeredSlides:l}=n.params;let d=n.params.slidesPerView;d==="auto"?d=n.slidesPerViewDynamic():(d=Math.ceil(parseFloat(n.params.slidesPerView,10)),l&&d%2===0&&(d=d+1));let h=c-o<d;if(l&&(h=h||o<Math.ceil(d/2)),i&&l&&n.params.slidesPerView!=="auto"&&!r&&(h=!1),h){const u=l?o<n.activeIndex?"prev":"next":o-n.activeIndex-1<n.params.slidesPerView?"next":"prev";n.loopFix({direction:u,slideTo:!0,activeSlideIndex:u==="next"?o+1:o-c+1,slideRealIndex:u==="next"?n.realIndex:void 0})}if(r){const u=a*n.params.grid.rows;a=n.slides.find(p=>p.getAttribute("data-swiper-slide-index")*1===u).column}else a=n.getSlideIndexByData(a)}return requestAnimationFrame(()=>{n.slideTo(a,e,t,i)}),n}function iu(s,e,t){e===void 0&&(e=!0);const i=this,{enabled:n,params:r,animating:a}=i;if(!n||i.destroyed)return i;typeof s>"u"&&(s=i.params.speed);let o=r.slidesPerGroup;r.slidesPerView==="auto"&&r.slidesPerGroup===1&&r.slidesPerGroupAuto&&(o=Math.max(i.slidesPerViewDynamic("current",!0),1));const c=i.activeIndex<r.slidesPerGroupSkip?1:o,l=i.virtual&&r.virtual.enabled;if(r.loop){if(a&&!l&&r.loopPreventsSliding)return!1;if(i.loopFix({direction:"next"}),i._clientLeft=i.wrapperEl.clientLeft,i.activeIndex===i.slides.length-1&&r.cssMode)return requestAnimationFrame(()=>{i.slideTo(i.activeIndex+c,s,e,t)}),!0}return r.rewind&&i.isEnd?i.slideTo(0,s,e,t):i.slideTo(i.activeIndex+c,s,e,t)}function nu(s,e,t){e===void 0&&(e=!0);const i=this,{params:n,snapGrid:r,slidesGrid:a,rtlTranslate:o,enabled:c,animating:l}=i;if(!c||i.destroyed)return i;typeof s>"u"&&(s=i.params.speed);const d=i.virtual&&n.virtual.enabled;if(n.loop){if(l&&!d&&n.loopPreventsSliding)return!1;i.loopFix({direction:"prev"}),i._clientLeft=i.wrapperEl.clientLeft}const h=o?i.translate:-i.translate;function u(A){return A<0?-Math.floor(Math.abs(A)):Math.floor(A)}const p=u(h),g=r.map(A=>u(A)),v=n.freeMode&&n.freeMode.enabled;let m=r[g.indexOf(p)-1];if(typeof m>"u"&&(n.cssMode||v)){let A;r.forEach((_,S)=>{p>=_&&(A=S)}),typeof A<"u"&&(m=v?r[A]:r[A>0?A-1:A])}let f=0;if(typeof m<"u"&&(f=a.indexOf(m),f<0&&(f=i.activeIndex-1),n.slidesPerView==="auto"&&n.slidesPerGroup===1&&n.slidesPerGroupAuto&&(f=f-i.slidesPerViewDynamic("previous",!0)+1,f=Math.max(f,0))),n.rewind&&i.isBeginning){const A=i.params.virtual&&i.params.virtual.enabled&&i.virtual?i.virtual.slides.length-1:i.slides.length-1;return i.slideTo(A,s,e,t)}else if(n.loop&&i.activeIndex===0&&n.cssMode)return requestAnimationFrame(()=>{i.slideTo(f,s,e,t)}),!0;return i.slideTo(f,s,e,t)}function su(s,e,t){e===void 0&&(e=!0);const i=this;if(!i.destroyed)return typeof s>"u"&&(s=i.params.speed),i.slideTo(i.activeIndex,s,e,t)}function ru(s,e,t,i){e===void 0&&(e=!0),i===void 0&&(i=.5);const n=this;if(n.destroyed)return;typeof s>"u"&&(s=n.params.speed);let r=n.activeIndex;const a=Math.min(n.params.slidesPerGroupSkip,r),o=a+Math.floor((r-a)/n.params.slidesPerGroup),c=n.rtlTranslate?n.translate:-n.translate;if(c>=n.snapGrid[o]){const l=n.snapGrid[o],d=n.snapGrid[o+1];c-l>(d-l)*i&&(r+=n.params.slidesPerGroup)}else{const l=n.snapGrid[o-1],d=n.snapGrid[o];c-l<=(d-l)*i&&(r-=n.params.slidesPerGroup)}return r=Math.max(r,0),r=Math.min(r,n.slidesGrid.length-1),n.slideTo(r,s,e,t)}function au(){const s=this;if(s.destroyed)return;const{params:e,slidesEl:t}=s,i=e.slidesPerView==="auto"?s.slidesPerViewDynamic():e.slidesPerView;let n=s.getSlideIndexWhenGrid(s.clickedIndex),r;const a=s.isElement?"swiper-slide":`.${e.slideClass}`,o=s.grid&&s.params.grid&&s.params.grid.rows>1;if(e.loop){if(s.animating)return;r=parseInt(s.clickedSlide.getAttribute("data-swiper-slide-index"),10),e.centeredSlides?s.slideToLoop(r):n>(o?(s.slides.length-i)/2-(s.params.grid.rows-1):s.slides.length-i)?(s.loopFix(),n=s.getSlideIndex(di(t,`${a}[data-swiper-slide-index="${r}"]`)[0]),qr(()=>{s.slideTo(n)})):s.slideTo(n)}else s.slideTo(n)}var ou={slideTo:eu,slideToLoop:tu,slideNext:iu,slidePrev:nu,slideReset:su,slideToClosest:ru,slideToClickedSlide:au};function lu(s,e){const t=this,{params:i,slidesEl:n}=t;if(!i.loop||t.virtual&&t.params.virtual.enabled)return;const r=()=>{di(n,`.${i.slideClass}, swiper-slide`).forEach((p,g)=>{p.setAttribute("data-swiper-slide-index",g)})},a=()=>{const u=di(n,`.${i.slideBlankClass}`);u.forEach(p=>{p.remove()}),u.length>0&&(t.recalcSlides(),t.updateSlides())},o=t.grid&&i.grid&&i.grid.rows>1;i.loopAddBlankSlides&&(i.slidesPerGroup>1||o)&&a();const c=i.slidesPerGroup*(o?i.grid.rows:1),l=t.slides.length%c!==0,d=o&&t.slides.length%i.grid.rows!==0,h=u=>{for(let p=0;p<u;p+=1){const g=t.isElement?ms("swiper-slide",[i.slideBlankClass]):ms("div",[i.slideClass,i.slideBlankClass]);t.slidesEl.append(g)}};if(l){if(i.loopAddBlankSlides){const u=c-t.slides.length%c;h(u),t.recalcSlides(),t.updateSlides()}else ks("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");r()}else if(d){if(i.loopAddBlankSlides){const u=i.grid.rows-t.slides.length%i.grid.rows;h(u),t.recalcSlides(),t.updateSlides()}else ks("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");r()}else r();t.loopFix({slideRealIndex:s,direction:i.centeredSlides?void 0:"next",initial:e})}function cu(s){let{slideRealIndex:e,slideTo:t=!0,direction:i,setTranslate:n,activeSlideIndex:r,initial:a,byController:o,byMousewheel:c}=s===void 0?{}:s;const l=this;if(!l.params.loop)return;l.emit("beforeLoopFix");const{slides:d,allowSlidePrev:h,allowSlideNext:u,slidesEl:p,params:g}=l,{centeredSlides:v,initialSlide:m}=g;if(l.allowSlidePrev=!0,l.allowSlideNext=!0,l.virtual&&g.virtual.enabled){t&&(!g.centeredSlides&&l.snapIndex===0?l.slideTo(l.virtual.slides.length,0,!1,!0):g.centeredSlides&&l.snapIndex<g.slidesPerView?l.slideTo(l.virtual.slides.length+l.snapIndex,0,!1,!0):l.snapIndex===l.snapGrid.length-1&&l.slideTo(l.virtual.slidesBefore,0,!1,!0)),l.allowSlidePrev=h,l.allowSlideNext=u,l.emit("loopFix");return}let f=g.slidesPerView;f==="auto"?f=l.slidesPerViewDynamic():(f=Math.ceil(parseFloat(g.slidesPerView,10)),v&&f%2===0&&(f=f+1));const A=g.slidesPerGroupAuto?f:g.slidesPerGroup;let _=v?Math.max(A,Math.ceil(f/2)):A;_%A!==0&&(_+=A-_%A),_+=g.loopAdditionalSlides,l.loopedSlides=_;const S=l.grid&&g.grid&&g.grid.rows>1;d.length<f+_||l.params.effect==="cards"&&d.length<f+_*2?ks("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters"):S&&g.grid.fill==="row"&&ks("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");const C=[],y=[],U=S?Math.ceil(d.length/g.grid.rows):d.length,I=a&&U-m<f&&!v;let x=I?m:l.activeIndex;typeof r>"u"?r=l.getSlideIndex(d.find(Q=>Q.classList.contains(g.slideActiveClass))):x=r;const E=i==="next"||!i,M=i==="prev"||!i;let R=0,F=0;const z=(S?d[r].column:r)+(v&&typeof n>"u"?-f/2+.5:0);if(z<_){R=Math.max(_-z,A);for(let Q=0;Q<_-z;Q+=1){const N=Q-Math.floor(Q/U)*U;if(S){const D=U-N-1;for(let Z=d.length-1;Z>=0;Z-=1)d[Z].column===D&&C.push(Z)}else C.push(U-N-1)}}else if(z+f>U-_){F=Math.max(z-(U-_*2),A),I&&(F=Math.max(F,f-U+m+1));for(let Q=0;Q<F;Q+=1){const N=Q-Math.floor(Q/U)*U;S?d.forEach((D,Z)=>{D.column===N&&y.push(Z)}):y.push(N)}}if(l.__preventObserver__=!0,requestAnimationFrame(()=>{l.__preventObserver__=!1}),l.params.effect==="cards"&&d.length<f+_*2&&(y.includes(r)&&y.splice(y.indexOf(r),1),C.includes(r)&&C.splice(C.indexOf(r),1)),M&&C.forEach(Q=>{d[Q].swiperLoopMoveDOM=!0,p.prepend(d[Q]),d[Q].swiperLoopMoveDOM=!1}),E&&y.forEach(Q=>{d[Q].swiperLoopMoveDOM=!0,p.append(d[Q]),d[Q].swiperLoopMoveDOM=!1}),l.recalcSlides(),g.slidesPerView==="auto"?l.updateSlides():S&&(C.length>0&&M||y.length>0&&E)&&l.slides.forEach((Q,N)=>{l.grid.updateSlide(N,Q,l.slides)}),g.watchSlidesProgress&&l.updateSlidesOffset(),t){if(C.length>0&&M){if(typeof e>"u"){const Q=l.slidesGrid[x],D=l.slidesGrid[x+R]-Q;c?l.setTranslate(l.translate-D):(l.slideTo(x+Math.ceil(R),0,!1,!0),n&&(l.touchEventsData.startTranslate=l.touchEventsData.startTranslate-D,l.touchEventsData.currentTranslate=l.touchEventsData.currentTranslate-D))}else if(n){const Q=S?C.length/g.grid.rows:C.length;l.slideTo(l.activeIndex+Q,0,!1,!0),l.touchEventsData.currentTranslate=l.translate}}else if(y.length>0&&E)if(typeof e>"u"){const Q=l.slidesGrid[x],D=l.slidesGrid[x-F]-Q;c?l.setTranslate(l.translate-D):(l.slideTo(x-F,0,!1,!0),n&&(l.touchEventsData.startTranslate=l.touchEventsData.startTranslate-D,l.touchEventsData.currentTranslate=l.touchEventsData.currentTranslate-D))}else{const Q=S?y.length/g.grid.rows:y.length;l.slideTo(l.activeIndex-Q,0,!1,!0)}}if(l.allowSlidePrev=h,l.allowSlideNext=u,l.controller&&l.controller.control&&!o){const Q={slideRealIndex:e,direction:i,setTranslate:n,activeSlideIndex:r,byController:!0};Array.isArray(l.controller.control)?l.controller.control.forEach(N=>{!N.destroyed&&N.params.loop&&N.loopFix({...Q,slideTo:N.params.slidesPerView===g.slidesPerView?t:!1})}):l.controller.control instanceof l.constructor&&l.controller.control.params.loop&&l.controller.control.loopFix({...Q,slideTo:l.controller.control.params.slidesPerView===g.slidesPerView?t:!1})}l.emit("loopFix")}function du(){const s=this,{params:e,slidesEl:t}=s;if(!e.loop||!t||s.virtual&&s.params.virtual.enabled)return;s.recalcSlides();const i=[];s.slides.forEach(n=>{const r=typeof n.swiperSlideIndex>"u"?n.getAttribute("data-swiper-slide-index")*1:n.swiperSlideIndex;i[r]=n}),s.slides.forEach(n=>{n.removeAttribute("data-swiper-slide-index")}),i.forEach(n=>{t.append(n)}),s.recalcSlides(),s.slideTo(s.realIndex,0)}var hu={loopCreate:lu,loopFix:cu,loopDestroy:du};function uu(s){const e=this;if(!e.params.simulateTouch||e.params.watchOverflow&&e.isLocked||e.params.cssMode)return;const t=e.params.touchEventsTarget==="container"?e.el:e.wrapperEl;e.isElement&&(e.__preventObserver__=!0),t.style.cursor="move",t.style.cursor=s?"grabbing":"grab",e.isElement&&requestAnimationFrame(()=>{e.__preventObserver__=!1})}function fu(){const s=this;s.params.watchOverflow&&s.isLocked||s.params.cssMode||(s.isElement&&(s.__preventObserver__=!0),s[s.params.touchEventsTarget==="container"?"el":"wrapperEl"].style.cursor="",s.isElement&&requestAnimationFrame(()=>{s.__preventObserver__=!1}))}var pu={setGrabCursor:uu,unsetGrabCursor:fu};function mu(s,e){e===void 0&&(e=this);function t(i){if(!i||i===Ot()||i===Mt())return null;i.assignedSlot&&(i=i.assignedSlot);const n=i.closest(s);return!n&&!i.getRootNode?null:n||t(i.getRootNode().host)}return t(e)}function Al(s,e,t){const i=Mt(),{params:n}=s,r=n.edgeSwipeDetection,a=n.edgeSwipeThreshold;return r&&(t<=a||t>=i.innerWidth-a)?r==="prevent"?(e.preventDefault(),!0):!1:!0}function gu(s){const e=this,t=Ot();let i=s;i.originalEvent&&(i=i.originalEvent);const n=e.touchEventsData;if(i.type==="pointerdown"){if(n.pointerId!==null&&n.pointerId!==i.pointerId)return;n.pointerId=i.pointerId}else i.type==="touchstart"&&i.targetTouches.length===1&&(n.touchId=i.targetTouches[0].identifier);if(i.type==="touchstart"){Al(e,i,i.targetTouches[0].pageX);return}const{params:r,touches:a,enabled:o}=e;if(!o||!r.simulateTouch&&i.pointerType==="mouse"||e.animating&&r.preventInteractionOnTransition)return;!e.animating&&r.cssMode&&r.loop&&e.loopFix();let c=i.target;if(r.touchEventsTarget==="wrapper"&&!bh(c,e.wrapperEl)||"which"in i&&i.which===3||"button"in i&&i.button>0||n.isTouched&&n.isMoved)return;const l=!!r.noSwipingClass&&r.noSwipingClass!=="",d=i.composedPath?i.composedPath():i.path;l&&i.target&&i.target.shadowRoot&&d&&(c=d[0]);const h=r.noSwipingSelector?r.noSwipingSelector:`.${r.noSwipingClass}`,u=!!(i.target&&i.target.shadowRoot);if(r.noSwiping&&(u?mu(h,c):c.closest(h))){e.allowClick=!0;return}if(r.swipeHandler&&!c.closest(r.swipeHandler))return;a.currentX=i.pageX,a.currentY=i.pageY;const p=a.currentX,g=a.currentY;if(!Al(e,i,p))return;Object.assign(n,{isTouched:!0,isMoved:!1,allowTouchCallbacks:!0,isScrolling:void 0,startMoving:void 0}),a.startX=p,a.startY=g,n.touchStartTime=Ps(),e.allowClick=!0,e.updateSize(),e.swipeDirection=void 0,r.threshold>0&&(n.allowThresholdMove=!1);let v=!0;c.matches(n.focusableElements)&&(v=!1,c.nodeName==="SELECT"&&(n.isTouched=!1)),t.activeElement&&t.activeElement.matches(n.focusableElements)&&t.activeElement!==c&&(i.pointerType==="mouse"||i.pointerType!=="mouse"&&!c.matches(n.focusableElements))&&t.activeElement.blur();const m=v&&e.allowTouchMove&&r.touchStartPreventDefault;(r.touchStartForcePreventDefault||m)&&!c.isContentEditable&&i.preventDefault(),r.freeMode&&r.freeMode.enabled&&e.freeMode&&e.animating&&!r.cssMode&&e.freeMode.onTouchStart(),e.emit("touchStart",i)}function vu(s){const e=Ot(),t=this,i=t.touchEventsData,{params:n,touches:r,rtlTranslate:a,enabled:o}=t;if(!o||!n.simulateTouch&&s.pointerType==="mouse")return;let c=s;if(c.originalEvent&&(c=c.originalEvent),c.type==="pointermove"&&(i.touchId!==null||c.pointerId!==i.pointerId))return;let l;if(c.type==="touchmove"){if(l=[...c.changedTouches].find(C=>C.identifier===i.touchId),!l||l.identifier!==i.touchId)return}else l=c;if(!i.isTouched){i.startMoving&&i.isScrolling&&t.emit("touchMoveOpposite",c);return}const d=l.pageX,h=l.pageY;if(c.preventedByNestedSwiper){r.startX=d,r.startY=h;return}if(!t.allowTouchMove){c.target.matches(i.focusableElements)||(t.allowClick=!1),i.isTouched&&(Object.assign(r,{startX:d,startY:h,currentX:d,currentY:h}),i.touchStartTime=Ps());return}if(n.touchReleaseOnEdges&&!n.loop)if(t.isVertical()){if(h<r.startY&&t.translate<=t.maxTranslate()||h>r.startY&&t.translate>=t.minTranslate()){i.isTouched=!1,i.isMoved=!1;return}}else{if(a&&(d>r.startX&&-t.translate<=t.maxTranslate()||d<r.startX&&-t.translate>=t.minTranslate()))return;if(!a&&(d<r.startX&&t.translate<=t.maxTranslate()||d>r.startX&&t.translate>=t.minTranslate()))return}if(e.activeElement&&e.activeElement.matches(i.focusableElements)&&e.activeElement!==c.target&&c.pointerType!=="mouse"&&e.activeElement.blur(),e.activeElement&&c.target===e.activeElement&&c.target.matches(i.focusableElements)){i.isMoved=!0,t.allowClick=!1;return}i.allowTouchCallbacks&&t.emit("touchMove",c),r.previousX=r.currentX,r.previousY=r.currentY,r.currentX=d,r.currentY=h;const u=r.currentX-r.startX,p=r.currentY-r.startY;if(t.params.threshold&&Math.sqrt(u**2+p**2)<t.params.threshold)return;if(typeof i.isScrolling>"u"){let C;t.isHorizontal()&&r.currentY===r.startY||t.isVertical()&&r.currentX===r.startX?i.isScrolling=!1:u*u+p*p>=25&&(C=Math.atan2(Math.abs(p),Math.abs(u))*180/Math.PI,i.isScrolling=t.isHorizontal()?C>n.touchAngle:90-C>n.touchAngle)}if(i.isScrolling&&t.emit("touchMoveOpposite",c),typeof i.startMoving>"u"&&(r.currentX!==r.startX||r.currentY!==r.startY)&&(i.startMoving=!0),i.isScrolling||c.type==="touchmove"&&i.preventTouchMoveFromPointerMove){i.isTouched=!1;return}if(!i.startMoving)return;t.allowClick=!1,!n.cssMode&&c.cancelable&&c.preventDefault(),n.touchMoveStopPropagation&&!n.nested&&c.stopPropagation();let g=t.isHorizontal()?u:p,v=t.isHorizontal()?r.currentX-r.previousX:r.currentY-r.previousY;n.oneWayMovement&&(g=Math.abs(g)*(a?1:-1),v=Math.abs(v)*(a?1:-1)),r.diff=g,g*=n.touchRatio,a&&(g=-g,v=-v);const m=t.touchesDirection;t.swipeDirection=g>0?"prev":"next",t.touchesDirection=v>0?"prev":"next";const f=t.params.loop&&!n.cssMode,A=t.touchesDirection==="next"&&t.allowSlideNext||t.touchesDirection==="prev"&&t.allowSlidePrev;if(!i.isMoved){if(f&&A&&t.loopFix({direction:t.swipeDirection}),i.startTranslate=t.getTranslate(),t.setTransition(0),t.animating){const C=new window.CustomEvent("transitionend",{bubbles:!0,cancelable:!0,detail:{bySwiperTouchMove:!0}});t.wrapperEl.dispatchEvent(C)}i.allowMomentumBounce=!1,n.grabCursor&&(t.allowSlideNext===!0||t.allowSlidePrev===!0)&&t.setGrabCursor(!0),t.emit("sliderFirstMove",c)}if(new Date().getTime(),n._loopSwapReset!==!1&&i.isMoved&&i.allowThresholdMove&&m!==t.touchesDirection&&f&&A&&Math.abs(g)>=1){Object.assign(r,{startX:d,startY:h,currentX:d,currentY:h,startTranslate:i.currentTranslate}),i.loopSwapReset=!0,i.startTranslate=i.currentTranslate;return}t.emit("sliderMove",c),i.isMoved=!0,i.currentTranslate=g+i.startTranslate;let _=!0,S=n.resistanceRatio;if(n.touchReleaseOnEdges&&(S=0),g>0?(f&&A&&i.allowThresholdMove&&i.currentTranslate>(n.centeredSlides?t.minTranslate()-t.slidesSizesGrid[t.activeIndex+1]-(n.slidesPerView!=="auto"&&t.slides.length-n.slidesPerView>=2?t.slidesSizesGrid[t.activeIndex+1]+t.params.spaceBetween:0)-t.params.spaceBetween:t.minTranslate())&&t.loopFix({direction:"prev",setTranslate:!0,activeSlideIndex:0}),i.currentTranslate>t.minTranslate()&&(_=!1,n.resistance&&(i.currentTranslate=t.minTranslate()-1+(-t.minTranslate()+i.startTranslate+g)**S))):g<0&&(f&&A&&i.allowThresholdMove&&i.currentTranslate<(n.centeredSlides?t.maxTranslate()+t.slidesSizesGrid[t.slidesSizesGrid.length-1]+t.params.spaceBetween+(n.slidesPerView!=="auto"&&t.slides.length-n.slidesPerView>=2?t.slidesSizesGrid[t.slidesSizesGrid.length-1]+t.params.spaceBetween:0):t.maxTranslate())&&t.loopFix({direction:"next",setTranslate:!0,activeSlideIndex:t.slides.length-(n.slidesPerView==="auto"?t.slidesPerViewDynamic():Math.ceil(parseFloat(n.slidesPerView,10)))}),i.currentTranslate<t.maxTranslate()&&(_=!1,n.resistance&&(i.currentTranslate=t.maxTranslate()+1-(t.maxTranslate()-i.startTranslate-g)**S))),_&&(c.preventedByNestedSwiper=!0),!t.allowSlideNext&&t.swipeDirection==="next"&&i.currentTranslate<i.startTranslate&&(i.currentTranslate=i.startTranslate),!t.allowSlidePrev&&t.swipeDirection==="prev"&&i.currentTranslate>i.startTranslate&&(i.currentTranslate=i.startTranslate),!t.allowSlidePrev&&!t.allowSlideNext&&(i.currentTranslate=i.startTranslate),n.threshold>0)if(Math.abs(g)>n.threshold||i.allowThresholdMove){if(!i.allowThresholdMove){i.allowThresholdMove=!0,r.startX=r.currentX,r.startY=r.currentY,i.currentTranslate=i.startTranslate,r.diff=t.isHorizontal()?r.currentX-r.startX:r.currentY-r.startY;return}}else{i.currentTranslate=i.startTranslate;return}!n.followFinger||n.cssMode||((n.freeMode&&n.freeMode.enabled&&t.freeMode||n.watchSlidesProgress)&&(t.updateActiveIndex(),t.updateSlidesClasses()),n.freeMode&&n.freeMode.enabled&&t.freeMode&&t.freeMode.onTouchMove(),t.updateProgress(i.currentTranslate),t.setTranslate(i.currentTranslate))}function Au(s){const e=this,t=e.touchEventsData;let i=s;i.originalEvent&&(i=i.originalEvent);let n;if(i.type==="touchend"||i.type==="touchcancel"){if(n=[...i.changedTouches].find(C=>C.identifier===t.touchId),!n||n.identifier!==t.touchId)return}else{if(t.touchId!==null||i.pointerId!==t.pointerId)return;n=i}if(["pointercancel","pointerout","pointerleave","contextmenu"].includes(i.type)&&!(["pointercancel","contextmenu"].includes(i.type)&&(e.browser.isSafari||e.browser.isWebView)))return;t.pointerId=null,t.touchId=null;const{params:a,touches:o,rtlTranslate:c,slidesGrid:l,enabled:d}=e;if(!d||!a.simulateTouch&&i.pointerType==="mouse")return;if(t.allowTouchCallbacks&&e.emit("touchEnd",i),t.allowTouchCallbacks=!1,!t.isTouched){t.isMoved&&a.grabCursor&&e.setGrabCursor(!1),t.isMoved=!1,t.startMoving=!1;return}a.grabCursor&&t.isMoved&&t.isTouched&&(e.allowSlideNext===!0||e.allowSlidePrev===!0)&&e.setGrabCursor(!1);const h=Ps(),u=h-t.touchStartTime;if(e.allowClick){const C=i.path||i.composedPath&&i.composedPath();e.updateClickedSlide(C&&C[0]||i.target,C),e.emit("tap click",i),u<300&&h-t.lastClickTime<300&&e.emit("doubleTap doubleClick",i)}if(t.lastClickTime=Ps(),qr(()=>{e.destroyed||(e.allowClick=!0)}),!t.isTouched||!t.isMoved||!e.swipeDirection||o.diff===0&&!t.loopSwapReset||t.currentTranslate===t.startTranslate&&!t.loopSwapReset){t.isTouched=!1,t.isMoved=!1,t.startMoving=!1;return}t.isTouched=!1,t.isMoved=!1,t.startMoving=!1;let p;if(a.followFinger?p=c?e.translate:-e.translate:p=-t.currentTranslate,a.cssMode)return;if(a.freeMode&&a.freeMode.enabled){e.freeMode.onTouchEnd({currentPos:p});return}const g=p>=-e.maxTranslate()&&!e.params.loop;let v=0,m=e.slidesSizesGrid[0];for(let C=0;C<l.length;C+=C<a.slidesPerGroupSkip?1:a.slidesPerGroup){const y=C<a.slidesPerGroupSkip-1?1:a.slidesPerGroup;typeof l[C+y]<"u"?(g||p>=l[C]&&p<l[C+y])&&(v=C,m=l[C+y]-l[C]):(g||p>=l[C])&&(v=C,m=l[l.length-1]-l[l.length-2])}let f=null,A=null;a.rewind&&(e.isBeginning?A=a.virtual&&a.virtual.enabled&&e.virtual?e.virtual.slides.length-1:e.slides.length-1:e.isEnd&&(f=0));const _=(p-l[v])/m,S=v<a.slidesPerGroupSkip-1?1:a.slidesPerGroup;if(u>a.longSwipesMs){if(!a.longSwipes){e.slideTo(e.activeIndex);return}e.swipeDirection==="next"&&(_>=a.longSwipesRatio?e.slideTo(a.rewind&&e.isEnd?f:v+S):e.slideTo(v)),e.swipeDirection==="prev"&&(_>1-a.longSwipesRatio?e.slideTo(v+S):A!==null&&_<0&&Math.abs(_)>a.longSwipesRatio?e.slideTo(A):e.slideTo(v))}else{if(!a.shortSwipes){e.slideTo(e.activeIndex);return}e.navigation&&(i.target===e.navigation.nextEl||i.target===e.navigation.prevEl)?i.target===e.navigation.nextEl?e.slideTo(v+S):e.slideTo(v):(e.swipeDirection==="next"&&e.slideTo(f!==null?f:v+S),e.swipeDirection==="prev"&&e.slideTo(A!==null?A:v))}}function _l(){const s=this,{params:e,el:t}=s;if(t&&t.offsetWidth===0)return;e.breakpoints&&s.setBreakpoint();const{allowSlideNext:i,allowSlidePrev:n,snapGrid:r}=s,a=s.virtual&&s.params.virtual.enabled;s.allowSlideNext=!0,s.allowSlidePrev=!0,s.updateSize(),s.updateSlides(),s.updateSlidesClasses();const o=a&&e.loop;(e.slidesPerView==="auto"||e.slidesPerView>1)&&s.isEnd&&!s.isBeginning&&!s.params.centeredSlides&&!o?s.slideTo(s.slides.length-1,0,!1,!0):s.params.loop&&!a?s.slideToLoop(s.realIndex,0,!1,!0):s.slideTo(s.activeIndex,0,!1,!0),s.autoplay&&s.autoplay.running&&s.autoplay.paused&&(clearTimeout(s.autoplay.resizeTimeout),s.autoplay.resizeTimeout=setTimeout(()=>{s.autoplay&&s.autoplay.running&&s.autoplay.paused&&s.autoplay.resume()},500)),s.allowSlidePrev=n,s.allowSlideNext=i,s.params.watchOverflow&&r!==s.snapGrid&&s.checkOverflow()}function _u(s){const e=this;e.enabled&&(e.allowClick||(e.params.preventClicks&&s.preventDefault(),e.params.preventClicksPropagation&&e.animating&&(s.stopPropagation(),s.stopImmediatePropagation())))}function Su(){const s=this,{wrapperEl:e,rtlTranslate:t,enabled:i}=s;if(!i)return;s.previousTranslate=s.translate,s.isHorizontal()?s.translate=-e.scrollLeft:s.translate=-e.scrollTop,s.translate===0&&(s.translate=0),s.updateActiveIndex(),s.updateSlidesClasses();let n;const r=s.maxTranslate()-s.minTranslate();r===0?n=0:n=(s.translate-s.minTranslate())/r,n!==s.progress&&s.updateProgress(t?-s.translate:s.translate),s.emit("setTranslate",s.translate,!1)}function Eu(s){const e=this;Ws(e,s.target),!(e.params.cssMode||e.params.slidesPerView!=="auto"&&!e.params.autoHeight)&&e.update()}function xu(){const s=this;s.documentTouchHandlerProceeded||(s.documentTouchHandlerProceeded=!0,s.params.touchReleaseOnEdges&&(s.el.style.touchAction="auto"))}const Sl=(s,e)=>{const t=Ot(),{params:i,el:n,wrapperEl:r,device:a}=s,o=!!i.nested,c=e==="on"?"addEventListener":"removeEventListener",l=e;!n||typeof n=="string"||(t[c]("touchstart",s.onDocumentTouchStart,{passive:!1,capture:o}),n[c]("touchstart",s.onTouchStart,{passive:!1}),n[c]("pointerdown",s.onTouchStart,{passive:!1}),t[c]("touchmove",s.onTouchMove,{passive:!1,capture:o}),t[c]("pointermove",s.onTouchMove,{passive:!1,capture:o}),t[c]("touchend",s.onTouchEnd,{passive:!0}),t[c]("pointerup",s.onTouchEnd,{passive:!0}),t[c]("pointercancel",s.onTouchEnd,{passive:!0}),t[c]("touchcancel",s.onTouchEnd,{passive:!0}),t[c]("pointerout",s.onTouchEnd,{passive:!0}),t[c]("pointerleave",s.onTouchEnd,{passive:!0}),t[c]("contextmenu",s.onTouchEnd,{passive:!0}),(i.preventClicks||i.preventClicksPropagation)&&n[c]("click",s.onClick,!0),i.cssMode&&r[c]("scroll",s.onScroll),i.updateOnWindowResize?s[l](a.ios||a.android?"resize orientationchange observerUpdate":"resize observerUpdate",_l,!0):s[l]("observerUpdate",_l,!0),n[c]("load",s.onLoad,{capture:!0}))};function wu(){const s=this,{params:e}=s;s.onTouchStart=gu.bind(s),s.onTouchMove=vu.bind(s),s.onTouchEnd=Au.bind(s),s.onDocumentTouchStart=xu.bind(s),e.cssMode&&(s.onScroll=Su.bind(s)),s.onClick=_u.bind(s),s.onLoad=Eu.bind(s),Sl(s,"on")}function bu(){Sl(this,"off")}var yu={attachEvents:wu,detachEvents:bu};const El=(s,e)=>s.grid&&e.grid&&e.grid.rows>1;function Cu(){const s=this,{realIndex:e,initialized:t,params:i,el:n}=s,r=i.breakpoints;if(!r||r&&Object.keys(r).length===0)return;const a=Ot(),o=i.breakpointsBase==="window"||!i.breakpointsBase?i.breakpointsBase:"container",c=["window","container"].includes(i.breakpointsBase)||!i.breakpointsBase?s.el:a.querySelector(i.breakpointsBase),l=s.getBreakpoint(r,o,c);if(!l||s.currentBreakpoint===l)return;const h=(l in r?r[l]:void 0)||s.originalParams,u=El(s,i),p=El(s,h),g=s.params.grabCursor,v=h.grabCursor,m=i.enabled;u&&!p?(n.classList.remove(`${i.containerModifierClass}grid`,`${i.containerModifierClass}grid-column`),s.emitContainerClasses()):!u&&p&&(n.classList.add(`${i.containerModifierClass}grid`),(h.grid.fill&&h.grid.fill==="column"||!h.grid.fill&&i.grid.fill==="column")&&n.classList.add(`${i.containerModifierClass}grid-column`),s.emitContainerClasses()),g&&!v?s.unsetGrabCursor():!g&&v&&s.setGrabCursor(),["navigation","pagination","scrollbar"].forEach(y=>{if(typeof h[y]>"u")return;const U=i[y]&&i[y].enabled,I=h[y]&&h[y].enabled;U&&!I&&s[y].disable(),!U&&I&&s[y].enable()});const f=h.direction&&h.direction!==i.direction,A=i.loop&&(h.slidesPerView!==i.slidesPerView||f),_=i.loop;f&&t&&s.changeDirection(),Yt(s.params,h);const S=s.params.enabled,C=s.params.loop;Object.assign(s,{allowTouchMove:s.params.allowTouchMove,allowSlideNext:s.params.allowSlideNext,allowSlidePrev:s.params.allowSlidePrev}),m&&!S?s.disable():!m&&S&&s.enable(),s.currentBreakpoint=l,s.emit("_beforeBreakpoint",h),t&&(A?(s.loopDestroy(),s.loopCreate(e),s.updateSlides()):!_&&C?(s.loopCreate(e),s.updateSlides()):_&&!C&&s.loopDestroy()),s.emit("breakpoint",h)}function Uu(s,e,t){if(e===void 0&&(e="window"),!s||e==="container"&&!t)return;let i=!1;const n=Mt(),r=e==="window"?n.innerHeight:t.clientHeight,a=Object.keys(s).map(o=>{if(typeof o=="string"&&o.indexOf("@")===0){const c=parseFloat(o.substr(1));return{value:r*c,point:o}}return{value:o,point:o}});a.sort((o,c)=>parseInt(o.value,10)-parseInt(c.value,10));for(let o=0;o<a.length;o+=1){const{point:c,value:l}=a[o];e==="window"?n.matchMedia(`(min-width: ${l}px)`).matches&&(i=c):l<=t.clientWidth&&(i=c)}return i||"max"}var Mu={setBreakpoint:Cu,getBreakpoint:Uu};function Tu(s,e){const t=[];return s.forEach(i=>{typeof i=="object"?Object.keys(i).forEach(n=>{i[n]&&t.push(e+n)}):typeof i=="string"&&t.push(e+i)}),t}function Fu(){const s=this,{classNames:e,params:t,rtl:i,el:n,device:r}=s,a=Tu(["initialized",t.direction,{"free-mode":s.params.freeMode&&t.freeMode.enabled},{autoheight:t.autoHeight},{rtl:i},{grid:t.grid&&t.grid.rows>1},{"grid-column":t.grid&&t.grid.rows>1&&t.grid.fill==="column"},{android:r.android},{ios:r.ios},{"css-mode":t.cssMode},{centered:t.cssMode&&t.centeredSlides},{"watch-progress":t.watchSlidesProgress}],t.containerModifierClass);e.push(...a),n.classList.add(...e),s.emitContainerClasses()}function Iu(){const s=this,{el:e,classNames:t}=s;!e||typeof e=="string"||(e.classList.remove(...t),s.emitContainerClasses())}var Ru={addClasses:Fu,removeClasses:Iu};function Bu(){const s=this,{isLocked:e,params:t}=s,{slidesOffsetBefore:i}=t;if(i){const n=s.slides.length-1,r=s.slidesGrid[n]+s.slidesSizesGrid[n]+i*2;s.isLocked=s.size>r}else s.isLocked=s.snapGrid.length===1;t.allowSlideNext===!0&&(s.allowSlideNext=!s.isLocked),t.allowSlidePrev===!0&&(s.allowSlidePrev=!s.isLocked),e&&e!==s.isLocked&&(s.isEnd=!1),e!==s.isLocked&&s.emit(s.isLocked?"lock":"unlock")}var Du={checkOverflow:Bu},xl={init:!0,direction:"horizontal",oneWayMovement:!1,swiperElementNodeName:"SWIPER-CONTAINER",touchEventsTarget:"wrapper",initialSlide:0,speed:300,cssMode:!1,updateOnWindowResize:!0,resizeObserver:!0,nested:!1,createElements:!1,eventsPrefix:"swiper",enabled:!0,focusableElements:"input, select, option, textarea, button, video, label",width:null,height:null,preventInteractionOnTransition:!1,userAgent:null,url:null,edgeSwipeDetection:!1,edgeSwipeThreshold:20,autoHeight:!1,setWrapperSize:!1,virtualTranslate:!1,effect:"slide",breakpoints:void 0,breakpointsBase:"window",spaceBetween:0,slidesPerView:1,slidesPerGroup:1,slidesPerGroupSkip:0,slidesPerGroupAuto:!1,centeredSlides:!1,centeredSlidesBounds:!1,slidesOffsetBefore:0,slidesOffsetAfter:0,normalizeSlideIndex:!0,centerInsufficientSlides:!1,watchOverflow:!0,roundLengths:!1,touchRatio:1,touchAngle:45,simulateTouch:!0,shortSwipes:!0,longSwipes:!0,longSwipesRatio:.5,longSwipesMs:300,followFinger:!0,allowTouchMove:!0,threshold:5,touchMoveStopPropagation:!1,touchStartPreventDefault:!0,touchStartForcePreventDefault:!1,touchReleaseOnEdges:!1,uniqueNavElements:!0,resistance:!0,resistanceRatio:.85,watchSlidesProgress:!1,grabCursor:!1,preventClicks:!0,preventClicksPropagation:!0,slideToClickedSlide:!1,loop:!1,loopAddBlankSlides:!0,loopAdditionalSlides:0,loopPreventsSliding:!0,rewind:!1,allowSlidePrev:!0,allowSlideNext:!0,swipeHandler:null,noSwiping:!0,noSwipingClass:"swiper-no-swiping",noSwipingSelector:null,passiveListeners:!0,maxBackfaceHiddenSlides:10,containerModifierClass:"swiper-",slideClass:"swiper-slide",slideBlankClass:"swiper-slide-blank",slideActiveClass:"swiper-slide-active",slideVisibleClass:"swiper-slide-visible",slideFullyVisibleClass:"swiper-slide-fully-visible",slideNextClass:"swiper-slide-next",slidePrevClass:"swiper-slide-prev",wrapperClass:"swiper-wrapper",lazyPreloaderClass:"swiper-lazy-preloader",lazyPreloadPrevNext:0,runCallbacksOnInit:!0,_emitClasses:!1};function Qu(s,e){return function(i){i===void 0&&(i={});const n=Object.keys(i)[0],r=i[n];if(typeof r!="object"||r===null){Yt(e,i);return}if(s[n]===!0&&(s[n]={enabled:!0}),n==="navigation"&&s[n]&&s[n].enabled&&!s[n].prevEl&&!s[n].nextEl&&(s[n].auto=!0),["pagination","scrollbar"].indexOf(n)>=0&&s[n]&&s[n].enabled&&!s[n].el&&(s[n].auto=!0),!(n in s&&"enabled"in r)){Yt(e,i);return}typeof s[n]=="object"&&!("enabled"in s[n])&&(s[n].enabled=!0),s[n]||(s[n]={enabled:!1}),Yt(e,i)}}const aa={eventsEmitter:Rh,update:Wh,translate:Yh,transition:$h,slide:ou,loop:hu,grabCursor:pu,events:yu,breakpoints:Mu,checkOverflow:Du,classes:Ru},oa={};class Kt{constructor(){let e,t;for(var i=arguments.length,n=new Array(i),r=0;r<i;r++)n[r]=arguments[r];n.length===1&&n[0].constructor&&Object.prototype.toString.call(n[0]).slice(8,-1)==="Object"?t=n[0]:[e,t]=n,t||(t={}),t=Yt({},t),e&&!t.el&&(t.el=e);const a=Ot();if(t.el&&typeof t.el=="string"&&a.querySelectorAll(t.el).length>1){const d=[];return a.querySelectorAll(t.el).forEach(h=>{const u=Yt({},t,{el:h});d.push(new Kt(u))}),d}const o=this;o.__swiper__=!0,o.support=fl(),o.device=pl({userAgent:t.userAgent}),o.browser=ml(),o.eventsListeners={},o.eventsAnyListeners=[],o.modules=[...o.__modules__],t.modules&&Array.isArray(t.modules)&&o.modules.push(...t.modules);const c={};o.modules.forEach(d=>{d({params:t,swiper:o,extendParams:Qu(t,c),on:o.on.bind(o),once:o.once.bind(o),off:o.off.bind(o),emit:o.emit.bind(o)})});const l=Yt({},xl,c);return o.params=Yt({},l,oa,t),o.originalParams=Yt({},o.params),o.passedParams=Yt({},t),o.params&&o.params.on&&Object.keys(o.params.on).forEach(d=>{o.on(d,o.params.on[d])}),o.params&&o.params.onAny&&o.onAny(o.params.onAny),Object.assign(o,{enabled:o.params.enabled,el:e,classNames:[],slides:[],slidesGrid:[],snapGrid:[],slidesSizesGrid:[],isHorizontal(){return o.params.direction==="horizontal"},isVertical(){return o.params.direction==="vertical"},activeIndex:0,realIndex:0,isBeginning:!0,isEnd:!1,translate:0,previousTranslate:0,progress:0,velocity:0,animating:!1,cssOverflowAdjustment(){return Math.trunc(this.translate/2**23)*2**23},allowSlideNext:o.params.allowSlideNext,allowSlidePrev:o.params.allowSlidePrev,touchEventsData:{isTouched:void 0,isMoved:void 0,allowTouchCallbacks:void 0,touchStartTime:void 0,isScrolling:void 0,currentTranslate:void 0,startTranslate:void 0,allowThresholdMove:void 0,focusableElements:o.params.focusableElements,lastClickTime:0,clickTimeout:void 0,velocities:[],allowMomentumBounce:void 0,startMoving:void 0,pointerId:null,touchId:null},allowClick:!0,allowTouchMove:o.params.allowTouchMove,touches:{startX:0,startY:0,currentX:0,currentY:0,diff:0},imagesToLoad:[],imagesLoaded:0}),o.emit("_swiper"),o.params.init&&o.init(),o}getDirectionLabel(e){return this.isHorizontal()?e:{width:"height","margin-top":"margin-left","margin-bottom ":"margin-right","margin-left":"margin-top","margin-right":"margin-bottom","padding-left":"padding-top","padding-right":"padding-bottom",marginRight:"marginBottom"}[e]}getSlideIndex(e){const{slidesEl:t,params:i}=this,n=di(t,`.${i.slideClass}, swiper-slide`),r=Os(n[0]);return Os(e)-r}getSlideIndexByData(e){return this.getSlideIndex(this.slides.find(t=>t.getAttribute("data-swiper-slide-index")*1===e))}getSlideIndexWhenGrid(e){return this.grid&&this.params.grid&&this.params.grid.rows>1&&(this.params.grid.fill==="column"?e=Math.floor(e/this.params.grid.rows):this.params.grid.fill==="row"&&(e=e%Math.ceil(this.slides.length/this.params.grid.rows))),e}recalcSlides(){const e=this,{slidesEl:t,params:i}=e;e.slides=di(t,`.${i.slideClass}, swiper-slide`)}enable(){const e=this;e.enabled||(e.enabled=!0,e.params.grabCursor&&e.setGrabCursor(),e.emit("enable"))}disable(){const e=this;e.enabled&&(e.enabled=!1,e.params.grabCursor&&e.unsetGrabCursor(),e.emit("disable"))}setProgress(e,t){const i=this;e=Math.min(Math.max(e,0),1);const n=i.minTranslate(),a=(i.maxTranslate()-n)*e+n;i.translateTo(a,typeof t>"u"?0:t),i.updateActiveIndex(),i.updateSlidesClasses()}emitContainerClasses(){const e=this;if(!e.params._emitClasses||!e.el)return;const t=e.el.className.split(" ").filter(i=>i.indexOf("swiper")===0||i.indexOf(e.params.containerModifierClass)===0);e.emit("_containerClasses",t.join(" "))}getSlideClasses(e){const t=this;return t.destroyed?"":e.className.split(" ").filter(i=>i.indexOf("swiper-slide")===0||i.indexOf(t.params.slideClass)===0).join(" ")}emitSlidesClasses(){const e=this;if(!e.params._emitClasses||!e.el)return;const t=[];e.slides.forEach(i=>{const n=e.getSlideClasses(i);t.push({slideEl:i,classNames:n}),e.emit("_slideClass",i,n)}),e.emit("_slideClasses",t)}slidesPerViewDynamic(e,t){e===void 0&&(e="current"),t===void 0&&(t=!1);const i=this,{params:n,slides:r,slidesGrid:a,slidesSizesGrid:o,size:c,activeIndex:l}=i;let d=1;if(typeof n.slidesPerView=="number")return n.slidesPerView;if(n.centeredSlides){let h=r[l]?Math.ceil(r[l].swiperSlideSize):0,u;for(let p=l+1;p<r.length;p+=1)r[p]&&!u&&(h+=Math.ceil(r[p].swiperSlideSize),d+=1,h>c&&(u=!0));for(let p=l-1;p>=0;p-=1)r[p]&&!u&&(h+=r[p].swiperSlideSize,d+=1,h>c&&(u=!0))}else if(e==="current")for(let h=l+1;h<r.length;h+=1)(t?a[h]+o[h]-a[l]<c:a[h]-a[l]<c)&&(d+=1);else for(let h=l-1;h>=0;h-=1)a[l]-a[h]<c&&(d+=1);return d}update(){const e=this;if(!e||e.destroyed)return;const{snapGrid:t,params:i}=e;i.breakpoints&&e.setBreakpoint(),[...e.el.querySelectorAll('[loading="lazy"]')].forEach(a=>{a.complete&&Ws(e,a)}),e.updateSize(),e.updateSlides(),e.updateProgress(),e.updateSlidesClasses();function n(){const a=e.rtlTranslate?e.translate*-1:e.translate,o=Math.min(Math.max(a,e.maxTranslate()),e.minTranslate());e.setTranslate(o),e.updateActiveIndex(),e.updateSlidesClasses()}let r;if(i.freeMode&&i.freeMode.enabled&&!i.cssMode)n(),i.autoHeight&&e.updateAutoHeight();else{if((i.slidesPerView==="auto"||i.slidesPerView>1)&&e.isEnd&&!i.centeredSlides){const a=e.virtual&&i.virtual.enabled?e.virtual.slides:e.slides;r=e.slideTo(a.length-1,0,!1,!0)}else r=e.slideTo(e.activeIndex,0,!1,!0);r||n()}i.watchOverflow&&t!==e.snapGrid&&e.checkOverflow(),e.emit("update")}changeDirection(e,t){t===void 0&&(t=!0);const i=this,n=i.params.direction;return e||(e=n==="horizontal"?"vertical":"horizontal"),e===n||e!=="horizontal"&&e!=="vertical"||(i.el.classList.remove(`${i.params.containerModifierClass}${n}`),i.el.classList.add(`${i.params.containerModifierClass}${e}`),i.emitContainerClasses(),i.params.direction=e,i.slides.forEach(r=>{e==="vertical"?r.style.width="":r.style.height=""}),i.emit("changeDirection"),t&&i.update()),i}changeLanguageDirection(e){const t=this;t.rtl&&e==="rtl"||!t.rtl&&e==="ltr"||(t.rtl=e==="rtl",t.rtlTranslate=t.params.direction==="horizontal"&&t.rtl,t.rtl?(t.el.classList.add(`${t.params.containerModifierClass}rtl`),t.el.dir="rtl"):(t.el.classList.remove(`${t.params.containerModifierClass}rtl`),t.el.dir="ltr"),t.update())}mount(e){const t=this;if(t.mounted)return!0;let i=e||t.params.el;if(typeof i=="string"&&(i=document.querySelector(i)),!i)return!1;i.swiper=t,i.parentNode&&i.parentNode.host&&i.parentNode.host.nodeName===t.params.swiperElementNodeName.toUpperCase()&&(t.isElement=!0);const n=()=>`.${(t.params.wrapperClass||"").trim().split(" ").join(".")}`;let a=i&&i.shadowRoot&&i.shadowRoot.querySelector?i.shadowRoot.querySelector(n()):di(i,n())[0];return!a&&t.params.createElements&&(a=ms("div",t.params.wrapperClass),i.append(a),di(i,`.${t.params.slideClass}`).forEach(o=>{a.append(o)})),Object.assign(t,{el:i,wrapperEl:a,slidesEl:t.isElement&&!i.parentNode.host.slideSlots?i.parentNode.host:a,hostEl:t.isElement?i.parentNode.host:i,mounted:!0,rtl:i.dir.toLowerCase()==="rtl"||Gi(i,"direction")==="rtl",rtlTranslate:t.params.direction==="horizontal"&&(i.dir.toLowerCase()==="rtl"||Gi(i,"direction")==="rtl"),wrongRTL:Gi(a,"display")==="-webkit-box"}),!0}init(e){const t=this;if(t.initialized||t.mount(e)===!1)return t;t.emit("beforeInit"),t.params.breakpoints&&t.setBreakpoint(),t.addClasses(),t.updateSize(),t.updateSlides(),t.params.watchOverflow&&t.checkOverflow(),t.params.grabCursor&&t.enabled&&t.setGrabCursor(),t.params.loop&&t.virtual&&t.params.virtual.enabled?t.slideTo(t.params.initialSlide+t.virtual.slidesBefore,0,t.params.runCallbacksOnInit,!1,!0):t.slideTo(t.params.initialSlide,0,t.params.runCallbacksOnInit,!1,!0),t.params.loop&&t.loopCreate(void 0,!0),t.attachEvents();const n=[...t.el.querySelectorAll('[loading="lazy"]')];return t.isElement&&n.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),n.forEach(r=>{r.complete?Ws(t,r):r.addEventListener("load",a=>{Ws(t,a.target)})}),ra(t),t.initialized=!0,ra(t),t.emit("init"),t.emit("afterInit"),t}destroy(e,t){e===void 0&&(e=!0),t===void 0&&(t=!0);const i=this,{params:n,el:r,wrapperEl:a,slides:o}=i;return typeof i.params>"u"||i.destroyed||(i.emit("beforeDestroy"),i.initialized=!1,i.detachEvents(),n.loop&&i.loopDestroy(),t&&(i.removeClasses(),r&&typeof r!="string"&&r.removeAttribute("style"),a&&a.removeAttribute("style"),o&&o.length&&o.forEach(c=>{c.classList.remove(n.slideVisibleClass,n.slideFullyVisibleClass,n.slideActiveClass,n.slideNextClass,n.slidePrevClass),c.removeAttribute("style"),c.removeAttribute("data-swiper-slide-index")})),i.emit("destroy"),Object.keys(i.eventsListeners).forEach(c=>{i.off(c)}),e!==!1&&(i.el&&typeof i.el!="string"&&(i.el.swiper=null),_h(i)),i.destroyed=!0),null}static extendDefaults(e){Yt(oa,e)}static get extendedDefaults(){return oa}static get defaults(){return xl}static installModule(e){Kt.prototype.__modules__||(Kt.prototype.__modules__=[]);const t=Kt.prototype.__modules__;typeof e=="function"&&t.indexOf(e)<0&&t.push(e)}static use(e){return Array.isArray(e)?(e.forEach(t=>Kt.installModule(t)),Kt):(Kt.installModule(e),Kt)}}Object.keys(aa).forEach(s=>{Object.keys(aa[s]).forEach(e=>{Kt.prototype[e]=aa[s][e]})}),Kt.use([Fh,Ih]);function Nu(s){let{swiper:e,extendParams:t,on:i,emit:n}=s;const r=Ot(),a=Mt();e.keyboard={enabled:!1},t({keyboard:{enabled:!1,onlyInViewport:!0,pageUpDown:!0}});function o(d){if(!e.enabled)return;const{rtlTranslate:h}=e;let u=d;u.originalEvent&&(u=u.originalEvent);const p=u.keyCode||u.charCode,g=e.params.keyboard.pageUpDown,v=g&&p===33,m=g&&p===34,f=p===37,A=p===39,_=p===38,S=p===40;if(!e.allowSlideNext&&(e.isHorizontal()&&A||e.isVertical()&&S||m)||!e.allowSlidePrev&&(e.isHorizontal()&&f||e.isVertical()&&_||v))return!1;if(!(u.shiftKey||u.altKey||u.ctrlKey||u.metaKey)&&!(r.activeElement&&(r.activeElement.isContentEditable||r.activeElement.nodeName&&(r.activeElement.nodeName.toLowerCase()==="input"||r.activeElement.nodeName.toLowerCase()==="textarea")))){if(e.params.keyboard.onlyInViewport&&(v||m||f||A||_||S)){let C=!1;if(zs(e.el,`.${e.params.slideClass}, swiper-slide`).length>0&&zs(e.el,`.${e.params.slideActiveClass}`).length===0)return;const y=e.el,U=y.clientWidth,I=y.clientHeight,x=a.innerWidth,E=a.innerHeight,M=hl(y);h&&(M.left-=y.scrollLeft);const R=[[M.left,M.top],[M.left+U,M.top],[M.left,M.top+I],[M.left+U,M.top+I]];for(let F=0;F<R.length;F+=1){const B=R[F];if(B[0]>=0&&B[0]<=x&&B[1]>=0&&B[1]<=E){if(B[0]===0&&B[1]===0)continue;C=!0}}if(!C)return}e.isHorizontal()?((v||m||f||A)&&(u.preventDefault?u.preventDefault():u.returnValue=!1),((m||A)&&!h||(v||f)&&h)&&e.slideNext(),((v||f)&&!h||(m||A)&&h)&&e.slidePrev()):((v||m||_||S)&&(u.preventDefault?u.preventDefault():u.returnValue=!1),(m||S)&&e.slideNext(),(v||_)&&e.slidePrev()),n("keyPress",p)}}function c(){e.keyboard.enabled||(r.addEventListener("keydown",o),e.keyboard.enabled=!0)}function l(){e.keyboard.enabled&&(r.removeEventListener("keydown",o),e.keyboard.enabled=!1)}i("init",()=>{e.params.keyboard.enabled&&c()}),i("destroy",()=>{e.keyboard.enabled&&l()}),Object.assign(e.keyboard,{enable:c,disable:l})}function la(s,e,t,i){return s.params.createElements&&Object.keys(i).forEach(n=>{if(!t[n]&&t.auto===!0){let r=di(s.el,`.${i[n]}`)[0];r||(r=ms("div",i[n]),r.className=i[n],s.el.append(r)),t[n]=r,e[n]=r}}),t}function Lu(s){let{swiper:e,extendParams:t,on:i,emit:n}=s;t({navigation:{nextEl:null,prevEl:null,hideOnClick:!1,disabledClass:"swiper-button-disabled",hiddenClass:"swiper-button-hidden",lockClass:"swiper-button-lock",navigationDisabledClass:"swiper-navigation-disabled"}}),e.navigation={nextEl:null,prevEl:null};function r(g){let v;return g&&typeof g=="string"&&e.isElement&&(v=e.el.querySelector(g)||e.hostEl.querySelector(g),v)?v:(g&&(typeof g=="string"&&(v=[...document.querySelectorAll(g)]),e.params.uniqueNavElements&&typeof g=="string"&&v&&v.length>1&&e.el.querySelectorAll(g).length===1?v=e.el.querySelector(g):v&&v.length===1&&(v=v[0])),g&&!v?g:v)}function a(g,v){const m=e.params.navigation;g=xt(g),g.forEach(f=>{f&&(f.classList[v?"add":"remove"](...m.disabledClass.split(" ")),f.tagName==="BUTTON"&&(f.disabled=v),e.params.watchOverflow&&e.enabled&&f.classList[e.isLocked?"add":"remove"](m.lockClass))})}function o(){const{nextEl:g,prevEl:v}=e.navigation;if(e.params.loop){a(v,!1),a(g,!1);return}a(v,e.isBeginning&&!e.params.rewind),a(g,e.isEnd&&!e.params.rewind)}function c(g){g.preventDefault(),!(e.isBeginning&&!e.params.loop&&!e.params.rewind)&&(e.slidePrev(),n("navigationPrev"))}function l(g){g.preventDefault(),!(e.isEnd&&!e.params.loop&&!e.params.rewind)&&(e.slideNext(),n("navigationNext"))}function d(){const g=e.params.navigation;if(e.params.navigation=la(e,e.originalParams.navigation,e.params.navigation,{nextEl:"swiper-button-next",prevEl:"swiper-button-prev"}),!(g.nextEl||g.prevEl))return;let v=r(g.nextEl),m=r(g.prevEl);Object.assign(e.navigation,{nextEl:v,prevEl:m}),v=xt(v),m=xt(m);const f=(A,_)=>{A&&A.addEventListener("click",_==="next"?l:c),!e.enabled&&A&&A.classList.add(...g.lockClass.split(" "))};v.forEach(A=>f(A,"next")),m.forEach(A=>f(A,"prev"))}function h(){let{nextEl:g,prevEl:v}=e.navigation;g=xt(g),v=xt(v);const m=(f,A)=>{f.removeEventListener("click",A==="next"?l:c),f.classList.remove(...e.params.navigation.disabledClass.split(" "))};g.forEach(f=>m(f,"next")),v.forEach(f=>m(f,"prev"))}i("init",()=>{e.params.navigation.enabled===!1?p():(d(),o())}),i("toEdge fromEdge lock unlock",()=>{o()}),i("destroy",()=>{h()}),i("enable disable",()=>{let{nextEl:g,prevEl:v}=e.navigation;if(g=xt(g),v=xt(v),e.enabled){o();return}[...g,...v].filter(m=>!!m).forEach(m=>m.classList.add(e.params.navigation.lockClass))}),i("click",(g,v)=>{let{nextEl:m,prevEl:f}=e.navigation;m=xt(m),f=xt(f);const A=v.target;let _=f.includes(A)||m.includes(A);if(e.isElement&&!_){const S=v.path||v.composedPath&&v.composedPath();S&&(_=S.find(C=>m.includes(C)||f.includes(C)))}if(e.params.navigation.hideOnClick&&!_){if(e.pagination&&e.params.pagination&&e.params.pagination.clickable&&(e.pagination.el===A||e.pagination.el.contains(A)))return;let S;m.length?S=m[0].classList.contains(e.params.navigation.hiddenClass):f.length&&(S=f[0].classList.contains(e.params.navigation.hiddenClass)),n(S===!0?"navigationShow":"navigationHide"),[...m,...f].filter(C=>!!C).forEach(C=>C.classList.toggle(e.params.navigation.hiddenClass))}});const u=()=>{e.el.classList.remove(...e.params.navigation.navigationDisabledClass.split(" ")),d(),o()},p=()=>{e.el.classList.add(...e.params.navigation.navigationDisabledClass.split(" ")),h()};Object.assign(e.navigation,{enable:u,disable:p,update:o,init:d,destroy:h})}function Cn(s){return s===void 0&&(s=""),`.${s.trim().replace(/([\.:!+\/()[\]])/g,"\\$1").replace(/ /g,".")}`}function Pu(s){let{swiper:e,extendParams:t,on:i,emit:n}=s;const r="swiper-pagination";t({pagination:{el:null,bulletElement:"span",clickable:!1,hideOnClick:!1,renderBullet:null,renderProgressbar:null,renderFraction:null,renderCustom:null,progressbarOpposite:!1,type:"bullets",dynamicBullets:!1,dynamicMainBullets:1,formatFractionCurrent:A=>A,formatFractionTotal:A=>A,bulletClass:`${r}-bullet`,bulletActiveClass:`${r}-bullet-active`,modifierClass:`${r}-`,currentClass:`${r}-current`,totalClass:`${r}-total`,hiddenClass:`${r}-hidden`,progressbarFillClass:`${r}-progressbar-fill`,progressbarOppositeClass:`${r}-progressbar-opposite`,clickableClass:`${r}-clickable`,lockClass:`${r}-lock`,horizontalClass:`${r}-horizontal`,verticalClass:`${r}-vertical`,paginationDisabledClass:`${r}-disabled`}}),e.pagination={el:null,bullets:[]};let a,o=0;function c(){return!e.params.pagination.el||!e.pagination.el||Array.isArray(e.pagination.el)&&e.pagination.el.length===0}function l(A,_){const{bulletActiveClass:S}=e.params.pagination;A&&(A=A[`${_==="prev"?"previous":"next"}ElementSibling`],A&&(A.classList.add(`${S}-${_}`),A=A[`${_==="prev"?"previous":"next"}ElementSibling`],A&&A.classList.add(`${S}-${_}-${_}`)))}function d(A,_,S){if(A=A%S,_=_%S,_===A+1)return"next";if(_===A-1)return"previous"}function h(A){const _=A.target.closest(Cn(e.params.pagination.bulletClass));if(!_)return;A.preventDefault();const S=Os(_)*e.params.slidesPerGroup;if(e.params.loop){if(e.realIndex===S)return;const C=d(e.realIndex,S,e.slides.length);C==="next"?e.slideNext():C==="previous"?e.slidePrev():e.slideToLoop(S)}else e.slideTo(S)}function u(){const A=e.rtl,_=e.params.pagination;if(c())return;let S=e.pagination.el;S=xt(S);let C,y;const U=e.virtual&&e.params.virtual.enabled?e.virtual.slides.length:e.slides.length,I=e.params.loop?Math.ceil(U/e.params.slidesPerGroup):e.snapGrid.length;if(e.params.loop?(y=e.previousRealIndex||0,C=e.params.slidesPerGroup>1?Math.floor(e.realIndex/e.params.slidesPerGroup):e.realIndex):typeof e.snapIndex<"u"?(C=e.snapIndex,y=e.previousSnapIndex):(y=e.previousIndex||0,C=e.activeIndex||0),_.type==="bullets"&&e.pagination.bullets&&e.pagination.bullets.length>0){const x=e.pagination.bullets;let E,M,R;if(_.dynamicBullets&&(a=$r(x[0],e.isHorizontal()?"width":"height"),S.forEach(F=>{F.style[e.isHorizontal()?"width":"height"]=`${a*(_.dynamicMainBullets+4)}px`}),_.dynamicMainBullets>1&&y!==void 0&&(o+=C-(y||0),o>_.dynamicMainBullets-1?o=_.dynamicMainBullets-1:o<0&&(o=0)),E=Math.max(C-o,0),M=E+(Math.min(x.length,_.dynamicMainBullets)-1),R=(M+E)/2),x.forEach(F=>{const B=[...["","-next","-next-next","-prev","-prev-prev","-main"].map(z=>`${_.bulletActiveClass}${z}`)].map(z=>typeof z=="string"&&z.includes(" ")?z.split(" "):z).flat();F.classList.remove(...B)}),S.length>1)x.forEach(F=>{const B=Os(F);B===C?F.classList.add(..._.bulletActiveClass.split(" ")):e.isElement&&F.setAttribute("part","bullet"),_.dynamicBullets&&(B>=E&&B<=M&&F.classList.add(...`${_.bulletActiveClass}-main`.split(" ")),B===E&&l(F,"prev"),B===M&&l(F,"next"))});else{const F=x[C];if(F&&F.classList.add(..._.bulletActiveClass.split(" ")),e.isElement&&x.forEach((B,z)=>{B.setAttribute("part",z===C?"bullet-active":"bullet")}),_.dynamicBullets){const B=x[E],z=x[M];for(let Q=E;Q<=M;Q+=1)x[Q]&&x[Q].classList.add(...`${_.bulletActiveClass}-main`.split(" "));l(B,"prev"),l(z,"next")}}if(_.dynamicBullets){const F=Math.min(x.length,_.dynamicMainBullets+4),B=(a*F-a)/2-R*a,z=A?"right":"left";x.forEach(Q=>{Q.style[e.isHorizontal()?z:"top"]=`${B}px`})}}S.forEach((x,E)=>{if(_.type==="fraction"&&(x.querySelectorAll(Cn(_.currentClass)).forEach(M=>{M.textContent=_.formatFractionCurrent(C+1)}),x.querySelectorAll(Cn(_.totalClass)).forEach(M=>{M.textContent=_.formatFractionTotal(I)})),_.type==="progressbar"){let M;_.progressbarOpposite?M=e.isHorizontal()?"vertical":"horizontal":M=e.isHorizontal()?"horizontal":"vertical";const R=(C+1)/I;let F=1,B=1;M==="horizontal"?F=R:B=R,x.querySelectorAll(Cn(_.progressbarFillClass)).forEach(z=>{z.style.transform=`translate3d(0,0,0) scaleX(${F}) scaleY(${B})`,z.style.transitionDuration=`${e.params.speed}ms`})}_.type==="custom"&&_.renderCustom?(ul(x,_.renderCustom(e,C+1,I)),E===0&&n("paginationRender",x)):(E===0&&n("paginationRender",x),n("paginationUpdate",x)),e.params.watchOverflow&&e.enabled&&x.classList[e.isLocked?"add":"remove"](_.lockClass)})}function p(){const A=e.params.pagination;if(c())return;const _=e.virtual&&e.params.virtual.enabled?e.virtual.slides.length:e.grid&&e.params.grid.rows>1?e.slides.length/Math.ceil(e.params.grid.rows):e.slides.length;let S=e.pagination.el;S=xt(S);let C="";if(A.type==="bullets"){let y=e.params.loop?Math.ceil(_/e.params.slidesPerGroup):e.snapGrid.length;e.params.freeMode&&e.params.freeMode.enabled&&y>_&&(y=_);for(let U=0;U<y;U+=1)A.renderBullet?C+=A.renderBullet.call(e,U,A.bulletClass):C+=`<${A.bulletElement} ${e.isElement?'part="bullet"':""} class="${A.bulletClass}"></${A.bulletElement}>`}A.type==="fraction"&&(A.renderFraction?C=A.renderFraction.call(e,A.currentClass,A.totalClass):C=`<span class="${A.currentClass}"></span> / <span class="${A.totalClass}"></span>`),A.type==="progressbar"&&(A.renderProgressbar?C=A.renderProgressbar.call(e,A.progressbarFillClass):C=`<span class="${A.progressbarFillClass}"></span>`),e.pagination.bullets=[],S.forEach(y=>{A.type!=="custom"&&ul(y,C||""),A.type==="bullets"&&e.pagination.bullets.push(...y.querySelectorAll(Cn(A.bulletClass)))}),A.type!=="custom"&&n("paginationRender",S[0])}function g(){e.params.pagination=la(e,e.originalParams.pagination,e.params.pagination,{el:"swiper-pagination"});const A=e.params.pagination;if(!A.el)return;let _;typeof A.el=="string"&&e.isElement&&(_=e.el.querySelector(A.el)),!_&&typeof A.el=="string"&&(_=[...document.querySelectorAll(A.el)]),_||(_=A.el),!(!_||_.length===0)&&(e.params.uniqueNavElements&&typeof A.el=="string"&&Array.isArray(_)&&_.length>1&&(_=[...e.el.querySelectorAll(A.el)],_.length>1&&(_=_.find(S=>zs(S,".swiper")[0]===e.el))),Array.isArray(_)&&_.length===1&&(_=_[0]),Object.assign(e.pagination,{el:_}),_=xt(_),_.forEach(S=>{A.type==="bullets"&&A.clickable&&S.classList.add(...(A.clickableClass||"").split(" ")),S.classList.add(A.modifierClass+A.type),S.classList.add(e.isHorizontal()?A.horizontalClass:A.verticalClass),A.type==="bullets"&&A.dynamicBullets&&(S.classList.add(`${A.modifierClass}${A.type}-dynamic`),o=0,A.dynamicMainBullets<1&&(A.dynamicMainBullets=1)),A.type==="progressbar"&&A.progressbarOpposite&&S.classList.add(A.progressbarOppositeClass),A.clickable&&S.addEventListener("click",h),e.enabled||S.classList.add(A.lockClass)}))}function v(){const A=e.params.pagination;if(c())return;let _=e.pagination.el;_&&(_=xt(_),_.forEach(S=>{S.classList.remove(A.hiddenClass),S.classList.remove(A.modifierClass+A.type),S.classList.remove(e.isHorizontal()?A.horizontalClass:A.verticalClass),A.clickable&&(S.classList.remove(...(A.clickableClass||"").split(" ")),S.removeEventListener("click",h))})),e.pagination.bullets&&e.pagination.bullets.forEach(S=>S.classList.remove(...A.bulletActiveClass.split(" ")))}i("changeDirection",()=>{if(!e.pagination||!e.pagination.el)return;const A=e.params.pagination;let{el:_}=e.pagination;_=xt(_),_.forEach(S=>{S.classList.remove(A.horizontalClass,A.verticalClass),S.classList.add(e.isHorizontal()?A.horizontalClass:A.verticalClass)})}),i("init",()=>{e.params.pagination.enabled===!1?f():(g(),p(),u())}),i("activeIndexChange",()=>{typeof e.snapIndex>"u"&&u()}),i("snapIndexChange",()=>{u()}),i("snapGridLengthChange",()=>{p(),u()}),i("destroy",()=>{v()}),i("enable disable",()=>{let{el:A}=e.pagination;A&&(A=xt(A),A.forEach(_=>_.classList[e.enabled?"remove":"add"](e.params.pagination.lockClass)))}),i("lock unlock",()=>{u()}),i("click",(A,_)=>{const S=_.target,C=xt(e.pagination.el);if(e.params.pagination.el&&e.params.pagination.hideOnClick&&C&&C.length>0&&!S.classList.contains(e.params.pagination.bulletClass)){if(e.navigation&&(e.navigation.nextEl&&S===e.navigation.nextEl||e.navigation.prevEl&&S===e.navigation.prevEl))return;const y=C[0].classList.contains(e.params.pagination.hiddenClass);n(y===!0?"paginationShow":"paginationHide"),C.forEach(U=>U.classList.toggle(e.params.pagination.hiddenClass))}});const m=()=>{e.el.classList.remove(e.params.pagination.paginationDisabledClass);let{el:A}=e.pagination;A&&(A=xt(A),A.forEach(_=>_.classList.remove(e.params.pagination.paginationDisabledClass))),g(),p(),u()},f=()=>{e.el.classList.add(e.params.pagination.paginationDisabledClass);let{el:A}=e.pagination;A&&(A=xt(A),A.forEach(_=>_.classList.add(e.params.pagination.paginationDisabledClass))),v()};Object.assign(e.pagination,{enable:m,disable:f,render:p,update:u,init:g,destroy:v})}function Vu(s){let{swiper:e,extendParams:t,on:i,emit:n}=s;const r=Ot();let a=!1,o=null,c=null,l,d,h,u;t({scrollbar:{el:null,dragSize:"auto",hide:!1,draggable:!1,snapOnRelease:!0,lockClass:"swiper-scrollbar-lock",dragClass:"swiper-scrollbar-drag",scrollbarDisabledClass:"swiper-scrollbar-disabled",horizontalClass:"swiper-scrollbar-horizontal",verticalClass:"swiper-scrollbar-vertical"}}),e.scrollbar={el:null,dragEl:null};function p(){if(!e.params.scrollbar.el||!e.scrollbar.el)return;const{scrollbar:R,rtlTranslate:F}=e,{dragEl:B,el:z}=R,Q=e.params.scrollbar,N=e.params.loop?e.progressLoop:e.progress;let D=d,Z=(h-d)*N;F?(Z=-Z,Z>0?(D=d-Z,Z=0):-Z+d>h&&(D=h+Z)):Z<0?(D=d+Z,Z=0):Z+d>h&&(D=h-Z),e.isHorizontal()?(B.style.transform=`translate3d(${Z}px, 0, 0)`,B.style.width=`${D}px`):(B.style.transform=`translate3d(0px, ${Z}px, 0)`,B.style.height=`${D}px`),Q.hide&&(clearTimeout(o),z.style.opacity=1,o=setTimeout(()=>{z.style.opacity=0,z.style.transitionDuration="400ms"},1e3))}function g(R){!e.params.scrollbar.el||!e.scrollbar.el||(e.scrollbar.dragEl.style.transitionDuration=`${R}ms`)}function v(){if(!e.params.scrollbar.el||!e.scrollbar.el)return;const{scrollbar:R}=e,{dragEl:F,el:B}=R;F.style.width="",F.style.height="",h=e.isHorizontal()?B.offsetWidth:B.offsetHeight,u=e.size/(e.virtualSize+e.params.slidesOffsetBefore-(e.params.centeredSlides?e.snapGrid[0]:0)),e.params.scrollbar.dragSize==="auto"?d=h*u:d=parseInt(e.params.scrollbar.dragSize,10),e.isHorizontal()?F.style.width=`${d}px`:F.style.height=`${d}px`,u>=1?B.style.display="none":B.style.display="",e.params.scrollbar.hide&&(B.style.opacity=0),e.params.watchOverflow&&e.enabled&&R.el.classList[e.isLocked?"add":"remove"](e.params.scrollbar.lockClass)}function m(R){return e.isHorizontal()?R.clientX:R.clientY}function f(R){const{scrollbar:F,rtlTranslate:B}=e,{el:z}=F;let Q;Q=(m(R)-hl(z)[e.isHorizontal()?"left":"top"]-(l!==null?l:d/2))/(h-d),Q=Math.max(Math.min(Q,1),0),B&&(Q=1-Q);const N=e.minTranslate()+(e.maxTranslate()-e.minTranslate())*Q;e.updateProgress(N),e.setTranslate(N),e.updateActiveIndex(),e.updateSlidesClasses()}function A(R){const F=e.params.scrollbar,{scrollbar:B,wrapperEl:z}=e,{el:Q,dragEl:N}=B;a=!0,l=R.target===N?m(R)-R.target.getBoundingClientRect()[e.isHorizontal()?"left":"top"]:null,R.preventDefault(),R.stopPropagation(),z.style.transitionDuration="100ms",N.style.transitionDuration="100ms",f(R),clearTimeout(c),Q.style.transitionDuration="0ms",F.hide&&(Q.style.opacity=1),e.params.cssMode&&(e.wrapperEl.style["scroll-snap-type"]="none"),n("scrollbarDragStart",R)}function _(R){const{scrollbar:F,wrapperEl:B}=e,{el:z,dragEl:Q}=F;a&&(R.preventDefault&&R.cancelable?R.preventDefault():R.returnValue=!1,f(R),B.style.transitionDuration="0ms",z.style.transitionDuration="0ms",Q.style.transitionDuration="0ms",n("scrollbarDragMove",R))}function S(R){const F=e.params.scrollbar,{scrollbar:B,wrapperEl:z}=e,{el:Q}=B;a&&(a=!1,e.params.cssMode&&(e.wrapperEl.style["scroll-snap-type"]="",z.style.transitionDuration=""),F.hide&&(clearTimeout(c),c=qr(()=>{Q.style.opacity=0,Q.style.transitionDuration="400ms"},1e3)),n("scrollbarDragEnd",R),F.snapOnRelease&&e.slideToClosest())}function C(R){const{scrollbar:F,params:B}=e,z=F.el;if(!z)return;const Q=z,N=B.passiveListeners?{passive:!1,capture:!1}:!1,D=B.passiveListeners?{passive:!0,capture:!1}:!1;if(!Q)return;const Z=R==="on"?"addEventListener":"removeEventListener";Q[Z]("pointerdown",A,N),r[Z]("pointermove",_,N),r[Z]("pointerup",S,D)}function y(){!e.params.scrollbar.el||!e.scrollbar.el||C("on")}function U(){!e.params.scrollbar.el||!e.scrollbar.el||C("off")}function I(){const{scrollbar:R,el:F}=e;e.params.scrollbar=la(e,e.originalParams.scrollbar,e.params.scrollbar,{el:"swiper-scrollbar"});const B=e.params.scrollbar;if(!B.el)return;let z;if(typeof B.el=="string"&&e.isElement&&(z=e.el.querySelector(B.el)),!z&&typeof B.el=="string"){if(z=r.querySelectorAll(B.el),!z.length)return}else z||(z=B.el);e.params.uniqueNavElements&&typeof B.el=="string"&&z.length>1&&F.querySelectorAll(B.el).length===1&&(z=F.querySelector(B.el)),z.length>0&&(z=z[0]),z.classList.add(e.isHorizontal()?B.horizontalClass:B.verticalClass);let Q;z&&(Q=z.querySelector(Cn(e.params.scrollbar.dragClass)),Q||(Q=ms("div",e.params.scrollbar.dragClass),z.append(Q))),Object.assign(R,{el:z,dragEl:Q}),B.draggable&&y(),z&&z.classList[e.enabled?"remove":"add"](...Wi(e.params.scrollbar.lockClass))}function x(){const R=e.params.scrollbar,F=e.scrollbar.el;F&&F.classList.remove(...Wi(e.isHorizontal()?R.horizontalClass:R.verticalClass)),U()}i("changeDirection",()=>{if(!e.scrollbar||!e.scrollbar.el)return;const R=e.params.scrollbar;let{el:F}=e.scrollbar;F=xt(F),F.forEach(B=>{B.classList.remove(R.horizontalClass,R.verticalClass),B.classList.add(e.isHorizontal()?R.horizontalClass:R.verticalClass)})}),i("init",()=>{e.params.scrollbar.enabled===!1?M():(I(),v(),p())}),i("update resize observerUpdate lock unlock changeDirection",()=>{v()}),i("setTranslate",()=>{p()}),i("setTransition",(R,F)=>{g(F)}),i("enable disable",()=>{const{el:R}=e.scrollbar;R&&R.classList[e.enabled?"remove":"add"](...Wi(e.params.scrollbar.lockClass))}),i("destroy",()=>{x()});const E=()=>{e.el.classList.remove(...Wi(e.params.scrollbar.scrollbarDisabledClass)),e.scrollbar.el&&e.scrollbar.el.classList.remove(...Wi(e.params.scrollbar.scrollbarDisabledClass)),I(),v(),p()},M=()=>{e.el.classList.add(...Wi(e.params.scrollbar.scrollbarDisabledClass)),e.scrollbar.el&&e.scrollbar.el.classList.add(...Wi(e.params.scrollbar.scrollbarDisabledClass)),x()};Object.assign(e.scrollbar,{enable:E,disable:M,updateSize:v,setTranslate:p,init:I,destroy:x})}function ku(s){let{swiper:e,extendParams:t,on:i,emit:n,params:r}=s;e.autoplay={running:!1,paused:!1,timeLeft:0},t({autoplay:{enabled:!1,delay:3e3,waitForTransition:!0,disableOnInteraction:!1,stopOnLastSlide:!1,reverseDirection:!1,pauseOnMouseEnter:!1}});let a,o,c=r&&r.autoplay?r.autoplay.delay:3e3,l=r&&r.autoplay?r.autoplay.delay:3e3,d,h=new Date().getTime(),u,p,g,v,m,f,A;function _(D){!e||e.destroyed||!e.wrapperEl||D.target===e.wrapperEl&&(e.wrapperEl.removeEventListener("transitionend",_),!(A||D.detail&&D.detail.bySwiperTouchMove)&&E())}const S=()=>{if(e.destroyed||!e.autoplay.running)return;e.autoplay.paused?u=!0:u&&(l=d,u=!1);const D=e.autoplay.paused?d:h+l-new Date().getTime();e.autoplay.timeLeft=D,n("autoplayTimeLeft",D,D/c),o=requestAnimationFrame(()=>{S()})},C=()=>{let D;return e.virtual&&e.params.virtual.enabled?D=e.slides.find($=>$.classList.contains("swiper-slide-active")):D=e.slides[e.activeIndex],D?parseInt(D.getAttribute("data-swiper-autoplay"),10):void 0},y=D=>{if(e.destroyed||!e.autoplay.running)return;cancelAnimationFrame(o),S();let Z=typeof D>"u"?e.params.autoplay.delay:D;c=e.params.autoplay.delay,l=e.params.autoplay.delay;const $=C();!Number.isNaN($)&&$>0&&typeof D>"u"&&(Z=$,c=$,l=$),d=Z;const ae=e.params.speed,be=()=>{!e||e.destroyed||(e.params.autoplay.reverseDirection?!e.isBeginning||e.params.loop||e.params.rewind?(e.slidePrev(ae,!0,!0),n("autoplay")):e.params.autoplay.stopOnLastSlide||(e.slideTo(e.slides.length-1,ae,!0,!0),n("autoplay")):!e.isEnd||e.params.loop||e.params.rewind?(e.slideNext(ae,!0,!0),n("autoplay")):e.params.autoplay.stopOnLastSlide||(e.slideTo(0,ae,!0,!0),n("autoplay")),e.params.cssMode&&(h=new Date().getTime(),requestAnimationFrame(()=>{y()})))};return Z>0?(clearTimeout(a),a=setTimeout(()=>{be()},Z)):requestAnimationFrame(()=>{be()}),Z},U=()=>{h=new Date().getTime(),e.autoplay.running=!0,y(),n("autoplayStart")},I=()=>{e.autoplay.running=!1,clearTimeout(a),cancelAnimationFrame(o),n("autoplayStop")},x=(D,Z)=>{if(e.destroyed||!e.autoplay.running)return;clearTimeout(a),D||(f=!0);const $=()=>{n("autoplayPause"),e.params.autoplay.waitForTransition?e.wrapperEl.addEventListener("transitionend",_):E()};if(e.autoplay.paused=!0,Z){m&&(d=e.params.autoplay.delay),m=!1,$();return}d=(d||e.params.autoplay.delay)-(new Date().getTime()-h),!(e.isEnd&&d<0&&!e.params.loop)&&(d<0&&(d=0),$())},E=()=>{e.isEnd&&d<0&&!e.params.loop||e.destroyed||!e.autoplay.running||(h=new Date().getTime(),f?(f=!1,y(d)):y(),e.autoplay.paused=!1,n("autoplayResume"))},M=()=>{if(e.destroyed||!e.autoplay.running)return;const D=Ot();D.visibilityState==="hidden"&&(f=!0,x(!0)),D.visibilityState==="visible"&&E()},R=D=>{D.pointerType==="mouse"&&(f=!0,A=!0,!(e.animating||e.autoplay.paused)&&x(!0))},F=D=>{D.pointerType==="mouse"&&(A=!1,e.autoplay.paused&&E())},B=()=>{e.params.autoplay.pauseOnMouseEnter&&(e.el.addEventListener("pointerenter",R),e.el.addEventListener("pointerleave",F))},z=()=>{e.el&&typeof e.el!="string"&&(e.el.removeEventListener("pointerenter",R),e.el.removeEventListener("pointerleave",F))},Q=()=>{Ot().addEventListener("visibilitychange",M)},N=()=>{Ot().removeEventListener("visibilitychange",M)};i("init",()=>{e.params.autoplay.enabled&&(B(),Q(),U())}),i("destroy",()=>{z(),N(),e.autoplay.running&&I()}),i("_freeModeStaticRelease",()=>{(g||f)&&E()}),i("_freeModeNoMomentumRelease",()=>{e.params.autoplay.disableOnInteraction?I():x(!0,!0)}),i("beforeTransitionStart",(D,Z,$)=>{e.destroyed||!e.autoplay.running||($||!e.params.autoplay.disableOnInteraction?x(!0,!0):I())}),i("sliderFirstMove",()=>{if(!(e.destroyed||!e.autoplay.running)){if(e.params.autoplay.disableOnInteraction){I();return}p=!0,g=!1,f=!1,v=setTimeout(()=>{f=!0,g=!0,x(!0)},200)}}),i("touchEnd",()=>{if(!(e.destroyed||!e.autoplay.running||!p)){if(clearTimeout(v),clearTimeout(a),e.params.autoplay.disableOnInteraction){g=!1,p=!1;return}g&&e.params.cssMode&&E(),g=!1,p=!1}}),i("slideChange",()=>{e.destroyed||!e.autoplay.running||(m=!0)}),Object.assign(e.autoplay,{start:U,stop:I,pause:x,resume:E})}function Ou(s){let{swiper:e,extendParams:t,on:i}=s;t({thumbs:{swiper:null,multipleActiveThumbs:!0,autoScrollOffset:0,slideThumbActiveClass:"swiper-slide-thumb-active",thumbsContainerClass:"swiper-thumbs"}});let n=!1,r=!1;e.thumbs={swiper:null};function a(){const l=e.thumbs.swiper;if(!l||l.destroyed)return;const d=l.clickedIndex,h=l.clickedSlide;if(h&&h.classList.contains(e.params.thumbs.slideThumbActiveClass)||typeof d>"u"||d===null)return;let u;l.params.loop?u=parseInt(l.clickedSlide.getAttribute("data-swiper-slide-index"),10):u=d,e.params.loop?e.slideToLoop(u):e.slideTo(u)}function o(){const{thumbs:l}=e.params;if(n)return!1;n=!0;const d=e.constructor;if(l.swiper instanceof d){if(l.swiper.destroyed)return n=!1,!1;e.thumbs.swiper=l.swiper,Object.assign(e.thumbs.swiper.originalParams,{watchSlidesProgress:!0,slideToClickedSlide:!1}),Object.assign(e.thumbs.swiper.params,{watchSlidesProgress:!0,slideToClickedSlide:!1}),e.thumbs.swiper.update()}else if(ps(l.swiper)){const h=Object.assign({},l.swiper);Object.assign(h,{watchSlidesProgress:!0,slideToClickedSlide:!1}),e.thumbs.swiper=new d(h),r=!0}return e.thumbs.swiper.el.classList.add(e.params.thumbs.thumbsContainerClass),e.thumbs.swiper.on("tap",a),!0}function c(l){const d=e.thumbs.swiper;if(!d||d.destroyed)return;const h=d.params.slidesPerView==="auto"?d.slidesPerViewDynamic():d.params.slidesPerView;let u=1;const p=e.params.thumbs.slideThumbActiveClass;if(e.params.slidesPerView>1&&!e.params.centeredSlides&&(u=e.params.slidesPerView),e.params.thumbs.multipleActiveThumbs||(u=1),u=Math.floor(u),d.slides.forEach(m=>m.classList.remove(p)),d.params.loop||d.params.virtual&&d.params.virtual.enabled)for(let m=0;m<u;m+=1)di(d.slidesEl,`[data-swiper-slide-index="${e.realIndex+m}"]`).forEach(f=>{f.classList.add(p)});else for(let m=0;m<u;m+=1)d.slides[e.realIndex+m]&&d.slides[e.realIndex+m].classList.add(p);const g=e.params.thumbs.autoScrollOffset,v=g&&!d.params.loop;if(e.realIndex!==d.realIndex||v){const m=d.activeIndex;let f,A;if(d.params.loop){const _=d.slides.find(S=>S.getAttribute("data-swiper-slide-index")===`${e.realIndex}`);f=d.slides.indexOf(_),A=e.activeIndex>e.previousIndex?"next":"prev"}else f=e.realIndex,A=f>e.previousIndex?"next":"prev";v&&(f+=A==="next"?g:-1*g),d.visibleSlidesIndexes&&d.visibleSlidesIndexes.indexOf(f)<0&&(d.params.centeredSlides?f>m?f=f-Math.floor(h/2)+1:f=f+Math.floor(h/2)-1:f>m&&d.params.slidesPerGroup,d.slideTo(f,l?0:void 0))}}i("beforeInit",()=>{const{thumbs:l}=e.params;if(!(!l||!l.swiper))if(typeof l.swiper=="string"||l.swiper instanceof HTMLElement){const d=Ot(),h=()=>{const p=typeof l.swiper=="string"?d.querySelector(l.swiper):l.swiper;if(p&&p.swiper)l.swiper=p.swiper,o(),c(!0);else if(p){const g=`${e.params.eventsPrefix}init`,v=m=>{l.swiper=m.detail[0],p.removeEventListener(g,v),o(),c(!0),l.swiper.update(),e.update()};p.addEventListener(g,v)}return p},u=()=>{if(e.destroyed)return;h()||requestAnimationFrame(u)};requestAnimationFrame(u)}else o(),c(!0)}),i("slideChange update resize observerUpdate",()=>{c()}),i("setTransition",(l,d)=>{const h=e.thumbs.swiper;!h||h.destroyed||h.setTransition(d)}),i("beforeDestroy",()=>{const l=e.thumbs.swiper;!l||l.destroyed||r&&l.destroy()}),Object.assign(e.thumbs,{init:o,update:c})}const zu='@font-face{font-family:swiper-icons;src:url(data:application/font-woff;charset=utf-8;base64,\\ d09GRgABAAAAAAZgABAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAGRAAAABoAAAAci6qHkUdERUYAAAWgAAAAIwAAACQAYABXR1BPUwAABhQAAAAuAAAANuAY7+xHU1VCAAAFxAAAAFAAAABm2fPczU9TLzIAAAHcAAAASgAAAGBP9V5RY21hcAAAAkQAAACIAAABYt6F0cBjdnQgAAACzAAAAAQAAAAEABEBRGdhc3AAAAWYAAAACAAAAAj//wADZ2x5ZgAAAywAAADMAAAD2MHtryVoZWFkAAABbAAAADAAAAA2E2+eoWhoZWEAAAGcAAAAHwAAACQC9gDzaG10eAAAAigAAAAZAAAArgJkABFsb2NhAAAC0AAAAFoAAABaFQAUGG1heHAAAAG8AAAAHwAAACAAcABAbmFtZQAAA/gAAAE5AAACXvFdBwlwb3N0AAAFNAAAAGIAAACE5s74hXjaY2BkYGAAYpf5Hu/j+W2+MnAzMYDAzaX6QjD6/4//Bxj5GA8AuRwMYGkAPywL13jaY2BkYGA88P8Agx4j+/8fQDYfA1AEBWgDAIB2BOoAeNpjYGRgYNBh4GdgYgABEMnIABJzYNADCQAACWgAsQB42mNgYfzCOIGBlYGB0YcxjYGBwR1Kf2WQZGhhYGBiYGVmgAFGBiQQkOaawtDAoMBQxXjg/wEGPcYDDA4wNUA2CCgwsAAAO4EL6gAAeNpj2M0gyAACqxgGNWBkZ2D4/wMA+xkDdgAAAHjaY2BgYGaAYBkGRgYQiAHyGMF8FgYHIM3DwMHABGQrMOgyWDLEM1T9/w8UBfEMgLzE////P/5//f/V/xv+r4eaAAeMbAxwIUYmIMHEgKYAYjUcsDAwsLKxc3BycfPw8jEQA/gZBASFhEVExcQlJKWkZWTl5BUUlZRVVNXUNTQZBgMAAMR+E+gAEQFEAAAAKgAqACoANAA+AEgAUgBcAGYAcAB6AIQAjgCYAKIArAC2AMAAygDUAN4A6ADyAPwBBgEQARoBJAEuATgBQgFMAVYBYAFqAXQBfgGIAZIBnAGmAbIBzgHsAAB42u2NMQ6CUAyGW568x9AneYYgm4MJbhKFaExIOAVX8ApewSt4Bic4AfeAid3VOBixDxfPYEza5O+Xfi04YADggiUIULCuEJK8VhO4bSvpdnktHI5QCYtdi2sl8ZnXaHlqUrNKzdKcT8cjlq+rwZSvIVczNiezsfnP/uznmfPFBNODM2K7MTQ45YEAZqGP81AmGGcF3iPqOop0r1SPTaTbVkfUe4HXj97wYE+yNwWYxwWu4v1ugWHgo3S1XdZEVqWM7ET0cfnLGxWfkgR42o2PvWrDMBSFj/IHLaF0zKjRgdiVMwScNRAoWUoH78Y2icB/yIY09An6AH2Bdu/UB+yxopYshQiEvnvu0dURgDt8QeC8PDw7Fpji3fEA4z/PEJ6YOB5hKh4dj3EvXhxPqH/SKUY3rJ7srZ4FZnh1PMAtPhwP6fl2PMJMPDgeQ4rY8YT6Gzao0eAEA409DuggmTnFnOcSCiEiLMgxCiTI6Cq5DZUd3Qmp10vO0LaLTd2cjN4fOumlc7lUYbSQcZFkutRG7g6JKZKy0RmdLY680CDnEJ+UMkpFFe1RN7nxdVpXrC4aTtnaurOnYercZg2YVmLN/d/gczfEimrE/fs/bOuq29Zmn8tloORaXgZgGa78yO9/cnXm2BpaGvq25Dv9S4E9+5SIc9PqupJKhYFSSl47+Qcr1mYNAAAAeNptw0cKwkAAAMDZJA8Q7OUJvkLsPfZ6zFVERPy8qHh2YER+3i/BP83vIBLLySsoKimrqKqpa2hp6+jq6RsYGhmbmJqZSy0sraxtbO3sHRydnEMU4uR6yx7JJXveP7WrDycAAAAAAAH//wACeNpjYGRgYOABYhkgZgJCZgZNBkYGLQZtIJsFLMYAAAw3ALgAeNolizEKgDAQBCchRbC2sFER0YD6qVQiBCv/H9ezGI6Z5XBAw8CBK/m5iQQVauVbXLnOrMZv2oLdKFa8Pjuru2hJzGabmOSLzNMzvutpB3N42mNgZGBg4GKQYzBhYMxJLMlj4GBgAYow/P/PAJJhLM6sSoWKfWCAAwDAjgbRAAB42mNgYGBkAIIbCZo5IPrmUn0hGA0AO8EFTQAA);font-weight:400;font-style:normal}:root{--swiper-theme-color: #007aff}:host{position:relative;display:block;margin-left:auto;margin-right:auto;z-index:1}.swiper{margin-left:auto;margin-right:auto;position:relative;overflow:hidden;list-style:none;padding:0;z-index:1;display:block}.swiper-vertical>.swiper-wrapper{flex-direction:column}.swiper-wrapper{position:relative;width:100%;height:100%;z-index:1;display:flex;transition-property:transform;transition-timing-function:var(--swiper-wrapper-transition-timing-function, initial);box-sizing:content-box}.swiper-android .swiper-slide,.swiper-ios .swiper-slide,.swiper-wrapper{transform:translateZ(0)}.swiper-horizontal{touch-action:pan-y}.swiper-vertical{touch-action:pan-x}.swiper-slide{flex-shrink:0;width:100%;height:100%;position:relative;transition-property:transform;display:block}.swiper-slide-invisible-blank{visibility:hidden}.swiper-autoheight,.swiper-autoheight .swiper-slide{height:auto}.swiper-autoheight .swiper-wrapper{align-items:flex-start;transition-property:transform,height}.swiper-backface-hidden .swiper-slide{transform:translateZ(0);-webkit-backface-visibility:hidden;backface-visibility:hidden}.swiper-3d.swiper-css-mode .swiper-wrapper{perspective:1200px}.swiper-3d .swiper-wrapper{transform-style:preserve-3d}.swiper-3d{perspective:1200px}.swiper-3d .swiper-slide,.swiper-3d .swiper-cube-shadow{transform-style:preserve-3d}.swiper-css-mode>.swiper-wrapper{overflow:auto;scrollbar-width:none;-ms-overflow-style:none}.swiper-css-mode>.swiper-wrapper::-webkit-scrollbar{display:none}.swiper-css-mode>.swiper-wrapper>.swiper-slide{scroll-snap-align:start start}.swiper-css-mode.swiper-horizontal>.swiper-wrapper{scroll-snap-type:x mandatory}.swiper-css-mode.swiper-vertical>.swiper-wrapper{scroll-snap-type:y mandatory}.swiper-css-mode.swiper-free-mode>.swiper-wrapper{scroll-snap-type:none}.swiper-css-mode.swiper-free-mode>.swiper-wrapper>.swiper-slide{scroll-snap-align:none}.swiper-css-mode.swiper-centered>.swiper-wrapper:before{content:"";flex-shrink:0;order:9999}.swiper-css-mode.swiper-centered>.swiper-wrapper>.swiper-slide{scroll-snap-align:center center;scroll-snap-stop:always}.swiper-css-mode.swiper-centered.swiper-horizontal>.swiper-wrapper>.swiper-slide:first-child{margin-inline-start:var(--swiper-centered-offset-before)}.swiper-css-mode.swiper-centered.swiper-horizontal>.swiper-wrapper:before{height:100%;min-height:1px;width:var(--swiper-centered-offset-after)}.swiper-css-mode.swiper-centered.swiper-vertical>.swiper-wrapper>.swiper-slide:first-child{margin-block-start:var(--swiper-centered-offset-before)}.swiper-css-mode.swiper-centered.swiper-vertical>.swiper-wrapper:before{width:100%;min-width:1px;height:var(--swiper-centered-offset-after)}.swiper-3d .swiper-slide-shadow,.swiper-3d .swiper-slide-shadow-left,.swiper-3d .swiper-slide-shadow-right,.swiper-3d .swiper-slide-shadow-top,.swiper-3d .swiper-slide-shadow-bottom{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:10}.swiper-3d .swiper-slide-shadow{background:#00000026}.swiper-3d .swiper-slide-shadow-left{background-image:linear-gradient(to left,#00000080,#0000)}.swiper-3d .swiper-slide-shadow-right{background-image:linear-gradient(to right,#00000080,#0000)}.swiper-3d .swiper-slide-shadow-top{background-image:linear-gradient(to top,#00000080,#0000)}.swiper-3d .swiper-slide-shadow-bottom{background-image:linear-gradient(to bottom,#00000080,#0000)}.swiper-lazy-preloader{width:42px;height:42px;position:absolute;left:50%;top:50%;margin-left:-21px;margin-top:-21px;z-index:10;transform-origin:50%;box-sizing:border-box;border:4px solid var(--swiper-preloader-color, var(--swiper-theme-color));border-radius:50%;border-top-color:transparent}.swiper:not(.swiper-watch-progress) .swiper-lazy-preloader,.swiper-watch-progress .swiper-slide-visible .swiper-lazy-preloader{animation:swiper-preloader-spin 1s infinite linear}.swiper-lazy-preloader-white{--swiper-preloader-color: #fff}.swiper-lazy-preloader-black{--swiper-preloader-color: #000}@keyframes swiper-preloader-spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}:root{--swiper-navigation-size: 44px}.swiper-button-prev,.swiper-button-next{position:absolute;top:var(--swiper-navigation-top-offset, 50%);width:calc(var(--swiper-navigation-size) / 44 * 27);height:var(--swiper-navigation-size);margin-top:calc(0px - (var(--swiper-navigation-size) / 2));z-index:10;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--swiper-navigation-color, var(--swiper-theme-color))}.swiper-button-prev.swiper-button-disabled,.swiper-button-next.swiper-button-disabled{opacity:.35;cursor:auto;pointer-events:none}.swiper-button-prev.swiper-button-hidden,.swiper-button-next.swiper-button-hidden{opacity:0;cursor:auto;pointer-events:none}.swiper-navigation-disabled .swiper-button-prev,.swiper-navigation-disabled .swiper-button-next{display:none!important}.swiper-button-prev svg,.swiper-button-next svg{width:100%;height:100%;object-fit:contain;transform-origin:center}.swiper-rtl .swiper-button-prev svg,.swiper-rtl .swiper-button-next svg{transform:rotate(180deg)}.swiper-button-prev,.swiper-rtl .swiper-button-next{left:var(--swiper-navigation-sides-offset, 10px);right:auto}.swiper-button-lock{display:none}.swiper-button-prev:after,.swiper-button-next:after{font-family:swiper-icons;font-size:var(--swiper-navigation-size);text-transform:none!important;letter-spacing:0;font-variant:initial;line-height:1}.swiper-button-prev:after,.swiper-rtl .swiper-button-next:after{content:"prev"}.swiper-button-next,.swiper-rtl .swiper-button-prev{right:var(--swiper-navigation-sides-offset, 10px);left:auto}.swiper-button-next:after,.swiper-rtl .swiper-button-prev:after{content:"next"}.swiper-pagination{position:absolute;text-align:center;transition:.3s opacity;transform:translateZ(0);z-index:10}.swiper-pagination.swiper-pagination-hidden{opacity:0}.swiper-pagination-disabled>.swiper-pagination,.swiper-pagination.swiper-pagination-disabled{display:none!important}.swiper-pagination-fraction,.swiper-pagination-custom,.swiper-horizontal>.swiper-pagination-bullets,.swiper-pagination-bullets.swiper-pagination-horizontal{bottom:var(--swiper-pagination-bottom, 8px);top:var(--swiper-pagination-top, auto);left:0;width:100%}.swiper-pagination-bullets-dynamic{overflow:hidden;font-size:0}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{transform:scale(.33);position:relative}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active,.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-main{transform:scale(1)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev{transform:scale(.66)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev-prev{transform:scale(.33)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next{transform:scale(.66)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next-next{transform:scale(.33)}.swiper-pagination-bullet{width:var(--swiper-pagination-bullet-width, var(--swiper-pagination-bullet-size, 8px));height:var(--swiper-pagination-bullet-height, var(--swiper-pagination-bullet-size, 8px));display:inline-block;border-radius:var(--swiper-pagination-bullet-border-radius, 50%);background:var(--swiper-pagination-bullet-inactive-color, #000);opacity:var(--swiper-pagination-bullet-inactive-opacity, .2)}button.swiper-pagination-bullet{border:none;margin:0;padding:0;box-shadow:none;-webkit-appearance:none;-moz-appearance:none;appearance:none}.swiper-pagination-clickable .swiper-pagination-bullet{cursor:pointer}.swiper-pagination-bullet:only-child{display:none!important}.swiper-pagination-bullet-active{opacity:var(--swiper-pagination-bullet-opacity, 1);background:var(--swiper-pagination-color, var(--swiper-theme-color))}.swiper-vertical>.swiper-pagination-bullets,.swiper-pagination-vertical.swiper-pagination-bullets{right:var(--swiper-pagination-right, 8px);left:var(--swiper-pagination-left, auto);top:50%;transform:translate3d(0,-50%,0)}.swiper-vertical>.swiper-pagination-bullets .swiper-pagination-bullet,.swiper-pagination-vertical.swiper-pagination-bullets .swiper-pagination-bullet{margin:var(--swiper-pagination-bullet-vertical-gap, 6px) 0;display:block}.swiper-vertical>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic,.swiper-pagination-vertical.swiper-pagination-bullets.swiper-pagination-bullets-dynamic{top:50%;transform:translateY(-50%);width:8px}.swiper-vertical>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet,.swiper-pagination-vertical.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{display:inline-block;transition:.2s transform,.2s top}.swiper-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet,.swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet{margin:0 var(--swiper-pagination-bullet-horizontal-gap, 4px)}.swiper-horizontal>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic,.swiper-pagination-horizontal.swiper-pagination-bullets.swiper-pagination-bullets-dynamic{left:50%;transform:translate(-50%);white-space:nowrap}.swiper-horizontal>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet,.swiper-pagination-horizontal.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{transition:.2s transform,.2s left}.swiper-horizontal.swiper-rtl>.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{transition:.2s transform,.2s right}.swiper-pagination-fraction{color:var(--swiper-pagination-fraction-color, inherit)}.swiper-pagination-progressbar{background:var(--swiper-pagination-progressbar-bg-color, rgba(0, 0, 0, .25));position:absolute}.swiper-pagination-progressbar .swiper-pagination-progressbar-fill{background:var(--swiper-pagination-color, var(--swiper-theme-color));position:absolute;left:0;top:0;width:100%;height:100%;transform:scale(0);transform-origin:left top}.swiper-rtl .swiper-pagination-progressbar .swiper-pagination-progressbar-fill{transform-origin:right top}.swiper-horizontal>.swiper-pagination-progressbar,.swiper-pagination-progressbar.swiper-pagination-horizontal,.swiper-vertical>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite,.swiper-pagination-progressbar.swiper-pagination-vertical.swiper-pagination-progressbar-opposite{width:100%;height:var(--swiper-pagination-progressbar-size, 4px);left:0;top:0}.swiper-vertical>.swiper-pagination-progressbar,.swiper-pagination-progressbar.swiper-pagination-vertical,.swiper-horizontal>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite,.swiper-pagination-progressbar.swiper-pagination-horizontal.swiper-pagination-progressbar-opposite{width:var(--swiper-pagination-progressbar-size, 4px);height:100%;left:0;top:0}.swiper-pagination-lock{display:none}.swiper-scrollbar{border-radius:var(--swiper-scrollbar-border-radius, 10px);position:relative;touch-action:none;background:var(--swiper-scrollbar-bg-color, rgba(0, 0, 0, .1))}.swiper-scrollbar-disabled>.swiper-scrollbar,.swiper-scrollbar.swiper-scrollbar-disabled{display:none!important}.swiper-horizontal>.swiper-scrollbar,.swiper-scrollbar.swiper-scrollbar-horizontal{position:absolute;left:var(--swiper-scrollbar-sides-offset, 1%);bottom:var(--swiper-scrollbar-bottom, 4px);top:var(--swiper-scrollbar-top, auto);z-index:50;height:var(--swiper-scrollbar-size, 4px);width:calc(100% - 2 * var(--swiper-scrollbar-sides-offset, 1%))}.swiper-vertical>.swiper-scrollbar,.swiper-scrollbar.swiper-scrollbar-vertical{position:absolute;left:var(--swiper-scrollbar-left, auto);right:var(--swiper-scrollbar-right, 4px);top:var(--swiper-scrollbar-sides-offset, 1%);z-index:50;width:var(--swiper-scrollbar-size, 4px);height:calc(100% - 2 * var(--swiper-scrollbar-sides-offset, 1%))}.swiper-scrollbar-drag{height:100%;width:100%;position:relative;background:var(--swiper-scrollbar-drag-bg-color, rgba(0, 0, 0, .5));border-radius:var(--swiper-scrollbar-border-radius, 10px);left:0;top:0}.swiper-scrollbar-cursor-drag{cursor:move}.swiper-scrollbar-lock{display:none}';class wl extends xi{constructor(){super(...arguments);Se(this,"slider");Se(this,"divContainer");Se(this,"divSlides");Se(this,"divGallery");Se(this,"divPagination");Se(this,"divPrevious");Se(this,"divNext");Se(this,"isDragging",!1)}static get observedAttributes(){return["has-thumb","autoplay"]}get hasThumb(){return this.hasAttribute("has-thumb")}get autoplay(){return this.hasAttribute("autoplay")}get slides(){var t;return[...Array.from(this.querySelectorAll("cc-swiper-slide")),...Array.from(((t=this.divSlides)==null?void 0:t.querySelectorAll("cc-swiper-slide"))??[])]}async openViewer(t,i,n){var c,l;let r=document.querySelector("cc-viewer");if(!r){const d=document.createElement("cc-viewer");document.body.appendChild(d),await customElements.whenDefined("cc-viewer"),r=await new Promise(h=>{setTimeout(()=>{h(document.querySelector("cc-viewer"))},100)})}r.setSwiper(this),r.setCurrentSlideIndex(n??((c=this.slider)==null?void 0:c.activeIndex)??0);const a=this.slides[n??((l=this.slider)==null?void 0:l.activeIndex)??0],o={};a!=null&&a.hasAttribute("fit-to-container")&&(o.fitToContainer=!0),a!=null&&a.hasAttribute("debug-mode")&&(o.debugMode=!0),a!=null&&a.hasAttribute("camera-position")&&(o.cameraPosition=a.getAttribute("camera-position")),a!=null&&a.hasAttribute("camera-target")&&(o.cameraTarget=a.getAttribute("camera-target")),a!=null&&a.hasAttribute("show-texture")&&(o.showTexture=a.getAttribute("show-texture")==="true"),i==="3dmodel"&&(a!=null&&a.hasAttribute("material-url"))&&(o.materialUrl=a.getAttribute("material-url")),r.open(t,i,o)}firstUpdated(){}render(){const t=`
      <style>
        ${zu}
      </style>
    `,i=this.css`
      :host {
        display: block;
        height: 100%;
        width: 100%;
        --swiper-theme-color: var(--cc-slider-theme-color, #007aff);
        --swiper-navigation-color: var(--cc-slider-navigation-color, #007aff);
        --swiper-gallery-height: 0px;
        --swiper-slider-margin-bottom: 0px;
        --swiper-navigation-size: 44px;
      }

      :host([has-thumb]) {
        --swiper-slider-margin-bottom: 10px;
        --swiper-gallery-height: calc(100px - var(--swiper-slider-margin-bottom));
      }

      #divContainer {
        height: calc(100% - var(--swiper-gallery-height) - var(--swiper-slider-margin-bottom));
        margin-bottom: var(--swiper-slider-margin-bottom);
      }
      
      .swiper {
        height: 100%;
      }

      #divGallery {
        height: var(--swiper-gallery-height);
      }

      .gallery-thumbs .swiper-slide {
        height: 100%;
        opacity: 0.25;
        transition: 200ms;
        cursor: pointer;
      }

      .gallery-thumbs .swiper-slide-thumb-active {
        opacity: 1;
      }

      .gallery-thumb {
        background-position: center !important;
        background-repeat: no-repeat !important;
        background-size: cover !important;
      }

      .swiper-wrapper {
        text-align: center;
      }

      .swiper-slide {
        background-color: white;
        height: 100%;
      }

      img.viewer {
        object-fit: contain;
        height: 100%;
        width: 100%;
        cursor: pointer;
        pointer-events: auto !important;
        user-select: none;
      }

      img.viewer.w-caption {
        height: calc(100% - 10px - 1.5rem);
      }

      .slider-caption {
        padding: 5px;
        margin: 0;
        line-height: 1.5em;
        background: #000000;
        color: #ffffff;
        font-size: 0.6rem;
        font-weight: 700;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 10;
      }

      /* Adjust pagination position when caption exists */
      .swiper-pagination {
        bottom: 10px !important;
      }

      /* When captions exist, move pagination up */
      #divContainer.has-captions .swiper-pagination {
        bottom: calc(1.5rem + 20px) !important;
      }

      /* Navigation button styles with SVG icons */
      .swiper-button-prev,
      .swiper-button-next {
        color: var(--swiper-navigation-color);
        font-size: 0; /* Hide text */
        width: var(--swiper-navigation-size);
        height: var(--swiper-navigation-size);
      }

      .swiper-button-prev:after {
        content: '';
        display: block;
        width: var(--swiper-navigation-size);
        height: var(--swiper-navigation-size);
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23007aff'%3E%3Cpath d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z'/%3E%3C/svg%3E");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      }
      
      .swiper-button-next:after {
        content: '';
        display: block;
        width: var(--swiper-navigation-size);
        height: var(--swiper-navigation-size);
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23007aff'%3E%3Cpath d='M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z'/%3E%3C/svg%3E");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      }
    `,n=this.slides.map((o,c)=>{const l=o.getAttribute("thumbnail-url")||"",d=o.getAttribute("image-url")||"",h=o.getAttribute("image-type")||"image",u=o.getAttribute("caption")||"";return`
        <div class='swiper-slide'>
          <img src="${l}" data-image-url="${d}" data-image-type="${h}" data-index="${c}" class="viewer${u!==""?" w-caption":""}">
          ${u!==""?`<p class="slider-caption">${u}</p>`:""}
        </div>
      `}).join(""),r=this.slides.map((o,c)=>{const l=o.getAttribute("thumbnail-url")||"";return`
        <div class='swiper-slide gallery-thumb' data-index="${c}" style="background-image: url('${l}')"></div>
      `}).join(""),a=`
      ${t}
      ${i}
      <div id='divContainer' class='swiper gallery-top'>
        <div id='divSlides' class='swiper-wrapper'>
          ${n}
        </div>

        <div id='divPagination' class='swiper-pagination'></div>
        <div id='divPrevious' class='swiper-button-prev'></div>
        <div id='divNext' class='swiper-button-next'></div>
      </div>
      <div id='divGallery' class='swiper gallery-thumbs'>
        <div class='swiper-wrapper'>
          ${r}
        </div>
      </div>
    `;this.updateShadowRoot(a),setTimeout(()=>{this.initializeSwiper(),this.queryAll(".gallery-thumb").forEach((o,c)=>{o.addEventListener("click",()=>{var l;return(l=this.slider)==null?void 0:l.slideTo(c)})}),this.queryAll("img.viewer").forEach(o=>{o.addEventListener("dragstart",c=>c.preventDefault()),o.addEventListener("click",c=>{if(this.isDragging){this.isDragging=!1;return}c.preventDefault(),c.stopPropagation(),c.stopImmediatePropagation();const l=c.target,d=l.getAttribute("data-image-url")||"",h=l.getAttribute("data-image-type")||"image",u=parseInt(l.getAttribute("data-index")||"0",10);return this.openViewer(d,h,u),!1},!0)})},0)}initializeSwiper(){this.divContainer=this.query("#divContainer")??void 0,this.divSlides=this.query("#divSlides")??void 0,this.divGallery=this.query("#divGallery")??void 0,this.divPagination=this.query("#divPagination")??void 0,this.divPrevious=this.query("#divPrevious")??void 0,this.divNext=this.query("#divNext")??void 0,this.slides.some(n=>n.getAttribute("caption"))&&this.divContainer&&this.divContainer.classList.add("has-captions");const i=this.slides.length>=2;this.divContainer&&(this.slider&&this.slider.destroy(),this.slider=new Kt(this.divContainer,{modules:[Lu,Pu,Vu,ku,Ou,Nu],navigation:{prevEl:this.divPrevious,nextEl:this.divNext},pagination:this.hasThumb?{}:{el:this.divPagination},autoplay:this.autoplay?{delay:5e3,disableOnInteraction:!1,reverseDirection:!1,stopOnLastSlide:!1,waitForTransition:!0}:!1,thumbs:this.hasThumb&&this.divGallery?{swiper:new Kt(this.divGallery,{spaceBetween:10,slidesPerView:Math.min(Math.max(4,this.slides.length),8),watchSlidesProgress:!0})}:{},preventClicks:!1,preventClicksPropagation:!1,simulateTouch:!0,allowTouchMove:!0,loop:i,on:{sliderMove:()=>{this.isDragging=!0},touchEnd:()=>{setTimeout(()=>{this.isDragging=!1},50)}}}))}}customElements.get("cc-swiper")||customElements.define("cc-swiper",wl);class bl extends xi{static get observedAttributes(){return["thumbnail-url","image-url","image-type","caption"]}get thumbnailUrl(){return this.getAttribute("thumbnail-url")||""}get imageUrl(){return this.getAttribute("image-url")||""}get imageType(){return this.getAttribute("image-type")||""}get caption(){return this.getAttribute("caption")||""}render(){const e=this.css`
      :host {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        background-size: cover !important;
        background-repeat: no-repeat !important;
        background-position: center !important;
      }
    `;this.updateShadowRoot(e)}}customElements.get("cc-swiper-slide")||customElements.define("cc-swiper-slide",bl);class sn extends xi{constructor(){super(...arguments);Se(this,"_showPrevButton",!0);Se(this,"_showNextButton",!0);Se(this,"isShow",!1);Se(this,"isLoading",!1)}get showPrevButton(){return this._showPrevButton}set showPrevButton(t){this._showPrevButton=t,this.updateNavigationVisibility()}get showNextButton(){return this._showNextButton}set showNextButton(t){this._showNextButton=t,this.updateNavigationVisibility()}open(t){this.isShow=!0,this.isLoading=!0;const i=Promise.resolve(this.doOpen(t));Promise.resolve().then(()=>{this.render()}),i.then(()=>{this.isLoading=!1,this.render()}).catch(n=>{this.isLoading=!1,this.render()})}close(){this.cleanupNavigationListeners(),this.doClose(),this.isShow=!1,this.isLoading=!1,this.render(),this.dispatch("close")}cleanupNavigationListeners(){const t=this.query(".nav-prev"),i=this.query(".nav-next"),n=this.query(".nav-close");t&&t.removeAttribute("data-listener-attached"),i&&i.removeAttribute("data-listener-attached"),n&&n.removeAttribute("data-listener-attached")}render(){if(this.shouldUseCustomRender()){this.customRender();return}const i=`
      ${this.css`
      :host {
        --cc-viewer-z-index-each: 1000;
      }
      
      .backdrop {
        justify-content: center;
        align-items: center;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        z-index: var(--cc-viewer-z-index-each);
      }
      
      .viewer {
        position: absolute;
        width: 90%;
        height: 85%;
        inset: 0px;
        margin: auto;
        align-self: center;
        background-color: #000;
      }
      
      ${this.getNavigationStyles()}
      ${this.getCustomStyles()}
    `}
      <div class="backdrop" style="${this.isShow?"visibility: visible":"visibility: hidden"}">
        ${this.getNavigationButtons()}
        <div class="viewer">
          ${this.getViewerContent()}
        </div>
      </div>
    `;this.updateShadowRoot(i),setTimeout(()=>{this.addNavigationListeners(),this.onAfterRender()},0)}shouldUseCustomRender(){return!1}customRender(){}getCustomStyles(){return""}onAfterRender(){}navigatePrev(){this.dispatch("navigate-prev")}navigateNext(){this.dispatch("navigate-next")}getNavigationButtons(){const t=this.showPrevButton?"":"display: none;",i=this.showNextButton?"":"display: none;";return`
      <button class="nav-button nav-prev" style="${t}" aria-label="Previous">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button class="nav-button nav-next" style="${i}" aria-label="Next">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
      <button class="nav-button nav-close" aria-label="Close">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    `}getNavigationStyles(){return`
      .nav-button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        border-radius: 4px;
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background 0.3s;
        z-index: calc(var(--cc-viewer-z-index-each, 1000) + 2);
        pointer-events: auto;
      }
      
      .nav-button:hover {
        background: rgba(0, 0, 0, 0.7);
      }
      
      .nav-prev {
        left: 20px;
      }
      
      .nav-next {
        right: 20px;
      }
      
      .nav-close {
        top: 20px;
        right: 20px;
        transform: none;
      }
    `}addNavigationListeners(){const t=this.query(".backdrop");t&&t.style.visibility==="hidden"||setTimeout(()=>{const i=this.query(".nav-prev"),n=this.query(".nav-next"),r=this.query(".nav-close");i&&!i.hasAttribute("data-listener-attached")&&(i.setAttribute("data-listener-attached","true"),i.addEventListener("click",a=>{a.stopPropagation(),a.preventDefault(),this.navigatePrev()},!0)),n&&!n.hasAttribute("data-listener-attached")&&(n.setAttribute("data-listener-attached","true"),n.addEventListener("click",a=>{a.stopPropagation(),this.navigateNext()})),r&&!r.hasAttribute("data-listener-attached")&&(r.setAttribute("data-listener-attached","true"),r.addEventListener("click",a=>{a.stopPropagation(),this.close()}))},0)}updateNavigationVisibility(){const t=this.query(".nav-prev"),i=this.query(".nav-next");t&&(t.style.display=this._showPrevButton?"":"none"),i&&(i.style.display=this._showNextButton?"":"none")}}/*!
 * Viewer.js v1.11.7
 * https://fengyuanchen.github.io/viewerjs
 *
 * Copyright 2015-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2024-11-24T04:32:19.116Z
 */function Wu(s,e){if(!(s instanceof e))throw new TypeError("Cannot call a class as a function")}function yl(s,e){for(var t=0;t<e.length;t++){var i=e[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(s,Ul(i.key),i)}}function Gu(s,e,t){return e&&yl(s.prototype,e),t&&yl(s,t),Object.defineProperty(s,"prototype",{writable:!1}),s}function Hu(s,e,t){return(e=Ul(e))in s?Object.defineProperty(s,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):s[e]=t,s}function Cl(s,e){var t=Object.keys(s);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(s);e&&(i=i.filter(function(n){return Object.getOwnPropertyDescriptor(s,n).enumerable})),t.push.apply(t,i)}return t}function ca(s){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?Cl(Object(t),!0).forEach(function(i){Hu(s,i,t[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(s,Object.getOwnPropertyDescriptors(t)):Cl(Object(t)).forEach(function(i){Object.defineProperty(s,i,Object.getOwnPropertyDescriptor(t,i))})}return s}function Ju(s,e){if(typeof s!="object"||!s)return s;var t=s[Symbol.toPrimitive];if(t!==void 0){var i=t.call(s,e);if(typeof i!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(s)}function Ul(s){var e=Ju(s,"string");return typeof e=="symbol"?e:e+""}function da(s){"@babel/helpers - typeof";return da=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},da(s)}var Ml={backdrop:!0,button:!0,navbar:!0,title:!0,toolbar:!0,className:"",container:"body",filter:null,fullscreen:!0,inheritedAttributes:["crossOrigin","decoding","isMap","loading","referrerPolicy","sizes","srcset","useMap"],initialCoverage:.9,initialViewIndex:0,inline:!1,interval:5e3,keyboard:!0,focus:!0,loading:!0,loop:!0,minWidth:200,minHeight:100,movable:!0,rotatable:!0,scalable:!0,zoomable:!0,zoomOnTouch:!0,zoomOnWheel:!0,slideOnTouch:!0,toggleOnDblclick:!0,tooltip:!0,transition:!0,zIndex:2015,zIndexInline:0,zoomRatio:.1,minZoomRatio:.01,maxZoomRatio:100,url:"src",ready:null,show:null,shown:null,hide:null,hidden:null,view:null,viewed:null,move:null,moved:null,rotate:null,rotated:null,scale:null,scaled:null,zoom:null,zoomed:null,play:null,stop:null},Zu='<div class="viewer-container" tabindex="-1" touch-action="none"><div class="viewer-canvas"></div><div class="viewer-footer"><div class="viewer-title"></div><div class="viewer-toolbar"></div><div class="viewer-navbar"><ul class="viewer-list" role="navigation"></ul></div></div><div class="viewer-tooltip" role="alert" aria-hidden="true"></div><div class="viewer-button" data-viewer-action="mix" role="button"></div><div class="viewer-player"></div></div>',Gs=typeof window<"u"&&typeof window.document<"u",Ui=Gs?window:{},Un=Gs&&Ui.document.documentElement?"ontouchstart"in Ui.document.documentElement:!1,ha=Gs?"PointerEvent"in Ui:!1,Oe="viewer",Hs="move",Tl="switch",gs="zoom",Js="".concat(Oe,"-active"),Xu="".concat(Oe,"-close"),Zs="".concat(Oe,"-fade"),ua="".concat(Oe,"-fixed"),Yu="".concat(Oe,"-fullscreen"),Fl="".concat(Oe,"-fullscreen-exit"),rn="".concat(Oe,"-hide"),Ku="".concat(Oe,"-hide-md-down"),ju="".concat(Oe,"-hide-sm-down"),qu="".concat(Oe,"-hide-xs-down"),ti="".concat(Oe,"-in"),vs="".concat(Oe,"-invisible"),Mn="".concat(Oe,"-loading"),$u="".concat(Oe,"-move"),Il="".concat(Oe,"-open"),Tn="".concat(Oe,"-show"),pt="".concat(Oe,"-transition"),Fn="click",fa="dblclick",Rl="dragstart",Bl="focusin",Dl="keydown",ii="load",an="error",ef=Un?"touchend touchcancel":"mouseup",tf=Un?"touchmove":"mousemove",nf=Un?"touchstart":"mousedown",Ql=ha?"pointerdown":nf,Nl=ha?"pointermove":tf,Ll=ha?"pointerup pointercancel":ef,Pl="resize",hi="transitionend",Vl="wheel",kl="ready",Ol="show",zl="shown",Wl="hide",Gl="hidden",Hl="view",As="viewed",Jl="move",Zl="moved",Xl="rotate",Yl="rotated",Kl="scale",jl="scaled",ql="zoom",$l="zoomed",ec="play",tc="stop",Xs="".concat(Oe,"Action"),pa=/\s\s*/,Ys=["zoom-in","zoom-out","one-to-one","reset","prev","play","next","rotate-left","rotate-right","flip-horizontal","flip-vertical"];function _s(s){return typeof s=="string"}var sf=Number.isNaN||Ui.isNaN;function ht(s){return typeof s=="number"&&!sf(s)}function In(s){return typeof s>"u"}function Rn(s){return da(s)==="object"&&s!==null}var rf=Object.prototype.hasOwnProperty;function Bn(s){if(!Rn(s))return!1;try{var e=s.constructor,t=e.prototype;return e&&t&&rf.call(t,"isPrototypeOf")}catch{return!1}}function nt(s){return typeof s=="function"}function rt(s,e){if(s&&nt(e))if(Array.isArray(s)||ht(s.length)){var t=s.length,i;for(i=0;i<t&&e.call(s,s[i],i,s)!==!1;i+=1);}else Rn(s)&&Object.keys(s).forEach(function(n){e.call(s,s[n],n,s)});return s}var jt=Object.assign||function(e){for(var t=arguments.length,i=new Array(t>1?t-1:0),n=1;n<t;n++)i[n-1]=arguments[n];return Rn(e)&&i.length>0&&i.forEach(function(r){Rn(r)&&Object.keys(r).forEach(function(a){e[a]=r[a]})}),e},af=/^(?:width|height|left|top|marginLeft|marginTop)$/;function ui(s,e){var t=s.style;rt(e,function(i,n){af.test(n)&&ht(i)&&(i+="px"),t[n]=i})}function of(s){return _s(s)?s.replace(/&(?!amp;|quot;|#39;|lt;|gt;)/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):s}function Dn(s,e){return!s||!e?!1:s.classList?s.classList.contains(e):s.className.indexOf(e)>-1}function Me(s,e){if(!(!s||!e)){if(ht(s.length)){rt(s,function(i){Me(i,e)});return}if(s.classList){s.classList.add(e);return}var t=s.className.trim();t?t.indexOf(e)<0&&(s.className="".concat(t," ").concat(e)):s.className=e}}function je(s,e){if(!(!s||!e)){if(ht(s.length)){rt(s,function(t){je(t,e)});return}if(s.classList){s.classList.remove(e);return}s.className.indexOf(e)>=0&&(s.className=s.className.replace(e,""))}}function Ss(s,e,t){if(e){if(ht(s.length)){rt(s,function(i){Ss(i,e,t)});return}t?Me(s,e):je(s,e)}}var lf=/([a-z\d])([A-Z])/g;function ma(s){return s.replace(lf,"$1-$2").toLowerCase()}function Qn(s,e){return Rn(s[e])?s[e]:s.dataset?s.dataset[e]:s.getAttribute("data-".concat(ma(e)))}function ga(s,e,t){Rn(t)?s[e]=t:s.dataset?s.dataset[e]=t:s.setAttribute("data-".concat(ma(e)),t)}var ic=(function(){var s=!1;if(Gs){var e=!1,t=function(){},i=Object.defineProperty({},"once",{get:function(){return s=!0,e},set:function(r){e=r}});Ui.addEventListener("test",t,i),Ui.removeEventListener("test",t,i)}return s})();function st(s,e,t){var i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},n=t;e.trim().split(pa).forEach(function(r){if(!ic){var a=s.listeners;a&&a[r]&&a[r][t]&&(n=a[r][t],delete a[r][t],Object.keys(a[r]).length===0&&delete a[r],Object.keys(a).length===0&&delete s.listeners)}s.removeEventListener(r,n,i)})}function Re(s,e,t){var i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},n=t;e.trim().split(pa).forEach(function(r){if(i.once&&!ic){var a=s.listeners,o=a===void 0?{}:a;n=function(){delete o[r][t],s.removeEventListener(r,n,i);for(var l=arguments.length,d=new Array(l),h=0;h<l;h++)d[h]=arguments[h];t.apply(s,d)},o[r]||(o[r]={}),o[r][t]&&s.removeEventListener(r,o[r][t],i),o[r][t]=n,s.listeners=o}s.addEventListener(r,n,i)})}function At(s,e,t,i){var n;return nt(Event)&&nt(CustomEvent)?n=new CustomEvent(e,ca({bubbles:!0,cancelable:!0,detail:t},i)):(n=document.createEvent("CustomEvent"),n.initCustomEvent(e,!0,!0,t)),s.dispatchEvent(n)}function cf(s){var e=s.getBoundingClientRect();return{left:e.left+(window.pageXOffset-document.documentElement.clientLeft),top:e.top+(window.pageYOffset-document.documentElement.clientTop)}}function Ks(s){var e=s.rotate,t=s.scaleX,i=s.scaleY,n=s.translateX,r=s.translateY,a=[];ht(n)&&n!==0&&a.push("translateX(".concat(n,"px)")),ht(r)&&r!==0&&a.push("translateY(".concat(r,"px)")),ht(e)&&e!==0&&a.push("rotate(".concat(e,"deg)")),ht(t)&&t!==1&&a.push("scaleX(".concat(t,")")),ht(i)&&i!==1&&a.push("scaleY(".concat(i,")"));var o=a.length?a.join(" "):"none";return{WebkitTransform:o,msTransform:o,transform:o}}function df(s){return _s(s)?decodeURIComponent(s.replace(/^.*\//,"").replace(/[?&#].*$/,"")):""}var va=Ui.navigator&&/Version\/\d+(\.\d+)+?\s+Safari/i.test(Ui.navigator.userAgent);function nc(s,e,t){var i=document.createElement("img");if(s.naturalWidth&&!va)return t(s.naturalWidth,s.naturalHeight),i;var n=document.body||document.documentElement;return i.onload=function(){t(i.width,i.height),va||n.removeChild(i)},rt(e.inheritedAttributes,function(r){var a=s.getAttribute(r);a!==null&&i.setAttribute(r,a)}),i.src=s.src,va||(i.style.cssText="left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;",n.appendChild(i)),i}function js(s){switch(s){case 2:return qu;case 3:return ju;case 4:return Ku;default:return""}}function hf(s){var e=ca({},s),t=[];return rt(s,function(i,n){delete e[n],rt(e,function(r){var a=Math.abs(i.startX-r.startX),o=Math.abs(i.startY-r.startY),c=Math.abs(i.endX-r.endX),l=Math.abs(i.endY-r.endY),d=Math.sqrt(a*a+o*o),h=Math.sqrt(c*c+l*l),u=(h-d)/d;t.push(u)})}),t.sort(function(i,n){return Math.abs(i)<Math.abs(n)}),t[0]}function qs(s,e){var t=s.pageX,i=s.pageY,n={endX:t,endY:i};return e?n:ca({timeStamp:Date.now(),startX:t,startY:i},n)}function uf(s){var e=0,t=0,i=0;return rt(s,function(n){var r=n.startX,a=n.startY;e+=r,t+=a,i+=1}),e/=i,t/=i,{pageX:e,pageY:t}}var ff={render:function(){this.initContainer(),this.initViewer(),this.initList(),this.renderViewer()},initBody:function(){var e=this.element.ownerDocument,t=e.body||e.documentElement;this.body=t,this.scrollbarWidth=window.innerWidth-e.documentElement.clientWidth,this.initialBodyPaddingRight=t.style.paddingRight,this.initialBodyComputedPaddingRight=window.getComputedStyle(t).paddingRight},initContainer:function(){this.containerData={width:window.innerWidth,height:window.innerHeight}},initViewer:function(){var e=this.options,t=this.parent,i;e.inline&&(i={width:Math.max(t.offsetWidth,e.minWidth),height:Math.max(t.offsetHeight,e.minHeight)},this.parentData=i),(this.fulled||!i)&&(i=this.containerData),this.viewerData=jt({},i)},renderViewer:function(){this.options.inline&&!this.fulled&&ui(this.viewer,this.viewerData)},initList:function(){var e=this,t=this.element,i=this.options,n=this.list,r=[];n.innerHTML="",rt(this.images,function(a,o){var c=a.src,l=a.alt||df(c),d=e.getImageURL(a);if(c||d){var h=document.createElement("li"),u=document.createElement("img");rt(i.inheritedAttributes,function(p){var g=a.getAttribute(p);g!==null&&u.setAttribute(p,g)}),i.navbar&&(u.src=c||d),u.alt=l,u.setAttribute("data-original-url",d||c),h.setAttribute("data-index",o),h.setAttribute("data-viewer-action","view"),h.setAttribute("role","button"),i.keyboard&&h.setAttribute("tabindex",0),h.appendChild(u),n.appendChild(h),r.push(h)}}),this.items=r,rt(r,function(a){var o=a.firstElementChild,c,l;ga(o,"filled",!0),i.loading&&Me(a,Mn),Re(o,ii,c=function(h){st(o,an,l),i.loading&&je(a,Mn),e.loadImage(h)},{once:!0}),Re(o,an,l=function(){st(o,ii,c),i.loading&&je(a,Mn)},{once:!0})}),i.transition&&Re(t,As,function(){Me(n,pt)},{once:!0})},renderList:function(){var e=this.index,t=this.items[e];if(t){var i=t.nextElementSibling,n=parseInt(window.getComputedStyle(i||t).marginLeft,10),r=t.offsetWidth,a=r+n;ui(this.list,jt({width:a*this.length-n},Ks({translateX:(this.viewerData.width-r)/2-a*e})))}},resetList:function(){var e=this.list;e.innerHTML="",je(e,pt),ui(e,Ks({translateX:0}))},initImage:function(e){var t=this,i=this.options,n=this.image,r=this.viewerData,a=this.footer.offsetHeight,o=r.width,c=Math.max(r.height-a,a),l=this.imageData||{},d;this.imageInitializing={abort:function(){d.onload=null}},d=nc(n,i,function(h,u){var p=h/u,g=Math.max(0,Math.min(1,i.initialCoverage)),v=o,m=c;t.imageInitializing=!1,c*p>o?m=o/p:v=c*p,g=ht(g)?g:.9,v=Math.min(v*g,h),m=Math.min(m*g,u);var f=(o-v)/2,A=(c-m)/2,_={left:f,top:A,x:f,y:A,width:v,height:m,oldRatio:1,ratio:v/h,aspectRatio:p,naturalWidth:h,naturalHeight:u},S=jt({},_);i.rotatable&&(_.rotate=l.rotate||0,S.rotate=0),i.scalable&&(_.scaleX=l.scaleX||1,_.scaleY=l.scaleY||1,S.scaleX=1,S.scaleY=1),t.imageData=_,t.initialImageData=S,e&&e()})},renderImage:function(e){var t=this,i=this.image,n=this.imageData;if(ui(i,jt({width:n.width,height:n.height,marginLeft:n.x,marginTop:n.y},Ks(n))),e)if((this.viewing||this.moving||this.rotating||this.scaling||this.zooming)&&this.options.transition&&Dn(i,pt)){var r=function(){t.imageRendering=!1,e()};this.imageRendering={abort:function(){st(i,hi,r)}},Re(i,hi,r,{once:!0})}else e()},resetImage:function(){var e=this.image;e&&(this.viewing&&this.viewing.abort(),e.parentNode.removeChild(e),this.image=null,this.title.innerHTML="")}},pf={bind:function(){var e=this.options,t=this.viewer,i=this.canvas,n=this.element.ownerDocument;Re(t,Fn,this.onClick=this.click.bind(this)),Re(t,Rl,this.onDragStart=this.dragstart.bind(this)),Re(i,Ql,this.onPointerDown=this.pointerdown.bind(this)),Re(n,Nl,this.onPointerMove=this.pointermove.bind(this)),Re(n,Ll,this.onPointerUp=this.pointerup.bind(this)),Re(n,Dl,this.onKeyDown=this.keydown.bind(this)),Re(window,Pl,this.onResize=this.resize.bind(this)),e.zoomable&&e.zoomOnWheel&&Re(t,Vl,this.onWheel=this.wheel.bind(this),{passive:!1,capture:!0}),e.toggleOnDblclick&&Re(i,fa,this.onDblclick=this.dblclick.bind(this))},unbind:function(){var e=this.options,t=this.viewer,i=this.canvas,n=this.element.ownerDocument;st(t,Fn,this.onClick),st(t,Rl,this.onDragStart),st(i,Ql,this.onPointerDown),st(n,Nl,this.onPointerMove),st(n,Ll,this.onPointerUp),st(n,Dl,this.onKeyDown),st(window,Pl,this.onResize),e.zoomable&&e.zoomOnWheel&&st(t,Vl,this.onWheel,{passive:!1,capture:!0}),e.toggleOnDblclick&&st(i,fa,this.onDblclick)}},mf={click:function(e){var t=this.options,i=this.imageData,n=e.target,r=Qn(n,Xs);switch(!r&&n.localName==="img"&&n.parentElement.localName==="li"&&(n=n.parentElement,r=Qn(n,Xs)),Un&&e.isTrusted&&n===this.canvas&&clearTimeout(this.clickCanvasTimeout),r){case"mix":this.played?this.stop():t.inline?this.fulled?this.exit():this.full():this.hide();break;case"hide":this.pointerMoved||this.hide();break;case"view":this.view(Qn(n,"index"));break;case"zoom-in":this.zoom(.1,!0);break;case"zoom-out":this.zoom(-.1,!0);break;case"one-to-one":this.toggle();break;case"reset":this.reset();break;case"prev":this.prev(t.loop);break;case"play":this.play(t.fullscreen);break;case"next":this.next(t.loop);break;case"rotate-left":this.rotate(-90);break;case"rotate-right":this.rotate(90);break;case"flip-horizontal":this.scaleX(-i.scaleX||-1);break;case"flip-vertical":this.scaleY(-i.scaleY||-1);break;default:this.played&&this.stop()}},dblclick:function(e){e.preventDefault(),this.viewed&&e.target===this.image&&(Un&&e.isTrusted&&clearTimeout(this.doubleClickImageTimeout),this.toggle(e.isTrusted?e:e.detail&&e.detail.originalEvent))},load:function(){var e=this;this.timeout&&(clearTimeout(this.timeout),this.timeout=!1);var t=this.element,i=this.options,n=this.image,r=this.index,a=this.viewerData;je(n,vs),i.loading&&je(this.canvas,Mn),n.style.cssText="height:0;"+"margin-left:".concat(a.width/2,"px;")+"margin-top:".concat(a.height/2,"px;")+"max-width:none!important;position:relative;width:0;",this.initImage(function(){Ss(n,$u,i.movable),Ss(n,pt,i.transition),e.renderImage(function(){e.viewed=!0,e.viewing=!1,nt(i.viewed)&&Re(t,As,i.viewed,{once:!0}),At(t,As,{originalImage:e.images[r],index:r,image:n},{cancelable:!1})})})},loadImage:function(e){var t=e.target,i=t.parentNode,n=i.offsetWidth||30,r=i.offsetHeight||50,a=!!Qn(t,"filled");nc(t,this.options,function(o,c){var l=o/c,d=n,h=r;r*l>n?a?d=r*l:h=n/l:a?h=n/l:d=r*l,ui(t,jt({width:d,height:h},Ks({translateX:(n-d)/2,translateY:(r-h)/2})))})},keydown:function(e){var t=this.options;if(t.keyboard){var i=e.keyCode||e.which||e.charCode;switch(i){case 13:this.viewer.contains(e.target)&&this.click(e);break}if(this.fulled)switch(i){case 27:this.played?this.stop():t.inline?this.fulled&&this.exit():this.hide();break;case 32:this.played&&this.stop();break;case 37:this.played&&this.playing?this.playing.prev():this.prev(t.loop);break;case 38:e.preventDefault(),this.zoom(t.zoomRatio,!0);break;case 39:this.played&&this.playing?this.playing.next():this.next(t.loop);break;case 40:e.preventDefault(),this.zoom(-t.zoomRatio,!0);break;case 48:case 49:e.ctrlKey&&(e.preventDefault(),this.toggle());break}}},dragstart:function(e){e.target.localName==="img"&&e.preventDefault()},pointerdown:function(e){var t=this.options,i=this.pointers,n=e.buttons,r=e.button;if(this.pointerMoved=!1,!(!this.viewed||this.showing||this.viewing||this.hiding||(e.type==="mousedown"||e.type==="pointerdown"&&e.pointerType==="mouse")&&(ht(n)&&n!==1||ht(r)&&r!==0||e.ctrlKey))){e.preventDefault(),e.changedTouches?rt(e.changedTouches,function(o){i[o.identifier]=qs(o)}):i[e.pointerId||0]=qs(e);var a=t.movable?Hs:!1;t.zoomOnTouch&&t.zoomable&&Object.keys(i).length>1?a=gs:t.slideOnTouch&&(e.pointerType==="touch"||e.type==="touchstart")&&this.isSwitchable()&&(a=Tl),t.transition&&(a===Hs||a===gs)&&je(this.image,pt),this.action=a}},pointermove:function(e){var t=this.pointers,i=this.action;!this.viewed||!i||(e.preventDefault(),e.changedTouches?rt(e.changedTouches,function(n){jt(t[n.identifier]||{},qs(n,!0))}):jt(t[e.pointerId||0]||{},qs(e,!0)),this.change(e))},pointerup:function(e){var t=this,i=this.options,n=this.action,r=this.pointers,a;e.changedTouches?rt(e.changedTouches,function(o){a=r[o.identifier],delete r[o.identifier]}):(a=r[e.pointerId||0],delete r[e.pointerId||0]),n&&(e.preventDefault(),i.transition&&(n===Hs||n===gs)&&Me(this.image,pt),this.action=!1,Un&&n!==gs&&a&&Date.now()-a.timeStamp<500&&(clearTimeout(this.clickCanvasTimeout),clearTimeout(this.doubleClickImageTimeout),i.toggleOnDblclick&&this.viewed&&e.target===this.image?this.imageClicked?(this.imageClicked=!1,this.doubleClickImageTimeout=setTimeout(function(){At(t.image,fa,{originalEvent:e})},50)):(this.imageClicked=!0,this.doubleClickImageTimeout=setTimeout(function(){t.imageClicked=!1},500)):(this.imageClicked=!1,i.backdrop&&i.backdrop!=="static"&&e.target===this.canvas&&(this.clickCanvasTimeout=setTimeout(function(){At(t.canvas,Fn,{originalEvent:e})},50)))))},resize:function(){var e=this;if(!(!this.isShown||this.hiding)&&(this.fulled&&(this.close(),this.initBody(),this.open()),this.initContainer(),this.initViewer(),this.renderViewer(),this.renderList(),this.viewed&&this.initImage(function(){e.renderImage()}),this.played)){if(this.options.fullscreen&&this.fulled&&!(document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement)){this.stop();return}rt(this.player.getElementsByTagName("img"),function(t){Re(t,ii,e.loadImage.bind(e),{once:!0}),At(t,ii)})}},wheel:function(e){var t=this;if(this.viewed&&(e.preventDefault(),!this.wheeling)){this.wheeling=!0,setTimeout(function(){t.wheeling=!1},50);var i=Number(this.options.zoomRatio)||.1,n=1;e.deltaY?n=e.deltaY>0?1:-1:e.wheelDelta?n=-e.wheelDelta/120:e.detail&&(n=e.detail>0?1:-1),this.zoom(-n*i,!0,null,e)}}},gf={show:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1,t=this.element,i=this.options;if(i.inline||this.showing||this.isShown||this.showing)return this;if(!this.ready)return this.build(),this.ready&&this.show(e),this;if(nt(i.show)&&Re(t,Ol,i.show,{once:!0}),At(t,Ol)===!1||!this.ready)return this;this.hiding&&this.transitioning.abort(),this.showing=!0,this.open();var n=this.viewer;if(je(n,rn),n.setAttribute("role","dialog"),n.setAttribute("aria-labelledby",this.title.id),n.setAttribute("aria-modal",!0),n.removeAttribute("aria-hidden"),i.transition&&!e){var r=this.shown.bind(this);this.transitioning={abort:function(){st(n,hi,r),je(n,ti)}},Me(n,pt),n.initialOffsetWidth=n.offsetWidth,Re(n,hi,r,{once:!0}),Me(n,ti)}else Me(n,ti),this.shown();return this},hide:function(){var e=this,t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1,i=this.element,n=this.options;if(n.inline||this.hiding||!(this.isShown||this.showing))return this;if(nt(n.hide)&&Re(i,Wl,n.hide,{once:!0}),At(i,Wl)===!1)return this;this.showing&&this.transitioning.abort(),this.hiding=!0,this.played?this.stop():this.viewing&&this.viewing.abort();var r=this.viewer,a=this.image,o=function(){je(r,ti),e.hidden()};if(n.transition&&!t){var c=function(h){h&&h.target===r&&(st(r,hi,c),e.hidden())},l=function(){Dn(r,pt)?(Re(r,hi,c),je(r,ti)):o()};this.transitioning={abort:function(){e.viewed&&Dn(a,pt)?st(a,hi,l):Dn(r,pt)&&st(r,hi,c)}},this.viewed&&Dn(a,pt)?(Re(a,hi,l,{once:!0}),this.zoomTo(0,!1,null,null,!0)):l()}else o();return this},view:function(){var e=this,t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:this.options.initialViewIndex;if(t=Number(t)||0,this.hiding||this.played||t<0||t>=this.length||this.viewed&&t===this.index)return this;if(!this.isShown)return this.index=t,this.show();this.viewing&&this.viewing.abort();var i=this.element,n=this.options,r=this.title,a=this.canvas,o=this.items[t],c=o.querySelector("img"),l=Qn(c,"originalUrl"),d=c.getAttribute("alt"),h=document.createElement("img");if(rt(n.inheritedAttributes,function(m){var f=c.getAttribute(m);f!==null&&h.setAttribute(m,f)}),h.src=l,h.alt=d,nt(n.view)&&Re(i,Hl,n.view,{once:!0}),At(i,Hl,{originalImage:this.images[t],index:t,image:h})===!1||!this.isShown||this.hiding||this.played)return this;var u=this.items[this.index];u&&(je(u,Js),u.removeAttribute("aria-selected")),Me(o,Js),o.setAttribute("aria-selected",!0),n.focus&&o.focus(),this.image=h,this.viewed=!1,this.index=t,this.imageData={},Me(h,vs),n.loading&&Me(a,Mn),a.innerHTML="",a.appendChild(h),this.renderList(),r.innerHTML="";var p=function(){var f=e.imageData,A=Array.isArray(n.title)?n.title[1]:n.title;r.innerHTML=of(nt(A)?A.call(e,h,f):"".concat(d," (").concat(f.naturalWidth," × ").concat(f.naturalHeight,")"))},g,v;return Re(i,As,p,{once:!0}),this.viewing={abort:function(){st(i,As,p),h.complete?e.imageRendering?e.imageRendering.abort():e.imageInitializing&&e.imageInitializing.abort():(h.src="",st(h,ii,g),e.timeout&&clearTimeout(e.timeout))}},h.complete?this.load():(Re(h,ii,g=function(){st(h,an,v),e.load()},{once:!0}),Re(h,an,v=function(){st(h,ii,g),e.timeout&&(clearTimeout(e.timeout),e.timeout=!1),je(h,vs),n.loading&&je(e.canvas,Mn)},{once:!0}),this.timeout&&clearTimeout(this.timeout),this.timeout=setTimeout(function(){je(h,vs),e.timeout=!1},1e3)),this},prev:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1,t=this.index-1;return t<0&&(t=e?this.length-1:0),this.view(t),this},next:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1,t=this.length-1,i=this.index+1;return i>t&&(i=e?0:t),this.view(i),this},move:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e,i=this.imageData;return this.moveTo(In(e)?e:i.x+Number(e),In(t)?t:i.y+Number(t)),this},moveTo:function(e){var t=this,i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e,n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:null,r=this.element,a=this.options,o=this.imageData;if(e=Number(e),i=Number(i),this.viewed&&!this.played&&a.movable){var c=o.x,l=o.y,d=!1;if(ht(e)?d=!0:e=c,ht(i)?d=!0:i=l,d){if(nt(a.move)&&Re(r,Jl,a.move,{once:!0}),At(r,Jl,{x:e,y:i,oldX:c,oldY:l,originalEvent:n})===!1)return this;o.x=e,o.y=i,o.left=e,o.top=i,this.moving=!0,this.renderImage(function(){t.moving=!1,nt(a.moved)&&Re(r,Zl,a.moved,{once:!0}),At(r,Zl,{x:e,y:i,oldX:c,oldY:l,originalEvent:n},{cancelable:!1})})}}return this},rotate:function(e){return this.rotateTo((this.imageData.rotate||0)+Number(e)),this},rotateTo:function(e){var t=this,i=this.element,n=this.options,r=this.imageData;if(e=Number(e),ht(e)&&this.viewed&&!this.played&&n.rotatable){var a=r.rotate;if(nt(n.rotate)&&Re(i,Xl,n.rotate,{once:!0}),At(i,Xl,{degree:e,oldDegree:a})===!1)return this;r.rotate=e,this.rotating=!0,this.renderImage(function(){t.rotating=!1,nt(n.rotated)&&Re(i,Yl,n.rotated,{once:!0}),At(i,Yl,{degree:e,oldDegree:a},{cancelable:!1})})}return this},scaleX:function(e){return this.scale(e,this.imageData.scaleY),this},scaleY:function(e){return this.scale(this.imageData.scaleX,e),this},scale:function(e){var t=this,i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e,n=this.element,r=this.options,a=this.imageData;if(e=Number(e),i=Number(i),this.viewed&&!this.played&&r.scalable){var o=a.scaleX,c=a.scaleY,l=!1;if(ht(e)?l=!0:e=o,ht(i)?l=!0:i=c,l){if(nt(r.scale)&&Re(n,Kl,r.scale,{once:!0}),At(n,Kl,{scaleX:e,scaleY:i,oldScaleX:o,oldScaleY:c})===!1)return this;a.scaleX=e,a.scaleY=i,this.scaling=!0,this.renderImage(function(){t.scaling=!1,nt(r.scaled)&&Re(n,jl,r.scaled,{once:!0}),At(n,jl,{scaleX:e,scaleY:i,oldScaleX:o,oldScaleY:c},{cancelable:!1})})}}return this},zoom:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:null,n=arguments.length>3&&arguments[3]!==void 0?arguments[3]:null,r=this.imageData;return e=Number(e),e<0?e=1/(1-e):e=1+e,this.zoomTo(r.width*e/r.naturalWidth,t,i,n),this},zoomTo:function(e){var t=this,i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:null,r=arguments.length>3&&arguments[3]!==void 0?arguments[3]:null,a=arguments.length>4&&arguments[4]!==void 0?arguments[4]:!1,o=this.element,c=this.options,l=this.pointers,d=this.imageData,h=d.x,u=d.y,p=d.width,g=d.height,v=d.naturalWidth,m=d.naturalHeight;if(e=Math.max(0,e),ht(e)&&this.viewed&&!this.played&&(a||c.zoomable)){if(!a){var f=Math.max(.01,c.minZoomRatio),A=Math.min(100,c.maxZoomRatio);e=Math.min(Math.max(e,f),A)}if(r)switch(r.type){case"wheel":c.zoomRatio>=.055&&e>.95&&e<1.05&&(e=1);break;case"pointermove":case"touchmove":case"mousemove":e>.99&&e<1.01&&(e=1);break}var _=v*e,S=m*e,C=_-p,y=S-g,U=d.ratio;if(nt(c.zoom)&&Re(o,ql,c.zoom,{once:!0}),At(o,ql,{ratio:e,oldRatio:U,originalEvent:r})===!1)return this;if(this.zooming=!0,r){var I=cf(this.viewer),x=l&&Object.keys(l).length>0?uf(l):{pageX:r.pageX,pageY:r.pageY};d.x-=C*((x.pageX-I.left-h)/p),d.y-=y*((x.pageY-I.top-u)/g)}else Bn(n)&&ht(n.x)&&ht(n.y)?(d.x-=C*((n.x-h)/p),d.y-=y*((n.y-u)/g)):(d.x-=C/2,d.y-=y/2);d.left=d.x,d.top=d.y,d.width=_,d.height=S,d.oldRatio=U,d.ratio=e,this.renderImage(function(){t.zooming=!1,nt(c.zoomed)&&Re(o,$l,c.zoomed,{once:!0}),At(o,$l,{ratio:e,oldRatio:U,originalEvent:r},{cancelable:!1})}),i&&this.tooltip()}return this},play:function(){var e=this,t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1;if(!this.isShown||this.played)return this;var i=this.element,n=this.options;if(nt(n.play)&&Re(i,ec,n.play,{once:!0}),At(i,ec)===!1)return this;var r=this.player,a=this.loadImage.bind(this),o=[],c=0,l=0;if(this.played=!0,this.onLoadWhenPlay=a,t&&this.requestFullscreen(t),Me(r,Tn),rt(this.items,function(u,p){var g=u.querySelector("img"),v=document.createElement("img");v.src=Qn(g,"originalUrl"),v.alt=g.getAttribute("alt"),v.referrerPolicy=g.referrerPolicy,c+=1,Me(v,Zs),Ss(v,pt,n.transition),Dn(u,Js)&&(Me(v,ti),l=p),o.push(v),Re(v,ii,a,{once:!0}),r.appendChild(v)}),ht(n.interval)&&n.interval>0){var d=function(){clearTimeout(e.playing.timeout),je(o[l],ti),l-=1,l=l>=0?l:c-1,Me(o[l],ti),e.playing.timeout=setTimeout(d,n.interval)},h=function(){clearTimeout(e.playing.timeout),je(o[l],ti),l+=1,l=l<c?l:0,Me(o[l],ti),e.playing.timeout=setTimeout(h,n.interval)};c>1&&(this.playing={prev:d,next:h,timeout:setTimeout(h,n.interval)})}return this},stop:function(){var e=this;if(!this.played)return this;var t=this.element,i=this.options;if(nt(i.stop)&&Re(t,tc,i.stop,{once:!0}),At(t,tc)===!1)return this;var n=this.player;return clearTimeout(this.playing.timeout),this.playing=!1,this.played=!1,rt(n.getElementsByTagName("img"),function(r){st(r,ii,e.onLoadWhenPlay)}),je(n,Tn),n.innerHTML="",this.exitFullscreen(),this},full:function(){var e=this,t=this.options,i=this.viewer,n=this.image,r=this.list;return!this.isShown||this.played||this.fulled||!t.inline?this:(this.fulled=!0,this.open(),Me(this.button,Fl),t.transition&&(je(r,pt),this.viewed&&je(n,pt)),Me(i,ua),i.setAttribute("role","dialog"),i.setAttribute("aria-labelledby",this.title.id),i.setAttribute("aria-modal",!0),i.removeAttribute("style"),ui(i,{zIndex:t.zIndex}),t.focus&&this.enforceFocus(),this.initContainer(),this.viewerData=jt({},this.containerData),this.renderList(),this.viewed&&this.initImage(function(){e.renderImage(function(){t.transition&&setTimeout(function(){Me(n,pt),Me(r,pt)},0)})}),this)},exit:function(){var e=this,t=this.options,i=this.viewer,n=this.image,r=this.list;return!this.isShown||this.played||!this.fulled||!t.inline?this:(this.fulled=!1,this.close(),je(this.button,Fl),t.transition&&(je(r,pt),this.viewed&&je(n,pt)),t.focus&&this.clearEnforceFocus(),i.removeAttribute("role"),i.removeAttribute("aria-labelledby"),i.removeAttribute("aria-modal"),je(i,ua),ui(i,{zIndex:t.zIndexInline}),this.viewerData=jt({},this.parentData),this.renderViewer(),this.renderList(),this.viewed&&this.initImage(function(){e.renderImage(function(){t.transition&&setTimeout(function(){Me(n,pt),Me(r,pt)},0)})}),this)},tooltip:function(){var e=this,t=this.options,i=this.tooltipBox,n=this.imageData;return!this.viewed||this.played||!t.tooltip?this:(i.textContent="".concat(Math.round(n.ratio*100),"%"),this.tooltipping?clearTimeout(this.tooltipping):t.transition?(this.fading&&At(i,hi),Me(i,Tn),Me(i,Zs),Me(i,pt),i.removeAttribute("aria-hidden"),i.initialOffsetWidth=i.offsetWidth,Me(i,ti)):(Me(i,Tn),i.removeAttribute("aria-hidden")),this.tooltipping=setTimeout(function(){t.transition?(Re(i,hi,function(){je(i,Tn),je(i,Zs),je(i,pt),i.setAttribute("aria-hidden",!0),e.fading=!1},{once:!0}),je(i,ti),e.fading=!0):(je(i,Tn),i.setAttribute("aria-hidden",!0)),e.tooltipping=!1},1e3),this)},toggle:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:null;return this.imageData.ratio===1?this.zoomTo(this.imageData.oldRatio,!0,null,e):this.zoomTo(1,!0,null,e),this},reset:function(){return this.viewed&&!this.played&&(this.imageData=jt({},this.initialImageData),this.renderImage()),this},update:function(){var e=this,t=this.element,i=this.options,n=this.isImg;if(n&&!t.parentNode)return this.destroy();var r=[];if(rt(n?[t]:t.querySelectorAll("img"),function(l){nt(i.filter)?i.filter.call(e,l)&&r.push(l):e.getImageURL(l)&&r.push(l)}),!r.length)return this;if(this.images=r,this.length=r.length,this.ready){var a=[];if(rt(this.items,function(l,d){var h=l.querySelector("img"),u=r[d];u&&h?(u.src!==h.src||u.alt!==h.alt)&&a.push(d):a.push(d)}),ui(this.list,{width:"auto"}),this.initList(),this.isShown)if(this.length){if(this.viewed){var o=a.indexOf(this.index);if(o>=0)this.viewed=!1,this.view(Math.max(Math.min(this.index-o,this.length-1),0));else{var c=this.items[this.index];Me(c,Js),c.setAttribute("aria-selected",!0)}}}else this.image=null,this.viewed=!1,this.index=0,this.imageData={},this.canvas.innerHTML="",this.title.innerHTML=""}else this.build();return this},destroy:function(){var e=this.element,t=this.options;return e[Oe]?(this.destroyed=!0,this.ready?(this.played&&this.stop(),t.inline?(this.fulled&&this.exit(),this.unbind()):this.isShown?(this.viewing&&(this.imageRendering?this.imageRendering.abort():this.imageInitializing&&this.imageInitializing.abort()),this.hiding&&this.transitioning.abort(),this.hidden()):this.showing&&(this.transitioning.abort(),this.hidden()),this.ready=!1,this.viewer.parentNode.removeChild(this.viewer)):t.inline&&(this.delaying?this.delaying.abort():this.initializing&&this.initializing.abort()),t.inline||st(e,Fn,this.onStart),e[Oe]=void 0,this):this}},vf={getImageURL:function(e){var t=this.options.url;return _s(t)?t=e.getAttribute(t):nt(t)?t=t.call(this,e):t="",t},enforceFocus:function(){var e=this;this.clearEnforceFocus(),Re(document,Bl,this.onFocusin=function(t){var i=e.viewer,n=t.target;if(!(n===document||n===i||i.contains(n))){for(;n;){if(n.getAttribute("tabindex")!==null||n.getAttribute("aria-modal")==="true")return;n=n.parentElement}i.focus()}})},clearEnforceFocus:function(){this.onFocusin&&(st(document,Bl,this.onFocusin),this.onFocusin=null)},open:function(){var e=this.body;Me(e,Il),this.scrollbarWidth>0&&(e.style.paddingRight="".concat(this.scrollbarWidth+(parseFloat(this.initialBodyComputedPaddingRight)||0),"px"))},close:function(){var e=this.body;je(e,Il),this.scrollbarWidth>0&&(e.style.paddingRight=this.initialBodyPaddingRight)},shown:function(){var e=this.element,t=this.options,i=this.viewer;this.fulled=!0,this.isShown=!0,this.render(),this.bind(),this.showing=!1,t.focus&&(i.focus(),this.enforceFocus()),nt(t.shown)&&Re(e,zl,t.shown,{once:!0}),At(e,zl)!==!1&&this.ready&&this.isShown&&!this.hiding&&this.view(this.index)},hidden:function(){var e=this.element,t=this.options,i=this.viewer;t.fucus&&this.clearEnforceFocus(),this.close(),this.unbind(),Me(i,rn),i.removeAttribute("role"),i.removeAttribute("aria-labelledby"),i.removeAttribute("aria-modal"),i.setAttribute("aria-hidden",!0),this.resetList(),this.resetImage(),this.fulled=!1,this.viewed=!1,this.isShown=!1,this.hiding=!1,this.destroyed||(nt(t.hidden)&&Re(e,Gl,t.hidden,{once:!0}),At(e,Gl,null,{cancelable:!1}))},requestFullscreen:function(e){var t=this.element.ownerDocument;if(this.fulled&&!(t.fullscreenElement||t.webkitFullscreenElement||t.mozFullScreenElement||t.msFullscreenElement)){var i=t.documentElement;i.requestFullscreen?Bn(e)?i.requestFullscreen(e):i.requestFullscreen():i.webkitRequestFullscreen?i.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT):i.mozRequestFullScreen?i.mozRequestFullScreen():i.msRequestFullscreen&&i.msRequestFullscreen()}},exitFullscreen:function(){var e=this.element.ownerDocument;this.fulled&&(e.fullscreenElement||e.webkitFullscreenElement||e.mozFullScreenElement||e.msFullscreenElement)&&(e.exitFullscreen?e.exitFullscreen():e.webkitExitFullscreen?e.webkitExitFullscreen():e.mozCancelFullScreen?e.mozCancelFullScreen():e.msExitFullscreen&&e.msExitFullscreen())},change:function(e){var t=this.options,i=this.pointers,n=i[Object.keys(i)[0]];if(n){var r=n.endX-n.startX,a=n.endY-n.startY;switch(this.action){case Hs:(r!==0||a!==0)&&(this.pointerMoved=!0,this.move(r,a,e));break;case gs:this.zoom(hf(i),!1,null,e);break;case Tl:{this.action="switched";var o=Math.abs(r);o>1&&o>Math.abs(a)&&(this.pointers={},r>1?this.prev(t.loop):r<-1&&this.next(t.loop));break}}rt(i,function(c){c.startX=c.endX,c.startY=c.endY})}},isSwitchable:function(){var e=this.imageData,t=this.viewerData;return this.length>1&&e.x>=0&&e.y>=0&&e.width<=t.width&&e.height<=t.height}},Af=Ui.Viewer,_f=(function(s){return function(){return s+=1,s}})(-1),Aa=(function(){function s(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(Wu(this,s),!e||e.nodeType!==1)throw new Error("The first argument is required and must be an element.");this.element=e,this.options=jt({},Ml,Bn(t)&&t),this.action=!1,this.fading=!1,this.fulled=!1,this.hiding=!1,this.imageClicked=!1,this.imageData={},this.index=this.options.initialViewIndex,this.isImg=!1,this.isShown=!1,this.length=0,this.moving=!1,this.played=!1,this.playing=!1,this.pointers={},this.ready=!1,this.rotating=!1,this.scaling=!1,this.showing=!1,this.timeout=!1,this.tooltipping=!1,this.viewed=!1,this.viewing=!1,this.wheeling=!1,this.zooming=!1,this.pointerMoved=!1,this.id=_f(),this.init()}return Gu(s,[{key:"init",value:function(){var t=this,i=this.element,n=this.options;if(!i[Oe]){i[Oe]=this,n.focus&&!n.keyboard&&(n.focus=!1);var r=i.localName==="img",a=[];if(rt(r?[i]:i.querySelectorAll("img"),function(l){nt(n.filter)?n.filter.call(t,l)&&a.push(l):t.getImageURL(l)&&a.push(l)}),this.isImg=r,this.length=a.length,this.images=a,this.initBody(),In(document.createElement(Oe).style.transition)&&(n.transition=!1),n.inline){var o=0,c=function(){if(o+=1,o===t.length){var d;t.initializing=!1,t.delaying={abort:function(){clearTimeout(d)}},d=setTimeout(function(){t.delaying=!1,t.build()},0)}};this.initializing={abort:function(){rt(a,function(d){d.complete||(st(d,ii,c),st(d,an,c))})}},rt(a,function(l){if(l.complete)c();else{var d,h;Re(l,ii,d=function(){st(l,an,h),c()},{once:!0}),Re(l,an,h=function(){st(l,ii,d),c()},{once:!0})}})}else Re(i,Fn,this.onStart=function(l){var d=l.target;d.localName==="img"&&(!nt(n.filter)||n.filter.call(t,d))&&t.view(t.images.indexOf(d))})}}},{key:"build",value:function(){if(!this.ready){var t=this.element,i=this.options,n=t.parentNode,r=document.createElement("div");r.innerHTML=Zu;var a=r.querySelector(".".concat(Oe,"-container")),o=a.querySelector(".".concat(Oe,"-title")),c=a.querySelector(".".concat(Oe,"-toolbar")),l=a.querySelector(".".concat(Oe,"-navbar")),d=a.querySelector(".".concat(Oe,"-button")),h=a.querySelector(".".concat(Oe,"-canvas"));if(this.parent=n,this.viewer=a,this.title=o,this.toolbar=c,this.navbar=l,this.button=d,this.canvas=h,this.footer=a.querySelector(".".concat(Oe,"-footer")),this.tooltipBox=a.querySelector(".".concat(Oe,"-tooltip")),this.player=a.querySelector(".".concat(Oe,"-player")),this.list=a.querySelector(".".concat(Oe,"-list")),a.id="".concat(Oe).concat(this.id),o.id="".concat(Oe,"Title").concat(this.id),Me(o,i.title?js(Array.isArray(i.title)?i.title[0]:i.title):rn),Me(l,i.navbar?js(i.navbar):rn),Ss(d,rn,!i.button),i.keyboard&&d.setAttribute("tabindex",0),i.backdrop&&(Me(a,"".concat(Oe,"-backdrop")),!i.inline&&i.backdrop!=="static"&&ga(h,Xs,"hide")),_s(i.className)&&i.className&&i.className.split(pa).forEach(function(_){Me(a,_)}),i.toolbar){var u=document.createElement("ul"),p=Bn(i.toolbar),g=Ys.slice(0,3),v=Ys.slice(7,9),m=Ys.slice(9);p||Me(c,js(i.toolbar)),rt(p?i.toolbar:Ys,function(_,S){var C=p&&Bn(_),y=p?ma(S):_,U=C&&!In(_.show)?_.show:_;if(!(!U||!i.zoomable&&g.indexOf(y)!==-1||!i.rotatable&&v.indexOf(y)!==-1||!i.scalable&&m.indexOf(y)!==-1)){var I=C&&!In(_.size)?_.size:_,x=C&&!In(_.click)?_.click:_,E=document.createElement("li");i.keyboard&&E.setAttribute("tabindex",0),E.setAttribute("role","button"),Me(E,"".concat(Oe,"-").concat(y)),nt(x)||ga(E,Xs,y),ht(U)&&Me(E,js(U)),["small","large"].indexOf(I)!==-1?Me(E,"".concat(Oe,"-").concat(I)):y==="play"&&Me(E,"".concat(Oe,"-large")),nt(x)&&Re(E,Fn,x),u.appendChild(E)}}),c.appendChild(u)}else Me(c,rn);if(!i.rotatable){var f=c.querySelectorAll('li[class*="rotate"]');Me(f,vs),rt(f,function(_){c.appendChild(_)})}if(i.inline)Me(d,Yu),ui(a,{zIndex:i.zIndexInline}),window.getComputedStyle(n).position==="static"&&ui(n,{position:"relative"}),n.insertBefore(a,t.nextSibling);else{Me(d,Xu),Me(a,ua),Me(a,Zs),Me(a,rn),ui(a,{zIndex:i.zIndex});var A=i.container;_s(A)&&(A=t.ownerDocument.querySelector(A)),A||(A=this.body),A.appendChild(a)}if(i.inline&&(this.render(),this.bind(),this.isShown=!0),this.ready=!0,nt(i.ready)&&Re(t,kl,i.ready,{once:!0}),At(t,kl)===!1){this.ready=!1;return}this.ready&&i.inline&&this.view(this.index)}}}],[{key:"noConflict",value:function(){return window.Viewer=Af,s}},{key:"setDefaults",value:function(t){jt(Ml,Bn(t)&&t)}}])})();jt(Aa.prototype,ff,pf,mf,gf,vf);const Sf=`/*!
 * Viewer.js v1.11.7
 * https://fengyuanchen.github.io/viewerjs
 *
 * Copyright 2015-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2024-11-24T04:32:14.526Z
 */.viewer-zoom-in:before,.viewer-zoom-out:before,.viewer-one-to-one:before,.viewer-reset:before,.viewer-prev:before,.viewer-play:before,.viewer-next:before,.viewer-rotate-left:before,.viewer-rotate-right:before,.viewer-flip-horizontal:before,.viewer-flip-vertical:before,.viewer-fullscreen:before,.viewer-fullscreen-exit:before,.viewer-close:before{background-image:url("data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 viewBox%3D%220 0 560 40%22%3E%3Cpath fill%3D%22%23fff%22 d%3D%22M49.6 17.9h20.2v3.9H49.6zm123.1 2 10.9-11 2.7 2.8-8.2 8.2 8.2 8.2-2.7 2.7-10.9-10.9zm94 0-10.8-11-2.7 2.8 8.1 8.2-8.1 8.2 2.7 2.7 10.8-10.9zM212 9.3l20.1 10.6L212 30.5V9.3zm161.5 4.6-7.2 6 7.2 5.9v-4h12.4v4l7.3-5.9-7.3-6v4h-12.4v-4zm40.2 12.3 5.9 7.2 5.9-7.2h-4V13.6h4l-5.9-7.3-5.9 7.3h4v12.6h-4zm35.9-16.5h6.3v2h-4.3V16h-2V9.7Zm14 0h6.2V16h-2v-4.3h-4.2v-2Zm6.2 14V30h-6.2v-2h4.2v-4.3h2Zm-14 6.3h-6.2v-6.3h2v4.4h4.3v2Zm-438 .1v-8.3H9.6v-3.9h8.2V9.7h3.9v8.2h8.1v3.9h-8.1v8.3h-3.9zM93.6 9.7h-5.8v3.9h2V30h3.8V9.7zm16.1 0h-5.8v3.9h1.9V30h3.9V9.7zm-11.9 4.1h3.9v3.9h-3.9zm0 8.2h3.9v3.9h-3.9zm244.6-11.7 7.2 5.9-7.2 6v-3.6c-5.4-.4-7.8.8-8.7 2.8-.8 1.7-1.8 4.9 2.8 8.2-6.3-2-7.5-6.9-6-11.3 1.6-4.4 8-5 11.9-4.9v-3.1Zm147.2 13.4h6.3V30h-2v-4.3h-4.3v-2zm14 6.3v-6.3h6.2v2h-4.3V30h-1.9zm6.2-14h-6.2V9.7h1.9V14h4.3v2zm-13.9 0h-6.3v-2h4.3V9.7h2V16zm33.3 12.5 8.6-8.6-8.6-8.7 1.9-1.9 8.6 8.7 8.6-8.7 1.9 1.9-8.6 8.7 8.6 8.6-1.9 2-8.6-8.7-8.6 8.7-1.9-2zM297 10.3l-7.1 5.9 7.2 6v-3.6c5.3-.4 7.7.8 8.7 2.8.8 1.7 1.7 4.9-2.9 8.2 6.3-2 7.5-6.9 6-11.3-1.6-4.4-7.9-5-11.8-4.9v-3.1Zm-157.3-.6c2.3 0 4.4.7 6 2l2.5-3 1.9 9.2h-9.3l2.6-3.1a6.2 6.2 0 0 0-9.9 5.1c0 3.4 2.8 6.3 6.2 6.3 2.8 0 5.1-1.9 6-4.4h4c-1 4.7-5 8.3-10 8.3a10 10 0 0 1-10-10.2 10 10 0 0 1 10-10.2Z%22%2F%3E%3C%2Fsvg%3E");background-repeat:no-repeat;background-size:280px;color:transparent;display:block;font-size:0;height:20px;line-height:0;width:20px}.viewer-zoom-in:before{background-position:0 0;content:"Zoom In"}.viewer-zoom-out:before{background-position:-20px 0;content:"Zoom Out"}.viewer-one-to-one:before{background-position:-40px 0;content:"One to One"}.viewer-reset:before{background-position:-60px 0;content:"Reset"}.viewer-prev:before{background-position:-80px 0;content:"Previous"}.viewer-play:before{background-position:-100px 0;content:"Play"}.viewer-next:before{background-position:-120px 0;content:"Next"}.viewer-rotate-left:before{background-position:-140px 0;content:"Rotate Left"}.viewer-rotate-right:before{background-position:-160px 0;content:"Rotate Right"}.viewer-flip-horizontal:before{background-position:-180px 0;content:"Flip Horizontal"}.viewer-flip-vertical:before{background-position:-200px 0;content:"Flip Vertical"}.viewer-fullscreen:before{background-position:-220px 0;content:"Enter Full Screen"}.viewer-fullscreen-exit:before{background-position:-240px 0;content:"Exit Full Screen"}.viewer-close:before{background-position:-260px 0;content:"Close"}.viewer-container{bottom:0;direction:ltr;font-size:0;left:0;line-height:0;overflow:hidden;position:absolute;right:0;-webkit-tap-highlight-color:transparent;top:0;-ms-touch-action:none;touch-action:none;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.viewer-container::-moz-selection,.viewer-container *::-moz-selection{background-color:transparent}.viewer-container::selection,.viewer-container *::selection{background-color:transparent}.viewer-container:focus{outline:0}.viewer-container img{display:block;height:auto;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;width:100%}.viewer-canvas{bottom:0;left:0;overflow:hidden;position:absolute;right:0;top:0}.viewer-canvas>img{height:auto;margin:15px auto;max-width:90%!important;width:auto}.viewer-footer{bottom:0;left:0;overflow:hidden;position:absolute;right:0;text-align:center}.viewer-navbar{background-color:#00000080;overflow:hidden}.viewer-list{box-sizing:content-box;height:50px;margin:0;overflow:hidden;padding:1px 0}.viewer-list>li{color:transparent;cursor:pointer;float:left;font-size:0;height:50px;line-height:0;opacity:.5;overflow:hidden;transition:opacity .15s;width:30px}.viewer-list>li:focus,.viewer-list>li:hover{opacity:.75}.viewer-list>li:focus{outline:0}.viewer-list>li+li{margin-left:1px}.viewer-list>.viewer-loading{position:relative}.viewer-list>.viewer-loading:after{border-width:2px;height:20px;margin-left:-10px;margin-top:-10px;width:20px}.viewer-list>.viewer-active,.viewer-list>.viewer-active:focus,.viewer-list>.viewer-active:hover{opacity:1}.viewer-player{background-color:#000;bottom:0;cursor:none;display:none;left:0;position:absolute;right:0;top:0;z-index:1}.viewer-player>img{left:0;position:absolute;top:0}.viewer-toolbar>ul{display:inline-block;margin:0 auto 5px;overflow:hidden;padding:6px 3px}.viewer-toolbar>ul>li{background-color:#00000080;border-radius:50%;cursor:pointer;float:left;height:24px;overflow:hidden;transition:background-color .15s;width:24px}.viewer-toolbar>ul>li:focus,.viewer-toolbar>ul>li:hover{background-color:#000c}.viewer-toolbar>ul>li:focus{box-shadow:0 0 3px #fff;outline:0;position:relative;z-index:1}.viewer-toolbar>ul>li:before{margin:2px}.viewer-toolbar>ul>li+li{margin-left:1px}.viewer-toolbar>ul>.viewer-small{height:18px;margin-bottom:3px;margin-top:3px;width:18px}.viewer-toolbar>ul>.viewer-small:before{margin:-1px}.viewer-toolbar>ul>.viewer-large{height:30px;margin-bottom:-3px;margin-top:-3px;width:30px}.viewer-toolbar>ul>.viewer-large:before{margin:5px}.viewer-tooltip{background-color:#000c;border-radius:10px;color:#fff;display:none;font-size:12px;height:20px;left:50%;line-height:20px;margin-left:-25px;margin-top:-10px;position:absolute;text-align:center;top:50%;width:50px}.viewer-title{color:#ccc;display:inline-block;font-size:12px;line-height:1.2;margin:5px 5%;max-width:90%;min-height:14px;opacity:.8;overflow:hidden;text-overflow:ellipsis;transition:opacity .15s;white-space:nowrap}.viewer-title:hover{opacity:1}.viewer-button{-webkit-app-region:no-drag;background-color:#00000080;border-radius:50%;cursor:pointer;height:80px;overflow:hidden;position:absolute;right:-40px;top:-40px;transition:background-color .15s;width:80px}.viewer-button:focus,.viewer-button:hover{background-color:#000c}.viewer-button:focus{box-shadow:0 0 3px #fff;outline:0}.viewer-button:before{bottom:15px;left:15px;position:absolute}.viewer-fixed{position:fixed}.viewer-open{overflow:hidden}.viewer-show{display:block}.viewer-hide{display:none}.viewer-backdrop{background-color:#00000080}.viewer-invisible{visibility:hidden}.viewer-move{cursor:move;cursor:grab}.viewer-fade{opacity:0}.viewer-in{opacity:1}.viewer-transition{transition:all .3s}@keyframes viewer-spinner{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.viewer-loading:after{animation:viewer-spinner 1s linear infinite;border:4px solid rgba(255,255,255,.1);border-left-color:#ffffff80;border-radius:50%;content:"";display:inline-block;height:40px;left:50%;margin-left:-20px;margin-top:-20px;position:absolute;top:50%;width:40px;z-index:1}@media(max-width:767px){.viewer-hide-xs-down{display:none}}@media(max-width:991px){.viewer-hide-sm-down{display:none}}@media(max-width:1199px){.viewer-hide-md-down{display:none}}`;class sc extends sn{constructor(){super(...arguments);Se(this,"viewer");Se(this,"container");Se(this,"imageUrl","")}doOpen(t){this.imageUrl=t,setTimeout(()=>{if(this.container=this.query("#imageContainer")??void 0,!this.container)return;const i=document.createElement("img");i.src=this.imageUrl,i.style.display="none",this.container.appendChild(i),this.viewer=new Aa(i,{inline:!0,container:this.container,toolbar:{zoomIn:!0,zoomOut:!0,oneToOne:!0,reset:!0,prev:!1,play:!1,next:!1,rotateLeft:!0,rotateRight:!0,flipHorizontal:!0,flipVertical:!0},navbar:!1,title:!1,keyboard:!0,backdrop:!1,button:!1,movable:!0,zoomable:!0,rotatable:!0,scalable:!0,transition:!0,fullscreen:!1,ready:()=>{this.addNavigationListeners()}})},0)}doClose(){this.viewer&&(this.viewer.destroy(),this.viewer=void 0),this.imageUrl=""}getViewerContent(){return`
      <div id="imageContainer">
        ${this.isLoading?'<div class="loading">Loading...</div>':""}
      </div>
    `}getCustomStyles(){return this.css`
      ${Sf}
      
      :host {
        --cc-viewer-z-index-each: 1000;
      }
      
      #imageContainer {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: var(--cc-viewer-z-index-each, 1000);
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      /* ViewerJS inline mode adjustments */
      .viewer-container {
        width: 100% !important;
        height: 100% !important;
        position: relative !important;
      }
      
      .viewer-canvas {
        width: 100% !important;
        height: 100% !important;
      }
      
      /* Hide the original image */
      #imageContainer > img {
        display: none !important;
      }
      
      /* Ensure viewer takes full space */
      .viewer-container.viewer-inline {
        width: 100% !important;
        height: 100% !important;
      }
      
      ${this.getNavigationStyles()}
      
      /* Override viewerjs styles for navigation */
      :host ::ng-deep .viewer-container {
        position: relative;
      }
    `}onAfterRender(){if(!this.isShow||!this.imageUrl||this.viewer||(this.container=this.query("#imageContainer"),!this.container))return;const t=document.createElement("img");t.src=this.imageUrl,t.style.display="none",this.container.appendChild(t),this.viewer=new Aa(t,{inline:!0,container:this.container,toolbar:{zoomIn:!0,zoomOut:!0,oneToOne:!0,reset:!0,prev:!1,play:!1,next:!1,rotateLeft:!0,rotateRight:!0,flipHorizontal:!0,flipVertical:!0},navbar:!1,title:!1,keyboard:!0,backdrop:!1,button:!1,movable:!0,zoomable:!0,rotatable:!0,scalable:!0,transition:!0,fullscreen:!1,ready:()=>{this.isLoading=!1}})}}customElements.get("cc-viewer-image")||customElements.define("cc-viewer-image",sc);class rc extends sn{constructor(){super(...arguments);Se(this,"imgUrl","")}static get observedAttributes(){return["show"]}attributeChangedCallback(t,i,n){t==="show"&&(this.isShow=n==="true"),super.attributeChangedCallback(t,i,n)}doOpen(t){this.imgUrl=t}doClose(){const t=this.query(".iframe");t&&(t.srcdoc=""),this.imgUrl=""}getViewerContent(){return'<iframe class="iframe"></iframe>'}getCustomStyles(){return`
      .iframe {
        width: 100%;
        height: 100%;
        border: 0;
      }
    `}onAfterRender(){if(this.imgUrl&&this.isShow){const t=this.query(".iframe");if(t){const i=`
          <!DOCTYPE html>
          <html>
            <head>
              <title>A-Frame Panorama</title>
              <style>
              html,body {
                width:100%;
                height:100vh;
                overflow: hidden;
              }
              .a-enter-vr, .a-enter-ar {
                display: none;
              }
              </style>
              <script src="https://aframe.io/releases/1.4.0/aframe.min.js"><\/script>
            </head>
            <body>
              <a-scene embedded xr-mode-ui="enabled: false; XRMode: false;">
                <a-sky src="${this.imgUrl}" rotation="0 -90 0"></a-sky>
                <a-entity camera look-controls="reverseMouseDrag: true"></a-entity>
              </a-scene>
            </body>
          </html>
        `;t.srcdoc=i}}}}customElements.get("cc-viewer-panorama")||customElements.define("cc-viewer-panorama",rc);class ac extends sn{constructor(){super(...arguments);Se(this,"videoUrl","")}static get observedAttributes(){return["show"]}attributeChangedCallback(t,i,n){t==="show"&&(this.isShow=n==="true"),super.attributeChangedCallback(t,i,n)}doOpen(t){const i=this.extractYouTubeId(t);i?this.videoUrl=`https://www.youtube.com/embed/${i}`:this.videoUrl=t}extractYouTubeId(t){const i=[/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,/youtube\.com\/watch\?.*v=([^&\n?#]+)/];for(const n of i){const r=t.match(n);if(r)return r[1]}return null}doClose(){const t=this.query(".iframe");t&&(t.src=""),this.videoUrl=""}getViewerContent(){return`<iframe class="iframe" src="${this.videoUrl}" allowfullscreen></iframe>`}getCustomStyles(){return`
      .iframe {
        position: relative;
        width: 100%;
        height: 100%;
        border: 0;
      }
    `}}customElements.get("cc-viewer-youtube")||customElements.define("cc-viewer-youtube",ac);class oc extends sn{constructor(){super(...arguments);Se(this,"videoUrl","");Se(this,"fitToContainer",!1)}static get observedAttributes(){return["show","fit-to-container"]}attributeChangedCallback(t,i,n){t==="show"?this.isShow=n==="true":t==="fit-to-container"&&(this.fitToContainer=n==="true"),super.attributeChangedCallback(t,i,n)}doOpen(t){this.videoUrl=t}doClose(){const t=this.query("video");t&&"pause"in t&&t.pause(),this.videoUrl=""}getViewerContent(){return`
      <div class="video-container">
        ${this.videoUrl?`
          <video
            src="${this.videoUrl}"
            controls
            controlsList="nodownload"
            class="${this.fitToContainer?"fit-to-container":""}"
          >
            Your browser does not support the video tag.
          </video>
        `:'<div class="video-error">No video URL provided</div>'}
      </div>
    `}getCustomStyles(){return`
      .video-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: #000;
      }
      
      video {
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
        outline: none;
      }
      
      video.fit-to-container {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      
      .video-error {
        color: #fff;
        text-align: center;
        padding: 20px;
      }
    `}onAfterRender(){const t=this.query("video");t&&t.addEventListener("error",i=>this.handleVideoError(i))}handleVideoError(t){const i=this.query(".video-container");i&&(i.innerHTML=`
        <div class="video-error">
          Failed to load video: ${this.videoUrl}
        </div>
      `)}}customElements.get("cc-viewer-video")||customElements.define("cc-viewer-video",oc);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const _a="171",Nn={ROTATE:0,DOLLY:1,PAN:2},Ln={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Ef=0,lc=1,xf=2,cc=1,wf=2,Mi=3,Ti=0,zt=1,Fi=2,Hi=0,Pn=1,dc=2,hc=3,uc=4,bf=5,on=100,yf=101,Cf=102,Uf=103,Mf=104,Tf=200,Ff=201,If=202,Rf=203,Sa=204,Ea=205,Bf=206,Df=207,Qf=208,Nf=209,Lf=210,Pf=211,Vf=212,kf=213,Of=214,xa=0,wa=1,ba=2,Vn=3,ya=4,Ca=5,Ua=6,Ma=7,Ta=0,zf=1,Wf=2,Ji=0,Gf=1,Hf=2,Jf=3,Zf=4,Xf=5,Yf=6,Kf=7,fc=300,kn=301,On=302,Fa=303,Ia=304,$s=306,er=1e3,ln=1001,Ra=1002,fi=1003,jf=1004,tr=1005,wi=1006,Ba=1007,cn=1008,Ii=1009,pc=1010,mc=1011,Es=1012,Da=1013,dn=1014,Ri=1015,xs=1016,Qa=1017,Na=1018,zn=1020,gc=35902,vc=1021,Ac=1022,pi=1023,_c=1024,Sc=1025,Wn=1026,Gn=1027,Ec=1028,La=1029,xc=1030,Pa=1031,Va=1033,ir=33776,nr=33777,sr=33778,rr=33779,ka=35840,Oa=35841,za=35842,Wa=35843,Ga=36196,Ha=37492,Ja=37496,Za=37808,Xa=37809,Ya=37810,Ka=37811,ja=37812,qa=37813,$a=37814,eo=37815,to=37816,io=37817,no=37818,so=37819,ro=37820,ao=37821,ar=36492,oo=36494,lo=36495,wc=36283,co=36284,ho=36285,uo=36286,qf=3200,$f=3201,bc=0,ep=1,Zi="",Tt="srgb",Hn="srgb-linear",or="linear",tt="srgb",Jn=7680,yc=519,tp=512,ip=513,np=514,Cc=515,sp=516,rp=517,ap=518,op=519,Uc=35044,Mc="300 es",Bi=2e3,lr=2001;class hn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const n=this._listeners[e];if(n!==void 0){const r=n.indexOf(t);r!==-1&&n.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const n=i.slice(0);for(let r=0,a=n.length;r<a;r++)n[r].call(this,e);e.target=null}}}const It=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],cr=Math.PI/180,fo=180/Math.PI;function ws(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(It[s&255]+It[s>>8&255]+It[s>>16&255]+It[s>>24&255]+"-"+It[e&255]+It[e>>8&255]+"-"+It[e>>16&15|64]+It[e>>24&255]+"-"+It[t&63|128]+It[t>>8&255]+"-"+It[t>>16&255]+It[t>>24&255]+It[i&255]+It[i>>8&255]+It[i>>16&255]+It[i>>24&255]).toLowerCase()}function ze(s,e,t){return Math.max(e,Math.min(t,s))}function lp(s,e){return(s%e+e)%e}function po(s,e,t){return(1-t)*s+t*e}function bs(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Wt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const cp={DEG2RAD:cr};class Qe{constructor(e=0,t=0){Qe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,n=e.elements;return this.x=n[0]*t+n[3]*i+n[6],this.y=n[1]*t+n[4]*i+n[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ze(this.x,e.x,t.x),this.y=ze(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ze(this.x,e,t),this.y=ze(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ze(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),n=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*n+e.x,this.y=r*n+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ne{constructor(e,t,i,n,r,a,o,c,l){Ne.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,n,r,a,o,c,l)}set(e,t,i,n,r,a,o,c,l){const d=this.elements;return d[0]=e,d[1]=n,d[2]=o,d[3]=t,d[4]=r,d[5]=c,d[6]=i,d[7]=a,d[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,n=t.elements,r=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],d=i[4],h=i[7],u=i[2],p=i[5],g=i[8],v=n[0],m=n[3],f=n[6],A=n[1],_=n[4],S=n[7],C=n[2],y=n[5],U=n[8];return r[0]=a*v+o*A+c*C,r[3]=a*m+o*_+c*y,r[6]=a*f+o*S+c*U,r[1]=l*v+d*A+h*C,r[4]=l*m+d*_+h*y,r[7]=l*f+d*S+h*U,r[2]=u*v+p*A+g*C,r[5]=u*m+p*_+g*y,r[8]=u*f+p*S+g*U,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],d=e[8];return t*a*d-t*o*l-i*r*d+i*o*c+n*r*l-n*a*c}invert(){const e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],d=e[8],h=d*a-o*l,u=o*c-d*r,p=l*r-a*c,g=t*h+i*u+n*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=h*v,e[1]=(n*l-d*i)*v,e[2]=(o*i-n*a)*v,e[3]=u*v,e[4]=(d*t-n*c)*v,e[5]=(n*r-o*t)*v,e[6]=p*v,e[7]=(i*c-l*t)*v,e[8]=(a*t-i*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,n,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-n*l,n*c,-n*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(mo.makeScale(e,t)),this}rotate(e){return this.premultiply(mo.makeRotation(-e)),this}translate(e,t){return this.premultiply(mo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let n=0;n<9;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const mo=new Ne;function Tc(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function ys(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function dp(){const s=ys("canvas");return s.style.display="block",s}const Fc={};function Zn(s){s in Fc||(Fc[s]=!0,console.warn(s))}function hp(s,e,t){return new Promise(function(i,n){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:n();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}function up(s){const e=s.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function fp(s){const e=s.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Ic=new Ne().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Rc=new Ne().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function pp(){const s={enabled:!0,workingColorSpace:Hn,spaces:{},convert:function(n,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===tt&&(n.r=Di(n.r),n.g=Di(n.g),n.b=Di(n.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(n.applyMatrix3(this.spaces[r].toXYZ),n.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===tt&&(n.r=Xn(n.r),n.g=Xn(n.g),n.b=Xn(n.b))),n},fromWorkingColorSpace:function(n,r){return this.convert(n,this.workingColorSpace,r)},toWorkingColorSpace:function(n,r){return this.convert(n,r,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Zi?or:this.spaces[n].transfer},getLuminanceCoefficients:function(n,r=this.workingColorSpace){return n.fromArray(this.spaces[r].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,r,a){return n.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return s.define({[Hn]:{primaries:e,whitePoint:i,transfer:or,toXYZ:Ic,fromXYZ:Rc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Tt},outputColorSpaceConfig:{drawingBufferColorSpace:Tt}},[Tt]:{primaries:e,whitePoint:i,transfer:tt,toXYZ:Ic,fromXYZ:Rc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Tt}}}),s}const We=pp();function Di(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Xn(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Yn;class mp{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Yn===void 0&&(Yn=ys("canvas")),Yn.width=e.width,Yn.height=e.height;const i=Yn.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Yn}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ys("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const n=i.getImageData(0,0,e.width,e.height),r=n.data;for(let a=0;a<r.length;a++)r[a]=Di(r[a]/255)*255;return i.putImageData(n,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Di(t[i]/255)*255):t[i]=Di(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let gp=0;class Bc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:gp++}),this.uuid=ws(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let r;if(Array.isArray(n)){r=[];for(let a=0,o=n.length;a<o;a++)n[a].isDataTexture?r.push(go(n[a].image)):r.push(go(n[a]))}else r=go(n);i.url=r}return t||(e.images[this.uuid]=i),i}}function go(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?mp.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let vp=0;class Qt extends hn{constructor(e=Qt.DEFAULT_IMAGE,t=Qt.DEFAULT_MAPPING,i=ln,n=ln,r=wi,a=cn,o=pi,c=Ii,l=Qt.DEFAULT_ANISOTROPY,d=Zi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:vp++}),this.uuid=ws(),this.name="",this.source=new Bc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Qe(0,0),this.repeat=new Qe(1,1),this.center=new Qe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ne,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==fc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case er:e.x=e.x-Math.floor(e.x);break;case ln:e.x=e.x<0?0:1;break;case Ra:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case er:e.y=e.y-Math.floor(e.y);break;case ln:e.y=e.y<0?0:1;break;case Ra:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Qt.DEFAULT_IMAGE=null,Qt.DEFAULT_MAPPING=fc,Qt.DEFAULT_ANISOTROPY=1;class mt{constructor(e=0,t=0,i=0,n=1){mt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=n}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,n){return this.x=e,this.y=t,this.z=i,this.w=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,n=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*n+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*n+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*n+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*n+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,n,r;const c=e.elements,l=c[0],d=c[4],h=c[8],u=c[1],p=c[5],g=c[9],v=c[2],m=c[6],f=c[10];if(Math.abs(d-u)<.01&&Math.abs(h-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+u)<.1&&Math.abs(h+v)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const _=(l+1)/2,S=(p+1)/2,C=(f+1)/2,y=(d+u)/4,U=(h+v)/4,I=(g+m)/4;return _>S&&_>C?_<.01?(i=0,n=.707106781,r=.707106781):(i=Math.sqrt(_),n=y/i,r=U/i):S>C?S<.01?(i=.707106781,n=0,r=.707106781):(n=Math.sqrt(S),i=y/n,r=I/n):C<.01?(i=.707106781,n=.707106781,r=0):(r=Math.sqrt(C),i=U/r,n=I/r),this.set(i,n,r,t),this}let A=Math.sqrt((m-g)*(m-g)+(h-v)*(h-v)+(u-d)*(u-d));return Math.abs(A)<.001&&(A=1),this.x=(m-g)/A,this.y=(h-v)/A,this.z=(u-d)/A,this.w=Math.acos((l+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ze(this.x,e.x,t.x),this.y=ze(this.y,e.y,t.y),this.z=ze(this.z,e.z,t.z),this.w=ze(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ze(this.x,e,t),this.y=ze(this.y,e,t),this.z=ze(this.z,e,t),this.w=ze(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ap extends hn{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new mt(0,0,e,t),this.scissorTest=!1,this.viewport=new mt(0,0,e,t);const n={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:wi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new Qt(n,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let n=0,r=this.textures.length;n<r;n++)this.textures[n].image.width=e,this.textures[n].image.height=t,this.textures[n].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,n=e.textures.length;i<n;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Bc(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class un extends Ap{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Dc extends Qt{constructor(e=null,t=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=fi,this.minFilter=fi,this.wrapR=ln,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class _p extends Qt{constructor(e=null,t=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=fi,this.minFilter=fi,this.wrapR=ln,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class fn{constructor(e=0,t=0,i=0,n=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=n}static slerpFlat(e,t,i,n,r,a,o){let c=i[n+0],l=i[n+1],d=i[n+2],h=i[n+3];const u=r[a+0],p=r[a+1],g=r[a+2],v=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=d,e[t+3]=h;return}if(o===1){e[t+0]=u,e[t+1]=p,e[t+2]=g,e[t+3]=v;return}if(h!==v||c!==u||l!==p||d!==g){let m=1-o;const f=c*u+l*p+d*g+h*v,A=f>=0?1:-1,_=1-f*f;if(_>Number.EPSILON){const C=Math.sqrt(_),y=Math.atan2(C,f*A);m=Math.sin(m*y)/C,o=Math.sin(o*y)/C}const S=o*A;if(c=c*m+u*S,l=l*m+p*S,d=d*m+g*S,h=h*m+v*S,m===1-o){const C=1/Math.sqrt(c*c+l*l+d*d+h*h);c*=C,l*=C,d*=C,h*=C}}e[t]=c,e[t+1]=l,e[t+2]=d,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,n,r,a){const o=i[n],c=i[n+1],l=i[n+2],d=i[n+3],h=r[a],u=r[a+1],p=r[a+2],g=r[a+3];return e[t]=o*g+d*h+c*p-l*u,e[t+1]=c*g+d*u+l*h-o*p,e[t+2]=l*g+d*p+o*u-c*h,e[t+3]=d*g-o*h-c*u-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,n){return this._x=e,this._y=t,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,n=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),d=o(n/2),h=o(r/2),u=c(i/2),p=c(n/2),g=c(r/2);switch(a){case"XYZ":this._x=u*d*h+l*p*g,this._y=l*p*h-u*d*g,this._z=l*d*g+u*p*h,this._w=l*d*h-u*p*g;break;case"YXZ":this._x=u*d*h+l*p*g,this._y=l*p*h-u*d*g,this._z=l*d*g-u*p*h,this._w=l*d*h+u*p*g;break;case"ZXY":this._x=u*d*h-l*p*g,this._y=l*p*h+u*d*g,this._z=l*d*g+u*p*h,this._w=l*d*h-u*p*g;break;case"ZYX":this._x=u*d*h-l*p*g,this._y=l*p*h+u*d*g,this._z=l*d*g-u*p*h,this._w=l*d*h+u*p*g;break;case"YZX":this._x=u*d*h+l*p*g,this._y=l*p*h+u*d*g,this._z=l*d*g-u*p*h,this._w=l*d*h-u*p*g;break;case"XZY":this._x=u*d*h-l*p*g,this._y=l*p*h-u*d*g,this._z=l*d*g+u*p*h,this._w=l*d*h+u*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,n=Math.sin(i);return this._x=e.x*n,this._y=e.y*n,this._z=e.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],n=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],d=t[6],h=t[10],u=i+o+h;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(d-c)*p,this._y=(r-l)*p,this._z=(a-n)*p}else if(i>o&&i>h){const p=2*Math.sqrt(1+i-o-h);this._w=(d-c)/p,this._x=.25*p,this._y=(n+a)/p,this._z=(r+l)/p}else if(o>h){const p=2*Math.sqrt(1+o-i-h);this._w=(r-l)/p,this._x=(n+a)/p,this._y=.25*p,this._z=(c+d)/p}else{const p=2*Math.sqrt(1+h-i-o);this._w=(a-n)/p,this._x=(r+l)/p,this._y=(c+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ze(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const n=Math.min(1,t/i);return this.slerp(e,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,n=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,d=t._w;return this._x=i*d+a*o+n*l-r*c,this._y=n*d+a*c+r*o-i*l,this._z=r*d+a*l+i*c-n*o,this._w=a*d-i*o-n*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,n=this._y,r=this._z,a=this._w;let o=a*e._w+i*e._x+n*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=n,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const p=1-t;return this._w=p*a+t*this._w,this._x=p*i+t*this._x,this._y=p*n+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),d=Math.atan2(l,o),h=Math.sin((1-t)*d)/l,u=Math.sin(t*d)/l;return this._w=a*h+this._w*u,this._x=i*h+this._x*u,this._y=n*h+this._y*u,this._z=r*h+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(n*Math.sin(e),n*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class W{constructor(e=0,t=0,i=0){W.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Qc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Qc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,n=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*n,this.y=r[1]*t+r[4]*i+r[7]*n,this.z=r[2]*t+r[5]*i+r[8]*n,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,n=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*n+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*n+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*n+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*n+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,n=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*n-o*i),d=2*(o*t-r*n),h=2*(r*i-a*t);return this.x=t+c*l+a*h-o*d,this.y=i+c*d+o*l-r*h,this.z=n+c*h+r*d-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,n=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*n,this.y=r[1]*t+r[5]*i+r[9]*n,this.z=r[2]*t+r[6]*i+r[10]*n,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ze(this.x,e.x,t.x),this.y=ze(this.y,e.y,t.y),this.z=ze(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ze(this.x,e,t),this.y=ze(this.y,e,t),this.z=ze(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,n=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=n*c-r*o,this.y=r*a-i*c,this.z=i*o-n*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return vo.copy(this).projectOnVector(e),this.sub(vo)}reflect(e){return this.sub(vo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ze(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,n=this.z-e.z;return t*t+i*i+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const n=Math.sin(t)*e;return this.x=n*Math.sin(i),this.y=Math.cos(t)*e,this.z=n*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),n=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=n,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const vo=new W,Qc=new fn;class Kn{constructor(e=new W(1/0,1/0,1/0),t=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(mi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(mi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=mi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,mi):mi.fromBufferAttribute(r,a),mi.applyMatrix4(e.matrixWorld),this.expandByPoint(mi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),dr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),dr.copy(i.boundingBox)),dr.applyMatrix4(e.matrixWorld),this.union(dr)}const n=e.children;for(let r=0,a=n.length;r<a;r++)this.expandByObject(n[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,mi),mi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Cs),hr.subVectors(this.max,Cs),jn.subVectors(e.a,Cs),qn.subVectors(e.b,Cs),$n.subVectors(e.c,Cs),Xi.subVectors(qn,jn),Yi.subVectors($n,qn),pn.subVectors(jn,$n);let t=[0,-Xi.z,Xi.y,0,-Yi.z,Yi.y,0,-pn.z,pn.y,Xi.z,0,-Xi.x,Yi.z,0,-Yi.x,pn.z,0,-pn.x,-Xi.y,Xi.x,0,-Yi.y,Yi.x,0,-pn.y,pn.x,0];return!Ao(t,jn,qn,$n,hr)||(t=[1,0,0,0,1,0,0,0,1],!Ao(t,jn,qn,$n,hr))?!1:(ur.crossVectors(Xi,Yi),t=[ur.x,ur.y,ur.z],Ao(t,jn,qn,$n,hr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,mi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(mi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Qi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Qi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Qi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Qi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Qi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Qi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Qi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Qi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Qi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Qi=[new W,new W,new W,new W,new W,new W,new W,new W],mi=new W,dr=new Kn,jn=new W,qn=new W,$n=new W,Xi=new W,Yi=new W,pn=new W,Cs=new W,hr=new W,ur=new W,mn=new W;function Ao(s,e,t,i,n){for(let r=0,a=s.length-3;r<=a;r+=3){mn.fromArray(s,r);const o=n.x*Math.abs(mn.x)+n.y*Math.abs(mn.y)+n.z*Math.abs(mn.z),c=e.dot(mn),l=t.dot(mn),d=i.dot(mn);if(Math.max(-Math.max(c,l,d),Math.min(c,l,d))>o)return!1}return!0}const Sp=new Kn,Us=new W,_o=new W;class Ms{constructor(e=new W,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Sp.setFromPoints(e).getCenter(i);let n=0;for(let r=0,a=e.length;r<a;r++)n=Math.max(n,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(n),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Us.subVectors(e,this.center);const t=Us.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),n=(i-this.radius)*.5;this.center.addScaledVector(Us,n/i),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(_o.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Us.copy(e.center).add(_o)),this.expandByPoint(Us.copy(e.center).sub(_o))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ni=new W,So=new W,fr=new W,Ki=new W,Eo=new W,pr=new W,xo=new W;class mr{constructor(e=new W,t=new W(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ni)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Ni.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ni.copy(this.origin).addScaledVector(this.direction,t),Ni.distanceToSquared(e))}distanceSqToSegment(e,t,i,n){So.copy(e).add(t).multiplyScalar(.5),fr.copy(t).sub(e).normalize(),Ki.copy(this.origin).sub(So);const r=e.distanceTo(t)*.5,a=-this.direction.dot(fr),o=Ki.dot(this.direction),c=-Ki.dot(fr),l=Ki.lengthSq(),d=Math.abs(1-a*a);let h,u,p,g;if(d>0)if(h=a*c-o,u=a*o-c,g=r*d,h>=0)if(u>=-g)if(u<=g){const v=1/d;h*=v,u*=v,p=h*(h+a*u+2*o)+u*(a*h+u+2*c)+l}else u=r,h=Math.max(0,-(a*u+o)),p=-h*h+u*(u+2*c)+l;else u=-r,h=Math.max(0,-(a*u+o)),p=-h*h+u*(u+2*c)+l;else u<=-g?(h=Math.max(0,-(-a*r+o)),u=h>0?-r:Math.min(Math.max(-r,-c),r),p=-h*h+u*(u+2*c)+l):u<=g?(h=0,u=Math.min(Math.max(-r,-c),r),p=u*(u+2*c)+l):(h=Math.max(0,-(a*r+o)),u=h>0?r:Math.min(Math.max(-r,-c),r),p=-h*h+u*(u+2*c)+l);else u=a>0?-r:r,h=Math.max(0,-(a*u+o)),p=-h*h+u*(u+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,h),n&&n.copy(So).addScaledVector(fr,u),p}intersectSphere(e,t){Ni.subVectors(e.center,this.origin);const i=Ni.dot(this.direction),n=Ni.dot(Ni)-i*i,r=e.radius*e.radius;if(n>r)return null;const a=Math.sqrt(r-n),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,n,r,a,o,c;const l=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,u=this.origin;return l>=0?(i=(e.min.x-u.x)*l,n=(e.max.x-u.x)*l):(i=(e.max.x-u.x)*l,n=(e.min.x-u.x)*l),d>=0?(r=(e.min.y-u.y)*d,a=(e.max.y-u.y)*d):(r=(e.max.y-u.y)*d,a=(e.min.y-u.y)*d),i>a||r>n||((r>i||isNaN(i))&&(i=r),(a<n||isNaN(n))&&(n=a),h>=0?(o=(e.min.z-u.z)*h,c=(e.max.z-u.z)*h):(o=(e.max.z-u.z)*h,c=(e.min.z-u.z)*h),i>c||o>n)||((o>i||i!==i)&&(i=o),(c<n||n!==n)&&(n=c),n<0)?null:this.at(i>=0?i:n,t)}intersectsBox(e){return this.intersectBox(e,Ni)!==null}intersectTriangle(e,t,i,n,r){Eo.subVectors(t,e),pr.subVectors(i,e),xo.crossVectors(Eo,pr);let a=this.direction.dot(xo),o;if(a>0){if(n)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ki.subVectors(this.origin,e);const c=o*this.direction.dot(pr.crossVectors(Ki,pr));if(c<0)return null;const l=o*this.direction.dot(Eo.cross(Ki));if(l<0||c+l>a)return null;const d=-o*Ki.dot(xo);return d<0?null:this.at(d/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class lt{constructor(e,t,i,n,r,a,o,c,l,d,h,u,p,g,v,m){lt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,n,r,a,o,c,l,d,h,u,p,g,v,m)}set(e,t,i,n,r,a,o,c,l,d,h,u,p,g,v,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=n,f[1]=r,f[5]=a,f[9]=o,f[13]=c,f[2]=l,f[6]=d,f[10]=h,f[14]=u,f[3]=p,f[7]=g,f[11]=v,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new lt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,n=1/es.setFromMatrixColumn(e,0).length(),r=1/es.setFromMatrixColumn(e,1).length(),a=1/es.setFromMatrixColumn(e,2).length();return t[0]=i[0]*n,t[1]=i[1]*n,t[2]=i[2]*n,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,n=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(n),l=Math.sin(n),d=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const u=a*d,p=a*h,g=o*d,v=o*h;t[0]=c*d,t[4]=-c*h,t[8]=l,t[1]=p+g*l,t[5]=u-v*l,t[9]=-o*c,t[2]=v-u*l,t[6]=g+p*l,t[10]=a*c}else if(e.order==="YXZ"){const u=c*d,p=c*h,g=l*d,v=l*h;t[0]=u+v*o,t[4]=g*o-p,t[8]=a*l,t[1]=a*h,t[5]=a*d,t[9]=-o,t[2]=p*o-g,t[6]=v+u*o,t[10]=a*c}else if(e.order==="ZXY"){const u=c*d,p=c*h,g=l*d,v=l*h;t[0]=u-v*o,t[4]=-a*h,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*d,t[9]=v-u*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const u=a*d,p=a*h,g=o*d,v=o*h;t[0]=c*d,t[4]=g*l-p,t[8]=u*l+v,t[1]=c*h,t[5]=v*l+u,t[9]=p*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const u=a*c,p=a*l,g=o*c,v=o*l;t[0]=c*d,t[4]=v-u*h,t[8]=g*h+p,t[1]=h,t[5]=a*d,t[9]=-o*d,t[2]=-l*d,t[6]=p*h+g,t[10]=u-v*h}else if(e.order==="XZY"){const u=a*c,p=a*l,g=o*c,v=o*l;t[0]=c*d,t[4]=-h,t[8]=l*d,t[1]=u*h+v,t[5]=a*d,t[9]=p*h-g,t[2]=g*h-p,t[6]=o*d,t[10]=v*h+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ep,e,xp)}lookAt(e,t,i){const n=this.elements;return qt.subVectors(e,t),qt.lengthSq()===0&&(qt.z=1),qt.normalize(),ji.crossVectors(i,qt),ji.lengthSq()===0&&(Math.abs(i.z)===1?qt.x+=1e-4:qt.z+=1e-4,qt.normalize(),ji.crossVectors(i,qt)),ji.normalize(),gr.crossVectors(qt,ji),n[0]=ji.x,n[4]=gr.x,n[8]=qt.x,n[1]=ji.y,n[5]=gr.y,n[9]=qt.y,n[2]=ji.z,n[6]=gr.z,n[10]=qt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,n=t.elements,r=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],d=i[1],h=i[5],u=i[9],p=i[13],g=i[2],v=i[6],m=i[10],f=i[14],A=i[3],_=i[7],S=i[11],C=i[15],y=n[0],U=n[4],I=n[8],x=n[12],E=n[1],M=n[5],R=n[9],F=n[13],B=n[2],z=n[6],Q=n[10],N=n[14],D=n[3],Z=n[7],$=n[11],ae=n[15];return r[0]=a*y+o*E+c*B+l*D,r[4]=a*U+o*M+c*z+l*Z,r[8]=a*I+o*R+c*Q+l*$,r[12]=a*x+o*F+c*N+l*ae,r[1]=d*y+h*E+u*B+p*D,r[5]=d*U+h*M+u*z+p*Z,r[9]=d*I+h*R+u*Q+p*$,r[13]=d*x+h*F+u*N+p*ae,r[2]=g*y+v*E+m*B+f*D,r[6]=g*U+v*M+m*z+f*Z,r[10]=g*I+v*R+m*Q+f*$,r[14]=g*x+v*F+m*N+f*ae,r[3]=A*y+_*E+S*B+C*D,r[7]=A*U+_*M+S*z+C*Z,r[11]=A*I+_*R+S*Q+C*$,r[15]=A*x+_*F+S*N+C*ae,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],n=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],d=e[2],h=e[6],u=e[10],p=e[14],g=e[3],v=e[7],m=e[11],f=e[15];return g*(+r*c*h-n*l*h-r*o*u+i*l*u+n*o*p-i*c*p)+v*(+t*c*p-t*l*u+r*a*u-n*a*p+n*l*d-r*c*d)+m*(+t*l*h-t*o*p-r*a*h+i*a*p+r*o*d-i*l*d)+f*(-n*o*d-t*c*h+t*o*u+n*a*h-i*a*u+i*c*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const n=this.elements;return e.isVector3?(n[12]=e.x,n[13]=e.y,n[14]=e.z):(n[12]=e,n[13]=t,n[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],d=e[8],h=e[9],u=e[10],p=e[11],g=e[12],v=e[13],m=e[14],f=e[15],A=h*m*l-v*u*l+v*c*p-o*m*p-h*c*f+o*u*f,_=g*u*l-d*m*l-g*c*p+a*m*p+d*c*f-a*u*f,S=d*v*l-g*h*l+g*o*p-a*v*p-d*o*f+a*h*f,C=g*h*c-d*v*c-g*o*u+a*v*u+d*o*m-a*h*m,y=t*A+i*_+n*S+r*C;if(y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/y;return e[0]=A*U,e[1]=(v*u*r-h*m*r-v*n*p+i*m*p+h*n*f-i*u*f)*U,e[2]=(o*m*r-v*c*r+v*n*l-i*m*l-o*n*f+i*c*f)*U,e[3]=(h*c*r-o*u*r-h*n*l+i*u*l+o*n*p-i*c*p)*U,e[4]=_*U,e[5]=(d*m*r-g*u*r+g*n*p-t*m*p-d*n*f+t*u*f)*U,e[6]=(g*c*r-a*m*r-g*n*l+t*m*l+a*n*f-t*c*f)*U,e[7]=(a*u*r-d*c*r+d*n*l-t*u*l-a*n*p+t*c*p)*U,e[8]=S*U,e[9]=(g*h*r-d*v*r-g*i*p+t*v*p+d*i*f-t*h*f)*U,e[10]=(a*v*r-g*o*r+g*i*l-t*v*l-a*i*f+t*o*f)*U,e[11]=(d*o*r-a*h*r-d*i*l+t*h*l+a*i*p-t*o*p)*U,e[12]=C*U,e[13]=(d*v*n-g*h*n+g*i*u-t*v*u-d*i*m+t*h*m)*U,e[14]=(g*o*n-a*v*n-g*i*c+t*v*c+a*i*m-t*o*m)*U,e[15]=(a*h*n-d*o*n+d*i*c-t*h*c-a*i*u+t*o*u)*U,this}scale(e){const t=this.elements,i=e.x,n=e.y,r=e.z;return t[0]*=i,t[4]*=n,t[8]*=r,t[1]*=i,t[5]*=n,t[9]*=r,t[2]*=i,t[6]*=n,t[10]*=r,t[3]*=i,t[7]*=n,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],n=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,n))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),n=Math.sin(t),r=1-i,a=e.x,o=e.y,c=e.z,l=r*a,d=r*o;return this.set(l*a+i,l*o-n*c,l*c+n*o,0,l*o+n*c,d*o+i,d*c-n*a,0,l*c-n*o,d*c+n*a,r*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,n,r,a){return this.set(1,i,r,0,e,1,a,0,t,n,1,0,0,0,0,1),this}compose(e,t,i){const n=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,d=a+a,h=o+o,u=r*l,p=r*d,g=r*h,v=a*d,m=a*h,f=o*h,A=c*l,_=c*d,S=c*h,C=i.x,y=i.y,U=i.z;return n[0]=(1-(v+f))*C,n[1]=(p+S)*C,n[2]=(g-_)*C,n[3]=0,n[4]=(p-S)*y,n[5]=(1-(u+f))*y,n[6]=(m+A)*y,n[7]=0,n[8]=(g+_)*U,n[9]=(m-A)*U,n[10]=(1-(u+v))*U,n[11]=0,n[12]=e.x,n[13]=e.y,n[14]=e.z,n[15]=1,this}decompose(e,t,i){const n=this.elements;let r=es.set(n[0],n[1],n[2]).length();const a=es.set(n[4],n[5],n[6]).length(),o=es.set(n[8],n[9],n[10]).length();this.determinant()<0&&(r=-r),e.x=n[12],e.y=n[13],e.z=n[14],gi.copy(this);const l=1/r,d=1/a,h=1/o;return gi.elements[0]*=l,gi.elements[1]*=l,gi.elements[2]*=l,gi.elements[4]*=d,gi.elements[5]*=d,gi.elements[6]*=d,gi.elements[8]*=h,gi.elements[9]*=h,gi.elements[10]*=h,t.setFromRotationMatrix(gi),i.x=r,i.y=a,i.z=o,this}makePerspective(e,t,i,n,r,a,o=Bi){const c=this.elements,l=2*r/(t-e),d=2*r/(i-n),h=(t+e)/(t-e),u=(i+n)/(i-n);let p,g;if(o===Bi)p=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===lr)p=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,n,r,a,o=Bi){const c=this.elements,l=1/(t-e),d=1/(i-n),h=1/(a-r),u=(t+e)*l,p=(i+n)*d;let g,v;if(o===Bi)g=(a+r)*h,v=-2*h;else if(o===lr)g=r*h,v=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-u,c[1]=0,c[5]=2*d,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=v,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let n=0;n<16;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const es=new W,gi=new lt,Ep=new W(0,0,0),xp=new W(1,1,1),ji=new W,gr=new W,qt=new W,Nc=new lt,Lc=new fn;class bi{constructor(e=0,t=0,i=0,n=bi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=n}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,n=this._order){return this._x=e,this._y=t,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const n=e.elements,r=n[0],a=n[4],o=n[8],c=n[1],l=n[5],d=n[9],h=n[2],u=n[6],p=n[10];switch(t){case"XYZ":this._y=Math.asin(ze(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ze(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(ze(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ze(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(ze(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-ze(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Nc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Nc,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Lc.setFromEuler(this),this.setFromQuaternion(Lc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}bi.DEFAULT_ORDER="XYZ";class Pc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let wp=0;const Vc=new W,ts=new fn,Li=new lt,vr=new W,Ts=new W,bp=new W,yp=new fn,kc=new W(1,0,0),Oc=new W(0,1,0),zc=new W(0,0,1),Wc={type:"added"},Cp={type:"removed"},is={type:"childadded",child:null},wo={type:"childremoved",child:null};class Ct extends hn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:wp++}),this.uuid=ws(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ct.DEFAULT_UP.clone();const e=new W,t=new bi,i=new fn,n=new W(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new lt},normalMatrix:{value:new Ne}}),this.matrix=new lt,this.matrixWorld=new lt,this.matrixAutoUpdate=Ct.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Pc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ts.setFromAxisAngle(e,t),this.quaternion.multiply(ts),this}rotateOnWorldAxis(e,t){return ts.setFromAxisAngle(e,t),this.quaternion.premultiply(ts),this}rotateX(e){return this.rotateOnAxis(kc,e)}rotateY(e){return this.rotateOnAxis(Oc,e)}rotateZ(e){return this.rotateOnAxis(zc,e)}translateOnAxis(e,t){return Vc.copy(e).applyQuaternion(this.quaternion),this.position.add(Vc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(kc,e)}translateY(e){return this.translateOnAxis(Oc,e)}translateZ(e){return this.translateOnAxis(zc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Li.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?vr.copy(e):vr.set(e,t,i);const n=this.parent;this.updateWorldMatrix(!0,!1),Ts.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Li.lookAt(Ts,vr,this.up):Li.lookAt(vr,Ts,this.up),this.quaternion.setFromRotationMatrix(Li),n&&(Li.extractRotation(n.matrixWorld),ts.setFromRotationMatrix(Li),this.quaternion.premultiply(ts.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Wc),is.child=e,this.dispatchEvent(is),is.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Cp),wo.child=e,this.dispatchEvent(wo),wo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Li.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Li.multiply(e.parent.matrixWorld)),e.applyMatrix4(Li),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Wc),is.child=e,this.dispatchEvent(is),is.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,n=this.children.length;i<n;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ts,e,bp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ts,yp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const n={};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.castShadow===!0&&(n.castShadow=!0),this.receiveShadow===!0&&(n.receiveShadow=!0),this.visible===!1&&(n.visible=!1),this.frustumCulled===!1&&(n.frustumCulled=!1),this.renderOrder!==0&&(n.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(n.matrixAutoUpdate=!1),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.visibility=this._visibility,n.active=this._active,n.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.geometryCount=this._geometryCount,n.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(n.boundingSphere={center:n.boundingSphere.center.toArray(),radius:n.boundingSphere.radius}),this.boundingBox!==null&&(n.boundingBox={min:n.boundingBox.min.toArray(),max:n.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,d=c.length;l<d;l++){const h=c[l];r(e.shapes,h)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));n.material=o}else n.material=r(e.materials,this.material);if(this.children.length>0){n.children=[];for(let o=0;o<this.children.length;o++)n.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){n.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];n.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),d=a(e.images),h=a(e.shapes),u=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),d.length>0&&(i.images=d),h.length>0&&(i.shapes=h),u.length>0&&(i.skeletons=u),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=n,i;function a(o){const c=[];for(const l in o){const d=o[l];delete d.metadata,c.push(d)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const n=e.children[i];this.add(n.clone())}return this}}Ct.DEFAULT_UP=new W(0,1,0),Ct.DEFAULT_MATRIX_AUTO_UPDATE=!0,Ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const vi=new W,Pi=new W,bo=new W,Vi=new W,ns=new W,ss=new W,Gc=new W,yo=new W,Co=new W,Uo=new W,Mo=new mt,To=new mt,Fo=new mt;class Ai{constructor(e=new W,t=new W,i=new W){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,n){n.subVectors(i,t),vi.subVectors(e,t),n.cross(vi);const r=n.lengthSq();return r>0?n.multiplyScalar(1/Math.sqrt(r)):n.set(0,0,0)}static getBarycoord(e,t,i,n,r){vi.subVectors(n,t),Pi.subVectors(i,t),bo.subVectors(e,t);const a=vi.dot(vi),o=vi.dot(Pi),c=vi.dot(bo),l=Pi.dot(Pi),d=Pi.dot(bo),h=a*l-o*o;if(h===0)return r.set(0,0,0),null;const u=1/h,p=(l*c-o*d)*u,g=(a*d-o*c)*u;return r.set(1-p-g,g,p)}static containsPoint(e,t,i,n){return this.getBarycoord(e,t,i,n,Vi)===null?!1:Vi.x>=0&&Vi.y>=0&&Vi.x+Vi.y<=1}static getInterpolation(e,t,i,n,r,a,o,c){return this.getBarycoord(e,t,i,n,Vi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Vi.x),c.addScaledVector(a,Vi.y),c.addScaledVector(o,Vi.z),c)}static getInterpolatedAttribute(e,t,i,n,r,a){return Mo.setScalar(0),To.setScalar(0),Fo.setScalar(0),Mo.fromBufferAttribute(e,t),To.fromBufferAttribute(e,i),Fo.fromBufferAttribute(e,n),a.setScalar(0),a.addScaledVector(Mo,r.x),a.addScaledVector(To,r.y),a.addScaledVector(Fo,r.z),a}static isFrontFacing(e,t,i,n){return vi.subVectors(i,t),Pi.subVectors(e,t),vi.cross(Pi).dot(n)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,n){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[n]),this}setFromAttributeAndIndices(e,t,i,n){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return vi.subVectors(this.c,this.b),Pi.subVectors(this.a,this.b),vi.cross(Pi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ai.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ai.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,n,r){return Ai.getInterpolation(e,this.a,this.b,this.c,t,i,n,r)}containsPoint(e){return Ai.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ai.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,n=this.b,r=this.c;let a,o;ns.subVectors(n,i),ss.subVectors(r,i),yo.subVectors(e,i);const c=ns.dot(yo),l=ss.dot(yo);if(c<=0&&l<=0)return t.copy(i);Co.subVectors(e,n);const d=ns.dot(Co),h=ss.dot(Co);if(d>=0&&h<=d)return t.copy(n);const u=c*h-d*l;if(u<=0&&c>=0&&d<=0)return a=c/(c-d),t.copy(i).addScaledVector(ns,a);Uo.subVectors(e,r);const p=ns.dot(Uo),g=ss.dot(Uo);if(g>=0&&p<=g)return t.copy(r);const v=p*l-c*g;if(v<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(i).addScaledVector(ss,o);const m=d*g-p*h;if(m<=0&&h-d>=0&&p-g>=0)return Gc.subVectors(r,n),o=(h-d)/(h-d+(p-g)),t.copy(n).addScaledVector(Gc,o);const f=1/(m+v+u);return a=v*f,o=u*f,t.copy(i).addScaledVector(ns,a).addScaledVector(ss,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Hc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},qi={h:0,s:0,l:0},Ar={h:0,s:0,l:0};function Io(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class Pe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const n=e;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Tt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,We.toWorkingColorSpace(this,t),this}setRGB(e,t,i,n=We.workingColorSpace){return this.r=e,this.g=t,this.b=i,We.toWorkingColorSpace(this,n),this}setHSL(e,t,i,n=We.workingColorSpace){if(e=lp(e,1),t=ze(t,0,1),i=ze(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=Io(a,r,e+1/3),this.g=Io(a,r,e),this.b=Io(a,r,e-1/3)}return We.toWorkingColorSpace(this,n),this}setStyle(e,t=Tt){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=n[1],o=n[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=n[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Tt){const i=Hc[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Di(e.r),this.g=Di(e.g),this.b=Di(e.b),this}copyLinearToSRGB(e){return this.r=Xn(e.r),this.g=Xn(e.g),this.b=Xn(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Tt){return We.fromWorkingColorSpace(Rt.copy(this),e),Math.round(ze(Rt.r*255,0,255))*65536+Math.round(ze(Rt.g*255,0,255))*256+Math.round(ze(Rt.b*255,0,255))}getHexString(e=Tt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=We.workingColorSpace){We.fromWorkingColorSpace(Rt.copy(this),t);const i=Rt.r,n=Rt.g,r=Rt.b,a=Math.max(i,n,r),o=Math.min(i,n,r);let c,l;const d=(o+a)/2;if(o===a)c=0,l=0;else{const h=a-o;switch(l=d<=.5?h/(a+o):h/(2-a-o),a){case i:c=(n-r)/h+(n<r?6:0);break;case n:c=(r-i)/h+2;break;case r:c=(i-n)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=d,e}getRGB(e,t=We.workingColorSpace){return We.fromWorkingColorSpace(Rt.copy(this),t),e.r=Rt.r,e.g=Rt.g,e.b=Rt.b,e}getStyle(e=Tt){We.fromWorkingColorSpace(Rt.copy(this),e);const t=Rt.r,i=Rt.g,n=Rt.b;return e!==Tt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(e,t,i){return this.getHSL(qi),this.setHSL(qi.h+e,qi.s+t,qi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(qi),e.getHSL(Ar);const i=po(qi.h,Ar.h,t),n=po(qi.s,Ar.s,t),r=po(qi.l,Ar.l,t);return this.setHSL(i,n,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,n=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*n,this.g=r[1]*t+r[4]*i+r[7]*n,this.b=r[2]*t+r[5]*i+r[8]*n,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Rt=new Pe;Pe.NAMES=Hc;let Up=0;class ki extends hn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Up++}),this.uuid=ws(),this.name="",this.type="Material",this.blending=Pn,this.side=Ti,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Sa,this.blendDst=Ea,this.blendEquation=on,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Pe(0,0,0),this.blendAlpha=0,this.depthFunc=Vn,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=yc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Jn,this.stencilZFail=Jn,this.stencilZPass=Jn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const n=this[t];if(n===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Pn&&(i.blending=this.blending),this.side!==Ti&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Sa&&(i.blendSrc=this.blendSrc),this.blendDst!==Ea&&(i.blendDst=this.blendDst),this.blendEquation!==on&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Vn&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==yc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Jn&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Jn&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Jn&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=n(e.textures),a=n(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const n=t.length;i=new Array(n);for(let r=0;r!==n;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Jc extends ki{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Pe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bi,this.combine=Ta,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const St=new W,_r=new Qe;class yi{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Uc,this.updateRanges=[],this.gpuType=Ri,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let n=0,r=this.itemSize;n<r;n++)this.array[e+n]=t.array[i+n];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)_r.fromBufferAttribute(this,t),_r.applyMatrix3(e),this.setXY(t,_r.x,_r.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)St.fromBufferAttribute(this,t),St.applyMatrix3(e),this.setXYZ(t,St.x,St.y,St.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)St.fromBufferAttribute(this,t),St.applyMatrix4(e),this.setXYZ(t,St.x,St.y,St.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)St.fromBufferAttribute(this,t),St.applyNormalMatrix(e),this.setXYZ(t,St.x,St.y,St.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)St.fromBufferAttribute(this,t),St.transformDirection(e),this.setXYZ(t,St.x,St.y,St.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=bs(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Wt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=bs(t,this.array)),t}setX(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=bs(t,this.array)),t}setY(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=bs(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=bs(t,this.array)),t}setW(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Wt(t,this.array),i=Wt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,n){return e*=this.itemSize,this.normalized&&(t=Wt(t,this.array),i=Wt(i,this.array),n=Wt(n,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this}setXYZW(e,t,i,n,r){return e*=this.itemSize,this.normalized&&(t=Wt(t,this.array),i=Wt(i,this.array),n=Wt(n,this.array),r=Wt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Uc&&(e.usage=this.usage),e}}class Zc extends yi{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Xc extends yi{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Nt extends yi{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Mp=0;const ni=new lt,Ro=new Ct,rs=new W,$t=new Kn,Fs=new Kn,Ut=new W;class _i extends hn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Mp++}),this.uuid=ws(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Tc(e)?Xc:Zc)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Ne().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(e),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ni.makeRotationFromQuaternion(e),this.applyMatrix4(ni),this}rotateX(e){return ni.makeRotationX(e),this.applyMatrix4(ni),this}rotateY(e){return ni.makeRotationY(e),this.applyMatrix4(ni),this}rotateZ(e){return ni.makeRotationZ(e),this.applyMatrix4(ni),this}translate(e,t,i){return ni.makeTranslation(e,t,i),this.applyMatrix4(ni),this}scale(e,t,i){return ni.makeScale(e,t,i),this.applyMatrix4(ni),this}lookAt(e){return Ro.lookAt(e),Ro.updateMatrix(),this.applyMatrix4(Ro.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(rs).negate(),this.translate(rs.x,rs.y,rs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let n=0,r=e.length;n<r;n++){const a=e[n];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Nt(i,3))}else{const i=Math.min(e.length,t.count);for(let n=0;n<i;n++){const r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Kn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,n=t.length;i<n;i++){const r=t[i];$t.setFromBufferAttribute(r),this.morphTargetsRelative?(Ut.addVectors(this.boundingBox.min,$t.min),this.boundingBox.expandByPoint(Ut),Ut.addVectors(this.boundingBox.max,$t.max),this.boundingBox.expandByPoint(Ut)):(this.boundingBox.expandByPoint($t.min),this.boundingBox.expandByPoint($t.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ms);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new W,1/0);return}if(e){const i=this.boundingSphere.center;if($t.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Fs.setFromBufferAttribute(o),this.morphTargetsRelative?(Ut.addVectors($t.min,Fs.min),$t.expandByPoint(Ut),Ut.addVectors($t.max,Fs.max),$t.expandByPoint(Ut)):($t.expandByPoint(Fs.min),$t.expandByPoint(Fs.max))}$t.getCenter(i);let n=0;for(let r=0,a=e.count;r<a;r++)Ut.fromBufferAttribute(e,r),n=Math.max(n,i.distanceToSquared(Ut));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,d=o.count;l<d;l++)Ut.fromBufferAttribute(o,l),c&&(rs.fromBufferAttribute(e,l),Ut.add(rs)),n=Math.max(n,i.distanceToSquared(Ut))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,n=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new yi(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let I=0;I<i.count;I++)o[I]=new W,c[I]=new W;const l=new W,d=new W,h=new W,u=new Qe,p=new Qe,g=new Qe,v=new W,m=new W;function f(I,x,E){l.fromBufferAttribute(i,I),d.fromBufferAttribute(i,x),h.fromBufferAttribute(i,E),u.fromBufferAttribute(r,I),p.fromBufferAttribute(r,x),g.fromBufferAttribute(r,E),d.sub(l),h.sub(l),p.sub(u),g.sub(u);const M=1/(p.x*g.y-g.x*p.y);isFinite(M)&&(v.copy(d).multiplyScalar(g.y).addScaledVector(h,-p.y).multiplyScalar(M),m.copy(h).multiplyScalar(p.x).addScaledVector(d,-g.x).multiplyScalar(M),o[I].add(v),o[x].add(v),o[E].add(v),c[I].add(m),c[x].add(m),c[E].add(m))}let A=this.groups;A.length===0&&(A=[{start:0,count:e.count}]);for(let I=0,x=A.length;I<x;++I){const E=A[I],M=E.start,R=E.count;for(let F=M,B=M+R;F<B;F+=3)f(e.getX(F+0),e.getX(F+1),e.getX(F+2))}const _=new W,S=new W,C=new W,y=new W;function U(I){C.fromBufferAttribute(n,I),y.copy(C);const x=o[I];_.copy(x),_.sub(C.multiplyScalar(C.dot(x))).normalize(),S.crossVectors(y,x);const M=S.dot(c[I])<0?-1:1;a.setXYZW(I,_.x,_.y,_.z,M)}for(let I=0,x=A.length;I<x;++I){const E=A[I],M=E.start,R=E.count;for(let F=M,B=M+R;F<B;F+=3)U(e.getX(F+0)),U(e.getX(F+1)),U(e.getX(F+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new yi(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,p=i.count;u<p;u++)i.setXYZ(u,0,0,0);const n=new W,r=new W,a=new W,o=new W,c=new W,l=new W,d=new W,h=new W;if(e)for(let u=0,p=e.count;u<p;u+=3){const g=e.getX(u+0),v=e.getX(u+1),m=e.getX(u+2);n.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),d.subVectors(a,r),h.subVectors(n,r),d.cross(h),o.fromBufferAttribute(i,g),c.fromBufferAttribute(i,v),l.fromBufferAttribute(i,m),o.add(d),c.add(d),l.add(d),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(v,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,p=t.count;u<p;u+=3)n.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),d.subVectors(a,r),h.subVectors(n,r),d.cross(h),i.setXYZ(u+0,d.x,d.y,d.z),i.setXYZ(u+1,d.x,d.y,d.z),i.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ut.fromBufferAttribute(e,t),Ut.normalize(),e.setXYZ(t,Ut.x,Ut.y,Ut.z)}toNonIndexed(){function e(o,c){const l=o.array,d=o.itemSize,h=o.normalized,u=new l.constructor(c.length*d);let p=0,g=0;for(let v=0,m=c.length;v<m;v++){o.isInterleavedBufferAttribute?p=c[v]*o.data.stride+o.offset:p=c[v]*d;for(let f=0;f<d;f++)u[g++]=l[p++]}return new yi(u,d,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new _i,i=this.index.array,n=this.attributes;for(const o in n){const c=n[o],l=e(c,i);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let d=0,h=l.length;d<h;d++){const u=l[d],p=e(u,i);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const n={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],d=[];for(let h=0,u=l.length;h<u;h++){const p=l[h];d.push(p.toJSON(e.data))}d.length>0&&(n[c]=d,r=!0)}r&&(e.data.morphAttributes=n,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const n=e.attributes;for(const l in n){const d=n[l];this.setAttribute(l,d.clone(t))}const r=e.morphAttributes;for(const l in r){const d=[],h=r[l];for(let u=0,p=h.length;u<p;u++)d.push(h[u].clone(t));this.morphAttributes[l]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,d=a.length;l<d;l++){const h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Yc=new lt,gn=new mr,Sr=new Ms,Kc=new W,Er=new W,xr=new W,wr=new W,Bo=new W,br=new W,jc=new W,yr=new W;class Gt extends Ct{constructor(e=new _i,t=new Jc){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,n=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(n,e);const o=this.morphTargetInfluences;if(r&&o){br.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const d=o[c],h=r[c];d!==0&&(Bo.fromBufferAttribute(h,e),a?br.addScaledVector(Bo,d):br.addScaledVector(Bo.sub(t),d))}t.add(br)}return t}raycast(e,t){const i=this.geometry,n=this.material,r=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Sr.copy(i.boundingSphere),Sr.applyMatrix4(r),gn.copy(e.ray).recast(e.near),!(Sr.containsPoint(gn.origin)===!1&&(gn.intersectSphere(Sr,Kc)===null||gn.origin.distanceToSquared(Kc)>(e.far-e.near)**2))&&(Yc.copy(r).invert(),gn.copy(e.ray).applyMatrix4(Yc),!(i.boundingBox!==null&&gn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,gn)))}_computeIntersections(e,t,i){let n;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,d=r.attributes.uv1,h=r.attributes.normal,u=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=u.length;g<v;g++){const m=u[g],f=a[m.materialIndex],A=Math.max(m.start,p.start),_=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let S=A,C=_;S<C;S+=3){const y=o.getX(S),U=o.getX(S+1),I=o.getX(S+2);n=Cr(this,f,e,i,l,d,h,y,U,I),n&&(n.faceIndex=Math.floor(S/3),n.face.materialIndex=m.materialIndex,t.push(n))}}else{const g=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let m=g,f=v;m<f;m+=3){const A=o.getX(m),_=o.getX(m+1),S=o.getX(m+2);n=Cr(this,a,e,i,l,d,h,A,_,S),n&&(n.faceIndex=Math.floor(m/3),t.push(n))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,v=u.length;g<v;g++){const m=u[g],f=a[m.materialIndex],A=Math.max(m.start,p.start),_=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let S=A,C=_;S<C;S+=3){const y=S,U=S+1,I=S+2;n=Cr(this,f,e,i,l,d,h,y,U,I),n&&(n.faceIndex=Math.floor(S/3),n.face.materialIndex=m.materialIndex,t.push(n))}}else{const g=Math.max(0,p.start),v=Math.min(c.count,p.start+p.count);for(let m=g,f=v;m<f;m+=3){const A=m,_=m+1,S=m+2;n=Cr(this,a,e,i,l,d,h,A,_,S),n&&(n.faceIndex=Math.floor(m/3),t.push(n))}}}}function Tp(s,e,t,i,n,r,a,o){let c;if(e.side===zt?c=i.intersectTriangle(a,r,n,!0,o):c=i.intersectTriangle(n,r,a,e.side===Ti,o),c===null)return null;yr.copy(o),yr.applyMatrix4(s.matrixWorld);const l=t.ray.origin.distanceTo(yr);return l<t.near||l>t.far?null:{distance:l,point:yr.clone(),object:s}}function Cr(s,e,t,i,n,r,a,o,c,l){s.getVertexPosition(o,Er),s.getVertexPosition(c,xr),s.getVertexPosition(l,wr);const d=Tp(s,e,t,i,Er,xr,wr,jc);if(d){const h=new W;Ai.getBarycoord(jc,Er,xr,wr,h),n&&(d.uv=Ai.getInterpolatedAttribute(n,o,c,l,h,new Qe)),r&&(d.uv1=Ai.getInterpolatedAttribute(r,o,c,l,h,new Qe)),a&&(d.normal=Ai.getInterpolatedAttribute(a,o,c,l,h,new W),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new W,materialIndex:0};Ai.getNormal(Er,xr,wr,u.normal),d.face=u,d.barycoord=h}return d}class Is extends _i{constructor(e=1,t=1,i=1,n=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:n,heightSegments:r,depthSegments:a};const o=this;n=Math.floor(n),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],d=[],h=[];let u=0,p=0;g("z","y","x",-1,-1,i,t,e,a,r,0),g("z","y","x",1,-1,i,t,-e,a,r,1),g("x","z","y",1,1,e,i,t,n,a,2),g("x","z","y",1,-1,e,i,-t,n,a,3),g("x","y","z",1,-1,e,t,i,n,r,4),g("x","y","z",-1,-1,e,t,-i,n,r,5),this.setIndex(c),this.setAttribute("position",new Nt(l,3)),this.setAttribute("normal",new Nt(d,3)),this.setAttribute("uv",new Nt(h,2));function g(v,m,f,A,_,S,C,y,U,I,x){const E=S/U,M=C/I,R=S/2,F=C/2,B=y/2,z=U+1,Q=I+1;let N=0,D=0;const Z=new W;for(let $=0;$<Q;$++){const ae=$*M-F;for(let be=0;be<z;be++){const Be=be*E-R;Z[v]=Be*A,Z[m]=ae*_,Z[f]=B,l.push(Z.x,Z.y,Z.z),Z[v]=0,Z[m]=0,Z[f]=y>0?1:-1,d.push(Z.x,Z.y,Z.z),h.push(be/U),h.push(1-$/I),N+=1}}for(let $=0;$<I;$++)for(let ae=0;ae<U;ae++){const be=u+ae+z*$,Be=u+ae+z*($+1),k=u+(ae+1)+z*($+1),Y=u+(ae+1)+z*$;c.push(be,Be,Y),c.push(Be,k,Y),D+=6}o.addGroup(p,D,x),p+=D,u+=N}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Is(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function as(s){const e={};for(const t in s){e[t]={};for(const i in s[t]){const n=s[t][i];n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)?n.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=n.clone():Array.isArray(n)?e[t][i]=n.slice():e[t][i]=n}}return e}function Lt(s){const e={};for(let t=0;t<s.length;t++){const i=as(s[t]);for(const n in i)e[n]=i[n]}return e}function Fp(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function qc(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:We.workingColorSpace}const Ip={clone:as,merge:Lt};var Rp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Bp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class $i extends ki{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Rp,this.fragmentShader=Bp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=as(e.uniforms),this.uniformsGroups=Fp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const n in this.uniforms){const a=this.uniforms[n].value;a&&a.isTexture?t.uniforms[n]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[n]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[n]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[n]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[n]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[n]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[n]={type:"m4",value:a.toArray()}:t.uniforms[n]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class $c extends Ct{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new lt,this.projectionMatrix=new lt,this.projectionMatrixInverse=new lt,this.coordinateSystem=Bi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const en=new W,ed=new Qe,td=new Qe;class si extends $c{constructor(e=50,t=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=fo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(cr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return fo*2*Math.atan(Math.tan(cr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){en.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(en.x,en.y).multiplyScalar(-e/en.z),en.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(en.x,en.y).multiplyScalar(-e/en.z)}getViewSize(e,t){return this.getViewBounds(e,ed,td),t.subVectors(td,ed)}setViewOffset(e,t,i,n,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(cr*.5*this.fov)/this.zoom,i=2*t,n=this.aspect*i,r=-.5*n;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*n/c,t-=a.offsetY*i/l,n*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+n,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const os=-90,ls=1;class Dp extends Ct{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const n=new si(os,ls,e,t);n.layers=this.layers,this.add(n);const r=new si(os,ls,e,t);r.layers=this.layers,this.add(r);const a=new si(os,ls,e,t);a.layers=this.layers,this.add(a);const o=new si(os,ls,e,t);o.layers=this.layers,this.add(o);const c=new si(os,ls,e,t);c.layers=this.layers,this.add(c);const l=new si(os,ls,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,n,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===Bi)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===lr)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,d]=this.children,h=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,n),e.render(t,r),e.setRenderTarget(i,1,n),e.render(t,a),e.setRenderTarget(i,2,n),e.render(t,o),e.setRenderTarget(i,3,n),e.render(t,c),e.setRenderTarget(i,4,n),e.render(t,l),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,n),e.render(t,d),e.setRenderTarget(h,u,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class id extends Qt{constructor(e,t,i,n,r,a,o,c,l,d){e=e!==void 0?e:[],t=t!==void 0?t:kn,super(e,t,i,n,r,a,o,c,l,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Qp extends un{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},n=[i,i,i,i,i,i];this.texture=new id(n,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:wi}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},n=new Is(5,5,5),r=new $i({name:"CubemapFromEquirect",uniforms:as(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:zt,blending:Hi});r.uniforms.tEquirect.value=t;const a=new Gt(n,r),o=t.minFilter;return t.minFilter===cn&&(t.minFilter=wi),new Dp(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,n){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,n);e.setRenderTarget(r)}}class Np extends Ct{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new bi,this.environmentIntensity=1,this.environmentRotation=new bi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Do=new W,Lp=new W,Pp=new Ne;class tn{constructor(e=new W(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,n){return this.normal.set(e,t,i),this.constant=n,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const n=Do.subVectors(i,t).cross(Lp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(n,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Do),n=this.normal.dot(i);if(n===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/n;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Pp.getNormalMatrix(e),n=this.coplanarPoint(Do).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const vn=new Ms,Ur=new W;class Qo{constructor(e=new tn,t=new tn,i=new tn,n=new tn,r=new tn,a=new tn){this.planes=[e,t,i,n,r,a]}set(e,t,i,n,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(n),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Bi){const i=this.planes,n=e.elements,r=n[0],a=n[1],o=n[2],c=n[3],l=n[4],d=n[5],h=n[6],u=n[7],p=n[8],g=n[9],v=n[10],m=n[11],f=n[12],A=n[13],_=n[14],S=n[15];if(i[0].setComponents(c-r,u-l,m-p,S-f).normalize(),i[1].setComponents(c+r,u+l,m+p,S+f).normalize(),i[2].setComponents(c+a,u+d,m+g,S+A).normalize(),i[3].setComponents(c-a,u-d,m-g,S-A).normalize(),i[4].setComponents(c-o,u-h,m-v,S-_).normalize(),t===Bi)i[5].setComponents(c+o,u+h,m+v,S+_).normalize();else if(t===lr)i[5].setComponents(o,h,v,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),vn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),vn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(vn)}intersectsSprite(e){return vn.center.set(0,0,0),vn.radius=.7071067811865476,vn.applyMatrix4(e.matrixWorld),this.intersectsSphere(vn)}intersectsSphere(e){const t=this.planes,i=e.center,n=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<n)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const n=t[i];if(Ur.x=n.normal.x>0?e.max.x:e.min.x,Ur.y=n.normal.y>0?e.max.y:e.min.y,Ur.z=n.normal.z>0?e.max.z:e.min.z,n.distanceToPoint(Ur)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Mr extends ki{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Pe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Tr=new W,Fr=new W,nd=new lt,Rs=new mr,Ir=new Ms,No=new W,sd=new W;class Vp extends Ct{constructor(e=new _i,t=new Mr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let n=1,r=t.count;n<r;n++)Tr.fromBufferAttribute(t,n-1),Fr.fromBufferAttribute(t,n),i[n]=i[n-1],i[n]+=Tr.distanceTo(Fr);e.setAttribute("lineDistance",new Nt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,n=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ir.copy(i.boundingSphere),Ir.applyMatrix4(n),Ir.radius+=r,e.ray.intersectsSphere(Ir)===!1)return;nd.copy(n).invert(),Rs.copy(e.ray).applyMatrix4(nd);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,d=i.index,u=i.attributes.position;if(d!==null){const p=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let v=p,m=g-1;v<m;v+=l){const f=d.getX(v),A=d.getX(v+1),_=Rr(this,e,Rs,c,f,A);_&&t.push(_)}if(this.isLineLoop){const v=d.getX(g-1),m=d.getX(p),f=Rr(this,e,Rs,c,v,m);f&&t.push(f)}}else{const p=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let v=p,m=g-1;v<m;v+=l){const f=Rr(this,e,Rs,c,v,v+1);f&&t.push(f)}if(this.isLineLoop){const v=Rr(this,e,Rs,c,g-1,p);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Rr(s,e,t,i,n,r){const a=s.geometry.attributes.position;if(Tr.fromBufferAttribute(a,n),Fr.fromBufferAttribute(a,r),t.distanceSqToSegment(Tr,Fr,No,sd)>i)return;No.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(No);if(!(c<e.near||c>e.far))return{distance:c,point:sd.clone().applyMatrix4(s.matrixWorld),index:n,face:null,faceIndex:null,barycoord:null,object:s}}const rd=new W,ad=new W;class od extends Vp{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let n=0,r=t.count;n<r;n+=2)rd.fromBufferAttribute(t,n),ad.fromBufferAttribute(t,n+1),i[n]=n===0?0:i[n-1],i[n+1]=i[n]+rd.distanceTo(ad);e.setAttribute("lineDistance",new Nt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Bs extends ki{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Pe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const ld=new lt,Lo=new mr,Br=new Ms,Dr=new W;class Po extends Ct{constructor(e=new _i,t=new Bs){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,n=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Br.copy(i.boundingSphere),Br.applyMatrix4(n),Br.radius+=r,e.ray.intersectsSphere(Br)===!1)return;ld.copy(n).invert(),Lo.copy(e.ray).applyMatrix4(ld);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=i.index,h=i.attributes.position;if(l!==null){const u=Math.max(0,a.start),p=Math.min(l.count,a.start+a.count);for(let g=u,v=p;g<v;g++){const m=l.getX(g);Dr.fromBufferAttribute(h,m),cd(Dr,m,c,n,e,t,this)}}else{const u=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let g=u,v=p;g<v;g++)Dr.fromBufferAttribute(h,g),cd(Dr,g,c,n,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function cd(s,e,t,i,n,r,a){const o=Lo.distanceSqToPoint(s);if(o<t){const c=new W;Lo.closestPointToPoint(s,c),c.applyMatrix4(i);const l=n.ray.origin.distanceTo(c);if(l<n.near||l>n.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Ds extends Ct{constructor(){super(),this.isGroup=!0,this.type="Group"}}class dd extends Qt{constructor(e,t,i,n,r,a,o,c,l,d=Wn){if(d!==Wn&&d!==Gn)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&d===Wn&&(i=dn),i===void 0&&d===Gn&&(i=zn),super(null,n,r,a,o,c,d,i,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:fi,this.minFilter=c!==void 0?c:fi,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Qr extends _i{constructor(e=1,t=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:n};const r=e/2,a=t/2,o=Math.floor(i),c=Math.floor(n),l=o+1,d=c+1,h=e/o,u=t/c,p=[],g=[],v=[],m=[];for(let f=0;f<d;f++){const A=f*u-a;for(let _=0;_<l;_++){const S=_*h-r;g.push(S,-A,0),v.push(0,0,1),m.push(_/o),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let A=0;A<o;A++){const _=A+l*f,S=A+l*(f+1),C=A+1+l*(f+1),y=A+1+l*f;p.push(_,S,y),p.push(S,C,y)}this.setIndex(p),this.setAttribute("position",new Nt(g,3)),this.setAttribute("normal",new Nt(v,3)),this.setAttribute("uv",new Nt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qr(e.width,e.height,e.widthSegments,e.heightSegments)}}class Vo extends ki{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Pe(16777215),this.specular=new Pe(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Pe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=bc,this.normalScale=new Qe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bi,this.combine=Ta,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class kp extends ki{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=qf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Op extends ki{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Nr={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class zp{constructor(e,t,i){const n=this;let r=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(d){o++,r===!1&&n.onStart!==void 0&&n.onStart(d,a,o),r=!0},this.itemEnd=function(d){a++,n.onProgress!==void 0&&n.onProgress(d,a,o),a===o&&(r=!1,n.onLoad!==void 0&&n.onLoad())},this.itemError=function(d){n.onError!==void 0&&n.onError(d)},this.resolveURL=function(d){return c?c(d):d},this.setURLModifier=function(d){return c=d,this},this.addHandler=function(d,h){return l.push(d,h),this},this.removeHandler=function(d){const h=l.indexOf(d);return h!==-1&&l.splice(h,2),this},this.getHandler=function(d){for(let h=0,u=l.length;h<u;h+=2){const p=l[h],g=l[h+1];if(p.global&&(p.lastIndex=0),p.test(d))return g}return null}}}const hd=new zp;class cs{constructor(e){this.manager=e!==void 0?e:hd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(n,r){i.load(e,n,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}cs.DEFAULT_MATERIAL_NAME="__DEFAULT";const Oi={};class Wp extends Error{constructor(e,t){super(e),this.response=t}}class ud extends cs{constructor(e){super(e)}load(e,t,i,n){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Nr.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Oi[e]!==void 0){Oi[e].push({onLoad:t,onProgress:i,onError:n});return}Oi[e]=[],Oi[e].push({onLoad:t,onProgress:i,onError:n});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const d=Oi[e],h=l.body.getReader(),u=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),p=u?parseInt(u):0,g=p!==0;let v=0;const m=new ReadableStream({start(f){A();function A(){h.read().then(({done:_,value:S})=>{if(_)f.close();else{v+=S.byteLength;const C=new ProgressEvent("progress",{lengthComputable:g,loaded:v,total:p});for(let y=0,U=d.length;y<U;y++){const I=d[y];I.onProgress&&I.onProgress(C)}f.enqueue(S),A()}},_=>{f.error(_)})}}});return new Response(m)}else throw new Wp(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(d=>new DOMParser().parseFromString(d,o));case"json":return l.json();default:if(o===void 0)return l.text();{const h=/charset="?([^;"\s]*)"?/i.exec(o),u=h&&h[1]?h[1].toLowerCase():void 0,p=new TextDecoder(u);return l.arrayBuffer().then(g=>p.decode(g))}}}).then(l=>{Nr.add(e,l);const d=Oi[e];delete Oi[e];for(let h=0,u=d.length;h<u;h++){const p=d[h];p.onLoad&&p.onLoad(l)}}).catch(l=>{const d=Oi[e];if(d===void 0)throw this.manager.itemError(e),l;delete Oi[e];for(let h=0,u=d.length;h<u;h++){const p=d[h];p.onError&&p.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class Gp extends cs{constructor(e){super(e)}load(e,t,i,n){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Nr.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;const o=ys("img");function c(){d(),Nr.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(h){d(),n&&n(h),r.manager.itemError(e),r.manager.itemEnd(e)}function d(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}}class Hp extends cs{constructor(e){super(e)}load(e,t,i,n){const r=new Qt,a=new Gp(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},i,n),r}}class fd extends Ct{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Pe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const ko=new lt,pd=new W,md=new W;class Jp{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Qe(512,512),this.map=null,this.mapPass=null,this.matrix=new lt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Qo,this._frameExtents=new Qe(1,1),this._viewportCount=1,this._viewports=[new mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;pd.setFromMatrixPosition(e.matrixWorld),t.position.copy(pd),md.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(md),t.updateMatrixWorld(),ko.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ko),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ko)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class gd extends $c{constructor(e=-1,t=1,i=1,n=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=n,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,n,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=n+t,c=n-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=d*this.view.offsetY,c=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Zp extends Jp{constructor(){super(new gd(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Xp extends fd{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ct.DEFAULT_UP),this.updateMatrix(),this.target=new Ct,this.shadow=new Zp}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Yp extends fd{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Kp{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let i=0,n=e.length;i<n;i++)t+=String.fromCharCode(e[i]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class jp extends si{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class vd{constructor(e=1,t=0,i=0){return this.radius=e,this.phi=t,this.theta=i,this}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=ze(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(ze(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class qp extends hn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}function Ad(s,e,t,i){const n=$p(i);switch(t){case vc:return s*e;case _c:return s*e;case Sc:return s*e*2;case Ec:return s*e/n.components*n.byteLength;case La:return s*e/n.components*n.byteLength;case xc:return s*e*2/n.components*n.byteLength;case Pa:return s*e*2/n.components*n.byteLength;case Ac:return s*e*3/n.components*n.byteLength;case pi:return s*e*4/n.components*n.byteLength;case Va:return s*e*4/n.components*n.byteLength;case ir:case nr:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case sr:case rr:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Oa:case Wa:return Math.max(s,16)*Math.max(e,8)/4;case ka:case za:return Math.max(s,8)*Math.max(e,8)/2;case Ga:case Ha:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Ja:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Za:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Xa:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Ya:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Ka:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case ja:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case qa:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case $a:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case eo:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case to:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case io:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case no:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case so:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case ro:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case ao:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case ar:case oo:case lo:return Math.ceil(s/4)*Math.ceil(e/4)*16;case wc:case co:return Math.ceil(s/4)*Math.ceil(e/4)*8;case ho:case uo:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function $p(s){switch(s){case Ii:case pc:return{byteLength:1,components:1};case Es:case mc:case xs:return{byteLength:2,components:1};case Qa:case Na:return{byteLength:2,components:4};case dn:case Da:case Ri:return{byteLength:4,components:1};case gc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:_a}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=_a);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function _d(){let s=null,e=!1,t=null,i=null;function n(r,a){t(r,a),i=s.requestAnimationFrame(n)}return{start:function(){e!==!0&&t!==null&&(i=s.requestAnimationFrame(n),e=!0)},stop:function(){s.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function em(s){const e=new WeakMap;function t(o,c){const l=o.array,d=o.usage,h=l.byteLength,u=s.createBuffer();s.bindBuffer(c,u),s.bufferData(c,l,d),o.onUploadCallback();let p;if(l instanceof Float32Array)p=s.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=s.HALF_FLOAT:p=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=s.SHORT;else if(l instanceof Uint32Array)p=s.UNSIGNED_INT;else if(l instanceof Int32Array)p=s.INT;else if(l instanceof Int8Array)p=s.BYTE;else if(l instanceof Uint8Array)p=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,c,l){const d=c.array,h=c.updateRanges;if(s.bindBuffer(l,o),h.length===0)s.bufferSubData(l,0,d);else{h.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<h.length;p++){const g=h[u],v=h[p];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++u,h[u]=v)}h.length=u+1;for(let p=0,g=h.length;p<g;p++){const v=h[p];s.bufferSubData(l,v.start*d.BYTES_PER_ELEMENT,d,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function n(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(s.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:n,remove:r,update:a}}var tm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,im=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,nm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,sm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,am=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,om=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,lm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,cm=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,dm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,hm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,um=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,fm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,pm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,mm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,gm=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,vm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Am=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,_m=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Sm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Em=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,xm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,wm=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,bm=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,ym=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Cm=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Um=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Mm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Tm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Fm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Im="gl_FragColor = linearToOutputTexel( gl_FragColor );",Rm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Bm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Dm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Qm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Nm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Lm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Pm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Vm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,km=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Om=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,zm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Wm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Gm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Hm=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Jm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Zm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Xm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ym=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Km=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,jm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,qm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,$m=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,eg=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,tg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,ig=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ng=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,sg=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rg=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ag=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,og=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,lg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,cg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,dg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ug=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,fg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,pg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,mg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,gg=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,vg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ag=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,_g=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Sg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Eg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,wg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,bg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,yg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Cg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ug=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Mg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Tg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Fg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ig=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Rg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Bg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Dg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Qg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ng=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Lg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Pg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Vg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,kg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Og=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,zg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Wg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Gg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Hg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Jg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Zg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Xg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Yg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Kg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,jg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,qg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,$g=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ve={alphahash_fragment:tm,alphahash_pars_fragment:im,alphamap_fragment:nm,alphamap_pars_fragment:sm,alphatest_fragment:rm,alphatest_pars_fragment:am,aomap_fragment:om,aomap_pars_fragment:lm,batching_pars_vertex:cm,batching_vertex:dm,begin_vertex:hm,beginnormal_vertex:um,bsdfs:fm,iridescence_fragment:pm,bumpmap_pars_fragment:mm,clipping_planes_fragment:gm,clipping_planes_pars_fragment:vm,clipping_planes_pars_vertex:Am,clipping_planes_vertex:_m,color_fragment:Sm,color_pars_fragment:Em,color_pars_vertex:xm,color_vertex:wm,common:bm,cube_uv_reflection_fragment:ym,defaultnormal_vertex:Cm,displacementmap_pars_vertex:Um,displacementmap_vertex:Mm,emissivemap_fragment:Tm,emissivemap_pars_fragment:Fm,colorspace_fragment:Im,colorspace_pars_fragment:Rm,envmap_fragment:Bm,envmap_common_pars_fragment:Dm,envmap_pars_fragment:Qm,envmap_pars_vertex:Nm,envmap_physical_pars_fragment:Zm,envmap_vertex:Lm,fog_vertex:Pm,fog_pars_vertex:Vm,fog_fragment:km,fog_pars_fragment:Om,gradientmap_pars_fragment:zm,lightmap_pars_fragment:Wm,lights_lambert_fragment:Gm,lights_lambert_pars_fragment:Hm,lights_pars_begin:Jm,lights_toon_fragment:Xm,lights_toon_pars_fragment:Ym,lights_phong_fragment:Km,lights_phong_pars_fragment:jm,lights_physical_fragment:qm,lights_physical_pars_fragment:$m,lights_fragment_begin:eg,lights_fragment_maps:tg,lights_fragment_end:ig,logdepthbuf_fragment:ng,logdepthbuf_pars_fragment:sg,logdepthbuf_pars_vertex:rg,logdepthbuf_vertex:ag,map_fragment:og,map_pars_fragment:lg,map_particle_fragment:cg,map_particle_pars_fragment:dg,metalnessmap_fragment:hg,metalnessmap_pars_fragment:ug,morphinstance_vertex:fg,morphcolor_vertex:pg,morphnormal_vertex:mg,morphtarget_pars_vertex:gg,morphtarget_vertex:vg,normal_fragment_begin:Ag,normal_fragment_maps:_g,normal_pars_fragment:Sg,normal_pars_vertex:Eg,normal_vertex:xg,normalmap_pars_fragment:wg,clearcoat_normal_fragment_begin:bg,clearcoat_normal_fragment_maps:yg,clearcoat_pars_fragment:Cg,iridescence_pars_fragment:Ug,opaque_fragment:Mg,packing:Tg,premultiplied_alpha_fragment:Fg,project_vertex:Ig,dithering_fragment:Rg,dithering_pars_fragment:Bg,roughnessmap_fragment:Dg,roughnessmap_pars_fragment:Qg,shadowmap_pars_fragment:Ng,shadowmap_pars_vertex:Lg,shadowmap_vertex:Pg,shadowmask_pars_fragment:Vg,skinbase_vertex:kg,skinning_pars_vertex:Og,skinning_vertex:zg,skinnormal_vertex:Wg,specularmap_fragment:Gg,specularmap_pars_fragment:Hg,tonemapping_fragment:Jg,tonemapping_pars_fragment:Zg,transmission_fragment:Xg,transmission_pars_fragment:Yg,uv_pars_fragment:Kg,uv_pars_vertex:jg,uv_vertex:qg,worldpos_vertex:$g,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distanceRGBA_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distanceRGBA_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},re={common:{diffuse:{value:new Pe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ne}},envmap:{envMap:{value:null},envMapRotation:{value:new Ne},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ne}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ne}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ne},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ne},normalScale:{value:new Qe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ne},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ne}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ne}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ne}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Pe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Pe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0},uvTransform:{value:new Ne}},sprite:{diffuse:{value:new Pe(16777215)},opacity:{value:1},center:{value:new Qe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}}},Ci={basic:{uniforms:Lt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:Lt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new Pe(0)}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:Lt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new Pe(0)},specular:{value:new Pe(1118481)},shininess:{value:30}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:Lt([re.common,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.roughnessmap,re.metalnessmap,re.fog,re.lights,{emissive:{value:new Pe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:Lt([re.common,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.gradientmap,re.fog,re.lights,{emissive:{value:new Pe(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:Lt([re.common,re.bumpmap,re.normalmap,re.displacementmap,re.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:Lt([re.points,re.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:Lt([re.common,re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:Lt([re.common,re.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:Lt([re.common,re.bumpmap,re.normalmap,re.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:Lt([re.sprite,re.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new Ne},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ne}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distanceRGBA:{uniforms:Lt([re.common,re.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distanceRGBA_vert,fragmentShader:Ve.distanceRGBA_frag},shadow:{uniforms:Lt([re.lights,re.fog,{color:{value:new Pe(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};Ci.physical={uniforms:Lt([Ci.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ne},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ne},clearcoatNormalScale:{value:new Qe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ne},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ne},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ne},sheen:{value:0},sheenColor:{value:new Pe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ne},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ne},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ne},transmissionSamplerSize:{value:new Qe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ne},attenuationDistance:{value:0},attenuationColor:{value:new Pe(0)},specularColor:{value:new Pe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ne},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ne},anisotropyVector:{value:new Qe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ne}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};const Lr={r:0,b:0,g:0},An=new bi,e0=new lt;function t0(s,e,t,i,n,r,a){const o=new Pe(0);let c=r===!0?0:1,l,d,h=null,u=0,p=null;function g(_){let S=_.isScene===!0?_.background:null;return S&&S.isTexture&&(S=(_.backgroundBlurriness>0?t:e).get(S)),S}function v(_){let S=!1;const C=g(_);C===null?f(o,c):C&&C.isColor&&(f(C,1),S=!0);const y=s.xr.getEnvironmentBlendMode();y==="additive"?i.buffers.color.setClear(0,0,0,1,a):y==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(s.autoClear||S)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(_,S){const C=g(S);C&&(C.isCubeTexture||C.mapping===$s)?(d===void 0&&(d=new Gt(new Is(1,1,1),new $i({name:"BackgroundCubeMaterial",uniforms:as(Ci.backgroundCube.uniforms),vertexShader:Ci.backgroundCube.vertexShader,fragmentShader:Ci.backgroundCube.fragmentShader,side:zt,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(y,U,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(d)),An.copy(S.backgroundRotation),An.x*=-1,An.y*=-1,An.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(An.y*=-1,An.z*=-1),d.material.uniforms.envMap.value=C,d.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(e0.makeRotationFromEuler(An)),d.material.toneMapped=We.getTransfer(C.colorSpace)!==tt,(h!==C||u!==C.version||p!==s.toneMapping)&&(d.material.needsUpdate=!0,h=C,u=C.version,p=s.toneMapping),d.layers.enableAll(),_.unshift(d,d.geometry,d.material,0,0,null)):C&&C.isTexture&&(l===void 0&&(l=new Gt(new Qr(2,2),new $i({name:"BackgroundMaterial",uniforms:as(Ci.background.uniforms),vertexShader:Ci.background.vertexShader,fragmentShader:Ci.background.fragmentShader,side:Ti,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=C,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=We.getTransfer(C.colorSpace)!==tt,C.matrixAutoUpdate===!0&&C.updateMatrix(),l.material.uniforms.uvTransform.value.copy(C.matrix),(h!==C||u!==C.version||p!==s.toneMapping)&&(l.material.needsUpdate=!0,h=C,u=C.version,p=s.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function f(_,S){_.getRGB(Lr,qc(s)),i.buffers.color.setClear(Lr.r,Lr.g,Lr.b,S,a)}function A(){d!==void 0&&(d.geometry.dispose(),d.material.dispose()),l!==void 0&&(l.geometry.dispose(),l.material.dispose())}return{getClearColor:function(){return o},setClearColor:function(_,S=1){o.set(_),c=S,f(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(_){c=_,f(o,c)},render:v,addToRenderList:m,dispose:A}}function i0(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),i={},n=u(null);let r=n,a=!1;function o(E,M,R,F,B){let z=!1;const Q=h(F,R,M);r!==Q&&(r=Q,l(r.object)),z=p(E,F,R,B),z&&g(E,F,R,B),B!==null&&e.update(B,s.ELEMENT_ARRAY_BUFFER),(z||a)&&(a=!1,S(E,M,R,F),B!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function c(){return s.createVertexArray()}function l(E){return s.bindVertexArray(E)}function d(E){return s.deleteVertexArray(E)}function h(E,M,R){const F=R.wireframe===!0;let B=i[E.id];B===void 0&&(B={},i[E.id]=B);let z=B[M.id];z===void 0&&(z={},B[M.id]=z);let Q=z[F];return Q===void 0&&(Q=u(c()),z[F]=Q),Q}function u(E){const M=[],R=[],F=[];for(let B=0;B<t;B++)M[B]=0,R[B]=0,F[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:M,enabledAttributes:R,attributeDivisors:F,object:E,attributes:{},index:null}}function p(E,M,R,F){const B=r.attributes,z=M.attributes;let Q=0;const N=R.getAttributes();for(const D in N)if(N[D].location>=0){const $=B[D];let ae=z[D];if(ae===void 0&&(D==="instanceMatrix"&&E.instanceMatrix&&(ae=E.instanceMatrix),D==="instanceColor"&&E.instanceColor&&(ae=E.instanceColor)),$===void 0||$.attribute!==ae||ae&&$.data!==ae.data)return!0;Q++}return r.attributesNum!==Q||r.index!==F}function g(E,M,R,F){const B={},z=M.attributes;let Q=0;const N=R.getAttributes();for(const D in N)if(N[D].location>=0){let $=z[D];$===void 0&&(D==="instanceMatrix"&&E.instanceMatrix&&($=E.instanceMatrix),D==="instanceColor"&&E.instanceColor&&($=E.instanceColor));const ae={};ae.attribute=$,$&&$.data&&(ae.data=$.data),B[D]=ae,Q++}r.attributes=B,r.attributesNum=Q,r.index=F}function v(){const E=r.newAttributes;for(let M=0,R=E.length;M<R;M++)E[M]=0}function m(E){f(E,0)}function f(E,M){const R=r.newAttributes,F=r.enabledAttributes,B=r.attributeDivisors;R[E]=1,F[E]===0&&(s.enableVertexAttribArray(E),F[E]=1),B[E]!==M&&(s.vertexAttribDivisor(E,M),B[E]=M)}function A(){const E=r.newAttributes,M=r.enabledAttributes;for(let R=0,F=M.length;R<F;R++)M[R]!==E[R]&&(s.disableVertexAttribArray(R),M[R]=0)}function _(E,M,R,F,B,z,Q){Q===!0?s.vertexAttribIPointer(E,M,R,B,z):s.vertexAttribPointer(E,M,R,F,B,z)}function S(E,M,R,F){v();const B=F.attributes,z=R.getAttributes(),Q=M.defaultAttributeValues;for(const N in z){const D=z[N];if(D.location>=0){let Z=B[N];if(Z===void 0&&(N==="instanceMatrix"&&E.instanceMatrix&&(Z=E.instanceMatrix),N==="instanceColor"&&E.instanceColor&&(Z=E.instanceColor)),Z!==void 0){const $=Z.normalized,ae=Z.itemSize,be=e.get(Z);if(be===void 0)continue;const Be=be.buffer,k=be.type,Y=be.bytesPerElement,se=k===s.INT||k===s.UNSIGNED_INT||Z.gpuType===Da;if(Z.isInterleavedBufferAttribute){const ee=Z.data,ge=ee.stride,Ee=Z.offset;if(ee.isInstancedInterleavedBuffer){for(let Te=0;Te<D.locationSize;Te++)f(D.location+Te,ee.meshPerAttribute);E.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let Te=0;Te<D.locationSize;Te++)m(D.location+Te);s.bindBuffer(s.ARRAY_BUFFER,Be);for(let Te=0;Te<D.locationSize;Te++)_(D.location+Te,ae/D.locationSize,k,$,ge*Y,(Ee+ae/D.locationSize*Te)*Y,se)}else{if(Z.isInstancedBufferAttribute){for(let ee=0;ee<D.locationSize;ee++)f(D.location+ee,Z.meshPerAttribute);E.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let ee=0;ee<D.locationSize;ee++)m(D.location+ee);s.bindBuffer(s.ARRAY_BUFFER,Be);for(let ee=0;ee<D.locationSize;ee++)_(D.location+ee,ae/D.locationSize,k,$,ae*Y,ae/D.locationSize*ee*Y,se)}}else if(Q!==void 0){const $=Q[N];if($!==void 0)switch($.length){case 2:s.vertexAttrib2fv(D.location,$);break;case 3:s.vertexAttrib3fv(D.location,$);break;case 4:s.vertexAttrib4fv(D.location,$);break;default:s.vertexAttrib1fv(D.location,$)}}}}A()}function C(){I();for(const E in i){const M=i[E];for(const R in M){const F=M[R];for(const B in F)d(F[B].object),delete F[B];delete M[R]}delete i[E]}}function y(E){if(i[E.id]===void 0)return;const M=i[E.id];for(const R in M){const F=M[R];for(const B in F)d(F[B].object),delete F[B];delete M[R]}delete i[E.id]}function U(E){for(const M in i){const R=i[M];if(R[E.id]===void 0)continue;const F=R[E.id];for(const B in F)d(F[B].object),delete F[B];delete R[E.id]}}function I(){x(),a=!0,r!==n&&(r=n,l(r.object))}function x(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:o,reset:I,resetDefaultState:x,dispose:C,releaseStatesOfGeometry:y,releaseStatesOfProgram:U,initAttributes:v,enableAttribute:m,disableUnusedAttributes:A}}function n0(s,e,t){let i;function n(l){i=l}function r(l,d){s.drawArrays(i,l,d),t.update(d,i,1)}function a(l,d,h){h!==0&&(s.drawArraysInstanced(i,l,d,h),t.update(d,i,h))}function o(l,d,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,d,0,h);let p=0;for(let g=0;g<h;g++)p+=d[g];t.update(p,i,1)}function c(l,d,h,u){if(h===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<l.length;g++)a(l[g],d[g],u[g]);else{p.multiDrawArraysInstancedWEBGL(i,l,0,d,0,u,0,h);let g=0;for(let v=0;v<h;v++)g+=d[v]*u[v];t.update(g,i,1)}}this.setMode=n,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function s0(s,e,t,i){let n;function r(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const U=e.get("EXT_texture_filter_anisotropic");n=s.getParameter(U.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function a(U){return!(U!==pi&&i.convert(U)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(U){const I=U===xs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(U!==Ii&&i.convert(U)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&U!==Ri&&!I)}function c(U){if(U==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";U="mediump"}return U==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const d=c(l);d!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",d,"instead."),l=d);const h=t.logarithmicDepthBuffer===!0,u=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),f=s.getParameter(s.MAX_VERTEX_ATTRIBS),A=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),_=s.getParameter(s.MAX_VARYING_VECTORS),S=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,y=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reverseDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:A,maxVaryings:_,maxFragmentUniforms:S,vertexTextures:C,maxSamples:y}}function r0(s){const e=this;let t=null,i=0,n=!1,r=!1;const a=new tn,o=new Ne,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){const p=h.length!==0||u||i!==0||n;return n=u,i=h.length,p},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,u){t=d(h,u,0)},this.setState=function(h,u,p){const g=h.clippingPlanes,v=h.clipIntersection,m=h.clipShadows,f=s.get(h);if(!n||g===null||g.length===0||r&&!m)r?d(null):l();else{const A=r?0:i,_=A*4;let S=f.clippingState||null;c.value=S,S=d(g,u,_,p);for(let C=0;C!==_;++C)S[C]=t[C];f.clippingState=S,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=A}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(h,u,p,g){const v=h!==null?h.length:0;let m=null;if(v!==0){if(m=c.value,g!==!0||m===null){const f=p+v*4,A=u.matrixWorldInverse;o.getNormalMatrix(A),(m===null||m.length<f)&&(m=new Float32Array(f));for(let _=0,S=p;_!==v;++_,S+=4)a.copy(h[_]).applyMatrix4(A,o),a.normal.toArray(m,S),m[S+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function a0(s){let e=new WeakMap;function t(a,o){return o===Fa?a.mapping=kn:o===Ia&&(a.mapping=On),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Fa||o===Ia)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new Qp(c.height);return l.fromEquirectangularTexture(s,a),e.set(a,l),a.addEventListener("dispose",n),t(l.texture,a.mapping)}else return null}}return a}function n(a){const o=a.target;o.removeEventListener("dispose",n);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}const ds=4,Sd=[.125,.215,.35,.446,.526,.582],_n=20,Oo=new gd,Ed=new Pe;let zo=null,Wo=0,Go=0,Ho=!1;const Sn=(1+Math.sqrt(5))/2,hs=1/Sn,xd=[new W(-Sn,hs,0),new W(Sn,hs,0),new W(-hs,0,Sn),new W(hs,0,Sn),new W(0,Sn,-hs),new W(0,Sn,hs),new W(-1,1,-1),new W(1,1,-1),new W(-1,1,1),new W(1,1,1)];class wd{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,n=100){zo=this._renderer.getRenderTarget(),Wo=this._renderer.getActiveCubeFace(),Go=this._renderer.getActiveMipmapLevel(),Ho=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,i,n,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Cd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=yd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(zo,Wo,Go),this._renderer.xr.enabled=Ho,e.scissorTest=!1,Pr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===kn||e.mapping===On?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),zo=this._renderer.getRenderTarget(),Wo=this._renderer.getActiveCubeFace(),Go=this._renderer.getActiveMipmapLevel(),Ho=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:wi,minFilter:wi,generateMipmaps:!1,type:xs,format:pi,colorSpace:Hn,depthBuffer:!1},n=bd(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=bd(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=o0(r)),this._blurMaterial=l0(r,e,t)}return n}_compileMaterial(e){const t=new Gt(this._lodPlanes[0],e);this._renderer.compile(t,Oo)}_sceneToCubeUV(e,t,i,n){const o=new si(90,1,t,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,u=d.toneMapping;d.getClearColor(Ed),d.toneMapping=Ji,d.autoClear=!1;const p=new Jc({name:"PMREM.Background",side:zt,depthWrite:!1,depthTest:!1}),g=new Gt(new Is,p);let v=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,v=!0):(p.color.copy(Ed),v=!0);for(let f=0;f<6;f++){const A=f%3;A===0?(o.up.set(0,c[f],0),o.lookAt(l[f],0,0)):A===1?(o.up.set(0,0,c[f]),o.lookAt(0,l[f],0)):(o.up.set(0,c[f],0),o.lookAt(0,0,l[f]));const _=this._cubeSize;Pr(n,A*_,f>2?_:0,_,_),d.setRenderTarget(n),v&&d.render(g,o),d.render(e,o)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=u,d.autoClear=h,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,n=e.mapping===kn||e.mapping===On;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=Cd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=yd());const r=n?this._cubemapMaterial:this._equirectMaterial,a=new Gt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;Pr(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(a,Oo)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const n=this._lodPlanes.length;for(let r=1;r<n;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=xd[(n-r-1)%xd.length];this._blur(e,r-1,r,a,o)}t.autoClear=i}_blur(e,t,i,n,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,n,"latitudinal",r),this._halfBlur(a,e,i,i,n,"longitudinal",r)}_halfBlur(e,t,i,n,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,h=new Gt(this._lodPlanes[n],l),u=l.uniforms,p=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*_n-1),v=r/g,m=isFinite(r)?1+Math.floor(d*v):_n;m>_n&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${_n}`);const f=[];let A=0;for(let U=0;U<_n;++U){const I=U/v,x=Math.exp(-I*I/2);f.push(x),U===0?A+=x:U<m&&(A+=2*x)}for(let U=0;U<f.length;U++)f[U]=f[U]/A;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=f,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:_}=this;u.dTheta.value=g,u.mipInt.value=_-i;const S=this._sizeLods[n],C=3*S*(n>_-ds?n-_+ds:0),y=4*(this._cubeSize-S);Pr(t,C,y,3*S,2*S),c.setRenderTarget(t),c.render(h,Oo)}}function o0(s){const e=[],t=[],i=[];let n=s;const r=s-ds+1+Sd.length;for(let a=0;a<r;a++){const o=Math.pow(2,n);t.push(o);let c=1/o;a>s-ds?c=Sd[a-s+ds-1]:a===0&&(c=0),i.push(c);const l=1/(o-2),d=-l,h=1+l,u=[d,d,h,d,h,h,d,d,h,h,d,h],p=6,g=6,v=3,m=2,f=1,A=new Float32Array(v*g*p),_=new Float32Array(m*g*p),S=new Float32Array(f*g*p);for(let y=0;y<p;y++){const U=y%3*2/3-1,I=y>2?0:-1,x=[U,I,0,U+2/3,I,0,U+2/3,I+1,0,U,I,0,U+2/3,I+1,0,U,I+1,0];A.set(x,v*g*y),_.set(u,m*g*y);const E=[y,y,y,y,y,y];S.set(E,f*g*y)}const C=new _i;C.setAttribute("position",new yi(A,v)),C.setAttribute("uv",new yi(_,m)),C.setAttribute("faceIndex",new yi(S,f)),e.push(C),n>ds&&n--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function bd(s,e,t){const i=new un(s,e,t);return i.texture.mapping=$s,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Pr(s,e,t,i,n){s.viewport.set(e,t,i,n),s.scissor.set(e,t,i,n)}function l0(s,e,t){const i=new Float32Array(_n),n=new W(0,1,0);return new $i({name:"SphericalGaussianBlur",defines:{n:_n,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:n}},vertexShader:Jo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Hi,depthTest:!1,depthWrite:!1})}function yd(){return new $i({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Jo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Hi,depthTest:!1,depthWrite:!1})}function Cd(){return new $i({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Jo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Hi,depthTest:!1,depthWrite:!1})}function Jo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function c0(s){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const c=o.mapping,l=c===Fa||c===Ia,d=c===kn||c===On;if(l||d){let h=e.get(o);const u=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return t===null&&(t=new wd(s)),h=l?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{const p=o.image;return l&&p&&p.height>0||d&&p&&n(p)?(t===null&&(t=new wd(s)),h=l?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",r),h.texture):null}}}return o}function n(o){let c=0;const l=6;for(let d=0;d<l;d++)o[d]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function d0(s){const e={};function t(i){if(e[i]!==void 0)return e[i];let n;switch(i){case"WEBGL_depth_texture":n=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":n=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":n=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":n=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:n=s.getExtension(i)}return e[i]=n,n}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const n=t(i);return n===null&&Zn("THREE.WebGLRenderer: "+i+" extension not supported."),n}}}function h0(s,e,t,i){const n={},r=new WeakMap;function a(h){const u=h.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete n[u.id];const p=r.get(u);p&&(e.remove(p),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(h,u){return n[u.id]===!0||(u.addEventListener("dispose",a),n[u.id]=!0,t.memory.geometries++),u}function c(h){const u=h.attributes;for(const p in u)e.update(u[p],s.ARRAY_BUFFER)}function l(h){const u=[],p=h.index,g=h.attributes.position;let v=0;if(p!==null){const A=p.array;v=p.version;for(let _=0,S=A.length;_<S;_+=3){const C=A[_+0],y=A[_+1],U=A[_+2];u.push(C,y,y,U,U,C)}}else if(g!==void 0){const A=g.array;v=g.version;for(let _=0,S=A.length/3-1;_<S;_+=3){const C=_+0,y=_+1,U=_+2;u.push(C,y,y,U,U,C)}}else return;const m=new(Tc(u)?Xc:Zc)(u,1);m.version=v;const f=r.get(h);f&&e.remove(f),r.set(h,m)}function d(h){const u=r.get(h);if(u){const p=h.index;p!==null&&u.version<p.version&&l(h)}else l(h);return r.get(h)}return{get:o,update:c,getWireframeAttribute:d}}function u0(s,e,t){let i;function n(u){i=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function c(u,p){s.drawElements(i,p,r,u*a),t.update(p,i,1)}function l(u,p,g){g!==0&&(s.drawElementsInstanced(i,p,r,u*a,g),t.update(p,i,g))}function d(u,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,r,u,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];t.update(m,i,1)}function h(u,p,g,v){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<u.length;f++)l(u[f]/a,p[f],v[f]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,r,u,0,v,0,g);let f=0;for(let A=0;A<g;A++)f+=p[A]*v[A];t.update(f,i,1)}}this.setMode=n,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=d,this.renderMultiDrawInstances=h}function f0(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function n(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:n,update:i}}function p0(s,e,t){const i=new WeakMap,n=new mt;function r(a,o,c){const l=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=d!==void 0?d.length:0;let u=i.get(o);if(u===void 0||u.count!==h){let x=function(){U.dispose(),i.delete(o),o.removeEventListener("dispose",x)};u!==void 0&&u.texture.dispose();const p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],A=o.morphAttributes.color||[];let _=0;p===!0&&(_=1),g===!0&&(_=2),v===!0&&(_=3);let S=o.attributes.position.count*_,C=1;S>e.maxTextureSize&&(C=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const y=new Float32Array(S*C*4*h),U=new Dc(y,S,C,h);U.type=Ri,U.needsUpdate=!0;const I=_*4;for(let E=0;E<h;E++){const M=m[E],R=f[E],F=A[E],B=S*C*4*E;for(let z=0;z<M.count;z++){const Q=z*I;p===!0&&(n.fromBufferAttribute(M,z),y[B+Q+0]=n.x,y[B+Q+1]=n.y,y[B+Q+2]=n.z,y[B+Q+3]=0),g===!0&&(n.fromBufferAttribute(R,z),y[B+Q+4]=n.x,y[B+Q+5]=n.y,y[B+Q+6]=n.z,y[B+Q+7]=0),v===!0&&(n.fromBufferAttribute(F,z),y[B+Q+8]=n.x,y[B+Q+9]=n.y,y[B+Q+10]=n.z,y[B+Q+11]=F.itemSize===4?n.w:1)}}u={count:h,texture:U,size:new Qe(S,C)},i.set(o,u),o.addEventListener("dispose",x)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",a.morphTexture,t);else{let p=0;for(let v=0;v<l.length;v++)p+=l[v];const g=o.morphTargetsRelative?1:1-p;c.getUniforms().setValue(s,"morphTargetBaseInfluence",g),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function m0(s,e,t,i){let n=new WeakMap;function r(c){const l=i.render.frame,d=c.geometry,h=e.get(c,d);if(n.get(h)!==l&&(e.update(h),n.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),n.get(c)!==l&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),n.set(c,l))),c.isSkinnedMesh){const u=c.skeleton;n.get(u)!==l&&(u.update(),n.set(u,l))}return h}function a(){n=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}const Ud=new Qt,Md=new dd(1,1),Td=new Dc,Fd=new _p,Id=new id,Rd=[],Bd=[],Dd=new Float32Array(16),Qd=new Float32Array(9),Nd=new Float32Array(4);function us(s,e,t){const i=s[0];if(i<=0||i>0)return s;const n=e*t;let r=Rd[n];if(r===void 0&&(r=new Float32Array(n),Rd[n]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function wt(s,e){if(s.length!==e.length)return!1;for(let t=0,i=s.length;t<i;t++)if(s[t]!==e[t])return!1;return!0}function bt(s,e){for(let t=0,i=e.length;t<i;t++)s[t]=e[t]}function Vr(s,e){let t=Bd[e];t===void 0&&(t=new Int32Array(e),Bd[e]=t);for(let i=0;i!==e;++i)t[i]=s.allocateTextureUnit();return t}function g0(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function v0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;s.uniform2fv(this.addr,e),bt(t,e)}}function A0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(wt(t,e))return;s.uniform3fv(this.addr,e),bt(t,e)}}function _0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;s.uniform4fv(this.addr,e),bt(t,e)}}function S0(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(wt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),bt(t,e)}else{if(wt(t,i))return;Nd.set(i),s.uniformMatrix2fv(this.addr,!1,Nd),bt(t,i)}}function E0(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(wt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),bt(t,e)}else{if(wt(t,i))return;Qd.set(i),s.uniformMatrix3fv(this.addr,!1,Qd),bt(t,i)}}function x0(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(wt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),bt(t,e)}else{if(wt(t,i))return;Dd.set(i),s.uniformMatrix4fv(this.addr,!1,Dd),bt(t,i)}}function w0(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function b0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;s.uniform2iv(this.addr,e),bt(t,e)}}function y0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(wt(t,e))return;s.uniform3iv(this.addr,e),bt(t,e)}}function C0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;s.uniform4iv(this.addr,e),bt(t,e)}}function U0(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function M0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;s.uniform2uiv(this.addr,e),bt(t,e)}}function T0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(wt(t,e))return;s.uniform3uiv(this.addr,e),bt(t,e)}}function F0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;s.uniform4uiv(this.addr,e),bt(t,e)}}function I0(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n);let r;this.type===s.SAMPLER_2D_SHADOW?(Md.compareFunction=Cc,r=Md):r=Ud,t.setTexture2D(e||r,n)}function R0(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTexture3D(e||Fd,n)}function B0(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTextureCube(e||Id,n)}function D0(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTexture2DArray(e||Td,n)}function Q0(s){switch(s){case 5126:return g0;case 35664:return v0;case 35665:return A0;case 35666:return _0;case 35674:return S0;case 35675:return E0;case 35676:return x0;case 5124:case 35670:return w0;case 35667:case 35671:return b0;case 35668:case 35672:return y0;case 35669:case 35673:return C0;case 5125:return U0;case 36294:return M0;case 36295:return T0;case 36296:return F0;case 35678:case 36198:case 36298:case 36306:case 35682:return I0;case 35679:case 36299:case 36307:return R0;case 35680:case 36300:case 36308:case 36293:return B0;case 36289:case 36303:case 36311:case 36292:return D0}}function N0(s,e){s.uniform1fv(this.addr,e)}function L0(s,e){const t=us(e,this.size,2);s.uniform2fv(this.addr,t)}function P0(s,e){const t=us(e,this.size,3);s.uniform3fv(this.addr,t)}function V0(s,e){const t=us(e,this.size,4);s.uniform4fv(this.addr,t)}function k0(s,e){const t=us(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function O0(s,e){const t=us(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function z0(s,e){const t=us(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function W0(s,e){s.uniform1iv(this.addr,e)}function G0(s,e){s.uniform2iv(this.addr,e)}function H0(s,e){s.uniform3iv(this.addr,e)}function J0(s,e){s.uniform4iv(this.addr,e)}function Z0(s,e){s.uniform1uiv(this.addr,e)}function X0(s,e){s.uniform2uiv(this.addr,e)}function Y0(s,e){s.uniform3uiv(this.addr,e)}function K0(s,e){s.uniform4uiv(this.addr,e)}function j0(s,e,t){const i=this.cache,n=e.length,r=Vr(t,n);wt(i,r)||(s.uniform1iv(this.addr,r),bt(i,r));for(let a=0;a!==n;++a)t.setTexture2D(e[a]||Ud,r[a])}function q0(s,e,t){const i=this.cache,n=e.length,r=Vr(t,n);wt(i,r)||(s.uniform1iv(this.addr,r),bt(i,r));for(let a=0;a!==n;++a)t.setTexture3D(e[a]||Fd,r[a])}function $0(s,e,t){const i=this.cache,n=e.length,r=Vr(t,n);wt(i,r)||(s.uniform1iv(this.addr,r),bt(i,r));for(let a=0;a!==n;++a)t.setTextureCube(e[a]||Id,r[a])}function ev(s,e,t){const i=this.cache,n=e.length,r=Vr(t,n);wt(i,r)||(s.uniform1iv(this.addr,r),bt(i,r));for(let a=0;a!==n;++a)t.setTexture2DArray(e[a]||Td,r[a])}function tv(s){switch(s){case 5126:return N0;case 35664:return L0;case 35665:return P0;case 35666:return V0;case 35674:return k0;case 35675:return O0;case 35676:return z0;case 5124:case 35670:return W0;case 35667:case 35671:return G0;case 35668:case 35672:return H0;case 35669:case 35673:return J0;case 5125:return Z0;case 36294:return X0;case 36295:return Y0;case 36296:return K0;case 35678:case 36198:case 36298:case 36306:case 35682:return j0;case 35679:case 36299:case 36307:return q0;case 35680:case 36300:case 36308:case 36293:return $0;case 36289:case 36303:case 36311:case 36292:return ev}}class iv{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Q0(t.type)}}class nv{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=tv(t.type)}}class sv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const n=this.seq;for(let r=0,a=n.length;r!==a;++r){const o=n[r];o.setValue(e,t[o.id],i)}}}const Zo=/(\w+)(\])?(\[|\.)?/g;function Ld(s,e){s.seq.push(e),s.map[e.id]=e}function rv(s,e,t){const i=s.name,n=i.length;for(Zo.lastIndex=0;;){const r=Zo.exec(i),a=Zo.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===n){Ld(t,l===void 0?new iv(o,s,e):new nv(o,s,e));break}else{let h=t.map[o];h===void 0&&(h=new sv(o),Ld(t,h)),t=h}}}class kr{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let n=0;n<i;++n){const r=e.getActiveUniform(t,n),a=e.getUniformLocation(t,r.name);rv(r,a,this)}}setValue(e,t,i,n){const r=this.map[t];r!==void 0&&r.setValue(e,i,n)}setOptional(e,t,i){const n=t[i];n!==void 0&&this.setValue(e,i,n)}static upload(e,t,i,n){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,n)}}static seqWithValue(e,t){const i=[];for(let n=0,r=e.length;n!==r;++n){const a=e[n];a.id in t&&i.push(a)}return i}}function Pd(s,e,t){const i=s.createShader(e);return s.shaderSource(i,t),s.compileShader(i),i}const av=37297;let ov=0;function lv(s,e){const t=s.split(`
`),i=[],n=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=n;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const Vd=new Ne;function cv(s){We._getMatrix(Vd,We.workingColorSpace,s);const e=`mat3( ${Vd.elements.map(t=>t.toFixed(4))} )`;switch(We.getTransfer(s)){case or:return[e,"LinearTransferOETF"];case tt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function kd(s,e,t){const i=s.getShaderParameter(e,s.COMPILE_STATUS),n=s.getShaderInfoLog(e).trim();if(i&&n==="")return"";const r=/ERROR: 0:(\d+)/.exec(n);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+n+`

`+lv(s.getShaderSource(e),a)}else return n}function dv(s,e){const t=cv(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function hv(s,e){let t;switch(e){case Gf:t="Linear";break;case Hf:t="Reinhard";break;case Jf:t="Cineon";break;case Zf:t="ACESFilmic";break;case Yf:t="AgX";break;case Kf:t="Neutral";break;case Xf:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Or=new W;function uv(){We.getLuminanceCoefficients(Or);const s=Or.x.toFixed(4),e=Or.y.toFixed(4),t=Or.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function fv(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Qs).join(`
`)}function pv(s){const e=[];for(const t in s){const i=s[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function mv(s,e){const t={},i=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){const r=s.getActiveAttrib(e,n),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function Qs(s){return s!==""}function Od(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function zd(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const gv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Xo(s){return s.replace(gv,Av)}const vv=new Map;function Av(s,e){let t=Ve[e];if(t===void 0){const i=vv.get(e);if(i!==void 0)t=Ve[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Xo(t)}const _v=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Wd(s){return s.replace(_v,Sv)}function Sv(s,e,t,i){let n="";for(let r=parseInt(e);r<parseInt(t);r++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return n}function Gd(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Ev(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===cc?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===wf?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Mi&&(e="SHADOWMAP_TYPE_VSM"),e}function xv(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case kn:case On:e="ENVMAP_TYPE_CUBE";break;case $s:e="ENVMAP_TYPE_CUBE_UV";break}return e}function wv(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case On:e="ENVMAP_MODE_REFRACTION";break}return e}function bv(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Ta:e="ENVMAP_BLENDING_MULTIPLY";break;case zf:e="ENVMAP_BLENDING_MIX";break;case Wf:e="ENVMAP_BLENDING_ADD";break}return e}function yv(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Cv(s,e,t,i){const n=s.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=Ev(t),l=xv(t),d=wv(t),h=bv(t),u=yv(t),p=fv(t),g=pv(r),v=n.createProgram();let m,f,A=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Qs).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Qs).join(`
`),f.length>0&&(f+=`
`)):(m=[Gd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Qs).join(`
`),f=[Gd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+d:"",t.envMap?"#define "+h:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ji?"#define TONE_MAPPING":"",t.toneMapping!==Ji?Ve.tonemapping_pars_fragment:"",t.toneMapping!==Ji?hv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,dv("linearToOutputTexel",t.outputColorSpace),uv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Qs).join(`
`)),a=Xo(a),a=Od(a,t),a=zd(a,t),o=Xo(o),o=Od(o,t),o=zd(o,t),a=Wd(a),o=Wd(o),t.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===Mc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Mc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const _=A+m+a,S=A+f+o,C=Pd(n,n.VERTEX_SHADER,_),y=Pd(n,n.FRAGMENT_SHADER,S);n.attachShader(v,C),n.attachShader(v,y),t.index0AttributeName!==void 0?n.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&n.bindAttribLocation(v,0,"position"),n.linkProgram(v);function U(M){if(s.debug.checkShaderErrors){const R=n.getProgramInfoLog(v).trim(),F=n.getShaderInfoLog(C).trim(),B=n.getShaderInfoLog(y).trim();let z=!0,Q=!0;if(n.getProgramParameter(v,n.LINK_STATUS)===!1)if(z=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(n,v,C,y);else{const N=kd(n,C,"vertex"),D=kd(n,y,"fragment");console.error("THREE.WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(v,n.VALIDATE_STATUS)+`

Material Name: `+M.name+`
Material Type: `+M.type+`

Program Info Log: `+R+`
`+N+`
`+D)}else R!==""?console.warn("THREE.WebGLProgram: Program Info Log:",R):(F===""||B==="")&&(Q=!1);Q&&(M.diagnostics={runnable:z,programLog:R,vertexShader:{log:F,prefix:m},fragmentShader:{log:B,prefix:f}})}n.deleteShader(C),n.deleteShader(y),I=new kr(n,v),x=mv(n,v)}let I;this.getUniforms=function(){return I===void 0&&U(this),I};let x;this.getAttributes=function(){return x===void 0&&U(this),x};let E=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=n.getProgramParameter(v,av)),E},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=ov++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=C,this.fragmentShader=y,this}let Uv=0;class Mv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,n=this._getShaderStage(t),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(n)===!1&&(a.add(n),n.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Tv(e),t.set(e,i)),i}}class Tv{constructor(e){this.id=Uv++,this.code=e,this.usedTimes=0}}function Fv(s,e,t,i,n,r,a){const o=new Pc,c=new Mv,l=new Set,d=[],h=n.logarithmicDepthBuffer,u=n.vertexTextures;let p=n.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(x){return l.add(x),x===0?"uv":`uv${x}`}function m(x,E,M,R,F){const B=R.fog,z=F.geometry,Q=x.isMeshStandardMaterial?R.environment:null,N=(x.isMeshStandardMaterial?t:e).get(x.envMap||Q),D=N&&N.mapping===$s?N.image.height:null,Z=g[x.type];x.precision!==null&&(p=n.getMaxPrecision(x.precision),p!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",p,"instead."));const $=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,ae=$!==void 0?$.length:0;let be=0;z.morphAttributes.position!==void 0&&(be=1),z.morphAttributes.normal!==void 0&&(be=2),z.morphAttributes.color!==void 0&&(be=3);let Be,k,Y,se;if(Z){const et=Ci[Z];Be=et.vertexShader,k=et.fragmentShader}else Be=x.vertexShader,k=x.fragmentShader,c.update(x),Y=c.getVertexShaderID(x),se=c.getFragmentShaderID(x);const ee=s.getRenderTarget(),ge=s.state.buffers.depth.getReversed(),Ee=F.isInstancedMesh===!0,Te=F.isBatchedMesh===!0,ut=!!x.map,Ze=!!x.matcap,_t=!!N,L=!!x.aoMap,oi=!!x.lightMap,Ge=!!x.bumpMap,He=!!x.normalMap,xe=!!x.displacementMap,ot=!!x.emissiveMap,we=!!x.metalnessMap,T=!!x.roughnessMap,w=x.anisotropy>0,G=x.clearcoat>0,j=x.dispersion>0,te=x.iridescence>0,K=x.sheen>0,_e=x.transmission>0,ce=w&&!!x.anisotropyMap,fe=G&&!!x.clearcoatMap,Xe=G&&!!x.clearcoatNormalMap,ne=G&&!!x.clearcoatRoughnessMap,pe=te&&!!x.iridescenceMap,Ue=te&&!!x.iridescenceThicknessMap,Fe=K&&!!x.sheenColorMap,me=K&&!!x.sheenRoughnessMap,Je=!!x.specularMap,ke=!!x.specularColorMap,at=!!x.specularIntensityMap,P=_e&&!!x.transmissionMap,oe=_e&&!!x.thicknessMap,X=!!x.gradientMap,q=!!x.alphaMap,he=x.alphaTest>0,de=!!x.alphaHash,Le=!!x.extensions;let gt=Ji;x.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(gt=s.toneMapping);const Bt={shaderID:Z,shaderType:x.type,shaderName:x.name,vertexShader:Be,fragmentShader:k,defines:x.defines,customVertexShaderID:Y,customFragmentShaderID:se,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:p,batching:Te,batchingColor:Te&&F._colorsTexture!==null,instancing:Ee,instancingColor:Ee&&F.instanceColor!==null,instancingMorph:Ee&&F.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:ee===null?s.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:Hn,alphaToCoverage:!!x.alphaToCoverage,map:ut,matcap:Ze,envMap:_t,envMapMode:_t&&N.mapping,envMapCubeUVHeight:D,aoMap:L,lightMap:oi,bumpMap:Ge,normalMap:He,displacementMap:u&&xe,emissiveMap:ot,normalMapObjectSpace:He&&x.normalMapType===ep,normalMapTangentSpace:He&&x.normalMapType===bc,metalnessMap:we,roughnessMap:T,anisotropy:w,anisotropyMap:ce,clearcoat:G,clearcoatMap:fe,clearcoatNormalMap:Xe,clearcoatRoughnessMap:ne,dispersion:j,iridescence:te,iridescenceMap:pe,iridescenceThicknessMap:Ue,sheen:K,sheenColorMap:Fe,sheenRoughnessMap:me,specularMap:Je,specularColorMap:ke,specularIntensityMap:at,transmission:_e,transmissionMap:P,thicknessMap:oe,gradientMap:X,opaque:x.transparent===!1&&x.blending===Pn&&x.alphaToCoverage===!1,alphaMap:q,alphaTest:he,alphaHash:de,combine:x.combine,mapUv:ut&&v(x.map.channel),aoMapUv:L&&v(x.aoMap.channel),lightMapUv:oi&&v(x.lightMap.channel),bumpMapUv:Ge&&v(x.bumpMap.channel),normalMapUv:He&&v(x.normalMap.channel),displacementMapUv:xe&&v(x.displacementMap.channel),emissiveMapUv:ot&&v(x.emissiveMap.channel),metalnessMapUv:we&&v(x.metalnessMap.channel),roughnessMapUv:T&&v(x.roughnessMap.channel),anisotropyMapUv:ce&&v(x.anisotropyMap.channel),clearcoatMapUv:fe&&v(x.clearcoatMap.channel),clearcoatNormalMapUv:Xe&&v(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ne&&v(x.clearcoatRoughnessMap.channel),iridescenceMapUv:pe&&v(x.iridescenceMap.channel),iridescenceThicknessMapUv:Ue&&v(x.iridescenceThicknessMap.channel),sheenColorMapUv:Fe&&v(x.sheenColorMap.channel),sheenRoughnessMapUv:me&&v(x.sheenRoughnessMap.channel),specularMapUv:Je&&v(x.specularMap.channel),specularColorMapUv:ke&&v(x.specularColorMap.channel),specularIntensityMapUv:at&&v(x.specularIntensityMap.channel),transmissionMapUv:P&&v(x.transmissionMap.channel),thicknessMapUv:oe&&v(x.thicknessMap.channel),alphaMapUv:q&&v(x.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(He||w),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!z.attributes.uv&&(ut||q),fog:!!B,useFog:x.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:ge,skinning:F.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:ae,morphTextureStride:be,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:x.dithering,shadowMapEnabled:s.shadowMap.enabled&&M.length>0,shadowMapType:s.shadowMap.type,toneMapping:gt,decodeVideoTexture:ut&&x.map.isVideoTexture===!0&&We.getTransfer(x.map.colorSpace)===tt,decodeVideoTextureEmissive:ot&&x.emissiveMap.isVideoTexture===!0&&We.getTransfer(x.emissiveMap.colorSpace)===tt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Fi,flipSided:x.side===zt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Le&&x.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Le&&x.extensions.multiDraw===!0||Te)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Bt.vertexUv1s=l.has(1),Bt.vertexUv2s=l.has(2),Bt.vertexUv3s=l.has(3),l.clear(),Bt}function f(x){const E=[];if(x.shaderID?E.push(x.shaderID):(E.push(x.customVertexShaderID),E.push(x.customFragmentShaderID)),x.defines!==void 0)for(const M in x.defines)E.push(M),E.push(x.defines[M]);return x.isRawShaderMaterial===!1&&(A(E,x),_(E,x),E.push(s.outputColorSpace)),E.push(x.customProgramCacheKey),E.join()}function A(x,E){x.push(E.precision),x.push(E.outputColorSpace),x.push(E.envMapMode),x.push(E.envMapCubeUVHeight),x.push(E.mapUv),x.push(E.alphaMapUv),x.push(E.lightMapUv),x.push(E.aoMapUv),x.push(E.bumpMapUv),x.push(E.normalMapUv),x.push(E.displacementMapUv),x.push(E.emissiveMapUv),x.push(E.metalnessMapUv),x.push(E.roughnessMapUv),x.push(E.anisotropyMapUv),x.push(E.clearcoatMapUv),x.push(E.clearcoatNormalMapUv),x.push(E.clearcoatRoughnessMapUv),x.push(E.iridescenceMapUv),x.push(E.iridescenceThicknessMapUv),x.push(E.sheenColorMapUv),x.push(E.sheenRoughnessMapUv),x.push(E.specularMapUv),x.push(E.specularColorMapUv),x.push(E.specularIntensityMapUv),x.push(E.transmissionMapUv),x.push(E.thicknessMapUv),x.push(E.combine),x.push(E.fogExp2),x.push(E.sizeAttenuation),x.push(E.morphTargetsCount),x.push(E.morphAttributeCount),x.push(E.numDirLights),x.push(E.numPointLights),x.push(E.numSpotLights),x.push(E.numSpotLightMaps),x.push(E.numHemiLights),x.push(E.numRectAreaLights),x.push(E.numDirLightShadows),x.push(E.numPointLightShadows),x.push(E.numSpotLightShadows),x.push(E.numSpotLightShadowsWithMaps),x.push(E.numLightProbes),x.push(E.shadowMapType),x.push(E.toneMapping),x.push(E.numClippingPlanes),x.push(E.numClipIntersection),x.push(E.depthPacking)}function _(x,E){o.disableAll(),E.supportsVertexTextures&&o.enable(0),E.instancing&&o.enable(1),E.instancingColor&&o.enable(2),E.instancingMorph&&o.enable(3),E.matcap&&o.enable(4),E.envMap&&o.enable(5),E.normalMapObjectSpace&&o.enable(6),E.normalMapTangentSpace&&o.enable(7),E.clearcoat&&o.enable(8),E.iridescence&&o.enable(9),E.alphaTest&&o.enable(10),E.vertexColors&&o.enable(11),E.vertexAlphas&&o.enable(12),E.vertexUv1s&&o.enable(13),E.vertexUv2s&&o.enable(14),E.vertexUv3s&&o.enable(15),E.vertexTangents&&o.enable(16),E.anisotropy&&o.enable(17),E.alphaHash&&o.enable(18),E.batching&&o.enable(19),E.dispersion&&o.enable(20),E.batchingColor&&o.enable(21),x.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.reverseDepthBuffer&&o.enable(4),E.skinning&&o.enable(5),E.morphTargets&&o.enable(6),E.morphNormals&&o.enable(7),E.morphColors&&o.enable(8),E.premultipliedAlpha&&o.enable(9),E.shadowMapEnabled&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),E.decodeVideoTextureEmissive&&o.enable(20),E.alphaToCoverage&&o.enable(21),x.push(o.mask)}function S(x){const E=g[x.type];let M;if(E){const R=Ci[E];M=Ip.clone(R.uniforms)}else M=x.uniforms;return M}function C(x,E){let M;for(let R=0,F=d.length;R<F;R++){const B=d[R];if(B.cacheKey===E){M=B,++M.usedTimes;break}}return M===void 0&&(M=new Cv(s,E,x,r),d.push(M)),M}function y(x){if(--x.usedTimes===0){const E=d.indexOf(x);d[E]=d[d.length-1],d.pop(),x.destroy()}}function U(x){c.remove(x)}function I(){c.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:S,acquireProgram:C,releaseProgram:y,releaseShaderCache:U,programs:d,dispose:I}}function Iv(){let s=new WeakMap;function e(a){return s.has(a)}function t(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function i(a){s.delete(a)}function n(a,o,c){s.get(a)[o]=c}function r(){s=new WeakMap}return{has:e,get:t,remove:i,update:n,dispose:r}}function Rv(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Hd(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Jd(){const s=[];let e=0;const t=[],i=[],n=[];function r(){e=0,t.length=0,i.length=0,n.length=0}function a(h,u,p,g,v,m){let f=s[e];return f===void 0?(f={id:h.id,object:h,geometry:u,material:p,groupOrder:g,renderOrder:h.renderOrder,z:v,group:m},s[e]=f):(f.id=h.id,f.object=h,f.geometry=u,f.material=p,f.groupOrder=g,f.renderOrder=h.renderOrder,f.z=v,f.group=m),e++,f}function o(h,u,p,g,v,m){const f=a(h,u,p,g,v,m);p.transmission>0?i.push(f):p.transparent===!0?n.push(f):t.push(f)}function c(h,u,p,g,v,m){const f=a(h,u,p,g,v,m);p.transmission>0?i.unshift(f):p.transparent===!0?n.unshift(f):t.unshift(f)}function l(h,u){t.length>1&&t.sort(h||Rv),i.length>1&&i.sort(u||Hd),n.length>1&&n.sort(u||Hd)}function d(){for(let h=e,u=s.length;h<u;h++){const p=s[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:n,init:r,push:o,unshift:c,finish:d,sort:l}}function Bv(){let s=new WeakMap;function e(i,n){const r=s.get(i);let a;return r===void 0?(a=new Jd,s.set(i,[a])):n>=r.length?(a=new Jd,r.push(a)):a=r[n],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function Dv(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new W,color:new Pe};break;case"SpotLight":t={position:new W,direction:new W,color:new Pe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new W,color:new Pe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new W,skyColor:new Pe,groundColor:new Pe};break;case"RectAreaLight":t={color:new Pe,position:new W,halfWidth:new W,halfHeight:new W};break}return s[e.id]=t,t}}}function Qv(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qe,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let Nv=0;function Lv(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function Pv(s){const e=new Dv,t=Qv(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new W);const n=new W,r=new lt,a=new lt;function o(l){let d=0,h=0,u=0;for(let x=0;x<9;x++)i.probe[x].set(0,0,0);let p=0,g=0,v=0,m=0,f=0,A=0,_=0,S=0,C=0,y=0,U=0;l.sort(Lv);for(let x=0,E=l.length;x<E;x++){const M=l[x],R=M.color,F=M.intensity,B=M.distance,z=M.shadow&&M.shadow.map?M.shadow.map.texture:null;if(M.isAmbientLight)d+=R.r*F,h+=R.g*F,u+=R.b*F;else if(M.isLightProbe){for(let Q=0;Q<9;Q++)i.probe[Q].addScaledVector(M.sh.coefficients[Q],F);U++}else if(M.isDirectionalLight){const Q=e.get(M);if(Q.color.copy(M.color).multiplyScalar(M.intensity),M.castShadow){const N=M.shadow,D=t.get(M);D.shadowIntensity=N.intensity,D.shadowBias=N.bias,D.shadowNormalBias=N.normalBias,D.shadowRadius=N.radius,D.shadowMapSize=N.mapSize,i.directionalShadow[p]=D,i.directionalShadowMap[p]=z,i.directionalShadowMatrix[p]=M.shadow.matrix,A++}i.directional[p]=Q,p++}else if(M.isSpotLight){const Q=e.get(M);Q.position.setFromMatrixPosition(M.matrixWorld),Q.color.copy(R).multiplyScalar(F),Q.distance=B,Q.coneCos=Math.cos(M.angle),Q.penumbraCos=Math.cos(M.angle*(1-M.penumbra)),Q.decay=M.decay,i.spot[v]=Q;const N=M.shadow;if(M.map&&(i.spotLightMap[C]=M.map,C++,N.updateMatrices(M),M.castShadow&&y++),i.spotLightMatrix[v]=N.matrix,M.castShadow){const D=t.get(M);D.shadowIntensity=N.intensity,D.shadowBias=N.bias,D.shadowNormalBias=N.normalBias,D.shadowRadius=N.radius,D.shadowMapSize=N.mapSize,i.spotShadow[v]=D,i.spotShadowMap[v]=z,S++}v++}else if(M.isRectAreaLight){const Q=e.get(M);Q.color.copy(R).multiplyScalar(F),Q.halfWidth.set(M.width*.5,0,0),Q.halfHeight.set(0,M.height*.5,0),i.rectArea[m]=Q,m++}else if(M.isPointLight){const Q=e.get(M);if(Q.color.copy(M.color).multiplyScalar(M.intensity),Q.distance=M.distance,Q.decay=M.decay,M.castShadow){const N=M.shadow,D=t.get(M);D.shadowIntensity=N.intensity,D.shadowBias=N.bias,D.shadowNormalBias=N.normalBias,D.shadowRadius=N.radius,D.shadowMapSize=N.mapSize,D.shadowCameraNear=N.camera.near,D.shadowCameraFar=N.camera.far,i.pointShadow[g]=D,i.pointShadowMap[g]=z,i.pointShadowMatrix[g]=M.shadow.matrix,_++}i.point[g]=Q,g++}else if(M.isHemisphereLight){const Q=e.get(M);Q.skyColor.copy(M.color).multiplyScalar(F),Q.groundColor.copy(M.groundColor).multiplyScalar(F),i.hemi[f]=Q,f++}}m>0&&(s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=re.LTC_FLOAT_1,i.rectAreaLTC2=re.LTC_FLOAT_2):(i.rectAreaLTC1=re.LTC_HALF_1,i.rectAreaLTC2=re.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=h,i.ambient[2]=u;const I=i.hash;(I.directionalLength!==p||I.pointLength!==g||I.spotLength!==v||I.rectAreaLength!==m||I.hemiLength!==f||I.numDirectionalShadows!==A||I.numPointShadows!==_||I.numSpotShadows!==S||I.numSpotMaps!==C||I.numLightProbes!==U)&&(i.directional.length=p,i.spot.length=v,i.rectArea.length=m,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=A,i.directionalShadowMap.length=A,i.pointShadow.length=_,i.pointShadowMap.length=_,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=A,i.pointShadowMatrix.length=_,i.spotLightMatrix.length=S+C-y,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=y,i.numLightProbes=U,I.directionalLength=p,I.pointLength=g,I.spotLength=v,I.rectAreaLength=m,I.hemiLength=f,I.numDirectionalShadows=A,I.numPointShadows=_,I.numSpotShadows=S,I.numSpotMaps=C,I.numLightProbes=U,i.version=Nv++)}function c(l,d){let h=0,u=0,p=0,g=0,v=0;const m=d.matrixWorldInverse;for(let f=0,A=l.length;f<A;f++){const _=l[f];if(_.isDirectionalLight){const S=i.directional[h];S.direction.setFromMatrixPosition(_.matrixWorld),n.setFromMatrixPosition(_.target.matrixWorld),S.direction.sub(n),S.direction.transformDirection(m),h++}else if(_.isSpotLight){const S=i.spot[p];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(_.matrixWorld),n.setFromMatrixPosition(_.target.matrixWorld),S.direction.sub(n),S.direction.transformDirection(m),p++}else if(_.isRectAreaLight){const S=i.rectArea[g];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(m),a.identity(),r.copy(_.matrixWorld),r.premultiply(m),a.extractRotation(r),S.halfWidth.set(_.width*.5,0,0),S.halfHeight.set(0,_.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),g++}else if(_.isPointLight){const S=i.point[u];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(m),u++}else if(_.isHemisphereLight){const S=i.hemi[v];S.direction.setFromMatrixPosition(_.matrixWorld),S.direction.transformDirection(m),v++}}}return{setup:o,setupView:c,state:i}}function Zd(s){const e=new Pv(s),t=[],i=[];function n(d){l.camera=d,t.length=0,i.length=0}function r(d){t.push(d)}function a(d){i.push(d)}function o(){e.setup(t)}function c(d){e.setupView(t,d)}const l={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:n,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function Vv(s){let e=new WeakMap;function t(n,r=0){const a=e.get(n);let o;return a===void 0?(o=new Zd(s),e.set(n,[o])):r>=a.length?(o=new Zd(s),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const kv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ov=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function zv(s,e,t){let i=new Qo;const n=new Qe,r=new Qe,a=new mt,o=new kp({depthPacking:$f}),c=new Op,l={},d=t.maxTextureSize,h={[Ti]:zt,[zt]:Ti,[Fi]:Fi},u=new $i({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Qe},radius:{value:4}},vertexShader:kv,fragmentShader:Ov}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const g=new _i;g.setAttribute("position",new yi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Gt(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=cc;let f=this.type;this.render=function(y,U,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||y.length===0)return;const x=s.getRenderTarget(),E=s.getActiveCubeFace(),M=s.getActiveMipmapLevel(),R=s.state;R.setBlending(Hi),R.buffers.color.setClear(1,1,1,1),R.buffers.depth.setTest(!0),R.setScissorTest(!1);const F=f!==Mi&&this.type===Mi,B=f===Mi&&this.type!==Mi;for(let z=0,Q=y.length;z<Q;z++){const N=y[z],D=N.shadow;if(D===void 0){console.warn("THREE.WebGLShadowMap:",N,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;n.copy(D.mapSize);const Z=D.getFrameExtents();if(n.multiply(Z),r.copy(D.mapSize),(n.x>d||n.y>d)&&(n.x>d&&(r.x=Math.floor(d/Z.x),n.x=r.x*Z.x,D.mapSize.x=r.x),n.y>d&&(r.y=Math.floor(d/Z.y),n.y=r.y*Z.y,D.mapSize.y=r.y)),D.map===null||F===!0||B===!0){const ae=this.type!==Mi?{minFilter:fi,magFilter:fi}:{};D.map!==null&&D.map.dispose(),D.map=new un(n.x,n.y,ae),D.map.texture.name=N.name+".shadowMap",D.camera.updateProjectionMatrix()}s.setRenderTarget(D.map),s.clear();const $=D.getViewportCount();for(let ae=0;ae<$;ae++){const be=D.getViewport(ae);a.set(r.x*be.x,r.y*be.y,r.x*be.z,r.y*be.w),R.viewport(a),D.updateMatrices(N,ae),i=D.getFrustum(),S(U,I,D.camera,N,this.type)}D.isPointLightShadow!==!0&&this.type===Mi&&A(D,I),D.needsUpdate=!1}f=this.type,m.needsUpdate=!1,s.setRenderTarget(x,E,M)};function A(y,U){const I=e.update(v);u.defines.VSM_SAMPLES!==y.blurSamples&&(u.defines.VSM_SAMPLES=y.blurSamples,p.defines.VSM_SAMPLES=y.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),y.mapPass===null&&(y.mapPass=new un(n.x,n.y)),u.uniforms.shadow_pass.value=y.map.texture,u.uniforms.resolution.value=y.mapSize,u.uniforms.radius.value=y.radius,s.setRenderTarget(y.mapPass),s.clear(),s.renderBufferDirect(U,null,I,u,v,null),p.uniforms.shadow_pass.value=y.mapPass.texture,p.uniforms.resolution.value=y.mapSize,p.uniforms.radius.value=y.radius,s.setRenderTarget(y.map),s.clear(),s.renderBufferDirect(U,null,I,p,v,null)}function _(y,U,I,x){let E=null;const M=I.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(M!==void 0)E=M;else if(E=I.isPointLight===!0?c:o,s.localClippingEnabled&&U.clipShadows===!0&&Array.isArray(U.clippingPlanes)&&U.clippingPlanes.length!==0||U.displacementMap&&U.displacementScale!==0||U.alphaMap&&U.alphaTest>0||U.map&&U.alphaTest>0){const R=E.uuid,F=U.uuid;let B=l[R];B===void 0&&(B={},l[R]=B);let z=B[F];z===void 0&&(z=E.clone(),B[F]=z,U.addEventListener("dispose",C)),E=z}if(E.visible=U.visible,E.wireframe=U.wireframe,x===Mi?E.side=U.shadowSide!==null?U.shadowSide:U.side:E.side=U.shadowSide!==null?U.shadowSide:h[U.side],E.alphaMap=U.alphaMap,E.alphaTest=U.alphaTest,E.map=U.map,E.clipShadows=U.clipShadows,E.clippingPlanes=U.clippingPlanes,E.clipIntersection=U.clipIntersection,E.displacementMap=U.displacementMap,E.displacementScale=U.displacementScale,E.displacementBias=U.displacementBias,E.wireframeLinewidth=U.wireframeLinewidth,E.linewidth=U.linewidth,I.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const R=s.properties.get(E);R.light=I}return E}function S(y,U,I,x,E){if(y.visible===!1)return;if(y.layers.test(U.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&E===Mi)&&(!y.frustumCulled||i.intersectsObject(y))){y.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,y.matrixWorld);const F=e.update(y),B=y.material;if(Array.isArray(B)){const z=F.groups;for(let Q=0,N=z.length;Q<N;Q++){const D=z[Q],Z=B[D.materialIndex];if(Z&&Z.visible){const $=_(y,Z,x,E);y.onBeforeShadow(s,y,U,I,F,$,D),s.renderBufferDirect(I,null,F,$,y,D),y.onAfterShadow(s,y,U,I,F,$,D)}}}else if(B.visible){const z=_(y,B,x,E);y.onBeforeShadow(s,y,U,I,F,z,null),s.renderBufferDirect(I,null,F,z,y,null),y.onAfterShadow(s,y,U,I,F,z,null)}}const R=y.children;for(let F=0,B=R.length;F<B;F++)S(R[F],U,I,x,E)}function C(y){y.target.removeEventListener("dispose",C);for(const I in l){const x=l[I],E=y.target.uuid;E in x&&(x[E].dispose(),delete x[E])}}}const Wv={[xa]:wa,[ba]:Ua,[ya]:Ma,[Vn]:Ca,[wa]:xa,[Ua]:ba,[Ma]:ya,[Ca]:Vn};function Gv(s,e){function t(){let P=!1;const oe=new mt;let X=null;const q=new mt(0,0,0,0);return{setMask:function(he){X!==he&&!P&&(s.colorMask(he,he,he,he),X=he)},setLocked:function(he){P=he},setClear:function(he,de,Le,gt,Bt){Bt===!0&&(he*=gt,de*=gt,Le*=gt),oe.set(he,de,Le,gt),q.equals(oe)===!1&&(s.clearColor(he,de,Le,gt),q.copy(oe))},reset:function(){P=!1,X=null,q.set(-1,0,0,0)}}}function i(){let P=!1,oe=!1,X=null,q=null,he=null;return{setReversed:function(de){if(oe!==de){const Le=e.get("EXT_clip_control");oe?Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.ZERO_TO_ONE_EXT):Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.NEGATIVE_ONE_TO_ONE_EXT);const gt=he;he=null,this.setClear(gt)}oe=de},getReversed:function(){return oe},setTest:function(de){de?ee(s.DEPTH_TEST):ge(s.DEPTH_TEST)},setMask:function(de){X!==de&&!P&&(s.depthMask(de),X=de)},setFunc:function(de){if(oe&&(de=Wv[de]),q!==de){switch(de){case xa:s.depthFunc(s.NEVER);break;case wa:s.depthFunc(s.ALWAYS);break;case ba:s.depthFunc(s.LESS);break;case Vn:s.depthFunc(s.LEQUAL);break;case ya:s.depthFunc(s.EQUAL);break;case Ca:s.depthFunc(s.GEQUAL);break;case Ua:s.depthFunc(s.GREATER);break;case Ma:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}q=de}},setLocked:function(de){P=de},setClear:function(de){he!==de&&(oe&&(de=1-de),s.clearDepth(de),he=de)},reset:function(){P=!1,X=null,q=null,he=null,oe=!1}}}function n(){let P=!1,oe=null,X=null,q=null,he=null,de=null,Le=null,gt=null,Bt=null;return{setTest:function(et){P||(et?ee(s.STENCIL_TEST):ge(s.STENCIL_TEST))},setMask:function(et){oe!==et&&!P&&(s.stencilMask(et),oe=et)},setFunc:function(et,Si,zi){(X!==et||q!==Si||he!==zi)&&(s.stencilFunc(et,Si,zi),X=et,q=Si,he=zi)},setOp:function(et,Si,zi){(de!==et||Le!==Si||gt!==zi)&&(s.stencilOp(et,Si,zi),de=et,Le=Si,gt=zi)},setLocked:function(et){P=et},setClear:function(et){Bt!==et&&(s.clearStencil(et),Bt=et)},reset:function(){P=!1,oe=null,X=null,q=null,he=null,de=null,Le=null,gt=null,Bt=null}}}const r=new t,a=new i,o=new n,c=new WeakMap,l=new WeakMap;let d={},h={},u=new WeakMap,p=[],g=null,v=!1,m=null,f=null,A=null,_=null,S=null,C=null,y=null,U=new Pe(0,0,0),I=0,x=!1,E=null,M=null,R=null,F=null,B=null;const z=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Q=!1,N=0;const D=s.getParameter(s.VERSION);D.indexOf("WebGL")!==-1?(N=parseFloat(/^WebGL (\d)/.exec(D)[1]),Q=N>=1):D.indexOf("OpenGL ES")!==-1&&(N=parseFloat(/^OpenGL ES (\d)/.exec(D)[1]),Q=N>=2);let Z=null,$={};const ae=s.getParameter(s.SCISSOR_BOX),be=s.getParameter(s.VIEWPORT),Be=new mt().fromArray(ae),k=new mt().fromArray(be);function Y(P,oe,X,q){const he=new Uint8Array(4),de=s.createTexture();s.bindTexture(P,de),s.texParameteri(P,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(P,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Le=0;Le<X;Le++)P===s.TEXTURE_3D||P===s.TEXTURE_2D_ARRAY?s.texImage3D(oe,0,s.RGBA,1,1,q,0,s.RGBA,s.UNSIGNED_BYTE,he):s.texImage2D(oe+Le,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,he);return de}const se={};se[s.TEXTURE_2D]=Y(s.TEXTURE_2D,s.TEXTURE_2D,1),se[s.TEXTURE_CUBE_MAP]=Y(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),se[s.TEXTURE_2D_ARRAY]=Y(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),se[s.TEXTURE_3D]=Y(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ee(s.DEPTH_TEST),a.setFunc(Vn),Ge(!1),He(lc),ee(s.CULL_FACE),L(Hi);function ee(P){d[P]!==!0&&(s.enable(P),d[P]=!0)}function ge(P){d[P]!==!1&&(s.disable(P),d[P]=!1)}function Ee(P,oe){return h[P]!==oe?(s.bindFramebuffer(P,oe),h[P]=oe,P===s.DRAW_FRAMEBUFFER&&(h[s.FRAMEBUFFER]=oe),P===s.FRAMEBUFFER&&(h[s.DRAW_FRAMEBUFFER]=oe),!0):!1}function Te(P,oe){let X=p,q=!1;if(P){X=u.get(oe),X===void 0&&(X=[],u.set(oe,X));const he=P.textures;if(X.length!==he.length||X[0]!==s.COLOR_ATTACHMENT0){for(let de=0,Le=he.length;de<Le;de++)X[de]=s.COLOR_ATTACHMENT0+de;X.length=he.length,q=!0}}else X[0]!==s.BACK&&(X[0]=s.BACK,q=!0);q&&s.drawBuffers(X)}function ut(P){return g!==P?(s.useProgram(P),g=P,!0):!1}const Ze={[on]:s.FUNC_ADD,[yf]:s.FUNC_SUBTRACT,[Cf]:s.FUNC_REVERSE_SUBTRACT};Ze[Uf]=s.MIN,Ze[Mf]=s.MAX;const _t={[Tf]:s.ZERO,[Ff]:s.ONE,[If]:s.SRC_COLOR,[Sa]:s.SRC_ALPHA,[Lf]:s.SRC_ALPHA_SATURATE,[Qf]:s.DST_COLOR,[Bf]:s.DST_ALPHA,[Rf]:s.ONE_MINUS_SRC_COLOR,[Ea]:s.ONE_MINUS_SRC_ALPHA,[Nf]:s.ONE_MINUS_DST_COLOR,[Df]:s.ONE_MINUS_DST_ALPHA,[Pf]:s.CONSTANT_COLOR,[Vf]:s.ONE_MINUS_CONSTANT_COLOR,[kf]:s.CONSTANT_ALPHA,[Of]:s.ONE_MINUS_CONSTANT_ALPHA};function L(P,oe,X,q,he,de,Le,gt,Bt,et){if(P===Hi){v===!0&&(ge(s.BLEND),v=!1);return}if(v===!1&&(ee(s.BLEND),v=!0),P!==bf){if(P!==m||et!==x){if((f!==on||S!==on)&&(s.blendEquation(s.FUNC_ADD),f=on,S=on),et)switch(P){case Pn:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case dc:s.blendFunc(s.ONE,s.ONE);break;case hc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case uc:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}else switch(P){case Pn:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case dc:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case hc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case uc:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}A=null,_=null,C=null,y=null,U.set(0,0,0),I=0,m=P,x=et}return}he=he||oe,de=de||X,Le=Le||q,(oe!==f||he!==S)&&(s.blendEquationSeparate(Ze[oe],Ze[he]),f=oe,S=he),(X!==A||q!==_||de!==C||Le!==y)&&(s.blendFuncSeparate(_t[X],_t[q],_t[de],_t[Le]),A=X,_=q,C=de,y=Le),(gt.equals(U)===!1||Bt!==I)&&(s.blendColor(gt.r,gt.g,gt.b,Bt),U.copy(gt),I=Bt),m=P,x=!1}function oi(P,oe){P.side===Fi?ge(s.CULL_FACE):ee(s.CULL_FACE);let X=P.side===zt;oe&&(X=!X),Ge(X),P.blending===Pn&&P.transparent===!1?L(Hi):L(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),a.setFunc(P.depthFunc),a.setTest(P.depthTest),a.setMask(P.depthWrite),r.setMask(P.colorWrite);const q=P.stencilWrite;o.setTest(q),q&&(o.setMask(P.stencilWriteMask),o.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),o.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),ot(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?ee(s.SAMPLE_ALPHA_TO_COVERAGE):ge(s.SAMPLE_ALPHA_TO_COVERAGE)}function Ge(P){E!==P&&(P?s.frontFace(s.CW):s.frontFace(s.CCW),E=P)}function He(P){P!==Ef?(ee(s.CULL_FACE),P!==M&&(P===lc?s.cullFace(s.BACK):P===xf?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):ge(s.CULL_FACE),M=P}function xe(P){P!==R&&(Q&&s.lineWidth(P),R=P)}function ot(P,oe,X){P?(ee(s.POLYGON_OFFSET_FILL),(F!==oe||B!==X)&&(s.polygonOffset(oe,X),F=oe,B=X)):ge(s.POLYGON_OFFSET_FILL)}function we(P){P?ee(s.SCISSOR_TEST):ge(s.SCISSOR_TEST)}function T(P){P===void 0&&(P=s.TEXTURE0+z-1),Z!==P&&(s.activeTexture(P),Z=P)}function w(P,oe,X){X===void 0&&(Z===null?X=s.TEXTURE0+z-1:X=Z);let q=$[X];q===void 0&&(q={type:void 0,texture:void 0},$[X]=q),(q.type!==P||q.texture!==oe)&&(Z!==X&&(s.activeTexture(X),Z=X),s.bindTexture(P,oe||se[P]),q.type=P,q.texture=oe)}function G(){const P=$[Z];P!==void 0&&P.type!==void 0&&(s.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function j(){try{s.compressedTexImage2D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function te(){try{s.compressedTexImage3D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function K(){try{s.texSubImage2D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function _e(){try{s.texSubImage3D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ce(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function fe(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Xe(){try{s.texStorage2D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ne(){try{s.texStorage3D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function pe(){try{s.texImage2D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Ue(){try{s.texImage3D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Fe(P){Be.equals(P)===!1&&(s.scissor(P.x,P.y,P.z,P.w),Be.copy(P))}function me(P){k.equals(P)===!1&&(s.viewport(P.x,P.y,P.z,P.w),k.copy(P))}function Je(P,oe){let X=l.get(oe);X===void 0&&(X=new WeakMap,l.set(oe,X));let q=X.get(P);q===void 0&&(q=s.getUniformBlockIndex(oe,P.name),X.set(P,q))}function ke(P,oe){const q=l.get(oe).get(P);c.get(oe)!==q&&(s.uniformBlockBinding(oe,q,P.__bindingPointIndex),c.set(oe,q))}function at(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),d={},Z=null,$={},h={},u=new WeakMap,p=[],g=null,v=!1,m=null,f=null,A=null,_=null,S=null,C=null,y=null,U=new Pe(0,0,0),I=0,x=!1,E=null,M=null,R=null,F=null,B=null,Be.set(0,0,s.canvas.width,s.canvas.height),k.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ee,disable:ge,bindFramebuffer:Ee,drawBuffers:Te,useProgram:ut,setBlending:L,setMaterial:oi,setFlipSided:Ge,setCullFace:He,setLineWidth:xe,setPolygonOffset:ot,setScissorTest:we,activeTexture:T,bindTexture:w,unbindTexture:G,compressedTexImage2D:j,compressedTexImage3D:te,texImage2D:pe,texImage3D:Ue,updateUBOMapping:Je,uniformBlockBinding:ke,texStorage2D:Xe,texStorage3D:ne,texSubImage2D:K,texSubImage3D:_e,compressedTexSubImage2D:ce,compressedTexSubImage3D:fe,scissor:Fe,viewport:me,reset:at}}function Hv(s,e,t,i,n,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Qe,d=new WeakMap;let h;const u=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,w){return p?new OffscreenCanvas(T,w):ys("canvas")}function v(T,w,G){let j=1;const te=we(T);if((te.width>G||te.height>G)&&(j=G/Math.max(te.width,te.height)),j<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const K=Math.floor(j*te.width),_e=Math.floor(j*te.height);h===void 0&&(h=g(K,_e));const ce=w?g(K,_e):h;return ce.width=K,ce.height=_e,ce.getContext("2d").drawImage(T,0,0,K,_e),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+K+"x"+_e+")."),ce}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),T;return T}function m(T){return T.generateMipmaps}function f(T){s.generateMipmap(T)}function A(T){return T.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?s.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function _(T,w,G,j,te=!1){if(T!==null){if(s[T]!==void 0)return s[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let K=w;if(w===s.RED&&(G===s.FLOAT&&(K=s.R32F),G===s.HALF_FLOAT&&(K=s.R16F),G===s.UNSIGNED_BYTE&&(K=s.R8)),w===s.RED_INTEGER&&(G===s.UNSIGNED_BYTE&&(K=s.R8UI),G===s.UNSIGNED_SHORT&&(K=s.R16UI),G===s.UNSIGNED_INT&&(K=s.R32UI),G===s.BYTE&&(K=s.R8I),G===s.SHORT&&(K=s.R16I),G===s.INT&&(K=s.R32I)),w===s.RG&&(G===s.FLOAT&&(K=s.RG32F),G===s.HALF_FLOAT&&(K=s.RG16F),G===s.UNSIGNED_BYTE&&(K=s.RG8)),w===s.RG_INTEGER&&(G===s.UNSIGNED_BYTE&&(K=s.RG8UI),G===s.UNSIGNED_SHORT&&(K=s.RG16UI),G===s.UNSIGNED_INT&&(K=s.RG32UI),G===s.BYTE&&(K=s.RG8I),G===s.SHORT&&(K=s.RG16I),G===s.INT&&(K=s.RG32I)),w===s.RGB_INTEGER&&(G===s.UNSIGNED_BYTE&&(K=s.RGB8UI),G===s.UNSIGNED_SHORT&&(K=s.RGB16UI),G===s.UNSIGNED_INT&&(K=s.RGB32UI),G===s.BYTE&&(K=s.RGB8I),G===s.SHORT&&(K=s.RGB16I),G===s.INT&&(K=s.RGB32I)),w===s.RGBA_INTEGER&&(G===s.UNSIGNED_BYTE&&(K=s.RGBA8UI),G===s.UNSIGNED_SHORT&&(K=s.RGBA16UI),G===s.UNSIGNED_INT&&(K=s.RGBA32UI),G===s.BYTE&&(K=s.RGBA8I),G===s.SHORT&&(K=s.RGBA16I),G===s.INT&&(K=s.RGBA32I)),w===s.RGB&&G===s.UNSIGNED_INT_5_9_9_9_REV&&(K=s.RGB9_E5),w===s.RGBA){const _e=te?or:We.getTransfer(j);G===s.FLOAT&&(K=s.RGBA32F),G===s.HALF_FLOAT&&(K=s.RGBA16F),G===s.UNSIGNED_BYTE&&(K=_e===tt?s.SRGB8_ALPHA8:s.RGBA8),G===s.UNSIGNED_SHORT_4_4_4_4&&(K=s.RGBA4),G===s.UNSIGNED_SHORT_5_5_5_1&&(K=s.RGB5_A1)}return(K===s.R16F||K===s.R32F||K===s.RG16F||K===s.RG32F||K===s.RGBA16F||K===s.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function S(T,w){let G;return T?w===null||w===dn||w===zn?G=s.DEPTH24_STENCIL8:w===Ri?G=s.DEPTH32F_STENCIL8:w===Es&&(G=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===dn||w===zn?G=s.DEPTH_COMPONENT24:w===Ri?G=s.DEPTH_COMPONENT32F:w===Es&&(G=s.DEPTH_COMPONENT16),G}function C(T,w){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==fi&&T.minFilter!==wi?Math.log2(Math.max(w.width,w.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?w.mipmaps.length:1}function y(T){const w=T.target;w.removeEventListener("dispose",y),I(w),w.isVideoTexture&&d.delete(w)}function U(T){const w=T.target;w.removeEventListener("dispose",U),E(w)}function I(T){const w=i.get(T);if(w.__webglInit===void 0)return;const G=T.source,j=u.get(G);if(j){const te=j[w.__cacheKey];te.usedTimes--,te.usedTimes===0&&x(T),Object.keys(j).length===0&&u.delete(G)}i.remove(T)}function x(T){const w=i.get(T);s.deleteTexture(w.__webglTexture);const G=T.source,j=u.get(G);delete j[w.__cacheKey],a.memory.textures--}function E(T){const w=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(w.__webglFramebuffer[j]))for(let te=0;te<w.__webglFramebuffer[j].length;te++)s.deleteFramebuffer(w.__webglFramebuffer[j][te]);else s.deleteFramebuffer(w.__webglFramebuffer[j]);w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer[j])}else{if(Array.isArray(w.__webglFramebuffer))for(let j=0;j<w.__webglFramebuffer.length;j++)s.deleteFramebuffer(w.__webglFramebuffer[j]);else s.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&s.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let j=0;j<w.__webglColorRenderbuffer.length;j++)w.__webglColorRenderbuffer[j]&&s.deleteRenderbuffer(w.__webglColorRenderbuffer[j]);w.__webglDepthRenderbuffer&&s.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const G=T.textures;for(let j=0,te=G.length;j<te;j++){const K=i.get(G[j]);K.__webglTexture&&(s.deleteTexture(K.__webglTexture),a.memory.textures--),i.remove(G[j])}i.remove(T)}let M=0;function R(){M=0}function F(){const T=M;return T>=n.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+n.maxTextures),M+=1,T}function B(T){const w=[];return w.push(T.wrapS),w.push(T.wrapT),w.push(T.wrapR||0),w.push(T.magFilter),w.push(T.minFilter),w.push(T.anisotropy),w.push(T.internalFormat),w.push(T.format),w.push(T.type),w.push(T.generateMipmaps),w.push(T.premultiplyAlpha),w.push(T.flipY),w.push(T.unpackAlignment),w.push(T.colorSpace),w.join()}function z(T,w){const G=i.get(T);if(T.isVideoTexture&&xe(T),T.isRenderTargetTexture===!1&&T.version>0&&G.__version!==T.version){const j=T.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{k(G,T,w);return}}t.bindTexture(s.TEXTURE_2D,G.__webglTexture,s.TEXTURE0+w)}function Q(T,w){const G=i.get(T);if(T.version>0&&G.__version!==T.version){k(G,T,w);return}t.bindTexture(s.TEXTURE_2D_ARRAY,G.__webglTexture,s.TEXTURE0+w)}function N(T,w){const G=i.get(T);if(T.version>0&&G.__version!==T.version){k(G,T,w);return}t.bindTexture(s.TEXTURE_3D,G.__webglTexture,s.TEXTURE0+w)}function D(T,w){const G=i.get(T);if(T.version>0&&G.__version!==T.version){Y(G,T,w);return}t.bindTexture(s.TEXTURE_CUBE_MAP,G.__webglTexture,s.TEXTURE0+w)}const Z={[er]:s.REPEAT,[ln]:s.CLAMP_TO_EDGE,[Ra]:s.MIRRORED_REPEAT},$={[fi]:s.NEAREST,[jf]:s.NEAREST_MIPMAP_NEAREST,[tr]:s.NEAREST_MIPMAP_LINEAR,[wi]:s.LINEAR,[Ba]:s.LINEAR_MIPMAP_NEAREST,[cn]:s.LINEAR_MIPMAP_LINEAR},ae={[tp]:s.NEVER,[op]:s.ALWAYS,[ip]:s.LESS,[Cc]:s.LEQUAL,[np]:s.EQUAL,[ap]:s.GEQUAL,[sp]:s.GREATER,[rp]:s.NOTEQUAL};function be(T,w){if(w.type===Ri&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===wi||w.magFilter===Ba||w.magFilter===tr||w.magFilter===cn||w.minFilter===wi||w.minFilter===Ba||w.minFilter===tr||w.minFilter===cn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(T,s.TEXTURE_WRAP_S,Z[w.wrapS]),s.texParameteri(T,s.TEXTURE_WRAP_T,Z[w.wrapT]),(T===s.TEXTURE_3D||T===s.TEXTURE_2D_ARRAY)&&s.texParameteri(T,s.TEXTURE_WRAP_R,Z[w.wrapR]),s.texParameteri(T,s.TEXTURE_MAG_FILTER,$[w.magFilter]),s.texParameteri(T,s.TEXTURE_MIN_FILTER,$[w.minFilter]),w.compareFunction&&(s.texParameteri(T,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(T,s.TEXTURE_COMPARE_FUNC,ae[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===fi||w.minFilter!==tr&&w.minFilter!==cn||w.type===Ri&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||i.get(w).__currentAnisotropy){const G=e.get("EXT_texture_filter_anisotropic");s.texParameterf(T,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,n.getMaxAnisotropy())),i.get(w).__currentAnisotropy=w.anisotropy}}}function Be(T,w){let G=!1;T.__webglInit===void 0&&(T.__webglInit=!0,w.addEventListener("dispose",y));const j=w.source;let te=u.get(j);te===void 0&&(te={},u.set(j,te));const K=B(w);if(K!==T.__cacheKey){te[K]===void 0&&(te[K]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,G=!0),te[K].usedTimes++;const _e=te[T.__cacheKey];_e!==void 0&&(te[T.__cacheKey].usedTimes--,_e.usedTimes===0&&x(w)),T.__cacheKey=K,T.__webglTexture=te[K].texture}return G}function k(T,w,G){let j=s.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(j=s.TEXTURE_2D_ARRAY),w.isData3DTexture&&(j=s.TEXTURE_3D);const te=Be(T,w),K=w.source;t.bindTexture(j,T.__webglTexture,s.TEXTURE0+G);const _e=i.get(K);if(K.version!==_e.__version||te===!0){t.activeTexture(s.TEXTURE0+G);const ce=We.getPrimaries(We.workingColorSpace),fe=w.colorSpace===Zi?null:We.getPrimaries(w.colorSpace),Xe=w.colorSpace===Zi||ce===fe?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Xe);let ne=v(w.image,!1,n.maxTextureSize);ne=ot(w,ne);const pe=r.convert(w.format,w.colorSpace),Ue=r.convert(w.type);let Fe=_(w.internalFormat,pe,Ue,w.colorSpace,w.isVideoTexture);be(j,w);let me;const Je=w.mipmaps,ke=w.isVideoTexture!==!0,at=_e.__version===void 0||te===!0,P=K.dataReady,oe=C(w,ne);if(w.isDepthTexture)Fe=S(w.format===Gn,w.type),at&&(ke?t.texStorage2D(s.TEXTURE_2D,1,Fe,ne.width,ne.height):t.texImage2D(s.TEXTURE_2D,0,Fe,ne.width,ne.height,0,pe,Ue,null));else if(w.isDataTexture)if(Je.length>0){ke&&at&&t.texStorage2D(s.TEXTURE_2D,oe,Fe,Je[0].width,Je[0].height);for(let X=0,q=Je.length;X<q;X++)me=Je[X],ke?P&&t.texSubImage2D(s.TEXTURE_2D,X,0,0,me.width,me.height,pe,Ue,me.data):t.texImage2D(s.TEXTURE_2D,X,Fe,me.width,me.height,0,pe,Ue,me.data);w.generateMipmaps=!1}else ke?(at&&t.texStorage2D(s.TEXTURE_2D,oe,Fe,ne.width,ne.height),P&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,ne.width,ne.height,pe,Ue,ne.data)):t.texImage2D(s.TEXTURE_2D,0,Fe,ne.width,ne.height,0,pe,Ue,ne.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){ke&&at&&t.texStorage3D(s.TEXTURE_2D_ARRAY,oe,Fe,Je[0].width,Je[0].height,ne.depth);for(let X=0,q=Je.length;X<q;X++)if(me=Je[X],w.format!==pi)if(pe!==null)if(ke){if(P)if(w.layerUpdates.size>0){const he=Ad(me.width,me.height,w.format,w.type);for(const de of w.layerUpdates){const Le=me.data.subarray(de*he/me.data.BYTES_PER_ELEMENT,(de+1)*he/me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,X,0,0,de,me.width,me.height,1,pe,Le)}w.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,X,0,0,0,me.width,me.height,ne.depth,pe,me.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,X,Fe,me.width,me.height,ne.depth,0,me.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ke?P&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,X,0,0,0,me.width,me.height,ne.depth,pe,Ue,me.data):t.texImage3D(s.TEXTURE_2D_ARRAY,X,Fe,me.width,me.height,ne.depth,0,pe,Ue,me.data)}else{ke&&at&&t.texStorage2D(s.TEXTURE_2D,oe,Fe,Je[0].width,Je[0].height);for(let X=0,q=Je.length;X<q;X++)me=Je[X],w.format!==pi?pe!==null?ke?P&&t.compressedTexSubImage2D(s.TEXTURE_2D,X,0,0,me.width,me.height,pe,me.data):t.compressedTexImage2D(s.TEXTURE_2D,X,Fe,me.width,me.height,0,me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ke?P&&t.texSubImage2D(s.TEXTURE_2D,X,0,0,me.width,me.height,pe,Ue,me.data):t.texImage2D(s.TEXTURE_2D,X,Fe,me.width,me.height,0,pe,Ue,me.data)}else if(w.isDataArrayTexture)if(ke){if(at&&t.texStorage3D(s.TEXTURE_2D_ARRAY,oe,Fe,ne.width,ne.height,ne.depth),P)if(w.layerUpdates.size>0){const X=Ad(ne.width,ne.height,w.format,w.type);for(const q of w.layerUpdates){const he=ne.data.subarray(q*X/ne.data.BYTES_PER_ELEMENT,(q+1)*X/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,q,ne.width,ne.height,1,pe,Ue,he)}w.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,pe,Ue,ne.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,Fe,ne.width,ne.height,ne.depth,0,pe,Ue,ne.data);else if(w.isData3DTexture)ke?(at&&t.texStorage3D(s.TEXTURE_3D,oe,Fe,ne.width,ne.height,ne.depth),P&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,pe,Ue,ne.data)):t.texImage3D(s.TEXTURE_3D,0,Fe,ne.width,ne.height,ne.depth,0,pe,Ue,ne.data);else if(w.isFramebufferTexture){if(at)if(ke)t.texStorage2D(s.TEXTURE_2D,oe,Fe,ne.width,ne.height);else{let X=ne.width,q=ne.height;for(let he=0;he<oe;he++)t.texImage2D(s.TEXTURE_2D,he,Fe,X,q,0,pe,Ue,null),X>>=1,q>>=1}}else if(Je.length>0){if(ke&&at){const X=we(Je[0]);t.texStorage2D(s.TEXTURE_2D,oe,Fe,X.width,X.height)}for(let X=0,q=Je.length;X<q;X++)me=Je[X],ke?P&&t.texSubImage2D(s.TEXTURE_2D,X,0,0,pe,Ue,me):t.texImage2D(s.TEXTURE_2D,X,Fe,pe,Ue,me);w.generateMipmaps=!1}else if(ke){if(at){const X=we(ne);t.texStorage2D(s.TEXTURE_2D,oe,Fe,X.width,X.height)}P&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,pe,Ue,ne)}else t.texImage2D(s.TEXTURE_2D,0,Fe,pe,Ue,ne);m(w)&&f(j),_e.__version=K.version,w.onUpdate&&w.onUpdate(w)}T.__version=w.version}function Y(T,w,G){if(w.image.length!==6)return;const j=Be(T,w),te=w.source;t.bindTexture(s.TEXTURE_CUBE_MAP,T.__webglTexture,s.TEXTURE0+G);const K=i.get(te);if(te.version!==K.__version||j===!0){t.activeTexture(s.TEXTURE0+G);const _e=We.getPrimaries(We.workingColorSpace),ce=w.colorSpace===Zi?null:We.getPrimaries(w.colorSpace),fe=w.colorSpace===Zi||_e===ce?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,fe);const Xe=w.isCompressedTexture||w.image[0].isCompressedTexture,ne=w.image[0]&&w.image[0].isDataTexture,pe=[];for(let q=0;q<6;q++)!Xe&&!ne?pe[q]=v(w.image[q],!0,n.maxCubemapSize):pe[q]=ne?w.image[q].image:w.image[q],pe[q]=ot(w,pe[q]);const Ue=pe[0],Fe=r.convert(w.format,w.colorSpace),me=r.convert(w.type),Je=_(w.internalFormat,Fe,me,w.colorSpace),ke=w.isVideoTexture!==!0,at=K.__version===void 0||j===!0,P=te.dataReady;let oe=C(w,Ue);be(s.TEXTURE_CUBE_MAP,w);let X;if(Xe){ke&&at&&t.texStorage2D(s.TEXTURE_CUBE_MAP,oe,Je,Ue.width,Ue.height);for(let q=0;q<6;q++){X=pe[q].mipmaps;for(let he=0;he<X.length;he++){const de=X[he];w.format!==pi?Fe!==null?ke?P&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,he,0,0,de.width,de.height,Fe,de.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,he,Je,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ke?P&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,he,0,0,de.width,de.height,Fe,me,de.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,he,Je,de.width,de.height,0,Fe,me,de.data)}}}else{if(X=w.mipmaps,ke&&at){X.length>0&&oe++;const q=we(pe[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,oe,Je,q.width,q.height)}for(let q=0;q<6;q++)if(ne){ke?P&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,pe[q].width,pe[q].height,Fe,me,pe[q].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Je,pe[q].width,pe[q].height,0,Fe,me,pe[q].data);for(let he=0;he<X.length;he++){const Le=X[he].image[q].image;ke?P&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,he+1,0,0,Le.width,Le.height,Fe,me,Le.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,he+1,Je,Le.width,Le.height,0,Fe,me,Le.data)}}else{ke?P&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,Fe,me,pe[q]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Je,Fe,me,pe[q]);for(let he=0;he<X.length;he++){const de=X[he];ke?P&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,he+1,0,0,Fe,me,de.image[q]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,he+1,Je,Fe,me,de.image[q])}}}m(w)&&f(s.TEXTURE_CUBE_MAP),K.__version=te.version,w.onUpdate&&w.onUpdate(w)}T.__version=w.version}function se(T,w,G,j,te,K){const _e=r.convert(G.format,G.colorSpace),ce=r.convert(G.type),fe=_(G.internalFormat,_e,ce,G.colorSpace),Xe=i.get(w),ne=i.get(G);if(ne.__renderTarget=w,!Xe.__hasExternalTextures){const pe=Math.max(1,w.width>>K),Ue=Math.max(1,w.height>>K);te===s.TEXTURE_3D||te===s.TEXTURE_2D_ARRAY?t.texImage3D(te,K,fe,pe,Ue,w.depth,0,_e,ce,null):t.texImage2D(te,K,fe,pe,Ue,0,_e,ce,null)}t.bindFramebuffer(s.FRAMEBUFFER,T),He(w)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,j,te,ne.__webglTexture,0,Ge(w)):(te===s.TEXTURE_2D||te>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,j,te,ne.__webglTexture,K),t.bindFramebuffer(s.FRAMEBUFFER,null)}function ee(T,w,G){if(s.bindRenderbuffer(s.RENDERBUFFER,T),w.depthBuffer){const j=w.depthTexture,te=j&&j.isDepthTexture?j.type:null,K=S(w.stencilBuffer,te),_e=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ce=Ge(w);He(w)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ce,K,w.width,w.height):G?s.renderbufferStorageMultisample(s.RENDERBUFFER,ce,K,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,K,w.width,w.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,_e,s.RENDERBUFFER,T)}else{const j=w.textures;for(let te=0;te<j.length;te++){const K=j[te],_e=r.convert(K.format,K.colorSpace),ce=r.convert(K.type),fe=_(K.internalFormat,_e,ce,K.colorSpace),Xe=Ge(w);G&&He(w)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Xe,fe,w.width,w.height):He(w)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Xe,fe,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,fe,w.width,w.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ge(T,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,T),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=i.get(w.depthTexture);j.__renderTarget=w,(!j.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),z(w.depthTexture,0);const te=j.__webglTexture,K=Ge(w);if(w.depthTexture.format===Wn)He(w)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,te,0,K):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,te,0);else if(w.depthTexture.format===Gn)He(w)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,te,0,K):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,te,0);else throw new Error("Unknown depthTexture format")}function Ee(T){const w=i.get(T),G=T.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==T.depthTexture){const j=T.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),j){const te=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,j.removeEventListener("dispose",te)};j.addEventListener("dispose",te),w.__depthDisposeCallback=te}w.__boundDepthTexture=j}if(T.depthTexture&&!w.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");ge(w.__webglFramebuffer,T)}else if(G){w.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(t.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer[j]),w.__webglDepthbuffer[j]===void 0)w.__webglDepthbuffer[j]=s.createRenderbuffer(),ee(w.__webglDepthbuffer[j],T,!1);else{const te=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,K=w.__webglDepthbuffer[j];s.bindRenderbuffer(s.RENDERBUFFER,K),s.framebufferRenderbuffer(s.FRAMEBUFFER,te,s.RENDERBUFFER,K)}}else if(t.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=s.createRenderbuffer(),ee(w.__webglDepthbuffer,T,!1);else{const j=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,te=w.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,te),s.framebufferRenderbuffer(s.FRAMEBUFFER,j,s.RENDERBUFFER,te)}t.bindFramebuffer(s.FRAMEBUFFER,null)}function Te(T,w,G){const j=i.get(T);w!==void 0&&se(j.__webglFramebuffer,T,T.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),G!==void 0&&Ee(T)}function ut(T){const w=T.texture,G=i.get(T),j=i.get(w);T.addEventListener("dispose",U);const te=T.textures,K=T.isWebGLCubeRenderTarget===!0,_e=te.length>1;if(_e||(j.__webglTexture===void 0&&(j.__webglTexture=s.createTexture()),j.__version=w.version,a.memory.textures++),K){G.__webglFramebuffer=[];for(let ce=0;ce<6;ce++)if(w.mipmaps&&w.mipmaps.length>0){G.__webglFramebuffer[ce]=[];for(let fe=0;fe<w.mipmaps.length;fe++)G.__webglFramebuffer[ce][fe]=s.createFramebuffer()}else G.__webglFramebuffer[ce]=s.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){G.__webglFramebuffer=[];for(let ce=0;ce<w.mipmaps.length;ce++)G.__webglFramebuffer[ce]=s.createFramebuffer()}else G.__webglFramebuffer=s.createFramebuffer();if(_e)for(let ce=0,fe=te.length;ce<fe;ce++){const Xe=i.get(te[ce]);Xe.__webglTexture===void 0&&(Xe.__webglTexture=s.createTexture(),a.memory.textures++)}if(T.samples>0&&He(T)===!1){G.__webglMultisampledFramebuffer=s.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let ce=0;ce<te.length;ce++){const fe=te[ce];G.__webglColorRenderbuffer[ce]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,G.__webglColorRenderbuffer[ce]);const Xe=r.convert(fe.format,fe.colorSpace),ne=r.convert(fe.type),pe=_(fe.internalFormat,Xe,ne,fe.colorSpace,T.isXRRenderTarget===!0),Ue=Ge(T);s.renderbufferStorageMultisample(s.RENDERBUFFER,Ue,pe,T.width,T.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ce,s.RENDERBUFFER,G.__webglColorRenderbuffer[ce])}s.bindRenderbuffer(s.RENDERBUFFER,null),T.depthBuffer&&(G.__webglDepthRenderbuffer=s.createRenderbuffer(),ee(G.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(K){t.bindTexture(s.TEXTURE_CUBE_MAP,j.__webglTexture),be(s.TEXTURE_CUBE_MAP,w);for(let ce=0;ce<6;ce++)if(w.mipmaps&&w.mipmaps.length>0)for(let fe=0;fe<w.mipmaps.length;fe++)se(G.__webglFramebuffer[ce][fe],T,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,fe);else se(G.__webglFramebuffer[ce],T,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0);m(w)&&f(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(_e){for(let ce=0,fe=te.length;ce<fe;ce++){const Xe=te[ce],ne=i.get(Xe);t.bindTexture(s.TEXTURE_2D,ne.__webglTexture),be(s.TEXTURE_2D,Xe),se(G.__webglFramebuffer,T,Xe,s.COLOR_ATTACHMENT0+ce,s.TEXTURE_2D,0),m(Xe)&&f(s.TEXTURE_2D)}t.unbindTexture()}else{let ce=s.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ce=T.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(ce,j.__webglTexture),be(ce,w),w.mipmaps&&w.mipmaps.length>0)for(let fe=0;fe<w.mipmaps.length;fe++)se(G.__webglFramebuffer[fe],T,w,s.COLOR_ATTACHMENT0,ce,fe);else se(G.__webglFramebuffer,T,w,s.COLOR_ATTACHMENT0,ce,0);m(w)&&f(ce),t.unbindTexture()}T.depthBuffer&&Ee(T)}function Ze(T){const w=T.textures;for(let G=0,j=w.length;G<j;G++){const te=w[G];if(m(te)){const K=A(T),_e=i.get(te).__webglTexture;t.bindTexture(K,_e),f(K),t.unbindTexture()}}}const _t=[],L=[];function oi(T){if(T.samples>0){if(He(T)===!1){const w=T.textures,G=T.width,j=T.height;let te=s.COLOR_BUFFER_BIT;const K=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,_e=i.get(T),ce=w.length>1;if(ce)for(let fe=0;fe<w.length;fe++)t.bindFramebuffer(s.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+fe,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,_e.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+fe,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,_e.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,_e.__webglFramebuffer);for(let fe=0;fe<w.length;fe++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(te|=s.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(te|=s.STENCIL_BUFFER_BIT)),ce){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,_e.__webglColorRenderbuffer[fe]);const Xe=i.get(w[fe]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Xe,0)}s.blitFramebuffer(0,0,G,j,0,0,G,j,te,s.NEAREST),c===!0&&(_t.length=0,L.length=0,_t.push(s.COLOR_ATTACHMENT0+fe),T.depthBuffer&&T.resolveDepthBuffer===!1&&(_t.push(K),L.push(K),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,L)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,_t))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ce)for(let fe=0;fe<w.length;fe++){t.bindFramebuffer(s.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+fe,s.RENDERBUFFER,_e.__webglColorRenderbuffer[fe]);const Xe=i.get(w[fe]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,_e.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+fe,s.TEXTURE_2D,Xe,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,_e.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&c){const w=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[w])}}}function Ge(T){return Math.min(n.maxSamples,T.samples)}function He(T){const w=i.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function xe(T){const w=a.render.frame;d.get(T)!==w&&(d.set(T,w),T.update())}function ot(T,w){const G=T.colorSpace,j=T.format,te=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||G!==Hn&&G!==Zi&&(We.getTransfer(G)===tt?(j!==pi||te!==Ii)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),w}function we(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=F,this.resetTextureUnits=R,this.setTexture2D=z,this.setTexture2DArray=Q,this.setTexture3D=N,this.setTextureCube=D,this.rebindTextures=Te,this.setupRenderTarget=ut,this.updateRenderTargetMipmap=Ze,this.updateMultisampleRenderTarget=oi,this.setupDepthRenderbuffer=Ee,this.setupFrameBufferTexture=se,this.useMultisampledRTT=He}function Jv(s,e){function t(i,n=Zi){let r;const a=We.getTransfer(n);if(i===Ii)return s.UNSIGNED_BYTE;if(i===Qa)return s.UNSIGNED_SHORT_4_4_4_4;if(i===Na)return s.UNSIGNED_SHORT_5_5_5_1;if(i===gc)return s.UNSIGNED_INT_5_9_9_9_REV;if(i===pc)return s.BYTE;if(i===mc)return s.SHORT;if(i===Es)return s.UNSIGNED_SHORT;if(i===Da)return s.INT;if(i===dn)return s.UNSIGNED_INT;if(i===Ri)return s.FLOAT;if(i===xs)return s.HALF_FLOAT;if(i===vc)return s.ALPHA;if(i===Ac)return s.RGB;if(i===pi)return s.RGBA;if(i===_c)return s.LUMINANCE;if(i===Sc)return s.LUMINANCE_ALPHA;if(i===Wn)return s.DEPTH_COMPONENT;if(i===Gn)return s.DEPTH_STENCIL;if(i===Ec)return s.RED;if(i===La)return s.RED_INTEGER;if(i===xc)return s.RG;if(i===Pa)return s.RG_INTEGER;if(i===Va)return s.RGBA_INTEGER;if(i===ir||i===nr||i===sr||i===rr)if(a===tt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===ir)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===nr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===sr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===rr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===ir)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===nr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===sr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===rr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ka||i===Oa||i===za||i===Wa)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===ka)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Oa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===za)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Wa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ga||i===Ha||i===Ja)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Ga||i===Ha)return a===tt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Ja)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Za||i===Xa||i===Ya||i===Ka||i===ja||i===qa||i===$a||i===eo||i===to||i===io||i===no||i===so||i===ro||i===ao)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Za)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Xa)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ya)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ka)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ja)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===qa)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===$a)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===eo)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===to)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===io)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===no)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===so)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===ro)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ao)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ar||i===oo||i===lo)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===ar)return a===tt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===oo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===lo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===wc||i===co||i===ho||i===uo)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===ar)return r.COMPRESSED_RED_RGTC1_EXT;if(i===co)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ho)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===uo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===zn?s.UNSIGNED_INT_24_8:s[i]!==void 0?s[i]:null}return{convert:t}}const Zv={type:"move"};class Yo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ds,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ds,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ds,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let n=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,i),f=this._getHandJoint(l,v);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const d=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],u=d.position.distanceTo(h.position),p=.02,g=.005;l.inputState.pinching&&u>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(n=t.getPose(e.targetRaySpace,i),n===null&&r!==null&&(n=r),n!==null&&(o.matrix.fromArray(n.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,n.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(n.linearVelocity)):o.hasLinearVelocity=!1,n.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(n.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Zv)))}return o!==null&&(o.visible=n!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ds;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Xv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Yv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Kv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const n=new Qt,r=e.properties.get(n);r.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new $i({vertexShader:Xv,fragmentShader:Yv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Gt(new Qr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class jv extends hn{constructor(e,t){super();const i=this;let n=null,r=1,a=null,o="local-floor",c=1,l=null,d=null,h=null,u=null,p=null,g=null;const v=new Kv,m=t.getContextAttributes();let f=null,A=null;const _=[],S=[],C=new Qe;let y=null;const U=new si;U.viewport=new mt;const I=new si;I.viewport=new mt;const x=[U,I],E=new jp;let M=null,R=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(k){let Y=_[k];return Y===void 0&&(Y=new Yo,_[k]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(k){let Y=_[k];return Y===void 0&&(Y=new Yo,_[k]=Y),Y.getGripSpace()},this.getHand=function(k){let Y=_[k];return Y===void 0&&(Y=new Yo,_[k]=Y),Y.getHandSpace()};function F(k){const Y=S.indexOf(k.inputSource);if(Y===-1)return;const se=_[Y];se!==void 0&&(se.update(k.inputSource,k.frame,l||a),se.dispatchEvent({type:k.type,data:k.inputSource}))}function B(){n.removeEventListener("select",F),n.removeEventListener("selectstart",F),n.removeEventListener("selectend",F),n.removeEventListener("squeeze",F),n.removeEventListener("squeezestart",F),n.removeEventListener("squeezeend",F),n.removeEventListener("end",B),n.removeEventListener("inputsourceschange",z);for(let k=0;k<_.length;k++){const Y=S[k];Y!==null&&(S[k]=null,_[k].disconnect(Y))}M=null,R=null,v.reset(),e.setRenderTarget(f),p=null,u=null,h=null,n=null,A=null,Be.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(k){r=k,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(k){o=k,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(k){l=k},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return n},this.setSession=async function(k){if(n=k,n!==null){if(f=e.getRenderTarget(),n.addEventListener("select",F),n.addEventListener("selectstart",F),n.addEventListener("selectend",F),n.addEventListener("squeeze",F),n.addEventListener("squeezestart",F),n.addEventListener("squeezeend",F),n.addEventListener("end",B),n.addEventListener("inputsourceschange",z),m.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(C),n.renderState.layers===void 0){const Y={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(n,t,Y),n.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),A=new un(p.framebufferWidth,p.framebufferHeight,{format:pi,type:Ii,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let Y=null,se=null,ee=null;m.depth&&(ee=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Y=m.stencil?Gn:Wn,se=m.stencil?zn:dn);const ge={colorFormat:t.RGBA8,depthFormat:ee,scaleFactor:r};h=new XRWebGLBinding(n,t),u=h.createProjectionLayer(ge),n.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),A=new un(u.textureWidth,u.textureHeight,{format:pi,type:Ii,depthTexture:new dd(u.textureWidth,u.textureHeight,se,void 0,void 0,void 0,void 0,void 0,void 0,Y),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await n.requestReferenceSpace(o),Be.setContext(n),Be.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function z(k){for(let Y=0;Y<k.removed.length;Y++){const se=k.removed[Y],ee=S.indexOf(se);ee>=0&&(S[ee]=null,_[ee].disconnect(se))}for(let Y=0;Y<k.added.length;Y++){const se=k.added[Y];let ee=S.indexOf(se);if(ee===-1){for(let Ee=0;Ee<_.length;Ee++)if(Ee>=S.length){S.push(se),ee=Ee;break}else if(S[Ee]===null){S[Ee]=se,ee=Ee;break}if(ee===-1)break}const ge=_[ee];ge&&ge.connect(se)}}const Q=new W,N=new W;function D(k,Y,se){Q.setFromMatrixPosition(Y.matrixWorld),N.setFromMatrixPosition(se.matrixWorld);const ee=Q.distanceTo(N),ge=Y.projectionMatrix.elements,Ee=se.projectionMatrix.elements,Te=ge[14]/(ge[10]-1),ut=ge[14]/(ge[10]+1),Ze=(ge[9]+1)/ge[5],_t=(ge[9]-1)/ge[5],L=(ge[8]-1)/ge[0],oi=(Ee[8]+1)/Ee[0],Ge=Te*L,He=Te*oi,xe=ee/(-L+oi),ot=xe*-L;if(Y.matrixWorld.decompose(k.position,k.quaternion,k.scale),k.translateX(ot),k.translateZ(xe),k.matrixWorld.compose(k.position,k.quaternion,k.scale),k.matrixWorldInverse.copy(k.matrixWorld).invert(),ge[10]===-1)k.projectionMatrix.copy(Y.projectionMatrix),k.projectionMatrixInverse.copy(Y.projectionMatrixInverse);else{const we=Te+xe,T=ut+xe,w=Ge-ot,G=He+(ee-ot),j=Ze*ut/T*we,te=_t*ut/T*we;k.projectionMatrix.makePerspective(w,G,j,te,we,T),k.projectionMatrixInverse.copy(k.projectionMatrix).invert()}}function Z(k,Y){Y===null?k.matrixWorld.copy(k.matrix):k.matrixWorld.multiplyMatrices(Y.matrixWorld,k.matrix),k.matrixWorldInverse.copy(k.matrixWorld).invert()}this.updateCamera=function(k){if(n===null)return;let Y=k.near,se=k.far;v.texture!==null&&(v.depthNear>0&&(Y=v.depthNear),v.depthFar>0&&(se=v.depthFar)),E.near=I.near=U.near=Y,E.far=I.far=U.far=se,(M!==E.near||R!==E.far)&&(n.updateRenderState({depthNear:E.near,depthFar:E.far}),M=E.near,R=E.far),U.layers.mask=k.layers.mask|2,I.layers.mask=k.layers.mask|4,E.layers.mask=U.layers.mask|I.layers.mask;const ee=k.parent,ge=E.cameras;Z(E,ee);for(let Ee=0;Ee<ge.length;Ee++)Z(ge[Ee],ee);ge.length===2?D(E,U,I):E.projectionMatrix.copy(U.projectionMatrix),$(k,E,ee)};function $(k,Y,se){se===null?k.matrix.copy(Y.matrixWorld):(k.matrix.copy(se.matrixWorld),k.matrix.invert(),k.matrix.multiply(Y.matrixWorld)),k.matrix.decompose(k.position,k.quaternion,k.scale),k.updateMatrixWorld(!0),k.projectionMatrix.copy(Y.projectionMatrix),k.projectionMatrixInverse.copy(Y.projectionMatrixInverse),k.isPerspectiveCamera&&(k.fov=fo*2*Math.atan(1/k.projectionMatrix.elements[5]),k.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(u===null&&p===null))return c},this.setFoveation=function(k){c=k,u!==null&&(u.fixedFoveation=k),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=k)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(E)};let ae=null;function be(k,Y){if(d=Y.getViewerPose(l||a),g=Y,d!==null){const se=d.views;p!==null&&(e.setRenderTargetFramebuffer(A,p.framebuffer),e.setRenderTarget(A));let ee=!1;se.length!==E.cameras.length&&(E.cameras.length=0,ee=!0);for(let Ee=0;Ee<se.length;Ee++){const Te=se[Ee];let ut=null;if(p!==null)ut=p.getViewport(Te);else{const _t=h.getViewSubImage(u,Te);ut=_t.viewport,Ee===0&&(e.setRenderTargetTextures(A,_t.colorTexture,u.ignoreDepthValues?void 0:_t.depthStencilTexture),e.setRenderTarget(A))}let Ze=x[Ee];Ze===void 0&&(Ze=new si,Ze.layers.enable(Ee),Ze.viewport=new mt,x[Ee]=Ze),Ze.matrix.fromArray(Te.transform.matrix),Ze.matrix.decompose(Ze.position,Ze.quaternion,Ze.scale),Ze.projectionMatrix.fromArray(Te.projectionMatrix),Ze.projectionMatrixInverse.copy(Ze.projectionMatrix).invert(),Ze.viewport.set(ut.x,ut.y,ut.width,ut.height),Ee===0&&(E.matrix.copy(Ze.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),ee===!0&&E.cameras.push(Ze)}const ge=n.enabledFeatures;if(ge&&ge.includes("depth-sensing")){const Ee=h.getDepthInformation(se[0]);Ee&&Ee.isValid&&Ee.texture&&v.init(e,Ee,n.renderState)}}for(let se=0;se<_.length;se++){const ee=S[se],ge=_[se];ee!==null&&ge!==void 0&&ge.update(ee,Y,l||a)}ae&&ae(k,Y),Y.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Y}),g=null}const Be=new _d;Be.setAnimationLoop(be),this.setAnimationLoop=function(k){ae=k},this.dispose=function(){}}}const En=new bi,qv=new lt;function $v(s,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,qc(s)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function n(m,f,A,_,S){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),h(m,f)):f.isMeshPhongMaterial?(r(m,f),d(m,f)):f.isMeshStandardMaterial?(r(m,f),u(m,f),f.isMeshPhysicalMaterial&&p(m,f,S)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),v(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?c(m,f,A,_):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===zt&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===zt&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const A=e.get(f),_=A.envMap,S=A.envMapRotation;_&&(m.envMap.value=_,En.copy(S),En.x*=-1,En.y*=-1,En.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(En.y*=-1,En.z*=-1),m.envMapRotation.value.setFromMatrix4(qv.makeRotationFromEuler(En)),m.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,A,_){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*A,m.scale.value=_*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function d(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function h(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,A){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===zt&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=A.texture,m.transmissionSamplerSize.value.set(A.width,A.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function v(m,f){const A=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(A.matrixWorld),m.nearDistance.value=A.shadow.camera.near,m.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function eA(s,e,t,i){let n={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(A,_){const S=_.program;i.uniformBlockBinding(A,S)}function l(A,_){let S=n[A.id];S===void 0&&(g(A),S=d(A),n[A.id]=S,A.addEventListener("dispose",m));const C=_.program;i.updateUBOMapping(A,C);const y=e.render.frame;r[A.id]!==y&&(u(A),r[A.id]=y)}function d(A){const _=h();A.__bindingPointIndex=_;const S=s.createBuffer(),C=A.__size,y=A.usage;return s.bindBuffer(s.UNIFORM_BUFFER,S),s.bufferData(s.UNIFORM_BUFFER,C,y),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,_,S),S}function h(){for(let A=0;A<o;A++)if(a.indexOf(A)===-1)return a.push(A),A;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(A){const _=n[A.id],S=A.uniforms,C=A.__cache;s.bindBuffer(s.UNIFORM_BUFFER,_);for(let y=0,U=S.length;y<U;y++){const I=Array.isArray(S[y])?S[y]:[S[y]];for(let x=0,E=I.length;x<E;x++){const M=I[x];if(p(M,y,x,C)===!0){const R=M.__offset,F=Array.isArray(M.value)?M.value:[M.value];let B=0;for(let z=0;z<F.length;z++){const Q=F[z],N=v(Q);typeof Q=="number"||typeof Q=="boolean"?(M.__data[0]=Q,s.bufferSubData(s.UNIFORM_BUFFER,R+B,M.__data)):Q.isMatrix3?(M.__data[0]=Q.elements[0],M.__data[1]=Q.elements[1],M.__data[2]=Q.elements[2],M.__data[3]=0,M.__data[4]=Q.elements[3],M.__data[5]=Q.elements[4],M.__data[6]=Q.elements[5],M.__data[7]=0,M.__data[8]=Q.elements[6],M.__data[9]=Q.elements[7],M.__data[10]=Q.elements[8],M.__data[11]=0):(Q.toArray(M.__data,B),B+=N.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,R,M.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function p(A,_,S,C){const y=A.value,U=_+"_"+S;if(C[U]===void 0)return typeof y=="number"||typeof y=="boolean"?C[U]=y:C[U]=y.clone(),!0;{const I=C[U];if(typeof y=="number"||typeof y=="boolean"){if(I!==y)return C[U]=y,!0}else if(I.equals(y)===!1)return I.copy(y),!0}return!1}function g(A){const _=A.uniforms;let S=0;const C=16;for(let U=0,I=_.length;U<I;U++){const x=Array.isArray(_[U])?_[U]:[_[U]];for(let E=0,M=x.length;E<M;E++){const R=x[E],F=Array.isArray(R.value)?R.value:[R.value];for(let B=0,z=F.length;B<z;B++){const Q=F[B],N=v(Q),D=S%C,Z=D%N.boundary,$=D+Z;S+=Z,$!==0&&C-$<N.storage&&(S+=C-$),R.__data=new Float32Array(N.storage/Float32Array.BYTES_PER_ELEMENT),R.__offset=S,S+=N.storage}}}const y=S%C;return y>0&&(S+=C-y),A.__size=S,A.__cache={},this}function v(A){const _={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(_.boundary=4,_.storage=4):A.isVector2?(_.boundary=8,_.storage=8):A.isVector3||A.isColor?(_.boundary=16,_.storage=12):A.isVector4?(_.boundary=16,_.storage=16):A.isMatrix3?(_.boundary=48,_.storage=48):A.isMatrix4?(_.boundary=64,_.storage=64):A.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",A),_}function m(A){const _=A.target;_.removeEventListener("dispose",m);const S=a.indexOf(_.__bindingPointIndex);a.splice(S,1),s.deleteBuffer(n[_.id]),delete n[_.id],delete r[_.id]}function f(){for(const A in n)s.deleteBuffer(n[A]);a=[],n={},r={}}return{bind:c,update:l,dispose:f}}class tA{constructor(e={}){const{canvas:t=dp(),context:i=null,depth:n=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:u=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,f=null;const A=[],_=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Tt,this.toneMapping=Ji,this.toneMappingExposure=1;const S=this;let C=!1,y=0,U=0,I=null,x=-1,E=null;const M=new mt,R=new mt;let F=null;const B=new Pe(0);let z=0,Q=t.width,N=t.height,D=1,Z=null,$=null;const ae=new mt(0,0,Q,N),be=new mt(0,0,Q,N);let Be=!1;const k=new Qo;let Y=!1,se=!1;const ee=new lt,ge=new lt,Ee=new W,Te=new mt,ut={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ze=!1;function _t(){return I===null?D:1}let L=i;function oi(b,V){return t.getContext(b,V)}try{const b={alpha:!0,depth:n,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${_a}`),t.addEventListener("webglcontextlost",q,!1),t.addEventListener("webglcontextrestored",he,!1),t.addEventListener("webglcontextcreationerror",de,!1),L===null){const V="webgl2";if(L=oi(V,b),L===null)throw oi(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Ge,He,xe,ot,we,T,w,G,j,te,K,_e,ce,fe,Xe,ne,pe,Ue,Fe,me,Je,ke,at,P;function oe(){Ge=new d0(L),Ge.init(),ke=new Jv(L,Ge),He=new s0(L,Ge,e,ke),xe=new Gv(L,Ge),He.reverseDepthBuffer&&u&&xe.buffers.depth.setReversed(!0),ot=new f0(L),we=new Iv,T=new Hv(L,Ge,xe,we,He,ke,ot),w=new a0(S),G=new c0(S),j=new em(L),at=new i0(L,j),te=new h0(L,j,ot,at),K=new m0(L,te,j,ot),Fe=new p0(L,He,T),ne=new r0(we),_e=new Fv(S,w,G,Ge,He,at,ne),ce=new $v(S,we),fe=new Bv,Xe=new Vv(Ge),Ue=new t0(S,w,G,xe,K,p,c),pe=new zv(S,K,He),P=new eA(L,ot,He,xe),me=new n0(L,Ge,ot),Je=new u0(L,Ge,ot),ot.programs=_e.programs,S.capabilities=He,S.extensions=Ge,S.properties=we,S.renderLists=fe,S.shadowMap=pe,S.state=xe,S.info=ot}oe();const X=new jv(S,L);this.xr=X,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const b=Ge.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Ge.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return D},this.setPixelRatio=function(b){b!==void 0&&(D=b,this.setSize(Q,N,!1))},this.getSize=function(b){return b.set(Q,N)},this.setSize=function(b,V,H=!0){if(X.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Q=b,N=V,t.width=Math.floor(b*D),t.height=Math.floor(V*D),H===!0&&(t.style.width=b+"px",t.style.height=V+"px"),this.setViewport(0,0,b,V)},this.getDrawingBufferSize=function(b){return b.set(Q*D,N*D).floor()},this.setDrawingBufferSize=function(b,V,H){Q=b,N=V,D=H,t.width=Math.floor(b*H),t.height=Math.floor(V*H),this.setViewport(0,0,b,V)},this.getCurrentViewport=function(b){return b.copy(M)},this.getViewport=function(b){return b.copy(ae)},this.setViewport=function(b,V,H,J){b.isVector4?ae.set(b.x,b.y,b.z,b.w):ae.set(b,V,H,J),xe.viewport(M.copy(ae).multiplyScalar(D).round())},this.getScissor=function(b){return b.copy(be)},this.setScissor=function(b,V,H,J){b.isVector4?be.set(b.x,b.y,b.z,b.w):be.set(b,V,H,J),xe.scissor(R.copy(be).multiplyScalar(D).round())},this.getScissorTest=function(){return Be},this.setScissorTest=function(b){xe.setScissorTest(Be=b)},this.setOpaqueSort=function(b){Z=b},this.setTransparentSort=function(b){$=b},this.getClearColor=function(b){return b.copy(Ue.getClearColor())},this.setClearColor=function(){Ue.setClearColor.apply(Ue,arguments)},this.getClearAlpha=function(){return Ue.getClearAlpha()},this.setClearAlpha=function(){Ue.setClearAlpha.apply(Ue,arguments)},this.clear=function(b=!0,V=!0,H=!0){let J=0;if(b){let O=!1;if(I!==null){const ie=I.texture.format;O=ie===Va||ie===Pa||ie===La}if(O){const ie=I.texture.type,le=ie===Ii||ie===dn||ie===Es||ie===zn||ie===Qa||ie===Na,ue=Ue.getClearColor(),ve=Ue.getClearAlpha(),Ie=ue.r,De=ue.g,ye=ue.b;le?(g[0]=Ie,g[1]=De,g[2]=ye,g[3]=ve,L.clearBufferuiv(L.COLOR,0,g)):(v[0]=Ie,v[1]=De,v[2]=ye,v[3]=ve,L.clearBufferiv(L.COLOR,0,v))}else J|=L.COLOR_BUFFER_BIT}V&&(J|=L.DEPTH_BUFFER_BIT),H&&(J|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",q,!1),t.removeEventListener("webglcontextrestored",he,!1),t.removeEventListener("webglcontextcreationerror",de,!1),Ue.dispose(),fe.dispose(),Xe.dispose(),we.dispose(),w.dispose(),G.dispose(),K.dispose(),at.dispose(),P.dispose(),_e.dispose(),X.dispose(),X.removeEventListener("sessionstart",hh),X.removeEventListener("sessionend",uh),bn.stop()};function q(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function he(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const b=ot.autoReset,V=pe.enabled,H=pe.autoUpdate,J=pe.needsUpdate,O=pe.type;oe(),ot.autoReset=b,pe.enabled=V,pe.autoUpdate=H,pe.needsUpdate=J,pe.type=O}function de(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Le(b){const V=b.target;V.removeEventListener("dispose",Le),gt(V)}function gt(b){Bt(b),we.remove(b)}function Bt(b){const V=we.get(b).programs;V!==void 0&&(V.forEach(function(H){_e.releaseProgram(H)}),b.isShaderMaterial&&_e.releaseShaderCache(b))}this.renderBufferDirect=function(b,V,H,J,O,ie){V===null&&(V=ut);const le=O.isMesh&&O.matrixWorld.determinant()<0,ue=qA(b,V,H,J,O);xe.setMaterial(J,le);let ve=H.index,Ie=1;if(J.wireframe===!0){if(ve=te.getWireframeAttribute(H),ve===void 0)return;Ie=2}const De=H.drawRange,ye=H.attributes.position;let Ye=De.start*Ie,qe=(De.start+De.count)*Ie;ie!==null&&(Ye=Math.max(Ye,ie.start*Ie),qe=Math.min(qe,(ie.start+ie.count)*Ie)),ve!==null?(Ye=Math.max(Ye,0),qe=Math.min(qe,ve.count)):ye!=null&&(Ye=Math.max(Ye,0),qe=Math.min(qe,ye.count));const Et=qe-Ye;if(Et<0||Et===1/0)return;at.setup(O,J,ue,H,ve);let vt,Ke=me;if(ve!==null&&(vt=j.get(ve),Ke=Je,Ke.setIndex(vt)),O.isMesh)J.wireframe===!0?(xe.setLineWidth(J.wireframeLinewidth*_t()),Ke.setMode(L.LINES)):Ke.setMode(L.TRIANGLES);else if(O.isLine){let Ce=J.linewidth;Ce===void 0&&(Ce=1),xe.setLineWidth(Ce*_t()),O.isLineSegments?Ke.setMode(L.LINES):O.isLineLoop?Ke.setMode(L.LINE_LOOP):Ke.setMode(L.LINE_STRIP)}else O.isPoints?Ke.setMode(L.POINTS):O.isSprite&&Ke.setMode(L.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)Ke.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(Ge.get("WEBGL_multi_draw"))Ke.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Ce=O._multiDrawStarts,Ft=O._multiDrawCounts,$e=O._multiDrawCount,Ei=ve?j.get(ve).bytesPerElement:1,fs=we.get(J).currentProgram.getUniforms();for(let ei=0;ei<$e;ei++)fs.setValue(L,"_gl_DrawID",ei),Ke.render(Ce[ei]/Ei,Ft[ei])}else if(O.isInstancedMesh)Ke.renderInstances(Ye,Et,O.count);else if(H.isInstancedBufferGeometry){const Ce=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,Ft=Math.min(H.instanceCount,Ce);Ke.renderInstances(Ye,Et,Ft)}else Ke.render(Ye,Et)};function et(b,V,H){b.transparent===!0&&b.side===Fi&&b.forceSinglePass===!1?(b.side=zt,b.needsUpdate=!0,Kr(b,V,H),b.side=Ti,b.needsUpdate=!0,Kr(b,V,H),b.side=Fi):Kr(b,V,H)}this.compile=function(b,V,H=null){H===null&&(H=b),f=Xe.get(H),f.init(V),_.push(f),H.traverseVisible(function(O){O.isLight&&O.layers.test(V.layers)&&(f.pushLight(O),O.castShadow&&f.pushShadow(O))}),b!==H&&b.traverseVisible(function(O){O.isLight&&O.layers.test(V.layers)&&(f.pushLight(O),O.castShadow&&f.pushShadow(O))}),f.setupLights();const J=new Set;return b.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const ie=O.material;if(ie)if(Array.isArray(ie))for(let le=0;le<ie.length;le++){const ue=ie[le];et(ue,H,O),J.add(ue)}else et(ie,H,O),J.add(ie)}),_.pop(),f=null,J},this.compileAsync=function(b,V,H=null){const J=this.compile(b,V,H);return new Promise(O=>{function ie(){if(J.forEach(function(le){we.get(le).currentProgram.isReady()&&J.delete(le)}),J.size===0){O(b);return}setTimeout(ie,10)}Ge.get("KHR_parallel_shader_compile")!==null?ie():setTimeout(ie,10)})};let Si=null;function zi(b){Si&&Si(b)}function hh(){bn.stop()}function uh(){bn.start()}const bn=new _d;bn.setAnimationLoop(zi),typeof self<"u"&&bn.setContext(self),this.setAnimationLoop=function(b){Si=b,X.setAnimationLoop(b),b===null?bn.stop():bn.start()},X.addEventListener("sessionstart",hh),X.addEventListener("sessionend",uh),this.render=function(b,V){if(V!==void 0&&V.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(X.cameraAutoUpdate===!0&&X.updateCamera(V),V=X.getCamera()),b.isScene===!0&&b.onBeforeRender(S,b,V,I),f=Xe.get(b,_.length),f.init(V),_.push(f),ge.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),k.setFromProjectionMatrix(ge),se=this.localClippingEnabled,Y=ne.init(this.clippingPlanes,se),m=fe.get(b,A.length),m.init(),A.push(m),X.enabled===!0&&X.isPresenting===!0){const ie=S.xr.getDepthSensingMesh();ie!==null&&al(ie,V,-1/0,S.sortObjects)}al(b,V,0,S.sortObjects),m.finish(),S.sortObjects===!0&&m.sort(Z,$),Ze=X.enabled===!1||X.isPresenting===!1||X.hasDepthSensing()===!1,Ze&&Ue.addToRenderList(m,b),this.info.render.frame++,Y===!0&&ne.beginShadows();const H=f.state.shadowsArray;pe.render(H,b,V),Y===!0&&ne.endShadows(),this.info.autoReset===!0&&this.info.reset();const J=m.opaque,O=m.transmissive;if(f.setupLights(),V.isArrayCamera){const ie=V.cameras;if(O.length>0)for(let le=0,ue=ie.length;le<ue;le++){const ve=ie[le];ph(J,O,b,ve)}Ze&&Ue.render(b);for(let le=0,ue=ie.length;le<ue;le++){const ve=ie[le];fh(m,b,ve,ve.viewport)}}else O.length>0&&ph(J,O,b,V),Ze&&Ue.render(b),fh(m,b,V);I!==null&&(T.updateMultisampleRenderTarget(I),T.updateRenderTargetMipmap(I)),b.isScene===!0&&b.onAfterRender(S,b,V),at.resetDefaultState(),x=-1,E=null,_.pop(),_.length>0?(f=_[_.length-1],Y===!0&&ne.setGlobalState(S.clippingPlanes,f.state.camera)):f=null,A.pop(),A.length>0?m=A[A.length-1]:m=null};function al(b,V,H,J){if(b.visible===!1)return;if(b.layers.test(V.layers)){if(b.isGroup)H=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(V);else if(b.isLight)f.pushLight(b),b.castShadow&&f.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||k.intersectsSprite(b)){J&&Te.setFromMatrixPosition(b.matrixWorld).applyMatrix4(ge);const le=K.update(b),ue=b.material;ue.visible&&m.push(b,le,ue,H,Te.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||k.intersectsObject(b))){const le=K.update(b),ue=b.material;if(J&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Te.copy(b.boundingSphere.center)):(le.boundingSphere===null&&le.computeBoundingSphere(),Te.copy(le.boundingSphere.center)),Te.applyMatrix4(b.matrixWorld).applyMatrix4(ge)),Array.isArray(ue)){const ve=le.groups;for(let Ie=0,De=ve.length;Ie<De;Ie++){const ye=ve[Ie],Ye=ue[ye.materialIndex];Ye&&Ye.visible&&m.push(b,le,Ye,H,Te.z,ye)}}else ue.visible&&m.push(b,le,ue,H,Te.z,null)}}const ie=b.children;for(let le=0,ue=ie.length;le<ue;le++)al(ie[le],V,H,J)}function fh(b,V,H,J){const O=b.opaque,ie=b.transmissive,le=b.transparent;f.setupLightsView(H),Y===!0&&ne.setGlobalState(S.clippingPlanes,H),J&&xe.viewport(M.copy(J)),O.length>0&&Yr(O,V,H),ie.length>0&&Yr(ie,V,H),le.length>0&&Yr(le,V,H),xe.buffers.depth.setTest(!0),xe.buffers.depth.setMask(!0),xe.buffers.color.setMask(!0),xe.setPolygonOffset(!1)}function ph(b,V,H,J){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[J.id]===void 0&&(f.state.transmissionRenderTarget[J.id]=new un(1,1,{generateMipmaps:!0,type:Ge.has("EXT_color_buffer_half_float")||Ge.has("EXT_color_buffer_float")?xs:Ii,minFilter:cn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:We.workingColorSpace}));const ie=f.state.transmissionRenderTarget[J.id],le=J.viewport||M;ie.setSize(le.z,le.w);const ue=S.getRenderTarget();S.setRenderTarget(ie),S.getClearColor(B),z=S.getClearAlpha(),z<1&&S.setClearColor(16777215,.5),S.clear(),Ze&&Ue.render(H);const ve=S.toneMapping;S.toneMapping=Ji;const Ie=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),f.setupLightsView(J),Y===!0&&ne.setGlobalState(S.clippingPlanes,J),Yr(b,H,J),T.updateMultisampleRenderTarget(ie),T.updateRenderTargetMipmap(ie),Ge.has("WEBGL_multisampled_render_to_texture")===!1){let De=!1;for(let ye=0,Ye=V.length;ye<Ye;ye++){const qe=V[ye],Et=qe.object,vt=qe.geometry,Ke=qe.material,Ce=qe.group;if(Ke.side===Fi&&Et.layers.test(J.layers)){const Ft=Ke.side;Ke.side=zt,Ke.needsUpdate=!0,mh(Et,H,J,vt,Ke,Ce),Ke.side=Ft,Ke.needsUpdate=!0,De=!0}}De===!0&&(T.updateMultisampleRenderTarget(ie),T.updateRenderTargetMipmap(ie))}S.setRenderTarget(ue),S.setClearColor(B,z),Ie!==void 0&&(J.viewport=Ie),S.toneMapping=ve}function Yr(b,V,H){const J=V.isScene===!0?V.overrideMaterial:null;for(let O=0,ie=b.length;O<ie;O++){const le=b[O],ue=le.object,ve=le.geometry,Ie=J===null?le.material:J,De=le.group;ue.layers.test(H.layers)&&mh(ue,V,H,ve,Ie,De)}}function mh(b,V,H,J,O,ie){b.onBeforeRender(S,V,H,J,O,ie),b.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),O.onBeforeRender(S,V,H,J,b,ie),O.transparent===!0&&O.side===Fi&&O.forceSinglePass===!1?(O.side=zt,O.needsUpdate=!0,S.renderBufferDirect(H,V,J,O,b,ie),O.side=Ti,O.needsUpdate=!0,S.renderBufferDirect(H,V,J,O,b,ie),O.side=Fi):S.renderBufferDirect(H,V,J,O,b,ie),b.onAfterRender(S,V,H,J,O,ie)}function Kr(b,V,H){V.isScene!==!0&&(V=ut);const J=we.get(b),O=f.state.lights,ie=f.state.shadowsArray,le=O.state.version,ue=_e.getParameters(b,O.state,ie,V,H),ve=_e.getProgramCacheKey(ue);let Ie=J.programs;J.environment=b.isMeshStandardMaterial?V.environment:null,J.fog=V.fog,J.envMap=(b.isMeshStandardMaterial?G:w).get(b.envMap||J.environment),J.envMapRotation=J.environment!==null&&b.envMap===null?V.environmentRotation:b.envMapRotation,Ie===void 0&&(b.addEventListener("dispose",Le),Ie=new Map,J.programs=Ie);let De=Ie.get(ve);if(De!==void 0){if(J.currentProgram===De&&J.lightsStateVersion===le)return vh(b,ue),De}else ue.uniforms=_e.getUniforms(b),b.onBeforeCompile(ue,S),De=_e.acquireProgram(ue,ve),Ie.set(ve,De),J.uniforms=ue.uniforms;const ye=J.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(ye.clippingPlanes=ne.uniform),vh(b,ue),J.needsLights=e_(b),J.lightsStateVersion=le,J.needsLights&&(ye.ambientLightColor.value=O.state.ambient,ye.lightProbe.value=O.state.probe,ye.directionalLights.value=O.state.directional,ye.directionalLightShadows.value=O.state.directionalShadow,ye.spotLights.value=O.state.spot,ye.spotLightShadows.value=O.state.spotShadow,ye.rectAreaLights.value=O.state.rectArea,ye.ltc_1.value=O.state.rectAreaLTC1,ye.ltc_2.value=O.state.rectAreaLTC2,ye.pointLights.value=O.state.point,ye.pointLightShadows.value=O.state.pointShadow,ye.hemisphereLights.value=O.state.hemi,ye.directionalShadowMap.value=O.state.directionalShadowMap,ye.directionalShadowMatrix.value=O.state.directionalShadowMatrix,ye.spotShadowMap.value=O.state.spotShadowMap,ye.spotLightMatrix.value=O.state.spotLightMatrix,ye.spotLightMap.value=O.state.spotLightMap,ye.pointShadowMap.value=O.state.pointShadowMap,ye.pointShadowMatrix.value=O.state.pointShadowMatrix),J.currentProgram=De,J.uniformsList=null,De}function gh(b){if(b.uniformsList===null){const V=b.currentProgram.getUniforms();b.uniformsList=kr.seqWithValue(V.seq,b.uniforms)}return b.uniformsList}function vh(b,V){const H=we.get(b);H.outputColorSpace=V.outputColorSpace,H.batching=V.batching,H.batchingColor=V.batchingColor,H.instancing=V.instancing,H.instancingColor=V.instancingColor,H.instancingMorph=V.instancingMorph,H.skinning=V.skinning,H.morphTargets=V.morphTargets,H.morphNormals=V.morphNormals,H.morphColors=V.morphColors,H.morphTargetsCount=V.morphTargetsCount,H.numClippingPlanes=V.numClippingPlanes,H.numIntersection=V.numClipIntersection,H.vertexAlphas=V.vertexAlphas,H.vertexTangents=V.vertexTangents,H.toneMapping=V.toneMapping}function qA(b,V,H,J,O){V.isScene!==!0&&(V=ut),T.resetTextureUnits();const ie=V.fog,le=J.isMeshStandardMaterial?V.environment:null,ue=I===null?S.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Hn,ve=(J.isMeshStandardMaterial?G:w).get(J.envMap||le),Ie=J.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,De=!!H.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),ye=!!H.morphAttributes.position,Ye=!!H.morphAttributes.normal,qe=!!H.morphAttributes.color;let Et=Ji;J.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(Et=S.toneMapping);const vt=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Ke=vt!==void 0?vt.length:0,Ce=we.get(J),Ft=f.state.lights;if(Y===!0&&(se===!0||b!==E)){const kt=b===E&&J.id===x;ne.setState(J,b,kt)}let $e=!1;J.version===Ce.__version?(Ce.needsLights&&Ce.lightsStateVersion!==Ft.state.version||Ce.outputColorSpace!==ue||O.isBatchedMesh&&Ce.batching===!1||!O.isBatchedMesh&&Ce.batching===!0||O.isBatchedMesh&&Ce.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Ce.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Ce.instancing===!1||!O.isInstancedMesh&&Ce.instancing===!0||O.isSkinnedMesh&&Ce.skinning===!1||!O.isSkinnedMesh&&Ce.skinning===!0||O.isInstancedMesh&&Ce.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Ce.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Ce.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Ce.instancingMorph===!1&&O.morphTexture!==null||Ce.envMap!==ve||J.fog===!0&&Ce.fog!==ie||Ce.numClippingPlanes!==void 0&&(Ce.numClippingPlanes!==ne.numPlanes||Ce.numIntersection!==ne.numIntersection)||Ce.vertexAlphas!==Ie||Ce.vertexTangents!==De||Ce.morphTargets!==ye||Ce.morphNormals!==Ye||Ce.morphColors!==qe||Ce.toneMapping!==Et||Ce.morphTargetsCount!==Ke)&&($e=!0):($e=!0,Ce.__version=J.version);let Ei=Ce.currentProgram;$e===!0&&(Ei=Kr(J,V,O));let fs=!1,ei=!1,Ls=!1;const dt=Ei.getUniforms(),li=Ce.uniforms;if(xe.useProgram(Ei.program)&&(fs=!0,ei=!0,Ls=!0),J.id!==x&&(x=J.id,ei=!0),fs||E!==b){xe.buffers.depth.getReversed()?(ee.copy(b.projectionMatrix),up(ee),fp(ee),dt.setValue(L,"projectionMatrix",ee)):dt.setValue(L,"projectionMatrix",b.projectionMatrix),dt.setValue(L,"viewMatrix",b.matrixWorldInverse);const Xt=dt.map.cameraPosition;Xt!==void 0&&Xt.setValue(L,Ee.setFromMatrixPosition(b.matrixWorld)),He.logarithmicDepthBuffer&&dt.setValue(L,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&dt.setValue(L,"isOrthographic",b.isOrthographicCamera===!0),E!==b&&(E=b,ei=!0,Ls=!0)}if(O.isSkinnedMesh){dt.setOptional(L,O,"bindMatrix"),dt.setOptional(L,O,"bindMatrixInverse");const kt=O.skeleton;kt&&(kt.boneTexture===null&&kt.computeBoneTexture(),dt.setValue(L,"boneTexture",kt.boneTexture,T))}O.isBatchedMesh&&(dt.setOptional(L,O,"batchingTexture"),dt.setValue(L,"batchingTexture",O._matricesTexture,T),dt.setOptional(L,O,"batchingIdTexture"),dt.setValue(L,"batchingIdTexture",O._indirectTexture,T),dt.setOptional(L,O,"batchingColorTexture"),O._colorsTexture!==null&&dt.setValue(L,"batchingColorTexture",O._colorsTexture,T));const ci=H.morphAttributes;if((ci.position!==void 0||ci.normal!==void 0||ci.color!==void 0)&&Fe.update(O,H,Ei),(ei||Ce.receiveShadow!==O.receiveShadow)&&(Ce.receiveShadow=O.receiveShadow,dt.setValue(L,"receiveShadow",O.receiveShadow)),J.isMeshGouraudMaterial&&J.envMap!==null&&(li.envMap.value=ve,li.flipEnvMap.value=ve.isCubeTexture&&ve.isRenderTargetTexture===!1?-1:1),J.isMeshStandardMaterial&&J.envMap===null&&V.environment!==null&&(li.envMapIntensity.value=V.environmentIntensity),ei&&(dt.setValue(L,"toneMappingExposure",S.toneMappingExposure),Ce.needsLights&&$A(li,Ls),ie&&J.fog===!0&&ce.refreshFogUniforms(li,ie),ce.refreshMaterialUniforms(li,J,D,N,f.state.transmissionRenderTarget[b.id]),kr.upload(L,gh(Ce),li,T)),J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(kr.upload(L,gh(Ce),li,T),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&dt.setValue(L,"center",O.center),dt.setValue(L,"modelViewMatrix",O.modelViewMatrix),dt.setValue(L,"normalMatrix",O.normalMatrix),dt.setValue(L,"modelMatrix",O.matrixWorld),J.isShaderMaterial||J.isRawShaderMaterial){const kt=J.uniformsGroups;for(let Xt=0,ol=kt.length;Xt<ol;Xt++){const yn=kt[Xt];P.update(yn,Ei),P.bind(yn,Ei)}}return Ei}function $A(b,V){b.ambientLightColor.needsUpdate=V,b.lightProbe.needsUpdate=V,b.directionalLights.needsUpdate=V,b.directionalLightShadows.needsUpdate=V,b.pointLights.needsUpdate=V,b.pointLightShadows.needsUpdate=V,b.spotLights.needsUpdate=V,b.spotLightShadows.needsUpdate=V,b.rectAreaLights.needsUpdate=V,b.hemisphereLights.needsUpdate=V}function e_(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return y},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(b,V,H){we.get(b.texture).__webglTexture=V,we.get(b.depthTexture).__webglTexture=H;const J=we.get(b);J.__hasExternalTextures=!0,J.__autoAllocateDepthBuffer=H===void 0,J.__autoAllocateDepthBuffer||Ge.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),J.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,V){const H=we.get(b);H.__webglFramebuffer=V,H.__useDefaultFramebuffer=V===void 0},this.setRenderTarget=function(b,V=0,H=0){I=b,y=V,U=H;let J=!0,O=null,ie=!1,le=!1;if(b){const ve=we.get(b);if(ve.__useDefaultFramebuffer!==void 0)xe.bindFramebuffer(L.FRAMEBUFFER,null),J=!1;else if(ve.__webglFramebuffer===void 0)T.setupRenderTarget(b);else if(ve.__hasExternalTextures)T.rebindTextures(b,we.get(b.texture).__webglTexture,we.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const ye=b.depthTexture;if(ve.__boundDepthTexture!==ye){if(ye!==null&&we.has(ye)&&(b.width!==ye.image.width||b.height!==ye.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(b)}}const Ie=b.texture;(Ie.isData3DTexture||Ie.isDataArrayTexture||Ie.isCompressedArrayTexture)&&(le=!0);const De=we.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(De[V])?O=De[V][H]:O=De[V],ie=!0):b.samples>0&&T.useMultisampledRTT(b)===!1?O=we.get(b).__webglMultisampledFramebuffer:Array.isArray(De)?O=De[H]:O=De,M.copy(b.viewport),R.copy(b.scissor),F=b.scissorTest}else M.copy(ae).multiplyScalar(D).floor(),R.copy(be).multiplyScalar(D).floor(),F=Be;if(xe.bindFramebuffer(L.FRAMEBUFFER,O)&&J&&xe.drawBuffers(b,O),xe.viewport(M),xe.scissor(R),xe.setScissorTest(F),ie){const ve=we.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+V,ve.__webglTexture,H)}else if(le){const ve=we.get(b.texture),Ie=V||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,ve.__webglTexture,H||0,Ie)}x=-1},this.readRenderTargetPixels=function(b,V,H,J,O,ie,le){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ue=we.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&le!==void 0&&(ue=ue[le]),ue){xe.bindFramebuffer(L.FRAMEBUFFER,ue);try{const ve=b.texture,Ie=ve.format,De=ve.type;if(!He.textureFormatReadable(Ie)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!He.textureTypeReadable(De)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=b.width-J&&H>=0&&H<=b.height-O&&L.readPixels(V,H,J,O,ke.convert(Ie),ke.convert(De),ie)}finally{const ve=I!==null?we.get(I).__webglFramebuffer:null;xe.bindFramebuffer(L.FRAMEBUFFER,ve)}}},this.readRenderTargetPixelsAsync=async function(b,V,H,J,O,ie,le){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ue=we.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&le!==void 0&&(ue=ue[le]),ue){const ve=b.texture,Ie=ve.format,De=ve.type;if(!He.textureFormatReadable(Ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!He.textureTypeReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(V>=0&&V<=b.width-J&&H>=0&&H<=b.height-O){xe.bindFramebuffer(L.FRAMEBUFFER,ue);const ye=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,ye),L.bufferData(L.PIXEL_PACK_BUFFER,ie.byteLength,L.STREAM_READ),L.readPixels(V,H,J,O,ke.convert(Ie),ke.convert(De),0);const Ye=I!==null?we.get(I).__webglFramebuffer:null;xe.bindFramebuffer(L.FRAMEBUFFER,Ye);const qe=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await hp(L,qe,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,ye),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,ie),L.deleteBuffer(ye),L.deleteSync(qe),ie}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,V=null,H=0){b.isTexture!==!0&&(Zn("WebGLRenderer: copyFramebufferToTexture function signature has changed."),V=arguments[0]||null,b=arguments[1]);const J=Math.pow(2,-H),O=Math.floor(b.image.width*J),ie=Math.floor(b.image.height*J),le=V!==null?V.x:0,ue=V!==null?V.y:0;T.setTexture2D(b,0),L.copyTexSubImage2D(L.TEXTURE_2D,H,0,0,le,ue,O,ie),xe.unbindTexture()};const t_=L.createFramebuffer(),i_=L.createFramebuffer();this.copyTextureToTexture=function(b,V,H=null,J=null,O=0,ie=null){b.isTexture!==!0&&(Zn("WebGLRenderer: copyTextureToTexture function signature has changed."),J=arguments[0]||null,b=arguments[1],V=arguments[2],ie=arguments[3]||0,H=null),ie===null&&(O!==0?(Zn("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ie=O,O=0):ie=0);let le,ue,ve,Ie,De,ye,Ye,qe,Et;const vt=b.isCompressedTexture?b.mipmaps[ie]:b.image;if(H!==null)le=H.max.x-H.min.x,ue=H.max.y-H.min.y,ve=H.isBox3?H.max.z-H.min.z:1,Ie=H.min.x,De=H.min.y,ye=H.isBox3?H.min.z:0;else{const ci=Math.pow(2,-O);le=Math.floor(vt.width*ci),ue=Math.floor(vt.height*ci),b.isDataArrayTexture?ve=vt.depth:b.isData3DTexture?ve=Math.floor(vt.depth*ci):ve=1,Ie=0,De=0,ye=0}J!==null?(Ye=J.x,qe=J.y,Et=J.z):(Ye=0,qe=0,Et=0);const Ke=ke.convert(V.format),Ce=ke.convert(V.type);let Ft;V.isData3DTexture?(T.setTexture3D(V,0),Ft=L.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(T.setTexture2DArray(V,0),Ft=L.TEXTURE_2D_ARRAY):(T.setTexture2D(V,0),Ft=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,V.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,V.unpackAlignment);const $e=L.getParameter(L.UNPACK_ROW_LENGTH),Ei=L.getParameter(L.UNPACK_IMAGE_HEIGHT),fs=L.getParameter(L.UNPACK_SKIP_PIXELS),ei=L.getParameter(L.UNPACK_SKIP_ROWS),Ls=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,vt.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,vt.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Ie),L.pixelStorei(L.UNPACK_SKIP_ROWS,De),L.pixelStorei(L.UNPACK_SKIP_IMAGES,ye);const dt=b.isDataArrayTexture||b.isData3DTexture,li=V.isDataArrayTexture||V.isData3DTexture;if(b.isDepthTexture){const ci=we.get(b),kt=we.get(V),Xt=we.get(ci.__renderTarget),ol=we.get(kt.__renderTarget);xe.bindFramebuffer(L.READ_FRAMEBUFFER,Xt.__webglFramebuffer),xe.bindFramebuffer(L.DRAW_FRAMEBUFFER,ol.__webglFramebuffer);for(let yn=0;yn<ve;yn++)dt&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,we.get(b).__webglTexture,O,ye+yn),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,we.get(V).__webglTexture,ie,Et+yn)),L.blitFramebuffer(Ie,De,le,ue,Ye,qe,le,ue,L.DEPTH_BUFFER_BIT,L.NEAREST);xe.bindFramebuffer(L.READ_FRAMEBUFFER,null),xe.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(O!==0||b.isRenderTargetTexture||we.has(b)){const ci=we.get(b),kt=we.get(V);xe.bindFramebuffer(L.READ_FRAMEBUFFER,t_),xe.bindFramebuffer(L.DRAW_FRAMEBUFFER,i_);for(let Xt=0;Xt<ve;Xt++)dt?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,ci.__webglTexture,O,ye+Xt):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,ci.__webglTexture,O),li?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,kt.__webglTexture,ie,Et+Xt):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,kt.__webglTexture,ie),O!==0?L.blitFramebuffer(Ie,De,le,ue,Ye,qe,le,ue,L.COLOR_BUFFER_BIT,L.NEAREST):li?L.copyTexSubImage3D(Ft,ie,Ye,qe,Et+Xt,Ie,De,le,ue):L.copyTexSubImage2D(Ft,ie,Ye,qe,Ie,De,le,ue);xe.bindFramebuffer(L.READ_FRAMEBUFFER,null),xe.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else li?b.isDataTexture||b.isData3DTexture?L.texSubImage3D(Ft,ie,Ye,qe,Et,le,ue,ve,Ke,Ce,vt.data):V.isCompressedArrayTexture?L.compressedTexSubImage3D(Ft,ie,Ye,qe,Et,le,ue,ve,Ke,vt.data):L.texSubImage3D(Ft,ie,Ye,qe,Et,le,ue,ve,Ke,Ce,vt):b.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,ie,Ye,qe,le,ue,Ke,Ce,vt.data):b.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,ie,Ye,qe,vt.width,vt.height,Ke,vt.data):L.texSubImage2D(L.TEXTURE_2D,ie,Ye,qe,le,ue,Ke,Ce,vt);L.pixelStorei(L.UNPACK_ROW_LENGTH,$e),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Ei),L.pixelStorei(L.UNPACK_SKIP_PIXELS,fs),L.pixelStorei(L.UNPACK_SKIP_ROWS,ei),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Ls),ie===0&&V.generateMipmaps&&L.generateMipmap(Ft),xe.unbindTexture()},this.copyTextureToTexture3D=function(b,V,H=null,J=null,O=0){return b.isTexture!==!0&&(Zn("WebGLRenderer: copyTextureToTexture3D function signature has changed."),H=arguments[0]||null,J=arguments[1]||null,b=arguments[2],V=arguments[3],O=arguments[4]||0),Zn('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(b,V,H,J,O)},this.initRenderTarget=function(b){we.get(b).__webglFramebuffer===void 0&&T.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?T.setTextureCube(b,0):b.isData3DTexture?T.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?T.setTexture2DArray(b,0):T.setTexture2D(b,0),xe.unbindTexture()},this.resetState=function(){y=0,U=0,I=null,xe.reset(),at.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Bi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=We._getDrawingBufferColorSpace(e),t.unpackColorSpace=We._getUnpackColorSpace()}}const iA=/^[og]\s*(.+)?/,nA=/^mtllib /,sA=/^usemtl /,rA=/^usemap /,Xd=/\s+/,Yd=new W,Ko=new W,Kd=new W,jd=new W,ri=new W,zr=new Pe;function aA(){const s={objects:[],object:{},vertices:[],normals:[],colors:[],uvs:[],materials:{},materialLibraries:[],startObject:function(e,t){if(this.object&&this.object.fromDeclaration===!1){this.object.name=e,this.object.fromDeclaration=t!==!1;return}const i=this.object&&typeof this.object.currentMaterial=="function"?this.object.currentMaterial():void 0;if(this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0),this.object={name:e||"",fromDeclaration:t!==!1,geometry:{vertices:[],normals:[],colors:[],uvs:[],hasUVIndices:!1},materials:[],smooth:!0,startMaterial:function(n,r){const a=this._finalize(!1);a&&(a.inherited||a.groupCount<=0)&&this.materials.splice(a.index,1);const o={index:this.materials.length,name:n||"",mtllib:Array.isArray(r)&&r.length>0?r[r.length-1]:"",smooth:a!==void 0?a.smooth:this.smooth,groupStart:a!==void 0?a.groupEnd:0,groupEnd:-1,groupCount:-1,inherited:!1,clone:function(c){const l={index:typeof c=="number"?c:this.index,name:this.name,mtllib:this.mtllib,smooth:this.smooth,groupStart:0,groupEnd:-1,groupCount:-1,inherited:!1};return l.clone=this.clone.bind(l),l}};return this.materials.push(o),o},currentMaterial:function(){if(this.materials.length>0)return this.materials[this.materials.length-1]},_finalize:function(n){const r=this.currentMaterial();if(r&&r.groupEnd===-1&&(r.groupEnd=this.geometry.vertices.length/3,r.groupCount=r.groupEnd-r.groupStart,r.inherited=!1),n&&this.materials.length>1)for(let a=this.materials.length-1;a>=0;a--)this.materials[a].groupCount<=0&&this.materials.splice(a,1);return n&&this.materials.length===0&&this.materials.push({name:"",smooth:this.smooth}),r}},i&&i.name&&typeof i.clone=="function"){const n=i.clone(0);n.inherited=!0,this.object.materials.push(n)}this.objects.push(this.object)},finalize:function(){this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0)},parseVertexIndex:function(e,t){const i=parseInt(e,10);return(i>=0?i-1:i+t/3)*3},parseNormalIndex:function(e,t){const i=parseInt(e,10);return(i>=0?i-1:i+t/3)*3},parseUVIndex:function(e,t){const i=parseInt(e,10);return(i>=0?i-1:i+t/2)*2},addVertex:function(e,t,i){const n=this.vertices,r=this.object.geometry.vertices;r.push(n[e+0],n[e+1],n[e+2]),r.push(n[t+0],n[t+1],n[t+2]),r.push(n[i+0],n[i+1],n[i+2])},addVertexPoint:function(e){const t=this.vertices;this.object.geometry.vertices.push(t[e+0],t[e+1],t[e+2])},addVertexLine:function(e){const t=this.vertices;this.object.geometry.vertices.push(t[e+0],t[e+1],t[e+2])},addNormal:function(e,t,i){const n=this.normals,r=this.object.geometry.normals;r.push(n[e+0],n[e+1],n[e+2]),r.push(n[t+0],n[t+1],n[t+2]),r.push(n[i+0],n[i+1],n[i+2])},addFaceNormal:function(e,t,i){const n=this.vertices,r=this.object.geometry.normals;Yd.fromArray(n,e),Ko.fromArray(n,t),Kd.fromArray(n,i),ri.subVectors(Kd,Ko),jd.subVectors(Yd,Ko),ri.cross(jd),ri.normalize(),r.push(ri.x,ri.y,ri.z),r.push(ri.x,ri.y,ri.z),r.push(ri.x,ri.y,ri.z)},addColor:function(e,t,i){const n=this.colors,r=this.object.geometry.colors;n[e]!==void 0&&r.push(n[e+0],n[e+1],n[e+2]),n[t]!==void 0&&r.push(n[t+0],n[t+1],n[t+2]),n[i]!==void 0&&r.push(n[i+0],n[i+1],n[i+2])},addUV:function(e,t,i){const n=this.uvs,r=this.object.geometry.uvs;r.push(n[e+0],n[e+1]),r.push(n[t+0],n[t+1]),r.push(n[i+0],n[i+1])},addDefaultUV:function(){const e=this.object.geometry.uvs;e.push(0,0),e.push(0,0),e.push(0,0)},addUVLine:function(e){const t=this.uvs;this.object.geometry.uvs.push(t[e+0],t[e+1])},addFace:function(e,t,i,n,r,a,o,c,l){const d=this.vertices.length;let h=this.parseVertexIndex(e,d),u=this.parseVertexIndex(t,d),p=this.parseVertexIndex(i,d);if(this.addVertex(h,u,p),this.addColor(h,u,p),o!==void 0&&o!==""){const g=this.normals.length;h=this.parseNormalIndex(o,g),u=this.parseNormalIndex(c,g),p=this.parseNormalIndex(l,g),this.addNormal(h,u,p)}else this.addFaceNormal(h,u,p);if(n!==void 0&&n!==""){const g=this.uvs.length;h=this.parseUVIndex(n,g),u=this.parseUVIndex(r,g),p=this.parseUVIndex(a,g),this.addUV(h,u,p),this.object.geometry.hasUVIndices=!0}else this.addDefaultUV()},addPointGeometry:function(e){this.object.geometry.type="Points";const t=this.vertices.length;for(let i=0,n=e.length;i<n;i++){const r=this.parseVertexIndex(e[i],t);this.addVertexPoint(r),this.addColor(r)}},addLineGeometry:function(e,t){this.object.geometry.type="Line";const i=this.vertices.length,n=this.uvs.length;for(let r=0,a=e.length;r<a;r++)this.addVertexLine(this.parseVertexIndex(e[r],i));for(let r=0,a=t.length;r<a;r++)this.addUVLine(this.parseUVIndex(t[r],n))}};return s.startObject("",!1),s}class oA extends cs{constructor(e){super(e),this.materials=null}load(e,t,i,n){const r=this,a=new ud(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(o){try{t(r.parse(o))}catch(c){n?n(c):console.error(c),r.manager.itemError(e)}},i,n)}setMaterials(e){return this.materials=e,this}parse(e){const t=new aA;e.indexOf(`\r
`)!==-1&&(e=e.replace(/\r\n/g,`
`)),e.indexOf(`\\
`)!==-1&&(e=e.replace(/\\\n/g,""));const i=e.split(`
`);let n=[];for(let o=0,c=i.length;o<c;o++){const l=i[o].trimStart();if(l.length===0)continue;const d=l.charAt(0);if(d!=="#")if(d==="v"){const h=l.split(Xd);switch(h[0]){case"v":t.vertices.push(parseFloat(h[1]),parseFloat(h[2]),parseFloat(h[3])),h.length>=7?(zr.setRGB(parseFloat(h[4]),parseFloat(h[5]),parseFloat(h[6]),Tt),t.colors.push(zr.r,zr.g,zr.b)):t.colors.push(void 0,void 0,void 0);break;case"vn":t.normals.push(parseFloat(h[1]),parseFloat(h[2]),parseFloat(h[3]));break;case"vt":t.uvs.push(parseFloat(h[1]),parseFloat(h[2]));break}}else if(d==="f"){const u=l.slice(1).trim().split(Xd),p=[];for(let v=0,m=u.length;v<m;v++){const f=u[v];if(f.length>0){const A=f.split("/");p.push(A)}}const g=p[0];for(let v=1,m=p.length-1;v<m;v++){const f=p[v],A=p[v+1];t.addFace(g[0],f[0],A[0],g[1],f[1],A[1],g[2],f[2],A[2])}}else if(d==="l"){const h=l.substring(1).trim().split(" ");let u=[];const p=[];if(l.indexOf("/")===-1)u=h;else for(let g=0,v=h.length;g<v;g++){const m=h[g].split("/");m[0]!==""&&u.push(m[0]),m[1]!==""&&p.push(m[1])}t.addLineGeometry(u,p)}else if(d==="p"){const u=l.slice(1).trim().split(" ");t.addPointGeometry(u)}else if((n=iA.exec(l))!==null){const h=(" "+n[0].slice(1).trim()).slice(1);t.startObject(h)}else if(sA.test(l))t.object.startMaterial(l.substring(7).trim(),t.materialLibraries);else if(nA.test(l))t.materialLibraries.push(l.substring(7).trim());else if(rA.test(l))console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');else if(d==="s"){if(n=l.split(" "),n.length>1){const u=n[1].trim().toLowerCase();t.object.smooth=u!=="0"&&u!=="off"}else t.object.smooth=!0;const h=t.object.currentMaterial();h&&(h.smooth=t.object.smooth)}else{if(l==="\0")continue;console.warn('THREE.OBJLoader: Unexpected line: "'+l+'"')}}t.finalize();const r=new Ds;if(r.materialLibraries=[].concat(t.materialLibraries),!(t.objects.length===1&&t.objects[0].geometry.vertices.length===0)===!0)for(let o=0,c=t.objects.length;o<c;o++){const l=t.objects[o],d=l.geometry,h=l.materials,u=d.type==="Line",p=d.type==="Points";let g=!1;if(d.vertices.length===0)continue;const v=new _i;v.setAttribute("position",new Nt(d.vertices,3)),d.normals.length>0&&v.setAttribute("normal",new Nt(d.normals,3)),d.colors.length>0&&(g=!0,v.setAttribute("color",new Nt(d.colors,3))),d.hasUVIndices===!0&&v.setAttribute("uv",new Nt(d.uvs,2));const m=[];for(let A=0,_=h.length;A<_;A++){const S=h[A],C=S.name+"_"+S.smooth+"_"+g;let y=t.materials[C];if(this.materials!==null){if(y=this.materials.create(S.name),u&&y&&!(y instanceof Mr)){const U=new Mr;ki.prototype.copy.call(U,y),U.color.copy(y.color),y=U}else if(p&&y&&!(y instanceof Bs)){const U=new Bs({size:10,sizeAttenuation:!1});ki.prototype.copy.call(U,y),U.color.copy(y.color),U.map=y.map,y=U}}y===void 0&&(u?y=new Mr:p?y=new Bs({size:1,sizeAttenuation:!1}):y=new Vo,y.name=S.name,y.flatShading=!S.smooth,y.vertexColors=g,t.materials[C]=y),m.push(y)}let f;if(m.length>1){for(let A=0,_=h.length;A<_;A++){const S=h[A];v.addGroup(S.groupStart,S.groupCount,A)}u?f=new od(v,m):p?f=new Po(v,m):f=new Gt(v,m)}else u?f=new od(v,m[0]):p?f=new Po(v,m[0]):f=new Gt(v,m[0]);f.name=l.name,r.add(f)}else if(t.vertices.length>0){const o=new Bs({size:1,sizeAttenuation:!1}),c=new _i;c.setAttribute("position",new Nt(t.vertices,3)),t.colors.length>0&&t.colors[0]!==void 0&&(c.setAttribute("color",new Nt(t.colors,3)),o.vertexColors=!0);const l=new Po(c,o);r.add(l)}return r}}class lA extends cs{constructor(e){super(e)}load(e,t,i,n){const r=this,a=this.path===""?Kp.extractUrlBase(e):this.path,o=new ud(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(c){try{t(r.parse(c,a))}catch(l){n?n(l):console.error(l),r.manager.itemError(e)}},i,n)}setMaterialOptions(e){return this.materialOptions=e,this}parse(e,t){const i=e.split(`
`);let n={};const r=/\s+/,a={};for(let c=0;c<i.length;c++){let l=i[c];if(l=l.trim(),l.length===0||l.charAt(0)==="#")continue;const d=l.indexOf(" ");let h=d>=0?l.substring(0,d):l;h=h.toLowerCase();let u=d>=0?l.substring(d+1):"";if(u=u.trim(),h==="newmtl")n={name:u},a[u]=n;else if(h==="ka"||h==="kd"||h==="ks"||h==="ke"){const p=u.split(r,3);n[h]=[parseFloat(p[0]),parseFloat(p[1]),parseFloat(p[2])]}else n[h]=u}const o=new cA(this.resourcePath||t,this.materialOptions);return o.setCrossOrigin(this.crossOrigin),o.setManager(this.manager),o.setMaterials(a),o}}class cA{constructor(e="",t={}){this.baseUrl=e,this.options=t,this.materialsInfo={},this.materials={},this.materialsArray=[],this.nameLookup={},this.crossOrigin="anonymous",this.side=this.options.side!==void 0?this.options.side:Ti,this.wrap=this.options.wrap!==void 0?this.options.wrap:er}setCrossOrigin(e){return this.crossOrigin=e,this}setManager(e){this.manager=e}setMaterials(e){this.materialsInfo=this.convert(e),this.materials={},this.materialsArray=[],this.nameLookup={}}convert(e){if(!this.options)return e;const t={};for(const i in e){const n=e[i],r={};t[i]=r;for(const a in n){let o=!0,c=n[a];const l=a.toLowerCase();switch(l){case"kd":case"ka":case"ks":this.options&&this.options.normalizeRGB&&(c=[c[0]/255,c[1]/255,c[2]/255]),this.options&&this.options.ignoreZeroRGBs&&c[0]===0&&c[1]===0&&c[2]===0&&(o=!1);break}o&&(r[l]=c)}}return t}preload(){for(const e in this.materialsInfo)this.create(e)}getIndex(e){return this.nameLookup[e]}getAsArray(){let e=0;for(const t in this.materialsInfo)this.materialsArray[e]=this.create(t),this.nameLookup[t]=e,e++;return this.materialsArray}create(e){return this.materials[e]===void 0&&this.createMaterial_(e),this.materials[e]}createMaterial_(e){const t=this,i=this.materialsInfo[e],n={name:e,side:this.side};function r(o,c){return typeof c!="string"||c===""?"":/^https?:\/\//i.test(c)?c:o+c}function a(o,c){if(n[o])return;const l=t.getTextureParams(c,n),d=t.loadTexture(r(t.baseUrl,l.url));d.repeat.copy(l.scale),d.offset.copy(l.offset),d.wrapS=t.wrap,d.wrapT=t.wrap,(o==="map"||o==="emissiveMap")&&(d.colorSpace=Tt),n[o]=d}for(const o in i){const c=i[o];let l;if(c!=="")switch(o.toLowerCase()){case"kd":n.color=We.toWorkingColorSpace(new Pe().fromArray(c),Tt);break;case"ks":n.specular=We.toWorkingColorSpace(new Pe().fromArray(c),Tt);break;case"ke":n.emissive=We.toWorkingColorSpace(new Pe().fromArray(c),Tt);break;case"map_kd":a("map",c);break;case"map_ks":a("specularMap",c);break;case"map_ke":a("emissiveMap",c);break;case"norm":a("normalMap",c);break;case"map_bump":case"bump":a("bumpMap",c);break;case"map_d":a("alphaMap",c),n.transparent=!0;break;case"ns":n.shininess=parseFloat(c);break;case"d":l=parseFloat(c),l<1&&(n.opacity=l,n.transparent=!0);break;case"tr":l=parseFloat(c),this.options&&this.options.invertTrProperty&&(l=1-l),l>0&&(n.opacity=1-l,n.transparent=!0);break}}return this.materials[e]=new Vo(n),this.materials[e]}getTextureParams(e,t){const i={scale:new Qe(1,1),offset:new Qe(0,0)},n=e.split(/\s+/);let r;return r=n.indexOf("-bm"),r>=0&&(t.bumpScale=parseFloat(n[r+1]),n.splice(r,2)),r=n.indexOf("-s"),r>=0&&(i.scale.set(parseFloat(n[r+1]),parseFloat(n[r+2])),n.splice(r,4)),r=n.indexOf("-o"),r>=0&&(i.offset.set(parseFloat(n[r+1]),parseFloat(n[r+2])),n.splice(r,4)),i.url=n.join(" ").trim(),i}loadTexture(e,t,i,n,r){const a=this.manager!==void 0?this.manager:hd;let o=a.getHandler(e);o===null&&(o=new Hp(a)),o.setCrossOrigin&&o.setCrossOrigin(this.crossOrigin);const c=o.load(e,i,n,r);return t!==void 0&&(c.mapping=t),c}}const qd={type:"change"},jo={type:"start"},$d={type:"end"},Wr=new mr,eh=new tn,dA=Math.cos(70*cp.DEG2RAD),yt=new W,Ht=2*Math.PI,it={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},qo=1e-6;class hA extends qp{constructor(e,t=null){super(e,t),this.state=it.NONE,this.enabled=!0,this.target=new W,this.cursor=new W,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Nn.ROTATE,MIDDLE:Nn.DOLLY,RIGHT:Nn.PAN},this.touches={ONE:Ln.ROTATE,TWO:Ln.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new W,this._lastQuaternion=new fn,this._lastTargetPosition=new W,this._quat=new fn().setFromUnitVectors(e.up,new W(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new vd,this._sphericalDelta=new vd,this._scale=1,this._panOffset=new W,this._rotateStart=new Qe,this._rotateEnd=new Qe,this._rotateDelta=new Qe,this._panStart=new Qe,this._panEnd=new Qe,this._panDelta=new Qe,this._dollyStart=new Qe,this._dollyEnd=new Qe,this._dollyDelta=new Qe,this._dollyDirection=new W,this._mouse=new Qe,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=fA.bind(this),this._onPointerDown=uA.bind(this),this._onPointerUp=pA.bind(this),this._onContextMenu=EA.bind(this),this._onMouseWheel=vA.bind(this),this._onKeyDown=AA.bind(this),this._onTouchStart=_A.bind(this),this._onTouchMove=SA.bind(this),this._onMouseDown=mA.bind(this),this._onMouseMove=gA.bind(this),this._interceptControlDown=xA.bind(this),this._interceptControlUp=wA.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(qd),this.update(),this.state=it.NONE}update(e=null){const t=this.object.position;yt.copy(t).sub(this.target),yt.applyQuaternion(this._quat),this._spherical.setFromVector3(yt),this.autoRotate&&this.state===it.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,n=this.maxAzimuthAngle;isFinite(i)&&isFinite(n)&&(i<-Math.PI?i+=Ht:i>Math.PI&&(i-=Ht),n<-Math.PI?n+=Ht:n>Math.PI&&(n-=Ht),i<=n?this._spherical.theta=Math.max(i,Math.min(n,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+n)/2?Math.max(i,this._spherical.theta):Math.min(n,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(yt.setFromSpherical(this._spherical),yt.applyQuaternion(this._quatInverse),t.copy(this.target).add(yt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=yt.length();a=this._clampDistance(o*this._scale);const c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const o=new W(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new W(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=yt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Wr.origin.copy(this.object.position),Wr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Wr.direction))<dA?this.object.lookAt(this.target):(eh.setFromNormalAndCoplanarPoint(this.object.up,this.target),Wr.intersectPlane(eh,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>qo||8*(1-this._lastQuaternion.dot(this.object.quaternion))>qo||this._lastTargetPosition.distanceToSquared(this.target)>qo?(this.dispatchEvent(qd),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Ht/60*this.autoRotateSpeed*e:Ht/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){yt.setFromMatrixColumn(t,0),yt.multiplyScalar(-e),this._panOffset.add(yt)}_panUp(e,t){this.screenSpacePanning===!0?yt.setFromMatrixColumn(t,1):(yt.setFromMatrixColumn(t,0),yt.crossVectors(this.object.up,yt)),yt.multiplyScalar(e),this._panOffset.add(yt)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const n=this.object.position;yt.copy(n).sub(this.target);let r=yt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),n=e-i.left,r=t-i.top,a=i.width,o=i.height;this._mouse.x=n/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Ht*this._rotateDelta.x/t.clientHeight),this._rotateUp(Ht*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Ht*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Ht*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Ht*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Ht*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),n=.5*(e.pageY+t.y);this._rotateStart.set(i,n)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),n=.5*(e.pageY+t.y);this._panStart.set(i,n)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,n=e.pageY-t.y,r=Math.sqrt(i*i+n*n);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),n=.5*(e.pageX+i.x),r=.5*(e.pageY+i.y);this._rotateEnd.set(n,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Ht*this._rotateDelta.x/t.clientHeight),this._rotateUp(Ht*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),n=.5*(e.pageY+t.y);this._panEnd.set(i,n)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,n=e.pageY-t.y,r=Math.sqrt(i*i+n*n);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Qe,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function uA(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s)))}function fA(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function pA(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent($d),this.state=it.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function mA(s){let e;switch(s.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Nn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=it.DOLLY;break;case Nn.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=it.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=it.ROTATE}break;case Nn.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=it.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=it.PAN}break;default:this.state=it.NONE}this.state!==it.NONE&&this.dispatchEvent(jo)}function gA(s){switch(this.state){case it.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case it.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case it.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function vA(s){this.enabled===!1||this.enableZoom===!1||this.state!==it.NONE||(s.preventDefault(),this.dispatchEvent(jo),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent($d))}function AA(s){this.enabled!==!1&&this._handleKeyDown(s)}function _A(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case Ln.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=it.TOUCH_ROTATE;break;case Ln.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=it.TOUCH_PAN;break;default:this.state=it.NONE}break;case 2:switch(this.touches.TWO){case Ln.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=it.TOUCH_DOLLY_PAN;break;case Ln.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=it.TOUCH_DOLLY_ROTATE;break;default:this.state=it.NONE}break;default:this.state=it.NONE}this.state!==it.NONE&&this.dispatchEvent(jo)}function SA(s){switch(this._trackPointer(s),this.state){case it.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case it.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case it.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case it.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=it.NONE}}function EA(s){this.enabled!==!1&&s.preventDefault()}function xA(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function wA(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class th extends sn{constructor(){super(...arguments);Se(this,"modelUrl","");Se(this,"materialUrl","");Se(this,"debugMode",!1);Se(this,"cameraPosition","3,3,3");Se(this,"cameraTarget","0,0,0");Se(this,"showTexture",!0);Se(this,"scene");Se(this,"camera");Se(this,"renderer");Se(this,"controls");Se(this,"animationId");Se(this,"container");Se(this,"currentModel");Se(this,"originalMaterials",new Map);Se(this,"resizeObserver");Se(this,"externalCanvas");Se(this,"animateLoop",()=>{!this.renderer||!this.scene||!this.camera||(this.animationId=requestAnimationFrame(this.animateLoop),this.controls&&this.controls.update(),this.renderer.render(this.scene,this.camera),this.updateDebugInfo())})}static get observedAttributes(){return["show","debug-mode","camera-position","camera-target","show-texture","material-url"]}attributeChangedCallback(t,i,n){t==="show"?this.isShow=n==="true":t==="debug-mode"?this.debugMode=n==="true"||n==="":t==="camera-position"?this.cameraPosition=n||"3,3,3":t==="camera-target"?this.cameraTarget=n||"0,0,0":t==="show-texture"?this.showTexture=n!=="false":t==="material-url"&&(this.materialUrl=n||""),t==="debug-mode"&&this.isShow&&this.render(),super.attributeChangedCallback(t,i,n)}async doOpen(t){this.modelUrl=t,this.showTexture=!0,await this.initializeViewer()}doClose(){this.cleanup(),this.modelUrl="",this.materialUrl=""}getViewerContent(){return`
      <div class="model-container">
        ${this.modelUrl?`
        ${this.isLoading?'<div class="loading">Loading...</div>':""}
        ${!this.isLoading&&this.debugMode?`
          <div class="debug-info" style="z-index: 1005;">
            Camera Position: ${this.getCameraDebugInfo()}<br>
            Camera Target: ${this.getTargetDebugInfo()}<br>
            Controls: Rotate (drag), Zoom (scroll), Pan (right-drag)
          </div>
        `:""}
        ${this.isLoading?"":`
          <button class="texture-toggle">
            Texture: ${this.showTexture?"ON":"OFF"}
          </button>
        `}
      `:'<div class="error">No model URL provided</div>'}
      </div>
    `}getCustomStyles(){return`
      .model-container {
        width: 100%;
        height: 100%;
        position: relative;
        background: transparent;
        z-index: 1;
      }
      
      .model-container canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
      }
      
      .loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #666;
        font-size: 1.2rem;
      }
      
      .error {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #e74c3c;
        text-align: center;
        padding: 20px;
      }
      
      canvas {
        display: block;
        width: 100%;
        height: 100%;
      }
      
      .debug-info {
        position: absolute;
        top: 10px;
        left: 10px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px;
        font-family: monospace;
        font-size: 12px;
        border-radius: 4px;
        pointer-events: none;
        z-index: 1010;
      }
      
      .texture-toggle {
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        border: 1px solid #666;
        padding: 8px 16px;
        cursor: pointer;
        border-radius: 4px;
        transition: background 0.3s;
        z-index: 1010;
        pointer-events: auto;
      }
      
      .texture-toggle:hover {
        background: rgba(0, 0, 0, 0.9);
      }
    `}onAfterRender(){const t=this.query(".texture-toggle");t&&t.addEventListener("click",()=>this.toggleTexture())}cleanup(){this.animationId&&(cancelAnimationFrame(this.animationId),this.animationId=void 0),this.renderer&&(this.renderer.dispose(),this.renderer.domElement.parentNode===document.body&&document.body.removeChild(this.renderer.domElement),this.renderer=void 0),this.controls&&(this.controls.dispose(),this.controls=void 0),this.scene&&(this.scene.traverse(t=>{var i,n;t instanceof Gt&&((i=t.geometry)==null||i.dispose(),Array.isArray(t.material)?t.material.forEach(r=>r.dispose()):(n=t.material)==null||n.dispose())}),this.scene.clear()),this.scene=void 0,this.camera=void 0,this.currentModel=void 0,this.originalMaterials.clear(),this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=void 0),this.container=void 0}storeOriginalMaterials(t){t.traverse(i=>{i instanceof Gt&&this.originalMaterials.set(i,i.material)})}toggleTexture(){this.showTexture=!this.showTexture,this.currentModel&&(this.currentModel.traverse(t=>{if(t instanceof Gt)if(this.showTexture){const i=this.originalMaterials.get(t);i&&(t.material=i)}else{const i=new Pe(13421772);t.material=new Vo({color:i})}}),this.render())}getCameraDebugInfo(){if(!this.camera)return"N/A";const t=this.camera.position;return`${t.x.toFixed(2)}, ${t.y.toFixed(2)}, ${t.z.toFixed(2)}`}getTargetDebugInfo(){if(!this.controls)return"N/A";const t=this.controls.target;return`${t.x.toFixed(2)}, ${t.y.toFixed(2)}, ${t.z.toFixed(2)}`}updateDebugInfo(){const t=this.query(".debug-info");t&&this.debugMode&&(t.innerHTML=`
        Camera Position: ${this.getCameraDebugInfo()}<br>
        Camera Target: ${this.getTargetDebugInfo()}<br>
        Controls: Rotate (drag), Zoom (scroll), Pan (right-drag)
      `)}async initializeViewer(){if(await new Promise(i=>setTimeout(i,50)),this.container=this.query(".model-container"),!this.container)return;const t=this.container.getBoundingClientRect();try{this.scene=new Np,this.scene.background=new Pe(3158064);const i=this.container.clientWidth||this.container.offsetWidth,n=this.container.clientHeight||this.container.offsetHeight;this.camera=new si(75,i/n,.1,1e3),this.renderer=new tA({antialias:!0,alpha:!0}),this.renderer.setSize(i,n),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.shadowMap.enabled=!0;const r=this.renderer.domElement;r.style.position="fixed",r.style.left=`${t.left}px`,r.style.top=`${t.top}px`,r.style.width=`${t.width}px`,r.style.height=`${t.height}px`,r.style.pointerEvents="auto",r.style.zIndex="1001",document.body.appendChild(r),this.externalCanvas=r,this.controls=new hA(this.camera,r),this.controls.enableDamping=!0,this.controls.dampingFactor=.05;const a=new Yp(4210752,2),o=new Xp(16777215,1);o.position.set(1,1,1),this.scene.add(a,o),await this.loadModel(),this.resizeObserver=new ResizeObserver(c=>{for(const l of c){const{width:d,height:h}=l.contentRect;d>0&&h>0&&this.handleResize()}}),this.resizeObserver.observe(this.container),this.animateLoop()}catch(i){throw i}}async loadModel(){const t=new oA;try{if(this.materialUrl){const h=new lA,u=this.materialUrl.substring(0,this.materialUrl.lastIndexOf("/")+1);h.setPath(u);const p=await new Promise((g,v)=>{const m=this.materialUrl.substring(this.materialUrl.lastIndexOf("/")+1);h.load(m,g,void 0,v)});p.preload(),t.setMaterials(p)}const i=this.modelUrl.substring(0,this.modelUrl.lastIndexOf("/")+1);t.setPath(i);const n=await new Promise((h,u)=>{const p=this.modelUrl.substring(this.modelUrl.lastIndexOf("/")+1);t.load(p,h,void 0,u)}),r=new Kn().setFromObject(n),a=new W;r.getSize(a);const o=Math.max(a.x,a.y,a.z);n.scale.multiplyScalar(3/o);const c=new W;if(r.getCenter(c),n.position.sub(c.multiplyScalar(n.scale.x)),!this.scene)return;this.scene.add(n),this.currentModel=n,this.storeOriginalMaterials(n);const l=this.cameraPosition.split(",").map(h=>parseFloat(h.trim())),d=this.cameraTarget.split(",").map(h=>parseFloat(h.trim()));l.length===3&&this.camera.position.set(l[0],l[1],l[2]),d.length===3&&(this.camera.lookAt(d[0],d[1],d[2]),this.controls.target.set(d[0],d[1],d[2])),this.controls.update(),this.renderer&&this.scene&&this.camera&&this.renderer.render(this.scene,this.camera)}catch(i){throw i}}handleResize(){if(!this.container||!this.camera||!this.renderer)return;const t=this.container.getBoundingClientRect(),i=t.width,n=t.height;if(i>0&&n>0){this.camera.aspect=i/n,this.camera.updateProjectionMatrix(),this.renderer.setSize(i,n);const r=this.renderer.domElement;r.style.left=`${t.left}px`,r.style.top=`${t.top}px`,r.style.width=`${t.width}px`,r.style.height=`${t.height}px`}}}customElements.get("cc-viewer-3dmodel")||customElements.define("cc-viewer-3dmodel",th);class ih extends sn{constructor(){super(...arguments);Se(this,"splatUrl","");Se(this,"debugMode",!1);Se(this,"cameraPosition","3,3,3");Se(this,"_cameraTarget","0,0,0");Se(this,"scene");Se(this,"camera");Se(this,"renderer");Se(this,"controls");Se(this,"animationId");Se(this,"canvas");Se(this,"swiper")}static get observedAttributes(){return["show","debug-mode","camera-position","camera-target"]}attributeChangedCallback(t,i,n){t==="show"?this.isShow=n==="true":t==="debug-mode"?this.debugMode=n==="true":t==="camera-position"?this.cameraPosition=n||"3,3,3":t==="camera-target"&&(this._cameraTarget=n||"0,0,0"),super.attributeChangedCallback(t,i,n)}async doOpen(t){this.splatUrl=t,await this.initializeViewer()}doClose(){this.cleanup()}getViewerContent(){return""}shouldUseCustomRender(){return!0}customRender(){const t=this.css`
      :host {
        --cc-viewer-z-index-each: 1000;
      }
      
      .backdrop {
        justify-content: center;
        align-items: center;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        z-index: 1000;
      }
      
      .viewer {
        position: absolute;
        width: 90%;
        height: 85%;
        inset: 0px;
        margin: auto;
        align-self: center;
        background-color: #000;
      }
      
      .gaussian-container {
        width: 100%;
        height: 100%;
        position: relative;
        background: #000;
      }
      
      .gaussian-container canvas {
        width: 100% !important;
        height: 100% !important;
        display: block;
      }
      
      .loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        font-size: 1.2rem;
      }
      
      .error {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #e74c3c;
        text-align: center;
        padding: 20px;
      }
      
      canvas {
        display: block;
        width: 100%;
        height: 100%;
        touch-action: none;
      }
      
      .debug-info {
        position: absolute;
        top: 10px;
        left: 10px;
        background: rgba(0, 0, 0, 0.85);
        color: #00ff00;
        padding: 12px;
        font-family: 'Courier New', monospace;
        font-size: 11px;
        line-height: 1.4;
        border-radius: 6px;
        border: 1px solid rgba(0, 255, 0, 0.3);
        pointer-events: none;
        white-space: pre-line;
        min-width: 200px;
        z-index: 1003;
      }
      
      ${this.getNavigationStyles()}
    `,i=`
        <canvas style="display: none;"></canvas>
        ${this.isLoading?'<div class="loading">Loading...</div>':""}
        ${!this.isLoading&&this.debugMode?`
          <div class="debug-info">
📍 Camera Position:
${this.getCameraDebugInfo()}

🎯 Camera Target:
${this.getTargetDebugInfo()}

🎮 Controls:
• Rotate: Left-drag
• Zoom: Scroll wheel
• Pan: Right-drag or Shift+Left-drag

📊 Status: ${this.scene?"Splat loaded":"Loading..."}
          </div>
        `:""}
      `,n=`
      ${t}
      <div class="backdrop" style="${this.isShow?"visibility: visible":"visibility: hidden"}">
        <div class="viewer">
          <div class="gaussian-container">
            ${i}
          </div>
        </div>
        ${this.getNavigationButtons()}
      </div>
    `;this.updateShadowRoot(n),setTimeout(()=>{this.addNavigationListeners()},0)}cleanup(){this.animationId&&(cancelAnimationFrame(this.animationId),this.animationId=void 0),this.renderer&&typeof this.renderer.dispose=="function"&&this.renderer.dispose(),document.querySelectorAll('canvas[id^="gaussian-canvas-"]').forEach(i=>{i.parentNode===document.body&&document.body.removeChild(i)}),this.scene=void 0,this.camera=void 0,this.renderer=void 0,this.controls=void 0,this.canvas=void 0}getCameraDebugInfo(){if(!this.camera||!this.camera.position)return"Position: unavailable";const t=this.camera.position;try{return`X: ${t.x.toFixed(3)}, Y: ${t.y.toFixed(3)}, Z: ${t.z.toFixed(3)}`}catch{return`Position: ${JSON.stringify(t)}`}}getTargetDebugInfo(){if(!this.controls)return"Target: controls unavailable";try{return"Controls active (no target property in gsplat.js)"}catch{return`Target: ${JSON.stringify(this.controls)}`}}updateDebugInfo(){const t=this.query(".debug-info");t&&(t.innerHTML=`
📍 Camera Position:
${this.getCameraDebugInfo()}

🎯 Camera Target:
${this.getTargetDebugInfo()}

🎮 Controls:
• Rotate: Left-drag
• Zoom: Scroll wheel
• Pan: Right-drag or Shift+Left-drag

📊 Status: ${this.scene?"Splat loaded":"Loading..."}
      `)}async initializeViewer(){const t=`gaussian-canvas-${Date.now()}`,i=this.query(".viewer");if(!i)return;const n=i.getBoundingClientRect();let r=document.getElementById(t);r||(r=document.createElement("canvas"),r.id=t,r.style.position="fixed",r.style.top=`${n.top}px`,r.style.left=`${n.left}px`,r.style.width=`${n.width}px`,r.style.height=`${n.height}px`,r.style.zIndex="1001",r.style.pointerEvents="auto",r.style.display="block",r.style.background="transparent",document.body.appendChild(r)),r.style.top=`${n.top}px`,r.style.left=`${n.left}px`,r.style.width=`${n.width}px`,r.style.height=`${n.height}px`,this.canvas=r;try{const a=this.query(".gaussian-container");if(!a)return;const o=await Promise.resolve().then(()=>jA);this.scene=new o.Scene,this.camera=new o.Camera,this.renderer=new o.WebGLRenderer(this.canvas),this.controls=new o.OrbitControls(this.camera,this.canvas),await o.Loader.LoadAsync(this.splatUrl,this.scene);let c=0;const l=()=>{if(!(!this.renderer||!this.scene||!this.camera)){this.animationId=requestAnimationFrame(l),this.controls&&this.controls.update();try{this.renderer.render(this.scene,this.camera)}catch{}c===0&&this.canvas&&c++,this.debugMode&&this.updateDebugInfo()}};l(),new ResizeObserver(()=>{this.handleResize()}).observe(a)}catch(a){throw a}}handleResize(){const t=this.query(".gaussian-container");if(!t||!this.renderer||!this.camera)return;const i=t.clientWidth,n=t.clientHeight;typeof this.renderer.setSize=="function"&&this.renderer.setSize(i,n),typeof this.camera.aspect<"u"&&(this.camera.aspect=i/n,typeof this.camera.updateProjectionMatrix=="function"&&this.camera.updateProjectionMatrix())}}customElements.get("cc-viewer-gaussian")||customElements.define("cc-viewer-gaussian",ih);const Gr={image:"cc-viewer-image",panorama:"cc-viewer-panorama",youtube:"cc-viewer-youtube",video:"cc-viewer-video","3dmodel":"cc-viewer-3dmodel",gaussian:"cc-viewer-gaussian"};class nh extends xi{constructor(){super(...arguments);Se(this,"swiper");Se(this,"currentSlideIndex",0);Se(this,"currentType","");Se(this,"boundHandleNavigatePrev");Se(this,"boundHandleNavigateNext")}open(t,i,n){const r=this.currentType;if(this.currentType=i,r&&r!==i){const a=Gr[r],o=this.query(a);o&&o.close&&o.close()}r!==i&&this.render(),setTimeout(()=>{const a=Gr[i],o=this.query(a);o&&n&&Object.entries(n).forEach(([c,l])=>{const d=c.replace(/([A-Z])/g,"-$1").toLowerCase();typeof l=="boolean"?l?o.setAttribute(d,""):o.removeAttribute(d):o.setAttribute(d,String(l))}),this.updateNavigationButtons(),o&&o.open(t)},0)}firstUpdated(){this.dispatch("load"),this.boundHandleNavigatePrev&&this.removeEventListener("navigate-prev",this.boundHandleNavigatePrev),this.boundHandleNavigateNext&&this.removeEventListener("navigate-next",this.boundHandleNavigateNext),this.boundHandleNavigatePrev=this.handleNavigatePrev.bind(this),this.boundHandleNavigateNext=this.handleNavigateNext.bind(this),this.addEventListener("navigate-prev",this.boundHandleNavigatePrev),this.addEventListener("navigate-next",this.boundHandleNavigateNext)}handleNavigatePrev(t){var r,a;if(!this.swiper)return;const i=this.swiper.slides.length;if(i<=1)return;const n=((a=(r=this.swiper.slider)==null?void 0:r.params)==null?void 0:a.loop)===!0;if(this.currentSlideIndex<=0)if(n)this.currentSlideIndex=i-1;else return;else this.currentSlideIndex--;this.navigateToSlide(this.currentSlideIndex)}handleNavigateNext(t){var r,a;if(!this.swiper)return;const i=this.swiper.slides.length;if(i<=1)return;const n=((a=(r=this.swiper.slider)==null?void 0:r.params)==null?void 0:a.loop)===!0;if(this.currentSlideIndex>=i-1)if(n)this.currentSlideIndex=0;else return;else this.currentSlideIndex++;this.navigateToSlide(this.currentSlideIndex)}navigateToSlide(t){if(!this.swiper||!this.swiper.slides[t])return;const i=this.swiper.slides[t],n=i.getAttribute("image-url")||"",r=i.getAttribute("image-type")||"image",a=Gr[this.currentType],o=this.query(a);o&&o.close();const c={};i.hasAttribute("fit-to-container")&&(c.fitToContainer=!0),i.hasAttribute("debug-mode")&&(c.debugMode=!0),i.hasAttribute("camera-position")&&(c.cameraPosition=i.getAttribute("camera-position")),i.hasAttribute("camera-target")&&(c.cameraTarget=i.getAttribute("camera-target")),i.hasAttribute("show-texture")&&(c.showTexture=i.getAttribute("show-texture")==="true"),i.hasAttribute("material-url")&&(c.materialUrl=i.getAttribute("material-url")),this.currentSlideIndex=t,this.open(n,r,c),this.swiper.slider&&this.swiper.slider.slideTo(t)}updateNavigationButtons(){var a,o;if(!this.swiper)return;const t=this.swiper.slides.length,i=((o=(a=this.swiper.slider)==null?void 0:a.params)==null?void 0:o.loop)===!0;if(t<=1){this.setNavigationVisibility(!1,!1);return}if(i){this.setNavigationVisibility(!0,!0);return}const n=this.currentSlideIndex>0,r=this.currentSlideIndex<t-1;this.setNavigationVisibility(n,r)}setNavigationVisibility(t,i){[this.query("cc-viewer-image"),this.query("cc-viewer-youtube"),this.query("cc-viewer-panorama"),this.query("cc-viewer-video"),this.query("cc-viewer-3dmodel"),this.query("cc-viewer-gaussian")].forEach(r=>{if(r){const a=r;a.showPrevButton=t,a.showNextButton=i}})}setSwiper(t){this.swiper=t}setCurrentSlideIndex(t){this.currentSlideIndex=t}render(){const t=this.css`
      :host {
        --cc-viewer-z-index: 1000;
      }
      
      cc-viewer-panorama, cc-viewer-image, cc-viewer-youtube, cc-viewer-video,
      cc-viewer-3dmodel, cc-viewer-gaussian {
        --cc-viewer-z-index-each: var(--cc-viewer-z-index);
      }
    `;let i="";if(this.currentType){const r=Gr[this.currentType];r&&(i=`<${r}></${r}>`)}const n=`
      ${t}
      ${i}
    `;this.updateShadowRoot(n)}}customElements.get("cc-viewer")||customElements.define("cc-viewer",nh);class Ae{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}equals(e){return!(this.x!==e.x||this.y!==e.y||this.z!==e.z)}add(e){return typeof e=="number"?new Ae(this.x+e,this.y+e,this.z+e):new Ae(this.x+e.x,this.y+e.y,this.z+e.z)}subtract(e){return typeof e=="number"?new Ae(this.x-e,this.y-e,this.z-e):new Ae(this.x-e.x,this.y-e.y,this.z-e.z)}multiply(e){return typeof e=="number"?new Ae(this.x*e,this.y*e,this.z*e):e instanceof Ae?new Ae(this.x*e.x,this.y*e.y,this.z*e.z):new Ae(this.x*e.buffer[0]+this.y*e.buffer[4]+this.z*e.buffer[8]+e.buffer[12],this.x*e.buffer[1]+this.y*e.buffer[5]+this.z*e.buffer[9]+e.buffer[13],this.x*e.buffer[2]+this.y*e.buffer[6]+this.z*e.buffer[10]+e.buffer[14])}divide(e){return typeof e=="number"?new Ae(this.x/e,this.y/e,this.z/e):new Ae(this.x/e.x,this.y/e.y,this.z/e.z)}cross(e){const t=this.y*e.z-this.z*e.y,i=this.z*e.x-this.x*e.z,n=this.x*e.y-this.y*e.x;return new Ae(t,i,n)}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lerp(e,t){return new Ae(this.x+(e.x-this.x)*t,this.y+(e.y-this.y)*t,this.z+(e.z-this.z)*t)}min(e){return new Ae(Math.min(this.x,e.x),Math.min(this.y,e.y),Math.min(this.z,e.z))}max(e){return new Ae(Math.max(this.x,e.x),Math.max(this.y,e.y),Math.max(this.z,e.z))}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error(`Invalid component index: ${e}`)}}minComponent(){return this.x<this.y&&this.x<this.z?0:this.y<this.z?1:2}maxComponent(){return this.x>this.y&&this.x>this.z?0:this.y>this.z?1:2}magnitude(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}distanceTo(e){return Math.sqrt((this.x-e.x)**2+(this.y-e.y)**2+(this.z-e.z)**2)}normalize(){const e=this.magnitude();return new Ae(this.x/e,this.y/e,this.z/e)}flat(){return[this.x,this.y,this.z]}clone(){return new Ae(this.x,this.y,this.z)}toString(){return`[${this.flat().join(", ")}]`}static One(e=1){return new Ae(e,e,e)}}class ct{constructor(e=0,t=0,i=0,n=1){this.x=e,this.y=t,this.z=i,this.w=n}equals(e){return!(this.x!==e.x||this.y!==e.y||this.z!==e.z||this.w!==e.w)}normalize(){const e=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);return new ct(this.x/e,this.y/e,this.z/e,this.w/e)}multiply(e){const t=this.w,i=this.x,n=this.y,r=this.z,a=e.w,o=e.x,c=e.y,l=e.z;return new ct(t*o+i*a+n*l-r*c,t*c-i*l+n*a+r*o,t*l+i*c-n*o+r*a,t*a-i*o-n*c-r*l)}inverse(){const e=this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w;return new ct(-this.x/e,-this.y/e,-this.z/e,this.w/e)}apply(e){const t=new ct(e.x,e.y,e.z,0),i=new ct(-this.x,-this.y,-this.z,this.w),n=this.multiply(t).multiply(i);return new Ae(n.x,n.y,n.z)}flat(){return[this.x,this.y,this.z,this.w]}clone(){return new ct(this.x,this.y,this.z,this.w)}static FromEuler(e){const t=e.x/2,i=e.y/2,n=e.z/2,r=Math.cos(i),a=Math.sin(i),o=Math.cos(t),c=Math.sin(t),l=Math.cos(n),d=Math.sin(n);return new ct(r*c*l+a*o*d,a*o*l-r*c*d,r*o*d-a*c*l,r*o*l+a*c*d)}toEuler(){const e=2*(this.w*this.x+this.y*this.z),t=1-2*(this.x*this.x+this.y*this.y),i=Math.atan2(e,t);let n;const r=2*(this.w*this.y-this.z*this.x);Math.abs(r)>=1?n=Math.sign(r)*Math.PI/2:n=Math.asin(r);const a=2*(this.w*this.z+this.x*this.y),o=1-2*(this.y*this.y+this.z*this.z),c=Math.atan2(a,o);return new Ae(i,n,c)}static FromMatrix3(e){const t=e.buffer,i=t[0]+t[4]+t[8];let n,r,a,o;if(i>0){const c=.5/Math.sqrt(i+1);o=.25/c,n=(t[7]-t[5])*c,r=(t[2]-t[6])*c,a=(t[3]-t[1])*c}else if(t[0]>t[4]&&t[0]>t[8]){const c=2*Math.sqrt(1+t[0]-t[4]-t[8]);o=(t[7]-t[5])/c,n=.25*c,r=(t[1]+t[3])/c,a=(t[2]+t[6])/c}else if(t[4]>t[8]){const c=2*Math.sqrt(1+t[4]-t[0]-t[8]);o=(t[2]-t[6])/c,n=(t[1]+t[3])/c,r=.25*c,a=(t[5]+t[7])/c}else{const c=2*Math.sqrt(1+t[8]-t[0]-t[4]);o=(t[3]-t[1])/c,n=(t[2]+t[6])/c,r=(t[5]+t[7])/c,a=.25*c}return new ct(n,r,a,o)}static FromAxisAngle(e,t){const i=t/2,n=Math.sin(i),r=Math.cos(i);return new ct(e.x*n,e.y*n,e.z*n,r)}static LookRotation(e){const t=new Ae(0,0,1),i=t.dot(e);if(Math.abs(i- -1)<1e-6)return new ct(0,1,0,Math.PI);if(Math.abs(i-1)<1e-6)return new ct;const n=Math.acos(i),r=t.cross(e).normalize();return ct.FromAxisAngle(r,n)}toString(){return`[${this.flat().join(", ")}]`}}class sh{constructor(){const e=new Map;this.addEventListener=(t,i)=>{e.has(t)||e.set(t,new Set),e.get(t).add(i)},this.removeEventListener=(t,i)=>{e.has(t)&&e.get(t).delete(i)},this.hasEventListener=(t,i)=>e.has(t)?e.get(t).has(i):!1,this.dispatchEvent=t=>{if(e.has(t.type))for(const i of e.get(t.type))i(t)}}}class Pt{constructor(e=1,t=0,i=0,n=0,r=0,a=1,o=0,c=0,l=0,d=0,h=1,u=0,p=0,g=0,v=0,m=1){this.buffer=[e,t,i,n,r,a,o,c,l,d,h,u,p,g,v,m]}equals(e){if(this.buffer.length!==e.buffer.length)return!1;if(this.buffer===e.buffer)return!0;for(let t=0;t<this.buffer.length;t++)if(this.buffer[t]!==e.buffer[t])return!1;return!0}multiply(e){const t=this.buffer,i=e.buffer;return new Pt(i[0]*t[0]+i[1]*t[4]+i[2]*t[8]+i[3]*t[12],i[0]*t[1]+i[1]*t[5]+i[2]*t[9]+i[3]*t[13],i[0]*t[2]+i[1]*t[6]+i[2]*t[10]+i[3]*t[14],i[0]*t[3]+i[1]*t[7]+i[2]*t[11]+i[3]*t[15],i[4]*t[0]+i[5]*t[4]+i[6]*t[8]+i[7]*t[12],i[4]*t[1]+i[5]*t[5]+i[6]*t[9]+i[7]*t[13],i[4]*t[2]+i[5]*t[6]+i[6]*t[10]+i[7]*t[14],i[4]*t[3]+i[5]*t[7]+i[6]*t[11]+i[7]*t[15],i[8]*t[0]+i[9]*t[4]+i[10]*t[8]+i[11]*t[12],i[8]*t[1]+i[9]*t[5]+i[10]*t[9]+i[11]*t[13],i[8]*t[2]+i[9]*t[6]+i[10]*t[10]+i[11]*t[14],i[8]*t[3]+i[9]*t[7]+i[10]*t[11]+i[11]*t[15],i[12]*t[0]+i[13]*t[4]+i[14]*t[8]+i[15]*t[12],i[12]*t[1]+i[13]*t[5]+i[14]*t[9]+i[15]*t[13],i[12]*t[2]+i[13]*t[6]+i[14]*t[10]+i[15]*t[14],i[12]*t[3]+i[13]*t[7]+i[14]*t[11]+i[15]*t[15])}clone(){const e=this.buffer;return new Pt(e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8],e[9],e[10],e[11],e[12],e[13],e[14],e[15])}determinant(){const e=this.buffer;return e[12]*e[9]*e[6]*e[3]-e[8]*e[13]*e[6]*e[3]-e[12]*e[5]*e[10]*e[3]+e[4]*e[13]*e[10]*e[3]+e[8]*e[5]*e[14]*e[3]-e[4]*e[9]*e[14]*e[3]-e[12]*e[9]*e[2]*e[7]+e[8]*e[13]*e[2]*e[7]+e[12]*e[1]*e[10]*e[7]-e[0]*e[13]*e[10]*e[7]-e[8]*e[1]*e[14]*e[7]+e[0]*e[9]*e[14]*e[7]+e[12]*e[5]*e[2]*e[11]-e[4]*e[13]*e[2]*e[11]-e[12]*e[1]*e[6]*e[11]+e[0]*e[13]*e[6]*e[11]+e[4]*e[1]*e[14]*e[11]-e[0]*e[5]*e[14]*e[11]-e[8]*e[5]*e[2]*e[15]+e[4]*e[9]*e[2]*e[15]+e[8]*e[1]*e[6]*e[15]-e[0]*e[9]*e[6]*e[15]-e[4]*e[1]*e[10]*e[15]+e[0]*e[5]*e[10]*e[15]}invert(){const e=this.buffer,t=this.determinant();if(t===0)throw new Error("Matrix is not invertible.");const i=1/t;return new Pt(i*(e[5]*e[10]*e[15]-e[5]*e[11]*e[14]-e[9]*e[6]*e[15]+e[9]*e[7]*e[14]+e[13]*e[6]*e[11]-e[13]*e[7]*e[10]),i*(-e[1]*e[10]*e[15]+e[1]*e[11]*e[14]+e[9]*e[2]*e[15]-e[9]*e[3]*e[14]-e[13]*e[2]*e[11]+e[13]*e[3]*e[10]),i*(e[1]*e[6]*e[15]-e[1]*e[7]*e[14]-e[5]*e[2]*e[15]+e[5]*e[3]*e[14]+e[13]*e[2]*e[7]-e[13]*e[3]*e[6]),i*(-e[1]*e[6]*e[11]+e[1]*e[7]*e[10]+e[5]*e[2]*e[11]-e[5]*e[3]*e[10]-e[9]*e[2]*e[7]+e[9]*e[3]*e[6]),i*(-e[4]*e[10]*e[15]+e[4]*e[11]*e[14]+e[8]*e[6]*e[15]-e[8]*e[7]*e[14]-e[12]*e[6]*e[11]+e[12]*e[7]*e[10]),i*(e[0]*e[10]*e[15]-e[0]*e[11]*e[14]-e[8]*e[2]*e[15]+e[8]*e[3]*e[14]+e[12]*e[2]*e[11]-e[12]*e[3]*e[10]),i*(-e[0]*e[6]*e[15]+e[0]*e[7]*e[14]+e[4]*e[2]*e[15]-e[4]*e[3]*e[14]-e[12]*e[2]*e[7]+e[12]*e[3]*e[6]),i*(e[0]*e[6]*e[11]-e[0]*e[7]*e[10]-e[4]*e[2]*e[11]+e[4]*e[3]*e[10]+e[8]*e[2]*e[7]-e[8]*e[3]*e[6]),i*(e[4]*e[9]*e[15]-e[4]*e[11]*e[13]-e[8]*e[5]*e[15]+e[8]*e[7]*e[13]+e[12]*e[5]*e[11]-e[12]*e[7]*e[9]),i*(-e[0]*e[9]*e[15]+e[0]*e[11]*e[13]+e[8]*e[1]*e[15]-e[8]*e[3]*e[13]-e[12]*e[1]*e[11]+e[12]*e[3]*e[9]),i*(e[0]*e[5]*e[15]-e[0]*e[7]*e[13]-e[4]*e[1]*e[15]+e[4]*e[3]*e[13]+e[12]*e[1]*e[7]-e[12]*e[3]*e[5]),i*(-e[0]*e[5]*e[11]+e[0]*e[7]*e[9]+e[4]*e[1]*e[11]-e[4]*e[3]*e[9]-e[8]*e[1]*e[7]+e[8]*e[3]*e[5]),i*(-e[4]*e[9]*e[14]+e[4]*e[10]*e[13]+e[8]*e[5]*e[14]-e[8]*e[6]*e[13]-e[12]*e[5]*e[10]+e[12]*e[6]*e[9]),i*(e[0]*e[9]*e[14]-e[0]*e[10]*e[13]-e[8]*e[1]*e[14]+e[8]*e[2]*e[13]+e[12]*e[1]*e[10]-e[12]*e[2]*e[9]),i*(-e[0]*e[5]*e[14]+e[0]*e[6]*e[13]+e[4]*e[1]*e[14]-e[4]*e[2]*e[13]-e[12]*e[1]*e[6]+e[12]*e[2]*e[5]),i*(e[0]*e[5]*e[10]-e[0]*e[6]*e[9]-e[4]*e[1]*e[10]+e[4]*e[2]*e[9]+e[8]*e[1]*e[6]-e[8]*e[2]*e[5]))}static Compose(e,t,i){const n=t.x,r=t.y,a=t.z,o=t.w,c=n+n,l=r+r,d=a+a,h=n*c,u=n*l,p=n*d,g=r*l,v=r*d,m=a*d,f=o*c,A=o*l,_=o*d,S=i.x,C=i.y,y=i.z;return new Pt((1-(g+m))*S,(u+_)*S,(p-A)*S,0,(u-_)*C,(1-(h+m))*C,(v+f)*C,0,(p+A)*y,(v-f)*y,(1-(h+g))*y,0,e.x,e.y,e.z,1)}toString(){return`[${this.buffer.join(", ")}]`}}class bA extends Event{constructor(e){super("objectAdded"),this.object=e}}class yA extends Event{constructor(e){super("objectRemoved"),this.object=e}}class CA extends Event{constructor(e){super("objectChanged"),this.object=e}}class Hr extends sh{constructor(){super(),this.positionChanged=!1,this.rotationChanged=!1,this.scaleChanged=!1,this._position=new Ae,this._rotation=new ct,this._scale=new Ae(1,1,1),this._transform=new Pt,this._changeEvent=new CA(this),this.update=()=>{},this.applyPosition=()=>{this.position=new Ae},this.applyRotation=()=>{this.rotation=new ct},this.applyScale=()=>{this.scale=new Ae(1,1,1)},this.raiseChangeEvent=()=>{this.dispatchEvent(this._changeEvent)}}_updateMatrix(){this._transform=Pt.Compose(this._position,this._rotation,this._scale)}get position(){return this._position}set position(e){this._position.equals(e)||(this._position=e,this.positionChanged=!0,this._updateMatrix(),this.dispatchEvent(this._changeEvent))}get rotation(){return this._rotation}set rotation(e){this._rotation.equals(e)||(this._rotation=e,this.rotationChanged=!0,this._updateMatrix(),this.dispatchEvent(this._changeEvent))}get scale(){return this._scale}set scale(e){this._scale.equals(e)||(this._scale=e,this.scaleChanged=!0,this._updateMatrix(),this.dispatchEvent(this._changeEvent))}get forward(){let e=new Ae(0,0,1);return e=this.rotation.apply(e),e}get transform(){return this._transform}}class Vt{constructor(e=1,t=0,i=0,n=0,r=1,a=0,o=0,c=0,l=1){this.buffer=[e,t,i,n,r,a,o,c,l]}equals(e){if(this.buffer.length!==e.buffer.length)return!1;if(this.buffer===e.buffer)return!0;for(let t=0;t<this.buffer.length;t++)if(this.buffer[t]!==e.buffer[t])return!1;return!0}multiply(e){const t=this.buffer,i=e.buffer;return new Vt(i[0]*t[0]+i[3]*t[1]+i[6]*t[2],i[1]*t[0]+i[4]*t[1]+i[7]*t[2],i[2]*t[0]+i[5]*t[1]+i[8]*t[2],i[0]*t[3]+i[3]*t[4]+i[6]*t[5],i[1]*t[3]+i[4]*t[4]+i[7]*t[5],i[2]*t[3]+i[5]*t[4]+i[8]*t[5],i[0]*t[6]+i[3]*t[7]+i[6]*t[8],i[1]*t[6]+i[4]*t[7]+i[7]*t[8],i[2]*t[6]+i[5]*t[7]+i[8]*t[8])}clone(){const e=this.buffer;return new Vt(e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8])}static Eye(e=1){return new Vt(e,0,0,0,e,0,0,0,e)}static Diagonal(e){return new Vt(e.x,0,0,0,e.y,0,0,0,e.z)}static RotationFromQuaternion(e){return new Vt(1-2*e.y*e.y-2*e.z*e.z,2*e.x*e.y-2*e.z*e.w,2*e.x*e.z+2*e.y*e.w,2*e.x*e.y+2*e.z*e.w,1-2*e.x*e.x-2*e.z*e.z,2*e.y*e.z-2*e.x*e.w,2*e.x*e.z-2*e.y*e.w,2*e.y*e.z+2*e.x*e.w,1-2*e.x*e.x-2*e.y*e.y)}static RotationFromEuler(e){const t=Math.cos(e.x),i=Math.sin(e.x),n=Math.cos(e.y),r=Math.sin(e.y),a=Math.cos(e.z),o=Math.sin(e.z),c=[n*a+r*i*o,-n*o+r*i*a,r*t,t*o,t*a,-i,-r*a+n*i*o,r*o+n*i*a,n*t];return new Vt(...c)}toString(){return`[${this.buffer.join(", ")}]`}}const wn=class wn{constructor(e=0,t=null,i=null,n=null,r=null){this.changed=!1,this.detached=!1,this._vertexCount=e,this._positions=t||new Float32Array(0),this._rotations=i||new Float32Array(0),this._scales=n||new Float32Array(0),this._colors=r||new Uint8Array(0),this._selection=new Uint8Array(this.vertexCount),this.translate=a=>{for(let o=0;o<this.vertexCount;o++)this.positions[3*o+0]+=a.x,this.positions[3*o+1]+=a.y,this.positions[3*o+2]+=a.z;this.changed=!0},this.rotate=a=>{const o=Vt.RotationFromQuaternion(a).buffer;for(let c=0;c<this.vertexCount;c++){const l=this.positions[3*c+0],d=this.positions[3*c+1],h=this.positions[3*c+2];this.positions[3*c+0]=o[0]*l+o[1]*d+o[2]*h,this.positions[3*c+1]=o[3]*l+o[4]*d+o[5]*h,this.positions[3*c+2]=o[6]*l+o[7]*d+o[8]*h;const u=new ct(this.rotations[4*c+1],this.rotations[4*c+2],this.rotations[4*c+3],this.rotations[4*c+0]),p=a.multiply(u);this.rotations[4*c+1]=p.x,this.rotations[4*c+2]=p.y,this.rotations[4*c+3]=p.z,this.rotations[4*c+0]=p.w}this.changed=!0},this.scale=a=>{for(let o=0;o<this.vertexCount;o++)this.positions[3*o+0]*=a.x,this.positions[3*o+1]*=a.y,this.positions[3*o+2]*=a.z,this.scales[3*o+0]*=a.x,this.scales[3*o+1]*=a.y,this.scales[3*o+2]*=a.z;this.changed=!0},this.serialize=()=>{const a=new Uint8Array(this.vertexCount*wn.RowLength),o=new Float32Array(a.buffer),c=new Uint8Array(a.buffer);for(let l=0;l<this.vertexCount;l++)o[8*l+0]=this.positions[3*l+0],o[8*l+1]=this.positions[3*l+1],o[8*l+2]=this.positions[3*l+2],c[32*l+24+0]=this.colors[4*l+0],c[32*l+24+1]=this.colors[4*l+1],c[32*l+24+2]=this.colors[4*l+2],c[32*l+24+3]=this.colors[4*l+3],o[8*l+3+0]=this.scales[3*l+0],o[8*l+3+1]=this.scales[3*l+1],o[8*l+3+2]=this.scales[3*l+2],c[32*l+28+0]=this.rotations[4*l+0]*128+128&255,c[32*l+28+1]=this.rotations[4*l+1]*128+128&255,c[32*l+28+2]=this.rotations[4*l+2]*128+128&255,c[32*l+28+3]=this.rotations[4*l+3]*128+128&255;return a},this.reattach=(a,o,c,l,d)=>{console.assert(a.byteLength===this.vertexCount*3*4,`Expected ${this.vertexCount*3*4} bytes, got ${a.byteLength} bytes`),this._positions=new Float32Array(a),this._rotations=new Float32Array(o),this._scales=new Float32Array(c),this._colors=new Uint8Array(l),this._selection=new Uint8Array(d),this.detached=!1}}static Deserialize(e){const t=e.length/wn.RowLength,i=new Float32Array(3*t),n=new Float32Array(4*t),r=new Float32Array(3*t),a=new Uint8Array(4*t),o=new Float32Array(e.buffer),c=new Uint8Array(e.buffer);for(let l=0;l<t;l++)i[3*l+0]=o[8*l+0],i[3*l+1]=o[8*l+1],i[3*l+2]=o[8*l+2],n[4*l+0]=(c[32*l+28+0]-128)/128,n[4*l+1]=(c[32*l+28+1]-128)/128,n[4*l+2]=(c[32*l+28+2]-128)/128,n[4*l+3]=(c[32*l+28+3]-128)/128,r[3*l+0]=o[8*l+3+0],r[3*l+1]=o[8*l+3+1],r[3*l+2]=o[8*l+3+2],a[4*l+0]=c[32*l+24+0],a[4*l+1]=c[32*l+24+1],a[4*l+2]=c[32*l+24+2],a[4*l+3]=c[32*l+24+3];return new wn(t,i,n,r,a)}get vertexCount(){return this._vertexCount}get positions(){return this._positions}get rotations(){return this._rotations}get scales(){return this._scales}get colors(){return this._colors}get selection(){return this._selection}clone(){return new wn(this.vertexCount,new Float32Array(this.positions),new Float32Array(this.rotations),new Float32Array(this.scales),new Uint8Array(this.colors))}};wn.RowLength=32;let ai=wn;const Xr=class Xr{constructor(e,t,i,n,r){this._vertexCount=e,this._positions=t,this._data=i,this._width=n,this._height=r,this.serialize=()=>new Uint8Array(this._data.buffer)}static Deserialize(e,t,i){const n=new Uint32Array(e.buffer),r=new Float32Array(e.buffer),a=Math.floor(r.byteLength/this.RowLength),o=new Float32Array(a*3);for(let c=0;c<a;c++)o[3*c+0]=r[16*c+0],o[3*c+1]=r[16*c+1],o[3*c+2]=r[16*c+2],o[3*c+0]=r[16*c+3];return new Xr(a,o,n,t,i)}get vertexCount(){return this._vertexCount}get positions(){return this._positions}get data(){return this._data}get width(){return this._width}get height(){return this._height}};Xr.RowLength=64;let Jr=Xr;const rl=class rl{static SplatToPLY(e,t){let i=`ply
format binary_little_endian 1.0
`;i+=`element vertex ${t}
`;const n=["x","y","z","nx","ny","nz","f_dc_0","f_dc_1","f_dc_2"];for(let m=0;m<45;m++)n.push(`f_rest_${m}`);n.push("opacity"),n.push("scale_0"),n.push("scale_1"),n.push("scale_2"),n.push("rot_0"),n.push("rot_1"),n.push("rot_2"),n.push("rot_3");for(const m of n)i+=`property float ${m}
`;i+=`end_header
`;const r=new TextEncoder().encode(i),a=248,o=t*a,c=new DataView(new ArrayBuffer(r.length+o));new Uint8Array(c.buffer).set(r,0);const l=new Float32Array(e),d=new Uint8Array(e),h=r.length,u=24,p=u+12+180,g=p+4,v=g+12;for(let m=0;m<t;m++){const f=l[8*m+0],A=l[8*m+1],_=l[8*m+2],S=(d[32*m+24+0]/255-.5)/this.SH_C0,C=(d[32*m+24+1]/255-.5)/this.SH_C0,y=(d[32*m+24+2]/255-.5)/this.SH_C0,U=d[32*m+24+3]/255,I=Math.log(U/(1-U)),x=Math.log(l[8*m+3+0]),E=Math.log(l[8*m+3+1]),M=Math.log(l[8*m+3+2]);let R=new ct((d[32*m+28+1]-128)/128,(d[32*m+28+2]-128)/128,(d[32*m+28+3]-128)/128,(d[32*m+28+0]-128)/128);R=R.normalize();const F=R.w,B=R.x,z=R.y,Q=R.z;c.setFloat32(h+a*m+0,f,!0),c.setFloat32(h+a*m+4,A,!0),c.setFloat32(h+a*m+8,_,!0),c.setFloat32(h+a*m+u+0,S,!0),c.setFloat32(h+a*m+u+4,C,!0),c.setFloat32(h+a*m+u+8,y,!0),c.setFloat32(h+a*m+p,I,!0),c.setFloat32(h+a*m+g+0,x,!0),c.setFloat32(h+a*m+g+4,E,!0),c.setFloat32(h+a*m+g+8,M,!0),c.setFloat32(h+a*m+v+0,F,!0),c.setFloat32(h+a*m+v+4,B,!0),c.setFloat32(h+a*m+v+8,z,!0),c.setFloat32(h+a*m+v+12,Q,!0)}return c.buffer}};rl.SH_C0=.28209479177387814;let nn=rl;class Ns{constructor(e,t){this.min=e,this.max=t}contains(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}intersects(e){return this.max.x>=e.min.x&&this.min.x<=e.max.x&&this.max.y>=e.min.y&&this.min.y<=e.max.y&&this.max.z>=e.min.z&&this.min.z<=e.max.z}size(){return this.max.subtract(this.min)}center(){return this.min.add(this.max).divide(2)}expand(e){this.min=this.min.min(e),this.max=this.max.max(e)}permute(){const e=this.min,t=this.max;this.min=new Ae(Math.min(e.x,t.x),Math.min(e.y,t.y),Math.min(e.z,t.z)),this.max=new Ae(Math.max(e.x,t.x),Math.max(e.y,t.y),Math.max(e.z,t.z))}}class Jt extends Hr{constructor(e=void 0){super(),this.selectedChanged=!1,this.colorTransformChanged=!1,this._selected=!1,this._colorTransforms=[],this._colorTransformsMap=new Map,this._data=e||new ai,this._bounds=new Ns(new Ae(1/0,1/0,1/0),new Ae(-1/0,-1/0,-1/0)),this.recalculateBounds=()=>{this._bounds=new Ns(new Ae(1/0,1/0,1/0),new Ae(-1/0,-1/0,-1/0));for(let t=0;t<this._data.vertexCount;t++)this._bounds.expand(new Ae(this._data.positions[3*t],this._data.positions[3*t+1],this._data.positions[3*t+2]))},this.applyPosition=()=>{this.data.translate(this.position),this.position=new Ae},this.applyRotation=()=>{this.data.rotate(this.rotation),this.rotation=new ct},this.applyScale=()=>{this.data.scale(this.scale),this.scale=new Ae(1,1,1)},this.recalculateBounds()}saveToFile(e=null,t="splat"){if(!document)return;if(!e){const o=new Date;e=`splat-${o.getFullYear()}-${o.getMonth()+1}-${o.getDate()}.${t}`}const i=this.clone();i.applyRotation(),i.applyScale(),i.applyPosition();const n=i.data.serialize();let r;if(t==="ply"){const o=nn.SplatToPLY(n.buffer,i.data.vertexCount);r=new Blob([o],{type:"application/octet-stream"})}else r=new Blob([n.buffer],{type:"application/octet-stream"});const a=document.createElement("a");a.download=e,a.href=URL.createObjectURL(r),a.click()}get data(){return this._data}get selected(){return this._selected}set selected(e){this._selected!==e&&(this._selected=e,this.selectedChanged=!0,this.dispatchEvent(this._changeEvent))}get colorTransforms(){return this._colorTransforms}get colorTransformsMap(){return this._colorTransformsMap}get bounds(){let e=this._bounds.center();e=e.add(this.position);let t=this._bounds.size();return t=t.multiply(this.scale),new Ns(e.subtract(t.divide(2)),e.add(t.divide(2)))}clone(){const e=new Jt(this.data.clone());return e.position=this.position.clone(),e.rotation=this.rotation.clone(),e.scale=this.scale.clone(),e}}class xn extends Hr{constructor(e){super(),this._data=e}get data(){return this._data}}class rh{constructor(){this._fx=1132,this._fy=1132,this._near=.1,this._far=100,this._width=512,this._height=512,this._projectionMatrix=new Pt,this._viewMatrix=new Pt,this._viewProj=new Pt,this._updateProjectionMatrix=()=>{this._projectionMatrix=new Pt(2*this.fx/this.width,0,0,0,0,-2*this.fy/this.height,0,0,0,0,this.far/(this.far-this.near),1,0,0,-(this.far*this.near)/(this.far-this.near),0),this._viewProj=this.projectionMatrix.multiply(this.viewMatrix)},this.update=(e,t)=>{const i=Vt.RotationFromQuaternion(t).buffer,n=e.flat();this._viewMatrix=new Pt(i[0],i[1],i[2],0,i[3],i[4],i[5],0,i[6],i[7],i[8],0,-n[0]*i[0]-n[1]*i[3]-n[2]*i[6],-n[0]*i[1]-n[1]*i[4]-n[2]*i[7],-n[0]*i[2]-n[1]*i[5]-n[2]*i[8],1),this._viewProj=this.projectionMatrix.multiply(this.viewMatrix)},this.setSize=(e,t)=>{this._width=e,this._height=t,this._updateProjectionMatrix()}}get fx(){return this._fx}set fx(e){this._fx!==e&&(this._fx=e,this._updateProjectionMatrix())}get fy(){return this._fy}set fy(e){this._fy!==e&&(this._fy=e,this._updateProjectionMatrix())}get near(){return this._near}set near(e){this._near!==e&&(this._near=e,this._updateProjectionMatrix())}get far(){return this._far}set far(e){this._far!==e&&(this._far=e,this._updateProjectionMatrix())}get width(){return this._width}get height(){return this._height}get projectionMatrix(){return this._projectionMatrix}get viewMatrix(){return this._viewMatrix}get viewProj(){return this._viewProj}}class Zt{constructor(e=0,t=0,i=0,n=0){this.x=e,this.y=t,this.z=i,this.w=n}equals(e){return!(this.x!==e.x||this.y!==e.y||this.z!==e.z||this.w!==e.w)}add(e){return typeof e=="number"?new Zt(this.x+e,this.y+e,this.z+e,this.w+e):new Zt(this.x+e.x,this.y+e.y,this.z+e.z,this.w+e.w)}subtract(e){return typeof e=="number"?new Zt(this.x-e,this.y-e,this.z-e,this.w-e):new Zt(this.x-e.x,this.y-e.y,this.z-e.z,this.w-e.w)}multiply(e){return typeof e=="number"?new Zt(this.x*e,this.y*e,this.z*e,this.w*e):e instanceof Zt?new Zt(this.x*e.x,this.y*e.y,this.z*e.z,this.w*e.w):new Zt(this.x*e.buffer[0]+this.y*e.buffer[4]+this.z*e.buffer[8]+this.w*e.buffer[12],this.x*e.buffer[1]+this.y*e.buffer[5]+this.z*e.buffer[9]+this.w*e.buffer[13],this.x*e.buffer[2]+this.y*e.buffer[6]+this.z*e.buffer[10]+this.w*e.buffer[14],this.x*e.buffer[3]+this.y*e.buffer[7]+this.z*e.buffer[11]+this.w*e.buffer[15])}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lerp(e,t){return new Zt(this.x+(e.x-this.x)*t,this.y+(e.y-this.y)*t,this.z+(e.z-this.z)*t,this.w+(e.w-this.w)*t)}magnitude(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}distanceTo(e){return Math.sqrt((this.x-e.x)**2+(this.y-e.y)**2+(this.z-e.z)**2+(this.w-e.w)**2)}normalize(){const e=this.magnitude();return new Zt(this.x/e,this.y/e,this.z/e,this.w/e)}flat(){return[this.x,this.y,this.z,this.w]}clone(){return new Zt(this.x,this.y,this.z,this.w)}toString(){return`[${this.flat().join(", ")}]`}}class UA extends Hr{constructor(e=void 0){super(),this._data=e||new rh,this._position=new Ae(0,0,-5),this.update=()=>{this.data.update(this.position,this.rotation)},this.screenPointToRay=(t,i)=>{const n=new Zt(t,i,-1,1),r=this._data.projectionMatrix.invert(),a=n.multiply(r),o=this._data.viewMatrix.invert(),c=a.multiply(o);return new Ae(c.x/c.w,c.y/c.w,c.z/c.w).subtract(this.position).normalize()}}get data(){return this._data}}class MA extends sh{constructor(){super(),this._objects=[],this.addObject=e=>{this.objects.push(e),this.dispatchEvent(new bA(e))},this.removeObject=e=>{const t=this.objects.indexOf(e);if(t<0)throw new Error("Object not found in scene");this.objects.splice(t,1),this.dispatchEvent(new yA(e))},this.findObject=e=>{for(const t of this.objects)if(e(t))return t},this.findObjectOfType=e=>{for(const t of this.objects)if(t instanceof e)return t},this.reset=()=>{const e=this.objects.slice();for(const t of e)this.removeObject(t)},this.reset()}getMergedSceneDataBuffer(e="splat"){const t=[];let i=0;for(const a of this.objects)if(a instanceof Jt){const o=a.clone();o.applyRotation(),o.applyScale(),o.applyPosition();const c=o.data.serialize();t.push(c),i+=o.data.vertexCount}const n=new Uint8Array(i*ai.RowLength);let r=0;for(const a of t)n.set(a,r),r+=a.length;return e==="ply"?nn.SplatToPLY(n.buffer,i):n.buffer}saveToFile(e=null,t="splat"){if(!document)return;if(!e){const a=new Date;e=`scene-${a.getFullYear()}-${a.getMonth()+1}-${a.getDate()}.${t}`}const i=this.getMergedSceneDataBuffer(t),n=new Blob([i],{type:"application/octet-stream"}),r=document.createElement("a");r.download=e,r.href=URL.createObjectURL(n),r.click()}get objects(){return this._objects}}async function $o(s,e){const t=await fetch(s,{mode:"cors",credentials:"omit",cache:e?"force-cache":"default"});if(t.status!=200)throw new Error(t.status+" Unable to load "+t.url);return t}async function el(s,e){const t=s.body.getReader(),i=s.headers.get("content-length"),n=i&&!isNaN(parseInt(i))?parseInt(i):void 0,r=[];let a=0;for(;;){const{done:l,value:d}=await t.read();if(l)break;if(r.push(d),a+=d.length,e&&n){const h=a/n,u=Math.min(h*.95,.95);e(u)}}const o=new Uint8Array(a);let c=0;for(const l of r)o.set(l,c),c+=l.length;return e&&e(1),o}class TA{static async LoadAsync(e,t,i,n=!1){const r=await $o(e,n),a=await el(r,i);return this.LoadFromArrayBuffer(a.buffer,t)}static async LoadFromFileAsync(e,t,i){const n=new FileReader;let r=new Jt;return n.onload=a=>{r=this.LoadFromArrayBuffer(a.target.result,t)},n.onprogress=a=>{i==null||i(a.loaded/a.total)},n.readAsArrayBuffer(e),await new Promise(a=>{n.onloadend=()=>{a()}}),r}static LoadFromArrayBuffer(e,t){const i=new Uint8Array(e),n=ai.Deserialize(i),r=new Jt(n);return t.addObject(r),r}}class FA{static async LoadAsync(e,t,i,n="",r=!1){const a=await $o(e,r),o=await el(a,i);if(o[0]!==112||o[1]!==108||o[2]!==121||o[3]!==10)throw new Error("Invalid PLY file");return this.LoadFromArrayBuffer(o.buffer,t,n)}static async LoadFromFileAsync(e,t,i,n=""){const r=new FileReader;let a=new Jt;return r.onload=o=>{a=this.LoadFromArrayBuffer(o.target.result,t,n)},r.onprogress=o=>{i==null||i(o.loaded/o.total)},r.readAsArrayBuffer(e),await new Promise(o=>{r.onloadend=()=>{o()}}),a}static LoadFromArrayBuffer(e,t,i=""){const n=new Uint8Array(this._ParsePLYBuffer(e,i)),r=ai.Deserialize(n),a=new Jt(r);return t.addObject(a),a}static _ParsePLYBuffer(e,t){const i=new Uint8Array(e),n=new TextDecoder().decode(i.slice(0,1024*10)),r=`end_header
`,a=n.indexOf(r);if(a<0)throw new Error("Unable to read .ply file header");const o=parseInt(/element vertex (\d+)\n/.exec(n)[1]);let c=0;const l={double:8,int:4,uint:4,float:4,short:2,ushort:2,uchar:1},d=[];for(const g of n.slice(0,a).split(`
`).filter(v=>v.startsWith("property "))){const[v,m,f]=g.split(" ");if(d.push({name:f,type:m,offset:c}),!l[m])throw new Error(`Unsupported property type: ${m}`);c+=l[m]}const h=new DataView(e,a+r.length),u=new ArrayBuffer(ai.RowLength*o),p=ct.FromEuler(new Ae(Math.PI/2,0,0));for(let g=0;g<o;g++){const v=new Float32Array(u,g*ai.RowLength,3),m=new Float32Array(u,g*ai.RowLength+12,3),f=new Uint8ClampedArray(u,g*ai.RowLength+24,4),A=new Uint8ClampedArray(u,g*ai.RowLength+28,4);let _=255,S=0,C=0,y=0;d.forEach(I=>{let x;switch(I.type){case"float":x=h.getFloat32(I.offset+g*c,!0);break;case"int":x=h.getInt32(I.offset+g*c,!0);break;default:throw new Error(`Unsupported property type: ${I.type}`)}switch(I.name){case"x":v[0]=x;break;case"y":v[1]=x;break;case"z":v[2]=x;break;case"scale_0":case"scaling_0":m[0]=Math.exp(x);break;case"scale_1":case"scaling_1":m[1]=Math.exp(x);break;case"scale_2":case"scaling_2":m[2]=Math.exp(x);break;case"red":f[0]=x;break;case"green":f[1]=x;break;case"blue":f[2]=x;break;case"f_dc_0":case"features_0":f[0]=(.5+nn.SH_C0*x)*255;break;case"f_dc_1":case"features_1":f[1]=(.5+nn.SH_C0*x)*255;break;case"f_dc_2":case"features_2":f[2]=(.5+nn.SH_C0*x)*255;break;case"f_dc_3":f[3]=(.5+nn.SH_C0*x)*255;break;case"opacity":case"opacity_0":f[3]=1/(1+Math.exp(-x))*255;break;case"rot_0":case"rotation_0":_=x;break;case"rot_1":case"rotation_1":S=x;break;case"rot_2":case"rotation_2":C=x;break;case"rot_3":case"rotation_3":y=x;break}});let U=new ct(S,C,y,_);switch(t){case"polycam":{const I=v[1];v[1]=-v[2],v[2]=I,U=p.multiply(U);break}case"":break;default:throw new Error(`Unsupported format: ${t}`)}U=U.normalize(),A[0]=U.w*128+128,A[1]=U.x*128+128,A[2]=U.y*128+128,A[3]=U.z*128+128}return u}}class IA{static async LoadAsync(e,t,i,n,r=!1){const a=await $o(e,r),o=await el(a,n);return this._ParseSplatvBuffer(o.buffer,t,i)}static async LoadFromFileAsync(e,t,i,n){const r=new FileReader;let a=null;if(r.onload=o=>{a=this._ParseSplatvBuffer(o.target.result,t,i)},r.onprogress=o=>{n==null||n(o.loaded/o.total)},r.readAsArrayBuffer(e),await new Promise(o=>{r.onloadend=()=>{o()}}),!a)throw new Error("Failed to load splatv file");return a}static _ParseSplatvBuffer(e,t,i){let n=null;const r=(u,p,g)=>{if(u.type==="magic"){const v=new Int32Array(p.buffer);if(v[0]!==26443)throw new Error("Invalid splatv file");g.push({size:v[1],type:"chunks"})}else if(u.type==="chunks"){const v=JSON.parse(new TextDecoder("utf-8").decode(p));if(v.length==0)throw new Error("Invalid splatv file");v.length>1&&console.warn("Splatv file contains more than one chunk, only the first one will be loaded");const m=v[0],f=m.cameras;if(i&&f&&f.length){const A=f[0],_=new Ae(A.position[0],A.position[1],A.position[2]),S=ct.FromMatrix3(new Vt(A.rotation[0][0],A.rotation[0][1],A.rotation[0][2],A.rotation[1][0],A.rotation[1][1],A.rotation[1][2],A.rotation[2][0],A.rotation[2][1],A.rotation[2][2]));i.position=_,i.rotation=S}g.push(m)}else if(u.type==="splat"){const v=Jr.Deserialize(p,u.texwidth,u.texheight),m=new xn(v);t.addObject(m),n=m}},a=new Uint8Array(e),o=[{size:8,type:"magic",texwidth:0,texheight:0}];let c=o.shift(),l=new Uint8Array(c.size),d=0,h=0;for(;c;){for(;d<c.size;){const u=Math.min(c.size-d,a.length-h);l.set(a.subarray(h,h+u),d),d+=u,h+=u}if(r(c,l,o),n)return n;c=o.shift(),c&&(l=new Uint8Array(c.size),d=0)}throw new Error("Invalid splatv file")}}const ah="dmFyIGVBID0gZnVuY3Rpb24oQyA9IHt9KSB7CiAgdmFyIHIsIEkgPSBDLCBsID0gaW1wb3J0Lm1ldGEudXJsLCBqID0gIiIsIFU7CiAgewogICAgdHJ5IHsKICAgICAgaiA9IG5ldyBVUkwoIi4iLCBsKS5ocmVmOwogICAgfSBjYXRjaCB7CiAgICB9CiAgICBVID0gKEEpID0+IHsKICAgICAgdmFyIEIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsKICAgICAgcmV0dXJuIEIub3BlbigiR0VUIiwgQSwgITEpLCBCLnJlc3BvbnNlVHlwZSA9ICJhcnJheWJ1ZmZlciIsIEIuc2VuZChudWxsKSwgbmV3IFVpbnQ4QXJyYXkoQi5yZXNwb25zZSk7CiAgICB9OwogIH0KICBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpLCBjb25zb2xlLmVycm9yLmJpbmQoY29uc29sZSk7CiAgdmFyIE0sIHUsIEw7CiAgZnVuY3Rpb24gcSgpIHsKICAgIHZhciBBID0gdS5idWZmZXI7CiAgICBJLkhFQVBVOCA9IEwgPSBuZXcgVWludDhBcnJheShBKSwgSS5IRUFQVTMyID0gbmV3IFVpbnQzMkFycmF5KEEpLCBJLkhFQVBGMzIgPSBuZXcgRmxvYXQzMkFycmF5KEEpLCBuZXcgQmlnSW50NjRBcnJheShBKSwgbmV3IEJpZ1VpbnQ2NEFycmF5KEEpOwogIH0KICBmdW5jdGlvbiBQKCkgewogICAgaWYgKEkucHJlUnVuKQogICAgICBmb3IgKHR5cGVvZiBJLnByZVJ1biA9PSAiZnVuY3Rpb24iICYmIChJLnByZVJ1biA9IFtJLnByZVJ1bl0pOyBJLnByZVJ1bi5sZW5ndGg7ICkKICAgICAgICBDQShJLnByZVJ1bi5zaGlmdCgpKTsKICAgIHgoVCk7CiAgfQogIGZ1bmN0aW9uIGIoKSB7CiAgICB5LmMoKTsKICB9CiAgZnVuY3Rpb24gVygpIHsKICAgIGlmIChJLnBvc3RSdW4pCiAgICAgIGZvciAodHlwZW9mIEkucG9zdFJ1biA9PSAiZnVuY3Rpb24iICYmIChJLnBvc3RSdW4gPSBbSS5wb3N0UnVuXSk7IEkucG9zdFJ1bi5sZW5ndGg7ICkKICAgICAgICBnQShJLnBvc3RSdW4uc2hpZnQoKSk7CiAgICB4KHYpOwogIH0KICB2YXIgcyA9IDAsIGYgPSBudWxsOwogIGZ1bmN0aW9uIF8oQSkgewogICAgcysrLCBJLm1vbml0b3JSdW5EZXBlbmRlbmNpZXM/LihzKTsKICB9CiAgZnVuY3Rpb24geihBKSB7CiAgICBpZiAocy0tLCBJLm1vbml0b3JSdW5EZXBlbmRlbmNpZXM/LihzKSwgcyA9PSAwICYmIGYpIHsKICAgICAgdmFyIEIgPSBmOwogICAgICBmID0gbnVsbCwgQigpOwogICAgfQogIH0KICB2YXIgUzsKICBmdW5jdGlvbiBWKCkgewogICAgcmV0dXJuIEJBKCJBR0Z6YlFFQUFBQUJHUVJnQVg4QmYyQUJmd0JnQ1g5L2YzOS9mMzkvZndCZ0FBQUNCd0VCWVFGaEFBQURCZ1VBQVFBQ0F3VUhBUUdDQW9DQUFnWUlBWDhCUVlDTUJBc0hGUVVCWWdJQUFXTUFCUUZrQUFRQlpRQURBV1lBQWd3QkFRck5PQVZQQVFKL1FZQUlLQUlBSWdFZ0FFRUhha0Y0Y1NJQ2FpRUFBa0FnQWtFQUlBQWdBVTBiUlFSQUlBQS9BRUVRZEUwTkFTQUFFQUFOQVF0QmhBaEJNRFlDQUVGL0R3dEJnQWdnQURZQ0FDQUJDOXdMQVFoL0FrQWdBRVVOQUNBQVFRaHJJZ01nQUVFRWF5Z0NBQ0lDUVhoeElnQnFJUVVDUUNBQ1FRRnhEUUFnQWtFQ2NVVU5BU0FESUFNb0FnQWlCR3NpQTBHWUNDZ0NBRWtOQVNBQUlBUnFJUUFDUUFKQUFrQkJuQWdvQWdBZ0EwY0VRQ0FES0FJTUlRRWdCRUgvQVUwRVFDQUJJQU1vQWdnaUFrY05Ba0dJQ0VHSUNDZ0NBRUYrSUFSQkEzWjNjVFlDQUF3RkN5QURLQUlZSVFjZ0FTQURSd1JBSUFNb0FnZ2lBaUFCTmdJTUlBRWdBallDQ0F3RUN5QURLQUlVSWdJRWZ5QURRUlJxQlNBREtBSVFJZ0pGRFFNZ0EwRVFhZ3NoQkFOQUlBUWhCaUFDSWdGQkZHb2hCQ0FCS0FJVUlnSU5BQ0FCUVJCcUlRUWdBU2dDRUNJQ0RRQUxJQVpCQURZQ0FBd0RDeUFGS0FJRUlnSkJBM0ZCQTBjTkEwR1FDQ0FBTmdJQUlBVWdBa0YrY1RZQ0JDQURJQUJCQVhJMkFnUWdCU0FBTmdJQUR3c2dBaUFCTmdJTUlBRWdBallDQ0F3Q0MwRUFJUUVMSUFkRkRRQUNRQ0FES0FJY0lnUkJBblJCdUFwcUlnSW9BZ0FnQTBZRVFDQUNJQUUyQWdBZ0FRMEJRWXdJUVl3SUtBSUFRWDRnQkhkeE5nSUFEQUlMQWtBZ0F5QUhLQUlRUmdSQUlBY2dBVFlDRUF3QkN5QUhJQUUyQWhRTElBRkZEUUVMSUFFZ0J6WUNHQ0FES0FJUUlnSUVRQ0FCSUFJMkFoQWdBaUFCTmdJWUN5QURLQUlVSWdKRkRRQWdBU0FDTmdJVUlBSWdBVFlDR0FzZ0F5QUZUdzBBSUFVb0FnUWlCRUVCY1VVTkFBSkFBa0FDUUFKQUlBUkJBbkZGQkVCQm9BZ29BZ0FnQlVZRVFFR2dDQ0FETmdJQVFaUUlRWlFJS0FJQUlBQnFJZ0EyQWdBZ0F5QUFRUUZ5TmdJRUlBTkJuQWdvQWdCSERRWkJrQWhCQURZQ0FFR2NDRUVBTmdJQUR3dEJuQWdvQWdBaUJ5QUZSZ1JBUVp3SUlBTTJBZ0JCa0FoQmtBZ29BZ0FnQUdvaUFEWUNBQ0FESUFCQkFYSTJBZ1FnQUNBRGFpQUFOZ0lBRHdzZ0JFRjRjU0FBYWlFQUlBVW9BZ3doQVNBRVFmOEJUUVJBSUFVb0FnZ2lBaUFCUmdSQVFZZ0lRWWdJS0FJQVFYNGdCRUVEZG5keE5nSUFEQVVMSUFJZ0FUWUNEQ0FCSUFJMkFnZ01CQXNnQlNnQ0dDRUlJQUVnQlVjRVFDQUZLQUlJSWdJZ0FUWUNEQ0FCSUFJMkFnZ01Bd3NnQlNnQ0ZDSUNCSDhnQlVFVWFnVWdCU2dDRUNJQ1JRMENJQVZCRUdvTElRUURRQ0FFSVFZZ0FpSUJRUlJxSVFRZ0FTZ0NGQ0lDRFFBZ0FVRVFhaUVFSUFFb0FoQWlBZzBBQ3lBR1FRQTJBZ0FNQWdzZ0JTQUVRWDV4TmdJRUlBTWdBRUVCY2pZQ0JDQUFJQU5xSUFBMkFnQU1Bd3RCQUNFQkN5QUlSUTBBQWtBZ0JTZ0NIQ0lFUVFKMFFiZ0thaUlDS0FJQUlBVkdCRUFnQWlBQk5nSUFJQUVOQVVHTUNFR01DQ2dDQUVGK0lBUjNjVFlDQUF3Q0N3SkFJQVVnQ0NnQ0VFWUVRQ0FJSUFFMkFoQU1BUXNnQ0NBQk5nSVVDeUFCUlEwQkN5QUJJQWcyQWhnZ0JTZ0NFQ0lDQkVBZ0FTQUNOZ0lRSUFJZ0FUWUNHQXNnQlNnQ0ZDSUNSUTBBSUFFZ0FqWUNGQ0FDSUFFMkFoZ0xJQU1nQUVFQmNqWUNCQ0FBSUFOcUlBQTJBZ0FnQXlBSFJ3MEFRWkFJSUFBMkFnQVBDeUFBUWY4QlRRUkFJQUJCZUhGQnNBaHFJUUlDZjBHSUNDZ0NBQ0lFUVFFZ0FFRURkblFpQUhGRkJFQkJpQWdnQUNBRWNqWUNBQ0FDREFFTElBSW9BZ2dMSVFBZ0FpQUROZ0lJSUFBZ0F6WUNEQ0FESUFJMkFnd2dBeUFBTmdJSUR3dEJIeUVCSUFCQi8vLy9CMDBFUUNBQVFTWWdBRUVJZG1jaUFtdDJRUUZ4SUFKQkFYUnJRVDVxSVFFTElBTWdBVFlDSENBRFFnQTNBaEFnQVVFQ2RFRzRDbW9oQkFKL0FrQUNmMEdNQ0NnQ0FDSUdRUUVnQVhRaUFuRkZCRUJCakFnZ0FpQUdjallDQUNBRUlBTTJBZ0JCR0NFQlFRZ01BUXNnQUVFWklBRkJBWFpyUVFBZ0FVRWZSeHQwSVFFZ0JDZ0NBQ0VFQTBBZ0JDSUNLQUlFUVhoeElBQkdEUUlnQVVFZGRpRUVJQUZCQVhRaEFTQUNJQVJCQkhGcUlnWW9BaEFpQkEwQUN5QUdJQU0yQWhCQkdDRUJJQUloQkVFSUN5RUFJQU1pQWd3QkN5QUNLQUlJSWdRZ0F6WUNEQ0FDSUFNMkFnaEJHQ0VBUVFnaEFVRUFDeUVHSUFFZ0Eyb2dCRFlDQUNBRElBSTJBZ3dnQUNBRGFpQUdOZ0lBUWFnSVFhZ0lLQUlBUVFGcklnQkJmeUFBR3pZQ0FBc0wwU2NCQzM4akFFRVFheUlLSkFBQ1FBSkFBa0FDUUFKQUFrQUNRQUpBQWtBQ1FDQUFRZlFCVFFSQVFZZ0lLQUlBSWdSQkVDQUFRUXRxUWZnRGNTQUFRUXRKR3lJR1FRTjJJZ0IySWdGQkEzRUVRQUpBSUFGQmYzTkJBWEVnQUdvaUFrRURkQ0lCUWJBSWFpSUFJQUZCdUFocUtBSUFJZ0VvQWdnaUJVWUVRRUdJQ0NBRVFYNGdBbmR4TmdJQURBRUxJQVVnQURZQ0RDQUFJQVUyQWdnTElBRkJDR29oQUNBQklBSkJBM1FpQWtFRGNqWUNCQ0FCSUFKcUlnRWdBU2dDQkVFQmNqWUNCQXdMQ3lBR1FaQUlLQUlBSWdoTkRRRWdBUVJBQWtCQkFpQUFkQ0lDUVFBZ0FtdHlJQUVnQUhSeGFDSUJRUU4wSWdCQnNBaHFJZ0lnQUVHNENHb29BZ0FpQUNnQ0NDSUZSZ1JBUVlnSUlBUkJmaUFCZDNFaUJEWUNBQXdCQ3lBRklBSTJBZ3dnQWlBRk5nSUlDeUFBSUFaQkEzSTJBZ1FnQUNBR2FpSUhJQUZCQTNRaUFTQUdheUlGUVFGeU5nSUVJQUFnQVdvZ0JUWUNBQ0FJQkVBZ0NFRjRjVUd3Q0dvaEFVR2NDQ2dDQUNFQ0FuOGdCRUVCSUFoQkEzWjBJZ054UlFSQVFZZ0lJQU1nQkhJMkFnQWdBUXdCQ3lBQktBSUlDeUVESUFFZ0FqWUNDQ0FESUFJMkFnd2dBaUFCTmdJTUlBSWdBellDQ0FzZ0FFRUlhaUVBUVp3SUlBYzJBZ0JCa0FnZ0JUWUNBQXdMQzBHTUNDZ0NBQ0lMUlEwQklBdG9RUUowUWJnS2FpZ0NBQ0lDS0FJRVFYaHhJQVpySVFNZ0FpRUJBMEFDUUNBQktBSVFJZ0JGQkVBZ0FTZ0NGQ0lBUlEwQkN5QUFLQUlFUVhoeElBWnJJZ0VnQXlBQklBTkpJZ0ViSVFNZ0FDQUNJQUViSVFJZ0FDRUJEQUVMQ3lBQ0tBSVlJUWtnQWlBQ0tBSU1JZ0JIQkVBZ0FpZ0NDQ0lCSUFBMkFnd2dBQ0FCTmdJSURBb0xJQUlvQWhRaUFRUi9JQUpCRkdvRklBSW9BaEFpQVVVTkF5QUNRUkJxQ3lFRkEwQWdCU0VISUFFaUFFRVVhaUVGSUFBb0FoUWlBUTBBSUFCQkVHb2hCU0FBS0FJUUlnRU5BQXNnQjBFQU5nSUFEQWtMUVg4aEJpQUFRYjkvU3cwQUlBQkJDMm9pQVVGNGNTRUdRWXdJS0FJQUlnZEZEUUJCSHlFSVFRQWdCbXNoQXlBQVFmVC8vd2ROQkVBZ0JrRW1JQUZCQ0habklnQnJka0VCY1NBQVFRRjBhMEUrYWlFSUN3SkFBa0FDUUNBSVFRSjBRYmdLYWlnQ0FDSUJSUVJBUVFBaEFBd0JDMEVBSVFBZ0JrRVpJQWhCQVhaclFRQWdDRUVmUnh0MElRSURRQUpBSUFFb0FnUkJlSEVnQm1zaUJDQURUdzBBSUFFaEJTQUVJZ01OQUVFQUlRTWdBU0VBREFNTElBQWdBU2dDRkNJRUlBUWdBU0FDUVIxMlFRUnhhaWdDRUNJQlJoc2dBQ0FFR3lFQUlBSkJBWFFoQWlBQkRRQUxDeUFBSUFWeVJRUkFRUUFoQlVFQ0lBaDBJZ0JCQUNBQWEzSWdCM0VpQUVVTkF5QUFhRUVDZEVHNENtb29BZ0FoQUFzZ0FFVU5BUXNEUUNBQUtBSUVRWGh4SUFacklnSWdBMGtoQVNBQ0lBTWdBUnNoQXlBQUlBVWdBUnNoQlNBQUtBSVFJZ0VFZnlBQkJTQUFLQUlVQ3lJQURRQUxDeUFGUlEwQUlBTkJrQWdvQWdBZ0JtdFBEUUFnQlNnQ0dDRUlJQVVnQlNnQ0RDSUFSd1JBSUFVb0FnZ2lBU0FBTmdJTUlBQWdBVFlDQ0F3SUN5QUZLQUlVSWdFRWZ5QUZRUlJxQlNBRktBSVFJZ0ZGRFFNZ0JVRVFhZ3NoQWdOQUlBSWhCQ0FCSWdCQkZHb2hBaUFBS0FJVUlnRU5BQ0FBUVJCcUlRSWdBQ2dDRUNJQkRRQUxJQVJCQURZQ0FBd0hDeUFHUVpBSUtBSUFJZ1ZOQkVCQm5BZ29BZ0FoQUFKQUlBVWdCbXNpQVVFUVR3UkFJQUFnQm1vaUFpQUJRUUZ5TmdJRUlBQWdCV29nQVRZQ0FDQUFJQVpCQTNJMkFnUU1BUXNnQUNBRlFRTnlOZ0lFSUFBZ0JXb2lBU0FCS0FJRVFRRnlOZ0lFUVFBaEFrRUFJUUVMUVpBSUlBRTJBZ0JCbkFnZ0FqWUNBQ0FBUVFocUlRQU1DUXNnQmtHVUNDZ0NBQ0lDU1FSQVFaUUlJQUlnQm1zaUFUWUNBRUdnQ0VHZ0NDZ0NBQ0lBSUFacUlnSTJBZ0FnQWlBQlFRRnlOZ0lFSUFBZ0JrRURjallDQkNBQVFRaHFJUUFNQ1F0QkFDRUFJQVpCTDJvaUF3Si9RZUFMS0FJQUJFQkI2QXNvQWdBTUFRdEI3QXRDZnpjQ0FFSGtDMEtBb0lDQWdJQUVOd0lBUWVBTElBcEJER3BCY0hGQjJLclZxZ1Z6TmdJQVFmUUxRUUEyQWdCQnhBdEJBRFlDQUVHQUlBc2lBV29pQkVFQUlBRnJJZ2R4SWdFZ0JrME5DRUhBQ3lnQ0FDSUZCRUJCdUFzb0FnQWlDQ0FCYWlJSklBaE5JQVVnQ1VseURRa0xBa0JCeEFzdEFBQkJCSEZGQkVBQ1FBSkFBa0FDUUVHZ0NDZ0NBQ0lGQkVCQnlBc2hBQU5BSUFBb0FnQWlDQ0FGVFFSQUlBVWdDQ0FBS0FJRWFra05Bd3NnQUNnQ0NDSUFEUUFMQzBFQUVBRWlBa0YvUmcwRElBRWhCRUhrQ3lnQ0FDSUFRUUZySWdVZ0FuRUVRQ0FCSUFKcklBSWdCV3BCQUNBQWEzRnFJUVFMSUFRZ0JrME5BMEhBQ3lnQ0FDSUFCRUJCdUFzb0FnQWlCU0FFYWlJSElBVk5JQUFnQjBseURRUUxJQVFRQVNJQUlBSkhEUUVNQlFzZ0JDQUNheUFIY1NJRUVBRWlBaUFBS0FJQUlBQW9BZ1JxUmcwQklBSWhBQXNnQUVGL1JnMEJJQVpCTUdvZ0JFMEVRQ0FBSVFJTUJBdEI2QXNvQWdBaUFpQURJQVJyYWtFQUlBSnJjU0lDRUFGQmYwWU5BU0FDSUFScUlRUWdBQ0VDREFNTElBSkJmMGNOQWd0QnhBdEJ4QXNvQWdCQkJISTJBZ0FMSUFFUUFTSUNRWDlHUVFBUUFTSUFRWDlHY2lBQUlBSk5jZzBGSUFBZ0Ftc2lCQ0FHUVNocVRRMEZDMEc0QzBHNEN5Z0NBQ0FFYWlJQU5nSUFRYndMS0FJQUlBQkpCRUJCdkFzZ0FEWUNBQXNDUUVHZ0NDZ0NBQ0lEQkVCQnlBc2hBQU5BSUFJZ0FDZ0NBQ0lCSUFBb0FnUWlCV3BHRFFJZ0FDZ0NDQ0lBRFFBTERBUUxRWmdJS0FJQUlnQkJBQ0FBSUFKTkcwVUVRRUdZQ0NBQ05nSUFDMEVBSVFCQnpBc2dCRFlDQUVISUN5QUNOZ0lBUWFnSVFYODJBZ0JCckFoQjRBc29BZ0EyQWdCQjFBdEJBRFlDQUFOQUlBQkJBM1FpQVVHNENHb2dBVUd3Q0dvaUJUWUNBQ0FCUWJ3SWFpQUZOZ0lBSUFCQkFXb2lBRUVnUncwQUMwR1VDQ0FFUVNocklnQkJlQ0FDYTBFSGNTSUJheUlGTmdJQVFhQUlJQUVnQW1vaUFUWUNBQ0FCSUFWQkFYSTJBZ1FnQUNBQ2FrRW9OZ0lFUWFRSVFmQUxLQUlBTmdJQURBUUxJQUlnQTAwZ0FTQURTM0lOQWlBQUtBSU1RUWh4RFFJZ0FDQUVJQVZxTmdJRVFhQUlJQU5CZUNBRGEwRUhjU0lBYWlJQk5nSUFRWlFJUVpRSUtBSUFJQVJxSWdJZ0FHc2lBRFlDQUNBQklBQkJBWEkyQWdRZ0FpQURha0VvTmdJRVFhUUlRZkFMS0FJQU5nSUFEQU1MUVFBaEFBd0dDMEVBSVFBTUJBdEJtQWdvQWdBZ0Frc0VRRUdZQ0NBQ05nSUFDeUFDSUFScUlRVkJ5QXNoQUFKQUEwQWdCU0FBS0FJQUlnRkhCRUFnQUNnQ0NDSUFEUUVNQWdzTElBQXRBQXhCQ0hGRkRRTUxRY2dMSVFBRFFBSkFJQUFvQWdBaUFTQURUUVJBSUFNZ0FTQUFLQUlFYWlJRlNRMEJDeUFBS0FJSUlRQU1BUXNMUVpRSUlBUkJLR3NpQUVGNElBSnJRUWR4SWdGcklnYzJBZ0JCb0FnZ0FTQUNhaUlCTmdJQUlBRWdCMEVCY2pZQ0JDQUFJQUpxUVNnMkFnUkJwQWhCOEFzb0FnQTJBZ0FnQXlBRlFTY2dCV3RCQjNGcVFTOXJJZ0FnQUNBRFFSQnFTUnNpQVVFYk5nSUVJQUZCMEFzcEFnQTNBaEFnQVVISUN5a0NBRGNDQ0VIUUN5QUJRUWhxTmdJQVFjd0xJQVEyQWdCQnlBc2dBallDQUVIVUMwRUFOZ0lBSUFGQkdHb2hBQU5BSUFCQkJ6WUNCQ0FBUVFocUlBQkJCR29oQUNBRlNRMEFDeUFCSUFOR0RRQWdBU0FCS0FJRVFYNXhOZ0lFSUFNZ0FTQURheUlDUVFGeU5nSUVJQUVnQWpZQ0FBSi9JQUpCL3dGTkJFQWdBa0Y0Y1VHd0NHb2hBQUovUVlnSUtBSUFJZ0ZCQVNBQ1FRTjJkQ0lDY1VVRVFFR0lDQ0FCSUFKeU5nSUFJQUFNQVFzZ0FDZ0NDQXNoQVNBQUlBTTJBZ2dnQVNBRE5nSU1RUXdoQWtFSURBRUxRUjhoQUNBQ1FmLy8vd2ROQkVBZ0FrRW1JQUpCQ0habklnQnJka0VCY1NBQVFRRjBhMEUrYWlFQUN5QURJQUEyQWh3Z0EwSUFOd0lRSUFCQkFuUkJ1QXBxSVFFQ1FBSkFRWXdJS0FJQUlnVkJBU0FBZENJRWNVVUVRRUdNQ0NBRUlBVnlOZ0lBSUFFZ0F6WUNBQXdCQ3lBQ1FSa2dBRUVCZG10QkFDQUFRUjlIRzNRaEFDQUJLQUlBSVFVRFFDQUZJZ0VvQWdSQmVIRWdBa1lOQWlBQVFSMTJJUVVnQUVFQmRDRUFJQUVnQlVFRWNXb2lCQ2dDRUNJRkRRQUxJQVFnQXpZQ0VBc2dBeUFCTmdJWVFRZ2hBaUFESWdFaEFFRU1EQUVMSUFFb0FnZ2lBQ0FETmdJTUlBRWdBellDQ0NBRElBQTJBZ2hCQUNFQVFSZ2hBa0VNQ3lBRGFpQUJOZ0lBSUFJZ0Eyb2dBRFlDQUF0QmxBZ29BZ0FpQUNBR1RRMEFRWlFJSUFBZ0Jtc2lBVFlDQUVHZ0NFR2dDQ2dDQUNJQUlBWnFJZ0kyQWdBZ0FpQUJRUUZ5TmdJRUlBQWdCa0VEY2pZQ0JDQUFRUWhxSVFBTUJBdEJoQWhCTURZQ0FFRUFJUUFNQXdzZ0FDQUNOZ0lBSUFBZ0FDZ0NCQ0FFYWpZQ0JDQUNRWGdnQW10QkIzRnFJZ2dnQmtFRGNqWUNCQ0FCUVhnZ0FXdEJCM0ZxSWdRZ0JpQUlhaUlEYXlFSEFrQkJvQWdvQWdBZ0JFWUVRRUdnQ0NBRE5nSUFRWlFJUVpRSUtBSUFJQWRxSWdBMkFnQWdBeUFBUVFGeU5nSUVEQUVMUVp3SUtBSUFJQVJHQkVCQm5BZ2dBellDQUVHUUNFR1FDQ2dDQUNBSGFpSUFOZ0lBSUFNZ0FFRUJjallDQkNBQUlBTnFJQUEyQWdBTUFRc2dCQ2dDQkNJQVFRTnhRUUZHQkVBZ0FFRjRjU0VKSUFRb0Fnd2hBZ0pBSUFCQi93Rk5CRUFnQkNnQ0NDSUJJQUpHQkVCQmlBaEJpQWdvQWdCQmZpQUFRUU4yZDNFMkFnQU1BZ3NnQVNBQ05nSU1JQUlnQVRZQ0NBd0JDeUFFS0FJWUlRWUNRQ0FDSUFSSEJFQWdCQ2dDQ0NJQUlBSTJBZ3dnQWlBQU5nSUlEQUVMQWtBZ0JDZ0NGQ0lBQkg4Z0JFRVVhZ1VnQkNnQ0VDSUFSUTBCSUFSQkVHb0xJUUVEUUNBQklRVWdBQ0lDUVJScUlRRWdBQ2dDRkNJQURRQWdBa0VRYWlFQklBSW9BaEFpQUEwQUN5QUZRUUEyQWdBTUFRdEJBQ0VDQ3lBR1JRMEFBa0FnQkNnQ0hDSUFRUUowUWJnS2FpSUJLQUlBSUFSR0JFQWdBU0FDTmdJQUlBSU5BVUdNQ0VHTUNDZ0NBRUYrSUFCM2NUWUNBQXdDQ3dKQUlBUWdCaWdDRUVZRVFDQUdJQUkyQWhBTUFRc2dCaUFDTmdJVUN5QUNSUTBCQ3lBQ0lBWTJBaGdnQkNnQ0VDSUFCRUFnQWlBQU5nSVFJQUFnQWpZQ0dBc2dCQ2dDRkNJQVJRMEFJQUlnQURZQ0ZDQUFJQUkyQWhnTElBY2dDV29oQnlBRUlBbHFJZ1FvQWdRaEFBc2dCQ0FBUVg1eE5nSUVJQU1nQjBFQmNqWUNCQ0FESUFkcUlBYzJBZ0FnQjBIL0FVMEVRQ0FIUVhoeFFiQUlhaUVBQW45QmlBZ29BZ0FpQVVFQklBZEJBM1owSWdKeFJRUkFRWWdJSUFFZ0FuSTJBZ0FnQUF3QkN5QUFLQUlJQ3lFQklBQWdBellDQ0NBQklBTTJBZ3dnQXlBQU5nSU1JQU1nQVRZQ0NBd0JDMEVmSVFJZ0IwSC8vLzhIVFFSQUlBZEJKaUFIUVFoMlp5SUFhM1pCQVhFZ0FFRUJkR3RCUG1vaEFnc2dBeUFDTmdJY0lBTkNBRGNDRUNBQ1FRSjBRYmdLYWlFQUFrQUNRRUdNQ0NnQ0FDSUJRUUVnQW5RaUJYRkZCRUJCakFnZ0FTQUZjallDQUNBQUlBTTJBZ0FNQVFzZ0IwRVpJQUpCQVhaclFRQWdBa0VmUnh0MElRSWdBQ2dDQUNFQkEwQWdBU0lBS0FJRVFYaHhJQWRHRFFJZ0FrRWRkaUVCSUFKQkFYUWhBaUFBSUFGQkJIRnFJZ1VvQWhBaUFRMEFDeUFGSUFNMkFoQUxJQU1nQURZQ0dDQURJQU0yQWd3Z0F5QUROZ0lJREFFTElBQW9BZ2dpQVNBRE5nSU1JQUFnQXpZQ0NDQURRUUEyQWhnZ0F5QUFOZ0lNSUFNZ0FUWUNDQXNnQ0VFSWFpRUFEQUlMQWtBZ0NFVU5BQUpBSUFVb0Fod2lBVUVDZEVHNENtb2lBaWdDQUNBRlJnUkFJQUlnQURZQ0FDQUFEUUZCakFnZ0IwRitJQUYzY1NJSE5nSUFEQUlMQWtBZ0JTQUlLQUlRUmdSQUlBZ2dBRFlDRUF3QkN5QUlJQUEyQWhRTElBQkZEUUVMSUFBZ0NEWUNHQ0FGS0FJUUlnRUVRQ0FBSUFFMkFoQWdBU0FBTmdJWUN5QUZLQUlVSWdGRkRRQWdBQ0FCTmdJVUlBRWdBRFlDR0FzQ1FDQURRUTlOQkVBZ0JTQURJQVpxSWdCQkEzSTJBZ1FnQUNBRmFpSUFJQUFvQWdSQkFYSTJBZ1FNQVFzZ0JTQUdRUU55TmdJRUlBVWdCbW9pQkNBRFFRRnlOZ0lFSUFNZ0JHb2dBellDQUNBRFFmOEJUUVJBSUFOQmVIRkJzQWhxSVFBQ2YwR0lDQ2dDQUNJQlFRRWdBMEVEZG5RaUFuRkZCRUJCaUFnZ0FTQUNjallDQUNBQURBRUxJQUFvQWdnTElRRWdBQ0FFTmdJSUlBRWdCRFlDRENBRUlBQTJBZ3dnQkNBQk5nSUlEQUVMUVI4aEFDQURRZi8vL3dkTkJFQWdBMEVtSUFOQkNIWm5JZ0JyZGtFQmNTQUFRUUYwYTBFK2FpRUFDeUFFSUFBMkFod2dCRUlBTndJUUlBQkJBblJCdUFwcUlRRUNRQUpBSUFkQkFTQUFkQ0lDY1VVRVFFR01DQ0FDSUFkeU5nSUFJQUVnQkRZQ0FDQUVJQUUyQWhnTUFRc2dBMEVaSUFCQkFYWnJRUUFnQUVFZlJ4dDBJUUFnQVNnQ0FDRUJBMEFnQVNJQ0tBSUVRWGh4SUFOR0RRSWdBRUVkZGlFQklBQkJBWFFoQUNBQ0lBRkJCSEZxSWdjb0FoQWlBUTBBQ3lBSElBUTJBaEFnQkNBQ05nSVlDeUFFSUFRMkFnd2dCQ0FFTmdJSURBRUxJQUlvQWdnaUFDQUVOZ0lNSUFJZ0JEWUNDQ0FFUVFBMkFoZ2dCQ0FDTmdJTUlBUWdBRFlDQ0FzZ0JVRUlhaUVBREFFTEFrQWdDVVVOQUFKQUlBSW9BaHdpQVVFQ2RFRzRDbW9pQlNnQ0FDQUNSZ1JBSUFVZ0FEWUNBQ0FBRFFGQmpBZ2dDMEYrSUFGM2NUWUNBQXdDQ3dKQUlBSWdDU2dDRUVZRVFDQUpJQUEyQWhBTUFRc2dDU0FBTmdJVUN5QUFSUTBCQ3lBQUlBazJBaGdnQWlnQ0VDSUJCRUFnQUNBQk5nSVFJQUVnQURZQ0dBc2dBaWdDRkNJQlJRMEFJQUFnQVRZQ0ZDQUJJQUEyQWhnTEFrQWdBMEVQVFFSQUlBSWdBeUFHYWlJQVFRTnlOZ0lFSUFBZ0Ftb2lBQ0FBS0FJRVFRRnlOZ0lFREFFTElBSWdCa0VEY2pZQ0JDQUNJQVpxSWdVZ0EwRUJjallDQkNBRElBVnFJQU0yQWdBZ0NBUkFJQWhCZUhGQnNBaHFJUUJCbkFnb0FnQWhBUUovUVFFZ0NFRURkblFpQnlBRWNVVUVRRUdJQ0NBRUlBZHlOZ0lBSUFBTUFRc2dBQ2dDQ0FzaEJDQUFJQUUyQWdnZ0JDQUJOZ0lNSUFFZ0FEWUNEQ0FCSUFRMkFnZ0xRWndJSUFVMkFnQkJrQWdnQXpZQ0FBc2dBa0VJYWlFQUN5QUtRUkJxSkFBZ0FBdkdCQUlHZndwOVFmLy8vLzhISVF4QmdJQ0FnSGdoRFVGL0lRa0RRQ0FESUFwR0JFQkJBQ0VBSUFoQkFFR0FnQkQ4Q3dCREFQOS9SeUFOSUF4cnNwVWhEd1VnQkNBS1FReHNhaUlMS2dJQUlSTWdDeW9DQ0NFVUlBc3FBZ1FoRlNBSklBSWdDa0VDZENJT2FpZ0NBQ0lMUndSQUlBRWdDMEhRQUd4cUlna3FBandnQUNvQ09DSVBsQ0FKS2dJNElBQXFBaWdpRUpRZ0NTb0NNQ0FBS2dJSUloR1VJQUFxQWhnaUVpQUpLZ0kwbEpLU2tpRVdJQWtxQWl3Z0Q1UWdDU29DS0NBUWxDQUpLZ0lnSUJHVUlCSWdDU29DSkpTU2twSWhGeUFKS2dJY0lBK1VJQWtxQWhnZ0VKUWdDU29DRUNBUmxDQVNJQWtxQWhTVWtwS1NJUmdnQ1NvQ0RDQVBsQ0FKS2dJSUlCQ1VJQWtxQWdBZ0VaUWdDU29DQkNBU2xKS1NraUVQSUFzaENRc2dCU0FPYWlBV0lCY2dGSlFnRHlBVGxDQVZJQmlVa3BLU1F3QUFnRVdVL0FBaUN6WUNBQ0FNSUFzZ0N5QU1TaHNoRENBTklBc2dDeUFOU0JzaERTQUtRUUZxSVFvTUFRc0xBMEFnQUNBRFJrVUVRQ0FGSUFCQkFuUnFJZ0VnRHlBQktBSUFJQXhyczVUOEFTSUJOZ0lBSUFnZ0FVRUNkR29pQVNBQktBSUFRUUZxTmdJQUlBQkJBV29oQUF3QkN3dEJBQ0VBSUFkQkFEWUNBQ0FJUVFScklRRkJBQ0VNUVFFaENnTkFJQXBCZ0lBRVJnUkFBMEFDUUNBQUlBTkdEUUFnQnlBRklBQkJBblJxS0FJQVFRSjBhaUlCSUFFb0FnQWlBVUVCYWpZQ0FDQUdJQUZCQW5ScUlBQTJBZ0FnQUVFQmFpRUFEQUVMQ3dVZ0J5QUtRUUowSWdKcUlBRWdBbW9vQWdBZ0RHb2lERFlDQUNBS1FRRnFJUW9NQVFzTEN3SUFDd3NKQVFCQmdRZ0xBZ1lCIik7CiAgfQogIGZ1bmN0aW9uIE8oQSkgewogICAgaWYgKEFycmF5QnVmZmVyLmlzVmlldyhBKSkKICAgICAgcmV0dXJuIEE7CiAgICBpZiAoQSA9PSBTICYmIE0pCiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShNKTsKICAgIGlmIChVKQogICAgICByZXR1cm4gVShBKTsKICAgIHRocm93ICdzeW5jIGZldGNoaW5nIG9mIHRoZSB3YXNtIGZhaWxlZDogeW91IGNhbiBwcmVsb2FkIGl0IHRvIE1vZHVsZVsid2FzbUJpbmFyeSJdIG1hbnVhbGx5LCBvciBlbWNjLnB5IHdpbGwgZG8gdGhhdCBmb3IgeW91IHdoZW4gZ2VuZXJhdGluZyBIVE1MIChidXQgbm90IEpTKSc7CiAgfQogIGZ1bmN0aW9uICQoQSwgQikgewogICAgdmFyIHQsIEUgPSBPKEEpOwogICAgdCA9IG5ldyBXZWJBc3NlbWJseS5Nb2R1bGUoRSk7CiAgICB2YXIgaSA9IG5ldyBXZWJBc3NlbWJseS5JbnN0YW5jZSh0LCBCKTsKICAgIHJldHVybiBbaSwgdF07CiAgfQogIGZ1bmN0aW9uIEFBKCkgewogICAgcmV0dXJuIHsgYTogbkEgfTsKICB9CiAgZnVuY3Rpb24gSUEoKSB7CiAgICBmdW5jdGlvbiBBKEUsIGkpIHsKICAgICAgcmV0dXJuIHkgPSBFLmV4cG9ydHMsIHUgPSB5LmIsIHEoKSwgckEoeSksIHooKSwgeTsKICAgIH0KICAgIF8oKTsKICAgIHZhciBCID0gQUEoKTsKICAgIGlmIChJLmluc3RhbnRpYXRlV2FzbSkKICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChFLCBpKSA9PiB7CiAgICAgICAgSS5pbnN0YW50aWF0ZVdhc20oQiwgKG8sIGgpID0+IHsKICAgICAgICAgIEUoQShvKSk7CiAgICAgICAgfSk7CiAgICAgIH0pOwogICAgUyA/Pz0gVigpOwogICAgdmFyIHQgPSAkKFMsIEIpOwogICAgcmV0dXJuIEEodFswXSk7CiAgfQogIGZvciAodmFyIHggPSAoQSkgPT4gewogICAgZm9yICg7IEEubGVuZ3RoID4gMDsgKQogICAgICBBLnNoaWZ0KCkoSSk7CiAgfSwgdiA9IFtdLCBnQSA9IChBKSA9PiB2LnB1c2goQSksIFQgPSBbXSwgQ0EgPSAoQSkgPT4gVC5wdXNoKEEpLCBCQSA9IChBKSA9PiB7CiAgICBmb3IgKHZhciBCLCB0LCBFID0gMCwgaSA9IDAsIG8gPSBBLmxlbmd0aCwgaCA9IG5ldyBVaW50OEFycmF5KChvICogMyA+PiAyKSAtIChBW28gLSAyXSA9PSAiPSIpIC0gKEFbbyAtIDFdID09ICI9IikpOyBFIDwgbzsgRSArPSA0LCBpICs9IDMpCiAgICAgIEIgPSBuW0EuY2hhckNvZGVBdChFICsgMSldLCB0ID0gbltBLmNoYXJDb2RlQXQoRSArIDIpXSwgaFtpXSA9IG5bQS5jaGFyQ29kZUF0KEUpXSA8PCAyIHwgQiA+PiA0LCBoW2kgKyAxXSA9IEIgPDwgNCB8IHQgPj4gMiwgaFtpICsgMl0gPSB0IDw8IDYgfCBuW0EuY2hhckNvZGVBdChFICsgMyldOwogICAgcmV0dXJuIGg7CiAgfSwgUUEgPSAoKSA9PiAyMTQ3NDgzNjQ4LCBFQSA9IChBLCBCKSA9PiBNYXRoLmNlaWwoQSAvIEIpICogQiwgdEEgPSAoQSkgPT4gewogICAgdmFyIEIgPSB1LmJ1ZmZlciwgdCA9IChBIC0gQi5ieXRlTGVuZ3RoICsgNjU1MzUpIC8gNjU1MzYgfCAwOwogICAgdHJ5IHsKICAgICAgcmV0dXJuIHUuZ3Jvdyh0KSwgcSgpLCAxOwogICAgfSBjYXRjaCB7CiAgICB9CiAgfSwgaUEgPSAoQSkgPT4gewogICAgdmFyIEIgPSBMLmxlbmd0aDsKICAgIEEgPj4+PSAwOwogICAgdmFyIHQgPSBRQSgpOwogICAgaWYgKEEgPiB0KQogICAgICByZXR1cm4gITE7CiAgICBmb3IgKHZhciBFID0gMTsgRSA8PSA0OyBFICo9IDIpIHsKICAgICAgdmFyIGkgPSBCICogKDEgKyAwLjIgLyBFKTsKICAgICAgaSA9IE1hdGgubWluKGksIEEgKyAxMDA2NjMyOTYpOwogICAgICB2YXIgbyA9IE1hdGgubWluKHQsIEVBKE1hdGgubWF4KEEsIGkpLCA2NTUzNikpLCBoID0gdEEobyk7CiAgICAgIGlmIChoKQogICAgICAgIHJldHVybiAhMDsKICAgIH0KICAgIHJldHVybiAhMTsKICB9LCBuID0gbmV3IFVpbnQ4QXJyYXkoMTIzKSwgZSA9IDI1OyBlID49IDA7IC0tZSkKICAgIG5bNDggKyBlXSA9IDUyICsgZSwgbls2NSArIGVdID0gZSwgbls5NyArIGVdID0gMjYgKyBlOwogIG5bNDNdID0gNjIsIG5bNDddID0gNjMsIEkubm9FeGl0UnVudGltZSAmJiBJLm5vRXhpdFJ1bnRpbWUsIEkucHJpbnQgJiYgSS5wcmludCwgSS5wcmludEVyciAmJiBJLnByaW50RXJyLCBJLndhc21CaW5hcnkgJiYgKE0gPSBJLndhc21CaW5hcnkpLCBJLmFyZ3VtZW50cyAmJiBJLmFyZ3VtZW50cywgSS50aGlzUHJvZ3JhbSAmJiBJLnRoaXNQcm9ncmFtOwogIGZ1bmN0aW9uIHJBKEEpIHsKICAgIEkuX3NvcnQgPSBBLmQsIEkuX21hbGxvYyA9IEEuZSwgSS5fZnJlZSA9IEEuZjsKICB9CiAgdmFyIG5BID0geyBhOiBpQSB9LCB5ID0gSUEoKTsKICBmdW5jdGlvbiBtKCkgewogICAgaWYgKHMgPiAwKSB7CiAgICAgIGYgPSBtOwogICAgICByZXR1cm47CiAgICB9CiAgICBpZiAoUCgpLCBzID4gMCkgewogICAgICBmID0gbTsKICAgICAgcmV0dXJuOwogICAgfQogICAgZnVuY3Rpb24gQSgpIHsKICAgICAgSS5jYWxsZWRSdW4gPSAhMCwgYigpLCBJLm9uUnVudGltZUluaXRpYWxpemVkPy4oKSwgVygpOwogICAgfQogICAgSS5zZXRTdGF0dXMgPyAoSS5zZXRTdGF0dXMoIlJ1bm5pbmcuLi4iKSwgc2V0VGltZW91dCgoKSA9PiB7CiAgICAgIHNldFRpbWVvdXQoKCkgPT4gSS5zZXRTdGF0dXMoIiIpLCAxKSwgQSgpOwogICAgfSwgMSkpIDogQSgpOwogIH0KICBmdW5jdGlvbiBhQSgpIHsKICAgIGlmIChJLnByZUluaXQpCiAgICAgIGZvciAodHlwZW9mIEkucHJlSW5pdCA9PSAiZnVuY3Rpb24iICYmIChJLnByZUluaXQgPSBbSS5wcmVJbml0XSk7IEkucHJlSW5pdC5sZW5ndGggPiAwOyApCiAgICAgICAgSS5wcmVJbml0LnNoaWZ0KCkoKTsKICB9CiAgcmV0dXJuIGFBKCksIG0oKSwgciA9IEksIHI7Cn07CmxldCBnLCBRLCBkLCBjLCBOLCB3LCBwLCBSLCBrLCBKLCBhID0gMCwgWSA9IDAsIEggPSBbXSwgRyA9ICEwLCBEID0gITEsIEYgPSAhMSwgSyA9ICExOwphc3luYyBmdW5jdGlvbiBvQSgpIHsKICBpZiAoIWcgJiYgKGcgPSBhd2FpdCBlQSgpLCAhZyB8fCAhZy5IRUFQRjMyIHx8ICFnLl9zb3J0KSkKICAgIHRocm93IG5ldyBFcnJvcigiV0FTTSBtb2R1bGUgZmFpbGVkIHRvIGluaXRpYWxpemUgcHJvcGVybHkiKTsKfQpjb25zdCBaID0gYXN5bmMgKCkgPT4gewogIGlmIChEKSB7CiAgICBGID0gITA7CiAgICByZXR1cm47CiAgfQogIEQgPSAhMCwgRiA9ICExLCBnIHx8IGF3YWl0IG9BKCk7CiAgY29uc3QgQyA9IE1hdGgucG93KDIsIE1hdGguY2VpbChNYXRoLmxvZzIoUS52ZXJ0ZXhDb3VudCkpKTsKICBhIDwgQyAmJiAoYSA+IDAgJiYgKGcuX2ZyZWUoZCksIGcuX2ZyZWUoTiksIGcuX2ZyZWUodyksIGcuX2ZyZWUocCksIGcuX2ZyZWUoUiksIGcuX2ZyZWUoayksIGcuX2ZyZWUoSikpLCBhID0gQywgZCA9IGcuX21hbGxvYygxNiAqIDQpLCBOID0gZy5fbWFsbG9jKGEgKiA0KSwgdyA9IGcuX21hbGxvYygzICogYSAqIDQpLCBwID0gZy5fbWFsbG9jKGEgKiA0KSwgUiA9IGcuX21hbGxvYyhhICogNCksIGsgPSBnLl9tYWxsb2MoYSAqIDQpLCBKID0gZy5fbWFsbG9jKGEgKiA0KSksIFkgPCBRLnRyYW5zZm9ybXMubGVuZ3RoICYmIChZID4gMCAmJiBnLl9mcmVlKGMpLCBZID0gUS50cmFuc2Zvcm1zLmxlbmd0aCwgYyA9IGcuX21hbGxvYyhZICogNCkpLCBEID0gITEsIEYgJiYgKEYgPSAhMSwgYXdhaXQgWigpKTsKfSwgc0EgPSAoKSA9PiB7CiAgaWYgKCEoRCB8fCBGIHx8ICFnIHx8ICFRKSkgewogICAgRCA9ICEwOwogICAgdHJ5IHsKICAgICAgY29uc3QgQyA9IGcuSEVBUEYzMiwgciA9IGcuSEVBUFUzMjsKICAgICAgaWYgKHcgLyA0ICsgUS5wb3NpdGlvbnMubGVuZ3RoID4gQy5sZW5ndGgpCiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCJQb3NpdGlvbnMgYnVmZmVyIG92ZXJmbG93Iik7CiAgICAgIGlmIChjIC8gNCArIFEudHJhbnNmb3Jtcy5sZW5ndGggPiBDLmxlbmd0aCkKICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIlRyYW5zZm9ybXMgYnVmZmVyIG92ZXJmbG93Iik7CiAgICAgIGlmIChOIC8gNCArIFEudHJhbnNmb3JtSW5kaWNlcy5sZW5ndGggPiByLmxlbmd0aCkKICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIlRyYW5zZm9ybSBpbmRpY2VzIGJ1ZmZlciBvdmVyZmxvdyIpOwogICAgICBpZiAoQy5zZXQoUS5wb3NpdGlvbnMsIHcgLyA0KSwgQy5zZXQoUS50cmFuc2Zvcm1zLCBjIC8gNCksIHIuc2V0KFEudHJhbnNmb3JtSW5kaWNlcywgTiAvIDQpLCBDLnNldChuZXcgRmxvYXQzMkFycmF5KEgpLCBkIC8gNCksIGcuX3NvcnQoCiAgICAgICAgZCwKICAgICAgICBjLAogICAgICAgIE4sCiAgICAgICAgUS52ZXJ0ZXhDb3VudCwKICAgICAgICB3LAogICAgICAgIHAsCiAgICAgICAgUiwKICAgICAgICBrLAogICAgICAgIEoKICAgICAgKSwgUiArIFEudmVydGV4Q291bnQgKiA0ID4gci5idWZmZXIuYnl0ZUxlbmd0aCkKICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIkRlcHRoIGluZGV4IGJ1ZmZlciBvdmVyZmxvdyIpOwogICAgICBjb25zdCBJID0gbmV3IFVpbnQzMkFycmF5KHIuYnVmZmVyLCBSLCBRLnZlcnRleENvdW50KSwgbCA9IG5ldyBVaW50MzJBcnJheShJLnNsaWNlKCkuYnVmZmVyKTsKICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7IGRlcHRoSW5kZXg6IGwgfSwgW2wuYnVmZmVyXSk7CiAgICB9IGNhdGNoIHsKICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7IGRlcHRoSW5kZXg6IG5ldyBVaW50MzJBcnJheSgwKSB9LCBbXSk7CiAgICB9CiAgICBEID0gITEsIEcgPSAhMTsKICB9Cn0sIFggPSAoKSA9PiB7CiAgSyB8fCAoSyA9ICEwLCBHICYmIHNBKCksIHNldFRpbWVvdXQoKCkgPT4gewogICAgSyA9ICExLCBYKCk7CiAgfSkpOwp9OwpzZWxmLm9ubWVzc2FnZSA9IChDKSA9PiB7CiAgQy5kYXRhLnNvcnREYXRhICYmIChRID8gKFEucG9zaXRpb25zLnNldChDLmRhdGEuc29ydERhdGEucG9zaXRpb25zKSwgUS50cmFuc2Zvcm1zLnNldChDLmRhdGEuc29ydERhdGEudHJhbnNmb3JtcyksIFEudHJhbnNmb3JtSW5kaWNlcy5zZXQoQy5kYXRhLnNvcnREYXRhLnRyYW5zZm9ybUluZGljZXMpLCBRLnZlcnRleENvdW50ID0gQy5kYXRhLnNvcnREYXRhLnZlcnRleENvdW50KSA6IFEgPSB7CiAgICBwb3NpdGlvbnM6IG5ldyBGbG9hdDMyQXJyYXkoQy5kYXRhLnNvcnREYXRhLnBvc2l0aW9ucyksCiAgICB0cmFuc2Zvcm1zOiBuZXcgRmxvYXQzMkFycmF5KEMuZGF0YS5zb3J0RGF0YS50cmFuc2Zvcm1zKSwKICAgIHRyYW5zZm9ybUluZGljZXM6IG5ldyBVaW50MzJBcnJheShDLmRhdGEuc29ydERhdGEudHJhbnNmb3JtSW5kaWNlcyksCiAgICB2ZXJ0ZXhDb3VudDogQy5kYXRhLnNvcnREYXRhLnZlcnRleENvdW50CiAgfSwgRyA9ICEwLCBaKCkpLCBDLmRhdGEudmlld1Byb2ogJiYgKEMuZGF0YS52aWV3UHJvai5ldmVyeSgocikgPT4gSC5pbmNsdWRlcyhyKSkgPT09ICExICYmIChIID0gQy5kYXRhLnZpZXdQcm9qLCBHID0gITApLCBYKCkpOwp9OwovLyMgc291cmNlTWFwcGluZ1VSTD1Tb3J0V29ya2VyLURRTDdVVEVoLmpzLm1hcAo=",RA=s=>Uint8Array.from(atob(s),e=>e.charCodeAt(0)),oh=typeof self<"u"&&self.Blob&&new Blob(["URL.revokeObjectURL(import.meta.url);",RA(ah)],{type:"text/javascript;charset=utf-8"});function BA(s){let e;try{if(e=oh&&(self.URL||self.webkitURL).createObjectURL(oh),!e)throw"";const t=new Worker(e,{type:"module",name:s==null?void 0:s.name});return t.addEventListener("error",()=>{(self.URL||self.webkitURL).revokeObjectURL(e)}),t}catch{return new Worker("data:text/javascript;base64,"+ah,{type:"module",name:s==null?void 0:s.name})}}class tl{constructor(e,t){this._scene=null,this._camera=null,this._started=!1,this._initialized=!1,this._renderer=e;const i=e.gl;this._program=i.createProgram(),this._passes=t||[];const n=i.createShader(i.VERTEX_SHADER);i.shaderSource(n,this._getVertexSource()),i.compileShader(n),i.getShaderParameter(n,i.COMPILE_STATUS)||console.error(i.getShaderInfoLog(n));const r=i.createShader(i.FRAGMENT_SHADER);i.shaderSource(r,this._getFragmentSource()),i.compileShader(r),i.getShaderParameter(r,i.COMPILE_STATUS)||console.error(i.getShaderInfoLog(r)),i.attachShader(this.program,n),i.attachShader(this.program,r),i.linkProgram(this.program),i.getProgramParameter(this.program,i.LINK_STATUS)||console.error(i.getProgramInfoLog(this.program)),this.resize=()=>{i.useProgram(this._program),this._resize()},this.initialize=()=>{console.assert(!this._initialized,"ShaderProgram already initialized"),i.useProgram(this._program),this._initialize();for(const a of this.passes)a.initialize(this);this._initialized=!0,this._started=!0},this.render=(a,o)=>{i.useProgram(this._program),(this._scene!==a||this._camera!==o)&&(this.dispose(),this._scene=a,this._camera=o,this.initialize());for(const c of this.passes)c.render();this._render()},this.dispose=()=>{if(this._initialized){i.useProgram(this._program);for(const a of this.passes)a.dispose();this._dispose(),this._scene=null,this._camera=null,this._initialized=!1}}}get renderer(){return this._renderer}get scene(){return this._scene}get camera(){return this._camera}get program(){return this._program}get passes(){return this._passes}get started(){return this._started}}const lh="dmFyIG9BID0gZnVuY3Rpb24oQyA9IHt9KSB7CiAgdmFyIGUsIEEgPSBDLCBoID0gaW1wb3J0Lm1ldGEudXJsLCBrID0gIiIsIHk7CiAgewogICAgdHJ5IHsKICAgICAgayA9IG5ldyBVUkwoIi4iLCBoKS5ocmVmOwogICAgfSBjYXRjaCB7CiAgICB9CiAgICB5ID0gKGcpID0+IHsKICAgICAgdmFyIEIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsKICAgICAgcmV0dXJuIEIub3BlbigiR0VUIiwgZywgITEpLCBCLnJlc3BvbnNlVHlwZSA9ICJhcnJheWJ1ZmZlciIsIEIuc2VuZChudWxsKSwgbmV3IFVpbnQ4QXJyYXkoQi5yZXNwb25zZSk7CiAgICB9OwogIH0KICBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpLCBjb25zb2xlLmVycm9yLmJpbmQoY29uc29sZSk7CiAgdmFyIEYsIEQsIE47CiAgZnVuY3Rpb24gVSgpIHsKICAgIHZhciBnID0gRC5idWZmZXI7CiAgICBBLkhFQVBVOCA9IE4gPSBuZXcgVWludDhBcnJheShnKSwgQS5IRUFQVTMyID0gbmV3IFVpbnQzMkFycmF5KGcpLCBBLkhFQVBGMzIgPSBuZXcgRmxvYXQzMkFycmF5KGcpLCBuZXcgQmlnSW50NjRBcnJheShnKSwgbmV3IEJpZ1VpbnQ2NEFycmF5KGcpOwogIH0KICBmdW5jdGlvbiBpKCkgewogICAgaWYgKEEucHJlUnVuKQogICAgICBmb3IgKHR5cGVvZiBBLnByZVJ1biA9PSAiZnVuY3Rpb24iICYmIChBLnByZVJ1biA9IFtBLnByZVJ1bl0pOyBBLnByZVJ1bi5sZW5ndGg7ICkKICAgICAgICAkKEEucHJlUnVuLnNoaWZ0KCkpOwogICAgeChUKTsKICB9CiAgZnVuY3Rpb24gSCgpIHsKICAgIGYuYygpOwogIH0KICBmdW5jdGlvbiBiKCkgewogICAgaWYgKEEucG9zdFJ1bikKICAgICAgZm9yICh0eXBlb2YgQS5wb3N0UnVuID09ICJmdW5jdGlvbiIgJiYgKEEucG9zdFJ1biA9IFtBLnBvc3RSdW5dKTsgQS5wb3N0UnVuLmxlbmd0aDsgKQogICAgICAgIE8oQS5wb3N0UnVuLnNoaWZ0KCkpOwogICAgeChqKTsKICB9CiAgdmFyIHMgPSAwLCB3ID0gbnVsbDsKICBmdW5jdGlvbiB2KGcpIHsKICAgIHMrKywgQS5tb25pdG9yUnVuRGVwZW5kZW5jaWVzPy4ocyk7CiAgfQogIGZ1bmN0aW9uIFAoZykgewogICAgaWYgKHMtLSwgQS5tb25pdG9yUnVuRGVwZW5kZW5jaWVzPy4ocyksIHMgPT0gMCAmJiB3KSB7CiAgICAgIHZhciBCID0gdzsKICAgICAgdyA9IG51bGwsIEIoKTsKICAgIH0KICB9CiAgdmFyIG07CiAgZnVuY3Rpb24gWCgpIHsKICAgIHJldHVybiBBQSgiQUdGemJRRUFBQUFCSmdaZ0FYOEJmMkFDZlgwQmYyQUJmUUYvWUFGL0FHQUxmMzkvZjM5L2YzOS9mMzhBWUFBQUFnY0JBV0VCWVFBQUF3Z0hBQUVDQXdBRUJRVUhBUUdDQW9DQUFnWUlBWDhCUVlDTUJBc0hGUVVCWWdJQUFXTUFCd0ZrQUFZQlpRQUZBV1lBQkF3QkFRcXFRQWRQQVFKL1FZQUlLQUlBSWdFZ0FFRUhha0Y0Y1NJQ2FpRUFBa0FnQWtFQUlBQWdBVTBiUlFSQUlBQS9BRUVRZEUwTkFTQUFFQUFOQVF0QmhBaEJNRFlDQUVGL0R3dEJnQWdnQURZQ0FDQUJDdzRBSUFBUUF5QUJFQU5CRUhSeUMzSUJCSDhnQUx3aUJFSC8vLzhEY1NFQkFrQWdCRUVYZGtIL0FYRWlBa1VOQUNBQ1FmQUFUUVJBSUFGQmdJQ0FCSEpCOFFBZ0FtdDJJUUVNQVFzZ0FrR05BVXNFUUVHQStBRWhBMEVBSVFFTUFRc2dBa0VLZEVHQWdBZHJJUU1MSUFNZ0JFRVFka0dBZ0FKeGNpQUJRUTEyY2d2Y0N3RUlmd0pBSUFCRkRRQWdBRUVJYXlJRElBQkJCR3NvQWdBaUFrRjRjU0lBYWlFRkFrQWdBa0VCY1EwQUlBSkJBbkZGRFFFZ0F5QURLQUlBSWdScklnTkJtQWdvQWdCSkRRRWdBQ0FFYWlFQUFrQUNRQUpBUVp3SUtBSUFJQU5IQkVBZ0F5Z0NEQ0VCSUFSQi93Rk5CRUFnQVNBREtBSUlJZ0pIRFFKQmlBaEJpQWdvQWdCQmZpQUVRUU4yZDNFMkFnQU1CUXNnQXlnQ0dDRUhJQUVnQTBjRVFDQURLQUlJSWdJZ0FUWUNEQ0FCSUFJMkFnZ01CQXNnQXlnQ0ZDSUNCSDhnQTBFVWFnVWdBeWdDRUNJQ1JRMERJQU5CRUdvTElRUURRQ0FFSVFZZ0FpSUJRUlJxSVFRZ0FTZ0NGQ0lDRFFBZ0FVRVFhaUVFSUFFb0FoQWlBZzBBQ3lBR1FRQTJBZ0FNQXdzZ0JTZ0NCQ0lDUVFOeFFRTkhEUU5Ca0FnZ0FEWUNBQ0FGSUFKQmZuRTJBZ1FnQXlBQVFRRnlOZ0lFSUFVZ0FEWUNBQThMSUFJZ0FUWUNEQ0FCSUFJMkFnZ01BZ3RCQUNFQkN5QUhSUTBBQWtBZ0F5Z0NIQ0lFUVFKMFFiZ0thaUlDS0FJQUlBTkdCRUFnQWlBQk5nSUFJQUVOQVVHTUNFR01DQ2dDQUVGK0lBUjNjVFlDQUF3Q0N3SkFJQU1nQnlnQ0VFWUVRQ0FISUFFMkFoQU1BUXNnQnlBQk5nSVVDeUFCUlEwQkN5QUJJQWMyQWhnZ0F5Z0NFQ0lDQkVBZ0FTQUNOZ0lRSUFJZ0FUWUNHQXNnQXlnQ0ZDSUNSUTBBSUFFZ0FqWUNGQ0FDSUFFMkFoZ0xJQU1nQlU4TkFDQUZLQUlFSWdSQkFYRkZEUUFDUUFKQUFrQUNRQ0FFUVFKeFJRUkFRYUFJS0FJQUlBVkdCRUJCb0FnZ0F6WUNBRUdVQ0VHVUNDZ0NBQ0FBYWlJQU5nSUFJQU1nQUVFQmNqWUNCQ0FEUVp3SUtBSUFSdzBHUVpBSVFRQTJBZ0JCbkFoQkFEWUNBQThMUVp3SUtBSUFJZ2NnQlVZRVFFR2NDQ0FETmdJQVFaQUlRWkFJS0FJQUlBQnFJZ0EyQWdBZ0F5QUFRUUZ5TmdJRUlBQWdBMm9nQURZQ0FBOExJQVJCZUhFZ0FHb2hBQ0FGS0FJTUlRRWdCRUgvQVUwRVFDQUZLQUlJSWdJZ0FVWUVRRUdJQ0VHSUNDZ0NBRUYrSUFSQkEzWjNjVFlDQUF3RkN5QUNJQUUyQWd3Z0FTQUNOZ0lJREFRTElBVW9BaGdoQ0NBQklBVkhCRUFnQlNnQ0NDSUNJQUUyQWd3Z0FTQUNOZ0lJREFNTElBVW9BaFFpQWdSL0lBVkJGR29GSUFVb0FoQWlBa1VOQWlBRlFSQnFDeUVFQTBBZ0JDRUdJQUlpQVVFVWFpRUVJQUVvQWhRaUFnMEFJQUZCRUdvaEJDQUJLQUlRSWdJTkFBc2dCa0VBTmdJQURBSUxJQVVnQkVGK2NUWUNCQ0FESUFCQkFYSTJBZ1FnQUNBRGFpQUFOZ0lBREFNTFFRQWhBUXNnQ0VVTkFBSkFJQVVvQWh3aUJFRUNkRUc0Q21vaUFpZ0NBQ0FGUmdSQUlBSWdBVFlDQUNBQkRRRkJqQWhCakFnb0FnQkJmaUFFZDNFMkFnQU1BZ3NDUUNBRklBZ29BaEJHQkVBZ0NDQUJOZ0lRREFFTElBZ2dBVFlDRkFzZ0FVVU5BUXNnQVNBSU5nSVlJQVVvQWhBaUFnUkFJQUVnQWpZQ0VDQUNJQUUyQWhnTElBVW9BaFFpQWtVTkFDQUJJQUkyQWhRZ0FpQUJOZ0lZQ3lBRElBQkJBWEkyQWdRZ0FDQURhaUFBTmdJQUlBTWdCMGNOQUVHUUNDQUFOZ0lBRHdzZ0FFSC9BVTBFUUNBQVFYaHhRYkFJYWlFQ0FuOUJpQWdvQWdBaUJFRUJJQUJCQTNaMElnQnhSUVJBUVlnSUlBQWdCSEkyQWdBZ0Fnd0JDeUFDS0FJSUN5RUFJQUlnQXpZQ0NDQUFJQU0yQWd3Z0F5QUNOZ0lNSUFNZ0FEWUNDQThMUVI4aEFTQUFRZi8vL3dkTkJFQWdBRUVtSUFCQkNIWm5JZ0pyZGtFQmNTQUNRUUYwYTBFK2FpRUJDeUFESUFFMkFod2dBMElBTndJUUlBRkJBblJCdUFwcUlRUUNmd0pBQW45QmpBZ29BZ0FpQmtFQklBRjBJZ0p4UlFSQVFZd0lJQUlnQm5JMkFnQWdCQ0FETmdJQVFSZ2hBVUVJREFFTElBQkJHU0FCUVFGMmEwRUFJQUZCSDBjYmRDRUJJQVFvQWdBaEJBTkFJQVFpQWlnQ0JFRjRjU0FBUmcwQ0lBRkJIWFloQkNBQlFRRjBJUUVnQWlBRVFRUnhhaUlHS0FJUUlnUU5BQXNnQmlBRE5nSVFRUmdoQVNBQ0lRUkJDQXNoQUNBRElnSU1BUXNnQWlnQ0NDSUVJQU0yQWd3Z0FpQUROZ0lJUVJnaEFFRUlJUUZCQUFzaEJpQUJJQU5xSUFRMkFnQWdBeUFDTmdJTUlBQWdBMm9nQmpZQ0FFR29DRUdvQ0NnQ0FFRUJheUlBUVg4Z0FCczJBZ0FMQzlFbkFRdC9Jd0JCRUdzaUNpUUFBa0FDUUFKQUFrQUNRQUpBQWtBQ1FBSkFBa0FnQUVIMEFVMEVRRUdJQ0NnQ0FDSUVRUkFnQUVFTGFrSDRBM0VnQUVFTFNSc2lCa0VEZGlJQWRpSUJRUU54QkVBQ1FDQUJRWDl6UVFGeElBQnFJZ0pCQTNRaUFVR3dDR29pQUNBQlFiZ0lhaWdDQUNJQktBSUlJZ1ZHQkVCQmlBZ2dCRUYrSUFKM2NUWUNBQXdCQ3lBRklBQTJBZ3dnQUNBRk5nSUlDeUFCUVFocUlRQWdBU0FDUVFOMElnSkJBM0kyQWdRZ0FTQUNhaUlCSUFFb0FnUkJBWEkyQWdRTUN3c2dCa0dRQ0NnQ0FDSUlUUTBCSUFFRVFBSkFRUUlnQUhRaUFrRUFJQUpyY2lBQklBQjBjV2dpQVVFRGRDSUFRYkFJYWlJQ0lBQkJ1QWhxS0FJQUlnQW9BZ2dpQlVZRVFFR0lDQ0FFUVg0Z0FYZHhJZ1EyQWdBTUFRc2dCU0FDTmdJTUlBSWdCVFlDQ0FzZ0FDQUdRUU55TmdJRUlBQWdCbW9pQnlBQlFRTjBJZ0VnQm1zaUJVRUJjallDQkNBQUlBRnFJQVUyQWdBZ0NBUkFJQWhCZUhGQnNBaHFJUUZCbkFnb0FnQWhBZ0ovSUFSQkFTQUlRUU4yZENJRGNVVUVRRUdJQ0NBRElBUnlOZ0lBSUFFTUFRc2dBU2dDQ0FzaEF5QUJJQUkyQWdnZ0F5QUNOZ0lNSUFJZ0FUWUNEQ0FDSUFNMkFnZ0xJQUJCQ0dvaEFFR2NDQ0FITmdJQVFaQUlJQVUyQWdBTUN3dEJqQWdvQWdBaUMwVU5BU0FMYUVFQ2RFRzRDbW9vQWdBaUFpZ0NCRUY0Y1NBR2F5RURJQUloQVFOQUFrQWdBU2dDRUNJQVJRUkFJQUVvQWhRaUFFVU5BUXNnQUNnQ0JFRjRjU0FHYXlJQklBTWdBU0FEU1NJQkd5RURJQUFnQWlBQkd5RUNJQUFoQVF3QkN3c2dBaWdDR0NFSklBSWdBaWdDRENJQVJ3UkFJQUlvQWdnaUFTQUFOZ0lNSUFBZ0FUWUNDQXdLQ3lBQ0tBSVVJZ0VFZnlBQ1FSUnFCU0FDS0FJUUlnRkZEUU1nQWtFUWFnc2hCUU5BSUFVaEJ5QUJJZ0JCRkdvaEJTQUFLQUlVSWdFTkFDQUFRUkJxSVFVZ0FDZ0NFQ0lCRFFBTElBZEJBRFlDQUF3SkMwRi9JUVlnQUVHL2Ywc05BQ0FBUVF0cUlnRkJlSEVoQmtHTUNDZ0NBQ0lIUlEwQVFSOGhDRUVBSUFacklRTWdBRUgwLy84SFRRUkFJQVpCSmlBQlFRaDJaeUlBYTNaQkFYRWdBRUVCZEd0QlBtb2hDQXNDUUFKQUFrQWdDRUVDZEVHNENtb29BZ0FpQVVVRVFFRUFJUUFNQVF0QkFDRUFJQVpCR1NBSVFRRjJhMEVBSUFoQkgwY2JkQ0VDQTBBQ1FDQUJLQUlFUVhoeElBWnJJZ1FnQTA4TkFDQUJJUVVnQkNJRERRQkJBQ0VESUFFaEFBd0RDeUFBSUFFb0FoUWlCQ0FFSUFFZ0FrRWRka0VFY1dvb0FoQWlBVVliSUFBZ0JCc2hBQ0FDUVFGMElRSWdBUTBBQ3dzZ0FDQUZja1VFUUVFQUlRVkJBaUFJZENJQVFRQWdBR3R5SUFkeElnQkZEUU1nQUdoQkFuUkJ1QXBxS0FJQUlRQUxJQUJGRFFFTEEwQWdBQ2dDQkVGNGNTQUdheUlDSUFOSklRRWdBaUFESUFFYklRTWdBQ0FGSUFFYklRVWdBQ2dDRUNJQkJIOGdBUVVnQUNnQ0ZBc2lBQTBBQ3dzZ0JVVU5BQ0FEUVpBSUtBSUFJQVpyVHcwQUlBVW9BaGdoQ0NBRklBVW9BZ3dpQUVjRVFDQUZLQUlJSWdFZ0FEWUNEQ0FBSUFFMkFnZ01DQXNnQlNnQ0ZDSUJCSDhnQlVFVWFnVWdCU2dDRUNJQlJRMERJQVZCRUdvTElRSURRQ0FDSVFRZ0FTSUFRUlJxSVFJZ0FDZ0NGQ0lCRFFBZ0FFRVFhaUVDSUFBb0FoQWlBUTBBQ3lBRVFRQTJBZ0FNQndzZ0JrR1FDQ2dDQUNJRlRRUkFRWndJS0FJQUlRQUNRQ0FGSUFacklnRkJFRThFUUNBQUlBWnFJZ0lnQVVFQmNqWUNCQ0FBSUFWcUlBRTJBZ0FnQUNBR1FRTnlOZ0lFREFFTElBQWdCVUVEY2pZQ0JDQUFJQVZxSWdFZ0FTZ0NCRUVCY2pZQ0JFRUFJUUpCQUNFQkMwR1FDQ0FCTmdJQVFad0lJQUkyQWdBZ0FFRUlhaUVBREFrTElBWkJsQWdvQWdBaUFra0VRRUdVQ0NBQ0lBWnJJZ0UyQWdCQm9BaEJvQWdvQWdBaUFDQUdhaUlDTmdJQUlBSWdBVUVCY2pZQ0JDQUFJQVpCQTNJMkFnUWdBRUVJYWlFQURBa0xRUUFoQUNBR1FTOXFJZ01DZjBIZ0N5Z0NBQVJBUWVnTEtBSUFEQUVMUWV3TFFuODNBZ0JCNUF0Q2dLQ0FnSUNBQkRjQ0FFSGdDeUFLUVF4cVFYQnhRZGlxMWFvRmN6WUNBRUgwQzBFQU5nSUFRY1FMUVFBMkFnQkJnQ0FMSWdGcUlnUkJBQ0FCYXlJSGNTSUJJQVpORFFoQndBc29BZ0FpQlFSQVFiZ0xLQUlBSWdnZ0FXb2lDU0FJVFNBRklBbEpjZzBKQ3dKQVFjUUxMUUFBUVFSeFJRUkFBa0FDUUFKQUFrQkJvQWdvQWdBaUJRUkFRY2dMSVFBRFFDQUFLQUlBSWdnZ0JVMEVRQ0FGSUFnZ0FDZ0NCR3BKRFFNTElBQW9BZ2dpQUEwQUN3dEJBQkFCSWdKQmYwWU5BeUFCSVFSQjVBc29BZ0FpQUVFQmF5SUZJQUp4QkVBZ0FTQUNheUFDSUFWcVFRQWdBR3R4YWlFRUN5QUVJQVpORFFOQndBc29BZ0FpQUFSQVFiZ0xLQUlBSWdVZ0JHb2lCeUFGVFNBQUlBZEpjZzBFQ3lBRUVBRWlBQ0FDUncwQkRBVUxJQVFnQW1zZ0IzRWlCQkFCSWdJZ0FDZ0NBQ0FBS0FJRWFrWU5BU0FDSVFBTElBQkJmMFlOQVNBR1FUQnFJQVJOQkVBZ0FDRUNEQVFMUWVnTEtBSUFJZ0lnQXlBRWEycEJBQ0FDYTNFaUFoQUJRWDlHRFFFZ0FpQUVhaUVFSUFBaEFnd0RDeUFDUVg5SERRSUxRY1FMUWNRTEtBSUFRUVJ5TmdJQUN5QUJFQUVpQWtGL1JrRUFFQUVpQUVGL1JuSWdBQ0FDVFhJTkJTQUFJQUpySWdRZ0JrRW9hazBOQlF0QnVBdEJ1QXNvQWdBZ0JHb2lBRFlDQUVHOEN5Z0NBQ0FBU1FSQVFid0xJQUEyQWdBTEFrQkJvQWdvQWdBaUF3UkFRY2dMSVFBRFFDQUNJQUFvQWdBaUFTQUFLQUlFSWdWcVJnMENJQUFvQWdnaUFBMEFDd3dFQzBHWUNDZ0NBQ0lBUVFBZ0FDQUNUUnRGQkVCQm1BZ2dBallDQUF0QkFDRUFRY3dMSUFRMkFnQkJ5QXNnQWpZQ0FFR29DRUYvTmdJQVFhd0lRZUFMS0FJQU5nSUFRZFFMUVFBMkFnQURRQ0FBUVFOMElnRkJ1QWhxSUFGQnNBaHFJZ1UyQWdBZ0FVRzhDR29nQlRZQ0FDQUFRUUZxSWdCQklFY05BQXRCbEFnZ0JFRW9heUlBUVhnZ0FtdEJCM0VpQVdzaUJUWUNBRUdnQ0NBQklBSnFJZ0UyQWdBZ0FTQUZRUUZ5TmdJRUlBQWdBbXBCS0RZQ0JFR2tDRUh3Q3lnQ0FEWUNBQXdFQ3lBQ0lBTk5JQUVnQTB0eURRSWdBQ2dDREVFSWNRMENJQUFnQkNBRmFqWUNCRUdnQ0NBRFFYZ2dBMnRCQjNFaUFHb2lBVFlDQUVHVUNFR1VDQ2dDQUNBRWFpSUNJQUJySWdBMkFnQWdBU0FBUVFGeU5nSUVJQUlnQTJwQktEWUNCRUdrQ0VId0N5Z0NBRFlDQUF3REMwRUFJUUFNQmd0QkFDRUFEQVFMUVpnSUtBSUFJQUpMQkVCQm1BZ2dBallDQUFzZ0FpQUVhaUVGUWNnTElRQUNRQU5BSUFVZ0FDZ0NBQ0lCUndSQUlBQW9BZ2dpQUEwQkRBSUxDeUFBTFFBTVFRaHhSUTBEQzBISUN5RUFBMEFDUUNBQUtBSUFJZ0VnQTAwRVFDQURJQUVnQUNnQ0JHb2lCVWtOQVFzZ0FDZ0NDQ0VBREFFTEMwR1VDQ0FFUVNocklnQkJlQ0FDYTBFSGNTSUJheUlITmdJQVFhQUlJQUVnQW1vaUFUWUNBQ0FCSUFkQkFYSTJBZ1FnQUNBQ2FrRW9OZ0lFUWFRSVFmQUxLQUlBTmdJQUlBTWdCVUVuSUFWclFRZHhha0V2YXlJQUlBQWdBMEVRYWtrYklnRkJHellDQkNBQlFkQUxLUUlBTndJUUlBRkJ5QXNwQWdBM0FnaEIwQXNnQVVFSWFqWUNBRUhNQ3lBRU5nSUFRY2dMSUFJMkFnQkIxQXRCQURZQ0FDQUJRUmhxSVFBRFFDQUFRUWMyQWdRZ0FFRUlhaUFBUVFScUlRQWdCVWtOQUFzZ0FTQURSZzBBSUFFZ0FTZ0NCRUYrY1RZQ0JDQURJQUVnQTJzaUFrRUJjallDQkNBQklBSTJBZ0FDZnlBQ1FmOEJUUVJBSUFKQmVIRkJzQWhxSVFBQ2YwR0lDQ2dDQUNJQlFRRWdBa0VEZG5RaUFuRkZCRUJCaUFnZ0FTQUNjallDQUNBQURBRUxJQUFvQWdnTElRRWdBQ0FETmdJSUlBRWdBellDREVFTUlRSkJDQXdCQzBFZklRQWdBa0gvLy84SFRRUkFJQUpCSmlBQ1FRaDJaeUlBYTNaQkFYRWdBRUVCZEd0QlBtb2hBQXNnQXlBQU5nSWNJQU5DQURjQ0VDQUFRUUowUWJnS2FpRUJBa0FDUUVHTUNDZ0NBQ0lGUVFFZ0FIUWlCSEZGQkVCQmpBZ2dCQ0FGY2pZQ0FDQUJJQU0yQWdBTUFRc2dBa0VaSUFCQkFYWnJRUUFnQUVFZlJ4dDBJUUFnQVNnQ0FDRUZBMEFnQlNJQktBSUVRWGh4SUFKR0RRSWdBRUVkZGlFRklBQkJBWFFoQUNBQklBVkJCSEZxSWdRb0FoQWlCUTBBQ3lBRUlBTTJBaEFMSUFNZ0FUWUNHRUVJSVFJZ0F5SUJJUUJCREF3QkN5QUJLQUlJSWdBZ0F6WUNEQ0FCSUFNMkFnZ2dBeUFBTmdJSVFRQWhBRUVZSVFKQkRBc2dBMm9nQVRZQ0FDQUNJQU5xSUFBMkFnQUxRWlFJS0FJQUlnQWdCazBOQUVHVUNDQUFJQVpySWdFMkFnQkJvQWhCb0Fnb0FnQWlBQ0FHYWlJQ05nSUFJQUlnQVVFQmNqWUNCQ0FBSUFaQkEzSTJBZ1FnQUVFSWFpRUFEQVFMUVlRSVFUQTJBZ0JCQUNFQURBTUxJQUFnQWpZQ0FDQUFJQUFvQWdRZ0JHbzJBZ1FnQWtGNElBSnJRUWR4YWlJSUlBWkJBM0kyQWdRZ0FVRjRJQUZyUVFkeGFpSUVJQVlnQ0dvaUEyc2hCd0pBUWFBSUtBSUFJQVJHQkVCQm9BZ2dBellDQUVHVUNFR1VDQ2dDQUNBSGFpSUFOZ0lBSUFNZ0FFRUJjallDQkF3QkMwR2NDQ2dDQUNBRVJnUkFRWndJSUFNMkFnQkJrQWhCa0Fnb0FnQWdCMm9pQURZQ0FDQURJQUJCQVhJMkFnUWdBQ0FEYWlBQU5nSUFEQUVMSUFRb0FnUWlBRUVEY1VFQlJnUkFJQUJCZUhFaENTQUVLQUlNSVFJQ1FDQUFRZjhCVFFSQUlBUW9BZ2dpQVNBQ1JnUkFRWWdJUVlnSUtBSUFRWDRnQUVFRGRuZHhOZ0lBREFJTElBRWdBallDRENBQ0lBRTJBZ2dNQVFzZ0JDZ0NHQ0VHQWtBZ0FpQUVSd1JBSUFRb0FnZ2lBQ0FDTmdJTUlBSWdBRFlDQ0F3QkN3SkFJQVFvQWhRaUFBUi9JQVJCRkdvRklBUW9BaEFpQUVVTkFTQUVRUkJxQ3lFQkEwQWdBU0VGSUFBaUFrRVVhaUVCSUFBb0FoUWlBQTBBSUFKQkVHb2hBU0FDS0FJUUlnQU5BQXNnQlVFQU5nSUFEQUVMUVFBaEFnc2dCa1VOQUFKQUlBUW9BaHdpQUVFQ2RFRzRDbW9pQVNnQ0FDQUVSZ1JBSUFFZ0FqWUNBQ0FDRFFGQmpBaEJqQWdvQWdCQmZpQUFkM0UyQWdBTUFnc0NRQ0FFSUFZb0FoQkdCRUFnQmlBQ05nSVFEQUVMSUFZZ0FqWUNGQXNnQWtVTkFRc2dBaUFHTmdJWUlBUW9BaEFpQUFSQUlBSWdBRFlDRUNBQUlBSTJBaGdMSUFRb0FoUWlBRVVOQUNBQ0lBQTJBaFFnQUNBQ05nSVlDeUFISUFscUlRY2dCQ0FKYWlJRUtBSUVJUUFMSUFRZ0FFRitjVFlDQkNBRElBZEJBWEkyQWdRZ0F5QUhhaUFITmdJQUlBZEIvd0ZOQkVBZ0IwRjRjVUd3Q0dvaEFBSi9RWWdJS0FJQUlnRkJBU0FIUVFOMmRDSUNjVVVFUUVHSUNDQUJJQUp5TmdJQUlBQU1BUXNnQUNnQ0NBc2hBU0FBSUFNMkFnZ2dBU0FETmdJTUlBTWdBRFlDRENBRElBRTJBZ2dNQVF0Qkh5RUNJQWRCLy8vL0IwMEVRQ0FIUVNZZ0IwRUlkbWNpQUd0MlFRRnhJQUJCQVhSclFUNXFJUUlMSUFNZ0FqWUNIQ0FEUWdBM0FoQWdBa0VDZEVHNENtb2hBQUpBQWtCQmpBZ29BZ0FpQVVFQklBSjBJZ1Z4UlFSQVFZd0lJQUVnQlhJMkFnQWdBQ0FETmdJQURBRUxJQWRCR1NBQ1FRRjJhMEVBSUFKQkgwY2JkQ0VDSUFBb0FnQWhBUU5BSUFFaUFDZ0NCRUY0Y1NBSFJnMENJQUpCSFhZaEFTQUNRUUYwSVFJZ0FDQUJRUVJ4YWlJRktBSVFJZ0VOQUFzZ0JTQUROZ0lRQ3lBRElBQTJBaGdnQXlBRE5nSU1JQU1nQXpZQ0NBd0JDeUFBS0FJSUlnRWdBellDRENBQUlBTTJBZ2dnQTBFQU5nSVlJQU1nQURZQ0RDQURJQUUyQWdnTElBaEJDR29oQUF3Q0N3SkFJQWhGRFFBQ1FDQUZLQUljSWdGQkFuUkJ1QXBxSWdJb0FnQWdCVVlFUUNBQ0lBQTJBZ0FnQUEwQlFZd0lJQWRCZmlBQmQzRWlCellDQUF3Q0N3SkFJQVVnQ0NnQ0VFWUVRQ0FJSUFBMkFoQU1BUXNnQ0NBQU5nSVVDeUFBUlEwQkN5QUFJQWcyQWhnZ0JTZ0NFQ0lCQkVBZ0FDQUJOZ0lRSUFFZ0FEWUNHQXNnQlNnQ0ZDSUJSUTBBSUFBZ0FUWUNGQ0FCSUFBMkFoZ0xBa0FnQTBFUFRRUkFJQVVnQXlBR2FpSUFRUU55TmdJRUlBQWdCV29pQUNBQUtBSUVRUUZ5TmdJRURBRUxJQVVnQmtFRGNqWUNCQ0FGSUFacUlnUWdBMEVCY2pZQ0JDQURJQVJxSUFNMkFnQWdBMEgvQVUwRVFDQURRWGh4UWJBSWFpRUFBbjlCaUFnb0FnQWlBVUVCSUFOQkEzWjBJZ0p4UlFSQVFZZ0lJQUVnQW5JMkFnQWdBQXdCQ3lBQUtBSUlDeUVCSUFBZ0JEWUNDQ0FCSUFRMkFnd2dCQ0FBTmdJTUlBUWdBVFlDQ0F3QkMwRWZJUUFnQTBILy8vOEhUUVJBSUFOQkppQURRUWgyWnlJQWEzWkJBWEVnQUVFQmRHdEJQbW9oQUFzZ0JDQUFOZ0ljSUFSQ0FEY0NFQ0FBUVFKMFFiZ0thaUVCQWtBQ1FDQUhRUUVnQUhRaUFuRkZCRUJCakFnZ0FpQUhjallDQUNBQklBUTJBZ0FnQkNBQk5nSVlEQUVMSUFOQkdTQUFRUUYyYTBFQUlBQkJIMGNiZENFQUlBRW9BZ0FoQVFOQUlBRWlBaWdDQkVGNGNTQURSZzBDSUFCQkhYWWhBU0FBUVFGMElRQWdBaUFCUVFSeGFpSUhLQUlRSWdFTkFBc2dCeUFFTmdJUUlBUWdBallDR0FzZ0JDQUVOZ0lNSUFRZ0JEWUNDQXdCQ3lBQ0tBSUlJZ0FnQkRZQ0RDQUNJQVEyQWdnZ0JFRUFOZ0lZSUFRZ0FqWUNEQ0FFSUFBMkFnZ0xJQVZCQ0dvaEFBd0JDd0pBSUFsRkRRQUNRQ0FDS0FJY0lnRkJBblJCdUFwcUlnVW9BZ0FnQWtZRVFDQUZJQUEyQWdBZ0FBMEJRWXdJSUF0QmZpQUJkM0UyQWdBTUFnc0NRQ0FDSUFrb0FoQkdCRUFnQ1NBQU5nSVFEQUVMSUFrZ0FEWUNGQXNnQUVVTkFRc2dBQ0FKTmdJWUlBSW9BaEFpQVFSQUlBQWdBVFlDRUNBQklBQTJBaGdMSUFJb0FoUWlBVVVOQUNBQUlBRTJBaFFnQVNBQU5nSVlDd0pBSUFOQkQwMEVRQ0FDSUFNZ0Jtb2lBRUVEY2pZQ0JDQUFJQUpxSWdBZ0FDZ0NCRUVCY2pZQ0JBd0JDeUFDSUFaQkEzSTJBZ1FnQWlBR2FpSUZJQU5CQVhJMkFnUWdBeUFGYWlBRE5nSUFJQWdFUUNBSVFYaHhRYkFJYWlFQVFad0lLQUlBSVFFQ2YwRUJJQWhCQTNaMElnY2dCSEZGQkVCQmlBZ2dCQ0FIY2pZQ0FDQUFEQUVMSUFBb0FnZ0xJUVFnQUNBQk5nSUlJQVFnQVRZQ0RDQUJJQUEyQWd3Z0FTQUVOZ0lJQzBHY0NDQUZOZ0lBUVpBSUlBTTJBZ0FMSUFKQkNHb2hBQXNnQ2tFUWFpUUFJQUFMb1FzQ0MzOEpmU01BUWFBQmF5SUxKQUFnQzBFd2FrRUFRU1Q4Q3dBRFFDQUJJQTVIQkVBZ0FpQU9RUU5zSWd4QkFtcEJBblFpRDJvcUFnQWhGeUFDSUF4QkFXcEJBblFpRUdvcUFnQWhHQ0FJSUF4QkFuUWlFV29nQWlBUmFpb0NBQ0laT0FJQUlBZ2dFR29nR0RnQ0FDQUlJQTlxSUJjNEFnQWdCeUFPUVFWMGFpSU5RUUEyQWd3Z0RTQVhPQUlJSUEwZ0dEZ0NCQ0FOSUJrNEFnQUNRQ0FBUlFSQUlBWWdEbW90QUFCRkRRRUxJQTFCZ0lDQUNEWUNEQXNnRFNBRklBNUJBblFpREVFQmNpSVNhaTBBQUVFSWRDQUZJQXhxTFFBQWNpQUZJQXhCQW5JaUUyb3RBQUJCRUhSeUlBVWdERUVEY2lJTWFpMEFBRUVZZEhJMkFod2dDeUFESUJKQkFuUWlFbW9xQWdBaUZ6Z0NrQUVnQ3lBRElCTkJBblFpRTJvcUFnQWlHRGdDbEFFZ0N5QURJQXhCQW5RaUZHb3FBZ0FpR1RnQ21BRWdDeUFESUE1QkJIUWlGV29xQWdDTUlobzRBcHdCSUF0QjRBQnFJZ3dnQ3lvQ21BRWlGa01BQUFEQWxDQVdsQ0FMS2dLVUFTSVdRd0FBQU1DVUlCYVVRd0FBZ0QrU2tqZ0NBQ0FNSUFzcUFwQUJJaFlnRnBJZ0N5b0NsQUdVSUFzcUFwZ0JJaFlnRnBJZ0N5b0NuQUdVa3pnQ0JDQU1JQXNxQXBBQkloWWdGcElnQ3lvQ21BR1VJQXNxQXBRQkloWWdGcElnQ3lvQ25BR1VramdDQ0NBTUlBc3FBcEFCSWhZZ0ZwSWdDeW9DbEFHVUlBc3FBcGdCSWhZZ0ZwSWdDeW9DbkFHVWtqZ0NEQ0FNSUFzcUFwZ0JJaFpEQUFBQXdKUWdGcFFnQ3lvQ2tBRWlGa01BQUFEQWxDQVdsRU1BQUlBL2twSTRBaEFnRENBTEtnS1VBU0lXSUJhU0lBc3FBcGdCbENBTEtnS1FBU0lXSUJhU0lBc3FBcHdCbEpNNEFoUWdEQ0FMS2dLUUFTSVdJQmFTSUFzcUFwZ0JsQ0FMS2dLVUFTSVdJQmFTSUFzcUFwd0JsSk00QWhnZ0RDQUxLZ0tVQVNJV0lCYVNJQXNxQXBnQmxDQUxLZ0tRQVNJV0lCYVNJQXNxQXB3QmxKSTRBaHdnRENBTEtnS1VBU0lXUXdBQUFNQ1VJQmFVSUFzcUFwQUJJaFpEQUFBQXdKUWdGcFJEQUFDQVA1S1NPQUlnSUFrZ0ZXb2dGemdDQUNBSklCSnFJQmc0QWdBZ0NTQVRhaUFaT0FJQUlBa2dGR29nR2pnQ0FDQUxJQVFnRVdvcUFnQWlGemdDTUNBTElBUWdFR29xQWdBaUdEZ0NRQ0FMSUFRZ0Qyb3FBZ0FpR1RnQ1VDQUtJQkZxSUJjNEFnQWdDaUFRYWlBWU9BSUFJQW9nRDJvZ0dUZ0NBQ0FMSUF3cUFoZ2dDeW9DT0pRZ0RDb0NBQ0FMS2dJd2xDQU1LZ0lNSUFzcUFqU1VrcEk0QWdBZ0N5QU1LZ0ljSUFzcUFqaVVJQXdxQWdRZ0N5b0NNSlFnRENvQ0VDQUxLZ0kwbEpLU09BSUVJQXNnRENvQ0lDQUxLZ0k0bENBTUtnSUlJQXNxQWpDVUlBd3FBaFFnQ3lvQ05KU1NramdDQ0NBTElBd3FBaGdnQ3lvQ1JKUWdEQ29DQUNBTEtnSThsQ0FNS2dJTUlBc3FBa0NVa3BJNEFnd2dDeUFNS2dJY0lBc3FBa1NVSUF3cUFnUWdDeW9DUEpRZ0RDb0NFQ0FMS2dKQWxKS1NPQUlRSUFzZ0RDb0NJQ0FMS2dKRWxDQU1LZ0lJSUFzcUFqeVVJQXdxQWhRZ0N5b0NRSlNTa2pnQ0ZDQUxJQXdxQWhnZ0N5b0NVSlFnRENvQ0FDQUxLZ0pJbENBTUtnSU1JQXNxQWt5VWtwSTRBaGdnQ3lBTUtnSWNJQXNxQWxDVUlBd3FBZ1FnQ3lvQ1NKUWdEQ29DRUNBTEtnSk1sSktTT0FJY0lBc2dEQ29DSUNBTEtnSlFsQ0FNS2dJSUlBc3FBa2lVSUF3cUFoUWdDeW9DVEpTU2tqZ0NJQ0FMS2dJZ0lSY2dDeW9DQ0NFWUlBc3FBaFFoR1NBTklBc3FBaGdpR2lBYWxDQUxLZ0lBSWhZZ0ZwUWdDeW9DRENJYklCdVVrcEpEQUFDQVFKUWdHaUFMS2dJY0loeVVJQllnQ3lvQ0JDSWRsQ0FiSUFzcUFoQWlIcFNTa2tNQUFJQkFsQkFDTmdJUUlBMGdHaUFYbENBV0lCaVVJQnNnR1pTU2trTUFBSUJBbENBY0lCeVVJQjBnSFpRZ0hpQWVsSktTUXdBQWdFQ1VFQUkyQWhRZ0RTQWNJQmVVSUIwZ0dKUWdIaUFabEpLU1F3QUFnRUNVSUJjZ0Y1UWdHQ0FZbENBWklCbVVrcEpEQUFDQVFKUVFBallDR0NBT1FRRnFJUTRNQVFzTElBdEJvQUZxSkFBTEFnQUxDd2tCQUVHQkNBc0NCZ0U9Iik7CiAgfQogIGZ1bmN0aW9uIFcoZykgewogICAgaWYgKEFycmF5QnVmZmVyLmlzVmlldyhnKSkKICAgICAgcmV0dXJuIGc7CiAgICBpZiAoZyA9PSBtICYmIEYpCiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShGKTsKICAgIGlmICh5KQogICAgICByZXR1cm4geShnKTsKICAgIHRocm93ICdzeW5jIGZldGNoaW5nIG9mIHRoZSB3YXNtIGZhaWxlZDogeW91IGNhbiBwcmVsb2FkIGl0IHRvIE1vZHVsZVsid2FzbUJpbmFyeSJdIG1hbnVhbGx5LCBvciBlbWNjLnB5IHdpbGwgZG8gdGhhdCBmb3IgeW91IHdoZW4gZ2VuZXJhdGluZyBIVE1MIChidXQgbm90IEpTKSc7CiAgfQogIGZ1bmN0aW9uIF8oZywgQikgewogICAgdmFyIEUsIFEgPSBXKGcpOwogICAgRSA9IG5ldyBXZWJBc3NlbWJseS5Nb2R1bGUoUSk7CiAgICB2YXIgbyA9IG5ldyBXZWJBc3NlbWJseS5JbnN0YW5jZShFLCBCKTsKICAgIHJldHVybiBbbywgRV07CiAgfQogIGZ1bmN0aW9uIFYoKSB7CiAgICByZXR1cm4geyBhOiBFQSB9OwogIH0KICBmdW5jdGlvbiB6KCkgewogICAgZnVuY3Rpb24gZyhRLCBvKSB7CiAgICAgIHJldHVybiBmID0gUS5leHBvcnRzLCBEID0gZi5iLCBVKCksIFFBKGYpLCBQKCksIGY7CiAgICB9CiAgICB2KCk7CiAgICB2YXIgQiA9IFYoKTsKICAgIGlmIChBLmluc3RhbnRpYXRlV2FzbSkKICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChRLCBvKSA9PiB7CiAgICAgICAgQS5pbnN0YW50aWF0ZVdhc20oQiwgKHIsIGMpID0+IHsKICAgICAgICAgIFEoZyhyKSk7CiAgICAgICAgfSk7CiAgICAgIH0pOwogICAgbSA/Pz0gWCgpOwogICAgdmFyIEUgPSBfKG0sIEIpOwogICAgcmV0dXJuIGcoRVswXSk7CiAgfQogIGZvciAodmFyIHggPSAoZykgPT4gewogICAgZm9yICg7IGcubGVuZ3RoID4gMDsgKQogICAgICBnLnNoaWZ0KCkoQSk7CiAgfSwgaiA9IFtdLCBPID0gKGcpID0+IGoucHVzaChnKSwgVCA9IFtdLCAkID0gKGcpID0+IFQucHVzaChnKSwgQUEgPSAoZykgPT4gewogICAgZm9yICh2YXIgQiwgRSwgUSA9IDAsIG8gPSAwLCByID0gZy5sZW5ndGgsIGMgPSBuZXcgVWludDhBcnJheSgociAqIDMgPj4gMikgLSAoZ1tyIC0gMl0gPT0gIj0iKSAtIChnW3IgLSAxXSA9PSAiPSIpKTsgUSA8IHI7IFEgKz0gNCwgbyArPSAzKQogICAgICBCID0gbltnLmNoYXJDb2RlQXQoUSArIDEpXSwgRSA9IG5bZy5jaGFyQ29kZUF0KFEgKyAyKV0sIGNbb10gPSBuW2cuY2hhckNvZGVBdChRKV0gPDwgMiB8IEIgPj4gNCwgY1tvICsgMV0gPSBCIDw8IDQgfCBFID4+IDIsIGNbbyArIDJdID0gRSA8PCA2IHwgbltnLmNoYXJDb2RlQXQoUSArIDMpXTsKICAgIHJldHVybiBjOwogIH0sIGdBID0gKCkgPT4gMjE0NzQ4MzY0OCwgSUEgPSAoZywgQikgPT4gTWF0aC5jZWlsKGcgLyBCKSAqIEIsIENBID0gKGcpID0+IHsKICAgIHZhciBCID0gRC5idWZmZXIsIEUgPSAoZyAtIEIuYnl0ZUxlbmd0aCArIDY1NTM1KSAvIDY1NTM2IHwgMDsKICAgIHRyeSB7CiAgICAgIHJldHVybiBELmdyb3coRSksIFUoKSwgMTsKICAgIH0gY2F0Y2ggewogICAgfQogIH0sIEJBID0gKGcpID0+IHsKICAgIHZhciBCID0gTi5sZW5ndGg7CiAgICBnID4+Pj0gMDsKICAgIHZhciBFID0gZ0EoKTsKICAgIGlmIChnID4gRSkKICAgICAgcmV0dXJuICExOwogICAgZm9yICh2YXIgUSA9IDE7IFEgPD0gNDsgUSAqPSAyKSB7CiAgICAgIHZhciBvID0gQiAqICgxICsgMC4yIC8gUSk7CiAgICAgIG8gPSBNYXRoLm1pbihvLCBnICsgMTAwNjYzMjk2KTsKICAgICAgdmFyIHIgPSBNYXRoLm1pbihFLCBJQShNYXRoLm1heChnLCBvKSwgNjU1MzYpKSwgYyA9IENBKHIpOwogICAgICBpZiAoYykKICAgICAgICByZXR1cm4gITA7CiAgICB9CiAgICByZXR1cm4gITE7CiAgfSwgbiA9IG5ldyBVaW50OEFycmF5KDEyMyksIGEgPSAyNTsgYSA+PSAwOyAtLWEpCiAgICBuWzQ4ICsgYV0gPSA1MiArIGEsIG5bNjUgKyBhXSA9IGEsIG5bOTcgKyBhXSA9IDI2ICsgYTsKICBuWzQzXSA9IDYyLCBuWzQ3XSA9IDYzLCBBLm5vRXhpdFJ1bnRpbWUgJiYgQS5ub0V4aXRSdW50aW1lLCBBLnByaW50ICYmIEEucHJpbnQsIEEucHJpbnRFcnIgJiYgQS5wcmludEVyciwgQS53YXNtQmluYXJ5ICYmIChGID0gQS53YXNtQmluYXJ5KSwgQS5hcmd1bWVudHMgJiYgQS5hcmd1bWVudHMsIEEudGhpc1Byb2dyYW0gJiYgQS50aGlzUHJvZ3JhbTsKICBmdW5jdGlvbiBRQShnKSB7CiAgICBBLl9wYWNrID0gZy5kLCBBLl9tYWxsb2MgPSBnLmUsIEEuX2ZyZWUgPSBnLmY7CiAgfQogIHZhciBFQSA9IHsgYTogQkEgfSwgZiA9IHooKTsKICBmdW5jdGlvbiBxKCkgewogICAgaWYgKHMgPiAwKSB7CiAgICAgIHcgPSBxOwogICAgICByZXR1cm47CiAgICB9CiAgICBpZiAoaSgpLCBzID4gMCkgewogICAgICB3ID0gcTsKICAgICAgcmV0dXJuOwogICAgfQogICAgZnVuY3Rpb24gZygpIHsKICAgICAgQS5jYWxsZWRSdW4gPSAhMCwgSCgpLCBBLm9uUnVudGltZUluaXRpYWxpemVkPy4oKSwgYigpOwogICAgfQogICAgQS5zZXRTdGF0dXMgPyAoQS5zZXRTdGF0dXMoIlJ1bm5pbmcuLi4iKSwgc2V0VGltZW91dCgoKSA9PiB7CiAgICAgIHNldFRpbWVvdXQoKCkgPT4gQS5zZXRTdGF0dXMoIiIpLCAxKSwgZygpOwogICAgfSwgMSkpIDogZygpOwogIH0KICBmdW5jdGlvbiBpQSgpIHsKICAgIGlmIChBLnByZUluaXQpCiAgICAgIGZvciAodHlwZW9mIEEucHJlSW5pdCA9PSAiZnVuY3Rpb24iICYmIChBLnByZUluaXQgPSBbQS5wcmVJbml0XSk7IEEucHJlSW5pdC5sZW5ndGggPiAwOyApCiAgICAgICAgQS5wcmVJbml0LnNoaWZ0KCkoKTsKICB9CiAgcmV0dXJuIGlBKCksIHEoKSwgZSA9IEEsIGU7Cn07CmxldCBJOwphc3luYyBmdW5jdGlvbiB0QSgpIHsKICBpZiAoSSA9IGF3YWl0IG9BKCksICFJIHx8ICFJLkhFQVBGMzIgfHwgIUkuX3BhY2spCiAgICB0aHJvdyBuZXcgRXJyb3IoIldBU00gbW9kdWxlIGZhaWxlZCB0byBpbml0aWFsaXplIHByb3Blcmx5Iik7Cn0KbGV0IHQgPSAwOwpjb25zdCBsID0gbmV3IEFycmF5KCk7CmxldCBLID0gITEsIHAgPSAhMSwgWSwgUiwgRywgdSwgZCwgTSwgUywgTCwgSjsKY29uc3QgZUEgPSBhc3luYyAoQykgPT4gewogIGZvciAoOyBwOyApCiAgICBhd2FpdCBuZXcgUHJvbWlzZSgoSCkgPT4gc2V0VGltZW91dChILCAwKSk7CiAgSSB8fCAocCA9ICEwLCBhd2FpdCB0QSgpLCBwID0gITEpOwogIGNvbnN0IGUgPSBNYXRoLnBvdygyLCBNYXRoLmNlaWwoTWF0aC5sb2cyKEMudmVydGV4Q291bnQpKSk7CiAgZSA+IHQgJiYgKHQgPiAwICYmIChJLl9mcmVlKFkpLCBJLl9mcmVlKFIpLCBJLl9mcmVlKEcpLCBJLl9mcmVlKHUpLCBJLl9mcmVlKGQpLCBJLl9mcmVlKE0pLCBJLl9mcmVlKFMpLCBJLl9mcmVlKEwpLCBJLl9mcmVlKEopKSwgdCA9IGUsIFkgPSBJLl9tYWxsb2MoMyAqIHQgKiA0KSwgUiA9IEkuX21hbGxvYyg0ICogdCAqIDQpLCBHID0gSS5fbWFsbG9jKDMgKiB0ICogNCksIHUgPSBJLl9tYWxsb2MoNCAqIHQpLCBkID0gSS5fbWFsbG9jKHQpLCBNID0gSS5fbWFsbG9jKDggKiB0ICogNCksIFMgPSBJLl9tYWxsb2MoMyAqIHQgKiA0KSwgTCA9IEkuX21hbGxvYyg0ICogdCAqIDQpLCBKID0gSS5fbWFsbG9jKDMgKiB0ICogNCkpLCBJLkhFQVBGMzIuc2V0KEMucG9zaXRpb25zLCBZIC8gNCksIEkuSEVBUEYzMi5zZXQoQy5yb3RhdGlvbnMsIFIgLyA0KSwgSS5IRUFQRjMyLnNldChDLnNjYWxlcywgRyAvIDQpLCBJLkhFQVBVOC5zZXQoQy5jb2xvcnMsIHUpLCBJLkhFQVBVOC5zZXQoQy5zZWxlY3Rpb24sIGQpLCBJLl9wYWNrKAogICAgQy5zZWxlY3RlZCwKICAgIEMudmVydGV4Q291bnQsCiAgICBZLAogICAgUiwKICAgIEcsCiAgICB1LAogICAgZCwKICAgIE0sCiAgICBTLAogICAgTCwKICAgIEoKICApOwogIGNvbnN0IEEgPSBuZXcgVWludDMyQXJyYXkoSS5IRUFQVTMyLmJ1ZmZlciwgTSwgQy52ZXJ0ZXhDb3VudCAqIDgpLCBoID0gbmV3IFVpbnQzMkFycmF5KEEuc2xpY2UoKS5idWZmZXIpLCBrID0gbmV3IEZsb2F0MzJBcnJheShJLkhFQVBGMzIuYnVmZmVyLCBTLCBDLnZlcnRleENvdW50ICogMyksIHkgPSBuZXcgRmxvYXQzMkFycmF5KGsuc2xpY2UoKS5idWZmZXIpLCBGID0gbmV3IEZsb2F0MzJBcnJheShJLkhFQVBGMzIuYnVmZmVyLCBMLCBDLnZlcnRleENvdW50ICogNCksIEQgPSBuZXcgRmxvYXQzMkFycmF5KEYuc2xpY2UoKS5idWZmZXIpLCBOID0gbmV3IEZsb2F0MzJBcnJheShJLkhFQVBGMzIuYnVmZmVyLCBKLCBDLnZlcnRleENvdW50ICogMyksIFUgPSBuZXcgRmxvYXQzMkFycmF5KE4uc2xpY2UoKS5idWZmZXIpLCBpID0gewogICAgZGF0YTogaCwKICAgIHdvcmxkUG9zaXRpb25zOiB5LAogICAgd29ybGRSb3RhdGlvbnM6IEQsCiAgICB3b3JsZFNjYWxlczogVSwKICAgIG9mZnNldDogQy5vZmZzZXQsCiAgICB2ZXJ0ZXhDb3VudDogQy52ZXJ0ZXhDb3VudCwKICAgIHBvc2l0aW9uczogQy5wb3NpdGlvbnMuYnVmZmVyLAogICAgcm90YXRpb25zOiBDLnJvdGF0aW9ucy5idWZmZXIsCiAgICBzY2FsZXM6IEMuc2NhbGVzLmJ1ZmZlciwKICAgIGNvbG9yczogQy5jb2xvcnMuYnVmZmVyLAogICAgc2VsZWN0aW9uOiBDLnNlbGVjdGlvbi5idWZmZXIKICB9OwogIHNlbGYucG9zdE1lc3NhZ2UoeyByZXNwb25zZTogaSB9LCBbCiAgICBpLmRhdGEuYnVmZmVyLAogICAgaS53b3JsZFBvc2l0aW9ucy5idWZmZXIsCiAgICBpLndvcmxkUm90YXRpb25zLmJ1ZmZlciwKICAgIGkud29ybGRTY2FsZXMuYnVmZmVyLAogICAgaS5wb3NpdGlvbnMsCiAgICBpLnJvdGF0aW9ucywKICAgIGkuc2NhbGVzLAogICAgaS5jb2xvcnMsCiAgICBpLnNlbGVjdGlvbgogIF0pLCBLID0gITE7Cn0sIFogPSAoKSA9PiB7CiAgaWYgKGwubGVuZ3RoICE9PSAwICYmICFLKSB7CiAgICBLID0gITA7CiAgICBjb25zdCBDID0gbC5zaGlmdCgpOwogICAgZUEoQyksIHNldFRpbWVvdXQoKCkgPT4gewogICAgICBLID0gITEsIFooKTsKICAgIH0sIDApOwogIH0KfTsKc2VsZi5vbm1lc3NhZ2UgPSAoQykgPT4gewogIGlmIChDLmRhdGEuc3BsYXQpIHsKICAgIGNvbnN0IGUgPSBDLmRhdGEuc3BsYXQ7CiAgICBmb3IgKGNvbnN0IFtBLCBoXSBvZiBsLmVudHJpZXMoKSkKICAgICAgaWYgKGgub2Zmc2V0ID09PSBlLm9mZnNldCkgewogICAgICAgIGxbQV0gPSBlOwogICAgICAgIHJldHVybjsKICAgICAgfQogICAgbC5wdXNoKGUpLCBaKCk7CiAgfQp9OwovLyMgc291cmNlTWFwcGluZ1VSTD1EYXRhV29ya2VyLUJ6RWRfWmo2LmpzLm1hcAo=",DA=s=>Uint8Array.from(atob(s),e=>e.charCodeAt(0)),ch=typeof self<"u"&&self.Blob&&new Blob(["URL.revokeObjectURL(import.meta.url);",DA(lh)],{type:"text/javascript;charset=utf-8"});function QA(s){let e;try{if(e=ch&&(self.URL||self.webkitURL).createObjectURL(ch),!e)throw"";const t=new Worker(e,{type:"module",name:s==null?void 0:s.name});return t.addEventListener("error",()=>{(self.URL||self.webkitURL).revokeObjectURL(e)}),t}catch{return new Worker("data:text/javascript;base64,"+lh,{type:"module",name:s==null?void 0:s.name})}}var NA=function(s={}){var e,t=s,i=typeof document>"u"&&typeof location>"u"?require("url").pathToFileURL(__filename).href:typeof document>"u"?location.href:Dt&&Dt.tagName.toUpperCase()==="SCRIPT"&&Dt.src||new URL("chuci.umd.js",document.baseURI).href,n="",r;{try{n=new URL(".",i).href}catch{}r=k=>{var Y=new XMLHttpRequest;return Y.open("GET",k,!1),Y.responseType="arraybuffer",Y.send(null),new Uint8Array(Y.response)}}console.log.bind(console),console.error.bind(console);var a,o,c;function l(){var k=o.buffer;t.HEAPU8=c=new Uint8Array(k),t.HEAPU32=new Uint32Array(k),t.HEAPF32=new Float32Array(k),new BigInt64Array(k),new BigUint64Array(k)}function d(){if(t.preRun)for(typeof t.preRun=="function"&&(t.preRun=[t.preRun]);t.preRun.length;)M(t.preRun.shift());U(E)}function h(){ae.c()}function u(){if(t.postRun)for(typeof t.postRun=="function"&&(t.postRun=[t.postRun]);t.postRun.length;)x(t.postRun.shift());U(I)}var p=0,g=null;function v(k){var Y;p++,(Y=t.monitorRunDependencies)==null||Y.call(t,p)}function m(k){var se;if(p--,(se=t.monitorRunDependencies)==null||se.call(t,p),p==0&&g){var Y=g;g=null,Y()}}var f;function A(){return R("AGFzbQEAAAABJgZgAX8Bf2ACfX0Bf2ABfQF/YAF/AGALf39/f39/f39/f38AYAAAAgcBAWEBYQAAAwgHAAECAwAEBQUHAQGCAoCAAgYIAX8BQYCMBAsHFQUBYgIAAWMABwFkAAYBZQAFAWYABAwBAQqqQAdPAQJ/QYAIKAIAIgEgAEEHakF4cSICaiEAAkAgAkEAIAAgAU0bRQRAIAA/AEEQdE0NASAAEAANAQtBhAhBMDYCAEF/DwtBgAggADYCACABCw4AIAAQAyABEANBEHRyC3IBBH8gALwiBEH///8DcSEBAkAgBEEXdkH/AXEiAkUNACACQfAATQRAIAFBgICABHJB8QAgAmt2IQEMAQsgAkGNAUsEQEGA+AEhA0EAIQEMAQsgAkEKdEGAgAdrIQMLIAMgBEEQdkGAgAJxciABQQ12cgvcCwEIfwJAIABFDQAgAEEIayIDIABBBGsoAgAiAkF4cSIAaiEFAkAgAkEBcQ0AIAJBAnFFDQEgAyADKAIAIgRrIgNBmAgoAgBJDQEgACAEaiEAAkACQAJAQZwIKAIAIANHBEAgAygCDCEBIARB/wFNBEAgASADKAIIIgJHDQJBiAhBiAgoAgBBfiAEQQN2d3E2AgAMBQsgAygCGCEHIAEgA0cEQCADKAIIIgIgATYCDCABIAI2AggMBAsgAygCFCICBH8gA0EUagUgAygCECICRQ0DIANBEGoLIQQDQCAEIQYgAiIBQRRqIQQgASgCFCICDQAgAUEQaiEEIAEoAhAiAg0ACyAGQQA2AgAMAwsgBSgCBCICQQNxQQNHDQNBkAggADYCACAFIAJBfnE2AgQgAyAAQQFyNgIEIAUgADYCAA8LIAIgATYCDCABIAI2AggMAgtBACEBCyAHRQ0AAkAgAygCHCIEQQJ0QbgKaiICKAIAIANGBEAgAiABNgIAIAENAUGMCEGMCCgCAEF+IAR3cTYCAAwCCwJAIAMgBygCEEYEQCAHIAE2AhAMAQsgByABNgIUCyABRQ0BCyABIAc2AhggAygCECICBEAgASACNgIQIAIgATYCGAsgAygCFCICRQ0AIAEgAjYCFCACIAE2AhgLIAMgBU8NACAFKAIEIgRBAXFFDQACQAJAAkACQCAEQQJxRQRAQaAIKAIAIAVGBEBBoAggAzYCAEGUCEGUCCgCACAAaiIANgIAIAMgAEEBcjYCBCADQZwIKAIARw0GQZAIQQA2AgBBnAhBADYCAA8LQZwIKAIAIgcgBUYEQEGcCCADNgIAQZAIQZAIKAIAIABqIgA2AgAgAyAAQQFyNgIEIAAgA2ogADYCAA8LIARBeHEgAGohACAFKAIMIQEgBEH/AU0EQCAFKAIIIgIgAUYEQEGICEGICCgCAEF+IARBA3Z3cTYCAAwFCyACIAE2AgwgASACNgIIDAQLIAUoAhghCCABIAVHBEAgBSgCCCICIAE2AgwgASACNgIIDAMLIAUoAhQiAgR/IAVBFGoFIAUoAhAiAkUNAiAFQRBqCyEEA0AgBCEGIAIiAUEUaiEEIAEoAhQiAg0AIAFBEGohBCABKAIQIgINAAsgBkEANgIADAILIAUgBEF+cTYCBCADIABBAXI2AgQgACADaiAANgIADAMLQQAhAQsgCEUNAAJAIAUoAhwiBEECdEG4CmoiAigCACAFRgRAIAIgATYCACABDQFBjAhBjAgoAgBBfiAEd3E2AgAMAgsCQCAFIAgoAhBGBEAgCCABNgIQDAELIAggATYCFAsgAUUNAQsgASAINgIYIAUoAhAiAgRAIAEgAjYCECACIAE2AhgLIAUoAhQiAkUNACABIAI2AhQgAiABNgIYCyADIABBAXI2AgQgACADaiAANgIAIAMgB0cNAEGQCCAANgIADwsgAEH/AU0EQCAAQXhxQbAIaiECAn9BiAgoAgAiBEEBIABBA3Z0IgBxRQRAQYgIIAAgBHI2AgAgAgwBCyACKAIICyEAIAIgAzYCCCAAIAM2AgwgAyACNgIMIAMgADYCCA8LQR8hASAAQf///wdNBEAgAEEmIABBCHZnIgJrdkEBcSACQQF0a0E+aiEBCyADIAE2AhwgA0IANwIQIAFBAnRBuApqIQQCfwJAAn9BjAgoAgAiBkEBIAF0IgJxRQRAQYwIIAIgBnI2AgAgBCADNgIAQRghAUEIDAELIABBGSABQQF2a0EAIAFBH0cbdCEBIAQoAgAhBANAIAQiAigCBEF4cSAARg0CIAFBHXYhBCABQQF0IQEgAiAEQQRxaiIGKAIQIgQNAAsgBiADNgIQQRghASACIQRBCAshACADIgIMAQsgAigCCCIEIAM2AgwgAiADNgIIQRghAEEIIQFBAAshBiABIANqIAQ2AgAgAyACNgIMIAAgA2ogBjYCAEGoCEGoCCgCAEEBayIAQX8gABs2AgALC9EnAQt/IwBBEGsiCiQAAkACQAJAAkACQAJAAkACQAJAAkAgAEH0AU0EQEGICCgCACIEQRAgAEELakH4A3EgAEELSRsiBkEDdiIAdiIBQQNxBEACQCABQX9zQQFxIABqIgJBA3QiAUGwCGoiACABQbgIaigCACIBKAIIIgVGBEBBiAggBEF+IAJ3cTYCAAwBCyAFIAA2AgwgACAFNgIICyABQQhqIQAgASACQQN0IgJBA3I2AgQgASACaiIBIAEoAgRBAXI2AgQMCwsgBkGQCCgCACIITQ0BIAEEQAJAQQIgAHQiAkEAIAJrciABIAB0cWgiAUEDdCIAQbAIaiICIABBuAhqKAIAIgAoAggiBUYEQEGICCAEQX4gAXdxIgQ2AgAMAQsgBSACNgIMIAIgBTYCCAsgACAGQQNyNgIEIAAgBmoiByABQQN0IgEgBmsiBUEBcjYCBCAAIAFqIAU2AgAgCARAIAhBeHFBsAhqIQFBnAgoAgAhAgJ/IARBASAIQQN2dCIDcUUEQEGICCADIARyNgIAIAEMAQsgASgCCAshAyABIAI2AgggAyACNgIMIAIgATYCDCACIAM2AggLIABBCGohAEGcCCAHNgIAQZAIIAU2AgAMCwtBjAgoAgAiC0UNASALaEECdEG4CmooAgAiAigCBEF4cSAGayEDIAIhAQNAAkAgASgCECIARQRAIAEoAhQiAEUNAQsgACgCBEF4cSAGayIBIAMgASADSSIBGyEDIAAgAiABGyECIAAhAQwBCwsgAigCGCEJIAIgAigCDCIARwRAIAIoAggiASAANgIMIAAgATYCCAwKCyACKAIUIgEEfyACQRRqBSACKAIQIgFFDQMgAkEQagshBQNAIAUhByABIgBBFGohBSAAKAIUIgENACAAQRBqIQUgACgCECIBDQALIAdBADYCAAwJC0F/IQYgAEG/f0sNACAAQQtqIgFBeHEhBkGMCCgCACIHRQ0AQR8hCEEAIAZrIQMgAEH0//8HTQRAIAZBJiABQQh2ZyIAa3ZBAXEgAEEBdGtBPmohCAsCQAJAAkAgCEECdEG4CmooAgAiAUUEQEEAIQAMAQtBACEAIAZBGSAIQQF2a0EAIAhBH0cbdCECA0ACQCABKAIEQXhxIAZrIgQgA08NACABIQUgBCIDDQBBACEDIAEhAAwDCyAAIAEoAhQiBCAEIAEgAkEddkEEcWooAhAiAUYbIAAgBBshACACQQF0IQIgAQ0ACwsgACAFckUEQEEAIQVBAiAIdCIAQQAgAGtyIAdxIgBFDQMgAGhBAnRBuApqKAIAIQALIABFDQELA0AgACgCBEF4cSAGayICIANJIQEgAiADIAEbIQMgACAFIAEbIQUgACgCECIBBH8gAQUgACgCFAsiAA0ACwsgBUUNACADQZAIKAIAIAZrTw0AIAUoAhghCCAFIAUoAgwiAEcEQCAFKAIIIgEgADYCDCAAIAE2AggMCAsgBSgCFCIBBH8gBUEUagUgBSgCECIBRQ0DIAVBEGoLIQIDQCACIQQgASIAQRRqIQIgACgCFCIBDQAgAEEQaiECIAAoAhAiAQ0ACyAEQQA2AgAMBwsgBkGQCCgCACIFTQRAQZwIKAIAIQACQCAFIAZrIgFBEE8EQCAAIAZqIgIgAUEBcjYCBCAAIAVqIAE2AgAgACAGQQNyNgIEDAELIAAgBUEDcjYCBCAAIAVqIgEgASgCBEEBcjYCBEEAIQJBACEBC0GQCCABNgIAQZwIIAI2AgAgAEEIaiEADAkLIAZBlAgoAgAiAkkEQEGUCCACIAZrIgE2AgBBoAhBoAgoAgAiACAGaiICNgIAIAIgAUEBcjYCBCAAIAZBA3I2AgQgAEEIaiEADAkLQQAhACAGQS9qIgMCf0HgCygCAARAQegLKAIADAELQewLQn83AgBB5AtCgKCAgICABDcCAEHgCyAKQQxqQXBxQdiq1aoFczYCAEH0C0EANgIAQcQLQQA2AgBBgCALIgFqIgRBACABayIHcSIBIAZNDQhBwAsoAgAiBQRAQbgLKAIAIgggAWoiCSAITSAFIAlJcg0JCwJAQcQLLQAAQQRxRQRAAkACQAJAAkBBoAgoAgAiBQRAQcgLIQADQCAAKAIAIgggBU0EQCAFIAggACgCBGpJDQMLIAAoAggiAA0ACwtBABABIgJBf0YNAyABIQRB5AsoAgAiAEEBayIFIAJxBEAgASACayACIAVqQQAgAGtxaiEECyAEIAZNDQNBwAsoAgAiAARAQbgLKAIAIgUgBGoiByAFTSAAIAdJcg0ECyAEEAEiACACRw0BDAULIAQgAmsgB3EiBBABIgIgACgCACAAKAIEakYNASACIQALIABBf0YNASAGQTBqIARNBEAgACECDAQLQegLKAIAIgIgAyAEa2pBACACa3EiAhABQX9GDQEgAiAEaiEEIAAhAgwDCyACQX9HDQILQcQLQcQLKAIAQQRyNgIACyABEAEiAkF/RkEAEAEiAEF/RnIgACACTXINBSAAIAJrIgQgBkEoak0NBQtBuAtBuAsoAgAgBGoiADYCAEG8CygCACAASQRAQbwLIAA2AgALAkBBoAgoAgAiAwRAQcgLIQADQCACIAAoAgAiASAAKAIEIgVqRg0CIAAoAggiAA0ACwwEC0GYCCgCACIAQQAgACACTRtFBEBBmAggAjYCAAtBACEAQcwLIAQ2AgBByAsgAjYCAEGoCEF/NgIAQawIQeALKAIANgIAQdQLQQA2AgADQCAAQQN0IgFBuAhqIAFBsAhqIgU2AgAgAUG8CGogBTYCACAAQQFqIgBBIEcNAAtBlAggBEEoayIAQXggAmtBB3EiAWsiBTYCAEGgCCABIAJqIgE2AgAgASAFQQFyNgIEIAAgAmpBKDYCBEGkCEHwCygCADYCAAwECyACIANNIAEgA0tyDQIgACgCDEEIcQ0CIAAgBCAFajYCBEGgCCADQXggA2tBB3EiAGoiATYCAEGUCEGUCCgCACAEaiICIABrIgA2AgAgASAAQQFyNgIEIAIgA2pBKDYCBEGkCEHwCygCADYCAAwDC0EAIQAMBgtBACEADAQLQZgIKAIAIAJLBEBBmAggAjYCAAsgAiAEaiEFQcgLIQACQANAIAUgACgCACIBRwRAIAAoAggiAA0BDAILCyAALQAMQQhxRQ0DC0HICyEAA0ACQCAAKAIAIgEgA00EQCADIAEgACgCBGoiBUkNAQsgACgCCCEADAELC0GUCCAEQShrIgBBeCACa0EHcSIBayIHNgIAQaAIIAEgAmoiATYCACABIAdBAXI2AgQgACACakEoNgIEQaQIQfALKAIANgIAIAMgBUEnIAVrQQdxakEvayIAIAAgA0EQakkbIgFBGzYCBCABQdALKQIANwIQIAFByAspAgA3AghB0AsgAUEIajYCAEHMCyAENgIAQcgLIAI2AgBB1AtBADYCACABQRhqIQADQCAAQQc2AgQgAEEIaiAAQQRqIQAgBUkNAAsgASADRg0AIAEgASgCBEF+cTYCBCADIAEgA2siAkEBcjYCBCABIAI2AgACfyACQf8BTQRAIAJBeHFBsAhqIQACf0GICCgCACIBQQEgAkEDdnQiAnFFBEBBiAggASACcjYCACAADAELIAAoAggLIQEgACADNgIIIAEgAzYCDEEMIQJBCAwBC0EfIQAgAkH///8HTQRAIAJBJiACQQh2ZyIAa3ZBAXEgAEEBdGtBPmohAAsgAyAANgIcIANCADcCECAAQQJ0QbgKaiEBAkACQEGMCCgCACIFQQEgAHQiBHFFBEBBjAggBCAFcjYCACABIAM2AgAMAQsgAkEZIABBAXZrQQAgAEEfRxt0IQAgASgCACEFA0AgBSIBKAIEQXhxIAJGDQIgAEEddiEFIABBAXQhACABIAVBBHFqIgQoAhAiBQ0ACyAEIAM2AhALIAMgATYCGEEIIQIgAyIBIQBBDAwBCyABKAIIIgAgAzYCDCABIAM2AgggAyAANgIIQQAhAEEYIQJBDAsgA2ogATYCACACIANqIAA2AgALQZQIKAIAIgAgBk0NAEGUCCAAIAZrIgE2AgBBoAhBoAgoAgAiACAGaiICNgIAIAIgAUEBcjYCBCAAIAZBA3I2AgQgAEEIaiEADAQLQYQIQTA2AgBBACEADAMLIAAgAjYCACAAIAAoAgQgBGo2AgQgAkF4IAJrQQdxaiIIIAZBA3I2AgQgAUF4IAFrQQdxaiIEIAYgCGoiA2shBwJAQaAIKAIAIARGBEBBoAggAzYCAEGUCEGUCCgCACAHaiIANgIAIAMgAEEBcjYCBAwBC0GcCCgCACAERgRAQZwIIAM2AgBBkAhBkAgoAgAgB2oiADYCACADIABBAXI2AgQgACADaiAANgIADAELIAQoAgQiAEEDcUEBRgRAIABBeHEhCSAEKAIMIQICQCAAQf8BTQRAIAQoAggiASACRgRAQYgIQYgIKAIAQX4gAEEDdndxNgIADAILIAEgAjYCDCACIAE2AggMAQsgBCgCGCEGAkAgAiAERwRAIAQoAggiACACNgIMIAIgADYCCAwBCwJAIAQoAhQiAAR/IARBFGoFIAQoAhAiAEUNASAEQRBqCyEBA0AgASEFIAAiAkEUaiEBIAAoAhQiAA0AIAJBEGohASACKAIQIgANAAsgBUEANgIADAELQQAhAgsgBkUNAAJAIAQoAhwiAEECdEG4CmoiASgCACAERgRAIAEgAjYCACACDQFBjAhBjAgoAgBBfiAAd3E2AgAMAgsCQCAEIAYoAhBGBEAgBiACNgIQDAELIAYgAjYCFAsgAkUNAQsgAiAGNgIYIAQoAhAiAARAIAIgADYCECAAIAI2AhgLIAQoAhQiAEUNACACIAA2AhQgACACNgIYCyAHIAlqIQcgBCAJaiIEKAIEIQALIAQgAEF+cTYCBCADIAdBAXI2AgQgAyAHaiAHNgIAIAdB/wFNBEAgB0F4cUGwCGohAAJ/QYgIKAIAIgFBASAHQQN2dCICcUUEQEGICCABIAJyNgIAIAAMAQsgACgCCAshASAAIAM2AgggASADNgIMIAMgADYCDCADIAE2AggMAQtBHyECIAdB////B00EQCAHQSYgB0EIdmciAGt2QQFxIABBAXRrQT5qIQILIAMgAjYCHCADQgA3AhAgAkECdEG4CmohAAJAAkBBjAgoAgAiAUEBIAJ0IgVxRQRAQYwIIAEgBXI2AgAgACADNgIADAELIAdBGSACQQF2a0EAIAJBH0cbdCECIAAoAgAhAQNAIAEiACgCBEF4cSAHRg0CIAJBHXYhASACQQF0IQIgACABQQRxaiIFKAIQIgENAAsgBSADNgIQCyADIAA2AhggAyADNgIMIAMgAzYCCAwBCyAAKAIIIgEgAzYCDCAAIAM2AgggA0EANgIYIAMgADYCDCADIAE2AggLIAhBCGohAAwCCwJAIAhFDQACQCAFKAIcIgFBAnRBuApqIgIoAgAgBUYEQCACIAA2AgAgAA0BQYwIIAdBfiABd3EiBzYCAAwCCwJAIAUgCCgCEEYEQCAIIAA2AhAMAQsgCCAANgIUCyAARQ0BCyAAIAg2AhggBSgCECIBBEAgACABNgIQIAEgADYCGAsgBSgCFCIBRQ0AIAAgATYCFCABIAA2AhgLAkAgA0EPTQRAIAUgAyAGaiIAQQNyNgIEIAAgBWoiACAAKAIEQQFyNgIEDAELIAUgBkEDcjYCBCAFIAZqIgQgA0EBcjYCBCADIARqIAM2AgAgA0H/AU0EQCADQXhxQbAIaiEAAn9BiAgoAgAiAUEBIANBA3Z0IgJxRQRAQYgIIAEgAnI2AgAgAAwBCyAAKAIICyEBIAAgBDYCCCABIAQ2AgwgBCAANgIMIAQgATYCCAwBC0EfIQAgA0H///8HTQRAIANBJiADQQh2ZyIAa3ZBAXEgAEEBdGtBPmohAAsgBCAANgIcIARCADcCECAAQQJ0QbgKaiEBAkACQCAHQQEgAHQiAnFFBEBBjAggAiAHcjYCACABIAQ2AgAgBCABNgIYDAELIANBGSAAQQF2a0EAIABBH0cbdCEAIAEoAgAhAQNAIAEiAigCBEF4cSADRg0CIABBHXYhASAAQQF0IQAgAiABQQRxaiIHKAIQIgENAAsgByAENgIQIAQgAjYCGAsgBCAENgIMIAQgBDYCCAwBCyACKAIIIgAgBDYCDCACIAQ2AgggBEEANgIYIAQgAjYCDCAEIAA2AggLIAVBCGohAAwBCwJAIAlFDQACQCACKAIcIgFBAnRBuApqIgUoAgAgAkYEQCAFIAA2AgAgAA0BQYwIIAtBfiABd3E2AgAMAgsCQCACIAkoAhBGBEAgCSAANgIQDAELIAkgADYCFAsgAEUNAQsgACAJNgIYIAIoAhAiAQRAIAAgATYCECABIAA2AhgLIAIoAhQiAUUNACAAIAE2AhQgASAANgIYCwJAIANBD00EQCACIAMgBmoiAEEDcjYCBCAAIAJqIgAgACgCBEEBcjYCBAwBCyACIAZBA3I2AgQgAiAGaiIFIANBAXI2AgQgAyAFaiADNgIAIAgEQCAIQXhxQbAIaiEAQZwIKAIAIQECf0EBIAhBA3Z0IgcgBHFFBEBBiAggBCAHcjYCACAADAELIAAoAggLIQQgACABNgIIIAQgATYCDCABIAA2AgwgASAENgIIC0GcCCAFNgIAQZAIIAM2AgALIAJBCGohAAsgCkEQaiQAIAALoQsCC38JfSMAQaABayILJAAgC0EwakEAQST8CwADQCABIA5HBEAgAiAOQQNsIgxBAmpBAnQiD2oqAgAhFyACIAxBAWpBAnQiEGoqAgAhGCAIIAxBAnQiEWogAiARaioCACIZOAIAIAggEGogGDgCACAIIA9qIBc4AgAgByAOQQV0aiINQQA2AgwgDSAXOAIIIA0gGDgCBCANIBk4AgACQCAARQRAIAYgDmotAABFDQELIA1BgICACDYCDAsgDSAFIA5BAnQiDEEBciISai0AAEEIdCAFIAxqLQAAciAFIAxBAnIiE2otAABBEHRyIAUgDEEDciIMai0AAEEYdHI2AhwgCyADIBJBAnQiEmoqAgAiFzgCkAEgCyADIBNBAnQiE2oqAgAiGDgClAEgCyADIAxBAnQiFGoqAgAiGTgCmAEgCyADIA5BBHQiFWoqAgCMIho4ApwBIAtB4ABqIgwgCyoCmAEiFkMAAADAlCAWlCALKgKUASIWQwAAAMCUIBaUQwAAgD+SkjgCACAMIAsqApABIhYgFpIgCyoClAGUIAsqApgBIhYgFpIgCyoCnAGUkzgCBCAMIAsqApABIhYgFpIgCyoCmAGUIAsqApQBIhYgFpIgCyoCnAGUkjgCCCAMIAsqApABIhYgFpIgCyoClAGUIAsqApgBIhYgFpIgCyoCnAGUkjgCDCAMIAsqApgBIhZDAAAAwJQgFpQgCyoCkAEiFkMAAADAlCAWlEMAAIA/kpI4AhAgDCALKgKUASIWIBaSIAsqApgBlCALKgKQASIWIBaSIAsqApwBlJM4AhQgDCALKgKQASIWIBaSIAsqApgBlCALKgKUASIWIBaSIAsqApwBlJM4AhggDCALKgKUASIWIBaSIAsqApgBlCALKgKQASIWIBaSIAsqApwBlJI4AhwgDCALKgKUASIWQwAAAMCUIBaUIAsqApABIhZDAAAAwJQgFpRDAACAP5KSOAIgIAkgFWogFzgCACAJIBJqIBg4AgAgCSATaiAZOAIAIAkgFGogGjgCACALIAQgEWoqAgAiFzgCMCALIAQgEGoqAgAiGDgCQCALIAQgD2oqAgAiGTgCUCAKIBFqIBc4AgAgCiAQaiAYOAIAIAogD2ogGTgCACALIAwqAhggCyoCOJQgDCoCACALKgIwlCAMKgIMIAsqAjSUkpI4AgAgCyAMKgIcIAsqAjiUIAwqAgQgCyoCMJQgDCoCECALKgI0lJKSOAIEIAsgDCoCICALKgI4lCAMKgIIIAsqAjCUIAwqAhQgCyoCNJSSkjgCCCALIAwqAhggCyoCRJQgDCoCACALKgI8lCAMKgIMIAsqAkCUkpI4AgwgCyAMKgIcIAsqAkSUIAwqAgQgCyoCPJQgDCoCECALKgJAlJKSOAIQIAsgDCoCICALKgJElCAMKgIIIAsqAjyUIAwqAhQgCyoCQJSSkjgCFCALIAwqAhggCyoCUJQgDCoCACALKgJIlCAMKgIMIAsqAkyUkpI4AhggCyAMKgIcIAsqAlCUIAwqAgQgCyoCSJQgDCoCECALKgJMlJKSOAIcIAsgDCoCICALKgJQlCAMKgIIIAsqAkiUIAwqAhQgCyoCTJSSkjgCICALKgIgIRcgCyoCCCEYIAsqAhQhGSANIAsqAhgiGiAalCALKgIAIhYgFpQgCyoCDCIbIBuUkpJDAACAQJQgGiALKgIcIhyUIBYgCyoCBCIdlCAbIAsqAhAiHpSSkkMAAIBAlBACNgIQIA0gGiAXlCAWIBiUIBsgGZSSkkMAAIBAlCAcIByUIB0gHZQgHiAelJKSQwAAgECUEAI2AhQgDSAcIBeUIB0gGJQgHiAZlJKSQwAAgECUIBcgF5QgGCAYlCAZIBmUkpJDAACAQJQQAjYCGCAOQQFqIQ4MAQsLIAtBoAFqJAALAgALCwkBAEGBCAsCBgE=")}function _(k){if(ArrayBuffer.isView(k))return k;if(k==f&&a)return new Uint8Array(a);if(r)return r(k);throw'sync fetching of the wasm failed: you can preload it to Module["wasmBinary"] manually, or emcc.py will do that for you when generating HTML (but not JS)'}function S(k,Y){var se,ee=_(k);se=new WebAssembly.Module(ee);var ge=new WebAssembly.Instance(se,Y);return[ge,se]}function C(){return{a:$}}function y(){function k(ee,ge){return ae=ee.exports,o=ae.b,l(),Z(ae),m(),ae}v();var Y=C();if(t.instantiateWasm)return new Promise((ee,ge)=>{t.instantiateWasm(Y,(Ee,Te)=>{ee(k(Ee))})});f??(f=A());var se=S(f,Y);return k(se[0])}for(var U=k=>{for(;k.length>0;)k.shift()(t)},I=[],x=k=>I.push(k),E=[],M=k=>E.push(k),R=k=>{for(var Y,se,ee=0,ge=0,Ee=k.length,Te=new Uint8Array((Ee*3>>2)-(k[Ee-2]=="=")-(k[Ee-1]=="="));ee<Ee;ee+=4,ge+=3)Y=N[k.charCodeAt(ee+1)],se=N[k.charCodeAt(ee+2)],Te[ge]=N[k.charCodeAt(ee)]<<2|Y>>4,Te[ge+1]=Y<<4|se>>2,Te[ge+2]=se<<6|N[k.charCodeAt(ee+3)];return Te},F=()=>2147483648,B=(k,Y)=>Math.ceil(k/Y)*Y,z=k=>{var Y=o.buffer,se=(k-Y.byteLength+65535)/65536|0;try{return o.grow(se),l(),1}catch{}},Q=k=>{var Y=c.length;k>>>=0;var se=F();if(k>se)return!1;for(var ee=1;ee<=4;ee*=2){var ge=Y*(1+.2/ee);ge=Math.min(ge,k+100663296);var Ee=Math.min(se,B(Math.max(k,ge),65536)),Te=z(Ee);if(Te)return!0}return!1},N=new Uint8Array(123),D=25;D>=0;--D)N[48+D]=52+D,N[65+D]=D,N[97+D]=26+D;N[43]=62,N[47]=63,t.noExitRuntime&&t.noExitRuntime,t.print&&t.print,t.printErr&&t.printErr,t.wasmBinary&&(a=t.wasmBinary),t.arguments&&t.arguments,t.thisProgram&&t.thisProgram;function Z(k){t._pack=k.d,t._malloc=k.e,t._free=k.f}var $={a:Q},ae=y();function be(){if(p>0){g=be;return}if(d(),p>0){g=be;return}function k(){var Y;t.calledRun=!0,h(),(Y=t.onRuntimeInitialized)==null||Y.call(t),u()}t.setStatus?(t.setStatus("Running..."),setTimeout(()=>{setTimeout(()=>t.setStatus(""),1),k()},1)):k()}function Be(){if(t.preInit)for(typeof t.preInit=="function"&&(t.preInit=[t.preInit]);t.preInit.length>0;)t.preInit.shift()()}return Be(),be(),e=t,e};const LA=()=>new QA;class il{constructor(e){this.dataChanged=!1,this.transformsChanged=!1,this.colorTransformsChanged=!1,this._updating=new Set,this._dirty=new Set;let t=0,i=0;this._splatIndices=new Map,this._offsets=new Map;const n=new Map;for(const u of e.objects)u instanceof Jt&&(this._splatIndices.set(u,i),this._offsets.set(u,t),n.set(t,u),t+=u.data.vertexCount,i++);this._vertexCount=t,this._width=2048,this._height=Math.ceil(2*this.vertexCount/this.width),this._data=new Uint32Array(this.width*this.height*4),this._transformsWidth=5,this._transformsHeight=n.size,this._transforms=new Float32Array(this._transformsWidth*this._transformsHeight*4),this._transformIndicesWidth=1024,this._transformIndicesHeight=Math.ceil(this.vertexCount/this._transformIndicesWidth),this._transformIndices=new Uint32Array(this._transformIndicesWidth*this._transformIndicesHeight),this._colorTransformsWidth=4,this._colorTransformsHeight=64,this._colorTransforms=new Float32Array(this._colorTransformsWidth*this._colorTransformsHeight*4),this._colorTransforms.fill(0),this._colorTransforms[0]=1,this._colorTransforms[5]=1,this._colorTransforms[10]=1,this._colorTransforms[15]=1,this._colorTransformIndicesWidth=1024,this._colorTransformIndicesHeight=Math.ceil(this.vertexCount/this._colorTransformIndicesWidth),this._colorTransformIndices=new Uint32Array(this._colorTransformIndicesWidth*this._colorTransformIndicesHeight),this.colorTransformIndices.fill(0),this._positions=new Float32Array(this.vertexCount*3),this._rotations=new Float32Array(this.vertexCount*4),this._scales=new Float32Array(this.vertexCount*3),this._worker=LA();const r=u=>{const p=this._splatIndices.get(u);this._transforms.set(u.transform.buffer,p*20),this._transforms[p*20+16]=u.selected?1:0,u.positionChanged=!1,u.rotationChanged=!1,u.scaleChanged=!1,u.selectedChanged=!1,this.transformsChanged=!0},a=()=>{let u=!1;for(const v of this._splatIndices.keys())if(v.colorTransformChanged){u=!0;break}if(!u)return;const p=[new Pt];this._colorTransformIndices.fill(0);let g=1;for(const v of this._splatIndices.keys()){const m=this._offsets.get(v);for(const f of v.colorTransforms)p.includes(f)||(p.push(f),g++);for(const f of v.colorTransformsMap.keys()){const A=v.colorTransformsMap.get(f);this._colorTransformIndices[f+m]=A+g-1}v.colorTransformChanged=!1}for(let v=0;v<p.length;v++){const m=p[v];this._colorTransforms.set(m.buffer,v*16)}this.colorTransformsChanged=!0};this._worker.onmessage=u=>{if(u.data.response){const p=u.data.response,g=n.get(p.offset);r(g),a();const v=this._splatIndices.get(g);for(let m=0;m<g.data.vertexCount;m++)this._transformIndices[p.offset+m]=v;this._data.set(p.data,p.offset*8),g.data.reattach(p.positions,p.rotations,p.scales,p.colors,p.selection),this._positions.set(p.worldPositions,p.offset*3),this._rotations.set(p.worldRotations,p.offset*4),this._scales.set(p.worldScales,p.offset*3),this._updating.delete(g),g.selectedChanged=!1,this.dataChanged=!0}};let o;async function c(){o=await NA()}c();async function l(){for(;!o;)await new Promise(u=>setTimeout(u,0))}const d=u=>{if(!o){l().then(()=>{d(u)});return}r(u);const p=o._malloc(3*u.data.vertexCount*4),g=o._malloc(4*u.data.vertexCount*4),v=o._malloc(3*u.data.vertexCount*4),m=o._malloc(4*u.data.vertexCount),f=o._malloc(u.data.vertexCount),A=o._malloc(8*u.data.vertexCount*4),_=o._malloc(3*u.data.vertexCount*4),S=o._malloc(4*u.data.vertexCount*4),C=o._malloc(3*u.data.vertexCount*4);o.HEAPF32.set(u.data.positions,p/4),o.HEAPF32.set(u.data.rotations,g/4),o.HEAPF32.set(u.data.scales,v/4),o.HEAPU8.set(u.data.colors,m),o.HEAPU8.set(u.data.selection,f),o._pack(u.selected,u.data.vertexCount,p,g,v,m,f,A,_,S,C);const y=new Uint32Array(o.HEAPU32.buffer,A,u.data.vertexCount*8),U=new Float32Array(o.HEAPF32.buffer,_,u.data.vertexCount*3),I=new Float32Array(o.HEAPF32.buffer,S,u.data.vertexCount*4),x=new Float32Array(o.HEAPF32.buffer,C,u.data.vertexCount*3),E=this._splatIndices.get(u),M=this._offsets.get(u);for(let R=0;R<u.data.vertexCount;R++)this._transformIndices[M+R]=E;this._data.set(y,M*8),this._positions.set(U,M*3),this._rotations.set(I,M*4),this._scales.set(x,M*3),o._free(p),o._free(g),o._free(v),o._free(m),o._free(f),o._free(A),o._free(_),o._free(S),o._free(C),this.dataChanged=!0,this.colorTransformsChanged=!0},h=u=>{if((u.positionChanged||u.rotationChanged||u.scaleChanged||u.selectedChanged)&&r(u),u.colorTransformChanged&&a(),!u.data.changed||u.data.detached)return;const p={position:new Float32Array(u.position.flat()),rotation:new Float32Array(u.rotation.flat()),scale:new Float32Array(u.scale.flat()),selected:u.selected,vertexCount:u.data.vertexCount,positions:u.data.positions,rotations:u.data.rotations,scales:u.data.scales,colors:u.data.colors,selection:u.data.selection,offset:this._offsets.get(u)};this._worker.postMessage({splat:p},[p.position.buffer,p.rotation.buffer,p.scale.buffer,p.positions.buffer,p.rotations.buffer,p.scales.buffer,p.colors.buffer,p.selection.buffer]),this._updating.add(u),u.data.detached=!0};this.getSplat=u=>{let p=null;for(const[g,v]of this._offsets)if(u>=v)p=g;else break;return p},this.getLocalIndex=(u,p)=>{const g=this._offsets.get(u);return p-g},this.markDirty=u=>{this._dirty.add(u)},this.rebuild=()=>{for(const u of this._dirty)h(u);this._dirty.clear()},this.dispose=()=>{this._worker.terminate()};for(const u of this._splatIndices.keys())d(u);a()}get offsets(){return this._offsets}get data(){return this._data}get width(){return this._width}get height(){return this._height}get transforms(){return this._transforms}get transformsWidth(){return this._transformsWidth}get transformsHeight(){return this._transformsHeight}get transformIndices(){return this._transformIndices}get transformIndicesWidth(){return this._transformIndicesWidth}get transformIndicesHeight(){return this._transformIndicesHeight}get colorTransforms(){return this._colorTransforms}get colorTransformsWidth(){return this._colorTransformsWidth}get colorTransformsHeight(){return this._colorTransformsHeight}get colorTransformIndices(){return this._colorTransformIndices}get colorTransformIndicesWidth(){return this._colorTransformIndicesWidth}get colorTransformIndicesHeight(){return this._colorTransformIndicesHeight}get positions(){return this._positions}get rotations(){return this._rotations}get scales(){return this._scales}get vertexCount(){return this._vertexCount}get needsRebuild(){return this._dirty.size>0}get updating(){return this._updating.size>0}}class nl{constructor(e=0,t=0,i=0,n=255){this.r=e,this.g=t,this.b=i,this.a=n}flat(){return[this.r,this.g,this.b,this.a]}flatNorm(){return[this.r/255,this.g/255,this.b/255,this.a/255]}toHexString(){return"#"+this.flat().map(e=>e.toString(16).padStart(2,"0")).join("")}toString(){return`[${this.flat().join(", ")}]`}}const PA=()=>new BA,VA=`#version 300 es
precision highp float;
precision highp int;

uniform highp usampler2D u_texture;
uniform highp sampler2D u_transforms;
uniform highp usampler2D u_transformIndices;
uniform highp sampler2D u_colorTransforms;
uniform highp usampler2D u_colorTransformIndices;
uniform mat4 projection, view;
uniform vec2 focal;
uniform vec2 viewport;

uniform bool useDepthFade;
uniform float depthFade;

in vec2 position;
in int index;

out vec4 vColor;
out vec2 vPosition;
out float vSize;
out float vSelected;

void main () {
    uvec4 cen = texelFetch(u_texture, ivec2((uint(index) & 0x3ffu) << 1, uint(index) >> 10), 0);
    float selected = float((cen.w >> 24) & 0xffu);

    uint transformIndex = texelFetch(u_transformIndices, ivec2(uint(index) & 0x3ffu, uint(index) >> 10), 0).x;
    mat4 transform = mat4(
        texelFetch(u_transforms, ivec2(0, transformIndex), 0),
        texelFetch(u_transforms, ivec2(1, transformIndex), 0),
        texelFetch(u_transforms, ivec2(2, transformIndex), 0),
        texelFetch(u_transforms, ivec2(3, transformIndex), 0)
    );

    if (selected < 0.5) {
        selected = texelFetch(u_transforms, ivec2(4, transformIndex), 0).x;
    }

    mat4 viewTransform = view * transform;

    vec4 cam = viewTransform * vec4(uintBitsToFloat(cen.xyz), 1);
    vec4 pos2d = projection * cam;

    float clip = 1.2 * pos2d.w;
    if (pos2d.z < -pos2d.w || pos2d.z > pos2d.w || pos2d.x < -clip || pos2d.x > clip || pos2d.y < -clip || pos2d.y > clip) {
        gl_Position = vec4(0.0, 0.0, 2.0, 1.0);
        return;
    }

    uvec4 cov = texelFetch(u_texture, ivec2(((uint(index) & 0x3ffu) << 1) | 1u, uint(index) >> 10), 0);
    vec2 u1 = unpackHalf2x16(cov.x), u2 = unpackHalf2x16(cov.y), u3 = unpackHalf2x16(cov.z);
    mat3 Vrk = mat3(u1.x, u1.y, u2.x, u1.y, u2.y, u3.x, u2.x, u3.x, u3.y);

    mat3 J = mat3(
        focal.x / cam.z, 0., -(focal.x * cam.x) / (cam.z * cam.z), 
        0., -focal.y / cam.z, (focal.y * cam.y) / (cam.z * cam.z), 
        0., 0., 0.
    );

    mat3 T = transpose(mat3(viewTransform)) * J;
    mat3 cov2d = transpose(T) * Vrk * T;

    //ref: https://github.com/graphdeco-inria/diff-gaussian-rasterization/blob/main/cuda_rasterizer/forward.cu#L110-L111
    cov2d[0][0] += 0.3;
    cov2d[1][1] += 0.3;

    float mid = (cov2d[0][0] + cov2d[1][1]) / 2.0;
    float radius = length(vec2((cov2d[0][0] - cov2d[1][1]) / 2.0, cov2d[0][1]));
    float lambda1 = mid + radius, lambda2 = mid - radius;

    if (lambda2 < 0.0) return;
    vec2 diagonalVector = normalize(vec2(cov2d[0][1], lambda1 - cov2d[0][0]));
    vec2 majorAxis = min(sqrt(2.0 * lambda1), 1024.0) * diagonalVector;
    vec2 minorAxis = min(sqrt(2.0 * lambda2), 1024.0) * vec2(diagonalVector.y, -diagonalVector.x);

    uint colorTransformIndex = texelFetch(u_colorTransformIndices, ivec2(uint(index) & 0x3ffu, uint(index) >> 10), 0).x;
    mat4 colorTransform = mat4(
        texelFetch(u_colorTransforms, ivec2(0, colorTransformIndex), 0),
        texelFetch(u_colorTransforms, ivec2(1, colorTransformIndex), 0),
        texelFetch(u_colorTransforms, ivec2(2, colorTransformIndex), 0),
        texelFetch(u_colorTransforms, ivec2(3, colorTransformIndex), 0)
    );

    vec4 color = vec4((cov.w) & 0xffu, (cov.w >> 8) & 0xffu, (cov.w >> 16) & 0xffu, (cov.w >> 24) & 0xffu) / 255.0;
    vColor = colorTransform * color;

    vPosition = position;
    vSize = length(majorAxis);
    vSelected = selected;

    float scalingFactor = 1.0;

    if (useDepthFade) {
        float depthNorm = (pos2d.z / pos2d.w + 1.0) / 2.0;
        float near = 0.1; float far = 100.0;
        float normalizedDepth = (2.0 * near) / (far + near - depthNorm * (far - near));
        float start = max(normalizedDepth - 0.1, 0.0);
        float end = min(normalizedDepth + 0.1, 1.0);
        scalingFactor = clamp((depthFade - start) / (end - start), 0.0, 1.0);
    }

    vec2 vCenter = vec2(pos2d) / pos2d.w;
    gl_Position = vec4(
        vCenter 
        + position.x * majorAxis * scalingFactor / viewport
        + position.y * minorAxis * scalingFactor / viewport, 0.0, 1.0);
}
`,kA=`#version 300 es
precision highp float;

uniform float outlineThickness;
uniform vec4 outlineColor;

in vec4 vColor;
in vec2 vPosition;
in float vSize;
in float vSelected;

out vec4 fragColor;

void main () {
    float A = -dot(vPosition, vPosition);

    if (A < -4.0) discard;

    if (vSelected < 0.5) {
        float B = exp(A) * vColor.a;
        fragColor = vec4(B * vColor.rgb, B);
        return;
    }

    float outlineThreshold = -4.0 + (outlineThickness / vSize);

    if (A < outlineThreshold) {
        fragColor = outlineColor;
    } 
    else {
        float B = exp(A) * vColor.a;
        fragColor = vec4(B * vColor.rgb, B);
    }
}
`;class sl extends tl{constructor(e,t){super(e,t),this._outlineThickness=10,this._outlineColor=new nl(255,165,0,255),this._renderData=null,this._depthIndex=new Uint32Array,this._splatTexture=null,this._worker=null;const i=e.canvas,n=e.gl;let r,a,o,c,l,d,h,u,p,g,v,m,f,A,_,S,C,y,U;this._resize=()=>{this._camera&&(this._camera.data.setSize(i.width,i.height),this._camera.update(),r=n.getUniformLocation(this.program,"projection"),n.uniformMatrix4fv(r,!1,this._camera.data.projectionMatrix.buffer),a=n.getUniformLocation(this.program,"viewport"),n.uniform2fv(a,new Float32Array([i.width,i.height])))};const I=()=>{this._worker=PA(),this._worker.onmessage=F=>{if(F.data.depthIndex){const{depthIndex:B}=F.data;this._depthIndex=B,n.bindBuffer(n.ARRAY_BUFFER,U),n.bufferData(n.ARRAY_BUFFER,B,n.STATIC_DRAW)}}};this._initialize=()=>{if(!this._scene||!this._camera){console.error("Cannot render without scene and camera");return}this._resize(),this._scene.addEventListener("objectAdded",x),this._scene.addEventListener("objectRemoved",E);for(const F of this._scene.objects)F instanceof Jt&&F.addEventListener("objectChanged",M);this._renderData=new il(this._scene),o=n.getUniformLocation(this.program,"focal"),n.uniform2fv(o,new Float32Array([this._camera.data.fx,this._camera.data.fy])),c=n.getUniformLocation(this.program,"view"),n.uniformMatrix4fv(c,!1,this._camera.data.viewMatrix.buffer),g=n.getUniformLocation(this.program,"outlineThickness"),n.uniform1f(g,this.outlineThickness),v=n.getUniformLocation(this.program,"outlineColor"),n.uniform4fv(v,new Float32Array(this.outlineColor.flatNorm())),this._splatTexture=n.createTexture(),l=n.getUniformLocation(this.program,"u_texture"),n.uniform1i(l,0),A=n.createTexture(),d=n.getUniformLocation(this.program,"u_transforms"),n.uniform1i(d,1),_=n.createTexture(),h=n.getUniformLocation(this.program,"u_transformIndices"),n.uniform1i(h,2),S=n.createTexture(),u=n.getUniformLocation(this.program,"u_colorTransforms"),n.uniform1i(u,3),C=n.createTexture(),p=n.getUniformLocation(this.program,"u_colorTransformIndices"),n.uniform1i(p,4),y=n.createBuffer(),n.bindBuffer(n.ARRAY_BUFFER,y),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-2,-2,2,-2,2,2,-2,2]),n.STATIC_DRAW),m=n.getAttribLocation(this.program,"position"),n.enableVertexAttribArray(m),n.vertexAttribPointer(m,2,n.FLOAT,!1,0,0),U=n.createBuffer(),f=n.getAttribLocation(this.program,"index"),n.enableVertexAttribArray(f),n.bindBuffer(n.ARRAY_BUFFER,U),I()};const x=F=>{const B=F;B.object instanceof Jt&&B.object.addEventListener("objectChanged",M),R()},E=F=>{const B=F;B.object instanceof Jt&&B.object.removeEventListener("objectChanged",M),R()},M=F=>{const B=F;B.object instanceof Jt&&this._renderData&&this._renderData.markDirty(B.object)},R=()=>{var F,B;(F=this._renderData)==null||F.dispose(),this._renderData=new il(this._scene),(B=this._worker)==null||B.terminate(),I()};this._render=()=>{var F,B;if(!this._scene||!this._camera||!this.renderData){console.error("Cannot render without scene and camera");return}if(this.renderData.needsRebuild&&this.renderData.rebuild(),this.renderData.dataChanged||this.renderData.transformsChanged||this.renderData.colorTransformsChanged){this.renderData.dataChanged&&(n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,this.splatTexture),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.NEAREST),n.texImage2D(n.TEXTURE_2D,0,n.RGBA32UI,this.renderData.width,this.renderData.height,0,n.RGBA_INTEGER,n.UNSIGNED_INT,this.renderData.data)),this.renderData.transformsChanged&&(n.activeTexture(n.TEXTURE1),n.bindTexture(n.TEXTURE_2D,A),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.NEAREST),n.texImage2D(n.TEXTURE_2D,0,n.RGBA32F,this.renderData.transformsWidth,this.renderData.transformsHeight,0,n.RGBA,n.FLOAT,this.renderData.transforms),n.activeTexture(n.TEXTURE2),n.bindTexture(n.TEXTURE_2D,_),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.NEAREST),n.texImage2D(n.TEXTURE_2D,0,n.R32UI,this.renderData.transformIndicesWidth,this.renderData.transformIndicesHeight,0,n.RED_INTEGER,n.UNSIGNED_INT,this.renderData.transformIndices)),this.renderData.colorTransformsChanged&&(n.activeTexture(n.TEXTURE3),n.bindTexture(n.TEXTURE_2D,S),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.NEAREST),n.texImage2D(n.TEXTURE_2D,0,n.RGBA32F,this.renderData.colorTransformsWidth,this.renderData.colorTransformsHeight,0,n.RGBA,n.FLOAT,this.renderData.colorTransforms),n.activeTexture(n.TEXTURE4),n.bindTexture(n.TEXTURE_2D,C),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.NEAREST),n.texImage2D(n.TEXTURE_2D,0,n.R32UI,this.renderData.colorTransformIndicesWidth,this.renderData.colorTransformIndicesHeight,0,n.RED_INTEGER,n.UNSIGNED_INT,this.renderData.colorTransformIndices));const z=new Float32Array(this.renderData.positions.slice().buffer),Q=new Float32Array(this.renderData.transforms.slice().buffer),N=new Uint32Array(this.renderData.transformIndices.slice().buffer);(F=this._worker)==null||F.postMessage({sortData:{positions:z,transforms:Q,transformIndices:N,vertexCount:this.renderData.vertexCount}},[z.buffer,Q.buffer,N.buffer]),this.renderData.dataChanged=!1,this.renderData.transformsChanged=!1,this.renderData.colorTransformsChanged=!1}this._camera.update(),(B=this._worker)==null||B.postMessage({viewProj:this._camera.data.viewProj.buffer}),n.viewport(0,0,i.width,i.height),n.clearColor(0,0,0,0),n.clear(n.COLOR_BUFFER_BIT),n.disable(n.DEPTH_TEST),n.enable(n.BLEND),n.blendFuncSeparate(n.ONE_MINUS_DST_ALPHA,n.ONE,n.ONE_MINUS_DST_ALPHA,n.ONE),n.blendEquationSeparate(n.FUNC_ADD,n.FUNC_ADD),n.uniformMatrix4fv(r,!1,this._camera.data.projectionMatrix.buffer),n.uniformMatrix4fv(c,!1,this._camera.data.viewMatrix.buffer),n.bindBuffer(n.ARRAY_BUFFER,y),n.vertexAttribPointer(m,2,n.FLOAT,!1,0,0),n.bindBuffer(n.ARRAY_BUFFER,U),n.bufferData(n.ARRAY_BUFFER,this.depthIndex,n.STATIC_DRAW),n.vertexAttribIPointer(f,1,n.INT,0,0),n.vertexAttribDivisor(f,1),n.drawArraysInstanced(n.TRIANGLE_FAN,0,4,this.depthIndex.length)},this._dispose=()=>{var F;if(!this._scene||!this._camera||!this.renderData){console.error("Cannot dispose without scene and camera");return}this._scene.removeEventListener("objectAdded",x),this._scene.removeEventListener("objectRemoved",E);for(const B of this._scene.objects)B instanceof Jt&&B.removeEventListener("objectChanged",M);(F=this._worker)==null||F.terminate(),this.renderData.dispose(),n.deleteTexture(this.splatTexture),n.deleteTexture(A),n.deleteTexture(_),n.deleteBuffer(U),n.deleteBuffer(y)},this._setOutlineThickness=F=>{this._outlineThickness=F,this._initialized&&n.uniform1f(g,F)},this._setOutlineColor=F=>{this._outlineColor=F,this._initialized&&n.uniform4fv(v,new Float32Array(F.flatNorm()))}}get renderData(){return this._renderData}get depthIndex(){return this._depthIndex}get splatTexture(){return this._splatTexture}get outlineThickness(){return this._outlineThickness}set outlineThickness(e){this._setOutlineThickness(e)}get outlineColor(){return this._outlineColor}set outlineColor(e){this._setOutlineColor(e)}get worker(){return this._worker}_getVertexSource(){return VA}_getFragmentSource(){return kA}}class dh{constructor(e=1){let t=0,i=!1,n,r,a,o;this.initialize=c=>{if(!(c instanceof sl))throw new Error("FadeInPass requires a RenderProgram");t=c.started?1:0,i=!0,n=c,r=c.renderer.gl,a=r.getUniformLocation(n.program,"useDepthFade"),r.uniform1i(a,1),o=r.getUniformLocation(n.program,"depthFade"),r.uniform1f(o,t)},this.render=()=>{var c;!i||(c=n.renderData)!=null&&c.updating||(r.useProgram(n.program),t=Math.min(t+e*.01,1),t>=1&&(i=!1,r.uniform1i(a,0)),r.uniform1f(o,t))}}dispose(){}}class OA{constructor(e=null,t=null){this._backgroundColor=new nl;const i=e||document.createElement("canvas");e||(i.style.display="block",i.style.boxSizing="border-box",i.style.width="100%",i.style.height="100%",i.style.margin="0",i.style.padding="0",document.body.appendChild(i)),i.style.background=this._backgroundColor.toHexString(),this._canvas=i,this._gl=i.getContext("webgl2",{antialias:!1});const n=t||[];t||n.push(new dh),this._renderProgram=new sl(this,n);const r=[this._renderProgram];this.resize=()=>{const a=i.clientWidth,o=i.clientHeight;(i.width!==a||i.height!==o)&&this.setSize(a,o)},this.setSize=(a,o)=>{i.width=a,i.height=o,this._gl.viewport(0,0,i.width,i.height);for(const c of r)c.resize()},this.render=(a,o)=>{for(const c of r)c.render(a,o)},this.dispose=()=>{for(const a of r)a.dispose()},this.addProgram=a=>{r.push(a)},this.removeProgram=a=>{const o=r.indexOf(a);if(o<0)throw new Error("Program not found");r.splice(o,1)},this.resize()}get canvas(){return this._canvas}get gl(){return this._gl}get renderProgram(){return this._renderProgram}get backgroundColor(){return this._backgroundColor}set backgroundColor(e){this._backgroundColor=e,this._canvas.style.background=e.toHexString()}}class zA{constructor(e,t,i=.5,n=.5,r=5,a=!0,o=new Ae){this.minAngle=-90,this.maxAngle=90,this.minZoom=.1,this.maxZoom=30,this.orbitSpeed=1,this.panSpeed=1,this.zoomSpeed=1,this.dampening=.12,this.setCameraTarget=()=>{};let c=o.clone(),l=c.clone(),d=i,h=n,u=r,p=!1,g=!1,v=0,m=0,f=0;const A={};let _=!1;const S=()=>{if(_)return;const N=e.rotation.toEuler();d=-N.y,h=-N.x;const D=e.position.x-u*Math.sin(d)*Math.cos(h),Z=e.position.y+u*Math.sin(h),$=e.position.z+u*Math.cos(d)*Math.cos(h);l=new Ae(D,Z,$)};e.addEventListener("objectChanged",S),this.setCameraTarget=N=>{const D=N.x-e.position.x,Z=N.y-e.position.y,$=N.z-e.position.z;u=Math.sqrt(D*D+Z*Z+$*$),h=Math.atan2(Z,Math.sqrt(D*D+$*$)),d=-Math.atan2(D,$),l=new Ae(N.x,N.y,N.z)};const C=()=>.1+.9*(u-this.minZoom)/(this.maxZoom-this.minZoom),y=N=>{A[N.code]=!0,N.code==="ArrowUp"&&(A.KeyW=!0),N.code==="ArrowDown"&&(A.KeyS=!0),N.code==="ArrowLeft"&&(A.KeyA=!0),N.code==="ArrowRight"&&(A.KeyD=!0)},U=N=>{A[N.code]=!1,N.code==="ArrowUp"&&(A.KeyW=!1),N.code==="ArrowDown"&&(A.KeyS=!1),N.code==="ArrowLeft"&&(A.KeyA=!1),N.code==="ArrowRight"&&(A.KeyD=!1)},I=N=>{Q(N),p=!0,g=N.button===2,m=N.clientX,f=N.clientY,window.addEventListener("mouseup",x)},x=N=>{Q(N),p=!1,g=!1,window.removeEventListener("mouseup",x)},E=N=>{if(Q(N),!p||!e)return;const D=N.clientX-m,Z=N.clientY-f;if(g){const $=C(),ae=-D*this.panSpeed*.01*$,be=-Z*this.panSpeed*.01*$,Be=Vt.RotationFromQuaternion(e.rotation).buffer,k=new Ae(Be[0],Be[3],Be[6]),Y=new Ae(Be[1],Be[4],Be[7]);l=l.add(k.multiply(ae)),l=l.add(Y.multiply(be))}else d-=D*this.orbitSpeed*.003,h+=Z*this.orbitSpeed*.003,h=Math.min(Math.max(h,this.minAngle*Math.PI/180),this.maxAngle*Math.PI/180);m=N.clientX,f=N.clientY},M=N=>{Q(N);const D=C();u+=N.deltaY*this.zoomSpeed*.025*D,u=Math.min(Math.max(u,this.minZoom),this.maxZoom)},R=N=>{if(Q(N),N.touches.length===1)p=!0,g=!1,m=N.touches[0].clientX,f=N.touches[0].clientY,v=0;else if(N.touches.length===2){p=!0,g=!0,m=(N.touches[0].clientX+N.touches[1].clientX)/2,f=(N.touches[0].clientY+N.touches[1].clientY)/2;const D=N.touches[0].clientX-N.touches[1].clientX,Z=N.touches[0].clientY-N.touches[1].clientY;v=Math.sqrt(D*D+Z*Z)}},F=N=>{Q(N),p=!1,g=!1},B=N=>{if(Q(N),!(!p||!e))if(g){const D=C(),Z=N.touches[0].clientX-N.touches[1].clientX,$=N.touches[0].clientY-N.touches[1].clientY,ae=Math.sqrt(Z*Z+$*$),be=v-ae;u+=be*this.zoomSpeed*.1*D,u=Math.min(Math.max(u,this.minZoom),this.maxZoom),v=ae;const Be=(N.touches[0].clientX+N.touches[1].clientX)/2,k=(N.touches[0].clientY+N.touches[1].clientY)/2,Y=Be-m,se=k-f,ee=Vt.RotationFromQuaternion(e.rotation).buffer,ge=new Ae(ee[0],ee[3],ee[6]),Ee=new Ae(ee[1],ee[4],ee[7]);l=l.add(ge.multiply(-Y*this.panSpeed*.025*D)),l=l.add(Ee.multiply(-se*this.panSpeed*.025*D)),m=Be,f=k}else{const D=N.touches[0].clientX-m,Z=N.touches[0].clientY-f;d-=D*this.orbitSpeed*.003,h+=Z*this.orbitSpeed*.003,h=Math.min(Math.max(h,this.minAngle*Math.PI/180),this.maxAngle*Math.PI/180),m=N.touches[0].clientX,f=N.touches[0].clientY}},z=(N,D,Z)=>(1-Z)*N+Z*D;this.update=()=>{_=!0,i=z(i,d,this.dampening),n=z(n,h,this.dampening),r=z(r,u,this.dampening),c=c.lerp(l,this.dampening);const N=c.x+r*Math.sin(i)*Math.cos(n),D=c.y-r*Math.sin(n),Z=c.z-r*Math.cos(i)*Math.cos(n);e.position=new Ae(N,D,Z);const $=c.subtract(e.position).normalize(),ae=Math.asin(-$.y),be=Math.atan2($.x,$.z);e.rotation=ct.FromEuler(new Ae(ae,be,0));const Be=.025,k=.01,Y=Vt.RotationFromQuaternion(e.rotation).buffer,se=new Ae(-Y[2],-Y[5],-Y[8]),ee=new Ae(Y[0],Y[3],Y[6]);A.KeyS&&(l=l.add(se.multiply(Be))),A.KeyW&&(l=l.subtract(se.multiply(Be))),A.KeyA&&(l=l.subtract(ee.multiply(Be))),A.KeyD&&(l=l.add(ee.multiply(Be))),A.KeyE&&(d+=k),A.KeyQ&&(d-=k),A.KeyR&&(h+=k),A.KeyF&&(h-=k),_=!1};const Q=N=>{N.preventDefault(),N.stopPropagation()};this.dispose=()=>{t.removeEventListener("dragenter",Q),t.removeEventListener("dragover",Q),t.removeEventListener("dragleave",Q),t.removeEventListener("contextmenu",Q),t.removeEventListener("mousedown",I),t.removeEventListener("mousemove",E),t.removeEventListener("wheel",M),t.removeEventListener("touchstart",R),t.removeEventListener("touchend",F),t.removeEventListener("touchmove",B),a&&(window.removeEventListener("keydown",y),window.removeEventListener("keyup",U))},a&&(window.addEventListener("keydown",y),window.addEventListener("keyup",U)),t.addEventListener("dragenter",Q),t.addEventListener("dragover",Q),t.addEventListener("dragleave",Q),t.addEventListener("contextmenu",Q),t.addEventListener("mousedown",I),t.addEventListener("mousemove",E),t.addEventListener("wheel",M),t.addEventListener("touchstart",R),t.addEventListener("touchend",F),t.addEventListener("touchmove",B),this.update()}}class WA{constructor(e,t){this.moveSpeed=1.5,this.lookSpeed=.7,this.dampening=.5;const i={};let n=e.rotation.toEuler().x,r=e.rotation.toEuler().y,a=e.position,o=!1;const c=()=>{t.requestPointerLock()},l=()=>{o=document.pointerLockElement===t,o?t.addEventListener("mousemove",d):t.removeEventListener("mousemove",d)},d=g=>{const v=g.movementX,m=g.movementY;r+=v*this.lookSpeed*.001,n-=m*this.lookSpeed*.001,n=Math.max(-Math.PI/2,Math.min(Math.PI/2,n))},h=g=>{i[g.code]=!0,g.code==="ArrowUp"&&(i.KeyW=!0),g.code==="ArrowDown"&&(i.KeyS=!0),g.code==="ArrowLeft"&&(i.KeyA=!0),g.code==="ArrowRight"&&(i.KeyD=!0)},u=g=>{i[g.code]=!1,g.code==="ArrowUp"&&(i.KeyW=!1),g.code==="ArrowDown"&&(i.KeyS=!1),g.code==="ArrowLeft"&&(i.KeyA=!1),g.code==="ArrowRight"&&(i.KeyD=!1),g.code==="Escape"&&document.exitPointerLock()};this.update=()=>{const g=Vt.RotationFromQuaternion(e.rotation).buffer,v=new Ae(-g[2],-g[5],-g[8]),m=new Ae(g[0],g[3],g[6]);let f=new Ae(0,0,0);i.KeyS&&(f=f.add(v)),i.KeyW&&(f=f.subtract(v)),i.KeyA&&(f=f.subtract(m)),i.KeyD&&(f=f.add(m)),f=new Ae(f.x,0,f.z),f.magnitude()>0&&(f=f.normalize()),a=a.add(f.multiply(this.moveSpeed*.01)),e.position=e.position.add(a.subtract(e.position).multiply(this.dampening)),e.rotation=ct.FromEuler(new Ae(n,r,0))};const p=g=>{g.preventDefault(),g.stopPropagation()};this.dispose=()=>{t.removeEventListener("dragenter",p),t.removeEventListener("dragover",p),t.removeEventListener("dragleave",p),t.removeEventListener("contextmenu",p),t.removeEventListener("mousedown",c),document.removeEventListener("pointerlockchange",l),window.removeEventListener("keydown",h),window.removeEventListener("keyup",u)},window.addEventListener("keydown",h),window.addEventListener("keyup",u),t.addEventListener("dragenter",p),t.addEventListener("dragover",p),t.addEventListener("dragleave",p),t.addEventListener("contextmenu",p),t.addEventListener("mousedown",c),document.addEventListener("pointerlockchange",l),this.update()}}class GA{constructor(e,t){this.normal=e,this.point=t}intersect(e,t){const i=this.normal.dot(t);if(Math.abs(i)<1e-4)return null;const n=this.normal.dot(this.point.subtract(e))/i;return n<0?null:e.add(t.multiply(n))}}class HA{initialize(e){}render(){}dispose(){}}const JA=`#version 300 es
precision highp float;
precision highp int;
  
uniform highp usampler2D u_texture;
uniform mat4 projection, view;
uniform vec2 focal;
uniform vec2 viewport;
uniform float time;
  
in vec2 position;
in int index;
  
out vec4 vColor;
out vec2 vPosition;
  
void main () {
    gl_Position = vec4(0.0, 0.0, 2.0, 1.0);

    uvec4 motion1 = texelFetch(u_texture, ivec2(((uint(index) & 0x3ffu) << 2) | 3u, uint(index) >> 10), 0);
    vec2 trbf = unpackHalf2x16(motion1.w);
    float dt = time - trbf.x;

    float topacity = exp(-1.0 * pow(dt / trbf.y, 2.0));
    if(topacity < 0.02) return;

    uvec4 motion0 = texelFetch(u_texture, ivec2(((uint(index) & 0x3ffu) << 2) | 2u, uint(index) >> 10), 0);
    uvec4 static0 = texelFetch(u_texture, ivec2(((uint(index) & 0x3ffu) << 2), uint(index) >> 10), 0);

    vec2 m0 = unpackHalf2x16(motion0.x), m1 = unpackHalf2x16(motion0.y), m2 = unpackHalf2x16(motion0.z), 
         m3 = unpackHalf2x16(motion0.w), m4 = unpackHalf2x16(motion1.x); 
      
    vec4 trot = vec4(unpackHalf2x16(motion1.y).xy, unpackHalf2x16(motion1.z).xy) * dt;
    vec3 tpos = (vec3(m0.xy, m1.x) * dt + vec3(m1.y, m2.xy) * dt*dt + vec3(m3.xy, m4.x) * dt*dt*dt);
      
    vec4 cam = view * vec4(uintBitsToFloat(static0.xyz) + tpos, 1);
    vec4 pos = projection * cam;
  
    float clip = 1.2 * pos.w;
    if (pos.z < -clip || pos.x < -clip || pos.x > clip || pos.y < -clip || pos.y > clip) return;
    uvec4 static1 = texelFetch(u_texture, ivec2(((uint(index) & 0x3ffu) << 2) | 1u, uint(index) >> 10), 0);

    vec4 rot = vec4(unpackHalf2x16(static0.w).xy, unpackHalf2x16(static1.x).xy) + trot;
    vec3 scale = vec3(unpackHalf2x16(static1.y).xy, unpackHalf2x16(static1.z).x);
    rot /= sqrt(dot(rot, rot));
  
    mat3 S = mat3(scale.x, 0.0, 0.0, 0.0, scale.y, 0.0, 0.0, 0.0, scale.z);
    mat3 R = mat3(
        1.0 - 2.0 * (rot.z * rot.z + rot.w * rot.w), 2.0 * (rot.y * rot.z - rot.x * rot.w), 2.0 * (rot.y * rot.w + rot.x * rot.z),
        2.0 * (rot.y * rot.z + rot.x * rot.w), 1.0 - 2.0 * (rot.y * rot.y + rot.w * rot.w), 2.0 * (rot.z * rot.w - rot.x * rot.y),
        2.0 * (rot.y * rot.w - rot.x * rot.z), 2.0 * (rot.z * rot.w + rot.x * rot.y), 1.0 - 2.0 * (rot.y * rot.y + rot.z * rot.z));
    mat3 M = S * R;
    mat3 Vrk = 4.0 * transpose(M) * M;
    mat3 J = mat3(
        focal.x / cam.z, 0., -(focal.x * cam.x) / (cam.z * cam.z), 
        0., -focal.y / cam.z, (focal.y * cam.y) / (cam.z * cam.z), 
        0., 0., 0.
    );
  
    mat3 T = transpose(mat3(view)) * J;
    mat3 cov2d = transpose(T) * Vrk * T;
  
    float mid = (cov2d[0][0] + cov2d[1][1]) / 2.0;
    float radius = length(vec2((cov2d[0][0] - cov2d[1][1]) / 2.0, cov2d[0][1]));
    float lambda1 = mid + radius, lambda2 = mid - radius;
  
    if(lambda2 < 0.0) return;
    vec2 diagonalVector = normalize(vec2(cov2d[0][1], lambda1 - cov2d[0][0]));
    vec2 majorAxis = min(sqrt(2.0 * lambda1), 1024.0) * diagonalVector;
    vec2 minorAxis = min(sqrt(2.0 * lambda2), 1024.0) * vec2(diagonalVector.y, -diagonalVector.x);
      
    uint rgba = static1.w;
    vColor = 
        clamp(pos.z/pos.w+1.0, 0.0, 1.0) * 
        vec4(1.0, 1.0, 1.0, topacity) *
        vec4(
            (rgba) & 0xffu, 
            (rgba >> 8) & 0xffu, 
            (rgba >> 16) & 0xffu, 
            (rgba >> 24) & 0xffu) / 255.0;

    vec2 vCenter = vec2(pos) / pos.w;
    gl_Position = vec4(
        vCenter 
        + position.x * majorAxis / viewport 
        + position.y * minorAxis / viewport, 0.0, 1.0);

    vPosition = position;
}
`,ZA=`#version 300 es
precision highp float;
  
in vec4 vColor;
in vec2 vPosition;

out vec4 fragColor;

void main () {
    float A = -dot(vPosition, vPosition);
    if (A < -4.0) discard;
    float B = exp(A) * vColor.a;
    fragColor = vec4(B * vColor.rgb, B);
}
`;class XA extends tl{constructor(e,t=[]){super(e,t),this._renderData=null,this._depthIndex=new Uint32Array,this._splatTexture=null;const i=e.canvas,n=e.gl;let r,a,o,c,l,d,h,u,p,g,v;this._resize=()=>{this._camera&&(this._camera.data.setSize(i.width,i.height),this._camera.update(),a=n.getUniformLocation(this.program,"projection"),n.uniformMatrix4fv(a,!1,this._camera.data.projectionMatrix.buffer),o=n.getUniformLocation(this.program,"viewport"),n.uniform2fv(o,new Float32Array([i.width,i.height])))};const m=()=>{if(e.renderProgram.worker===null){console.error("Render program is not initialized. Cannot render without worker");return}r=e.renderProgram.worker,r.onmessage=S=>{if(S.data.depthIndex){const{depthIndex:C}=S.data;this._depthIndex=C,n.bindBuffer(n.ARRAY_BUFFER,v),n.bufferData(n.ARRAY_BUFFER,C,n.STATIC_DRAW)}}};this._initialize=()=>{if(!this._scene||!this._camera){console.error("Cannot render without scene and camera");return}this._resize(),this._scene.addEventListener("objectAdded",f),this._scene.addEventListener("objectRemoved",A);for(const U of this._scene.objects)U instanceof xn&&(this._renderData===null?(this._renderData=U.data,U.addEventListener("objectChanged",_)):console.warn("Multiple Splatv objects are not currently supported"));if(this._renderData===null){console.error("Cannot render without Splatv object");return}c=n.getUniformLocation(this.program,"focal"),n.uniform2fv(c,new Float32Array([this._camera.data.fx,this._camera.data.fy])),l=n.getUniformLocation(this.program,"view"),n.uniformMatrix4fv(l,!1,this._camera.data.viewMatrix.buffer),this._splatTexture=n.createTexture(),d=n.getUniformLocation(this.program,"u_texture"),n.uniform1i(d,0),h=n.getUniformLocation(this.program,"time"),n.uniform1f(h,Math.sin(Date.now()/1e3)/2+1/2),g=n.createBuffer(),n.bindBuffer(n.ARRAY_BUFFER,g),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-2,-2,2,-2,2,2,-2,2]),n.STATIC_DRAW),u=n.getAttribLocation(this.program,"position"),n.enableVertexAttribArray(u),n.vertexAttribPointer(u,2,n.FLOAT,!1,0,0),v=n.createBuffer(),p=n.getAttribLocation(this.program,"index"),n.enableVertexAttribArray(p),n.bindBuffer(n.ARRAY_BUFFER,v),m(),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,this._splatTexture),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.NEAREST),n.texImage2D(n.TEXTURE_2D,0,n.RGBA32UI,this._renderData.width,this._renderData.height,0,n.RGBA_INTEGER,n.UNSIGNED_INT,this._renderData.data);const S=this._renderData.positions,C=new Float32Array(new Pt().buffer),y=new Uint32Array(this._renderData.vertexCount);y.fill(0),r.postMessage({sortData:{positions:S,transforms:C,transformIndices:y,vertexCount:this._renderData.vertexCount}},[S.buffer,C.buffer,y.buffer])};const f=S=>{const C=S;C.object instanceof xn&&(this._renderData===null?(this._renderData=C.object.data,C.object.addEventListener("objectChanged",_)):console.warn("Splatv not supported by default RenderProgram. Use VideoRenderProgram instead.")),this.dispose()},A=S=>{const C=S;C.object instanceof xn&&this._renderData===C.object.data&&(this._renderData=null,C.object.removeEventListener("objectChanged",_)),this.dispose()},_=S=>{const C=S;C.object instanceof xn&&this._renderData===C.object.data&&this.dispose()};this._render=()=>{if(!this._scene||!this._camera){console.error("Cannot render without scene and camera");return}if(!this._renderData){console.warn("Cannot render without Splatv object");return}this._camera.update(),r.postMessage({viewProj:this._camera.data.viewProj.buffer}),n.viewport(0,0,i.width,i.height),n.clearColor(0,0,0,0),n.clear(n.COLOR_BUFFER_BIT),n.disable(n.DEPTH_TEST),n.enable(n.BLEND),n.blendFuncSeparate(n.ONE_MINUS_DST_ALPHA,n.ONE,n.ONE_MINUS_DST_ALPHA,n.ONE),n.blendEquationSeparate(n.FUNC_ADD,n.FUNC_ADD),n.uniformMatrix4fv(a,!1,this._camera.data.projectionMatrix.buffer),n.uniformMatrix4fv(l,!1,this._camera.data.viewMatrix.buffer),n.uniform1f(h,Math.sin(Date.now()/1e3)/2+1/2),n.bindBuffer(n.ARRAY_BUFFER,g),n.vertexAttribPointer(u,2,n.FLOAT,!1,0,0),n.bindBuffer(n.ARRAY_BUFFER,v),n.bufferData(n.ARRAY_BUFFER,this._depthIndex,n.STATIC_DRAW),n.vertexAttribIPointer(p,1,n.INT,0,0),n.vertexAttribDivisor(p,1),n.drawArraysInstanced(n.TRIANGLE_FAN,0,4,this._renderData.vertexCount)},this._dispose=()=>{if(!this._scene||!this._camera){console.error("Cannot dispose without scene and camera");return}this._scene.removeEventListener("objectAdded",f),this._scene.removeEventListener("objectRemoved",A);for(const S of this._scene.objects)S instanceof xn&&this._renderData===S.data&&(this._renderData=null,S.removeEventListener("objectChanged",_));r==null||r.terminate(),n.deleteTexture(this._splatTexture),n.deleteBuffer(v),n.deleteBuffer(g)}}get renderData(){return this._renderData}_getVertexSource(){return JA}_getFragmentSource(){return ZA}}class Zr{constructor(e,t,i){this.bounds=e,this.boxes=t,this.left=null,this.right=null,this.pointIndices=[],i.length>1?this.split(e,t,i):i.length>0&&(this.pointIndices=i)}split(e,t,i){const n=e.size().maxComponent();i.sort((c,l)=>t[c].center().getComponent(n)-t[l].center().getComponent(n));const r=Math.floor(i.length/2),a=i.slice(0,r),o=i.slice(r);this.left=new Zr(e,t,a),this.right=new Zr(e,t,o)}queryRange(e){return this.bounds.intersects(e)?this.left!==null&&this.right!==null?this.left.queryRange(e).concat(this.right.queryRange(e)):this.pointIndices.filter(t=>e.intersects(this.boxes[t])):[]}}class YA{constructor(e,t){const i=t.map((n,r)=>r);this.root=new Zr(e,t,i)}queryRange(e){return this.root.queryRange(e)}}class KA{constructor(e,t=100,i=1){let n=0,r=null,a=[];const o=()=>{if(e.renderData===null){console.error("IntersectionTester cannot be called before renderProgram has been initialized");return}a=[];const c=e.renderData,l=new Array(c.offsets.size);let d=0;const h=new Ns(new Ae(1/0,1/0,1/0),new Ae(-1/0,-1/0,-1/0));for(const u of c.offsets.keys()){const p=u.bounds;l[d++]=p,h.expand(p.min),h.expand(p.max),a.push(u)}h.permute(),r=new YA(h,l),n=c.vertexCount};this.testPoint=(c,l)=>{if(e.renderData===null||e.camera===null)return console.error("IntersectionTester cannot be called before renderProgram has been initialized"),null;if(o(),r===null)return console.error("Failed to build octree for IntersectionTester"),null;const d=e.renderData,h=e.camera;n!==d.vertexCount&&console.warn("IntersectionTester has not been rebuilt since the last render");const u=h.screenPointToRay(c,l);for(let p=0;p<t;p+=i){const g=h.position.add(u.multiply(p)),v=new Ae(g.x-i/2,g.y-i/2,g.z-i/2),m=new Ae(g.x+i/2,g.y+i/2,g.z+i/2),f=new Ns(v,m),A=r.queryRange(f);if(A.length>0)return a[A[0]]}return null}}}const jA=Object.freeze(Object.defineProperty({__proto__:null,Camera:UA,CameraData:rh,Color32:nl,FPSControls:WA,FadeInPass:dh,IntersectionTester:KA,Loader:TA,Matrix3:Vt,Matrix4:Pt,Object3D:Hr,OrbitControls:zA,PLYLoader:FA,Plane:GA,Quaternion:ct,RenderData:il,RenderProgram:sl,Scene:MA,ShaderPass:HA,ShaderProgram:tl,Splat:Jt,SplatData:ai,Splatv:xn,SplatvData:Jr,SplatvLoader:IA,Vector3:Ae,Vector4:Zt,VideoRenderProgram:XA,WebGLRenderer:OA},Symbol.toStringTag,{value:"Module"}));ft.CcSwiper=wl,ft.CcSwiperSlide=bl,ft.CcViewer=nh,ft.CcViewer3DModel=th,ft.CcViewerBase=sn,ft.CcViewerGaussian=ih,ft.CcViewerImage=sc,ft.CcViewerPanorama=rc,ft.CcViewerVideo=oc,ft.CcViewerYoutube=ac,ft.ChuciElement=xi,Object.defineProperty(ft,Symbol.toStringTag,{value:"Module"})}));
