<script setup lang="ts">
import { ref } from 'vue';
import Mask from '@/components/base/Mask.vue';
import Spinner from '@/components/base/Spinner.vue';

const isVisible = ref(false);

function toggleVisible (value: boolean) {
  isVisible.value = value;
}

defineExpose({ toggleVisible });

</script>

<template>
  <transition name="fade">
    <Mask v-if="isVisible">
      <div class="w-12 h-12">
        <Spinner />
      </div>
    </Mask>
  </transition>
</template>
