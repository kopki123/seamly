import{B as s,C as t}from"./index-FraBQ2Kp.js";async function n(){return await s.get("/orders")}async function o(r){const{id:e}=r;return await s.get(`/orders/${e}`)}async function a(r){return await s.post("/orders",r)}const d=t({id:"orders",state:()=>({orders:[]}),actions:{getSingleOrder:o,async getAllOrders(){const r=await n();r.status!=="error"&&this.$patch({orders:r.data.orders})},async createOrder(r){const e=await a(r);return e.status==="error"||await this.getAllOrders(),e}}});export{d as u};