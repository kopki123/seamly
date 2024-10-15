<script setup lang="ts">
import { useRouter } from 'vue-router';
import TextButton from '@/components/base/button/TextButton.vue';
import { useCartStore } from '@/stores/cart';
import Divider from '@/components/base/divider/Divider.vue';

const router = useRouter();
const cartStore = useCartStore();

</script>

<template>
  <div
    class="
      p-8
      rounded-xl
      shadow-md
    "
  >
    <div class="my-3 flex justify-between">
      <span v-text="'商品金額'" />
      <span v-text="`$ ${cartStore.cartTotal}`" />
    </div>

    <Divider class="my-3" />

    <div class="mt-3 flex justify-end items-end gap-2">
      <span v-text="'小計'" />
      <span
        v-text="`$ ${cartStore.cartTotal}`"
        class="text-2xl"
      />
    </div>
  </div>

  <TextButton
    text="下一步"
    class="
      my-8
      bg-primary-dark
    "
    @click="router.push({ name: 'orderCheckout' })"
  />
</template>
