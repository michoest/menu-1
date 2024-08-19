import{c as O,i as ve,e as V,p as he,a as v,h as w,d as Ae,l as be,f as Ze,g as W,r as T,o as K,j as U,t as Me,w as et,R as tt,s as xe,k as nt,m as ot,Q as ne,n as ge,q as at,u as lt,v as rt,x as A,y as me,z as pe,A as Pe,B as fe,C as it,D as ut,E as Z,F as st,G as ct,H as ue,I as se,J as ee,K as D,L as $e,M as ke}from"./index.e3134bba.js";import{Q as dt}from"./QSeparator.9f77a290.js";import{u as ft,a as vt}from"./store.9f37f943.js";import{u as ce,a as ze,s as ht,g as bt,b as gt,c as mt,d as de}from"./scroll.ddd5acd9.js";import{r as yt}from"./rtl.276c3f1b.js";import"./axios.ab682c6b.js";import"./notify.c7f38d48.js";var wt=O({name:"QPageContainer",setup(e,{slots:S}){const{proxy:{$q:r}}=W(),o=ve(be,V);if(o===V)return console.error("QPageContainer needs to be child of QLayout"),V;he(Ze,!0);const t=v(()=>{const f={};return o.header.space===!0&&(f.paddingTop=`${o.header.size}px`),o.right.space===!0&&(f[`padding${r.lang.rtl===!0?"Left":"Right"}`]=`${o.right.size}px`),o.footer.space===!0&&(f.paddingBottom=`${o.footer.size}px`),o.left.space===!0&&(f[`padding${r.lang.rtl===!0?"Right":"Left"}`]=`${o.left.size}px`),f});return()=>w("div",{class:"q-page-container",style:t.value},Ae(S.default))}});let Tt=0;const Ct=["click","keydown"],qt={icon:String,label:[Number,String],alert:[Boolean,String],alertIcon:String,name:{type:[Number,String],default:()=>`t_${Tt++}`},noCaps:Boolean,tabindex:[String,Number],disable:Boolean,contentClass:String,ripple:{type:[Boolean,Object],default:!0}};function St(e,S,r,o){const t=ve(Me,V);if(t===V)return console.error("QTab/QRouteTab component needs to be child of QTabs"),V;const{proxy:f}=W(),g=T(null),x=T(null),h=T(null),d=v(()=>e.disable===!0||e.ripple===!1?!1:Object.assign({keyCodes:[13,32],early:!0},e.ripple===!0?{}:e.ripple)),L=v(()=>t.currentModel.value===e.name),$=v(()=>"q-tab relative-position self-stretch flex flex-center text-center"+(L.value===!0?" q-tab--active"+(t.tabProps.value.activeClass?" "+t.tabProps.value.activeClass:"")+(t.tabProps.value.activeColor?` text-${t.tabProps.value.activeColor}`:"")+(t.tabProps.value.activeBgColor?` bg-${t.tabProps.value.activeBgColor}`:""):" q-tab--inactive")+(e.icon&&e.label&&t.tabProps.value.inlineLabel===!1?" q-tab--full":"")+(e.noCaps===!0||t.tabProps.value.noCaps===!0?" q-tab--no-caps":"")+(e.disable===!0?" disabled":" q-focusable q-hoverable cursor-pointer")+(o!==void 0?o.linkClass.value:"")),k=v(()=>"q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable "+(t.tabProps.value.inlineLabel===!0?"row no-wrap q-tab__content--inline":"column")+(e.contentClass!==void 0?` ${e.contentClass}`:"")),y=v(()=>e.disable===!0||t.hasFocus.value===!0||L.value===!1&&t.hasActiveTab.value===!0?-1:e.tabindex||0);function P(u,i){if(i!==!0&&g.value!==null&&g.value.focus(),e.disable===!0){o!==void 0&&o.hasRouterLink.value===!0&&xe(u);return}if(o===void 0){t.updateModel({name:e.name}),r("click",u);return}if(o.hasRouterLink.value===!0){const a=(c={})=>{let _;const I=c.to===void 0||at(c.to,e.to)===!0?t.avoidRouteWatcher=ft():null;return o.navigateToRouterLink(u,{...c,returnRouterError:!0}).catch(H=>{_=H}).then(H=>{if(I===t.avoidRouteWatcher&&(t.avoidRouteWatcher=!1,_===void 0&&(H===void 0||H.message!==void 0&&H.message.startsWith("Avoided redundant navigation")===!0)&&t.updateModel({name:e.name})),c.returnRouterError===!0)return _!==void 0?Promise.reject(_):H})};r("click",u,a),u.defaultPrevented!==!0&&a();return}r("click",u)}function R(u){nt(u,[13,32])?P(u,!0):ot(u)!==!0&&u.keyCode>=35&&u.keyCode<=40&&u.altKey!==!0&&u.metaKey!==!0&&t.onKbdNavigate(u.keyCode,f.$el)===!0&&xe(u),r("keydown",u)}function B(){const u=t.tabProps.value.narrowIndicator,i=[],a=w("div",{ref:h,class:["q-tab__indicator",t.tabProps.value.indicatorClass]});e.icon!==void 0&&i.push(w(ne,{class:"q-tab__icon",name:e.icon})),e.label!==void 0&&i.push(w("div",{class:"q-tab__label"},e.label)),e.alert!==!1&&i.push(e.alertIcon!==void 0?w(ne,{class:"q-tab__alert-icon",color:e.alert!==!0?e.alert:void 0,name:e.alertIcon}):w("div",{class:"q-tab__alert"+(e.alert!==!0?` text-${e.alert}`:"")})),u===!0&&i.push(a);const c=[w("div",{class:"q-focus-helper",tabindex:-1,ref:g}),w("div",{class:k.value},ge(S.default,i))];return u===!1&&c.push(a),c}const M={name:v(()=>e.name),rootRef:x,tabIndicatorRef:h,routeData:o};K(()=>{t.unregisterTab(M)}),U(()=>{t.registerTab(M)});function p(u,i){const a={ref:x,class:$.value,tabindex:y.value,role:"tab","aria-selected":L.value===!0?"true":"false","aria-disabled":e.disable===!0?"true":void 0,onClick:P,onKeydown:R,...i};return et(w(u,a,B()),[[tt,d.value]])}return{renderTab:p,$tabs:t}}var te=O({name:"QRouteTab",props:{...lt,...qt},emits:Ct,setup(e,{slots:S,emit:r}){const o=rt({useDisableForRouterLinkProps:!1}),{renderTab:t,$tabs:f}=St(e,S,r,{exact:v(()=>e.exact),...o});return A(()=>`${e.name} | ${e.exact} | ${(o.resolvedLink.value||{}).href}`,()=>{f.verifyRouteModel()}),()=>t(o.linkTag.value,o.linkAttrs.value)}});function Lt(){const e=T(!me.value);return e.value===!1&&U(()=>{e.value=!0}),{isHydrated:e}}const He=typeof ResizeObserver!="undefined",Be=He===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var oe=O({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(e,{emit:S}){let r=null,o,t={width:-1,height:-1};function f(h){h===!0||e.debounce===0||e.debounce==="0"?g():r===null&&(r=setTimeout(g,e.debounce))}function g(){if(r!==null&&(clearTimeout(r),r=null),o){const{offsetWidth:h,offsetHeight:d}=o;(h!==t.width||d!==t.height)&&(t={width:h,height:d},S("resize",t))}}const{proxy:x}=W();if(x.trigger=f,He===!0){let h;const d=L=>{o=x.$el.parentNode,o?(h=new ResizeObserver(f),h.observe(o),g()):L!==!0&&Pe(()=>{d(!0)})};return U(()=>{d()}),K(()=>{r!==null&&clearTimeout(r),h!==void 0&&(h.disconnect!==void 0?h.disconnect():o&&h.unobserve(o))}),pe}else{let L=function(){r!==null&&(clearTimeout(r),r=null),d!==void 0&&(d.removeEventListener!==void 0&&d.removeEventListener("resize",f,fe.passive),d=void 0)},$=function(){L(),o&&o.contentDocument&&(d=o.contentDocument.defaultView,d.addEventListener("resize",f,fe.passive),g())};const{isHydrated:h}=Lt();let d;return U(()=>{Pe(()=>{o=x.$el,o&&$()})}),K(L),()=>{if(h.value===!0)return w("object",{class:"q--avoid-card-border",style:Be.style,tabindex:-1,type:"text/html",data:Be.url,"aria-hidden":"true",onLoad:$})}}}});function Rt(e,S,r){const o=r===!0?["left","right"]:["top","bottom"];return`absolute-${S===!0?o[0]:o[1]}${e?` text-${e}`:""}`}const _t=["left","center","right","justify"];var xt=O({name:"QTabs",props:{modelValue:[Number,String],align:{type:String,default:"center",validator:e=>_t.includes(e)},breakpoint:{type:[String,Number],default:600},vertical:Boolean,shrink:Boolean,stretch:Boolean,activeClass:String,activeColor:String,activeBgColor:String,indicatorColor:String,leftIcon:String,rightIcon:String,outsideArrows:Boolean,mobileArrows:Boolean,switchIndicator:Boolean,narrowIndicator:Boolean,inlineLabel:Boolean,noCaps:Boolean,dense:Boolean,contentClass:String,"onUpdate:modelValue":[Function,Array]},setup(e,{slots:S,emit:r}){const{proxy:o}=W(),{$q:t}=o,{registerTick:f}=ce(),{registerTick:g}=ce(),{registerTick:x}=ce(),{registerTimeout:h,removeTimeout:d}=ze(),{registerTimeout:L,removeTimeout:$}=ze(),k=T(null),y=T(null),P=T(e.modelValue),R=T(!1),B=T(!0),M=T(!1),p=T(!1),u=[],i=T(0),a=T(!1);let c=null,_=null,I;const H=v(()=>({activeClass:e.activeClass,activeColor:e.activeColor,activeBgColor:e.activeBgColor,indicatorClass:Rt(e.indicatorColor,e.switchIndicator,e.vertical),narrowIndicator:e.narrowIndicator,inlineLabel:e.inlineLabel,noCaps:e.noCaps})),Qe=v(()=>{const n=i.value,l=P.value;for(let s=0;s<n;s++)if(u[s].name.value===l)return!0;return!1}),Ve=v(()=>`q-tabs__content--align-${R.value===!0?"left":p.value===!0?"justify":e.align}`),Ee=v(()=>`q-tabs row no-wrap items-center q-tabs--${R.value===!0?"":"not-"}scrollable q-tabs--${e.vertical===!0?"vertical":"horizontal"} q-tabs__arrows--${e.outsideArrows===!0?"outside":"inside"} q-tabs--mobile-with${e.mobileArrows===!0?"":"out"}-arrows`+(e.dense===!0?" q-tabs--dense":"")+(e.shrink===!0?" col-shrink":"")+(e.stretch===!0?" self-stretch":"")),Fe=v(()=>"q-tabs__content scroll--mobile row no-wrap items-center self-stretch hide-scrollbar relative-position "+Ve.value+(e.contentClass!==void 0?` ${e.contentClass}`:"")),G=v(()=>e.vertical===!0?{container:"height",content:"offsetHeight",scroll:"scrollHeight"}:{container:"width",content:"offsetWidth",scroll:"scrollWidth"}),X=v(()=>e.vertical!==!0&&t.lang.rtl===!0),ae=v(()=>yt===!1&&X.value===!0);A(X,N),A(()=>e.modelValue,n=>{le({name:n,setCurrent:!0,skipEmit:!0})}),A(()=>e.outsideArrows,J);function le({name:n,setCurrent:l,skipEmit:s}){P.value!==n&&(s!==!0&&e["onUpdate:modelValue"]!==void 0&&r("update:modelValue",n),(l===!0||e["onUpdate:modelValue"]===void 0)&&(De(P.value,n),P.value=n))}function J(){f(()=>{ye({width:k.value.offsetWidth,height:k.value.offsetHeight})})}function ye(n){if(G.value===void 0||y.value===null)return;const l=n[G.value.container],s=Math.min(y.value[G.value.scroll],Array.prototype.reduce.call(y.value.children,(q,m)=>q+(m[G.value.content]||0),0)),C=l>0&&s>l;R.value=C,C===!0&&g(N),p.value=l<parseInt(e.breakpoint,10)}function De(n,l){const s=n!=null&&n!==""?u.find(q=>q.name.value===n):null,C=l!=null&&l!==""?u.find(q=>q.name.value===l):null;if(s&&C){const q=s.tabIndicatorRef.value,m=C.tabIndicatorRef.value;c!==null&&(clearTimeout(c),c=null),q.style.transition="none",q.style.transform="none",m.style.transition="none",m.style.transform="none";const b=q.getBoundingClientRect(),z=m.getBoundingClientRect();m.style.transform=e.vertical===!0?`translate3d(0,${b.top-z.top}px,0) scale3d(1,${z.height?b.height/z.height:1},1)`:`translate3d(${b.left-z.left}px,0,0) scale3d(${z.width?b.width/z.width:1},1,1)`,x(()=>{c=setTimeout(()=>{c=null,m.style.transition="transform .25s cubic-bezier(.4, 0, .2, 1)",m.style.transform="none"},70)})}C&&R.value===!0&&j(C.rootRef.value)}function j(n){const{left:l,width:s,top:C,height:q}=y.value.getBoundingClientRect(),m=n.getBoundingClientRect();let b=e.vertical===!0?m.top-C:m.left-l;if(b<0){y.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.floor(b),N();return}b+=e.vertical===!0?m.height-q:m.width-s,b>0&&(y.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.ceil(b),N())}function N(){const n=y.value;if(n===null)return;const l=n.getBoundingClientRect(),s=e.vertical===!0?n.scrollTop:Math.abs(n.scrollLeft);X.value===!0?(B.value=Math.ceil(s+l.width)<n.scrollWidth-1,M.value=s>0):(B.value=s>0,M.value=e.vertical===!0?Math.ceil(s+l.height)<n.scrollHeight:Math.ceil(s+l.width)<n.scrollWidth)}function we(n){_!==null&&clearInterval(_),_=setInterval(()=>{je(n)===!0&&E()},5)}function Te(){we(ae.value===!0?Number.MAX_SAFE_INTEGER:0)}function Ce(){we(ae.value===!0?0:Number.MAX_SAFE_INTEGER)}function E(){_!==null&&(clearInterval(_),_=null)}function Oe(n,l){const s=Array.prototype.filter.call(y.value.children,z=>z===l||z.matches&&z.matches(".q-tab.q-focusable")===!0),C=s.length;if(C===0)return;if(n===36)return j(s[0]),s[0].focus(),!0;if(n===35)return j(s[C-1]),s[C-1].focus(),!0;const q=n===(e.vertical===!0?38:37),m=n===(e.vertical===!0?40:39),b=q===!0?-1:m===!0?1:void 0;if(b!==void 0){const z=X.value===!0?-1:1,Q=s.indexOf(l)+b*z;return Q>=0&&Q<C&&(j(s[Q]),s[Q].focus({preventScroll:!0})),!0}}const We=v(()=>ae.value===!0?{get:n=>Math.abs(n.scrollLeft),set:(n,l)=>{n.scrollLeft=-l}}:e.vertical===!0?{get:n=>n.scrollTop,set:(n,l)=>{n.scrollTop=l}}:{get:n=>n.scrollLeft,set:(n,l)=>{n.scrollLeft=l}});function je(n){const l=y.value,{get:s,set:C}=We.value;let q=!1,m=s(l);const b=n<m?-1:1;return m+=b*5,m<0?(q=!0,m=0):(b===-1&&m<=n||b===1&&m>=n)&&(q=!0,m=n),C(l,m),N(),q}function qe(n,l){for(const s in n)if(n[s]!==l[s])return!1;return!0}function Ne(){let n=null,l={matchedLen:0,queryDiff:9999,hrefLen:0};const s=u.filter(b=>b.routeData!==void 0&&b.routeData.hasRouterLink.value===!0),{hash:C,query:q}=o.$route,m=Object.keys(q).length;for(const b of s){const z=b.routeData.exact.value===!0;if(b.routeData[z===!0?"linkIsExactActive":"linkIsActive"].value!==!0)continue;const{hash:Q,query:re,matched:Je,href:Ye}=b.routeData.resolvedLink.value,ie=Object.keys(re).length;if(z===!0){if(Q!==C||ie!==m||qe(q,re)===!1)continue;n=b.name.value;break}if(Q!==""&&Q!==C||ie!==0&&qe(re,q)===!1)continue;const F={matchedLen:Je.length,queryDiff:m-ie,hrefLen:Ye.length-Q.length};if(F.matchedLen>l.matchedLen){n=b.name.value,l=F;continue}else if(F.matchedLen!==l.matchedLen)continue;if(F.queryDiff<l.queryDiff)n=b.name.value,l=F;else if(F.queryDiff!==l.queryDiff)continue;F.hrefLen>l.hrefLen&&(n=b.name.value,l=F)}n===null&&u.some(b=>b.routeData===void 0&&b.name.value===P.value)===!0||le({name:n,setCurrent:!0})}function Ke(n){if(d(),a.value!==!0&&k.value!==null&&n.target&&typeof n.target.closest=="function"){const l=n.target.closest(".q-tab");l&&k.value.contains(l)===!0&&(a.value=!0,R.value===!0&&j(l))}}function Ue(){h(()=>{a.value=!1},30)}function Y(){Le.avoidRouteWatcher===!1?L(Ne):$()}function Se(){if(I===void 0){const n=A(()=>o.$route.fullPath,Y);I=()=>{n(),I=void 0}}}function Ge(n){u.push(n),i.value++,J(),n.routeData===void 0||o.$route===void 0?L(()=>{if(R.value===!0){const l=P.value,s=l!=null&&l!==""?u.find(C=>C.name.value===l):null;s&&j(s.rootRef.value)}}):(Se(),n.routeData.hasRouterLink.value===!0&&Y())}function Xe(n){u.splice(u.indexOf(n),1),i.value--,J(),I!==void 0&&n.routeData!==void 0&&(u.every(l=>l.routeData===void 0)===!0&&I(),Y())}const Le={currentModel:P,tabProps:H,hasFocus:a,hasActiveTab:Qe,registerTab:Ge,unregisterTab:Xe,verifyRouteModel:Y,updateModel:le,onKbdNavigate:Oe,avoidRouteWatcher:!1};he(Me,Le);function Re(){c!==null&&clearTimeout(c),E(),I!==void 0&&I()}let _e;return K(Re),it(()=>{_e=I!==void 0,Re()}),ut(()=>{_e===!0&&Se(),J()}),()=>w("div",{ref:k,class:Ee.value,role:"tablist",onFocusin:Ke,onFocusout:Ue},[w(oe,{onResize:ye}),w("div",{ref:y,class:Fe.value,onScroll:N},Ae(S.default)),w(ne,{class:"q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon"+(B.value===!0?"":" q-tabs__arrow--faded"),name:e.leftIcon||t.iconSet.tabs[e.vertical===!0?"up":"left"],onMousedownPassive:Te,onTouchstartPassive:Te,onMouseupPassive:E,onMouseleavePassive:E,onTouchendPassive:E}),w(ne,{class:"q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon"+(M.value===!0?"":" q-tabs__arrow--faded"),name:e.rightIcon||t.iconSet.tabs[e.vertical===!0?"down":"right"],onMousedownPassive:Ce,onTouchstartPassive:Ce,onMouseupPassive:E,onMouseleavePassive:E,onTouchendPassive:E})])}}),Pt=O({name:"QFooter",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(e,{slots:S,emit:r}){const{proxy:{$q:o}}=W(),t=ve(be,V);if(t===V)return console.error("QFooter needs to be child of QLayout"),V;const f=T(parseInt(e.heightHint,10)),g=T(!0),x=T(me.value===!0||t.isContainer.value===!0?0:window.innerHeight),h=v(()=>e.reveal===!0||t.view.value.indexOf("F")!==-1||o.platform.is.ios&&t.isContainer.value===!0),d=v(()=>t.isContainer.value===!0?t.containerHeight.value:x.value),L=v(()=>{if(e.modelValue!==!0)return 0;if(h.value===!0)return g.value===!0?f.value:0;const a=t.scroll.value.position+d.value+f.value-t.height.value;return a>0?a:0}),$=v(()=>e.modelValue!==!0||h.value===!0&&g.value!==!0),k=v(()=>e.modelValue===!0&&$.value===!0&&e.reveal===!0),y=v(()=>"q-footer q-layout__section--marginal "+(h.value===!0?"fixed":"absolute")+"-bottom"+(e.bordered===!0?" q-footer--bordered":"")+($.value===!0?" q-footer--hidden":"")+(e.modelValue!==!0?" q-layout--prevent-focus"+(h.value!==!0?" hidden":""):"")),P=v(()=>{const a=t.rows.value.bottom,c={};return a[0]==="l"&&t.left.space===!0&&(c[o.lang.rtl===!0?"right":"left"]=`${t.left.size}px`),a[2]==="r"&&t.right.space===!0&&(c[o.lang.rtl===!0?"left":"right"]=`${t.right.size}px`),c});function R(a,c){t.update("footer",a,c)}function B(a,c){a.value!==c&&(a.value=c)}function M({height:a}){B(f,a),R("size",a)}function p(){if(e.reveal!==!0)return;const{direction:a,position:c,inflectionPoint:_}=t.scroll.value;B(g,a==="up"||c-_<100||t.height.value-d.value-c-f.value<300)}function u(a){k.value===!0&&B(g,!0),r("focusin",a)}A(()=>e.modelValue,a=>{R("space",a),B(g,!0),t.animate()}),A(L,a=>{R("offset",a)}),A(()=>e.reveal,a=>{a===!1&&B(g,e.modelValue)}),A(g,a=>{t.animate(),r("reveal",a)}),A([f,t.scroll,t.height],p),A(()=>o.screen.height,a=>{t.isContainer.value!==!0&&B(x,a)});const i={};return t.instances.footer=i,e.modelValue===!0&&R("size",f.value),R("space",e.modelValue),R("offset",L.value),K(()=>{t.instances.footer===i&&(t.instances.footer=void 0,R("size",0),R("offset",0),R("space",!1))}),()=>{const a=ge(S.default,[w(oe,{debounce:0,onResize:M})]);return e.elevated===!0&&a.push(w("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),w("footer",{class:y.value,style:P.value,onFocusin:u},a)}}});const{passive:Ie}=fe,$t=["both","horizontal","vertical"];var kt=O({name:"QScrollObserver",props:{axis:{type:String,validator:e=>$t.includes(e),default:"vertical"},debounce:[String,Number],scrollTarget:ht},emits:["scroll"],setup(e,{emit:S}){const r={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let o=null,t,f;A(()=>e.scrollTarget,()=>{h(),x()});function g(){o!==null&&o();const $=Math.max(0,gt(t)),k=mt(t),y={top:$-r.position.top,left:k-r.position.left};if(e.axis==="vertical"&&y.top===0||e.axis==="horizontal"&&y.left===0)return;const P=Math.abs(y.top)>=Math.abs(y.left)?y.top<0?"up":"down":y.left<0?"left":"right";r.position={top:$,left:k},r.directionChanged=r.direction!==P,r.delta=y,r.directionChanged===!0&&(r.direction=P,r.inflectionPoint=r.position),S("scroll",{...r})}function x(){t=bt(f,e.scrollTarget),t.addEventListener("scroll",d,Ie),d(!0)}function h(){t!==void 0&&(t.removeEventListener("scroll",d,Ie),t=void 0)}function d($){if($===!0||e.debounce===0||e.debounce==="0")g();else if(o===null){const[k,y]=e.debounce?[setTimeout(g,e.debounce),clearTimeout]:[requestAnimationFrame(g),cancelAnimationFrame];o=()=>{y(k),o=null}}}const{proxy:L}=W();return A(()=>L.$q.lang.rtl,g),U(()=>{f=L.$el.parentNode,x()}),K(()=>{o!==null&&o(),h()}),Object.assign(L,{trigger:d,getPosition:()=>r}),pe}}),zt=O({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:e=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(e,{slots:S,emit:r}){const{proxy:{$q:o}}=W(),t=T(null),f=T(o.screen.height),g=T(e.container===!0?0:o.screen.width),x=T({position:0,direction:"down",inflectionPoint:0}),h=T(0),d=T(me.value===!0?0:de()),L=v(()=>"q-layout q-layout--"+(e.container===!0?"containerized":"standard")),$=v(()=>e.container===!1?{minHeight:o.screen.height+"px"}:null),k=v(()=>d.value!==0?{[o.lang.rtl===!0?"left":"right"]:`${d.value}px`}:null),y=v(()=>d.value!==0?{[o.lang.rtl===!0?"right":"left"]:0,[o.lang.rtl===!0?"left":"right"]:`-${d.value}px`,width:`calc(100% + ${d.value}px)`}:null);function P(i){if(e.container===!0||document.qScrollPrevented!==!0){const a={position:i.position.top,direction:i.direction,directionChanged:i.directionChanged,inflectionPoint:i.inflectionPoint.top,delta:i.delta.top};x.value=a,e.onScroll!==void 0&&r("scroll",a)}}function R(i){const{height:a,width:c}=i;let _=!1;f.value!==a&&(_=!0,f.value=a,e.onScrollHeight!==void 0&&r("scrollHeight",a),M()),g.value!==c&&(_=!0,g.value=c),_===!0&&e.onResize!==void 0&&r("resize",i)}function B({height:i}){h.value!==i&&(h.value=i,M())}function M(){if(e.container===!0){const i=f.value>h.value?de():0;d.value!==i&&(d.value=i)}}let p=null;const u={instances:{},view:v(()=>e.view),isContainer:v(()=>e.container),rootRef:t,height:f,containerHeight:h,scrollbarWidth:d,totalWidth:v(()=>g.value+d.value),rows:v(()=>{const i=e.view.toLowerCase().split(" ");return{top:i[0].split(""),middle:i[1].split(""),bottom:i[2].split("")}}),header:Z({size:0,offset:0,space:!1}),right:Z({size:300,offset:0,space:!1}),footer:Z({size:0,offset:0,space:!1}),left:Z({size:300,offset:0,space:!1}),scroll:x,animate(){p!==null?clearTimeout(p):document.body.classList.add("q-body--layout-animate"),p=setTimeout(()=>{p=null,document.body.classList.remove("q-body--layout-animate")},155)},update(i,a,c){u[i][a]=c}};if(he(be,u),de()>0){let c=function(){i=null,a.classList.remove("hide-scrollbar")},_=function(){if(i===null){if(a.scrollHeight>o.screen.height)return;a.classList.add("hide-scrollbar")}else clearTimeout(i);i=setTimeout(c,300)},I=function(H){i!==null&&H==="remove"&&(clearTimeout(i),c()),window[`${H}EventListener`]("resize",_)},i=null;const a=document.body;A(()=>e.container!==!0?"add":"remove",I),e.container!==!0&&I("add"),st(()=>{I("remove")})}return()=>{const i=ge(S.default,[w(kt,{onScroll:P}),w(oe,{onResize:R})]),a=w("div",{class:L.value,style:$.value,ref:e.container===!0?void 0:t,tabindex:-1},i);return e.container===!0?w("div",{class:"q-layout-container overflow-hidden",ref:t},[w(oe,{onResize:B}),w("div",{class:"absolute-full",style:k.value},[w("div",{class:"scroll",style:y.value},[a])])]):a}}});const Vt=Object.assign({name:"AppLayout"},{__name:"app.layout",setup(e){const S=T("menu"),r=vt();return(o,t)=>{const f=ct("router-view");return ue(),se(zt,{view:"lHh Lpr lFf"},{default:ee(()=>[D(wt,null,{default:ee(()=>[D(f)]),_:1}),D(Pt,{class:"bg-grey-2 text-primary"},{default:ee(()=>[D(dt),D(xt,{modelValue:S.value,"onUpdate:modelValue":t[0]||(t[0]=g=>S.value=g),align:"justify"},{default:ee(()=>[$e(r).user?(ue(),se(te,{key:0,name:"menu",icon:"restaurant_menu",to:"/menu"})):ke("",!0),$e(r).user?(ue(),se(te,{key:1,name:"list",icon:"list",to:"/list"})):ke("",!0),D(te,{name:"vendors",icon:"storefront",to:"/vendors"}),D(te,{name:"settings",icon:"account_circle",to:"/settings"})]),_:1},8,["modelValue"])]),_:1})]),_:1})}}});export{Vt as default};
