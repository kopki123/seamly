import{B as s,C as e}from"./index-FraBQ2Kp.js";async function r(){return await s.get("/products")}async function n(t){const{id:o}=t;return await s.get(`/products/${o}`)}const u=e({id:"products",state:()=>({products:[]}),actions:{getSingleProduct:n,async getAllProducts(){const t=await r();t.status!=="error"&&this.$patch({products:t.data.products})}}});export{u};
