import{i as y,C as v,G as C,r as l,d as h,o as S,c as w,a as t,x as a,B as V,m as d,H as b,E as k,A as B}from"./index-DiQle6U0.js";import{u as N}from"./products-Bl5vRLpG.js";import{u as i}from"./index-CmhKHpco.js";import{_ as T}from"./NumberInput.vue_vue_type_script_setup_true_lang-BJi3w8Y5.js";import{T as q}from"./TextButton-D3D87K-B.js";import{u as m}from"./index-DBZvsfRj.js";const I={key:0,class:"max-w-[1280px] mt-10 mx-auto px-8 sm:py-10"},L={class:"mx-auto grid gap-y-8 md:grid-cols-2 md:gap-x-16"},P=["src"],j={class:"flex flex-col gap-4"},E=["textContent"],G=["textContent"],M={class:"w-24 px-2 py-1 flex justify-around items-baseline text-primary-dark font-medium bg-primary-light rounded-lg"},R=["textContent"],U=["textContent"],$=["textContent"],O=y({__name:"Product",setup(A){const p=k(),u=B(),x=v(),_=N(),g=C(),c=l(!1),e=l(),r=l(1);async function f(){if(!x.isLoggedIn){u.push({name:"login"});return}const{destroy:o}=i();if((await g.addCartItem({productId:e.value.id,quantity:r.value})).status==="error"){o(),m({message:"新增失敗",type:"error"});return}m({message:"新增至購物車",type:"success"}),o()}return h(async()=>{const{destroy:o}=i(),{params:{id:s}}=p,n=await _.getSingleProduct({id:s});if(n.status==="error"){o(),u.push({name:"home"});return}e.value=n.data.product,c.value=!0,o()}),(o,s)=>c.value?(S(),w("div",I,[t("div",L,[t("img",{src:e.value.image,alt:"",class:"max-h-[500px] object-cover aspect-square rounded overflow-hidden"},null,8,P),t("div",j,[t("p",{textContent:a(e.value.title),class:"text-3xl font-bold"},null,8,E),t("p",{textContent:a(e.value.description),class:"text-xl mt-2"},null,8,G),t("p",M,[s[1]||(s[1]=V(" NT. ")),t("span",{textContent:a(e.value.price),class:"text-2xl"},null,8,R)]),t("p",{textContent:a(`已銷售${e.value.sold}件`),class:"text-sm"},null,8,U),t("p",{textContent:a(e.value.content),class:"leading-8 text-gray-500/75"},null,8,$),d(T,{class:"!w-32",modelValue:r.value,"onUpdate:modelValue":s[0]||(s[0]=n=>r.value=n),min:1},null,8,["modelValue"]),d(q,{text:"加入購物車",class:"!w-1/2 my-4 text-center bg-primary",onClick:f})])])])):b("",!0)}});export{O as default};
