import{e as i,f as o,j as d,H as f,X as _,_ as m,r as p,g as r,i as l,m as x,l as u,A as b,T as h,Y as c}from"./index-jtB1xxMS.js";const g=i({__name:"Mask",props:{zIndex:{default:10}},setup(t){return(e,n)=>(o(),d("div",{class:"z-[var(--z-index)] fixed left-0 top-0 w-full h-full bg-black/60 flex justify-center items-center will-change-transform",style:_({"--z-index":e.zIndex})},[f(e.$slots,"default")],4))}}),v={},y={class:"animate-spin inline-flex w-full h-full border-2 border-white/40 border-b-transparent rounded-full"};function V(t,e){return o(),d("div",y)}const k=m(v,[["render",V]]),w={class:"w-12 h-12"},z=i({__name:"Loading",setup(t,{expose:e}){const n=p(!1);function s(a){n.value=a}return e({toggleVisible:s}),(a,C)=>(o(),r(h,{name:"fade"},{default:l(()=>[n.value?(o(),r(g,{key:0},{default:l(()=>[x("div",w,[u(k)])]),_:1})):b("",!0)]),_:1}))}});function N(){var n;const t=u(z),e=document.createElement("div");return document.body.appendChild(e),c(t,e),(n=t.component)==null||n.exposed.toggleVisible(!0),{destroy(){var s;(s=t.component)==null||s.exposed.toggleVisible(!1),setTimeout(()=>{c(null,e),document.body.removeChild(e)},500)}}}export{N as u};