<script lang="ts">
import { defineComponent } from 'vue';
import BaseButton from '@/components/base/button/BaseButton.vue';

export default defineComponent({
  extends: BaseButton,
  components: {
    BaseButton,
  },
  props: {
    text: {
      type: String,
      required: false,
      default: '',
    },
  },
});

</script>

<template>
  <BaseButton
    v-bind="$props"
    class="
      w-full h-11
      p-5
      flex justify-center items-center
      bg-black
      text-white font-semibold
      whitespace-nowrap
      rounded-md
    "
  >
    <slot>
      {{ text }}
    </slot>
  </BaseButton>
</template>
