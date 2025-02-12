<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useProductsStore } from '@/stores/products';
import { useCartStore } from '@/stores/cart';
import type { Product } from '@/api/products/getAllProducts';
import NumberInput from '@/components/base/numberInput/NumberInput.vue';
import TextButton from '@/components/base/button/TextButton.vue';
import ImageLoader from '@/components/base/ImageLoader.vue';
import useGlobalLoading from '@/components/base/loading';
import useMessage from '@/components/base/message';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const productsStore = useProductsStore();
const cartStore = useCartStore();

const isLoading = ref(false);
const product = ref<Product>();
const quantity = ref(1);

async function addToCart () {
  if (!userStore.isLoggedIn) {
    router.push({ name: 'login' });
    return;
  }

  const { destroy } = useGlobalLoading();
  const response = await cartStore.addCartItem({
    productId: product.value!.id,
    quantity: quantity.value,
  });

  if (response.status === 'error') {
    destroy();
    useMessage({ message: '新增失敗', type: 'error' });
    return;
  }

  useMessage({ message: '新增至購物車', type: 'success' });
  destroy();
}

onMounted(async () => {
  const { destroy } = useGlobalLoading();
  const { params: { id } } = route;
  const response = await productsStore.getSingleProduct({ id: id as string });

  if (response.status === 'error') {
    destroy();
    router.push({ name: 'home' });
    return;
  }

  product.value = response.data!.product;
  isLoading.value = true;
  destroy();
});

</script>

<template>
  <div
    v-if="isLoading"
    class="
      max-w-[1280px]
      mt-10 mx-auto
      px-8 sm:py-10
    "
  >
    <div
      class="
        mx-auto
        grid gap-y-8
        md:grid-cols-2 md:gap-x-16
      "
    >
      <ImageLoader
        :src="product!.image"
        alt=""
        class="
          max-h-[500px]
          object-cover aspect-square
          rounded
          overflow-hidden
        "
      />
      <div class="flex flex-col gap-4">
        <p
          v-text="product!.title"
          class="text-3xl font-bold"
        />
        <p
          v-text="product!.description"
          class="text-xl mt-2"
        />
        <p
          class="
            w-24
            px-2 py-1
            flex justify-around items-baseline
            text-primary-dark font-medium
            bg-primary-light
            rounded-lg
          "
        >
          NT.
          <span
            v-text="product!.price"
            class="text-2xl"
          />
        </p>

        <p
          v-text="`已銷售${product!.sold}件`"
          class="text-sm"
        />

        <p
          v-text="product!.content"
          class="leading-8 text-gray-500/75"
        />

        <NumberInput
          class="!w-32"
          v-model="quantity"
          :min="1"
        />

        <TextButton
          text="加入購物車"
          class="
            !w-1/2
            my-4
            text-center
            bg-primary
          "
          @click="addToCart"
        />
      </div>
    </div>
  </div>
</template>
