<script setup lang="ts">
import { onMounted } from 'vue';
import { useOrdersStore } from '@/stores/orders';
import useGlobalLoading from '@/components/base/loading';
import OrderItem from './OrderItem.vue';

const ordersStore = useOrdersStore();

onMounted(async () => {
  const { destroy } = useGlobalLoading();
  await ordersStore.getAllOrders();

  destroy();
});

</script>

<template>
  <div v-if="ordersStore.orders.length">
    <OrderItem
      v-for="order in ordersStore.orders"
      :key="order.id"
      :order="order"
    />
  </div>
  <div
    v-else
    v-text="'尚未有任何訂單'"
  />
</template>
