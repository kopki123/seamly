import{i as y,C as V,r as m,z as u,o as _,j as v,k as o,A as k,a as n,B as i,m as a,u as F,R}from"./index-LZebK88m.js";import{_ as B,e as S,p as C,F as d}from"./FormItem-nMWqiYq0.js";import{T as N}from"./TextButton-TZ-9-CXc.js";import{_ as p}from"./Input.vue_vue_type_script_setup_true_lang-DvqPymHY.js";import{u as T}from"./index-D8B2W3nM.js";import{u as f}from"./index-CB_-mfuI.js";const U={class:"mt-2 mb-4 text-sm text-center"},I=y({__name:"Register",setup(L){const x=k(),c=V(),l=m(),r=m(!1),s=u({email:"",password:""}),b=u({email:[{pattern:S,message:"請輸入有效email格式"}],password:[{pattern:C,message:"請輸入6-16位字母或數字"}]});async function w(){if(r.value=!0,!l.value.validate()){r.value=!1;return}const{destroy:e}=T(),t=await c.register(s);if(r.value=!1,e(),t.status==="error"){f({message:t.message,type:"error"});return}f({message:"請驗證電子郵件",type:"success"}),await x.replace("/")}return(g,e)=>(_(),v(B,{ref_key:"ruleFormRef",ref:l,model:s,rules:b,class:"w-[90%] max-w-[450px] mx-auto mt-10 p-8 flex flex-col items-center bg-white rounded-2xl",onSubmit:w},{default:o(()=>[e[4]||(e[4]=n("p",{class:"text-xl font-bold text-center",textContent:"註冊"},null,-1)),n("div",U,[e[3]||(e[3]=i(" 已經擁有帳號？ ")),a(F(R),{to:"/login",class:"text-primary"},{default:o(()=>e[2]||(e[2]=[i(" 立即登入 ")])),_:1})]),a(d,{label:"電子郵件",prop:"email"},{default:o(()=>[a(p,{modelValue:s.email,"onUpdate:modelValue":e[0]||(e[0]=t=>s.email=t),type:"email"},null,8,["modelValue"])]),_:1}),a(d,{label:"密碼",prop:"password"},{default:o(()=>[a(p,{modelValue:s.password,"onUpdate:modelValue":e[1]||(e[1]=t=>s.password=t),type:"password"},null,8,["modelValue"])]),_:1}),a(N,{text:"註冊",type:"submit",disabled:r.value,class:"my-4 bg-primary-dark"},null,8,["disabled"])]),_:1},8,["model","rules"]))}});export{I as default};
