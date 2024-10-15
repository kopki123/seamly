<script setup lang="ts">
import { computed } from 'vue';
import { PlusIcon, MinusIcon } from '@heroicons/vue/24/outline';
import BaseButton from '@/components/base/button/BaseButton.vue';

const props = withDefaults(defineProps<{
  modelValue: number;
  step?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
}>(), {
  step: 1,
  min: -Infinity,
  max: Infinity,
  disabled: false,
  onChange: undefined,
});
const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>();

const inputValue = computed({
  get () {
    return props.modelValue;
  },
  set (value) {
    const parsedValue = Math.max(props.min, Math.min(props.max, +value));
    emit('update:modelValue', parsedValue);
  },
});

const isMinReached = computed(() => inputValue.value === props.min);
const isMaxReached = computed(() => inputValue.value === props.max);

function format (number: number) {
  let formatted = number ?? inputValue.value;

  if (formatted < props.min) {
    formatted = props.min;
  }

  if (formatted > props.max) {
    formatted = props.max;
  }

  return formatted;
}

// eslint-disable-next-line vue/no-dupe-keys
function step (type: 'increment' | 'decrement') {
  const raw = inputValue.value + props.step * (type === 'increment' ? 1 : -1);
  const formatted = format(raw);

  props.onChange?.(formatted);
  inputValue.value = formatted;
}

</script>

<template>
  <div
    class="
      w-full h-10
      p-2
      inline-flex justify-between items-center gap-4
      text-center
      bg-white
      border rounded-lg
      select-none
    "
  >
    <BaseButton
      :disabled="disabled || isMinReached"
      class="w-4 h-4"
      @pointerdown="step('decrement')"
    >
      <MinusIcon />
    </BaseButton>
    <slot v-bind="{ value: inputValue }">
      <div
        v-text="inputValue"
        class="w-6"
      />
    </slot>
    <BaseButton
      :disabled="disabled || isMaxReached"
      class="w-4 h-4"
      @pointerdown="step('increment')"
    >
      <PlusIcon />
    </BaseButton>
  </div>
</template>
