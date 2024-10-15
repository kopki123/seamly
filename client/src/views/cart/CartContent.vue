<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import useGlobalLoading from '@/components/base/loading';
import CartItem from './CartItem.vue';
import CartDetail from './CartDetail.vue';
import EmptyCart from './EmptyCart.vue';

const router = useRouter();
const cartStore = useCartStore();
const isLoading = ref(true);

onMounted(async () => {
  const { destroy } = useGlobalLoading();
  const response = await cartStore.getCart();

  if (response.status === 'error') {
    destroy();
    router.push({ name: 'home' });
    return;
  }

  isLoading.value = false;
  destroy();
});

</script>

<template>
  <EmptyCart v-if="isLoading || !cartStore.cartTotal" />
  <div
    v-else
    class="grid gap-8 md:grid-cols-12"
  >
    <div class="md:col-span-8">
      <CartItem
        v-for="cartItem in cartStore.cartItems"
        :key="cartItem.id"
        :cartItem="cartItem"
      />
    </div>

    <div class="md:col-span-4">
      <CartDetail />
    </div>
  </div>
</template>
