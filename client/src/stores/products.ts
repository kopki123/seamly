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
    async getAllProducts (payload: {
      categoryId?: string;
      keyword?: string;
      minPrice?: number;
      maxPrice?: number;
      sort?: string;
    } = {}) {
      const response = await productsApiService.getAllProducts(payload);

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
