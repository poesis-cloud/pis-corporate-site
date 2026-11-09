import{$ as m,Aa as h,Ac as kt,Bb as $,C as gt,Dc as E,E as l,Eb as St,Fb as _t,G as ot,Gb as Mt,H as mt,I as O,Ja as z,Jb as T,K as vt,L as U,M as Q,Mb as pt,N as k,Nb as Y,O as b,Ob as Ct,Qa as lt,Qb as tt,R as M,Sa as A,U as yt,Ua as y,V as Tt,Xb as S,Ya as D,Za as B,_ as c,a as L,aa as v,ab as K,ba as C,bc as At,ca as d,cb as J,da as u,eb as Ot,ec as Nt,fa as Et,fb as X,ga as bt,gb as Dt,ia as xt,ic as Pt,jc as et,k as N,ka as wt,la as g,m as P,ma as j,n as f,na as G,o as dt,oa as Lt,p as ut,qa as rt,ra as st,t as ht,tc as F,u as ft,ua as at,vc as H,wa as It,wc as V,x as nt,ya as x,z as I,za as p}from"./chunk-ADSAMBGV.js";var zt=class i{static isArray(e,t=!0){return Array.isArray(e)&&(t||e.length!==0)}static isObject(e,t=!0){return typeof e=="object"&&!Array.isArray(e)&&e!=null&&(t||Object.keys(e).length!==0)}static equals(e,t,n){return n?this.resolveFieldData(e,n)===this.resolveFieldData(t,n):this.equalsByValue(e,t)}static equalsByValue(e,t){if(e===t)return!0;if(e&&t&&typeof e=="object"&&typeof t=="object"){var n=Array.isArray(e),o=Array.isArray(t),r,s,a;if(n&&o){if(s=e.length,s!=t.length)return!1;for(r=s;r--!==0;)if(!this.equalsByValue(e[r],t[r]))return!1;return!0}if(n!=o)return!1;var w=this.isDate(e),R=this.isDate(t);if(w!=R)return!1;if(w&&R)return e.getTime()==t.getTime();var q=e instanceof RegExp,Z=t instanceof RegExp;if(q!=Z)return!1;if(q&&Z)return e.toString()==t.toString();var _=Object.keys(e);if(s=_.length,s!==Object.keys(t).length)return!1;for(r=s;r--!==0;)if(!Object.prototype.hasOwnProperty.call(t,_[r]))return!1;for(r=s;r--!==0;)if(a=_[r],!this.equalsByValue(e[a],t[a]))return!1;return!0}return e!==e&&t!==t}static resolveFieldData(e,t){if(e&&t){if(this.isFunction(t))return t(e);if(t.indexOf(".")==-1)return e[t];{let n=t.split("."),o=e;for(let r=0,s=n.length;r<s;++r){if(o==null)return null;o=o[n[r]]}return o}}else return null}static isFunction(e){return!!(e&&e.constructor&&e.call&&e.apply)}static reorderArray(e,t,n){let o;e&&t!==n&&(n>=e.length&&(n%=e.length,t%=e.length),e.splice(n,0,e.splice(t,1)[0]))}static insertIntoOrderedArray(e,t,n,o){if(n.length>0){let r=!1;for(let s=0;s<n.length;s++)if(this.findIndexInList(n[s],o)>t){n.splice(s,0,e),r=!0;break}r||n.push(e)}else n.push(e)}static findIndexInList(e,t){let n=-1;if(t){for(let o=0;o<t.length;o++)if(t[o]==e){n=o;break}}return n}static contains(e,t){if(e!=null&&t&&t.length){for(let n of t)if(this.equals(e,n))return!0}return!1}static removeAccents(e){return e&&(e=e.normalize("NFKD").replace(new RegExp("\\p{Diacritic}","gu"),"")),e}static isDate(e){return Object.prototype.toString.call(e)==="[object Date]"}static isEmpty(e){return e==null||e===""||Array.isArray(e)&&e.length===0||!this.isDate(e)&&typeof e=="object"&&Object.keys(e).length===0}static isNotEmpty(e){return!this.isEmpty(e)}static compare(e,t,n,o=1){let r=-1,s=this.isEmpty(e),a=this.isEmpty(t);return s&&a?r=0:s?r=o:a?r=-o:typeof e=="string"&&typeof t=="string"?r=e.localeCompare(t,n,{numeric:!0}):r=e<t?-1:e>t?1:0,r}static sort(e,t,n=1,o,r=1){let s=i.compare(e,t,o,n),a=n;return(i.isEmpty(e)||i.isEmpty(t))&&(a=r===1?n:r),a*s}static merge(e,t){if(!(e==null&&t==null)){{if((e==null||typeof e=="object")&&(t==null||typeof t=="object"))return L(L({},e||{}),t||{});if((e==null||typeof e=="string")&&(t==null||typeof t=="string"))return[e||"",t||""].join(" ")}return t||e}}static isPrintableCharacter(e=""){return this.isNotEmpty(e)&&e.length===1&&e.match(/\S| /)}static getItemValue(e,...t){return this.isFunction(e)?e(...t):e}static findLastIndex(e,t){let n=-1;if(this.isNotEmpty(e))try{n=e.findLastIndex(t)}catch{n=e.lastIndexOf([...e].reverse().find(t))}return n}static findLast(e,t){let n;if(this.isNotEmpty(e))try{n=e.findLast(t)}catch{n=[...e].reverse().find(t)}return n}static deepEquals(e,t){if(e===t)return!0;if(e&&t&&typeof e=="object"&&typeof t=="object"){var n=Array.isArray(e),o=Array.isArray(t),r,s,a;if(n&&o){if(s=e.length,s!=t.length)return!1;for(r=s;r--!==0;)if(!this.deepEquals(e[r],t[r]))return!1;return!0}if(n!=o)return!1;var w=e instanceof Date,R=t instanceof Date;if(w!=R)return!1;if(w&&R)return e.getTime()==t.getTime();var q=e instanceof RegExp,Z=t instanceof RegExp;if(q!=Z)return!1;if(q&&Z)return e.toString()==t.toString();var _=Object.keys(e);if(s=_.length,s!==Object.keys(t).length)return!1;for(r=s;r--!==0;)if(!Object.prototype.hasOwnProperty.call(t,_[r]))return!1;for(r=s;r--!==0;)if(a=_[r],!this.deepEquals(e[a],t[a]))return!1;return!0}return e!==e&&t!==t}static minifyCSS(e){return e&&e.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g,"").replace(/ {2,}/g," ").replace(/ ([{:}]) /g,"$1").replace(/([;,]) /g,"$1").replace(/ !/g,"!").replace(/: /g,":")}static toFlatCase(e){return this.isString(e)?e.replace(/(-|_)/g,"").toLowerCase():e}static isString(e,t=!0){return typeof e=="string"&&(t||e!=="")}};function ne(){let i=[],e=(r,s)=>{let a=i.length>0?i[i.length-1]:{key:r,value:s},w=a.value+(a.key===r?0:s)+2;return i.push({key:r,value:w}),w},t=r=>{i=i.filter(s=>s.value!==r)},n=()=>i.length>0?i[i.length-1].value:0,o=r=>r&&parseInt(r.style.zIndex,10)||0;return{get:o,set:(r,s,a)=>{s&&(s.style.zIndex=String(e(r,a)))},clear:r=>{r&&(t(o(r)),r.style.zIndex="")},getCurrent:()=>n(),generateZIndex:e,revertZIndex:t}}var it=ne();var Bt=`
    .p-tooltip {
        position: absolute;
        display: none;
        max-width: dt('tooltip.max.width');
    }

    .p-tooltip-right,
    .p-tooltip-left {
        padding: 0 dt('tooltip.gutter');
    }

    .p-tooltip-top,
    .p-tooltip-bottom {
        padding: dt('tooltip.gutter') 0;
    }

    .p-tooltip-text {
        white-space: pre-line;
        word-break: break-word;
        background: dt('tooltip.background');
        color: dt('tooltip.color');
        padding: dt('tooltip.padding');
        box-shadow: dt('tooltip.shadow');
        border-radius: dt('tooltip.border.radius');
    }

    .p-tooltip-arrow {
        position: absolute;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
    }

    .p-tooltip-right .p-tooltip-arrow {
        margin-top: calc(-1 * dt('tooltip.gutter'));
        border-width: dt('tooltip.gutter') dt('tooltip.gutter') dt('tooltip.gutter') 0;
        border-right-color: dt('tooltip.background');
    }

    .p-tooltip-left .p-tooltip-arrow {
        margin-top: calc(-1 * dt('tooltip.gutter'));
        border-width: dt('tooltip.gutter') 0 dt('tooltip.gutter') dt('tooltip.gutter');
        border-left-color: dt('tooltip.background');
    }

    .p-tooltip-top .p-tooltip-arrow {
        margin-left: calc(-1 * dt('tooltip.gutter'));
        border-width: dt('tooltip.gutter') dt('tooltip.gutter') 0 dt('tooltip.gutter');
        border-top-color: dt('tooltip.background');
        border-bottom-color: dt('tooltip.background');
    }

    .p-tooltip-bottom .p-tooltip-arrow {
        margin-left: calc(-1 * dt('tooltip.gutter'));
        border-width: 0 dt('tooltip.gutter') dt('tooltip.gutter') dt('tooltip.gutter');
        border-top-color: dt('tooltip.background');
        border-bottom-color: dt('tooltip.background');
    }
`;var oe={root:"p-tooltip p-component",arrow:"p-tooltip-arrow",text:"p-tooltip-text"},Ft=(()=>{class i extends F{name="tooltip";style=Bt;classes=oe;static \u0275fac=(()=>{let t;return function(o){return(t||(t=I(i)))(o||i)}})();static \u0275prov=N({token:i,factory:i.\u0275fac})}return i})();var Ht=new P("TOOLTIP_INSTANCE"),He=(()=>{class i extends V{zone;viewContainer;componentName="Tooltip";$pcTooltip=f(Ht,{optional:!0,skipSelf:!0})??void 0;tooltipPosition;tooltipEvent="hover";positionStyle;tooltipStyleClass;tooltipZIndex;escape=!0;showDelay;hideDelay;life;positionTop;positionLeft;autoHide=!0;fitContent=!0;hideOnEscape=!0;showOnEllipsis=!1;content;get disabled(){return this._disabled}set disabled(t){this._disabled=t,this.deactivate()}tooltipOptions;appendTo=y(void 0);$appendTo=A(()=>this.appendTo()||this.config.overlayAppendTo());_tooltipOptions={tooltipLabel:null,tooltipPosition:"right",tooltipEvent:"hover",appendTo:"body",positionStyle:null,tooltipStyleClass:null,tooltipZIndex:"auto",escape:!0,disabled:null,showDelay:null,hideDelay:null,positionTop:null,positionLeft:null,life:null,autoHide:!0,hideOnEscape:!0,showOnEllipsis:!1,id:Nt("pn_id_")+"_tooltip"};_disabled;container;styleClass;tooltipText;rootPTClasses="";showTimeout;hideTimeout;active;mouseEnterListener;mouseLeaveListener;containerMouseleaveListener;clickListener;focusListener;blurListener;touchStartListener;touchEndListener;documentTouchListener;documentEscapeListener;scrollHandler;resizeListener;_componentStyle=f(Ft);interactionInProgress=!1;ptTooltip=y();pTooltipPT=y();pTooltipUnstyled=y();constructor(t,n){super(),this.zone=t,this.viewContainer=n,nt(()=>{let o=this.ptTooltip()||this.pTooltipPT();o&&this.directivePT.set(o)}),nt(()=>{this.pTooltipUnstyled()&&this.directiveUnstyled.set(this.pTooltipUnstyled())})}onAfterViewInit(){Dt(this.platformId)&&this.zone.runOutsideAngular(()=>{let t=this.getOption("tooltipEvent");if((t==="hover"||t==="both")&&(this.mouseEnterListener=this.onMouseEnter.bind(this),this.mouseLeaveListener=this.onMouseLeave.bind(this),this.clickListener=this.onInputClick.bind(this),this.el.nativeElement.addEventListener("mouseenter",this.mouseEnterListener),this.el.nativeElement.addEventListener("click",this.clickListener),this.el.nativeElement.addEventListener("mouseleave",this.mouseLeaveListener),this.touchStartListener=this.onTouchStart.bind(this),this.touchEndListener=this.onTouchEnd.bind(this),this.el.nativeElement.addEventListener("touchstart",this.touchStartListener,{passive:!0}),this.el.nativeElement.addEventListener("touchend",this.touchEndListener,{passive:!0})),t==="focus"||t==="both"){this.focusListener=this.onFocus.bind(this),this.blurListener=this.onBlur.bind(this);let n=this.el.nativeElement.querySelector(".p-component");n||(n=this.getTarget(this.el.nativeElement)),n.addEventListener("focus",this.focusListener),n.addEventListener("blur",this.blurListener)}})}onChanges(t){t.tooltipPosition&&this.setOption({tooltipPosition:t.tooltipPosition.currentValue}),t.tooltipEvent&&this.setOption({tooltipEvent:t.tooltipEvent.currentValue}),t.appendTo&&this.setOption({appendTo:t.appendTo.currentValue}),t.positionStyle&&this.setOption({positionStyle:t.positionStyle.currentValue}),t.tooltipStyleClass&&this.setOption({tooltipStyleClass:t.tooltipStyleClass.currentValue}),t.tooltipZIndex&&this.setOption({tooltipZIndex:t.tooltipZIndex.currentValue}),t.escape&&this.setOption({escape:t.escape.currentValue}),t.showDelay&&this.setOption({showDelay:t.showDelay.currentValue}),t.hideDelay&&this.setOption({hideDelay:t.hideDelay.currentValue}),t.life&&this.setOption({life:t.life.currentValue}),t.positionTop&&this.setOption({positionTop:t.positionTop.currentValue}),t.positionLeft&&this.setOption({positionLeft:t.positionLeft.currentValue}),t.disabled&&this.setOption({disabled:t.disabled.currentValue}),t.content&&(this.setOption({tooltipLabel:t.content.currentValue}),this.active&&(t.content.currentValue?this.container&&this.container.offsetParent?(this.updateText(),this.align()):this.show():this.hide())),t.autoHide&&this.setOption({autoHide:t.autoHide.currentValue}),t.showOnEllipsis&&this.setOption({showOnEllipsis:t.showOnEllipsis.currentValue}),t.id&&this.setOption({id:t.id.currentValue}),t.tooltipOptions&&(this._tooltipOptions=L(L({},this._tooltipOptions),t.tooltipOptions.currentValue),this.deactivate(),this.active&&(this.getOption("tooltipLabel")?this.container&&this.container.offsetParent?(this.updateText(),this.align()):this.show():this.hide()))}isAutoHide(){return this.getOption("autoHide")}onMouseEnter(t){!this.container&&!this.showTimeout&&this.activate()}onMouseLeave(t){this.isAutoHide()?this.deactivate():!($(t.relatedTarget,"p-tooltip")||$(t.relatedTarget,"p-tooltip-text")||$(t.relatedTarget,"p-tooltip-arrow"))&&this.deactivate()}onTouchStart(t){!this.container&&!this.showTimeout&&(this.activate(),this.isAutoHide()||this.bindDocumentTouchListener())}onTouchEnd(t){this.isAutoHide()&&this.deactivate()}bindDocumentTouchListener(){this.documentTouchListener||(this.documentTouchListener=this.renderer.listen("document","touchstart",t=>{this.container&&!this.container.contains(t.target)&&!this.el.nativeElement.contains(t.target)&&(this.deactivate(),this.unbindDocumentTouchListener())}))}unbindDocumentTouchListener(){this.documentTouchListener&&(this.documentTouchListener(),this.documentTouchListener=null)}onFocus(t){this.activate()}onBlur(t){this.deactivate()}onInputClick(t){this.deactivate()}hasEllipsis(){let t=this.el.nativeElement;return t.offsetWidth<t.scrollWidth||t.offsetHeight<t.scrollHeight}activate(){if(!this.interactionInProgress){if(this.getOption("showOnEllipsis")&&!this.hasEllipsis())return;if(this.active=!0,this.clearHideTimeout(),this.getOption("showDelay")?this.showTimeout=setTimeout(()=>{this.show()},this.getOption("showDelay")):this.show(),this.getOption("life")){let t=this.getOption("showDelay")?this.getOption("life")+this.getOption("showDelay"):this.getOption("life");this.hideTimeout=setTimeout(()=>{this.hide()},t)}this.getOption("hideOnEscape")&&(this.documentEscapeListener=this.renderer.listen("document","keydown.escape",()=>{this.deactivate(),this.documentEscapeListener?.()})),this.interactionInProgress=!0}}deactivate(){this.interactionInProgress=!1,this.active=!1,this.clearShowTimeout(),this.getOption("hideDelay")?(this.clearHideTimeout(),this.hideTimeout=setTimeout(()=>{this.hide()},this.getOption("hideDelay"))):this.hide(),this.documentEscapeListener&&this.documentEscapeListener()}create(){this.container&&(this.clearHideTimeout(),this.remove()),this.container=Y("div",{class:this.cx("root"),"p-bind":this.ptm("root"),"data-pc-section":"root"}),this.container.setAttribute("role","tooltip");let t=Y("div",{class:this.cx("arrow"),"p-bind":this.ptm("arrow"),"data-pc-section":"arrow"});this.container.appendChild(t),this.tooltipText=Y("div",{class:this.cx("text"),"p-bind":this.ptm("text"),"data-pc-section":"text"}),this.updateText(),this.getOption("positionStyle")&&(this.container.style.position=this.getOption("positionStyle")),this.container.appendChild(this.tooltipText),this.getOption("appendTo")==="body"?document.body.appendChild(this.container):this.getOption("appendTo")==="target"?pt(this.container,this.el.nativeElement):pt(this.getOption("appendTo"),this.container),this.container.style.display="none",this.fitContent&&(this.container.style.width="fit-content"),this.isAutoHide()?this.container.style.pointerEvents="none":(this.container.style.pointerEvents="unset",this.bindContainerMouseleaveListener())}bindContainerMouseleaveListener(){if(!this.containerMouseleaveListener){let t=this.container??this.container.nativeElement;this.containerMouseleaveListener=this.renderer.listen(t,"mouseleave",n=>{this.deactivate()})}}unbindContainerMouseleaveListener(){this.containerMouseleaveListener&&(this.bindContainerMouseleaveListener(),this.containerMouseleaveListener=null)}show(){if(!this.getOption("tooltipLabel")||this.getOption("disabled"))return;this.create(),this.el.nativeElement.closest("p-dialog")?setTimeout(()=>{this.container&&(this.container.style.display="inline-block"),this.container&&this.align()},100):(this.container.style.display="inline-block",this.align()),Ct(this.container,250),this.getOption("tooltipZIndex")==="auto"?it.set("tooltip",this.container,this.config.zIndex.tooltip):this.container.style.zIndex=this.getOption("tooltipZIndex"),this.bindDocumentResizeListener(),this.bindScrollListener()}hide(){this.getOption("tooltipZIndex")==="auto"&&it.clear(this.container),this.remove()}updateText(){let t=this.getOption("tooltipLabel");if(t&&typeof t.createEmbeddedView=="function"){let n=this.viewContainer.createEmbeddedView(t);n.detectChanges(),n.rootNodes.forEach(o=>this.tooltipText.appendChild(o))}else this.getOption("escape")?(this.tooltipText.innerHTML="",this.tooltipText.appendChild(document.createTextNode(t))):this.tooltipText.innerHTML=t}align(){let t=this.getOption("tooltipPosition"),o={top:[this.alignTop,this.alignBottom,this.alignRight,this.alignLeft],bottom:[this.alignBottom,this.alignTop,this.alignRight,this.alignLeft],left:[this.alignLeft,this.alignRight,this.alignTop,this.alignBottom],right:[this.alignRight,this.alignLeft,this.alignTop,this.alignBottom]}[t]||[];for(let[r,s]of o.entries())if(r===0)s.call(this);else if(this.isOutOfBounds())s.call(this);else break}getHostOffset(){if(this.getOption("appendTo")==="body"||this.getOption("appendTo")==="target"){let t=this.el.nativeElement.getBoundingClientRect(),n=t.left+_t(),o=t.top+Mt();return{left:n,top:o}}else return{left:0,top:0}}get activeElement(){return this.el.nativeElement.nodeName.startsWith("P-")?tt(this.el.nativeElement,".p-component"):this.el.nativeElement}alignRight(){this.preAlign("right");let t=this.activeElement,n=T(t),o=(S(t)-S(this.container))/2;this.alignTooltip(n,o);let r=this.getArrowElement();r.style.top="50%",r.style.right=null,r.style.bottom=null,r.style.left="0"}alignLeft(){this.preAlign("left");let t=this.getArrowElement(),n=T(this.container),o=(S(this.el.nativeElement)-S(this.container))/2;this.alignTooltip(-n,o),t.style.top="50%",t.style.right="0",t.style.bottom=null,t.style.left=null}alignTop(){this.preAlign("top");let t=this.getArrowElement(),n=this.getHostOffset(),o=T(this.container),r=(T(this.el.nativeElement)-T(this.container))/2,s=S(this.container);this.alignTooltip(r,-s);let a=n.left-this.getHostOffset().left+o/2;t.style.top=null,t.style.right=null,t.style.bottom="0",t.style.left=a+"px"}getArrowElement(){return tt(this.container,'[data-pc-section="arrow"]')}alignBottom(){this.preAlign("bottom");let t=this.getArrowElement(),n=T(this.container),o=this.getHostOffset(),r=(T(this.el.nativeElement)-T(this.container))/2,s=S(this.el.nativeElement);this.alignTooltip(r,s);let a=o.left-this.getHostOffset().left+n/2;t.style.top="0",t.style.right=null,t.style.bottom=null,t.style.left=a+"px"}alignTooltip(t,n){let o=this.getHostOffset(),r=o.left+t,s=o.top+n;this.container.style.left=r+this.getOption("positionLeft")+"px",this.container.style.top=s+this.getOption("positionTop")+"px"}setOption(t){this._tooltipOptions=L(L({},this._tooltipOptions),t)}getOption(t){return this._tooltipOptions[t]}getTarget(t){return $(t,"p-inputwrapper")?tt(t,"input"):t}preAlign(t){this.container.style.left="-999px",this.container.style.top="-999px",this.container.className=this.cn(this.cx("root"),this.ptm("root")?.class,"p-tooltip-"+t,this.getOption("tooltipStyleClass"))}isOutOfBounds(){let t=this.container.getBoundingClientRect(),n=t.top,o=t.left,r=T(this.container),s=S(this.container),a=St();return o+r>a.width||o<0||n<0||n+s>a.height}onWindowResize(t){this.hide()}bindDocumentResizeListener(){this.zone.runOutsideAngular(()=>{this.resizeListener=this.onWindowResize.bind(this),window.addEventListener("resize",this.resizeListener)})}unbindDocumentResizeListener(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)}bindScrollListener(){this.scrollHandler||(this.scrollHandler=new kt(this.el.nativeElement,()=>{this.container&&this.hide()})),this.scrollHandler.bindScrollListener()}unbindScrollListener(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()}unbindEvents(){let t=this.getOption("tooltipEvent");if((t==="hover"||t==="both")&&(this.el.nativeElement.removeEventListener("mouseenter",this.mouseEnterListener),this.el.nativeElement.removeEventListener("mouseleave",this.mouseLeaveListener),this.el.nativeElement.removeEventListener("click",this.clickListener),this.el.nativeElement.removeEventListener("touchstart",this.touchStartListener),this.el.nativeElement.removeEventListener("touchend",this.touchEndListener),this.unbindDocumentTouchListener()),t==="focus"||t==="both"){let n=this.el.nativeElement.querySelector(".p-component");n||(n=this.getTarget(this.el.nativeElement)),n.removeEventListener("focus",this.focusListener),n.removeEventListener("blur",this.blurListener)}this.unbindDocumentResizeListener()}remove(){this.container&&this.container.parentElement&&(this.getOption("appendTo")==="body"?document.body.removeChild(this.container):this.getOption("appendTo")==="target"?this.el.nativeElement.removeChild(this.container):At(this.getOption("appendTo"),this.container)),this.unbindDocumentResizeListener(),this.unbindScrollListener(),this.unbindContainerMouseleaveListener(),this.unbindDocumentTouchListener(),this.clearTimeouts(),this.container=null,this.scrollHandler=null}clearShowTimeout(){this.showTimeout&&(clearTimeout(this.showTimeout),this.showTimeout=null)}clearHideTimeout(){this.hideTimeout&&(clearTimeout(this.hideTimeout),this.hideTimeout=null)}clearTimeouts(){this.clearShowTimeout(),this.clearHideTimeout()}onDestroy(){this.unbindEvents(),this.container&&it.clear(this.container),this.remove(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.documentEscapeListener&&this.documentEscapeListener()}static \u0275fac=function(n){return new(n||i)(ot(ft),ot(mt))};static \u0275dir=vt({type:i,selectors:[["","pTooltip",""]],inputs:{tooltipPosition:"tooltipPosition",tooltipEvent:"tooltipEvent",positionStyle:"positionStyle",tooltipStyleClass:"tooltipStyleClass",tooltipZIndex:"tooltipZIndex",escape:[2,"escape","escape",D],showDelay:[2,"showDelay","showDelay",B],hideDelay:[2,"hideDelay","hideDelay",B],life:[2,"life","life",B],positionTop:[2,"positionTop","positionTop",B],positionLeft:[2,"positionLeft","positionLeft",B],autoHide:[2,"autoHide","autoHide",D],fitContent:[2,"fitContent","fitContent",D],hideOnEscape:[2,"hideOnEscape","hideOnEscape",D],showOnEllipsis:[2,"showOnEllipsis","showOnEllipsis",D],content:[0,"pTooltip","content"],disabled:[0,"tooltipDisabled","disabled"],tooltipOptions:"tooltipOptions",appendTo:[1,"appendTo"],ptTooltip:[1,"ptTooltip"],pTooltipPT:[1,"pTooltipPT"],pTooltipUnstyled:[1,"pTooltipUnstyled"]},features:[z([Ft,{provide:Ht,useExisting:i},{provide:H,useExisting:i}]),k]})}return i})();var qt=`
    .p-avatar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: dt('avatar.width');
        height: dt('avatar.height');
        font-size: dt('avatar.font.size');
        background: dt('avatar.background');
        color: dt('avatar.color');
        border-radius: dt('avatar.border.radius');
    }

    .p-avatar-image {
        background: transparent;
    }

    .p-avatar-circle {
        border-radius: 50%;
    }

    .p-avatar-circle img {
        border-radius: 50%;
    }

    .p-avatar-icon {
        font-size: dt('avatar.icon.size');
        width: dt('avatar.icon.size');
        height: dt('avatar.icon.size');
    }

    .p-avatar img {
        width: 100%;
        height: 100%;
    }

    .p-avatar-lg {
        width: dt('avatar.lg.width');
        height: dt('avatar.lg.width');
        font-size: dt('avatar.lg.font.size');
    }

    .p-avatar-lg .p-avatar-icon {
        font-size: dt('avatar.lg.icon.size');
        width: dt('avatar.lg.icon.size');
        height: dt('avatar.lg.icon.size');
    }

    .p-avatar-xl {
        width: dt('avatar.xl.width');
        height: dt('avatar.xl.width');
        font-size: dt('avatar.xl.font.size');
    }

    .p-avatar-xl .p-avatar-icon {
        font-size: dt('avatar.xl.icon.size');
        width: dt('avatar.xl.icon.size');
        height: dt('avatar.xl.icon.size');
    }

    .p-avatar-group {
        display: flex;
        align-items: center;
    }

    .p-avatar-group .p-avatar + .p-avatar {
        margin-inline-start: dt('avatar.group.offset');
    }

    .p-avatar-group .p-avatar {
        border: 2px solid dt('avatar.group.border.color');
    }

    .p-avatar-group .p-avatar-lg + .p-avatar-lg {
        margin-inline-start: dt('avatar.lg.group.offset');
    }

    .p-avatar-group .p-avatar-xl + .p-avatar-xl {
        margin-inline-start: dt('avatar.xl.group.offset');
    }
`;var ae=["*"];function le(i,e){if(i&1&&(m(0,"span",3),p(1),v()),i&2){let t=g();x(t.cx("label")),c("pBind",t.ptm("label")),M("data-p",t.dataP),l(),h(t.label)}}function pe(i,e){if(i&1&&C(0,"span",5),i&2){let t=g(2);x(t.icon),c("pBind",t.ptm("icon"))("ngClass",t.cx("icon")),M("data-p",t.dataP)}}function ce(i,e){if(i&1&&b(0,pe,1,5,"span",4),i&2){let t=g(),n=at(5);c("ngIf",t.icon)("ngIfElse",n)}}function de(i,e){if(i&1){let t=xt();m(0,"img",7),wt("error",function(o){dt(t);let r=g(2);return ut(r.imageError(o))}),v()}if(i&2){let t=g(2);c("pBind",t.ptm("image"))("src",t.image,gt),M("aria-label",t.ariaLabel)("data-p",t.dataP)}}function ue(i,e){if(i&1&&b(0,de,1,4,"img",6),i&2){let t=g();c("ngIf",t.image)}}var he={root:({instance:i})=>["p-avatar p-component",{"p-avatar-image":i.image!=null,"p-avatar-circle":i.shape==="circle","p-avatar-lg":i.size==="large","p-avatar-xl":i.size==="xlarge"}],label:"p-avatar-label",icon:"p-avatar-icon"},Zt=(()=>{class i extends F{name="avatar";style=qt;classes=he;static \u0275fac=(()=>{let t;return function(o){return(t||(t=I(i)))(o||i)}})();static \u0275prov=N({token:i,factory:i.\u0275fac})}return i})();var Ut=new P("AVATAR_INSTANCE"),$t=(()=>{class i extends V{componentName="Avatar";$pcAvatar=f(Ut,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=f(E,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}label;icon;image;size="normal";shape="square";styleClass;ariaLabel;ariaLabelledBy;onImageError=new ht;_componentStyle=f(Zt);imageError(t){this.onImageError.emit(t)}get dataP(){return this.cn({[this.shape]:this.shape,[this.size]:this.size})}static \u0275fac=(()=>{let t;return function(o){return(t||(t=I(i)))(o||i)}})();static \u0275cmp=O({type:i,selectors:[["p-avatar"]],hostVars:5,hostBindings:function(n,o){n&2&&(M("aria-label",o.ariaLabel)("aria-labelledby",o.ariaLabelledBy)("data-p",o.dataP),x(o.cn(o.cx("root"),o.styleClass)))},inputs:{label:"label",icon:"icon",image:"image",size:"size",shape:"shape",styleClass:"styleClass",ariaLabel:"ariaLabel",ariaLabelledBy:"ariaLabelledBy"},outputs:{onImageError:"onImageError"},features:[z([Zt,{provide:Ut,useExisting:i},{provide:H,useExisting:i}]),Q([E]),k],ngContentSelectors:ae,decls:6,vars:2,consts:[["iconTemplate",""],["imageTemplate",""],[3,"pBind","class",4,"ngIf","ngIfElse"],[3,"pBind"],[3,"pBind","class","ngClass",4,"ngIf","ngIfElse"],[3,"pBind","ngClass"],[3,"pBind","src","error",4,"ngIf"],[3,"error","pBind","src"]],template:function(n,o){if(n&1&&(j(),G(0),b(1,le,2,5,"span",2)(2,ce,1,2,"ng-template",null,0,lt)(4,ue,1,1,"ng-template",null,1,lt)),n&2){let r=at(3);l(),c("ngIf",o.label)("ngIfElse",r)}},dependencies:[X,K,J,et,E],encapsulation:2,changeDetection:0})}return i})();var Wt=`
    .p-tag {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: dt('tag.primary.background');
        color: dt('tag.primary.color');
        font-size: dt('tag.font.size');
        font-weight: dt('tag.font.weight');
        padding: dt('tag.padding');
        border-radius: dt('tag.border.radius');
        gap: dt('tag.gap');
    }

    .p-tag-icon {
        font-size: dt('tag.icon.size');
        width: dt('tag.icon.size');
        height: dt('tag.icon.size');
    }

    .p-tag-rounded {
        border-radius: dt('tag.rounded.border.radius');
    }

    .p-tag-success {
        background: dt('tag.success.background');
        color: dt('tag.success.color');
    }

    .p-tag-info {
        background: dt('tag.info.background');
        color: dt('tag.info.color');
    }

    .p-tag-warn {
        background: dt('tag.warn.background');
        color: dt('tag.warn.color');
    }

    .p-tag-danger {
        background: dt('tag.danger.background');
        color: dt('tag.danger.color');
    }

    .p-tag-secondary {
        background: dt('tag.secondary.background');
        color: dt('tag.secondary.color');
    }

    .p-tag-contrast {
        background: dt('tag.contrast.background');
        color: dt('tag.contrast.color');
    }
`;var fe=["icon"],ge=["*"];function me(i,e){if(i&1&&C(0,"span",4),i&2){let t=g(2);x(t.cx("icon")),c("ngClass",t.icon)("pBind",t.ptm("icon"))}}function ve(i,e){if(i&1&&(Et(0),b(1,me,1,4,"span",3),bt()),i&2){let t=g();l(),c("ngIf",t.icon)}}function ye(i,e){}function Te(i,e){i&1&&b(0,ye,0,0,"ng-template")}function Ee(i,e){if(i&1&&(m(0,"span",2),b(1,Te,1,0,null,5),v()),i&2){let t=g();x(t.cx("icon")),c("pBind",t.ptm("icon")),l(),c("ngTemplateOutlet",t.iconTemplate||t._iconTemplate)}}var be={root:({instance:i})=>["p-tag p-component",{"p-tag-info":i.severity==="info","p-tag-success":i.severity==="success","p-tag-warn":i.severity==="warn","p-tag-danger":i.severity==="danger","p-tag-secondary":i.severity==="secondary","p-tag-contrast":i.severity==="contrast","p-tag-rounded":i.rounded}],icon:"p-tag-icon",label:"p-tag-label"},Qt=(()=>{class i extends F{name="tag";style=Wt;classes=be;static \u0275fac=(()=>{let t;return function(o){return(t||(t=I(i)))(o||i)}})();static \u0275prov=N({token:i,factory:i.\u0275fac})}return i})();var jt=new P("TAG_INSTANCE"),Gt=(()=>{class i extends V{componentName="Tag";$pcTag=f(jt,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=f(E,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}styleClass;severity;value;icon;rounded;iconTemplate;templates;_iconTemplate;_componentStyle=f(Qt);onAfterContentInit(){this.templates?.forEach(t=>{t.getType()==="icon"&&(this._iconTemplate=t.template)})}get dataP(){return this.cn({rounded:this.rounded,[this.severity]:this.severity})}static \u0275fac=(()=>{let t;return function(o){return(t||(t=I(i)))(o||i)}})();static \u0275cmp=O({type:i,selectors:[["p-tag"]],contentQueries:function(n,o,r){if(n&1&&Lt(r,fe,4)(r,Pt,4),n&2){let s;rt(s=st())&&(o.iconTemplate=s.first),rt(s=st())&&(o.templates=s)}},hostVars:3,hostBindings:function(n,o){n&2&&(M("data-p",o.dataP),x(o.cn(o.cx("root"),o.styleClass)))},inputs:{styleClass:"styleClass",severity:"severity",value:"value",icon:"icon",rounded:[2,"rounded","rounded",D]},features:[z([Qt,{provide:jt,useExisting:i},{provide:H,useExisting:i}]),Q([E]),k],ngContentSelectors:ge,decls:5,vars:6,consts:[[4,"ngIf"],[3,"class","pBind",4,"ngIf"],[3,"pBind"],[3,"class","ngClass","pBind",4,"ngIf"],[3,"ngClass","pBind"],[4,"ngTemplateOutlet"]],template:function(n,o){n&1&&(j(),G(0),b(1,ve,2,1,"ng-container",0)(2,Ee,2,4,"span",1),m(3,"span",2),p(4),v()),n&2&&(l(),c("ngIf",!o.iconTemplate&&!o._iconTemplate),l(),c("ngIf",o.iconTemplate||o._iconTemplate),l(),x(o.cx("label")),c("pBind",o.ptm("label")),l(),h(o.value))},dependencies:[X,K,J,Ot,et,E],encapsulation:2,changeDetection:0})}return i})();function xe(i,e){i&1&&(m(0,"span",2),p(1,"AI"),v())}var Kt=class i{transform(e){return e==null?"\u2014":e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}static \u0275fac=function(t){return new(t||i)};static \u0275pipe=U({name:"tokens",type:i,pure:!0})},Jt=class i{transform(e){if(!e)return"\u2014";let t=Date.now()-new Date(e).getTime(),n=Math.round(t/1e3);if(n<45)return"just now";let o=Math.round(n/60);if(o<60)return`${o} min ago`;let r=Math.round(o/60);return r<24?`${r} h ago`:new Date(e).toLocaleDateString()}static \u0275fac=function(t){return new(t||i)};static \u0275pipe=U({name:"ago",type:i,pure:!0})},Xt=class i{transform(e){return e?new Date(e).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"}):"\u2014"}static \u0275fac=function(t){return new(t||i)};static \u0275pipe=U({name:"clock",type:i,pure:!0})},Yt=class i{transform(e){return W(e??"")}static \u0275fac=function(t){return new(t||i)};static \u0275pipe=U({name:"title",type:i,pure:!0})};function we(i){switch(i){case"succeeded":case"approved":case"approved-with-reservation":case"delivered":case"done":case"accepted":case"ready":case"valid":case"pass":case"allowed":case"active":case"returned":case"closed":return"success";case"running":case"queued":case"in-progress":case"implementing":case"committed":case"proposed":case"open":case"started":case"resolved":case"step-resolution":case"ended":return"info";case"waiting-for-gate":case"pending":case"arch-pending":case"waiting":case"analyzing":case"triaged":case"no-next-step":return"warn";case"failed":case"rejected":case"reverted":case"blocked":case"cancelled":case"denied":case"fail":case"expired":return"danger";default:return"secondary"}}var te=class i{status=y.required();tone=A(()=>we(this.status()));label=A(()=>this.status().replace(/-/g," "));static \u0275fac=function(t){return new(t||i)};static \u0275cmp=O({type:i,selectors:[["sai-status"]],inputs:{status:[1,"status"]},decls:1,vars:3,consts:[[3,"value","severity","rounded"]],template:function(t,n){t&1&&C(0,"p-tag",0),t&2&&c("value",n.label())("severity",n.tone())("rounded",!0)},dependencies:[Gt],encapsulation:2})},ee=class i{actor=y.required();displayName=y(null);name=A(()=>this.displayName()??(this.actor().kind==="human"?W(this.actor().userId):W(this.actor().slug)));initials=A(()=>this.name().split(" ").map(e=>e[0]).join("").slice(0,2).toUpperCase());static \u0275fac=function(t){return new(t||i)};static \u0275cmp=O({type:i,selectors:[["sai-actor"]],inputs:{actor:[1,"actor"],displayName:[1,"displayName"]},decls:5,vars:7,consts:[[1,"inline-flex","items-center","gap-1.5","font-semibold","text-[0.86rem]","text-ink"],["size","normal",3,"label","shape","styleClass"],["title","This participant is an AI agent",1,"rounded-full","bg-ai-tint","px-1.5","text-[0.62rem]","font-bold","tracking-wide","text-ai"]],template:function(t,n){t&1&&(m(0,"span",0),C(1,"p-avatar",1),m(2,"span"),p(3),v(),yt(4,xe,2,0,"span",2),v()),t&2&&(It("is-agent",n.actor().kind==="agent"),l(),c("label",n.initials())("shape",n.actor().kind==="agent"?"square":"circle")("styleClass",n.actor().kind==="agent"?"sai-avatar-agent":"sai-avatar-human"),l(2),h(n.name()),l(),Tt(n.actor().kind==="agent"?4:-1))},dependencies:[$t],styles:["[_nghost-%COMP%]     .p-avatar{width:1.6rem;height:1.6rem;font-size:.62rem;font-weight:700}[_nghost-%COMP%]     .sai-avatar-human{background:var(--sai-primary-tint);color:var(--sai-primary-tint-text)}[_nghost-%COMP%]     .sai-avatar-agent{background:var(--sai-ai-tint);color:var(--sai-ai);border-radius:30%}"]})},ie=class i{provenance=y.required();static \u0275fac=function(t){return new(t||i)};static \u0275cmp=O({type:i,selectors:[["sai-provenance"]],inputs:{provenance:[1,"provenance"]},decls:28,vars:6,consts:[[1,"sai-fold","mt-1"],[1,"mt-1","grid","grid-cols-[auto_1fr]","gap-x-3","gap-y-0.5","text-[0.78rem]"],[1,"text-ink-light"],[1,"font-mono","text-ink-muted"]],template:function(t,n){t&1&&(d(0,"details",0)(1,"summary"),p(2,"Provenance"),u(),d(3,"dl",1)(4,"dt",2),p(5,"Agent"),u(),d(6,"dd",3),p(7),u(),d(8,"dt",2),p(9,"Model"),u(),d(10,"dd",3),p(11),u(),d(12,"dt",2),p(13,"Provider"),u(),d(14,"dd",3),p(15),u(),d(16,"dt",2),p(17,"Hosting class"),u(),d(18,"dd",3),p(19),u(),d(20,"dt",2),p(21,"Processing region"),u(),d(22,"dd",3),p(23),u(),d(24,"dt",2),p(25,"Model source"),u(),d(26,"dd",3),p(27),u()()()),t&2&&(l(7),h(n.provenance().agent),l(4),h(n.provenance().model),l(4),h(n.provenance().provider),l(4),h(n.provenance().hostingClass),l(4),h(n.provenance().region),l(4),h(n.provenance().source))},encapsulation:2})};function W(i){return i.split("-").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" ")}function _i(i,e=[]){return i.kind==="human"?e.find(t=>t.userId===i.userId)?.displayName??W(i.userId):W(i.slug)}function Mi(i){return i.slice(i.lastIndexOf("/")+1)}export{zt as a,it as b,He as c,Kt as d,Jt as e,Xt as f,Yt as g,te as h,ee as i,ie as j,_i as k,Mi as l};
