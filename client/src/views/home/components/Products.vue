<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProductsStore } from '@/stores/products';
import useGlobalLoading from '@/components/base/loading';

const router = useRouter();
const productsStore = useProductsStore();

function handleClick (id: string) {
  router.push({ name: 'product', params: { id } });
}

onMounted(async () => {
  const { destroy } = useGlobalLoading();
  await productsStore.getAllProducts();
  destroy();
});

</script>

<template>
  <div
    class="
      mt-8 mx-auto
      px-4
      grid gap-4
      xl:px-0 sm:grid-cols-2 lg:grid-cols-4
    "
  >
    <div
      v-for="product in productsStore.products"
      :key="product.id"
      class="
        p-3
        rounded-xl
        shadow
        hover:shadow-lg hover:cursor-pointer
      "
      @click="handleClick(product.id)"
    >
      <img
        :src="product.image"
        alt=""
        class="
          w-full
          object-cover aspect-square
          rounded
          overflow-hidden
        "
      >
      <div
        class="
          mt-6
          px-1
          flex justify-between items-end
          text-center
        "
      >
        <p
          v-text="product.title"
          class="text-md sm:text-lg tracking-wide"
        />

        <p class="text-xs sm:text-md text-primary-dark font-light">
          NT.
          <span
            v-text="product.price"
            class="text-base sm:text-lg"
          />
        </p>
      </div>
    </div>
  </div>
</template>
