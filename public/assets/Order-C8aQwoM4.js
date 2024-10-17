import{e as b,r as c,d as $,a as N,f as n,j as a,m as e,F as m,k as x,A as S,z as j,q as D,t as o,s as p}from"./index-jtB1xxMS.js";import{u as L}from"./orders-CD8Y6rer.js";import{u as M}from"./index-BbmI_KFf.js";import{c as O}from"./convertDateToDateString-BiNXQi8d.js";import{a as T}from"./checkoutConfig-DcQSMzml.js";function q(u){return u.replace(/(\d{2})\d{4}(\d{4})/,"$1****$2")}const A={key:0,class:"max-w-[1280px] mt-10 mx-auto px-4 sm:py-5 sm:px-20"},B={class:"shrink-0"},F={class:"flex gap-3"},V=["src"],I={class:"flex flex-col gap-2"},R=["textContent"],z=["textContent"],E={class:"w-2/3 flex justify-between items-baseline"},G={class:"text-xs sm:text-md text-primary-dark"},P=["textContent"],H=["textContent"],J={class:"text-xs sm:text-md text-primary-dark"},K=["textContent"],Z=b({__name:"Order",setup(u){const f=j(),v=D(),_=L(),i=c(!0),r=c(),h=$(()=>{if(!r.value)return[];const{id:l,name:s,phone:t,totalAmount:d,pickMethod:g,deliveryFee:y,createdAt:k}=r.value,{label:C}=T.find(({value:w})=>w===g);return[{name:"配送方式",value:C},{name:"訂單編號",value:l},{name:"訂單確認日期",value:O(new Date(k))},{name:"取貨人",value:s},{name:"聯繫方式",value:q(t)},{name:"運費",value:`$${y}`},{name:"總金額",value:`$${d}`}]});return N(async()=>{var t;const{destroy:l}=M(),s=await _.getSingleOrder({id:f.params.id});i.value=!1,l(),s.status==="error"&&v.push({name:"home"}),r.value=(t=s.data)==null?void 0:t.order}),(l,s)=>i.value?S("",!0):(n(),a("div",A,[s[2]||(s[2]=e("h1",{class:"text-2xl mb-5"},"訂單資訊",-1)),(n(!0),a(m,null,x(h.value,(t,d)=>(n(),a("div",{key:d,class:"my-3 flex gap-2 md:text-lg"},[e("div",B,o(t.name)+"：",1),e("div",null,o(t.value),1)]))),128)),s[3]||(s[3]=e("div",{class:"text-2xl mt-10"},"商品詳情",-1)),(n(!0),a(m,null,x(r.value.orderItems,t=>(n(),a("div",{key:t.id,class:"w-full my-3 px-4 py-2 rounded-xl shadow-md flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-end"},[e("div",F,[e("img",{src:t.product.image,alt:"",class:"w-16 h-16 object-cover rounded-xl overflow-hidden"},null,8,V),e("div",I,[e("p",{textContent:o(t.product.title),class:"text-lg"},null,8,R),e("p",{textContent:o(t.product.description),class:"text-xs"},null,8,z)])]),e("div",E,[e("p",G,[s[0]||(s[0]=p(" NT. ")),e("span",{textContent:o(t.product.price),class:"text-lg sm:text-2xl"},null,8,P)]),e("p",{textContent:o(`數量 : ${t.quantity}`),class:"text-sm sm:text-xl"},null,8,H),e("p",J,[s[1]||(s[1]=p(" NT. ")),e("span",{textContent:o(t.product.price*t.quantity),class:"text-lg sm:text-2xl"},null,8,K)])])]))),128))]))}});export{Z as default};
