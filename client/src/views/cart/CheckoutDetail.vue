<script setup lang="ts">
import { computed } from 'vue';
import { useCartStore } from '@/stores/cart';

const props = defineProps<{
  deliveryFee: number;
}>();

const cartStore = useCartStore();
const total = computed(() => props.deliveryFee + cartStore.cartTotal);

</script>

<template>
  <table>
    <tbody>
      <tr>
        <td class="text-right pr-5">{{ cartStore.numItemsInCart }}件商品，商品金額： </td>
        <td class="text-right">$ {{ cartStore.cartTotal }}</td>
      </tr>
      <tr>
        <td class="text-right pr-5">運費： </td>
        <td class="text-right">$ {{ deliveryFee }}</td>
      </tr>
      <tr>
        <td class="text-right pr-5">應付金額： </td>
        <td class="text-right">$ {{ total }}</td>
      </tr>
    </tbody>
  </table>
</template>
