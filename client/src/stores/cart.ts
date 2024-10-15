/* eslint-disable import/prefer-default-export */
import { defineStore, acceptHMRUpdate } from 'pinia';
import * as cartApiService from '@/api/cart';
import type { CartItem } from '@/api/cart/getCart';

export const useCartStore = defineStore({
  id: 'cart',
  state: () => ({
    cartId: '',
    numItemsInCart: 0,
    cartTotal: 0,
    cartItems: [] as CartItem[],
  }),
  actions: {
    addCartItem: cartApiService.addCartItem,
    async getCart () {
      const response = await cartApiService.getCart();

      if (response.status === 'error') {
        return response;
      }

      const {
        id,
        numItemsInCart,
        cartTotal,
        cartItems,
      } = response.data!.cart;

      this.$patch({
        cartId: id,
        numItemsInCart,
        cartTotal,
        cartItems,
      });

      return response;
    },
    async removeCartItem (payload: { id: string; }) {
      const response = await cartApiService.removeCartItem(payload);

      if (response.status === 'error') {
        return response;
      }

      await this.getCart();
      return response;
    },
    async updateCartItem (payload: { id: string; quantity: number; }) {
      const response = await cartApiService.updateCartItem(payload);

      if (response.status === 'error') {
        return response;
      }

      await this.getCart();
      return response;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
