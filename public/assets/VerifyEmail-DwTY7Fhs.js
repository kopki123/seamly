import{i as c,d as m,D as l,o as p,c as d,a,m as o,u as r,k as f,E as x,A as y,B as _,R as g}from"./index-COMXhcBS.js";import{u as n,r as k}from"./index-CJiuavPj.js";const v={class:"w-[200px] mt-12 mx-auto text-center"},w={class:"flex justify-center items-center gap-2"},V=c({__name:"VerifyEmail",setup(B){const i=x(),u=y();return m(async()=>{const{token:s,email:e}=i.query,t=await l({verificationToken:s,email:e});if(t.status==="error"){n({message:t.message,type:"error"});return}n({message:"驗證成功，5秒後跳轉至登入頁",type:"success"}),setTimeout(()=>{u.push({name:"login"})},5e3)}),(s,e)=>(p(),d("div",v,[a("div",w,[e[0]||(e[0]=a("h1",{textContent:"帳號已驗證",class:"text-xl my-5"},null,-1)),o(r(k),{class:"w-6 h-6"})]),o(r(g),{to:"/login",class:"text-primary"},{default:f(()=>e[1]||(e[1]=[_(" 立即登入 ")])),_:1})]))}});export{V as default};