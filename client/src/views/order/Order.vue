<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useOrdersStore } from '@/stores/orders';
import useGlobalLoading from '@/components/base/loading';
import type { Order } from '@/api/orders/getAllOrders';
import convertDateToDateString from '@/utils/convertDateToDateString';
import maskPhoneNumber from '@/utils/maskPhoneNumber';
import { pickMethodOptions } from '@/utils/checkoutConfig';

const route = useRoute();
const router = useRouter();
const ordersStore = useOrdersStore();

const isLoading = ref(true);
const order = ref<Order>();

const orderInfo = computed<{ name: string, value: string | number }[]>(() => {
  if (!order.value) {
    return [];
  }

  const {
    id,
    name,
    phone,
    totalAmount,
    pickMethod,
    deliveryFee,
    createdAt,
  } = order.value;

  const { label: pickMethodLabel } = pickMethodOptions.find(({ value }) => value === pickMethod)!;

  return [
    { name: '配送方式', value: pickMethodLabel },
    { name: '訂單編號', value: id },
    { name: '訂單確認日期', value: convertDateToDateString(new Date(createdAt)) },
    { name: '取貨人', value: name },
    { name: '聯繫方式', value: maskPhoneNumber(phone) },
    { name: '運費', value: `$${deliveryFee}` },
    { name: '總金額', value: `$${totalAmount}` },
  ];
});

onMounted(async () => {
  const { destroy } = useGlobalLoading();
  const response = await ordersStore.getSingleOrder({ id: route.params.id as string });
  isLoading.value = false;
  destroy();

  if (response.status === 'error') {
    router.back();
  }

  order.value = response.data?.order;
});

</script>

<template>
  <div
    v-if="!isLoading"
    class="
      max-w-[1280px]
      mt-10 mx-auto
      px-4 sm:py-5 sm:px-20
    "
  >
    <h1 class="text-2xl mb-5">訂單資訊</h1>

    <div
      v-for="(item, index) in orderInfo"
      :key="index"
      class="
        my-3
        flex gap-2
        md:text-lg
      "
    >
      <div class="shrink-0">{{ item.name }}：</div>
      <div>{{ item.value }}</div>
    </div>

    <div class="text-2xl mt-10">商品詳情</div>

    <div
      v-for="item in order!.orderItems"
      :key="item.id"
      class="
        w-full
        my-3
        px-4 py-2
        rounded-xl
        shadow-md
        flex flex-col gap-4
        sm:flex-row sm:justify-between sm:items-end
      "
    >
      <div class="flex gap-3">
        <img
          :src="item.product.image"
          alt=""
          class="
            w-16 h-16
            object-cover
            rounded-xl
            overflow-hidden
          "
        >
        <div class="flex flex-col gap-2">
          <p v-text="item.product.title" class="text-lg" />
          <p v-text="item.product.description" class="text-xs" />
        </div>
      </div>

      <div class="w-2/3 flex justify-between items-baseline">
        <p class="text-xs sm:text-md text-primary-dark">
          NT.
          <span
            v-text="item.product.price"
            class="text-lg sm:text-2xl"
          />
        </p>

        <p
          v-text="`數量 : ${item.quantity}`"
          class="text-sm sm:text-xl"
        />

        <p class="text-xs sm:text-md text-primary-dark">
          NT.
          <span
            v-text="item.product.price * item.quantity"
            class="text-lg sm:text-2xl"
          />
        </p>
      </div>
    </div>

  </div>
</template>
