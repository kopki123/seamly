<script setup lang="ts">
import { computed, onMounted, reactive, watch } from 'vue';
import { useProductsStore } from '@/stores/products';
import { useCategoriesStore } from '@/stores/categories';
import Input from '@/components/base/input/Input.vue';
import Select from '@/components/base/select/Select.vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import useDebounce from '@/utils/useDebounce';

const sortOptions = [
  { label: '最新', value: 'newest' },
  { label: '最舊', value: 'oldest' },
  { label: '熱銷', value: 'bestselling' },
  { label: '價格 : 高到低', value: 'price-high-to-low' },
  { label: '價格 : 低到高', value: 'price-low-to-high' },
];

const productsStore = useProductsStore();
const categoriesStore = useCategoriesStore();

const filter = reactive({
  categoryId: 'all',
  keyword: '',
  sort: 'newest'
});

const categories = computed(() => ([
  { id: 'all', name: '所有商品' },
  ...categoriesStore.categories
]));

watch(filter, useDebounce(async (value) => {
  await productsStore.getAllProducts({
    categoryId: value.categoryId === 'all' ? '' : value.categoryId,
    keyword: value.keyword,
    sort: value.sort
  });
}, 0.8))

onMounted(async () => {
  await categoriesStore.getAllCategories();
})

</script>

<template>
  <div
    class="
      mt-6 mx-auto
      px-4 xl:px-0
    "
  >
    <div
      class="
        mb-4 mx-auto lg:mb-10
        text-sm lg:text-lg text-primary text-center
        grid grid-cols-3 lg:flex justify-center items-center
      "
    >
      <div
        v-for="category in categories"
        :key="category.id"
        v-text="category.name"
        :class="{
          'text-primary-dark': category.id === filter.categoryId
        }"
        class="
          px-4 py-2
          lg:px-14 lg:py-4
          lg:border-r-2 lg:border-r-primary
          last:border-r-0
          hover:cursor-pointer
        "
        @click="filter.categoryId = category.id"
      />
    </div>

    <div
      class="
        flex flex-col gap-4
        sm:flex-row sm:justify-between sm:items-center
      "
    >
      <div class="self-end flex items-center gap-3">
        <MagnifyingGlassIcon class="w-4 h-4 text-primary-dark" />
        <Input
          v-model="filter.keyword"
          class="text-sm"
        />
      </div>

      <!-- <div
        class="
          md:col-span-2
          w-full
          flex justify-center items-center gap-3
        "
      >
        <CurrencyDollarIcon class="shrink-0 w-4 h-4 text-primary-dark" />
        <Input
          v-model="filter.minPrice"
          type="number"
          placeholder="最小值"
          class="w-full text-sm"
        />
        <Input
          v-model="filter.maxPrice"
          type="number"
          placeholder="最大值"
          class="w-full text-sm"
        />
      </div> -->

      <Select
        v-model="filter.sort"
        :options="sortOptions"
        class="self-end text-sm"
      />
    </div>
  </div>
</template>


