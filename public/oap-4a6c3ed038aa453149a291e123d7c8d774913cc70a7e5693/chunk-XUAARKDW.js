import{Ca as m,F as c,Fc as r,G as f,H as x,Hc as N,K as g,La as b,Na as e,Nc as M,Qa as u,bb as I,da as v,h as a,j as l,k as i,ra as h,v as p,vc as T,w as s,xc as y}from"./chunk-FKE5A6C4.js";var k=`
    .p-inputtext {
        font-family: inherit;
        font-feature-settings: inherit;
        font-size: 1rem;
        color: dt('inputtext.color');
        background: dt('inputtext.background');
        padding-block: dt('inputtext.padding.y');
        padding-inline: dt('inputtext.padding.x');
        border: 1px solid dt('inputtext.border.color');
        transition:
            background dt('inputtext.transition.duration'),
            color dt('inputtext.transition.duration'),
            border-color dt('inputtext.transition.duration'),
            outline-color dt('inputtext.transition.duration'),
            box-shadow dt('inputtext.transition.duration');
        appearance: none;
        border-radius: dt('inputtext.border.radius');
        outline-color: transparent;
        box-shadow: dt('inputtext.shadow');
    }

    .p-inputtext:enabled:hover {
        border-color: dt('inputtext.hover.border.color');
    }

    .p-inputtext:enabled:focus {
        border-color: dt('inputtext.focus.border.color');
        box-shadow: dt('inputtext.focus.ring.shadow');
        outline: dt('inputtext.focus.ring.width') dt('inputtext.focus.ring.style') dt('inputtext.focus.ring.color');
        outline-offset: dt('inputtext.focus.ring.offset');
    }

    .p-inputtext.p-invalid {
        border-color: dt('inputtext.invalid.border.color');
    }

    .p-inputtext.p-variant-filled {
        background: dt('inputtext.filled.background');
    }

    .p-inputtext.p-variant-filled:enabled:hover {
        background: dt('inputtext.filled.hover.background');
    }

    .p-inputtext.p-variant-filled:enabled:focus {
        background: dt('inputtext.filled.focus.background');
    }

    .p-inputtext:disabled {
        opacity: 1;
        background: dt('inputtext.disabled.background');
        color: dt('inputtext.disabled.color');
    }

    .p-inputtext::placeholder {
        color: dt('inputtext.placeholder.color');
    }

    .p-inputtext.p-invalid::placeholder {
        color: dt('inputtext.invalid.placeholder.color');
    }

    .p-inputtext-sm {
        font-size: dt('inputtext.sm.font.size');
        padding-block: dt('inputtext.sm.padding.y');
        padding-inline: dt('inputtext.sm.padding.x');
    }

    .p-inputtext-lg {
        font-size: dt('inputtext.lg.font.size');
        padding-block: dt('inputtext.lg.padding.y');
        padding-inline: dt('inputtext.lg.padding.x');
    }

    .p-inputtext-fluid {
        width: 100%;
    }
`;var F=`
    ${k}

    /* For PrimeNG */
   .p-inputtext.ng-invalid.ng-dirty {
        border-color: dt('inputtext.invalid.border.color');
    }

    .p-inputtext.ng-invalid.ng-dirty::placeholder {
        color: dt('inputtext.invalid.placeholder.color');
    }
`,S={root:({instance:t})=>["p-inputtext p-component",{"p-filled":t.$filled(),"p-inputtext-sm":t.pSize==="small","p-inputtext-lg":t.pSize==="large","p-invalid":t.invalid(),"p-variant-filled":t.$variant()==="filled","p-inputtext-fluid":t.hasFluid}]},D=(()=>{class t extends T{name="inputtext";style=F;classes=S;static \u0275fac=(()=>{let n;return function(d){return(n||(n=s(t)))(d||t)}})();static \u0275prov=a({token:t,factory:t.\u0275fac})}return t})();var w=new l("INPUTTEXT_INSTANCE"),O=(()=>{class t extends M{componentName="InputText";hostName="";ptInputText=e();pInputTextPT=e();pInputTextUnstyled=e();bindDirectiveInstance=i(r,{self:!0});$pcInputText=i(w,{optional:!0,skipSelf:!0})??void 0;ngControl=i(I,{optional:!0,self:!0});pcFluid=i(N,{optional:!0,host:!0,skipSelf:!0});pSize;variant=e();fluid=e(void 0,{transform:u});invalid=e(void 0,{transform:u});$variant=b(()=>this.variant()||this.config.inputStyle()||this.config.inputVariant());_componentStyle=i(D);constructor(){super(),p(()=>{let n=this.ptInputText()||this.pInputTextPT();n&&this.directivePT.set(n)}),p(()=>{this.pInputTextUnstyled()&&this.directiveUnstyled.set(this.pInputTextUnstyled())})}onAfterViewInit(){this.writeModelValue(this.ngControl?.value??this.el.nativeElement.value),this.cd.detectChanges()}onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("root"))}onDoCheck(){this.writeModelValue(this.ngControl?.value??this.el.nativeElement.value)}onInput(){this.writeModelValue(this.ngControl?.value??this.el.nativeElement.value)}get hasFluid(){return this.fluid()??!!this.pcFluid}get dataP(){return this.cn({invalid:this.invalid(),fluid:this.hasFluid,filled:this.$variant()==="filled",[this.pSize]:this.pSize})}static \u0275fac=function(o){return new(o||t)};static \u0275dir=c({type:t,selectors:[["","pInputText",""]],hostVars:3,hostBindings:function(o,d){o&1&&v("input",function(){return d.onInput()}),o&2&&(g("data-p",d.dataP),h(d.cx("root")))},inputs:{hostName:"hostName",ptInputText:[1,"ptInputText"],pInputTextPT:[1,"pInputTextPT"],pInputTextUnstyled:[1,"pInputTextUnstyled"],pSize:"pSize",variant:[1,"variant"],fluid:[1,"fluid"],invalid:[1,"invalid"]},features:[m([D,{provide:w,useExisting:t},{provide:y,useExisting:t}]),f([r]),x]})}return t})();export{O as a};
