<script setup lang="ts">
import { watch, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { TrashIcon } from '@heroicons/vue/24/outline';
import { useCartStore } from '@/stores/cart';
import type { CartItem } from '@/api/cart/getCart';
import useDebounce from '@/utils/useDebounce';
import NumberInput from '@/components/base/numberInput/NumberInput.vue';
import IconButton from '@/components/base/button/IconButton.vue';
import ImageLoader from '@/components/base/ImageLoader.vue';
import useGlobalLoading from '@/components/base/loading';

const props = defineProps<{
  cartItem: CartItem;
}>();

const router = useRouter();
const cartStore = useCartStore();

const quantity = ref(props.cartItem.quantity);
const total = computed(() => props.cartItem.product.price * props.cartItem.quantity);

async function removeCartItem () {
  const { destroy } = useGlobalLoading();
  const response = await cartStore.removeCartItem({ id: props.cartItem.id });

  if (response.status === 'error') {
    destroy();
    return;
  }

  destroy();
}

watch(() => props.cartItem.quantity, (value: number) => { quantity.value = value; });
watch(quantity, useDebounce(async (value: number) => {
  if (quantity.value === props.cartItem.quantity) {
    return;
  }

  const { destroy } = useGlobalLoading();
  const response = await cartStore.updateCartItem({
    id: props.cartItem.id,
    quantity: value,
  });

  if (response.status === 'error') {
    quantity.value = props.cartItem.quantity;
  }

  destroy();
}, 1));

</script>

<template>
  <div
    class="
      w-full
      mb-4
      p-4
      rounded-xl
      shadow-md
      flex flex-col justify-between gap-4
      md:flex-row
    "
  >
    <div
      class="flex gap-3 hover:cursor-pointer"
      @click="router.push({ name: 'product', params: { id: cartItem.product.id } })"
    >
      <ImageLoader
        :src="cartItem.product.image"
        alt=""
        class="
          w-20 h-20
          lg:w-32 lg:h-32
          object-cover aspect-square
          rounded
          overflow-hidden
        "
      />

      <div class="flex flex-col gap-2">
        <p
          v-text="cartItem.product.title"
          class="text-xl"
        />
        <p
          v-text="cartItem.product.description"
          class="text-sm"
        />
        <p class="text-xs text-primary-dark">
          NT.
          <span
            v-text="cartItem.product.price"
            class="text-lg"
          />
        </p>
      </div>
    </div>

    <div class="flex flex-row items-center gap-3 md:flex-col md:items-start">
      <p class="shrink-0">數量 : </p>
      <NumberInput
        v-model="quantity"
        :min="1"
        class="w-36"
      />
      <IconButton
        :icon="TrashIcon"
        class="w-7 h-7 p-1"
        @click="removeCartItem"
      />
    </div>

    <p class="text-xs sm:text-md text-primary-dark">
      NT.
      <span
        v-text="total"
        class="text-lg sm:text-2xl"
      />
    </p>
  </div>
</template>
