/* eslint-disable import/prefer-default-export */
import { defineStore, acceptHMRUpdate } from 'pinia';
import * as ordersApiService from '@/api/orders';
import type { Order } from '@/api/orders/getAllOrders';

export const useOrdersStore = defineStore({
  id: 'orders',
  state: () => ({
    orders: [] as Order[],
  }),
  actions: {
    getSingleOrder: ordersApiService.getSingleOrder,
    async getAllOrders () {
      const response = await ordersApiService.getAllOrders();

      if (response.status === 'error') {
        return;
      }

      this.$patch({
        orders: response.data!.orders,
      });
    },
    async createOrder (payload: {
      name: string;
      phone: string;
      payMethod: string;
      pickMethod: string;
      deliveryFee: number;
    }) {
      const response = await ordersApiService.createOrder(payload);

      if (response.status === 'error') {
        return response;
      }

      await this.getAllOrders();
      return response;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOrdersStore, import.meta.hot));
}
