<script setup lang="ts">
import { ref, computed } from 'vue';
import { ChevronDownIcon } from '@heroicons/vue/24/outline';


const props = withDefaults(defineProps<{
  modelValue: string | number;
  options: {
    value: string | number;
    label: string;
  }[];
  onChange?: null | ((value: string | number) => void);
}>(), {
  onChange: null,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

const isOpen = ref(false);

const currentValue = computed({
  get () {
    return props.modelValue;
  },
  set (value) {
    emit('update:modelValue', value);
  },
});

const currentOption = computed(() => props.options.find(({ value }) => value === currentValue.value)!);

</script>

<template>
  <div
    class="
      select
      relative
      bg-white
      border-2 border-gray-200
      rounded-sm
      shadow-[0_0px_2px_rgba(0,0,0,0.6)]
      font-light
      pointer-events-none
    "
    :class="{
      open: isOpen,
    }"
  >

    <select
      v-model="currentValue"
      class="
        pr-8
        w-full h-8
        opacity-0
        pointer-events-auto
      "
      @change="onChange?.(currentValue)"
      @click="isOpen = !isOpen"
      @blur="isOpen = false"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        class="
          whitespace-normal
          text-white font-light
          bg-primary
        "
      >
        {{ option.label }}
      </option>
    </select>
    <div
      v-text="currentOption.label"
      class="
        absolute left-0 top-0
        w-full h-full
        px-2
        flex items-center
      "
    />
    <ChevronDownIcon
      class="
        absolute right-2 bottom-1/2
        w-4 h-4
        translate-y-1/2
        transition-transform ease-in duration-200
      "
      :class="{
        'rotate-0': isOpen,
        'rotate-180': !isOpen,
      }"
    />
  </div>
</template>

<style scoped lang="scss">

select::-ms-expand {
  display: none;
}

</style>
