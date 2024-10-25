<script setup lang="ts">
import type { CartItem } from '@/api/cart/getCart';

defineProps<{
  cartItem: CartItem;
}>();

</script>

<template>
  <div
    class="
      w-full
      px-4 py-2
      rounded-xl
      shadow-md
      flex flex-col gap-4
      sm:flex-row sm:justify-between sm:items-end
    "
  >
    <div class="sm:w-1/2 flex gap-3">
      <img
        :src="cartItem.product.image"
        alt=""
        class="
          w-16 h-16
          object-cover aspect-square
          rounded
          overflow-hidden
        "
      >
      <div class="flex flex-col gap-2">
        <p v-text="cartItem.product.title" class="text-lg" />
        <p v-text="cartItem.product.description" class="text-xs" />
      </div>
    </div>

    <div class="sm:w-1/2 flex justify-between items-baseline">
      <p class="text-xs sm:text-md text-primary-dark">
        NT.
        <span
          v-text="cartItem.product.price"
          class="text-lg sm:text-2xl"
        />
      </p>

      <p
        v-text="`數量 : ${cartItem.quantity}`"
        class="text-sm sm:text-xl"
      />

      <p class="text-xs sm:text-md text-primary-dark">
        NT.
        <span
          v-text="cartItem.product.price * cartItem.quantity"
          class="text-lg sm:text-2xl"
        />
      </p>
    </div>
  </div>
</template>
