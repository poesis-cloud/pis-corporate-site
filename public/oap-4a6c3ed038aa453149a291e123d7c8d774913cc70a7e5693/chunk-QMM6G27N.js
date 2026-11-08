import{a as nt,b as it}from"./chunk-UXJ4F3TO.js";import{a as ke}from"./chunk-CF45SM7C.js";import{a as Je,b as Xe}from"./chunk-QQNBP3WH.js";import{a as Oe,c as Be,d as $e,f as A}from"./chunk-TY5PTPIG.js";import"./chunk-DEH7FAT3.js";import{a as qe}from"./chunk-XUAARKDW.js";import{b as Ye,c as et,d as tt}from"./chunk-WOVFA5UV.js";import{a as at}from"./chunk-YZQ7AUWV.js";import"./chunk-PQJ27I3W.js";import{$ as se,A as r,Aa as he,Ac as We,Bc as ze,Ca as xe,Cb as H,D as z,Da as L,Db as Ne,Ea as O,Fc as V,G as ie,H as ae,Ha as Z,I as y,Ia as G,Ja as ge,K as C,La as x,Mc as $,N as f,Na as P,Nb as K,O as _,Oc as Re,Q as re,Qa as E,R as I,Ra as we,S as M,Sc as je,T as c,Ta as be,Tc as Qe,U as s,V as o,Va as ve,W as w,Xa as ye,Xc as J,Ya as Ce,Zc as Ze,_ as oe,a as q,aa as F,ab as Te,ad as Ge,ba as b,c as X,cb as Se,da as v,ea as p,fa as le,fb as Ee,fc as U,ga as de,gd as He,h as Y,ha as pe,hb as Ie,ia as ce,j as ee,ja as k,jb as Me,k as S,ka as T,kc as B,l as m,lb as De,lc as Fe,ld as Ke,m as u,mb as Pe,n as te,pa as me,pd as Ue,qa as ue,r as W,ra as j,sa as d,ta as h,u as N,ua as D,v as ne,va as Q,vc as Le,w as R,xc as Ve,ya as fe,yc as Ae,za as _e}from"./chunk-FKE5A6C4.js";var rt=`
    .p-drawer {
        display: flex;
        flex-direction: column;
        transform: translate3d(0px, 0px, 0px);
        position: relative;
        transition: transform 0.3s;
        background: dt('drawer.background');
        color: dt('drawer.color');
        border-style: solid;
        border-color: dt('drawer.border.color');
        box-shadow: dt('drawer.shadow');
    }

    .p-drawer-content {
        overflow-y: auto;
        flex-grow: 1;
        padding: dt('drawer.content.padding');
    }

    .p-drawer-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-shrink: 0;
        padding: dt('drawer.header.padding');
    }

    .p-drawer-footer {
        padding: dt('drawer.footer.padding');
    }

    .p-drawer-title {
        font-weight: dt('drawer.title.font.weight');
        font-size: dt('drawer.title.font.size');
    }

    .p-drawer-full .p-drawer {
        transition: none;
        transform: none;
        width: 100vw !important;
        height: 100vh !important;
        max-height: 100%;
        top: 0px !important;
        left: 0px !important;
        border-width: 1px;
    }

    .p-drawer-left .p-drawer-enter-active {
        animation: p-animate-drawer-enter-left 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }
    .p-drawer-left .p-drawer-leave-active {
        animation: p-animate-drawer-leave-left 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }

    .p-drawer-right .p-drawer-enter-active {
        animation: p-animate-drawer-enter-right 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }
    .p-drawer-right .p-drawer-leave-active {
        animation: p-animate-drawer-leave-right 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }

    .p-drawer-top .p-drawer-enter-active {
        animation: p-animate-drawer-enter-top 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }
    .p-drawer-top .p-drawer-leave-active {
        animation: p-animate-drawer-leave-top 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }

    .p-drawer-bottom .p-drawer-enter-active {
        animation: p-animate-drawer-enter-bottom 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }
    .p-drawer-bottom .p-drawer-leave-active {
        animation: p-animate-drawer-leave-bottom 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }

    .p-drawer-full .p-drawer-enter-active {
        animation: p-animate-drawer-enter-full 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }
    .p-drawer-full .p-drawer-leave-active {
        animation: p-animate-drawer-leave-full 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }
    
    .p-drawer-left .p-drawer {
        width: 20rem;
        height: 100%;
        border-inline-end-width: 1px;
    }

    .p-drawer-right .p-drawer {
        width: 20rem;
        height: 100%;
        border-inline-start-width: 1px;
    }

    .p-drawer-top .p-drawer {
        height: 10rem;
        width: 100%;
        border-block-end-width: 1px;
    }

    .p-drawer-bottom .p-drawer {
        height: 10rem;
        width: 100%;
        border-block-start-width: 1px;
    }

    .p-drawer-left .p-drawer-content,
    .p-drawer-right .p-drawer-content,
    .p-drawer-top .p-drawer-content,
    .p-drawer-bottom .p-drawer-content {
        width: 100%;
        height: 100%;
    }

    .p-drawer-open {
        display: flex;
    }

    .p-drawer-mask:dir(rtl) {
        flex-direction: row-reverse;
    }

    @keyframes p-animate-drawer-enter-left {
        from {
            transform: translate3d(-100%, 0px, 0px);
        }
    }

    @keyframes p-animate-drawer-leave-left {
        to {
            transform: translate3d(-100%, 0px, 0px);
        }
    }

    @keyframes p-animate-drawer-enter-right {
        from {
            transform: translate3d(100%, 0px, 0px);
        }
    }

    @keyframes p-animate-drawer-leave-right {
        to {
            transform: translate3d(100%, 0px, 0px);
        }
    }

    @keyframes p-animate-drawer-enter-top {
        from {
            transform: translate3d(0px, -100%, 0px);
        }
    }

    @keyframes p-animate-drawer-leave-top {
        to {
            transform: translate3d(0px, -100%, 0px);
        }
    }

    @keyframes p-animate-drawer-enter-bottom {
        from {
            transform: translate3d(0px, 100%, 0px);
        }
    }

    @keyframes p-animate-drawer-leave-bottom {
        to {
            transform: translate3d(0px, 100%, 0px);
        }
    }

    @keyframes p-animate-drawer-enter-full {
        from {
            opacity: 0;
            transform: scale(0.93);
        }
    }

    @keyframes p-animate-drawer-leave-full {
        to {
            opacity: 0;
            transform: scale(0.93);
        }
    }
`;var ft=["header"],_t=["footer"],ht=["content"],xt=["closeicon"],gt=["headless"],wt=["container"],bt=["closeButton"],vt=["*"];function yt(t,n){t&1&&F(0)}function Ct(t,n){if(t&1&&y(0,yt,1,0,"ng-container",4),t&2){let e=p(2);c("ngTemplateOutlet",e.headlessTemplate||e._headlessTemplate)}}function kt(t,n){t&1&&F(0)}function Tt(t,n){if(t&1&&(s(0,"div",9),d(1),o()),t&2){let e=p(3);j(e.cx("title")),c("pBind",e.ptm("title")),r(),h(e.header)}}function St(t,n){t&1&&(te(),w(0,"svg",12)),t&2&&C("data-pc-section","closeicon")}function Et(t,n){}function It(t,n){t&1&&y(0,Et,0,0,"ng-template")}function Mt(t,n){if(t&1&&y(0,St,1,1,"svg",11)(1,It,1,0,null,4),t&2){let e=p(4);c("ngIf",!e.closeIconTemplate&&!e._closeIconTemplate),r(),c("ngTemplateOutlet",e.closeIconTemplate||e._closeIconTemplate)}}function Dt(t,n){if(t&1){let e=b();s(0,"p-button",10),v("onClick",function(a){m(e);let l=p(3);return u(l.close(a))})("keydown.enter",function(a){m(e);let l=p(3);return u(l.close(a))}),y(1,Mt,2,2,"ng-template",null,1,ge),o()}if(t&2){let e=p(3);c("pt",e.ptm("pcCloseButton"))("ngClass",e.cx("pcCloseButton"))("buttonProps",e.closeButtonProps)("ariaLabel",e.ariaCloseLabel)("unstyled",e.unstyled()),C("data-pc-group-section","iconcontainer")}}function Pt(t,n){t&1&&F(0)}function Nt(t,n){t&1&&F(0)}function Ft(t,n){if(t&1&&(oe(0),s(1,"div",5),y(2,Nt,1,0,"ng-container",4),o(),se()),t&2){let e=p(3);r(),c("pBind",e.ptm("footer"))("ngClass",e.cx("footer")),C("data-pc-section","footer"),r(),c("ngTemplateOutlet",e.footerTemplate||e._footerTemplate)}}function Lt(t,n){if(t&1&&(s(0,"div",5),y(1,kt,1,0,"ng-container",4)(2,Tt,2,4,"div",6)(3,Dt,3,6,"p-button",7),o(),s(4,"div",5),de(5),y(6,Pt,1,0,"ng-container",4),o(),y(7,Ft,3,4,"ng-container",8)),t&2){let e=p(2);c("pBind",e.ptm("header"))("ngClass",e.cx("header")),C("data-pc-section","header"),r(),c("ngTemplateOutlet",e.headerTemplate||e._headerTemplate),r(),c("ngIf",e.header),r(),c("ngIf",e.showCloseIcon&&e.closable),r(),c("pBind",e.ptm("content"))("ngClass",e.cx("content")),C("data-pc-section","content"),r(2),c("ngTemplateOutlet",e.contentTemplate||e._contentTemplate),r(),c("ngIf",e.footerTemplate||e._footerTemplate)}}function Vt(t,n){if(t&1){let e=b();s(0,"div",3,0),v("pMotionOnBeforeEnter",function(a){m(e);let l=p();return u(l.onBeforeEnter(a))})("pMotionOnAfterLeave",function(a){m(e);let l=p();return u(l.onAfterLeave(a))})("keydown",function(a){m(e);let l=p();return u(l.onKeyDown(a))}),f(2,Ct,1,1,"ng-container")(3,Lt,8,11),o()}if(t&2){let e=p();ue(e.style),j(e.cn(e.cx("root"),e.styleClass)),c("pBind",e.ptm("root"))("pMotion",e.visible)("pMotionAppear",!0)("pMotionEnterActiveClass",e.$enterAnimation())("pMotionLeaveActiveClass",e.$leaveAnimation())("pMotionOptions",e.computedMotionOptions()),C("data-p",e.dataP)("data-p-open",e.visible),r(2),_(e.headlessTemplate||e._headlessTemplate?2:3)}}var At=`
${rt}

/** For PrimeNG **/
.p-drawer {
    position: fixed;
}

.p-drawer-left {
    top: 0;
    left: 0;
    width: 20rem;
    height: 100%;
    border-inline-end-width: 1px;
}

.p-drawer-right {
    top: 0;
    right: 0;
    width: 20rem;
    height: 100%;
    border-inline-start-width: 1px;
}

.p-drawer-top {
    top: 0;
    left: 0;
    width: 100%;
    height: 10rem;
    border-block-end-width: 1px;
}

.p-drawer-bottom {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 10rem;
    border-block-start-width: 1px;
}

.p-drawer-full {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    -webkit-transition: none;
    transition: none;
}

/* Animations */
.p-drawer-enter-left {
    animation: p-animate-drawer-enter-left 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-leave-left {
    animation: p-animate-drawer-leave-left 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-enter-right {
    animation: p-animate-drawer-enter-right 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-leave-right {
    animation: p-animate-drawer-leave-right 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-enter-top {
    animation: p-animate-drawer-enter-top 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-leave-top {
    animation: p-animate-drawer-leave-top 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-enter-bottom {
    animation: p-animate-drawer-enter-bottom 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-leave-bottom {
    animation: p-animate-drawer-leave-bottom 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-enter-full {
    animation: p-animate-drawer-enter-full 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-leave-full {
    animation: p-animate-drawer-leave-full 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}
`,Wt={mask:({instance:t})=>["p-drawer-mask",{"p-overlay-mask p-overlay-mask-enter-active":t.modal},{"p-drawer-full":t.fullScreen()}],root:({instance:t})=>["p-drawer p-component",{"p-drawer-full":t.fullScreen(),"p-drawer-open":t.visible},`p-drawer-${t.position()}`],header:"p-drawer-header",title:"p-drawer-title",pcCloseButton:"p-drawer-close-button",content:"p-drawer-content",footer:"p-drawer-footer"},ot=(()=>{class t extends Le{name="drawer";style=At;classes=Wt;static \u0275fac=(()=>{let e;return function(a){return(e||(e=R(t)))(a||t)}})();static \u0275prov=Y({token:t,factory:t.\u0275fac})}return t})();var st=new ee("DRAWER_INSTANCE"),lt=(()=>{class t extends Ae{componentName="Drawer";$pcDrawer=S(st,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=S(V,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("host"))}appendTo=P(void 0);motionOptions=P(void 0);computedMotionOptions=x(()=>q(q({},this.ptm("motion")),this.motionOptions()));blockScroll=!1;style;styleClass;ariaCloseLabel;autoZIndex=!0;baseZIndex=0;modal=!0;closeButtonProps={severity:"secondary",text:!0,rounded:!0};dismissible=!0;showCloseIcon=!0;closeOnEscape=!0;transitionOptions="150ms cubic-bezier(0, 0, 0.2, 1)";get visible(){return this._visible??!1}set visible(e){this._visible=e,this._visible&&!this.modalVisible&&(this.modalVisible=!0)}position=P("left");fullScreen=P(!1);$enterAnimation=x(()=>this.fullScreen()?"p-drawer-enter-full":`p-drawer-enter-${this.position()}`);$leaveAnimation=x(()=>this.fullScreen()?"p-drawer-leave-full":`p-drawer-leave-${this.position()}`);header;maskStyle;closable=!0;onShow=new W;onHide=new W;visibleChange=new W;containerViewChild;closeButtonViewChild;initialized;_visible;_position="left";_fullScreen=!1;modalVisible=!1;container;mask;maskClickListener;documentEscapeListener;animationEndListener;_componentStyle=S(ot);onAfterViewInit(){this.initialized=!0}headerTemplate;footerTemplate;contentTemplate;closeIconTemplate;headlessTemplate;$appendTo=x(()=>this.appendTo()||this.config.overlayAppendTo());_headerTemplate;_footerTemplate;_contentTemplate;_closeIconTemplate;_headlessTemplate;templates;onAfterContentInit(){this.templates?.forEach(e=>{switch(e.getType()){case"content":this._contentTemplate=e.template;break;case"header":this._headerTemplate=e.template;break;case"footer":this._footerTemplate=e.template;break;case"closeicon":this._closeIconTemplate=e.template;break;case"headless":this._headlessTemplate=e.template;break;default:this._contentTemplate=e.template;break}})}onKeyDown(e){e.code==="Escape"&&this.hide(!1)}show(){this.container?.setAttribute(this.$attrSelector,""),this.autoZIndex&&A.set("modal",this.container,this.baseZIndex||this.config.zIndex.modal),this.modal&&this.enableModality(),this.onShow.emit({}),this.visibleChange.emit(!0)}hide(e=!0){e&&this.onHide.emit({}),this.modal&&this.disableModality()}close(e){this.hide(),this.visibleChange.emit(!1),this.cd.markForCheck(),e.preventDefault()}enableModality(){let e=this.document.querySelectorAll('[data-p-open="true"]'),i=e.length,a=i==1?String(parseInt(this.container.style.zIndex)-1):String(parseInt(e[i-1].style.zIndex)-1);if(!this.mask){if(this.mask=this.renderer.createElement("div"),this.mask){let l=`z-index: ${a};${this.getMaskStyle()}`;U(this.mask,"style",l),U(this.mask,"data-p",this.dataP),H(this.mask,this.cx("mask"))}this.dismissible&&(this.maskClickListener=this.renderer.listen(this.mask,"click",l=>{this.dismissible&&this.close(l)})),this.renderer.appendChild(this.document.body,this.mask),this.blockScroll&&We()}}getMaskStyle(){return this.maskStyle?Object.entries(this.maskStyle).map(([e,i])=>`${e}: ${i}`).join("; "):""}disableModality(){this.mask&&(!this.$unstyled()&&Ne(this.mask,"p-overlay-mask-enter-active"),!this.$unstyled()&&H(this.mask,"p-overlay-mask-leave-active"),this.animationEndListener=this.renderer.listen(this.mask,"animationend",this.destroyModal.bind(this)))}destroyModal(){this.unbindMaskClickListener(),this.mask&&this.renderer.removeChild(this.document.body,this.mask),this.blockScroll&&ze(),this.unbindAnimationEndListener(),this.mask=null}onBeforeEnter(e){this.container=e.element,this.appendContainer(),this.show(),this.closeOnEscape&&this.bindDocumentEscapeListener()}onAfterLeave(){this.hide(!1),A.clear(this.container),this.unbindGlobalListeners(),this.modalVisible=!1,this.container=null}appendContainer(){this.$appendTo()&&this.$appendTo()!=="self"&&(this.$appendTo()==="body"?K(this.document.body,this.container):K(this.$appendTo(),this.container))}bindDocumentEscapeListener(){let e=this.el?this.el.nativeElement.ownerDocument:this.document;this.documentEscapeListener=this.renderer.listen(e,"keydown",i=>{i.which==27&&parseInt(this.container?.style.zIndex)===A.get(this.container)&&this.close(i)})}unbindDocumentEscapeListener(){this.documentEscapeListener&&(this.documentEscapeListener(),this.documentEscapeListener=null)}unbindMaskClickListener(){this.maskClickListener&&(this.maskClickListener(),this.maskClickListener=null)}unbindGlobalListeners(){this.unbindMaskClickListener(),this.unbindDocumentEscapeListener()}unbindAnimationEndListener(){this.animationEndListener&&this.mask&&(this.animationEndListener(),this.animationEndListener=null)}onDestroy(){this.initialized=!1,this.visible&&this.modal&&this.destroyModal(),this.$appendTo()&&this.container&&this.renderer.appendChild(this.el.nativeElement,this.container),this.container&&this.autoZIndex&&A.clear(this.container),this.container=null,this.unbindGlobalListeners(),this.unbindAnimationEndListener()}get dataP(){return this.cn({"full-screen":this.position()==="full",[this.position()]:this.position(),open:this.visible,modal:this.modal})}static \u0275fac=(()=>{let e;return function(a){return(e||(e=R(t)))(a||t)}})();static \u0275cmp=z({type:t,selectors:[["p-drawer"]],contentQueries:function(i,a,l){if(i&1&&pe(l,ft,4)(l,_t,4)(l,ht,4)(l,xt,4)(l,gt,4)(l,B,4),i&2){let g;k(g=T())&&(a.headerTemplate=g.first),k(g=T())&&(a.footerTemplate=g.first),k(g=T())&&(a.contentTemplate=g.first),k(g=T())&&(a.closeIconTemplate=g.first),k(g=T())&&(a.headlessTemplate=g.first),k(g=T())&&(a.templates=g)}},viewQuery:function(i,a){if(i&1&&ce(wt,5)(bt,5),i&2){let l;k(l=T())&&(a.containerViewChild=l.first),k(l=T())&&(a.closeButtonViewChild=l.first)}},inputs:{appendTo:[1,"appendTo"],motionOptions:[1,"motionOptions"],blockScroll:[2,"blockScroll","blockScroll",E],style:"style",styleClass:"styleClass",ariaCloseLabel:"ariaCloseLabel",autoZIndex:[2,"autoZIndex","autoZIndex",E],baseZIndex:[2,"baseZIndex","baseZIndex",we],modal:[2,"modal","modal",E],closeButtonProps:"closeButtonProps",dismissible:[2,"dismissible","dismissible",E],showCloseIcon:[2,"showCloseIcon","showCloseIcon",E],closeOnEscape:[2,"closeOnEscape","closeOnEscape",E],transitionOptions:"transitionOptions",visible:"visible",position:[1,"position"],fullScreen:[1,"fullScreen"],header:"header",maskStyle:"maskStyle",closable:[2,"closable","closable",E]},outputs:{onShow:"onShow",onHide:"onHide",visibleChange:"visibleChange"},features:[xe([ot,{provide:st,useExisting:t},{provide:Ve,useExisting:t}]),ie([V]),ae],ngContentSelectors:vt,decls:1,vars:1,consts:[["container",""],["icon",""],["role","complementary","pFocusTrap","",3,"pBind","pMotion","pMotionAppear","pMotionEnterActiveClass","pMotionLeaveActiveClass","pMotionOptions","class","style"],["role","complementary","pFocusTrap","",3,"pMotionOnBeforeEnter","pMotionOnAfterLeave","keydown","pBind","pMotion","pMotionAppear","pMotionEnterActiveClass","pMotionLeaveActiveClass","pMotionOptions"],[4,"ngTemplateOutlet"],[3,"pBind","ngClass"],[3,"pBind","class",4,"ngIf"],[3,"pt","ngClass","buttonProps","ariaLabel","unstyled","onClick","keydown.enter",4,"ngIf"],[4,"ngIf"],[3,"pBind"],[3,"onClick","keydown.enter","pt","ngClass","buttonProps","ariaLabel","unstyled"],["data-p-icon","times",4,"ngIf"],["data-p-icon","times"]],template:function(i,a){i&1&&(le(),f(0,Vt,4,13,"div",2)),i&2&&_(a.modalVisible?0:-1)},dependencies:[Ce,be,ve,ye,$,Oe,Fe,V,Xe,Je,$e,Be],encapsulation:2,changeDetection:0})}return t})();var zt=()=>["/organization","browse"],Ot=()=>({path:"organization/conf/workspace.conf.yaml"}),pt=()=>["/workspace"],ct=t=>({path:t}),Bt=t=>["/supervisor","runs",t],$t=(t,n)=>n.slug,qt=(t,n)=>n.gate.id,mt=(t,n)=>n.path,Rt=(t,n)=>n.id;function jt(t,n){if(t&1&&w(0,"sai-gate-card",23),t&2){let e=n.$implicit;c("run",e.run)("gate",e.gate)}}function Qt(t,n){if(t&1&&(s(0,"section",13)(1,"h2",22),d(2,"Waiting for you"),o(),s(3,"div",21),I(4,jt,1,2,"sai-gate-card",23,qt),o()()),t&2){let e=p(2);r(4),M(e.store.gatesWaitingForMe())}}function Zt(t,n){if(t&1){let e=b();s(0,"p-button",24),Z(1,"title"),v("onClick",function(){let a=m(e).$implicit,l=p(2);return u(l.itemType.set(a.slug))}),o()}if(t&2){let e=n.$implicit,i=p(2);c("label",G(1,3,e.slug)+" "+i.countOf(e.slug))("outlined",e.slug!==i.itemType()),C("aria-selected",e.slug===i.itemType())}}function Gt(t,n){t&1&&(s(0,"span",31),d(1,"\u2605"),o())}function Ht(t,n){if(t&1&&(s(0,"span"),d(1),o()),t&2){let e=p().$implicit;r(),Q("",e.runIds.length," run",e.runIds.length>1?"s":"")}}function Kt(t,n){t&1&&w(0,"p-tag",34),t&2&&c("rounded",!0)}function Ut(t,n){if(t&1){let e=b();s(0,"button",28),v("click",function(){let a=m(e).$implicit,l=p(3);return u(l.openItem(a))}),s(1,"div",29)(2,"span",30),d(3),o(),f(4,Gt,2,0,"span",31),o(),s(5,"div",32),d(6),o(),s(7,"div",33),f(8,Ht,2,2,"span"),f(9,Kt,1,1,"p-tag",34),o()()}if(t&2){let e=n.$implicit,i=p(3);r(3),h(e.itemId??""),r(),_(e.structurant?4:-1),r(2),h(e.title),r(2),_(e.runIds.length?8:-1),r(),_(i.gateFor(e)?9:-1)}}function Jt(t,n){if(t&1&&(s(0,"div",19)(1,"div",25)(2,"span"),d(3),o(),s(4,"span",26),d(5),o()(),I(6,Ut,10,5,"button",27,mt),o()),t&2){let e=n.$implicit,i=p(2);r(3),h(e.replace("-"," ")),r(2),h(i.itemsIn(e).length),r(),M(i.itemsIn(e))}}function Xt(t,n){t&1&&w(0,"p-tag",39),t&2&&c("rounded",!0)}function Yt(t,n){if(t&1&&w(0,"sai-gate-card",23),t&2){let e=n;c("run",e.run)("gate",e.gate)}}function en(t,n){t&1&&(s(0,"p",42),d(1,"No run has touched this item yet."),o())}function tn(t,n){if(t&1){let e=b();s(0,"li",46)(1,"a",47),v("click",function(){m(e);let a=p(4);return u(a.drawerOpen.set(!1))}),d(2),Z(3,"title"),o(),w(4,"sai-status",37),o()}if(t&2){let e=n.$implicit;r(),c("routerLink",O(5,Bt,e.id)),r(),h(G(3,3,e.workflowSlug)),r(2),c("status",e.status)}}function nn(t,n){if(t&1&&(s(0,"ul",43),I(1,tn,5,7,"li",46,Rt),o()),t&2){let e=p(),i=p(2);r(),M(i.runsFor(e))}}function an(t,n){if(t&1){let e=b();s(0,"li",44)(1,"a",48),v("click",function(){m(e);let a=p(3);return u(a.drawerOpen.set(!1))}),d(2),o(),s(3,"span",49),d(4),o()()}if(t&2){let e=n.$implicit,i=p(3);r(),c("routerLink",L(4,pt))("queryParams",O(5,ct,e.path)),r(),h(i.fileName(e.path)),r(2),D("v",e.versions.length)}}function rn(t,n){if(t&1){let e=b();s(0,"div",21)(1,"h2",35),d(2),o(),s(3,"div",36),w(4,"sai-status",37)(5,"p-tag",38),f(6,Xt,1,1,"p-tag",39),o(),s(7,"a",40),v("click",function(){m(e);let a=p(2);return u(a.drawerOpen.set(!1))}),d(8),o(),f(9,Yt,1,2,"sai-gate-card",23),s(10,"h3",41),d(11,"Runs"),o(),f(12,en,2,0,"p",42)(13,nn,3,0,"ul",43),s(14,"h3",41),d(15,"Artifacts in this folder"),o(),s(16,"ul",43),I(17,an,5,7,"li",44,mt),o(),s(19,"p",45),d(20," Steps, agents and models are folded in the run detail; any member can unfold them (F5-R5). "),o()()}if(t&2){let e,i=n,a=p(2);r(2),Q("",i.itemId," \u2014 ",i.title),r(2),c("status",i.status),r(),c("value",i.type)("rounded",!0),r(),_(i.structurant?6:-1),r(),c("routerLink",L(11,pt))("queryParams",O(12,ct,i.path)),r(),h(i.path),r(),_((e=a.gateFor(i))?9:-1,e),r(3),_(a.runsFor(i).length===0?12:13),r(5),M(a.folderArtifacts(i))}}function on(t,n){if(t&1){let e=b();f(0,Qt,6,0,"section",13),s(1,"div",14)(2,"div",15),I(3,Zt,2,5,"p-button",16,$t),o(),s(5,"input",17),v("ngModelChange",function(a){m(e);let l=p();return u(l.query.set(a))}),o()(),s(6,"div",18),I(7,Jt,8,2,"div",19,re),o(),s(9,"p-drawer",20),he("visibleChange",function(a){m(e);let l=p();return _e(l.drawerOpen,a)||(l.drawerOpen=a),u(a)}),f(10,rn,21,14,"div",21),o()}if(t&2){let e,i=p();_(i.store.gatesWaitingForMe().length>0?0:-1),r(3),M(i.presentTypes()),r(2),c("ngModel",i.query()),r(2),M(i.statuses()),r(2),fe("visible",i.drawerOpen),c("modal",!0),r(),_((e=i.drawerItem())?10:-1,e)}}function sn(t,n){if(t&1&&(s(0,"span",61),d(1),o()),t&2){let e=p().$implicit;r(),h(e.data.artifact)}}function ln(t,n){if(t&1&&(s(0,"span",59)(1,"span",60),d(2),o(),f(3,sn,2,1,"span",61),o()),t&2){let e=n.$implicit;me("italic",e.data==null?null:e.data.expected)("text-ink-light",e.data==null?null:e.data.expected),c("title",(e.data==null?null:e.data.description)||e.label),r(2),h(e.label),r(),_((e.data==null?null:e.data.kind)==="file"&&(e.data!=null&&e.data.artifact)?3:-1)}}function dn(t,n){if(t&1){let e=b();s(0,"sai-artifact-viewer",62),v("discuss",function(a){m(e);let l=p(2);return u(l.discuss(a))}),o()}if(t&2){let e=p(2);c("artifact",n)("kind",e.selectedKind())}}function pn(t,n){if(t&1&&(s(0,"div",58),w(1,"i",63),s(2,"p",64),d(3,"Pick an artifact in the tree to read it in its native format, with its history."),o(),s(4,"p",45),d(5),s(6,"span",5),d(7,"organization/"),o(),d(8,") is browsed in "),s(9,"a",65),d(10,"Organization"),o(),d(11,". "),o()()),t&2){let e=p(2);r(5),D(" Folders and files follow the organization's workspace structure map; italic entries are slots the map requires that no run has filled yet. The organization itself (",e.store.organizationFileCount()," files under ")}}function cn(t,n){if(t&1){let e=b();s(0,"div",12)(1,"aside",50)(2,"div",51)(3,"span"),d(4),o(),s(5,"span",52),d(6),o()(),s(7,"div",53)(8,"p-tree",54),v("onNodeSelect",function(a){m(e);let l=p();return u(l.onSelect(a))}),y(9,ln,4,7,"ng-template",55),o()()(),s(10,"section",56),f(11,dn,1,2,"sai-artifact-viewer",57)(12,pn,12,1,"div",58),o()()}if(t&2){let e,i=p();r(4),D("",i.counts().present," artifacts"),r(2),D("",i.counts().expected," expected by the map"),r(2),c("value",i.treeNodes())("selection",i.treeSelection())("filter",!0),r(3),_((e=i.selected())?11:12,e)}}var dt=class t{store=S(Ue);route=S(Me);router=S(De);view=P("explorer");selectedPath=ke(this.route.queryParamMap.pipe(X(n=>n.get("path"))),{initialValue:null});treeNodes=x(()=>this.store.tree().map(n=>this.toNode(n,0)));treeSelection=N(null);counts=x(()=>He(this.store.tree()));selected=x(()=>{let n=this.selectedPath();return n?this.store.artifacts().find(e=>e.path===n)??null:null});selectedKind=x(()=>this.selectedPath()?Ge(this.store.organization(),this.selectedPath())?.slug??null:null);query=N("");itemType=N("feature");drawerItem=N(null);drawerOpen=N(!1);presentTypes=x(()=>{let n=new Set(this.store.workItems().map(e=>e.type));return this.store.organization().itemTypes.filter(e=>e.slug==="feature"||n.has(e.slug))});statuses=x(()=>this.store.organization().itemTypes.find(n=>n.slug===this.itemType())?.statuses??[]);filteredItems=x(()=>{let n=this.query().trim().toLowerCase();return this.store.workItems().filter(e=>e.type===this.itemType()&&(!n||e.title.toLowerCase().includes(n)))});constructor(){ne(()=>{let n=this.selectedPath();this.treeSelection.set(n?this.findNode(this.treeNodes(),n)??null:null)})}toNode(n,e){if(n.kind==="folder")return{key:n.path||n.name,label:n.name,data:n,icon:n.expected?"pi pi-folder text-ink-light":"pi pi-folder text-gate",expanded:n.name!=="Unmapped"&&(n.description!==""||e<2||(this.selectedPath()?.startsWith(`${n.path}/`)??!1)),selectable:!1,styleClass:n.expected?"sai-node-expected":void 0,children:n.children.map(a=>this.toNode(a,e+1)),leaf:n.children.length===0};let i=Ke(n.path);return{key:n.path,label:n.name,data:n,icon:n.expected?"pi pi-file text-ink-light":i==="markdown"?"pi pi-file-edit text-primary":i==="text"?"pi pi-file":"pi pi-code text-ai",leaf:!0,selectable:!n.expected,styleClass:n.expected?"sai-node-expected":void 0}}findNode(n,e){for(let i of n){if(i.key===e)return i;let a=i.children?this.findNode(i.children,e):void 0;if(a)return a}}onSelect(n){let e=n.node.data;!e||e.kind!=="file"||e.expected||this.router.navigate(["/workspace"],{queryParams:{path:e.path}})}discuss(n){let e=this.store.startConversation(`About ${J(n)}`,null,n);e&&this.router.navigate(["/conversations",e.id])}itemsIn(n){return this.filteredItems().filter(e=>e.status===n)}countOf(n){return this.store.workItems().filter(e=>e.type===n).length}runsFor(n){return this.store.runs().filter(e=>n.runIds.includes(e.id))}gateFor(n){for(let e of this.runsFor(n)){let i=Ze(e);if(i)return{run:e,gate:i}}return null}folderArtifacts(n){let e=n.path.slice(0,n.path.lastIndexOf("/"));return this.store.artifacts().filter(i=>i.path.startsWith(`${e}/`))}openItem(n){this.drawerItem.set(n),this.drawerOpen.set(!0)}fileName(n){return J(n)}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=z({type:t,selectors:[["sai-workspace-page"]],inputs:{view:[1,"view"]},decls:25,vars:11,consts:[[1,"px-6","py-5","max-md:px-4"],[1,"mb-4","flex","flex-wrap","items-end","justify-between","gap-3"],[1,"text-2xl"],[1,"m-0","text-sm","text-ink-muted"],[1,"font-mono","text-xs"],[1,"font-mono"],[3,"routerLink","queryParams"],[3,"value"],["value","explorer","routerLink","/workspace/explorer"],[1,"pi","pi-sitemap","mr-1.5"],["value","board","routerLink","/workspace/board"],[1,"pi","pi-th-large","mr-1.5"],[1,"grid","gap-4","lg:grid-cols-[320px_minmax(0,1fr)]"],[1,"mb-5"],[1,"mb-3","flex","flex-wrap","items-center","justify-between","gap-2"],["role","tablist","aria-label","Item type",1,"flex","flex-wrap","gap-1"],["size","small","role","tab",3,"label","outlined"],["pInputText","","type","search","placeholder","Search a title","aria-label","Search work items",1,"w-60",3,"ngModelChange","ngModel"],["role","list",1,"grid","auto-cols-[minmax(210px,1fr)]","grid-flow-col","gap-3","overflow-x-auto","pb-2"],["role","listitem",1,"flex","min-h-[160px]","flex-col","gap-2","rounded-card","bg-surface-sunken","p-2"],["position","right","styleClass","!w-[min(520px,95vw)]","header","Work item",3,"visibleChange","visible","modal"],[1,"flex","flex-col","gap-3"],[1,"sai-eyebrow","mb-2"],[3,"run","gate"],["size","small","role","tab",3,"onClick","label","outlined"],[1,"sai-eyebrow","flex","items-center","justify-between","px-1"],[1,"text-ink-light"],["type","button",1,"sai-card","flex","cursor-pointer","flex-col","gap-1","p-3","text-left","hover:border-line-strong"],["type","button",1,"sai-card","flex","cursor-pointer","flex-col","gap-1","p-3","text-left","hover:border-line-strong",3,"click"],[1,"flex","items-center","justify-between"],[1,"font-mono","text-[11px]","text-ink-light"],["title","structurant: needs an ADR",1,"text-gate"],[1,"text-sm","font-semibold","leading-snug"],[1,"flex","flex-wrap","items-center","gap-1.5","text-[11px]","text-ink-light"],["value","\u2605 gate waiting","severity","warn",3,"rounded"],[1,"text-lg"],[1,"flex","flex-wrap","items-center","gap-1.5"],[3,"status"],["severity","secondary",3,"value","rounded"],["value","structurant","severity","warn",3,"rounded"],[1,"font-mono","text-xs",3,"click","routerLink","queryParams"],[1,"sai-eyebrow"],[1,"m-0","text-sm","text-ink-light"],[1,"m-0","flex","list-none","flex-col","gap-1","p-0"],[1,"text-sm"],[1,"m-0","text-xs","text-ink-light"],[1,"flex","items-center","justify-between","gap-2","text-sm"],[3,"click","routerLink"],[3,"click","routerLink","queryParams"],[1,"text-[11px]","text-ink-light"],[1,"sai-card","flex","max-h-[calc(100vh-180px)]","flex-col","overflow-hidden","lg:sticky","lg:top-[72px]"],[1,"flex","items-center","justify-between","gap-2","border-b","border-line","px-3","py-2","text-xs","text-ink-muted"],[1,"italic","text-ink-light"],[1,"min-h-0","flex-1","overflow-auto","p-1"],["selectionMode","single","filterPlaceholder","Filter the tree","styleClass","sai-explorer",3,"onNodeSelect","value","selection","filter"],["pTemplate","default"],[1,"min-w-0"],[3,"artifact","kind"],[1,"sai-empty","flex","flex-col","items-center","gap-2"],[1,"flex","min-w-0","items-center","gap-1.5","text-[0.84rem]",3,"title"],[1,"truncate"],[1,"rounded","bg-surface-sunken","px-1","text-[10px]","text-ink-light"],[3,"discuss","artifact","kind"],["aria-hidden","true",1,"pi","pi-folder-open","text-3xl","text-ink-light"],[1,"m-0"],["routerLink","/organization"]],template:function(e,i){if(e&1&&(s(0,"div",0)(1,"header",1)(2,"div")(3,"h1",2),d(4),o(),s(5,"p",3),d(6),s(7,"span",4),d(8),o(),d(9," \xB7 HEAD "),s(10,"span",5),d(11),o(),d(12),s(13,"a",6),d(14,"structure map"),o()()(),s(15,"p-tabs",7)(16,"p-tablist")(17,"p-tab",8),w(18,"i",9),d(19,"Explorer"),o(),s(20,"p-tab",10),w(21,"i",11),d(22,"Board"),o()()()(),f(23,on,11,5)(24,cn,13,6,"div",12),o()),e&2){let a,l;r(4),h(i.store.workspace().name),r(2),D(" Workspace of ",i.store.tenant().organizationName,": one hosted SAF git repository "),r(2),h(i.store.workspace().repository),r(3),h(((a=i.store.commits().at(-1))==null||a.sha==null?null:a.sha.slice(0,10))??"\u2014"),r(),D(" \xB7 ",i.store.commits().length," commits \xB7 laid out by the organization's "),r(),c("routerLink",L(9,zt))("queryParams",L(10,Ot)),r(2),c("value",i.view()),r(8),_((l=i.view())==="board"?23:24)}},dependencies:[Ie,Te,Se,Ee,Pe,B,$,lt,qe,Ye,et,tt,Re,nt,it,at,Qe,je],encapsulation:2})};export{dt as WorkspacePage};
