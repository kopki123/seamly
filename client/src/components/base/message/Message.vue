<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import {
  InformationCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/vue/24/outline';
import type { MessageType } from './index';

const typeConfigMap: Record<MessageType, {
  icon: Function,
  class: string
}> = {
  info: {
    icon: InformationCircleIcon,
    class: 'bg-gray-100 border border-gray-400 text-gray-700',
  },
  success: {
    icon: CheckCircleIcon,
    class: 'bg-green-100 border border-green-400 text-green-700',
  },
  error: {
    icon: XCircleIcon,
    class: 'bg-red-100 border border-red-400 text-red-700',
  },
};

const props = withDefaults(defineProps<{
  message: string;
  type?: string;
  duration?: number;
  offset?: number;
  onDestroy: () => void;
  onClose: () => void;
}>(), {
  type: 'info',
  duration: 3000,
  offset: 20,
});

const isVisible = ref(false);
const top = computed(() => `${props.offset}px`);

const { icon, class: classString } = typeConfigMap[props.type as MessageType];

onMounted(() => {
  isVisible.value = true;

  setTimeout(() => {
    isVisible.value = false;
  }, props.duration);
});

</script>

<template>
  <transition
    name="fade"
    @before-leave="onClose"
    @after-leave="onDestroy"
  >
    <div
      v-show="isVisible"
      class="
        z-50
        fixed left-1/2
        px-3 py-2
        flex justify-center items-center gap-2
        rounded-lg
        -translate-x-1/2
      "
      :class="[classString]"
      :style="{top}"
    >
      <component
        :is="icon"
        class="w-4 h-4"
      />
      <p v-text="message"/>
    </div>
  </transition>
</template>
