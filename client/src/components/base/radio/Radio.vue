<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  modelValue: string | number | null;
  options: {
    value: string | number;
    label?: string;
    disabled?: boolean;
  }[];
  onChange?: (e: string | number | null) => void;
}>(), {
  onChange: undefined,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | null): void;
}>();

const radioId = String(Math.random()).slice(2);

const currentValue = computed({
  get () {
    return props.modelValue;
  },
  set (value) {
    emit('update:modelValue', value);
  },
});

</script>

<template>
  <div class="radio">
    <div
      v-for="option of options"
      :key="option.value"
      class="my-2"
    >
      <input
        v-model="currentValue"
        type="radio"
        :name="radioId"
        :id="`${String(option.value)}-${radioId}`"
        :value="option.value"
        :disabled="option?.disabled"
        :checked="option.value === currentValue"
        @change="onChange?.(currentValue)"
      >
      <label
        :for="`${String(option.value)}-${radioId}`"
        class="
          h-full
          ml-2
          [&>*]:pointer-events-none
        "
      >
        <slot
          name="option"
          v-bind="option"
        >
          {{ option.label }}
        </slot>
      </label>
    </div>
  </div>
</template>
