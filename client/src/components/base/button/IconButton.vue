<script lang="ts">
import { defineComponent } from 'vue';
import BaseButton from '@/components/base/button/BaseButton.vue';

export default defineComponent({
  extends: BaseButton,
  components: {
    BaseButton,
  },
  props: {
    icon: {
      type: [String, Function],
      required: false,
      default: undefined,
    },
  },
  setup (this, props) {
    const isComponent = typeof props.icon === 'function';

    return {
      isComponent,
    };
  },
});

</script>

<template>
  <BaseButton
    v-bind="$props"
    class="
      flex justify-center items-center
      [&>*]:w-full [&>*]:h-full
    "
  >
    <slot>
      <component
        v-if="isComponent"
        :is="icon"
      />
      <img
        v-else
        :src="(icon as string)"
        alt=""
      >
    </slot>
  </BaseButton>
</template>
