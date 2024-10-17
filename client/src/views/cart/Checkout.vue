<script setup lang="ts">
import {
  computed,
  onMounted,
  reactive,
  ref,
  nextTick
} from 'vue';
import { useRouter } from 'vue-router';
import { useOrdersStore } from '@/stores/orders';
import { useCartStore } from '@/stores/cart';
import { namePattern, phonePattern } from '@/utils/rules';
import type { Rule } from '@/components/base/form/types';
import Form from '@/components/base/form/Form.vue';
import FormItem from '@/components/base/form/FormItem.vue';
import TextButton from '@/components/base/button/TextButton.vue';
import Input from '@/components/base/input/Input.vue';
import Radio from '@/components/base/radio/Radio.vue';
import Divider from '@/components/base/divider/Divider.vue';
import useGlobalLoading from '@/components/base/loading';
import {
  payMethodOptions,
  pickMethodOptions,
  deliveryFeeMap,
} from '@/utils/checkoutConfig';
import useMessage from '@/components/base/message';
import CheckoutCartItem from './CheckoutCartItem.vue';
import CheckoutDetail from './CheckoutDetail.vue';

const router = useRouter();
const cartStore = useCartStore();
const ordersStore = useOrdersStore();

const ruleFormRef = ref();
const isSubmit = ref(false);
const form = reactive({
  payMethod: payMethodOptions[0].value,
  pickMethod: pickMethodOptions[0].value,
  name: '',
  phone: '',
});

const deliveryFee = computed(() => deliveryFeeMap[form.pickMethod as keyof typeof deliveryFeeMap]);

const rules = reactive<{ [key: string]: Rule[] }>({
  name: [
    {
      pattern: namePattern,
      message: '請填寫取貨人資訊',
    },
  ],
  phone: [
    {
      pattern: phonePattern,
      message: '取貨人手機號碼格式錯誤',
    },
  ],
});

async function handleSubmit () {
  isSubmit.value = true;
  const isFormValidate = ruleFormRef.value.validate();

  if (!isFormValidate) {
    isSubmit.value = false;
    return;
  }

  const { destroy } = useGlobalLoading();
  const response = await ordersStore.createOrder({ ...form, deliveryFee: deliveryFee.value });
  isSubmit.value = false;

  if (response.status === 'error') {
    useMessage({ message: '建立訂單失敗', type: 'error' });
    destroy();
    return;
  }

  const { id } = response.data!.order;
  if(form.payMethod === 'online') {
    const response = await ordersStore.checkout({ id });
    document.body.insertAdjacentHTML('afterend', response.data!.html);
    nextTick(() => {
      const form = document.getElementById('_form_aiochk');
      if (form) {
        // @ts-ignore
        form.submit();
      }
    });
  } else {
    router.push({ name: 'order', params: { id: response.data!.order.id } });
  }

  destroy();
}

onMounted(async () => {
  if (cartStore.cartItems.length) {
    return;
  }

  const { destroy } = useGlobalLoading();
  const response = await cartStore.getCart();
  destroy();

  if (response.status === 'error' || !cartStore.cartItems.length) {
    router.push({ name: 'home' });
  }
});

</script>

<template>
  <Form
    ref="ruleFormRef"
    :model="form"
    :rules="rules"
    @submit="handleSubmit"
    class="
      mx-auto
      flex flex-col items-center
      md:w-4/5
    "
  >
    <h1
      v-text="'訂單詳情'"
      class="text-xl font-bold text-center"
    />

    <Divider class="my-5" />

    <FormItem label="選擇付款方式" prop="payMethod">
      <Radio
        v-model="form.payMethod"
        :options="payMethodOptions"
      />
    </FormItem>

    <Divider class="mb-5" />

    <FormItem label="選擇取貨方式" prop="pickMethod">
      <Radio
        v-model="form.pickMethod"
        :options="pickMethodOptions"
      />
    </FormItem>

    <Divider class="mb-5" />

    <FormItem label="取貨人姓名" prop="name">
      <Input v-model="form.name" />
    </FormItem>

    <FormItem label="取貨人手機號碼" prop="phone">
      <Input v-model="form.phone" />
    </FormItem>

    <Divider class="my-5" />

    <CheckoutCartItem
      v-for="cartItem in cartStore.cartItems"
      :key="cartItem.id"
      :cartItem="cartItem"
    />

    <Divider class="my-5" />

    <CheckoutDetail
      class="self-end"
      :deliveryFee="deliveryFee"
    />

    <div class="w-full self-end flex justify-end gap-3">
      <TextButton
        text="返回購物車"
        class="
          !w-72
          my-4
          border-black
        "
        @click="router.push({ name: 'CartContent' })"
      />
      <TextButton
        text="結帳"
        type="submit"
        :disabled="isSubmit"
        class="
          !w-72
          my-4
          bg-primary-dark
        "
      />
    </div>
  </Form>
</template>
