<script setup lang="ts">
import { ref, computed } from 'vue';
import BaseButton from '@/components/base/button/BaseButton.vue';
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline';

const props = withDefaults(defineProps<{
  modelValue: string;
  disabled?: boolean;
  placeholder?: string;
  type?: 'text' | 'number' | 'password' | 'email';
  maxlength?: number;
  onChange?: (value: string) => void;
}>(), {
  disabled: false,
  placeholder: '',
  type: 'text',
  maxlength: Infinity,
  onChange: undefined,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const isPasswordVisible = ref(false);
const isPassword = computed(() => props.type === 'password');
const inputType = computed(() => {
  if (!isPassword.value) {
    return props.type;
  }

  return isPasswordVisible.value ? 'text' : 'password';
});

const inputValue = computed({
  get () {
    return props.modelValue;
  },
  set (value) {
    emit('update:modelValue', value);
  },
});

function togglePasswordVisible () {
  isPasswordVisible.value = !isPasswordVisible.value;
}

</script>

<template>
  <div
    class="
      input-main
      relative
      flex items-center
      h-9
      bg-white
      border-2 border-gray-200
      rounded-sm
      shadow-[0_0px_2px_rgba(0,0,0,0.6)]
    "
  >
    <input
      v-model="inputValue"
      :type="inputType"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :disabled="disabled"
      autocapitalize="none"
      class="
        w-full h-full
        px-[5px]
        bg-transparent
        text-black font-medium
        outline outline-0
      "
      :class="{
        'pr-[28px]': type === 'password',
      }"
      style="font-size: inherit;"
      @change="onChange?.(inputValue)"
    >
    <BaseButton
      v-if="isPassword"
      class="
        absolute right-0
        w-[20px] h-[20px]
        mx-[5px]
        text-gray-500/50
      "
      @click="togglePasswordVisible"
    >
      <component :is="isPasswordVisible ? EyeIcon : EyeSlashIcon" />
    </BaseButton>
  </div>
</template>
