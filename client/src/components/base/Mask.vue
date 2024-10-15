<script setup lang="ts">

withDefaults(defineProps<{
  zIndex?: number;
}>(), {
  zIndex: 10,
});

</script>

<template>
  <div
    class="
      z-[var(--z-index)]
      fixed left-0 top-0
      w-full h-full
      bg-black/60
      flex justify-center items-center
      will-change-transform
    "
    :style="{
      '--z-index': zIndex,
    }"
  >
    <slot />
  </div>
</template>
