import{i as S,r as h,w as g,p as x,z as y,S as T,o as c,c as f,M as p,y as I,T as $,U as B,g as _,d as F,x as b,H as m,m as V,k as w,B as z,V as A,_ as k}from"./index-LZebK88m.js";const P=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,C=/^[a-zA-Z0-9]{6,16}$/,D=/^[\u4e00-\u9fffa-zA-Z0-9]{1,10}$/,U=/^09\d{8}$/,G=S({__name:"Form",props:{model:{},inline:{type:Boolean,default:!1},rules:{default:null},onSubmit:{}},setup(v,{expose:n}){const t=v,r=[],o=h("EDITABLE");function d(){const a=[];return r.forEach(e=>{e.setValidationState("validating"),e.validate();const s=e.validateState.value!=="error";a.push(s)}),a.every(e=>e)}function u(a){r.push(a)}async function l(){if(o.value==="SUBMITTING")return;const a=document.activeElement;a==null||a.blur(),o.value="SUBMITTING",await t.onSubmit(),o.value="EDITABLE",a==null||a.focus()}return g(()=>t.model,()=>{r.forEach(a=>a.validate())},{deep:!0}),x("context",y({...T(t),addField:u})),n({validate:d}),(a,e)=>(c(),f("form",{class:I([a.inline?"[&>*]:inline-flex":"[&>*]:flex [&>*]:mb-[15px]"]),onSubmit:$(l,["prevent"])},[p(a.$slots,"default")],34))}}),M={class:"relative w-full flex flex-col"},E=["for"],N=S({__name:"FormItem",props:{label:{default:""},prop:{default:""}},setup(v){const n=v,t=B("context"),r=_(()=>t.rules[n.prop]),o=h(""),d=h(-1),u=_(()=>{var e;return o.value==="error"?(e=t.rules[n.prop][d.value])==null?void 0:e.message:""});function l(e,s=-1){o.value=e,d.value=s}function a(){const e=t.model[n.prop];e&&l("validating"),o.value!==""&&(r.value&&(r.value.some((s,i)=>s.pattern&&s.pattern.test(e)===!1||s.validator&&s.validator(s,e)===!1?(l("error",i),!0):!1),o.value==="error")||l("success"))}return F(()=>{n.prop&&(t==null||t.addField({validateState:o,validate:a,setValidationState:l}))}),(e,s)=>{var i;return c(),f("div",M,[p(e.$slots,"label",{},()=>[e.label?(c(),f("label",{key:0,for:e.label,class:"relative text-gray-700 font-medium mb-2"},b(e.label),9,E)):m("",!0)],!0),p(e.$slots,"default",{},void 0,!0),e.prop?(c(),f("div",{key:0,class:I(["text-xs text-[#FF0000]",{"h-4 mt-1":(i=r.value)==null?void 0:i.length}])},[V(A,{name:"fade"},{default:w(()=>[u.value?p(e.$slots,"error",{key:0,error:u.value},()=>[z(b(u.value),1)],!0):m("",!0)]),_:3})],2)):m("",!0)])}}}),L=k(N,[["__scopeId","data-v-5b0ff2da"]]);export{L as F,G as _,U as a,P as e,D as n,C as p};
