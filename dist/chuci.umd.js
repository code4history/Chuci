(function(Ct,an){typeof exports=="object"&&typeof module<"u"?an(exports):typeof define=="function"&&define.amd?define(["exports"],an):(Ct=typeof globalThis<"u"?globalThis:Ct||self,an(Ct.Chuci={}))})(this,(function(Ct){"use strict";var an=typeof document<"u"?document.currentScript:null;class mr extends HTMLElement{_shadowRoot;_connected=!1;constructor(){super(),this._shadowRoot=this.attachShadow({mode:"open"})}connectedCallback(){this._connected?this.render():(this._connected=!0,this.render(),this.firstUpdated())}disconnectedCallback(){this._connected=!1}attributeChangedCallback(e,t,i){t!==i&&this.render()}firstUpdated(){}html(e,...t){return e.reduce((i,r,s)=>i+r+(t[s]||""),"")}css(e,...t){return`<style>${e.reduce((r,s,a)=>r+s+(t[a]||""),"")}</style>`}updateShadowRoot(e){this._shadowRoot.innerHTML=e}query(e){return this._shadowRoot.querySelector(e)}queryAll(e){return this._shadowRoot.querySelectorAll(e)}dispatch(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}}function cl(n){return n!==null&&typeof n=="object"&&"constructor"in n&&n.constructor===Object}function ea(n={},e={}){const t=["__proto__","constructor","prototype"];Object.keys(e).filter(i=>t.indexOf(i)<0).forEach(i=>{typeof n[i]>"u"?n[i]=e[i]:cl(e[i])&&cl(n[i])&&Object.keys(e[i]).length>0&&ea(n[i],e[i])})}const dl={body:{},addEventListener(){},removeEventListener(){},activeElement:{blur(){},nodeName:""},querySelector(){return null},querySelectorAll(){return[]},getElementById(){return null},createEvent(){return{initEvent(){}}},createElement(){return{children:[],childNodes:[],style:{},setAttribute(){},getElementsByTagName(){return[]}}},createElementNS(){return{}},importNode(){return null},location:{hash:"",host:"",hostname:"",href:"",origin:"",pathname:"",protocol:"",search:""}};function Vt(){const n=typeof document<"u"?document:{};return ea(n,dl),n}const wh={document:dl,navigator:{userAgent:""},location:{hash:"",host:"",hostname:"",href:"",origin:"",pathname:"",protocol:"",search:""},history:{replaceState(){},pushState(){},go(){},back(){}},CustomEvent:function(){return this},addEventListener(){},removeEventListener(){},getComputedStyle(){return{getPropertyValue(){return""}}},Image(){},Date(){},screen:{},setTimeout(){},clearTimeout(){},matchMedia(){return{}},requestAnimationFrame(n){return typeof setTimeout>"u"?(n(),null):setTimeout(n,0)},cancelAnimationFrame(n){typeof setTimeout>"u"||clearTimeout(n)}};function Ut(){const n=typeof window<"u"?window:{};return ea(n,wh),n}function Gi(n=""){return n.trim().split(" ").filter(e=>!!e.trim())}function Ch(n){const e=n;Object.keys(e).forEach(t=>{try{e[t]=null}catch{}try{delete e[t]}catch{}})}function ta(n,e=0){return setTimeout(n,e)}function Or(){return Date.now()}function Uh(n){const e=Ut();let t;return e.getComputedStyle&&(t=e.getComputedStyle(n,null)),!t&&n.currentStyle&&(t=n.currentStyle),t||(t=n.style),t}function Mh(n,e="x"){const t=Ut();let i,r,s;const a=Uh(n);return t.WebKitCSSMatrix?(r=a.transform||a.webkitTransform,r.split(",").length>6&&(r=r.split(", ").map(o=>o.replace(",",".")).join(", ")),s=new t.WebKitCSSMatrix(r==="none"?"":r)):(s=a.MozTransform||a.OTransform||a.MsTransform||a.msTransform||a.transform||a.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),i=s.toString().split(",")),e==="x"&&(t.WebKitCSSMatrix?r=s.m41:i.length===16?r=parseFloat(i[12]):r=parseFloat(i[4])),e==="y"&&(t.WebKitCSSMatrix?r=s.m42:i.length===16?r=parseFloat(i[13]):r=parseFloat(i[5])),r||0}function gr(n){return typeof n=="object"&&n!==null&&n.constructor&&Object.prototype.toString.call(n).slice(8,-1)==="Object"}function Th(n){return typeof window<"u"&&typeof window.HTMLElement<"u"?n instanceof HTMLElement:n&&(n.nodeType===1||n.nodeType===11)}function Xt(...n){const e=Object(n[0]);for(let t=1;t<n.length;t+=1){const i=n[t];if(i!=null&&!Th(i)){const r=Object.keys(Object(i)).filter(s=>s!=="__proto__"&&s!=="constructor"&&s!=="prototype");for(let s=0,a=r.length;s<a;s+=1){const o=r[s],l=Object.getOwnPropertyDescriptor(i,o);l!==void 0&&l.enumerable&&(gr(e[o])&&gr(i[o])?i[o].__swiper__?e[o]=i[o]:Xt(e[o],i[o]):!gr(e[o])&&gr(i[o])?(e[o]={},i[o].__swiper__?e[o]=i[o]:Xt(e[o],i[o])):e[o]=i[o])}}}return e}function Un(n,e,t){n.style.setProperty(e,t)}function hl({swiper:n,targetPosition:e,side:t}){const i=Ut(),r=-n.translate;let s=null,a;const o=n.params.speed;n.wrapperEl.style.scrollSnapType="none",i.cancelAnimationFrame(n.cssModeFrameID);const l=e>r?"next":"prev",c=(h,f)=>l==="next"&&h>=f||l==="prev"&&h<=f,d=()=>{a=new Date().getTime(),s===null&&(s=a);const h=Math.max(Math.min((a-s)/o,1),0),f=.5-Math.cos(h*Math.PI)/2;let u=r+f*(e-r);if(c(u,e)&&(u=e),n.wrapperEl.scrollTo({[t]:u}),c(u,e)){n.wrapperEl.style.overflow="hidden",n.wrapperEl.style.scrollSnapType="",setTimeout(()=>{n.wrapperEl.style.overflow="",n.wrapperEl.scrollTo({[t]:u})}),i.cancelAnimationFrame(n.cssModeFrameID);return}n.cssModeFrameID=i.requestAnimationFrame(d)};d()}function ci(n,e=""){const t=Ut(),i=[...n.children];return t.HTMLSlotElement&&n instanceof HTMLSlotElement&&i.push(...n.assignedElements()),e?i.filter(r=>r.matches(e)):i}function Fh(n,e){const t=[e];for(;t.length>0;){const i=t.shift();if(n===i)return!0;t.push(...i.children,...i.shadowRoot?i.shadowRoot.children:[],...i.assignedElements?i.assignedElements():[])}}function Ih(n,e){const t=Ut();let i=e.contains(n);return!i&&t.HTMLSlotElement&&e instanceof HTMLSlotElement&&(i=[...e.assignedElements()].includes(n),i||(i=Fh(n,e))),i}function zr(n){try{console.warn(n);return}catch{}}function vr(n,e=[]){const t=document.createElement(n);return t.classList.add(...Array.isArray(e)?e:Gi(e)),t}function ul(n){const e=Ut(),t=Vt(),i=n.getBoundingClientRect(),r=t.body,s=n.clientTop||r.clientTop||0,a=n.clientLeft||r.clientLeft||0,o=n===e?e.scrollY:n.scrollTop,l=n===e?e.scrollX:n.scrollLeft;return{top:i.top+o-s,left:i.left+l-a}}function Rh(n,e){const t=[];for(;n.previousElementSibling;){const i=n.previousElementSibling;e?i.matches(e)&&t.push(i):t.push(i),n=i}return t}function Bh(n,e){const t=[];for(;n.nextElementSibling;){const i=n.nextElementSibling;e?i.matches(e)&&t.push(i):t.push(i),n=i}return t}function Hi(n,e){return Ut().getComputedStyle(n,null).getPropertyValue(e)}function Wr(n){let e=n,t;if(e){for(t=0;(e=e.previousSibling)!==null;)e.nodeType===1&&(t+=1);return t}}function Gr(n,e){const t=[];let i=n.parentElement;for(;i;)e?i.matches(e)&&t.push(i):t.push(i),i=i.parentElement;return t}function ia(n,e,t){const i=Ut();return n[e==="width"?"offsetWidth":"offsetHeight"]+parseFloat(i.getComputedStyle(n,null).getPropertyValue(e==="width"?"margin-right":"margin-top"))+parseFloat(i.getComputedStyle(n,null).getPropertyValue(e==="width"?"margin-left":"margin-bottom"))}function St(n){return(Array.isArray(n)?n:[n]).filter(e=>!!e)}function na(n,e=""){typeof trustedTypes<"u"?n.innerHTML=trustedTypes.createPolicy("html",{createHTML:t=>t}).createHTML(e):n.innerHTML=e}let ra;function Dh(){const n=Ut(),e=Vt();return{smoothScroll:e.documentElement&&e.documentElement.style&&"scrollBehavior"in e.documentElement.style,touch:!!("ontouchstart"in n||n.DocumentTouch&&e instanceof n.DocumentTouch)}}function fl(){return ra||(ra=Dh()),ra}let sa;function Qh({userAgent:n}={}){const e=fl(),t=Ut(),i=t.navigator.platform,r=n||t.navigator.userAgent,s={ios:!1,android:!1},a=t.screen.width,o=t.screen.height,l=r.match(/(Android);?[\s\/]+([\d.]+)?/);let c=r.match(/(iPad)(?!\1).*OS\s([\d_]+)/);const d=r.match(/(iPod)(.*OS\s([\d_]+))?/),h=!c&&r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),f=i==="Win32";let u=i==="MacIntel";const g=["1024x1366","1366x1024","834x1194","1194x834","834x1112","1112x834","768x1024","1024x768","820x1180","1180x820","810x1080","1080x810"];return!c&&u&&e.touch&&g.indexOf(`${a}x${o}`)>=0&&(c=r.match(/(Version)\/([\d.]+)/),c||(c=[0,1,"13_0_0"]),u=!1),l&&!f&&(s.os="android",s.android=!0),(c||h||d)&&(s.os="ios",s.ios=!0),s}function pl(n={}){return sa||(sa=Qh(n)),sa}let aa;function Nh(){const n=Ut(),e=pl();let t=!1;function i(){const o=n.navigator.userAgent.toLowerCase();return o.indexOf("safari")>=0&&o.indexOf("chrome")<0&&o.indexOf("android")<0}if(i()){const o=String(n.navigator.userAgent);if(o.includes("Version/")){const[l,c]=o.split("Version/")[1].split(" ")[0].split(".").map(d=>Number(d));t=l<16||l===16&&c<2}}const r=/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(n.navigator.userAgent),s=i(),a=s||r&&e.ios;return{isSafari:t||s,needPerspectiveFix:t,need3dFix:a,isWebView:r}}function ml(){return aa||(aa=Nh()),aa}function Lh({swiper:n,on:e,emit:t}){const i=Ut();let r=null,s=null;const a=()=>{!n||n.destroyed||!n.initialized||(t("beforeResize"),t("resize"))},o=()=>{!n||n.destroyed||!n.initialized||(r=new ResizeObserver(d=>{s=i.requestAnimationFrame(()=>{const{width:h,height:f}=n;let u=h,g=f;d.forEach(({contentBoxSize:v,contentRect:m,target:p})=>{p&&p!==n.el||(u=m?m.width:(v[0]||v).inlineSize,g=m?m.height:(v[0]||v).blockSize)}),(u!==h||g!==f)&&a()})}),r.observe(n.el))},l=()=>{s&&i.cancelAnimationFrame(s),r&&r.unobserve&&n.el&&(r.unobserve(n.el),r=null)},c=()=>{!n||n.destroyed||!n.initialized||t("orientationchange")};e("init",()=>{if(n.params.resizeObserver&&typeof i.ResizeObserver<"u"){o();return}i.addEventListener("resize",a),i.addEventListener("orientationchange",c)}),e("destroy",()=>{l(),i.removeEventListener("resize",a),i.removeEventListener("orientationchange",c)})}function Ph({swiper:n,extendParams:e,on:t,emit:i}){const r=[],s=Ut(),a=(c,d={})=>{const h=s.MutationObserver||s.WebkitMutationObserver,f=new h(u=>{if(n.__preventObserver__)return;if(u.length===1){i("observerUpdate",u[0]);return}const g=function(){i("observerUpdate",u[0])};s.requestAnimationFrame?s.requestAnimationFrame(g):s.setTimeout(g,0)});f.observe(c,{attributes:typeof d.attributes>"u"?!0:d.attributes,childList:n.isElement||(typeof d.childList>"u"?!0:d).childList,characterData:typeof d.characterData>"u"?!0:d.characterData}),r.push(f)},o=()=>{if(n.params.observer){if(n.params.observeParents){const c=Gr(n.hostEl);for(let d=0;d<c.length;d+=1)a(c[d])}a(n.hostEl,{childList:n.params.observeSlideChildren}),a(n.wrapperEl,{attributes:!1})}},l=()=>{r.forEach(c=>{c.disconnect()}),r.splice(0,r.length)};e({observer:!1,observeParents:!1,observeSlideChildren:!1}),t("init",o),t("destroy",l)}var Vh={on(n,e,t){const i=this;if(!i.eventsListeners||i.destroyed||typeof e!="function")return i;const r=t?"unshift":"push";return n.split(" ").forEach(s=>{i.eventsListeners[s]||(i.eventsListeners[s]=[]),i.eventsListeners[s][r](e)}),i},once(n,e,t){const i=this;if(!i.eventsListeners||i.destroyed||typeof e!="function")return i;function r(...s){i.off(n,r),r.__emitterProxy&&delete r.__emitterProxy,e.apply(i,s)}return r.__emitterProxy=e,i.on(n,r,t)},onAny(n,e){const t=this;if(!t.eventsListeners||t.destroyed||typeof n!="function")return t;const i=e?"unshift":"push";return t.eventsAnyListeners.indexOf(n)<0&&t.eventsAnyListeners[i](n),t},offAny(n){const e=this;if(!e.eventsListeners||e.destroyed||!e.eventsAnyListeners)return e;const t=e.eventsAnyListeners.indexOf(n);return t>=0&&e.eventsAnyListeners.splice(t,1),e},off(n,e){const t=this;return!t.eventsListeners||t.destroyed||!t.eventsListeners||n.split(" ").forEach(i=>{typeof e>"u"?t.eventsListeners[i]=[]:t.eventsListeners[i]&&t.eventsListeners[i].forEach((r,s)=>{(r===e||r.__emitterProxy&&r.__emitterProxy===e)&&t.eventsListeners[i].splice(s,1)})}),t},emit(...n){const e=this;if(!e.eventsListeners||e.destroyed||!e.eventsListeners)return e;let t,i,r;return typeof n[0]=="string"||Array.isArray(n[0])?(t=n[0],i=n.slice(1,n.length),r=e):(t=n[0].events,i=n[0].data,r=n[0].context||e),i.unshift(r),(Array.isArray(t)?t:t.split(" ")).forEach(a=>{e.eventsAnyListeners&&e.eventsAnyListeners.length&&e.eventsAnyListeners.forEach(o=>{o.apply(r,[a,...i])}),e.eventsListeners&&e.eventsListeners[a]&&e.eventsListeners[a].forEach(o=>{o.apply(r,i)})}),e}};function kh(){const n=this;let e,t;const i=n.el;typeof n.params.width<"u"&&n.params.width!==null?e=n.params.width:e=i.clientWidth,typeof n.params.height<"u"&&n.params.height!==null?t=n.params.height:t=i.clientHeight,!(e===0&&n.isHorizontal()||t===0&&n.isVertical())&&(e=e-parseInt(Hi(i,"padding-left")||0,10)-parseInt(Hi(i,"padding-right")||0,10),t=t-parseInt(Hi(i,"padding-top")||0,10)-parseInt(Hi(i,"padding-bottom")||0,10),Number.isNaN(e)&&(e=0),Number.isNaN(t)&&(t=0),Object.assign(n,{width:e,height:t,size:n.isHorizontal()?e:t}))}function Oh(){const n=this;function e(b,E){return parseFloat(b.getPropertyValue(n.getDirectionLabel(E))||0)}const t=n.params,{wrapperEl:i,slidesEl:r,rtlTranslate:s,wrongRTL:a}=n,o=n.virtual&&t.virtual.enabled,l=o?n.virtual.slides.length:n.slides.length,c=ci(r,`.${n.params.slideClass}, swiper-slide`),d=o?n.virtual.slides.length:c.length;let h=[];const f=[],u=[];let g=t.slidesOffsetBefore;typeof g=="function"&&(g=t.slidesOffsetBefore.call(n));let v=t.slidesOffsetAfter;typeof v=="function"&&(v=t.slidesOffsetAfter.call(n));const m=n.snapGrid.length,p=n.slidesGrid.length,A=n.size-g-v;let _=t.spaceBetween,S=-g,M=0,C=0;if(typeof A>"u")return;typeof _=="string"&&_.indexOf("%")>=0?_=parseFloat(_.replace("%",""))/100*A:typeof _=="string"&&(_=parseFloat(_)),n.virtualSize=-_-g-v,c.forEach(b=>{s?b.style.marginLeft="":b.style.marginRight="",b.style.marginBottom="",b.style.marginTop=""}),t.centeredSlides&&t.cssMode&&(Un(i,"--swiper-centered-offset-before",""),Un(i,"--swiper-centered-offset-after","")),t.cssMode&&(Un(i,"--swiper-slides-offset-before",`${g}px`),Un(i,"--swiper-slides-offset-after",`${v}px`));const U=t.grid&&t.grid.rows>1&&n.grid;U?n.grid.initSlides(c):n.grid&&n.grid.unsetSlides();let T;const y=t.slidesPerView==="auto"&&t.breakpoints&&Object.keys(t.breakpoints).filter(b=>typeof t.breakpoints[b].slidesPerView<"u").length>0;for(let b=0;b<d;b+=1){T=0;const E=c[b];if(!(E&&(U&&n.grid.updateSlide(b,E,c),Hi(E,"display")==="none"))){if(o&&t.slidesPerView==="auto")t.virtual.slidesPerViewAutoSlideSize&&(T=t.virtual.slidesPerViewAutoSlideSize),T&&E&&(t.roundLengths&&(T=Math.floor(T)),E.style[n.getDirectionLabel("width")]=`${T}px`);else if(t.slidesPerView==="auto"){y&&(E.style[n.getDirectionLabel("width")]="");const D=getComputedStyle(E),F=E.style.transform,Q=E.style.webkitTransform;if(F&&(E.style.transform="none"),Q&&(E.style.webkitTransform="none"),t.roundLengths)T=n.isHorizontal()?ia(E,"width"):ia(E,"height");else{const V=e(D,"width"),O=e(D,"padding-left"),B=e(D,"padding-right"),R=e(D,"margin-left"),Z=e(D,"margin-right"),K=D.getPropertyValue("box-sizing");if(K&&K==="border-box")T=V+R+Z;else{const{clientWidth:ae,offsetWidth:Me}=E;T=V+O+B+R+Z+(Me-ae)}}F&&(E.style.transform=F),Q&&(E.style.webkitTransform=Q),t.roundLengths&&(T=Math.floor(T))}else T=(A-(t.slidesPerView-1)*_)/t.slidesPerView,t.roundLengths&&(T=Math.floor(T)),E&&(E.style[n.getDirectionLabel("width")]=`${T}px`);E&&(E.swiperSlideSize=T),u.push(T),t.centeredSlides?(S=S+T/2+M/2+_,M===0&&b!==0&&(S=S-A/2-_),b===0&&(S=S-A/2-_),Math.abs(S)<1/1e3&&(S=0),t.roundLengths&&(S=Math.floor(S)),C%t.slidesPerGroup===0&&h.push(S),f.push(S)):(t.roundLengths&&(S=Math.floor(S)),(C-Math.min(n.params.slidesPerGroupSkip,C))%n.params.slidesPerGroup===0&&h.push(S),f.push(S),S=S+T+_),n.virtualSize+=T+_,M=T,C+=1}}if(n.virtualSize=Math.max(n.virtualSize,A)+v,s&&a&&(t.effect==="slide"||t.effect==="coverflow")&&(i.style.width=`${n.virtualSize+_}px`),t.setWrapperSize&&(i.style[n.getDirectionLabel("width")]=`${n.virtualSize+_}px`),U&&n.grid.updateWrapperSize(T,h),!t.centeredSlides){const b=t.slidesPerView!=="auto"&&t.slidesPerView%1!==0,E=t.snapToSlideEdge&&!t.loop&&(t.slidesPerView==="auto"||b);let D=h.length;if(E){let Q;if(t.slidesPerView==="auto"){Q=1;let V=0;for(let O=u.length-1;O>=0&&(V+=u[O]+(O<u.length-1?_:0),V<=A);O-=1)Q=u.length-O}else Q=Math.floor(t.slidesPerView);D=Math.max(d-Q,0)}const F=[];for(let Q=0;Q<h.length;Q+=1){let V=h[Q];t.roundLengths&&(V=Math.floor(V)),E?Q<=D&&F.push(V):h[Q]<=n.virtualSize-A&&F.push(V)}h=F,Math.floor(n.virtualSize-A)-Math.floor(h[h.length-1])>1&&(E||h.push(n.virtualSize-A))}if(o&&t.loop){const b=u[0]+_;if(t.slidesPerGroup>1){const E=Math.ceil((n.virtual.slidesBefore+n.virtual.slidesAfter)/t.slidesPerGroup),D=b*t.slidesPerGroup;for(let F=0;F<E;F+=1)h.push(h[h.length-1]+D)}for(let E=0;E<n.virtual.slidesBefore+n.virtual.slidesAfter;E+=1)t.slidesPerGroup===1&&h.push(h[h.length-1]+b),f.push(f[f.length-1]+b),n.virtualSize+=b}if(h.length===0&&(h=[0]),_!==0){const b=n.isHorizontal()&&s?"marginLeft":n.getDirectionLabel("marginRight");c.filter((E,D)=>!t.cssMode||t.loop?!0:D!==c.length-1).forEach(E=>{E.style[b]=`${_}px`})}if(t.centeredSlides&&t.centeredSlidesBounds){let b=0;u.forEach(D=>{b+=D+(_||0)}),b-=_;const E=b>A?b-A:0;h=h.map(D=>D<=0?-g:D>E?E+v:D)}if(t.centerInsufficientSlides){let b=0;if(u.forEach(E=>{b+=E+(_||0)}),b-=_,b<A){const E=(A-b)/2;h.forEach((D,F)=>{h[F]=D-E}),f.forEach((D,F)=>{f[F]=D+E})}}if(Object.assign(n,{slides:c,snapGrid:h,slidesGrid:f,slidesSizesGrid:u}),t.centeredSlides&&t.cssMode&&!t.centeredSlidesBounds){Un(i,"--swiper-centered-offset-before",`${-h[0]}px`),Un(i,"--swiper-centered-offset-after",`${n.size/2-u[u.length-1]/2}px`);const b=-n.snapGrid[0],E=-n.slidesGrid[0];n.snapGrid=n.snapGrid.map(D=>D+b),n.slidesGrid=n.slidesGrid.map(D=>D+E)}if(d!==l&&n.emit("slidesLengthChange"),h.length!==m&&(n.params.watchOverflow&&n.checkOverflow(),n.emit("snapGridLengthChange")),f.length!==p&&n.emit("slidesGridLengthChange"),t.watchSlidesProgress&&n.updateSlidesOffset(),n.emit("slidesUpdated"),!o&&!t.cssMode&&(t.effect==="slide"||t.effect==="fade")){const b=`${t.containerModifierClass}backface-hidden`,E=n.el.classList.contains(b);d<=t.maxBackfaceHiddenSlides?E||n.el.classList.add(b):E&&n.el.classList.remove(b)}}function zh(n){const e=this,t=[],i=e.virtual&&e.params.virtual.enabled;let r=0,s;typeof n=="number"?e.setTransition(n):n===!0&&e.setTransition(e.params.speed);const a=o=>i?e.slides[e.getSlideIndexByData(o)]:e.slides[o];if(e.params.slidesPerView!=="auto"&&e.params.slidesPerView>1)if(e.params.centeredSlides)(e.visibleSlides||[]).forEach(o=>{t.push(o)});else for(s=0;s<Math.ceil(e.params.slidesPerView);s+=1){const o=e.activeIndex+s;if(o>e.slides.length&&!i)break;t.push(a(o))}else t.push(a(e.activeIndex));for(s=0;s<t.length;s+=1)if(typeof t[s]<"u"){const o=t[s].offsetHeight;r=o>r?o:r}(r||r===0)&&(e.wrapperEl.style.height=`${r}px`)}function Wh(){const n=this,e=n.slides,t=n.isElement?n.isHorizontal()?n.wrapperEl.offsetLeft:n.wrapperEl.offsetTop:0;for(let i=0;i<e.length;i+=1)e[i].swiperSlideOffset=(n.isHorizontal()?e[i].offsetLeft:e[i].offsetTop)-t-n.cssOverflowAdjustment()}const gl=(n,e,t)=>{e&&!n.classList.contains(t)?n.classList.add(t):!e&&n.classList.contains(t)&&n.classList.remove(t)};function Gh(n=this&&this.translate||0){const e=this,t=e.params,{slides:i,rtlTranslate:r,snapGrid:s}=e;if(i.length===0)return;typeof i[0].swiperSlideOffset>"u"&&e.updateSlidesOffset();let a=-n;r&&(a=n),e.visibleSlidesIndexes=[],e.visibleSlides=[];let o=t.spaceBetween;typeof o=="string"&&o.indexOf("%")>=0?o=parseFloat(o.replace("%",""))/100*e.size:typeof o=="string"&&(o=parseFloat(o));for(let l=0;l<i.length;l+=1){const c=i[l];let d=c.swiperSlideOffset;t.cssMode&&t.centeredSlides&&(d-=i[0].swiperSlideOffset);const h=(a+(t.centeredSlides?e.minTranslate():0)-d)/(c.swiperSlideSize+o),f=(a-s[0]+(t.centeredSlides?e.minTranslate():0)-d)/(c.swiperSlideSize+o),u=-(a-d),g=u+e.slidesSizesGrid[l],v=u>=0&&u<=e.size-e.slidesSizesGrid[l],m=u>=0&&u<e.size-1||g>1&&g<=e.size||u<=0&&g>=e.size;m&&(e.visibleSlides.push(c),e.visibleSlidesIndexes.push(l)),gl(c,m,t.slideVisibleClass),gl(c,v,t.slideFullyVisibleClass),c.progress=r?-h:h,c.originalProgress=r?-f:f}}function Hh(n){const e=this;if(typeof n>"u"){const d=e.rtlTranslate?-1:1;n=e&&e.translate&&e.translate*d||0}const t=e.params,i=e.maxTranslate()-e.minTranslate();let{progress:r,isBeginning:s,isEnd:a,progressLoop:o}=e;const l=s,c=a;if(i===0)r=0,s=!0,a=!0;else{r=(n-e.minTranslate())/i;const d=Math.abs(n-e.minTranslate())<1,h=Math.abs(n-e.maxTranslate())<1;s=d||r<=0,a=h||r>=1,d&&(r=0),h&&(r=1)}if(t.loop){const d=e.getSlideIndexByData(0),h=e.getSlideIndexByData(e.slides.length-1),f=e.slidesGrid[d],u=e.slidesGrid[h],g=e.slidesGrid[e.slidesGrid.length-1],v=Math.abs(n);v>=f?o=(v-f)/g:o=(v+g-u)/g,o>1&&(o-=1)}Object.assign(e,{progress:r,progressLoop:o,isBeginning:s,isEnd:a}),(t.watchSlidesProgress||t.centeredSlides&&t.autoHeight)&&e.updateSlidesProgress(n),s&&!l&&e.emit("reachBeginning toEdge"),a&&!c&&e.emit("reachEnd toEdge"),(l&&!s||c&&!a)&&e.emit("fromEdge"),e.emit("progress",r)}const oa=(n,e,t)=>{e&&!n.classList.contains(t)?n.classList.add(t):!e&&n.classList.contains(t)&&n.classList.remove(t)};function Jh(){const n=this,{slides:e,params:t,slidesEl:i,activeIndex:r}=n,s=n.virtual&&t.virtual.enabled,a=n.grid&&t.grid&&t.grid.rows>1,o=h=>ci(i,`.${t.slideClass}${h}, swiper-slide${h}`)[0];let l,c,d;if(s)if(t.loop){let h=r-n.virtual.slidesBefore;h<0&&(h=n.virtual.slides.length+h),h>=n.virtual.slides.length&&(h-=n.virtual.slides.length),l=o(`[data-swiper-slide-index="${h}"]`)}else l=o(`[data-swiper-slide-index="${r}"]`);else a?(l=e.find(h=>h.column===r),d=e.find(h=>h.column===r+1),c=e.find(h=>h.column===r-1)):l=e[r];l&&(a||(d=Bh(l,`.${t.slideClass}, swiper-slide`)[0],t.loop&&!d&&(d=e[0]),c=Rh(l,`.${t.slideClass}, swiper-slide`)[0],t.loop&&!c===0&&(c=e[e.length-1]))),e.forEach(h=>{oa(h,h===l,t.slideActiveClass),oa(h,h===d,t.slideNextClass),oa(h,h===c,t.slidePrevClass)}),n.emitSlidesClasses()}const Hr=(n,e)=>{if(!n||n.destroyed||!n.params)return;const t=()=>n.isElement?"swiper-slide":`.${n.params.slideClass}`,i=e.closest(t());if(i){let r=i.querySelector(`.${n.params.lazyPreloaderClass}`);!r&&n.isElement&&(i.shadowRoot?r=i.shadowRoot.querySelector(`.${n.params.lazyPreloaderClass}`):requestAnimationFrame(()=>{i.shadowRoot&&(r=i.shadowRoot.querySelector(`.${n.params.lazyPreloaderClass}`),r&&!r.lazyPreloaderManaged&&r.remove())})),r&&!r.lazyPreloaderManaged&&r.remove()}},la=(n,e)=>{if(!n.slides[e])return;const t=n.slides[e].querySelector('[loading="lazy"]');t&&t.removeAttribute("loading")},ca=n=>{if(!n||n.destroyed||!n.params)return;let e=n.params.lazyPreloadPrevNext;const t=n.slides.length;if(!t||!e||e<0)return;e=Math.min(e,t);const i=n.params.slidesPerView==="auto"?n.slidesPerViewDynamic():Math.ceil(n.params.slidesPerView),r=n.activeIndex;if(n.params.grid&&n.params.grid.rows>1){const a=r,o=[a-e];o.push(...Array.from({length:e}).map((l,c)=>a+i+c)),n.slides.forEach((l,c)=>{o.includes(l.column)&&la(n,c)});return}const s=r+i-1;if(n.params.rewind||n.params.loop)for(let a=r-e;a<=s+e;a+=1){const o=(a%t+t)%t;(o<r||o>s)&&la(n,o)}else for(let a=Math.max(r-e,0);a<=Math.min(s+e,t-1);a+=1)a!==r&&(a>s||a<r)&&la(n,a)};function Zh(n){const{slidesGrid:e,params:t}=n,i=n.rtlTranslate?n.translate:-n.translate;let r;for(let s=0;s<e.length;s+=1)typeof e[s+1]<"u"?i>=e[s]&&i<e[s+1]-(e[s+1]-e[s])/2?r=s:i>=e[s]&&i<e[s+1]&&(r=s+1):i>=e[s]&&(r=s);return t.normalizeSlideIndex&&(r<0||typeof r>"u")&&(r=0),r}function Xh(n){const e=this,t=e.rtlTranslate?e.translate:-e.translate,{snapGrid:i,params:r,activeIndex:s,realIndex:a,snapIndex:o}=e;let l=n,c;const d=u=>{let g=u-e.virtual.slidesBefore;return g<0&&(g=e.virtual.slides.length+g),g>=e.virtual.slides.length&&(g-=e.virtual.slides.length),g};if(typeof l>"u"&&(l=Zh(e)),i.indexOf(t)>=0)c=i.indexOf(t);else{const u=Math.min(r.slidesPerGroupSkip,l);c=u+Math.floor((l-u)/r.slidesPerGroup)}if(c>=i.length&&(c=i.length-1),l===s&&!e.params.loop){c!==o&&(e.snapIndex=c,e.emit("snapIndexChange"));return}if(l===s&&e.params.loop&&e.virtual&&e.params.virtual.enabled){e.realIndex=d(l);return}const h=e.grid&&r.grid&&r.grid.rows>1;let f;if(e.virtual&&r.virtual.enabled)r.loop?f=d(l):f=l;else if(h){const u=e.slides.find(v=>v.column===l);let g=parseInt(u.getAttribute("data-swiper-slide-index"),10);Number.isNaN(g)&&(g=Math.max(e.slides.indexOf(u),0)),f=Math.floor(g/r.grid.rows)}else if(e.slides[l]){const u=e.slides[l].getAttribute("data-swiper-slide-index");u?f=parseInt(u,10):f=l}else f=l;Object.assign(e,{previousSnapIndex:o,snapIndex:c,previousRealIndex:a,realIndex:f,previousIndex:s,activeIndex:l}),e.initialized&&ca(e),e.emit("activeIndexChange"),e.emit("snapIndexChange"),(e.initialized||e.params.runCallbacksOnInit)&&(a!==f&&e.emit("realIndexChange"),e.emit("slideChange"))}function Yh(n,e){const t=this,i=t.params;let r=n.closest(`.${i.slideClass}, swiper-slide`);!r&&t.isElement&&e&&e.length>1&&e.includes(n)&&[...e.slice(e.indexOf(n)+1,e.length)].forEach(o=>{!r&&o.matches&&o.matches(`.${i.slideClass}, swiper-slide`)&&(r=o)});let s=!1,a;if(r){for(let o=0;o<t.slides.length;o+=1)if(t.slides[o]===r){s=!0,a=o;break}}if(r&&s)t.clickedSlide=r,t.virtual&&t.params.virtual.enabled?t.clickedIndex=parseInt(r.getAttribute("data-swiper-slide-index"),10):t.clickedIndex=a;else{t.clickedSlide=void 0,t.clickedIndex=void 0;return}i.slideToClickedSlide&&t.clickedIndex!==void 0&&t.clickedIndex!==t.activeIndex&&t.slideToClickedSlide()}var Kh={updateSize:kh,updateSlides:Oh,updateAutoHeight:zh,updateSlidesOffset:Wh,updateSlidesProgress:Gh,updateProgress:Hh,updateSlidesClasses:Jh,updateActiveIndex:Xh,updateClickedSlide:Yh};function jh(n=this.isHorizontal()?"x":"y"){const e=this,{params:t,rtlTranslate:i,translate:r,wrapperEl:s}=e;if(t.virtualTranslate)return i?-r:r;if(t.cssMode)return r;let a=Mh(s,n);return a+=e.cssOverflowAdjustment(),i&&(a=-a),a||0}function qh(n,e){const t=this,{rtlTranslate:i,params:r,wrapperEl:s,progress:a}=t;let o=0,l=0;const c=0;t.isHorizontal()?o=i?-n:n:l=n,r.roundLengths&&(o=Math.floor(o),l=Math.floor(l)),t.previousTranslate=t.translate,t.translate=t.isHorizontal()?o:l,r.cssMode?s[t.isHorizontal()?"scrollLeft":"scrollTop"]=t.isHorizontal()?-o:-l:r.virtualTranslate||(t.isHorizontal()?o-=t.cssOverflowAdjustment():l-=t.cssOverflowAdjustment(),s.style.transform=`translate3d(${o}px, ${l}px, ${c}px)`);let d;const h=t.maxTranslate()-t.minTranslate();h===0?d=0:d=(n-t.minTranslate())/h,d!==a&&t.updateProgress(n),t.emit("setTranslate",t.translate,e)}function $h(){return-this.snapGrid[0]}function eu(){return-this.snapGrid[this.snapGrid.length-1]}function tu(n=0,e=this.params.speed,t=!0,i=!0,r){const s=this,{params:a,wrapperEl:o}=s;if(s.animating&&a.preventInteractionOnTransition)return!1;const l=s.minTranslate(),c=s.maxTranslate();let d;if(i&&n>l?d=l:i&&n<c?d=c:d=n,s.updateProgress(d),a.cssMode){const h=s.isHorizontal();if(e===0)o[h?"scrollLeft":"scrollTop"]=-d;else{if(!s.support.smoothScroll)return hl({swiper:s,targetPosition:-d,side:h?"left":"top"}),!0;o.scrollTo({[h?"left":"top"]:-d,behavior:"smooth"})}return!0}return e===0?(s.setTransition(0),s.setTranslate(d),t&&(s.emit("beforeTransitionStart",e,r),s.emit("transitionEnd"))):(s.setTransition(e),s.setTranslate(d),t&&(s.emit("beforeTransitionStart",e,r),s.emit("transitionStart")),s.animating||(s.animating=!0,s.onTranslateToWrapperTransitionEnd||(s.onTranslateToWrapperTransitionEnd=function(f){!s||s.destroyed||f.target===this&&(s.wrapperEl.removeEventListener("transitionend",s.onTranslateToWrapperTransitionEnd),s.onTranslateToWrapperTransitionEnd=null,delete s.onTranslateToWrapperTransitionEnd,s.animating=!1,t&&s.emit("transitionEnd"))}),s.wrapperEl.addEventListener("transitionend",s.onTranslateToWrapperTransitionEnd))),!0}var iu={getTranslate:jh,setTranslate:qh,minTranslate:$h,maxTranslate:eu,translateTo:tu};function nu(n,e){const t=this;t.params.cssMode||(t.wrapperEl.style.transitionDuration=`${n}ms`,t.wrapperEl.style.transitionDelay=n===0?"0ms":""),t.emit("setTransition",n,e)}function vl({swiper:n,runCallbacks:e,direction:t,step:i}){const{activeIndex:r,previousIndex:s}=n;let a=t;a||(r>s?a="next":r<s?a="prev":a="reset"),n.emit(`transition${i}`),e&&a==="reset"?n.emit(`slideResetTransition${i}`):e&&r!==s&&(n.emit(`slideChangeTransition${i}`),a==="next"?n.emit(`slideNextTransition${i}`):n.emit(`slidePrevTransition${i}`))}function ru(n=!0,e){const t=this,{params:i}=t;i.cssMode||(i.autoHeight&&t.updateAutoHeight(),vl({swiper:t,runCallbacks:n,direction:e,step:"Start"}))}function su(n=!0,e){const t=this,{params:i}=t;t.animating=!1,!i.cssMode&&(t.setTransition(0),vl({swiper:t,runCallbacks:n,direction:e,step:"End"}))}var au={setTransition:nu,transitionStart:ru,transitionEnd:su};function ou(n=0,e,t=!0,i,r){typeof n=="string"&&(n=parseInt(n,10));const s=this;let a=n;a<0&&(a=0);const{params:o,snapGrid:l,slidesGrid:c,previousIndex:d,activeIndex:h,rtlTranslate:f,wrapperEl:u,enabled:g}=s;if(!g&&!i&&!r||s.destroyed||s.animating&&o.preventInteractionOnTransition)return!1;typeof e>"u"&&(e=s.params.speed);const v=Math.min(s.params.slidesPerGroupSkip,a);let m=v+Math.floor((a-v)/s.params.slidesPerGroup);m>=l.length&&(m=l.length-1);const p=-l[m];if(o.normalizeSlideIndex)for(let U=0;U<c.length;U+=1){const T=-Math.floor(p*100),y=Math.floor(c[U]*100),b=Math.floor(c[U+1]*100);typeof c[U+1]<"u"?T>=y&&T<b-(b-y)/2?a=U:T>=y&&T<b&&(a=U+1):T>=y&&(a=U)}if(s.initialized&&a!==h&&(!s.allowSlideNext&&(f?p>s.translate&&p>s.minTranslate():p<s.translate&&p<s.minTranslate())||!s.allowSlidePrev&&p>s.translate&&p>s.maxTranslate()&&(h||0)!==a))return!1;a!==(d||0)&&t&&s.emit("beforeSlideChangeStart"),s.updateProgress(p);let A;a>h?A="next":a<h?A="prev":A="reset";const _=s.virtual&&s.params.virtual.enabled;if(!(_&&r)&&(f&&-p===s.translate||!f&&p===s.translate))return s.updateActiveIndex(a),o.autoHeight&&s.updateAutoHeight(),s.updateSlidesClasses(),o.effect!=="slide"&&s.setTranslate(p),A!=="reset"&&(s.transitionStart(t,A),s.transitionEnd(t,A)),!1;if(o.cssMode){const U=s.isHorizontal(),T=f?p:-p;if(e===0)_&&(s.wrapperEl.style.scrollSnapType="none",s._immediateVirtual=!0),_&&!s._cssModeVirtualInitialSet&&s.params.initialSlide>0?(s._cssModeVirtualInitialSet=!0,requestAnimationFrame(()=>{u[U?"scrollLeft":"scrollTop"]=T})):u[U?"scrollLeft":"scrollTop"]=T,_&&requestAnimationFrame(()=>{s.wrapperEl.style.scrollSnapType="",s._immediateVirtual=!1});else{if(!s.support.smoothScroll)return hl({swiper:s,targetPosition:T,side:U?"left":"top"}),!0;u.scrollTo({[U?"left":"top"]:T,behavior:"smooth"})}return!0}const C=ml().isSafari;return _&&!r&&C&&s.isElement&&s.virtual.update(!1,!1,a),s.setTransition(e),s.setTranslate(p),s.updateActiveIndex(a),s.updateSlidesClasses(),s.emit("beforeTransitionStart",e,i),s.transitionStart(t,A),e===0?s.transitionEnd(t,A):s.animating||(s.animating=!0,s.onSlideToWrapperTransitionEnd||(s.onSlideToWrapperTransitionEnd=function(T){!s||s.destroyed||T.target===this&&(s.wrapperEl.removeEventListener("transitionend",s.onSlideToWrapperTransitionEnd),s.onSlideToWrapperTransitionEnd=null,delete s.onSlideToWrapperTransitionEnd,s.transitionEnd(t,A))}),s.wrapperEl.addEventListener("transitionend",s.onSlideToWrapperTransitionEnd)),!0}function lu(n=0,e,t=!0,i){typeof n=="string"&&(n=parseInt(n,10));const r=this;if(r.destroyed)return;typeof e>"u"&&(e=r.params.speed);const s=r.grid&&r.params.grid&&r.params.grid.rows>1;let a=n;if(r.params.loop)if(r.virtual&&r.params.virtual.enabled)a=a+r.virtual.slidesBefore;else{let o;if(s){const v=a*r.params.grid.rows;o=r.slides.find(m=>m.getAttribute("data-swiper-slide-index")*1===v).column}else o=r.getSlideIndexByData(a);const l=s?Math.ceil(r.slides.length/r.params.grid.rows):r.slides.length,{centeredSlides:c,slidesOffsetBefore:d,slidesOffsetAfter:h}=r.params,f=c||!!d||!!h;let u=r.params.slidesPerView;u==="auto"?u=r.slidesPerViewDynamic():(u=Math.ceil(parseFloat(r.params.slidesPerView,10)),f&&u%2===0&&(u=u+1));let g=l-o<u;if(f&&(g=g||o<Math.ceil(u/2)),i&&f&&r.params.slidesPerView!=="auto"&&!s&&(g=!1),g){const v=f?o<r.activeIndex?"prev":"next":o-r.activeIndex-1<r.params.slidesPerView?"next":"prev";r.loopFix({direction:v,slideTo:!0,activeSlideIndex:v==="next"?o+1:o-l+1,slideRealIndex:v==="next"?r.realIndex:void 0})}if(s){const v=a*r.params.grid.rows;a=r.slides.find(m=>m.getAttribute("data-swiper-slide-index")*1===v).column}else a=r.getSlideIndexByData(a)}return requestAnimationFrame(()=>{r.slideTo(a,e,t,i)}),r}function cu(n,e=!0,t){const i=this,{enabled:r,params:s,animating:a}=i;if(!r||i.destroyed)return i;typeof n>"u"&&(n=i.params.speed);let o=s.slidesPerGroup;s.slidesPerView==="auto"&&s.slidesPerGroup===1&&s.slidesPerGroupAuto&&(o=Math.max(i.slidesPerViewDynamic("current",!0),1));const l=i.activeIndex<s.slidesPerGroupSkip?1:o,c=i.virtual&&s.virtual.enabled;if(s.loop){if(a&&!c&&s.loopPreventsSliding)return!1;if(i.loopFix({direction:"next"}),i._clientLeft=i.wrapperEl.clientLeft,i.activeIndex===i.slides.length-1&&s.cssMode)return requestAnimationFrame(()=>{i.slideTo(i.activeIndex+l,n,e,t)}),!0}return s.rewind&&i.isEnd?i.slideTo(0,n,e,t):i.slideTo(i.activeIndex+l,n,e,t)}function du(n,e=!0,t){const i=this,{params:r,snapGrid:s,slidesGrid:a,rtlTranslate:o,enabled:l,animating:c}=i;if(!l||i.destroyed)return i;typeof n>"u"&&(n=i.params.speed);const d=i.virtual&&r.virtual.enabled;if(r.loop){if(c&&!d&&r.loopPreventsSliding)return!1;i.loopFix({direction:"prev"}),i._clientLeft=i.wrapperEl.clientLeft}const h=o?i.translate:-i.translate;function f(A){return A<0?-Math.floor(Math.abs(A)):Math.floor(A)}const u=f(h),g=s.map(A=>f(A)),v=r.freeMode&&r.freeMode.enabled;let m=s[g.indexOf(u)-1];if(typeof m>"u"&&(r.cssMode||v)){let A;s.forEach((_,S)=>{u>=_&&(A=S)}),typeof A<"u"&&(m=v?s[A]:s[A>0?A-1:A])}let p=0;if(typeof m<"u"&&(p=a.indexOf(m),p<0&&(p=i.activeIndex-1),r.slidesPerView==="auto"&&r.slidesPerGroup===1&&r.slidesPerGroupAuto&&(p=p-i.slidesPerViewDynamic("previous",!0)+1,p=Math.max(p,0))),r.rewind&&i.isBeginning){const A=i.params.virtual&&i.params.virtual.enabled&&i.virtual?i.virtual.slides.length-1:i.slides.length-1;return i.slideTo(A,n,e,t)}else if(r.loop&&i.activeIndex===0&&r.cssMode)return requestAnimationFrame(()=>{i.slideTo(p,n,e,t)}),!0;return i.slideTo(p,n,e,t)}function hu(n,e=!0,t){const i=this;if(!i.destroyed)return typeof n>"u"&&(n=i.params.speed),i.slideTo(i.activeIndex,n,e,t)}function uu(n,e=!0,t,i=.5){const r=this;if(r.destroyed)return;typeof n>"u"&&(n=r.params.speed);let s=r.activeIndex;const a=Math.min(r.params.slidesPerGroupSkip,s),o=a+Math.floor((s-a)/r.params.slidesPerGroup),l=r.rtlTranslate?r.translate:-r.translate;if(l>=r.snapGrid[o]){const c=r.snapGrid[o],d=r.snapGrid[o+1];l-c>(d-c)*i&&(s+=r.params.slidesPerGroup)}else{const c=r.snapGrid[o-1],d=r.snapGrid[o];l-c<=(d-c)*i&&(s-=r.params.slidesPerGroup)}return s=Math.max(s,0),s=Math.min(s,r.slidesGrid.length-1),r.slideTo(s,n,e,t)}function fu(){const n=this;if(n.destroyed)return;const{params:e,slidesEl:t}=n,i=e.slidesPerView==="auto"?n.slidesPerViewDynamic():e.slidesPerView;let r=n.getSlideIndexWhenGrid(n.clickedIndex),s;const a=n.isElement?"swiper-slide":`.${e.slideClass}`,o=n.grid&&n.params.grid&&n.params.grid.rows>1;if(e.loop){if(n.animating)return;s=parseInt(n.clickedSlide.getAttribute("data-swiper-slide-index"),10),e.centeredSlides?n.slideToLoop(s):r>(o?(n.slides.length-i)/2-(n.params.grid.rows-1):n.slides.length-i)?(n.loopFix(),r=n.getSlideIndex(ci(t,`${a}[data-swiper-slide-index="${s}"]`)[0]),ta(()=>{n.slideTo(r)})):n.slideTo(r)}else n.slideTo(r)}var pu={slideTo:ou,slideToLoop:lu,slideNext:cu,slidePrev:du,slideReset:hu,slideToClosest:uu,slideToClickedSlide:fu};function mu(n,e){const t=this,{params:i,slidesEl:r}=t;if(!i.loop||t.virtual&&t.params.virtual.enabled)return;const s=()=>{ci(r,`.${i.slideClass}, swiper-slide`).forEach((g,v)=>{g.setAttribute("data-swiper-slide-index",v)})},a=()=>{const u=ci(r,`.${i.slideBlankClass}`);u.forEach(g=>{g.remove()}),u.length>0&&(t.recalcSlides(),t.updateSlides())},o=t.grid&&i.grid&&i.grid.rows>1;i.loopAddBlankSlides&&(i.slidesPerGroup>1||o)&&a();const l=i.slidesPerGroup*(o?i.grid.rows:1),c=t.slides.length%l!==0,d=o&&t.slides.length%i.grid.rows!==0,h=u=>{for(let g=0;g<u;g+=1){const v=t.isElement?vr("swiper-slide",[i.slideBlankClass]):vr("div",[i.slideClass,i.slideBlankClass]);t.slidesEl.append(v)}};if(c){if(i.loopAddBlankSlides){const u=l-t.slides.length%l;h(u),t.recalcSlides(),t.updateSlides()}else zr("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");s()}else if(d){if(i.loopAddBlankSlides){const u=i.grid.rows-t.slides.length%i.grid.rows;h(u),t.recalcSlides(),t.updateSlides()}else zr("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");s()}else s();const f=i.centeredSlides||!!i.slidesOffsetBefore||!!i.slidesOffsetAfter;t.loopFix({slideRealIndex:n,direction:f?void 0:"next",initial:e})}function gu({slideRealIndex:n,slideTo:e=!0,direction:t,setTranslate:i,activeSlideIndex:r,initial:s,byController:a,byMousewheel:o}={}){const l=this;if(!l.params.loop)return;l.emit("beforeLoopFix");const{slides:c,allowSlidePrev:d,allowSlideNext:h,slidesEl:f,params:u}=l,{centeredSlides:g,slidesOffsetBefore:v,slidesOffsetAfter:m,initialSlide:p}=u,A=g||!!v||!!m;if(l.allowSlidePrev=!0,l.allowSlideNext=!0,l.virtual&&u.virtual.enabled){e&&(!A&&l.snapIndex===0?l.slideTo(l.virtual.slides.length,0,!1,!0):A&&l.snapIndex<u.slidesPerView?l.slideTo(l.virtual.slides.length+l.snapIndex,0,!1,!0):l.snapIndex===l.snapGrid.length-1&&l.slideTo(l.virtual.slidesBefore,0,!1,!0)),l.allowSlidePrev=d,l.allowSlideNext=h,l.emit("loopFix");return}let _=u.slidesPerView;_==="auto"?_=l.slidesPerViewDynamic():(_=Math.ceil(parseFloat(u.slidesPerView,10)),A&&_%2===0&&(_=_+1));const S=u.slidesPerGroupAuto?_:u.slidesPerGroup;let M=A?Math.max(S,Math.ceil(_/2)):S;M%S!==0&&(M+=S-M%S),M+=u.loopAdditionalSlides,l.loopedSlides=M;const C=l.grid&&u.grid&&u.grid.rows>1;c.length<_+M||l.params.effect==="cards"&&c.length<_+M*2?zr("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters"):C&&u.grid.fill==="row"&&zr("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");const U=[],T=[],y=C?Math.ceil(c.length/u.grid.rows):c.length,b=s&&y-p<_&&!A;let E=b?p:l.activeIndex;typeof r>"u"?r=l.getSlideIndex(c.find(R=>R.classList.contains(u.slideActiveClass))):E=r;const D=t==="next"||!t,F=t==="prev"||!t;let Q=0,V=0;const B=(C?c[r].column:r)+(A&&typeof i>"u"?-_/2+.5:0);if(B<M){Q=Math.max(M-B,S);for(let R=0;R<M-B;R+=1){const Z=R-Math.floor(R/y)*y;if(C){const K=y-Z-1;for(let ae=c.length-1;ae>=0;ae-=1)c[ae].column===K&&U.push(ae)}else U.push(y-Z-1)}}else if(B+_>y-M){V=Math.max(B-(y-M*2),S),b&&(V=Math.max(V,_-y+p+1));for(let R=0;R<V;R+=1){const Z=R-Math.floor(R/y)*y;C?c.forEach((K,ae)=>{K.column===Z&&T.push(ae)}):T.push(Z)}}if(l.__preventObserver__=!0,requestAnimationFrame(()=>{l.__preventObserver__=!1}),l.params.effect==="cards"&&c.length<_+M*2&&(T.includes(r)&&T.splice(T.indexOf(r),1),U.includes(r)&&U.splice(U.indexOf(r),1)),F&&U.forEach(R=>{c[R].swiperLoopMoveDOM=!0,f.prepend(c[R]),c[R].swiperLoopMoveDOM=!1}),D&&T.forEach(R=>{c[R].swiperLoopMoveDOM=!0,f.append(c[R]),c[R].swiperLoopMoveDOM=!1}),l.recalcSlides(),u.slidesPerView==="auto"?l.updateSlides():C&&(U.length>0&&F||T.length>0&&D)&&l.slides.forEach((R,Z)=>{l.grid.updateSlide(Z,R,l.slides)}),u.watchSlidesProgress&&l.updateSlidesOffset(),e){if(U.length>0&&F){if(typeof n>"u"){const R=l.slidesGrid[E],K=l.slidesGrid[E+Q]-R;o?l.setTranslate(l.translate-K):(l.slideTo(E+Math.ceil(Q),0,!1,!0),i&&(l.touchEventsData.startTranslate=l.touchEventsData.startTranslate-K,l.touchEventsData.currentTranslate=l.touchEventsData.currentTranslate-K))}else if(i){const R=C?U.length/u.grid.rows:U.length;l.slideTo(l.activeIndex+R,0,!1,!0),l.touchEventsData.currentTranslate=l.translate}}else if(T.length>0&&D)if(typeof n>"u"){const R=l.slidesGrid[E],K=l.slidesGrid[E-V]-R;o?l.setTranslate(l.translate-K):(l.slideTo(E-V,0,!1,!0),i&&(l.touchEventsData.startTranslate=l.touchEventsData.startTranslate-K,l.touchEventsData.currentTranslate=l.touchEventsData.currentTranslate-K))}else{const R=C?T.length/u.grid.rows:T.length;l.slideTo(l.activeIndex-R,0,!1,!0)}}if(l.allowSlidePrev=d,l.allowSlideNext=h,l.controller&&l.controller.control&&!a){const R={slideRealIndex:n,direction:t,setTranslate:i,activeSlideIndex:r,byController:!0};Array.isArray(l.controller.control)?l.controller.control.forEach(Z=>{!Z.destroyed&&Z.params.loop&&Z.loopFix({...R,slideTo:Z.params.slidesPerView===u.slidesPerView?e:!1})}):l.controller.control instanceof l.constructor&&l.controller.control.params.loop&&l.controller.control.loopFix({...R,slideTo:l.controller.control.params.slidesPerView===u.slidesPerView?e:!1})}l.emit("loopFix")}function vu(){const n=this,{params:e,slidesEl:t}=n;if(!e.loop||!t||n.virtual&&n.params.virtual.enabled)return;n.recalcSlides();const i=[];n.slides.forEach(r=>{const s=typeof r.swiperSlideIndex>"u"?r.getAttribute("data-swiper-slide-index")*1:r.swiperSlideIndex;i[s]=r}),n.slides.forEach(r=>{r.removeAttribute("data-swiper-slide-index")}),i.forEach(r=>{t.append(r)}),n.recalcSlides(),n.slideTo(n.realIndex,0)}var Au={loopCreate:mu,loopFix:gu,loopDestroy:vu};function _u(n){const e=this;if(!e.params.simulateTouch||e.params.watchOverflow&&e.isLocked||e.params.cssMode)return;const t=e.params.touchEventsTarget==="container"?e.el:e.wrapperEl;e.isElement&&(e.__preventObserver__=!0),t.style.cursor="move",t.style.cursor=n?"grabbing":"grab",e.isElement&&requestAnimationFrame(()=>{e.__preventObserver__=!1})}function Su(){const n=this;n.params.watchOverflow&&n.isLocked||n.params.cssMode||(n.isElement&&(n.__preventObserver__=!0),n[n.params.touchEventsTarget==="container"?"el":"wrapperEl"].style.cursor="",n.isElement&&requestAnimationFrame(()=>{n.__preventObserver__=!1}))}var bu={setGrabCursor:_u,unsetGrabCursor:Su};function xu(n,e=this){function t(i){if(!i||i===Vt()||i===Ut())return null;i.assignedSlot&&(i=i.assignedSlot);const r=i.closest(n);return!r&&!i.getRootNode?null:r||t(i.getRootNode().host)}return t(e)}function Al(n,e,t){const i=Ut(),{params:r}=n,s=r.edgeSwipeDetection,a=r.edgeSwipeThreshold;return s&&(t<=a||t>=i.innerWidth-a)?s==="prevent"?(e.preventDefault(),!0):!1:!0}function Eu(n){const e=this;if(e.destroyed)return;const t=Vt();let i=n;i.originalEvent&&(i=i.originalEvent);const r=e.touchEventsData;if(i.type==="pointerdown"){if(r.pointerId!==null&&r.pointerId!==i.pointerId)return;r.pointerId=i.pointerId}else i.type==="touchstart"&&i.targetTouches.length===1&&(r.touchId=i.targetTouches[0].identifier);if(i.type==="touchstart"){Al(e,i,i.targetTouches[0].pageX);return}const{params:s,touches:a,enabled:o}=e;if(!o||!s.simulateTouch&&i.pointerType==="mouse"||e.animating&&s.preventInteractionOnTransition)return;!e.animating&&s.cssMode&&s.loop&&e.loopFix();let l=i.target;if(s.touchEventsTarget==="wrapper"&&!Ih(l,e.wrapperEl)||"which"in i&&i.which===3||"button"in i&&i.button>0||r.isTouched&&r.isMoved)return;const c=!!s.noSwipingClass&&s.noSwipingClass!=="",d=i.composedPath?i.composedPath():i.path;c&&i.target&&i.target.shadowRoot&&d&&(l=d[0]);const h=s.noSwipingSelector?s.noSwipingSelector:`.${s.noSwipingClass}`,f=!!(i.target&&i.target.shadowRoot);if(s.noSwiping&&(f?xu(h,l):l.closest(h))){e.allowClick=!0;return}if(s.swipeHandler&&!l.closest(s.swipeHandler))return;a.currentX=i.pageX,a.currentY=i.pageY;const u=a.currentX,g=a.currentY;if(!Al(e,i,u))return;Object.assign(r,{isTouched:!0,isMoved:!1,allowTouchCallbacks:!0,isScrolling:void 0,startMoving:void 0}),a.startX=u,a.startY=g,r.touchStartTime=Or(),e.allowClick=!0,e.updateSize(),e.swipeDirection=void 0,s.threshold>0&&(r.allowThresholdMove=!1);let v=!0;l.matches(r.focusableElements)&&(v=!1,l.nodeName==="SELECT"&&(r.isTouched=!1)),t.activeElement&&t.activeElement.matches(r.focusableElements)&&t.activeElement!==l&&(i.pointerType==="mouse"||i.pointerType!=="mouse"&&!l.matches(r.focusableElements))&&t.activeElement.blur();const m=v&&e.allowTouchMove&&s.touchStartPreventDefault;(s.touchStartForcePreventDefault||m)&&!l.isContentEditable&&i.preventDefault(),s.freeMode&&s.freeMode.enabled&&e.freeMode&&e.animating&&!s.cssMode&&e.freeMode.onTouchStart(),e.emit("touchStart",i)}function yu(n){const e=Vt(),t=this;if(t.destroyed)return;const i=t.touchEventsData,{params:r,touches:s,rtlTranslate:a,enabled:o}=t;if(!o||!r.simulateTouch&&n.pointerType==="mouse")return;let l=n;if(l.originalEvent&&(l=l.originalEvent),l.type==="pointermove"&&(i.touchId!==null||l.pointerId!==i.pointerId))return;let c;if(l.type==="touchmove"){if(c=[...l.changedTouches].find(M=>M.identifier===i.touchId),!c||c.identifier!==i.touchId)return}else c=l;if(!i.isTouched){i.startMoving&&i.isScrolling&&t.emit("touchMoveOpposite",l);return}const d=c.pageX,h=c.pageY;if(l.preventedByNestedSwiper){s.startX=d,s.startY=h;return}if(!t.allowTouchMove){l.target.matches(i.focusableElements)||(t.allowClick=!1),i.isTouched&&(Object.assign(s,{startX:d,startY:h,currentX:d,currentY:h}),i.touchStartTime=Or());return}if(r.touchReleaseOnEdges&&!r.loop)if(t.isVertical()){if(h<s.startY&&t.translate<=t.maxTranslate()||h>s.startY&&t.translate>=t.minTranslate()){i.isTouched=!1,i.isMoved=!1;return}}else{if(a&&(d>s.startX&&-t.translate<=t.maxTranslate()||d<s.startX&&-t.translate>=t.minTranslate()))return;if(!a&&(d<s.startX&&t.translate<=t.maxTranslate()||d>s.startX&&t.translate>=t.minTranslate()))return}if(e.activeElement&&e.activeElement.matches(i.focusableElements)&&e.activeElement!==l.target&&l.pointerType!=="mouse"&&e.activeElement.blur(),e.activeElement&&l.target===e.activeElement&&l.target.matches(i.focusableElements)){i.isMoved=!0,t.allowClick=!1;return}i.allowTouchCallbacks&&t.emit("touchMove",l),s.previousX=s.currentX,s.previousY=s.currentY,s.currentX=d,s.currentY=h;const f=s.currentX-s.startX,u=s.currentY-s.startY;if(t.params.threshold&&Math.sqrt(f**2+u**2)<t.params.threshold)return;if(typeof i.isScrolling>"u"){let M;t.isHorizontal()&&s.currentY===s.startY||t.isVertical()&&s.currentX===s.startX?i.isScrolling=!1:f*f+u*u>=25&&(M=Math.atan2(Math.abs(u),Math.abs(f))*180/Math.PI,i.isScrolling=t.isHorizontal()?M>r.touchAngle:90-M>r.touchAngle)}if(i.isScrolling&&t.emit("touchMoveOpposite",l),typeof i.startMoving>"u"&&(s.currentX!==s.startX||s.currentY!==s.startY)&&(i.startMoving=!0),i.isScrolling||l.type==="touchmove"&&i.preventTouchMoveFromPointerMove){i.isTouched=!1;return}if(!i.startMoving)return;t.allowClick=!1,!r.cssMode&&l.cancelable&&l.preventDefault(),r.touchMoveStopPropagation&&!r.nested&&l.stopPropagation();let g=t.isHorizontal()?f:u,v=t.isHorizontal()?s.currentX-s.previousX:s.currentY-s.previousY;r.oneWayMovement&&(g=Math.abs(g)*(a?1:-1),v=Math.abs(v)*(a?1:-1)),s.diff=g,g*=r.touchRatio,a&&(g=-g,v=-v);const m=t.touchesDirection;t.swipeDirection=g>0?"prev":"next",t.touchesDirection=v>0?"prev":"next";const p=t.params.loop&&!r.cssMode,A=t.touchesDirection==="next"&&t.allowSlideNext||t.touchesDirection==="prev"&&t.allowSlidePrev;if(!i.isMoved){if(p&&A&&t.loopFix({direction:t.swipeDirection}),i.startTranslate=t.getTranslate(),t.setTransition(0),t.animating){const M=new window.CustomEvent("transitionend",{bubbles:!0,cancelable:!0,detail:{bySwiperTouchMove:!0}});t.wrapperEl.dispatchEvent(M)}i.allowMomentumBounce=!1,r.grabCursor&&(t.allowSlideNext===!0||t.allowSlidePrev===!0)&&t.setGrabCursor(!0),t.emit("sliderFirstMove",l)}if(new Date().getTime(),r._loopSwapReset!==!1&&i.isMoved&&i.allowThresholdMove&&m!==t.touchesDirection&&p&&A&&Math.abs(g)>=1){Object.assign(s,{startX:d,startY:h,currentX:d,currentY:h,startTranslate:i.currentTranslate}),i.loopSwapReset=!0,i.startTranslate=i.currentTranslate;return}t.emit("sliderMove",l),i.isMoved=!0,i.currentTranslate=g+i.startTranslate;let _=!0,S=r.resistanceRatio;if(r.touchReleaseOnEdges&&(S=0),g>0?(p&&A&&i.allowThresholdMove&&i.currentTranslate>(r.centeredSlides?t.minTranslate()-t.slidesSizesGrid[t.activeIndex+1]-(r.slidesPerView!=="auto"&&t.slides.length-r.slidesPerView>=2?t.slidesSizesGrid[t.activeIndex+1]+t.params.spaceBetween:0)-t.params.spaceBetween:t.minTranslate())&&t.loopFix({direction:"prev",setTranslate:!0,activeSlideIndex:0}),i.currentTranslate>t.minTranslate()&&(_=!1,r.resistance&&(i.currentTranslate=t.minTranslate()-1+(-t.minTranslate()+i.startTranslate+g)**S))):g<0&&(p&&A&&i.allowThresholdMove&&i.currentTranslate<(r.centeredSlides?t.maxTranslate()+t.slidesSizesGrid[t.slidesSizesGrid.length-1]+t.params.spaceBetween+(r.slidesPerView!=="auto"&&t.slides.length-r.slidesPerView>=2?t.slidesSizesGrid[t.slidesSizesGrid.length-1]+t.params.spaceBetween:0):t.maxTranslate())&&t.loopFix({direction:"next",setTranslate:!0,activeSlideIndex:t.slides.length-(r.slidesPerView==="auto"?t.slidesPerViewDynamic():Math.ceil(parseFloat(r.slidesPerView,10)))}),i.currentTranslate<t.maxTranslate()&&(_=!1,r.resistance&&(i.currentTranslate=t.maxTranslate()+1-(t.maxTranslate()-i.startTranslate-g)**S))),_&&(l.preventedByNestedSwiper=!0),!t.allowSlideNext&&t.swipeDirection==="next"&&i.currentTranslate<i.startTranslate&&(i.currentTranslate=i.startTranslate),!t.allowSlidePrev&&t.swipeDirection==="prev"&&i.currentTranslate>i.startTranslate&&(i.currentTranslate=i.startTranslate),!t.allowSlidePrev&&!t.allowSlideNext&&(i.currentTranslate=i.startTranslate),r.threshold>0)if(Math.abs(g)>r.threshold||i.allowThresholdMove){if(!i.allowThresholdMove){i.allowThresholdMove=!0,s.startX=s.currentX,s.startY=s.currentY,i.currentTranslate=i.startTranslate,s.diff=t.isHorizontal()?s.currentX-s.startX:s.currentY-s.startY;return}}else{i.currentTranslate=i.startTranslate;return}!r.followFinger||r.cssMode||((r.freeMode&&r.freeMode.enabled&&t.freeMode||r.watchSlidesProgress)&&(t.updateActiveIndex(),t.updateSlidesClasses()),r.freeMode&&r.freeMode.enabled&&t.freeMode&&t.freeMode.onTouchMove(),t.updateProgress(i.currentTranslate),t.setTranslate(i.currentTranslate))}function wu(n){const e=this;if(e.destroyed)return;const t=e.touchEventsData;let i=n;i.originalEvent&&(i=i.originalEvent);let r;if(i.type==="touchend"||i.type==="touchcancel"){if(r=[...i.changedTouches].find(M=>M.identifier===t.touchId),!r||r.identifier!==t.touchId)return}else{if(t.touchId!==null||i.pointerId!==t.pointerId)return;r=i}if(["pointercancel","pointerout","pointerleave","contextmenu"].includes(i.type)&&!(["pointercancel","contextmenu"].includes(i.type)&&(e.browser.isSafari||e.browser.isWebView)))return;t.pointerId=null,t.touchId=null;const{params:a,touches:o,rtlTranslate:l,slidesGrid:c,enabled:d}=e;if(!d||!a.simulateTouch&&i.pointerType==="mouse")return;if(t.allowTouchCallbacks&&e.emit("touchEnd",i),t.allowTouchCallbacks=!1,!t.isTouched){t.isMoved&&a.grabCursor&&e.setGrabCursor(!1),t.isMoved=!1,t.startMoving=!1;return}a.grabCursor&&t.isMoved&&t.isTouched&&(e.allowSlideNext===!0||e.allowSlidePrev===!0)&&e.setGrabCursor(!1);const h=Or(),f=h-t.touchStartTime;if(e.allowClick){const M=i.path||i.composedPath&&i.composedPath();e.updateClickedSlide(M&&M[0]||i.target,M),e.emit("tap click",i),f<300&&h-t.lastClickTime<300&&e.emit("doubleTap doubleClick",i)}if(t.lastClickTime=Or(),ta(()=>{e.destroyed||(e.allowClick=!0)}),!t.isTouched||!t.isMoved||!e.swipeDirection||o.diff===0&&!t.loopSwapReset||t.currentTranslate===t.startTranslate&&!t.loopSwapReset){t.isTouched=!1,t.isMoved=!1,t.startMoving=!1;return}t.isTouched=!1,t.isMoved=!1,t.startMoving=!1;let u;if(a.followFinger?u=l?e.translate:-e.translate:u=-t.currentTranslate,a.cssMode)return;if(a.freeMode&&a.freeMode.enabled){e.freeMode.onTouchEnd({currentPos:u});return}const g=u>=-e.maxTranslate()&&!e.params.loop;let v=0,m=e.slidesSizesGrid[0];for(let M=0;M<c.length;M+=M<a.slidesPerGroupSkip?1:a.slidesPerGroup){const C=M<a.slidesPerGroupSkip-1?1:a.slidesPerGroup;typeof c[M+C]<"u"?(g||u>=c[M]&&u<c[M+C])&&(v=M,m=c[M+C]-c[M]):(g||u>=c[M])&&(v=M,m=c[c.length-1]-c[c.length-2])}let p=null,A=null;a.rewind&&(e.isBeginning?A=a.virtual&&a.virtual.enabled&&e.virtual?e.virtual.slides.length-1:e.slides.length-1:e.isEnd&&(p=0));const _=(u-c[v])/m,S=v<a.slidesPerGroupSkip-1?1:a.slidesPerGroup;if(f>a.longSwipesMs){if(!a.longSwipes){e.slideTo(e.activeIndex);return}e.swipeDirection==="next"&&(_>=a.longSwipesRatio?e.slideTo(a.rewind&&e.isEnd?p:v+S):e.slideTo(v)),e.swipeDirection==="prev"&&(_>1-a.longSwipesRatio?e.slideTo(v+S):A!==null&&_<0&&Math.abs(_)>a.longSwipesRatio?e.slideTo(A):e.slideTo(v))}else{if(!a.shortSwipes){e.slideTo(e.activeIndex);return}e.navigation&&(i.target===e.navigation.nextEl||i.target===e.navigation.prevEl)?i.target===e.navigation.nextEl?e.slideTo(v+S):e.slideTo(v):(e.swipeDirection==="next"&&e.slideTo(p!==null?p:v+S),e.swipeDirection==="prev"&&e.slideTo(A!==null?A:v))}}function _l(){const n=this,{params:e,el:t}=n;if(t&&t.offsetWidth===0)return;e.breakpoints&&n.setBreakpoint();const{allowSlideNext:i,allowSlidePrev:r,snapGrid:s}=n,a=n.virtual&&n.params.virtual.enabled;n.allowSlideNext=!0,n.allowSlidePrev=!0,n.updateSize(),n.updateSlides(),n.updateSlidesClasses();const o=a&&e.loop;if((e.slidesPerView==="auto"||e.slidesPerView>1)&&n.isEnd&&!n.isBeginning&&!n.params.centeredSlides&&!o){const l=a?n.virtual.slides:n.slides;n.slideTo(l.length-1,0,!1,!0)}else n.params.loop&&!a?n.slideToLoop(n.realIndex,0,!1,!0):n.slideTo(n.activeIndex,0,!1,!0);n.autoplay&&n.autoplay.running&&n.autoplay.paused&&(clearTimeout(n.autoplay.resizeTimeout),n.autoplay.resizeTimeout=setTimeout(()=>{n.autoplay&&n.autoplay.running&&n.autoplay.paused&&n.autoplay.resume()},500)),n.allowSlidePrev=r,n.allowSlideNext=i,n.params.watchOverflow&&s!==n.snapGrid&&n.checkOverflow()}function Cu(n){const e=this;e.destroyed||e.enabled&&(e.allowClick||(e.params.preventClicks&&n.preventDefault(),e.params.preventClicksPropagation&&e.animating&&(n.stopPropagation(),n.stopImmediatePropagation())))}function Uu(){const n=this;if(n.destroyed)return;const{wrapperEl:e,rtlTranslate:t,enabled:i}=n;if(!i)return;n.previousTranslate=n.translate,n.isHorizontal()?n.translate=-e.scrollLeft:n.translate=-e.scrollTop,n.translate===0&&(n.translate=0),n.updateActiveIndex(),n.updateSlidesClasses();let r;const s=n.maxTranslate()-n.minTranslate();s===0?r=0:r=(n.translate-n.minTranslate())/s,r!==n.progress&&n.updateProgress(t?-n.translate:n.translate),n.emit("setTranslate",n.translate,!1)}function Mu(n){const e=this;e.destroyed||(Hr(e,n.target),!(e.params.cssMode||e.params.slidesPerView!=="auto"&&!e.params.autoHeight)&&e.update())}function Tu(){const n=this;n.destroyed||n.documentTouchHandlerProceeded||(n.documentTouchHandlerProceeded=!0,n.params.touchReleaseOnEdges&&(n.el.style.touchAction="auto"))}const Sl=(n,e)=>{const t=Vt(),{params:i,el:r,wrapperEl:s,device:a}=n,o=!!i.nested,l=e==="on"?"addEventListener":"removeEventListener",c=e;!r||typeof r=="string"||(t[l]("touchstart",n.onDocumentTouchStart,{passive:!1,capture:o}),r[l]("touchstart",n.onTouchStart,{passive:!1}),r[l]("pointerdown",n.onTouchStart,{passive:!1}),t[l]("touchmove",n.onTouchMove,{passive:!1,capture:o}),t[l]("pointermove",n.onTouchMove,{passive:!1,capture:o}),t[l]("touchend",n.onTouchEnd,{passive:!0}),t[l]("pointerup",n.onTouchEnd,{passive:!0}),t[l]("pointercancel",n.onTouchEnd,{passive:!0}),t[l]("touchcancel",n.onTouchEnd,{passive:!0}),t[l]("pointerout",n.onTouchEnd,{passive:!0}),t[l]("pointerleave",n.onTouchEnd,{passive:!0}),t[l]("contextmenu",n.onTouchEnd,{passive:!0}),(i.preventClicks||i.preventClicksPropagation)&&r[l]("click",n.onClick,!0),i.cssMode&&s[l]("scroll",n.onScroll),i.updateOnWindowResize?n[c](a.ios||a.android?"resize orientationchange observerUpdate":"resize observerUpdate",_l,!0):n[c]("observerUpdate",_l,!0),r[l]("load",n.onLoad,{capture:!0}))};function Fu(){const n=this,{params:e}=n;n.onTouchStart=Eu.bind(n),n.onTouchMove=yu.bind(n),n.onTouchEnd=wu.bind(n),n.onDocumentTouchStart=Tu.bind(n),e.cssMode&&(n.onScroll=Uu.bind(n)),n.onClick=Cu.bind(n),n.onLoad=Mu.bind(n),Sl(n,"on")}function Iu(){Sl(this,"off")}var Ru={attachEvents:Fu,detachEvents:Iu};const bl=(n,e)=>n.grid&&e.grid&&e.grid.rows>1;function Bu(){const n=this,{realIndex:e,initialized:t,params:i,el:r}=n,s=i.breakpoints;if(!s||s&&Object.keys(s).length===0)return;const a=Vt(),o=i.breakpointsBase==="window"||!i.breakpointsBase?i.breakpointsBase:"container",l=["window","container"].includes(i.breakpointsBase)||!i.breakpointsBase?n.el:a.querySelector(i.breakpointsBase),c=n.getBreakpoint(s,o,l);if(!c||n.currentBreakpoint===c)return;const h=(c in s?s[c]:void 0)||n.originalParams,f=bl(n,i),u=bl(n,h),g=n.params.grabCursor,v=h.grabCursor,m=i.enabled;f&&!u?(r.classList.remove(`${i.containerModifierClass}grid`,`${i.containerModifierClass}grid-column`),n.emitContainerClasses()):!f&&u&&(r.classList.add(`${i.containerModifierClass}grid`),(h.grid.fill&&h.grid.fill==="column"||!h.grid.fill&&i.grid.fill==="column")&&r.classList.add(`${i.containerModifierClass}grid-column`),n.emitContainerClasses()),g&&!v?n.unsetGrabCursor():!g&&v&&n.setGrabCursor(),["navigation","pagination","scrollbar"].forEach(C=>{if(typeof h[C]>"u")return;const U=i[C]&&i[C].enabled,T=h[C]&&h[C].enabled;U&&!T&&n[C].disable(),!U&&T&&n[C].enable()});const p=h.direction&&h.direction!==i.direction,A=i.loop&&(h.slidesPerView!==i.slidesPerView||p),_=i.loop;p&&t&&n.changeDirection(),Xt(n.params,h);const S=n.params.enabled,M=n.params.loop;Object.assign(n,{allowTouchMove:n.params.allowTouchMove,allowSlideNext:n.params.allowSlideNext,allowSlidePrev:n.params.allowSlidePrev}),m&&!S?n.disable():!m&&S&&n.enable(),n.currentBreakpoint=c,n.emit("_beforeBreakpoint",h),t&&(A?(n.loopDestroy(),n.loopCreate(e),n.updateSlides()):!_&&M?(n.loopCreate(e),n.updateSlides()):_&&!M&&n.loopDestroy()),n.emit("breakpoint",h)}function Du(n,e="window",t){if(!n||e==="container"&&!t)return;let i=!1;const r=Ut(),s=e==="window"?r.innerHeight:t.clientHeight,a=Object.keys(n).map(o=>{if(typeof o=="string"&&o.indexOf("@")===0){const l=parseFloat(o.substr(1));return{value:s*l,point:o}}return{value:o,point:o}});a.sort((o,l)=>parseInt(o.value,10)-parseInt(l.value,10));for(let o=0;o<a.length;o+=1){const{point:l,value:c}=a[o];e==="window"?r.matchMedia(`(min-width: ${c}px)`).matches&&(i=l):c<=t.clientWidth&&(i=l)}return i||"max"}var Qu={setBreakpoint:Bu,getBreakpoint:Du};function Nu(n,e){const t=[];return n.forEach(i=>{typeof i=="object"?Object.keys(i).forEach(r=>{i[r]&&t.push(e+r)}):typeof i=="string"&&t.push(e+i)}),t}function Lu(){const n=this,{classNames:e,params:t,rtl:i,el:r,device:s}=n,a=Nu(["initialized",t.direction,{"free-mode":n.params.freeMode&&t.freeMode.enabled},{autoheight:t.autoHeight},{rtl:i},{grid:t.grid&&t.grid.rows>1},{"grid-column":t.grid&&t.grid.rows>1&&t.grid.fill==="column"},{android:s.android},{ios:s.ios},{"css-mode":t.cssMode},{centered:t.cssMode&&t.centeredSlides},{"watch-progress":t.watchSlidesProgress}],t.containerModifierClass);e.push(...a),r.classList.add(...e),n.emitContainerClasses()}function Pu(){const n=this,{el:e,classNames:t}=n;!e||typeof e=="string"||(e.classList.remove(...t),n.emitContainerClasses())}var Vu={addClasses:Lu,removeClasses:Pu};function ku(){const n=this,{isLocked:e,params:t}=n,{slidesOffsetBefore:i}=t;if(i){const r=n.slides.length-1,s=n.slidesGrid[r]+n.slidesSizesGrid[r]+i*2;n.isLocked=n.size>s}else n.isLocked=n.snapGrid.length===1;t.allowSlideNext===!0&&(n.allowSlideNext=!n.isLocked),t.allowSlidePrev===!0&&(n.allowSlidePrev=!n.isLocked),e&&e!==n.isLocked&&(n.isEnd=!1),e!==n.isLocked&&n.emit(n.isLocked?"lock":"unlock")}var Ou={checkOverflow:ku},xl={init:!0,direction:"horizontal",oneWayMovement:!1,swiperElementNodeName:"SWIPER-CONTAINER",touchEventsTarget:"wrapper",initialSlide:0,speed:300,cssMode:!1,updateOnWindowResize:!0,resizeObserver:!0,nested:!1,createElements:!1,eventsPrefix:"swiper",enabled:!0,focusableElements:"input, select, option, textarea, button, video, label",width:null,height:null,preventInteractionOnTransition:!1,userAgent:null,url:null,edgeSwipeDetection:!1,edgeSwipeThreshold:20,autoHeight:!1,setWrapperSize:!1,virtualTranslate:!1,effect:"slide",breakpoints:void 0,breakpointsBase:"window",spaceBetween:0,slidesPerView:1,slidesPerGroup:1,slidesPerGroupSkip:0,slidesPerGroupAuto:!1,centeredSlides:!1,centeredSlidesBounds:!1,slidesOffsetBefore:0,slidesOffsetAfter:0,normalizeSlideIndex:!0,centerInsufficientSlides:!1,snapToSlideEdge:!1,watchOverflow:!0,roundLengths:!1,touchRatio:1,touchAngle:45,simulateTouch:!0,shortSwipes:!0,longSwipes:!0,longSwipesRatio:.5,longSwipesMs:300,followFinger:!0,allowTouchMove:!0,threshold:5,touchMoveStopPropagation:!1,touchStartPreventDefault:!0,touchStartForcePreventDefault:!1,touchReleaseOnEdges:!1,uniqueNavElements:!0,resistance:!0,resistanceRatio:.85,watchSlidesProgress:!1,grabCursor:!1,preventClicks:!0,preventClicksPropagation:!0,slideToClickedSlide:!1,loop:!1,loopAddBlankSlides:!0,loopAdditionalSlides:0,loopPreventsSliding:!0,rewind:!1,allowSlidePrev:!0,allowSlideNext:!0,swipeHandler:null,noSwiping:!0,noSwipingClass:"swiper-no-swiping",noSwipingSelector:null,passiveListeners:!0,maxBackfaceHiddenSlides:10,containerModifierClass:"swiper-",slideClass:"swiper-slide",slideBlankClass:"swiper-slide-blank",slideActiveClass:"swiper-slide-active",slideVisibleClass:"swiper-slide-visible",slideFullyVisibleClass:"swiper-slide-fully-visible",slideNextClass:"swiper-slide-next",slidePrevClass:"swiper-slide-prev",wrapperClass:"swiper-wrapper",lazyPreloaderClass:"swiper-lazy-preloader",lazyPreloadPrevNext:0,runCallbacksOnInit:!0,_emitClasses:!1};function zu(n,e){return function(i={}){const r=Object.keys(i)[0],s=i[r];if(typeof s!="object"||s===null){Xt(e,i);return}if(n[r]===!0&&(n[r]={enabled:!0}),r==="navigation"&&n[r]&&n[r].enabled&&!n[r].prevEl&&!n[r].nextEl&&(n[r].auto=!0),["pagination","scrollbar"].indexOf(r)>=0&&n[r]&&n[r].enabled&&!n[r].el&&(n[r].auto=!0),!(r in n&&"enabled"in s)){Xt(e,i);return}typeof n[r]=="object"&&!("enabled"in n[r])&&(n[r].enabled=!0),n[r]||(n[r]={enabled:!1}),Xt(e,i)}}const da={eventsEmitter:Vh,update:Kh,translate:iu,transition:au,slide:pu,loop:Au,grabCursor:bu,events:Ru,breakpoints:Qu,checkOverflow:Ou,classes:Vu},ha={};class Yt{constructor(...e){let t,i;e.length===1&&e[0].constructor&&Object.prototype.toString.call(e[0]).slice(8,-1)==="Object"?i=e[0]:[t,i]=e,i||(i={}),i=Xt({},i),t&&!i.el&&(i.el=t);const r=Vt();if(i.el&&typeof i.el=="string"&&r.querySelectorAll(i.el).length>1){const l=[];return r.querySelectorAll(i.el).forEach(c=>{const d=Xt({},i,{el:c});l.push(new Yt(d))}),l}const s=this;s.__swiper__=!0,s.support=fl(),s.device=pl({userAgent:i.userAgent}),s.browser=ml(),s.eventsListeners={},s.eventsAnyListeners=[],s.modules=[...s.__modules__],i.modules&&Array.isArray(i.modules)&&i.modules.forEach(l=>{typeof l=="function"&&s.modules.indexOf(l)<0&&s.modules.push(l)});const a={};s.modules.forEach(l=>{l({params:i,swiper:s,extendParams:zu(i,a),on:s.on.bind(s),once:s.once.bind(s),off:s.off.bind(s),emit:s.emit.bind(s)})});const o=Xt({},xl,a);return s.params=Xt({},o,ha,i),s.originalParams=Xt({},s.params),s.passedParams=Xt({},i),s.params&&s.params.on&&Object.keys(s.params.on).forEach(l=>{s.on(l,s.params.on[l])}),s.params&&s.params.onAny&&s.onAny(s.params.onAny),Object.assign(s,{enabled:s.params.enabled,el:t,classNames:[],slides:[],slidesGrid:[],snapGrid:[],slidesSizesGrid:[],isHorizontal(){return s.params.direction==="horizontal"},isVertical(){return s.params.direction==="vertical"},activeIndex:0,realIndex:0,isBeginning:!0,isEnd:!1,translate:0,previousTranslate:0,progress:0,velocity:0,animating:!1,cssOverflowAdjustment(){return Math.trunc(this.translate/2**23)*2**23},allowSlideNext:s.params.allowSlideNext,allowSlidePrev:s.params.allowSlidePrev,touchEventsData:{isTouched:void 0,isMoved:void 0,allowTouchCallbacks:void 0,touchStartTime:void 0,isScrolling:void 0,currentTranslate:void 0,startTranslate:void 0,allowThresholdMove:void 0,focusableElements:s.params.focusableElements,lastClickTime:0,clickTimeout:void 0,velocities:[],allowMomentumBounce:void 0,startMoving:void 0,pointerId:null,touchId:null},allowClick:!0,allowTouchMove:s.params.allowTouchMove,touches:{startX:0,startY:0,currentX:0,currentY:0,diff:0},imagesToLoad:[],imagesLoaded:0}),s.emit("_swiper"),s.params.init&&s.init(),s}getDirectionLabel(e){return this.isHorizontal()?e:{width:"height","margin-top":"margin-left","margin-bottom ":"margin-right","margin-left":"margin-top","margin-right":"margin-bottom","padding-left":"padding-top","padding-right":"padding-bottom",marginRight:"marginBottom"}[e]}getSlideIndex(e){const{slidesEl:t,params:i}=this,r=ci(t,`.${i.slideClass}, swiper-slide`),s=Wr(r[0]);return Wr(e)-s}getSlideIndexByData(e){return this.getSlideIndex(this.slides.find(t=>t.getAttribute("data-swiper-slide-index")*1===e))}getSlideIndexWhenGrid(e){return this.grid&&this.params.grid&&this.params.grid.rows>1&&(this.params.grid.fill==="column"?e=Math.floor(e/this.params.grid.rows):this.params.grid.fill==="row"&&(e=e%Math.ceil(this.slides.length/this.params.grid.rows))),e}recalcSlides(){const e=this,{slidesEl:t,params:i}=e;e.slides=ci(t,`.${i.slideClass}, swiper-slide`)}enable(){const e=this;e.enabled||(e.enabled=!0,e.params.grabCursor&&e.setGrabCursor(),e.emit("enable"))}disable(){const e=this;e.enabled&&(e.enabled=!1,e.params.grabCursor&&e.unsetGrabCursor(),e.emit("disable"))}setProgress(e,t){const i=this;e=Math.min(Math.max(e,0),1);const r=i.minTranslate(),a=(i.maxTranslate()-r)*e+r;i.translateTo(a,typeof t>"u"?0:t),i.updateActiveIndex(),i.updateSlidesClasses()}emitContainerClasses(){const e=this;if(!e.params._emitClasses||!e.el)return;const t=e.el.className.split(" ").filter(i=>i.indexOf("swiper")===0||i.indexOf(e.params.containerModifierClass)===0);e.emit("_containerClasses",t.join(" "))}getSlideClasses(e){const t=this;return t.destroyed?"":e.className.split(" ").filter(i=>i.indexOf("swiper-slide")===0||i.indexOf(t.params.slideClass)===0).join(" ")}emitSlidesClasses(){const e=this;if(!e.params._emitClasses||!e.el)return;const t=[];e.slides.forEach(i=>{const r=e.getSlideClasses(i);t.push({slideEl:i,classNames:r}),e.emit("_slideClass",i,r)}),e.emit("_slideClasses",t)}slidesPerViewDynamic(e="current",t=!1){const i=this,{params:r,slides:s,slidesGrid:a,slidesSizesGrid:o,size:l,activeIndex:c}=i;let d=1;if(typeof r.slidesPerView=="number")return r.slidesPerView;if(r.centeredSlides){let h=s[c]?Math.ceil(s[c].swiperSlideSize):0,f;for(let u=c+1;u<s.length;u+=1)s[u]&&!f&&(h+=Math.ceil(s[u].swiperSlideSize),d+=1,h>l&&(f=!0));for(let u=c-1;u>=0;u-=1)s[u]&&!f&&(h+=s[u].swiperSlideSize,d+=1,h>l&&(f=!0))}else if(e==="current")for(let h=c+1;h<s.length;h+=1)(t?a[h]+o[h]-a[c]<l:a[h]-a[c]<l)&&(d+=1);else for(let h=c-1;h>=0;h-=1)a[c]-a[h]<l&&(d+=1);return d}update(){const e=this;if(!e||e.destroyed)return;const{snapGrid:t,params:i}=e;i.breakpoints&&e.setBreakpoint(),[...e.el.querySelectorAll('[loading="lazy"]')].forEach(a=>{a.complete&&Hr(e,a)}),e.updateSize(),e.updateSlides(),e.updateProgress(),e.updateSlidesClasses();function r(){const a=e.rtlTranslate?e.translate*-1:e.translate,o=Math.min(Math.max(a,e.maxTranslate()),e.minTranslate());e.setTranslate(o),e.updateActiveIndex(),e.updateSlidesClasses()}let s;if(i.freeMode&&i.freeMode.enabled&&!i.cssMode)r(),i.autoHeight&&e.updateAutoHeight();else{if((i.slidesPerView==="auto"||i.slidesPerView>1)&&e.isEnd&&!i.centeredSlides){const a=e.virtual&&i.virtual.enabled?e.virtual.slides:e.slides;s=e.slideTo(a.length-1,0,!1,!0)}else s=e.slideTo(e.activeIndex,0,!1,!0);s||r()}i.watchOverflow&&t!==e.snapGrid&&e.checkOverflow(),e.emit("update")}changeDirection(e,t=!0){const i=this,r=i.params.direction;return e||(e=r==="horizontal"?"vertical":"horizontal"),e===r||e!=="horizontal"&&e!=="vertical"||(i.el.classList.remove(`${i.params.containerModifierClass}${r}`),i.el.classList.add(`${i.params.containerModifierClass}${e}`),i.emitContainerClasses(),i.params.direction=e,i.slides.forEach(s=>{e==="vertical"?s.style.width="":s.style.height=""}),i.emit("changeDirection"),t&&i.update()),i}changeLanguageDirection(e){const t=this;t.rtl&&e==="rtl"||!t.rtl&&e==="ltr"||(t.rtl=e==="rtl",t.rtlTranslate=t.params.direction==="horizontal"&&t.rtl,t.rtl?(t.el.classList.add(`${t.params.containerModifierClass}rtl`),t.el.dir="rtl"):(t.el.classList.remove(`${t.params.containerModifierClass}rtl`),t.el.dir="ltr"),t.update())}mount(e){const t=this;if(t.mounted)return!0;let i=e||t.params.el;if(typeof i=="string"&&(i=document.querySelector(i)),!i)return!1;i.swiper=t,i.parentNode&&i.parentNode.host&&i.parentNode.host.nodeName===t.params.swiperElementNodeName.toUpperCase()&&(t.isElement=!0);const r=()=>`.${(t.params.wrapperClass||"").trim().split(" ").join(".")}`;let a=i&&i.shadowRoot&&i.shadowRoot.querySelector?i.shadowRoot.querySelector(r()):ci(i,r())[0];return!a&&t.params.createElements&&(a=vr("div",t.params.wrapperClass),i.append(a),ci(i,`.${t.params.slideClass}`).forEach(o=>{a.append(o)})),Object.assign(t,{el:i,wrapperEl:a,slidesEl:t.isElement&&!i.parentNode.host.slideSlots?i.parentNode.host:a,hostEl:t.isElement?i.parentNode.host:i,mounted:!0,rtl:i.dir.toLowerCase()==="rtl"||Hi(i,"direction")==="rtl",rtlTranslate:t.params.direction==="horizontal"&&(i.dir.toLowerCase()==="rtl"||Hi(i,"direction")==="rtl"),wrongRTL:Hi(a,"display")==="-webkit-box"}),!0}init(e){const t=this;if(t.initialized||t.mount(e)===!1)return t;t.emit("beforeInit"),t.params.breakpoints&&t.setBreakpoint(),t.addClasses(),t.updateSize(),t.updateSlides(),t.params.watchOverflow&&t.checkOverflow(),t.params.grabCursor&&t.enabled&&t.setGrabCursor(),t.params.loop&&t.virtual&&t.params.virtual.enabled?t.slideTo(t.params.initialSlide+t.virtual.slidesBefore,0,t.params.runCallbacksOnInit,!1,!0):t.slideTo(t.params.initialSlide,0,t.params.runCallbacksOnInit,!1,!0),t.params.loop&&t.loopCreate(void 0,!0),t.attachEvents();const r=[...t.el.querySelectorAll('[loading="lazy"]')];return t.isElement&&r.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),r.forEach(s=>{s.complete?Hr(t,s):s.addEventListener("load",a=>{Hr(t,a.target)})}),ca(t),t.initialized=!0,ca(t),t.emit("init"),t.emit("afterInit"),t}destroy(e=!0,t=!0){const i=this,{params:r,el:s,wrapperEl:a,slides:o}=i;return typeof i.params>"u"||i.destroyed||(i.emit("beforeDestroy"),i.initialized=!1,i.detachEvents(),r.loop&&i.loopDestroy(),t&&(i.removeClasses(),s&&typeof s!="string"&&s.removeAttribute("style"),a&&a.removeAttribute("style"),o&&o.length&&o.forEach(l=>{l.classList.remove(r.slideVisibleClass,r.slideFullyVisibleClass,r.slideActiveClass,r.slideNextClass,r.slidePrevClass),l.removeAttribute("style"),l.removeAttribute("data-swiper-slide-index")})),i.emit("destroy"),Object.keys(i.eventsListeners).forEach(l=>{i.off(l)}),e!==!1&&(i.el&&typeof i.el!="string"&&(i.el.swiper=null),Ch(i)),i.destroyed=!0),null}static extendDefaults(e){Xt(ha,e)}static get extendedDefaults(){return ha}static get defaults(){return xl}static installModule(e){Yt.prototype.__modules__||(Yt.prototype.__modules__=[]);const t=Yt.prototype.__modules__;typeof e=="function"&&t.indexOf(e)<0&&t.push(e)}static use(e){return Array.isArray(e)?(e.forEach(t=>Yt.installModule(t)),Yt):(Yt.installModule(e),Yt)}}Object.keys(da).forEach(n=>{Object.keys(da[n]).forEach(e=>{Yt.prototype[e]=da[n][e]})}),Yt.use([Lh,Ph]);function Wu({swiper:n,extendParams:e,on:t,emit:i}){const r=Vt(),s=Ut();n.keyboard={enabled:!1},e({keyboard:{enabled:!1,onlyInViewport:!0,pageUpDown:!0,speed:void 0}});function a(c){if(!n.enabled)return;const{rtlTranslate:d}=n;let h=c;h.originalEvent&&(h=h.originalEvent);const f=h.keyCode||h.charCode,u=n.params.keyboard.pageUpDown,g=u&&f===33,v=u&&f===34,m=f===37,p=f===39,A=f===38,_=f===40;if(!n.allowSlideNext&&(n.isHorizontal()&&p||n.isVertical()&&_||v)||!n.allowSlidePrev&&(n.isHorizontal()&&m||n.isVertical()&&A||g))return!1;if(h.shiftKey||h.altKey||h.ctrlKey||h.metaKey||r.activeElement&&(r.activeElement.isContentEditable||r.activeElement.nodeName&&(r.activeElement.nodeName.toLowerCase()==="input"||r.activeElement.nodeName.toLowerCase()==="textarea")))return;if(n.params.keyboard.onlyInViewport&&(g||v||m||p||A||_)){let M=!1;if(Gr(n.el,`.${n.params.slideClass}, swiper-slide`).length>0&&Gr(n.el,`.${n.params.slideActiveClass}`).length===0)return;const C=n.el,U=C.clientWidth,T=C.clientHeight,y=s.innerWidth,b=s.innerHeight,E=ul(C);d&&(E.left-=C.scrollLeft);const D=[[E.left,E.top],[E.left+U,E.top],[E.left,E.top+T],[E.left+U,E.top+T]];for(let F=0;F<D.length;F+=1){const Q=D[F];if(Q[0]>=0&&Q[0]<=y&&Q[1]>=0&&Q[1]<=b){if(Q[0]===0&&Q[1]===0)continue;M=!0}}if(!M)return}const S=n.params.keyboard.speed;n.isHorizontal()?((g||v||m||p)&&(h.preventDefault?h.preventDefault():h.returnValue=!1),((v||p)&&!d||(g||m)&&d)&&n.slideNext(S),((g||m)&&!d||(v||p)&&d)&&n.slidePrev(S)):((g||v||A||_)&&(h.preventDefault?h.preventDefault():h.returnValue=!1),(v||_)&&n.slideNext(S),(g||A)&&n.slidePrev(S)),i("keyPress",f)}function o(){n.keyboard.enabled||(r.addEventListener("keydown",a),n.keyboard.enabled=!0)}function l(){n.keyboard.enabled&&(r.removeEventListener("keydown",a),n.keyboard.enabled=!1)}t("init",()=>{n.params.keyboard.enabled&&o()}),t("destroy",()=>{n.keyboard.enabled&&l()}),Object.assign(n.keyboard,{enable:o,disable:l})}function ua(n,e,t,i){return n.params.createElements&&Object.keys(i).forEach(r=>{if(!t[r]&&t.auto===!0){let s=ci(n.el,`.${i[r]}`)[0];s||(s=vr("div",i[r]),s.className=i[r],n.el.append(s)),t[r]=s,e[r]=s}}),t}const El='<svg class="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"/></svg>';function Gu({swiper:n,extendParams:e,on:t,emit:i}){e({navigation:{nextEl:null,prevEl:null,addIcons:!0,hideOnClick:!1,disabledClass:"swiper-button-disabled",hiddenClass:"swiper-button-hidden",lockClass:"swiper-button-lock",navigationDisabledClass:"swiper-navigation-disabled"}}),n.navigation={nextEl:null,prevEl:null,arrowSvg:El};function r(u){let g;return u&&typeof u=="string"&&n.isElement&&(g=n.el.querySelector(u)||n.hostEl.querySelector(u),g)?g:(u&&(typeof u=="string"&&(g=[...document.querySelectorAll(u)]),n.params.uniqueNavElements&&typeof u=="string"&&g&&g.length>1&&n.el.querySelectorAll(u).length===1?g=n.el.querySelector(u):g&&g.length===1&&(g=g[0])),u&&!g?u:g)}function s(u,g){const v=n.params.navigation;u=St(u),u.forEach(m=>{m&&(m.classList[g?"add":"remove"](...v.disabledClass.split(" ")),m.tagName==="BUTTON"&&(m.disabled=g),n.params.watchOverflow&&n.enabled&&m.classList[n.isLocked?"add":"remove"](v.lockClass))})}function a(){const{nextEl:u,prevEl:g}=n.navigation;if(n.params.loop){s(g,!1),s(u,!1);return}s(g,n.isBeginning&&!n.params.rewind),s(u,n.isEnd&&!n.params.rewind)}function o(u){u.preventDefault(),!(n.isBeginning&&!n.params.loop&&!n.params.rewind)&&(n.slidePrev(),i("navigationPrev"))}function l(u){u.preventDefault(),!(n.isEnd&&!n.params.loop&&!n.params.rewind)&&(n.slideNext(),i("navigationNext"))}function c(){const u=n.params.navigation;if(n.params.navigation=ua(n,n.originalParams.navigation,n.params.navigation,{nextEl:"swiper-button-next",prevEl:"swiper-button-prev"}),!(u.nextEl||u.prevEl))return;let g=r(u.nextEl),v=r(u.prevEl);Object.assign(n.navigation,{nextEl:g,prevEl:v}),g=St(g),v=St(v);const m=(p,A)=>{if(p){if(u.addIcons&&p.matches(".swiper-button-next,.swiper-button-prev")&&!p.querySelector("svg")){const _=document.createElement("div");na(_,El),p.appendChild(_.querySelector("svg")),_.remove()}p.addEventListener("click",A==="next"?l:o)}!n.enabled&&p&&p.classList.add(...u.lockClass.split(" "))};g.forEach(p=>m(p,"next")),v.forEach(p=>m(p,"prev"))}function d(){let{nextEl:u,prevEl:g}=n.navigation;u=St(u),g=St(g);const v=(m,p)=>{m.removeEventListener("click",p==="next"?l:o),m.classList.remove(...n.params.navigation.disabledClass.split(" "))};u.forEach(m=>v(m,"next")),g.forEach(m=>v(m,"prev"))}t("init",()=>{n.params.navigation.enabled===!1?f():(c(),a())}),t("toEdge fromEdge lock unlock",()=>{a()}),t("destroy",()=>{d()}),t("enable disable",()=>{let{nextEl:u,prevEl:g}=n.navigation;if(u=St(u),g=St(g),n.enabled){a();return}[...u,...g].filter(v=>!!v).forEach(v=>v.classList.add(n.params.navigation.lockClass))}),t("click",(u,g)=>{let{nextEl:v,prevEl:m}=n.navigation;v=St(v),m=St(m);const p=g.target;let A=m.includes(p)||v.includes(p);if(n.isElement&&!A){const _=g.path||g.composedPath&&g.composedPath();_&&(A=_.find(S=>v.includes(S)||m.includes(S)))}if(n.params.navigation.hideOnClick&&!A){if(n.pagination&&n.params.pagination&&n.params.pagination.clickable&&(n.pagination.el===p||n.pagination.el.contains(p)))return;let _;v.length?_=v[0].classList.contains(n.params.navigation.hiddenClass):m.length&&(_=m[0].classList.contains(n.params.navigation.hiddenClass)),i(_===!0?"navigationShow":"navigationHide"),[...v,...m].filter(S=>!!S).forEach(S=>S.classList.toggle(n.params.navigation.hiddenClass))}});const h=()=>{n.el.classList.remove(...n.params.navigation.navigationDisabledClass.split(" ")),c(),a()},f=()=>{n.el.classList.add(...n.params.navigation.navigationDisabledClass.split(" ")),d()};Object.assign(n.navigation,{enable:h,disable:f,update:a,init:c,destroy:d})}function Mn(n=""){return`.${n.trim().replace(/([\.:!+\/()[\]#>~*^$|=,'"@{}\\])/g,"\\$1").replace(/ /g,".")}`}function Hu({swiper:n,extendParams:e,on:t,emit:i}){const r="swiper-pagination";e({pagination:{el:null,bulletElement:"span",clickable:!1,hideOnClick:!1,renderBullet:null,renderProgressbar:null,renderFraction:null,renderCustom:null,progressbarOpposite:!1,type:"bullets",dynamicBullets:!1,dynamicMainBullets:1,formatFractionCurrent:p=>p,formatFractionTotal:p=>p,bulletClass:`${r}-bullet`,bulletActiveClass:`${r}-bullet-active`,modifierClass:`${r}-`,currentClass:`${r}-current`,totalClass:`${r}-total`,hiddenClass:`${r}-hidden`,progressbarFillClass:`${r}-progressbar-fill`,progressbarOppositeClass:`${r}-progressbar-opposite`,clickableClass:`${r}-clickable`,lockClass:`${r}-lock`,horizontalClass:`${r}-horizontal`,verticalClass:`${r}-vertical`,paginationDisabledClass:`${r}-disabled`}}),n.pagination={el:null,bullets:[]};let s,a=0;function o(){return!n.params.pagination.el||!n.pagination.el||Array.isArray(n.pagination.el)&&n.pagination.el.length===0}function l(p,A){const{bulletActiveClass:_}=n.params.pagination;p&&(p=p[`${A==="prev"?"previous":"next"}ElementSibling`],p&&(p.classList.add(`${_}-${A}`),p=p[`${A==="prev"?"previous":"next"}ElementSibling`],p&&p.classList.add(`${_}-${A}-${A}`)))}function c(p,A,_){if(p=p%_,A=A%_,A===p+1)return"next";if(A===p-1)return"previous"}function d(p){const A=p.target.closest(Mn(n.params.pagination.bulletClass));if(!A)return;p.preventDefault();const _=Wr(A)*n.params.slidesPerGroup;if(n.params.loop){if(n.realIndex===_)return;const S=c(n.realIndex,_,n.slides.length);S==="next"?n.slideNext():S==="previous"?n.slidePrev():n.slideToLoop(_)}else n.slideTo(_)}function h(){const p=n.rtl,A=n.params.pagination;if(o())return;let _=n.pagination.el;_=St(_);let S,M;const C=n.virtual&&n.params.virtual.enabled?n.virtual.slides.length:n.slides.length,U=n.params.loop?Math.ceil(C/n.params.slidesPerGroup):n.snapGrid.length;if(n.params.loop?(M=n.previousRealIndex||0,S=n.params.slidesPerGroup>1?Math.floor(n.realIndex/n.params.slidesPerGroup):n.realIndex):typeof n.snapIndex<"u"?(S=n.snapIndex,M=n.previousSnapIndex):(M=n.previousIndex||0,S=n.activeIndex||0),A.type==="bullets"&&n.pagination.bullets&&n.pagination.bullets.length>0){const T=n.pagination.bullets;let y,b,E;if(A.dynamicBullets&&(s=ia(T[0],n.isHorizontal()?"width":"height"),_.forEach(D=>{D.style[n.isHorizontal()?"width":"height"]=`${s*(A.dynamicMainBullets+4)}px`}),A.dynamicMainBullets>1&&M!==void 0&&(a+=S-(M||0),a>A.dynamicMainBullets-1?a=A.dynamicMainBullets-1:a<0&&(a=0)),y=Math.max(S-a,0),b=y+(Math.min(T.length,A.dynamicMainBullets)-1),E=(b+y)/2),T.forEach(D=>{const F=[...["","-next","-next-next","-prev","-prev-prev","-main"].map(Q=>`${A.bulletActiveClass}${Q}`)].map(Q=>typeof Q=="string"&&Q.includes(" ")?Q.split(" "):Q).flat();D.classList.remove(...F)}),_.length>1)T.forEach(D=>{const F=Wr(D);F===S?D.classList.add(...A.bulletActiveClass.split(" ")):n.isElement&&D.setAttribute("part","bullet"),A.dynamicBullets&&(F>=y&&F<=b&&D.classList.add(...`${A.bulletActiveClass}-main`.split(" ")),F===y&&l(D,"prev"),F===b&&l(D,"next"))});else{const D=T[S];if(D&&D.classList.add(...A.bulletActiveClass.split(" ")),n.isElement&&T.forEach((F,Q)=>{F.setAttribute("part",Q===S?"bullet-active":"bullet")}),A.dynamicBullets){const F=T[y],Q=T[b];for(let V=y;V<=b;V+=1)T[V]&&T[V].classList.add(...`${A.bulletActiveClass}-main`.split(" "));l(F,"prev"),l(Q,"next")}}if(A.dynamicBullets){const D=Math.min(T.length,A.dynamicMainBullets+4),F=(s*D-s)/2-E*s,Q=p?"right":"left";T.forEach(V=>{V.style[n.isHorizontal()?Q:"top"]=`${F}px`})}}_.forEach((T,y)=>{if(A.type==="fraction"&&(T.querySelectorAll(Mn(A.currentClass)).forEach(b=>{b.textContent=A.formatFractionCurrent(S+1)}),T.querySelectorAll(Mn(A.totalClass)).forEach(b=>{b.textContent=A.formatFractionTotal(U)})),A.type==="progressbar"){let b;A.progressbarOpposite?b=n.isHorizontal()?"vertical":"horizontal":b=n.isHorizontal()?"horizontal":"vertical";const E=(S+1)/U;let D=1,F=1;b==="horizontal"?D=E:F=E,T.querySelectorAll(Mn(A.progressbarFillClass)).forEach(Q=>{Q.style.transform=`translate3d(0,0,0) scaleX(${D}) scaleY(${F})`,Q.style.transitionDuration=`${n.params.speed}ms`})}A.type==="custom"&&A.renderCustom?(na(T,A.renderCustom(n,S+1,U)),y===0&&i("paginationRender",T)):(y===0&&i("paginationRender",T),i("paginationUpdate",T)),n.params.watchOverflow&&n.enabled&&T.classList[n.isLocked?"add":"remove"](A.lockClass)})}function f(){const p=n.params.pagination;if(o())return;const A=n.virtual&&n.params.virtual.enabled?n.virtual.slides.length:n.grid&&n.params.grid.rows>1?n.slides.length/Math.ceil(n.params.grid.rows):n.slides.length;let _=n.pagination.el;_=St(_);let S="";if(p.type==="bullets"){let M=n.params.loop?Math.ceil(A/n.params.slidesPerGroup):n.snapGrid.length;n.params.freeMode&&n.params.freeMode.enabled&&M>A&&(M=A);for(let C=0;C<M;C+=1)p.renderBullet?S+=p.renderBullet.call(n,C,p.bulletClass):S+=`<${p.bulletElement} ${n.isElement?'part="bullet"':""} class="${p.bulletClass}"></${p.bulletElement}>`}p.type==="fraction"&&(p.renderFraction?S=p.renderFraction.call(n,p.currentClass,p.totalClass):S=`<span class="${p.currentClass}"></span> / <span class="${p.totalClass}"></span>`),p.type==="progressbar"&&(p.renderProgressbar?S=p.renderProgressbar.call(n,p.progressbarFillClass):S=`<span class="${p.progressbarFillClass}"></span>`),n.pagination.bullets=[],_.forEach(M=>{p.type!=="custom"&&na(M,S||""),p.type==="bullets"&&n.pagination.bullets.push(...M.querySelectorAll(Mn(p.bulletClass)))}),p.type!=="custom"&&i("paginationRender",_[0])}function u(){n.params.pagination=ua(n,n.originalParams.pagination,n.params.pagination,{el:"swiper-pagination"});const p=n.params.pagination;if(!p.el)return;let A;typeof p.el=="string"&&n.isElement&&(A=n.el.querySelector(p.el)),!A&&typeof p.el=="string"&&(A=[...document.querySelectorAll(p.el)]),A||(A=p.el),!(!A||A.length===0)&&(n.params.uniqueNavElements&&typeof p.el=="string"&&Array.isArray(A)&&A.length>1&&(A=[...n.el.querySelectorAll(p.el)],A.length>1&&(A=A.find(_=>Gr(_,".swiper")[0]===n.el))),Array.isArray(A)&&A.length===1&&(A=A[0]),Object.assign(n.pagination,{el:A}),A=St(A),A.forEach(_=>{p.type==="bullets"&&p.clickable&&_.classList.add(...(p.clickableClass||"").split(" ")),_.classList.add(p.modifierClass+p.type),_.classList.add(n.isHorizontal()?p.horizontalClass:p.verticalClass),p.type==="bullets"&&p.dynamicBullets&&(_.classList.add(`${p.modifierClass}${p.type}-dynamic`),a=0,p.dynamicMainBullets<1&&(p.dynamicMainBullets=1)),p.type==="progressbar"&&p.progressbarOpposite&&_.classList.add(p.progressbarOppositeClass),p.clickable&&_.addEventListener("click",d),n.enabled||_.classList.add(p.lockClass)}))}function g(){const p=n.params.pagination;if(o())return;let A=n.pagination.el;A&&(A=St(A),A.forEach(_=>{_.classList.remove(p.hiddenClass),_.classList.remove(p.modifierClass+p.type),_.classList.remove(n.isHorizontal()?p.horizontalClass:p.verticalClass),p.clickable&&(_.classList.remove(...(p.clickableClass||"").split(" ")),_.removeEventListener("click",d))})),n.pagination.bullets&&n.pagination.bullets.forEach(_=>_.classList.remove(...p.bulletActiveClass.split(" ")))}t("changeDirection",()=>{if(!n.pagination||!n.pagination.el)return;const p=n.params.pagination;let{el:A}=n.pagination;A=St(A),A.forEach(_=>{_.classList.remove(p.horizontalClass,p.verticalClass),_.classList.add(n.isHorizontal()?p.horizontalClass:p.verticalClass)})}),t("init",()=>{n.params.pagination.enabled===!1?m():(u(),f(),h())}),t("activeIndexChange",()=>{typeof n.snapIndex>"u"&&h()}),t("snapIndexChange",()=>{h()}),t("snapGridLengthChange",()=>{f(),h()}),t("destroy",()=>{g()}),t("enable disable",()=>{let{el:p}=n.pagination;p&&(p=St(p),p.forEach(A=>A.classList[n.enabled?"remove":"add"](n.params.pagination.lockClass)))}),t("lock unlock",()=>{h()}),t("click",(p,A)=>{const _=A.target,S=St(n.pagination.el);if(n.params.pagination.el&&n.params.pagination.hideOnClick&&S&&S.length>0&&!_.classList.contains(n.params.pagination.bulletClass)){if(n.navigation&&(n.navigation.nextEl&&_===n.navigation.nextEl||n.navigation.prevEl&&_===n.navigation.prevEl))return;const M=S[0].classList.contains(n.params.pagination.hiddenClass);i(M===!0?"paginationShow":"paginationHide"),S.forEach(C=>C.classList.toggle(n.params.pagination.hiddenClass))}});const v=()=>{n.el.classList.remove(n.params.pagination.paginationDisabledClass);let{el:p}=n.pagination;p&&(p=St(p),p.forEach(A=>A.classList.remove(n.params.pagination.paginationDisabledClass))),u(),f(),h()},m=()=>{n.el.classList.add(n.params.pagination.paginationDisabledClass);let{el:p}=n.pagination;p&&(p=St(p),p.forEach(A=>A.classList.add(n.params.pagination.paginationDisabledClass))),g()};Object.assign(n.pagination,{enable:v,disable:m,render:f,update:h,init:u,destroy:g})}function Ju({swiper:n,extendParams:e,on:t,emit:i}){const r=Vt();let s=!1,a=null,o=null,l,c,d,h;e({scrollbar:{el:null,dragSize:"auto",hide:!1,draggable:!1,snapOnRelease:!0,lockClass:"swiper-scrollbar-lock",dragClass:"swiper-scrollbar-drag",scrollbarDisabledClass:"swiper-scrollbar-disabled",horizontalClass:"swiper-scrollbar-horizontal",verticalClass:"swiper-scrollbar-vertical"}}),n.scrollbar={el:null,dragEl:null};function f(){if(!n.params.scrollbar.el||!n.scrollbar.el)return;const{scrollbar:E,rtlTranslate:D}=n,{dragEl:F,el:Q}=E,V=n.params.scrollbar,O=n.params.loop?n.progressLoop:n.progress;let B=c,R=(d-c)*O;D?(R=-R,R>0?(B=c-R,R=0):-R+c>d&&(B=d+R)):R<0?(B=c+R,R=0):R+c>d&&(B=d-R),n.isHorizontal()?(F.style.transform=`translate3d(${R}px, 0, 0)`,F.style.width=`${B}px`):(F.style.transform=`translate3d(0px, ${R}px, 0)`,F.style.height=`${B}px`),V.hide&&(clearTimeout(a),Q.style.opacity=1,a=setTimeout(()=>{Q.style.opacity=0,Q.style.transitionDuration="400ms"},1e3))}function u(E){!n.params.scrollbar.el||!n.scrollbar.el||(n.scrollbar.dragEl.style.transitionDuration=`${E}ms`)}function g(){if(!n.params.scrollbar.el||!n.scrollbar.el)return;const{scrollbar:E}=n,{dragEl:D,el:F}=E;D.style.width="",D.style.height="",d=n.isHorizontal()?F.offsetWidth:F.offsetHeight,h=n.size/(n.virtualSize+n.params.slidesOffsetBefore-(n.params.centeredSlides?n.snapGrid[0]:0)),n.params.scrollbar.dragSize==="auto"?c=d*h:c=parseInt(n.params.scrollbar.dragSize,10),n.isHorizontal()?D.style.width=`${c}px`:D.style.height=`${c}px`,h>=1?F.style.display="none":F.style.display="",n.params.scrollbar.hide&&(F.style.opacity=0),n.params.watchOverflow&&n.enabled&&E.el.classList[n.isLocked?"add":"remove"](n.params.scrollbar.lockClass)}function v(E){return n.isHorizontal()?E.clientX:E.clientY}function m(E){const{scrollbar:D,rtlTranslate:F}=n,{el:Q}=D;let V;V=(v(E)-ul(Q)[n.isHorizontal()?"left":"top"]-(l!==null?l:c/2))/(d-c),V=Math.max(Math.min(V,1),0),F&&(V=1-V);const O=n.minTranslate()+(n.maxTranslate()-n.minTranslate())*V;n.updateProgress(O),n.setTranslate(O),n.updateActiveIndex(),n.updateSlidesClasses()}function p(E){const D=n.params.scrollbar,{scrollbar:F,wrapperEl:Q}=n,{el:V,dragEl:O}=F;s=!0,l=E.target===O?v(E)-E.target.getBoundingClientRect()[n.isHorizontal()?"left":"top"]:null,E.preventDefault(),E.stopPropagation(),Q.style.transitionDuration="100ms",O.style.transitionDuration="100ms",m(E),clearTimeout(o),V.style.transitionDuration="0ms",D.hide&&(V.style.opacity=1),n.params.cssMode&&(n.wrapperEl.style["scroll-snap-type"]="none"),i("scrollbarDragStart",E)}function A(E){const{scrollbar:D,wrapperEl:F}=n,{el:Q,dragEl:V}=D;s&&(E.preventDefault&&E.cancelable?E.preventDefault():E.returnValue=!1,m(E),F.style.transitionDuration="0ms",Q.style.transitionDuration="0ms",V.style.transitionDuration="0ms",i("scrollbarDragMove",E))}function _(E){const D=n.params.scrollbar,{scrollbar:F,wrapperEl:Q}=n,{el:V}=F;s&&(s=!1,n.params.cssMode&&(n.wrapperEl.style["scroll-snap-type"]="",Q.style.transitionDuration=""),D.hide&&(clearTimeout(o),o=ta(()=>{V.style.opacity=0,V.style.transitionDuration="400ms"},1e3)),i("scrollbarDragEnd",E),D.snapOnRelease&&n.slideToClosest())}function S(E){const{scrollbar:D,params:F}=n,Q=D.el;if(!Q)return;const V=Q,O=F.passiveListeners?{passive:!1,capture:!1}:!1,B=F.passiveListeners?{passive:!0,capture:!1}:!1;if(!V)return;const R=E==="on"?"addEventListener":"removeEventListener";V[R]("pointerdown",p,O),r[R]("pointermove",A,O),r[R]("pointerup",_,B)}function M(){!n.params.scrollbar.el||!n.scrollbar.el||S("on")}function C(){!n.params.scrollbar.el||!n.scrollbar.el||S("off")}function U(){const{scrollbar:E,el:D}=n;n.params.scrollbar=ua(n,n.originalParams.scrollbar,n.params.scrollbar,{el:"swiper-scrollbar"});const F=n.params.scrollbar;if(!F.el)return;let Q;if(typeof F.el=="string"&&n.isElement&&(Q=n.el.querySelector(F.el)),!Q&&typeof F.el=="string"){if(Q=r.querySelectorAll(F.el),!Q.length)return}else Q||(Q=F.el);n.params.uniqueNavElements&&typeof F.el=="string"&&Q.length>1&&D.querySelectorAll(F.el).length===1&&(Q=D.querySelector(F.el)),Q.length>0&&(Q=Q[0]),Q.classList.add(n.isHorizontal()?F.horizontalClass:F.verticalClass);let V;Q&&(V=Q.querySelector(Mn(n.params.scrollbar.dragClass)),V||(V=vr("div",n.params.scrollbar.dragClass),Q.append(V))),Object.assign(E,{el:Q,dragEl:V}),F.draggable&&M(),Q&&Q.classList[n.enabled?"remove":"add"](...Gi(n.params.scrollbar.lockClass))}function T(){const E=n.params.scrollbar,D=n.scrollbar.el;D&&D.classList.remove(...Gi(n.isHorizontal()?E.horizontalClass:E.verticalClass)),C()}t("changeDirection",()=>{if(!n.scrollbar||!n.scrollbar.el)return;const E=n.params.scrollbar;let{el:D}=n.scrollbar;D=St(D),D.forEach(F=>{F.classList.remove(E.horizontalClass,E.verticalClass),F.classList.add(n.isHorizontal()?E.horizontalClass:E.verticalClass)})}),t("init",()=>{n.params.scrollbar.enabled===!1?b():(U(),g(),f())}),t("update resize observerUpdate lock unlock changeDirection",()=>{g()}),t("setTranslate",()=>{f()}),t("setTransition",(E,D)=>{u(D)}),t("enable disable",()=>{const{el:E}=n.scrollbar;E&&E.classList[n.enabled?"remove":"add"](...Gi(n.params.scrollbar.lockClass))}),t("destroy",()=>{T()});const y=()=>{n.el.classList.remove(...Gi(n.params.scrollbar.scrollbarDisabledClass)),n.scrollbar.el&&n.scrollbar.el.classList.remove(...Gi(n.params.scrollbar.scrollbarDisabledClass)),U(),g(),f()},b=()=>{n.el.classList.add(...Gi(n.params.scrollbar.scrollbarDisabledClass)),n.scrollbar.el&&n.scrollbar.el.classList.add(...Gi(n.params.scrollbar.scrollbarDisabledClass)),T()};Object.assign(n.scrollbar,{enable:y,disable:b,updateSize:g,setTranslate:f,init:U,destroy:T})}function Zu({swiper:n,extendParams:e,on:t,emit:i,params:r}){n.autoplay={running:!1,paused:!1,timeLeft:0},e({autoplay:{enabled:!1,delay:3e3,waitForTransition:!0,disableOnInteraction:!1,stopOnLastSlide:!1,reverseDirection:!1,pauseOnMouseEnter:!1}});let s,a,o=r&&r.autoplay?r.autoplay.delay:3e3,l=r&&r.autoplay?r.autoplay.delay:3e3,c,d=new Date().getTime(),h,f,u,g,v,m;function p(B){!n||n.destroyed||!n.wrapperEl||B.target===n.wrapperEl&&(n.wrapperEl.removeEventListener("transitionend",p),!(m||B.detail&&B.detail.bySwiperTouchMove)&&y())}const A=()=>{if(n.destroyed||!n.autoplay.running)return;n.autoplay.paused?h=!0:h&&(l=c,h=!1);const B=n.autoplay.paused?c:d+l-new Date().getTime();n.autoplay.timeLeft=B,i("autoplayTimeLeft",B,B/o),a=requestAnimationFrame(()=>{A()})},_=()=>{let B;return n.virtual&&n.params.virtual.enabled?B=n.slides.find(Z=>Z.classList.contains("swiper-slide-active")):B=n.slides[n.activeIndex],B?parseInt(B.getAttribute("data-swiper-autoplay"),10):void 0},S=()=>{let B=n.params.autoplay.delay;const R=_();return!Number.isNaN(R)&&R>0&&(B=R),B},M=B=>{if(n.destroyed||!n.autoplay.running)return;cancelAnimationFrame(a),A();let R=B;typeof R>"u"&&(R=S(),o=R,l=R),c=R;const Z=n.params.speed,K=()=>{!n||n.destroyed||(n.params.autoplay.reverseDirection?!n.isBeginning||n.params.loop||n.params.rewind?(n.slidePrev(Z,!0,!0),i("autoplay")):n.params.autoplay.stopOnLastSlide||(n.slideTo(n.slides.length-1,Z,!0,!0),i("autoplay")):!n.isEnd||n.params.loop||n.params.rewind?(n.slideNext(Z,!0,!0),i("autoplay")):n.params.autoplay.stopOnLastSlide||(n.slideTo(0,Z,!0,!0),i("autoplay")),n.params.cssMode&&(d=new Date().getTime(),requestAnimationFrame(()=>{M()})))};return R>0?(clearTimeout(s),s=setTimeout(()=>{K()},R)):requestAnimationFrame(()=>{K()}),R},C=()=>{d=new Date().getTime(),n.autoplay.running=!0,M(),i("autoplayStart")},U=()=>{n.autoplay.running=!1,clearTimeout(s),cancelAnimationFrame(a),i("autoplayStop")},T=(B,R)=>{if(n.destroyed||!n.autoplay.running)return;clearTimeout(s),B||(v=!0);const Z=()=>{i("autoplayPause"),n.params.autoplay.waitForTransition?n.wrapperEl.addEventListener("transitionend",p):y()};if(n.autoplay.paused=!0,R){Z();return}c=(c||n.params.autoplay.delay)-(new Date().getTime()-d),!(n.isEnd&&c<0&&!n.params.loop)&&(c<0&&(c=0),Z())},y=()=>{n.isEnd&&c<0&&!n.params.loop||n.destroyed||!n.autoplay.running||(d=new Date().getTime(),v?(v=!1,M(c)):M(),n.autoplay.paused=!1,i("autoplayResume"))},b=()=>{if(n.destroyed||!n.autoplay.running)return;const B=Vt();B.visibilityState==="hidden"&&(v=!0,T(!0)),B.visibilityState==="visible"&&y()},E=B=>{B.pointerType==="mouse"&&(v=!0,m=!0,!(n.animating||n.autoplay.paused)&&T(!0))},D=B=>{B.pointerType==="mouse"&&(m=!1,n.autoplay.paused&&y())},F=()=>{n.params.autoplay.pauseOnMouseEnter&&(n.el.addEventListener("pointerenter",E),n.el.addEventListener("pointerleave",D))},Q=()=>{n.el&&typeof n.el!="string"&&(n.el.removeEventListener("pointerenter",E),n.el.removeEventListener("pointerleave",D))},V=()=>{Vt().addEventListener("visibilitychange",b)},O=()=>{Vt().removeEventListener("visibilitychange",b)};t("init",()=>{n.params.autoplay.enabled&&(F(),V(),C())}),t("destroy",()=>{Q(),O(),n.autoplay.running&&U()}),t("_freeModeStaticRelease",()=>{(u||v)&&y()}),t("_freeModeNoMomentumRelease",()=>{n.params.autoplay.disableOnInteraction?U():T(!0,!0)}),t("beforeTransitionStart",(B,R,Z)=>{n.destroyed||!n.autoplay.running||(Z||!n.params.autoplay.disableOnInteraction?T(!0,!0):U())}),t("sliderFirstMove",()=>{if(!(n.destroyed||!n.autoplay.running)){if(n.params.autoplay.disableOnInteraction){U();return}f=!0,u=!1,v=!1,g=setTimeout(()=>{v=!0,u=!0,T(!0)},200)}}),t("touchEnd",()=>{if(!(n.destroyed||!n.autoplay.running||!f)){if(clearTimeout(g),clearTimeout(s),n.params.autoplay.disableOnInteraction){u=!1,f=!1;return}u&&n.params.cssMode&&y(),u=!1,f=!1}}),t("slideChange",()=>{n.destroyed||!n.autoplay.running||n.autoplay.paused&&(c=S(),o=S())}),Object.assign(n.autoplay,{start:C,stop:U,pause:T,resume:y})}function Xu({swiper:n,extendParams:e,on:t}){e({thumbs:{swiper:null,multipleActiveThumbs:!0,autoScrollOffset:0,slideThumbActiveClass:"swiper-slide-thumb-active",thumbsContainerClass:"swiper-thumbs"}});let i=!1,r=!1;n.thumbs={swiper:null};function s(){const d=n.thumbs.swiper;return!d||d.destroyed?!1:d.params.virtual&&d.params.virtual.enabled}function a(){const d=n.thumbs.swiper;if(!d||d.destroyed)return;const h=d.clickedIndex,f=d.clickedSlide;if(f&&f.classList.contains(n.params.thumbs.slideThumbActiveClass)||typeof h>"u"||h===null)return;let u;d.params.loop?u=parseInt(d.clickedSlide.getAttribute("data-swiper-slide-index"),10):u=h,n.params.loop?n.slideToLoop(u):n.slideTo(u)}function o(){const{thumbs:d}=n.params;if(i)return!1;i=!0;const h=n.constructor;if(d.swiper instanceof h){if(d.swiper.destroyed)return i=!1,!1;n.thumbs.swiper=d.swiper,Object.assign(n.thumbs.swiper.originalParams,{watchSlidesProgress:!0,slideToClickedSlide:!1}),Object.assign(n.thumbs.swiper.params,{watchSlidesProgress:!0,slideToClickedSlide:!1}),n.thumbs.swiper.update()}else if(gr(d.swiper)){const f=Object.assign({},d.swiper);Object.assign(f,{watchSlidesProgress:!0,slideToClickedSlide:!1}),n.thumbs.swiper=new h(f),r=!0}return n.thumbs.swiper.el.classList.add(n.params.thumbs.thumbsContainerClass),n.thumbs.swiper.on("tap",a),s()&&n.thumbs.swiper.on("virtualUpdate",()=>{l(!1,{autoScroll:!1})}),!0}function l(d,h){const f=n.thumbs.swiper;if(!f||f.destroyed)return;let u=1;const g=n.params.thumbs.slideThumbActiveClass;if(n.params.slidesPerView>1&&!n.params.centeredSlides&&(u=n.params.slidesPerView),n.params.thumbs.multipleActiveThumbs||(u=1),u=Math.floor(u),f.slides.forEach(v=>v.classList.remove(g)),f.params.loop||s())for(let v=0;v<u;v+=1)ci(f.slidesEl,`[data-swiper-slide-index="${n.realIndex+v}"]`).forEach(m=>{m.classList.add(g)});else for(let v=0;v<u;v+=1)f.slides[n.realIndex+v]&&f.slides[n.realIndex+v].classList.add(g);(h?.autoScroll??!0)&&c(d?0:void 0)}function c(d){const h=n.thumbs.swiper;if(!h||h.destroyed)return;const f=h.params.slidesPerView==="auto"?h.slidesPerViewDynamic():h.params.slidesPerView,u=n.params.thumbs.autoScrollOffset,g=u&&!h.params.loop;if(n.realIndex!==h.realIndex||g){const v=h.activeIndex;let m,p;if(h.params.loop){const A=h.slides.find(_=>_.getAttribute("data-swiper-slide-index")===`${n.realIndex}`);m=h.slides.indexOf(A),p=n.activeIndex>n.previousIndex?"next":"prev"}else m=n.realIndex,p=m>n.previousIndex?"next":"prev";g&&(m+=p==="next"?u:-1*u),h.visibleSlidesIndexes&&h.visibleSlidesIndexes.indexOf(m)<0&&(h.params.centeredSlides?m>v?m=m-Math.floor(f/2)+1:m=m+Math.floor(f/2)-1:m>v&&h.params.slidesPerGroup,h.slideTo(m,d))}}t("beforeInit",()=>{const{thumbs:d}=n.params;if(!(!d||!d.swiper))if(typeof d.swiper=="string"||d.swiper instanceof HTMLElement){const h=Vt(),f=()=>{const g=typeof d.swiper=="string"?h.querySelector(d.swiper):d.swiper;if(g&&g.swiper)d.swiper=g.swiper,o(),l(!0);else if(g){const v=`${n.params.eventsPrefix}init`,m=p=>{d.swiper=p.detail[0],g.removeEventListener(v,m),o(),l(!0),d.swiper.update(),n.update()};g.addEventListener(v,m)}return g},u=()=>{if(n.destroyed)return;f()||requestAnimationFrame(u)};requestAnimationFrame(u)}else o(),l(!0)}),t("slideChange update resize observerUpdate",()=>{l()}),t("setTransition",(d,h)=>{const f=n.thumbs.swiper;!f||f.destroyed||f.setTransition(h)}),t("beforeDestroy",()=>{const d=n.thumbs.swiper;!d||d.destroyed||r&&d.destroy()}),Object.assign(n.thumbs,{init:o,update:l})}const Yu=':root{--swiper-theme-color: #007aff}:host{position:relative;display:block;margin-left:auto;margin-right:auto;z-index:1}.swiper{margin-left:auto;margin-right:auto;position:relative;overflow:hidden;list-style:none;padding:0;z-index:1;display:block}.swiper-vertical>.swiper-wrapper{flex-direction:column}.swiper-wrapper{position:relative;width:100%;height:100%;z-index:1;display:flex;transition-property:transform;transition-timing-function:var(--swiper-wrapper-transition-timing-function, initial);box-sizing:content-box}.swiper-android .swiper-slide,.swiper-ios .swiper-slide,.swiper-wrapper{transform:translateZ(0)}.swiper-horizontal{touch-action:pan-y}.swiper-vertical{touch-action:pan-x}.swiper-slide{flex-shrink:0;width:100%;height:100%;position:relative;transition-property:transform;display:block}.swiper-slide-invisible-blank{visibility:hidden}.swiper-autoheight,.swiper-autoheight .swiper-slide{height:auto}.swiper-autoheight .swiper-wrapper{align-items:flex-start;transition-property:transform,height}.swiper-backface-hidden .swiper-slide{transform:translateZ(0);backface-visibility:hidden}.swiper-3d.swiper-css-mode .swiper-wrapper{perspective:1200px}.swiper-3d .swiper-wrapper{transform-style:preserve-3d}.swiper-3d{perspective:1200px}.swiper-3d .swiper-slide,.swiper-3d .swiper-cube-shadow{transform-style:preserve-3d}.swiper-css-mode>.swiper-wrapper{overflow:auto;scrollbar-width:none;-ms-overflow-style:none}.swiper-css-mode>.swiper-wrapper::-webkit-scrollbar{display:none}.swiper-css-mode>.swiper-wrapper>.swiper-slide{scroll-snap-align:start start}.swiper-css-mode.swiper-horizontal>.swiper-wrapper{scroll-snap-type:x mandatory}.swiper-css-mode.swiper-horizontal>.swiper-wrapper>.swiper-slide:first-child{margin-inline-start:var(--swiper-slides-offset-before);scroll-margin-inline-start:var(--swiper-slides-offset-before)}.swiper-css-mode.swiper-horizontal>.swiper-wrapper>.swiper-slide:last-child{margin-inline-end:var(--swiper-slides-offset-after)}.swiper-css-mode.swiper-vertical>.swiper-wrapper{scroll-snap-type:y mandatory}.swiper-css-mode.swiper-vertical>.swiper-wrapper>.swiper-slide:first-child{margin-block-start:var(--swiper-slides-offset-before);scroll-margin-block-start:var(--swiper-slides-offset-before)}.swiper-css-mode.swiper-vertical>.swiper-wrapper>.swiper-slide:last-child{margin-block-end:var(--swiper-slides-offset-after)}.swiper-css-mode.swiper-free-mode>.swiper-wrapper{scroll-snap-type:none}.swiper-css-mode.swiper-free-mode>.swiper-wrapper>.swiper-slide{scroll-snap-align:none}.swiper-css-mode.swiper-centered>.swiper-wrapper:before{content:"";flex-shrink:0;order:9999}.swiper-css-mode.swiper-centered>.swiper-wrapper>.swiper-slide{scroll-snap-align:center center;scroll-snap-stop:always}.swiper-css-mode.swiper-centered.swiper-horizontal>.swiper-wrapper>.swiper-slide:first-child{margin-inline-start:var(--swiper-centered-offset-before)}.swiper-css-mode.swiper-centered.swiper-horizontal>.swiper-wrapper:before{height:100%;min-height:1px;width:var(--swiper-centered-offset-after)}.swiper-css-mode.swiper-centered.swiper-vertical>.swiper-wrapper>.swiper-slide:first-child{margin-block-start:var(--swiper-centered-offset-before)}.swiper-css-mode.swiper-centered.swiper-vertical>.swiper-wrapper:before{width:100%;min-width:1px;height:var(--swiper-centered-offset-after)}.swiper-3d .swiper-slide-shadow,.swiper-3d .swiper-slide-shadow-left,.swiper-3d .swiper-slide-shadow-right,.swiper-3d .swiper-slide-shadow-top,.swiper-3d .swiper-slide-shadow-bottom{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:10}.swiper-3d .swiper-slide-shadow{background:#00000026}.swiper-3d .swiper-slide-shadow-left{background-image:linear-gradient(to left,#00000080,#0000)}.swiper-3d .swiper-slide-shadow-right{background-image:linear-gradient(to right,#00000080,#0000)}.swiper-3d .swiper-slide-shadow-top{background-image:linear-gradient(to top,#00000080,#0000)}.swiper-3d .swiper-slide-shadow-bottom{background-image:linear-gradient(to bottom,#00000080,#0000)}.swiper-lazy-preloader{width:42px;height:42px;position:absolute;left:50%;top:50%;margin-left:-21px;margin-top:-21px;z-index:10;transform-origin:50%;box-sizing:border-box;border:4px solid var(--swiper-preloader-color, var(--swiper-theme-color));border-radius:50%;border-top-color:transparent}:is(.swiper:not(.swiper-watch-progress),.swiper-watch-progress .swiper-slide-visible) .swiper-lazy-preloader{animation:swiper-preloader-spin 1s infinite linear}.swiper-lazy-preloader-white{--swiper-preloader-color: #fff}.swiper-lazy-preloader-black{--swiper-preloader-color: #000}@keyframes swiper-preloader-spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}:root{--swiper-navigation-size: 44px}.swiper-button-prev,.swiper-button-next{position:absolute;width:var(--swiper-navigation-size);height:var(--swiper-navigation-size);z-index:10;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--swiper-navigation-color, var(--swiper-theme-color))}:is(.swiper-button-prev,.swiper-button-next).swiper-button-disabled{opacity:.35;cursor:auto;pointer-events:none}:is(.swiper-button-prev,.swiper-button-next).swiper-button-hidden{opacity:0;cursor:auto;pointer-events:none}.swiper-navigation-disabled :is(.swiper-button-prev,.swiper-button-next){display:none!important}:is(.swiper-button-prev,.swiper-button-next) ::slotted(svg),:is(.swiper-button-prev,.swiper-button-next) svg{width:100%;height:100%;object-fit:contain;transform-origin:center;fill:currentColor;pointer-events:none}.swiper-button-lock{display:none}.swiper-button-prev,.swiper-button-next{top:var(--swiper-navigation-top-offset, 50%);margin-top:calc(0px - (var(--swiper-navigation-size) / 2))}.swiper-button-prev{left:var(--swiper-navigation-sides-offset, 4px);right:auto}.swiper-button-prev ::slotted(.swiper-navigation-icon),.swiper-button-prev .swiper-navigation-icon{transform:rotate(180deg)}.swiper-button-next{right:var(--swiper-navigation-sides-offset, 4px);left:auto}.swiper-horizontal .swiper-button-prev,.swiper-horizontal .swiper-button-next,.swiper-horizontal~.swiper-button-prev,.swiper-horizontal~.swiper-button-next{top:var(--swiper-navigation-top-offset, 50%);margin-top:calc(0px - (var(--swiper-navigation-size) / 2));margin-left:0}.swiper-horizontal .swiper-button-prev,.swiper-horizontal~.swiper-button-prev,.swiper-horizontal.swiper-rtl .swiper-button-next,.swiper-horizontal.swiper-rtl~.swiper-button-next{left:var(--swiper-navigation-sides-offset, 4px);right:auto}.swiper-horizontal .swiper-button-next,.swiper-horizontal~.swiper-button-next,.swiper-horizontal.swiper-rtl .swiper-button-prev,.swiper-horizontal.swiper-rtl~.swiper-button-prev{right:var(--swiper-navigation-sides-offset, 4px);left:auto}:is(.swiper-horizontal .swiper-button-prev,.swiper-horizontal~.swiper-button-prev,.swiper-horizontal.swiper-rtl .swiper-button-next,.swiper-horizontal.swiper-rtl~.swiper-button-next) ::slotted(.swiper-navigation-icon),:is(.swiper-horizontal .swiper-button-prev,.swiper-horizontal~.swiper-button-prev,.swiper-horizontal.swiper-rtl .swiper-button-next,.swiper-horizontal.swiper-rtl~.swiper-button-next) .swiper-navigation-icon{transform:rotate(180deg)}:is(.swiper-horizontal.swiper-rtl .swiper-button-prev,.swiper-horizontal.swiper-rtl~.swiper-button-prev) ::slotted(.swiper-navigation-icon),:is(.swiper-horizontal.swiper-rtl .swiper-button-prev,.swiper-horizontal.swiper-rtl~.swiper-button-prev) .swiper-navigation-icon{transform:rotate(0)}.swiper-vertical .swiper-button-prev,.swiper-vertical .swiper-button-next,.swiper-vertical~.swiper-button-prev,.swiper-vertical~.swiper-button-next{left:var(--swiper-navigation-top-offset, 50%);right:auto;margin-left:calc(0px - (var(--swiper-navigation-size) / 2));margin-top:0}.swiper-vertical .swiper-button-prev,.swiper-vertical~.swiper-button-prev{top:var(--swiper-navigation-sides-offset, 4px);bottom:auto}:is(.swiper-vertical .swiper-button-prev,.swiper-vertical~.swiper-button-prev) ::slotted(.swiper-navigation-icon),:is(.swiper-vertical .swiper-button-prev,.swiper-vertical~.swiper-button-prev) .swiper-navigation-icon{transform:rotate(-90deg)}.swiper-vertical .swiper-button-next,.swiper-vertical~.swiper-button-next{bottom:var(--swiper-navigation-sides-offset, 4px);top:auto}:is(.swiper-vertical .swiper-button-next,.swiper-vertical~.swiper-button-next) ::slotted(.swiper-navigation-icon),:is(.swiper-vertical .swiper-button-next,.swiper-vertical~.swiper-button-next) .swiper-navigation-icon{transform:rotate(90deg)}.swiper-pagination{position:absolute;text-align:center;transition:.3s opacity;transform:translateZ(0);z-index:10}.swiper-pagination.swiper-pagination-hidden{opacity:0}.swiper-pagination-disabled>.swiper-pagination,.swiper-pagination.swiper-pagination-disabled{display:none!important}.swiper-pagination-fraction,.swiper-pagination-custom,.swiper-horizontal>.swiper-pagination-bullets,.swiper-pagination-bullets.swiper-pagination-horizontal{bottom:var(--swiper-pagination-bottom, 8px);top:var(--swiper-pagination-top, auto);left:0;width:100%}.swiper-pagination-bullets-dynamic{overflow:hidden;font-size:0}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{transform:scale(.33);position:relative}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active,.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-main{transform:scale(1)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev{transform:scale(.66)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev-prev{transform:scale(.33)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next{transform:scale(.66)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next-next{transform:scale(.33)}.swiper-pagination-bullet{width:var(--swiper-pagination-bullet-width, var(--swiper-pagination-bullet-size, 8px));height:var(--swiper-pagination-bullet-height, var(--swiper-pagination-bullet-size, 8px));display:inline-block;border-radius:var(--swiper-pagination-bullet-border-radius, 50%);background:var(--swiper-pagination-bullet-inactive-color, #000);opacity:var(--swiper-pagination-bullet-inactive-opacity, .2)}button.swiper-pagination-bullet{border:none;margin:0;padding:0;box-shadow:none;appearance:none}.swiper-pagination-clickable .swiper-pagination-bullet{cursor:pointer}.swiper-pagination-bullet:only-child{display:none!important}.swiper-pagination-bullet-active{opacity:var(--swiper-pagination-bullet-opacity, 1);background:var(--swiper-pagination-color, var(--swiper-theme-color))}.swiper-vertical>.swiper-pagination-bullets,.swiper-pagination-vertical.swiper-pagination-bullets{right:var(--swiper-pagination-right, 8px);left:var(--swiper-pagination-left, auto);top:50%;transform:translate3d(0,-50%,0)}:is(.swiper-vertical>.swiper-pagination-bullets,.swiper-pagination-vertical.swiper-pagination-bullets) .swiper-pagination-bullet{margin:var(--swiper-pagination-bullet-vertical-gap, 6px) 0;display:block}:is(.swiper-vertical>.swiper-pagination-bullets,.swiper-pagination-vertical.swiper-pagination-bullets).swiper-pagination-bullets-dynamic{top:50%;transform:translateY(-50%);width:8px}:is(.swiper-vertical>.swiper-pagination-bullets,.swiper-pagination-vertical.swiper-pagination-bullets).swiper-pagination-bullets-dynamic .swiper-pagination-bullet{display:inline-block;transition:.2s transform,.2s top}:is(.swiper-horizontal>.swiper-pagination-bullets,.swiper-pagination-horizontal.swiper-pagination-bullets) .swiper-pagination-bullet{margin:0 var(--swiper-pagination-bullet-horizontal-gap, 4px)}:is(.swiper-horizontal>.swiper-pagination-bullets,.swiper-pagination-horizontal.swiper-pagination-bullets).swiper-pagination-bullets-dynamic{left:50%;transform:translate(-50%);white-space:nowrap}:is(.swiper-horizontal>.swiper-pagination-bullets,.swiper-pagination-horizontal.swiper-pagination-bullets).swiper-pagination-bullets-dynamic .swiper-pagination-bullet{transition:.2s transform,.2s left}.swiper-horizontal.swiper-rtl>.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{transition:.2s transform,.2s right}.swiper-pagination-fraction{color:var(--swiper-pagination-fraction-color, inherit)}.swiper-pagination-progressbar{background:var(--swiper-pagination-progressbar-bg-color, rgba(0, 0, 0, .25));position:absolute}.swiper-pagination-progressbar .swiper-pagination-progressbar-fill{background:var(--swiper-pagination-color, var(--swiper-theme-color));position:absolute;left:0;top:0;width:100%;height:100%;transform:scale(0);transform-origin:left top}.swiper-rtl .swiper-pagination-progressbar .swiper-pagination-progressbar-fill{transform-origin:right top}.swiper-horizontal>.swiper-pagination-progressbar,.swiper-pagination-progressbar.swiper-pagination-horizontal,.swiper-vertical>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite,.swiper-pagination-progressbar.swiper-pagination-vertical.swiper-pagination-progressbar-opposite{width:100%;height:var(--swiper-pagination-progressbar-size, 4px);left:0;top:0}.swiper-vertical>.swiper-pagination-progressbar,.swiper-pagination-progressbar.swiper-pagination-vertical,.swiper-horizontal>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite,.swiper-pagination-progressbar.swiper-pagination-horizontal.swiper-pagination-progressbar-opposite{width:var(--swiper-pagination-progressbar-size, 4px);height:100%;left:0;top:0}.swiper-pagination-lock{display:none}.swiper-scrollbar{border-radius:var(--swiper-scrollbar-border-radius, 10px);position:relative;touch-action:none;background:var(--swiper-scrollbar-bg-color, rgba(0, 0, 0, .1))}.swiper-scrollbar-disabled>.swiper-scrollbar,.swiper-scrollbar.swiper-scrollbar-disabled{display:none!important}.swiper-horizontal>.swiper-scrollbar,.swiper-scrollbar.swiper-scrollbar-horizontal{position:absolute;left:var(--swiper-scrollbar-sides-offset, 1%);bottom:var(--swiper-scrollbar-bottom, 4px);top:var(--swiper-scrollbar-top, auto);z-index:50;height:var(--swiper-scrollbar-size, 4px);width:calc(100% - 2 * var(--swiper-scrollbar-sides-offset, 1%))}.swiper-vertical>.swiper-scrollbar,.swiper-scrollbar.swiper-scrollbar-vertical{position:absolute;left:var(--swiper-scrollbar-left, auto);right:var(--swiper-scrollbar-right, 4px);top:var(--swiper-scrollbar-sides-offset, 1%);z-index:50;width:var(--swiper-scrollbar-size, 4px);height:calc(100% - 2 * var(--swiper-scrollbar-sides-offset, 1%))}.swiper-scrollbar-drag{height:100%;width:100%;position:relative;background:var(--swiper-scrollbar-drag-bg-color, rgba(0, 0, 0, .5));border-radius:var(--swiper-scrollbar-border-radius, 10px);left:0;top:0}.swiper-scrollbar-cursor-drag{cursor:move}.swiper-scrollbar-lock{display:none}';function yl(n){return n.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}class wl extends mr{slider;thumbsSlider;divContainer;divSlides;divGallery;divPagination;divPrevious;divNext;isDragging=!1;static get observedAttributes(){return["has-thumb","autoplay"]}get hasThumb(){return this.hasAttribute("has-thumb")}get autoplay(){return this.hasAttribute("autoplay")}get slides(){return[...Array.from(this.querySelectorAll("cc-swiper-slide")),...Array.from(this.divSlides?.querySelectorAll("cc-swiper-slide")??[])]}async openViewer(e,t,i){let r=document.querySelector("cc-viewer");if(!r){const o=document.createElement("cc-viewer");document.body.appendChild(o),await customElements.whenDefined("cc-viewer"),r=await new Promise(l=>{setTimeout(()=>{l(document.querySelector("cc-viewer"))},100)})}r.setSwiper(this),r.setCurrentSlideIndex(i??this.slider?.activeIndex??0);const s=this.slides[i??this.slider?.activeIndex??0],a={};s?.hasAttribute("fit-to-container")&&(a.fitToContainer=!0),s?.hasAttribute("debug-mode")&&(a.debugMode=!0),s?.hasAttribute("camera-position")&&(a.cameraPosition=s.getAttribute("camera-position")),s?.hasAttribute("camera-target")&&(a.cameraTarget=s.getAttribute("camera-target")),s?.hasAttribute("show-texture")&&(a.showTexture=s.getAttribute("show-texture")==="true"),t==="3dmodel"&&s?.hasAttribute("material-url")&&(a.materialUrl=s.getAttribute("material-url")),r.open(e,t,a)}firstUpdated(){}buildSlideElements(){const e=this.query("#divSlides");e&&this.slides.forEach((t,i)=>{const r=t.getAttribute("thumbnail-url")||"",s=t.getAttribute("image-url")||"",a=t.getAttribute("image-type")||"image",o=t.getAttribute("caption")||"",l=document.createElement("div");l.className="swiper-slide";const c=document.createElement("img");if(c.setAttribute("src",r),c.setAttribute("data-image-url",s),c.setAttribute("data-image-type",a),c.setAttribute("data-index",String(i)),c.className=o!==""?"viewer w-caption":"viewer",l.appendChild(c),o!==""){const d=document.createElement("p");d.className="slider-caption",d.textContent=o,l.appendChild(d)}e.appendChild(l)})}buildGalleryElements(){const e=this.query("#divGallery")?.querySelector(".swiper-wrapper");e&&this.slides.forEach((t,i)=>{const r=t.getAttribute("thumbnail-url")||"",s=document.createElement("div");s.className="swiper-slide gallery-thumb",s.setAttribute("data-index",String(i)),s.style.setProperty("background-image",`url("${yl(r)}")`),e.appendChild(s)})}render(){const e=`
      <style>
        ${Yu}
      </style>
    `,t=this.css`
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
      /* swiper 12 の Navigation が挿入する SVG アイコンを隠し、下の ::after の chevron だけを描く（二重矢印の解消） */
      .swiper-button-prev .swiper-navigation-icon,
      .swiper-button-next .swiper-navigation-icon {
        display: none;
      }

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
    `,i=`
      ${e}
      ${t}
      <div id='divContainer' class='swiper gallery-top'>
        <div id='divSlides' class='swiper-wrapper'></div>

        <div id='divPagination' class='swiper-pagination'></div>
        <div id='divPrevious' class='swiper-button-prev'></div>
        <div id='divNext' class='swiper-button-next'></div>
      </div>
      <div id='divGallery' class='swiper gallery-thumbs'>
        <div class='swiper-wrapper'></div>
      </div>
    `;this.updateShadowRoot(i),this.buildSlideElements(),this.buildGalleryElements(),setTimeout(()=>{this.initializeSwiper(),this.queryAll(".gallery-thumb").forEach((r,s)=>{r.addEventListener("click",()=>this.slider?.slideTo(s))}),this.queryAll("img.viewer").forEach(r=>{r.addEventListener("dragstart",s=>s.preventDefault()),r.addEventListener("click",s=>{if(this.isDragging){this.isDragging=!1;return}s.preventDefault(),s.stopPropagation(),s.stopImmediatePropagation();const a=s.target,o=a.getAttribute("data-image-url")||"",l=a.getAttribute("data-image-type")||"image",c=parseInt(a.getAttribute("data-index")||"0",10);return this.openViewer(o,l,c),!1},!0)})},0)}initializeSwiper(){this.divContainer=this.query("#divContainer")??void 0,this.divSlides=this.query("#divSlides")??void 0,this.divGallery=this.query("#divGallery")??void 0,this.divPagination=this.query("#divPagination")??void 0,this.divPrevious=this.query("#divPrevious")??void 0,this.divNext=this.query("#divNext")??void 0,this.slides.some(i=>i.getAttribute("caption"))&&this.divContainer&&this.divContainer.classList.add("has-captions");const t=this.slides.length>=2;this.divContainer&&(this.slider&&this.slider.destroy(),this.thumbsSlider&&(this.thumbsSlider.destroy(!0,!1),this.thumbsSlider=void 0),this.hasThumb&&this.divGallery&&(this.thumbsSlider=new Yt(this.divGallery,{spaceBetween:10,slidesPerView:Math.min(Math.max(4,this.slides.length),8),watchSlidesProgress:!0})),this.slider=new Yt(this.divContainer,{modules:[Gu,Hu,Ju,Zu,Xu,Wu],navigation:{prevEl:this.divPrevious,nextEl:this.divNext},pagination:this.hasThumb?{}:{el:this.divPagination},autoplay:this.autoplay?{delay:5e3,disableOnInteraction:!1,reverseDirection:!1,stopOnLastSlide:!1,waitForTransition:!0}:!1,thumbs:this.thumbsSlider?{swiper:this.thumbsSlider}:{},preventClicks:!1,preventClicksPropagation:!1,simulateTouch:!0,allowTouchMove:!0,loop:t,on:{sliderMove:()=>{this.isDragging=!0},touchEnd:()=>{setTimeout(()=>{this.isDragging=!1},50)}}}))}}customElements.get("cc-swiper")||customElements.define("cc-swiper",wl);class Cl extends mr{static get observedAttributes(){return["thumbnail-url","image-url","image-type","caption"]}get thumbnailUrl(){return this.getAttribute("thumbnail-url")||""}get imageUrl(){return this.getAttribute("image-url")||""}get imageType(){return this.getAttribute("image-type")||""}get caption(){return this.getAttribute("caption")||""}render(){const e=this.css`
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
    `;this.updateShadowRoot(e)}}customElements.get("cc-swiper-slide")||customElements.define("cc-swiper-slide",Cl);class on extends mr{_showPrevButton=!0;_showNextButton=!0;isShow=!1;isLoading=!1;get showPrevButton(){return this._showPrevButton}set showPrevButton(e){this._showPrevButton=e,this.updateNavigationVisibility()}get showNextButton(){return this._showNextButton}set showNextButton(e){this._showNextButton=e,this.updateNavigationVisibility()}open(e){this.isShow=!0,this.isLoading=!0;const t=Promise.resolve(this.doOpen(e));Promise.resolve().then(()=>{this.render()}),t.then(()=>{this.isLoading=!1,this.render()}).catch(i=>{this.isLoading=!1,this.render()})}close(){this.cleanupNavigationListeners(),this.doClose(),this.isShow=!1,this.isLoading=!1,this.render(),this.dispatch("close")}cleanupNavigationListeners(){const e=this.query(".nav-prev"),t=this.query(".nav-next"),i=this.query(".nav-close");e&&e.removeAttribute("data-listener-attached"),t&&t.removeAttribute("data-listener-attached"),i&&i.removeAttribute("data-listener-attached")}render(){if(this.shouldUseCustomRender()){this.customRender();return}const t=`
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
    `;this.updateShadowRoot(t),this.applyExternalValues(),setTimeout(()=>{this.addNavigationListeners(),this.onAfterRender()},0)}applyExternalValues(){}shouldUseCustomRender(){return!1}customRender(){}getCustomStyles(){return""}onAfterRender(){}navigatePrev(){this.dispatch("navigate-prev")}navigateNext(){this.dispatch("navigate-next")}getNavigationButtons(){const e=this.showPrevButton?"":"display: none;",t=this.showNextButton?"":"display: none;";return`
      <button class="nav-button nav-prev" style="${e}" aria-label="Previous">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button class="nav-button nav-next" style="${t}" aria-label="Next">
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
    `}addNavigationListeners(){const e=this.query(".backdrop");e&&e.style.visibility==="hidden"||setTimeout(()=>{const t=this.query(".nav-prev"),i=this.query(".nav-next"),r=this.query(".nav-close");t&&!t.hasAttribute("data-listener-attached")&&(t.setAttribute("data-listener-attached","true"),t.addEventListener("click",s=>{s.stopPropagation(),s.preventDefault(),this.navigatePrev()},!0)),i&&!i.hasAttribute("data-listener-attached")&&(i.setAttribute("data-listener-attached","true"),i.addEventListener("click",s=>{s.stopPropagation(),this.navigateNext()})),r&&!r.hasAttribute("data-listener-attached")&&(r.setAttribute("data-listener-attached","true"),r.addEventListener("click",s=>{s.stopPropagation(),this.close()}))},0)}updateNavigationVisibility(){const e=this.query(".nav-prev"),t=this.query(".nav-next");e&&(e.style.display=this._showPrevButton?"":"none"),t&&(t.style.display=this._showNextButton?"":"none")}}function Ku(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function Ul(n,e){for(var t=0;t<e.length;t++){var i=e[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,Tl(i.key),i)}}function ju(n,e,t){return e&&Ul(n.prototype,e),t&&Ul(n,t),Object.defineProperty(n,"prototype",{writable:!1}),n}function Ar(n,e,t){return(e=Tl(e))in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function Ml(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(n);e&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(n,r).enumerable})),t.push.apply(t,i)}return t}function Jr(n){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?Ml(Object(t),!0).forEach(function(i){Ar(n,i,t[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):Ml(Object(t)).forEach(function(i){Object.defineProperty(n,i,Object.getOwnPropertyDescriptor(t,i))})}return n}function qu(n,e){if(typeof n!="object"||!n)return n;var t=n[Symbol.toPrimitive];if(t!==void 0){var i=t.call(n,e);if(typeof i!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(n)}function Tl(n){var e=qu(n,"string");return typeof e=="symbol"?e:e+""}function fa(n){"@babel/helpers - typeof";return fa=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},fa(n)}var Fl={backdrop:!0,button:!0,navbar:!0,navigation:!1,title:!0,toolbar:!0,className:"",container:"body",filter:null,fullscreen:!0,inheritedAttributes:["crossOrigin","decoding","isMap","loading","referrerPolicy","sizes","srcset","useMap"],initialCoverage:.9,initialViewIndex:0,inline:!1,autoplay:!0,interval:5e3,keyboard:!0,focus:!0,loading:!0,loop:!0,preload:!0,minWidth:200,minHeight:100,movable:!0,magnifier:!1,rotatable:!0,rotateOnGesture:!0,rotateOnTouch:!0,scalable:!0,zoomable:!0,zoomOnTouch:!0,zoomOnGesture:!0,zoomOnWheel:!0,slideOnTouch:!0,slideOnWheel:!0,toggleOnDblclick:!0,tooltip:!0,transition:!0,zIndex:2015,zIndexInline:0,zoomRatio:.1,minZoomRatio:.01,maxZoomRatio:100,url:"src",ready:null,show:null,shown:null,hide:null,hidden:null,view:null,viewed:null,move:null,moved:null,rotate:null,rotated:null,scale:null,scaled:null,zoom:null,zoomed:null,play:null,playing:null,stop:null},$u='<div class="viewer-container" tabindex="-1" touch-action="none"><div class="viewer-canvas"></div><div class="viewer-magnifier" aria-hidden="true"><img class="viewer-magnifier-image" alt=""></div><div class="viewer-navigation" aria-hidden="true"><div class="viewer-prev" data-viewer-action="prev" role="button" aria-label="Previous"></div><div class="viewer-next" data-viewer-action="next" role="button" aria-label="Next"></div></div><div class="viewer-title" aria-hidden="true"></div><div class="viewer-toolbar" aria-hidden="true"></div><div class="viewer-navbar" aria-hidden="true"><ul class="viewer-list" role="navigation"></ul></div><div class="viewer-tooltip" role="alert" aria-hidden="true"></div><div class="viewer-button" data-viewer-action="mix" role="button" aria-hidden="true"></div><div class="viewer-player" aria-hidden="true"></div></div>',Zr=typeof window<"u"&&typeof window.document<"u",Ui=Zr?window:{},Tn=Zr&&Ui.document.documentElement?"ontouchstart"in Ui.document.documentElement:!1,_r=Zr?"PointerEvent"in Ui:!1,Se="viewer",Il="move",Rl="rotate",Xr="switch",Yr="transform",pa="zoom",Kr="".concat(Se,"-active"),ef="".concat(Se,"-close"),jr="".concat(Se,"-fade"),ma="".concat(Se,"-fixed"),tf="".concat(Se,"-fullscreen"),Bl="".concat(Se,"-fullscreen-exit"),Mi="".concat(Se,"-hide"),nf="".concat(Se,"-hide-md-down"),rf="".concat(Se,"-hide-sm-down"),sf="".concat(Se,"-hide-xs-down"),ei="".concat(Se,"-in"),Sr="".concat(Se,"-invisible"),Fn="".concat(Se,"-loading"),af="".concat(Se,"-move"),Dl="".concat(Se,"-open"),In="".concat(Se,"-show"),lt="".concat(Se,"-transition"),Ji="click",ga="dblclick",Ql="dragstart",Nl="focusin",qr="keydown",di="load",ln="error",of=Tn?"touchend touchcancel":"mouseup",lf=Tn?"touchmove":"mousemove",cf=Tn?"touchstart":"mousedown",Ll=_r?"pointerdown":cf,Pl=_r?"pointerenter":"mouseenter",Vl=_r?"pointerleave":"mouseleave",$r=_r?"pointermove":lf,kl=_r?"pointerup pointercancel":of,Ol="resize",hi="transitionend",zl="wheel",Wl="gesturestart gesturechange gestureend",Gl="ready",Hl="show",Jl="shown",Zl="hide",Xl="hidden",Yl="view",br="viewed",Kl="move",jl="moved",ql="rotate",$l="rotated",ec="scale",tc="scaled",ic="zoom",nc="zoomed",rc="play",es="playing",sc="stop",xr="".concat(Se,"Action"),Er=/\s+/,ts=["zoom-in","zoom-out","one-to-one","reset","prev","play","next","rotate-left","rotate-right","flip-horizontal","flip-vertical"];function Rn(n){return typeof n=="string"}var df={ctrl:"ctrlKey",shift:"shiftKey",alt:"altKey",meta:"metaKey"};function ac(n,e){return n?n===!0?!0:Rn(n)&&n.split("+").every(function(t){return e[df[t.trim().toLowerCase()]]}):!1}var hf=Number.isNaN||Ui.isNaN;function it(n){return typeof n=="number"&&!hf(n)}function ui(n){return typeof n>"u"}function Bn(n){return fa(n)==="object"&&n!==null}var uf=Object.prototype.hasOwnProperty;function kt(n){if(!Bn(n))return!1;try{var e=n.constructor,t=e.prototype;return e&&t&&uf.call(t,"isPrototypeOf")}catch{return!1}}function Je(n){return typeof n=="function"}function $e(n,e){if(n&&Je(e))if(Array.isArray(n)||it(n.length)){var t=n.length,i;for(i=0;i<t&&e.call(n,n[i],i,n)!==!1;i+=1);}else Bn(n)&&Object.keys(n).forEach(function(r){e.call(n,n[r],r,n)});return n}function is(n,e,t){$e(t,function(i){var r=e.getAttribute(i);r!==null&&n.setAttribute(i,r)})}function Bt(n,e){var t=n.transition;return t&&t[e]!==!1}var Dt=Object.assign||function(e){for(var t=arguments.length,i=new Array(t>1?t-1:0),r=1;r<t;r++)i[r-1]=arguments[r];return Bn(e)&&i.length>0&&i.forEach(function(s){Bn(s)&&Object.keys(s).forEach(function(a){e[a]=s[a]})}),e},ff=/^(?:width|height|left|top|marginLeft|marginTop)$/;function fi(n,e){var t=n.style;$e(e,function(i,r){ff.test(r)&&it(i)&&(i+="px"),t[r]=i})}function pf(n){return Rn(n)?n.replace(/&(?!amp;|quot;|#39;|lt;|gt;)/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):n}function Dn(n,e){return!n||!e?!1:n.classList?n.classList.contains(e):n.className.split(Er).indexOf(e)>-1}function Ae(n,e){if(!(!n||!e)){if(it(n.length)){$e(n,function(i){Ae(i,e)});return}if(n.classList){n.classList.add(e);return}var t=n.className.trim();t?t.indexOf(e)<0&&(n.className="".concat(t," ").concat(e)):n.className=e}}function Ze(n,e){if(!(!n||!e)){if(it(n.length)){$e(n,function(i){Ze(i,e)});return}if(n.classList){n.classList.remove(e);return}var t=n.className;t&&t.indexOf(e)>=0&&(n.className=t.split(Er).filter(function(i){return i&&i!==e}).join(" "))}}function ti(n,e,t){if(e){if(it(n.length)){$e(n,function(i){ti(i,e,t)});return}t?Ae(n,e):Ze(n,e)}}var mf=/([a-z\d])([A-Z])/g;function va(n){return n.replace(mf,"$1-$2").toLowerCase()}function Zi(n,e){return Bn(n[e])?n[e]:n.dataset?n.dataset[e]:n.getAttribute("data-".concat(va(e)))}function Aa(n,e,t){Bn(t)?n[e]=t:n.dataset?n.dataset[e]=t:n.setAttribute("data-".concat(va(e)),t)}var oc=(function(){var n=!1;if(Zr){var e=!1,t=function(){},i=Object.defineProperty({},"once",{get:function(){return n=!0,e},set:function(s){e=s}});Ui.addEventListener("test",t,i),Ui.removeEventListener("test",t,i)}return n})();function qe(n,e,t){var i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},r=t;e.trim().split(Er).forEach(function(s){if(!oc){var a=n.listeners;a&&a[s]&&a[s][t]&&(r=a[s][t],delete a[s][t],Object.keys(a[s]).length===0&&delete a[s],Object.keys(a).length===0&&delete n.listeners)}n.removeEventListener(s,r,i)})}function we(n,e,t){var i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},r=t;e.trim().split(Er).forEach(function(s){if(i.once&&!oc){var a=n.listeners,o=a===void 0?{}:a;r=function(){delete o[s][t],n.removeEventListener(s,r,i);for(var c=arguments.length,d=new Array(c),h=0;h<c;h++)d[h]=arguments[h];t.apply(n,d)},o[s]||(o[s]={}),o[s][t]&&n.removeEventListener(s,o[s][t],i),o[s][t]=r,n.listeners=o}n.addEventListener(s,r,i)})}function ht(n,e,t,i){var r;return Je(Event)&&Je(CustomEvent)?r=new CustomEvent(e,Jr({bubbles:!0,cancelable:!0,detail:t},i)):(r=document.createEvent("CustomEvent"),r.initCustomEvent(e,!0,!0,t)),n.dispatchEvent(r)}function gf(n){var e=n.getBoundingClientRect();return{left:e.left+(window.pageXOffset-document.documentElement.clientLeft),top:e.top+(window.pageYOffset-document.documentElement.clientTop)}}function ns(n){var e=n.rotate,t=n.scaleX,i=n.scaleY,r=n.translateX,s=n.translateY,a=[];it(r)&&r!==0&&a.push("translateX(".concat(r,"px)")),it(s)&&s!==0&&a.push("translateY(".concat(s,"px)")),it(e)&&e!==0&&a.push("rotate(".concat(e,"deg)")),it(t)&&it(i)&&(t!==1||i!==1)&&(a.push("scaleX(".concat(t,")")),a.push("scaleY(".concat(i,")")));var o=a.length?a.join(" "):"none";return{WebkitTransform:o,msTransform:o,transform:o}}function vf(n){return Rn(n)?decodeURIComponent(n.replace(/^.*\//,"").replace(/[?&#].*$/,"")):""}var _a=Ui.navigator&&/Version\/\d+(\.\d+)+?\s+Safari/i.test(Ui.navigator.userAgent);function lc(n,e,t){var i=document.createElement("img");if(n.naturalWidth&&!_a)return t(n.naturalWidth,n.naturalHeight),i;var r=document.body||document.documentElement;return i.onload=function(){t(i.width,i.height),_a||r.removeChild(i)},is(i,n,e.inheritedAttributes),i.src=n.src,_a||(i.style.cssText="left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;",r.appendChild(i)),i}function Qn(n){switch(n){case 2:return sf;case 3:return rf;case 4:return nf;default:return""}}function cc(n){var e=Jr({},n),t=[];return $e(n,function(i,r){delete e[r],$e(e,function(s){var a=Math.abs(i.startX-s.startX),o=Math.abs(i.startY-s.startY),l=Math.abs(i.endX-s.endX),c=Math.abs(i.endY-s.endY),d=Math.sqrt(a*a+o*o),h=Math.sqrt(l*l+c*c),f=(h-d)/d;t.push(f)})}),t.sort(function(i,r){return Math.abs(i)<Math.abs(r)}),t[0]}function dc(n){var e=Jr({},n),t=[];return $e(n,function(i,r){delete e[r],$e(e,function(s){var a=Math.atan2(s.startY-i.startY,s.startX-i.startX),o=Math.atan2(s.endY-i.endY,s.endX-i.endX),l=o-a;l>Math.PI?l-=Math.PI*2:l<-Math.PI&&(l+=Math.PI*2),t.push(l*180/Math.PI)})}),t.sort(function(i,r){return Math.abs(r)-Math.abs(i)}),t[0]||0}function rs(n,e){var t=n.pageX,i=n.pageY,r={endX:t,endY:i};return e?r:Jr({timeStamp:Date.now(),startX:t,startY:i},r)}function Af(n){var e=0,t=0,i=0;return $e(n,function(r){var s=r.startX,a=r.startY;e+=s,t+=a,i+=1}),e/=i,t/=i,{pageX:e,pageY:t}}var _f={render:function(){this.initContainer(),this.initViewer(),this.initList(),this.renderViewer()},initBody:function(){var e=this.ownerDocument,t=e.body||e.documentElement;this.body=t,this.scrollbarWidth=window.innerWidth-e.documentElement.clientWidth,this.initialBodyPaddingRight=t.style.paddingRight,this.initialBodyComputedPaddingRight=window.getComputedStyle(t).paddingRight},initContainer:function(){this.containerData={width:window.innerWidth,height:window.innerHeight}},initViewer:function(){var e=this.options,t=this.parent,i;e.inline&&(i={width:Math.max(t.offsetWidth,e.minWidth),height:Math.max(t.offsetHeight,e.minHeight)},this.parentData=i),(this.fulled||!i)&&(i=this.containerData),this.viewerData=Dt({},i)},renderViewer:function(){this.options.inline&&!this.fulled&&fi(this.viewer,this.viewerData)},initList:function(){var e=this,t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:this.index,i=this.element,r=this.options,s=this.list,a=[],o=kt(r.navbar)?r.navbar:{},l=document.createElement("li");this.containerData||this.initContainer(),s.appendChild(l);var c=this.isNavbarVertical?l.offsetHeight+parseInt(window.getComputedStyle(l).marginTop,10):l.offsetWidth+parseInt(window.getComputedStyle(l).marginLeft,10);s.removeChild(l);var d=it(o.visibleItemCount)?Math.floor(o.visibleItemCount):Math.floor((this.isNavbarVertical?this.containerData.height:this.containerData.width)/c);d=Math.min(d,this.length);var h=d>0?Math.min(Math.max(0,t-Math.floor(d/2)),Math.max(0,this.length-d)):0,f=d>0?Math.min(this.length,h+d):this.length;if(s.innerHTML="",$e(this.images,function(g,v){if(!(d>0&&(v<h||v>=f))){var m=g.src,p=g.alt||vf(m),A=e.getImageURL(g);if(m||A){var _=document.createElement("li"),S=document.createElement("img");is(S,g,r.inheritedAttributes),r.navbar&&(S.src=m||A),S.alt=p,S.setAttribute("data-original-url",A||m),_.setAttribute("data-index",v),_.setAttribute("data-viewer-action","view"),_.setAttribute("role","button"),r.keyboard&&_.setAttribute("tabindex",0),_.appendChild(S),s.appendChild(_),a.push(_)}}}),this.items=a,this.viewed){var u=this.getItem(this.index);u&&(Ae(u,Kr),u.setAttribute("aria-selected",!0))}$e(a,function(g){var v=g.firstElementChild,m,p;Aa(v,"filled",!0),r.loading&&Ae(g,Fn),we(v,di,m=function(_){qe(v,ln,p),r.loading&&Ze(g,Fn),e.loadImage(_)},{once:!0}),we(v,ln,p=function(){qe(v,di,m),r.loading&&Ze(g,Fn)},{once:!0})}),Bt(r,"view")&&we(i,br,function(){Ae(s,lt)},{once:!0})},getItem:function(e){var t;return $e(this.items,function(i){return Number(Zi(i,"index"))===e?(t=i,!1):!0}),t},renderList:function(){var e=this.index,t=this.getItem(e);if(t){var i=t.nextElementSibling,r=parseInt(window.getComputedStyle(i||t)[this.isNavbarVertical?"marginTop":"marginLeft"],10),s=this.isNavbarVertical?t.offsetHeight:t.offsetWidth,a=s+r;fi(this.list,Dt(Ar({},this.isNavbarVertical?"height":"width",a*this.items.length-r),ns(Ar({},this.isNavbarVertical?"translateY":"translateX",((this.isNavbarVertical?this.viewerData.height:this.viewerData.width)-s)/2-(this.isNavbarVertical?t.offsetTop:t.offsetLeft)))))}},resetList:function(){var e=this.list;e.innerHTML="",Ze(e,lt),fi(e,Dt(Ar({},this.isNavbarVertical?"height":"width",0),ns(Ar({},this.isNavbarVertical?"translateY":"translateX",0))))},initImage:function(e){var t=this,i=this.options,r=this.image,s=this.viewerData,a=this.title,o=this.toolbar,l=this.navbar,c={top:0,right:0,bottom:0,left:0},d=this.imageData||{},h=a.offsetHeight,f;h&&(c.bottom=s.height-a.offsetTop),$e([o,l],function(v){var m=v.offsetWidth,p=v.offsetHeight;!m&&!p||["top","right","bottom","left"].some(function(A){if(Dn(v,"".concat(Se,"-").concat(v===o?"toolbar":"navbar","-").concat(A))){var _=v.offsetLeft+m;return A==="top"?_=v.offsetTop+p:A==="right"?_=s.width-v.offsetLeft:A==="bottom"&&(_=s.height-v.offsetTop),c[A]=Math.max(c[A],_),!0}return!1})});var u=Math.max(s.width-c.left-c.right,c.left,c.right),g=Math.max(s.height-c.top-c.bottom,c.top,c.bottom);this.imageInitializing={abort:function(){f.onload=null}},f=lc(r,i,function(v,m){var p=v/m,A=Math.max(0,Math.min(1,i.initialCoverage)),_=u,S=g;t.imageInitializing=!1,g*p>u?S=u/p:_=g*p,A=it(A)?A:.9,_=Math.min(_*A,v),S=Math.min(S*A,m);var M=c.left+(u-_)/2,C=c.top+(g-S)/2,U={left:M,top:C,x:M,y:C,width:_,height:S,oldRatio:1,ratio:_/v,aspectRatio:p,naturalWidth:v,naturalHeight:m},T=Dt({},U);i.rotatable&&(U.rotate=d.rotate||0,T.rotate=0),i.scalable&&(U.scaleX=d.scaleX||1,U.scaleY=d.scaleY||1,T.scaleX=1,T.scaleY=1),t.imageData=U,t.initialImageData=T,e&&e()})},renderImage:function(e){var t=this,i=this.image,r=this.imageData;if(fi(i,Dt({width:r.width,height:r.height,marginLeft:r.x,marginTop:r.y},ns(r))),this.magnifierPoint&&this.renderMagnifier(),e){var s=!1;if(this.viewing?s="view":this.moving?s="move":this.rotating?s="rotate":this.scaling?s="scale":this.zooming&&(s="zoom"),s&&Bt(this.options,s)&&Dn(i,lt)){var a=function(){t.imageRendering=!1,e()};this.imageRendering={abort:function(){qe(i,hi,a)}},we(i,hi,a,{once:!0})}else e()}},resetImage:function(){var e=this.image;e&&(this.viewing&&this.viewing.abort(),e.parentNode.removeChild(e),this.image=null,this.title.innerHTML="")}},Sf={bind:function(){var e=this.options,t=this.viewer,i=this.canvas,r=this.ownerDocument;we(t,Ji,this.onClick=this.click.bind(this)),we(t,Ql,this.onDragStart=this.dragstart.bind(this)),we(t,Pl,this.onMagnifyEnter=this.magnify.bind(this)),we(t,$r,this.onMagnify=this.magnify.bind(this)),we(t,Vl,this.onMagnifierLeave=this.hideMagnifier.bind(this)),we(i,Ll,this.onPointerDown=this.pointerdown.bind(this)),we(r,$r,this.onPointerMove=this.pointermove.bind(this)),we(r,kl,this.onPointerUp=this.pointerup.bind(this)),we(r,qr,this.onKeyDown=this.keydown.bind(this)),we(window,Ol,this.onResize=this.resize.bind(this)),(e.zoomable&&e.zoomOnWheel||e.slideOnWheel)&&we(t,zl,this.onWheel=this.wheel.bind(this),{passive:!1,capture:!0}),(e.zoomable&&e.zoomOnGesture||e.rotatable&&e.rotateOnGesture)&&we(t,Wl,this.onGesture=this.gesture.bind(this),{passive:!1}),e.toggleOnDblclick&&we(i,ga,this.onDblclick=this.dblclick.bind(this))},unbind:function(){var e=this.options,t=this.viewer,i=this.canvas,r=this.ownerDocument;qe(t,Ji,this.onClick),qe(t,Ql,this.onDragStart),qe(t,Pl,this.onMagnifyEnter),qe(t,$r,this.onMagnify),qe(t,Vl,this.onMagnifierLeave),qe(i,Ll,this.onPointerDown),qe(r,$r,this.onPointerMove),qe(r,kl,this.onPointerUp),qe(r,qr,this.onKeyDown),qe(window,Ol,this.onResize),(e.zoomable&&e.zoomOnWheel||e.slideOnWheel)&&qe(t,zl,this.onWheel,{passive:!1,capture:!0}),(e.zoomable&&e.zoomOnGesture||e.rotatable&&e.rotateOnGesture)&&qe(t,Wl,this.onGesture,{passive:!1}),e.toggleOnDblclick&&qe(i,ga,this.onDblclick)}},bf={click:function(e){var t=this.options,i=this.imageData,r=e.target,s=Zi(r,xr);switch(!s&&r.localName==="img"&&r.parentElement.localName==="li"&&(r=r.parentElement,s=Zi(r,xr)),Tn&&e.isTrusted&&r===this.canvas&&clearTimeout(this.clickCanvasTimeout),this.actionEvent=e,s){case"mix":this.played?this.stop():t.inline?this.fulled?this.exit():this.full():this.hide();break;case"hide":this.pointerMoved||this.hide();break;case"view":this.view(Zi(r,"index"));break;case"zoom-in":this.zoom(.1,!0);break;case"zoom-out":this.zoom(-.1,!0);break;case"one-to-one":this.toggle();break;case"reset":this.reset();break;case"prev":this.prev(t.loop);break;case"play":this.play(t.fullscreen);break;case"next":this.next(t.loop);break;case"rotate-left":this.rotate(-90);break;case"rotate-right":this.rotate(90);break;case"flip-horizontal":this.scaleX(-i.scaleX||-1);break;case"flip-vertical":this.scaleY(-i.scaleY||-1);break;default:this.played&&this.stop()}},dblclick:function(e){e.preventDefault(),this.viewed&&e.target===this.image&&(Tn&&e.isTrusted&&clearTimeout(this.doubleClickImageTimeout),this.actionEvent=e.isTrusted?e:e.detail&&e.detail.originalEvent,this.toggle())},load:function(){var e=this;this.timeout&&(clearTimeout(this.timeout),this.timeout=!1);var t=this.element,i=this.options,r=this.image,s=this.index,a=this.viewerData;Ze(r,Sr),i.loading&&Ze(this.canvas,Fn),r.style.cssText="height:0;"+"margin-left:".concat(a.width/2,"px;")+"margin-top:".concat(a.height/2,"px;")+"max-width:none!important;position:relative;width:0;",this.initImage(function(){ti(r,af,i.movable),ti(r,lt,Bt(i,"view")),e.renderImage(function(){e.viewed=!0,e.viewing=!1,setTimeout(function(){ti(r,lt,i.transition)},300),Je(i.viewed)&&we(t,br,i.viewed,{once:!0}),ht(t,br,{originalImage:e.images[s],index:s,image:r,originalEvent:e.viewOriginalEvent||null},{cancelable:!1}),e.viewOriginalEvent=null})})},loadImage:function(e){var t=e.target,i=t.parentNode,r=i.offsetWidth||30,s=i.offsetHeight||50,a=!!Zi(t,"filled");lc(t,this.options,function(o,l){var c=o/l,d=r,h=s;s*c>r?a?d=s*c:h=r/c:a?h=r/c:d=s*c,fi(t,Dt({width:d,height:h},ns({translateX:(r-d)/2,translateY:(s-h)/2})))})},keydown:function(e){var t=this.options;if(t.keyboard){var i=e.keyCode||e.which||e.charCode;if(this.actionEvent=e,i===13&&this.viewer.contains(e.target)&&this.click(e),!!this.fulled)switch(i){case 27:this.played?this.stop():t.inline?this.fulled&&this.exit():this.hide();break;case 32:this.played&&this.stop();break;case 37:this.played&&this.playing?this.playing.prev():this.prev(t.loop);break;case 38:e.preventDefault(),this.zoom(t.zoomRatio,!0);break;case 39:this.played&&this.playing?this.playing.next():this.next(t.loop);break;case 40:e.preventDefault(),this.zoom(-t.zoomRatio,!0);break;case 48:case 49:e.ctrlKey&&(e.preventDefault(),this.toggle());break}}},dragstart:function(e){e.target.localName==="img"&&e.preventDefault()},magnify:function(e){if(e.changedTouches||e.pointerType&&e.pointerType!=="mouse"){this.hideMagnifier();return}this.magnifierPoint={clientX:e.clientX,clientY:e.clientY},this.renderMagnifier()},renderMagnifier:function(){var e=this.options,t=this.imageData,i=this.magnifier,r=this.magnifierImage,s=this.viewer,a=kt(e.magnifier)?e.magnifier:{},o=this.magnifierPoint;if(!e.magnifier||!this.fulled||!this.viewed||!i||!r||!o){this.hideMagnifier();return}var l=Math.max(1,Number(a.size)||100),c=Math.max(1,Number(a.zoomRatio)||2),d=Number(a.opacity),h=s.getBoundingClientRect(),f=o.clientX-h.left,u=o.clientY-h.top,g=this.image.currentSrc||this.image.src,v=this.image.getBoundingClientRect();if(o.clientX<v.left||o.clientX>v.right||o.clientY<v.top||o.clientY>v.bottom){this.hideMagnifier();return}var m=it(t.scaleX)?t.scaleX:1,p=it(t.scaleY)?t.scaleY:1,A=(t.rotate||0)*Math.PI/180,_=Math.cos(A),S=Math.sin(A),M=_*m,C=S*m,U=-S*p,T=_*p,y=m*p;if(y===0){this.hideMagnifier();return}var b=t.x+t.width/2,E=t.y+t.height/2,D=(T*(f-b)-U*(u-E))/y,F=(-C*(f-b)+M*(u-E))/y,Q=D+t.width/2,V=F+t.height/2,O=t.width*c,B=t.height*c,R=M*(Q*c-O/2)+U*(V*c-B/2),Z=C*(Q*c-O/2)+T*(V*c-B/2);this.magnifierSourcePoint={x:Q,y:V},i.style.width="".concat(l,"px"),i.style.height="".concat(l,"px"),i.style.opacity="".concat(Math.max(0,Math.min(1,it(d)?d:1))),r.src=g,r.style.width="".concat(O,"px"),r.style.height="".concat(B,"px"),r.style.left="".concat(l/2-O/2-R,"px"),r.style.top="".concat(l/2-B/2-Z,"px"),r.style.transform="rotate(".concat(t.rotate||0,"deg) scaleX(").concat(m,") scaleY(").concat(p,")"),i.removeAttribute("aria-hidden"),Ae(i,"viewer-show")},hideMagnifier:function(){this.magnifier&&(Ze(this.magnifier,"viewer-show"),this.magnifier.setAttribute("aria-hidden",!0),this.magnifierPoint=null)},pointerdown:function(e){var t=this.options,i=this.pointers,r=this.imageData,s=e.buttons,a=e.button,o=Object.keys(i).length===0;if(this.pointerMoved=!1,!(!this.viewed||this.showing||this.viewing||this.hiding||(e.type==="mousedown"||e.type==="pointerdown"&&e.pointerType==="mouse")&&(it(s)&&s!==1||it(a)&&a!==0||e.ctrlKey))){e.preventDefault(),e.changedTouches?$e(e.changedTouches,function(c){i[c.identifier]=rs(c)}):i[e.pointerId||0]=rs(e);var l=t.movable?Il:!1;(t.zoomable&&t.zoomOnTouch||t.rotatable&&t.rotateOnTouch)&&Object.keys(i).length>1?l=Yr:t.slideOnTouch&&(e.pointerType==="touch"||e.type==="touchstart")&&this.isSwitchable()&&(l=Xr),l&&Ze(this.image,lt),o&&(this.rotateThreshold=r.rotate===0),this.switching=l===Xr?{x:r.x,y:r.y}:!1,this.action=l}},pointermove:function(e){var t=this.pointers,i=this.action;!this.viewed||!i||(e.preventDefault(),e.changedTouches?$e(e.changedTouches,function(r){Dt(t[r.identifier]||{},rs(r,!0))}):Dt(t[e.pointerId||0]||{},rs(e,!0)),this.change(e),Ze(this.image,lt))},pointerup:function(e){var t=this,i=this.options,r=this.action,s=this.pointers,a=this.viewerData,o;if(e.changedTouches?$e(e.changedTouches,function(u){o=s[u.identifier],delete s[u.identifier]}):(o=s[e.pointerId||0],delete s[e.pointerId||0]),Object.keys(s).length===0){if(this.rotateThreshold){var l=Math.round(this.imageData.rotate/90)*90;l!==this.imageData.rotate&&(this.actionEvent=e,this.rotateTo(l))}this.rotateThreshold=!1}if(r){e.preventDefault();var c=r===Yr?Bt(i,pa)||Bt(i,Rl):Bt(i,r);if(ti(this.image,lt,c),r===Xr&&this.switching){var d=this.imageData,h=this.switching,f=d.x-h.x;this.switching=!1,this.actionEvent=e,Math.abs(f)>a.width/2?f>0?this.prev(i.loop):this.next(i.loop):(d.x!==h.x||d.y!==h.y)&&this.moveTo(h.x,h.y)}this.action=!1,Tn&&r!==pa&&r!==Yr&&o&&Date.now()-o.timeStamp<500&&(clearTimeout(this.clickCanvasTimeout),clearTimeout(this.doubleClickImageTimeout),i.toggleOnDblclick&&this.viewed&&e.target===this.image?this.pointerMoved?this.imageClicked=!1:this.imageClicked?(this.imageClicked=!1,this.doubleClickImageTimeout=setTimeout(function(){ht(t.image,ga,{originalEvent:e})},50)):(this.imageClicked=!0,this.doubleClickImageTimeout=setTimeout(function(){t.imageClicked=!1},500)):(this.imageClicked=!1,i.backdrop&&i.backdrop!=="static"&&e.target===this.canvas&&(this.clickCanvasTimeout=setTimeout(function(){ht(t.canvas,Ji,{originalEvent:e})},50))))}},resize:function(){var e=this;if(!(!this.isShown||this.hiding)){this.fulled&&(this.close(),this.initBody(),this.open()),this.initContainer(),this.initViewer(),this.renderViewer();var t=kt(this.options.navbar)?this.options.navbar:{};if(ui(t.visibleItemCount)&&this.initList(this.index),this.renderList(),this.viewed&&this.initImage(function(){e.renderImage()}),this.played){if(this.options.fullscreen&&this.fulled&&!(document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement)){this.stop();return}$e(this.player.getElementsByTagName("img"),function(i){we(i,di,e.loadImage.bind(e),{once:!0}),ht(i,di)})}}},wheel:function(e){var t=this,i=this.options,r=this.navbar;if(this.viewed&&(e.preventDefault(),!this.gesturing&&!this.wheeling)){this.wheeling=!0,setTimeout(function(){t.wheeling=!1},50);var s=1;e.deltaY?s=e.deltaY>0?1:-1:e.wheelDelta?s=-e.wheelDelta/120:e.detail&&(s=e.detail>0?1:-1);var a=r&&r.contains(e.target),o=!a&&i.zoomable&&ac(i.zoomOnWheel,e);if(o){var l=Number(i.zoomRatio)||.1;this.actionEvent=e,this.zoom(-s*l,!0);return}ac(i.slideOnWheel,e)&&(this.actionEvent=e,s>0?this.next(i.loop):s<0&&this.prev(i.loop))}},gesture:function(e){var t=this.options;if(!(!this.viewed||!t.zoomOnGesture&&!t.rotateOnGesture))switch(e.preventDefault(),e.type){case"gesturestart":this.gesturing=!0,this.gestureScale=e.scale||1,this.gestureRotation=e.rotation||0;break;case"gesturechange":{var i=e.scale||1,r=i/(this.gestureScale||1),s=Number(e.rotation),a=s-(this.gestureRotation||0);this.gestureScale=i,t.zoomable&&t.zoomOnGesture&&r!==1&&(this.actionEvent=e,this.zoom(r>=1?r-1:1-1/r)),t.rotatable&&t.rotateOnGesture&&it(s)&&(this.gestureRotation=s,a!==0&&(this.actionEvent=e,this.rotate(a)));break}case"gestureend":if(t.rotatable&&t.rotateOnGesture){var o=Math.round(this.imageData.rotate/90)*90;o!==this.imageData.rotate&&(this.actionEvent=e,this.rotateTo(o))}this.gesturing=!1,this.gestureScale=1,this.gestureRotation=0;break}}},xf={show:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1,t=this.element,i=this.options;if(i.inline||this.showing||this.isShown||this.showing)return this;if(!this.ready)return this.build(),this.ready&&this.show(e),this;var r=this.actionEvent||this.showOriginalEvent||this.viewOriginalEvent||null;if(this.actionEvent=null,this.showOriginalEvent=r,Je(i.show)&&we(t,Hl,i.show,{once:!0}),ht(t,Hl,{originalEvent:r})===!1||!this.ready)return this;this.hiding&&this.transitioning.abort(),this.showing=!0,this.open();var s=this.viewer;if(Ze(s,Mi),s.setAttribute("role","dialog"),s.setAttribute("aria-labelledby",this.title.id),s.setAttribute("aria-modal",!0),s.removeAttribute("aria-hidden"),Bt(i,"show")&&!e){var a=this.shown.bind(this);this.transitioning={abort:function(){qe(s,hi,a),Ze(s,ei)}},Ae(s,lt),s.initialOffsetWidth=s.offsetWidth,we(s,hi,a,{once:!0}),Ae(s,ei)}else Ae(s,ei),this.shown();return this},hide:function(){var e=this,t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1,i=this.element,r=this.options;if(r.inline||this.hiding||!(this.isShown||this.showing))return this;var s=this.actionEvent||this.hideOriginalEvent||null;if(this.actionEvent=null,this.hideOriginalEvent=s,Je(r.hide)&&we(i,Zl,r.hide,{once:!0}),ht(i,Zl,{originalEvent:s})===!1||this.destroyed)return this;this.showing&&this.transitioning.abort(),this.hiding=!0,this.played?this.stop():this.viewing&&this.viewing.abort();var a=this.viewer,o=this.image,l=function(){Ze(a,ei),e.hidden()};if(Bt(r,"hide")&&!t){var c=function(f){f&&f.target===a&&(qe(a,hi,c),e.hidden())},d=function(){Dn(a,lt)?(we(a,hi,c),Ze(a,ei)):l()};this.transitioning={abort:function(){e.viewed&&Dn(o,lt)?qe(o,hi,d):Dn(a,lt)&&qe(a,hi,c)}},this.viewed&&Dn(o,lt)?(we(o,hi,d,{once:!0}),this.zoomable=!0,this.zoomTo(0,!1)):d()}else l();return this},view:function(){var e=this,t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:this.options.initialViewIndex,i=this.index;if(t=Number(t)||0,this.hiding||this.played||t<0||t>=this.length||this.viewed&&t===i)return this;var r=this.actionEvent||this.viewOriginalEvent||null;if(this.actionEvent=null,this.viewOriginalEvent=r,!this.isShown)return this.index=t,this.show();this.viewing&&this.viewing.abort();var s=this.element,a=this.options,o=this.title,l=this.canvas,c=this.getItem(t);c||(this.initList(t),c=this.getItem(t));var d=c.querySelector("img"),h=Zi(d,"originalUrl"),f=d.getAttribute("alt"),u=document.createElement("img");if(is(u,d,a.inheritedAttributes),u.src=h,u.alt=f,Je(a.view)&&we(s,Yl,a.view,{once:!0}),ht(s,Yl,{originalImage:this.images[t],index:t,image:u,originalEvent:r})===!1||!this.isShown||this.hiding||this.played)return this;this.hideMagnifier();var g=this.getItem(i);g&&(Ze(g,Kr),g.removeAttribute("aria-selected")),Ae(c,Kr),c.setAttribute("aria-selected",!0),a.focus&&c.focus(),this.image=u,this.viewed=!1,this.index=t,this.imageData={},Ae(u,Sr),a.loading&&Ae(l,Fn),l.innerHTML="",l.appendChild(u),this.renderList(),o.innerHTML="";var v=function(){var A=e.imageData,_=Array.isArray(a.title)?a.title[1]:a.title;if(o.innerHTML=pf(Je(_)?_.call(e,u,A):"".concat(f," (").concat(A.naturalWidth," × ").concat(A.naturalHeight,")")),a.preload){var S=t<i?-1:1,M=t+S;if((M<0||M>=e.length)&&(a.loop?M=S>0?0:e.length-1:M=-1),M!==t){var C=e.images[M],U=document.createElement("img");is(U,C,a.inheritedAttributes),U.src=e.getImageURL(C)||C.src}}};we(s,br,v,{once:!0});var m=function(){var A=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1,_,S,M=function(){qe(u,di,_),qe(u,ln,S),e.timeout&&(clearTimeout(e.timeout),e.timeout=!1)};e.viewing={abort:function(){qe(s,br,v),u.complete?e.imageRendering?e.imageRendering.abort():e.imageInitializing&&e.imageInitializing.abort():(u.src="",M())}},u.complete?e.load():(we(u,di,_=function(){M(),e.load()},{once:!0}),we(u,ln,S=function(){if(M(),!A){var U=d.src;if(U&&U!==u.src){u.src=U,m(!0);return}}Ze(u,Sr),a.loading&&Ze(e.canvas,Fn)},{once:!0}),e.timeout&&clearTimeout(e.timeout),e.timeout=setTimeout(function(){Ze(u,Sr),e.timeout=!1},1e3))};return m(),this},prev:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1,t=this.index-1;return t<0&&(t=e?this.length-1:0),this.view(t),this},next:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1,t=this.length-1,i=this.index+1;return i>t&&(i=e?0:t),this.view(i),this},move:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e,i=this.imageData;return this.moveTo(ui(e)?e:i.x+Number(e),ui(t)?t:i.y+Number(t)),this},moveTo:function(e){var t=this,i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e,r=this.element,s=this.options,a=this.imageData;if(e=Number(e),i=Number(i),this.viewed&&!this.played&&s.movable){var o=a.x,l=a.y,c=!1;if(it(e)?c=!0:e=o,it(i)?c=!0:i=l,c){var d=this.actionEvent||null;if(this.actionEvent=null,Je(s.move)&&we(r,Kl,s.move,{once:!0}),ht(r,Kl,{x:e,y:i,oldX:o,oldY:l,originalEvent:d})===!1)return this;a.x=e,a.y=i,a.left=e,a.top=i,ti(this.image,lt,Bt(s,"move")),this.moving=!0,this.renderImage(function(){t.moving=!1,Je(s.moved)&&we(r,jl,s.moved,{once:!0}),ht(r,jl,{x:e,y:i,oldX:o,oldY:l,originalEvent:d},{cancelable:!1})})}}return this},rotate:function(e){return this.rotateTo((this.imageData.rotate||0)+Number(e)),this},rotateTo:function(e){var t=this,i=this.element,r=this.options,s=this.imageData;if(e=Number(e),it(e)&&this.viewed&&!this.played&&r.rotatable){var a=s.rotate,o=this.actionEvent||null;if(this.actionEvent=null,Je(r.rotate)&&we(i,ql,r.rotate,{once:!0}),ht(i,ql,{degree:e,oldDegree:a,originalEvent:o})===!1)return this;s.rotate=e,ti(this.image,lt,Bt(r,"rotate")),this.rotating=!0,this.renderImage(function(){t.rotating=!1,Je(r.rotated)&&we(i,$l,r.rotated,{once:!0}),ht(i,$l,{degree:e,oldDegree:a,originalEvent:o},{cancelable:!1})})}return this},scaleX:function(e){return this.scale(e,this.imageData.scaleY),this},scaleY:function(e){return this.scale(this.imageData.scaleX,e),this},scale:function(e){var t=this,i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e,r=this.element,s=this.options,a=this.imageData;if(e=Number(e),i=Number(i),this.viewed&&!this.played&&s.scalable){var o=a.scaleX,l=a.scaleY,c=!1;if(it(e)?c=!0:e=o,it(i)?c=!0:i=l,c){var d=this.actionEvent||null;if(this.actionEvent=null,Je(s.scale)&&we(r,ec,s.scale,{once:!0}),ht(r,ec,{scaleX:e,scaleY:i,oldScaleX:o,oldScaleY:l,originalEvent:d})===!1)return this;a.scaleX=e,a.scaleY=i,ti(this.image,lt,Bt(s,"scale")),this.scaling=!0,this.renderImage(function(){t.scaling=!1,Je(s.scaled)&&we(r,tc,s.scaled,{once:!0}),ht(r,tc,{scaleX:e,scaleY:i,oldScaleX:o,oldScaleY:l,originalEvent:d},{cancelable:!1})})}}return this},zoom:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:null,r=this.imageData;return e=Number(e),e<0?e=1/(1-e):e=1+e,this.zoomTo(r.width*e/r.naturalWidth,t,i),this},zoomTo:function(e){var t=this,i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:null,s=this.element,a=this.options,o=this.pointers,l=this.imageData,c=this.zoomable,d=l.x,h=l.y,f=l.width,u=l.height,g=l.naturalWidth,v=l.naturalHeight;if(this.zoomable=!1,e=Math.max(0,e),it(e)&&this.viewed&&!this.played&&(c||a.zoomable)){if(!c){var m=Math.max(.01,Je(a.minZoomRatio)?a.minZoomRatio.call(this,this.image,l):a.minZoomRatio),p=Math.min(100,Je(a.maxZoomRatio)?a.maxZoomRatio.call(this,this.image,l):a.maxZoomRatio);e=Math.min(Math.max(e,m),p)}var A=this.actionEvent||null;if(this.actionEvent=null,A&&A.type!==Ji)switch(A.type){case"wheel":a.zoomRatio>=.055&&e>.95&&e<1.05&&(e=1);break;case"pointermove":case"touchmove":case"mousemove":e>.99&&e<1.01&&(e=1);break}var _=g*e,S=v*e,M=_-f,C=S-u,U=l.ratio;if(Je(a.zoom)&&we(s,ic,a.zoom,{once:!0}),ht(s,ic,{ratio:e,oldRatio:U,originalEvent:A})===!1)return this;if(this.zooming=!0,A&&A.type!==Ji){var T=gf(this.viewer),y=o&&Object.keys(o).length>0?Af(o):{pageX:A.pageX,pageY:A.pageY};l.x-=M*((y.pageX-T.left-d)/f),l.y-=C*((y.pageY-T.top-h)/u)}else kt(r)&&it(r.x)&&it(r.y)?(l.x-=M*((r.x-d)/f),l.y-=C*((r.y-h)/u)):(l.x-=M/2,l.y-=C/2);l.left=l.x,l.top=l.y,l.width=_,l.height=S,l.oldRatio=U,l.ratio=e,ti(this.image,lt,Bt(a,"zoom")),this.renderImage(function(){t.zooming=!1,Je(a.zoomed)&&we(s,nc,a.zoomed,{once:!0}),ht(s,nc,{ratio:e,oldRatio:U,originalEvent:A},{cancelable:!1})}),i&&this.tooltip()}return this},play:function(){var e=this,t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1;if(!this.isShown||this.played)return this;var i=this.element,r=this.options,s=this.actionEvent||null;if(this.actionEvent=null,Je(r.play)&&we(i,rc,r.play,{once:!0}),ht(i,rc,{originalEvent:s})===!1)return this;var a=this.player,o=this.loadImage.bind(this),l=[],c=0,d=0;if(this.played=!0,this.onLoadWhenPlay=o,t&&this.requestFullscreen(t),Ae(a,In),a.removeAttribute("aria-hidden"),$e(this.images,function(u,g){var v=document.createElement("img");v.src=e.getImageURL(u)||u.src,v.alt=u.alt||"",v.referrerPolicy=u.referrerPolicy,c+=1,Ae(v,jr),ti(v,lt,Bt(r,"play")),g===e.index&&(Ae(v,ei),d=g),l.push(v),we(v,di,o,{once:!0}),a.appendChild(v)}),it(r.interval)&&r.interval>0){var h=function(){clearTimeout(e.playing.timeout);var g=e.actionEvent||null;e.actionEvent=null;var v=d-1;if(v=v>=0?v:c-1,Je(r.playing)&&we(i,es,r.playing,{once:!0}),ht(i,es,{originalImage:e.images[v],index:v,image:l[v],originalEvent:g})===!1){e.playing.timeout=r.autoplay?setTimeout(h,r.interval):null;return}Ze(l[d],ei),d=v,Ae(l[d],ei),e.playing.timeout=r.autoplay?setTimeout(h,r.interval):null},f=function(){clearTimeout(e.playing.timeout);var g=e.actionEvent||null;e.actionEvent=null;var v=d+1;if(v=v<c?v:0,Je(r.playing)&&we(i,es,r.playing,{once:!0}),ht(i,es,{originalImage:e.images[v],index:v,image:l[v],originalEvent:g})===!1){e.playing.timeout=r.autoplay?setTimeout(f,r.interval):null;return}Ze(l[d],ei),d=v,Ae(l[d],ei),e.playing.timeout=r.autoplay?setTimeout(f,r.interval):null};c>1&&(this.playing={prev:h,next:f,timeout:r.autoplay?setTimeout(f,r.interval):null})}return this},stop:function(){var e=this;if(!this.played)return this;var t=this.element,i=this.options,r=this.actionEvent||null;if(this.actionEvent=null,Je(i.stop)&&we(t,sc,i.stop,{once:!0}),ht(t,sc,{originalEvent:r})===!1)return this;var s=this.player;return clearTimeout(this.playing.timeout),this.playing=!1,this.played=!1,$e(s.getElementsByTagName("img"),function(a){qe(a,di,e.onLoadWhenPlay)}),Ze(s,In),s.setAttribute("aria-hidden",!0),s.innerHTML="",this.exitFullscreen(),this},full:function(){var e=this,t=this.options,i=this.viewer,r=this.image,s=this.list;return!this.isShown||this.played||this.fulled||!t.inline?this:(this.fulled=!0,this.open(),Ae(this.button,Bl),Ze(s,lt),this.viewed&&Ze(r,lt),Ae(i,ma),i.setAttribute("role","dialog"),i.setAttribute("aria-labelledby",this.title.id),i.setAttribute("aria-modal",!0),i.removeAttribute("style"),fi(i,{zIndex:t.zIndex}),t.focus&&this.enforceFocus(),this.initContainer(),this.viewerData=Dt({},this.containerData),this.renderList(),this.viewed&&this.initImage(function(){e.renderImage()}),this)},exit:function(){var e=this,t=this.options,i=this.viewer,r=this.image,s=this.list;return!this.isShown||this.played||!this.fulled||!t.inline?this:(this.fulled=!1,this.close(),Ze(this.button,Bl),Ze(s,lt),this.viewed&&Ze(r,lt),t.focus&&this.clearEnforceFocus(),i.removeAttribute("role"),i.removeAttribute("aria-labelledby"),i.removeAttribute("aria-modal"),Ze(i,ma),fi(i,{zIndex:t.zIndexInline}),this.viewerData=Dt({},this.parentData),this.renderViewer(),this.renderList(),this.viewed&&this.initImage(function(){e.renderImage()}),this)},tooltip:function(){var e=this,t=this.options,i=this.tooltipBox,r=this.imageData;return!this.viewed||this.played||!t.tooltip?this:(i.textContent="".concat(Math.round(r.ratio*100),"%"),this.tooltipping?clearTimeout(this.tooltipping):Bt(t,"tooltip")?(this.fading&&ht(i,hi),Ae(i,In),Ae(i,jr),Ae(i,lt),i.removeAttribute("aria-hidden"),i.initialOffsetWidth=i.offsetWidth,Ae(i,ei)):(Ae(i,In),i.removeAttribute("aria-hidden")),this.tooltipping=setTimeout(function(){Bt(t,"tooltip")?(we(i,hi,function(){Ze(i,In),Ze(i,jr),Ze(i,lt),i.setAttribute("aria-hidden",!0),e.fading=!1},{once:!0}),Ze(i,ei),e.fading=!0):(Ze(i,In),i.setAttribute("aria-hidden",!0)),e.tooltipping=!1},1e3),this)},toggle:function(){return this.imageData.ratio===1?this.zoomTo(this.imageData.oldRatio,!0):this.zoomTo(1,!0),this},reset:function(){return this.viewed&&!this.played&&(this.imageData=Dt({},this.initialImageData),this.renderImage()),this},update:function(e){var t=this,i=this.element,r=this.options,s=this.isImg;if(kt(e)&&Dt(r,e),s&&!i.parentNode)return this.destroy();var a=[];if($e(s?[i]:i.querySelectorAll("img"),function(d){Je(r.filter)?r.filter.call(t,d)&&a.push(d):t.getImageURL(d)&&a.push(d)}),!a.length)return this;if(this.images=a,this.length=a.length,this.ready){var o=[];if($e(this.items,function(d){var h=d.querySelector("img"),f=Number(Zi(d,"index")),u=a[f];u&&h?(u.src!==h.src||u.alt!==h.alt)&&o.push(f):o.push(f)}),fi(this.list,{width:"auto"}),this.initList(),this.isShown)if(this.length){if(this.viewed){var l=o.indexOf(this.index);if(l>=0)this.viewed=!1,this.view(Math.max(Math.min(this.index-l,this.length-1),0));else{var c=this.getItem(this.index);Ae(c,Kr),c.setAttribute("aria-selected",!0)}}}else this.image=null,this.viewed=!1,this.index=0,this.imageData={},this.canvas.innerHTML="",this.title.innerHTML=""}else this.build();return this},destroy:function(){var e=this.element,t=this.options;return e[Se]?(this.destroyed=!0,this.ready?(this.played&&this.stop(),t.inline?(this.fulled&&this.exit(),this.unbind()):this.isShown?(this.viewing&&(this.imageRendering?this.imageRendering.abort():this.imageInitializing&&this.imageInitializing.abort()),this.hiding&&this.transitioning.abort(),this.hidden()):this.showing&&(this.transitioning.abort(),this.hidden()),this.ready=!1,this.viewer.parentNode.removeChild(this.viewer)):t.inline&&(this.delaying?this.delaying.abort():this.initializing&&this.initializing.abort()),t.inline||(qe(e,Ji,this.onElementClick),qe(e,qr,this.onElementKeyDown)),e[Se]=void 0,this):this}},Ef={getImageURL:function(e){var t=this.options.url;return Rn(t)?t=e.getAttribute(t):Je(t)?t=t.call(this,e):t="",t},enforceFocus:function(){var e=this;this.clearEnforceFocus(),we(document,Nl,this.onFocusin=function(t){var i=e.viewer,r=t.target;if(!(r===document||r===i||i.contains(r))){for(;r;){if(r.getAttribute("tabindex")!==null||r.getAttribute("aria-modal")==="true")return;r=r.parentElement}i.focus()}})},clearEnforceFocus:function(){this.onFocusin&&(qe(document,Nl,this.onFocusin),this.onFocusin=null)},open:function(){var e=this.body;Ae(e,Dl),this.scrollbarWidth>0&&(e.style.paddingRight="".concat(this.scrollbarWidth+(parseFloat(this.initialBodyComputedPaddingRight)||0),"px"))},close:function(){var e=this.body;Ze(e,Dl),this.scrollbarWidth>0&&(e.style.paddingRight=this.initialBodyPaddingRight)},shown:function(){var e=this.element,t=this.options,i=this.viewer;this.fulled=!0,this.isShown=!0,this.render(),this.bind(),this.showing=!1,t.focus&&(i.focus(),this.enforceFocus()),Je(t.shown)&&we(e,Jl,t.shown,{once:!0}),ht(e,Jl,{originalEvent:this.showOriginalEvent||null})!==!1&&(this.showOriginalEvent=null,this.ready&&this.isShown&&!this.hiding&&this.view(this.index))},hidden:function(){var e=this.element,t=this.options,i=this.viewer,r=i.ownerDocument.activeElement;r&&i.contains(r)&&Je(r.blur)&&r.blur(),t.focus&&this.clearEnforceFocus(),this.close(),this.unbind(),Ae(i,Mi),i.removeAttribute("role"),i.removeAttribute("aria-labelledby"),i.removeAttribute("aria-modal"),i.setAttribute("aria-hidden",!0),this.resetList(),this.resetImage(),this.fulled=!1,this.viewed=!1,this.isShown=!1,this.hiding=!1,this.destroyed||(Je(t.hidden)&&we(e,Xl,t.hidden,{once:!0}),ht(e,Xl,{originalEvent:this.hideOriginalEvent||null},{cancelable:!1}),this.hideOriginalEvent=null)},requestFullscreen:function(e){var t=this.ownerDocument;if(this.fulled&&!(t.fullscreenElement||t.webkitFullscreenElement||t.mozFullScreenElement||t.msFullscreenElement)){var i=t.documentElement;i.requestFullscreen?kt(e)?i.requestFullscreen(e):i.requestFullscreen():i.webkitRequestFullscreen?i.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT):i.mozRequestFullScreen?i.mozRequestFullScreen():i.msRequestFullscreen&&i.msRequestFullscreen()}},exitFullscreen:function(){var e=this.ownerDocument;this.fulled&&(e.fullscreenElement||e.webkitFullscreenElement||e.mozFullScreenElement||e.msFullscreenElement)&&(e.exitFullscreen?e.exitFullscreen():e.webkitExitFullscreen?e.webkitExitFullscreen():e.mozCancelFullScreen?e.mozCancelFullScreen():e.msExitFullscreen&&e.msExitFullscreen())},change:function(e){var t=this.options,i=this.pointers,r=i[Object.keys(i)[0]];if(r){var s=r.endX-r.startX,a=r.endY-r.startY;switch(this.action){case Il:(s!==0||a!==0)&&(this.pointerMoved=!0,this.actionEvent=e,this.move(s,a));break;case pa:if(t.zoomable&&t.zoomOnTouch){var o=cc(i);o!==0&&(this.actionEvent=e,this.zoom(o))}break;case Rl:if(t.rotatable&&t.rotateOnTouch){var l=dc(i);l!==0&&(this.actionEvent=e,this.rotate(l))}break;case Yr:if(t.zoomable&&t.zoomOnTouch){var c=cc(i);c!==0&&(this.actionEvent=e,this.zoom(c))}if(t.rotatable&&t.rotateOnTouch){var d=dc(i);d!==0&&(this.actionEvent=e,this.rotate(d))}break;case Xr:{var h=Math.abs(s);h>1&&h>Math.abs(a)&&(this.pointerMoved=!0,this.actionEvent=e,this.move(s,0));break}}$e(i,function(f){f.startX=f.endX,f.startY=f.endY})}},isSwitchable:function(){var e=this.imageData,t=this.viewerData;return this.length>1&&e.x>=0&&e.y>=0&&e.width<=t.width&&e.height<=t.height}},yf=Ui.Viewer,wf=(function(n){return function(){return n+=1,n}})(-1),Sa=(function(){function n(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(Ku(this,n),!e||e.nodeType!==1&&e.nodeType!==11)throw new Error("The first argument is required and must be an element.");this.element=e,this.ownerDocument=e.ownerDocument||e.host.ownerDocument,this.options=Dt({},Fl,kt(t)&&t),this.action=!1,this.actionEvent=null,this.fading=!1,this.fulled=!1,this.hiding=!1,this.imageClicked=!1,this.imageData={},this.index=this.options.initialViewIndex,this.isImg=!1,this.isShown=!1,this.length=0,this.moving=!1,this.played=!1,this.playing=!1,this.pointers={},this.ready=!1,this.rotating=!1,this.scaling=!1,this.showing=!1,this.timeout=!1,this.tooltipping=!1,this.viewed=!1,this.viewing=!1,this.wheeling=!1,this.zoomable=!1,this.zooming=!1,this.pointerMoved=!1,this.id=wf(),this.init()}return ju(n,[{key:"init",value:function(){var t=this,i=this.element,r=this.options;if(!i[Se]){i[Se]=this,r.focus&&!r.keyboard&&(r.focus=!1);var s=i.localName==="img",a=[];if($e(s?[i]:i.querySelectorAll("img"),function(c){Je(r.filter)?r.filter.call(t,c)&&a.push(c):t.getImageURL(c)&&a.push(c)}),this.isImg=s,this.length=a.length,this.images=a,this.initBody(),ui(this.ownerDocument.createElement(Se).style.transition)&&(r.transition=!1),r.inline){var o=0,l=function(){if(o+=1,o===t.length){var d;t.initializing=!1,t.delaying={abort:function(){clearTimeout(d)}},d=setTimeout(function(){t.delaying=!1,t.build()},0)}};this.initializing={abort:function(){$e(a,function(d){d.complete||(qe(d,di,l),qe(d,ln,l))})}},$e(a,function(c){if(c.complete)l();else{var d,h;we(c,di,d=function(){qe(c,ln,h),l()},{once:!0}),we(c,ln,h=function(){qe(c,di,d),l()},{once:!0})}})}else we(i,Ji,this.onElementClick=function(c){var d=c.target;d.localName==="img"&&(!Je(r.filter)||r.filter.call(t,d))&&(t.actionEvent=c,t.view(t.images.indexOf(d)))}),we(i,qr,this.onElementKeyDown=function(c){var d=c.target,h=c.key;d.localName==="img"&&(h==="Enter"||h===" ")&&(c.preventDefault(),(!Je(r.filter)||r.filter.call(t,d))&&(t.actionEvent=c,t.view(t.images.indexOf(d))))})}}},{key:"build",value:function(){var t=this;if(!this.ready){var i=this.element,r=this.options,s=i.parentNode,a=document.createElement("div");a.innerHTML=$u;var o=a.querySelector(".".concat(Se,"-container")),l=o.querySelector(".".concat(Se,"-title")),c=o.querySelector(".".concat(Se,"-toolbar")),d=o.querySelector(".".concat(Se,"-navbar")),h=o.querySelector(".".concat(Se,"-navigation")),f=o.querySelector(".".concat(Se,"-button")),u=o.querySelector(".".concat(Se,"-canvas"));this.parent=s,this.viewer=o,this.title=l,this.toolbar=c,this.navbar=d,this.navigation=h,this.button=f,this.canvas=u,this.magnifier=o.querySelector(".".concat(Se,"-magnifier")),this.magnifierImage=o.querySelector(".".concat(Se,"-magnifier-image")),this.tooltipBox=o.querySelector(".".concat(Se,"-tooltip")),this.player=o.querySelector(".".concat(Se,"-player")),this.list=o.querySelector(".".concat(Se,"-list")),o.id="".concat(Se).concat(this.id),l.id="".concat(Se,"Title").concat(this.id),Ae(l,r.title?Qn(Array.isArray(r.title)?r.title[0]:r.title):Mi),r.title&&l.removeAttribute("aria-hidden");var g=kt(r.navbar)?r.navbar:{},v=r.navbar,m=ui(g.size)?r.navbar:g.size,p=["top","right","bottom","left"].indexOf(g.position)!==-1?g.position:"bottom";kt(r.navbar)&&(v=ui(g.show)?!0:g.show),Ae(d,v?Qn(v):Mi),v&&d.removeAttribute("aria-hidden"),["small","medium","large"].indexOf(m)!==-1&&Ae(d,"".concat(Se,"-").concat(m));var A=p==="left"||p==="right";if(this.isNavbarVertical=A,Ae(d,"".concat(Se,"-navbar-").concat(p)),v){var _=A?h:l,S=A?"navigation":"title";Ae(_,"".concat(Se,"-").concat(S,"-navbar-").concat(p)),A&&Ae(l,"".concat(Se,"-title-navbar-").concat(p)),["small","large"].indexOf(m)!==-1&&(Ae(_,"".concat(Se,"-").concat(S,"-navbar-").concat(A?"".concat(p,"-"):"").concat(m)),A&&Ae(l,"".concat(Se,"-title-navbar-").concat(p,"-").concat(m)))}if(kt(r.navigation)?$e(h.querySelectorAll('[role="button"]'),function(F){var Q=Zi(F,xr),V=r.navigation[Q],O=kt(V),B=O&&!ui(V.show)?V.show:V,R=O&&!ui(V.size)?V.size:V;ti(F,Mi,!B),it(B)&&Ae(F,Qn(B)),["small","large"].indexOf(R)!==-1&&Ae(F,"".concat(Se,"-").concat(R))}):Ae(h,r.navigation?Qn(r.navigation):Mi),r.navigation&&h.removeAttribute("aria-hidden"),ti(f,Mi,!r.button),r.button&&f.removeAttribute("aria-hidden"),r.keyboard&&(f.setAttribute("tabindex",0),$e(h.querySelectorAll('[role="button"]'),function(F){F.setAttribute("tabindex",0)})),r.backdrop&&(Ae(o,"".concat(Se,"-backdrop")),!r.inline&&r.backdrop!=="static"&&Aa(u,xr,"hide")),Rn(r.className)&&r.className&&r.className.split(Er).forEach(function(F){Ae(o,F)}),r.toolbar){var M=document.createElement("ul"),C=kt(r.toolbar),U=C&&["top","right","bottom","left"].indexOf(r.toolbar.position)!==-1?r.toolbar.position:"bottom",T=ts.slice(0,3),y=ts.slice(7,9),b=ts.slice(9);C||Ae(c,Qn(r.toolbar)),c.removeAttribute("aria-hidden"),Ae(c,"".concat(Se,"-toolbar-").concat(U)),Ae(l,"".concat(Se,"-title-toolbar-").concat(U)),v&&U===p&&(Ae(c,"".concat(Se,"-toolbar-navbar-").concat(p)),["small","large"].indexOf(m)!==-1&&Ae(c,"".concat(Se,"-toolbar-navbar-").concat(m))),$e(C?r.toolbar:ts,function(F,Q){if(Q!=="position"){var V=C&&kt(F),O=C?va(Q):F,B=V&&!ui(F.show)?F.show:F;if(!(!B||!r.zoomable&&T.indexOf(O)!==-1||!r.rotatable&&y.indexOf(O)!==-1||!r.scalable&&b.indexOf(O)!==-1)){var R=V&&!ui(F.size)?F.size:F,Z=V&&!ui(F.click)?F.click:F,K=document.createElement("li");r.keyboard&&K.setAttribute("tabindex",0),K.setAttribute("role","button"),Ae(K,"".concat(Se,"-").concat(O)),Je(Z)||Aa(K,xr,O),it(B)&&Ae(K,Qn(B)),["small","large"].indexOf(R)!==-1?Ae(K,"".concat(Se,"-").concat(R)):O==="play"&&Ae(K,"".concat(Se,"-large")),Je(Z)&&we(K,Ji,Z.bind(t)),M.appendChild(K)}}}),c.appendChild(M),(U==="left"||U==="right")&&Ae(h,"".concat(Se,"-navigation-toolbar-").concat(U))}else Ae(c,Mi);if(!r.rotatable){var E=c.querySelectorAll('li[class*="rotate"]');Ae(E,Sr),$e(E,function(F){c.appendChild(F)})}if(r.inline)Ae(f,tf),fi(o,{zIndex:r.zIndexInline}),window.getComputedStyle(s).position==="static"&&fi(s,{position:"relative"}),s.insertBefore(o,i.nextSibling);else{Ae(f,ef),Ae(o,ma),Ae(o,jr),Ae(o,Mi),fi(o,{zIndex:r.zIndex});var D=r.container;Rn(D)&&(D=this.ownerDocument.querySelector(D)),D||(D=this.body),D.appendChild(o)}if(r.inline&&(this.render(),this.bind(),this.isShown=!0),this.ready=!0,Je(r.ready)&&we(i,Gl,r.ready,{once:!0}),ht(i,Gl)===!1){this.ready=!1;return}this.ready&&r.inline&&this.view(this.index)}}}],[{key:"create",value:function(t,i){return new n(t,i)}},{key:"setDefaults",value:function(t){Dt(Fl,kt(t)&&t)}},{key:"noConflict",value:function(){return window.Viewer=yf,n}}])})();Dt(Sa.prototype,_f,Sf,bf,xf,Ef);const Cf='.viewer-zoom-in:before,.viewer-zoom-out:before,.viewer-one-to-one:before,.viewer-reset:before,.viewer-prev:before,.viewer-play:before,.viewer-next:before,.viewer-rotate-left:before,.viewer-rotate-right:before,.viewer-flip-horizontal:before,.viewer-flip-vertical:before,.viewer-fullscreen:before,.viewer-fullscreen-exit:before,.viewer-close:before{background-image:url("data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 viewBox%3D%220 0 560 40%22%3E%3Cpath fill%3D%22%23fff%22 d%3D%22M49.6 17.9h20.2v3.9H49.6zm123.1 2 10.9-11 2.7 2.8-8.2 8.2 8.2 8.2-2.7 2.7-10.9-10.9zm94 0-10.8-11-2.7 2.8 8.1 8.2-8.1 8.2 2.7 2.7 10.8-10.9zM212 9.3l20.1 10.6L212 30.5V9.3zm161.5 4.6-7.2 6 7.2 5.9v-4h12.4v4l7.3-5.9-7.3-6v4h-12.4v-4zm40.2 12.3 5.9 7.2 5.9-7.2h-4V13.6h4l-5.9-7.3-5.9 7.3h4v12.6h-4zm35.9-16.5h6.3v2h-4.3V16h-2V9.7Zm14 0h6.2V16h-2v-4.3h-4.2v-2Zm6.2 14V30h-6.2v-2h4.2v-4.3h2Zm-14 6.3h-6.2v-6.3h2v4.4h4.3v2Zm-438 .1v-8.3H9.6v-3.9h8.2V9.7h3.9v8.2h8.1v3.9h-8.1v8.3h-3.9zM93.6 9.7h-5.8v3.9h2V30h3.8V9.7zm16.1 0h-5.8v3.9h1.9V30h3.9V9.7zm-11.9 4.1h3.9v3.9h-3.9zm0 8.2h3.9v3.9h-3.9zm244.6-11.7 7.2 5.9-7.2 6v-3.6c-5.4-.4-7.8.8-8.7 2.8-.8 1.7-1.8 4.9 2.8 8.2-6.3-2-7.5-6.9-6-11.3 1.6-4.4 8-5 11.9-4.9v-3.1Zm147.2 13.4h6.3V30h-2v-4.3h-4.3v-2zm14 6.3v-6.3h6.2v2h-4.3V30h-1.9zm6.2-14h-6.2V9.7h1.9V14h4.3v2zm-13.9 0h-6.3v-2h4.3V9.7h2V16zm33.3 12.5 8.6-8.6-8.6-8.7 1.9-1.9 8.6 8.7 8.6-8.7 1.9 1.9-8.6 8.7 8.6 8.6-1.9 2-8.6-8.7-8.6 8.7-1.9-2zM297 10.3l-7.1 5.9 7.2 6v-3.6c5.3-.4 7.7.8 8.7 2.8.8 1.7 1.7 4.9-2.9 8.2 6.3-2 7.5-6.9 6-11.3-1.6-4.4-7.9-5-11.8-4.9v-3.1Zm-157.3-.6c2.3 0 4.4.7 6 2l2.5-3 1.9 9.2h-9.3l2.6-3.1a6.2 6.2 0 0 0-9.9 5.1c0 3.4 2.8 6.3 6.2 6.3 2.8 0 5.1-1.9 6-4.4h4c-1 4.7-5 8.3-10 8.3a10 10 0 0 1-10-10.2 10 10 0 0 1 10-10.2Z%22%2F%3E%3C%2Fsvg%3E");background-repeat:no-repeat;background-size:280px;color:transparent;display:block;font-size:0;height:20px;line-height:0;width:20px}.viewer-zoom-in:before{background-position:0 0;content:"Zoom In"}.viewer-zoom-out:before{background-position:-20px 0;content:"Zoom Out"}.viewer-one-to-one:before{background-position:-40px 0;content:"One to One"}.viewer-reset:before{background-position:-60px 0;content:"Reset"}.viewer-prev:before{background-position:-80px 0;content:"Previous"}.viewer-play:before{background-position:-100px 0;content:"Play"}.viewer-next:before{background-position:-120px 0;content:"Next"}.viewer-rotate-left:before{background-position:-140px 0;content:"Rotate Left"}.viewer-rotate-right:before{background-position:-160px 0;content:"Rotate Right"}.viewer-flip-horizontal:before{background-position:-180px 0;content:"Flip Horizontal"}.viewer-flip-vertical:before{background-position:-200px 0;content:"Flip Vertical"}.viewer-fullscreen:before{background-position:-220px 0;content:"Enter Full Screen"}.viewer-fullscreen-exit:before{background-position:-240px 0;content:"Exit Full Screen"}.viewer-close:before{background-position:-260px 0;content:"Close"}.viewer-container{direction:ltr;font-size:0;inset:0;line-height:0;overflow:hidden;position:absolute;-webkit-tap-highlight-color:transparent;-ms-touch-action:none;touch-action:none;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.viewer-container::-moz-selection,.viewer-container *::-moz-selection{background-color:transparent}.viewer-container::selection,.viewer-container *::selection{background-color:transparent}.viewer-container:focus{outline:0}.viewer-container img{display:block;height:auto;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;width:100%}.viewer-canvas{inset:0;overflow:hidden;position:absolute}.viewer-canvas>img{height:auto;margin:15px auto;max-width:90%!important;width:auto}.viewer-magnifier{background-color:#fff;background-repeat:no-repeat;border:2px solid #fff;border-radius:50%;box-shadow:0 1px 5px #00000080;box-sizing:border-box;display:none;left:16px;overflow:hidden;pointer-events:none;position:absolute;top:16px;z-index:2}.viewer-magnifier.viewer-show{display:block}.viewer-magnifier-image{left:0;max-width:none!important;position:absolute;top:0;-ms-transform-origin:center;transform-origin:center}.viewer-navigation{left:0;position:absolute;right:0;top:50%}.viewer-navigation>.viewer-prev,.viewer-navigation>.viewer-next{background-color:#00000080;border-radius:50%;cursor:pointer;height:40px;margin-top:-20px;position:absolute;width:40px}.viewer-navigation>.viewer-prev:focus,.viewer-navigation>.viewer-next:focus,.viewer-navigation>.viewer-prev:hover,.viewer-navigation>.viewer-next:hover{background-color:#000c}.viewer-navigation>.viewer-prev:focus,.viewer-navigation>.viewer-next:focus{box-shadow:0 0 3px #fff;outline:0}.viewer-navigation>.viewer-prev:before,.viewer-navigation>.viewer-next:before{margin:10px}.viewer-navigation>.viewer-prev{left:15px}.viewer-navigation>.viewer-next{right:15px}.viewer-navigation>.viewer-large{height:48px;margin-top:-24px;width:48px}.viewer-navigation>.viewer-large:before{margin:14px}.viewer-navigation>.viewer-small{height:32px;margin-top:-16px;width:32px}.viewer-navigation>.viewer-small:before{margin:6px}.viewer-navigation-toolbar-left>.viewer-prev{left:51px}.viewer-navigation-toolbar-right>.viewer-next{right:51px}.viewer-navigation-navbar-left>.viewer-prev{left:67px}.viewer-navigation-navbar-right>.viewer-next{right:67px}.viewer-navigation-navbar-left-small>.viewer-prev{left:57px}.viewer-navigation-navbar-right-small>.viewer-next{right:57px}.viewer-navigation-navbar-left-large>.viewer-prev{left:77px}.viewer-navigation-navbar-right-large>.viewer-next{right:77px}.viewer-navigation.viewer-navigation-toolbar-left.viewer-navigation-navbar-left>.viewer-prev{left:103px}.viewer-navigation.viewer-navigation-toolbar-left.viewer-navigation-navbar-left.viewer-navigation-navbar-left-small>.viewer-prev{left:93px}.viewer-navigation.viewer-navigation-toolbar-left.viewer-navigation-navbar-left.viewer-navigation-navbar-left-large>.viewer-prev{left:113px}.viewer-navigation.viewer-navigation-toolbar-right.viewer-navigation-navbar-right>.viewer-next{right:103px}.viewer-navigation.viewer-navigation-toolbar-right.viewer-navigation-navbar-right.viewer-navigation-navbar-right-small>.viewer-next{right:93px}.viewer-navigation.viewer-navigation-toolbar-right.viewer-navigation-navbar-right.viewer-navigation-navbar-right-large>.viewer-next{right:113px}.viewer-navbar{background-color:#00000080;bottom:0;left:0;overflow:hidden;position:absolute;right:0}.viewer-navbar.viewer-small>.viewer-list{height:40px}.viewer-navbar.viewer-small>.viewer-list>li{height:40px;width:24px}.viewer-navbar.viewer-large>.viewer-list{height:60px}.viewer-navbar.viewer-large>.viewer-list>li{height:60px;width:36px}.viewer-navbar-top{bottom:auto;top:0}.viewer-navbar-left,.viewer-navbar-right{bottom:0;top:0;width:52px}:is(.viewer-navbar-left,.viewer-navbar-right)>.viewer-list{height:auto;padding:0 1px;width:50px}:is(.viewer-navbar-left,.viewer-navbar-right)>.viewer-list>li{float:none;height:30px;width:50px}:is(.viewer-navbar-left,.viewer-navbar-right)>.viewer-list>li+li{margin-left:0;margin-top:1px}.viewer-navbar-left.viewer-small,.viewer-navbar-right.viewer-small{width:42px}:is(.viewer-navbar-left.viewer-small,.viewer-navbar-right.viewer-small)>.viewer-list{width:40px}:is(.viewer-navbar-left.viewer-small,.viewer-navbar-right.viewer-small)>.viewer-list>li{height:24px;width:40px}.viewer-navbar-left.viewer-large,.viewer-navbar-right.viewer-large{width:62px}:is(.viewer-navbar-left.viewer-large,.viewer-navbar-right.viewer-large)>.viewer-list{width:60px}:is(.viewer-navbar-left.viewer-large,.viewer-navbar-right.viewer-large)>.viewer-list>li{height:36px;width:60px}.viewer-navbar-left{right:auto}.viewer-navbar-right{left:auto}.viewer-list{box-sizing:content-box;height:50px;margin:0;overflow:hidden;padding:1px 0}.viewer-list>li{color:transparent;cursor:pointer;float:left;font-size:0;height:50px;line-height:0;opacity:.5;overflow:hidden;transition:opacity .15s;width:30px}.viewer-list>li:focus,.viewer-list>li:hover{opacity:.75}.viewer-list>li:focus{outline:0}.viewer-list>li+li{margin-left:1px}.viewer-list>.viewer-loading{position:relative}.viewer-list>.viewer-loading:after{border-width:2px;height:20px;margin-left:-10px;margin-top:-10px;width:20px}.viewer-list>.viewer-active,.viewer-list>.viewer-active:focus,.viewer-list>.viewer-active:hover{opacity:1}.viewer-player{background-color:#000;cursor:none;display:none;inset:0;position:absolute;z-index:1}.viewer-player>img{left:0;position:absolute;top:0}.viewer-toolbar{bottom:0;left:0;position:absolute;right:0;text-align:center}.viewer-toolbar.viewer-toolbar-top{bottom:auto;top:0}.viewer-toolbar.viewer-toolbar-navbar-top{top:52px}.viewer-toolbar.viewer-toolbar-navbar-top.viewer-toolbar-navbar-small{top:42px}.viewer-toolbar.viewer-toolbar-navbar-top.viewer-toolbar-navbar-large{top:62px}.viewer-toolbar.viewer-toolbar-navbar-right{right:52px}.viewer-toolbar.viewer-toolbar-navbar-right.viewer-toolbar-navbar-small{right:42px}.viewer-toolbar.viewer-toolbar-navbar-right.viewer-toolbar-navbar-large{right:62px}.viewer-toolbar.viewer-toolbar-navbar-bottom{bottom:52px}.viewer-toolbar.viewer-toolbar-navbar-bottom.viewer-toolbar-navbar-small{bottom:42px}.viewer-toolbar.viewer-toolbar-navbar-bottom.viewer-toolbar-navbar-large{bottom:62px}.viewer-toolbar.viewer-toolbar-navbar-left{left:52px}.viewer-toolbar.viewer-toolbar-navbar-left.viewer-toolbar-navbar-small{left:42px}.viewer-toolbar.viewer-toolbar-navbar-left.viewer-toolbar-navbar-large{left:62px}.viewer-toolbar.viewer-toolbar-left,.viewer-toolbar.viewer-toolbar-right{inset:50% 0 auto auto;-ms-transform:translateY(-50%);transform:translateY(-50%);width:36px}.viewer-toolbar.viewer-toolbar-left>ul,.viewer-toolbar.viewer-toolbar-right>ul{margin:0;padding:3px 6px}.viewer-toolbar.viewer-toolbar-left>ul>li,.viewer-toolbar.viewer-toolbar-right>ul>li{float:none}.viewer-toolbar.viewer-toolbar-left>ul>li+li,.viewer-toolbar.viewer-toolbar-right>ul>li+li{margin-left:0;margin-top:1px!important}.viewer-toolbar.viewer-toolbar-left>ul>.viewer-small,.viewer-toolbar.viewer-toolbar-right>ul>.viewer-small{margin:0 3px}.viewer-toolbar.viewer-toolbar-left>ul>.viewer-large,.viewer-toolbar.viewer-toolbar-right>ul>.viewer-large{margin:0 -3px}.viewer-toolbar.viewer-toolbar-left{left:0;right:auto}.viewer-toolbar>ul{display:inline-block;margin:0 auto 5px;overflow:hidden;padding:6px 3px}.viewer-toolbar>ul>li{background-color:#00000080;border-radius:50%;cursor:pointer;float:left;height:24px;overflow:hidden;transition:background-color .15s;width:24px}.viewer-toolbar>ul>li:focus,.viewer-toolbar>ul>li:hover{background-color:#000c}.viewer-toolbar>ul>li:focus{box-shadow:0 0 3px #fff;outline:0;position:relative;z-index:1}.viewer-toolbar>ul>li:before{margin:2px}.viewer-toolbar>ul>li+li{margin-left:1px}.viewer-toolbar>ul>.viewer-small{height:18px;margin-bottom:3px;margin-top:3px;width:18px}.viewer-toolbar>ul>.viewer-small:before{margin:-1px}.viewer-toolbar>ul>.viewer-large{height:30px;margin-bottom:-3px;margin-top:-3px;width:30px}.viewer-toolbar>ul>.viewer-large:before{margin:5px}.viewer-tooltip{background-color:#000c;border-radius:10px;color:#fff;display:none;font-size:12px;height:20px;left:50%;line-height:20px;margin-left:-25px;margin-top:-10px;position:absolute;text-align:center;top:50%;width:50px}.viewer-title{bottom:0;color:#ccc;display:inline-block;font-size:12px;left:50%;line-height:1.2;max-width:90%;min-height:14px;opacity:.8;overflow:hidden;padding:5px;position:absolute;text-overflow:ellipsis;-ms-transform:translateX(-50%);transform:translate(-50%);transition:opacity .15s;white-space:nowrap}.viewer-title.viewer-title-navbar-bottom{bottom:52px}.viewer-title.viewer-title-navbar-bottom.viewer-title-navbar-small{bottom:42px}.viewer-title.viewer-title-navbar-bottom.viewer-title-navbar-large{bottom:62px}.viewer-title.viewer-title-toolbar-bottom{bottom:42px}.viewer-title.viewer-title-toolbar-bottom.viewer-title-navbar-bottom{bottom:94px}.viewer-title.viewer-title-toolbar-bottom.viewer-title-navbar-bottom.viewer-title-navbar-small{bottom:84px}.viewer-title.viewer-title-toolbar-bottom.viewer-title-navbar-bottom.viewer-title-navbar-large{bottom:104px}.viewer-title.viewer-title-toolbar-left,.viewer-title.viewer-title-toolbar-right,.viewer-title.viewer-title-navbar-left,.viewer-title.viewer-title-navbar-right{max-width:none;text-align:center;-ms-transform:none;transform:none}.viewer-title.viewer-title-toolbar-left{left:36px;right:0}.viewer-title.viewer-title-toolbar-right{left:0;right:36px}.viewer-title.viewer-title-navbar-left{left:52px;right:0}.viewer-title.viewer-title-navbar-left.viewer-title-navbar-left-small{left:42px}.viewer-title.viewer-title-navbar-left.viewer-title-navbar-left-large{left:62px}.viewer-title.viewer-title-navbar-right{left:0;right:52px}.viewer-title.viewer-title-navbar-right.viewer-title-navbar-right-small{right:42px}.viewer-title.viewer-title-navbar-right.viewer-title-navbar-right-large{right:62px}.viewer-title.viewer-title-toolbar-left.viewer-title-navbar-right{left:36px}.viewer-title.viewer-title-toolbar-right.viewer-title-navbar-left{right:36px}.viewer-title.viewer-title-toolbar-left.viewer-title-navbar-left{left:88px}.viewer-title.viewer-title-toolbar-left.viewer-title-navbar-left.viewer-title-navbar-left-small{left:78px}.viewer-title.viewer-title-toolbar-left.viewer-title-navbar-left.viewer-title-navbar-left-large{left:98px}.viewer-title.viewer-title-toolbar-right.viewer-title-navbar-right{right:88px}.viewer-title.viewer-title-toolbar-right.viewer-title-navbar-right.viewer-title-navbar-right-small{right:78px}.viewer-title.viewer-title-toolbar-right.viewer-title-navbar-right.viewer-title-navbar-right-large{right:98px}.viewer-title:hover{opacity:1}.viewer-button{-webkit-app-region:no-drag;background-color:#00000080;border-radius:50%;cursor:pointer;height:80px;overflow:hidden;position:absolute;right:-40px;top:-40px;transition:background-color .15s;width:80px}.viewer-button:focus,.viewer-button:hover{background-color:#000c}.viewer-button:focus{box-shadow:0 0 3px #fff;outline:0}.viewer-button:before{bottom:15px;left:15px;position:absolute}.viewer-fixed{position:fixed}.viewer-open{overflow:hidden}.viewer-show{display:block}.viewer-hide{display:none}.viewer-backdrop{background-color:#00000080}.viewer-invisible{visibility:hidden}.viewer-move{cursor:move;cursor:grab}.viewer-fade{opacity:0}.viewer-in{opacity:1}.viewer-transition{transition:all .3s}@keyframes viewer-spinner{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.viewer-loading:after{animation:viewer-spinner 1s linear infinite;border:4px solid rgba(255,255,255,.1);border-left-color:#ffffff80;border-radius:50%;content:"";display:inline-block;height:40px;left:50%;margin-left:-20px;margin-top:-20px;position:absolute;top:50%;width:40px;z-index:1}@media(max-width:767px){.viewer-hide-xs-down{display:none}}@media(max-width:991px){.viewer-hide-sm-down{display:none}}@media(max-width:1199px){.viewer-hide-md-down{display:none}}';class hc extends on{viewer;container;imageUrl="";doOpen(e){this.imageUrl=e,setTimeout(()=>{if(this.container=this.query("#imageContainer")??void 0,!this.container)return;const t=document.createElement("img");t.src=this.imageUrl,t.style.display="none",this.container.appendChild(t),this.viewer=new Sa(t,{inline:!0,container:this.container,toolbar:{zoomIn:!0,zoomOut:!0,oneToOne:!0,reset:!0,prev:!1,play:!1,next:!1,rotateLeft:!0,rotateRight:!0,flipHorizontal:!0,flipVertical:!0},navbar:!1,title:!1,keyboard:!0,backdrop:!1,button:!1,movable:!0,zoomable:!0,rotatable:!0,scalable:!0,transition:!0,fullscreen:!1,ready:()=>{this.addNavigationListeners()}})},0)}doClose(){this.viewer&&(this.viewer.destroy(),this.viewer=void 0),this.imageUrl=""}getViewerContent(){return`
      <div id="imageContainer">
        ${this.isLoading?'<div class="loading">Loading...</div>':""}
      </div>
    `}getCustomStyles(){return this.css`
      ${Cf}
      
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
    `}onAfterRender(){if(!this.isShow||!this.imageUrl||this.viewer||(this.container=this.query("#imageContainer"),!this.container))return;const e=document.createElement("img");e.src=this.imageUrl,e.style.display="none",this.container.appendChild(e),this.viewer=new Sa(e,{inline:!0,container:this.container,toolbar:{zoomIn:!0,zoomOut:!0,oneToOne:!0,reset:!0,prev:!1,play:!1,next:!1,rotateLeft:!0,rotateRight:!0,flipHorizontal:!0,flipVertical:!0},navbar:!1,title:!1,keyboard:!0,backdrop:!1,button:!1,movable:!0,zoomable:!0,rotatable:!0,scalable:!0,transition:!0,fullscreen:!1,ready:()=>{this.isLoading=!1}})}}customElements.get("cc-viewer-image")||customElements.define("cc-viewer-image",hc);class yr extends on{imgUrl="";static AFRAME_SRI="sha384-rrkicQnp5c3ysj7SGZ2b/wF2W7mu6NQQMy4w63/dfRnMLkCL1d0IX4i3IOkYi2pj";static get observedAttributes(){return["show"]}attributeChangedCallback(e,t,i){e==="show"&&(this.isShow=i==="true"),super.attributeChangedCallback(e,t,i)}doOpen(e){this.imgUrl=e}doClose(){const e=this.query(".iframe");e&&(e.srcdoc=""),this.onIframeReady&&(window.removeEventListener("message",this.onIframeReady),this.onIframeReady=void 0),this.imgUrl=""}getViewerContent(){return'<iframe class="iframe"></iframe>'}getCustomStyles(){return`
      .iframe {
        width: 100%;
        height: 100%;
        border: 0;
      }
    `}static IFRAME_HTML=`
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
              <script src="https://aframe.io/releases/1.4.0/aframe.min.js" integrity="${yr.AFRAME_SRI}" crossorigin="anonymous"><\/script>
            </head>
            <body>
              <a-scene embedded xr-mode-ui="enabled: false; XRMode: false;">
                <a-sky rotation="0 -90 0"></a-sky>
                <a-entity camera look-controls="reverseMouseDrag: true"></a-entity>
              </a-scene>
              <script>
                // m1-t9: 画像 URL は親から postMessage で受け取り setAttribute で入れる。
                // srcdoc に埋めると属性ブレイクアウトが成立するため（SRH-1）。
                window.addEventListener('message', function (e) {
                  // m1-t9-hotfix-1: 正当な送り手は親フレームだけである。
                  // origin ではなく source で照合する — 将来 sandbox を付けると
                  // opaque origin になり e.origin が "null" になるため（m1-t9 D4 の実測）。
                  // source 照合なら sandbox の有無によらず成立する。
                  if (e.source !== parent) return;
                  var d = e.data;
                  if (!d || d.type !== 'cc-panorama-src' || typeof d.src !== 'string') return;
                  var sky = document.querySelector('a-sky');
                  if (sky) sky.setAttribute('src', d.src);
                });
                parent.postMessage({ type: 'cc-panorama-ready' }, '*');
              <\/script>
            </body>
          </html>
        `;onIframeReady;onAfterRender(){if(this.imgUrl&&this.isShow){const e=this.query(".iframe");e&&(this.onIframeReady&&window.removeEventListener("message",this.onIframeReady),this.onIframeReady=t=>{!t.data||t.data.type!=="cc-panorama-ready"||t.source===e.contentWindow&&e.contentWindow?.postMessage({type:"cc-panorama-src",src:this.imgUrl},"*")},window.addEventListener("message",this.onIframeReady),e.srcdoc=yr.IFRAME_HTML)}}}customElements.get("cc-viewer-panorama")||customElements.define("cc-viewer-panorama",yr);const Uf=new Set(["youtube.com","www.youtube.com","m.youtube.com"]),Mf=new Set(["youtube-nocookie.com","www.youtube-nocookie.com"]),Tf="youtu.be",Ff=/^[A-Za-z0-9_-]+$/;function If(n){const e=n.hostname,t=n.pathname.split("/").filter(s=>s!=="");let i=null,r=!1;return e===Tf?i=t[0]??null:Uf.has(e)?n.pathname==="/watch"?i=n.searchParams.get("v"):["embed","shorts","live"].includes(t[0])&&(i=t[1]??null):Mf.has(e)&&t[0]==="embed"&&(i=t[1]??null,r=!0),i===null||!Ff.test(i)?null:{id:i,nocookie:r}}function Rf(n){let e;try{e=new URL(n)}catch{return null}if(e.protocol==="http:"||e.protocol==="https:"){const t=If(e);if(t)return t.nocookie?`https://www.youtube-nocookie.com/embed/${t.id}`:`https://www.youtube.com/embed/${t.id}`}return e.protocol==="https:"?e.href:null}class uc extends on{videoUrl="";static get observedAttributes(){return["show"]}attributeChangedCallback(e,t,i){e==="show"&&(this.isShow=i==="true"),super.attributeChangedCallback(e,t,i)}doOpen(e){this.videoUrl=Rf(e)??""}doClose(){const e=this.query(".iframe");e&&(e.src=""),this.videoUrl=""}getViewerContent(){return'<iframe class="iframe" allowfullscreen></iframe>'}applyExternalValues(){const e=this.query(".iframe");e&&(this.videoUrl?e.setAttribute("src",this.videoUrl):e.removeAttribute("src"))}getCustomStyles(){return`
      .iframe {
        position: relative;
        width: 100%;
        height: 100%;
        border: 0;
      }
    `}}customElements.get("cc-viewer-youtube")||customElements.define("cc-viewer-youtube",uc);class fc extends on{videoUrl="";fitToContainer=!1;static get observedAttributes(){return["show","fit-to-container"]}attributeChangedCallback(e,t,i){e==="show"?this.isShow=i==="true":e==="fit-to-container"&&(this.fitToContainer=i==="true"),super.attributeChangedCallback(e,t,i)}doOpen(e){this.videoUrl=e}doClose(){const e=this.query("video");e&&"pause"in e&&e.pause(),this.videoUrl=""}getViewerContent(){return`
      <div class="video-container">
        ${this.videoUrl?`
          <video
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
    `}onAfterRender(){const e=this.query("video");e&&e.addEventListener("error",t=>this.handleVideoError(t))}applyExternalValues(){const e=this.query("video");e&&e.setAttribute("src",this.videoUrl)}handleVideoError(e){const t=this.query(".video-container");if(t){t.textContent="";const i=document.createElement("div");i.className="video-error",i.textContent=`Failed to load video: ${this.videoUrl}`,t.appendChild(i)}}}customElements.get("cc-viewer-video")||customElements.define("cc-viewer-video",fc);const ba="171",Nn={ROTATE:0,DOLLY:1,PAN:2},Ln={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Bf=0,pc=1,Df=2,mc=1,Qf=2,Ti=3,Fi=0,Ot=1,Ii=2,Xi=0,Pn=1,gc=2,vc=3,Ac=4,Nf=5,cn=100,Lf=101,Pf=102,Vf=103,kf=104,Of=200,zf=201,Wf=202,Gf=203,xa=204,Ea=205,Hf=206,Jf=207,Zf=208,Xf=209,Yf=210,Kf=211,jf=212,qf=213,$f=214,ya=0,wa=1,Ca=2,Vn=3,Ua=4,Ma=5,Ta=6,Fa=7,Ia=0,ep=1,tp=2,Yi=0,ip=1,np=2,rp=3,sp=4,ap=5,op=6,lp=7,_c=300,kn=301,On=302,Ra=303,Ba=304,ss=306,as=1e3,dn=1001,Da=1002,pi=1003,cp=1004,os=1005,Ei=1006,Qa=1007,hn=1008,Ri=1009,Sc=1010,bc=1011,wr=1012,Na=1013,un=1014,Bi=1015,Cr=1016,La=1017,Pa=1018,zn=1020,xc=35902,Ec=1021,yc=1022,mi=1023,wc=1024,Cc=1025,Wn=1026,Gn=1027,Uc=1028,Va=1029,Mc=1030,ka=1031,Oa=1033,ls=33776,cs=33777,ds=33778,hs=33779,za=35840,Wa=35841,Ga=35842,Ha=35843,Ja=36196,Za=37492,Xa=37496,Ya=37808,Ka=37809,ja=37810,qa=37811,$a=37812,eo=37813,to=37814,io=37815,no=37816,ro=37817,so=37818,ao=37819,oo=37820,lo=37821,us=36492,co=36494,ho=36495,Tc=36283,uo=36284,fo=36285,po=36286,dp=3200,hp=3201,Fc=0,up=1,Ki="",Mt="srgb",Hn="srgb-linear",fs="linear",rt="srgb",Jn=7680,Ic=519,fp=512,pp=513,mp=514,Rc=515,gp=516,vp=517,Ap=518,_p=519,Bc=35044,Dc="300 es",Di=2e3,ps=2001;class fn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Ft=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ms=Math.PI/180,mo=180/Math.PI;function Ur(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ft[n&255]+Ft[n>>8&255]+Ft[n>>16&255]+Ft[n>>24&255]+"-"+Ft[e&255]+Ft[e>>8&255]+"-"+Ft[e>>16&15|64]+Ft[e>>24&255]+"-"+Ft[t&63|128]+Ft[t>>8&255]+"-"+Ft[t>>16&255]+Ft[t>>24&255]+Ft[i&255]+Ft[i>>8&255]+Ft[i>>16&255]+Ft[i>>24&255]).toLowerCase()}function Oe(n,e,t){return Math.max(e,Math.min(t,n))}function Sp(n,e){return(n%e+e)%e}function go(n,e,t){return(1-t)*n+t*e}function Mr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function zt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const bp={DEG2RAD:ms};class Qe{constructor(e=0,t=0){Qe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Oe(this.x,e.x,t.x),this.y=Oe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Oe(this.x,e,t),this.y=Oe(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Oe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Oe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ne{constructor(e,t,i,r,s,a,o,l,c){Ne.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){const d=this.elements;return d[0]=e,d[1]=r,d[2]=o,d[3]=t,d[4]=s,d[5]=l,d[6]=i,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],d=i[4],h=i[7],f=i[2],u=i[5],g=i[8],v=r[0],m=r[3],p=r[6],A=r[1],_=r[4],S=r[7],M=r[2],C=r[5],U=r[8];return s[0]=a*v+o*A+l*M,s[3]=a*m+o*_+l*C,s[6]=a*p+o*S+l*U,s[1]=c*v+d*A+h*M,s[4]=c*m+d*_+h*C,s[7]=c*p+d*S+h*U,s[2]=f*v+u*A+g*M,s[5]=f*m+u*_+g*C,s[8]=f*p+u*S+g*U,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*a*d-t*o*c-i*s*d+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],h=d*a-o*c,f=o*l-d*s,u=c*s-a*l,g=t*h+i*f+r*u;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=h*v,e[1]=(r*c-d*i)*v,e[2]=(o*i-r*a)*v,e[3]=f*v,e[4]=(d*t-r*l)*v,e[5]=(r*s-o*t)*v,e[6]=u*v,e[7]=(i*l-c*t)*v,e[8]=(a*t-i*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(vo.makeScale(e,t)),this}rotate(e){return this.premultiply(vo.makeRotation(-e)),this}translate(e,t){return this.premultiply(vo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const vo=new Ne;function Qc(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Tr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function xp(){const n=Tr("canvas");return n.style.display="block",n}const Nc={};function Zn(n){n in Nc||(Nc[n]=!0,console.warn(n))}function Ep(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}function yp(n){const e=n.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function wp(n){const e=n.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Lc=new Ne().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Pc=new Ne().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Cp(){const n={enabled:!0,workingColorSpace:Hn,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===rt&&(r.r=Qi(r.r),r.g=Qi(r.g),r.b=Qi(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===rt&&(r.r=Xn(r.r),r.g=Xn(r.g),r.b=Xn(r.b))),r},fromWorkingColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},toWorkingColorSpace:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Ki?fs:this.spaces[r].transfer},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Hn]:{primaries:e,whitePoint:i,transfer:fs,toXYZ:Lc,fromXYZ:Pc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Mt},outputColorSpaceConfig:{drawingBufferColorSpace:Mt}},[Mt]:{primaries:e,whitePoint:i,transfer:rt,toXYZ:Lc,fromXYZ:Pc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Mt}}}),n}const ze=Cp();function Qi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Xn(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Yn;class Up{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Yn===void 0&&(Yn=Tr("canvas")),Yn.width=e.width,Yn.height=e.height;const i=Yn.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Yn}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Tr("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Qi(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Qi(t[i]/255)*255):t[i]=Qi(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Mp=0;class Vc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Mp++}),this.uuid=Ur(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Ao(r[a].image)):s.push(Ao(r[a]))}else s=Ao(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function Ao(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Up.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Tp=0;class Qt extends fn{constructor(e=Qt.DEFAULT_IMAGE,t=Qt.DEFAULT_MAPPING,i=dn,r=dn,s=Ei,a=hn,o=mi,l=Ri,c=Qt.DEFAULT_ANISOTROPY,d=Ki){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Tp++}),this.uuid=Ur(),this.name="",this.source=new Vc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Qe(0,0),this.repeat=new Qe(1,1),this.center=new Qe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ne,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==_c)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case as:e.x=e.x-Math.floor(e.x);break;case dn:e.x=e.x<0?0:1;break;case Da:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case as:e.y=e.y-Math.floor(e.y);break;case dn:e.y=e.y<0?0:1;break;case Da:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Qt.DEFAULT_IMAGE=null,Qt.DEFAULT_MAPPING=_c,Qt.DEFAULT_ANISOTROPY=1;class ft{constructor(e=0,t=0,i=0,r=1){ft.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],d=l[4],h=l[8],f=l[1],u=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(d-f)<.01&&Math.abs(h-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+f)<.1&&Math.abs(h+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+u+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const _=(c+1)/2,S=(u+1)/2,M=(p+1)/2,C=(d+f)/4,U=(h+v)/4,T=(g+m)/4;return _>S&&_>M?_<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(_),r=C/i,s=U/i):S>M?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=C/r,s=T/r):M<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(M),i=U/s,r=T/s),this.set(i,r,s,t),this}let A=Math.sqrt((m-g)*(m-g)+(h-v)*(h-v)+(f-d)*(f-d));return Math.abs(A)<.001&&(A=1),this.x=(m-g)/A,this.y=(h-v)/A,this.z=(f-d)/A,this.w=Math.acos((c+u+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Oe(this.x,e.x,t.x),this.y=Oe(this.y,e.y,t.y),this.z=Oe(this.z,e.z,t.z),this.w=Oe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Oe(this.x,e,t),this.y=Oe(this.y,e,t),this.z=Oe(this.z,e,t),this.w=Oe(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Oe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Fp extends fn{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new ft(0,0,e,t),this.scissorTest=!1,this.viewport=new ft(0,0,e,t);const r={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ei,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new Qt(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Vc(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class pn extends Fp{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class kc extends Qt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=pi,this.minFilter=pi,this.wrapR=dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ip extends Qt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=pi,this.minFilter=pi,this.wrapR=dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class mn{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],d=i[r+2],h=i[r+3];const f=s[a+0],u=s[a+1],g=s[a+2],v=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=d,e[t+3]=h;return}if(o===1){e[t+0]=f,e[t+1]=u,e[t+2]=g,e[t+3]=v;return}if(h!==v||l!==f||c!==u||d!==g){let m=1-o;const p=l*f+c*u+d*g+h*v,A=p>=0?1:-1,_=1-p*p;if(_>Number.EPSILON){const M=Math.sqrt(_),C=Math.atan2(M,p*A);m=Math.sin(m*C)/M,o=Math.sin(o*C)/M}const S=o*A;if(l=l*m+f*S,c=c*m+u*S,d=d*m+g*S,h=h*m+v*S,m===1-o){const M=1/Math.sqrt(l*l+c*c+d*d+h*h);l*=M,c*=M,d*=M,h*=M}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],d=i[r+3],h=s[a],f=s[a+1],u=s[a+2],g=s[a+3];return e[t]=o*g+d*h+l*u-c*f,e[t+1]=l*g+d*f+c*h-o*u,e[t+2]=c*g+d*u+o*f-l*h,e[t+3]=d*g-o*h-l*f-c*u,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),d=o(r/2),h=o(s/2),f=l(i/2),u=l(r/2),g=l(s/2);switch(a){case"XYZ":this._x=f*d*h+c*u*g,this._y=c*u*h-f*d*g,this._z=c*d*g+f*u*h,this._w=c*d*h-f*u*g;break;case"YXZ":this._x=f*d*h+c*u*g,this._y=c*u*h-f*d*g,this._z=c*d*g-f*u*h,this._w=c*d*h+f*u*g;break;case"ZXY":this._x=f*d*h-c*u*g,this._y=c*u*h+f*d*g,this._z=c*d*g+f*u*h,this._w=c*d*h-f*u*g;break;case"ZYX":this._x=f*d*h-c*u*g,this._y=c*u*h+f*d*g,this._z=c*d*g-f*u*h,this._w=c*d*h+f*u*g;break;case"YZX":this._x=f*d*h+c*u*g,this._y=c*u*h+f*d*g,this._z=c*d*g-f*u*h,this._w=c*d*h-f*u*g;break;case"XZY":this._x=f*d*h-c*u*g,this._y=c*u*h-f*d*g,this._z=c*d*g+f*u*h,this._w=c*d*h+f*u*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],d=t[6],h=t[10],f=i+o+h;if(f>0){const u=.5/Math.sqrt(f+1);this._w=.25/u,this._x=(d-l)*u,this._y=(s-c)*u,this._z=(a-r)*u}else if(i>o&&i>h){const u=2*Math.sqrt(1+i-o-h);this._w=(d-l)/u,this._x=.25*u,this._y=(r+a)/u,this._z=(s+c)/u}else if(o>h){const u=2*Math.sqrt(1+o-i-h);this._w=(s-c)/u,this._x=(r+a)/u,this._y=.25*u,this._z=(l+d)/u}else{const u=2*Math.sqrt(1+h-i-o);this._w=(a-r)/u,this._x=(s+c)/u,this._y=(l+d)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Oe(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=i*d+a*o+r*c-s*l,this._y=r*d+a*l+s*o-i*c,this._z=s*d+a*c+i*l-r*o,this._w=a*d-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+i*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const u=1-t;return this._w=u*a+t*this._w,this._x=u*i+t*this._x,this._y=u*r+t*this._y,this._z=u*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,o),h=Math.sin((1-t)*d)/c,f=Math.sin(t*d)/c;return this._w=a*h+this._w*f,this._x=i*h+this._x*f,this._y=r*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class W{constructor(e=0,t=0,i=0){W.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Oc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Oc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),d=2*(o*t-s*r),h=2*(s*i-a*t);return this.x=t+l*c+a*h-o*d,this.y=i+l*d+o*c-s*h,this.z=r+l*h+s*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Oe(this.x,e.x,t.x),this.y=Oe(this.y,e.y,t.y),this.z=Oe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Oe(this.x,e,t),this.y=Oe(this.y,e,t),this.z=Oe(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Oe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return _o.copy(this).projectOnVector(e),this.sub(_o)}reflect(e){return this.sub(_o.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Oe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const _o=new W,Oc=new mn;class Kn{constructor(e=new W(1/0,1/0,1/0),t=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(gi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(gi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=gi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,gi):gi.fromBufferAttribute(s,a),gi.applyMatrix4(e.matrixWorld),this.expandByPoint(gi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),gs.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),gs.copy(i.boundingBox)),gs.applyMatrix4(e.matrixWorld),this.union(gs)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,gi),gi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Fr),vs.subVectors(this.max,Fr),jn.subVectors(e.a,Fr),qn.subVectors(e.b,Fr),$n.subVectors(e.c,Fr),ji.subVectors(qn,jn),qi.subVectors($n,qn),gn.subVectors(jn,$n);let t=[0,-ji.z,ji.y,0,-qi.z,qi.y,0,-gn.z,gn.y,ji.z,0,-ji.x,qi.z,0,-qi.x,gn.z,0,-gn.x,-ji.y,ji.x,0,-qi.y,qi.x,0,-gn.y,gn.x,0];return!So(t,jn,qn,$n,vs)||(t=[1,0,0,0,1,0,0,0,1],!So(t,jn,qn,$n,vs))?!1:(As.crossVectors(ji,qi),t=[As.x,As.y,As.z],So(t,jn,qn,$n,vs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,gi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(gi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ni[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ni[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ni[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ni[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ni[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ni[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ni[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ni[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ni),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Ni=[new W,new W,new W,new W,new W,new W,new W,new W],gi=new W,gs=new Kn,jn=new W,qn=new W,$n=new W,ji=new W,qi=new W,gn=new W,Fr=new W,vs=new W,As=new W,vn=new W;function So(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){vn.fromArray(n,s);const o=r.x*Math.abs(vn.x)+r.y*Math.abs(vn.y)+r.z*Math.abs(vn.z),l=e.dot(vn),c=t.dot(vn),d=i.dot(vn);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const Rp=new Kn,Ir=new W,bo=new W;class Rr{constructor(e=new W,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Rp.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ir.subVectors(e,this.center);const t=Ir.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Ir,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(bo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ir.copy(e.center).add(bo)),this.expandByPoint(Ir.copy(e.center).sub(bo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Li=new W,xo=new W,_s=new W,$i=new W,Eo=new W,Ss=new W,yo=new W;class bs{constructor(e=new W,t=new W(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Li)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Li.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Li.copy(this.origin).addScaledVector(this.direction,t),Li.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){xo.copy(e).add(t).multiplyScalar(.5),_s.copy(t).sub(e).normalize(),$i.copy(this.origin).sub(xo);const s=e.distanceTo(t)*.5,a=-this.direction.dot(_s),o=$i.dot(this.direction),l=-$i.dot(_s),c=$i.lengthSq(),d=Math.abs(1-a*a);let h,f,u,g;if(d>0)if(h=a*l-o,f=a*o-l,g=s*d,h>=0)if(f>=-g)if(f<=g){const v=1/d;h*=v,f*=v,u=h*(h+a*f+2*o)+f*(a*h+f+2*l)+c}else f=s,h=Math.max(0,-(a*f+o)),u=-h*h+f*(f+2*l)+c;else f=-s,h=Math.max(0,-(a*f+o)),u=-h*h+f*(f+2*l)+c;else f<=-g?(h=Math.max(0,-(-a*s+o)),f=h>0?-s:Math.min(Math.max(-s,-l),s),u=-h*h+f*(f+2*l)+c):f<=g?(h=0,f=Math.min(Math.max(-s,-l),s),u=f*(f+2*l)+c):(h=Math.max(0,-(a*s+o)),f=h>0?s:Math.min(Math.max(-s,-l),s),u=-h*h+f*(f+2*l)+c);else f=a>0?-s:s,h=Math.max(0,-(a*f+o)),u=-h*h+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(xo).addScaledVector(_s,f),u}intersectSphere(e,t){Li.subVectors(e.center,this.origin);const i=Li.dot(this.direction),r=Li.dot(Li)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l;const c=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),d>=0?(s=(e.min.y-f.y)*d,a=(e.max.y-f.y)*d):(s=(e.max.y-f.y)*d,a=(e.min.y-f.y)*d),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(o=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Li)!==null}intersectTriangle(e,t,i,r,s){Eo.subVectors(t,e),Ss.subVectors(i,e),yo.crossVectors(Eo,Ss);let a=this.direction.dot(yo),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;$i.subVectors(this.origin,e);const l=o*this.direction.dot(Ss.crossVectors($i,Ss));if(l<0)return null;const c=o*this.direction.dot(Eo.cross($i));if(c<0||l+c>a)return null;const d=-o*$i.dot(yo);return d<0?null:this.at(d/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ct{constructor(e,t,i,r,s,a,o,l,c,d,h,f,u,g,v,m){ct.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,d,h,f,u,g,v,m)}set(e,t,i,r,s,a,o,l,c,d,h,f,u,g,v,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=s,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=d,p[10]=h,p[14]=f,p[3]=u,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ct().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/er.setFromMatrixColumn(e,0).length(),s=1/er.setFromMatrixColumn(e,1).length(),a=1/er.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),d=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const f=a*d,u=a*h,g=o*d,v=o*h;t[0]=l*d,t[4]=-l*h,t[8]=c,t[1]=u+g*c,t[5]=f-v*c,t[9]=-o*l,t[2]=v-f*c,t[6]=g+u*c,t[10]=a*l}else if(e.order==="YXZ"){const f=l*d,u=l*h,g=c*d,v=c*h;t[0]=f+v*o,t[4]=g*o-u,t[8]=a*c,t[1]=a*h,t[5]=a*d,t[9]=-o,t[2]=u*o-g,t[6]=v+f*o,t[10]=a*l}else if(e.order==="ZXY"){const f=l*d,u=l*h,g=c*d,v=c*h;t[0]=f-v*o,t[4]=-a*h,t[8]=g+u*o,t[1]=u+g*o,t[5]=a*d,t[9]=v-f*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const f=a*d,u=a*h,g=o*d,v=o*h;t[0]=l*d,t[4]=g*c-u,t[8]=f*c+v,t[1]=l*h,t[5]=v*c+f,t[9]=u*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const f=a*l,u=a*c,g=o*l,v=o*c;t[0]=l*d,t[4]=v-f*h,t[8]=g*h+u,t[1]=h,t[5]=a*d,t[9]=-o*d,t[2]=-c*d,t[6]=u*h+g,t[10]=f-v*h}else if(e.order==="XZY"){const f=a*l,u=a*c,g=o*l,v=o*c;t[0]=l*d,t[4]=-h,t[8]=c*d,t[1]=f*h+v,t[5]=a*d,t[9]=u*h-g,t[2]=g*h-u,t[6]=o*d,t[10]=v*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Bp,e,Dp)}lookAt(e,t,i){const r=this.elements;return Kt.subVectors(e,t),Kt.lengthSq()===0&&(Kt.z=1),Kt.normalize(),en.crossVectors(i,Kt),en.lengthSq()===0&&(Math.abs(i.z)===1?Kt.x+=1e-4:Kt.z+=1e-4,Kt.normalize(),en.crossVectors(i,Kt)),en.normalize(),xs.crossVectors(Kt,en),r[0]=en.x,r[4]=xs.x,r[8]=Kt.x,r[1]=en.y,r[5]=xs.y,r[9]=Kt.y,r[2]=en.z,r[6]=xs.z,r[10]=Kt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],d=i[1],h=i[5],f=i[9],u=i[13],g=i[2],v=i[6],m=i[10],p=i[14],A=i[3],_=i[7],S=i[11],M=i[15],C=r[0],U=r[4],T=r[8],y=r[12],b=r[1],E=r[5],D=r[9],F=r[13],Q=r[2],V=r[6],O=r[10],B=r[14],R=r[3],Z=r[7],K=r[11],ae=r[15];return s[0]=a*C+o*b+l*Q+c*R,s[4]=a*U+o*E+l*V+c*Z,s[8]=a*T+o*D+l*O+c*K,s[12]=a*y+o*F+l*B+c*ae,s[1]=d*C+h*b+f*Q+u*R,s[5]=d*U+h*E+f*V+u*Z,s[9]=d*T+h*D+f*O+u*K,s[13]=d*y+h*F+f*B+u*ae,s[2]=g*C+v*b+m*Q+p*R,s[6]=g*U+v*E+m*V+p*Z,s[10]=g*T+v*D+m*O+p*K,s[14]=g*y+v*F+m*B+p*ae,s[3]=A*C+_*b+S*Q+M*R,s[7]=A*U+_*E+S*V+M*Z,s[11]=A*T+_*D+S*O+M*K,s[15]=A*y+_*F+S*B+M*ae,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],d=e[2],h=e[6],f=e[10],u=e[14],g=e[3],v=e[7],m=e[11],p=e[15];return g*(+s*l*h-r*c*h-s*o*f+i*c*f+r*o*u-i*l*u)+v*(+t*l*u-t*c*f+s*a*f-r*a*u+r*c*d-s*l*d)+m*(+t*c*h-t*o*u-s*a*h+i*a*u+s*o*d-i*c*d)+p*(-r*o*d-t*l*h+t*o*f+r*a*h-i*a*f+i*l*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],h=e[9],f=e[10],u=e[11],g=e[12],v=e[13],m=e[14],p=e[15],A=h*m*c-v*f*c+v*l*u-o*m*u-h*l*p+o*f*p,_=g*f*c-d*m*c-g*l*u+a*m*u+d*l*p-a*f*p,S=d*v*c-g*h*c+g*o*u-a*v*u-d*o*p+a*h*p,M=g*h*l-d*v*l-g*o*f+a*v*f+d*o*m-a*h*m,C=t*A+i*_+r*S+s*M;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/C;return e[0]=A*U,e[1]=(v*f*s-h*m*s-v*r*u+i*m*u+h*r*p-i*f*p)*U,e[2]=(o*m*s-v*l*s+v*r*c-i*m*c-o*r*p+i*l*p)*U,e[3]=(h*l*s-o*f*s-h*r*c+i*f*c+o*r*u-i*l*u)*U,e[4]=_*U,e[5]=(d*m*s-g*f*s+g*r*u-t*m*u-d*r*p+t*f*p)*U,e[6]=(g*l*s-a*m*s-g*r*c+t*m*c+a*r*p-t*l*p)*U,e[7]=(a*f*s-d*l*s+d*r*c-t*f*c-a*r*u+t*l*u)*U,e[8]=S*U,e[9]=(g*h*s-d*v*s-g*i*u+t*v*u+d*i*p-t*h*p)*U,e[10]=(a*v*s-g*o*s+g*i*c-t*v*c-a*i*p+t*o*p)*U,e[11]=(d*o*s-a*h*s-d*i*c+t*h*c+a*i*u-t*o*u)*U,e[12]=M*U,e[13]=(d*v*r-g*h*r+g*i*f-t*v*f-d*i*m+t*h*m)*U,e[14]=(g*o*r-a*v*r-g*i*l+t*v*l+a*i*m-t*o*m)*U,e[15]=(a*h*r-d*o*r+d*i*l-t*h*l-a*i*f+t*o*f)*U,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,d=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,d*o+i,d*l-r*a,0,c*l-r*o,d*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,d=a+a,h=o+o,f=s*c,u=s*d,g=s*h,v=a*d,m=a*h,p=o*h,A=l*c,_=l*d,S=l*h,M=i.x,C=i.y,U=i.z;return r[0]=(1-(v+p))*M,r[1]=(u+S)*M,r[2]=(g-_)*M,r[3]=0,r[4]=(u-S)*C,r[5]=(1-(f+p))*C,r[6]=(m+A)*C,r[7]=0,r[8]=(g+_)*U,r[9]=(m-A)*U,r[10]=(1-(f+v))*U,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=er.set(r[0],r[1],r[2]).length();const a=er.set(r[4],r[5],r[6]).length(),o=er.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],vi.copy(this);const c=1/s,d=1/a,h=1/o;return vi.elements[0]*=c,vi.elements[1]*=c,vi.elements[2]*=c,vi.elements[4]*=d,vi.elements[5]*=d,vi.elements[6]*=d,vi.elements[8]*=h,vi.elements[9]*=h,vi.elements[10]*=h,t.setFromRotationMatrix(vi),i.x=s,i.y=a,i.z=o,this}makePerspective(e,t,i,r,s,a,o=Di){const l=this.elements,c=2*s/(t-e),d=2*s/(i-r),h=(t+e)/(t-e),f=(i+r)/(i-r);let u,g;if(o===Di)u=-(a+s)/(a-s),g=-2*a*s/(a-s);else if(o===ps)u=-a/(a-s),g=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=u,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=Di){const l=this.elements,c=1/(t-e),d=1/(i-r),h=1/(a-s),f=(t+e)*c,u=(i+r)*d;let g,v;if(o===Di)g=(a+s)*h,v=-2*h;else if(o===ps)g=s*h,v=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-u,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const er=new W,vi=new ct,Bp=new W(0,0,0),Dp=new W(1,1,1),en=new W,xs=new W,Kt=new W,zc=new ct,Wc=new mn;class yi{constructor(e=0,t=0,i=0,r=yi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],d=r[9],h=r[2],f=r[6],u=r[10];switch(t){case"XYZ":this._y=Math.asin(Oe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,u),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Oe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,u),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Oe(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,u),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Oe(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,u),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Oe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,u));break;case"XZY":this._z=Math.asin(-Oe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-d,u),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return zc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(zc,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Wc.setFromEuler(this),this.setFromQuaternion(Wc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}yi.DEFAULT_ORDER="XYZ";class Gc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Qp=0;const Hc=new W,tr=new mn,Pi=new ct,Es=new W,Br=new W,Np=new W,Lp=new mn,Jc=new W(1,0,0),Zc=new W(0,1,0),Xc=new W(0,0,1),Yc={type:"added"},Pp={type:"removed"},ir={type:"childadded",child:null},wo={type:"childremoved",child:null};class yt extends fn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Qp++}),this.uuid=Ur(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=yt.DEFAULT_UP.clone();const e=new W,t=new yi,i=new mn,r=new W(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ct},normalMatrix:{value:new Ne}}),this.matrix=new ct,this.matrixWorld=new ct,this.matrixAutoUpdate=yt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Gc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return tr.setFromAxisAngle(e,t),this.quaternion.multiply(tr),this}rotateOnWorldAxis(e,t){return tr.setFromAxisAngle(e,t),this.quaternion.premultiply(tr),this}rotateX(e){return this.rotateOnAxis(Jc,e)}rotateY(e){return this.rotateOnAxis(Zc,e)}rotateZ(e){return this.rotateOnAxis(Xc,e)}translateOnAxis(e,t){return Hc.copy(e).applyQuaternion(this.quaternion),this.position.add(Hc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Jc,e)}translateY(e){return this.translateOnAxis(Zc,e)}translateZ(e){return this.translateOnAxis(Xc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Pi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Es.copy(e):Es.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Br.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Pi.lookAt(Br,Es,this.up):Pi.lookAt(Es,Br,this.up),this.quaternion.setFromRotationMatrix(Pi),r&&(Pi.extractRotation(r.matrixWorld),tr.setFromRotationMatrix(Pi),this.quaternion.premultiply(tr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Yc),ir.child=e,this.dispatchEvent(ir),ir.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Pp),wo.child=e,this.dispatchEvent(wo),wo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Pi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Pi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Pi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Yc),ir.child=e,this.dispatchEvent(ir),ir.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Br,e,Np),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Br,Lp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),h=a(e.shapes),f=a(e.skeletons),u=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),u.length>0&&(i.animations=u),g.length>0&&(i.nodes=g)}return i.object=r,i;function a(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}yt.DEFAULT_UP=new W(0,1,0),yt.DEFAULT_MATRIX_AUTO_UPDATE=!0,yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ai=new W,Vi=new W,Co=new W,ki=new W,nr=new W,rr=new W,Kc=new W,Uo=new W,Mo=new W,To=new W,Fo=new ft,Io=new ft,Ro=new ft;class _i{constructor(e=new W,t=new W,i=new W){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Ai.subVectors(e,t),r.cross(Ai);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Ai.subVectors(r,t),Vi.subVectors(i,t),Co.subVectors(e,t);const a=Ai.dot(Ai),o=Ai.dot(Vi),l=Ai.dot(Co),c=Vi.dot(Vi),d=Vi.dot(Co),h=a*c-o*o;if(h===0)return s.set(0,0,0),null;const f=1/h,u=(c*l-o*d)*f,g=(a*d-o*l)*f;return s.set(1-u-g,g,u)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,ki)===null?!1:ki.x>=0&&ki.y>=0&&ki.x+ki.y<=1}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,ki)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,ki.x),l.addScaledVector(a,ki.y),l.addScaledVector(o,ki.z),l)}static getInterpolatedAttribute(e,t,i,r,s,a){return Fo.setScalar(0),Io.setScalar(0),Ro.setScalar(0),Fo.fromBufferAttribute(e,t),Io.fromBufferAttribute(e,i),Ro.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Fo,s.x),a.addScaledVector(Io,s.y),a.addScaledVector(Ro,s.z),a}static isFrontFacing(e,t,i,r){return Ai.subVectors(i,t),Vi.subVectors(e,t),Ai.cross(Vi).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ai.subVectors(this.c,this.b),Vi.subVectors(this.a,this.b),Ai.cross(Vi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return _i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return _i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return _i.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return _i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return _i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;nr.subVectors(r,i),rr.subVectors(s,i),Uo.subVectors(e,i);const l=nr.dot(Uo),c=rr.dot(Uo);if(l<=0&&c<=0)return t.copy(i);Mo.subVectors(e,r);const d=nr.dot(Mo),h=rr.dot(Mo);if(d>=0&&h<=d)return t.copy(r);const f=l*h-d*c;if(f<=0&&l>=0&&d<=0)return a=l/(l-d),t.copy(i).addScaledVector(nr,a);To.subVectors(e,s);const u=nr.dot(To),g=rr.dot(To);if(g>=0&&u<=g)return t.copy(s);const v=u*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(i).addScaledVector(rr,o);const m=d*g-u*h;if(m<=0&&h-d>=0&&u-g>=0)return Kc.subVectors(s,r),o=(h-d)/(h-d+(u-g)),t.copy(r).addScaledVector(Kc,o);const p=1/(m+v+f);return a=v*p,o=f*p,t.copy(i).addScaledVector(nr,a).addScaledVector(rr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const jc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},tn={h:0,s:0,l:0},ys={h:0,s:0,l:0};function Bo(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Pe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Mt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ze.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=ze.workingColorSpace){return this.r=e,this.g=t,this.b=i,ze.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=ze.workingColorSpace){if(e=Sp(e,1),t=Oe(t,0,1),i=Oe(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=Bo(a,s,e+1/3),this.g=Bo(a,s,e),this.b=Bo(a,s,e-1/3)}return ze.toWorkingColorSpace(this,r),this}setStyle(e,t=Mt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Mt){const i=jc[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Qi(e.r),this.g=Qi(e.g),this.b=Qi(e.b),this}copyLinearToSRGB(e){return this.r=Xn(e.r),this.g=Xn(e.g),this.b=Xn(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Mt){return ze.fromWorkingColorSpace(It.copy(this),e),Math.round(Oe(It.r*255,0,255))*65536+Math.round(Oe(It.g*255,0,255))*256+Math.round(Oe(It.b*255,0,255))}getHexString(e=Mt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ze.workingColorSpace){ze.fromWorkingColorSpace(It.copy(this),t);const i=It.r,r=It.g,s=It.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const d=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=d<=.5?h/(a+o):h/(2-a-o),a){case i:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-i)/h+2;break;case s:l=(i-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=ze.workingColorSpace){return ze.fromWorkingColorSpace(It.copy(this),t),e.r=It.r,e.g=It.g,e.b=It.b,e}getStyle(e=Mt){ze.fromWorkingColorSpace(It.copy(this),e);const t=It.r,i=It.g,r=It.b;return e!==Mt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(tn),this.setHSL(tn.h+e,tn.s+t,tn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(tn),e.getHSL(ys);const i=go(tn.h,ys.h,t),r=go(tn.s,ys.s,t),s=go(tn.l,ys.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const It=new Pe;Pe.NAMES=jc;let Vp=0;class Oi extends fn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Vp++}),this.uuid=Ur(),this.name="",this.type="Material",this.blending=Pn,this.side=Fi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=xa,this.blendDst=Ea,this.blendEquation=cn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Pe(0,0,0),this.blendAlpha=0,this.depthFunc=Vn,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ic,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Jn,this.stencilZFail=Jn,this.stencilZPass=Jn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Pn&&(i.blending=this.blending),this.side!==Fi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==xa&&(i.blendSrc=this.blendSrc),this.blendDst!==Ea&&(i.blendDst=this.blendDst),this.blendEquation!==cn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Vn&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ic&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Jn&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Jn&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Jn&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class qc extends Oi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Pe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yi,this.combine=Ia,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const vt=new W,ws=new Qe;class wi{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Bc,this.updateRanges=[],this.gpuType=Bi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ws.fromBufferAttribute(this,t),ws.applyMatrix3(e),this.setXY(t,ws.x,ws.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix3(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix4(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyNormalMatrix(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.transformDirection(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Mr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=zt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Mr(t,this.array)),t}setX(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Mr(t,this.array)),t}setY(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Mr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Mr(t,this.array)),t}setW(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),i=zt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),i=zt(i,this.array),r=zt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),i=zt(i,this.array),r=zt(r,this.array),s=zt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Bc&&(e.usage=this.usage),e}}class $c extends wi{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class ed extends wi{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Nt extends wi{constructor(e,t,i){super(new Float32Array(e),t,i)}}let kp=0;const ii=new ct,Do=new yt,sr=new W,jt=new Kn,Dr=new Kn,wt=new W;class Si extends fn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:kp++}),this.uuid=Ur(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Qc(e)?ed:$c)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ne().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ii.makeRotationFromQuaternion(e),this.applyMatrix4(ii),this}rotateX(e){return ii.makeRotationX(e),this.applyMatrix4(ii),this}rotateY(e){return ii.makeRotationY(e),this.applyMatrix4(ii),this}rotateZ(e){return ii.makeRotationZ(e),this.applyMatrix4(ii),this}translate(e,t,i){return ii.makeTranslation(e,t,i),this.applyMatrix4(ii),this}scale(e,t,i){return ii.makeScale(e,t,i),this.applyMatrix4(ii),this}lookAt(e){return Do.lookAt(e),Do.updateMatrix(),this.applyMatrix4(Do.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(sr).negate(),this.translate(sr.x,sr.y,sr.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Nt(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Kn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];jt.setFromBufferAttribute(s),this.morphTargetsRelative?(wt.addVectors(this.boundingBox.min,jt.min),this.boundingBox.expandByPoint(wt),wt.addVectors(this.boundingBox.max,jt.max),this.boundingBox.expandByPoint(wt)):(this.boundingBox.expandByPoint(jt.min),this.boundingBox.expandByPoint(jt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Rr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new W,1/0);return}if(e){const i=this.boundingSphere.center;if(jt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Dr.setFromBufferAttribute(o),this.morphTargetsRelative?(wt.addVectors(jt.min,Dr.min),jt.expandByPoint(wt),wt.addVectors(jt.max,Dr.max),jt.expandByPoint(wt)):(jt.expandByPoint(Dr.min),jt.expandByPoint(Dr.max))}jt.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)wt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(wt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)wt.fromBufferAttribute(o,c),l&&(sr.fromBufferAttribute(e,c),wt.add(sr)),r=Math.max(r,i.distanceToSquared(wt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new wi(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let T=0;T<i.count;T++)o[T]=new W,l[T]=new W;const c=new W,d=new W,h=new W,f=new Qe,u=new Qe,g=new Qe,v=new W,m=new W;function p(T,y,b){c.fromBufferAttribute(i,T),d.fromBufferAttribute(i,y),h.fromBufferAttribute(i,b),f.fromBufferAttribute(s,T),u.fromBufferAttribute(s,y),g.fromBufferAttribute(s,b),d.sub(c),h.sub(c),u.sub(f),g.sub(f);const E=1/(u.x*g.y-g.x*u.y);isFinite(E)&&(v.copy(d).multiplyScalar(g.y).addScaledVector(h,-u.y).multiplyScalar(E),m.copy(h).multiplyScalar(u.x).addScaledVector(d,-g.x).multiplyScalar(E),o[T].add(v),o[y].add(v),o[b].add(v),l[T].add(m),l[y].add(m),l[b].add(m))}let A=this.groups;A.length===0&&(A=[{start:0,count:e.count}]);for(let T=0,y=A.length;T<y;++T){const b=A[T],E=b.start,D=b.count;for(let F=E,Q=E+D;F<Q;F+=3)p(e.getX(F+0),e.getX(F+1),e.getX(F+2))}const _=new W,S=new W,M=new W,C=new W;function U(T){M.fromBufferAttribute(r,T),C.copy(M);const y=o[T];_.copy(y),_.sub(M.multiplyScalar(M.dot(y))).normalize(),S.crossVectors(C,y);const E=S.dot(l[T])<0?-1:1;a.setXYZW(T,_.x,_.y,_.z,E)}for(let T=0,y=A.length;T<y;++T){const b=A[T],E=b.start,D=b.count;for(let F=E,Q=E+D;F<Q;F+=3)U(e.getX(F+0)),U(e.getX(F+1)),U(e.getX(F+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new wi(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,u=i.count;f<u;f++)i.setXYZ(f,0,0,0);const r=new W,s=new W,a=new W,o=new W,l=new W,c=new W,d=new W,h=new W;if(e)for(let f=0,u=e.count;f<u;f+=3){const g=e.getX(f+0),v=e.getX(f+1),m=e.getX(f+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),d.subVectors(a,s),h.subVectors(r,s),d.cross(h),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,m),o.add(d),l.add(d),c.add(d),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,u=t.count;f<u;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),d.subVectors(a,s),h.subVectors(r,s),d.cross(h),i.setXYZ(f+0,d.x,d.y,d.z),i.setXYZ(f+1,d.x,d.y,d.z),i.setXYZ(f+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)wt.fromBufferAttribute(e,t),wt.normalize(),e.setXYZ(t,wt.x,wt.y,wt.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,h=o.normalized,f=new c.constructor(l.length*d);let u=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?u=l[v]*o.data.stride+o.offset:u=l[v]*d;for(let p=0;p<d;p++)f[g++]=c[u++]}return new wi(f,d,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Si,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let d=0,h=c.length;d<h;d++){const f=c[d],u=e(f,i);l.push(u)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let h=0,f=c.length;h<f;h++){const u=c[h];d.push(u.toJSON(e.data))}d.length>0&&(r[l]=d,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const c in r){const d=r[c];this.setAttribute(c,d.clone(t))}const s=e.morphAttributes;for(const c in s){const d=[],h=s[c];for(let f=0,u=h.length;f<u;f++)d.push(h[f].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,d=a.length;c<d;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const td=new ct,An=new bs,Cs=new Rr,id=new W,Us=new W,Ms=new W,Ts=new W,Qo=new W,Fs=new W,nd=new W,Is=new W;class Wt extends yt{constructor(e=new Si,t=new qc){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Fs.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const d=o[l],h=s[l];d!==0&&(Qo.fromBufferAttribute(h,e),a?Fs.addScaledVector(Qo,d):Fs.addScaledVector(Qo.sub(t),d))}t.add(Fs)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Cs.copy(i.boundingSphere),Cs.applyMatrix4(s),An.copy(e.ray).recast(e.near),!(Cs.containsPoint(An.origin)===!1&&(An.intersectSphere(Cs,id)===null||An.origin.distanceToSquared(id)>(e.far-e.near)**2))&&(td.copy(s).invert(),An.copy(e.ray).applyMatrix4(td),!(i.boundingBox!==null&&An.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,An)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,d=s.attributes.uv1,h=s.attributes.normal,f=s.groups,u=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=f.length;g<v;g++){const m=f[g],p=a[m.materialIndex],A=Math.max(m.start,u.start),_=Math.min(o.count,Math.min(m.start+m.count,u.start+u.count));for(let S=A,M=_;S<M;S+=3){const C=o.getX(S),U=o.getX(S+1),T=o.getX(S+2);r=Rs(this,p,e,i,c,d,h,C,U,T),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,u.start),v=Math.min(o.count,u.start+u.count);for(let m=g,p=v;m<p;m+=3){const A=o.getX(m),_=o.getX(m+1),S=o.getX(m+2);r=Rs(this,a,e,i,c,d,h,A,_,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=f.length;g<v;g++){const m=f[g],p=a[m.materialIndex],A=Math.max(m.start,u.start),_=Math.min(l.count,Math.min(m.start+m.count,u.start+u.count));for(let S=A,M=_;S<M;S+=3){const C=S,U=S+1,T=S+2;r=Rs(this,p,e,i,c,d,h,C,U,T),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,u.start),v=Math.min(l.count,u.start+u.count);for(let m=g,p=v;m<p;m+=3){const A=m,_=m+1,S=m+2;r=Rs(this,a,e,i,c,d,h,A,_,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function Op(n,e,t,i,r,s,a,o){let l;if(e.side===Ot?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===Fi,o),l===null)return null;Is.copy(o),Is.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Is);return c<t.near||c>t.far?null:{distance:c,point:Is.clone(),object:n}}function Rs(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,Us),n.getVertexPosition(l,Ms),n.getVertexPosition(c,Ts);const d=Op(n,e,t,i,Us,Ms,Ts,nd);if(d){const h=new W;_i.getBarycoord(nd,Us,Ms,Ts,h),r&&(d.uv=_i.getInterpolatedAttribute(r,o,l,c,h,new Qe)),s&&(d.uv1=_i.getInterpolatedAttribute(s,o,l,c,h,new Qe)),a&&(d.normal=_i.getInterpolatedAttribute(a,o,l,c,h,new W),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new W,materialIndex:0};_i.getNormal(Us,Ms,Ts,f.normal),d.face=f,d.barycoord=h}return d}class Qr extends Si{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],d=[],h=[];let f=0,u=0;g("z","y","x",-1,-1,i,t,e,a,s,0),g("z","y","x",1,-1,i,t,-e,a,s,1),g("x","z","y",1,1,e,i,t,r,a,2),g("x","z","y",1,-1,e,i,-t,r,a,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Nt(c,3)),this.setAttribute("normal",new Nt(d,3)),this.setAttribute("uv",new Nt(h,2));function g(v,m,p,A,_,S,M,C,U,T,y){const b=S/U,E=M/T,D=S/2,F=M/2,Q=C/2,V=U+1,O=T+1;let B=0,R=0;const Z=new W;for(let K=0;K<O;K++){const ae=K*E-F;for(let Me=0;Me<V;Me++){const Be=Me*b-D;Z[v]=Be*A,Z[m]=ae*_,Z[p]=Q,c.push(Z.x,Z.y,Z.z),Z[v]=0,Z[m]=0,Z[p]=C>0?1:-1,d.push(Z.x,Z.y,Z.z),h.push(Me/U),h.push(1-K/T),B+=1}}for(let K=0;K<T;K++)for(let ae=0;ae<U;ae++){const Me=f+ae+V*K,Be=f+ae+V*(K+1),k=f+(ae+1)+V*(K+1),Y=f+(ae+1)+V*K;l.push(Me,Be,Y),l.push(Be,k,Y),R+=6}o.addGroup(u,R,y),u+=R,f+=B}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ar(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Lt(n){const e={};for(let t=0;t<n.length;t++){const i=ar(n[t]);for(const r in i)e[r]=i[r]}return e}function zp(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function rd(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ze.workingColorSpace}const Wp={clone:ar,merge:Lt};var Gp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Hp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class nn extends Oi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Gp,this.fragmentShader=Hp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ar(e.uniforms),this.uniformsGroups=zp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class sd extends yt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ct,this.projectionMatrix=new ct,this.projectionMatrixInverse=new ct,this.coordinateSystem=Di}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const rn=new W,ad=new Qe,od=new Qe;class ni extends sd{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=mo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ms*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return mo*2*Math.atan(Math.tan(ms*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){rn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(rn.x,rn.y).multiplyScalar(-e/rn.z),rn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(rn.x,rn.y).multiplyScalar(-e/rn.z)}getViewSize(e,t){return this.getViewBounds(e,ad,od),t.subVectors(od,ad)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ms*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const or=-90,lr=1;class Jp extends yt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new ni(or,lr,e,t);r.layers=this.layers,this.add(r);const s=new ni(or,lr,e,t);s.layers=this.layers,this.add(s);const a=new ni(or,lr,e,t);a.layers=this.layers,this.add(a);const o=new ni(or,lr,e,t);o.layers=this.layers,this.add(o);const l=new ni(or,lr,e,t);l.layers=this.layers,this.add(l);const c=new ni(or,lr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===Di)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ps)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,d]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),u=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,a),e.setRenderTarget(i,2,r),e.render(t,o),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,r),e.render(t,d),e.setRenderTarget(h,f,u),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class ld extends Qt{constructor(e,t,i,r,s,a,o,l,c,d){e=e!==void 0?e:[],t=t!==void 0?t:kn,super(e,t,i,r,s,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Zp extends pn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new ld(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Ei}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Qr(5,5,5),s=new nn({name:"CubemapFromEquirect",uniforms:ar(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ot,blending:Xi});s.uniforms.tEquirect.value=t;const a=new Wt(r,s),o=t.minFilter;return t.minFilter===hn&&(t.minFilter=Ei),new Jp(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}class Xp extends yt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new yi,this.environmentIntensity=1,this.environmentRotation=new yi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const No=new W,Yp=new W,Kp=new Ne;class sn{constructor(e=new W(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=No.subVectors(i,t).cross(Yp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(No),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Kp.getNormalMatrix(e),r=this.coplanarPoint(No).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const _n=new Rr,Bs=new W;class Lo{constructor(e=new sn,t=new sn,i=new sn,r=new sn,s=new sn,a=new sn){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Di){const i=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],d=r[5],h=r[6],f=r[7],u=r[8],g=r[9],v=r[10],m=r[11],p=r[12],A=r[13],_=r[14],S=r[15];if(i[0].setComponents(l-s,f-c,m-u,S-p).normalize(),i[1].setComponents(l+s,f+c,m+u,S+p).normalize(),i[2].setComponents(l+a,f+d,m+g,S+A).normalize(),i[3].setComponents(l-a,f-d,m-g,S-A).normalize(),i[4].setComponents(l-o,f-h,m-v,S-_).normalize(),t===Di)i[5].setComponents(l+o,f+h,m+v,S+_).normalize();else if(t===ps)i[5].setComponents(o,h,v,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),_n.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),_n.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(_n)}intersectsSprite(e){return _n.center.set(0,0,0),_n.radius=.7071067811865476,_n.applyMatrix4(e.matrixWorld),this.intersectsSphere(_n)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Bs.x=r.normal.x>0?e.max.x:e.min.x,Bs.y=r.normal.y>0?e.max.y:e.min.y,Bs.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Bs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ds extends Oi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Pe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Qs=new W,Ns=new W,cd=new ct,Nr=new bs,Ls=new Rr,Po=new W,dd=new W;class jp extends yt{constructor(e=new Si,t=new Ds){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)Qs.fromBufferAttribute(t,r-1),Ns.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=Qs.distanceTo(Ns);e.setAttribute("lineDistance",new Nt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ls.copy(i.boundingSphere),Ls.applyMatrix4(r),Ls.radius+=s,e.ray.intersectsSphere(Ls)===!1)return;cd.copy(r).invert(),Nr.copy(e.ray).applyMatrix4(cd);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,d=i.index,f=i.attributes.position;if(d!==null){const u=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let v=u,m=g-1;v<m;v+=c){const p=d.getX(v),A=d.getX(v+1),_=Ps(this,e,Nr,l,p,A);_&&t.push(_)}if(this.isLineLoop){const v=d.getX(g-1),m=d.getX(u),p=Ps(this,e,Nr,l,v,m);p&&t.push(p)}}else{const u=Math.max(0,a.start),g=Math.min(f.count,a.start+a.count);for(let v=u,m=g-1;v<m;v+=c){const p=Ps(this,e,Nr,l,v,v+1);p&&t.push(p)}if(this.isLineLoop){const v=Ps(this,e,Nr,l,g-1,u);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Ps(n,e,t,i,r,s){const a=n.geometry.attributes.position;if(Qs.fromBufferAttribute(a,r),Ns.fromBufferAttribute(a,s),t.distanceSqToSegment(Qs,Ns,Po,dd)>i)return;Po.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(Po);if(!(l<e.near||l>e.far))return{distance:l,point:dd.clone().applyMatrix4(n.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:n}}const hd=new W,ud=new W;class fd extends jp{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)hd.fromBufferAttribute(t,r),ud.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+hd.distanceTo(ud);e.setAttribute("lineDistance",new Nt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Lr extends Oi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Pe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const pd=new ct,Vo=new bs,Vs=new Rr,ks=new W;class ko extends yt{constructor(e=new Si,t=new Lr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Vs.copy(i.boundingSphere),Vs.applyMatrix4(r),Vs.radius+=s,e.ray.intersectsSphere(Vs)===!1)return;pd.copy(r).invert(),Vo.copy(e.ray).applyMatrix4(pd);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,h=i.attributes.position;if(c!==null){const f=Math.max(0,a.start),u=Math.min(c.count,a.start+a.count);for(let g=f,v=u;g<v;g++){const m=c.getX(g);ks.fromBufferAttribute(h,m),md(ks,m,l,r,e,t,this)}}else{const f=Math.max(0,a.start),u=Math.min(h.count,a.start+a.count);for(let g=f,v=u;g<v;g++)ks.fromBufferAttribute(h,g),md(ks,g,l,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function md(n,e,t,i,r,s,a){const o=Vo.distanceSqToPoint(n);if(o<t){const l=new W;Vo.closestPointToPoint(n,l),l.applyMatrix4(i);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Pr extends yt{constructor(){super(),this.isGroup=!0,this.type="Group"}}class gd extends Qt{constructor(e,t,i,r,s,a,o,l,c,d=Wn){if(d!==Wn&&d!==Gn)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&d===Wn&&(i=un),i===void 0&&d===Gn&&(i=zn),super(null,r,s,a,o,l,d,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:pi,this.minFilter=l!==void 0?l:pi,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Os extends Si{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,d=l+1,h=e/o,f=t/l,u=[],g=[],v=[],m=[];for(let p=0;p<d;p++){const A=p*f-a;for(let _=0;_<c;_++){const S=_*h-s;g.push(S,-A,0),v.push(0,0,1),m.push(_/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let A=0;A<o;A++){const _=A+c*p,S=A+c*(p+1),M=A+1+c*(p+1),C=A+1+c*p;u.push(_,S,C),u.push(S,M,C)}this.setIndex(u),this.setAttribute("position",new Nt(g,3)),this.setAttribute("normal",new Nt(v,3)),this.setAttribute("uv",new Nt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Os(e.width,e.height,e.widthSegments,e.heightSegments)}}class Oo extends Oi{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Pe(16777215),this.specular=new Pe(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Pe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fc,this.normalScale=new Qe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yi,this.combine=Ia,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class qp extends Oi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=dp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class $p extends Oi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const zs={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class em{constructor(e,t,i){const r=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(d){o++,s===!1&&r.onStart!==void 0&&r.onStart(d,a,o),s=!0},this.itemEnd=function(d){a++,r.onProgress!==void 0&&r.onProgress(d,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(d){r.onError!==void 0&&r.onError(d)},this.resolveURL=function(d){return l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,h){return c.push(d,h),this},this.removeHandler=function(d){const h=c.indexOf(d);return h!==-1&&c.splice(h,2),this},this.getHandler=function(d){for(let h=0,f=c.length;h<f;h+=2){const u=c[h],g=c[h+1];if(u.global&&(u.lastIndex=0),u.test(d))return g}return null}}}const vd=new em;class cr{constructor(e){this.manager=e!==void 0?e:vd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(r,s){i.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}cr.DEFAULT_MATERIAL_NAME="__DEFAULT";const zi={};class tm extends Error{constructor(e,t){super(e),this.response=t}}class Ad extends cr{constructor(e){super(e)}load(e,t,i,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=zs.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(zi[e]!==void 0){zi[e].push({onLoad:t,onProgress:i,onError:r});return}zi[e]=[],zi[e].push({onLoad:t,onProgress:i,onError:r});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const d=zi[e],h=c.body.getReader(),f=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),u=f?parseInt(f):0,g=u!==0;let v=0;const m=new ReadableStream({start(p){A();function A(){h.read().then(({done:_,value:S})=>{if(_)p.close();else{v+=S.byteLength;const M=new ProgressEvent("progress",{lengthComputable:g,loaded:v,total:u});for(let C=0,U=d.length;C<U;C++){const T=d[C];T.onProgress&&T.onProgress(M)}p.enqueue(S),A()}},_=>{p.error(_)})}}});return new Response(m)}else throw new tm(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(d=>new DOMParser().parseFromString(d,o));case"json":return c.json();default:if(o===void 0)return c.text();{const h=/charset="?([^;"\s]*)"?/i.exec(o),f=h&&h[1]?h[1].toLowerCase():void 0,u=new TextDecoder(f);return c.arrayBuffer().then(g=>u.decode(g))}}}).then(c=>{zs.add(e,c);const d=zi[e];delete zi[e];for(let h=0,f=d.length;h<f;h++){const u=d[h];u.onLoad&&u.onLoad(c)}}).catch(c=>{const d=zi[e];if(d===void 0)throw this.manager.itemError(e),c;delete zi[e];for(let h=0,f=d.length;h<f;h++){const u=d[h];u.onError&&u.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class im extends cr{constructor(e){super(e)}load(e,t,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=zs.get(e);if(a!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a;const o=Tr("img");function l(){d(),zs.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(h){d(),r&&r(h),s.manager.itemError(e),s.manager.itemEnd(e)}function d(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),s.manager.itemStart(e),o.src=e,o}}class nm extends cr{constructor(e){super(e)}load(e,t,i,r){const s=new Qt,a=new im(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},i,r),s}}class _d extends yt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Pe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const zo=new ct,Sd=new W,bd=new W;class rm{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Qe(512,512),this.map=null,this.mapPass=null,this.matrix=new ct,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Lo,this._frameExtents=new Qe(1,1),this._viewportCount=1,this._viewports=[new ft(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Sd.setFromMatrixPosition(e.matrixWorld),t.position.copy(Sd),bd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(bd),t.updateMatrixWorld(),zo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(zo),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(zo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class xd extends sd{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class sm extends rm{constructor(){super(new xd(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class am extends _d{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.target=new yt,this.shadow=new sm}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class om extends _d{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class lm{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let i=0,r=e.length;i<r;i++)t+=String.fromCharCode(e[i]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class cm extends ni{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ed{constructor(e=1,t=0,i=0){return this.radius=e,this.phi=t,this.theta=i,this}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Oe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Oe(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class dm extends fn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}function yd(n,e,t,i){const r=hm(i);switch(t){case Ec:return n*e;case wc:return n*e;case Cc:return n*e*2;case Uc:return n*e/r.components*r.byteLength;case Va:return n*e/r.components*r.byteLength;case Mc:return n*e*2/r.components*r.byteLength;case ka:return n*e*2/r.components*r.byteLength;case yc:return n*e*3/r.components*r.byteLength;case mi:return n*e*4/r.components*r.byteLength;case Oa:return n*e*4/r.components*r.byteLength;case ls:case cs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ds:case hs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Wa:case Ha:return Math.max(n,16)*Math.max(e,8)/4;case za:case Ga:return Math.max(n,8)*Math.max(e,8)/2;case Ja:case Za:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Xa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ya:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ka:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case ja:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case qa:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case $a:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case eo:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case to:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case io:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case no:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case ro:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case so:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case ao:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case oo:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case lo:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case us:case co:case ho:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Tc:case uo:return Math.ceil(n/4)*Math.ceil(e/4)*8;case fo:case po:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function hm(n){switch(n){case Ri:case Sc:return{byteLength:1,components:1};case wr:case bc:case Cr:return{byteLength:2,components:1};case La:case Pa:return{byteLength:2,components:4};case un:case Na:case Bi:return{byteLength:4,components:1};case xc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ba}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ba);function wd(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function um(n){const e=new WeakMap;function t(o,l){const c=o.array,d=o.usage,h=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,d),o.onUploadCallback();let u;if(c instanceof Float32Array)u=n.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?u=n.HALF_FLOAT:u=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)u=n.SHORT;else if(c instanceof Uint32Array)u=n.UNSIGNED_INT;else if(c instanceof Int32Array)u=n.INT;else if(c instanceof Int8Array)u=n.BYTE;else if(c instanceof Uint8Array)u=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)u=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:u,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,l,c){const d=l.array,h=l.updateRanges;if(n.bindBuffer(c,o),h.length===0)n.bufferSubData(c,0,d);else{h.sort((u,g)=>u.start-g.start);let f=0;for(let u=1;u<h.length;u++){const g=h[f],v=h[u];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++f,h[f]=v)}h.length=f+1;for(let u=0,g=h.length;u<g;u++){const v=h[u];n.bufferSubData(c,v.start*d.BYTES_PER_ELEMENT,d,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var fm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,pm=`#ifdef USE_ALPHAHASH
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
#endif`,mm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,gm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,vm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Am=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,_m=`#ifdef USE_AOMAP
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
#endif`,Sm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,bm=`#ifdef USE_BATCHING
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
#endif`,xm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Em=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ym=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,wm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Cm=`#ifdef USE_IRIDESCENCE
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
#endif`,Um=`#ifdef USE_BUMPMAP
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
#endif`,Mm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Tm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Fm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Im=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Rm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Bm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Dm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Qm=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Nm=`#define PI 3.141592653589793
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
} // validated`,Lm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Pm=`vec3 transformedNormal = objectNormal;
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
#endif`,Vm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,km=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Om=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,zm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Wm="gl_FragColor = linearToOutputTexel( gl_FragColor );",Gm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Hm=`#ifdef USE_ENVMAP
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
#endif`,Jm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Zm=`#ifdef USE_ENVMAP
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
#endif`,Xm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ym=`#ifdef USE_ENVMAP
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
#endif`,Km=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,jm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,qm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,$m=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,eg=`#ifdef USE_GRADIENTMAP
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
}`,tg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ig=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ng=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,rg=`uniform bool receiveShadow;
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
#endif`,sg=`#ifdef USE_ENVMAP
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
#endif`,ag=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,og=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,cg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,dg=`PhysicalMaterial material;
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
#endif`,hg=`struct PhysicalMaterial {
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
}`,ug=`
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
#endif`,fg=`#if defined( RE_IndirectDiffuse )
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
#endif`,pg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,mg=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,gg=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vg=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ag=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,_g=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Sg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,bg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,xg=`#if defined( USE_POINTS_UV )
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
#endif`,Eg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,yg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,wg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Cg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ug=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Mg=`#ifdef USE_MORPHTARGETS
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
#endif`,Tg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Fg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Ig=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Rg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Dg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Qg=`#ifdef USE_NORMALMAP
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
#endif`,Ng=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Lg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Pg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Vg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,kg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Og=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,zg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Wg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Gg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Hg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Jg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Zg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Xg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Yg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Kg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,jg=`float getShadowMask() {
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
}`,qg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,$g=`#ifdef USE_SKINNING
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
#endif`,ev=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,tv=`#ifdef USE_SKINNING
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
#endif`,iv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,nv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,rv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,sv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,av=`#ifdef USE_TRANSMISSION
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
#endif`,ov=`#ifdef USE_TRANSMISSION
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
#endif`,lv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,cv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,dv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ve={alphahash_fragment:fm,alphahash_pars_fragment:pm,alphamap_fragment:mm,alphamap_pars_fragment:gm,alphatest_fragment:vm,alphatest_pars_fragment:Am,aomap_fragment:_m,aomap_pars_fragment:Sm,batching_pars_vertex:bm,batching_vertex:xm,begin_vertex:Em,beginnormal_vertex:ym,bsdfs:wm,iridescence_fragment:Cm,bumpmap_pars_fragment:Um,clipping_planes_fragment:Mm,clipping_planes_pars_fragment:Tm,clipping_planes_pars_vertex:Fm,clipping_planes_vertex:Im,color_fragment:Rm,color_pars_fragment:Bm,color_pars_vertex:Dm,color_vertex:Qm,common:Nm,cube_uv_reflection_fragment:Lm,defaultnormal_vertex:Pm,displacementmap_pars_vertex:Vm,displacementmap_vertex:km,emissivemap_fragment:Om,emissivemap_pars_fragment:zm,colorspace_fragment:Wm,colorspace_pars_fragment:Gm,envmap_fragment:Hm,envmap_common_pars_fragment:Jm,envmap_pars_fragment:Zm,envmap_pars_vertex:Xm,envmap_physical_pars_fragment:sg,envmap_vertex:Ym,fog_vertex:Km,fog_pars_vertex:jm,fog_fragment:qm,fog_pars_fragment:$m,gradientmap_pars_fragment:eg,lightmap_pars_fragment:tg,lights_lambert_fragment:ig,lights_lambert_pars_fragment:ng,lights_pars_begin:rg,lights_toon_fragment:ag,lights_toon_pars_fragment:og,lights_phong_fragment:lg,lights_phong_pars_fragment:cg,lights_physical_fragment:dg,lights_physical_pars_fragment:hg,lights_fragment_begin:ug,lights_fragment_maps:fg,lights_fragment_end:pg,logdepthbuf_fragment:mg,logdepthbuf_pars_fragment:gg,logdepthbuf_pars_vertex:vg,logdepthbuf_vertex:Ag,map_fragment:_g,map_pars_fragment:Sg,map_particle_fragment:bg,map_particle_pars_fragment:xg,metalnessmap_fragment:Eg,metalnessmap_pars_fragment:yg,morphinstance_vertex:wg,morphcolor_vertex:Cg,morphnormal_vertex:Ug,morphtarget_pars_vertex:Mg,morphtarget_vertex:Tg,normal_fragment_begin:Fg,normal_fragment_maps:Ig,normal_pars_fragment:Rg,normal_pars_vertex:Bg,normal_vertex:Dg,normalmap_pars_fragment:Qg,clearcoat_normal_fragment_begin:Ng,clearcoat_normal_fragment_maps:Lg,clearcoat_pars_fragment:Pg,iridescence_pars_fragment:Vg,opaque_fragment:kg,packing:Og,premultiplied_alpha_fragment:zg,project_vertex:Wg,dithering_fragment:Gg,dithering_pars_fragment:Hg,roughnessmap_fragment:Jg,roughnessmap_pars_fragment:Zg,shadowmap_pars_fragment:Xg,shadowmap_pars_vertex:Yg,shadowmap_vertex:Kg,shadowmask_pars_fragment:jg,skinbase_vertex:qg,skinning_pars_vertex:$g,skinning_vertex:ev,skinnormal_vertex:tv,specularmap_fragment:iv,specularmap_pars_fragment:nv,tonemapping_fragment:rv,tonemapping_pars_fragment:sv,transmission_fragment:av,transmission_pars_fragment:ov,uv_pars_fragment:lv,uv_pars_vertex:cv,uv_vertex:dv,worldpos_vertex:hv,background_vert:`varying vec2 vUv;
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
}`},se={common:{diffuse:{value:new Pe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ne}},envmap:{envMap:{value:null},envMapRotation:{value:new Ne},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ne}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ne}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ne},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ne},normalScale:{value:new Qe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ne},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ne}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ne}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ne}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Pe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Pe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0},uvTransform:{value:new Ne}},sprite:{diffuse:{value:new Pe(16777215)},opacity:{value:1},center:{value:new Qe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}}},Ci={basic:{uniforms:Lt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:Lt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new Pe(0)}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:Lt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new Pe(0)},specular:{value:new Pe(1118481)},shininess:{value:30}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:Lt([se.common,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.roughnessmap,se.metalnessmap,se.fog,se.lights,{emissive:{value:new Pe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:Lt([se.common,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.gradientmap,se.fog,se.lights,{emissive:{value:new Pe(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:Lt([se.common,se.bumpmap,se.normalmap,se.displacementmap,se.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:Lt([se.points,se.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:Lt([se.common,se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:Lt([se.common,se.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:Lt([se.common,se.bumpmap,se.normalmap,se.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:Lt([se.sprite,se.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new Ne},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ne}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distanceRGBA:{uniforms:Lt([se.common,se.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distanceRGBA_vert,fragmentShader:Ve.distanceRGBA_frag},shadow:{uniforms:Lt([se.lights,se.fog,{color:{value:new Pe(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};Ci.physical={uniforms:Lt([Ci.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ne},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ne},clearcoatNormalScale:{value:new Qe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ne},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ne},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ne},sheen:{value:0},sheenColor:{value:new Pe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ne},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ne},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ne},transmissionSamplerSize:{value:new Qe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ne},attenuationDistance:{value:0},attenuationColor:{value:new Pe(0)},specularColor:{value:new Pe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ne},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ne},anisotropyVector:{value:new Qe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ne}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};const Ws={r:0,b:0,g:0},Sn=new yi,uv=new ct;function fv(n,e,t,i,r,s,a){const o=new Pe(0);let l=s===!0?0:1,c,d,h=null,f=0,u=null;function g(_){let S=_.isScene===!0?_.background:null;return S&&S.isTexture&&(S=(_.backgroundBlurriness>0?t:e).get(S)),S}function v(_){let S=!1;const M=g(_);M===null?p(o,l):M&&M.isColor&&(p(M,1),S=!0);const C=n.xr.getEnvironmentBlendMode();C==="additive"?i.buffers.color.setClear(0,0,0,1,a):C==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||S)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(_,S){const M=g(S);M&&(M.isCubeTexture||M.mapping===ss)?(d===void 0&&(d=new Wt(new Qr(1,1,1),new nn({name:"BackgroundCubeMaterial",uniforms:ar(Ci.backgroundCube.uniforms),vertexShader:Ci.backgroundCube.vertexShader,fragmentShader:Ci.backgroundCube.fragmentShader,side:Ot,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(C,U,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(d)),Sn.copy(S.backgroundRotation),Sn.x*=-1,Sn.y*=-1,Sn.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Sn.y*=-1,Sn.z*=-1),d.material.uniforms.envMap.value=M,d.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(uv.makeRotationFromEuler(Sn)),d.material.toneMapped=ze.getTransfer(M.colorSpace)!==rt,(h!==M||f!==M.version||u!==n.toneMapping)&&(d.material.needsUpdate=!0,h=M,f=M.version,u=n.toneMapping),d.layers.enableAll(),_.unshift(d,d.geometry,d.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new Wt(new Os(2,2),new nn({name:"BackgroundMaterial",uniforms:ar(Ci.background.uniforms),vertexShader:Ci.background.vertexShader,fragmentShader:Ci.background.fragmentShader,side:Fi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=ze.getTransfer(M.colorSpace)!==rt,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||f!==M.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,h=M,f=M.version,u=n.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null))}function p(_,S){_.getRGB(Ws,rd(n)),i.buffers.color.setClear(Ws.r,Ws.g,Ws.b,S,a)}function A(){d!==void 0&&(d.geometry.dispose(),d.material.dispose()),c!==void 0&&(c.geometry.dispose(),c.material.dispose())}return{getClearColor:function(){return o},setClearColor:function(_,S=1){o.set(_),l=S,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(_){l=_,p(o,l)},render:v,addToRenderList:m,dispose:A}}function pv(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null);let s=r,a=!1;function o(b,E,D,F,Q){let V=!1;const O=h(F,D,E);s!==O&&(s=O,c(s.object)),V=u(b,F,D,Q),V&&g(b,F,D,Q),Q!==null&&e.update(Q,n.ELEMENT_ARRAY_BUFFER),(V||a)&&(a=!1,S(b,E,D,F),Q!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(Q).buffer))}function l(){return n.createVertexArray()}function c(b){return n.bindVertexArray(b)}function d(b){return n.deleteVertexArray(b)}function h(b,E,D){const F=D.wireframe===!0;let Q=i[b.id];Q===void 0&&(Q={},i[b.id]=Q);let V=Q[E.id];V===void 0&&(V={},Q[E.id]=V);let O=V[F];return O===void 0&&(O=f(l()),V[F]=O),O}function f(b){const E=[],D=[],F=[];for(let Q=0;Q<t;Q++)E[Q]=0,D[Q]=0,F[Q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:E,enabledAttributes:D,attributeDivisors:F,object:b,attributes:{},index:null}}function u(b,E,D,F){const Q=s.attributes,V=E.attributes;let O=0;const B=D.getAttributes();for(const R in B)if(B[R].location>=0){const K=Q[R];let ae=V[R];if(ae===void 0&&(R==="instanceMatrix"&&b.instanceMatrix&&(ae=b.instanceMatrix),R==="instanceColor"&&b.instanceColor&&(ae=b.instanceColor)),K===void 0||K.attribute!==ae||ae&&K.data!==ae.data)return!0;O++}return s.attributesNum!==O||s.index!==F}function g(b,E,D,F){const Q={},V=E.attributes;let O=0;const B=D.getAttributes();for(const R in B)if(B[R].location>=0){let K=V[R];K===void 0&&(R==="instanceMatrix"&&b.instanceMatrix&&(K=b.instanceMatrix),R==="instanceColor"&&b.instanceColor&&(K=b.instanceColor));const ae={};ae.attribute=K,K&&K.data&&(ae.data=K.data),Q[R]=ae,O++}s.attributes=Q,s.attributesNum=O,s.index=F}function v(){const b=s.newAttributes;for(let E=0,D=b.length;E<D;E++)b[E]=0}function m(b){p(b,0)}function p(b,E){const D=s.newAttributes,F=s.enabledAttributes,Q=s.attributeDivisors;D[b]=1,F[b]===0&&(n.enableVertexAttribArray(b),F[b]=1),Q[b]!==E&&(n.vertexAttribDivisor(b,E),Q[b]=E)}function A(){const b=s.newAttributes,E=s.enabledAttributes;for(let D=0,F=E.length;D<F;D++)E[D]!==b[D]&&(n.disableVertexAttribArray(D),E[D]=0)}function _(b,E,D,F,Q,V,O){O===!0?n.vertexAttribIPointer(b,E,D,Q,V):n.vertexAttribPointer(b,E,D,F,Q,V)}function S(b,E,D,F){v();const Q=F.attributes,V=D.getAttributes(),O=E.defaultAttributeValues;for(const B in V){const R=V[B];if(R.location>=0){let Z=Q[B];if(Z===void 0&&(B==="instanceMatrix"&&b.instanceMatrix&&(Z=b.instanceMatrix),B==="instanceColor"&&b.instanceColor&&(Z=b.instanceColor)),Z!==void 0){const K=Z.normalized,ae=Z.itemSize,Me=e.get(Z);if(Me===void 0)continue;const Be=Me.buffer,k=Me.type,Y=Me.bytesPerElement,re=k===n.INT||k===n.UNSIGNED_INT||Z.gpuType===Na;if(Z.isInterleavedBufferAttribute){const ee=Z.data,ge=ee.stride,be=Z.offset;if(ee.isInstancedInterleavedBuffer){for(let Fe=0;Fe<R.locationSize;Fe++)p(R.location+Fe,ee.meshPerAttribute);b.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let Fe=0;Fe<R.locationSize;Fe++)m(R.location+Fe);n.bindBuffer(n.ARRAY_BUFFER,Be);for(let Fe=0;Fe<R.locationSize;Fe++)_(R.location+Fe,ae/R.locationSize,k,K,ge*Y,(be+ae/R.locationSize*Fe)*Y,re)}else{if(Z.isInstancedBufferAttribute){for(let ee=0;ee<R.locationSize;ee++)p(R.location+ee,Z.meshPerAttribute);b.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let ee=0;ee<R.locationSize;ee++)m(R.location+ee);n.bindBuffer(n.ARRAY_BUFFER,Be);for(let ee=0;ee<R.locationSize;ee++)_(R.location+ee,ae/R.locationSize,k,K,ae*Y,ae/R.locationSize*ee*Y,re)}}else if(O!==void 0){const K=O[B];if(K!==void 0)switch(K.length){case 2:n.vertexAttrib2fv(R.location,K);break;case 3:n.vertexAttrib3fv(R.location,K);break;case 4:n.vertexAttrib4fv(R.location,K);break;default:n.vertexAttrib1fv(R.location,K)}}}}A()}function M(){T();for(const b in i){const E=i[b];for(const D in E){const F=E[D];for(const Q in F)d(F[Q].object),delete F[Q];delete E[D]}delete i[b]}}function C(b){if(i[b.id]===void 0)return;const E=i[b.id];for(const D in E){const F=E[D];for(const Q in F)d(F[Q].object),delete F[Q];delete E[D]}delete i[b.id]}function U(b){for(const E in i){const D=i[E];if(D[b.id]===void 0)continue;const F=D[b.id];for(const Q in F)d(F[Q].object),delete F[Q];delete D[b.id]}}function T(){y(),a=!0,s!==r&&(s=r,c(s.object))}function y(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:T,resetDefaultState:y,dispose:M,releaseStatesOfGeometry:C,releaseStatesOfProgram:U,initAttributes:v,enableAttribute:m,disableUnusedAttributes:A}}function mv(n,e,t){let i;function r(c){i=c}function s(c,d){n.drawArrays(i,c,d),t.update(d,i,1)}function a(c,d,h){h!==0&&(n.drawArraysInstanced(i,c,d,h),t.update(d,i,h))}function o(c,d,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,d,0,h);let u=0;for(let g=0;g<h;g++)u+=d[g];t.update(u,i,1)}function l(c,d,h,f){if(h===0)return;const u=e.get("WEBGL_multi_draw");if(u===null)for(let g=0;g<c.length;g++)a(c[g],d[g],f[g]);else{u.multiDrawArraysInstancedWEBGL(i,c,0,d,0,f,0,h);let g=0;for(let v=0;v<h;v++)g+=d[v]*f[v];t.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function gv(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const U=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(U.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(U){return!(U!==mi&&i.convert(U)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(U){const T=U===Cr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(U!==Ri&&i.convert(U)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&U!==Bi&&!T)}function l(U){if(U==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";U="mediump"}return U==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const h=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),u=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),A=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),_=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),M=g>0,C=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:u,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:A,maxVaryings:_,maxFragmentUniforms:S,vertexTextures:M,maxSamples:C}}function vv(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new sn,o=new Ne,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const u=h.length!==0||f||i!==0||r;return r=f,i=h.length,u},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){t=d(h,f,0)},this.setState=function(h,f,u){const g=h.clippingPlanes,v=h.clipIntersection,m=h.clipShadows,p=n.get(h);if(!r||g===null||g.length===0||s&&!m)s?d(null):c();else{const A=s?0:i,_=A*4;let S=p.clippingState||null;l.value=S,S=d(g,f,_,u);for(let M=0;M!==_;++M)S[M]=t[M];p.clippingState=S,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=A}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(h,f,u,g){const v=h!==null?h.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const p=u+v*4,A=f.matrixWorldInverse;o.getNormalMatrix(A),(m===null||m.length<p)&&(m=new Float32Array(p));for(let _=0,S=u;_!==v;++_,S+=4)a.copy(h[_]).applyMatrix4(A,o),a.normal.toArray(m,S),m[S+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function Av(n){let e=new WeakMap;function t(a,o){return o===Ra?a.mapping=kn:o===Ba&&(a.mapping=On),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Ra||o===Ba)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Zp(l.height);return c.fromEquirectangularTexture(n,a),e.set(a,c),a.addEventListener("dispose",r),t(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}const dr=4,Cd=[.125,.215,.35,.446,.526,.582],bn=20,Wo=new xd,Ud=new Pe;let Go=null,Ho=0,Jo=0,Zo=!1;const xn=(1+Math.sqrt(5))/2,hr=1/xn,Md=[new W(-xn,hr,0),new W(xn,hr,0),new W(-hr,0,xn),new W(hr,0,xn),new W(0,xn,-hr),new W(0,xn,hr),new W(-1,1,-1),new W(1,1,-1),new W(-1,1,1),new W(1,1,1)];class Td{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){Go=this._renderer.getRenderTarget(),Ho=this._renderer.getActiveCubeFace(),Jo=this._renderer.getActiveMipmapLevel(),Zo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Rd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Id(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Go,Ho,Jo),this._renderer.xr.enabled=Zo,e.scissorTest=!1,Gs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===kn||e.mapping===On?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Go=this._renderer.getRenderTarget(),Ho=this._renderer.getActiveCubeFace(),Jo=this._renderer.getActiveMipmapLevel(),Zo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Ei,minFilter:Ei,generateMipmaps:!1,type:Cr,format:mi,colorSpace:Hn,depthBuffer:!1},r=Fd(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Fd(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=_v(s)),this._blurMaterial=Sv(s,e,t)}return r}_compileMaterial(e){const t=new Wt(this._lodPlanes[0],e);this._renderer.compile(t,Wo)}_sceneToCubeUV(e,t,i,r){const o=new ni(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,f=d.toneMapping;d.getClearColor(Ud),d.toneMapping=Yi,d.autoClear=!1;const u=new qc({name:"PMREM.Background",side:Ot,depthWrite:!1,depthTest:!1}),g=new Wt(new Qr,u);let v=!1;const m=e.background;m?m.isColor&&(u.color.copy(m),e.background=null,v=!0):(u.color.copy(Ud),v=!0);for(let p=0;p<6;p++){const A=p%3;A===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):A===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));const _=this._cubeSize;Gs(r,A*_,p>2?_:0,_,_),d.setRenderTarget(r),v&&d.render(g,o),d.render(e,o)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=f,d.autoClear=h,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===kn||e.mapping===On;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Rd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Id());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new Wt(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Gs(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Wo)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Md[(r-s-1)%Md.length];this._blur(e,s-1,s,a,o)}t.autoClear=i}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,h=new Wt(this._lodPlanes[r],c),f=c.uniforms,u=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*u):2*Math.PI/(2*bn-1),v=s/g,m=isFinite(s)?1+Math.floor(d*v):bn;m>bn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${bn}`);const p=[];let A=0;for(let U=0;U<bn;++U){const T=U/v,y=Math.exp(-T*T/2);p.push(y),U===0?A+=y:U<m&&(A+=2*y)}for(let U=0;U<p.length;U++)p[U]=p[U]/A;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:_}=this;f.dTheta.value=g,f.mipInt.value=_-i;const S=this._sizeLods[r],M=3*S*(r>_-dr?r-_+dr:0),C=4*(this._cubeSize-S);Gs(t,M,C,3*S,2*S),l.setRenderTarget(t),l.render(h,Wo)}}function _v(n){const e=[],t=[],i=[];let r=n;const s=n-dr+1+Cd.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let l=1/o;a>n-dr?l=Cd[a-n+dr-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),d=-c,h=1+c,f=[d,d,h,d,h,h,d,d,h,h,d,h],u=6,g=6,v=3,m=2,p=1,A=new Float32Array(v*g*u),_=new Float32Array(m*g*u),S=new Float32Array(p*g*u);for(let C=0;C<u;C++){const U=C%3*2/3-1,T=C>2?0:-1,y=[U,T,0,U+2/3,T,0,U+2/3,T+1,0,U,T,0,U+2/3,T+1,0,U,T+1,0];A.set(y,v*g*C),_.set(f,m*g*C);const b=[C,C,C,C,C,C];S.set(b,p*g*C)}const M=new Si;M.setAttribute("position",new wi(A,v)),M.setAttribute("uv",new wi(_,m)),M.setAttribute("faceIndex",new wi(S,p)),e.push(M),r>dr&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Fd(n,e,t){const i=new pn(n,e,t);return i.texture.mapping=ss,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Gs(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Sv(n,e,t){const i=new Float32Array(bn),r=new W(0,1,0);return new nn({name:"SphericalGaussianBlur",defines:{n:bn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Xo(),fragmentShader:`

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
		`,blending:Xi,depthTest:!1,depthWrite:!1})}function Id(){return new nn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Xo(),fragmentShader:`

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
		`,blending:Xi,depthTest:!1,depthWrite:!1})}function Rd(){return new nn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Xo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Xi,depthTest:!1,depthWrite:!1})}function Xo(){return`

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
	`}function bv(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===Ra||l===Ba,d=l===kn||l===On;if(c||d){let h=e.get(o);const f=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return t===null&&(t=new Td(n)),h=c?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{const u=o.image;return c&&u&&u.height>0||d&&u&&r(u)?(t===null&&(t=new Td(n)),h=c?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",s),h.texture):null}}}return o}function r(o){let l=0;const c=6;for(let d=0;d<c;d++)o[d]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function xv(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&Zn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function Ev(n,e,t,i){const r={},s=new WeakMap;function a(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",a),delete r[f.id];const u=s.get(f);u&&(e.remove(u),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(h,f){return r[f.id]===!0||(f.addEventListener("dispose",a),r[f.id]=!0,t.memory.geometries++),f}function l(h){const f=h.attributes;for(const u in f)e.update(f[u],n.ARRAY_BUFFER)}function c(h){const f=[],u=h.index,g=h.attributes.position;let v=0;if(u!==null){const A=u.array;v=u.version;for(let _=0,S=A.length;_<S;_+=3){const M=A[_+0],C=A[_+1],U=A[_+2];f.push(M,C,C,U,U,M)}}else if(g!==void 0){const A=g.array;v=g.version;for(let _=0,S=A.length/3-1;_<S;_+=3){const M=_+0,C=_+1,U=_+2;f.push(M,C,C,U,U,M)}}else return;const m=new(Qc(f)?ed:$c)(f,1);m.version=v;const p=s.get(h);p&&e.remove(p),s.set(h,m)}function d(h){const f=s.get(h);if(f){const u=h.index;u!==null&&f.version<u.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:d}}function yv(n,e,t){let i;function r(f){i=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function l(f,u){n.drawElements(i,u,s,f*a),t.update(u,i,1)}function c(f,u,g){g!==0&&(n.drawElementsInstanced(i,u,s,f*a,g),t.update(u,i,g))}function d(f,u,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,s,f,0,g);let m=0;for(let p=0;p<g;p++)m+=u[p];t.update(m,i,1)}function h(f,u,g,v){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/a,u[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(i,u,0,s,f,0,v,0,g);let p=0;for(let A=0;A<g;A++)p+=u[A]*v[A];t.update(p,i,1)}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=h}function wv(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function Cv(n,e,t){const i=new WeakMap,r=new ft;function s(a,o,l){const c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=d!==void 0?d.length:0;let f=i.get(o);if(f===void 0||f.count!==h){let y=function(){U.dispose(),i.delete(o),o.removeEventListener("dispose",y)};f!==void 0&&f.texture.dispose();const u=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],A=o.morphAttributes.color||[];let _=0;u===!0&&(_=1),g===!0&&(_=2),v===!0&&(_=3);let S=o.attributes.position.count*_,M=1;S>e.maxTextureSize&&(M=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const C=new Float32Array(S*M*4*h),U=new kc(C,S,M,h);U.type=Bi,U.needsUpdate=!0;const T=_*4;for(let b=0;b<h;b++){const E=m[b],D=p[b],F=A[b],Q=S*M*4*b;for(let V=0;V<E.count;V++){const O=V*T;u===!0&&(r.fromBufferAttribute(E,V),C[Q+O+0]=r.x,C[Q+O+1]=r.y,C[Q+O+2]=r.z,C[Q+O+3]=0),g===!0&&(r.fromBufferAttribute(D,V),C[Q+O+4]=r.x,C[Q+O+5]=r.y,C[Q+O+6]=r.z,C[Q+O+7]=0),v===!0&&(r.fromBufferAttribute(F,V),C[Q+O+8]=r.x,C[Q+O+9]=r.y,C[Q+O+10]=r.z,C[Q+O+11]=F.itemSize===4?r.w:1)}}f={count:h,texture:U,size:new Qe(S,M)},i.set(o,f),o.addEventListener("dispose",y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let u=0;for(let v=0;v<c.length;v++)u+=c[v];const g=o.morphTargetsRelative?1:1-u;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:s}}function Uv(n,e,t,i){let r=new WeakMap;function s(l){const c=i.render.frame,d=l.geometry,h=e.get(l,d);if(r.get(h)!==c&&(e.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return h}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}const Bd=new Qt,Dd=new gd(1,1),Qd=new kc,Nd=new Ip,Ld=new ld,Pd=[],Vd=[],kd=new Float32Array(16),Od=new Float32Array(9),zd=new Float32Array(4);function ur(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Pd[r];if(s===void 0&&(s=new Float32Array(r),Pd[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function bt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function xt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Hs(n,e){let t=Vd[e];t===void 0&&(t=new Int32Array(e),Vd[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Mv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Tv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;n.uniform2fv(this.addr,e),xt(t,e)}}function Fv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(bt(t,e))return;n.uniform3fv(this.addr,e),xt(t,e)}}function Iv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;n.uniform4fv(this.addr,e),xt(t,e)}}function Rv(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(bt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),xt(t,e)}else{if(bt(t,i))return;zd.set(i),n.uniformMatrix2fv(this.addr,!1,zd),xt(t,i)}}function Bv(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(bt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),xt(t,e)}else{if(bt(t,i))return;Od.set(i),n.uniformMatrix3fv(this.addr,!1,Od),xt(t,i)}}function Dv(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(bt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),xt(t,e)}else{if(bt(t,i))return;kd.set(i),n.uniformMatrix4fv(this.addr,!1,kd),xt(t,i)}}function Qv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Nv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;n.uniform2iv(this.addr,e),xt(t,e)}}function Lv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;n.uniform3iv(this.addr,e),xt(t,e)}}function Pv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;n.uniform4iv(this.addr,e),xt(t,e)}}function Vv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function kv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;n.uniform2uiv(this.addr,e),xt(t,e)}}function Ov(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;n.uniform3uiv(this.addr,e),xt(t,e)}}function zv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;n.uniform4uiv(this.addr,e),xt(t,e)}}function Wv(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Dd.compareFunction=Rc,s=Dd):s=Bd,t.setTexture2D(e||s,r)}function Gv(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Nd,r)}function Hv(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Ld,r)}function Jv(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Qd,r)}function Zv(n){switch(n){case 5126:return Mv;case 35664:return Tv;case 35665:return Fv;case 35666:return Iv;case 35674:return Rv;case 35675:return Bv;case 35676:return Dv;case 5124:case 35670:return Qv;case 35667:case 35671:return Nv;case 35668:case 35672:return Lv;case 35669:case 35673:return Pv;case 5125:return Vv;case 36294:return kv;case 36295:return Ov;case 36296:return zv;case 35678:case 36198:case 36298:case 36306:case 35682:return Wv;case 35679:case 36299:case 36307:return Gv;case 35680:case 36300:case 36308:case 36293:return Hv;case 36289:case 36303:case 36311:case 36292:return Jv}}function Xv(n,e){n.uniform1fv(this.addr,e)}function Yv(n,e){const t=ur(e,this.size,2);n.uniform2fv(this.addr,t)}function Kv(n,e){const t=ur(e,this.size,3);n.uniform3fv(this.addr,t)}function jv(n,e){const t=ur(e,this.size,4);n.uniform4fv(this.addr,t)}function qv(n,e){const t=ur(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function $v(n,e){const t=ur(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function e0(n,e){const t=ur(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function t0(n,e){n.uniform1iv(this.addr,e)}function i0(n,e){n.uniform2iv(this.addr,e)}function n0(n,e){n.uniform3iv(this.addr,e)}function r0(n,e){n.uniform4iv(this.addr,e)}function s0(n,e){n.uniform1uiv(this.addr,e)}function a0(n,e){n.uniform2uiv(this.addr,e)}function o0(n,e){n.uniform3uiv(this.addr,e)}function l0(n,e){n.uniform4uiv(this.addr,e)}function c0(n,e,t){const i=this.cache,r=e.length,s=Hs(t,r);bt(i,s)||(n.uniform1iv(this.addr,s),xt(i,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||Bd,s[a])}function d0(n,e,t){const i=this.cache,r=e.length,s=Hs(t,r);bt(i,s)||(n.uniform1iv(this.addr,s),xt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Nd,s[a])}function h0(n,e,t){const i=this.cache,r=e.length,s=Hs(t,r);bt(i,s)||(n.uniform1iv(this.addr,s),xt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Ld,s[a])}function u0(n,e,t){const i=this.cache,r=e.length,s=Hs(t,r);bt(i,s)||(n.uniform1iv(this.addr,s),xt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Qd,s[a])}function f0(n){switch(n){case 5126:return Xv;case 35664:return Yv;case 35665:return Kv;case 35666:return jv;case 35674:return qv;case 35675:return $v;case 35676:return e0;case 5124:case 35670:return t0;case 35667:case 35671:return i0;case 35668:case 35672:return n0;case 35669:case 35673:return r0;case 5125:return s0;case 36294:return a0;case 36295:return o0;case 36296:return l0;case 35678:case 36198:case 36298:case 36306:case 35682:return c0;case 35679:case 36299:case 36307:return d0;case 35680:case 36300:case 36308:case 36293:return h0;case 36289:case 36303:case 36311:case 36292:return u0}}class p0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Zv(t.type)}}class m0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=f0(t.type)}}class g0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const Yo=/(\w+)(\])?(\[|\.)?/g;function Wd(n,e){n.seq.push(e),n.map[e.id]=e}function v0(n,e,t){const i=n.name,r=i.length;for(Yo.lastIndex=0;;){const s=Yo.exec(i),a=Yo.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Wd(t,c===void 0?new p0(o,n,e):new m0(o,n,e));break}else{let h=t.map[o];h===void 0&&(h=new g0(o),Wd(t,h)),t=h}}}class Js{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);v0(s,a,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function Gd(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const A0=37297;let _0=0;function S0(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const Hd=new Ne;function b0(n){ze._getMatrix(Hd,ze.workingColorSpace,n);const e=`mat3( ${Hd.elements.map(t=>t.toFixed(4))} )`;switch(ze.getTransfer(n)){case fs:return[e,"LinearTransferOETF"];case rt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Jd(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+S0(n.getShaderSource(e),a)}else return r}function x0(n,e){const t=b0(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function E0(n,e){let t;switch(e){case ip:t="Linear";break;case np:t="Reinhard";break;case rp:t="Cineon";break;case sp:t="ACESFilmic";break;case op:t="AgX";break;case lp:t="Neutral";break;case ap:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Zs=new W;function y0(){ze.getLuminanceCoefficients(Zs);const n=Zs.x.toFixed(4),e=Zs.y.toFixed(4),t=Zs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function w0(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Vr).join(`
`)}function C0(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function U0(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Vr(n){return n!==""}function Zd(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Xd(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const M0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ko(n){return n.replace(M0,F0)}const T0=new Map;function F0(n,e){let t=Ve[e];if(t===void 0){const i=T0.get(e);if(i!==void 0)t=Ve[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Ko(t)}const I0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Yd(n){return n.replace(I0,R0)}function R0(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Kd(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function B0(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===mc?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Qf?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Ti&&(e="SHADOWMAP_TYPE_VSM"),e}function D0(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case kn:case On:e="ENVMAP_TYPE_CUBE";break;case ss:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Q0(n){let e="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===On&&(e="ENVMAP_MODE_REFRACTION"),e}function N0(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Ia:e="ENVMAP_BLENDING_MULTIPLY";break;case ep:e="ENVMAP_BLENDING_MIX";break;case tp:e="ENVMAP_BLENDING_ADD";break}return e}function L0(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function P0(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=B0(t),c=D0(t),d=Q0(t),h=N0(t),f=L0(t),u=w0(t),g=C0(s),v=r.createProgram();let m,p,A=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Vr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Vr).join(`
`),p.length>0&&(p+=`
`)):(m=[Kd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Vr).join(`
`),p=[Kd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Yi?"#define TONE_MAPPING":"",t.toneMapping!==Yi?Ve.tonemapping_pars_fragment:"",t.toneMapping!==Yi?E0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,x0("linearToOutputTexel",t.outputColorSpace),y0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Vr).join(`
`)),a=Ko(a),a=Zd(a,t),a=Xd(a,t),o=Ko(o),o=Zd(o,t),o=Xd(o,t),a=Yd(a),o=Yd(o),t.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,m=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Dc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Dc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const _=A+m+a,S=A+p+o,M=Gd(r,r.VERTEX_SHADER,_),C=Gd(r,r.FRAGMENT_SHADER,S);r.attachShader(v,M),r.attachShader(v,C),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function U(E){if(n.debug.checkShaderErrors){const D=r.getProgramInfoLog(v).trim(),F=r.getShaderInfoLog(M).trim(),Q=r.getShaderInfoLog(C).trim();let V=!0,O=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(V=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,v,M,C);else{const B=Jd(r,M,"vertex"),R=Jd(r,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+E.name+`
Material Type: `+E.type+`

Program Info Log: `+D+`
`+B+`
`+R)}else D!==""?console.warn("THREE.WebGLProgram: Program Info Log:",D):(F===""||Q==="")&&(O=!1);O&&(E.diagnostics={runnable:V,programLog:D,vertexShader:{log:F,prefix:m},fragmentShader:{log:Q,prefix:p}})}r.deleteShader(M),r.deleteShader(C),T=new Js(r,v),y=U0(r,v)}let T;this.getUniforms=function(){return T===void 0&&U(this),T};let y;this.getAttributes=function(){return y===void 0&&U(this),y};let b=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=r.getProgramParameter(v,A0)),b},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=_0++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=M,this.fragmentShader=C,this}let V0=0;class k0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new O0(e),t.set(e,i)),i}}class O0{constructor(e){this.id=V0++,this.code=e,this.usedTimes=0}}function z0(n,e,t,i,r,s,a){const o=new Gc,l=new k0,c=new Set,d=[],h=r.logarithmicDepthBuffer,f=r.vertexTextures;let u=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(y){return c.add(y),y===0?"uv":`uv${y}`}function m(y,b,E,D,F){const Q=D.fog,V=F.geometry,O=y.isMeshStandardMaterial?D.environment:null,B=(y.isMeshStandardMaterial?t:e).get(y.envMap||O),R=B&&B.mapping===ss?B.image.height:null,Z=g[y.type];y.precision!==null&&(u=r.getMaxPrecision(y.precision),u!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",u,"instead."));const K=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,ae=K!==void 0?K.length:0;let Me=0;V.morphAttributes.position!==void 0&&(Me=1),V.morphAttributes.normal!==void 0&&(Me=2),V.morphAttributes.color!==void 0&&(Me=3);let Be,k,Y,re;if(Z){const nt=Ci[Z];Be=nt.vertexShader,k=nt.fragmentShader}else Be=y.vertexShader,k=y.fragmentShader,l.update(y),Y=l.getVertexShaderID(y),re=l.getFragmentShaderID(y);const ee=n.getRenderTarget(),ge=n.state.buffers.depth.getReversed(),be=F.isInstancedMesh===!0,Fe=F.isBatchedMesh===!0,ut=!!y.map,Xe=!!y.matcap,gt=!!B,N=!!y.aoMap,ai=!!y.lightMap,We=!!y.bumpMap,Ge=!!y.normalMap,xe=!!y.displacementMap,ot=!!y.emissiveMap,Ee=!!y.metalnessMap,I=!!y.roughnessMap,x=y.anisotropy>0,G=y.clearcoat>0,q=y.dispersion>0,te=y.iridescence>0,j=y.sheen>0,_e=y.transmission>0,ce=x&&!!y.anisotropyMap,fe=G&&!!y.clearcoatMap,Ye=G&&!!y.clearcoatNormalMap,ne=G&&!!y.clearcoatRoughnessMap,pe=te&&!!y.iridescenceMap,Te=te&&!!y.iridescenceThicknessMap,Ie=j&&!!y.sheenColorMap,me=j&&!!y.sheenRoughnessMap,He=!!y.specularMap,ke=!!y.specularColorMap,at=!!y.specularIntensityMap,L=_e&&!!y.transmissionMap,oe=_e&&!!y.thicknessMap,X=!!y.gradientMap,$=!!y.alphaMap,he=y.alphaTest>0,de=!!y.alphaHash,Le=!!y.extensions;let pt=Yi;y.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(pt=n.toneMapping);const Rt={shaderID:Z,shaderType:y.type,shaderName:y.name,vertexShader:Be,fragmentShader:k,defines:y.defines,customVertexShaderID:Y,customFragmentShaderID:re,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:u,batching:Fe,batchingColor:Fe&&F._colorsTexture!==null,instancing:be,instancingColor:be&&F.instanceColor!==null,instancingMorph:be&&F.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ee===null?n.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:Hn,alphaToCoverage:!!y.alphaToCoverage,map:ut,matcap:Xe,envMap:gt,envMapMode:gt&&B.mapping,envMapCubeUVHeight:R,aoMap:N,lightMap:ai,bumpMap:We,normalMap:Ge,displacementMap:f&&xe,emissiveMap:ot,normalMapObjectSpace:Ge&&y.normalMapType===up,normalMapTangentSpace:Ge&&y.normalMapType===Fc,metalnessMap:Ee,roughnessMap:I,anisotropy:x,anisotropyMap:ce,clearcoat:G,clearcoatMap:fe,clearcoatNormalMap:Ye,clearcoatRoughnessMap:ne,dispersion:q,iridescence:te,iridescenceMap:pe,iridescenceThicknessMap:Te,sheen:j,sheenColorMap:Ie,sheenRoughnessMap:me,specularMap:He,specularColorMap:ke,specularIntensityMap:at,transmission:_e,transmissionMap:L,thicknessMap:oe,gradientMap:X,opaque:y.transparent===!1&&y.blending===Pn&&y.alphaToCoverage===!1,alphaMap:$,alphaTest:he,alphaHash:de,combine:y.combine,mapUv:ut&&v(y.map.channel),aoMapUv:N&&v(y.aoMap.channel),lightMapUv:ai&&v(y.lightMap.channel),bumpMapUv:We&&v(y.bumpMap.channel),normalMapUv:Ge&&v(y.normalMap.channel),displacementMapUv:xe&&v(y.displacementMap.channel),emissiveMapUv:ot&&v(y.emissiveMap.channel),metalnessMapUv:Ee&&v(y.metalnessMap.channel),roughnessMapUv:I&&v(y.roughnessMap.channel),anisotropyMapUv:ce&&v(y.anisotropyMap.channel),clearcoatMapUv:fe&&v(y.clearcoatMap.channel),clearcoatNormalMapUv:Ye&&v(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ne&&v(y.clearcoatRoughnessMap.channel),iridescenceMapUv:pe&&v(y.iridescenceMap.channel),iridescenceThicknessMapUv:Te&&v(y.iridescenceThicknessMap.channel),sheenColorMapUv:Ie&&v(y.sheenColorMap.channel),sheenRoughnessMapUv:me&&v(y.sheenRoughnessMap.channel),specularMapUv:He&&v(y.specularMap.channel),specularColorMapUv:ke&&v(y.specularColorMap.channel),specularIntensityMapUv:at&&v(y.specularIntensityMap.channel),transmissionMapUv:L&&v(y.transmissionMap.channel),thicknessMapUv:oe&&v(y.thicknessMap.channel),alphaMapUv:$&&v(y.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(Ge||x),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!V.attributes.uv&&(ut||$),fog:!!Q,useFog:y.fog===!0,fogExp2:!!Q&&Q.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:ge,skinning:F.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:ae,morphTextureStride:Me,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&E.length>0,shadowMapType:n.shadowMap.type,toneMapping:pt,decodeVideoTexture:ut&&y.map.isVideoTexture===!0&&ze.getTransfer(y.map.colorSpace)===rt,decodeVideoTextureEmissive:ot&&y.emissiveMap.isVideoTexture===!0&&ze.getTransfer(y.emissiveMap.colorSpace)===rt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Ii,flipSided:y.side===Ot,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Le&&y.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Le&&y.extensions.multiDraw===!0||Fe)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Rt.vertexUv1s=c.has(1),Rt.vertexUv2s=c.has(2),Rt.vertexUv3s=c.has(3),c.clear(),Rt}function p(y){const b=[];if(y.shaderID?b.push(y.shaderID):(b.push(y.customVertexShaderID),b.push(y.customFragmentShaderID)),y.defines!==void 0)for(const E in y.defines)b.push(E),b.push(y.defines[E]);return y.isRawShaderMaterial===!1&&(A(b,y),_(b,y),b.push(n.outputColorSpace)),b.push(y.customProgramCacheKey),b.join()}function A(y,b){y.push(b.precision),y.push(b.outputColorSpace),y.push(b.envMapMode),y.push(b.envMapCubeUVHeight),y.push(b.mapUv),y.push(b.alphaMapUv),y.push(b.lightMapUv),y.push(b.aoMapUv),y.push(b.bumpMapUv),y.push(b.normalMapUv),y.push(b.displacementMapUv),y.push(b.emissiveMapUv),y.push(b.metalnessMapUv),y.push(b.roughnessMapUv),y.push(b.anisotropyMapUv),y.push(b.clearcoatMapUv),y.push(b.clearcoatNormalMapUv),y.push(b.clearcoatRoughnessMapUv),y.push(b.iridescenceMapUv),y.push(b.iridescenceThicknessMapUv),y.push(b.sheenColorMapUv),y.push(b.sheenRoughnessMapUv),y.push(b.specularMapUv),y.push(b.specularColorMapUv),y.push(b.specularIntensityMapUv),y.push(b.transmissionMapUv),y.push(b.thicknessMapUv),y.push(b.combine),y.push(b.fogExp2),y.push(b.sizeAttenuation),y.push(b.morphTargetsCount),y.push(b.morphAttributeCount),y.push(b.numDirLights),y.push(b.numPointLights),y.push(b.numSpotLights),y.push(b.numSpotLightMaps),y.push(b.numHemiLights),y.push(b.numRectAreaLights),y.push(b.numDirLightShadows),y.push(b.numPointLightShadows),y.push(b.numSpotLightShadows),y.push(b.numSpotLightShadowsWithMaps),y.push(b.numLightProbes),y.push(b.shadowMapType),y.push(b.toneMapping),y.push(b.numClippingPlanes),y.push(b.numClipIntersection),y.push(b.depthPacking)}function _(y,b){o.disableAll(),b.supportsVertexTextures&&o.enable(0),b.instancing&&o.enable(1),b.instancingColor&&o.enable(2),b.instancingMorph&&o.enable(3),b.matcap&&o.enable(4),b.envMap&&o.enable(5),b.normalMapObjectSpace&&o.enable(6),b.normalMapTangentSpace&&o.enable(7),b.clearcoat&&o.enable(8),b.iridescence&&o.enable(9),b.alphaTest&&o.enable(10),b.vertexColors&&o.enable(11),b.vertexAlphas&&o.enable(12),b.vertexUv1s&&o.enable(13),b.vertexUv2s&&o.enable(14),b.vertexUv3s&&o.enable(15),b.vertexTangents&&o.enable(16),b.anisotropy&&o.enable(17),b.alphaHash&&o.enable(18),b.batching&&o.enable(19),b.dispersion&&o.enable(20),b.batchingColor&&o.enable(21),y.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reverseDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),y.push(o.mask)}function S(y){const b=g[y.type];let E;if(b){const D=Ci[b];E=Wp.clone(D.uniforms)}else E=y.uniforms;return E}function M(y,b){let E;for(let D=0,F=d.length;D<F;D++){const Q=d[D];if(Q.cacheKey===b){E=Q,++E.usedTimes;break}}return E===void 0&&(E=new P0(n,b,y,s),d.push(E)),E}function C(y){if(--y.usedTimes===0){const b=d.indexOf(y);d[b]=d[d.length-1],d.pop(),y.destroy()}}function U(y){l.remove(y)}function T(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:S,acquireProgram:M,releaseProgram:C,releaseShaderCache:U,programs:d,dispose:T}}function W0(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function G0(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function jd(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function qd(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(h,f,u,g,v,m){let p=n[e];return p===void 0?(p={id:h.id,object:h,geometry:f,material:u,groupOrder:g,renderOrder:h.renderOrder,z:v,group:m},n[e]=p):(p.id=h.id,p.object=h,p.geometry=f,p.material=u,p.groupOrder=g,p.renderOrder=h.renderOrder,p.z=v,p.group=m),e++,p}function o(h,f,u,g,v,m){const p=a(h,f,u,g,v,m);u.transmission>0?i.push(p):u.transparent===!0?r.push(p):t.push(p)}function l(h,f,u,g,v,m){const p=a(h,f,u,g,v,m);u.transmission>0?i.unshift(p):u.transparent===!0?r.unshift(p):t.unshift(p)}function c(h,f){t.length>1&&t.sort(h||G0),i.length>1&&i.sort(f||jd),r.length>1&&r.sort(f||jd)}function d(){for(let h=e,f=n.length;h<f;h++){const u=n[h];if(u.id===null)break;u.id=null,u.object=null,u.geometry=null,u.material=null,u.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:o,unshift:l,finish:d,sort:c}}function H0(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new qd,n.set(i,[a])):r>=s.length?(a=new qd,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function J0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new W,color:new Pe};break;case"SpotLight":t={position:new W,direction:new W,color:new Pe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new W,color:new Pe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new W,skyColor:new Pe,groundColor:new Pe};break;case"RectAreaLight":t={color:new Pe,position:new W,halfWidth:new W,halfHeight:new W};break}return n[e.id]=t,t}}}function Z0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let X0=0;function Y0(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function K0(n){const e=new J0,t=Z0(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new W);const r=new W,s=new ct,a=new ct;function o(c){let d=0,h=0,f=0;for(let y=0;y<9;y++)i.probe[y].set(0,0,0);let u=0,g=0,v=0,m=0,p=0,A=0,_=0,S=0,M=0,C=0,U=0;c.sort(Y0);for(let y=0,b=c.length;y<b;y++){const E=c[y],D=E.color,F=E.intensity,Q=E.distance,V=E.shadow&&E.shadow.map?E.shadow.map.texture:null;if(E.isAmbientLight)d+=D.r*F,h+=D.g*F,f+=D.b*F;else if(E.isLightProbe){for(let O=0;O<9;O++)i.probe[O].addScaledVector(E.sh.coefficients[O],F);U++}else if(E.isDirectionalLight){const O=e.get(E);if(O.color.copy(E.color).multiplyScalar(E.intensity),E.castShadow){const B=E.shadow,R=t.get(E);R.shadowIntensity=B.intensity,R.shadowBias=B.bias,R.shadowNormalBias=B.normalBias,R.shadowRadius=B.radius,R.shadowMapSize=B.mapSize,i.directionalShadow[u]=R,i.directionalShadowMap[u]=V,i.directionalShadowMatrix[u]=E.shadow.matrix,A++}i.directional[u]=O,u++}else if(E.isSpotLight){const O=e.get(E);O.position.setFromMatrixPosition(E.matrixWorld),O.color.copy(D).multiplyScalar(F),O.distance=Q,O.coneCos=Math.cos(E.angle),O.penumbraCos=Math.cos(E.angle*(1-E.penumbra)),O.decay=E.decay,i.spot[v]=O;const B=E.shadow;if(E.map&&(i.spotLightMap[M]=E.map,M++,B.updateMatrices(E),E.castShadow&&C++),i.spotLightMatrix[v]=B.matrix,E.castShadow){const R=t.get(E);R.shadowIntensity=B.intensity,R.shadowBias=B.bias,R.shadowNormalBias=B.normalBias,R.shadowRadius=B.radius,R.shadowMapSize=B.mapSize,i.spotShadow[v]=R,i.spotShadowMap[v]=V,S++}v++}else if(E.isRectAreaLight){const O=e.get(E);O.color.copy(D).multiplyScalar(F),O.halfWidth.set(E.width*.5,0,0),O.halfHeight.set(0,E.height*.5,0),i.rectArea[m]=O,m++}else if(E.isPointLight){const O=e.get(E);if(O.color.copy(E.color).multiplyScalar(E.intensity),O.distance=E.distance,O.decay=E.decay,E.castShadow){const B=E.shadow,R=t.get(E);R.shadowIntensity=B.intensity,R.shadowBias=B.bias,R.shadowNormalBias=B.normalBias,R.shadowRadius=B.radius,R.shadowMapSize=B.mapSize,R.shadowCameraNear=B.camera.near,R.shadowCameraFar=B.camera.far,i.pointShadow[g]=R,i.pointShadowMap[g]=V,i.pointShadowMatrix[g]=E.shadow.matrix,_++}i.point[g]=O,g++}else if(E.isHemisphereLight){const O=e.get(E);O.skyColor.copy(E.color).multiplyScalar(F),O.groundColor.copy(E.groundColor).multiplyScalar(F),i.hemi[p]=O,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=se.LTC_FLOAT_1,i.rectAreaLTC2=se.LTC_FLOAT_2):(i.rectAreaLTC1=se.LTC_HALF_1,i.rectAreaLTC2=se.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=h,i.ambient[2]=f;const T=i.hash;(T.directionalLength!==u||T.pointLength!==g||T.spotLength!==v||T.rectAreaLength!==m||T.hemiLength!==p||T.numDirectionalShadows!==A||T.numPointShadows!==_||T.numSpotShadows!==S||T.numSpotMaps!==M||T.numLightProbes!==U)&&(i.directional.length=u,i.spot.length=v,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=A,i.directionalShadowMap.length=A,i.pointShadow.length=_,i.pointShadowMap.length=_,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=A,i.pointShadowMatrix.length=_,i.spotLightMatrix.length=S+M-C,i.spotLightMap.length=M,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=U,T.directionalLength=u,T.pointLength=g,T.spotLength=v,T.rectAreaLength=m,T.hemiLength=p,T.numDirectionalShadows=A,T.numPointShadows=_,T.numSpotShadows=S,T.numSpotMaps=M,T.numLightProbes=U,i.version=X0++)}function l(c,d){let h=0,f=0,u=0,g=0,v=0;const m=d.matrixWorldInverse;for(let p=0,A=c.length;p<A;p++){const _=c[p];if(_.isDirectionalLight){const S=i.directional[h];S.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),h++}else if(_.isSpotLight){const S=i.spot[u];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),u++}else if(_.isRectAreaLight){const S=i.rectArea[g];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(m),a.identity(),s.copy(_.matrixWorld),s.premultiply(m),a.extractRotation(s),S.halfWidth.set(_.width*.5,0,0),S.halfHeight.set(0,_.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),g++}else if(_.isPointLight){const S=i.point[f];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(m),f++}else if(_.isHemisphereLight){const S=i.hemi[v];S.direction.setFromMatrixPosition(_.matrixWorld),S.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:i}}function $d(n){const e=new K0(n),t=[],i=[];function r(d){c.camera=d,t.length=0,i.length=0}function s(d){t.push(d)}function a(d){i.push(d)}function o(){e.setup(t)}function l(d){e.setupView(t,d)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function j0(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new $d(n),e.set(r,[o])):s>=a.length?(o=new $d(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const q0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,$0=`uniform sampler2D shadow_pass;
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
}`;function eA(n,e,t){let i=new Lo;const r=new Qe,s=new Qe,a=new ft,o=new qp({depthPacking:hp}),l=new $p,c={},d=t.maxTextureSize,h={[Fi]:Ot,[Ot]:Fi,[Ii]:Ii},f=new nn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Qe},radius:{value:4}},vertexShader:q0,fragmentShader:$0}),u=f.clone();u.defines.HORIZONTAL_PASS=1;const g=new Si;g.setAttribute("position",new wi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Wt(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=mc;let p=this.type;this.render=function(C,U,T){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;const y=n.getRenderTarget(),b=n.getActiveCubeFace(),E=n.getActiveMipmapLevel(),D=n.state;D.setBlending(Xi),D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const F=p!==Ti&&this.type===Ti,Q=p===Ti&&this.type!==Ti;for(let V=0,O=C.length;V<O;V++){const B=C[V],R=B.shadow;if(R===void 0){console.warn("THREE.WebGLShadowMap:",B,"has no shadow.");continue}if(R.autoUpdate===!1&&R.needsUpdate===!1)continue;r.copy(R.mapSize);const Z=R.getFrameExtents();if(r.multiply(Z),s.copy(R.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(s.x=Math.floor(d/Z.x),r.x=s.x*Z.x,R.mapSize.x=s.x),r.y>d&&(s.y=Math.floor(d/Z.y),r.y=s.y*Z.y,R.mapSize.y=s.y)),R.map===null||F===!0||Q===!0){const ae=this.type!==Ti?{minFilter:pi,magFilter:pi}:{};R.map!==null&&R.map.dispose(),R.map=new pn(r.x,r.y,ae),R.map.texture.name=B.name+".shadowMap",R.camera.updateProjectionMatrix()}n.setRenderTarget(R.map),n.clear();const K=R.getViewportCount();for(let ae=0;ae<K;ae++){const Me=R.getViewport(ae);a.set(s.x*Me.x,s.y*Me.y,s.x*Me.z,s.y*Me.w),D.viewport(a),R.updateMatrices(B,ae),i=R.getFrustum(),S(U,T,R.camera,B,this.type)}R.isPointLightShadow!==!0&&this.type===Ti&&A(R,T),R.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(y,b,E)};function A(C,U){const T=e.update(v);f.defines.VSM_SAMPLES!==C.blurSamples&&(f.defines.VSM_SAMPLES=C.blurSamples,u.defines.VSM_SAMPLES=C.blurSamples,f.needsUpdate=!0,u.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new pn(r.x,r.y)),f.uniforms.shadow_pass.value=C.map.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,n.setRenderTarget(C.mapPass),n.clear(),n.renderBufferDirect(U,null,T,f,v,null),u.uniforms.shadow_pass.value=C.mapPass.texture,u.uniforms.resolution.value=C.mapSize,u.uniforms.radius.value=C.radius,n.setRenderTarget(C.map),n.clear(),n.renderBufferDirect(U,null,T,u,v,null)}function _(C,U,T,y){let b=null;const E=T.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(E!==void 0)b=E;else if(b=T.isPointLight===!0?l:o,n.localClippingEnabled&&U.clipShadows===!0&&Array.isArray(U.clippingPlanes)&&U.clippingPlanes.length!==0||U.displacementMap&&U.displacementScale!==0||U.alphaMap&&U.alphaTest>0||U.map&&U.alphaTest>0){const D=b.uuid,F=U.uuid;let Q=c[D];Q===void 0&&(Q={},c[D]=Q);let V=Q[F];V===void 0&&(V=b.clone(),Q[F]=V,U.addEventListener("dispose",M)),b=V}if(b.visible=U.visible,b.wireframe=U.wireframe,y===Ti?b.side=U.shadowSide!==null?U.shadowSide:U.side:b.side=U.shadowSide!==null?U.shadowSide:h[U.side],b.alphaMap=U.alphaMap,b.alphaTest=U.alphaTest,b.map=U.map,b.clipShadows=U.clipShadows,b.clippingPlanes=U.clippingPlanes,b.clipIntersection=U.clipIntersection,b.displacementMap=U.displacementMap,b.displacementScale=U.displacementScale,b.displacementBias=U.displacementBias,b.wireframeLinewidth=U.wireframeLinewidth,b.linewidth=U.linewidth,T.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const D=n.properties.get(b);D.light=T}return b}function S(C,U,T,y,b){if(C.visible===!1)return;if(C.layers.test(U.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&b===Ti)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,C.matrixWorld);const F=e.update(C),Q=C.material;if(Array.isArray(Q)){const V=F.groups;for(let O=0,B=V.length;O<B;O++){const R=V[O],Z=Q[R.materialIndex];if(Z&&Z.visible){const K=_(C,Z,y,b);C.onBeforeShadow(n,C,U,T,F,K,R),n.renderBufferDirect(T,null,F,K,C,R),C.onAfterShadow(n,C,U,T,F,K,R)}}}else if(Q.visible){const V=_(C,Q,y,b);C.onBeforeShadow(n,C,U,T,F,V,null),n.renderBufferDirect(T,null,F,V,C,null),C.onAfterShadow(n,C,U,T,F,V,null)}}const D=C.children;for(let F=0,Q=D.length;F<Q;F++)S(D[F],U,T,y,b)}function M(C){C.target.removeEventListener("dispose",M);for(const T in c){const y=c[T],b=C.target.uuid;b in y&&(y[b].dispose(),delete y[b])}}}const tA={[ya]:wa,[Ca]:Ta,[Ua]:Fa,[Vn]:Ma,[wa]:ya,[Ta]:Ca,[Fa]:Ua,[Ma]:Vn};function iA(n,e){function t(){let L=!1;const oe=new ft;let X=null;const $=new ft(0,0,0,0);return{setMask:function(he){X!==he&&!L&&(n.colorMask(he,he,he,he),X=he)},setLocked:function(he){L=he},setClear:function(he,de,Le,pt,Rt){Rt===!0&&(he*=pt,de*=pt,Le*=pt),oe.set(he,de,Le,pt),$.equals(oe)===!1&&(n.clearColor(he,de,Le,pt),$.copy(oe))},reset:function(){L=!1,X=null,$.set(-1,0,0,0)}}}function i(){let L=!1,oe=!1,X=null,$=null,he=null;return{setReversed:function(de){if(oe!==de){const Le=e.get("EXT_clip_control");oe?Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.ZERO_TO_ONE_EXT):Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.NEGATIVE_ONE_TO_ONE_EXT);const pt=he;he=null,this.setClear(pt)}oe=de},getReversed:function(){return oe},setTest:function(de){de?ee(n.DEPTH_TEST):ge(n.DEPTH_TEST)},setMask:function(de){X!==de&&!L&&(n.depthMask(de),X=de)},setFunc:function(de){if(oe&&(de=tA[de]),$!==de){switch(de){case ya:n.depthFunc(n.NEVER);break;case wa:n.depthFunc(n.ALWAYS);break;case Ca:n.depthFunc(n.LESS);break;case Vn:n.depthFunc(n.LEQUAL);break;case Ua:n.depthFunc(n.EQUAL);break;case Ma:n.depthFunc(n.GEQUAL);break;case Ta:n.depthFunc(n.GREATER);break;case Fa:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}$=de}},setLocked:function(de){L=de},setClear:function(de){he!==de&&(oe&&(de=1-de),n.clearDepth(de),he=de)},reset:function(){L=!1,X=null,$=null,he=null,oe=!1}}}function r(){let L=!1,oe=null,X=null,$=null,he=null,de=null,Le=null,pt=null,Rt=null;return{setTest:function(nt){L||(nt?ee(n.STENCIL_TEST):ge(n.STENCIL_TEST))},setMask:function(nt){oe!==nt&&!L&&(n.stencilMask(nt),oe=nt)},setFunc:function(nt,bi,Wi){(X!==nt||$!==bi||he!==Wi)&&(n.stencilFunc(nt,bi,Wi),X=nt,$=bi,he=Wi)},setOp:function(nt,bi,Wi){(de!==nt||Le!==bi||pt!==Wi)&&(n.stencilOp(nt,bi,Wi),de=nt,Le=bi,pt=Wi)},setLocked:function(nt){L=nt},setClear:function(nt){Rt!==nt&&(n.clearStencil(nt),Rt=nt)},reset:function(){L=!1,oe=null,X=null,$=null,he=null,de=null,Le=null,pt=null,Rt=null}}}const s=new t,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let d={},h={},f=new WeakMap,u=[],g=null,v=!1,m=null,p=null,A=null,_=null,S=null,M=null,C=null,U=new Pe(0,0,0),T=0,y=!1,b=null,E=null,D=null,F=null,Q=null;const V=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,B=0;const R=n.getParameter(n.VERSION);R.indexOf("WebGL")!==-1?(B=parseFloat(/^WebGL (\d)/.exec(R)[1]),O=B>=1):R.indexOf("OpenGL ES")!==-1&&(B=parseFloat(/^OpenGL ES (\d)/.exec(R)[1]),O=B>=2);let Z=null,K={};const ae=n.getParameter(n.SCISSOR_BOX),Me=n.getParameter(n.VIEWPORT),Be=new ft().fromArray(ae),k=new ft().fromArray(Me);function Y(L,oe,X,$){const he=new Uint8Array(4),de=n.createTexture();n.bindTexture(L,de),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Le=0;Le<X;Le++)L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY?n.texImage3D(oe,0,n.RGBA,1,1,$,0,n.RGBA,n.UNSIGNED_BYTE,he):n.texImage2D(oe+Le,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,he);return de}const re={};re[n.TEXTURE_2D]=Y(n.TEXTURE_2D,n.TEXTURE_2D,1),re[n.TEXTURE_CUBE_MAP]=Y(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),re[n.TEXTURE_2D_ARRAY]=Y(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),re[n.TEXTURE_3D]=Y(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ee(n.DEPTH_TEST),a.setFunc(Vn),We(!1),Ge(pc),ee(n.CULL_FACE),N(Xi);function ee(L){d[L]!==!0&&(n.enable(L),d[L]=!0)}function ge(L){d[L]!==!1&&(n.disable(L),d[L]=!1)}function be(L,oe){return h[L]!==oe?(n.bindFramebuffer(L,oe),h[L]=oe,L===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=oe),L===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=oe),!0):!1}function Fe(L,oe){let X=u,$=!1;if(L){X=f.get(oe),X===void 0&&(X=[],f.set(oe,X));const he=L.textures;if(X.length!==he.length||X[0]!==n.COLOR_ATTACHMENT0){for(let de=0,Le=he.length;de<Le;de++)X[de]=n.COLOR_ATTACHMENT0+de;X.length=he.length,$=!0}}else X[0]!==n.BACK&&(X[0]=n.BACK,$=!0);$&&n.drawBuffers(X)}function ut(L){return g!==L?(n.useProgram(L),g=L,!0):!1}const Xe={[cn]:n.FUNC_ADD,[Lf]:n.FUNC_SUBTRACT,[Pf]:n.FUNC_REVERSE_SUBTRACT};Xe[Vf]=n.MIN,Xe[kf]=n.MAX;const gt={[Of]:n.ZERO,[zf]:n.ONE,[Wf]:n.SRC_COLOR,[xa]:n.SRC_ALPHA,[Yf]:n.SRC_ALPHA_SATURATE,[Zf]:n.DST_COLOR,[Hf]:n.DST_ALPHA,[Gf]:n.ONE_MINUS_SRC_COLOR,[Ea]:n.ONE_MINUS_SRC_ALPHA,[Xf]:n.ONE_MINUS_DST_COLOR,[Jf]:n.ONE_MINUS_DST_ALPHA,[Kf]:n.CONSTANT_COLOR,[jf]:n.ONE_MINUS_CONSTANT_COLOR,[qf]:n.CONSTANT_ALPHA,[$f]:n.ONE_MINUS_CONSTANT_ALPHA};function N(L,oe,X,$,he,de,Le,pt,Rt,nt){if(L===Xi){v===!0&&(ge(n.BLEND),v=!1);return}if(v===!1&&(ee(n.BLEND),v=!0),L!==Nf){if(L!==m||nt!==y){if((p!==cn||S!==cn)&&(n.blendEquation(n.FUNC_ADD),p=cn,S=cn),nt)switch(L){case Pn:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case gc:n.blendFunc(n.ONE,n.ONE);break;case vc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ac:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case Pn:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case gc:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case vc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ac:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}A=null,_=null,M=null,C=null,U.set(0,0,0),T=0,m=L,y=nt}return}he=he||oe,de=de||X,Le=Le||$,(oe!==p||he!==S)&&(n.blendEquationSeparate(Xe[oe],Xe[he]),p=oe,S=he),(X!==A||$!==_||de!==M||Le!==C)&&(n.blendFuncSeparate(gt[X],gt[$],gt[de],gt[Le]),A=X,_=$,M=de,C=Le),(pt.equals(U)===!1||Rt!==T)&&(n.blendColor(pt.r,pt.g,pt.b,Rt),U.copy(pt),T=Rt),m=L,y=!1}function ai(L,oe){L.side===Ii?ge(n.CULL_FACE):ee(n.CULL_FACE);let X=L.side===Ot;oe&&(X=!X),We(X),L.blending===Pn&&L.transparent===!1?N(Xi):N(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),s.setMask(L.colorWrite);const $=L.stencilWrite;o.setTest($),$&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),ot(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ee(n.SAMPLE_ALPHA_TO_COVERAGE):ge(n.SAMPLE_ALPHA_TO_COVERAGE)}function We(L){b!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),b=L)}function Ge(L){L!==Bf?(ee(n.CULL_FACE),L!==E&&(L===pc?n.cullFace(n.BACK):L===Df?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ge(n.CULL_FACE),E=L}function xe(L){L!==D&&(O&&n.lineWidth(L),D=L)}function ot(L,oe,X){L?(ee(n.POLYGON_OFFSET_FILL),(F!==oe||Q!==X)&&(n.polygonOffset(oe,X),F=oe,Q=X)):ge(n.POLYGON_OFFSET_FILL)}function Ee(L){L?ee(n.SCISSOR_TEST):ge(n.SCISSOR_TEST)}function I(L){L===void 0&&(L=n.TEXTURE0+V-1),Z!==L&&(n.activeTexture(L),Z=L)}function x(L,oe,X){X===void 0&&(Z===null?X=n.TEXTURE0+V-1:X=Z);let $=K[X];$===void 0&&($={type:void 0,texture:void 0},K[X]=$),($.type!==L||$.texture!==oe)&&(Z!==X&&(n.activeTexture(X),Z=X),n.bindTexture(L,oe||re[L]),$.type=L,$.texture=oe)}function G(){const L=K[Z];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function q(){try{n.compressedTexImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function te(){try{n.compressedTexImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function j(){try{n.texSubImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function _e(){try{n.texSubImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ce(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function fe(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ye(){try{n.texStorage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ne(){try{n.texStorage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function pe(){try{n.texImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Te(){try{n.texImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ie(L){Be.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),Be.copy(L))}function me(L){k.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),k.copy(L))}function He(L,oe){let X=c.get(oe);X===void 0&&(X=new WeakMap,c.set(oe,X));let $=X.get(L);$===void 0&&($=n.getUniformBlockIndex(oe,L.name),X.set(L,$))}function ke(L,oe){const $=c.get(oe).get(L);l.get(oe)!==$&&(n.uniformBlockBinding(oe,$,L.__bindingPointIndex),l.set(oe,$))}function at(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),d={},Z=null,K={},h={},f=new WeakMap,u=[],g=null,v=!1,m=null,p=null,A=null,_=null,S=null,M=null,C=null,U=new Pe(0,0,0),T=0,y=!1,b=null,E=null,D=null,F=null,Q=null,Be.set(0,0,n.canvas.width,n.canvas.height),k.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ee,disable:ge,bindFramebuffer:be,drawBuffers:Fe,useProgram:ut,setBlending:N,setMaterial:ai,setFlipSided:We,setCullFace:Ge,setLineWidth:xe,setPolygonOffset:ot,setScissorTest:Ee,activeTexture:I,bindTexture:x,unbindTexture:G,compressedTexImage2D:q,compressedTexImage3D:te,texImage2D:pe,texImage3D:Te,updateUBOMapping:He,uniformBlockBinding:ke,texStorage2D:Ye,texStorage3D:ne,texSubImage2D:j,texSubImage3D:_e,compressedTexSubImage2D:ce,compressedTexSubImage3D:fe,scissor:Ie,viewport:me,reset:at}}function nA(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Qe,d=new WeakMap;let h;const f=new WeakMap;let u=!1;try{u=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(I,x){return u?new OffscreenCanvas(I,x):Tr("canvas")}function v(I,x,G){let q=1;const te=Ee(I);if((te.width>G||te.height>G)&&(q=G/Math.max(te.width,te.height)),q<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const j=Math.floor(q*te.width),_e=Math.floor(q*te.height);h===void 0&&(h=g(j,_e));const ce=x?g(j,_e):h;return ce.width=j,ce.height=_e,ce.getContext("2d").drawImage(I,0,0,j,_e),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+j+"x"+_e+")."),ce}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),I;return I}function m(I){return I.generateMipmaps}function p(I){n.generateMipmap(I)}function A(I){return I.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?n.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function _(I,x,G,q,te=!1){if(I!==null){if(n[I]!==void 0)return n[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let j=x;if(x===n.RED&&(G===n.FLOAT&&(j=n.R32F),G===n.HALF_FLOAT&&(j=n.R16F),G===n.UNSIGNED_BYTE&&(j=n.R8)),x===n.RED_INTEGER&&(G===n.UNSIGNED_BYTE&&(j=n.R8UI),G===n.UNSIGNED_SHORT&&(j=n.R16UI),G===n.UNSIGNED_INT&&(j=n.R32UI),G===n.BYTE&&(j=n.R8I),G===n.SHORT&&(j=n.R16I),G===n.INT&&(j=n.R32I)),x===n.RG&&(G===n.FLOAT&&(j=n.RG32F),G===n.HALF_FLOAT&&(j=n.RG16F),G===n.UNSIGNED_BYTE&&(j=n.RG8)),x===n.RG_INTEGER&&(G===n.UNSIGNED_BYTE&&(j=n.RG8UI),G===n.UNSIGNED_SHORT&&(j=n.RG16UI),G===n.UNSIGNED_INT&&(j=n.RG32UI),G===n.BYTE&&(j=n.RG8I),G===n.SHORT&&(j=n.RG16I),G===n.INT&&(j=n.RG32I)),x===n.RGB_INTEGER&&(G===n.UNSIGNED_BYTE&&(j=n.RGB8UI),G===n.UNSIGNED_SHORT&&(j=n.RGB16UI),G===n.UNSIGNED_INT&&(j=n.RGB32UI),G===n.BYTE&&(j=n.RGB8I),G===n.SHORT&&(j=n.RGB16I),G===n.INT&&(j=n.RGB32I)),x===n.RGBA_INTEGER&&(G===n.UNSIGNED_BYTE&&(j=n.RGBA8UI),G===n.UNSIGNED_SHORT&&(j=n.RGBA16UI),G===n.UNSIGNED_INT&&(j=n.RGBA32UI),G===n.BYTE&&(j=n.RGBA8I),G===n.SHORT&&(j=n.RGBA16I),G===n.INT&&(j=n.RGBA32I)),x===n.RGB&&G===n.UNSIGNED_INT_5_9_9_9_REV&&(j=n.RGB9_E5),x===n.RGBA){const _e=te?fs:ze.getTransfer(q);G===n.FLOAT&&(j=n.RGBA32F),G===n.HALF_FLOAT&&(j=n.RGBA16F),G===n.UNSIGNED_BYTE&&(j=_e===rt?n.SRGB8_ALPHA8:n.RGBA8),G===n.UNSIGNED_SHORT_4_4_4_4&&(j=n.RGBA4),G===n.UNSIGNED_SHORT_5_5_5_1&&(j=n.RGB5_A1)}return(j===n.R16F||j===n.R32F||j===n.RG16F||j===n.RG32F||j===n.RGBA16F||j===n.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function S(I,x){let G;return I?x===null||x===un||x===zn?G=n.DEPTH24_STENCIL8:x===Bi?G=n.DEPTH32F_STENCIL8:x===wr&&(G=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===un||x===zn?G=n.DEPTH_COMPONENT24:x===Bi?G=n.DEPTH_COMPONENT32F:x===wr&&(G=n.DEPTH_COMPONENT16),G}function M(I,x){return m(I)===!0||I.isFramebufferTexture&&I.minFilter!==pi&&I.minFilter!==Ei?Math.log2(Math.max(x.width,x.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?x.mipmaps.length:1}function C(I){const x=I.target;x.removeEventListener("dispose",C),T(x),x.isVideoTexture&&d.delete(x)}function U(I){const x=I.target;x.removeEventListener("dispose",U),b(x)}function T(I){const x=i.get(I);if(x.__webglInit===void 0)return;const G=I.source,q=f.get(G);if(q){const te=q[x.__cacheKey];te.usedTimes--,te.usedTimes===0&&y(I),Object.keys(q).length===0&&f.delete(G)}i.remove(I)}function y(I){const x=i.get(I);n.deleteTexture(x.__webglTexture);const G=I.source,q=f.get(G);delete q[x.__cacheKey],a.memory.textures--}function b(I){const x=i.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),i.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(x.__webglFramebuffer[q]))for(let te=0;te<x.__webglFramebuffer[q].length;te++)n.deleteFramebuffer(x.__webglFramebuffer[q][te]);else n.deleteFramebuffer(x.__webglFramebuffer[q]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[q])}else{if(Array.isArray(x.__webglFramebuffer))for(let q=0;q<x.__webglFramebuffer.length;q++)n.deleteFramebuffer(x.__webglFramebuffer[q]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let q=0;q<x.__webglColorRenderbuffer.length;q++)x.__webglColorRenderbuffer[q]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[q]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const G=I.textures;for(let q=0,te=G.length;q<te;q++){const j=i.get(G[q]);j.__webglTexture&&(n.deleteTexture(j.__webglTexture),a.memory.textures--),i.remove(G[q])}i.remove(I)}let E=0;function D(){E=0}function F(){const I=E;return I>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+r.maxTextures),E+=1,I}function Q(I){const x=[];return x.push(I.wrapS),x.push(I.wrapT),x.push(I.wrapR||0),x.push(I.magFilter),x.push(I.minFilter),x.push(I.anisotropy),x.push(I.internalFormat),x.push(I.format),x.push(I.type),x.push(I.generateMipmaps),x.push(I.premultiplyAlpha),x.push(I.flipY),x.push(I.unpackAlignment),x.push(I.colorSpace),x.join()}function V(I,x){const G=i.get(I);if(I.isVideoTexture&&xe(I),I.isRenderTargetTexture===!1&&I.version>0&&G.__version!==I.version){const q=I.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{k(G,I,x);return}}t.bindTexture(n.TEXTURE_2D,G.__webglTexture,n.TEXTURE0+x)}function O(I,x){const G=i.get(I);if(I.version>0&&G.__version!==I.version){k(G,I,x);return}t.bindTexture(n.TEXTURE_2D_ARRAY,G.__webglTexture,n.TEXTURE0+x)}function B(I,x){const G=i.get(I);if(I.version>0&&G.__version!==I.version){k(G,I,x);return}t.bindTexture(n.TEXTURE_3D,G.__webglTexture,n.TEXTURE0+x)}function R(I,x){const G=i.get(I);if(I.version>0&&G.__version!==I.version){Y(G,I,x);return}t.bindTexture(n.TEXTURE_CUBE_MAP,G.__webglTexture,n.TEXTURE0+x)}const Z={[as]:n.REPEAT,[dn]:n.CLAMP_TO_EDGE,[Da]:n.MIRRORED_REPEAT},K={[pi]:n.NEAREST,[cp]:n.NEAREST_MIPMAP_NEAREST,[os]:n.NEAREST_MIPMAP_LINEAR,[Ei]:n.LINEAR,[Qa]:n.LINEAR_MIPMAP_NEAREST,[hn]:n.LINEAR_MIPMAP_LINEAR},ae={[fp]:n.NEVER,[_p]:n.ALWAYS,[pp]:n.LESS,[Rc]:n.LEQUAL,[mp]:n.EQUAL,[Ap]:n.GEQUAL,[gp]:n.GREATER,[vp]:n.NOTEQUAL};function Me(I,x){if(x.type===Bi&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===Ei||x.magFilter===Qa||x.magFilter===os||x.magFilter===hn||x.minFilter===Ei||x.minFilter===Qa||x.minFilter===os||x.minFilter===hn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(I,n.TEXTURE_WRAP_S,Z[x.wrapS]),n.texParameteri(I,n.TEXTURE_WRAP_T,Z[x.wrapT]),(I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY)&&n.texParameteri(I,n.TEXTURE_WRAP_R,Z[x.wrapR]),n.texParameteri(I,n.TEXTURE_MAG_FILTER,K[x.magFilter]),n.texParameteri(I,n.TEXTURE_MIN_FILTER,K[x.minFilter]),x.compareFunction&&(n.texParameteri(I,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(I,n.TEXTURE_COMPARE_FUNC,ae[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===pi||x.minFilter!==os&&x.minFilter!==hn||x.type===Bi&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const G=e.get("EXT_texture_filter_anisotropic");n.texParameterf(I,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function Be(I,x){let G=!1;I.__webglInit===void 0&&(I.__webglInit=!0,x.addEventListener("dispose",C));const q=x.source;let te=f.get(q);te===void 0&&(te={},f.set(q,te));const j=Q(x);if(j!==I.__cacheKey){te[j]===void 0&&(te[j]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,G=!0),te[j].usedTimes++;const _e=te[I.__cacheKey];_e!==void 0&&(te[I.__cacheKey].usedTimes--,_e.usedTimes===0&&y(x)),I.__cacheKey=j,I.__webglTexture=te[j].texture}return G}function k(I,x,G){let q=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(q=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(q=n.TEXTURE_3D);const te=Be(I,x),j=x.source;t.bindTexture(q,I.__webglTexture,n.TEXTURE0+G);const _e=i.get(j);if(j.version!==_e.__version||te===!0){t.activeTexture(n.TEXTURE0+G);const ce=ze.getPrimaries(ze.workingColorSpace),fe=x.colorSpace===Ki?null:ze.getPrimaries(x.colorSpace),Ye=x.colorSpace===Ki||ce===fe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ye);let ne=v(x.image,!1,r.maxTextureSize);ne=ot(x,ne);const pe=s.convert(x.format,x.colorSpace),Te=s.convert(x.type);let Ie=_(x.internalFormat,pe,Te,x.colorSpace,x.isVideoTexture);Me(q,x);let me;const He=x.mipmaps,ke=x.isVideoTexture!==!0,at=_e.__version===void 0||te===!0,L=j.dataReady,oe=M(x,ne);if(x.isDepthTexture)Ie=S(x.format===Gn,x.type),at&&(ke?t.texStorage2D(n.TEXTURE_2D,1,Ie,ne.width,ne.height):t.texImage2D(n.TEXTURE_2D,0,Ie,ne.width,ne.height,0,pe,Te,null));else if(x.isDataTexture)if(He.length>0){ke&&at&&t.texStorage2D(n.TEXTURE_2D,oe,Ie,He[0].width,He[0].height);for(let X=0,$=He.length;X<$;X++)me=He[X],ke?L&&t.texSubImage2D(n.TEXTURE_2D,X,0,0,me.width,me.height,pe,Te,me.data):t.texImage2D(n.TEXTURE_2D,X,Ie,me.width,me.height,0,pe,Te,me.data);x.generateMipmaps=!1}else ke?(at&&t.texStorage2D(n.TEXTURE_2D,oe,Ie,ne.width,ne.height),L&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ne.width,ne.height,pe,Te,ne.data)):t.texImage2D(n.TEXTURE_2D,0,Ie,ne.width,ne.height,0,pe,Te,ne.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){ke&&at&&t.texStorage3D(n.TEXTURE_2D_ARRAY,oe,Ie,He[0].width,He[0].height,ne.depth);for(let X=0,$=He.length;X<$;X++)if(me=He[X],x.format!==mi)if(pe!==null)if(ke){if(L)if(x.layerUpdates.size>0){const he=yd(me.width,me.height,x.format,x.type);for(const de of x.layerUpdates){const Le=me.data.subarray(de*he/me.data.BYTES_PER_ELEMENT,(de+1)*he/me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,X,0,0,de,me.width,me.height,1,pe,Le)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,X,0,0,0,me.width,me.height,ne.depth,pe,me.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,X,Ie,me.width,me.height,ne.depth,0,me.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ke?L&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,X,0,0,0,me.width,me.height,ne.depth,pe,Te,me.data):t.texImage3D(n.TEXTURE_2D_ARRAY,X,Ie,me.width,me.height,ne.depth,0,pe,Te,me.data)}else{ke&&at&&t.texStorage2D(n.TEXTURE_2D,oe,Ie,He[0].width,He[0].height);for(let X=0,$=He.length;X<$;X++)me=He[X],x.format!==mi?pe!==null?ke?L&&t.compressedTexSubImage2D(n.TEXTURE_2D,X,0,0,me.width,me.height,pe,me.data):t.compressedTexImage2D(n.TEXTURE_2D,X,Ie,me.width,me.height,0,me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ke?L&&t.texSubImage2D(n.TEXTURE_2D,X,0,0,me.width,me.height,pe,Te,me.data):t.texImage2D(n.TEXTURE_2D,X,Ie,me.width,me.height,0,pe,Te,me.data)}else if(x.isDataArrayTexture)if(ke){if(at&&t.texStorage3D(n.TEXTURE_2D_ARRAY,oe,Ie,ne.width,ne.height,ne.depth),L)if(x.layerUpdates.size>0){const X=yd(ne.width,ne.height,x.format,x.type);for(const $ of x.layerUpdates){const he=ne.data.subarray($*X/ne.data.BYTES_PER_ELEMENT,($+1)*X/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,$,ne.width,ne.height,1,pe,Te,he)}x.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,pe,Te,ne.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ie,ne.width,ne.height,ne.depth,0,pe,Te,ne.data);else if(x.isData3DTexture)ke?(at&&t.texStorage3D(n.TEXTURE_3D,oe,Ie,ne.width,ne.height,ne.depth),L&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,pe,Te,ne.data)):t.texImage3D(n.TEXTURE_3D,0,Ie,ne.width,ne.height,ne.depth,0,pe,Te,ne.data);else if(x.isFramebufferTexture){if(at)if(ke)t.texStorage2D(n.TEXTURE_2D,oe,Ie,ne.width,ne.height);else{let X=ne.width,$=ne.height;for(let he=0;he<oe;he++)t.texImage2D(n.TEXTURE_2D,he,Ie,X,$,0,pe,Te,null),X>>=1,$>>=1}}else if(He.length>0){if(ke&&at){const X=Ee(He[0]);t.texStorage2D(n.TEXTURE_2D,oe,Ie,X.width,X.height)}for(let X=0,$=He.length;X<$;X++)me=He[X],ke?L&&t.texSubImage2D(n.TEXTURE_2D,X,0,0,pe,Te,me):t.texImage2D(n.TEXTURE_2D,X,Ie,pe,Te,me);x.generateMipmaps=!1}else if(ke){if(at){const X=Ee(ne);t.texStorage2D(n.TEXTURE_2D,oe,Ie,X.width,X.height)}L&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,pe,Te,ne)}else t.texImage2D(n.TEXTURE_2D,0,Ie,pe,Te,ne);m(x)&&p(q),_e.__version=j.version,x.onUpdate&&x.onUpdate(x)}I.__version=x.version}function Y(I,x,G){if(x.image.length!==6)return;const q=Be(I,x),te=x.source;t.bindTexture(n.TEXTURE_CUBE_MAP,I.__webglTexture,n.TEXTURE0+G);const j=i.get(te);if(te.version!==j.__version||q===!0){t.activeTexture(n.TEXTURE0+G);const _e=ze.getPrimaries(ze.workingColorSpace),ce=x.colorSpace===Ki?null:ze.getPrimaries(x.colorSpace),fe=x.colorSpace===Ki||_e===ce?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,fe);const Ye=x.isCompressedTexture||x.image[0].isCompressedTexture,ne=x.image[0]&&x.image[0].isDataTexture,pe=[];for(let $=0;$<6;$++)!Ye&&!ne?pe[$]=v(x.image[$],!0,r.maxCubemapSize):pe[$]=ne?x.image[$].image:x.image[$],pe[$]=ot(x,pe[$]);const Te=pe[0],Ie=s.convert(x.format,x.colorSpace),me=s.convert(x.type),He=_(x.internalFormat,Ie,me,x.colorSpace),ke=x.isVideoTexture!==!0,at=j.__version===void 0||q===!0,L=te.dataReady;let oe=M(x,Te);Me(n.TEXTURE_CUBE_MAP,x);let X;if(Ye){ke&&at&&t.texStorage2D(n.TEXTURE_CUBE_MAP,oe,He,Te.width,Te.height);for(let $=0;$<6;$++){X=pe[$].mipmaps;for(let he=0;he<X.length;he++){const de=X[he];x.format!==mi?Ie!==null?ke?L&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,he,0,0,de.width,de.height,Ie,de.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,he,He,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ke?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,he,0,0,de.width,de.height,Ie,me,de.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,he,He,de.width,de.height,0,Ie,me,de.data)}}}else{if(X=x.mipmaps,ke&&at){X.length>0&&oe++;const $=Ee(pe[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,oe,He,$.width,$.height)}for(let $=0;$<6;$++)if(ne){ke?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,pe[$].width,pe[$].height,Ie,me,pe[$].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,He,pe[$].width,pe[$].height,0,Ie,me,pe[$].data);for(let he=0;he<X.length;he++){const Le=X[he].image[$].image;ke?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,he+1,0,0,Le.width,Le.height,Ie,me,Le.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,he+1,He,Le.width,Le.height,0,Ie,me,Le.data)}}else{ke?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Ie,me,pe[$]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,He,Ie,me,pe[$]);for(let he=0;he<X.length;he++){const de=X[he];ke?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,he+1,0,0,Ie,me,de.image[$]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,he+1,He,Ie,me,de.image[$])}}}m(x)&&p(n.TEXTURE_CUBE_MAP),j.__version=te.version,x.onUpdate&&x.onUpdate(x)}I.__version=x.version}function re(I,x,G,q,te,j){const _e=s.convert(G.format,G.colorSpace),ce=s.convert(G.type),fe=_(G.internalFormat,_e,ce,G.colorSpace),Ye=i.get(x),ne=i.get(G);if(ne.__renderTarget=x,!Ye.__hasExternalTextures){const pe=Math.max(1,x.width>>j),Te=Math.max(1,x.height>>j);te===n.TEXTURE_3D||te===n.TEXTURE_2D_ARRAY?t.texImage3D(te,j,fe,pe,Te,x.depth,0,_e,ce,null):t.texImage2D(te,j,fe,pe,Te,0,_e,ce,null)}t.bindFramebuffer(n.FRAMEBUFFER,I),Ge(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,q,te,ne.__webglTexture,0,We(x)):(te===n.TEXTURE_2D||te>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,q,te,ne.__webglTexture,j),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ee(I,x,G){if(n.bindRenderbuffer(n.RENDERBUFFER,I),x.depthBuffer){const q=x.depthTexture,te=q&&q.isDepthTexture?q.type:null,j=S(x.stencilBuffer,te),_e=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ce=We(x);Ge(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ce,j,x.width,x.height):G?n.renderbufferStorageMultisample(n.RENDERBUFFER,ce,j,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,j,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,_e,n.RENDERBUFFER,I)}else{const q=x.textures;for(let te=0;te<q.length;te++){const j=q[te],_e=s.convert(j.format,j.colorSpace),ce=s.convert(j.type),fe=_(j.internalFormat,_e,ce,j.colorSpace),Ye=We(x);G&&Ge(x)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ye,fe,x.width,x.height):Ge(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ye,fe,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,fe,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ge(I,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,I),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=i.get(x.depthTexture);q.__renderTarget=x,(!q.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),V(x.depthTexture,0);const te=q.__webglTexture,j=We(x);if(x.depthTexture.format===Wn)Ge(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,te,0,j):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,te,0);else if(x.depthTexture.format===Gn)Ge(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,te,0,j):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,te,0);else throw new Error("Unknown depthTexture format")}function be(I){const x=i.get(I),G=I.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==I.depthTexture){const q=I.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),q){const te=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,q.removeEventListener("dispose",te)};q.addEventListener("dispose",te),x.__depthDisposeCallback=te}x.__boundDepthTexture=q}if(I.depthTexture&&!x.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");ge(x.__webglFramebuffer,I)}else if(G){x.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[q]),x.__webglDepthbuffer[q]===void 0)x.__webglDepthbuffer[q]=n.createRenderbuffer(),ee(x.__webglDepthbuffer[q],I,!1);else{const te=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,j=x.__webglDepthbuffer[q];n.bindRenderbuffer(n.RENDERBUFFER,j),n.framebufferRenderbuffer(n.FRAMEBUFFER,te,n.RENDERBUFFER,j)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),ee(x.__webglDepthbuffer,I,!1);else{const q=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,te=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,te),n.framebufferRenderbuffer(n.FRAMEBUFFER,q,n.RENDERBUFFER,te)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Fe(I,x,G){const q=i.get(I);x!==void 0&&re(q.__webglFramebuffer,I,I.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),G!==void 0&&be(I)}function ut(I){const x=I.texture,G=i.get(I),q=i.get(x);I.addEventListener("dispose",U);const te=I.textures,j=I.isWebGLCubeRenderTarget===!0,_e=te.length>1;if(_e||(q.__webglTexture===void 0&&(q.__webglTexture=n.createTexture()),q.__version=x.version,a.memory.textures++),j){G.__webglFramebuffer=[];for(let ce=0;ce<6;ce++)if(x.mipmaps&&x.mipmaps.length>0){G.__webglFramebuffer[ce]=[];for(let fe=0;fe<x.mipmaps.length;fe++)G.__webglFramebuffer[ce][fe]=n.createFramebuffer()}else G.__webglFramebuffer[ce]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){G.__webglFramebuffer=[];for(let ce=0;ce<x.mipmaps.length;ce++)G.__webglFramebuffer[ce]=n.createFramebuffer()}else G.__webglFramebuffer=n.createFramebuffer();if(_e)for(let ce=0,fe=te.length;ce<fe;ce++){const Ye=i.get(te[ce]);Ye.__webglTexture===void 0&&(Ye.__webglTexture=n.createTexture(),a.memory.textures++)}if(I.samples>0&&Ge(I)===!1){G.__webglMultisampledFramebuffer=n.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let ce=0;ce<te.length;ce++){const fe=te[ce];G.__webglColorRenderbuffer[ce]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,G.__webglColorRenderbuffer[ce]);const Ye=s.convert(fe.format,fe.colorSpace),ne=s.convert(fe.type),pe=_(fe.internalFormat,Ye,ne,fe.colorSpace,I.isXRRenderTarget===!0),Te=We(I);n.renderbufferStorageMultisample(n.RENDERBUFFER,Te,pe,I.width,I.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ce,n.RENDERBUFFER,G.__webglColorRenderbuffer[ce])}n.bindRenderbuffer(n.RENDERBUFFER,null),I.depthBuffer&&(G.__webglDepthRenderbuffer=n.createRenderbuffer(),ee(G.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(j){t.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture),Me(n.TEXTURE_CUBE_MAP,x);for(let ce=0;ce<6;ce++)if(x.mipmaps&&x.mipmaps.length>0)for(let fe=0;fe<x.mipmaps.length;fe++)re(G.__webglFramebuffer[ce][fe],I,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,fe);else re(G.__webglFramebuffer[ce],I,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0);m(x)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(_e){for(let ce=0,fe=te.length;ce<fe;ce++){const Ye=te[ce],ne=i.get(Ye);t.bindTexture(n.TEXTURE_2D,ne.__webglTexture),Me(n.TEXTURE_2D,Ye),re(G.__webglFramebuffer,I,Ye,n.COLOR_ATTACHMENT0+ce,n.TEXTURE_2D,0),m(Ye)&&p(n.TEXTURE_2D)}t.unbindTexture()}else{let ce=n.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(ce=I.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ce,q.__webglTexture),Me(ce,x),x.mipmaps&&x.mipmaps.length>0)for(let fe=0;fe<x.mipmaps.length;fe++)re(G.__webglFramebuffer[fe],I,x,n.COLOR_ATTACHMENT0,ce,fe);else re(G.__webglFramebuffer,I,x,n.COLOR_ATTACHMENT0,ce,0);m(x)&&p(ce),t.unbindTexture()}I.depthBuffer&&be(I)}function Xe(I){const x=I.textures;for(let G=0,q=x.length;G<q;G++){const te=x[G];if(m(te)){const j=A(I),_e=i.get(te).__webglTexture;t.bindTexture(j,_e),p(j),t.unbindTexture()}}}const gt=[],N=[];function ai(I){if(I.samples>0){if(Ge(I)===!1){const x=I.textures,G=I.width,q=I.height;let te=n.COLOR_BUFFER_BIT;const j=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,_e=i.get(I),ce=x.length>1;if(ce)for(let fe=0;fe<x.length;fe++)t.bindFramebuffer(n.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,_e.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,_e.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,_e.__webglFramebuffer);for(let fe=0;fe<x.length;fe++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(te|=n.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(te|=n.STENCIL_BUFFER_BIT)),ce){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,_e.__webglColorRenderbuffer[fe]);const Ye=i.get(x[fe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ye,0)}n.blitFramebuffer(0,0,G,q,0,0,G,q,te,n.NEAREST),l===!0&&(gt.length=0,N.length=0,gt.push(n.COLOR_ATTACHMENT0+fe),I.depthBuffer&&I.resolveDepthBuffer===!1&&(gt.push(j),N.push(j),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,N)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,gt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ce)for(let fe=0;fe<x.length;fe++){t.bindFramebuffer(n.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.RENDERBUFFER,_e.__webglColorRenderbuffer[fe]);const Ye=i.get(x[fe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,_e.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.TEXTURE_2D,Ye,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,_e.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&l){const x=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function We(I){return Math.min(r.maxSamples,I.samples)}function Ge(I){const x=i.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function xe(I){const x=a.render.frame;d.get(I)!==x&&(d.set(I,x),I.update())}function ot(I,x){const G=I.colorSpace,q=I.format,te=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||G!==Hn&&G!==Ki&&(ze.getTransfer(G)===rt?(q!==mi||te!==Ri)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),x}function Ee(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(c.width=I.naturalWidth||I.width,c.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(c.width=I.displayWidth,c.height=I.displayHeight):(c.width=I.width,c.height=I.height),c}this.allocateTextureUnit=F,this.resetTextureUnits=D,this.setTexture2D=V,this.setTexture2DArray=O,this.setTexture3D=B,this.setTextureCube=R,this.rebindTextures=Fe,this.setupRenderTarget=ut,this.updateRenderTargetMipmap=Xe,this.updateMultisampleRenderTarget=ai,this.setupDepthRenderbuffer=be,this.setupFrameBufferTexture=re,this.useMultisampledRTT=Ge}function rA(n,e){function t(i,r=Ki){let s;const a=ze.getTransfer(r);if(i===Ri)return n.UNSIGNED_BYTE;if(i===La)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Pa)return n.UNSIGNED_SHORT_5_5_5_1;if(i===xc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Sc)return n.BYTE;if(i===bc)return n.SHORT;if(i===wr)return n.UNSIGNED_SHORT;if(i===Na)return n.INT;if(i===un)return n.UNSIGNED_INT;if(i===Bi)return n.FLOAT;if(i===Cr)return n.HALF_FLOAT;if(i===Ec)return n.ALPHA;if(i===yc)return n.RGB;if(i===mi)return n.RGBA;if(i===wc)return n.LUMINANCE;if(i===Cc)return n.LUMINANCE_ALPHA;if(i===Wn)return n.DEPTH_COMPONENT;if(i===Gn)return n.DEPTH_STENCIL;if(i===Uc)return n.RED;if(i===Va)return n.RED_INTEGER;if(i===Mc)return n.RG;if(i===ka)return n.RG_INTEGER;if(i===Oa)return n.RGBA_INTEGER;if(i===ls||i===cs||i===ds||i===hs)if(a===rt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===ls)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===cs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ds)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===hs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===ls)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===cs)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ds)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===hs)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===za||i===Wa||i===Ga||i===Ha)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===za)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Wa)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ga)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ha)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ja||i===Za||i===Xa)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Ja||i===Za)return a===rt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Xa)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Ya||i===Ka||i===ja||i===qa||i===$a||i===eo||i===to||i===io||i===no||i===ro||i===so||i===ao||i===oo||i===lo)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Ya)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ka)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===ja)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===qa)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===$a)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===eo)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===to)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===io)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===no)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ro)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===so)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ao)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===oo)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===lo)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===us||i===co||i===ho)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===us)return a===rt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===co)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ho)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Tc||i===uo||i===fo||i===po)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===us)return s.COMPRESSED_RED_RGTC1_EXT;if(i===uo)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===fo)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===po)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===zn?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const sA={type:"move"};class jo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Pr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Pr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Pr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,i),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const d=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=d.position.distanceTo(h.position),u=.02,g=.005;c.inputState.pinching&&f>u+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=u-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(sA)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Pr;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const aA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,oA=`
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

}`;class lA{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const r=new Qt,s=e.properties.get(r);s.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new nn({vertexShader:aA,fragmentShader:oA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Wt(new Os(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class cA extends fn{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,d=null,h=null,f=null,u=null,g=null;const v=new lA,m=t.getContextAttributes();let p=null,A=null;const _=[],S=[],M=new Qe;let C=null;const U=new ni;U.viewport=new ft;const T=new ni;T.viewport=new ft;const y=[U,T],b=new cm;let E=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(k){let Y=_[k];return Y===void 0&&(Y=new jo,_[k]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(k){let Y=_[k];return Y===void 0&&(Y=new jo,_[k]=Y),Y.getGripSpace()},this.getHand=function(k){let Y=_[k];return Y===void 0&&(Y=new jo,_[k]=Y),Y.getHandSpace()};function F(k){const Y=S.indexOf(k.inputSource);if(Y===-1)return;const re=_[Y];re!==void 0&&(re.update(k.inputSource,k.frame,c||a),re.dispatchEvent({type:k.type,data:k.inputSource}))}function Q(){r.removeEventListener("select",F),r.removeEventListener("selectstart",F),r.removeEventListener("selectend",F),r.removeEventListener("squeeze",F),r.removeEventListener("squeezestart",F),r.removeEventListener("squeezeend",F),r.removeEventListener("end",Q),r.removeEventListener("inputsourceschange",V);for(let k=0;k<_.length;k++){const Y=S[k];Y!==null&&(S[k]=null,_[k].disconnect(Y))}E=null,D=null,v.reset(),e.setRenderTarget(p),u=null,f=null,h=null,r=null,A=null,Be.stop(),i.isPresenting=!1,e.setPixelRatio(C),e.setSize(M.width,M.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(k){s=k,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(k){o=k,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(k){c=k},this.getBaseLayer=function(){return f!==null?f:u},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(k){if(r=k,r!==null){if(p=e.getRenderTarget(),r.addEventListener("select",F),r.addEventListener("selectstart",F),r.addEventListener("selectend",F),r.addEventListener("squeeze",F),r.addEventListener("squeezestart",F),r.addEventListener("squeezeend",F),r.addEventListener("end",Q),r.addEventListener("inputsourceschange",V),m.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(M),r.renderState.layers===void 0){const Y={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};u=new XRWebGLLayer(r,t,Y),r.updateRenderState({baseLayer:u}),e.setPixelRatio(1),e.setSize(u.framebufferWidth,u.framebufferHeight,!1),A=new pn(u.framebufferWidth,u.framebufferHeight,{format:mi,type:Ri,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let Y=null,re=null,ee=null;m.depth&&(ee=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Y=m.stencil?Gn:Wn,re=m.stencil?zn:un);const ge={colorFormat:t.RGBA8,depthFormat:ee,scaleFactor:s};h=new XRWebGLBinding(r,t),f=h.createProjectionLayer(ge),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),A=new pn(f.textureWidth,f.textureHeight,{format:mi,type:Ri,depthTexture:new gd(f.textureWidth,f.textureHeight,re,void 0,void 0,void 0,void 0,void 0,void 0,Y),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),Be.setContext(r),Be.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function V(k){for(let Y=0;Y<k.removed.length;Y++){const re=k.removed[Y],ee=S.indexOf(re);ee>=0&&(S[ee]=null,_[ee].disconnect(re))}for(let Y=0;Y<k.added.length;Y++){const re=k.added[Y];let ee=S.indexOf(re);if(ee===-1){for(let be=0;be<_.length;be++)if(be>=S.length){S.push(re),ee=be;break}else if(S[be]===null){S[be]=re,ee=be;break}if(ee===-1)break}const ge=_[ee];ge&&ge.connect(re)}}const O=new W,B=new W;function R(k,Y,re){O.setFromMatrixPosition(Y.matrixWorld),B.setFromMatrixPosition(re.matrixWorld);const ee=O.distanceTo(B),ge=Y.projectionMatrix.elements,be=re.projectionMatrix.elements,Fe=ge[14]/(ge[10]-1),ut=ge[14]/(ge[10]+1),Xe=(ge[9]+1)/ge[5],gt=(ge[9]-1)/ge[5],N=(ge[8]-1)/ge[0],ai=(be[8]+1)/be[0],We=Fe*N,Ge=Fe*ai,xe=ee/(-N+ai),ot=xe*-N;if(Y.matrixWorld.decompose(k.position,k.quaternion,k.scale),k.translateX(ot),k.translateZ(xe),k.matrixWorld.compose(k.position,k.quaternion,k.scale),k.matrixWorldInverse.copy(k.matrixWorld).invert(),ge[10]===-1)k.projectionMatrix.copy(Y.projectionMatrix),k.projectionMatrixInverse.copy(Y.projectionMatrixInverse);else{const Ee=Fe+xe,I=ut+xe,x=We-ot,G=Ge+(ee-ot),q=Xe*ut/I*Ee,te=gt*ut/I*Ee;k.projectionMatrix.makePerspective(x,G,q,te,Ee,I),k.projectionMatrixInverse.copy(k.projectionMatrix).invert()}}function Z(k,Y){Y===null?k.matrixWorld.copy(k.matrix):k.matrixWorld.multiplyMatrices(Y.matrixWorld,k.matrix),k.matrixWorldInverse.copy(k.matrixWorld).invert()}this.updateCamera=function(k){if(r===null)return;let Y=k.near,re=k.far;v.texture!==null&&(v.depthNear>0&&(Y=v.depthNear),v.depthFar>0&&(re=v.depthFar)),b.near=T.near=U.near=Y,b.far=T.far=U.far=re,(E!==b.near||D!==b.far)&&(r.updateRenderState({depthNear:b.near,depthFar:b.far}),E=b.near,D=b.far),U.layers.mask=k.layers.mask|2,T.layers.mask=k.layers.mask|4,b.layers.mask=U.layers.mask|T.layers.mask;const ee=k.parent,ge=b.cameras;Z(b,ee);for(let be=0;be<ge.length;be++)Z(ge[be],ee);ge.length===2?R(b,U,T):b.projectionMatrix.copy(U.projectionMatrix),K(k,b,ee)};function K(k,Y,re){re===null?k.matrix.copy(Y.matrixWorld):(k.matrix.copy(re.matrixWorld),k.matrix.invert(),k.matrix.multiply(Y.matrixWorld)),k.matrix.decompose(k.position,k.quaternion,k.scale),k.updateMatrixWorld(!0),k.projectionMatrix.copy(Y.projectionMatrix),k.projectionMatrixInverse.copy(Y.projectionMatrixInverse),k.isPerspectiveCamera&&(k.fov=mo*2*Math.atan(1/k.projectionMatrix.elements[5]),k.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(f===null&&u===null))return l},this.setFoveation=function(k){l=k,f!==null&&(f.fixedFoveation=k),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=k)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(b)};let ae=null;function Me(k,Y){if(d=Y.getViewerPose(c||a),g=Y,d!==null){const re=d.views;u!==null&&(e.setRenderTargetFramebuffer(A,u.framebuffer),e.setRenderTarget(A));let ee=!1;re.length!==b.cameras.length&&(b.cameras.length=0,ee=!0);for(let be=0;be<re.length;be++){const Fe=re[be];let ut=null;if(u!==null)ut=u.getViewport(Fe);else{const gt=h.getViewSubImage(f,Fe);ut=gt.viewport,be===0&&(e.setRenderTargetTextures(A,gt.colorTexture,f.ignoreDepthValues?void 0:gt.depthStencilTexture),e.setRenderTarget(A))}let Xe=y[be];Xe===void 0&&(Xe=new ni,Xe.layers.enable(be),Xe.viewport=new ft,y[be]=Xe),Xe.matrix.fromArray(Fe.transform.matrix),Xe.matrix.decompose(Xe.position,Xe.quaternion,Xe.scale),Xe.projectionMatrix.fromArray(Fe.projectionMatrix),Xe.projectionMatrixInverse.copy(Xe.projectionMatrix).invert(),Xe.viewport.set(ut.x,ut.y,ut.width,ut.height),be===0&&(b.matrix.copy(Xe.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),ee===!0&&b.cameras.push(Xe)}const ge=r.enabledFeatures;if(ge&&ge.includes("depth-sensing")){const be=h.getDepthInformation(re[0]);be&&be.isValid&&be.texture&&v.init(e,be,r.renderState)}}for(let re=0;re<_.length;re++){const ee=S[re],ge=_[re];ee!==null&&ge!==void 0&&ge.update(ee,Y,c||a)}ae&&ae(k,Y),Y.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Y}),g=null}const Be=new wd;Be.setAnimationLoop(Me),this.setAnimationLoop=function(k){ae=k},this.dispose=function(){}}}const En=new yi,dA=new ct;function hA(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,rd(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,A,_,S){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),h(m,p)):p.isMeshPhongMaterial?(s(m,p),d(m,p)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&u(m,p,S)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),v(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,A,_):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ot&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ot&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const A=e.get(p),_=A.envMap,S=A.envMapRotation;_&&(m.envMap.value=_,En.copy(S),En.x*=-1,En.y*=-1,En.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(En.y*=-1,En.z*=-1),m.envMapRotation.value.setFromMatrix4(dA.makeRotationFromEuler(En)),m.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,A,_){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*A,m.scale.value=_*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function d(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function u(m,p,A){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ot&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=A.texture,m.transmissionSamplerSize.value.set(A.width,A.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const A=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(A.matrixWorld),m.nearDistance.value=A.shadow.camera.near,m.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function uA(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(A,_){const S=_.program;i.uniformBlockBinding(A,S)}function c(A,_){let S=r[A.id];S===void 0&&(g(A),S=d(A),r[A.id]=S,A.addEventListener("dispose",m));const M=_.program;i.updateUBOMapping(A,M);const C=e.render.frame;s[A.id]!==C&&(f(A),s[A.id]=C)}function d(A){const _=h();A.__bindingPointIndex=_;const S=n.createBuffer(),M=A.__size,C=A.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,M,C),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,_,S),S}function h(){for(let A=0;A<o;A++)if(a.indexOf(A)===-1)return a.push(A),A;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(A){const _=r[A.id],S=A.uniforms,M=A.__cache;n.bindBuffer(n.UNIFORM_BUFFER,_);for(let C=0,U=S.length;C<U;C++){const T=Array.isArray(S[C])?S[C]:[S[C]];for(let y=0,b=T.length;y<b;y++){const E=T[y];if(u(E,C,y,M)===!0){const D=E.__offset,F=Array.isArray(E.value)?E.value:[E.value];let Q=0;for(let V=0;V<F.length;V++){const O=F[V],B=v(O);typeof O=="number"||typeof O=="boolean"?(E.__data[0]=O,n.bufferSubData(n.UNIFORM_BUFFER,D+Q,E.__data)):O.isMatrix3?(E.__data[0]=O.elements[0],E.__data[1]=O.elements[1],E.__data[2]=O.elements[2],E.__data[3]=0,E.__data[4]=O.elements[3],E.__data[5]=O.elements[4],E.__data[6]=O.elements[5],E.__data[7]=0,E.__data[8]=O.elements[6],E.__data[9]=O.elements[7],E.__data[10]=O.elements[8],E.__data[11]=0):(O.toArray(E.__data,Q),Q+=B.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,D,E.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function u(A,_,S,M){const C=A.value,U=_+"_"+S;if(M[U]===void 0)return typeof C=="number"||typeof C=="boolean"?M[U]=C:M[U]=C.clone(),!0;{const T=M[U];if(typeof C=="number"||typeof C=="boolean"){if(T!==C)return M[U]=C,!0}else if(T.equals(C)===!1)return T.copy(C),!0}return!1}function g(A){const _=A.uniforms;let S=0;const M=16;for(let U=0,T=_.length;U<T;U++){const y=Array.isArray(_[U])?_[U]:[_[U]];for(let b=0,E=y.length;b<E;b++){const D=y[b],F=Array.isArray(D.value)?D.value:[D.value];for(let Q=0,V=F.length;Q<V;Q++){const O=F[Q],B=v(O),R=S%M,Z=R%B.boundary,K=R+Z;S+=Z,K!==0&&M-K<B.storage&&(S+=M-K),D.__data=new Float32Array(B.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=S,S+=B.storage}}}const C=S%M;return C>0&&(S+=M-C),A.__size=S,A.__cache={},this}function v(A){const _={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(_.boundary=4,_.storage=4):A.isVector2?(_.boundary=8,_.storage=8):A.isVector3||A.isColor?(_.boundary=16,_.storage=12):A.isVector4?(_.boundary=16,_.storage=16):A.isMatrix3?(_.boundary=48,_.storage=48):A.isMatrix4?(_.boundary=64,_.storage=64):A.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",A),_}function m(A){const _=A.target;_.removeEventListener("dispose",m);const S=a.indexOf(_.__bindingPointIndex);a.splice(S,1),n.deleteBuffer(r[_.id]),delete r[_.id],delete s[_.id]}function p(){for(const A in r)n.deleteBuffer(r[A]);a=[],r={},s={}}return{bind:l,update:c,dispose:p}}class fA{constructor(e={}){const{canvas:t=xp(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let u;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");u=i.getContextAttributes().alpha}else u=a;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,p=null;const A=[],_=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Mt,this.toneMapping=Yi,this.toneMappingExposure=1;const S=this;let M=!1,C=0,U=0,T=null,y=-1,b=null;const E=new ft,D=new ft;let F=null;const Q=new Pe(0);let V=0,O=t.width,B=t.height,R=1,Z=null,K=null;const ae=new ft(0,0,O,B),Me=new ft(0,0,O,B);let Be=!1;const k=new Lo;let Y=!1,re=!1;const ee=new ct,ge=new ct,be=new W,Fe=new ft,ut={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Xe=!1;function gt(){return T===null?R:1}let N=i;function ai(w,P){return t.getContext(w,P)}try{const w={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ba}`),t.addEventListener("webglcontextlost",$,!1),t.addEventListener("webglcontextrestored",he,!1),t.addEventListener("webglcontextcreationerror",de,!1),N===null){const P="webgl2";if(N=ai(P,w),N===null)throw ai(P)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let We,Ge,xe,ot,Ee,I,x,G,q,te,j,_e,ce,fe,Ye,ne,pe,Te,Ie,me,He,ke,at,L;function oe(){We=new xv(N),We.init(),ke=new rA(N,We),Ge=new gv(N,We,e,ke),xe=new iA(N,We),Ge.reverseDepthBuffer&&f&&xe.buffers.depth.setReversed(!0),ot=new wv(N),Ee=new W0,I=new nA(N,We,xe,Ee,Ge,ke,ot),x=new Av(S),G=new bv(S),q=new um(N),at=new pv(N,q),te=new Ev(N,q,ot,at),j=new Uv(N,te,q,ot),Ie=new Cv(N,Ge,I),ne=new vv(Ee),_e=new z0(S,x,G,We,Ge,at,ne),ce=new hA(S,Ee),fe=new H0,Ye=new j0(We),Te=new fv(S,x,G,xe,j,u,l),pe=new eA(S,j,Ge),L=new uA(N,ot,Ge,xe),me=new mv(N,We,ot),He=new yv(N,We,ot),ot.programs=_e.programs,S.capabilities=Ge,S.extensions=We,S.properties=Ee,S.renderLists=fe,S.shadowMap=pe,S.state=xe,S.info=ot}oe();const X=new cA(S,N);this.xr=X,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const w=We.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=We.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return R},this.setPixelRatio=function(w){w!==void 0&&(R=w,this.setSize(O,B,!1))},this.getSize=function(w){return w.set(O,B)},this.setSize=function(w,P,H=!0){if(X.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=w,B=P,t.width=Math.floor(w*R),t.height=Math.floor(P*R),H===!0&&(t.style.width=w+"px",t.style.height=P+"px"),this.setViewport(0,0,w,P)},this.getDrawingBufferSize=function(w){return w.set(O*R,B*R).floor()},this.setDrawingBufferSize=function(w,P,H){O=w,B=P,R=H,t.width=Math.floor(w*H),t.height=Math.floor(P*H),this.setViewport(0,0,w,P)},this.getCurrentViewport=function(w){return w.copy(E)},this.getViewport=function(w){return w.copy(ae)},this.setViewport=function(w,P,H,J){w.isVector4?ae.set(w.x,w.y,w.z,w.w):ae.set(w,P,H,J),xe.viewport(E.copy(ae).multiplyScalar(R).round())},this.getScissor=function(w){return w.copy(Me)},this.setScissor=function(w,P,H,J){w.isVector4?Me.set(w.x,w.y,w.z,w.w):Me.set(w,P,H,J),xe.scissor(D.copy(Me).multiplyScalar(R).round())},this.getScissorTest=function(){return Be},this.setScissorTest=function(w){xe.setScissorTest(Be=w)},this.setOpaqueSort=function(w){Z=w},this.setTransparentSort=function(w){K=w},this.getClearColor=function(w){return w.copy(Te.getClearColor())},this.setClearColor=function(){Te.setClearColor.apply(Te,arguments)},this.getClearAlpha=function(){return Te.getClearAlpha()},this.setClearAlpha=function(){Te.setClearAlpha.apply(Te,arguments)},this.clear=function(w=!0,P=!0,H=!0){let J=0;if(w){let z=!1;if(T!==null){const ie=T.texture.format;z=ie===Oa||ie===ka||ie===Va}if(z){const ie=T.texture.type,le=ie===Ri||ie===un||ie===wr||ie===zn||ie===La||ie===Pa,ue=Te.getClearColor(),ve=Te.getClearAlpha(),Re=ue.r,De=ue.g,ye=ue.b;le?(g[0]=Re,g[1]=De,g[2]=ye,g[3]=ve,N.clearBufferuiv(N.COLOR,0,g)):(v[0]=Re,v[1]=De,v[2]=ye,v[3]=ve,N.clearBufferiv(N.COLOR,0,v))}else J|=N.COLOR_BUFFER_BIT}P&&(J|=N.DEPTH_BUFFER_BIT),H&&(J|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",$,!1),t.removeEventListener("webglcontextrestored",he,!1),t.removeEventListener("webglcontextcreationerror",de,!1),Te.dispose(),fe.dispose(),Ye.dispose(),Ee.dispose(),x.dispose(),G.dispose(),j.dispose(),at.dispose(),L.dispose(),_e.dispose(),X.dispose(),X.removeEventListener("sessionstart",Ah),X.removeEventListener("sessionend",_h),wn.stop()};function $(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function he(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const w=ot.autoReset,P=pe.enabled,H=pe.autoUpdate,J=pe.needsUpdate,z=pe.type;oe(),ot.autoReset=w,pe.enabled=P,pe.autoUpdate=H,pe.needsUpdate=J,pe.type=z}function de(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Le(w){const P=w.target;P.removeEventListener("dispose",Le),pt(P)}function pt(w){Rt(w),Ee.remove(w)}function Rt(w){const P=Ee.get(w).programs;P!==void 0&&(P.forEach(function(H){_e.releaseProgram(H)}),w.isShaderMaterial&&_e.releaseShaderCache(w))}this.renderBufferDirect=function(w,P,H,J,z,ie){P===null&&(P=ut);const le=z.isMesh&&z.matrixWorld.determinant()<0,ue=i_(w,P,H,J,z);xe.setMaterial(J,le);let ve=H.index,Re=1;if(J.wireframe===!0){if(ve=te.getWireframeAttribute(H),ve===void 0)return;Re=2}const De=H.drawRange,ye=H.attributes.position;let Ke=De.start*Re,et=(De.start+De.count)*Re;ie!==null&&(Ke=Math.max(Ke,ie.start*Re),et=Math.min(et,(ie.start+ie.count)*Re)),ve!==null?(Ke=Math.max(Ke,0),et=Math.min(et,ve.count)):ye!=null&&(Ke=Math.max(Ke,0),et=Math.min(et,ye.count));const _t=et-Ke;if(_t<0||_t===1/0)return;at.setup(z,J,ue,H,ve);let mt,je=me;if(ve!==null&&(mt=q.get(ve),je=He,je.setIndex(mt)),z.isMesh)J.wireframe===!0?(xe.setLineWidth(J.wireframeLinewidth*gt()),je.setMode(N.LINES)):je.setMode(N.TRIANGLES);else if(z.isLine){let Ce=J.linewidth;Ce===void 0&&(Ce=1),xe.setLineWidth(Ce*gt()),z.isLineSegments?je.setMode(N.LINES):z.isLineLoop?je.setMode(N.LINE_LOOP):je.setMode(N.LINE_STRIP)}else z.isPoints?je.setMode(N.POINTS):z.isSprite&&je.setMode(N.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)je.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(We.get("WEBGL_multi_draw"))je.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const Ce=z._multiDrawStarts,Tt=z._multiDrawCounts,tt=z._multiDrawCount,xi=ve?q.get(ve).bytesPerElement:1,pr=Ee.get(J).currentProgram.getUniforms();for(let $t=0;$t<tt;$t++)pr.setValue(N,"_gl_DrawID",$t),je.render(Ce[$t]/xi,Tt[$t])}else if(z.isInstancedMesh)je.renderInstances(Ke,_t,z.count);else if(H.isInstancedBufferGeometry){const Ce=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,Tt=Math.min(H.instanceCount,Ce);je.renderInstances(Ke,_t,Tt)}else je.render(Ke,_t)};function nt(w,P,H){w.transparent===!0&&w.side===Ii&&w.forceSinglePass===!1?(w.side=Ot,w.needsUpdate=!0,$s(w,P,H),w.side=Fi,w.needsUpdate=!0,$s(w,P,H),w.side=Ii):$s(w,P,H)}this.compile=function(w,P,H=null){H===null&&(H=w),p=Ye.get(H),p.init(P),_.push(p),H.traverseVisible(function(z){z.isLight&&z.layers.test(P.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),w!==H&&w.traverseVisible(function(z){z.isLight&&z.layers.test(P.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),p.setupLights();const J=new Set;return w.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const ie=z.material;if(ie)if(Array.isArray(ie))for(let le=0;le<ie.length;le++){const ue=ie[le];nt(ue,H,z),J.add(ue)}else nt(ie,H,z),J.add(ie)}),_.pop(),p=null,J},this.compileAsync=function(w,P,H=null){const J=this.compile(w,P,H);return new Promise(z=>{function ie(){if(J.forEach(function(le){Ee.get(le).currentProgram.isReady()&&J.delete(le)}),J.size===0){z(w);return}setTimeout(ie,10)}We.get("KHR_parallel_shader_compile")!==null?ie():setTimeout(ie,10)})};let bi=null;function Wi(w){bi&&bi(w)}function Ah(){wn.stop()}function _h(){wn.start()}const wn=new wd;wn.setAnimationLoop(Wi),typeof self<"u"&&wn.setContext(self),this.setAnimationLoop=function(w){bi=w,X.setAnimationLoop(w),w===null?wn.stop():wn.start()},X.addEventListener("sessionstart",Ah),X.addEventListener("sessionend",_h),this.render=function(w,P){if(P!==void 0&&P.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),P.parent===null&&P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(X.cameraAutoUpdate===!0&&X.updateCamera(P),P=X.getCamera()),w.isScene===!0&&w.onBeforeRender(S,w,P,T),p=Ye.get(w,_.length),p.init(P),_.push(p),ge.multiplyMatrices(P.projectionMatrix,P.matrixWorldInverse),k.setFromProjectionMatrix(ge),re=this.localClippingEnabled,Y=ne.init(this.clippingPlanes,re),m=fe.get(w,A.length),m.init(),A.push(m),X.enabled===!0&&X.isPresenting===!0){const ie=S.xr.getDepthSensingMesh();ie!==null&&ol(ie,P,-1/0,S.sortObjects)}ol(w,P,0,S.sortObjects),m.finish(),S.sortObjects===!0&&m.sort(Z,K),Xe=X.enabled===!1||X.isPresenting===!1||X.hasDepthSensing()===!1,Xe&&Te.addToRenderList(m,w),this.info.render.frame++,Y===!0&&ne.beginShadows();const H=p.state.shadowsArray;pe.render(H,w,P),Y===!0&&ne.endShadows(),this.info.autoReset===!0&&this.info.reset();const J=m.opaque,z=m.transmissive;if(p.setupLights(),P.isArrayCamera){const ie=P.cameras;if(z.length>0)for(let le=0,ue=ie.length;le<ue;le++){const ve=ie[le];bh(J,z,w,ve)}Xe&&Te.render(w);for(let le=0,ue=ie.length;le<ue;le++){const ve=ie[le];Sh(m,w,ve,ve.viewport)}}else z.length>0&&bh(J,z,w,P),Xe&&Te.render(w),Sh(m,w,P);T!==null&&(I.updateMultisampleRenderTarget(T),I.updateRenderTargetMipmap(T)),w.isScene===!0&&w.onAfterRender(S,w,P),at.resetDefaultState(),y=-1,b=null,_.pop(),_.length>0?(p=_[_.length-1],Y===!0&&ne.setGlobalState(S.clippingPlanes,p.state.camera)):p=null,A.pop(),A.length>0?m=A[A.length-1]:m=null};function ol(w,P,H,J){if(w.visible===!1)return;if(w.layers.test(P.layers)){if(w.isGroup)H=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(P);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||k.intersectsSprite(w)){J&&Fe.setFromMatrixPosition(w.matrixWorld).applyMatrix4(ge);const le=j.update(w),ue=w.material;ue.visible&&m.push(w,le,ue,H,Fe.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||k.intersectsObject(w))){const le=j.update(w),ue=w.material;if(J&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Fe.copy(w.boundingSphere.center)):(le.boundingSphere===null&&le.computeBoundingSphere(),Fe.copy(le.boundingSphere.center)),Fe.applyMatrix4(w.matrixWorld).applyMatrix4(ge)),Array.isArray(ue)){const ve=le.groups;for(let Re=0,De=ve.length;Re<De;Re++){const ye=ve[Re],Ke=ue[ye.materialIndex];Ke&&Ke.visible&&m.push(w,le,Ke,H,Fe.z,ye)}}else ue.visible&&m.push(w,le,ue,H,Fe.z,null)}}const ie=w.children;for(let le=0,ue=ie.length;le<ue;le++)ol(ie[le],P,H,J)}function Sh(w,P,H,J){const z=w.opaque,ie=w.transmissive,le=w.transparent;p.setupLightsView(H),Y===!0&&ne.setGlobalState(S.clippingPlanes,H),J&&xe.viewport(E.copy(J)),z.length>0&&qs(z,P,H),ie.length>0&&qs(ie,P,H),le.length>0&&qs(le,P,H),xe.buffers.depth.setTest(!0),xe.buffers.depth.setMask(!0),xe.buffers.color.setMask(!0),xe.setPolygonOffset(!1)}function bh(w,P,H,J){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[J.id]===void 0&&(p.state.transmissionRenderTarget[J.id]=new pn(1,1,{generateMipmaps:!0,type:We.has("EXT_color_buffer_half_float")||We.has("EXT_color_buffer_float")?Cr:Ri,minFilter:hn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ze.workingColorSpace}));const ie=p.state.transmissionRenderTarget[J.id],le=J.viewport||E;ie.setSize(le.z,le.w);const ue=S.getRenderTarget();S.setRenderTarget(ie),S.getClearColor(Q),V=S.getClearAlpha(),V<1&&S.setClearColor(16777215,.5),S.clear(),Xe&&Te.render(H);const ve=S.toneMapping;S.toneMapping=Yi;const Re=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),p.setupLightsView(J),Y===!0&&ne.setGlobalState(S.clippingPlanes,J),qs(w,H,J),I.updateMultisampleRenderTarget(ie),I.updateRenderTargetMipmap(ie),We.has("WEBGL_multisampled_render_to_texture")===!1){let De=!1;for(let ye=0,Ke=P.length;ye<Ke;ye++){const et=P[ye],_t=et.object,mt=et.geometry,je=et.material,Ce=et.group;if(je.side===Ii&&_t.layers.test(J.layers)){const Tt=je.side;je.side=Ot,je.needsUpdate=!0,xh(_t,H,J,mt,je,Ce),je.side=Tt,je.needsUpdate=!0,De=!0}}De===!0&&(I.updateMultisampleRenderTarget(ie),I.updateRenderTargetMipmap(ie))}S.setRenderTarget(ue),S.setClearColor(Q,V),Re!==void 0&&(J.viewport=Re),S.toneMapping=ve}function qs(w,P,H){const J=P.isScene===!0?P.overrideMaterial:null;for(let z=0,ie=w.length;z<ie;z++){const le=w[z],ue=le.object,ve=le.geometry,Re=J===null?le.material:J,De=le.group;ue.layers.test(H.layers)&&xh(ue,P,H,ve,Re,De)}}function xh(w,P,H,J,z,ie){w.onBeforeRender(S,P,H,J,z,ie),w.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),z.onBeforeRender(S,P,H,J,w,ie),z.transparent===!0&&z.side===Ii&&z.forceSinglePass===!1?(z.side=Ot,z.needsUpdate=!0,S.renderBufferDirect(H,P,J,z,w,ie),z.side=Fi,z.needsUpdate=!0,S.renderBufferDirect(H,P,J,z,w,ie),z.side=Ii):S.renderBufferDirect(H,P,J,z,w,ie),w.onAfterRender(S,P,H,J,z,ie)}function $s(w,P,H){P.isScene!==!0&&(P=ut);const J=Ee.get(w),z=p.state.lights,ie=p.state.shadowsArray,le=z.state.version,ue=_e.getParameters(w,z.state,ie,P,H),ve=_e.getProgramCacheKey(ue);let Re=J.programs;J.environment=w.isMeshStandardMaterial?P.environment:null,J.fog=P.fog,J.envMap=(w.isMeshStandardMaterial?G:x).get(w.envMap||J.environment),J.envMapRotation=J.environment!==null&&w.envMap===null?P.environmentRotation:w.envMapRotation,Re===void 0&&(w.addEventListener("dispose",Le),Re=new Map,J.programs=Re);let De=Re.get(ve);if(De!==void 0){if(J.currentProgram===De&&J.lightsStateVersion===le)return yh(w,ue),De}else ue.uniforms=_e.getUniforms(w),w.onBeforeCompile(ue,S),De=_e.acquireProgram(ue,ve),Re.set(ve,De),J.uniforms=ue.uniforms;const ye=J.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(ye.clippingPlanes=ne.uniform),yh(w,ue),J.needsLights=r_(w),J.lightsStateVersion=le,J.needsLights&&(ye.ambientLightColor.value=z.state.ambient,ye.lightProbe.value=z.state.probe,ye.directionalLights.value=z.state.directional,ye.directionalLightShadows.value=z.state.directionalShadow,ye.spotLights.value=z.state.spot,ye.spotLightShadows.value=z.state.spotShadow,ye.rectAreaLights.value=z.state.rectArea,ye.ltc_1.value=z.state.rectAreaLTC1,ye.ltc_2.value=z.state.rectAreaLTC2,ye.pointLights.value=z.state.point,ye.pointLightShadows.value=z.state.pointShadow,ye.hemisphereLights.value=z.state.hemi,ye.directionalShadowMap.value=z.state.directionalShadowMap,ye.directionalShadowMatrix.value=z.state.directionalShadowMatrix,ye.spotShadowMap.value=z.state.spotShadowMap,ye.spotLightMatrix.value=z.state.spotLightMatrix,ye.spotLightMap.value=z.state.spotLightMap,ye.pointShadowMap.value=z.state.pointShadowMap,ye.pointShadowMatrix.value=z.state.pointShadowMatrix),J.currentProgram=De,J.uniformsList=null,De}function Eh(w){if(w.uniformsList===null){const P=w.currentProgram.getUniforms();w.uniformsList=Js.seqWithValue(P.seq,w.uniforms)}return w.uniformsList}function yh(w,P){const H=Ee.get(w);H.outputColorSpace=P.outputColorSpace,H.batching=P.batching,H.batchingColor=P.batchingColor,H.instancing=P.instancing,H.instancingColor=P.instancingColor,H.instancingMorph=P.instancingMorph,H.skinning=P.skinning,H.morphTargets=P.morphTargets,H.morphNormals=P.morphNormals,H.morphColors=P.morphColors,H.morphTargetsCount=P.morphTargetsCount,H.numClippingPlanes=P.numClippingPlanes,H.numIntersection=P.numClipIntersection,H.vertexAlphas=P.vertexAlphas,H.vertexTangents=P.vertexTangents,H.toneMapping=P.toneMapping}function i_(w,P,H,J,z){P.isScene!==!0&&(P=ut),I.resetTextureUnits();const ie=P.fog,le=J.isMeshStandardMaterial?P.environment:null,ue=T===null?S.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:Hn,ve=(J.isMeshStandardMaterial?G:x).get(J.envMap||le),Re=J.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,De=!!H.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),ye=!!H.morphAttributes.position,Ke=!!H.morphAttributes.normal,et=!!H.morphAttributes.color;let _t=Yi;J.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(_t=S.toneMapping);const mt=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,je=mt!==void 0?mt.length:0,Ce=Ee.get(J),Tt=p.state.lights;if(Y===!0&&(re===!0||w!==b)){const Pt=w===b&&J.id===y;ne.setState(J,w,Pt)}let tt=!1;J.version===Ce.__version?(Ce.needsLights&&Ce.lightsStateVersion!==Tt.state.version||Ce.outputColorSpace!==ue||z.isBatchedMesh&&Ce.batching===!1||!z.isBatchedMesh&&Ce.batching===!0||z.isBatchedMesh&&Ce.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&Ce.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&Ce.instancing===!1||!z.isInstancedMesh&&Ce.instancing===!0||z.isSkinnedMesh&&Ce.skinning===!1||!z.isSkinnedMesh&&Ce.skinning===!0||z.isInstancedMesh&&Ce.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Ce.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&Ce.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&Ce.instancingMorph===!1&&z.morphTexture!==null||Ce.envMap!==ve||J.fog===!0&&Ce.fog!==ie||Ce.numClippingPlanes!==void 0&&(Ce.numClippingPlanes!==ne.numPlanes||Ce.numIntersection!==ne.numIntersection)||Ce.vertexAlphas!==Re||Ce.vertexTangents!==De||Ce.morphTargets!==ye||Ce.morphNormals!==Ke||Ce.morphColors!==et||Ce.toneMapping!==_t||Ce.morphTargetsCount!==je)&&(tt=!0):(tt=!0,Ce.__version=J.version);let xi=Ce.currentProgram;tt===!0&&(xi=$s(J,P,z));let pr=!1,$t=!1,kr=!1;const dt=xi.getUniforms(),oi=Ce.uniforms;if(xe.useProgram(xi.program)&&(pr=!0,$t=!0,kr=!0),J.id!==y&&(y=J.id,$t=!0),pr||b!==w){xe.buffers.depth.getReversed()?(ee.copy(w.projectionMatrix),yp(ee),wp(ee),dt.setValue(N,"projectionMatrix",ee)):dt.setValue(N,"projectionMatrix",w.projectionMatrix),dt.setValue(N,"viewMatrix",w.matrixWorldInverse);const Zt=dt.map.cameraPosition;Zt!==void 0&&Zt.setValue(N,be.setFromMatrixPosition(w.matrixWorld)),Ge.logarithmicDepthBuffer&&dt.setValue(N,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&dt.setValue(N,"isOrthographic",w.isOrthographicCamera===!0),b!==w&&(b=w,$t=!0,kr=!0)}if(z.isSkinnedMesh){dt.setOptional(N,z,"bindMatrix"),dt.setOptional(N,z,"bindMatrixInverse");const Pt=z.skeleton;Pt&&(Pt.boneTexture===null&&Pt.computeBoneTexture(),dt.setValue(N,"boneTexture",Pt.boneTexture,I))}z.isBatchedMesh&&(dt.setOptional(N,z,"batchingTexture"),dt.setValue(N,"batchingTexture",z._matricesTexture,I),dt.setOptional(N,z,"batchingIdTexture"),dt.setValue(N,"batchingIdTexture",z._indirectTexture,I),dt.setOptional(N,z,"batchingColorTexture"),z._colorsTexture!==null&&dt.setValue(N,"batchingColorTexture",z._colorsTexture,I));const li=H.morphAttributes;if((li.position!==void 0||li.normal!==void 0||li.color!==void 0)&&Ie.update(z,H,xi),($t||Ce.receiveShadow!==z.receiveShadow)&&(Ce.receiveShadow=z.receiveShadow,dt.setValue(N,"receiveShadow",z.receiveShadow)),J.isMeshGouraudMaterial&&J.envMap!==null&&(oi.envMap.value=ve,oi.flipEnvMap.value=ve.isCubeTexture&&ve.isRenderTargetTexture===!1?-1:1),J.isMeshStandardMaterial&&J.envMap===null&&P.environment!==null&&(oi.envMapIntensity.value=P.environmentIntensity),$t&&(dt.setValue(N,"toneMappingExposure",S.toneMappingExposure),Ce.needsLights&&n_(oi,kr),ie&&J.fog===!0&&ce.refreshFogUniforms(oi,ie),ce.refreshMaterialUniforms(oi,J,R,B,p.state.transmissionRenderTarget[w.id]),Js.upload(N,Eh(Ce),oi,I)),J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(Js.upload(N,Eh(Ce),oi,I),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&dt.setValue(N,"center",z.center),dt.setValue(N,"modelViewMatrix",z.modelViewMatrix),dt.setValue(N,"normalMatrix",z.normalMatrix),dt.setValue(N,"modelMatrix",z.matrixWorld),J.isShaderMaterial||J.isRawShaderMaterial){const Pt=J.uniformsGroups;for(let Zt=0,ll=Pt.length;Zt<ll;Zt++){const Cn=Pt[Zt];L.update(Cn,xi),L.bind(Cn,xi)}}return xi}function n_(w,P){w.ambientLightColor.needsUpdate=P,w.lightProbe.needsUpdate=P,w.directionalLights.needsUpdate=P,w.directionalLightShadows.needsUpdate=P,w.pointLights.needsUpdate=P,w.pointLightShadows.needsUpdate=P,w.spotLights.needsUpdate=P,w.spotLightShadows.needsUpdate=P,w.rectAreaLights.needsUpdate=P,w.hemisphereLights.needsUpdate=P}function r_(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(w,P,H){Ee.get(w.texture).__webglTexture=P,Ee.get(w.depthTexture).__webglTexture=H;const J=Ee.get(w);J.__hasExternalTextures=!0,J.__autoAllocateDepthBuffer=H===void 0,J.__autoAllocateDepthBuffer||We.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),J.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,P){const H=Ee.get(w);H.__webglFramebuffer=P,H.__useDefaultFramebuffer=P===void 0},this.setRenderTarget=function(w,P=0,H=0){T=w,C=P,U=H;let J=!0,z=null,ie=!1,le=!1;if(w){const ve=Ee.get(w);if(ve.__useDefaultFramebuffer!==void 0)xe.bindFramebuffer(N.FRAMEBUFFER,null),J=!1;else if(ve.__webglFramebuffer===void 0)I.setupRenderTarget(w);else if(ve.__hasExternalTextures)I.rebindTextures(w,Ee.get(w.texture).__webglTexture,Ee.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const ye=w.depthTexture;if(ve.__boundDepthTexture!==ye){if(ye!==null&&Ee.has(ye)&&(w.width!==ye.image.width||w.height!==ye.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(w)}}const Re=w.texture;(Re.isData3DTexture||Re.isDataArrayTexture||Re.isCompressedArrayTexture)&&(le=!0);const De=Ee.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(De[P])?z=De[P][H]:z=De[P],ie=!0):w.samples>0&&I.useMultisampledRTT(w)===!1?z=Ee.get(w).__webglMultisampledFramebuffer:Array.isArray(De)?z=De[H]:z=De,E.copy(w.viewport),D.copy(w.scissor),F=w.scissorTest}else E.copy(ae).multiplyScalar(R).floor(),D.copy(Me).multiplyScalar(R).floor(),F=Be;if(xe.bindFramebuffer(N.FRAMEBUFFER,z)&&J&&xe.drawBuffers(w,z),xe.viewport(E),xe.scissor(D),xe.setScissorTest(F),ie){const ve=Ee.get(w.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+P,ve.__webglTexture,H)}else if(le){const ve=Ee.get(w.texture),Re=P||0;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,ve.__webglTexture,H||0,Re)}y=-1},this.readRenderTargetPixels=function(w,P,H,J,z,ie,le){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ue=Ee.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&le!==void 0&&(ue=ue[le]),ue){xe.bindFramebuffer(N.FRAMEBUFFER,ue);try{const ve=w.texture,Re=ve.format,De=ve.type;if(!Ge.textureFormatReadable(Re)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ge.textureTypeReadable(De)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}P>=0&&P<=w.width-J&&H>=0&&H<=w.height-z&&N.readPixels(P,H,J,z,ke.convert(Re),ke.convert(De),ie)}finally{const ve=T!==null?Ee.get(T).__webglFramebuffer:null;xe.bindFramebuffer(N.FRAMEBUFFER,ve)}}},this.readRenderTargetPixelsAsync=async function(w,P,H,J,z,ie,le){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ue=Ee.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&le!==void 0&&(ue=ue[le]),ue){const ve=w.texture,Re=ve.format,De=ve.type;if(!Ge.textureFormatReadable(Re))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ge.textureTypeReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(P>=0&&P<=w.width-J&&H>=0&&H<=w.height-z){xe.bindFramebuffer(N.FRAMEBUFFER,ue);const ye=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,ye),N.bufferData(N.PIXEL_PACK_BUFFER,ie.byteLength,N.STREAM_READ),N.readPixels(P,H,J,z,ke.convert(Re),ke.convert(De),0);const Ke=T!==null?Ee.get(T).__webglFramebuffer:null;xe.bindFramebuffer(N.FRAMEBUFFER,Ke);const et=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Ep(N,et,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,ye),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,ie),N.deleteBuffer(ye),N.deleteSync(et),ie}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,P=null,H=0){w.isTexture!==!0&&(Zn("WebGLRenderer: copyFramebufferToTexture function signature has changed."),P=arguments[0]||null,w=arguments[1]);const J=Math.pow(2,-H),z=Math.floor(w.image.width*J),ie=Math.floor(w.image.height*J),le=P!==null?P.x:0,ue=P!==null?P.y:0;I.setTexture2D(w,0),N.copyTexSubImage2D(N.TEXTURE_2D,H,0,0,le,ue,z,ie),xe.unbindTexture()};const s_=N.createFramebuffer(),a_=N.createFramebuffer();this.copyTextureToTexture=function(w,P,H=null,J=null,z=0,ie=null){w.isTexture!==!0&&(Zn("WebGLRenderer: copyTextureToTexture function signature has changed."),J=arguments[0]||null,w=arguments[1],P=arguments[2],ie=arguments[3]||0,H=null),ie===null&&(z!==0?(Zn("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ie=z,z=0):ie=0);let le,ue,ve,Re,De,ye,Ke,et,_t;const mt=w.isCompressedTexture?w.mipmaps[ie]:w.image;if(H!==null)le=H.max.x-H.min.x,ue=H.max.y-H.min.y,ve=H.isBox3?H.max.z-H.min.z:1,Re=H.min.x,De=H.min.y,ye=H.isBox3?H.min.z:0;else{const li=Math.pow(2,-z);le=Math.floor(mt.width*li),ue=Math.floor(mt.height*li),w.isDataArrayTexture?ve=mt.depth:w.isData3DTexture?ve=Math.floor(mt.depth*li):ve=1,Re=0,De=0,ye=0}J!==null?(Ke=J.x,et=J.y,_t=J.z):(Ke=0,et=0,_t=0);const je=ke.convert(P.format),Ce=ke.convert(P.type);let Tt;P.isData3DTexture?(I.setTexture3D(P,0),Tt=N.TEXTURE_3D):P.isDataArrayTexture||P.isCompressedArrayTexture?(I.setTexture2DArray(P,0),Tt=N.TEXTURE_2D_ARRAY):(I.setTexture2D(P,0),Tt=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,P.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,P.unpackAlignment);const tt=N.getParameter(N.UNPACK_ROW_LENGTH),xi=N.getParameter(N.UNPACK_IMAGE_HEIGHT),pr=N.getParameter(N.UNPACK_SKIP_PIXELS),$t=N.getParameter(N.UNPACK_SKIP_ROWS),kr=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,mt.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,mt.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Re),N.pixelStorei(N.UNPACK_SKIP_ROWS,De),N.pixelStorei(N.UNPACK_SKIP_IMAGES,ye);const dt=w.isDataArrayTexture||w.isData3DTexture,oi=P.isDataArrayTexture||P.isData3DTexture;if(w.isDepthTexture){const li=Ee.get(w),Pt=Ee.get(P),Zt=Ee.get(li.__renderTarget),ll=Ee.get(Pt.__renderTarget);xe.bindFramebuffer(N.READ_FRAMEBUFFER,Zt.__webglFramebuffer),xe.bindFramebuffer(N.DRAW_FRAMEBUFFER,ll.__webglFramebuffer);for(let Cn=0;Cn<ve;Cn++)dt&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ee.get(w).__webglTexture,z,ye+Cn),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ee.get(P).__webglTexture,ie,_t+Cn)),N.blitFramebuffer(Re,De,le,ue,Ke,et,le,ue,N.DEPTH_BUFFER_BIT,N.NEAREST);xe.bindFramebuffer(N.READ_FRAMEBUFFER,null),xe.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(z!==0||w.isRenderTargetTexture||Ee.has(w)){const li=Ee.get(w),Pt=Ee.get(P);xe.bindFramebuffer(N.READ_FRAMEBUFFER,s_),xe.bindFramebuffer(N.DRAW_FRAMEBUFFER,a_);for(let Zt=0;Zt<ve;Zt++)dt?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,li.__webglTexture,z,ye+Zt):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,li.__webglTexture,z),oi?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Pt.__webglTexture,ie,_t+Zt):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Pt.__webglTexture,ie),z!==0?N.blitFramebuffer(Re,De,le,ue,Ke,et,le,ue,N.COLOR_BUFFER_BIT,N.NEAREST):oi?N.copyTexSubImage3D(Tt,ie,Ke,et,_t+Zt,Re,De,le,ue):N.copyTexSubImage2D(Tt,ie,Ke,et,Re,De,le,ue);xe.bindFramebuffer(N.READ_FRAMEBUFFER,null),xe.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else oi?w.isDataTexture||w.isData3DTexture?N.texSubImage3D(Tt,ie,Ke,et,_t,le,ue,ve,je,Ce,mt.data):P.isCompressedArrayTexture?N.compressedTexSubImage3D(Tt,ie,Ke,et,_t,le,ue,ve,je,mt.data):N.texSubImage3D(Tt,ie,Ke,et,_t,le,ue,ve,je,Ce,mt):w.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,ie,Ke,et,le,ue,je,Ce,mt.data):w.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,ie,Ke,et,mt.width,mt.height,je,mt.data):N.texSubImage2D(N.TEXTURE_2D,ie,Ke,et,le,ue,je,Ce,mt);N.pixelStorei(N.UNPACK_ROW_LENGTH,tt),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,xi),N.pixelStorei(N.UNPACK_SKIP_PIXELS,pr),N.pixelStorei(N.UNPACK_SKIP_ROWS,$t),N.pixelStorei(N.UNPACK_SKIP_IMAGES,kr),ie===0&&P.generateMipmaps&&N.generateMipmap(Tt),xe.unbindTexture()},this.copyTextureToTexture3D=function(w,P,H=null,J=null,z=0){return w.isTexture!==!0&&(Zn("WebGLRenderer: copyTextureToTexture3D function signature has changed."),H=arguments[0]||null,J=arguments[1]||null,w=arguments[2],P=arguments[3],z=arguments[4]||0),Zn('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,P,H,J,z)},this.initRenderTarget=function(w){Ee.get(w).__webglFramebuffer===void 0&&I.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?I.setTextureCube(w,0):w.isData3DTexture?I.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?I.setTexture2DArray(w,0):I.setTexture2D(w,0),xe.unbindTexture()},this.resetState=function(){C=0,U=0,T=null,xe.reset(),at.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Di}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=ze._getDrawingBufferColorSpace(e),t.unpackColorSpace=ze._getUnpackColorSpace()}}const pA=/^[og]\s*(.+)?/,mA=/^mtllib /,gA=/^usemtl /,vA=/^usemap /,eh=/\s+/,th=new W,qo=new W,ih=new W,nh=new W,ri=new W,Xs=new Pe;function AA(){const n={objects:[],object:{},vertices:[],normals:[],colors:[],uvs:[],materials:{},materialLibraries:[],startObject:function(e,t){if(this.object&&this.object.fromDeclaration===!1){this.object.name=e,this.object.fromDeclaration=t!==!1;return}const i=this.object&&typeof this.object.currentMaterial=="function"?this.object.currentMaterial():void 0;if(this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0),this.object={name:e||"",fromDeclaration:t!==!1,geometry:{vertices:[],normals:[],colors:[],uvs:[],hasUVIndices:!1},materials:[],smooth:!0,startMaterial:function(r,s){const a=this._finalize(!1);a&&(a.inherited||a.groupCount<=0)&&this.materials.splice(a.index,1);const o={index:this.materials.length,name:r||"",mtllib:Array.isArray(s)&&s.length>0?s[s.length-1]:"",smooth:a!==void 0?a.smooth:this.smooth,groupStart:a!==void 0?a.groupEnd:0,groupEnd:-1,groupCount:-1,inherited:!1,clone:function(l){const c={index:typeof l=="number"?l:this.index,name:this.name,mtllib:this.mtllib,smooth:this.smooth,groupStart:0,groupEnd:-1,groupCount:-1,inherited:!1};return c.clone=this.clone.bind(c),c}};return this.materials.push(o),o},currentMaterial:function(){if(this.materials.length>0)return this.materials[this.materials.length-1]},_finalize:function(r){const s=this.currentMaterial();if(s&&s.groupEnd===-1&&(s.groupEnd=this.geometry.vertices.length/3,s.groupCount=s.groupEnd-s.groupStart,s.inherited=!1),r&&this.materials.length>1)for(let a=this.materials.length-1;a>=0;a--)this.materials[a].groupCount<=0&&this.materials.splice(a,1);return r&&this.materials.length===0&&this.materials.push({name:"",smooth:this.smooth}),s}},i&&i.name&&typeof i.clone=="function"){const r=i.clone(0);r.inherited=!0,this.object.materials.push(r)}this.objects.push(this.object)},finalize:function(){this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0)},parseVertexIndex:function(e,t){const i=parseInt(e,10);return(i>=0?i-1:i+t/3)*3},parseNormalIndex:function(e,t){const i=parseInt(e,10);return(i>=0?i-1:i+t/3)*3},parseUVIndex:function(e,t){const i=parseInt(e,10);return(i>=0?i-1:i+t/2)*2},addVertex:function(e,t,i){const r=this.vertices,s=this.object.geometry.vertices;s.push(r[e+0],r[e+1],r[e+2]),s.push(r[t+0],r[t+1],r[t+2]),s.push(r[i+0],r[i+1],r[i+2])},addVertexPoint:function(e){const t=this.vertices;this.object.geometry.vertices.push(t[e+0],t[e+1],t[e+2])},addVertexLine:function(e){const t=this.vertices;this.object.geometry.vertices.push(t[e+0],t[e+1],t[e+2])},addNormal:function(e,t,i){const r=this.normals,s=this.object.geometry.normals;s.push(r[e+0],r[e+1],r[e+2]),s.push(r[t+0],r[t+1],r[t+2]),s.push(r[i+0],r[i+1],r[i+2])},addFaceNormal:function(e,t,i){const r=this.vertices,s=this.object.geometry.normals;th.fromArray(r,e),qo.fromArray(r,t),ih.fromArray(r,i),ri.subVectors(ih,qo),nh.subVectors(th,qo),ri.cross(nh),ri.normalize(),s.push(ri.x,ri.y,ri.z),s.push(ri.x,ri.y,ri.z),s.push(ri.x,ri.y,ri.z)},addColor:function(e,t,i){const r=this.colors,s=this.object.geometry.colors;r[e]!==void 0&&s.push(r[e+0],r[e+1],r[e+2]),r[t]!==void 0&&s.push(r[t+0],r[t+1],r[t+2]),r[i]!==void 0&&s.push(r[i+0],r[i+1],r[i+2])},addUV:function(e,t,i){const r=this.uvs,s=this.object.geometry.uvs;s.push(r[e+0],r[e+1]),s.push(r[t+0],r[t+1]),s.push(r[i+0],r[i+1])},addDefaultUV:function(){const e=this.object.geometry.uvs;e.push(0,0),e.push(0,0),e.push(0,0)},addUVLine:function(e){const t=this.uvs;this.object.geometry.uvs.push(t[e+0],t[e+1])},addFace:function(e,t,i,r,s,a,o,l,c){const d=this.vertices.length;let h=this.parseVertexIndex(e,d),f=this.parseVertexIndex(t,d),u=this.parseVertexIndex(i,d);if(this.addVertex(h,f,u),this.addColor(h,f,u),o!==void 0&&o!==""){const g=this.normals.length;h=this.parseNormalIndex(o,g),f=this.parseNormalIndex(l,g),u=this.parseNormalIndex(c,g),this.addNormal(h,f,u)}else this.addFaceNormal(h,f,u);if(r!==void 0&&r!==""){const g=this.uvs.length;h=this.parseUVIndex(r,g),f=this.parseUVIndex(s,g),u=this.parseUVIndex(a,g),this.addUV(h,f,u),this.object.geometry.hasUVIndices=!0}else this.addDefaultUV()},addPointGeometry:function(e){this.object.geometry.type="Points";const t=this.vertices.length;for(let i=0,r=e.length;i<r;i++){const s=this.parseVertexIndex(e[i],t);this.addVertexPoint(s),this.addColor(s)}},addLineGeometry:function(e,t){this.object.geometry.type="Line";const i=this.vertices.length,r=this.uvs.length;for(let s=0,a=e.length;s<a;s++)this.addVertexLine(this.parseVertexIndex(e[s],i));for(let s=0,a=t.length;s<a;s++)this.addUVLine(this.parseUVIndex(t[s],r))}};return n.startObject("",!1),n}class _A extends cr{constructor(e){super(e),this.materials=null}load(e,t,i,r){const s=this,a=new Ad(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(o){try{t(s.parse(o))}catch(l){r?r(l):console.error(l),s.manager.itemError(e)}},i,r)}setMaterials(e){return this.materials=e,this}parse(e){const t=new AA;e.indexOf(`\r
`)!==-1&&(e=e.replace(/\r\n/g,`
`)),e.indexOf(`\\
`)!==-1&&(e=e.replace(/\\\n/g,""));const i=e.split(`
`);let r=[];for(let o=0,l=i.length;o<l;o++){const c=i[o].trimStart();if(c.length===0)continue;const d=c.charAt(0);if(d!=="#")if(d==="v"){const h=c.split(eh);switch(h[0]){case"v":t.vertices.push(parseFloat(h[1]),parseFloat(h[2]),parseFloat(h[3])),h.length>=7?(Xs.setRGB(parseFloat(h[4]),parseFloat(h[5]),parseFloat(h[6]),Mt),t.colors.push(Xs.r,Xs.g,Xs.b)):t.colors.push(void 0,void 0,void 0);break;case"vn":t.normals.push(parseFloat(h[1]),parseFloat(h[2]),parseFloat(h[3]));break;case"vt":t.uvs.push(parseFloat(h[1]),parseFloat(h[2]));break}}else if(d==="f"){const f=c.slice(1).trim().split(eh),u=[];for(let v=0,m=f.length;v<m;v++){const p=f[v];if(p.length>0){const A=p.split("/");u.push(A)}}const g=u[0];for(let v=1,m=u.length-1;v<m;v++){const p=u[v],A=u[v+1];t.addFace(g[0],p[0],A[0],g[1],p[1],A[1],g[2],p[2],A[2])}}else if(d==="l"){const h=c.substring(1).trim().split(" ");let f=[];const u=[];if(c.indexOf("/")===-1)f=h;else for(let g=0,v=h.length;g<v;g++){const m=h[g].split("/");m[0]!==""&&f.push(m[0]),m[1]!==""&&u.push(m[1])}t.addLineGeometry(f,u)}else if(d==="p"){const f=c.slice(1).trim().split(" ");t.addPointGeometry(f)}else if((r=pA.exec(c))!==null){const h=(" "+r[0].slice(1).trim()).slice(1);t.startObject(h)}else if(gA.test(c))t.object.startMaterial(c.substring(7).trim(),t.materialLibraries);else if(mA.test(c))t.materialLibraries.push(c.substring(7).trim());else if(vA.test(c))console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');else if(d==="s"){if(r=c.split(" "),r.length>1){const f=r[1].trim().toLowerCase();t.object.smooth=f!=="0"&&f!=="off"}else t.object.smooth=!0;const h=t.object.currentMaterial();h&&(h.smooth=t.object.smooth)}else{if(c==="\0")continue;console.warn('THREE.OBJLoader: Unexpected line: "'+c+'"')}}t.finalize();const s=new Pr;if(s.materialLibraries=[].concat(t.materialLibraries),!(t.objects.length===1&&t.objects[0].geometry.vertices.length===0)===!0)for(let o=0,l=t.objects.length;o<l;o++){const c=t.objects[o],d=c.geometry,h=c.materials,f=d.type==="Line",u=d.type==="Points";let g=!1;if(d.vertices.length===0)continue;const v=new Si;v.setAttribute("position",new Nt(d.vertices,3)),d.normals.length>0&&v.setAttribute("normal",new Nt(d.normals,3)),d.colors.length>0&&(g=!0,v.setAttribute("color",new Nt(d.colors,3))),d.hasUVIndices===!0&&v.setAttribute("uv",new Nt(d.uvs,2));const m=[];for(let A=0,_=h.length;A<_;A++){const S=h[A],M=S.name+"_"+S.smooth+"_"+g;let C=t.materials[M];if(this.materials!==null){if(C=this.materials.create(S.name),f&&C&&!(C instanceof Ds)){const U=new Ds;Oi.prototype.copy.call(U,C),U.color.copy(C.color),C=U}else if(u&&C&&!(C instanceof Lr)){const U=new Lr({size:10,sizeAttenuation:!1});Oi.prototype.copy.call(U,C),U.color.copy(C.color),U.map=C.map,C=U}}C===void 0&&(f?C=new Ds:u?C=new Lr({size:1,sizeAttenuation:!1}):C=new Oo,C.name=S.name,C.flatShading=!S.smooth,C.vertexColors=g,t.materials[M]=C),m.push(C)}let p;if(m.length>1){for(let A=0,_=h.length;A<_;A++){const S=h[A];v.addGroup(S.groupStart,S.groupCount,A)}f?p=new fd(v,m):u?p=new ko(v,m):p=new Wt(v,m)}else f?p=new fd(v,m[0]):u?p=new ko(v,m[0]):p=new Wt(v,m[0]);p.name=c.name,s.add(p)}else if(t.vertices.length>0){const o=new Lr({size:1,sizeAttenuation:!1}),l=new Si;l.setAttribute("position",new Nt(t.vertices,3)),t.colors.length>0&&t.colors[0]!==void 0&&(l.setAttribute("color",new Nt(t.colors,3)),o.vertexColors=!0);const c=new ko(l,o);s.add(c)}return s}}class SA extends cr{constructor(e){super(e)}load(e,t,i,r){const s=this,a=this.path===""?lm.extractUrlBase(e):this.path,o=new Ad(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(l){try{t(s.parse(l,a))}catch(c){r?r(c):console.error(c),s.manager.itemError(e)}},i,r)}setMaterialOptions(e){return this.materialOptions=e,this}parse(e,t){const i=e.split(`
`);let r={};const s=/\s+/,a={};for(let l=0;l<i.length;l++){let c=i[l];if(c=c.trim(),c.length===0||c.charAt(0)==="#")continue;const d=c.indexOf(" ");let h=d>=0?c.substring(0,d):c;h=h.toLowerCase();let f=d>=0?c.substring(d+1):"";if(f=f.trim(),h==="newmtl")r={name:f},a[f]=r;else if(h==="ka"||h==="kd"||h==="ks"||h==="ke"){const u=f.split(s,3);r[h]=[parseFloat(u[0]),parseFloat(u[1]),parseFloat(u[2])]}else r[h]=f}const o=new bA(this.resourcePath||t,this.materialOptions);return o.setCrossOrigin(this.crossOrigin),o.setManager(this.manager),o.setMaterials(a),o}}class bA{constructor(e="",t={}){this.baseUrl=e,this.options=t,this.materialsInfo={},this.materials={},this.materialsArray=[],this.nameLookup={},this.crossOrigin="anonymous",this.side=this.options.side!==void 0?this.options.side:Fi,this.wrap=this.options.wrap!==void 0?this.options.wrap:as}setCrossOrigin(e){return this.crossOrigin=e,this}setManager(e){this.manager=e}setMaterials(e){this.materialsInfo=this.convert(e),this.materials={},this.materialsArray=[],this.nameLookup={}}convert(e){if(!this.options)return e;const t={};for(const i in e){const r=e[i],s={};t[i]=s;for(const a in r){let o=!0,l=r[a];const c=a.toLowerCase();switch(c){case"kd":case"ka":case"ks":this.options&&this.options.normalizeRGB&&(l=[l[0]/255,l[1]/255,l[2]/255]),this.options&&this.options.ignoreZeroRGBs&&l[0]===0&&l[1]===0&&l[2]===0&&(o=!1);break}o&&(s[c]=l)}}return t}preload(){for(const e in this.materialsInfo)this.create(e)}getIndex(e){return this.nameLookup[e]}getAsArray(){let e=0;for(const t in this.materialsInfo)this.materialsArray[e]=this.create(t),this.nameLookup[t]=e,e++;return this.materialsArray}create(e){return this.materials[e]===void 0&&this.createMaterial_(e),this.materials[e]}createMaterial_(e){const t=this,i=this.materialsInfo[e],r={name:e,side:this.side};function s(o,l){return typeof l!="string"||l===""?"":/^https?:\/\//i.test(l)?l:o+l}function a(o,l){if(r[o])return;const c=t.getTextureParams(l,r),d=t.loadTexture(s(t.baseUrl,c.url));d.repeat.copy(c.scale),d.offset.copy(c.offset),d.wrapS=t.wrap,d.wrapT=t.wrap,(o==="map"||o==="emissiveMap")&&(d.colorSpace=Mt),r[o]=d}for(const o in i){const l=i[o];let c;if(l!=="")switch(o.toLowerCase()){case"kd":r.color=ze.toWorkingColorSpace(new Pe().fromArray(l),Mt);break;case"ks":r.specular=ze.toWorkingColorSpace(new Pe().fromArray(l),Mt);break;case"ke":r.emissive=ze.toWorkingColorSpace(new Pe().fromArray(l),Mt);break;case"map_kd":a("map",l);break;case"map_ks":a("specularMap",l);break;case"map_ke":a("emissiveMap",l);break;case"norm":a("normalMap",l);break;case"map_bump":case"bump":a("bumpMap",l);break;case"map_d":a("alphaMap",l),r.transparent=!0;break;case"ns":r.shininess=parseFloat(l);break;case"d":c=parseFloat(l),c<1&&(r.opacity=c,r.transparent=!0);break;case"tr":c=parseFloat(l),this.options&&this.options.invertTrProperty&&(c=1-c),c>0&&(r.opacity=1-c,r.transparent=!0);break}}return this.materials[e]=new Oo(r),this.materials[e]}getTextureParams(e,t){const i={scale:new Qe(1,1),offset:new Qe(0,0)},r=e.split(/\s+/);let s;return s=r.indexOf("-bm"),s>=0&&(t.bumpScale=parseFloat(r[s+1]),r.splice(s,2)),s=r.indexOf("-s"),s>=0&&(i.scale.set(parseFloat(r[s+1]),parseFloat(r[s+2])),r.splice(s,4)),s=r.indexOf("-o"),s>=0&&(i.offset.set(parseFloat(r[s+1]),parseFloat(r[s+2])),r.splice(s,4)),i.url=r.join(" ").trim(),i}loadTexture(e,t,i,r,s){const a=this.manager!==void 0?this.manager:vd;let o=a.getHandler(e);o===null&&(o=new nm(a)),o.setCrossOrigin&&o.setCrossOrigin(this.crossOrigin);const l=o.load(e,i,r,s);return t!==void 0&&(l.mapping=t),l}}const rh={type:"change"},$o={type:"start"},sh={type:"end"},Ys=new bs,ah=new sn,xA=Math.cos(70*bp.DEG2RAD),Et=new W,Gt=2*Math.PI,st={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},el=1e-6;class EA extends dm{constructor(e,t=null){super(e,t),this.state=st.NONE,this.enabled=!0,this.target=new W,this.cursor=new W,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Nn.ROTATE,MIDDLE:Nn.DOLLY,RIGHT:Nn.PAN},this.touches={ONE:Ln.ROTATE,TWO:Ln.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new W,this._lastQuaternion=new mn,this._lastTargetPosition=new W,this._quat=new mn().setFromUnitVectors(e.up,new W(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ed,this._sphericalDelta=new Ed,this._scale=1,this._panOffset=new W,this._rotateStart=new Qe,this._rotateEnd=new Qe,this._rotateDelta=new Qe,this._panStart=new Qe,this._panEnd=new Qe,this._panDelta=new Qe,this._dollyStart=new Qe,this._dollyEnd=new Qe,this._dollyDelta=new Qe,this._dollyDirection=new W,this._mouse=new Qe,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=wA.bind(this),this._onPointerDown=yA.bind(this),this._onPointerUp=CA.bind(this),this._onContextMenu=BA.bind(this),this._onMouseWheel=TA.bind(this),this._onKeyDown=FA.bind(this),this._onTouchStart=IA.bind(this),this._onTouchMove=RA.bind(this),this._onMouseDown=UA.bind(this),this._onMouseMove=MA.bind(this),this._interceptControlDown=DA.bind(this),this._interceptControlUp=QA.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(rh),this.update(),this.state=st.NONE}update(e=null){const t=this.object.position;Et.copy(t).sub(this.target),Et.applyQuaternion(this._quat),this._spherical.setFromVector3(Et),this.autoRotate&&this.state===st.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=Gt:i>Math.PI&&(i-=Gt),r<-Math.PI?r+=Gt:r>Math.PI&&(r-=Gt),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=a!=this._spherical.radius}if(Et.setFromSpherical(this._spherical),Et.applyQuaternion(this._quatInverse),t.copy(this.target).add(Et),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Et.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const o=new W(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new W(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Et.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Ys.origin.copy(this.object.position),Ys.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ys.direction))<xA?this.object.lookAt(this.target):(ah.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ys.intersectPlane(ah,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>el||8*(1-this._lastQuaternion.dot(this.object.quaternion))>el||this._lastTargetPosition.distanceToSquared(this.target)>el?(this.dispatchEvent(rh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Gt/60*this.autoRotateSpeed*e:Gt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Et.setFromMatrixColumn(t,0),Et.multiplyScalar(-e),this._panOffset.add(Et)}_panUp(e,t){this.screenSpacePanning===!0?Et.setFromMatrixColumn(t,1):(Et.setFromMatrixColumn(t,0),Et.crossVectors(this.object.up,Et)),Et.multiplyScalar(e),this._panOffset.add(Et)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;Et.copy(r).sub(this.target);let s=Et.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*t*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=e-i.left,s=t-i.top,a=i.width,o=i.height;this._mouse.x=r/a*2-1,this._mouse.y=-(s/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Gt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Gt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Gt*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Gt*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Gt*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Gt*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(i,r)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Gt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Gt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Qe,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function yA(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function wA(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function CA(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(sh),this.state=st.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function UA(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Nn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=st.DOLLY;break;case Nn.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=st.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=st.ROTATE}break;case Nn.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=st.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=st.PAN}break;default:this.state=st.NONE}this.state!==st.NONE&&this.dispatchEvent($o)}function MA(n){switch(this.state){case st.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case st.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case st.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function TA(n){this.enabled===!1||this.enableZoom===!1||this.state!==st.NONE||(n.preventDefault(),this.dispatchEvent($o),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(sh))}function FA(n){this.enabled!==!1&&this._handleKeyDown(n)}function IA(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Ln.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=st.TOUCH_ROTATE;break;case Ln.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=st.TOUCH_PAN;break;default:this.state=st.NONE}break;case 2:switch(this.touches.TWO){case Ln.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=st.TOUCH_DOLLY_PAN;break;case Ln.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=st.TOUCH_DOLLY_ROTATE;break;default:this.state=st.NONE}break;default:this.state=st.NONE}this.state!==st.NONE&&this.dispatchEvent($o)}function RA(n){switch(this._trackPointer(n),this.state){case st.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case st.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case st.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case st.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=st.NONE}}function BA(n){this.enabled!==!1&&n.preventDefault()}function DA(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function QA(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class oh extends on{modelUrl="";materialUrl="";debugMode=!1;cameraPosition="3,3,3";cameraTarget="0,0,0";showTexture=!0;scene;camera;renderer;controls;animationId;container;currentModel;originalMaterials=new Map;resizeObserver;externalCanvas;static get observedAttributes(){return["show","debug-mode","camera-position","camera-target","show-texture","material-url"]}attributeChangedCallback(e,t,i){e==="show"?this.isShow=i==="true":e==="debug-mode"?this.debugMode=i==="true"||i==="":e==="camera-position"?this.cameraPosition=i||"3,3,3":e==="camera-target"?this.cameraTarget=i||"0,0,0":e==="show-texture"?this.showTexture=i!=="false":e==="material-url"&&(this.materialUrl=i||""),e==="debug-mode"&&this.isShow&&this.render(),super.attributeChangedCallback(e,t,i)}async doOpen(e){this.modelUrl=e,this.showTexture=!0,await this.initializeViewer()}doClose(){this.cleanup(),this.modelUrl="",this.materialUrl=""}getViewerContent(){return`
      <div class="model-container">
        ${this.modelUrl?`
        ${this.isLoading?'<div class="loading">Loading...</div>':""}
        ${!this.isLoading&&this.debugMode?`
          <div class="debug-info" style="z-index: calc(var(--cc-viewer-z-index-each, 1000) + 5);">
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
        z-index: calc(var(--cc-viewer-z-index-each, 1000) + 10);
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
        z-index: calc(var(--cc-viewer-z-index-each, 1000) + 10);
        pointer-events: auto;
      }
      
      .texture-toggle:hover {
        background: rgba(0, 0, 0, 0.9);
      }
    `}onAfterRender(){const e=this.query(".texture-toggle");e&&e.addEventListener("click",()=>this.toggleTexture())}cleanup(){this.animationId&&(cancelAnimationFrame(this.animationId),this.animationId=void 0),this.renderer&&(this.renderer.dispose(),this.renderer.domElement.parentNode===document.body&&document.body.removeChild(this.renderer.domElement),this.renderer=void 0),this.controls&&(this.controls.dispose(),this.controls=void 0),this.scene&&(this.scene.traverse(e=>{e instanceof Wt&&(e.geometry?.dispose(),Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material?.dispose())}),this.scene.clear()),this.scene=void 0,this.camera=void 0,this.currentModel=void 0,this.originalMaterials.clear(),this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=void 0),this.container=void 0}storeOriginalMaterials(e){e.traverse(t=>{t instanceof Wt&&this.originalMaterials.set(t,t.material)})}toggleTexture(){this.showTexture=!this.showTexture,this.currentModel&&(this.currentModel.traverse(e=>{if(e instanceof Wt)if(this.showTexture){const t=this.originalMaterials.get(e);t&&(e.material=t)}else{const t=new Pe(13421772);e.material=new Oo({color:t})}}),this.render())}getCameraDebugInfo(){if(!this.camera)return"N/A";const e=this.camera.position;return`${e.x.toFixed(2)}, ${e.y.toFixed(2)}, ${e.z.toFixed(2)}`}getTargetDebugInfo(){if(!this.controls)return"N/A";const e=this.controls.target;return`${e.x.toFixed(2)}, ${e.y.toFixed(2)}, ${e.z.toFixed(2)}`}updateDebugInfo(){const e=this.query(".debug-info");e&&this.debugMode&&(e.innerHTML=`
        Camera Position: ${this.getCameraDebugInfo()}<br>
        Camera Target: ${this.getTargetDebugInfo()}<br>
        Controls: Rotate (drag), Zoom (scroll), Pan (right-drag)
      `)}async initializeViewer(){if(await new Promise(d=>setTimeout(d,50)),this.container=this.query(".model-container"),!this.container)return;const e=this.container.getBoundingClientRect();this.scene=new Xp,this.scene.background=new Pe(3158064);const t=this.container.clientWidth||this.container.offsetWidth,i=this.container.clientHeight||this.container.offsetHeight;this.camera=new ni(75,t/i,.1,1e3),this.renderer=new fA({antialias:!0,alpha:!0}),this.renderer.setSize(t,i),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.shadowMap.enabled=!0;const r=this.renderer.domElement;r.style.position="fixed",r.style.left=`${e.left}px`,r.style.top=`${e.top}px`,r.style.width=`${e.width}px`,r.style.height=`${e.height}px`,r.style.pointerEvents="auto";const a=window.getComputedStyle(this).getPropertyValue("--cc-viewer-z-index-each").trim(),o=a?parseInt(a,10):1e3;r.style.zIndex=`${o+1}`,document.body.appendChild(r),this.externalCanvas=r,this.controls=new EA(this.camera,r),this.controls.enableDamping=!0,this.controls.dampingFactor=.05;const l=new om(4210752,2),c=new am(16777215,1);c.position.set(1,1,1),this.scene.add(l,c),await this.loadModel(),this.resizeObserver=new ResizeObserver(d=>{for(const h of d){const{width:f,height:u}=h.contentRect;f>0&&u>0&&this.handleResize()}}),this.resizeObserver.observe(this.container),this.animateLoop()}async loadModel(){const e=new _A;if(this.materialUrl){const d=new SA,h=this.materialUrl.substring(0,this.materialUrl.lastIndexOf("/")+1);d.setPath(h);const f=await new Promise((u,g)=>{const v=this.materialUrl.substring(this.materialUrl.lastIndexOf("/")+1);d.load(v,u,void 0,g)});f.preload(),e.setMaterials(f)}const t=this.modelUrl.substring(0,this.modelUrl.lastIndexOf("/")+1);e.setPath(t);const i=await new Promise((d,h)=>{const f=this.modelUrl.substring(this.modelUrl.lastIndexOf("/")+1);e.load(f,d,void 0,h)}),r=new Kn().setFromObject(i),s=new W;r.getSize(s);const a=Math.max(s.x,s.y,s.z);i.scale.multiplyScalar(3/a);const o=new W;if(r.getCenter(o),i.position.sub(o.multiplyScalar(i.scale.x)),!this.scene)return;this.scene.add(i),this.currentModel=i,this.storeOriginalMaterials(i);const l=this.cameraPosition.split(",").map(d=>parseFloat(d.trim())),c=this.cameraTarget.split(",").map(d=>parseFloat(d.trim()));l.length===3&&this.camera.position.set(l[0],l[1],l[2]),c.length===3&&(this.camera.lookAt(c[0],c[1],c[2]),this.controls.target.set(c[0],c[1],c[2])),this.controls.update(),this.renderer&&this.scene&&this.camera&&this.renderer.render(this.scene,this.camera)}animateLoop=()=>{!this.renderer||!this.scene||!this.camera||(this.animationId=requestAnimationFrame(this.animateLoop),this.controls&&this.controls.update(),this.renderer.render(this.scene,this.camera),this.updateDebugInfo())};handleResize(){if(!this.container||!this.camera||!this.renderer)return;const e=this.container.getBoundingClientRect(),t=e.width,i=e.height;if(t>0&&i>0){this.camera.aspect=t/i,this.camera.updateProjectionMatrix(),this.renderer.setSize(t,i);const r=this.renderer.domElement;r.style.left=`${e.left}px`,r.style.top=`${e.top}px`,r.style.width=`${e.width}px`,r.style.height=`${e.height}px`}}}customElements.get("cc-viewer-3dmodel")||customElements.define("cc-viewer-3dmodel",oh);class lh extends on{splatUrl="";debugMode=!1;cameraPosition="3,3,3";_cameraTarget="0,0,0";scene;camera;renderer;controls;animationId;canvas;swiper;static get observedAttributes(){return["show","debug-mode","camera-position","camera-target"]}attributeChangedCallback(e,t,i){e==="show"?this.isShow=i==="true":e==="debug-mode"?this.debugMode=i==="true":e==="camera-position"?this.cameraPosition=i||"3,3,3":e==="camera-target"&&(this._cameraTarget=i||"0,0,0"),super.attributeChangedCallback(e,t,i)}async doOpen(e){this.splatUrl=e,await this.initializeViewer()}doClose(){this.cleanup()}getViewerContent(){return""}shouldUseCustomRender(){return!0}customRender(){const e=this.css`
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
        z-index: var(--cc-viewer-z-index-each, 1000);
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
        z-index: calc(var(--cc-viewer-z-index-each, 1000) + 3);
      }
      
      ${this.getNavigationStyles()}
    `,t=`
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
      `,i=`
      ${e}
      <div class="backdrop" style="${this.isShow?"visibility: visible":"visibility: hidden"}">
        <div class="viewer">
          <div class="gaussian-container">
            ${t}
          </div>
        </div>
        ${this.getNavigationButtons()}
      </div>
    `;this.updateShadowRoot(i),setTimeout(()=>{this.addNavigationListeners()},0)}cleanup(){this.animationId&&(cancelAnimationFrame(this.animationId),this.animationId=void 0),this.renderer&&typeof this.renderer.dispose=="function"&&this.renderer.dispose(),document.querySelectorAll('canvas[id^="gaussian-canvas-"]').forEach(t=>{t.parentNode===document.body&&document.body.removeChild(t)}),this.scene=void 0,this.camera=void 0,this.renderer=void 0,this.controls=void 0,this.canvas=void 0}getCameraDebugInfo(){if(!this.camera||!this.camera.position)return"Position: unavailable";const e=this.camera.position;try{return`X: ${e.x.toFixed(3)}, Y: ${e.y.toFixed(3)}, Z: ${e.z.toFixed(3)}`}catch{return`Position: ${JSON.stringify(e)}`}}getTargetDebugInfo(){return this.controls?"Controls active (no target property in gsplat.js)":"Target: controls unavailable"}updateDebugInfo(){const e=this.query(".debug-info");e&&(e.innerHTML=`
📍 Camera Position:
${this.getCameraDebugInfo()}

🎯 Camera Target:
${this.getTargetDebugInfo()}

🎮 Controls:
• Rotate: Left-drag
• Zoom: Scroll wheel
• Pan: Right-drag or Shift+Left-drag

📊 Status: ${this.scene?"Splat loaded":"Loading..."}
      `)}async initializeViewer(){const e=`gaussian-canvas-${Date.now()}`,t=this.query(".viewer");if(!t)return;const i=t.getBoundingClientRect();let r=document.getElementById(e);if(!r){r=document.createElement("canvas"),r.id=e,r.style.position="fixed",r.style.top=`${i.top}px`,r.style.left=`${i.left}px`,r.style.width=`${i.width}px`,r.style.height=`${i.height}px`;const h=window.getComputedStyle(this).getPropertyValue("--cc-viewer-z-index-each").trim(),f=h?parseInt(h,10):1e3;r.style.zIndex=`${f+1}`,r.style.pointerEvents="auto",r.style.display="block",r.style.background="transparent",document.body.appendChild(r)}r.style.top=`${i.top}px`,r.style.left=`${i.left}px`,r.style.width=`${i.width}px`,r.style.height=`${i.height}px`,this.canvas=r;const s=this.query(".gaussian-container");if(!s)return;const a=await Promise.resolve().then(()=>t_);this.scene=new a.Scene,this.camera=new a.Camera,this.renderer=new a.WebGLRenderer(this.canvas),this.controls=new a.OrbitControls(this.camera,this.canvas),await a.Loader.LoadAsync(this.splatUrl,this.scene);let o=0;const l=()=>{if(!(!this.renderer||!this.scene||!this.camera)){this.animationId=requestAnimationFrame(l),this.controls&&this.controls.update();try{this.renderer.render(this.scene,this.camera)}catch{}o===0&&this.canvas&&o++,this.debugMode&&this.updateDebugInfo()}};l(),new ResizeObserver(()=>{this.handleResize()}).observe(s)}handleResize(){const e=this.query(".gaussian-container");if(!e||!this.renderer||!this.camera)return;const t=e.clientWidth,i=e.clientHeight;typeof this.renderer.setSize=="function"&&this.renderer.setSize(t,i),typeof this.camera.aspect<"u"&&(this.camera.aspect=t/i,typeof this.camera.updateProjectionMatrix=="function"&&this.camera.updateProjectionMatrix())}}customElements.get("cc-viewer-gaussian")||customElements.define("cc-viewer-gaussian",lh);const Ks={image:"cc-viewer-image",panorama:"cc-viewer-panorama",youtube:"cc-viewer-youtube",video:"cc-viewer-video","3dmodel":"cc-viewer-3dmodel",gaussian:"cc-viewer-gaussian"};class ch extends mr{swiper;currentSlideIndex=0;currentType="";boundHandleNavigatePrev;boundHandleNavigateNext;open(e,t,i){const r=this.currentType;if(this.currentType=t,r&&r!==t){const s=Ks[r],a=this.query(s);a&&a.close&&a.close()}r!==t&&this.render(),setTimeout(()=>{const s=Ks[t],a=this.query(s);a&&i&&Object.entries(i).forEach(([o,l])=>{const c=o.replace(/([A-Z])/g,"-$1").toLowerCase();typeof l=="boolean"?l?a.setAttribute(c,""):a.removeAttribute(c):a.setAttribute(c,String(l))}),this.updateNavigationButtons(),a&&a.open(e)},0)}firstUpdated(){this.dispatch("load"),this.boundHandleNavigatePrev&&this.removeEventListener("navigate-prev",this.boundHandleNavigatePrev),this.boundHandleNavigateNext&&this.removeEventListener("navigate-next",this.boundHandleNavigateNext),this.boundHandleNavigatePrev=this.handleNavigatePrev.bind(this),this.boundHandleNavigateNext=this.handleNavigateNext.bind(this),this.addEventListener("navigate-prev",this.boundHandleNavigatePrev),this.addEventListener("navigate-next",this.boundHandleNavigateNext)}handleNavigatePrev(e){if(!this.swiper)return;const t=this.swiper.slides.length;if(t<=1)return;const i=this.swiper.slider?.params?.loop===!0;if(this.currentSlideIndex<=0)if(i)this.currentSlideIndex=t-1;else return;else this.currentSlideIndex--;this.navigateToSlide(this.currentSlideIndex)}handleNavigateNext(e){if(!this.swiper)return;const t=this.swiper.slides.length;if(t<=1)return;const i=this.swiper.slider?.params?.loop===!0;if(this.currentSlideIndex>=t-1)if(i)this.currentSlideIndex=0;else return;else this.currentSlideIndex++;this.navigateToSlide(this.currentSlideIndex)}navigateToSlide(e){if(!this.swiper||!this.swiper.slides[e])return;const t=this.swiper.slides[e],i=t.getAttribute("image-url")||"",r=t.getAttribute("image-type")||"image",s=Ks[this.currentType],a=this.query(s);a&&a.close();const o={};t.hasAttribute("fit-to-container")&&(o.fitToContainer=!0),t.hasAttribute("debug-mode")&&(o.debugMode=!0),t.hasAttribute("camera-position")&&(o.cameraPosition=t.getAttribute("camera-position")),t.hasAttribute("camera-target")&&(o.cameraTarget=t.getAttribute("camera-target")),t.hasAttribute("show-texture")&&(o.showTexture=t.getAttribute("show-texture")==="true"),t.hasAttribute("material-url")&&(o.materialUrl=t.getAttribute("material-url")),this.currentSlideIndex=e,this.open(i,r,o),this.swiper.slider&&this.swiper.slider.slideTo(e)}updateNavigationButtons(){if(!this.swiper)return;const e=this.swiper.slides.length,t=this.swiper.slider?.params?.loop===!0;if(e<=1){this.setNavigationVisibility(!1,!1);return}if(t){this.setNavigationVisibility(!0,!0);return}const i=this.currentSlideIndex>0,r=this.currentSlideIndex<e-1;this.setNavigationVisibility(i,r)}setNavigationVisibility(e,t){[this.query("cc-viewer-image"),this.query("cc-viewer-youtube"),this.query("cc-viewer-panorama"),this.query("cc-viewer-video"),this.query("cc-viewer-3dmodel"),this.query("cc-viewer-gaussian")].forEach(r=>{if(r){const s=r;s.showPrevButton=e,s.showNextButton=t}})}setSwiper(e){this.swiper=e}setCurrentSlideIndex(e){this.currentSlideIndex=e}render(){const e=this.css`
      :host {
        --cc-viewer-z-index: 1000;
      }
      
      cc-viewer-panorama, cc-viewer-image, cc-viewer-youtube, cc-viewer-video,
      cc-viewer-3dmodel, cc-viewer-gaussian {
        --cc-viewer-z-index-each: var(--cc-viewer-z-index);
      }
    `;let t="";if(this.currentType){const r=Ks[this.currentType];r&&(t=`<${r}></${r}>`)}const i=`
      ${e}
      ${t}
    `;this.updateShadowRoot(i)}}customElements.get("cc-viewer")||customElements.define("cc-viewer",ch);class Ue{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}equals(e){return!(this.x!==e.x||this.y!==e.y||this.z!==e.z)}add(e){return typeof e=="number"?new Ue(this.x+e,this.y+e,this.z+e):new Ue(this.x+e.x,this.y+e.y,this.z+e.z)}subtract(e){return typeof e=="number"?new Ue(this.x-e,this.y-e,this.z-e):new Ue(this.x-e.x,this.y-e.y,this.z-e.z)}multiply(e){return typeof e=="number"?new Ue(this.x*e,this.y*e,this.z*e):e instanceof Ue?new Ue(this.x*e.x,this.y*e.y,this.z*e.z):new Ue(this.x*e.buffer[0]+this.y*e.buffer[4]+this.z*e.buffer[8]+e.buffer[12],this.x*e.buffer[1]+this.y*e.buffer[5]+this.z*e.buffer[9]+e.buffer[13],this.x*e.buffer[2]+this.y*e.buffer[6]+this.z*e.buffer[10]+e.buffer[14])}divide(e){return typeof e=="number"?new Ue(this.x/e,this.y/e,this.z/e):new Ue(this.x/e.x,this.y/e.y,this.z/e.z)}cross(e){const t=this.y*e.z-this.z*e.y,i=this.z*e.x-this.x*e.z,r=this.x*e.y-this.y*e.x;return new Ue(t,i,r)}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lerp(e,t){return new Ue(this.x+(e.x-this.x)*t,this.y+(e.y-this.y)*t,this.z+(e.z-this.z)*t)}min(e){return new Ue(Math.min(this.x,e.x),Math.min(this.y,e.y),Math.min(this.z,e.z))}max(e){return new Ue(Math.max(this.x,e.x),Math.max(this.y,e.y),Math.max(this.z,e.z))}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error(`Invalid component index: ${e}`)}}minComponent(){return this.x<this.y&&this.x<this.z?0:this.y<this.z?1:2}maxComponent(){return this.x>this.y&&this.x>this.z?0:this.y>this.z?1:2}magnitude(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}distanceTo(e){return Math.sqrt((this.x-e.x)**2+(this.y-e.y)**2+(this.z-e.z)**2)}normalize(){const e=this.magnitude();return new Ue(this.x/e,this.y/e,this.z/e)}flat(){return[this.x,this.y,this.z]}clone(){return new Ue(this.x,this.y,this.z)}toString(){return`[${this.flat().join(", ")}]`}static One(e=1){return new Ue(e,e,e)}}class At{constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}equals(e){return!(this.x!==e.x||this.y!==e.y||this.z!==e.z||this.w!==e.w)}normalize(){const e=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);return new At(this.x/e,this.y/e,this.z/e,this.w/e)}multiply(e){const t=this.w,i=this.x,r=this.y,s=this.z,a=e.w,o=e.x,l=e.y,c=e.z;return new At(t*o+i*a+r*c-s*l,t*l-i*c+r*a+s*o,t*c+i*l-r*o+s*a,t*a-i*o-r*l-s*c)}inverse(){const e=this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w;return new At(-this.x/e,-this.y/e,-this.z/e,this.w/e)}apply(e){const t=new At(e.x,e.y,e.z,0),i=new At(-this.x,-this.y,-this.z,this.w),r=this.multiply(t).multiply(i);return new Ue(r.x,r.y,r.z)}flat(){return[this.x,this.y,this.z,this.w]}clone(){return new At(this.x,this.y,this.z,this.w)}static FromEuler(e){const t=e.x/2,i=e.y/2,r=e.z/2,s=Math.cos(i),a=Math.sin(i),o=Math.cos(t),l=Math.sin(t),c=Math.cos(r),d=Math.sin(r);return new At(s*l*c+a*o*d,a*o*c-s*l*d,s*o*d-a*l*c,s*o*c+a*l*d)}toEuler(){const e=2*(this.w*this.x+this.y*this.z),t=1-2*(this.x*this.x+this.y*this.y),i=Math.atan2(e,t);let r;const s=2*(this.w*this.y-this.z*this.x);Math.abs(s)>=1?r=Math.sign(s)*Math.PI/2:r=Math.asin(s);const a=2*(this.w*this.z+this.x*this.y),o=1-2*(this.y*this.y+this.z*this.z),l=Math.atan2(a,o);return new Ue(i,r,l)}static FromMatrix3(e){const t=e.buffer,i=t[0]+t[4]+t[8];let r,s,a,o;if(i>0){const l=.5/Math.sqrt(i+1);o=.25/l,r=(t[7]-t[5])*l,s=(t[2]-t[6])*l,a=(t[3]-t[1])*l}else if(t[0]>t[4]&&t[0]>t[8]){const l=2*Math.sqrt(1+t[0]-t[4]-t[8]);o=(t[7]-t[5])/l,r=.25*l,s=(t[1]+t[3])/l,a=(t[2]+t[6])/l}else if(t[4]>t[8]){const l=2*Math.sqrt(1+t[4]-t[0]-t[8]);o=(t[2]-t[6])/l,r=(t[1]+t[3])/l,s=.25*l,a=(t[5]+t[7])/l}else{const l=2*Math.sqrt(1+t[8]-t[0]-t[4]);o=(t[3]-t[1])/l,r=(t[2]+t[6])/l,s=(t[5]+t[7])/l,a=.25*l}return new At(r,s,a,o)}static FromAxisAngle(e,t){const i=t/2,r=Math.sin(i),s=Math.cos(i);return new At(e.x*r,e.y*r,e.z*r,s)}static LookRotation(e){const t=new Ue(0,0,1),i=t.dot(e);if(Math.abs(i- -1)<1e-6)return new At(0,1,0,Math.PI);if(Math.abs(i-1)<1e-6)return new At;const r=Math.acos(i),s=t.cross(e).normalize();return At.FromAxisAngle(s,r)}toString(){return`[${this.flat().join(", ")}]`}}class dh{constructor(){const e=new Map;this.addEventListener=(t,i)=>{e.has(t)||e.set(t,new Set),e.get(t).add(i)},this.removeEventListener=(t,i)=>{e.has(t)&&e.get(t).delete(i)},this.hasEventListener=(t,i)=>e.has(t)?e.get(t).has(i):!1,this.dispatchEvent=t=>{if(e.has(t.type))for(const i of e.get(t.type))i(t)}}}class Ht{constructor(e=1,t=0,i=0,r=0,s=0,a=1,o=0,l=0,c=0,d=0,h=1,f=0,u=0,g=0,v=0,m=1){this.buffer=[e,t,i,r,s,a,o,l,c,d,h,f,u,g,v,m]}equals(e){if(this.buffer.length!==e.buffer.length)return!1;if(this.buffer===e.buffer)return!0;for(let t=0;t<this.buffer.length;t++)if(this.buffer[t]!==e.buffer[t])return!1;return!0}multiply(e){const t=this.buffer,i=e.buffer;return new Ht(i[0]*t[0]+i[1]*t[4]+i[2]*t[8]+i[3]*t[12],i[0]*t[1]+i[1]*t[5]+i[2]*t[9]+i[3]*t[13],i[0]*t[2]+i[1]*t[6]+i[2]*t[10]+i[3]*t[14],i[0]*t[3]+i[1]*t[7]+i[2]*t[11]+i[3]*t[15],i[4]*t[0]+i[5]*t[4]+i[6]*t[8]+i[7]*t[12],i[4]*t[1]+i[5]*t[5]+i[6]*t[9]+i[7]*t[13],i[4]*t[2]+i[5]*t[6]+i[6]*t[10]+i[7]*t[14],i[4]*t[3]+i[5]*t[7]+i[6]*t[11]+i[7]*t[15],i[8]*t[0]+i[9]*t[4]+i[10]*t[8]+i[11]*t[12],i[8]*t[1]+i[9]*t[5]+i[10]*t[9]+i[11]*t[13],i[8]*t[2]+i[9]*t[6]+i[10]*t[10]+i[11]*t[14],i[8]*t[3]+i[9]*t[7]+i[10]*t[11]+i[11]*t[15],i[12]*t[0]+i[13]*t[4]+i[14]*t[8]+i[15]*t[12],i[12]*t[1]+i[13]*t[5]+i[14]*t[9]+i[15]*t[13],i[12]*t[2]+i[13]*t[6]+i[14]*t[10]+i[15]*t[14],i[12]*t[3]+i[13]*t[7]+i[14]*t[11]+i[15]*t[15])}clone(){const e=this.buffer;return new Ht(e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8],e[9],e[10],e[11],e[12],e[13],e[14],e[15])}determinant(){const e=this.buffer;return e[12]*e[9]*e[6]*e[3]-e[8]*e[13]*e[6]*e[3]-e[12]*e[5]*e[10]*e[3]+e[4]*e[13]*e[10]*e[3]+e[8]*e[5]*e[14]*e[3]-e[4]*e[9]*e[14]*e[3]-e[12]*e[9]*e[2]*e[7]+e[8]*e[13]*e[2]*e[7]+e[12]*e[1]*e[10]*e[7]-e[0]*e[13]*e[10]*e[7]-e[8]*e[1]*e[14]*e[7]+e[0]*e[9]*e[14]*e[7]+e[12]*e[5]*e[2]*e[11]-e[4]*e[13]*e[2]*e[11]-e[12]*e[1]*e[6]*e[11]+e[0]*e[13]*e[6]*e[11]+e[4]*e[1]*e[14]*e[11]-e[0]*e[5]*e[14]*e[11]-e[8]*e[5]*e[2]*e[15]+e[4]*e[9]*e[2]*e[15]+e[8]*e[1]*e[6]*e[15]-e[0]*e[9]*e[6]*e[15]-e[4]*e[1]*e[10]*e[15]+e[0]*e[5]*e[10]*e[15]}invert(){const e=this.buffer,t=this.determinant();if(t===0)throw new Error("Matrix is not invertible.");const i=1/t;return new Ht(i*(e[5]*e[10]*e[15]-e[5]*e[11]*e[14]-e[9]*e[6]*e[15]+e[9]*e[7]*e[14]+e[13]*e[6]*e[11]-e[13]*e[7]*e[10]),i*(-e[1]*e[10]*e[15]+e[1]*e[11]*e[14]+e[9]*e[2]*e[15]-e[9]*e[3]*e[14]-e[13]*e[2]*e[11]+e[13]*e[3]*e[10]),i*(e[1]*e[6]*e[15]-e[1]*e[7]*e[14]-e[5]*e[2]*e[15]+e[5]*e[3]*e[14]+e[13]*e[2]*e[7]-e[13]*e[3]*e[6]),i*(-e[1]*e[6]*e[11]+e[1]*e[7]*e[10]+e[5]*e[2]*e[11]-e[5]*e[3]*e[10]-e[9]*e[2]*e[7]+e[9]*e[3]*e[6]),i*(-e[4]*e[10]*e[15]+e[4]*e[11]*e[14]+e[8]*e[6]*e[15]-e[8]*e[7]*e[14]-e[12]*e[6]*e[11]+e[12]*e[7]*e[10]),i*(e[0]*e[10]*e[15]-e[0]*e[11]*e[14]-e[8]*e[2]*e[15]+e[8]*e[3]*e[14]+e[12]*e[2]*e[11]-e[12]*e[3]*e[10]),i*(-e[0]*e[6]*e[15]+e[0]*e[7]*e[14]+e[4]*e[2]*e[15]-e[4]*e[3]*e[14]-e[12]*e[2]*e[7]+e[12]*e[3]*e[6]),i*(e[0]*e[6]*e[11]-e[0]*e[7]*e[10]-e[4]*e[2]*e[11]+e[4]*e[3]*e[10]+e[8]*e[2]*e[7]-e[8]*e[3]*e[6]),i*(e[4]*e[9]*e[15]-e[4]*e[11]*e[13]-e[8]*e[5]*e[15]+e[8]*e[7]*e[13]+e[12]*e[5]*e[11]-e[12]*e[7]*e[9]),i*(-e[0]*e[9]*e[15]+e[0]*e[11]*e[13]+e[8]*e[1]*e[15]-e[8]*e[3]*e[13]-e[12]*e[1]*e[11]+e[12]*e[3]*e[9]),i*(e[0]*e[5]*e[15]-e[0]*e[7]*e[13]-e[4]*e[1]*e[15]+e[4]*e[3]*e[13]+e[12]*e[1]*e[7]-e[12]*e[3]*e[5]),i*(-e[0]*e[5]*e[11]+e[0]*e[7]*e[9]+e[4]*e[1]*e[11]-e[4]*e[3]*e[9]-e[8]*e[1]*e[7]+e[8]*e[3]*e[5]),i*(-e[4]*e[9]*e[14]+e[4]*e[10]*e[13]+e[8]*e[5]*e[14]-e[8]*e[6]*e[13]-e[12]*e[5]*e[10]+e[12]*e[6]*e[9]),i*(e[0]*e[9]*e[14]-e[0]*e[10]*e[13]-e[8]*e[1]*e[14]+e[8]*e[2]*e[13]+e[12]*e[1]*e[10]-e[12]*e[2]*e[9]),i*(-e[0]*e[5]*e[14]+e[0]*e[6]*e[13]+e[4]*e[1]*e[14]-e[4]*e[2]*e[13]-e[12]*e[1]*e[6]+e[12]*e[2]*e[5]),i*(e[0]*e[5]*e[10]-e[0]*e[6]*e[9]-e[4]*e[1]*e[10]+e[4]*e[2]*e[9]+e[8]*e[1]*e[6]-e[8]*e[2]*e[5]))}static Compose(e,t,i){const r=t.x,s=t.y,a=t.z,o=t.w,l=r+r,c=s+s,d=a+a,h=r*l,f=r*c,u=r*d,g=s*c,v=s*d,m=a*d,p=o*l,A=o*c,_=o*d,S=i.x,M=i.y,C=i.z;return new Ht((1-(g+m))*S,(f+_)*S,(u-A)*S,0,(f-_)*M,(1-(h+m))*M,(v+p)*M,0,(u+A)*C,(v-p)*C,(1-(h+g))*C,0,e.x,e.y,e.z,1)}toString(){return`[${this.buffer.join(", ")}]`}}class NA extends Event{constructor(e){super("objectAdded"),this.object=e}}class LA extends Event{constructor(e){super("objectRemoved"),this.object=e}}class PA extends Event{constructor(e){super("objectChanged"),this.object=e}}class tl extends dh{constructor(){super(),this.positionChanged=!1,this.rotationChanged=!1,this.scaleChanged=!1,this._position=new Ue,this._rotation=new At,this._scale=new Ue(1,1,1),this._transform=new Ht,this._changeEvent=new PA(this),this.update=()=>{},this.applyPosition=()=>{this.position=new Ue},this.applyRotation=()=>{this.rotation=new At},this.applyScale=()=>{this.scale=new Ue(1,1,1)},this.raiseChangeEvent=()=>{this.dispatchEvent(this._changeEvent)}}_updateMatrix(){this._transform=Ht.Compose(this._position,this._rotation,this._scale)}get position(){return this._position}set position(e){this._position.equals(e)||(this._position=e,this.positionChanged=!0,this._updateMatrix(),this.dispatchEvent(this._changeEvent))}get rotation(){return this._rotation}set rotation(e){this._rotation.equals(e)||(this._rotation=e,this.rotationChanged=!0,this._updateMatrix(),this.dispatchEvent(this._changeEvent))}get scale(){return this._scale}set scale(e){this._scale.equals(e)||(this._scale=e,this.scaleChanged=!0,this._updateMatrix(),this.dispatchEvent(this._changeEvent))}get forward(){let e=new Ue(0,0,1);return e=this.rotation.apply(e),e}get transform(){return this._transform}}class qt{constructor(e=1,t=0,i=0,r=0,s=1,a=0,o=0,l=0,c=1){this.buffer=[e,t,i,r,s,a,o,l,c]}equals(e){if(this.buffer.length!==e.buffer.length)return!1;if(this.buffer===e.buffer)return!0;for(let t=0;t<this.buffer.length;t++)if(this.buffer[t]!==e.buffer[t])return!1;return!0}multiply(e){const t=this.buffer,i=e.buffer;return new qt(i[0]*t[0]+i[3]*t[1]+i[6]*t[2],i[1]*t[0]+i[4]*t[1]+i[7]*t[2],i[2]*t[0]+i[5]*t[1]+i[8]*t[2],i[0]*t[3]+i[3]*t[4]+i[6]*t[5],i[1]*t[3]+i[4]*t[4]+i[7]*t[5],i[2]*t[3]+i[5]*t[4]+i[8]*t[5],i[0]*t[6]+i[3]*t[7]+i[6]*t[8],i[1]*t[6]+i[4]*t[7]+i[7]*t[8],i[2]*t[6]+i[5]*t[7]+i[8]*t[8])}clone(){const e=this.buffer;return new qt(e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8])}static Eye(e=1){return new qt(e,0,0,0,e,0,0,0,e)}static Diagonal(e){return new qt(e.x,0,0,0,e.y,0,0,0,e.z)}static RotationFromQuaternion(e){return new qt(1-2*e.y*e.y-2*e.z*e.z,2*e.x*e.y-2*e.z*e.w,2*e.x*e.z+2*e.y*e.w,2*e.x*e.y+2*e.z*e.w,1-2*e.x*e.x-2*e.z*e.z,2*e.y*e.z-2*e.x*e.w,2*e.x*e.z-2*e.y*e.w,2*e.y*e.z+2*e.x*e.w,1-2*e.x*e.x-2*e.y*e.y)}static RotationFromEuler(e){const t=Math.cos(e.x),i=Math.sin(e.x),r=Math.cos(e.y),s=Math.sin(e.y),a=Math.cos(e.z),o=Math.sin(e.z),l=[r*a+s*i*o,-r*o+s*i*a,s*t,t*o,t*a,-i,-s*a+r*i*o,s*o+r*i*a,r*t];return new qt(...l)}toString(){return`[${this.buffer.join(", ")}]`}}const yn=class yn{constructor(e=0,t=null,i=null,r=null,s=null){this.changed=!1,this.detached=!1,this._vertexCount=e,this._positions=t||new Float32Array(0),this._rotations=i||new Float32Array(0),this._scales=r||new Float32Array(0),this._colors=s||new Uint8Array(0),this._selection=new Uint8Array(this.vertexCount),this.translate=a=>{for(let o=0;o<this.vertexCount;o++)this.positions[3*o+0]+=a.x,this.positions[3*o+1]+=a.y,this.positions[3*o+2]+=a.z;this.changed=!0},this.rotate=a=>{const o=qt.RotationFromQuaternion(a).buffer;for(let l=0;l<this.vertexCount;l++){const c=this.positions[3*l+0],d=this.positions[3*l+1],h=this.positions[3*l+2];this.positions[3*l+0]=o[0]*c+o[1]*d+o[2]*h,this.positions[3*l+1]=o[3]*c+o[4]*d+o[5]*h,this.positions[3*l+2]=o[6]*c+o[7]*d+o[8]*h;const f=new At(this.rotations[4*l+1],this.rotations[4*l+2],this.rotations[4*l+3],this.rotations[4*l+0]),u=a.multiply(f);this.rotations[4*l+1]=u.x,this.rotations[4*l+2]=u.y,this.rotations[4*l+3]=u.z,this.rotations[4*l+0]=u.w}this.changed=!0},this.scale=a=>{for(let o=0;o<this.vertexCount;o++)this.positions[3*o+0]*=a.x,this.positions[3*o+1]*=a.y,this.positions[3*o+2]*=a.z,this.scales[3*o+0]*=a.x,this.scales[3*o+1]*=a.y,this.scales[3*o+2]*=a.z;this.changed=!0},this.serialize=()=>{const a=new Uint8Array(this.vertexCount*yn.RowLength),o=new Float32Array(a.buffer),l=new Uint8Array(a.buffer);for(let c=0;c<this.vertexCount;c++)o[8*c+0]=this.positions[3*c+0],o[8*c+1]=this.positions[3*c+1],o[8*c+2]=this.positions[3*c+2],l[32*c+24+0]=this.colors[4*c+0],l[32*c+24+1]=this.colors[4*c+1],l[32*c+24+2]=this.colors[4*c+2],l[32*c+24+3]=this.colors[4*c+3],o[8*c+3+0]=this.scales[3*c+0],o[8*c+3+1]=this.scales[3*c+1],o[8*c+3+2]=this.scales[3*c+2],l[32*c+28+0]=this.rotations[4*c+0]*128+128&255,l[32*c+28+1]=this.rotations[4*c+1]*128+128&255,l[32*c+28+2]=this.rotations[4*c+2]*128+128&255,l[32*c+28+3]=this.rotations[4*c+3]*128+128&255;return a},this.reattach=(a,o,l,c,d)=>{console.assert(a.byteLength===this.vertexCount*3*4,`Expected ${this.vertexCount*3*4} bytes, got ${a.byteLength} bytes`),this._positions=new Float32Array(a),this._rotations=new Float32Array(o),this._scales=new Float32Array(l),this._colors=new Uint8Array(c),this._selection=new Uint8Array(d),this.detached=!1}}static Deserialize(e){const t=e.length/yn.RowLength,i=new Float32Array(3*t),r=new Float32Array(4*t),s=new Float32Array(3*t),a=new Uint8Array(4*t),o=new Float32Array(e.buffer),l=new Uint8Array(e.buffer);for(let c=0;c<t;c++)i[3*c+0]=o[8*c+0],i[3*c+1]=o[8*c+1],i[3*c+2]=o[8*c+2],r[4*c+0]=(l[32*c+28+0]-128)/128,r[4*c+1]=(l[32*c+28+1]-128)/128,r[4*c+2]=(l[32*c+28+2]-128)/128,r[4*c+3]=(l[32*c+28+3]-128)/128,s[3*c+0]=o[8*c+3+0],s[3*c+1]=o[8*c+3+1],s[3*c+2]=o[8*c+3+2],a[4*c+0]=l[32*c+24+0],a[4*c+1]=l[32*c+24+1],a[4*c+2]=l[32*c+24+2],a[4*c+3]=l[32*c+24+3];return new yn(t,i,r,s,a)}get vertexCount(){return this._vertexCount}get positions(){return this._positions}get rotations(){return this._rotations}get scales(){return this._scales}get colors(){return this._colors}get selection(){return this._selection}clone(){return new yn(this.vertexCount,new Float32Array(this.positions),new Float32Array(this.rotations),new Float32Array(this.scales),new Uint8Array(this.colors))}};yn.RowLength=32;let fr=yn;const al=class al{static SplatToPLY(e,t){let i=`ply
format binary_little_endian 1.0
`;i+=`element vertex ${t}
`;const r=["x","y","z","nx","ny","nz","f_dc_0","f_dc_1","f_dc_2"];for(let m=0;m<45;m++)r.push(`f_rest_${m}`);r.push("opacity"),r.push("scale_0"),r.push("scale_1"),r.push("scale_2"),r.push("rot_0"),r.push("rot_1"),r.push("rot_2"),r.push("rot_3");for(const m of r)i+=`property float ${m}
`;i+=`end_header
`;const s=new TextEncoder().encode(i),a=248,o=t*a,l=new DataView(new ArrayBuffer(s.length+o));new Uint8Array(l.buffer).set(s,0);const c=new Float32Array(e),d=new Uint8Array(e),h=s.length,f=24,u=f+12+180,g=u+4,v=g+12;for(let m=0;m<t;m++){const p=c[8*m+0],A=c[8*m+1],_=c[8*m+2],S=(d[32*m+24+0]/255-.5)/this.SH_C0,M=(d[32*m+24+1]/255-.5)/this.SH_C0,C=(d[32*m+24+2]/255-.5)/this.SH_C0,U=d[32*m+24+3]/255,T=Math.log(U/(1-U)),y=Math.log(c[8*m+3+0]),b=Math.log(c[8*m+3+1]),E=Math.log(c[8*m+3+2]);let D=new At((d[32*m+28+1]-128)/128,(d[32*m+28+2]-128)/128,(d[32*m+28+3]-128)/128,(d[32*m+28+0]-128)/128);D=D.normalize();const F=D.w,Q=D.x,V=D.y,O=D.z;l.setFloat32(h+a*m+0,p,!0),l.setFloat32(h+a*m+4,A,!0),l.setFloat32(h+a*m+8,_,!0),l.setFloat32(h+a*m+f+0,S,!0),l.setFloat32(h+a*m+f+4,M,!0),l.setFloat32(h+a*m+f+8,C,!0),l.setFloat32(h+a*m+u,T,!0),l.setFloat32(h+a*m+g+0,y,!0),l.setFloat32(h+a*m+g+4,b,!0),l.setFloat32(h+a*m+g+8,E,!0),l.setFloat32(h+a*m+v+0,F,!0),l.setFloat32(h+a*m+v+4,Q,!0),l.setFloat32(h+a*m+v+8,V,!0),l.setFloat32(h+a*m+v+12,O,!0)}return l.buffer}};al.SH_C0=.28209479177387814;let js=al;class il{constructor(e,t){this.min=e,this.max=t}contains(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}intersects(e){return this.max.x>=e.min.x&&this.min.x<=e.max.x&&this.max.y>=e.min.y&&this.min.y<=e.max.y&&this.max.z>=e.min.z&&this.min.z<=e.max.z}size(){return this.max.subtract(this.min)}center(){return this.min.add(this.max).divide(2)}expand(e){this.min=this.min.min(e),this.max=this.max.max(e)}permute(){const e=this.min,t=this.max;this.min=new Ue(Math.min(e.x,t.x),Math.min(e.y,t.y),Math.min(e.z,t.z)),this.max=new Ue(Math.max(e.x,t.x),Math.max(e.y,t.y),Math.max(e.z,t.z))}}class si extends tl{constructor(e=void 0){super(),this.selectedChanged=!1,this.colorTransformChanged=!1,this._selected=!1,this._colorTransforms=[],this._colorTransformsMap=new Map,this._data=e||new fr,this._bounds=new il(new Ue(1/0,1/0,1/0),new Ue(-1/0,-1/0,-1/0)),this.recalculateBounds=()=>{this._bounds=new il(new Ue(1/0,1/0,1/0),new Ue(-1/0,-1/0,-1/0));for(let t=0;t<this._data.vertexCount;t++)this._bounds.expand(new Ue(this._data.positions[3*t],this._data.positions[3*t+1],this._data.positions[3*t+2]))},this.applyPosition=()=>{this.data.translate(this.position),this.position=new Ue},this.applyRotation=()=>{this.data.rotate(this.rotation),this.rotation=new At},this.applyScale=()=>{this.data.scale(this.scale),this.scale=new Ue(1,1,1)},this.recalculateBounds()}saveToFile(e=null,t="splat"){if(!document)return;if(!e){const o=new Date;e=`splat-${o.getFullYear()}-${o.getMonth()+1}-${o.getDate()}.${t}`}const i=this.clone();i.applyRotation(),i.applyScale(),i.applyPosition();const r=i.data.serialize();let s;if(t==="ply"){const o=js.SplatToPLY(r.buffer,i.data.vertexCount);s=new Blob([o],{type:"application/octet-stream"})}else s=new Blob([r.buffer],{type:"application/octet-stream"});const a=document.createElement("a");a.download=e,a.href=URL.createObjectURL(s),a.click()}get data(){return this._data}get selected(){return this._selected}set selected(e){this._selected!==e&&(this._selected=e,this.selectedChanged=!0,this.dispatchEvent(this._changeEvent))}get colorTransforms(){return this._colorTransforms}get colorTransformsMap(){return this._colorTransformsMap}get bounds(){let e=this._bounds.center();e=e.add(this.position);let t=this._bounds.size();return t=t.multiply(this.scale),new il(e.subtract(t.divide(2)),e.add(t.divide(2)))}clone(){const e=new si(this.data.clone());return e.position=this.position.clone(),e.rotation=this.rotation.clone(),e.scale=this.scale.clone(),e}}class hh{constructor(){this._fx=1132,this._fy=1132,this._near=.1,this._far=100,this._width=512,this._height=512,this._projectionMatrix=new Ht,this._viewMatrix=new Ht,this._viewProj=new Ht,this._updateProjectionMatrix=()=>{this._projectionMatrix=new Ht(2*this.fx/this.width,0,0,0,0,-2*this.fy/this.height,0,0,0,0,this.far/(this.far-this.near),1,0,0,-(this.far*this.near)/(this.far-this.near),0),this._viewProj=this.projectionMatrix.multiply(this.viewMatrix)},this.update=(e,t)=>{const i=qt.RotationFromQuaternion(t).buffer,r=e.flat();this._viewMatrix=new Ht(i[0],i[1],i[2],0,i[3],i[4],i[5],0,i[6],i[7],i[8],0,-r[0]*i[0]-r[1]*i[3]-r[2]*i[6],-r[0]*i[1]-r[1]*i[4]-r[2]*i[7],-r[0]*i[2]-r[1]*i[5]-r[2]*i[8],1),this._viewProj=this.projectionMatrix.multiply(this.viewMatrix)},this.setSize=(e,t)=>{this._width=e,this._height=t,this._updateProjectionMatrix()}}get fx(){return this._fx}set fx(e){this._fx!==e&&(this._fx=e,this._updateProjectionMatrix())}get fy(){return this._fy}set fy(e){this._fy!==e&&(this._fy=e,this._updateProjectionMatrix())}get near(){return this._near}set near(e){this._near!==e&&(this._near=e,this._updateProjectionMatrix())}get far(){return this._far}set far(e){this._far!==e&&(this._far=e,this._updateProjectionMatrix())}get width(){return this._width}get height(){return this._height}get projectionMatrix(){return this._projectionMatrix}get viewMatrix(){return this._viewMatrix}get viewProj(){return this._viewProj}}class Jt{constructor(e=0,t=0,i=0,r=0){this.x=e,this.y=t,this.z=i,this.w=r}equals(e){return!(this.x!==e.x||this.y!==e.y||this.z!==e.z||this.w!==e.w)}add(e){return typeof e=="number"?new Jt(this.x+e,this.y+e,this.z+e,this.w+e):new Jt(this.x+e.x,this.y+e.y,this.z+e.z,this.w+e.w)}subtract(e){return typeof e=="number"?new Jt(this.x-e,this.y-e,this.z-e,this.w-e):new Jt(this.x-e.x,this.y-e.y,this.z-e.z,this.w-e.w)}multiply(e){return typeof e=="number"?new Jt(this.x*e,this.y*e,this.z*e,this.w*e):e instanceof Jt?new Jt(this.x*e.x,this.y*e.y,this.z*e.z,this.w*e.w):new Jt(this.x*e.buffer[0]+this.y*e.buffer[4]+this.z*e.buffer[8]+this.w*e.buffer[12],this.x*e.buffer[1]+this.y*e.buffer[5]+this.z*e.buffer[9]+this.w*e.buffer[13],this.x*e.buffer[2]+this.y*e.buffer[6]+this.z*e.buffer[10]+this.w*e.buffer[14],this.x*e.buffer[3]+this.y*e.buffer[7]+this.z*e.buffer[11]+this.w*e.buffer[15])}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lerp(e,t){return new Jt(this.x+(e.x-this.x)*t,this.y+(e.y-this.y)*t,this.z+(e.z-this.z)*t,this.w+(e.w-this.w)*t)}magnitude(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}distanceTo(e){return Math.sqrt((this.x-e.x)**2+(this.y-e.y)**2+(this.z-e.z)**2+(this.w-e.w)**2)}normalize(){const e=this.magnitude();return new Jt(this.x/e,this.y/e,this.z/e,this.w/e)}flat(){return[this.x,this.y,this.z,this.w]}clone(){return new Jt(this.x,this.y,this.z,this.w)}toString(){return`[${this.flat().join(", ")}]`}}class VA extends tl{constructor(e=void 0){super(),this._data=e||new hh,this._position=new Ue(0,0,-5),this.update=()=>{this.data.update(this.position,this.rotation)},this.screenPointToRay=(t,i)=>{const r=new Jt(t,i,-1,1),s=this._data.projectionMatrix.invert(),a=r.multiply(s),o=this._data.viewMatrix.invert(),l=a.multiply(o);return new Ue(l.x/l.w,l.y/l.w,l.z/l.w).subtract(this.position).normalize()}}get data(){return this._data}}class kA extends dh{constructor(){super(),this._objects=[],this.addObject=e=>{this.objects.push(e),this.dispatchEvent(new NA(e))},this.removeObject=e=>{const t=this.objects.indexOf(e);if(t<0)throw new Error("Object not found in scene");this.objects.splice(t,1),this.dispatchEvent(new LA(e))},this.findObject=e=>{for(const t of this.objects)if(e(t))return t},this.findObjectOfType=e=>{for(const t of this.objects)if(t instanceof e)return t},this.reset=()=>{const e=this.objects.slice();for(const t of e)this.removeObject(t)},this.reset()}getMergedSceneDataBuffer(e="splat"){const t=[];let i=0;for(const a of this.objects)if(a instanceof si){const o=a.clone();o.applyRotation(),o.applyScale(),o.applyPosition();const l=o.data.serialize();t.push(l),i+=o.data.vertexCount}const r=new Uint8Array(i*fr.RowLength);let s=0;for(const a of t)r.set(a,s),s+=a.length;return e==="ply"?js.SplatToPLY(r.buffer,i):r.buffer}saveToFile(e=null,t="splat"){if(!document)return;if(!e){const a=new Date;e=`scene-${a.getFullYear()}-${a.getMonth()+1}-${a.getDate()}.${t}`}const i=this.getMergedSceneDataBuffer(t),r=new Blob([i],{type:"application/octet-stream"}),s=document.createElement("a");s.download=e,s.href=URL.createObjectURL(r),s.click()}get objects(){return this._objects}}async function OA(n,e){const t=await fetch(n,{mode:"cors",credentials:"omit",cache:e?"force-cache":"default"});if(t.status!=200)throw new Error(t.status+" Unable to load "+t.url);return t}async function zA(n,e){const t=n.body.getReader(),i=n.headers.get("content-length"),r=i&&!isNaN(parseInt(i))?parseInt(i):void 0,s=[];let a=0;for(;;){const{done:c,value:d}=await t.read();if(c)break;if(s.push(d),a+=d.length,e&&r){const h=a/r,f=Math.min(h*.95,.95);e(f)}}const o=new Uint8Array(a);let l=0;for(const c of s)o.set(c,l),l+=c.length;return e&&e(1),o}class WA{static async LoadAsync(e,t,i,r=!1){const s=await OA(e,r),a=await zA(s,i);return this.LoadFromArrayBuffer(a.buffer,t)}static async LoadFromFileAsync(e,t,i){const r=new FileReader;let s=new si;return r.onload=a=>{s=this.LoadFromArrayBuffer(a.target.result,t)},r.onprogress=a=>{i?.(a.loaded/a.total)},r.readAsArrayBuffer(e),await new Promise(a=>{r.onloadend=()=>{a()}}),s}static LoadFromArrayBuffer(e,t){const i=new Uint8Array(e),r=fr.Deserialize(i),s=new si(r);return t.addObject(s),s}}const uh="dmFyIGVBID0gZnVuY3Rpb24oQyA9IHt9KSB7CiAgdmFyIHIsIEkgPSBDLCBsID0gaW1wb3J0Lm1ldGEudXJsLCBqID0gIiIsIFU7CiAgewogICAgdHJ5IHsKICAgICAgaiA9IG5ldyBVUkwoIi4iLCBsKS5ocmVmOwogICAgfSBjYXRjaCB7CiAgICB9CiAgICBVID0gKEEpID0+IHsKICAgICAgdmFyIEIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsKICAgICAgcmV0dXJuIEIub3BlbigiR0VUIiwgQSwgITEpLCBCLnJlc3BvbnNlVHlwZSA9ICJhcnJheWJ1ZmZlciIsIEIuc2VuZChudWxsKSwgbmV3IFVpbnQ4QXJyYXkoQi5yZXNwb25zZSk7CiAgICB9OwogIH0KICBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpLCBjb25zb2xlLmVycm9yLmJpbmQoY29uc29sZSk7CiAgdmFyIE0sIHUsIEw7CiAgZnVuY3Rpb24gcSgpIHsKICAgIHZhciBBID0gdS5idWZmZXI7CiAgICBJLkhFQVBVOCA9IEwgPSBuZXcgVWludDhBcnJheShBKSwgSS5IRUFQVTMyID0gbmV3IFVpbnQzMkFycmF5KEEpLCBJLkhFQVBGMzIgPSBuZXcgRmxvYXQzMkFycmF5KEEpLCBuZXcgQmlnSW50NjRBcnJheShBKSwgbmV3IEJpZ1VpbnQ2NEFycmF5KEEpOwogIH0KICBmdW5jdGlvbiBQKCkgewogICAgaWYgKEkucHJlUnVuKQogICAgICBmb3IgKHR5cGVvZiBJLnByZVJ1biA9PSAiZnVuY3Rpb24iICYmIChJLnByZVJ1biA9IFtJLnByZVJ1bl0pOyBJLnByZVJ1bi5sZW5ndGg7ICkKICAgICAgICBDQShJLnByZVJ1bi5zaGlmdCgpKTsKICAgIHgoVCk7CiAgfQogIGZ1bmN0aW9uIGIoKSB7CiAgICB5LmMoKTsKICB9CiAgZnVuY3Rpb24gVygpIHsKICAgIGlmIChJLnBvc3RSdW4pCiAgICAgIGZvciAodHlwZW9mIEkucG9zdFJ1biA9PSAiZnVuY3Rpb24iICYmIChJLnBvc3RSdW4gPSBbSS5wb3N0UnVuXSk7IEkucG9zdFJ1bi5sZW5ndGg7ICkKICAgICAgICBnQShJLnBvc3RSdW4uc2hpZnQoKSk7CiAgICB4KHYpOwogIH0KICB2YXIgcyA9IDAsIGYgPSBudWxsOwogIGZ1bmN0aW9uIF8oQSkgewogICAgcysrLCBJLm1vbml0b3JSdW5EZXBlbmRlbmNpZXM/LihzKTsKICB9CiAgZnVuY3Rpb24geihBKSB7CiAgICBpZiAocy0tLCBJLm1vbml0b3JSdW5EZXBlbmRlbmNpZXM/LihzKSwgcyA9PSAwICYmIGYpIHsKICAgICAgdmFyIEIgPSBmOwogICAgICBmID0gbnVsbCwgQigpOwogICAgfQogIH0KICB2YXIgUzsKICBmdW5jdGlvbiBWKCkgewogICAgcmV0dXJuIEJBKCJBR0Z6YlFFQUFBQUJHUVJnQVg4QmYyQUJmd0JnQ1g5L2YzOS9mMzkvZndCZ0FBQUNCd0VCWVFGaEFBQURCZ1VBQVFBQ0F3VUhBUUdDQW9DQUFnWUlBWDhCUVlDTUJBc0hGUVVCWWdJQUFXTUFCUUZrQUFRQlpRQURBV1lBQWd3QkFRck5PQVZQQVFKL1FZQUlLQUlBSWdFZ0FFRUhha0Y0Y1NJQ2FpRUFBa0FnQWtFQUlBQWdBVTBiUlFSQUlBQS9BRUVRZEUwTkFTQUFFQUFOQVF0QmhBaEJNRFlDQUVGL0R3dEJnQWdnQURZQ0FDQUJDOXdMQVFoL0FrQWdBRVVOQUNBQVFRaHJJZ01nQUVFRWF5Z0NBQ0lDUVhoeElnQnFJUVVDUUNBQ1FRRnhEUUFnQWtFQ2NVVU5BU0FESUFNb0FnQWlCR3NpQTBHWUNDZ0NBRWtOQVNBQUlBUnFJUUFDUUFKQUFrQkJuQWdvQWdBZ0EwY0VRQ0FES0FJTUlRRWdCRUgvQVUwRVFDQUJJQU1vQWdnaUFrY05Ba0dJQ0VHSUNDZ0NBRUYrSUFSQkEzWjNjVFlDQUF3RkN5QURLQUlZSVFjZ0FTQURSd1JBSUFNb0FnZ2lBaUFCTmdJTUlBRWdBallDQ0F3RUN5QURLQUlVSWdJRWZ5QURRUlJxQlNBREtBSVFJZ0pGRFFNZ0EwRVFhZ3NoQkFOQUlBUWhCaUFDSWdGQkZHb2hCQ0FCS0FJVUlnSU5BQ0FCUVJCcUlRUWdBU2dDRUNJQ0RRQUxJQVpCQURZQ0FBd0RDeUFGS0FJRUlnSkJBM0ZCQTBjTkEwR1FDQ0FBTmdJQUlBVWdBa0YrY1RZQ0JDQURJQUJCQVhJMkFnUWdCU0FBTmdJQUR3c2dBaUFCTmdJTUlBRWdBallDQ0F3Q0MwRUFJUUVMSUFkRkRRQUNRQ0FES0FJY0lnUkJBblJCdUFwcUlnSW9BZ0FnQTBZRVFDQUNJQUUyQWdBZ0FRMEJRWXdJUVl3SUtBSUFRWDRnQkhkeE5nSUFEQUlMQWtBZ0F5QUhLQUlRUmdSQUlBY2dBVFlDRUF3QkN5QUhJQUUyQWhRTElBRkZEUUVMSUFFZ0J6WUNHQ0FES0FJUUlnSUVRQ0FCSUFJMkFoQWdBaUFCTmdJWUN5QURLQUlVSWdKRkRRQWdBU0FDTmdJVUlBSWdBVFlDR0FzZ0F5QUZUdzBBSUFVb0FnUWlCRUVCY1VVTkFBSkFBa0FDUUFKQUlBUkJBbkZGQkVCQm9BZ29BZ0FnQlVZRVFFR2dDQ0FETmdJQVFaUUlRWlFJS0FJQUlBQnFJZ0EyQWdBZ0F5QUFRUUZ5TmdJRUlBTkJuQWdvQWdCSERRWkJrQWhCQURZQ0FFR2NDRUVBTmdJQUR3dEJuQWdvQWdBaUJ5QUZSZ1JBUVp3SUlBTTJBZ0JCa0FoQmtBZ29BZ0FnQUdvaUFEWUNBQ0FESUFCQkFYSTJBZ1FnQUNBRGFpQUFOZ0lBRHdzZ0JFRjRjU0FBYWlFQUlBVW9BZ3doQVNBRVFmOEJUUVJBSUFVb0FnZ2lBaUFCUmdSQVFZZ0lRWWdJS0FJQVFYNGdCRUVEZG5keE5nSUFEQVVMSUFJZ0FUWUNEQ0FCSUFJMkFnZ01CQXNnQlNnQ0dDRUlJQUVnQlVjRVFDQUZLQUlJSWdJZ0FUWUNEQ0FCSUFJMkFnZ01Bd3NnQlNnQ0ZDSUNCSDhnQlVFVWFnVWdCU2dDRUNJQ1JRMENJQVZCRUdvTElRUURRQ0FFSVFZZ0FpSUJRUlJxSVFRZ0FTZ0NGQ0lDRFFBZ0FVRVFhaUVFSUFFb0FoQWlBZzBBQ3lBR1FRQTJBZ0FNQWdzZ0JTQUVRWDV4TmdJRUlBTWdBRUVCY2pZQ0JDQUFJQU5xSUFBMkFnQU1Bd3RCQUNFQkN5QUlSUTBBQWtBZ0JTZ0NIQ0lFUVFKMFFiZ0thaUlDS0FJQUlBVkdCRUFnQWlBQk5nSUFJQUVOQVVHTUNFR01DQ2dDQUVGK0lBUjNjVFlDQUF3Q0N3SkFJQVVnQ0NnQ0VFWUVRQ0FJSUFFMkFoQU1BUXNnQ0NBQk5nSVVDeUFCUlEwQkN5QUJJQWcyQWhnZ0JTZ0NFQ0lDQkVBZ0FTQUNOZ0lRSUFJZ0FUWUNHQXNnQlNnQ0ZDSUNSUTBBSUFFZ0FqWUNGQ0FDSUFFMkFoZ0xJQU1nQUVFQmNqWUNCQ0FBSUFOcUlBQTJBZ0FnQXlBSFJ3MEFRWkFJSUFBMkFnQVBDeUFBUWY4QlRRUkFJQUJCZUhGQnNBaHFJUUlDZjBHSUNDZ0NBQ0lFUVFFZ0FFRURkblFpQUhGRkJFQkJpQWdnQUNBRWNqWUNBQ0FDREFFTElBSW9BZ2dMSVFBZ0FpQUROZ0lJSUFBZ0F6WUNEQ0FESUFJMkFnd2dBeUFBTmdJSUR3dEJIeUVCSUFCQi8vLy9CMDBFUUNBQVFTWWdBRUVJZG1jaUFtdDJRUUZ4SUFKQkFYUnJRVDVxSVFFTElBTWdBVFlDSENBRFFnQTNBaEFnQVVFQ2RFRzRDbW9oQkFKL0FrQUNmMEdNQ0NnQ0FDSUdRUUVnQVhRaUFuRkZCRUJCakFnZ0FpQUdjallDQUNBRUlBTTJBZ0JCR0NFQlFRZ01BUXNnQUVFWklBRkJBWFpyUVFBZ0FVRWZSeHQwSVFFZ0JDZ0NBQ0VFQTBBZ0JDSUNLQUlFUVhoeElBQkdEUUlnQVVFZGRpRUVJQUZCQVhRaEFTQUNJQVJCQkhGcUlnWW9BaEFpQkEwQUN5QUdJQU0yQWhCQkdDRUJJQUloQkVFSUN5RUFJQU1pQWd3QkN5QUNLQUlJSWdRZ0F6WUNEQ0FDSUFNMkFnaEJHQ0VBUVFnaEFVRUFDeUVHSUFFZ0Eyb2dCRFlDQUNBRElBSTJBZ3dnQUNBRGFpQUdOZ0lBUWFnSVFhZ0lLQUlBUVFGcklnQkJmeUFBR3pZQ0FBc0wwU2NCQzM4akFFRVFheUlLSkFBQ1FBSkFBa0FDUUFKQUFrQUNRQUpBQWtBQ1FDQUFRZlFCVFFSQVFZZ0lLQUlBSWdSQkVDQUFRUXRxUWZnRGNTQUFRUXRKR3lJR1FRTjJJZ0IySWdGQkEzRUVRQUpBSUFGQmYzTkJBWEVnQUdvaUFrRURkQ0lCUWJBSWFpSUFJQUZCdUFocUtBSUFJZ0VvQWdnaUJVWUVRRUdJQ0NBRVFYNGdBbmR4TmdJQURBRUxJQVVnQURZQ0RDQUFJQVUyQWdnTElBRkJDR29oQUNBQklBSkJBM1FpQWtFRGNqWUNCQ0FCSUFKcUlnRWdBU2dDQkVFQmNqWUNCQXdMQ3lBR1FaQUlLQUlBSWdoTkRRRWdBUVJBQWtCQkFpQUFkQ0lDUVFBZ0FtdHlJQUVnQUhSeGFDSUJRUU4wSWdCQnNBaHFJZ0lnQUVHNENHb29BZ0FpQUNnQ0NDSUZSZ1JBUVlnSUlBUkJmaUFCZDNFaUJEWUNBQXdCQ3lBRklBSTJBZ3dnQWlBRk5nSUlDeUFBSUFaQkEzSTJBZ1FnQUNBR2FpSUhJQUZCQTNRaUFTQUdheUlGUVFGeU5nSUVJQUFnQVdvZ0JUWUNBQ0FJQkVBZ0NFRjRjVUd3Q0dvaEFVR2NDQ2dDQUNFQ0FuOGdCRUVCSUFoQkEzWjBJZ054UlFSQVFZZ0lJQU1nQkhJMkFnQWdBUXdCQ3lBQktBSUlDeUVESUFFZ0FqWUNDQ0FESUFJMkFnd2dBaUFCTmdJTUlBSWdBellDQ0FzZ0FFRUlhaUVBUVp3SUlBYzJBZ0JCa0FnZ0JUWUNBQXdMQzBHTUNDZ0NBQ0lMUlEwQklBdG9RUUowUWJnS2FpZ0NBQ0lDS0FJRVFYaHhJQVpySVFNZ0FpRUJBMEFDUUNBQktBSVFJZ0JGQkVBZ0FTZ0NGQ0lBUlEwQkN5QUFLQUlFUVhoeElBWnJJZ0VnQXlBQklBTkpJZ0ViSVFNZ0FDQUNJQUViSVFJZ0FDRUJEQUVMQ3lBQ0tBSVlJUWtnQWlBQ0tBSU1JZ0JIQkVBZ0FpZ0NDQ0lCSUFBMkFnd2dBQ0FCTmdJSURBb0xJQUlvQWhRaUFRUi9JQUpCRkdvRklBSW9BaEFpQVVVTkF5QUNRUkJxQ3lFRkEwQWdCU0VISUFFaUFFRVVhaUVGSUFBb0FoUWlBUTBBSUFCQkVHb2hCU0FBS0FJUUlnRU5BQXNnQjBFQU5nSUFEQWtMUVg4aEJpQUFRYjkvU3cwQUlBQkJDMm9pQVVGNGNTRUdRWXdJS0FJQUlnZEZEUUJCSHlFSVFRQWdCbXNoQXlBQVFmVC8vd2ROQkVBZ0JrRW1JQUZCQ0habklnQnJka0VCY1NBQVFRRjBhMEUrYWlFSUN3SkFBa0FDUUNBSVFRSjBRYmdLYWlnQ0FDSUJSUVJBUVFBaEFBd0JDMEVBSVFBZ0JrRVpJQWhCQVhaclFRQWdDRUVmUnh0MElRSURRQUpBSUFFb0FnUkJlSEVnQm1zaUJDQURUdzBBSUFFaEJTQUVJZ01OQUVFQUlRTWdBU0VBREFNTElBQWdBU2dDRkNJRUlBUWdBU0FDUVIxMlFRUnhhaWdDRUNJQlJoc2dBQ0FFR3lFQUlBSkJBWFFoQWlBQkRRQUxDeUFBSUFWeVJRUkFRUUFoQlVFQ0lBaDBJZ0JCQUNBQWEzSWdCM0VpQUVVTkF5QUFhRUVDZEVHNENtb29BZ0FoQUFzZ0FFVU5BUXNEUUNBQUtBSUVRWGh4SUFacklnSWdBMGtoQVNBQ0lBTWdBUnNoQXlBQUlBVWdBUnNoQlNBQUtBSVFJZ0VFZnlBQkJTQUFLQUlVQ3lJQURRQUxDeUFGUlEwQUlBTkJrQWdvQWdBZ0JtdFBEUUFnQlNnQ0dDRUlJQVVnQlNnQ0RDSUFSd1JBSUFVb0FnZ2lBU0FBTmdJTUlBQWdBVFlDQ0F3SUN5QUZLQUlVSWdFRWZ5QUZRUlJxQlNBRktBSVFJZ0ZGRFFNZ0JVRVFhZ3NoQWdOQUlBSWhCQ0FCSWdCQkZHb2hBaUFBS0FJVUlnRU5BQ0FBUVJCcUlRSWdBQ2dDRUNJQkRRQUxJQVJCQURZQ0FBd0hDeUFHUVpBSUtBSUFJZ1ZOQkVCQm5BZ29BZ0FoQUFKQUlBVWdCbXNpQVVFUVR3UkFJQUFnQm1vaUFpQUJRUUZ5TmdJRUlBQWdCV29nQVRZQ0FDQUFJQVpCQTNJMkFnUU1BUXNnQUNBRlFRTnlOZ0lFSUFBZ0JXb2lBU0FCS0FJRVFRRnlOZ0lFUVFBaEFrRUFJUUVMUVpBSUlBRTJBZ0JCbkFnZ0FqWUNBQ0FBUVFocUlRQU1DUXNnQmtHVUNDZ0NBQ0lDU1FSQVFaUUlJQUlnQm1zaUFUWUNBRUdnQ0VHZ0NDZ0NBQ0lBSUFacUlnSTJBZ0FnQWlBQlFRRnlOZ0lFSUFBZ0JrRURjallDQkNBQVFRaHFJUUFNQ1F0QkFDRUFJQVpCTDJvaUF3Si9RZUFMS0FJQUJFQkI2QXNvQWdBTUFRdEI3QXRDZnpjQ0FFSGtDMEtBb0lDQWdJQUVOd0lBUWVBTElBcEJER3BCY0hGQjJLclZxZ1Z6TmdJQVFmUUxRUUEyQWdCQnhBdEJBRFlDQUVHQUlBc2lBV29pQkVFQUlBRnJJZ2R4SWdFZ0JrME5DRUhBQ3lnQ0FDSUZCRUJCdUFzb0FnQWlDQ0FCYWlJSklBaE5JQVVnQ1VseURRa0xBa0JCeEFzdEFBQkJCSEZGQkVBQ1FBSkFBa0FDUUVHZ0NDZ0NBQ0lGQkVCQnlBc2hBQU5BSUFBb0FnQWlDQ0FGVFFSQUlBVWdDQ0FBS0FJRWFra05Bd3NnQUNnQ0NDSUFEUUFMQzBFQUVBRWlBa0YvUmcwRElBRWhCRUhrQ3lnQ0FDSUFRUUZySWdVZ0FuRUVRQ0FCSUFKcklBSWdCV3BCQUNBQWEzRnFJUVFMSUFRZ0JrME5BMEhBQ3lnQ0FDSUFCRUJCdUFzb0FnQWlCU0FFYWlJSElBVk5JQUFnQjBseURRUUxJQVFRQVNJQUlBSkhEUUVNQlFzZ0JDQUNheUFIY1NJRUVBRWlBaUFBS0FJQUlBQW9BZ1JxUmcwQklBSWhBQXNnQUVGL1JnMEJJQVpCTUdvZ0JFMEVRQ0FBSVFJTUJBdEI2QXNvQWdBaUFpQURJQVJyYWtFQUlBSnJjU0lDRUFGQmYwWU5BU0FDSUFScUlRUWdBQ0VDREFNTElBSkJmMGNOQWd0QnhBdEJ4QXNvQWdCQkJISTJBZ0FMSUFFUUFTSUNRWDlHUVFBUUFTSUFRWDlHY2lBQUlBSk5jZzBGSUFBZ0Ftc2lCQ0FHUVNocVRRMEZDMEc0QzBHNEN5Z0NBQ0FFYWlJQU5nSUFRYndMS0FJQUlBQkpCRUJCdkFzZ0FEWUNBQXNDUUVHZ0NDZ0NBQ0lEQkVCQnlBc2hBQU5BSUFJZ0FDZ0NBQ0lCSUFBb0FnUWlCV3BHRFFJZ0FDZ0NDQ0lBRFFBTERBUUxRWmdJS0FJQUlnQkJBQ0FBSUFKTkcwVUVRRUdZQ0NBQ05nSUFDMEVBSVFCQnpBc2dCRFlDQUVISUN5QUNOZ0lBUWFnSVFYODJBZ0JCckFoQjRBc29BZ0EyQWdCQjFBdEJBRFlDQUFOQUlBQkJBM1FpQVVHNENHb2dBVUd3Q0dvaUJUWUNBQ0FCUWJ3SWFpQUZOZ0lBSUFCQkFXb2lBRUVnUncwQUMwR1VDQ0FFUVNocklnQkJlQ0FDYTBFSGNTSUJheUlGTmdJQVFhQUlJQUVnQW1vaUFUWUNBQ0FCSUFWQkFYSTJBZ1FnQUNBQ2FrRW9OZ0lFUWFRSVFmQUxLQUlBTmdJQURBUUxJQUlnQTAwZ0FTQURTM0lOQWlBQUtBSU1RUWh4RFFJZ0FDQUVJQVZxTmdJRVFhQUlJQU5CZUNBRGEwRUhjU0lBYWlJQk5nSUFRWlFJUVpRSUtBSUFJQVJxSWdJZ0FHc2lBRFlDQUNBQklBQkJBWEkyQWdRZ0FpQURha0VvTmdJRVFhUUlRZkFMS0FJQU5nSUFEQU1MUVFBaEFBd0dDMEVBSVFBTUJBdEJtQWdvQWdBZ0Frc0VRRUdZQ0NBQ05nSUFDeUFDSUFScUlRVkJ5QXNoQUFKQUEwQWdCU0FBS0FJQUlnRkhCRUFnQUNnQ0NDSUFEUUVNQWdzTElBQXRBQXhCQ0hGRkRRTUxRY2dMSVFBRFFBSkFJQUFvQWdBaUFTQURUUVJBSUFNZ0FTQUFLQUlFYWlJRlNRMEJDeUFBS0FJSUlRQU1BUXNMUVpRSUlBUkJLR3NpQUVGNElBSnJRUWR4SWdGcklnYzJBZ0JCb0FnZ0FTQUNhaUlCTmdJQUlBRWdCMEVCY2pZQ0JDQUFJQUpxUVNnMkFnUkJwQWhCOEFzb0FnQTJBZ0FnQXlBRlFTY2dCV3RCQjNGcVFTOXJJZ0FnQUNBRFFSQnFTUnNpQVVFYk5nSUVJQUZCMEFzcEFnQTNBaEFnQVVISUN5a0NBRGNDQ0VIUUN5QUJRUWhxTmdJQVFjd0xJQVEyQWdCQnlBc2dBallDQUVIVUMwRUFOZ0lBSUFGQkdHb2hBQU5BSUFCQkJ6WUNCQ0FBUVFocUlBQkJCR29oQUNBRlNRMEFDeUFCSUFOR0RRQWdBU0FCS0FJRVFYNXhOZ0lFSUFNZ0FTQURheUlDUVFGeU5nSUVJQUVnQWpZQ0FBSi9JQUpCL3dGTkJFQWdBa0Y0Y1VHd0NHb2hBQUovUVlnSUtBSUFJZ0ZCQVNBQ1FRTjJkQ0lDY1VVRVFFR0lDQ0FCSUFKeU5nSUFJQUFNQVFzZ0FDZ0NDQXNoQVNBQUlBTTJBZ2dnQVNBRE5nSU1RUXdoQWtFSURBRUxRUjhoQUNBQ1FmLy8vd2ROQkVBZ0FrRW1JQUpCQ0habklnQnJka0VCY1NBQVFRRjBhMEUrYWlFQUN5QURJQUEyQWh3Z0EwSUFOd0lRSUFCQkFuUkJ1QXBxSVFFQ1FBSkFRWXdJS0FJQUlnVkJBU0FBZENJRWNVVUVRRUdNQ0NBRUlBVnlOZ0lBSUFFZ0F6WUNBQXdCQ3lBQ1FSa2dBRUVCZG10QkFDQUFRUjlIRzNRaEFDQUJLQUlBSVFVRFFDQUZJZ0VvQWdSQmVIRWdBa1lOQWlBQVFSMTJJUVVnQUVFQmRDRUFJQUVnQlVFRWNXb2lCQ2dDRUNJRkRRQUxJQVFnQXpZQ0VBc2dBeUFCTmdJWVFRZ2hBaUFESWdFaEFFRU1EQUVMSUFFb0FnZ2lBQ0FETmdJTUlBRWdBellDQ0NBRElBQTJBZ2hCQUNFQVFSZ2hBa0VNQ3lBRGFpQUJOZ0lBSUFJZ0Eyb2dBRFlDQUF0QmxBZ29BZ0FpQUNBR1RRMEFRWlFJSUFBZ0Jtc2lBVFlDQUVHZ0NFR2dDQ2dDQUNJQUlBWnFJZ0kyQWdBZ0FpQUJRUUZ5TmdJRUlBQWdCa0VEY2pZQ0JDQUFRUWhxSVFBTUJBdEJoQWhCTURZQ0FFRUFJUUFNQXdzZ0FDQUNOZ0lBSUFBZ0FDZ0NCQ0FFYWpZQ0JDQUNRWGdnQW10QkIzRnFJZ2dnQmtFRGNqWUNCQ0FCUVhnZ0FXdEJCM0ZxSWdRZ0JpQUlhaUlEYXlFSEFrQkJvQWdvQWdBZ0JFWUVRRUdnQ0NBRE5nSUFRWlFJUVpRSUtBSUFJQWRxSWdBMkFnQWdBeUFBUVFGeU5nSUVEQUVMUVp3SUtBSUFJQVJHQkVCQm5BZ2dBellDQUVHUUNFR1FDQ2dDQUNBSGFpSUFOZ0lBSUFNZ0FFRUJjallDQkNBQUlBTnFJQUEyQWdBTUFRc2dCQ2dDQkNJQVFRTnhRUUZHQkVBZ0FFRjRjU0VKSUFRb0Fnd2hBZ0pBSUFCQi93Rk5CRUFnQkNnQ0NDSUJJQUpHQkVCQmlBaEJpQWdvQWdCQmZpQUFRUU4yZDNFMkFnQU1BZ3NnQVNBQ05nSU1JQUlnQVRZQ0NBd0JDeUFFS0FJWUlRWUNRQ0FDSUFSSEJFQWdCQ2dDQ0NJQUlBSTJBZ3dnQWlBQU5nSUlEQUVMQWtBZ0JDZ0NGQ0lBQkg4Z0JFRVVhZ1VnQkNnQ0VDSUFSUTBCSUFSQkVHb0xJUUVEUUNBQklRVWdBQ0lDUVJScUlRRWdBQ2dDRkNJQURRQWdBa0VRYWlFQklBSW9BaEFpQUEwQUN5QUZRUUEyQWdBTUFRdEJBQ0VDQ3lBR1JRMEFBa0FnQkNnQ0hDSUFRUUowUWJnS2FpSUJLQUlBSUFSR0JFQWdBU0FDTmdJQUlBSU5BVUdNQ0VHTUNDZ0NBRUYrSUFCM2NUWUNBQXdDQ3dKQUlBUWdCaWdDRUVZRVFDQUdJQUkyQWhBTUFRc2dCaUFDTmdJVUN5QUNSUTBCQ3lBQ0lBWTJBaGdnQkNnQ0VDSUFCRUFnQWlBQU5nSVFJQUFnQWpZQ0dBc2dCQ2dDRkNJQVJRMEFJQUlnQURZQ0ZDQUFJQUkyQWhnTElBY2dDV29oQnlBRUlBbHFJZ1FvQWdRaEFBc2dCQ0FBUVg1eE5nSUVJQU1nQjBFQmNqWUNCQ0FESUFkcUlBYzJBZ0FnQjBIL0FVMEVRQ0FIUVhoeFFiQUlhaUVBQW45QmlBZ29BZ0FpQVVFQklBZEJBM1owSWdKeFJRUkFRWWdJSUFFZ0FuSTJBZ0FnQUF3QkN5QUFLQUlJQ3lFQklBQWdBellDQ0NBQklBTTJBZ3dnQXlBQU5nSU1JQU1nQVRZQ0NBd0JDMEVmSVFJZ0IwSC8vLzhIVFFSQUlBZEJKaUFIUVFoMlp5SUFhM1pCQVhFZ0FFRUJkR3RCUG1vaEFnc2dBeUFDTmdJY0lBTkNBRGNDRUNBQ1FRSjBRYmdLYWlFQUFrQUNRRUdNQ0NnQ0FDSUJRUUVnQW5RaUJYRkZCRUJCakFnZ0FTQUZjallDQUNBQUlBTTJBZ0FNQVFzZ0IwRVpJQUpCQVhaclFRQWdBa0VmUnh0MElRSWdBQ2dDQUNFQkEwQWdBU0lBS0FJRVFYaHhJQWRHRFFJZ0FrRWRkaUVCSUFKQkFYUWhBaUFBSUFGQkJIRnFJZ1VvQWhBaUFRMEFDeUFGSUFNMkFoQUxJQU1nQURZQ0dDQURJQU0yQWd3Z0F5QUROZ0lJREFFTElBQW9BZ2dpQVNBRE5nSU1JQUFnQXpZQ0NDQURRUUEyQWhnZ0F5QUFOZ0lNSUFNZ0FUWUNDQXNnQ0VFSWFpRUFEQUlMQWtBZ0NFVU5BQUpBSUFVb0Fod2lBVUVDZEVHNENtb2lBaWdDQUNBRlJnUkFJQUlnQURZQ0FDQUFEUUZCakFnZ0IwRitJQUYzY1NJSE5nSUFEQUlMQWtBZ0JTQUlLQUlRUmdSQUlBZ2dBRFlDRUF3QkN5QUlJQUEyQWhRTElBQkZEUUVMSUFBZ0NEWUNHQ0FGS0FJUUlnRUVRQ0FBSUFFMkFoQWdBU0FBTmdJWUN5QUZLQUlVSWdGRkRRQWdBQ0FCTmdJVUlBRWdBRFlDR0FzQ1FDQURRUTlOQkVBZ0JTQURJQVpxSWdCQkEzSTJBZ1FnQUNBRmFpSUFJQUFvQWdSQkFYSTJBZ1FNQVFzZ0JTQUdRUU55TmdJRUlBVWdCbW9pQkNBRFFRRnlOZ0lFSUFNZ0JHb2dBellDQUNBRFFmOEJUUVJBSUFOQmVIRkJzQWhxSVFBQ2YwR0lDQ2dDQUNJQlFRRWdBMEVEZG5RaUFuRkZCRUJCaUFnZ0FTQUNjallDQUNBQURBRUxJQUFvQWdnTElRRWdBQ0FFTmdJSUlBRWdCRFlDRENBRUlBQTJBZ3dnQkNBQk5nSUlEQUVMUVI4aEFDQURRZi8vL3dkTkJFQWdBMEVtSUFOQkNIWm5JZ0JyZGtFQmNTQUFRUUYwYTBFK2FpRUFDeUFFSUFBMkFod2dCRUlBTndJUUlBQkJBblJCdUFwcUlRRUNRQUpBSUFkQkFTQUFkQ0lDY1VVRVFFR01DQ0FDSUFkeU5nSUFJQUVnQkRZQ0FDQUVJQUUyQWhnTUFRc2dBMEVaSUFCQkFYWnJRUUFnQUVFZlJ4dDBJUUFnQVNnQ0FDRUJBMEFnQVNJQ0tBSUVRWGh4SUFOR0RRSWdBRUVkZGlFQklBQkJBWFFoQUNBQ0lBRkJCSEZxSWdjb0FoQWlBUTBBQ3lBSElBUTJBaEFnQkNBQ05nSVlDeUFFSUFRMkFnd2dCQ0FFTmdJSURBRUxJQUlvQWdnaUFDQUVOZ0lNSUFJZ0JEWUNDQ0FFUVFBMkFoZ2dCQ0FDTmdJTUlBUWdBRFlDQ0FzZ0JVRUlhaUVBREFFTEFrQWdDVVVOQUFKQUlBSW9BaHdpQVVFQ2RFRzRDbW9pQlNnQ0FDQUNSZ1JBSUFVZ0FEWUNBQ0FBRFFGQmpBZ2dDMEYrSUFGM2NUWUNBQXdDQ3dKQUlBSWdDU2dDRUVZRVFDQUpJQUEyQWhBTUFRc2dDU0FBTmdJVUN5QUFSUTBCQ3lBQUlBazJBaGdnQWlnQ0VDSUJCRUFnQUNBQk5nSVFJQUVnQURZQ0dBc2dBaWdDRkNJQlJRMEFJQUFnQVRZQ0ZDQUJJQUEyQWhnTEFrQWdBMEVQVFFSQUlBSWdBeUFHYWlJQVFRTnlOZ0lFSUFBZ0Ftb2lBQ0FBS0FJRVFRRnlOZ0lFREFFTElBSWdCa0VEY2pZQ0JDQUNJQVpxSWdVZ0EwRUJjallDQkNBRElBVnFJQU0yQWdBZ0NBUkFJQWhCZUhGQnNBaHFJUUJCbkFnb0FnQWhBUUovUVFFZ0NFRURkblFpQnlBRWNVVUVRRUdJQ0NBRUlBZHlOZ0lBSUFBTUFRc2dBQ2dDQ0FzaEJDQUFJQUUyQWdnZ0JDQUJOZ0lNSUFFZ0FEWUNEQ0FCSUFRMkFnZ0xRWndJSUFVMkFnQkJrQWdnQXpZQ0FBc2dBa0VJYWlFQUN5QUtRUkJxSkFBZ0FBdkdCQUlHZndwOVFmLy8vLzhISVF4QmdJQ0FnSGdoRFVGL0lRa0RRQ0FESUFwR0JFQkJBQ0VBSUFoQkFFR0FnQkQ4Q3dCREFQOS9SeUFOSUF4cnNwVWhEd1VnQkNBS1FReHNhaUlMS2dJQUlSTWdDeW9DQ0NFVUlBc3FBZ1FoRlNBSklBSWdDa0VDZENJT2FpZ0NBQ0lMUndSQUlBRWdDMEhRQUd4cUlna3FBandnQUNvQ09DSVBsQ0FKS2dJNElBQXFBaWdpRUpRZ0NTb0NNQ0FBS2dJSUloR1VJQUFxQWhnaUVpQUpLZ0kwbEpLU2tpRVdJQWtxQWl3Z0Q1UWdDU29DS0NBUWxDQUpLZ0lnSUJHVUlCSWdDU29DSkpTU2twSWhGeUFKS2dJY0lBK1VJQWtxQWhnZ0VKUWdDU29DRUNBUmxDQVNJQWtxQWhTVWtwS1NJUmdnQ1NvQ0RDQVBsQ0FKS2dJSUlCQ1VJQWtxQWdBZ0VaUWdDU29DQkNBU2xKS1NraUVQSUFzaENRc2dCU0FPYWlBV0lCY2dGSlFnRHlBVGxDQVZJQmlVa3BLU1F3QUFnRVdVL0FBaUN6WUNBQ0FNSUFzZ0N5QU1TaHNoRENBTklBc2dDeUFOU0JzaERTQUtRUUZxSVFvTUFRc0xBMEFnQUNBRFJrVUVRQ0FGSUFCQkFuUnFJZ0VnRHlBQktBSUFJQXhyczVUOEFTSUJOZ0lBSUFnZ0FVRUNkR29pQVNBQktBSUFRUUZxTmdJQUlBQkJBV29oQUF3QkN3dEJBQ0VBSUFkQkFEWUNBQ0FJUVFScklRRkJBQ0VNUVFFaENnTkFJQXBCZ0lBRVJnUkFBMEFDUUNBQUlBTkdEUUFnQnlBRklBQkJBblJxS0FJQVFRSjBhaUlCSUFFb0FnQWlBVUVCYWpZQ0FDQUdJQUZCQW5ScUlBQTJBZ0FnQUVFQmFpRUFEQUVMQ3dVZ0J5QUtRUUowSWdKcUlBRWdBbW9vQWdBZ0RHb2lERFlDQUNBS1FRRnFJUW9NQVFzTEN3SUFDd3NKQVFCQmdRZ0xBZ1lCIik7CiAgfQogIGZ1bmN0aW9uIE8oQSkgewogICAgaWYgKEFycmF5QnVmZmVyLmlzVmlldyhBKSkKICAgICAgcmV0dXJuIEE7CiAgICBpZiAoQSA9PSBTICYmIE0pCiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShNKTsKICAgIGlmIChVKQogICAgICByZXR1cm4gVShBKTsKICAgIHRocm93ICdzeW5jIGZldGNoaW5nIG9mIHRoZSB3YXNtIGZhaWxlZDogeW91IGNhbiBwcmVsb2FkIGl0IHRvIE1vZHVsZVsid2FzbUJpbmFyeSJdIG1hbnVhbGx5LCBvciBlbWNjLnB5IHdpbGwgZG8gdGhhdCBmb3IgeW91IHdoZW4gZ2VuZXJhdGluZyBIVE1MIChidXQgbm90IEpTKSc7CiAgfQogIGZ1bmN0aW9uICQoQSwgQikgewogICAgdmFyIHQsIEUgPSBPKEEpOwogICAgdCA9IG5ldyBXZWJBc3NlbWJseS5Nb2R1bGUoRSk7CiAgICB2YXIgaSA9IG5ldyBXZWJBc3NlbWJseS5JbnN0YW5jZSh0LCBCKTsKICAgIHJldHVybiBbaSwgdF07CiAgfQogIGZ1bmN0aW9uIEFBKCkgewogICAgcmV0dXJuIHsgYTogbkEgfTsKICB9CiAgZnVuY3Rpb24gSUEoKSB7CiAgICBmdW5jdGlvbiBBKEUsIGkpIHsKICAgICAgcmV0dXJuIHkgPSBFLmV4cG9ydHMsIHUgPSB5LmIsIHEoKSwgckEoeSksIHooKSwgeTsKICAgIH0KICAgIF8oKTsKICAgIHZhciBCID0gQUEoKTsKICAgIGlmIChJLmluc3RhbnRpYXRlV2FzbSkKICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChFLCBpKSA9PiB7CiAgICAgICAgSS5pbnN0YW50aWF0ZVdhc20oQiwgKG8sIGgpID0+IHsKICAgICAgICAgIEUoQShvKSk7CiAgICAgICAgfSk7CiAgICAgIH0pOwogICAgUyA/Pz0gVigpOwogICAgdmFyIHQgPSAkKFMsIEIpOwogICAgcmV0dXJuIEEodFswXSk7CiAgfQogIGZvciAodmFyIHggPSAoQSkgPT4gewogICAgZm9yICg7IEEubGVuZ3RoID4gMDsgKQogICAgICBBLnNoaWZ0KCkoSSk7CiAgfSwgdiA9IFtdLCBnQSA9IChBKSA9PiB2LnB1c2goQSksIFQgPSBbXSwgQ0EgPSAoQSkgPT4gVC5wdXNoKEEpLCBCQSA9IChBKSA9PiB7CiAgICBmb3IgKHZhciBCLCB0LCBFID0gMCwgaSA9IDAsIG8gPSBBLmxlbmd0aCwgaCA9IG5ldyBVaW50OEFycmF5KChvICogMyA+PiAyKSAtIChBW28gLSAyXSA9PSAiPSIpIC0gKEFbbyAtIDFdID09ICI9IikpOyBFIDwgbzsgRSArPSA0LCBpICs9IDMpCiAgICAgIEIgPSBuW0EuY2hhckNvZGVBdChFICsgMSldLCB0ID0gbltBLmNoYXJDb2RlQXQoRSArIDIpXSwgaFtpXSA9IG5bQS5jaGFyQ29kZUF0KEUpXSA8PCAyIHwgQiA+PiA0LCBoW2kgKyAxXSA9IEIgPDwgNCB8IHQgPj4gMiwgaFtpICsgMl0gPSB0IDw8IDYgfCBuW0EuY2hhckNvZGVBdChFICsgMyldOwogICAgcmV0dXJuIGg7CiAgfSwgUUEgPSAoKSA9PiAyMTQ3NDgzNjQ4LCBFQSA9IChBLCBCKSA9PiBNYXRoLmNlaWwoQSAvIEIpICogQiwgdEEgPSAoQSkgPT4gewogICAgdmFyIEIgPSB1LmJ1ZmZlciwgdCA9IChBIC0gQi5ieXRlTGVuZ3RoICsgNjU1MzUpIC8gNjU1MzYgfCAwOwogICAgdHJ5IHsKICAgICAgcmV0dXJuIHUuZ3Jvdyh0KSwgcSgpLCAxOwogICAgfSBjYXRjaCB7CiAgICB9CiAgfSwgaUEgPSAoQSkgPT4gewogICAgdmFyIEIgPSBMLmxlbmd0aDsKICAgIEEgPj4+PSAwOwogICAgdmFyIHQgPSBRQSgpOwogICAgaWYgKEEgPiB0KQogICAgICByZXR1cm4gITE7CiAgICBmb3IgKHZhciBFID0gMTsgRSA8PSA0OyBFICo9IDIpIHsKICAgICAgdmFyIGkgPSBCICogKDEgKyAwLjIgLyBFKTsKICAgICAgaSA9IE1hdGgubWluKGksIEEgKyAxMDA2NjMyOTYpOwogICAgICB2YXIgbyA9IE1hdGgubWluKHQsIEVBKE1hdGgubWF4KEEsIGkpLCA2NTUzNikpLCBoID0gdEEobyk7CiAgICAgIGlmIChoKQogICAgICAgIHJldHVybiAhMDsKICAgIH0KICAgIHJldHVybiAhMTsKICB9LCBuID0gbmV3IFVpbnQ4QXJyYXkoMTIzKSwgZSA9IDI1OyBlID49IDA7IC0tZSkKICAgIG5bNDggKyBlXSA9IDUyICsgZSwgbls2NSArIGVdID0gZSwgbls5NyArIGVdID0gMjYgKyBlOwogIG5bNDNdID0gNjIsIG5bNDddID0gNjMsIEkubm9FeGl0UnVudGltZSAmJiBJLm5vRXhpdFJ1bnRpbWUsIEkucHJpbnQgJiYgSS5wcmludCwgSS5wcmludEVyciAmJiBJLnByaW50RXJyLCBJLndhc21CaW5hcnkgJiYgKE0gPSBJLndhc21CaW5hcnkpLCBJLmFyZ3VtZW50cyAmJiBJLmFyZ3VtZW50cywgSS50aGlzUHJvZ3JhbSAmJiBJLnRoaXNQcm9ncmFtOwogIGZ1bmN0aW9uIHJBKEEpIHsKICAgIEkuX3NvcnQgPSBBLmQsIEkuX21hbGxvYyA9IEEuZSwgSS5fZnJlZSA9IEEuZjsKICB9CiAgdmFyIG5BID0geyBhOiBpQSB9LCB5ID0gSUEoKTsKICBmdW5jdGlvbiBtKCkgewogICAgaWYgKHMgPiAwKSB7CiAgICAgIGYgPSBtOwogICAgICByZXR1cm47CiAgICB9CiAgICBpZiAoUCgpLCBzID4gMCkgewogICAgICBmID0gbTsKICAgICAgcmV0dXJuOwogICAgfQogICAgZnVuY3Rpb24gQSgpIHsKICAgICAgSS5jYWxsZWRSdW4gPSAhMCwgYigpLCBJLm9uUnVudGltZUluaXRpYWxpemVkPy4oKSwgVygpOwogICAgfQogICAgSS5zZXRTdGF0dXMgPyAoSS5zZXRTdGF0dXMoIlJ1bm5pbmcuLi4iKSwgc2V0VGltZW91dCgoKSA9PiB7CiAgICAgIHNldFRpbWVvdXQoKCkgPT4gSS5zZXRTdGF0dXMoIiIpLCAxKSwgQSgpOwogICAgfSwgMSkpIDogQSgpOwogIH0KICBmdW5jdGlvbiBhQSgpIHsKICAgIGlmIChJLnByZUluaXQpCiAgICAgIGZvciAodHlwZW9mIEkucHJlSW5pdCA9PSAiZnVuY3Rpb24iICYmIChJLnByZUluaXQgPSBbSS5wcmVJbml0XSk7IEkucHJlSW5pdC5sZW5ndGggPiAwOyApCiAgICAgICAgSS5wcmVJbml0LnNoaWZ0KCkoKTsKICB9CiAgcmV0dXJuIGFBKCksIG0oKSwgciA9IEksIHI7Cn07CmxldCBnLCBRLCBkLCBjLCBOLCB3LCBwLCBSLCBrLCBKLCBhID0gMCwgWSA9IDAsIEggPSBbXSwgRyA9ICEwLCBEID0gITEsIEYgPSAhMSwgSyA9ICExOwphc3luYyBmdW5jdGlvbiBvQSgpIHsKICBpZiAoIWcgJiYgKGcgPSBhd2FpdCBlQSgpLCAhZyB8fCAhZy5IRUFQRjMyIHx8ICFnLl9zb3J0KSkKICAgIHRocm93IG5ldyBFcnJvcigiV0FTTSBtb2R1bGUgZmFpbGVkIHRvIGluaXRpYWxpemUgcHJvcGVybHkiKTsKfQpjb25zdCBaID0gYXN5bmMgKCkgPT4gewogIGlmIChEKSB7CiAgICBGID0gITA7CiAgICByZXR1cm47CiAgfQogIEQgPSAhMCwgRiA9ICExLCBnIHx8IGF3YWl0IG9BKCk7CiAgY29uc3QgQyA9IE1hdGgucG93KDIsIE1hdGguY2VpbChNYXRoLmxvZzIoUS52ZXJ0ZXhDb3VudCkpKTsKICBhIDwgQyAmJiAoYSA+IDAgJiYgKGcuX2ZyZWUoZCksIGcuX2ZyZWUoTiksIGcuX2ZyZWUodyksIGcuX2ZyZWUocCksIGcuX2ZyZWUoUiksIGcuX2ZyZWUoayksIGcuX2ZyZWUoSikpLCBhID0gQywgZCA9IGcuX21hbGxvYygxNiAqIDQpLCBOID0gZy5fbWFsbG9jKGEgKiA0KSwgdyA9IGcuX21hbGxvYygzICogYSAqIDQpLCBwID0gZy5fbWFsbG9jKGEgKiA0KSwgUiA9IGcuX21hbGxvYyhhICogNCksIGsgPSBnLl9tYWxsb2MoYSAqIDQpLCBKID0gZy5fbWFsbG9jKGEgKiA0KSksIFkgPCBRLnRyYW5zZm9ybXMubGVuZ3RoICYmIChZID4gMCAmJiBnLl9mcmVlKGMpLCBZID0gUS50cmFuc2Zvcm1zLmxlbmd0aCwgYyA9IGcuX21hbGxvYyhZICogNCkpLCBEID0gITEsIEYgJiYgKEYgPSAhMSwgYXdhaXQgWigpKTsKfSwgc0EgPSAoKSA9PiB7CiAgaWYgKCEoRCB8fCBGIHx8ICFnIHx8ICFRKSkgewogICAgRCA9ICEwOwogICAgdHJ5IHsKICAgICAgY29uc3QgQyA9IGcuSEVBUEYzMiwgciA9IGcuSEVBUFUzMjsKICAgICAgaWYgKHcgLyA0ICsgUS5wb3NpdGlvbnMubGVuZ3RoID4gQy5sZW5ndGgpCiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCJQb3NpdGlvbnMgYnVmZmVyIG92ZXJmbG93Iik7CiAgICAgIGlmIChjIC8gNCArIFEudHJhbnNmb3Jtcy5sZW5ndGggPiBDLmxlbmd0aCkKICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIlRyYW5zZm9ybXMgYnVmZmVyIG92ZXJmbG93Iik7CiAgICAgIGlmIChOIC8gNCArIFEudHJhbnNmb3JtSW5kaWNlcy5sZW5ndGggPiByLmxlbmd0aCkKICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIlRyYW5zZm9ybSBpbmRpY2VzIGJ1ZmZlciBvdmVyZmxvdyIpOwogICAgICBpZiAoQy5zZXQoUS5wb3NpdGlvbnMsIHcgLyA0KSwgQy5zZXQoUS50cmFuc2Zvcm1zLCBjIC8gNCksIHIuc2V0KFEudHJhbnNmb3JtSW5kaWNlcywgTiAvIDQpLCBDLnNldChuZXcgRmxvYXQzMkFycmF5KEgpLCBkIC8gNCksIGcuX3NvcnQoCiAgICAgICAgZCwKICAgICAgICBjLAogICAgICAgIE4sCiAgICAgICAgUS52ZXJ0ZXhDb3VudCwKICAgICAgICB3LAogICAgICAgIHAsCiAgICAgICAgUiwKICAgICAgICBrLAogICAgICAgIEoKICAgICAgKSwgUiArIFEudmVydGV4Q291bnQgKiA0ID4gci5idWZmZXIuYnl0ZUxlbmd0aCkKICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIkRlcHRoIGluZGV4IGJ1ZmZlciBvdmVyZmxvdyIpOwogICAgICBjb25zdCBJID0gbmV3IFVpbnQzMkFycmF5KHIuYnVmZmVyLCBSLCBRLnZlcnRleENvdW50KSwgbCA9IG5ldyBVaW50MzJBcnJheShJLnNsaWNlKCkuYnVmZmVyKTsKICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7IGRlcHRoSW5kZXg6IGwgfSwgW2wuYnVmZmVyXSk7CiAgICB9IGNhdGNoIHsKICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7IGRlcHRoSW5kZXg6IG5ldyBVaW50MzJBcnJheSgwKSB9LCBbXSk7CiAgICB9CiAgICBEID0gITEsIEcgPSAhMTsKICB9Cn0sIFggPSAoKSA9PiB7CiAgSyB8fCAoSyA9ICEwLCBHICYmIHNBKCksIHNldFRpbWVvdXQoKCkgPT4gewogICAgSyA9ICExLCBYKCk7CiAgfSkpOwp9OwpzZWxmLm9ubWVzc2FnZSA9IChDKSA9PiB7CiAgQy5kYXRhLnNvcnREYXRhICYmIChRID8gKFEucG9zaXRpb25zLnNldChDLmRhdGEuc29ydERhdGEucG9zaXRpb25zKSwgUS50cmFuc2Zvcm1zLnNldChDLmRhdGEuc29ydERhdGEudHJhbnNmb3JtcyksIFEudHJhbnNmb3JtSW5kaWNlcy5zZXQoQy5kYXRhLnNvcnREYXRhLnRyYW5zZm9ybUluZGljZXMpLCBRLnZlcnRleENvdW50ID0gQy5kYXRhLnNvcnREYXRhLnZlcnRleENvdW50KSA6IFEgPSB7CiAgICBwb3NpdGlvbnM6IG5ldyBGbG9hdDMyQXJyYXkoQy5kYXRhLnNvcnREYXRhLnBvc2l0aW9ucyksCiAgICB0cmFuc2Zvcm1zOiBuZXcgRmxvYXQzMkFycmF5KEMuZGF0YS5zb3J0RGF0YS50cmFuc2Zvcm1zKSwKICAgIHRyYW5zZm9ybUluZGljZXM6IG5ldyBVaW50MzJBcnJheShDLmRhdGEuc29ydERhdGEudHJhbnNmb3JtSW5kaWNlcyksCiAgICB2ZXJ0ZXhDb3VudDogQy5kYXRhLnNvcnREYXRhLnZlcnRleENvdW50CiAgfSwgRyA9ICEwLCBaKCkpLCBDLmRhdGEudmlld1Byb2ogJiYgKEMuZGF0YS52aWV3UHJvai5ldmVyeSgocikgPT4gSC5pbmNsdWRlcyhyKSkgPT09ICExICYmIChIID0gQy5kYXRhLnZpZXdQcm9qLCBHID0gITApLCBYKCkpOwp9OwovLyMgc291cmNlTWFwcGluZ1VSTD1Tb3J0V29ya2VyLURRTDdVVEVoLmpzLm1hcAo=",GA=n=>Uint8Array.from(atob(n),e=>e.charCodeAt(0)),fh=typeof self<"u"&&self.Blob&&new Blob(["URL.revokeObjectURL(import.meta.url);",GA(uh)],{type:"text/javascript;charset=utf-8"});function HA(n){let e;try{if(e=fh&&(self.URL||self.webkitURL).createObjectURL(fh),!e)throw"";const t=new Worker(e,{type:"module",name:n?.name});return t.addEventListener("error",()=>{(self.URL||self.webkitURL).revokeObjectURL(e)}),t}catch{return new Worker("data:text/javascript;base64,"+uh,{type:"module",name:n?.name})}}class ph{constructor(e,t){this._scene=null,this._camera=null,this._started=!1,this._initialized=!1,this._renderer=e;const i=e.gl;this._program=i.createProgram(),this._passes=t||[];const r=i.createShader(i.VERTEX_SHADER);i.shaderSource(r,this._getVertexSource()),i.compileShader(r),i.getShaderParameter(r,i.COMPILE_STATUS)||console.error(i.getShaderInfoLog(r));const s=i.createShader(i.FRAGMENT_SHADER);i.shaderSource(s,this._getFragmentSource()),i.compileShader(s),i.getShaderParameter(s,i.COMPILE_STATUS)||console.error(i.getShaderInfoLog(s)),i.attachShader(this.program,r),i.attachShader(this.program,s),i.linkProgram(this.program),i.getProgramParameter(this.program,i.LINK_STATUS)||console.error(i.getProgramInfoLog(this.program)),this.resize=()=>{i.useProgram(this._program),this._resize()},this.initialize=()=>{console.assert(!this._initialized,"ShaderProgram already initialized"),i.useProgram(this._program),this._initialize();for(const a of this.passes)a.initialize(this);this._initialized=!0,this._started=!0},this.render=(a,o)=>{i.useProgram(this._program),(this._scene!==a||this._camera!==o)&&(this.dispose(),this._scene=a,this._camera=o,this.initialize());for(const l of this.passes)l.render();this._render()},this.dispose=()=>{if(this._initialized){i.useProgram(this._program);for(const a of this.passes)a.dispose();this._dispose(),this._scene=null,this._camera=null,this._initialized=!1}}}get renderer(){return this._renderer}get scene(){return this._scene}get camera(){return this._camera}get program(){return this._program}get passes(){return this._passes}get started(){return this._started}}const mh="dmFyIG9BID0gZnVuY3Rpb24oQyA9IHt9KSB7CiAgdmFyIGUsIEEgPSBDLCBoID0gaW1wb3J0Lm1ldGEudXJsLCBrID0gIiIsIHk7CiAgewogICAgdHJ5IHsKICAgICAgayA9IG5ldyBVUkwoIi4iLCBoKS5ocmVmOwogICAgfSBjYXRjaCB7CiAgICB9CiAgICB5ID0gKGcpID0+IHsKICAgICAgdmFyIEIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsKICAgICAgcmV0dXJuIEIub3BlbigiR0VUIiwgZywgITEpLCBCLnJlc3BvbnNlVHlwZSA9ICJhcnJheWJ1ZmZlciIsIEIuc2VuZChudWxsKSwgbmV3IFVpbnQ4QXJyYXkoQi5yZXNwb25zZSk7CiAgICB9OwogIH0KICBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpLCBjb25zb2xlLmVycm9yLmJpbmQoY29uc29sZSk7CiAgdmFyIEYsIEQsIE47CiAgZnVuY3Rpb24gVSgpIHsKICAgIHZhciBnID0gRC5idWZmZXI7CiAgICBBLkhFQVBVOCA9IE4gPSBuZXcgVWludDhBcnJheShnKSwgQS5IRUFQVTMyID0gbmV3IFVpbnQzMkFycmF5KGcpLCBBLkhFQVBGMzIgPSBuZXcgRmxvYXQzMkFycmF5KGcpLCBuZXcgQmlnSW50NjRBcnJheShnKSwgbmV3IEJpZ1VpbnQ2NEFycmF5KGcpOwogIH0KICBmdW5jdGlvbiBpKCkgewogICAgaWYgKEEucHJlUnVuKQogICAgICBmb3IgKHR5cGVvZiBBLnByZVJ1biA9PSAiZnVuY3Rpb24iICYmIChBLnByZVJ1biA9IFtBLnByZVJ1bl0pOyBBLnByZVJ1bi5sZW5ndGg7ICkKICAgICAgICAkKEEucHJlUnVuLnNoaWZ0KCkpOwogICAgeChUKTsKICB9CiAgZnVuY3Rpb24gSCgpIHsKICAgIGYuYygpOwogIH0KICBmdW5jdGlvbiBiKCkgewogICAgaWYgKEEucG9zdFJ1bikKICAgICAgZm9yICh0eXBlb2YgQS5wb3N0UnVuID09ICJmdW5jdGlvbiIgJiYgKEEucG9zdFJ1biA9IFtBLnBvc3RSdW5dKTsgQS5wb3N0UnVuLmxlbmd0aDsgKQogICAgICAgIE8oQS5wb3N0UnVuLnNoaWZ0KCkpOwogICAgeChqKTsKICB9CiAgdmFyIHMgPSAwLCB3ID0gbnVsbDsKICBmdW5jdGlvbiB2KGcpIHsKICAgIHMrKywgQS5tb25pdG9yUnVuRGVwZW5kZW5jaWVzPy4ocyk7CiAgfQogIGZ1bmN0aW9uIFAoZykgewogICAgaWYgKHMtLSwgQS5tb25pdG9yUnVuRGVwZW5kZW5jaWVzPy4ocyksIHMgPT0gMCAmJiB3KSB7CiAgICAgIHZhciBCID0gdzsKICAgICAgdyA9IG51bGwsIEIoKTsKICAgIH0KICB9CiAgdmFyIG07CiAgZnVuY3Rpb24gWCgpIHsKICAgIHJldHVybiBBQSgiQUdGemJRRUFBQUFCSmdaZ0FYOEJmMkFDZlgwQmYyQUJmUUYvWUFGL0FHQUxmMzkvZjM5L2YzOS9mMzhBWUFBQUFnY0JBV0VCWVFBQUF3Z0hBQUVDQXdBRUJRVUhBUUdDQW9DQUFnWUlBWDhCUVlDTUJBc0hGUVVCWWdJQUFXTUFCd0ZrQUFZQlpRQUZBV1lBQkF3QkFRcXFRQWRQQVFKL1FZQUlLQUlBSWdFZ0FFRUhha0Y0Y1NJQ2FpRUFBa0FnQWtFQUlBQWdBVTBiUlFSQUlBQS9BRUVRZEUwTkFTQUFFQUFOQVF0QmhBaEJNRFlDQUVGL0R3dEJnQWdnQURZQ0FDQUJDdzRBSUFBUUF5QUJFQU5CRUhSeUMzSUJCSDhnQUx3aUJFSC8vLzhEY1NFQkFrQWdCRUVYZGtIL0FYRWlBa1VOQUNBQ1FmQUFUUVJBSUFGQmdJQ0FCSEpCOFFBZ0FtdDJJUUVNQVFzZ0FrR05BVXNFUUVHQStBRWhBMEVBSVFFTUFRc2dBa0VLZEVHQWdBZHJJUU1MSUFNZ0JFRVFka0dBZ0FKeGNpQUJRUTEyY2d2Y0N3RUlmd0pBSUFCRkRRQWdBRUVJYXlJRElBQkJCR3NvQWdBaUFrRjRjU0lBYWlFRkFrQWdBa0VCY1EwQUlBSkJBbkZGRFFFZ0F5QURLQUlBSWdScklnTkJtQWdvQWdCSkRRRWdBQ0FFYWlFQUFrQUNRQUpBUVp3SUtBSUFJQU5IQkVBZ0F5Z0NEQ0VCSUFSQi93Rk5CRUFnQVNBREtBSUlJZ0pIRFFKQmlBaEJpQWdvQWdCQmZpQUVRUU4yZDNFMkFnQU1CUXNnQXlnQ0dDRUhJQUVnQTBjRVFDQURLQUlJSWdJZ0FUWUNEQ0FCSUFJMkFnZ01CQXNnQXlnQ0ZDSUNCSDhnQTBFVWFnVWdBeWdDRUNJQ1JRMERJQU5CRUdvTElRUURRQ0FFSVFZZ0FpSUJRUlJxSVFRZ0FTZ0NGQ0lDRFFBZ0FVRVFhaUVFSUFFb0FoQWlBZzBBQ3lBR1FRQTJBZ0FNQXdzZ0JTZ0NCQ0lDUVFOeFFRTkhEUU5Ca0FnZ0FEWUNBQ0FGSUFKQmZuRTJBZ1FnQXlBQVFRRnlOZ0lFSUFVZ0FEWUNBQThMSUFJZ0FUWUNEQ0FCSUFJMkFnZ01BZ3RCQUNFQkN5QUhSUTBBQWtBZ0F5Z0NIQ0lFUVFKMFFiZ0thaUlDS0FJQUlBTkdCRUFnQWlBQk5nSUFJQUVOQVVHTUNFR01DQ2dDQUVGK0lBUjNjVFlDQUF3Q0N3SkFJQU1nQnlnQ0VFWUVRQ0FISUFFMkFoQU1BUXNnQnlBQk5nSVVDeUFCUlEwQkN5QUJJQWMyQWhnZ0F5Z0NFQ0lDQkVBZ0FTQUNOZ0lRSUFJZ0FUWUNHQXNnQXlnQ0ZDSUNSUTBBSUFFZ0FqWUNGQ0FDSUFFMkFoZ0xJQU1nQlU4TkFDQUZLQUlFSWdSQkFYRkZEUUFDUUFKQUFrQUNRQ0FFUVFKeFJRUkFRYUFJS0FJQUlBVkdCRUJCb0FnZ0F6WUNBRUdVQ0VHVUNDZ0NBQ0FBYWlJQU5nSUFJQU1nQUVFQmNqWUNCQ0FEUVp3SUtBSUFSdzBHUVpBSVFRQTJBZ0JCbkFoQkFEWUNBQThMUVp3SUtBSUFJZ2NnQlVZRVFFR2NDQ0FETmdJQVFaQUlRWkFJS0FJQUlBQnFJZ0EyQWdBZ0F5QUFRUUZ5TmdJRUlBQWdBMm9nQURZQ0FBOExJQVJCZUhFZ0FHb2hBQ0FGS0FJTUlRRWdCRUgvQVUwRVFDQUZLQUlJSWdJZ0FVWUVRRUdJQ0VHSUNDZ0NBRUYrSUFSQkEzWjNjVFlDQUF3RkN5QUNJQUUyQWd3Z0FTQUNOZ0lJREFRTElBVW9BaGdoQ0NBQklBVkhCRUFnQlNnQ0NDSUNJQUUyQWd3Z0FTQUNOZ0lJREFNTElBVW9BaFFpQWdSL0lBVkJGR29GSUFVb0FoQWlBa1VOQWlBRlFSQnFDeUVFQTBBZ0JDRUdJQUlpQVVFVWFpRUVJQUVvQWhRaUFnMEFJQUZCRUdvaEJDQUJLQUlRSWdJTkFBc2dCa0VBTmdJQURBSUxJQVVnQkVGK2NUWUNCQ0FESUFCQkFYSTJBZ1FnQUNBRGFpQUFOZ0lBREFNTFFRQWhBUXNnQ0VVTkFBSkFJQVVvQWh3aUJFRUNkRUc0Q21vaUFpZ0NBQ0FGUmdSQUlBSWdBVFlDQUNBQkRRRkJqQWhCakFnb0FnQkJmaUFFZDNFMkFnQU1BZ3NDUUNBRklBZ29BaEJHQkVBZ0NDQUJOZ0lRREFFTElBZ2dBVFlDRkFzZ0FVVU5BUXNnQVNBSU5nSVlJQVVvQWhBaUFnUkFJQUVnQWpZQ0VDQUNJQUUyQWhnTElBVW9BaFFpQWtVTkFDQUJJQUkyQWhRZ0FpQUJOZ0lZQ3lBRElBQkJBWEkyQWdRZ0FDQURhaUFBTmdJQUlBTWdCMGNOQUVHUUNDQUFOZ0lBRHdzZ0FFSC9BVTBFUUNBQVFYaHhRYkFJYWlFQ0FuOUJpQWdvQWdBaUJFRUJJQUJCQTNaMElnQnhSUVJBUVlnSUlBQWdCSEkyQWdBZ0Fnd0JDeUFDS0FJSUN5RUFJQUlnQXpZQ0NDQUFJQU0yQWd3Z0F5QUNOZ0lNSUFNZ0FEWUNDQThMUVI4aEFTQUFRZi8vL3dkTkJFQWdBRUVtSUFCQkNIWm5JZ0pyZGtFQmNTQUNRUUYwYTBFK2FpRUJDeUFESUFFMkFod2dBMElBTndJUUlBRkJBblJCdUFwcUlRUUNmd0pBQW45QmpBZ29BZ0FpQmtFQklBRjBJZ0p4UlFSQVFZd0lJQUlnQm5JMkFnQWdCQ0FETmdJQVFSZ2hBVUVJREFFTElBQkJHU0FCUVFGMmEwRUFJQUZCSDBjYmRDRUJJQVFvQWdBaEJBTkFJQVFpQWlnQ0JFRjRjU0FBUmcwQ0lBRkJIWFloQkNBQlFRRjBJUUVnQWlBRVFRUnhhaUlHS0FJUUlnUU5BQXNnQmlBRE5nSVFRUmdoQVNBQ0lRUkJDQXNoQUNBRElnSU1BUXNnQWlnQ0NDSUVJQU0yQWd3Z0FpQUROZ0lJUVJnaEFFRUlJUUZCQUFzaEJpQUJJQU5xSUFRMkFnQWdBeUFDTmdJTUlBQWdBMm9nQmpZQ0FFR29DRUdvQ0NnQ0FFRUJheUlBUVg4Z0FCczJBZ0FMQzlFbkFRdC9Jd0JCRUdzaUNpUUFBa0FDUUFKQUFrQUNRQUpBQWtBQ1FBSkFBa0FnQUVIMEFVMEVRRUdJQ0NnQ0FDSUVRUkFnQUVFTGFrSDRBM0VnQUVFTFNSc2lCa0VEZGlJQWRpSUJRUU54QkVBQ1FDQUJRWDl6UVFGeElBQnFJZ0pCQTNRaUFVR3dDR29pQUNBQlFiZ0lhaWdDQUNJQktBSUlJZ1ZHQkVCQmlBZ2dCRUYrSUFKM2NUWUNBQXdCQ3lBRklBQTJBZ3dnQUNBRk5nSUlDeUFCUVFocUlRQWdBU0FDUVFOMElnSkJBM0kyQWdRZ0FTQUNhaUlCSUFFb0FnUkJBWEkyQWdRTUN3c2dCa0dRQ0NnQ0FDSUlUUTBCSUFFRVFBSkFRUUlnQUhRaUFrRUFJQUpyY2lBQklBQjBjV2dpQVVFRGRDSUFRYkFJYWlJQ0lBQkJ1QWhxS0FJQUlnQW9BZ2dpQlVZRVFFR0lDQ0FFUVg0Z0FYZHhJZ1EyQWdBTUFRc2dCU0FDTmdJTUlBSWdCVFlDQ0FzZ0FDQUdRUU55TmdJRUlBQWdCbW9pQnlBQlFRTjBJZ0VnQm1zaUJVRUJjallDQkNBQUlBRnFJQVUyQWdBZ0NBUkFJQWhCZUhGQnNBaHFJUUZCbkFnb0FnQWhBZ0ovSUFSQkFTQUlRUU4yZENJRGNVVUVRRUdJQ0NBRElBUnlOZ0lBSUFFTUFRc2dBU2dDQ0FzaEF5QUJJQUkyQWdnZ0F5QUNOZ0lNSUFJZ0FUWUNEQ0FDSUFNMkFnZ0xJQUJCQ0dvaEFFR2NDQ0FITmdJQVFaQUlJQVUyQWdBTUN3dEJqQWdvQWdBaUMwVU5BU0FMYUVFQ2RFRzRDbW9vQWdBaUFpZ0NCRUY0Y1NBR2F5RURJQUloQVFOQUFrQWdBU2dDRUNJQVJRUkFJQUVvQWhRaUFFVU5BUXNnQUNnQ0JFRjRjU0FHYXlJQklBTWdBU0FEU1NJQkd5RURJQUFnQWlBQkd5RUNJQUFoQVF3QkN3c2dBaWdDR0NFSklBSWdBaWdDRENJQVJ3UkFJQUlvQWdnaUFTQUFOZ0lNSUFBZ0FUWUNDQXdLQ3lBQ0tBSVVJZ0VFZnlBQ1FSUnFCU0FDS0FJUUlnRkZEUU1nQWtFUWFnc2hCUU5BSUFVaEJ5QUJJZ0JCRkdvaEJTQUFLQUlVSWdFTkFDQUFRUkJxSVFVZ0FDZ0NFQ0lCRFFBTElBZEJBRFlDQUF3SkMwRi9JUVlnQUVHL2Ywc05BQ0FBUVF0cUlnRkJlSEVoQmtHTUNDZ0NBQ0lIUlEwQVFSOGhDRUVBSUFacklRTWdBRUgwLy84SFRRUkFJQVpCSmlBQlFRaDJaeUlBYTNaQkFYRWdBRUVCZEd0QlBtb2hDQXNDUUFKQUFrQWdDRUVDZEVHNENtb29BZ0FpQVVVRVFFRUFJUUFNQVF0QkFDRUFJQVpCR1NBSVFRRjJhMEVBSUFoQkgwY2JkQ0VDQTBBQ1FDQUJLQUlFUVhoeElBWnJJZ1FnQTA4TkFDQUJJUVVnQkNJRERRQkJBQ0VESUFFaEFBd0RDeUFBSUFFb0FoUWlCQ0FFSUFFZ0FrRWRka0VFY1dvb0FoQWlBVVliSUFBZ0JCc2hBQ0FDUVFGMElRSWdBUTBBQ3dzZ0FDQUZja1VFUUVFQUlRVkJBaUFJZENJQVFRQWdBR3R5SUFkeElnQkZEUU1nQUdoQkFuUkJ1QXBxS0FJQUlRQUxJQUJGRFFFTEEwQWdBQ2dDQkVGNGNTQUdheUlDSUFOSklRRWdBaUFESUFFYklRTWdBQ0FGSUFFYklRVWdBQ2dDRUNJQkJIOGdBUVVnQUNnQ0ZBc2lBQTBBQ3dzZ0JVVU5BQ0FEUVpBSUtBSUFJQVpyVHcwQUlBVW9BaGdoQ0NBRklBVW9BZ3dpQUVjRVFDQUZLQUlJSWdFZ0FEWUNEQ0FBSUFFMkFnZ01DQXNnQlNnQ0ZDSUJCSDhnQlVFVWFnVWdCU2dDRUNJQlJRMERJQVZCRUdvTElRSURRQ0FDSVFRZ0FTSUFRUlJxSVFJZ0FDZ0NGQ0lCRFFBZ0FFRVFhaUVDSUFBb0FoQWlBUTBBQ3lBRVFRQTJBZ0FNQndzZ0JrR1FDQ2dDQUNJRlRRUkFRWndJS0FJQUlRQUNRQ0FGSUFacklnRkJFRThFUUNBQUlBWnFJZ0lnQVVFQmNqWUNCQ0FBSUFWcUlBRTJBZ0FnQUNBR1FRTnlOZ0lFREFFTElBQWdCVUVEY2pZQ0JDQUFJQVZxSWdFZ0FTZ0NCRUVCY2pZQ0JFRUFJUUpCQUNFQkMwR1FDQ0FCTmdJQVFad0lJQUkyQWdBZ0FFRUlhaUVBREFrTElBWkJsQWdvQWdBaUFra0VRRUdVQ0NBQ0lBWnJJZ0UyQWdCQm9BaEJvQWdvQWdBaUFDQUdhaUlDTmdJQUlBSWdBVUVCY2pZQ0JDQUFJQVpCQTNJMkFnUWdBRUVJYWlFQURBa0xRUUFoQUNBR1FTOXFJZ01DZjBIZ0N5Z0NBQVJBUWVnTEtBSUFEQUVMUWV3TFFuODNBZ0JCNUF0Q2dLQ0FnSUNBQkRjQ0FFSGdDeUFLUVF4cVFYQnhRZGlxMWFvRmN6WUNBRUgwQzBFQU5nSUFRY1FMUVFBMkFnQkJnQ0FMSWdGcUlnUkJBQ0FCYXlJSGNTSUJJQVpORFFoQndBc29BZ0FpQlFSQVFiZ0xLQUlBSWdnZ0FXb2lDU0FJVFNBRklBbEpjZzBKQ3dKQVFjUUxMUUFBUVFSeFJRUkFBa0FDUUFKQUFrQkJvQWdvQWdBaUJRUkFRY2dMSVFBRFFDQUFLQUlBSWdnZ0JVMEVRQ0FGSUFnZ0FDZ0NCR3BKRFFNTElBQW9BZ2dpQUEwQUN3dEJBQkFCSWdKQmYwWU5BeUFCSVFSQjVBc29BZ0FpQUVFQmF5SUZJQUp4QkVBZ0FTQUNheUFDSUFWcVFRQWdBR3R4YWlFRUN5QUVJQVpORFFOQndBc29BZ0FpQUFSQVFiZ0xLQUlBSWdVZ0JHb2lCeUFGVFNBQUlBZEpjZzBFQ3lBRUVBRWlBQ0FDUncwQkRBVUxJQVFnQW1zZ0IzRWlCQkFCSWdJZ0FDZ0NBQ0FBS0FJRWFrWU5BU0FDSVFBTElBQkJmMFlOQVNBR1FUQnFJQVJOQkVBZ0FDRUNEQVFMUWVnTEtBSUFJZ0lnQXlBRWEycEJBQ0FDYTNFaUFoQUJRWDlHRFFFZ0FpQUVhaUVFSUFBaEFnd0RDeUFDUVg5SERRSUxRY1FMUWNRTEtBSUFRUVJ5TmdJQUN5QUJFQUVpQWtGL1JrRUFFQUVpQUVGL1JuSWdBQ0FDVFhJTkJTQUFJQUpySWdRZ0JrRW9hazBOQlF0QnVBdEJ1QXNvQWdBZ0JHb2lBRFlDQUVHOEN5Z0NBQ0FBU1FSQVFid0xJQUEyQWdBTEFrQkJvQWdvQWdBaUF3UkFRY2dMSVFBRFFDQUNJQUFvQWdBaUFTQUFLQUlFSWdWcVJnMENJQUFvQWdnaUFBMEFDd3dFQzBHWUNDZ0NBQ0lBUVFBZ0FDQUNUUnRGQkVCQm1BZ2dBallDQUF0QkFDRUFRY3dMSUFRMkFnQkJ5QXNnQWpZQ0FFR29DRUYvTmdJQVFhd0lRZUFMS0FJQU5nSUFRZFFMUVFBMkFnQURRQ0FBUVFOMElnRkJ1QWhxSUFGQnNBaHFJZ1UyQWdBZ0FVRzhDR29nQlRZQ0FDQUFRUUZxSWdCQklFY05BQXRCbEFnZ0JFRW9heUlBUVhnZ0FtdEJCM0VpQVdzaUJUWUNBRUdnQ0NBQklBSnFJZ0UyQWdBZ0FTQUZRUUZ5TmdJRUlBQWdBbXBCS0RZQ0JFR2tDRUh3Q3lnQ0FEWUNBQXdFQ3lBQ0lBTk5JQUVnQTB0eURRSWdBQ2dDREVFSWNRMENJQUFnQkNBRmFqWUNCRUdnQ0NBRFFYZ2dBMnRCQjNFaUFHb2lBVFlDQUVHVUNFR1VDQ2dDQUNBRWFpSUNJQUJySWdBMkFnQWdBU0FBUVFGeU5nSUVJQUlnQTJwQktEWUNCRUdrQ0VId0N5Z0NBRFlDQUF3REMwRUFJUUFNQmd0QkFDRUFEQVFMUVpnSUtBSUFJQUpMQkVCQm1BZ2dBallDQUFzZ0FpQUVhaUVGUWNnTElRQUNRQU5BSUFVZ0FDZ0NBQ0lCUndSQUlBQW9BZ2dpQUEwQkRBSUxDeUFBTFFBTVFRaHhSUTBEQzBISUN5RUFBMEFDUUNBQUtBSUFJZ0VnQTAwRVFDQURJQUVnQUNnQ0JHb2lCVWtOQVFzZ0FDZ0NDQ0VBREFFTEMwR1VDQ0FFUVNocklnQkJlQ0FDYTBFSGNTSUJheUlITmdJQVFhQUlJQUVnQW1vaUFUWUNBQ0FCSUFkQkFYSTJBZ1FnQUNBQ2FrRW9OZ0lFUWFRSVFmQUxLQUlBTmdJQUlBTWdCVUVuSUFWclFRZHhha0V2YXlJQUlBQWdBMEVRYWtrYklnRkJHellDQkNBQlFkQUxLUUlBTndJUUlBRkJ5QXNwQWdBM0FnaEIwQXNnQVVFSWFqWUNBRUhNQ3lBRU5nSUFRY2dMSUFJMkFnQkIxQXRCQURZQ0FDQUJRUmhxSVFBRFFDQUFRUWMyQWdRZ0FFRUlhaUFBUVFScUlRQWdCVWtOQUFzZ0FTQURSZzBBSUFFZ0FTZ0NCRUYrY1RZQ0JDQURJQUVnQTJzaUFrRUJjallDQkNBQklBSTJBZ0FDZnlBQ1FmOEJUUVJBSUFKQmVIRkJzQWhxSVFBQ2YwR0lDQ2dDQUNJQlFRRWdBa0VEZG5RaUFuRkZCRUJCaUFnZ0FTQUNjallDQUNBQURBRUxJQUFvQWdnTElRRWdBQ0FETmdJSUlBRWdBellDREVFTUlRSkJDQXdCQzBFZklRQWdBa0gvLy84SFRRUkFJQUpCSmlBQ1FRaDJaeUlBYTNaQkFYRWdBRUVCZEd0QlBtb2hBQXNnQXlBQU5nSWNJQU5DQURjQ0VDQUFRUUowUWJnS2FpRUJBa0FDUUVHTUNDZ0NBQ0lGUVFFZ0FIUWlCSEZGQkVCQmpBZ2dCQ0FGY2pZQ0FDQUJJQU0yQWdBTUFRc2dBa0VaSUFCQkFYWnJRUUFnQUVFZlJ4dDBJUUFnQVNnQ0FDRUZBMEFnQlNJQktBSUVRWGh4SUFKR0RRSWdBRUVkZGlFRklBQkJBWFFoQUNBQklBVkJCSEZxSWdRb0FoQWlCUTBBQ3lBRUlBTTJBaEFMSUFNZ0FUWUNHRUVJSVFJZ0F5SUJJUUJCREF3QkN5QUJLQUlJSWdBZ0F6WUNEQ0FCSUFNMkFnZ2dBeUFBTmdJSVFRQWhBRUVZSVFKQkRBc2dBMm9nQVRZQ0FDQUNJQU5xSUFBMkFnQUxRWlFJS0FJQUlnQWdCazBOQUVHVUNDQUFJQVpySWdFMkFnQkJvQWhCb0Fnb0FnQWlBQ0FHYWlJQ05nSUFJQUlnQVVFQmNqWUNCQ0FBSUFaQkEzSTJBZ1FnQUVFSWFpRUFEQVFMUVlRSVFUQTJBZ0JCQUNFQURBTUxJQUFnQWpZQ0FDQUFJQUFvQWdRZ0JHbzJBZ1FnQWtGNElBSnJRUWR4YWlJSUlBWkJBM0kyQWdRZ0FVRjRJQUZyUVFkeGFpSUVJQVlnQ0dvaUEyc2hCd0pBUWFBSUtBSUFJQVJHQkVCQm9BZ2dBellDQUVHVUNFR1VDQ2dDQUNBSGFpSUFOZ0lBSUFNZ0FFRUJjallDQkF3QkMwR2NDQ2dDQUNBRVJnUkFRWndJSUFNMkFnQkJrQWhCa0Fnb0FnQWdCMm9pQURZQ0FDQURJQUJCQVhJMkFnUWdBQ0FEYWlBQU5nSUFEQUVMSUFRb0FnUWlBRUVEY1VFQlJnUkFJQUJCZUhFaENTQUVLQUlNSVFJQ1FDQUFRZjhCVFFSQUlBUW9BZ2dpQVNBQ1JnUkFRWWdJUVlnSUtBSUFRWDRnQUVFRGRuZHhOZ0lBREFJTElBRWdBallDRENBQ0lBRTJBZ2dNQVFzZ0JDZ0NHQ0VHQWtBZ0FpQUVSd1JBSUFRb0FnZ2lBQ0FDTmdJTUlBSWdBRFlDQ0F3QkN3SkFJQVFvQWhRaUFBUi9JQVJCRkdvRklBUW9BaEFpQUVVTkFTQUVRUkJxQ3lFQkEwQWdBU0VGSUFBaUFrRVVhaUVCSUFBb0FoUWlBQTBBSUFKQkVHb2hBU0FDS0FJUUlnQU5BQXNnQlVFQU5nSUFEQUVMUVFBaEFnc2dCa1VOQUFKQUlBUW9BaHdpQUVFQ2RFRzRDbW9pQVNnQ0FDQUVSZ1JBSUFFZ0FqWUNBQ0FDRFFGQmpBaEJqQWdvQWdCQmZpQUFkM0UyQWdBTUFnc0NRQ0FFSUFZb0FoQkdCRUFnQmlBQ05nSVFEQUVMSUFZZ0FqWUNGQXNnQWtVTkFRc2dBaUFHTmdJWUlBUW9BaEFpQUFSQUlBSWdBRFlDRUNBQUlBSTJBaGdMSUFRb0FoUWlBRVVOQUNBQ0lBQTJBaFFnQUNBQ05nSVlDeUFISUFscUlRY2dCQ0FKYWlJRUtBSUVJUUFMSUFRZ0FFRitjVFlDQkNBRElBZEJBWEkyQWdRZ0F5QUhhaUFITmdJQUlBZEIvd0ZOQkVBZ0IwRjRjVUd3Q0dvaEFBSi9RWWdJS0FJQUlnRkJBU0FIUVFOMmRDSUNjVVVFUUVHSUNDQUJJQUp5TmdJQUlBQU1BUXNnQUNnQ0NBc2hBU0FBSUFNMkFnZ2dBU0FETmdJTUlBTWdBRFlDRENBRElBRTJBZ2dNQVF0Qkh5RUNJQWRCLy8vL0IwMEVRQ0FIUVNZZ0IwRUlkbWNpQUd0MlFRRnhJQUJCQVhSclFUNXFJUUlMSUFNZ0FqWUNIQ0FEUWdBM0FoQWdBa0VDZEVHNENtb2hBQUpBQWtCQmpBZ29BZ0FpQVVFQklBSjBJZ1Z4UlFSQVFZd0lJQUVnQlhJMkFnQWdBQ0FETmdJQURBRUxJQWRCR1NBQ1FRRjJhMEVBSUFKQkgwY2JkQ0VDSUFBb0FnQWhBUU5BSUFFaUFDZ0NCRUY0Y1NBSFJnMENJQUpCSFhZaEFTQUNRUUYwSVFJZ0FDQUJRUVJ4YWlJRktBSVFJZ0VOQUFzZ0JTQUROZ0lRQ3lBRElBQTJBaGdnQXlBRE5nSU1JQU1nQXpZQ0NBd0JDeUFBS0FJSUlnRWdBellDRENBQUlBTTJBZ2dnQTBFQU5nSVlJQU1nQURZQ0RDQURJQUUyQWdnTElBaEJDR29oQUF3Q0N3SkFJQWhGRFFBQ1FDQUZLQUljSWdGQkFuUkJ1QXBxSWdJb0FnQWdCVVlFUUNBQ0lBQTJBZ0FnQUEwQlFZd0lJQWRCZmlBQmQzRWlCellDQUF3Q0N3SkFJQVVnQ0NnQ0VFWUVRQ0FJSUFBMkFoQU1BUXNnQ0NBQU5nSVVDeUFBUlEwQkN5QUFJQWcyQWhnZ0JTZ0NFQ0lCQkVBZ0FDQUJOZ0lRSUFFZ0FEWUNHQXNnQlNnQ0ZDSUJSUTBBSUFBZ0FUWUNGQ0FCSUFBMkFoZ0xBa0FnQTBFUFRRUkFJQVVnQXlBR2FpSUFRUU55TmdJRUlBQWdCV29pQUNBQUtBSUVRUUZ5TmdJRURBRUxJQVVnQmtFRGNqWUNCQ0FGSUFacUlnUWdBMEVCY2pZQ0JDQURJQVJxSUFNMkFnQWdBMEgvQVUwRVFDQURRWGh4UWJBSWFpRUFBbjlCaUFnb0FnQWlBVUVCSUFOQkEzWjBJZ0p4UlFSQVFZZ0lJQUVnQW5JMkFnQWdBQXdCQ3lBQUtBSUlDeUVCSUFBZ0JEWUNDQ0FCSUFRMkFnd2dCQ0FBTmdJTUlBUWdBVFlDQ0F3QkMwRWZJUUFnQTBILy8vOEhUUVJBSUFOQkppQURRUWgyWnlJQWEzWkJBWEVnQUVFQmRHdEJQbW9oQUFzZ0JDQUFOZ0ljSUFSQ0FEY0NFQ0FBUVFKMFFiZ0thaUVCQWtBQ1FDQUhRUUVnQUhRaUFuRkZCRUJCakFnZ0FpQUhjallDQUNBQklBUTJBZ0FnQkNBQk5nSVlEQUVMSUFOQkdTQUFRUUYyYTBFQUlBQkJIMGNiZENFQUlBRW9BZ0FoQVFOQUlBRWlBaWdDQkVGNGNTQURSZzBDSUFCQkhYWWhBU0FBUVFGMElRQWdBaUFCUVFSeGFpSUhLQUlRSWdFTkFBc2dCeUFFTmdJUUlBUWdBallDR0FzZ0JDQUVOZ0lNSUFRZ0JEWUNDQXdCQ3lBQ0tBSUlJZ0FnQkRZQ0RDQUNJQVEyQWdnZ0JFRUFOZ0lZSUFRZ0FqWUNEQ0FFSUFBMkFnZ0xJQVZCQ0dvaEFBd0JDd0pBSUFsRkRRQUNRQ0FDS0FJY0lnRkJBblJCdUFwcUlnVW9BZ0FnQWtZRVFDQUZJQUEyQWdBZ0FBMEJRWXdJSUF0QmZpQUJkM0UyQWdBTUFnc0NRQ0FDSUFrb0FoQkdCRUFnQ1NBQU5nSVFEQUVMSUFrZ0FEWUNGQXNnQUVVTkFRc2dBQ0FKTmdJWUlBSW9BaEFpQVFSQUlBQWdBVFlDRUNBQklBQTJBaGdMSUFJb0FoUWlBVVVOQUNBQUlBRTJBaFFnQVNBQU5nSVlDd0pBSUFOQkQwMEVRQ0FDSUFNZ0Jtb2lBRUVEY2pZQ0JDQUFJQUpxSWdBZ0FDZ0NCRUVCY2pZQ0JBd0JDeUFDSUFaQkEzSTJBZ1FnQWlBR2FpSUZJQU5CQVhJMkFnUWdBeUFGYWlBRE5nSUFJQWdFUUNBSVFYaHhRYkFJYWlFQVFad0lLQUlBSVFFQ2YwRUJJQWhCQTNaMElnY2dCSEZGQkVCQmlBZ2dCQ0FIY2pZQ0FDQUFEQUVMSUFBb0FnZ0xJUVFnQUNBQk5nSUlJQVFnQVRZQ0RDQUJJQUEyQWd3Z0FTQUVOZ0lJQzBHY0NDQUZOZ0lBUVpBSUlBTTJBZ0FMSUFKQkNHb2hBQXNnQ2tFUWFpUUFJQUFMb1FzQ0MzOEpmU01BUWFBQmF5SUxKQUFnQzBFd2FrRUFRU1Q4Q3dBRFFDQUJJQTVIQkVBZ0FpQU9RUU5zSWd4QkFtcEJBblFpRDJvcUFnQWhGeUFDSUF4QkFXcEJBblFpRUdvcUFnQWhHQ0FJSUF4QkFuUWlFV29nQWlBUmFpb0NBQ0laT0FJQUlBZ2dFR29nR0RnQ0FDQUlJQTlxSUJjNEFnQWdCeUFPUVFWMGFpSU5RUUEyQWd3Z0RTQVhPQUlJSUEwZ0dEZ0NCQ0FOSUJrNEFnQUNRQ0FBUlFSQUlBWWdEbW90QUFCRkRRRUxJQTFCZ0lDQUNEWUNEQXNnRFNBRklBNUJBblFpREVFQmNpSVNhaTBBQUVFSWRDQUZJQXhxTFFBQWNpQUZJQXhCQW5JaUUyb3RBQUJCRUhSeUlBVWdERUVEY2lJTWFpMEFBRUVZZEhJMkFod2dDeUFESUJKQkFuUWlFbW9xQWdBaUZ6Z0NrQUVnQ3lBRElCTkJBblFpRTJvcUFnQWlHRGdDbEFFZ0N5QURJQXhCQW5RaUZHb3FBZ0FpR1RnQ21BRWdDeUFESUE1QkJIUWlGV29xQWdDTUlobzRBcHdCSUF0QjRBQnFJZ3dnQ3lvQ21BRWlGa01BQUFEQWxDQVdsQ0FMS2dLVUFTSVdRd0FBQU1DVUlCYVVRd0FBZ0QrU2tqZ0NBQ0FNSUFzcUFwQUJJaFlnRnBJZ0N5b0NsQUdVSUFzcUFwZ0JJaFlnRnBJZ0N5b0NuQUdVa3pnQ0JDQU1JQXNxQXBBQkloWWdGcElnQ3lvQ21BR1VJQXNxQXBRQkloWWdGcElnQ3lvQ25BR1VramdDQ0NBTUlBc3FBcEFCSWhZZ0ZwSWdDeW9DbEFHVUlBc3FBcGdCSWhZZ0ZwSWdDeW9DbkFHVWtqZ0NEQ0FNSUFzcUFwZ0JJaFpEQUFBQXdKUWdGcFFnQ3lvQ2tBRWlGa01BQUFEQWxDQVdsRU1BQUlBL2twSTRBaEFnRENBTEtnS1VBU0lXSUJhU0lBc3FBcGdCbENBTEtnS1FBU0lXSUJhU0lBc3FBcHdCbEpNNEFoUWdEQ0FMS2dLUUFTSVdJQmFTSUFzcUFwZ0JsQ0FMS2dLVUFTSVdJQmFTSUFzcUFwd0JsSk00QWhnZ0RDQUxLZ0tVQVNJV0lCYVNJQXNxQXBnQmxDQUxLZ0tRQVNJV0lCYVNJQXNxQXB3QmxKSTRBaHdnRENBTEtnS1VBU0lXUXdBQUFNQ1VJQmFVSUFzcUFwQUJJaFpEQUFBQXdKUWdGcFJEQUFDQVA1S1NPQUlnSUFrZ0ZXb2dGemdDQUNBSklCSnFJQmc0QWdBZ0NTQVRhaUFaT0FJQUlBa2dGR29nR2pnQ0FDQUxJQVFnRVdvcUFnQWlGemdDTUNBTElBUWdFR29xQWdBaUdEZ0NRQ0FMSUFRZ0Qyb3FBZ0FpR1RnQ1VDQUtJQkZxSUJjNEFnQWdDaUFRYWlBWU9BSUFJQW9nRDJvZ0dUZ0NBQ0FMSUF3cUFoZ2dDeW9DT0pRZ0RDb0NBQ0FMS2dJd2xDQU1LZ0lNSUFzcUFqU1VrcEk0QWdBZ0N5QU1LZ0ljSUFzcUFqaVVJQXdxQWdRZ0N5b0NNSlFnRENvQ0VDQUxLZ0kwbEpLU09BSUVJQXNnRENvQ0lDQUxLZ0k0bENBTUtnSUlJQXNxQWpDVUlBd3FBaFFnQ3lvQ05KU1NramdDQ0NBTElBd3FBaGdnQ3lvQ1JKUWdEQ29DQUNBTEtnSThsQ0FNS2dJTUlBc3FBa0NVa3BJNEFnd2dDeUFNS2dJY0lBc3FBa1NVSUF3cUFnUWdDeW9DUEpRZ0RDb0NFQ0FMS2dKQWxKS1NPQUlRSUFzZ0RDb0NJQ0FMS2dKRWxDQU1LZ0lJSUFzcUFqeVVJQXdxQWhRZ0N5b0NRSlNTa2pnQ0ZDQUxJQXdxQWhnZ0N5b0NVSlFnRENvQ0FDQUxLZ0pJbENBTUtnSU1JQXNxQWt5VWtwSTRBaGdnQ3lBTUtnSWNJQXNxQWxDVUlBd3FBZ1FnQ3lvQ1NKUWdEQ29DRUNBTEtnSk1sSktTT0FJY0lBc2dEQ29DSUNBTEtnSlFsQ0FNS2dJSUlBc3FBa2lVSUF3cUFoUWdDeW9DVEpTU2tqZ0NJQ0FMS2dJZ0lSY2dDeW9DQ0NFWUlBc3FBaFFoR1NBTklBc3FBaGdpR2lBYWxDQUxLZ0lBSWhZZ0ZwUWdDeW9DRENJYklCdVVrcEpEQUFDQVFKUWdHaUFMS2dJY0loeVVJQllnQ3lvQ0JDSWRsQ0FiSUFzcUFoQWlIcFNTa2tNQUFJQkFsQkFDTmdJUUlBMGdHaUFYbENBV0lCaVVJQnNnR1pTU2trTUFBSUJBbENBY0lCeVVJQjBnSFpRZ0hpQWVsSktTUXdBQWdFQ1VFQUkyQWhRZ0RTQWNJQmVVSUIwZ0dKUWdIaUFabEpLU1F3QUFnRUNVSUJjZ0Y1UWdHQ0FZbENBWklCbVVrcEpEQUFDQVFKUVFBallDR0NBT1FRRnFJUTRNQVFzTElBdEJvQUZxSkFBTEFnQUxDd2tCQUVHQkNBc0NCZ0U9Iik7CiAgfQogIGZ1bmN0aW9uIFcoZykgewogICAgaWYgKEFycmF5QnVmZmVyLmlzVmlldyhnKSkKICAgICAgcmV0dXJuIGc7CiAgICBpZiAoZyA9PSBtICYmIEYpCiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShGKTsKICAgIGlmICh5KQogICAgICByZXR1cm4geShnKTsKICAgIHRocm93ICdzeW5jIGZldGNoaW5nIG9mIHRoZSB3YXNtIGZhaWxlZDogeW91IGNhbiBwcmVsb2FkIGl0IHRvIE1vZHVsZVsid2FzbUJpbmFyeSJdIG1hbnVhbGx5LCBvciBlbWNjLnB5IHdpbGwgZG8gdGhhdCBmb3IgeW91IHdoZW4gZ2VuZXJhdGluZyBIVE1MIChidXQgbm90IEpTKSc7CiAgfQogIGZ1bmN0aW9uIF8oZywgQikgewogICAgdmFyIEUsIFEgPSBXKGcpOwogICAgRSA9IG5ldyBXZWJBc3NlbWJseS5Nb2R1bGUoUSk7CiAgICB2YXIgbyA9IG5ldyBXZWJBc3NlbWJseS5JbnN0YW5jZShFLCBCKTsKICAgIHJldHVybiBbbywgRV07CiAgfQogIGZ1bmN0aW9uIFYoKSB7CiAgICByZXR1cm4geyBhOiBFQSB9OwogIH0KICBmdW5jdGlvbiB6KCkgewogICAgZnVuY3Rpb24gZyhRLCBvKSB7CiAgICAgIHJldHVybiBmID0gUS5leHBvcnRzLCBEID0gZi5iLCBVKCksIFFBKGYpLCBQKCksIGY7CiAgICB9CiAgICB2KCk7CiAgICB2YXIgQiA9IFYoKTsKICAgIGlmIChBLmluc3RhbnRpYXRlV2FzbSkKICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChRLCBvKSA9PiB7CiAgICAgICAgQS5pbnN0YW50aWF0ZVdhc20oQiwgKHIsIGMpID0+IHsKICAgICAgICAgIFEoZyhyKSk7CiAgICAgICAgfSk7CiAgICAgIH0pOwogICAgbSA/Pz0gWCgpOwogICAgdmFyIEUgPSBfKG0sIEIpOwogICAgcmV0dXJuIGcoRVswXSk7CiAgfQogIGZvciAodmFyIHggPSAoZykgPT4gewogICAgZm9yICg7IGcubGVuZ3RoID4gMDsgKQogICAgICBnLnNoaWZ0KCkoQSk7CiAgfSwgaiA9IFtdLCBPID0gKGcpID0+IGoucHVzaChnKSwgVCA9IFtdLCAkID0gKGcpID0+IFQucHVzaChnKSwgQUEgPSAoZykgPT4gewogICAgZm9yICh2YXIgQiwgRSwgUSA9IDAsIG8gPSAwLCByID0gZy5sZW5ndGgsIGMgPSBuZXcgVWludDhBcnJheSgociAqIDMgPj4gMikgLSAoZ1tyIC0gMl0gPT0gIj0iKSAtIChnW3IgLSAxXSA9PSAiPSIpKTsgUSA8IHI7IFEgKz0gNCwgbyArPSAzKQogICAgICBCID0gbltnLmNoYXJDb2RlQXQoUSArIDEpXSwgRSA9IG5bZy5jaGFyQ29kZUF0KFEgKyAyKV0sIGNbb10gPSBuW2cuY2hhckNvZGVBdChRKV0gPDwgMiB8IEIgPj4gNCwgY1tvICsgMV0gPSBCIDw8IDQgfCBFID4+IDIsIGNbbyArIDJdID0gRSA8PCA2IHwgbltnLmNoYXJDb2RlQXQoUSArIDMpXTsKICAgIHJldHVybiBjOwogIH0sIGdBID0gKCkgPT4gMjE0NzQ4MzY0OCwgSUEgPSAoZywgQikgPT4gTWF0aC5jZWlsKGcgLyBCKSAqIEIsIENBID0gKGcpID0+IHsKICAgIHZhciBCID0gRC5idWZmZXIsIEUgPSAoZyAtIEIuYnl0ZUxlbmd0aCArIDY1NTM1KSAvIDY1NTM2IHwgMDsKICAgIHRyeSB7CiAgICAgIHJldHVybiBELmdyb3coRSksIFUoKSwgMTsKICAgIH0gY2F0Y2ggewogICAgfQogIH0sIEJBID0gKGcpID0+IHsKICAgIHZhciBCID0gTi5sZW5ndGg7CiAgICBnID4+Pj0gMDsKICAgIHZhciBFID0gZ0EoKTsKICAgIGlmIChnID4gRSkKICAgICAgcmV0dXJuICExOwogICAgZm9yICh2YXIgUSA9IDE7IFEgPD0gNDsgUSAqPSAyKSB7CiAgICAgIHZhciBvID0gQiAqICgxICsgMC4yIC8gUSk7CiAgICAgIG8gPSBNYXRoLm1pbihvLCBnICsgMTAwNjYzMjk2KTsKICAgICAgdmFyIHIgPSBNYXRoLm1pbihFLCBJQShNYXRoLm1heChnLCBvKSwgNjU1MzYpKSwgYyA9IENBKHIpOwogICAgICBpZiAoYykKICAgICAgICByZXR1cm4gITA7CiAgICB9CiAgICByZXR1cm4gITE7CiAgfSwgbiA9IG5ldyBVaW50OEFycmF5KDEyMyksIGEgPSAyNTsgYSA+PSAwOyAtLWEpCiAgICBuWzQ4ICsgYV0gPSA1MiArIGEsIG5bNjUgKyBhXSA9IGEsIG5bOTcgKyBhXSA9IDI2ICsgYTsKICBuWzQzXSA9IDYyLCBuWzQ3XSA9IDYzLCBBLm5vRXhpdFJ1bnRpbWUgJiYgQS5ub0V4aXRSdW50aW1lLCBBLnByaW50ICYmIEEucHJpbnQsIEEucHJpbnRFcnIgJiYgQS5wcmludEVyciwgQS53YXNtQmluYXJ5ICYmIChGID0gQS53YXNtQmluYXJ5KSwgQS5hcmd1bWVudHMgJiYgQS5hcmd1bWVudHMsIEEudGhpc1Byb2dyYW0gJiYgQS50aGlzUHJvZ3JhbTsKICBmdW5jdGlvbiBRQShnKSB7CiAgICBBLl9wYWNrID0gZy5kLCBBLl9tYWxsb2MgPSBnLmUsIEEuX2ZyZWUgPSBnLmY7CiAgfQogIHZhciBFQSA9IHsgYTogQkEgfSwgZiA9IHooKTsKICBmdW5jdGlvbiBxKCkgewogICAgaWYgKHMgPiAwKSB7CiAgICAgIHcgPSBxOwogICAgICByZXR1cm47CiAgICB9CiAgICBpZiAoaSgpLCBzID4gMCkgewogICAgICB3ID0gcTsKICAgICAgcmV0dXJuOwogICAgfQogICAgZnVuY3Rpb24gZygpIHsKICAgICAgQS5jYWxsZWRSdW4gPSAhMCwgSCgpLCBBLm9uUnVudGltZUluaXRpYWxpemVkPy4oKSwgYigpOwogICAgfQogICAgQS5zZXRTdGF0dXMgPyAoQS5zZXRTdGF0dXMoIlJ1bm5pbmcuLi4iKSwgc2V0VGltZW91dCgoKSA9PiB7CiAgICAgIHNldFRpbWVvdXQoKCkgPT4gQS5zZXRTdGF0dXMoIiIpLCAxKSwgZygpOwogICAgfSwgMSkpIDogZygpOwogIH0KICBmdW5jdGlvbiBpQSgpIHsKICAgIGlmIChBLnByZUluaXQpCiAgICAgIGZvciAodHlwZW9mIEEucHJlSW5pdCA9PSAiZnVuY3Rpb24iICYmIChBLnByZUluaXQgPSBbQS5wcmVJbml0XSk7IEEucHJlSW5pdC5sZW5ndGggPiAwOyApCiAgICAgICAgQS5wcmVJbml0LnNoaWZ0KCkoKTsKICB9CiAgcmV0dXJuIGlBKCksIHEoKSwgZSA9IEEsIGU7Cn07CmxldCBJOwphc3luYyBmdW5jdGlvbiB0QSgpIHsKICBpZiAoSSA9IGF3YWl0IG9BKCksICFJIHx8ICFJLkhFQVBGMzIgfHwgIUkuX3BhY2spCiAgICB0aHJvdyBuZXcgRXJyb3IoIldBU00gbW9kdWxlIGZhaWxlZCB0byBpbml0aWFsaXplIHByb3Blcmx5Iik7Cn0KbGV0IHQgPSAwOwpjb25zdCBsID0gbmV3IEFycmF5KCk7CmxldCBLID0gITEsIHAgPSAhMSwgWSwgUiwgRywgdSwgZCwgTSwgUywgTCwgSjsKY29uc3QgZUEgPSBhc3luYyAoQykgPT4gewogIGZvciAoOyBwOyApCiAgICBhd2FpdCBuZXcgUHJvbWlzZSgoSCkgPT4gc2V0VGltZW91dChILCAwKSk7CiAgSSB8fCAocCA9ICEwLCBhd2FpdCB0QSgpLCBwID0gITEpOwogIGNvbnN0IGUgPSBNYXRoLnBvdygyLCBNYXRoLmNlaWwoTWF0aC5sb2cyKEMudmVydGV4Q291bnQpKSk7CiAgZSA+IHQgJiYgKHQgPiAwICYmIChJLl9mcmVlKFkpLCBJLl9mcmVlKFIpLCBJLl9mcmVlKEcpLCBJLl9mcmVlKHUpLCBJLl9mcmVlKGQpLCBJLl9mcmVlKE0pLCBJLl9mcmVlKFMpLCBJLl9mcmVlKEwpLCBJLl9mcmVlKEopKSwgdCA9IGUsIFkgPSBJLl9tYWxsb2MoMyAqIHQgKiA0KSwgUiA9IEkuX21hbGxvYyg0ICogdCAqIDQpLCBHID0gSS5fbWFsbG9jKDMgKiB0ICogNCksIHUgPSBJLl9tYWxsb2MoNCAqIHQpLCBkID0gSS5fbWFsbG9jKHQpLCBNID0gSS5fbWFsbG9jKDggKiB0ICogNCksIFMgPSBJLl9tYWxsb2MoMyAqIHQgKiA0KSwgTCA9IEkuX21hbGxvYyg0ICogdCAqIDQpLCBKID0gSS5fbWFsbG9jKDMgKiB0ICogNCkpLCBJLkhFQVBGMzIuc2V0KEMucG9zaXRpb25zLCBZIC8gNCksIEkuSEVBUEYzMi5zZXQoQy5yb3RhdGlvbnMsIFIgLyA0KSwgSS5IRUFQRjMyLnNldChDLnNjYWxlcywgRyAvIDQpLCBJLkhFQVBVOC5zZXQoQy5jb2xvcnMsIHUpLCBJLkhFQVBVOC5zZXQoQy5zZWxlY3Rpb24sIGQpLCBJLl9wYWNrKAogICAgQy5zZWxlY3RlZCwKICAgIEMudmVydGV4Q291bnQsCiAgICBZLAogICAgUiwKICAgIEcsCiAgICB1LAogICAgZCwKICAgIE0sCiAgICBTLAogICAgTCwKICAgIEoKICApOwogIGNvbnN0IEEgPSBuZXcgVWludDMyQXJyYXkoSS5IRUFQVTMyLmJ1ZmZlciwgTSwgQy52ZXJ0ZXhDb3VudCAqIDgpLCBoID0gbmV3IFVpbnQzMkFycmF5KEEuc2xpY2UoKS5idWZmZXIpLCBrID0gbmV3IEZsb2F0MzJBcnJheShJLkhFQVBGMzIuYnVmZmVyLCBTLCBDLnZlcnRleENvdW50ICogMyksIHkgPSBuZXcgRmxvYXQzMkFycmF5KGsuc2xpY2UoKS5idWZmZXIpLCBGID0gbmV3IEZsb2F0MzJBcnJheShJLkhFQVBGMzIuYnVmZmVyLCBMLCBDLnZlcnRleENvdW50ICogNCksIEQgPSBuZXcgRmxvYXQzMkFycmF5KEYuc2xpY2UoKS5idWZmZXIpLCBOID0gbmV3IEZsb2F0MzJBcnJheShJLkhFQVBGMzIuYnVmZmVyLCBKLCBDLnZlcnRleENvdW50ICogMyksIFUgPSBuZXcgRmxvYXQzMkFycmF5KE4uc2xpY2UoKS5idWZmZXIpLCBpID0gewogICAgZGF0YTogaCwKICAgIHdvcmxkUG9zaXRpb25zOiB5LAogICAgd29ybGRSb3RhdGlvbnM6IEQsCiAgICB3b3JsZFNjYWxlczogVSwKICAgIG9mZnNldDogQy5vZmZzZXQsCiAgICB2ZXJ0ZXhDb3VudDogQy52ZXJ0ZXhDb3VudCwKICAgIHBvc2l0aW9uczogQy5wb3NpdGlvbnMuYnVmZmVyLAogICAgcm90YXRpb25zOiBDLnJvdGF0aW9ucy5idWZmZXIsCiAgICBzY2FsZXM6IEMuc2NhbGVzLmJ1ZmZlciwKICAgIGNvbG9yczogQy5jb2xvcnMuYnVmZmVyLAogICAgc2VsZWN0aW9uOiBDLnNlbGVjdGlvbi5idWZmZXIKICB9OwogIHNlbGYucG9zdE1lc3NhZ2UoeyByZXNwb25zZTogaSB9LCBbCiAgICBpLmRhdGEuYnVmZmVyLAogICAgaS53b3JsZFBvc2l0aW9ucy5idWZmZXIsCiAgICBpLndvcmxkUm90YXRpb25zLmJ1ZmZlciwKICAgIGkud29ybGRTY2FsZXMuYnVmZmVyLAogICAgaS5wb3NpdGlvbnMsCiAgICBpLnJvdGF0aW9ucywKICAgIGkuc2NhbGVzLAogICAgaS5jb2xvcnMsCiAgICBpLnNlbGVjdGlvbgogIF0pLCBLID0gITE7Cn0sIFogPSAoKSA9PiB7CiAgaWYgKGwubGVuZ3RoICE9PSAwICYmICFLKSB7CiAgICBLID0gITA7CiAgICBjb25zdCBDID0gbC5zaGlmdCgpOwogICAgZUEoQyksIHNldFRpbWVvdXQoKCkgPT4gewogICAgICBLID0gITEsIFooKTsKICAgIH0sIDApOwogIH0KfTsKc2VsZi5vbm1lc3NhZ2UgPSAoQykgPT4gewogIGlmIChDLmRhdGEuc3BsYXQpIHsKICAgIGNvbnN0IGUgPSBDLmRhdGEuc3BsYXQ7CiAgICBmb3IgKGNvbnN0IFtBLCBoXSBvZiBsLmVudHJpZXMoKSkKICAgICAgaWYgKGgub2Zmc2V0ID09PSBlLm9mZnNldCkgewogICAgICAgIGxbQV0gPSBlOwogICAgICAgIHJldHVybjsKICAgICAgfQogICAgbC5wdXNoKGUpLCBaKCk7CiAgfQp9OwovLyMgc291cmNlTWFwcGluZ1VSTD1EYXRhV29ya2VyLUJ6RWRfWmo2LmpzLm1hcAo=",JA=n=>Uint8Array.from(atob(n),e=>e.charCodeAt(0)),gh=typeof self<"u"&&self.Blob&&new Blob(["URL.revokeObjectURL(import.meta.url);",JA(mh)],{type:"text/javascript;charset=utf-8"});function ZA(n){let e;try{if(e=gh&&(self.URL||self.webkitURL).createObjectURL(gh),!e)throw"";const t=new Worker(e,{type:"module",name:n?.name});return t.addEventListener("error",()=>{(self.URL||self.webkitURL).revokeObjectURL(e)}),t}catch{return new Worker("data:text/javascript;base64,"+mh,{type:"module",name:n?.name})}}var XA=function(n={}){var e,t=n,i=typeof document>"u"&&typeof location>"u"?require("url").pathToFileURL(__filename).href:typeof document>"u"?location.href:an&&an.tagName.toUpperCase()==="SCRIPT"&&an.src||new URL("chuci.umd.js",document.baseURI).href,r="",s;{try{r=new URL(".",i).href}catch{}s=k=>{var Y=new XMLHttpRequest;return Y.open("GET",k,!1),Y.responseType="arraybuffer",Y.send(null),new Uint8Array(Y.response)}}console.log.bind(console),console.error.bind(console);var a,o,l;function c(){var k=o.buffer;t.HEAPU8=l=new Uint8Array(k),t.HEAPU32=new Uint32Array(k),t.HEAPF32=new Float32Array(k),new BigInt64Array(k),new BigUint64Array(k)}function d(){if(t.preRun)for(typeof t.preRun=="function"&&(t.preRun=[t.preRun]);t.preRun.length;)E(t.preRun.shift());U(b)}function h(){ae.c()}function f(){if(t.postRun)for(typeof t.postRun=="function"&&(t.postRun=[t.postRun]);t.postRun.length;)y(t.postRun.shift());U(T)}var u=0,g=null;function v(k){u++,t.monitorRunDependencies?.(u)}function m(k){if(u--,t.monitorRunDependencies?.(u),u==0&&g){var Y=g;g=null,Y()}}var p;function A(){return D("AGFzbQEAAAABJgZgAX8Bf2ACfX0Bf2ABfQF/YAF/AGALf39/f39/f39/f38AYAAAAgcBAWEBYQAAAwgHAAECAwAEBQUHAQGCAoCAAgYIAX8BQYCMBAsHFQUBYgIAAWMABwFkAAYBZQAFAWYABAwBAQqqQAdPAQJ/QYAIKAIAIgEgAEEHakF4cSICaiEAAkAgAkEAIAAgAU0bRQRAIAA/AEEQdE0NASAAEAANAQtBhAhBMDYCAEF/DwtBgAggADYCACABCw4AIAAQAyABEANBEHRyC3IBBH8gALwiBEH///8DcSEBAkAgBEEXdkH/AXEiAkUNACACQfAATQRAIAFBgICABHJB8QAgAmt2IQEMAQsgAkGNAUsEQEGA+AEhA0EAIQEMAQsgAkEKdEGAgAdrIQMLIAMgBEEQdkGAgAJxciABQQ12cgvcCwEIfwJAIABFDQAgAEEIayIDIABBBGsoAgAiAkF4cSIAaiEFAkAgAkEBcQ0AIAJBAnFFDQEgAyADKAIAIgRrIgNBmAgoAgBJDQEgACAEaiEAAkACQAJAQZwIKAIAIANHBEAgAygCDCEBIARB/wFNBEAgASADKAIIIgJHDQJBiAhBiAgoAgBBfiAEQQN2d3E2AgAMBQsgAygCGCEHIAEgA0cEQCADKAIIIgIgATYCDCABIAI2AggMBAsgAygCFCICBH8gA0EUagUgAygCECICRQ0DIANBEGoLIQQDQCAEIQYgAiIBQRRqIQQgASgCFCICDQAgAUEQaiEEIAEoAhAiAg0ACyAGQQA2AgAMAwsgBSgCBCICQQNxQQNHDQNBkAggADYCACAFIAJBfnE2AgQgAyAAQQFyNgIEIAUgADYCAA8LIAIgATYCDCABIAI2AggMAgtBACEBCyAHRQ0AAkAgAygCHCIEQQJ0QbgKaiICKAIAIANGBEAgAiABNgIAIAENAUGMCEGMCCgCAEF+IAR3cTYCAAwCCwJAIAMgBygCEEYEQCAHIAE2AhAMAQsgByABNgIUCyABRQ0BCyABIAc2AhggAygCECICBEAgASACNgIQIAIgATYCGAsgAygCFCICRQ0AIAEgAjYCFCACIAE2AhgLIAMgBU8NACAFKAIEIgRBAXFFDQACQAJAAkACQCAEQQJxRQRAQaAIKAIAIAVGBEBBoAggAzYCAEGUCEGUCCgCACAAaiIANgIAIAMgAEEBcjYCBCADQZwIKAIARw0GQZAIQQA2AgBBnAhBADYCAA8LQZwIKAIAIgcgBUYEQEGcCCADNgIAQZAIQZAIKAIAIABqIgA2AgAgAyAAQQFyNgIEIAAgA2ogADYCAA8LIARBeHEgAGohACAFKAIMIQEgBEH/AU0EQCAFKAIIIgIgAUYEQEGICEGICCgCAEF+IARBA3Z3cTYCAAwFCyACIAE2AgwgASACNgIIDAQLIAUoAhghCCABIAVHBEAgBSgCCCICIAE2AgwgASACNgIIDAMLIAUoAhQiAgR/IAVBFGoFIAUoAhAiAkUNAiAFQRBqCyEEA0AgBCEGIAIiAUEUaiEEIAEoAhQiAg0AIAFBEGohBCABKAIQIgINAAsgBkEANgIADAILIAUgBEF+cTYCBCADIABBAXI2AgQgACADaiAANgIADAMLQQAhAQsgCEUNAAJAIAUoAhwiBEECdEG4CmoiAigCACAFRgRAIAIgATYCACABDQFBjAhBjAgoAgBBfiAEd3E2AgAMAgsCQCAFIAgoAhBGBEAgCCABNgIQDAELIAggATYCFAsgAUUNAQsgASAINgIYIAUoAhAiAgRAIAEgAjYCECACIAE2AhgLIAUoAhQiAkUNACABIAI2AhQgAiABNgIYCyADIABBAXI2AgQgACADaiAANgIAIAMgB0cNAEGQCCAANgIADwsgAEH/AU0EQCAAQXhxQbAIaiECAn9BiAgoAgAiBEEBIABBA3Z0IgBxRQRAQYgIIAAgBHI2AgAgAgwBCyACKAIICyEAIAIgAzYCCCAAIAM2AgwgAyACNgIMIAMgADYCCA8LQR8hASAAQf///wdNBEAgAEEmIABBCHZnIgJrdkEBcSACQQF0a0E+aiEBCyADIAE2AhwgA0IANwIQIAFBAnRBuApqIQQCfwJAAn9BjAgoAgAiBkEBIAF0IgJxRQRAQYwIIAIgBnI2AgAgBCADNgIAQRghAUEIDAELIABBGSABQQF2a0EAIAFBH0cbdCEBIAQoAgAhBANAIAQiAigCBEF4cSAARg0CIAFBHXYhBCABQQF0IQEgAiAEQQRxaiIGKAIQIgQNAAsgBiADNgIQQRghASACIQRBCAshACADIgIMAQsgAigCCCIEIAM2AgwgAiADNgIIQRghAEEIIQFBAAshBiABIANqIAQ2AgAgAyACNgIMIAAgA2ogBjYCAEGoCEGoCCgCAEEBayIAQX8gABs2AgALC9EnAQt/IwBBEGsiCiQAAkACQAJAAkACQAJAAkACQAJAAkAgAEH0AU0EQEGICCgCACIEQRAgAEELakH4A3EgAEELSRsiBkEDdiIAdiIBQQNxBEACQCABQX9zQQFxIABqIgJBA3QiAUGwCGoiACABQbgIaigCACIBKAIIIgVGBEBBiAggBEF+IAJ3cTYCAAwBCyAFIAA2AgwgACAFNgIICyABQQhqIQAgASACQQN0IgJBA3I2AgQgASACaiIBIAEoAgRBAXI2AgQMCwsgBkGQCCgCACIITQ0BIAEEQAJAQQIgAHQiAkEAIAJrciABIAB0cWgiAUEDdCIAQbAIaiICIABBuAhqKAIAIgAoAggiBUYEQEGICCAEQX4gAXdxIgQ2AgAMAQsgBSACNgIMIAIgBTYCCAsgACAGQQNyNgIEIAAgBmoiByABQQN0IgEgBmsiBUEBcjYCBCAAIAFqIAU2AgAgCARAIAhBeHFBsAhqIQFBnAgoAgAhAgJ/IARBASAIQQN2dCIDcUUEQEGICCADIARyNgIAIAEMAQsgASgCCAshAyABIAI2AgggAyACNgIMIAIgATYCDCACIAM2AggLIABBCGohAEGcCCAHNgIAQZAIIAU2AgAMCwtBjAgoAgAiC0UNASALaEECdEG4CmooAgAiAigCBEF4cSAGayEDIAIhAQNAAkAgASgCECIARQRAIAEoAhQiAEUNAQsgACgCBEF4cSAGayIBIAMgASADSSIBGyEDIAAgAiABGyECIAAhAQwBCwsgAigCGCEJIAIgAigCDCIARwRAIAIoAggiASAANgIMIAAgATYCCAwKCyACKAIUIgEEfyACQRRqBSACKAIQIgFFDQMgAkEQagshBQNAIAUhByABIgBBFGohBSAAKAIUIgENACAAQRBqIQUgACgCECIBDQALIAdBADYCAAwJC0F/IQYgAEG/f0sNACAAQQtqIgFBeHEhBkGMCCgCACIHRQ0AQR8hCEEAIAZrIQMgAEH0//8HTQRAIAZBJiABQQh2ZyIAa3ZBAXEgAEEBdGtBPmohCAsCQAJAAkAgCEECdEG4CmooAgAiAUUEQEEAIQAMAQtBACEAIAZBGSAIQQF2a0EAIAhBH0cbdCECA0ACQCABKAIEQXhxIAZrIgQgA08NACABIQUgBCIDDQBBACEDIAEhAAwDCyAAIAEoAhQiBCAEIAEgAkEddkEEcWooAhAiAUYbIAAgBBshACACQQF0IQIgAQ0ACwsgACAFckUEQEEAIQVBAiAIdCIAQQAgAGtyIAdxIgBFDQMgAGhBAnRBuApqKAIAIQALIABFDQELA0AgACgCBEF4cSAGayICIANJIQEgAiADIAEbIQMgACAFIAEbIQUgACgCECIBBH8gAQUgACgCFAsiAA0ACwsgBUUNACADQZAIKAIAIAZrTw0AIAUoAhghCCAFIAUoAgwiAEcEQCAFKAIIIgEgADYCDCAAIAE2AggMCAsgBSgCFCIBBH8gBUEUagUgBSgCECIBRQ0DIAVBEGoLIQIDQCACIQQgASIAQRRqIQIgACgCFCIBDQAgAEEQaiECIAAoAhAiAQ0ACyAEQQA2AgAMBwsgBkGQCCgCACIFTQRAQZwIKAIAIQACQCAFIAZrIgFBEE8EQCAAIAZqIgIgAUEBcjYCBCAAIAVqIAE2AgAgACAGQQNyNgIEDAELIAAgBUEDcjYCBCAAIAVqIgEgASgCBEEBcjYCBEEAIQJBACEBC0GQCCABNgIAQZwIIAI2AgAgAEEIaiEADAkLIAZBlAgoAgAiAkkEQEGUCCACIAZrIgE2AgBBoAhBoAgoAgAiACAGaiICNgIAIAIgAUEBcjYCBCAAIAZBA3I2AgQgAEEIaiEADAkLQQAhACAGQS9qIgMCf0HgCygCAARAQegLKAIADAELQewLQn83AgBB5AtCgKCAgICABDcCAEHgCyAKQQxqQXBxQdiq1aoFczYCAEH0C0EANgIAQcQLQQA2AgBBgCALIgFqIgRBACABayIHcSIBIAZNDQhBwAsoAgAiBQRAQbgLKAIAIgggAWoiCSAITSAFIAlJcg0JCwJAQcQLLQAAQQRxRQRAAkACQAJAAkBBoAgoAgAiBQRAQcgLIQADQCAAKAIAIgggBU0EQCAFIAggACgCBGpJDQMLIAAoAggiAA0ACwtBABABIgJBf0YNAyABIQRB5AsoAgAiAEEBayIFIAJxBEAgASACayACIAVqQQAgAGtxaiEECyAEIAZNDQNBwAsoAgAiAARAQbgLKAIAIgUgBGoiByAFTSAAIAdJcg0ECyAEEAEiACACRw0BDAULIAQgAmsgB3EiBBABIgIgACgCACAAKAIEakYNASACIQALIABBf0YNASAGQTBqIARNBEAgACECDAQLQegLKAIAIgIgAyAEa2pBACACa3EiAhABQX9GDQEgAiAEaiEEIAAhAgwDCyACQX9HDQILQcQLQcQLKAIAQQRyNgIACyABEAEiAkF/RkEAEAEiAEF/RnIgACACTXINBSAAIAJrIgQgBkEoak0NBQtBuAtBuAsoAgAgBGoiADYCAEG8CygCACAASQRAQbwLIAA2AgALAkBBoAgoAgAiAwRAQcgLIQADQCACIAAoAgAiASAAKAIEIgVqRg0CIAAoAggiAA0ACwwEC0GYCCgCACIAQQAgACACTRtFBEBBmAggAjYCAAtBACEAQcwLIAQ2AgBByAsgAjYCAEGoCEF/NgIAQawIQeALKAIANgIAQdQLQQA2AgADQCAAQQN0IgFBuAhqIAFBsAhqIgU2AgAgAUG8CGogBTYCACAAQQFqIgBBIEcNAAtBlAggBEEoayIAQXggAmtBB3EiAWsiBTYCAEGgCCABIAJqIgE2AgAgASAFQQFyNgIEIAAgAmpBKDYCBEGkCEHwCygCADYCAAwECyACIANNIAEgA0tyDQIgACgCDEEIcQ0CIAAgBCAFajYCBEGgCCADQXggA2tBB3EiAGoiATYCAEGUCEGUCCgCACAEaiICIABrIgA2AgAgASAAQQFyNgIEIAIgA2pBKDYCBEGkCEHwCygCADYCAAwDC0EAIQAMBgtBACEADAQLQZgIKAIAIAJLBEBBmAggAjYCAAsgAiAEaiEFQcgLIQACQANAIAUgACgCACIBRwRAIAAoAggiAA0BDAILCyAALQAMQQhxRQ0DC0HICyEAA0ACQCAAKAIAIgEgA00EQCADIAEgACgCBGoiBUkNAQsgACgCCCEADAELC0GUCCAEQShrIgBBeCACa0EHcSIBayIHNgIAQaAIIAEgAmoiATYCACABIAdBAXI2AgQgACACakEoNgIEQaQIQfALKAIANgIAIAMgBUEnIAVrQQdxakEvayIAIAAgA0EQakkbIgFBGzYCBCABQdALKQIANwIQIAFByAspAgA3AghB0AsgAUEIajYCAEHMCyAENgIAQcgLIAI2AgBB1AtBADYCACABQRhqIQADQCAAQQc2AgQgAEEIaiAAQQRqIQAgBUkNAAsgASADRg0AIAEgASgCBEF+cTYCBCADIAEgA2siAkEBcjYCBCABIAI2AgACfyACQf8BTQRAIAJBeHFBsAhqIQACf0GICCgCACIBQQEgAkEDdnQiAnFFBEBBiAggASACcjYCACAADAELIAAoAggLIQEgACADNgIIIAEgAzYCDEEMIQJBCAwBC0EfIQAgAkH///8HTQRAIAJBJiACQQh2ZyIAa3ZBAXEgAEEBdGtBPmohAAsgAyAANgIcIANCADcCECAAQQJ0QbgKaiEBAkACQEGMCCgCACIFQQEgAHQiBHFFBEBBjAggBCAFcjYCACABIAM2AgAMAQsgAkEZIABBAXZrQQAgAEEfRxt0IQAgASgCACEFA0AgBSIBKAIEQXhxIAJGDQIgAEEddiEFIABBAXQhACABIAVBBHFqIgQoAhAiBQ0ACyAEIAM2AhALIAMgATYCGEEIIQIgAyIBIQBBDAwBCyABKAIIIgAgAzYCDCABIAM2AgggAyAANgIIQQAhAEEYIQJBDAsgA2ogATYCACACIANqIAA2AgALQZQIKAIAIgAgBk0NAEGUCCAAIAZrIgE2AgBBoAhBoAgoAgAiACAGaiICNgIAIAIgAUEBcjYCBCAAIAZBA3I2AgQgAEEIaiEADAQLQYQIQTA2AgBBACEADAMLIAAgAjYCACAAIAAoAgQgBGo2AgQgAkF4IAJrQQdxaiIIIAZBA3I2AgQgAUF4IAFrQQdxaiIEIAYgCGoiA2shBwJAQaAIKAIAIARGBEBBoAggAzYCAEGUCEGUCCgCACAHaiIANgIAIAMgAEEBcjYCBAwBC0GcCCgCACAERgRAQZwIIAM2AgBBkAhBkAgoAgAgB2oiADYCACADIABBAXI2AgQgACADaiAANgIADAELIAQoAgQiAEEDcUEBRgRAIABBeHEhCSAEKAIMIQICQCAAQf8BTQRAIAQoAggiASACRgRAQYgIQYgIKAIAQX4gAEEDdndxNgIADAILIAEgAjYCDCACIAE2AggMAQsgBCgCGCEGAkAgAiAERwRAIAQoAggiACACNgIMIAIgADYCCAwBCwJAIAQoAhQiAAR/IARBFGoFIAQoAhAiAEUNASAEQRBqCyEBA0AgASEFIAAiAkEUaiEBIAAoAhQiAA0AIAJBEGohASACKAIQIgANAAsgBUEANgIADAELQQAhAgsgBkUNAAJAIAQoAhwiAEECdEG4CmoiASgCACAERgRAIAEgAjYCACACDQFBjAhBjAgoAgBBfiAAd3E2AgAMAgsCQCAEIAYoAhBGBEAgBiACNgIQDAELIAYgAjYCFAsgAkUNAQsgAiAGNgIYIAQoAhAiAARAIAIgADYCECAAIAI2AhgLIAQoAhQiAEUNACACIAA2AhQgACACNgIYCyAHIAlqIQcgBCAJaiIEKAIEIQALIAQgAEF+cTYCBCADIAdBAXI2AgQgAyAHaiAHNgIAIAdB/wFNBEAgB0F4cUGwCGohAAJ/QYgIKAIAIgFBASAHQQN2dCICcUUEQEGICCABIAJyNgIAIAAMAQsgACgCCAshASAAIAM2AgggASADNgIMIAMgADYCDCADIAE2AggMAQtBHyECIAdB////B00EQCAHQSYgB0EIdmciAGt2QQFxIABBAXRrQT5qIQILIAMgAjYCHCADQgA3AhAgAkECdEG4CmohAAJAAkBBjAgoAgAiAUEBIAJ0IgVxRQRAQYwIIAEgBXI2AgAgACADNgIADAELIAdBGSACQQF2a0EAIAJBH0cbdCECIAAoAgAhAQNAIAEiACgCBEF4cSAHRg0CIAJBHXYhASACQQF0IQIgACABQQRxaiIFKAIQIgENAAsgBSADNgIQCyADIAA2AhggAyADNgIMIAMgAzYCCAwBCyAAKAIIIgEgAzYCDCAAIAM2AgggA0EANgIYIAMgADYCDCADIAE2AggLIAhBCGohAAwCCwJAIAhFDQACQCAFKAIcIgFBAnRBuApqIgIoAgAgBUYEQCACIAA2AgAgAA0BQYwIIAdBfiABd3EiBzYCAAwCCwJAIAUgCCgCEEYEQCAIIAA2AhAMAQsgCCAANgIUCyAARQ0BCyAAIAg2AhggBSgCECIBBEAgACABNgIQIAEgADYCGAsgBSgCFCIBRQ0AIAAgATYCFCABIAA2AhgLAkAgA0EPTQRAIAUgAyAGaiIAQQNyNgIEIAAgBWoiACAAKAIEQQFyNgIEDAELIAUgBkEDcjYCBCAFIAZqIgQgA0EBcjYCBCADIARqIAM2AgAgA0H/AU0EQCADQXhxQbAIaiEAAn9BiAgoAgAiAUEBIANBA3Z0IgJxRQRAQYgIIAEgAnI2AgAgAAwBCyAAKAIICyEBIAAgBDYCCCABIAQ2AgwgBCAANgIMIAQgATYCCAwBC0EfIQAgA0H///8HTQRAIANBJiADQQh2ZyIAa3ZBAXEgAEEBdGtBPmohAAsgBCAANgIcIARCADcCECAAQQJ0QbgKaiEBAkACQCAHQQEgAHQiAnFFBEBBjAggAiAHcjYCACABIAQ2AgAgBCABNgIYDAELIANBGSAAQQF2a0EAIABBH0cbdCEAIAEoAgAhAQNAIAEiAigCBEF4cSADRg0CIABBHXYhASAAQQF0IQAgAiABQQRxaiIHKAIQIgENAAsgByAENgIQIAQgAjYCGAsgBCAENgIMIAQgBDYCCAwBCyACKAIIIgAgBDYCDCACIAQ2AgggBEEANgIYIAQgAjYCDCAEIAA2AggLIAVBCGohAAwBCwJAIAlFDQACQCACKAIcIgFBAnRBuApqIgUoAgAgAkYEQCAFIAA2AgAgAA0BQYwIIAtBfiABd3E2AgAMAgsCQCACIAkoAhBGBEAgCSAANgIQDAELIAkgADYCFAsgAEUNAQsgACAJNgIYIAIoAhAiAQRAIAAgATYCECABIAA2AhgLIAIoAhQiAUUNACAAIAE2AhQgASAANgIYCwJAIANBD00EQCACIAMgBmoiAEEDcjYCBCAAIAJqIgAgACgCBEEBcjYCBAwBCyACIAZBA3I2AgQgAiAGaiIFIANBAXI2AgQgAyAFaiADNgIAIAgEQCAIQXhxQbAIaiEAQZwIKAIAIQECf0EBIAhBA3Z0IgcgBHFFBEBBiAggBCAHcjYCACAADAELIAAoAggLIQQgACABNgIIIAQgATYCDCABIAA2AgwgASAENgIIC0GcCCAFNgIAQZAIIAM2AgALIAJBCGohAAsgCkEQaiQAIAALoQsCC38JfSMAQaABayILJAAgC0EwakEAQST8CwADQCABIA5HBEAgAiAOQQNsIgxBAmpBAnQiD2oqAgAhFyACIAxBAWpBAnQiEGoqAgAhGCAIIAxBAnQiEWogAiARaioCACIZOAIAIAggEGogGDgCACAIIA9qIBc4AgAgByAOQQV0aiINQQA2AgwgDSAXOAIIIA0gGDgCBCANIBk4AgACQCAARQRAIAYgDmotAABFDQELIA1BgICACDYCDAsgDSAFIA5BAnQiDEEBciISai0AAEEIdCAFIAxqLQAAciAFIAxBAnIiE2otAABBEHRyIAUgDEEDciIMai0AAEEYdHI2AhwgCyADIBJBAnQiEmoqAgAiFzgCkAEgCyADIBNBAnQiE2oqAgAiGDgClAEgCyADIAxBAnQiFGoqAgAiGTgCmAEgCyADIA5BBHQiFWoqAgCMIho4ApwBIAtB4ABqIgwgCyoCmAEiFkMAAADAlCAWlCALKgKUASIWQwAAAMCUIBaUQwAAgD+SkjgCACAMIAsqApABIhYgFpIgCyoClAGUIAsqApgBIhYgFpIgCyoCnAGUkzgCBCAMIAsqApABIhYgFpIgCyoCmAGUIAsqApQBIhYgFpIgCyoCnAGUkjgCCCAMIAsqApABIhYgFpIgCyoClAGUIAsqApgBIhYgFpIgCyoCnAGUkjgCDCAMIAsqApgBIhZDAAAAwJQgFpQgCyoCkAEiFkMAAADAlCAWlEMAAIA/kpI4AhAgDCALKgKUASIWIBaSIAsqApgBlCALKgKQASIWIBaSIAsqApwBlJM4AhQgDCALKgKQASIWIBaSIAsqApgBlCALKgKUASIWIBaSIAsqApwBlJM4AhggDCALKgKUASIWIBaSIAsqApgBlCALKgKQASIWIBaSIAsqApwBlJI4AhwgDCALKgKUASIWQwAAAMCUIBaUIAsqApABIhZDAAAAwJQgFpRDAACAP5KSOAIgIAkgFWogFzgCACAJIBJqIBg4AgAgCSATaiAZOAIAIAkgFGogGjgCACALIAQgEWoqAgAiFzgCMCALIAQgEGoqAgAiGDgCQCALIAQgD2oqAgAiGTgCUCAKIBFqIBc4AgAgCiAQaiAYOAIAIAogD2ogGTgCACALIAwqAhggCyoCOJQgDCoCACALKgIwlCAMKgIMIAsqAjSUkpI4AgAgCyAMKgIcIAsqAjiUIAwqAgQgCyoCMJQgDCoCECALKgI0lJKSOAIEIAsgDCoCICALKgI4lCAMKgIIIAsqAjCUIAwqAhQgCyoCNJSSkjgCCCALIAwqAhggCyoCRJQgDCoCACALKgI8lCAMKgIMIAsqAkCUkpI4AgwgCyAMKgIcIAsqAkSUIAwqAgQgCyoCPJQgDCoCECALKgJAlJKSOAIQIAsgDCoCICALKgJElCAMKgIIIAsqAjyUIAwqAhQgCyoCQJSSkjgCFCALIAwqAhggCyoCUJQgDCoCACALKgJIlCAMKgIMIAsqAkyUkpI4AhggCyAMKgIcIAsqAlCUIAwqAgQgCyoCSJQgDCoCECALKgJMlJKSOAIcIAsgDCoCICALKgJQlCAMKgIIIAsqAkiUIAwqAhQgCyoCTJSSkjgCICALKgIgIRcgCyoCCCEYIAsqAhQhGSANIAsqAhgiGiAalCALKgIAIhYgFpQgCyoCDCIbIBuUkpJDAACAQJQgGiALKgIcIhyUIBYgCyoCBCIdlCAbIAsqAhAiHpSSkkMAAIBAlBACNgIQIA0gGiAXlCAWIBiUIBsgGZSSkkMAAIBAlCAcIByUIB0gHZQgHiAelJKSQwAAgECUEAI2AhQgDSAcIBeUIB0gGJQgHiAZlJKSQwAAgECUIBcgF5QgGCAYlCAZIBmUkpJDAACAQJQQAjYCGCAOQQFqIQ4MAQsLIAtBoAFqJAALAgALCwkBAEGBCAsCBgE=")}function _(k){if(ArrayBuffer.isView(k))return k;if(k==p&&a)return new Uint8Array(a);if(s)return s(k);throw'sync fetching of the wasm failed: you can preload it to Module["wasmBinary"] manually, or emcc.py will do that for you when generating HTML (but not JS)'}function S(k,Y){var re,ee=_(k);re=new WebAssembly.Module(ee);var ge=new WebAssembly.Instance(re,Y);return[ge,re]}function M(){return{a:K}}function C(){function k(ee,ge){return ae=ee.exports,o=ae.b,c(),Z(ae),m(),ae}v();var Y=M();if(t.instantiateWasm)return new Promise((ee,ge)=>{t.instantiateWasm(Y,(be,Fe)=>{ee(k(be))})});p??=A();var re=S(p,Y);return k(re[0])}for(var U=k=>{for(;k.length>0;)k.shift()(t)},T=[],y=k=>T.push(k),b=[],E=k=>b.push(k),D=k=>{for(var Y,re,ee=0,ge=0,be=k.length,Fe=new Uint8Array((be*3>>2)-(k[be-2]=="=")-(k[be-1]=="="));ee<be;ee+=4,ge+=3)Y=B[k.charCodeAt(ee+1)],re=B[k.charCodeAt(ee+2)],Fe[ge]=B[k.charCodeAt(ee)]<<2|Y>>4,Fe[ge+1]=Y<<4|re>>2,Fe[ge+2]=re<<6|B[k.charCodeAt(ee+3)];return Fe},F=()=>2147483648,Q=(k,Y)=>Math.ceil(k/Y)*Y,V=k=>{var Y=o.buffer,re=(k-Y.byteLength+65535)/65536|0;try{return o.grow(re),c(),1}catch{}},O=k=>{var Y=l.length;k>>>=0;var re=F();if(k>re)return!1;for(var ee=1;ee<=4;ee*=2){var ge=Y*(1+.2/ee);ge=Math.min(ge,k+100663296);var be=Math.min(re,Q(Math.max(k,ge),65536)),Fe=V(be);if(Fe)return!0}return!1},B=new Uint8Array(123),R=25;R>=0;--R)B[48+R]=52+R,B[65+R]=R,B[97+R]=26+R;B[43]=62,B[47]=63,t.noExitRuntime&&t.noExitRuntime,t.print&&t.print,t.printErr&&t.printErr,t.wasmBinary&&(a=t.wasmBinary),t.arguments&&t.arguments,t.thisProgram&&t.thisProgram;function Z(k){t._pack=k.d,t._malloc=k.e,t._free=k.f}var K={a:O},ae=C();function Me(){if(u>0){g=Me;return}if(d(),u>0){g=Me;return}function k(){t.calledRun=!0,h(),t.onRuntimeInitialized?.(),f()}t.setStatus?(t.setStatus("Running..."),setTimeout(()=>{setTimeout(()=>t.setStatus(""),1),k()},1)):k()}function Be(){if(t.preInit)for(typeof t.preInit=="function"&&(t.preInit=[t.preInit]);t.preInit.length>0;)t.preInit.shift()()}return Be(),Me(),e=t,e};const YA=()=>new ZA;class nl{constructor(e){this.dataChanged=!1,this.transformsChanged=!1,this.colorTransformsChanged=!1,this._updating=new Set,this._dirty=new Set;let t=0,i=0;this._splatIndices=new Map,this._offsets=new Map;const r=new Map;for(const f of e.objects)f instanceof si&&(this._splatIndices.set(f,i),this._offsets.set(f,t),r.set(t,f),t+=f.data.vertexCount,i++);this._vertexCount=t,this._width=2048,this._height=Math.ceil(2*this.vertexCount/this.width),this._data=new Uint32Array(this.width*this.height*4),this._transformsWidth=5,this._transformsHeight=r.size,this._transforms=new Float32Array(this._transformsWidth*this._transformsHeight*4),this._transformIndicesWidth=1024,this._transformIndicesHeight=Math.ceil(this.vertexCount/this._transformIndicesWidth),this._transformIndices=new Uint32Array(this._transformIndicesWidth*this._transformIndicesHeight),this._colorTransformsWidth=4,this._colorTransformsHeight=64,this._colorTransforms=new Float32Array(this._colorTransformsWidth*this._colorTransformsHeight*4),this._colorTransforms.fill(0),this._colorTransforms[0]=1,this._colorTransforms[5]=1,this._colorTransforms[10]=1,this._colorTransforms[15]=1,this._colorTransformIndicesWidth=1024,this._colorTransformIndicesHeight=Math.ceil(this.vertexCount/this._colorTransformIndicesWidth),this._colorTransformIndices=new Uint32Array(this._colorTransformIndicesWidth*this._colorTransformIndicesHeight),this.colorTransformIndices.fill(0),this._positions=new Float32Array(this.vertexCount*3),this._rotations=new Float32Array(this.vertexCount*4),this._scales=new Float32Array(this.vertexCount*3),this._worker=YA();const s=f=>{const u=this._splatIndices.get(f);this._transforms.set(f.transform.buffer,u*20),this._transforms[u*20+16]=f.selected?1:0,f.positionChanged=!1,f.rotationChanged=!1,f.scaleChanged=!1,f.selectedChanged=!1,this.transformsChanged=!0},a=()=>{let f=!1;for(const v of this._splatIndices.keys())if(v.colorTransformChanged){f=!0;break}if(!f)return;const u=[new Ht];this._colorTransformIndices.fill(0);let g=1;for(const v of this._splatIndices.keys()){const m=this._offsets.get(v);for(const p of v.colorTransforms)u.includes(p)||(u.push(p),g++);for(const p of v.colorTransformsMap.keys()){const A=v.colorTransformsMap.get(p);this._colorTransformIndices[p+m]=A+g-1}v.colorTransformChanged=!1}for(let v=0;v<u.length;v++){const m=u[v];this._colorTransforms.set(m.buffer,v*16)}this.colorTransformsChanged=!0};this._worker.onmessage=f=>{if(f.data.response){const u=f.data.response,g=r.get(u.offset);s(g),a();const v=this._splatIndices.get(g);for(let m=0;m<g.data.vertexCount;m++)this._transformIndices[u.offset+m]=v;this._data.set(u.data,u.offset*8),g.data.reattach(u.positions,u.rotations,u.scales,u.colors,u.selection),this._positions.set(u.worldPositions,u.offset*3),this._rotations.set(u.worldRotations,u.offset*4),this._scales.set(u.worldScales,u.offset*3),this._updating.delete(g),g.selectedChanged=!1,this.dataChanged=!0}};let o;async function l(){o=await XA()}l();async function c(){for(;!o;)await new Promise(f=>setTimeout(f,0))}const d=f=>{if(!o){c().then(()=>{d(f)});return}s(f);const u=o._malloc(3*f.data.vertexCount*4),g=o._malloc(4*f.data.vertexCount*4),v=o._malloc(3*f.data.vertexCount*4),m=o._malloc(4*f.data.vertexCount),p=o._malloc(f.data.vertexCount),A=o._malloc(8*f.data.vertexCount*4),_=o._malloc(3*f.data.vertexCount*4),S=o._malloc(4*f.data.vertexCount*4),M=o._malloc(3*f.data.vertexCount*4);o.HEAPF32.set(f.data.positions,u/4),o.HEAPF32.set(f.data.rotations,g/4),o.HEAPF32.set(f.data.scales,v/4),o.HEAPU8.set(f.data.colors,m),o.HEAPU8.set(f.data.selection,p),o._pack(f.selected,f.data.vertexCount,u,g,v,m,p,A,_,S,M);const C=new Uint32Array(o.HEAPU32.buffer,A,f.data.vertexCount*8),U=new Float32Array(o.HEAPF32.buffer,_,f.data.vertexCount*3),T=new Float32Array(o.HEAPF32.buffer,S,f.data.vertexCount*4),y=new Float32Array(o.HEAPF32.buffer,M,f.data.vertexCount*3),b=this._splatIndices.get(f),E=this._offsets.get(f);for(let D=0;D<f.data.vertexCount;D++)this._transformIndices[E+D]=b;this._data.set(C,E*8),this._positions.set(U,E*3),this._rotations.set(T,E*4),this._scales.set(y,E*3),o._free(u),o._free(g),o._free(v),o._free(m),o._free(p),o._free(A),o._free(_),o._free(S),o._free(M),this.dataChanged=!0,this.colorTransformsChanged=!0},h=f=>{if((f.positionChanged||f.rotationChanged||f.scaleChanged||f.selectedChanged)&&s(f),f.colorTransformChanged&&a(),!f.data.changed||f.data.detached)return;const u={position:new Float32Array(f.position.flat()),rotation:new Float32Array(f.rotation.flat()),scale:new Float32Array(f.scale.flat()),selected:f.selected,vertexCount:f.data.vertexCount,positions:f.data.positions,rotations:f.data.rotations,scales:f.data.scales,colors:f.data.colors,selection:f.data.selection,offset:this._offsets.get(f)};this._worker.postMessage({splat:u},[u.position.buffer,u.rotation.buffer,u.scale.buffer,u.positions.buffer,u.rotations.buffer,u.scales.buffer,u.colors.buffer,u.selection.buffer]),this._updating.add(f),f.data.detached=!0};this.getSplat=f=>{let u=null;for(const[g,v]of this._offsets)if(f>=v)u=g;else break;return u},this.getLocalIndex=(f,u)=>{const g=this._offsets.get(f);return u-g},this.markDirty=f=>{this._dirty.add(f)},this.rebuild=()=>{for(const f of this._dirty)h(f);this._dirty.clear()},this.dispose=()=>{this._worker.terminate()};for(const f of this._splatIndices.keys())d(f);a()}get offsets(){return this._offsets}get data(){return this._data}get width(){return this._width}get height(){return this._height}get transforms(){return this._transforms}get transformsWidth(){return this._transformsWidth}get transformsHeight(){return this._transformsHeight}get transformIndices(){return this._transformIndices}get transformIndicesWidth(){return this._transformIndicesWidth}get transformIndicesHeight(){return this._transformIndicesHeight}get colorTransforms(){return this._colorTransforms}get colorTransformsWidth(){return this._colorTransformsWidth}get colorTransformsHeight(){return this._colorTransformsHeight}get colorTransformIndices(){return this._colorTransformIndices}get colorTransformIndicesWidth(){return this._colorTransformIndicesWidth}get colorTransformIndicesHeight(){return this._colorTransformIndicesHeight}get positions(){return this._positions}get rotations(){return this._rotations}get scales(){return this._scales}get vertexCount(){return this._vertexCount}get needsRebuild(){return this._dirty.size>0}get updating(){return this._updating.size>0}}class rl{constructor(e=0,t=0,i=0,r=255){this.r=e,this.g=t,this.b=i,this.a=r}flat(){return[this.r,this.g,this.b,this.a]}flatNorm(){return[this.r/255,this.g/255,this.b/255,this.a/255]}toHexString(){return"#"+this.flat().map(e=>e.toString(16).padStart(2,"0")).join("")}toString(){return`[${this.flat().join(", ")}]`}}const KA=()=>new HA,jA=`#version 300 es
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
`,qA=`#version 300 es
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
`;class sl extends ph{constructor(e,t){super(e,t),this._outlineThickness=10,this._outlineColor=new rl(255,165,0,255),this._renderData=null,this._depthIndex=new Uint32Array,this._splatTexture=null,this._worker=null;const i=e.canvas,r=e.gl;let s,a,o,l,c,d,h,f,u,g,v,m,p,A,_,S,M,C,U;this._resize=()=>{this._camera&&(this._camera.data.setSize(i.width,i.height),this._camera.update(),s=r.getUniformLocation(this.program,"projection"),r.uniformMatrix4fv(s,!1,this._camera.data.projectionMatrix.buffer),a=r.getUniformLocation(this.program,"viewport"),r.uniform2fv(a,new Float32Array([i.width,i.height])))};const T=()=>{this._worker=KA(),this._worker.onmessage=F=>{if(F.data.depthIndex){const{depthIndex:Q}=F.data;this._depthIndex=Q,r.bindBuffer(r.ARRAY_BUFFER,U),r.bufferData(r.ARRAY_BUFFER,Q,r.STATIC_DRAW)}}};this._initialize=()=>{if(!this._scene||!this._camera){console.error("Cannot render without scene and camera");return}this._resize(),this._scene.addEventListener("objectAdded",y),this._scene.addEventListener("objectRemoved",b);for(const F of this._scene.objects)F instanceof si&&F.addEventListener("objectChanged",E);this._renderData=new nl(this._scene),o=r.getUniformLocation(this.program,"focal"),r.uniform2fv(o,new Float32Array([this._camera.data.fx,this._camera.data.fy])),l=r.getUniformLocation(this.program,"view"),r.uniformMatrix4fv(l,!1,this._camera.data.viewMatrix.buffer),g=r.getUniformLocation(this.program,"outlineThickness"),r.uniform1f(g,this.outlineThickness),v=r.getUniformLocation(this.program,"outlineColor"),r.uniform4fv(v,new Float32Array(this.outlineColor.flatNorm())),this._splatTexture=r.createTexture(),c=r.getUniformLocation(this.program,"u_texture"),r.uniform1i(c,0),A=r.createTexture(),d=r.getUniformLocation(this.program,"u_transforms"),r.uniform1i(d,1),_=r.createTexture(),h=r.getUniformLocation(this.program,"u_transformIndices"),r.uniform1i(h,2),S=r.createTexture(),f=r.getUniformLocation(this.program,"u_colorTransforms"),r.uniform1i(f,3),M=r.createTexture(),u=r.getUniformLocation(this.program,"u_colorTransformIndices"),r.uniform1i(u,4),C=r.createBuffer(),r.bindBuffer(r.ARRAY_BUFFER,C),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-2,-2,2,-2,2,2,-2,2]),r.STATIC_DRAW),m=r.getAttribLocation(this.program,"position"),r.enableVertexAttribArray(m),r.vertexAttribPointer(m,2,r.FLOAT,!1,0,0),U=r.createBuffer(),p=r.getAttribLocation(this.program,"index"),r.enableVertexAttribArray(p),r.bindBuffer(r.ARRAY_BUFFER,U),T()};const y=F=>{const Q=F;Q.object instanceof si&&Q.object.addEventListener("objectChanged",E),D()},b=F=>{const Q=F;Q.object instanceof si&&Q.object.removeEventListener("objectChanged",E),D()},E=F=>{const Q=F;Q.object instanceof si&&this._renderData&&this._renderData.markDirty(Q.object)},D=()=>{this._renderData?.dispose(),this._renderData=new nl(this._scene),this._worker?.terminate(),T()};this._render=()=>{if(!this._scene||!this._camera||!this.renderData){console.error("Cannot render without scene and camera");return}if(this.renderData.needsRebuild&&this.renderData.rebuild(),this.renderData.dataChanged||this.renderData.transformsChanged||this.renderData.colorTransformsChanged){this.renderData.dataChanged&&(r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,this.splatTexture),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.NEAREST),r.texImage2D(r.TEXTURE_2D,0,r.RGBA32UI,this.renderData.width,this.renderData.height,0,r.RGBA_INTEGER,r.UNSIGNED_INT,this.renderData.data)),this.renderData.transformsChanged&&(r.activeTexture(r.TEXTURE1),r.bindTexture(r.TEXTURE_2D,A),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.NEAREST),r.texImage2D(r.TEXTURE_2D,0,r.RGBA32F,this.renderData.transformsWidth,this.renderData.transformsHeight,0,r.RGBA,r.FLOAT,this.renderData.transforms),r.activeTexture(r.TEXTURE2),r.bindTexture(r.TEXTURE_2D,_),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.NEAREST),r.texImage2D(r.TEXTURE_2D,0,r.R32UI,this.renderData.transformIndicesWidth,this.renderData.transformIndicesHeight,0,r.RED_INTEGER,r.UNSIGNED_INT,this.renderData.transformIndices)),this.renderData.colorTransformsChanged&&(r.activeTexture(r.TEXTURE3),r.bindTexture(r.TEXTURE_2D,S),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.NEAREST),r.texImage2D(r.TEXTURE_2D,0,r.RGBA32F,this.renderData.colorTransformsWidth,this.renderData.colorTransformsHeight,0,r.RGBA,r.FLOAT,this.renderData.colorTransforms),r.activeTexture(r.TEXTURE4),r.bindTexture(r.TEXTURE_2D,M),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.NEAREST),r.texImage2D(r.TEXTURE_2D,0,r.R32UI,this.renderData.colorTransformIndicesWidth,this.renderData.colorTransformIndicesHeight,0,r.RED_INTEGER,r.UNSIGNED_INT,this.renderData.colorTransformIndices));const F=new Float32Array(this.renderData.positions.slice().buffer),Q=new Float32Array(this.renderData.transforms.slice().buffer),V=new Uint32Array(this.renderData.transformIndices.slice().buffer);this._worker?.postMessage({sortData:{positions:F,transforms:Q,transformIndices:V,vertexCount:this.renderData.vertexCount}},[F.buffer,Q.buffer,V.buffer]),this.renderData.dataChanged=!1,this.renderData.transformsChanged=!1,this.renderData.colorTransformsChanged=!1}this._camera.update(),this._worker?.postMessage({viewProj:this._camera.data.viewProj.buffer}),r.viewport(0,0,i.width,i.height),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT),r.disable(r.DEPTH_TEST),r.enable(r.BLEND),r.blendFuncSeparate(r.ONE_MINUS_DST_ALPHA,r.ONE,r.ONE_MINUS_DST_ALPHA,r.ONE),r.blendEquationSeparate(r.FUNC_ADD,r.FUNC_ADD),r.uniformMatrix4fv(s,!1,this._camera.data.projectionMatrix.buffer),r.uniformMatrix4fv(l,!1,this._camera.data.viewMatrix.buffer),r.bindBuffer(r.ARRAY_BUFFER,C),r.vertexAttribPointer(m,2,r.FLOAT,!1,0,0),r.bindBuffer(r.ARRAY_BUFFER,U),r.bufferData(r.ARRAY_BUFFER,this.depthIndex,r.STATIC_DRAW),r.vertexAttribIPointer(p,1,r.INT,0,0),r.vertexAttribDivisor(p,1),r.drawArraysInstanced(r.TRIANGLE_FAN,0,4,this.depthIndex.length)},this._dispose=()=>{if(!this._scene||!this._camera||!this.renderData){console.error("Cannot dispose without scene and camera");return}this._scene.removeEventListener("objectAdded",y),this._scene.removeEventListener("objectRemoved",b);for(const F of this._scene.objects)F instanceof si&&F.removeEventListener("objectChanged",E);this._worker?.terminate(),this.renderData.dispose(),r.deleteTexture(this.splatTexture),r.deleteTexture(A),r.deleteTexture(_),r.deleteBuffer(U),r.deleteBuffer(C)},this._setOutlineThickness=F=>{this._outlineThickness=F,this._initialized&&r.uniform1f(g,F)},this._setOutlineColor=F=>{this._outlineColor=F,this._initialized&&r.uniform4fv(v,new Float32Array(F.flatNorm()))}}get renderData(){return this._renderData}get depthIndex(){return this._depthIndex}get splatTexture(){return this._splatTexture}get outlineThickness(){return this._outlineThickness}set outlineThickness(e){this._setOutlineThickness(e)}get outlineColor(){return this._outlineColor}set outlineColor(e){this._setOutlineColor(e)}get worker(){return this._worker}_getVertexSource(){return jA}_getFragmentSource(){return qA}}class vh{constructor(e=1){let t=0,i=!1,r,s,a,o;this.initialize=l=>{if(!(l instanceof sl))throw new Error("FadeInPass requires a RenderProgram");t=l.started?1:0,i=!0,r=l,s=l.renderer.gl,a=s.getUniformLocation(r.program,"useDepthFade"),s.uniform1i(a,1),o=s.getUniformLocation(r.program,"depthFade"),s.uniform1f(o,t)},this.render=()=>{!i||r.renderData?.updating||(s.useProgram(r.program),t=Math.min(t+e*.01,1),t>=1&&(i=!1,s.uniform1i(a,0)),s.uniform1f(o,t))}}dispose(){}}class $A{constructor(e=null,t=null){this._backgroundColor=new rl;const i=e||document.createElement("canvas");e||(i.style.display="block",i.style.boxSizing="border-box",i.style.width="100%",i.style.height="100%",i.style.margin="0",i.style.padding="0",document.body.appendChild(i)),i.style.background=this._backgroundColor.toHexString(),this._canvas=i,this._gl=i.getContext("webgl2",{antialias:!1});const r=t||[];t||r.push(new vh),this._renderProgram=new sl(this,r);const s=[this._renderProgram];this.resize=()=>{const a=i.clientWidth,o=i.clientHeight;(i.width!==a||i.height!==o)&&this.setSize(a,o)},this.setSize=(a,o)=>{i.width=a,i.height=o,this._gl.viewport(0,0,i.width,i.height);for(const l of s)l.resize()},this.render=(a,o)=>{for(const l of s)l.render(a,o)},this.dispose=()=>{for(const a of s)a.dispose()},this.addProgram=a=>{s.push(a)},this.removeProgram=a=>{const o=s.indexOf(a);if(o<0)throw new Error("Program not found");s.splice(o,1)},this.resize()}get canvas(){return this._canvas}get gl(){return this._gl}get renderProgram(){return this._renderProgram}get backgroundColor(){return this._backgroundColor}set backgroundColor(e){this._backgroundColor=e,this._canvas.style.background=e.toHexString()}}class e_{constructor(e,t,i=.5,r=.5,s=5,a=!0,o=new Ue){this.minAngle=-90,this.maxAngle=90,this.minZoom=.1,this.maxZoom=30,this.orbitSpeed=1,this.panSpeed=1,this.zoomSpeed=1,this.dampening=.12,this.setCameraTarget=()=>{};let l=o.clone(),c=l.clone(),d=i,h=r,f=s,u=!1,g=!1,v=0,m=0,p=0;const A={};let _=!1;const S=()=>{if(_)return;const B=e.rotation.toEuler();d=-B.y,h=-B.x;const R=e.position.x-f*Math.sin(d)*Math.cos(h),Z=e.position.y+f*Math.sin(h),K=e.position.z+f*Math.cos(d)*Math.cos(h);c=new Ue(R,Z,K)};e.addEventListener("objectChanged",S),this.setCameraTarget=B=>{const R=B.x-e.position.x,Z=B.y-e.position.y,K=B.z-e.position.z;f=Math.sqrt(R*R+Z*Z+K*K),h=Math.atan2(Z,Math.sqrt(R*R+K*K)),d=-Math.atan2(R,K),c=new Ue(B.x,B.y,B.z)};const M=()=>.1+.9*(f-this.minZoom)/(this.maxZoom-this.minZoom),C=B=>{A[B.code]=!0,B.code==="ArrowUp"&&(A.KeyW=!0),B.code==="ArrowDown"&&(A.KeyS=!0),B.code==="ArrowLeft"&&(A.KeyA=!0),B.code==="ArrowRight"&&(A.KeyD=!0)},U=B=>{A[B.code]=!1,B.code==="ArrowUp"&&(A.KeyW=!1),B.code==="ArrowDown"&&(A.KeyS=!1),B.code==="ArrowLeft"&&(A.KeyA=!1),B.code==="ArrowRight"&&(A.KeyD=!1)},T=B=>{O(B),u=!0,g=B.button===2,m=B.clientX,p=B.clientY,window.addEventListener("mouseup",y)},y=B=>{O(B),u=!1,g=!1,window.removeEventListener("mouseup",y)},b=B=>{if(O(B),!u||!e)return;const R=B.clientX-m,Z=B.clientY-p;if(g){const K=M(),ae=-R*this.panSpeed*.01*K,Me=-Z*this.panSpeed*.01*K,Be=qt.RotationFromQuaternion(e.rotation).buffer,k=new Ue(Be[0],Be[3],Be[6]),Y=new Ue(Be[1],Be[4],Be[7]);c=c.add(k.multiply(ae)),c=c.add(Y.multiply(Me))}else d-=R*this.orbitSpeed*.003,h+=Z*this.orbitSpeed*.003,h=Math.min(Math.max(h,this.minAngle*Math.PI/180),this.maxAngle*Math.PI/180);m=B.clientX,p=B.clientY},E=B=>{O(B);const R=M();f+=B.deltaY*this.zoomSpeed*.025*R,f=Math.min(Math.max(f,this.minZoom),this.maxZoom)},D=B=>{if(O(B),B.touches.length===1)u=!0,g=!1,m=B.touches[0].clientX,p=B.touches[0].clientY,v=0;else if(B.touches.length===2){u=!0,g=!0,m=(B.touches[0].clientX+B.touches[1].clientX)/2,p=(B.touches[0].clientY+B.touches[1].clientY)/2;const R=B.touches[0].clientX-B.touches[1].clientX,Z=B.touches[0].clientY-B.touches[1].clientY;v=Math.sqrt(R*R+Z*Z)}},F=B=>{O(B),u=!1,g=!1},Q=B=>{if(O(B),!(!u||!e))if(g){const R=M(),Z=B.touches[0].clientX-B.touches[1].clientX,K=B.touches[0].clientY-B.touches[1].clientY,ae=Math.sqrt(Z*Z+K*K),Me=v-ae;f+=Me*this.zoomSpeed*.1*R,f=Math.min(Math.max(f,this.minZoom),this.maxZoom),v=ae;const Be=(B.touches[0].clientX+B.touches[1].clientX)/2,k=(B.touches[0].clientY+B.touches[1].clientY)/2,Y=Be-m,re=k-p,ee=qt.RotationFromQuaternion(e.rotation).buffer,ge=new Ue(ee[0],ee[3],ee[6]),be=new Ue(ee[1],ee[4],ee[7]);c=c.add(ge.multiply(-Y*this.panSpeed*.025*R)),c=c.add(be.multiply(-re*this.panSpeed*.025*R)),m=Be,p=k}else{const R=B.touches[0].clientX-m,Z=B.touches[0].clientY-p;d-=R*this.orbitSpeed*.003,h+=Z*this.orbitSpeed*.003,h=Math.min(Math.max(h,this.minAngle*Math.PI/180),this.maxAngle*Math.PI/180),m=B.touches[0].clientX,p=B.touches[0].clientY}},V=(B,R,Z)=>(1-Z)*B+Z*R;this.update=()=>{_=!0,i=V(i,d,this.dampening),r=V(r,h,this.dampening),s=V(s,f,this.dampening),l=l.lerp(c,this.dampening);const B=l.x+s*Math.sin(i)*Math.cos(r),R=l.y-s*Math.sin(r),Z=l.z-s*Math.cos(i)*Math.cos(r);e.position=new Ue(B,R,Z);const K=l.subtract(e.position).normalize(),ae=Math.asin(-K.y),Me=Math.atan2(K.x,K.z);e.rotation=At.FromEuler(new Ue(ae,Me,0));const Be=.025,k=.01,Y=qt.RotationFromQuaternion(e.rotation).buffer,re=new Ue(-Y[2],-Y[5],-Y[8]),ee=new Ue(Y[0],Y[3],Y[6]);A.KeyS&&(c=c.add(re.multiply(Be))),A.KeyW&&(c=c.subtract(re.multiply(Be))),A.KeyA&&(c=c.subtract(ee.multiply(Be))),A.KeyD&&(c=c.add(ee.multiply(Be))),A.KeyE&&(d+=k),A.KeyQ&&(d-=k),A.KeyR&&(h+=k),A.KeyF&&(h-=k),_=!1};const O=B=>{B.preventDefault(),B.stopPropagation()};this.dispose=()=>{t.removeEventListener("dragenter",O),t.removeEventListener("dragover",O),t.removeEventListener("dragleave",O),t.removeEventListener("contextmenu",O),t.removeEventListener("mousedown",T),t.removeEventListener("mousemove",b),t.removeEventListener("wheel",E),t.removeEventListener("touchstart",D),t.removeEventListener("touchend",F),t.removeEventListener("touchmove",Q),a&&(window.removeEventListener("keydown",C),window.removeEventListener("keyup",U))},a&&(window.addEventListener("keydown",C),window.addEventListener("keyup",U)),t.addEventListener("dragenter",O),t.addEventListener("dragover",O),t.addEventListener("dragleave",O),t.addEventListener("contextmenu",O),t.addEventListener("mousedown",T),t.addEventListener("mousemove",b),t.addEventListener("wheel",E),t.addEventListener("touchstart",D),t.addEventListener("touchend",F),t.addEventListener("touchmove",Q),this.update()}}const t_=Object.freeze(Object.defineProperty({__proto__:null,Camera:VA,CameraData:hh,Color32:rl,FadeInPass:vh,Loader:WA,Matrix3:qt,Matrix4:Ht,Object3D:tl,OrbitControls:e_,Quaternion:At,RenderData:nl,RenderProgram:sl,Scene:kA,ShaderProgram:ph,Splat:si,SplatData:fr,Vector3:Ue,Vector4:Jt,WebGLRenderer:$A},Symbol.toStringTag,{value:"Module"}));Ct.CcSwiper=wl,Ct.CcSwiperSlide=Cl,Ct.CcViewer=ch,Ct.CcViewer3DModel=oh,Ct.CcViewerBase=on,Ct.CcViewerGaussian=lh,Ct.CcViewerImage=hc,Ct.CcViewerPanorama=yr,Ct.CcViewerVideo=fc,Ct.CcViewerYoutube=uc,Ct.ChuciElement=mr,Ct.escapeCssUrl=yl,Object.defineProperty(Ct,Symbol.toStringTag,{value:"Module"})}));
