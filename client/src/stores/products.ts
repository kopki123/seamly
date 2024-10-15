/* eslint-disable import/prefer-default-export */
import { defineStore, acceptHMRUpdate } from 'pinia';
import * as productsApiService from '@/api/products';
import type { Product } from '@/api/products/getAllProducts';

export const useProductsStore = defineStore({
  id: 'products',
  state: () => ({
    products: [] as Product[],
  }),
  actions: {
    getSingleProduct: productsApiService.getSingleProduct,
    async getAllProducts () {
      const response = await productsApiService.getAllProducts();

      if (response.status === 'error') {
        return;
      }

      this.$patch({
        products: response.data!.products,
      });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductsStore, import.meta.hot));
}
