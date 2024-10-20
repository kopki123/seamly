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
      mt-12 mx-auto
      px-4
      grid gap-4
      xl:px-0 sm:grid-cols-2 lg:grid-cols-3
    "
  >
    <div
      v-for="product in productsStore.products"
      :key="product.id"
      class="
        h-96
        p-4
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
          w-full h-5/6
          rounded
          overflow-hidden
        "
      >
      <div
        class="
          mt-6
          px-1
          flex justify-between items-end gap-1
          text-center
        "
      >
        <p
          v-text="product.title"
          class="text-xl sm:text-3xl tracking-wider font-semibold"
        />
        <p class="text-xs sm:text-md text-primary-dark">
          NT.
          <span
            v-text="product.price"
            class="text-lg sm:text-2xl"
          />
        </p>
      </div>
    </div>
  </div>
</template>
