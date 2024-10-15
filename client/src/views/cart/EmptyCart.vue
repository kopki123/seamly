<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ShoppingCartIcon } from '@heroicons/vue/24/outline';
import IconButton from '@/components/base/button/IconButton.vue';
import TextButton from '@/components/base/button/TextButton.vue';

const router = useRouter();

</script>

<template>
  <div
    class="
      mt-10 mx-auto
      flex flex-col justify-center items-center gap-4
    "
  >
    <IconButton
      :icon="ShoppingCartIcon"
      class="w-24 h-w-24 text-primary-dark"
    />
    <p
      v-text="'您的購物車中沒有商品'"
      class="text-xl font-semibold tracking-widest"
    />
    <TextButton
      text="去購物"
      class="
        !w-60
        my-4
        bg-primary-dark
      "
      @click="router.push({ name: 'home' })"
    />
  </div>
</template>
