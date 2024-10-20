import { defineStore, acceptHMRUpdate } from 'pinia';
import * as categoriesApiService from '@/api/categories';
import { Category } from '@/api/categories/getAllCategories';

export const useCategoriesStore = defineStore({
  id: 'categories',
  state: () => ({
    categories: [] as Category[],
  }),
  actions: {
    async getAllCategories() {
      const response = await categoriesApiService.getAllCategories();

      if(response.status === 'error') {
        return response;
      }

      this.$patch({
        categories: response.data!.categories,
      });

      return response;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCategoriesStore, import.meta.hot));
}
