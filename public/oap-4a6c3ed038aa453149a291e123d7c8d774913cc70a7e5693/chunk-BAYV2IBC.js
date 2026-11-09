import{b as K}from"./chunk-PAUN7GER.js";import{e as Ct,f as Pt}from"./chunk-RBLNXPFX.js";import{$ as l,Aa as r,Ba as u,Bc as Mt,C as dt,Cb as V,Ec as b,F as s,Fb as wt,Gb as Lt,H as Y,Hb as Ot,I as ct,J as w,Ka as N,Kb as y,L as ut,M as I,N as j,Nb as ot,O as k,Ob as Q,P as T,Pb as It,Ra as nt,Rb as G,S as D,Ta as S,V as ht,Va as v,W as mt,Yb as O,Za as L,_a as A,a as F,aa as f,ba as g,bb as U,ca as _,cc as Dt,da as d,db as q,ea as c,fb as Et,fc as _t,ga as ft,gb as $,ha as gt,hb as xt,ja as vt,jc as St,k as C,kc as J,la as yt,m as P,ma as m,n as h,na as W,o as st,oa as Z,p as rt,pa as bt,ra as tt,sa as et,t as lt,u as pt,uc as B,va as it,wc as z,x as X,xa as Tt,xc as H,z as x,za as E}from"./chunk-R4V6FUGN.js";var kt=`
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
`;var ee={root:"p-tooltip p-component",arrow:"p-tooltip-arrow",text:"p-tooltip-text"},Nt=(()=>{class e extends B{name="tooltip";style=kt;classes=ee;static \u0275fac=(()=>{let t;return function(n){return(t||(t=x(e)))(n||e)}})();static \u0275prov=C({token:e,factory:e.\u0275fac})}return e})();var At=new P("TOOLTIP_INSTANCE"),Ne=(()=>{class e extends H{zone;viewContainer;componentName="Tooltip";$pcTooltip=h(At,{optional:!0,skipSelf:!0})??void 0;tooltipPosition;tooltipEvent="hover";positionStyle;tooltipStyleClass;tooltipZIndex;escape=!0;showDelay;hideDelay;life;positionTop;positionLeft;autoHide=!0;fitContent=!0;hideOnEscape=!0;showOnEllipsis=!1;content;get disabled(){return this._disabled}set disabled(t){this._disabled=t,this.deactivate()}tooltipOptions;appendTo=v(void 0);$appendTo=S(()=>this.appendTo()||this.config.overlayAppendTo());_tooltipOptions={tooltipLabel:null,tooltipPosition:"right",tooltipEvent:"hover",appendTo:"body",positionStyle:null,tooltipStyleClass:null,tooltipZIndex:"auto",escape:!0,disabled:null,showDelay:null,hideDelay:null,positionTop:null,positionLeft:null,life:null,autoHide:!0,hideOnEscape:!0,showOnEllipsis:!1,id:_t("pn_id_")+"_tooltip"};_disabled;container;styleClass;tooltipText;rootPTClasses="";showTimeout;hideTimeout;active;mouseEnterListener;mouseLeaveListener;containerMouseleaveListener;clickListener;focusListener;blurListener;touchStartListener;touchEndListener;documentTouchListener;documentEscapeListener;scrollHandler;resizeListener;_componentStyle=h(Nt);interactionInProgress=!1;ptTooltip=v();pTooltipPT=v();pTooltipUnstyled=v();constructor(t,i){super(),this.zone=t,this.viewContainer=i,X(()=>{let n=this.ptTooltip()||this.pTooltipPT();n&&this.directivePT.set(n)}),X(()=>{this.pTooltipUnstyled()&&this.directiveUnstyled.set(this.pTooltipUnstyled())})}onAfterViewInit(){xt(this.platformId)&&this.zone.runOutsideAngular(()=>{let t=this.getOption("tooltipEvent");if((t==="hover"||t==="both")&&(this.mouseEnterListener=this.onMouseEnter.bind(this),this.mouseLeaveListener=this.onMouseLeave.bind(this),this.clickListener=this.onInputClick.bind(this),this.el.nativeElement.addEventListener("mouseenter",this.mouseEnterListener),this.el.nativeElement.addEventListener("click",this.clickListener),this.el.nativeElement.addEventListener("mouseleave",this.mouseLeaveListener),this.touchStartListener=this.onTouchStart.bind(this),this.touchEndListener=this.onTouchEnd.bind(this),this.el.nativeElement.addEventListener("touchstart",this.touchStartListener,{passive:!0}),this.el.nativeElement.addEventListener("touchend",this.touchEndListener,{passive:!0})),t==="focus"||t==="both"){this.focusListener=this.onFocus.bind(this),this.blurListener=this.onBlur.bind(this);let i=this.el.nativeElement.querySelector(".p-component");i||(i=this.getTarget(this.el.nativeElement)),i.addEventListener("focus",this.focusListener),i.addEventListener("blur",this.blurListener)}})}onChanges(t){t.tooltipPosition&&this.setOption({tooltipPosition:t.tooltipPosition.currentValue}),t.tooltipEvent&&this.setOption({tooltipEvent:t.tooltipEvent.currentValue}),t.appendTo&&this.setOption({appendTo:t.appendTo.currentValue}),t.positionStyle&&this.setOption({positionStyle:t.positionStyle.currentValue}),t.tooltipStyleClass&&this.setOption({tooltipStyleClass:t.tooltipStyleClass.currentValue}),t.tooltipZIndex&&this.setOption({tooltipZIndex:t.tooltipZIndex.currentValue}),t.escape&&this.setOption({escape:t.escape.currentValue}),t.showDelay&&this.setOption({showDelay:t.showDelay.currentValue}),t.hideDelay&&this.setOption({hideDelay:t.hideDelay.currentValue}),t.life&&this.setOption({life:t.life.currentValue}),t.positionTop&&this.setOption({positionTop:t.positionTop.currentValue}),t.positionLeft&&this.setOption({positionLeft:t.positionLeft.currentValue}),t.disabled&&this.setOption({disabled:t.disabled.currentValue}),t.content&&(this.setOption({tooltipLabel:t.content.currentValue}),this.active&&(t.content.currentValue?this.container&&this.container.offsetParent?(this.updateText(),this.align()):this.show():this.hide())),t.autoHide&&this.setOption({autoHide:t.autoHide.currentValue}),t.showOnEllipsis&&this.setOption({showOnEllipsis:t.showOnEllipsis.currentValue}),t.id&&this.setOption({id:t.id.currentValue}),t.tooltipOptions&&(this._tooltipOptions=F(F({},this._tooltipOptions),t.tooltipOptions.currentValue),this.deactivate(),this.active&&(this.getOption("tooltipLabel")?this.container&&this.container.offsetParent?(this.updateText(),this.align()):this.show():this.hide()))}isAutoHide(){return this.getOption("autoHide")}onMouseEnter(t){!this.container&&!this.showTimeout&&this.activate()}onMouseLeave(t){this.isAutoHide()?this.deactivate():!(V(t.relatedTarget,"p-tooltip")||V(t.relatedTarget,"p-tooltip-text")||V(t.relatedTarget,"p-tooltip-arrow"))&&this.deactivate()}onTouchStart(t){!this.container&&!this.showTimeout&&(this.activate(),this.isAutoHide()||this.bindDocumentTouchListener())}onTouchEnd(t){this.isAutoHide()&&this.deactivate()}bindDocumentTouchListener(){this.documentTouchListener||(this.documentTouchListener=this.renderer.listen("document","touchstart",t=>{this.container&&!this.container.contains(t.target)&&!this.el.nativeElement.contains(t.target)&&(this.deactivate(),this.unbindDocumentTouchListener())}))}unbindDocumentTouchListener(){this.documentTouchListener&&(this.documentTouchListener(),this.documentTouchListener=null)}onFocus(t){this.activate()}onBlur(t){this.deactivate()}onInputClick(t){this.deactivate()}hasEllipsis(){let t=this.el.nativeElement;return t.offsetWidth<t.scrollWidth||t.offsetHeight<t.scrollHeight}activate(){if(!this.interactionInProgress){if(this.getOption("showOnEllipsis")&&!this.hasEllipsis())return;if(this.active=!0,this.clearHideTimeout(),this.getOption("showDelay")?this.showTimeout=setTimeout(()=>{this.show()},this.getOption("showDelay")):this.show(),this.getOption("life")){let t=this.getOption("showDelay")?this.getOption("life")+this.getOption("showDelay"):this.getOption("life");this.hideTimeout=setTimeout(()=>{this.hide()},t)}this.getOption("hideOnEscape")&&(this.documentEscapeListener=this.renderer.listen("document","keydown.escape",()=>{this.deactivate(),this.documentEscapeListener?.()})),this.interactionInProgress=!0}}deactivate(){this.interactionInProgress=!1,this.active=!1,this.clearShowTimeout(),this.getOption("hideDelay")?(this.clearHideTimeout(),this.hideTimeout=setTimeout(()=>{this.hide()},this.getOption("hideDelay"))):this.hide(),this.documentEscapeListener&&this.documentEscapeListener()}create(){this.container&&(this.clearHideTimeout(),this.remove()),this.container=Q("div",{class:this.cx("root"),"p-bind":this.ptm("root"),"data-pc-section":"root"}),this.container.setAttribute("role","tooltip");let t=Q("div",{class:this.cx("arrow"),"p-bind":this.ptm("arrow"),"data-pc-section":"arrow"});this.container.appendChild(t),this.tooltipText=Q("div",{class:this.cx("text"),"p-bind":this.ptm("text"),"data-pc-section":"text"}),this.updateText(),this.getOption("positionStyle")&&(this.container.style.position=this.getOption("positionStyle")),this.container.appendChild(this.tooltipText),this.getOption("appendTo")==="body"?document.body.appendChild(this.container):this.getOption("appendTo")==="target"?ot(this.container,this.el.nativeElement):ot(this.getOption("appendTo"),this.container),this.container.style.display="none",this.fitContent&&(this.container.style.width="fit-content"),this.isAutoHide()?this.container.style.pointerEvents="none":(this.container.style.pointerEvents="unset",this.bindContainerMouseleaveListener())}bindContainerMouseleaveListener(){if(!this.containerMouseleaveListener){let t=this.container??this.container.nativeElement;this.containerMouseleaveListener=this.renderer.listen(t,"mouseleave",i=>{this.deactivate()})}}unbindContainerMouseleaveListener(){this.containerMouseleaveListener&&(this.bindContainerMouseleaveListener(),this.containerMouseleaveListener=null)}show(){if(!this.getOption("tooltipLabel")||this.getOption("disabled"))return;this.create(),this.el.nativeElement.closest("p-dialog")?setTimeout(()=>{this.container&&(this.container.style.display="inline-block"),this.container&&this.align()},100):(this.container.style.display="inline-block",this.align()),It(this.container,250),this.getOption("tooltipZIndex")==="auto"?K.set("tooltip",this.container,this.config.zIndex.tooltip):this.container.style.zIndex=this.getOption("tooltipZIndex"),this.bindDocumentResizeListener(),this.bindScrollListener()}hide(){this.getOption("tooltipZIndex")==="auto"&&K.clear(this.container),this.remove()}updateText(){let t=this.getOption("tooltipLabel");if(t&&typeof t.createEmbeddedView=="function"){let i=this.viewContainer.createEmbeddedView(t);i.detectChanges(),i.rootNodes.forEach(n=>this.tooltipText.appendChild(n))}else this.getOption("escape")?(this.tooltipText.innerHTML="",this.tooltipText.appendChild(document.createTextNode(t))):this.tooltipText.innerHTML=t}align(){let t=this.getOption("tooltipPosition"),n={top:[this.alignTop,this.alignBottom,this.alignRight,this.alignLeft],bottom:[this.alignBottom,this.alignTop,this.alignRight,this.alignLeft],left:[this.alignLeft,this.alignRight,this.alignTop,this.alignBottom],right:[this.alignRight,this.alignLeft,this.alignTop,this.alignBottom]}[t]||[];for(let[a,p]of n.entries())if(a===0)p.call(this);else if(this.isOutOfBounds())p.call(this);else break}getHostOffset(){if(this.getOption("appendTo")==="body"||this.getOption("appendTo")==="target"){let t=this.el.nativeElement.getBoundingClientRect(),i=t.left+Lt(),n=t.top+Ot();return{left:i,top:n}}else return{left:0,top:0}}get activeElement(){return this.el.nativeElement.nodeName.startsWith("P-")?G(this.el.nativeElement,".p-component"):this.el.nativeElement}alignRight(){this.preAlign("right");let t=this.activeElement,i=y(t),n=(O(t)-O(this.container))/2;this.alignTooltip(i,n);let a=this.getArrowElement();a.style.top="50%",a.style.right=null,a.style.bottom=null,a.style.left="0"}alignLeft(){this.preAlign("left");let t=this.getArrowElement(),i=y(this.container),n=(O(this.el.nativeElement)-O(this.container))/2;this.alignTooltip(-i,n),t.style.top="50%",t.style.right="0",t.style.bottom=null,t.style.left=null}alignTop(){this.preAlign("top");let t=this.getArrowElement(),i=this.getHostOffset(),n=y(this.container),a=(y(this.el.nativeElement)-y(this.container))/2,p=O(this.container);this.alignTooltip(a,-p);let M=i.left-this.getHostOffset().left+n/2;t.style.top=null,t.style.right=null,t.style.bottom="0",t.style.left=M+"px"}getArrowElement(){return G(this.container,'[data-pc-section="arrow"]')}alignBottom(){this.preAlign("bottom");let t=this.getArrowElement(),i=y(this.container),n=this.getHostOffset(),a=(y(this.el.nativeElement)-y(this.container))/2,p=O(this.el.nativeElement);this.alignTooltip(a,p);let M=n.left-this.getHostOffset().left+i/2;t.style.top="0",t.style.right=null,t.style.bottom=null,t.style.left=M+"px"}alignTooltip(t,i){let n=this.getHostOffset(),a=n.left+t,p=n.top+i;this.container.style.left=a+this.getOption("positionLeft")+"px",this.container.style.top=p+this.getOption("positionTop")+"px"}setOption(t){this._tooltipOptions=F(F({},this._tooltipOptions),t)}getOption(t){return this._tooltipOptions[t]}getTarget(t){return V(t,"p-inputwrapper")?G(t,"input"):t}preAlign(t){this.container.style.left="-999px",this.container.style.top="-999px",this.container.className=this.cn(this.cx("root"),this.ptm("root")?.class,"p-tooltip-"+t,this.getOption("tooltipStyleClass"))}isOutOfBounds(){let t=this.container.getBoundingClientRect(),i=t.top,n=t.left,a=y(this.container),p=O(this.container),M=wt();return n+a>M.width||n<0||i<0||i+p>M.height}onWindowResize(t){this.hide()}bindDocumentResizeListener(){this.zone.runOutsideAngular(()=>{this.resizeListener=this.onWindowResize.bind(this),window.addEventListener("resize",this.resizeListener)})}unbindDocumentResizeListener(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)}bindScrollListener(){this.scrollHandler||(this.scrollHandler=new Mt(this.el.nativeElement,()=>{this.container&&this.hide()})),this.scrollHandler.bindScrollListener()}unbindScrollListener(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()}unbindEvents(){let t=this.getOption("tooltipEvent");if((t==="hover"||t==="both")&&(this.el.nativeElement.removeEventListener("mouseenter",this.mouseEnterListener),this.el.nativeElement.removeEventListener("mouseleave",this.mouseLeaveListener),this.el.nativeElement.removeEventListener("click",this.clickListener),this.el.nativeElement.removeEventListener("touchstart",this.touchStartListener),this.el.nativeElement.removeEventListener("touchend",this.touchEndListener),this.unbindDocumentTouchListener()),t==="focus"||t==="both"){let i=this.el.nativeElement.querySelector(".p-component");i||(i=this.getTarget(this.el.nativeElement)),i.removeEventListener("focus",this.focusListener),i.removeEventListener("blur",this.blurListener)}this.unbindDocumentResizeListener()}remove(){this.container&&this.container.parentElement&&(this.getOption("appendTo")==="body"?document.body.removeChild(this.container):this.getOption("appendTo")==="target"?this.el.nativeElement.removeChild(this.container):Dt(this.getOption("appendTo"),this.container)),this.unbindDocumentResizeListener(),this.unbindScrollListener(),this.unbindContainerMouseleaveListener(),this.unbindDocumentTouchListener(),this.clearTimeouts(),this.container=null,this.scrollHandler=null}clearShowTimeout(){this.showTimeout&&(clearTimeout(this.showTimeout),this.showTimeout=null)}clearHideTimeout(){this.hideTimeout&&(clearTimeout(this.hideTimeout),this.hideTimeout=null)}clearTimeouts(){this.clearShowTimeout(),this.clearHideTimeout()}onDestroy(){this.unbindEvents(),this.container&&K.clear(this.container),this.remove(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.documentEscapeListener&&this.documentEscapeListener()}static \u0275fac=function(i){return new(i||e)(Y(pt),Y(ct))};static \u0275dir=ut({type:e,selectors:[["","pTooltip",""]],inputs:{tooltipPosition:"tooltipPosition",tooltipEvent:"tooltipEvent",positionStyle:"positionStyle",tooltipStyleClass:"tooltipStyleClass",tooltipZIndex:"tooltipZIndex",escape:[2,"escape","escape",L],showDelay:[2,"showDelay","showDelay",A],hideDelay:[2,"hideDelay","hideDelay",A],life:[2,"life","life",A],positionTop:[2,"positionTop","positionTop",A],positionLeft:[2,"positionLeft","positionLeft",A],autoHide:[2,"autoHide","autoHide",L],fitContent:[2,"fitContent","fitContent",L],hideOnEscape:[2,"hideOnEscape","hideOnEscape",L],showOnEllipsis:[2,"showOnEllipsis","showOnEllipsis",L],content:[0,"pTooltip","content"],disabled:[0,"tooltipDisabled","disabled"],tooltipOptions:"tooltipOptions",appendTo:[1,"appendTo"],ptTooltip:[1,"ptTooltip"],pTooltipPT:[1,"pTooltipPT"],pTooltipUnstyled:[1,"pTooltipUnstyled"]},features:[N([Nt,{provide:At,useExisting:e},{provide:z,useExisting:e}]),k]})}return e})();var Ht=`
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
`;var oe=["*"];function ae(e,o){if(e&1&&(f(0,"span",3),r(1),g()),e&2){let t=m();E(t.cx("label")),l("pBind",t.ptm("label")),D("data-p",t.dataP),s(),u(t.label)}}function se(e,o){if(e&1&&_(0,"span",5),e&2){let t=m(2);E(t.icon),l("pBind",t.ptm("icon"))("ngClass",t.cx("icon")),D("data-p",t.dataP)}}function re(e,o){if(e&1&&T(0,se,1,5,"span",4),e&2){let t=m(),i=it(5);l("ngIf",t.icon)("ngIfElse",i)}}function le(e,o){if(e&1){let t=vt();f(0,"img",7),yt("error",function(n){st(t);let a=m(2);return rt(a.imageError(n))}),g()}if(e&2){let t=m(2);l("pBind",t.ptm("image"))("src",t.image,dt),D("aria-label",t.ariaLabel)("data-p",t.dataP)}}function pe(e,o){if(e&1&&T(0,le,1,4,"img",6),e&2){let t=m();l("ngIf",t.image)}}var de={root:({instance:e})=>["p-avatar p-component",{"p-avatar-image":e.image!=null,"p-avatar-circle":e.shape==="circle","p-avatar-lg":e.size==="large","p-avatar-xl":e.size==="xlarge"}],label:"p-avatar-label",icon:"p-avatar-icon"},Ft=(()=>{class e extends B{name="avatar";style=Ht;classes=de;static \u0275fac=(()=>{let t;return function(n){return(t||(t=x(e)))(n||e)}})();static \u0275prov=C({token:e,factory:e.\u0275fac})}return e})();var Vt=new P("AVATAR_INSTANCE"),Rt=(()=>{class e extends H{componentName="Avatar";$pcAvatar=h(Vt,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=h(b,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}label;icon;image;size="normal";shape="square";styleClass;ariaLabel;ariaLabelledBy;onImageError=new lt;_componentStyle=h(Ft);imageError(t){this.onImageError.emit(t)}get dataP(){return this.cn({[this.shape]:this.shape,[this.size]:this.size})}static \u0275fac=(()=>{let t;return function(n){return(t||(t=x(e)))(n||e)}})();static \u0275cmp=w({type:e,selectors:[["p-avatar"]],hostVars:5,hostBindings:function(i,n){i&2&&(D("aria-label",n.ariaLabel)("aria-labelledby",n.ariaLabelledBy)("data-p",n.dataP),E(n.cn(n.cx("root"),n.styleClass)))},inputs:{label:"label",icon:"icon",image:"image",size:"size",shape:"shape",styleClass:"styleClass",ariaLabel:"ariaLabel",ariaLabelledBy:"ariaLabelledBy"},outputs:{onImageError:"onImageError"},features:[N([Ft,{provide:Vt,useExisting:e},{provide:z,useExisting:e}]),j([b]),k],ngContentSelectors:oe,decls:6,vars:2,consts:[["iconTemplate",""],["imageTemplate",""],[3,"pBind","class",4,"ngIf","ngIfElse"],[3,"pBind"],[3,"pBind","class","ngClass",4,"ngIf","ngIfElse"],[3,"pBind","ngClass"],[3,"pBind","src","error",4,"ngIf"],[3,"error","pBind","src"]],template:function(i,n){if(i&1&&(W(),Z(0),T(1,ae,2,5,"span",2)(2,re,1,2,"ng-template",null,0,nt)(4,pe,1,1,"ng-template",null,1,nt)),i&2){let a=it(3);s(),l("ngIf",n.label)("ngIfElse",a)}},dependencies:[$,U,q,J,b],encapsulation:2,changeDetection:0})}return e})();var jt=`
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
`;var ce=["icon"],ue=["*"];function he(e,o){if(e&1&&_(0,"span",4),e&2){let t=m(2);E(t.cx("icon")),l("ngClass",t.icon)("pBind",t.ptm("icon"))}}function me(e,o){if(e&1&&(ft(0),T(1,he,1,4,"span",3),gt()),e&2){let t=m();s(),l("ngIf",t.icon)}}function fe(e,o){}function ge(e,o){e&1&&T(0,fe,0,0,"ng-template")}function ve(e,o){if(e&1&&(f(0,"span",2),T(1,ge,1,0,null,5),g()),e&2){let t=m();E(t.cx("icon")),l("pBind",t.ptm("icon")),s(),l("ngTemplateOutlet",t.iconTemplate||t._iconTemplate)}}var ye={root:({instance:e})=>["p-tag p-component",{"p-tag-info":e.severity==="info","p-tag-success":e.severity==="success","p-tag-warn":e.severity==="warn","p-tag-danger":e.severity==="danger","p-tag-secondary":e.severity==="secondary","p-tag-contrast":e.severity==="contrast","p-tag-rounded":e.rounded}],icon:"p-tag-icon",label:"p-tag-label"},Wt=(()=>{class e extends B{name="tag";style=jt;classes=ye;static \u0275fac=(()=>{let t;return function(n){return(t||(t=x(e)))(n||e)}})();static \u0275prov=C({token:e,factory:e.\u0275fac})}return e})();var Zt=new P("TAG_INSTANCE"),Ut=(()=>{class e extends H{componentName="Tag";$pcTag=h(Zt,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=h(b,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}styleClass;severity;value;icon;rounded;iconTemplate;templates;_iconTemplate;_componentStyle=h(Wt);onAfterContentInit(){this.templates?.forEach(t=>{t.getType()==="icon"&&(this._iconTemplate=t.template)})}get dataP(){return this.cn({rounded:this.rounded,[this.severity]:this.severity})}static \u0275fac=(()=>{let t;return function(n){return(t||(t=x(e)))(n||e)}})();static \u0275cmp=w({type:e,selectors:[["p-tag"]],contentQueries:function(i,n,a){if(i&1&&bt(a,ce,4)(a,St,4),i&2){let p;tt(p=et())&&(n.iconTemplate=p.first),tt(p=et())&&(n.templates=p)}},hostVars:3,hostBindings:function(i,n){i&2&&(D("data-p",n.dataP),E(n.cn(n.cx("root"),n.styleClass)))},inputs:{styleClass:"styleClass",severity:"severity",value:"value",icon:"icon",rounded:[2,"rounded","rounded",L]},features:[N([Wt,{provide:Zt,useExisting:e},{provide:z,useExisting:e}]),j([b]),k],ngContentSelectors:ue,decls:5,vars:6,consts:[[4,"ngIf"],[3,"class","pBind",4,"ngIf"],[3,"pBind"],[3,"class","ngClass","pBind",4,"ngIf"],[3,"ngClass","pBind"],[4,"ngTemplateOutlet"]],template:function(i,n){i&1&&(W(),Z(0),T(1,me,2,1,"ng-container",0)(2,ve,2,4,"span",1),f(3,"span",2),r(4),g()),i&2&&(s(),l("ngIf",!n.iconTemplate&&!n._iconTemplate),s(),l("ngIf",n.iconTemplate||n._iconTemplate),s(),E(n.cx("label")),l("pBind",n.ptm("label")),s(),u(n.value))},dependencies:[$,U,q,Et,J,b],encapsulation:2,changeDetection:0})}return e})();function be(e,o){e&1&&(f(0,"span",2),r(1,"AI"),g())}var qt=class e{transform(o){return o==null?"\u2014":o>=1e6?`${(o/1e6).toFixed(1)}M`:o>=1e3?`${(o/1e3).toFixed(1)}k`:String(o)}static \u0275fac=function(t){return new(t||e)};static \u0275pipe=I({name:"tokens",type:e,pure:!0})},$t=class e{transform(o){if(!o)return"\u2014";let t=Date.now()-new Date(o).getTime(),i=Math.round(t/1e3);if(i<45)return"just now";let n=Math.round(i/60);if(n<60)return`${n} min ago`;let a=Math.round(n/60);return a<24?`${a} h ago`:new Date(o).toLocaleDateString()}static \u0275fac=function(t){return new(t||e)};static \u0275pipe=I({name:"ago",type:e,pure:!0})},Qt=class e{transform(o){return o?new Date(o).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"}):"\u2014"}static \u0275fac=function(t){return new(t||e)};static \u0275pipe=I({name:"clock",type:e,pure:!0})},Gt=class e{transform(o){return R(o??"")}static \u0275fac=function(t){return new(t||e)};static \u0275pipe=I({name:"title",type:e,pure:!0})};function Te(e){switch(e){case"succeeded":case"approved":case"approved-with-reservation":case"delivered":case"done":case"accepted":case"ready":case"valid":case"pass":case"allowed":case"active":case"returned":case"closed":return"success";case"running":case"queued":case"in-progress":case"implementing":case"committed":case"proposed":case"open":case"started":case"resolved":case"step-resolution":case"ended":return"info";case"waiting-for-gate":case"pending":case"arch-pending":case"waiting":case"analyzing":case"triaged":case"no-next-step":return"warn";case"failed":case"rejected":case"reverted":case"blocked":case"cancelled":case"denied":case"fail":case"expired":return"danger";default:return"secondary"}}var Jt=class e{status=v.required();tone=S(()=>Te(this.status()));label=S(()=>this.status().replace(/-/g," "));static \u0275fac=function(t){return new(t||e)};static \u0275cmp=w({type:e,selectors:[["sai-status"]],inputs:{status:[1,"status"]},decls:1,vars:3,consts:[[3,"value","severity","rounded"]],template:function(t,i){t&1&&_(0,"p-tag",0),t&2&&l("value",i.label())("severity",i.tone())("rounded",!0)},dependencies:[Ut],encapsulation:2})},Kt=class e{actor=v.required();displayName=v(null);name=S(()=>this.displayName()??(this.actor().kind==="human"?R(this.actor().userId):R(this.actor().slug)));initials=S(()=>this.name().split(" ").map(o=>o[0]).join("").slice(0,2).toUpperCase());static \u0275fac=function(t){return new(t||e)};static \u0275cmp=w({type:e,selectors:[["sai-actor"]],inputs:{actor:[1,"actor"],displayName:[1,"displayName"]},decls:5,vars:7,consts:[[1,"inline-flex","items-center","gap-1.5","font-semibold","text-[0.86rem]","text-ink"],["size","normal",3,"label","shape","styleClass"],["title","This participant is an AI agent",1,"rounded-full","bg-ai-tint","px-1.5","text-[0.62rem]","font-bold","tracking-wide","text-ai"]],template:function(t,i){t&1&&(f(0,"span",0),_(1,"p-avatar",1),f(2,"span"),r(3),g(),ht(4,be,2,0,"span",2),g()),t&2&&(Tt("is-agent",i.actor().kind==="agent"),s(),l("label",i.initials())("shape",i.actor().kind==="agent"?"square":"circle")("styleClass",i.actor().kind==="agent"?"sai-avatar-agent":"sai-avatar-human"),s(2),u(i.name()),s(),mt(i.actor().kind==="agent"?4:-1))},dependencies:[Rt],styles:["[_nghost-%COMP%]     .p-avatar{width:1.6rem;height:1.6rem;font-size:.62rem;font-weight:700}[_nghost-%COMP%]     .sai-avatar-human{background:var(--sai-primary-tint);color:var(--sai-primary-tint-text)}[_nghost-%COMP%]     .sai-avatar-agent{background:var(--sai-ai-tint);color:var(--sai-ai);border-radius:30%}"]})},Xt=class e{provenance=v.required();static \u0275fac=function(t){return new(t||e)};static \u0275cmp=w({type:e,selectors:[["sai-provenance"]],inputs:{provenance:[1,"provenance"]},decls:28,vars:6,consts:[[1,"sai-fold","mt-1"],[1,"mt-1","grid","grid-cols-[auto_1fr]","gap-x-3","gap-y-0.5","text-[0.78rem]"],[1,"text-ink-light"],[1,"font-mono","text-ink-muted"]],template:function(t,i){t&1&&(d(0,"details",0)(1,"summary"),r(2,"Provenance"),c(),d(3,"dl",1)(4,"dt",2),r(5,"Agent"),c(),d(6,"dd",3),r(7),c(),d(8,"dt",2),r(9,"Model"),c(),d(10,"dd",3),r(11),c(),d(12,"dt",2),r(13,"Provider"),c(),d(14,"dd",3),r(15),c(),d(16,"dt",2),r(17,"Hosting class"),c(),d(18,"dd",3),r(19),c(),d(20,"dt",2),r(21,"Processing region"),c(),d(22,"dd",3),r(23),c(),d(24,"dt",2),r(25,"Model source"),c(),d(26,"dd",3),r(27),c()()()),t&2&&(s(7),u(i.provenance().agent),s(4),u(i.provenance().model),s(4),u(i.provenance().provider),s(4),u(i.provenance().hostingClass),s(4),u(i.provenance().region),s(4),u(i.provenance().source))},encapsulation:2})};function R(e){return e.split("-").map(o=>o.charAt(0).toUpperCase()+o.slice(1)).join(" ")}function Oi(e,o=[]){return e.kind==="human"?o.find(t=>t.userId===e.userId)?.displayName??R(e.userId):R(e.slug)}function Ii(e){return e.slice(e.lastIndexOf("/")+1)}var Yt=class e{transform(o){return Pt(o)}static \u0275fac=function(t){return new(t||e)};static \u0275pipe=I({name:"eur",type:e,pure:!0})},te=class e{transform(o){return Ct(o)}static \u0275fac=function(t){return new(t||e)};static \u0275pipe=I({name:"duration",type:e,pure:!0})};export{Ne as a,qt as b,$t as c,Qt as d,Gt as e,Jt as f,Kt as g,Xt as h,Oi as i,Ii as j,Yt as k,te as l};
