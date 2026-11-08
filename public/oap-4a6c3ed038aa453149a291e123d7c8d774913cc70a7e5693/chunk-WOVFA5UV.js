import{A as g,Ca as k,D as b,Fc as l,G as D,Gc as A,H as p,Hb as nt,I as P,Ic as J,Ja as vt,K as _,Kb as mt,Kc as ot,La as c,Lc as Ct,N as w,Na as y,O as I,Oa as ht,Pa as G,Qa as x,Ra as gt,Rb as yt,Sb as Tt,T as f,Tb as z,U as V,V as Q,W as $,Xa as U,Ya as O,Yb as it,Z as q,Za as Z,_b as j,aa as W,ba as tt,ca as lt,da as R,ea as m,fa as N,g as S,ga as M,gc as _t,h as C,ha as dt,ia as ut,j as B,ja as v,k as o,ka as h,kc as xt,l as X,la as bt,lc as at,m as Y,ma as pt,n as T,na as ft,ra as d,u as K,v as rt,vc as E,w as r,wb as et,x as ct,xc as F,yc as L}from"./chunk-FKE5A6C4.js";var Bt=`
    .p-tabs {
        display: flex;
        flex-direction: column;
    }

    .p-tablist {
        display: flex;
        position: relative;
        overflow: hidden;
        background: dt('tabs.tablist.background');
    }

    .p-tablist-viewport {
        overflow-x: auto;
        overflow-y: hidden;
        scroll-behavior: smooth;
        scrollbar-width: none;
        overscroll-behavior: contain auto;
    }

    .p-tablist-viewport::-webkit-scrollbar {
        display: none;
    }

    .p-tablist-tab-list {
        position: relative;
        display: flex;
        border-style: solid;
        border-color: dt('tabs.tablist.border.color');
        border-width: dt('tabs.tablist.border.width');
    }

    .p-tablist-content {
        flex-grow: 1;
    }

    .p-tablist-nav-button {
        all: unset;
        position: absolute !important;
        flex-shrink: 0;
        inset-block-start: 0;
        z-index: 2;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: dt('tabs.nav.button.background');
        color: dt('tabs.nav.button.color');
        width: dt('tabs.nav.button.width');
        transition:
            color dt('tabs.transition.duration'),
            outline-color dt('tabs.transition.duration'),
            box-shadow dt('tabs.transition.duration');
        box-shadow: dt('tabs.nav.button.shadow');
        outline-color: transparent;
        cursor: pointer;
    }

    .p-tablist-nav-button:focus-visible {
        z-index: 1;
        box-shadow: dt('tabs.nav.button.focus.ring.shadow');
        outline: dt('tabs.nav.button.focus.ring.width') dt('tabs.nav.button.focus.ring.style') dt('tabs.nav.button.focus.ring.color');
        outline-offset: dt('tabs.nav.button.focus.ring.offset');
    }

    .p-tablist-nav-button:hover {
        color: dt('tabs.nav.button.hover.color');
    }

    .p-tablist-prev-button {
        inset-inline-start: 0;
    }

    .p-tablist-next-button {
        inset-inline-end: 0;
    }

    .p-tablist-prev-button:dir(rtl),
    .p-tablist-next-button:dir(rtl) {
        transform: rotate(180deg);
    }

    .p-tab {
        flex-shrink: 0;
        cursor: pointer;
        user-select: none;
        position: relative;
        border-style: solid;
        white-space: nowrap;
        gap: dt('tabs.tab.gap');
        background: dt('tabs.tab.background');
        border-width: dt('tabs.tab.border.width');
        border-color: dt('tabs.tab.border.color');
        color: dt('tabs.tab.color');
        padding: dt('tabs.tab.padding');
        font-weight: dt('tabs.tab.font.weight');
        transition:
            background dt('tabs.transition.duration'),
            border-color dt('tabs.transition.duration'),
            color dt('tabs.transition.duration'),
            outline-color dt('tabs.transition.duration'),
            box-shadow dt('tabs.transition.duration');
        margin: dt('tabs.tab.margin');
        outline-color: transparent;
    }

    .p-tab:not(.p-disabled):focus-visible {
        z-index: 1;
        box-shadow: dt('tabs.tab.focus.ring.shadow');
        outline: dt('tabs.tab.focus.ring.width') dt('tabs.tab.focus.ring.style') dt('tabs.tab.focus.ring.color');
        outline-offset: dt('tabs.tab.focus.ring.offset');
    }

    .p-tab:not(.p-tab-active):not(.p-disabled):hover {
        background: dt('tabs.tab.hover.background');
        border-color: dt('tabs.tab.hover.border.color');
        color: dt('tabs.tab.hover.color');
    }

    .p-tab-active {
        background: dt('tabs.tab.active.background');
        border-color: dt('tabs.tab.active.border.color');
        color: dt('tabs.tab.active.color');
    }

    .p-tabpanels {
        background: dt('tabs.tabpanel.background');
        color: dt('tabs.tabpanel.color');
        padding: dt('tabs.tabpanel.padding');
        outline: 0 none;
    }

    .p-tabpanel:focus-visible {
        box-shadow: dt('tabs.tabpanel.focus.ring.shadow');
        outline: dt('tabs.tabpanel.focus.ring.width') dt('tabs.tabpanel.focus.ring.style') dt('tabs.tabpanel.focus.ring.color');
        outline-offset: dt('tabs.tabpanel.focus.ring.offset');
    }

    .p-tablist-active-bar {
        z-index: 1;
        display: block;
        position: absolute;
        inset-block-end: dt('tabs.active.bar.bottom');
        height: dt('tabs.active.bar.height');
        background: dt('tabs.active.bar.background');
        transition: 250ms cubic-bezier(0.35, 0, 0.25, 1);
    }
`;var zt=["data-p-icon","chevron-left"],wt=(()=>{class e extends J{static \u0275fac=(()=>{let t;return function(n){return(t||(t=r(e)))(n||e)}})();static \u0275cmp=b({type:e,selectors:[["","data-p-icon","chevron-left"]],features:[p],attrs:zt,decls:1,vars:0,consts:[["d","M9.61296 13C9.50997 13.0005 9.40792 12.9804 9.3128 12.9409C9.21767 12.9014 9.13139 12.8433 9.05902 12.7701L3.83313 7.54416C3.68634 7.39718 3.60388 7.19795 3.60388 6.99022C3.60388 6.78249 3.68634 6.58325 3.83313 6.43628L9.05902 1.21039C9.20762 1.07192 9.40416 0.996539 9.60724 1.00012C9.81032 1.00371 10.0041 1.08597 10.1477 1.22959C10.2913 1.37322 10.3736 1.56698 10.3772 1.77005C10.3808 1.97313 10.3054 2.16968 10.1669 2.31827L5.49496 6.99022L10.1669 11.6622C10.3137 11.8091 10.3962 12.0084 10.3962 12.2161C10.3962 12.4238 10.3137 12.6231 10.1669 12.7701C10.0945 12.8433 10.0083 12.9014 9.91313 12.9409C9.81801 12.9804 9.71596 13.0005 9.61296 13Z","fill","currentColor"]],template:function(i,n){i&1&&(T(),q(0,"path",0))},encapsulation:2})}return e})();var jt=["data-p-icon","chevron-right"],It=(()=>{class e extends J{static \u0275fac=(()=>{let t;return function(n){return(t||(t=r(e)))(n||e)}})();static \u0275cmp=b({type:e,selectors:[["","data-p-icon","chevron-right"]],features:[p],attrs:jt,decls:1,vars:0,consts:[["d","M4.38708 13C4.28408 13.0005 4.18203 12.9804 4.08691 12.9409C3.99178 12.9014 3.9055 12.8433 3.83313 12.7701C3.68634 12.6231 3.60388 12.4238 3.60388 12.2161C3.60388 12.0084 3.68634 11.8091 3.83313 11.6622L8.50507 6.99022L3.83313 2.31827C3.69467 2.16968 3.61928 1.97313 3.62287 1.77005C3.62645 1.56698 3.70872 1.37322 3.85234 1.22959C3.99596 1.08597 4.18972 1.00371 4.3928 1.00012C4.59588 0.996539 4.79242 1.07192 4.94102 1.21039L10.1669 6.43628C10.3137 6.58325 10.3962 6.78249 10.3962 6.99022C10.3962 7.19795 10.3137 7.39718 10.1669 7.54416L4.94102 12.7701C4.86865 12.8433 4.78237 12.9014 4.68724 12.9409C4.59212 12.9804 4.49007 13.0005 4.38708 13Z","fill","currentColor"]],template:function(i,n){i&1&&(T(),q(0,"path",0))},encapsulation:2})}return e})();var H=["*"],Ht=["previcon"],Kt=["nexticon"],Rt=["content"],Qt=["prevButton"],$t=["nextButton"],qt=["inkbar"],Wt=["tabs"];function Gt(e,u){e&1&&W(0)}function Ut(e,u){if(e&1&&P(0,Gt,1,0,"ng-container",11),e&2){let t=m(2);f("ngTemplateOutlet",t.prevIconTemplate||t._prevIconTemplate)}}function Zt(e,u){e&1&&(T(),$(0,"svg",10))}function Jt(e,u){if(e&1){let t=tt();V(0,"button",9,3),R("click",function(){X(t);let n=m();return Y(n.onPrevButtonClick())}),w(2,Ut,1,1,"ng-container")(3,Zt,1,0,":svg:svg",10),Q()}if(e&2){let t=m();d(t.cx("prevButton")),f("pBind",t.ptm("prevButton")),_("aria-label",t.prevButtonAriaLabel)("tabindex",t.tabindex())("data-pc-group-section","navigator"),g(2),I(t.prevIconTemplate||t._prevIconTemplate?2:3)}}function Xt(e,u){e&1&&W(0)}function Yt(e,u){if(e&1&&P(0,Xt,1,0,"ng-container",11),e&2){let t=m(2);f("ngTemplateOutlet",t.nextIconTemplate||t._nextIconTemplate)}}function te(e,u){e&1&&(T(),$(0,"svg",12))}function ee(e,u){if(e&1){let t=tt();V(0,"button",9,4),R("click",function(){X(t);let n=m();return Y(n.onNextButtonClick())}),w(2,Yt,1,1,"ng-container")(3,te,1,0,":svg:svg",12),Q()}if(e&2){let t=m();d(t.cx("nextButton")),f("pBind",t.ptm("nextButton")),_("aria-label",t.nextButtonAriaLabel)("tabindex",t.tabindex())("data-pc-group-section","navigator"),g(2),I(t.nextIconTemplate||t._nextIconTemplate?2:3)}}function ne(e,u){e&1&&M(0)}function ie(e,u){e&1&&W(0)}function ae(e,u){if(e&1&&P(0,ie,1,0,"ng-container",1),e&2){let t=m(),i=ft(1);f("ngTemplateOutlet",t.content()?t.content():i)}}var oe={root:({instance:e})=>["p-tabs p-component",{"p-tabs-scrollable":e.scrollable()}]},Nt=(()=>{class e extends E{name="tabs";style=Bt;classes=oe;static \u0275fac=(()=>{let t;return function(n){return(t||(t=r(e)))(n||e)}})();static \u0275prov=C({token:e,factory:e.\u0275fac})}return e})();var Mt=new B("TABS_INSTANCE"),st=(()=>{class e extends L{componentName="Tabs";$pcTabs=o(Mt,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=o(l,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}value=G(void 0);scrollable=y(!1,{transform:x});lazy=y(!1,{transform:x});selectOnFocus=y(!1,{transform:x});showNavigators=y(!0,{transform:x});tabindex=y(0,{transform:gt});id=K(_t("pn_id_"));_componentStyle=o(Nt);updateValue(t){this.value.update(()=>t)}static \u0275fac=(()=>{let t;return function(n){return(t||(t=r(e)))(n||e)}})();static \u0275cmp=b({type:e,selectors:[["p-tabs"]],hostVars:3,hostBindings:function(i,n){i&2&&(_("id",n.id()),d(n.cx("root")))},inputs:{value:[1,"value"],scrollable:[1,"scrollable"],lazy:[1,"lazy"],selectOnFocus:[1,"selectOnFocus"],showNavigators:[1,"showNavigators"],tabindex:[1,"tabindex"]},outputs:{value:"valueChange"},features:[k([Nt,{provide:Mt,useExisting:e},{provide:F,useExisting:e}]),D([l]),p],ngContentSelectors:H,decls:1,vars:0,template:function(i,n){i&1&&(N(),M(0))},dependencies:[O,A],encapsulation:2,changeDetection:0})}return e})(),se={root:({instance:e})=>["p-tab",{"p-tab-active":e.active(),"p-disabled":e.disabled()}]},kt=(()=>{class e extends E{name="tab";classes=se;static \u0275fac=(()=>{let t;return function(n){return(t||(t=r(e)))(n||e)}})();static \u0275prov=C({token:e,factory:e.\u0275fac})}return e})();var re={root:"p-tablist",content:"p-tablist-content p-tablist-viewport",tabList:"p-tablist-tab-list",activeBar:"p-tablist-active-bar",prevButton:"p-tablist-prev-button p-tablist-nav-button",nextButton:"p-tablist-next-button p-tablist-nav-button"},Et=(()=>{class e extends E{name="tablist";classes=re;static \u0275fac=(()=>{let t;return function(n){return(t||(t=r(e)))(n||e)}})();static \u0275prov=C({token:e,factory:e.\u0275fac})}return e})();var Ft=new B("TABLIST_INSTANCE"),ce=(()=>{class e extends L{componentName="TabList";$pcTabList=o(Ft,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=o(l,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}prevIconTemplate;nextIconTemplate;templates;content;prevButton;nextButton;inkbar;tabs;pcTabs=o(S(()=>st));isPrevButtonEnabled=K(!1);isNextButtonEnabled=K(!1);resizeObserver;showNavigators=c(()=>this.pcTabs.showNavigators());tabindex=c(()=>this.pcTabs.tabindex());scrollable=c(()=>this.pcTabs.scrollable());_componentStyle=o(Et);constructor(){super(),rt(()=>{this.pcTabs.value(),Z(this.platformId)&&setTimeout(()=>{this.updateInkBar()})})}get prevButtonAriaLabel(){return this.config?.translation?.aria?.previous}get nextButtonAriaLabel(){return this.config?.translation?.aria?.next}onAfterViewInit(){this.showNavigators()&&Z(this.platformId)&&(this.updateButtonState(),this.bindResizeObserver())}_prevIconTemplate;_nextIconTemplate;onAfterContentInit(){this.templates?.forEach(t=>{switch(t.getType()){case"previcon":this._prevIconTemplate=t.template;break;case"nexticon":this._nextIconTemplate=t.template;break}})}onDestroy(){this.unbindResizeObserver()}onScroll(t){this.showNavigators()&&this.updateButtonState(),t.preventDefault()}onPrevButtonClick(){let t=this.content.nativeElement,i=j(t),n=Math.abs(t.scrollLeft)-i,a=n<=0?0:n;t.scrollLeft=nt(t)?-1*a:a}onNextButtonClick(){let t=this.content.nativeElement,i=j(t)-this.getVisibleButtonWidths(),n=t.scrollLeft+i,a=t.scrollWidth-i,s=n>=a?a:n;t.scrollLeft=nt(t)?-1*s:s}updateButtonState(){let t=this.content?.nativeElement,i=this.el?.nativeElement,{scrollWidth:n,offsetWidth:a}=t,s=Math.abs(t.scrollLeft),Ot=j(t);this.isPrevButtonEnabled.set(s!==0),this.isNextButtonEnabled.set(i.offsetWidth>=a&&Math.abs(s-n+Ot)>1)}updateInkBar(){let t=this.content?.nativeElement,i=this.inkbar?.nativeElement,n=this.tabs?.nativeElement,a=yt(t,'[data-pc-name="tab"][data-p-active="true"]');i&&(i.style.width=mt(a)+"px",i.style.left=it(a).left-it(n).left+"px")}getVisibleButtonWidths(){let t=this.prevButton?.nativeElement,i=this.nextButton?.nativeElement;return[t,i].reduce((n,a)=>a?n+j(a):n,0)}bindResizeObserver(){this.resizeObserver=new ResizeObserver(()=>this.updateButtonState()),this.resizeObserver.observe(this.el.nativeElement)}unbindResizeObserver(){this.resizeObserver&&(this.resizeObserver.unobserve(this.el.nativeElement),this.resizeObserver=null)}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=b({type:e,selectors:[["p-tablist"]],contentQueries:function(i,n,a){if(i&1&&dt(a,Ht,4)(a,Kt,4)(a,xt,4),i&2){let s;v(s=h())&&(n.prevIconTemplate=s.first),v(s=h())&&(n.nextIconTemplate=s.first),v(s=h())&&(n.templates=s)}},viewQuery:function(i,n){if(i&1&&ut(Rt,5)(Qt,5)($t,5)(qt,5)(Wt,5),i&2){let a;v(a=h())&&(n.content=a.first),v(a=h())&&(n.prevButton=a.first),v(a=h())&&(n.nextButton=a.first),v(a=h())&&(n.inkbar=a.first),v(a=h())&&(n.tabs=a.first)}},hostVars:2,hostBindings:function(i,n){i&2&&d(n.cx("root"))},features:[k([Et,{provide:Ft,useExisting:e},{provide:F,useExisting:e}]),D([l]),p],ngContentSelectors:H,decls:9,vars:11,consts:[["content",""],["tabs",""],["inkbar",""],["prevButton",""],["nextButton",""],["type","button","pRipple","",3,"pBind","class"],[3,"scroll","pBind"],["role","tablist",3,"pBind"],["role","presentation",3,"pBind"],["type","button","pRipple","",3,"click","pBind"],["data-p-icon","chevron-left"],[4,"ngTemplateOutlet"],["data-p-icon","chevron-right"]],template:function(i,n){i&1&&(N(),w(0,Jt,4,7,"button",5),V(1,"div",6,0),R("scroll",function(s){return n.onScroll(s)}),V(3,"div",7,1),M(5),$(6,"span",8,2),Q()(),w(8,ee,4,7,"button",5)),i&2&&(I(n.showNavigators()&&n.isPrevButtonEnabled()?0:-1),g(),d(n.cx("content")),f("pBind",n.ptm("content")),g(2),d(n.cx("tabList")),f("pBind",n.ptm("tabList")),g(3),d(n.cx("activeBar")),f("pBind",n.ptm("activeBar")),g(2),I(n.showNavigators()&&n.isNextButtonEnabled()?8:-1))},dependencies:[O,U,wt,It,Ct,ot,at,A,l],encapsulation:2,changeDetection:0})}return e})(),Lt=new B("TAB_INSTANCE"),je=(()=>{class e extends L{componentName="Tab";$pcTab=o(Lt,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=o(l,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}value=G();disabled=y(!1,{transform:x});pcTabs=o(S(()=>st));pcTabList=o(S(()=>ce));el=o(ct);_componentStyle=o(kt);ripple=c(()=>this.config.ripple());id=c(()=>`${this.pcTabs.id()}_tab_${this.value()}`);ariaControls=c(()=>`${this.pcTabs.id()}_tabpanel_${this.value()}`);active=c(()=>et(this.pcTabs.value(),this.value()));tabindex=c(()=>this.disabled()?-1:this.active()?this.pcTabs.tabindex():-1);mutationObserver;onFocus(t){this.disabled()||this.pcTabs.selectOnFocus()&&this.changeActiveValue()}onClick(t){this.disabled()||this.changeActiveValue()}onKeyDown(t){switch(t.code){case"ArrowRight":this.onArrowRightKey(t);break;case"ArrowLeft":this.onArrowLeftKey(t);break;case"Home":this.onHomeKey(t);break;case"End":this.onEndKey(t);break;case"PageDown":this.onPageDownKey(t);break;case"PageUp":this.onPageUpKey(t);break;case"Enter":case"NumpadEnter":case"Space":this.onEnterKey(t);break;default:break}t.stopPropagation()}onAfterViewInit(){this.bindMutationObserver()}onArrowRightKey(t){let i=this.findNextTab(t.currentTarget);i?this.changeFocusedTab(t,i):this.onHomeKey(t),t.preventDefault()}onArrowLeftKey(t){let i=this.findPrevTab(t.currentTarget);i?this.changeFocusedTab(t,i):this.onEndKey(t),t.preventDefault()}onHomeKey(t){let i=this.findFirstTab();this.changeFocusedTab(t,i),t.preventDefault()}onEndKey(t){let i=this.findLastTab();this.changeFocusedTab(t,i),t.preventDefault()}onPageDownKey(t){this.scrollInView(this.findLastTab()),t.preventDefault()}onPageUpKey(t){this.scrollInView(this.findFirstTab()),t.preventDefault()}onEnterKey(t){this.disabled()||this.changeActiveValue(),t.preventDefault()}findNextTab(t,i=!1){let n=i?t:t.nextElementSibling;return n?z(n,"data-p-disabled")||z(n,"data-pc-section")==="activebar"?this.findNextTab(n):n:null}findPrevTab(t,i=!1){let n=i?t:t.previousElementSibling;return n?z(n,"data-p-disabled")||z(n,"data-pc-section")==="activebar"?this.findPrevTab(n):n:null}findFirstTab(){return this.findNextTab(this.pcTabList?.tabs?.nativeElement?.firstElementChild,!0)}findLastTab(){return this.findPrevTab(this.pcTabList?.tabs?.nativeElement?.lastElementChild,!0)}changeActiveValue(){this.pcTabs.updateValue(this.value())}changeFocusedTab(t,i){Tt(i),this.scrollInView(i)}scrollInView(t){t?.scrollIntoView?.({block:"nearest"})}bindMutationObserver(){Z(this.platformId)&&(this.mutationObserver=new MutationObserver(t=>{t.forEach(()=>{this.active()&&this.pcTabList?.updateInkBar()})}),this.mutationObserver.observe(this.el.nativeElement,{childList:!0,characterData:!0,subtree:!0}))}unbindMutationObserver(){this.mutationObserver?.disconnect()}onDestroy(){this.mutationObserver&&this.unbindMutationObserver()}static \u0275fac=(()=>{let t;return function(n){return(t||(t=r(e)))(n||e)}})();static \u0275cmp=b({type:e,selectors:[["p-tab"]],hostVars:10,hostBindings:function(i,n){i&1&&R("focus",function(s){return n.onFocus(s)})("click",function(s){return n.onClick(s)})("keydown",function(s){return n.onKeyDown(s)}),i&2&&(_("id",n.id())("aria-controls",n.ariaControls())("role","tab")("aria-selected",n.active())("aria-disabled",n.disabled())("data-p-disabled",n.disabled())("data-p-active",n.active())("tabindex",n.tabindex()),d(n.cx("root")))},inputs:{value:[1,"value"],disabled:[1,"disabled"]},outputs:{value:"valueChange"},features:[k([kt,{provide:Lt,useExisting:e},{provide:F,useExisting:e}]),D([ot,l]),p],ngContentSelectors:H,decls:1,vars:0,template:function(i,n){i&1&&(N(),M(0))},dependencies:[O,at,A],encapsulation:2,changeDetection:0})}return e})(),le={root:({instance:e})=>["p-tabpanel",{"p-tabpanel-active":e.active()}]},At=(()=>{class e extends E{name="tabpanel";classes=le;static \u0275fac=(()=>{let t;return function(n){return(t||(t=r(e)))(n||e)}})();static \u0275prov=C({token:e,factory:e.\u0275fac})}return e})();var St=new B("TABPANEL_INSTANCE"),He=(()=>{class e extends L{componentName="TabPanel";$pcTabPanel=o(St,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=o(l,{self:!0});pcTabs=o(S(()=>st));onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}lazy=y(!1,{transform:x});value=G(void 0);content=ht("content");id=c(()=>`${this.pcTabs.id()}_tabpanel_${this.value()}`);ariaLabelledby=c(()=>`${this.pcTabs.id()}_tab_${this.value()}`);active=c(()=>et(this.pcTabs.value(),this.value()));isLazyEnabled=c(()=>this.pcTabs.lazy()||this.lazy());hasBeenRendered=!1;shouldRender=c(()=>!this.isLazyEnabled()||this.hasBeenRendered?!0:this.active()?(this.hasBeenRendered=!0,!0):!1);_componentStyle=o(At);static \u0275fac=(()=>{let t;return function(n){return(t||(t=r(e)))(n||e)}})();static \u0275cmp=b({type:e,selectors:[["p-tabpanel"]],contentQueries:function(i,n,a){i&1&&bt(a,n.content,Rt,5),i&2&&pt()},hostVars:7,hostBindings:function(i,n){i&2&&(lt("hidden",!n.active()),_("id",n.id())("role","tabpanel")("aria-labelledby",n.ariaLabelledby())("data-p-active",n.active()),d(n.cx("root")))},inputs:{lazy:[1,"lazy"],value:[1,"value"]},outputs:{value:"valueChange"},features:[k([At,{provide:St,useExisting:e},{provide:F,useExisting:e}]),D([l]),p],ngContentSelectors:H,decls:3,vars:1,consts:[["defaultContent",""],[4,"ngTemplateOutlet"]],template:function(i,n){i&1&&(N(),P(0,ne,1,0,"ng-template",null,0,vt),w(2,ae,1,1,"ng-container")),i&2&&(g(2),I(n.shouldRender()?2:-1))},dependencies:[U,A],encapsulation:2,changeDetection:0})}return e})(),de={root:"p-tabpanels"},Pt=(()=>{class e extends E{name="tabpanels";classes=de;static \u0275fac=(()=>{let t;return function(n){return(t||(t=r(e)))(n||e)}})();static \u0275prov=C({token:e,factory:e.\u0275fac})}return e})();var Vt=new B("TABPANELS_INSTANCE"),Ke=(()=>{class e extends L{componentName="TabPanels";$pcTabPanels=o(Vt,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=o(l,{self:!0});_componentStyle=o(Pt);onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}static \u0275fac=(()=>{let t;return function(n){return(t||(t=r(e)))(n||e)}})();static \u0275cmp=b({type:e,selectors:[["p-tabpanels"]],hostVars:3,hostBindings:function(i,n){i&2&&(_("role","presentation"),d(n.cx("root")))},features:[k([Pt,{provide:Vt,useExisting:e},{provide:F,useExisting:e}]),D([l]),p],ngContentSelectors:H,decls:1,vars:0,template:function(i,n){i&1&&(N(),M(0))},dependencies:[O,A],encapsulation:2,changeDetection:0})}return e})();export{It as a,st as b,ce as c,je as d,He as e,Ke as f};
