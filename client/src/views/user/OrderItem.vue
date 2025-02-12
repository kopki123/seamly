<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import convertDateToDateString from '@/utils/convertDateToDateString';
import { ChevronRightIcon } from '@heroicons/vue/24/outline';
import type { Order } from '@/api/orders/getAllOrders';
import ImageLoader from '@/components/base/ImageLoader.vue';

const props = defineProps<{
  order: Order;
}>();

const router = useRouter();

const totalQuantity = computed(() => {
  return props.order.orderItems.reduce((sum, { quantity }) => sum + quantity, 0);
});

</script>

<template>
  <div
    class="
      mb-4
      py-3
      flex flex-col gap-3
      rounded-lg
      shadow-lg
      hover:cursor-pointer
    "
    @click="router.push(`/order/${order.id}`)"
  >
    <div class="px-3 text-sm">
      <p v-text="`建立時間： ${convertDateToDateString(new Date(order.createdAt))}`" />
      <p v-text="`訂單編號： ${order.id}`" />
    </div>
    <div
      class="
        p-3
        flex justify-between items-center
        border-y
      "
    >
      <div class="flex items-center gap-2 overflow-hidden">
        <ImageLoader 
          v-for="item in order.orderItems.slice(0, 3)"
          :key="item.id"
          :src="item.product.image"
          alt=""
          class="
            w-16 h-16
            object-cover aspect-square
            rounded
            overflow-hidden
          "
        />
      </div>
      <div
        class="
          shrink-0
          flex justify-end items-center
          text-sm
        "
      >
        <p v-text="`共${totalQuantity}件商品`" />
        <ChevronRightIcon class="w-4 h-4" />
      </div>
    </div>
    <div class="px-3 self-end">
      <div>
        總金額：
        <span class="text-primary-dark">$ {{ order.totalAmount }}</span>
      </div>
    </div>
  </div>
</template>
