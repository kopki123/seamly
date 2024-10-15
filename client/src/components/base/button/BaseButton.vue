<script setup lang="ts">

withDefaults(defineProps<{
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}>(), {
  type: 'button',
  disabled: false,
});

</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="
      select-none
      duration-200
      [&>*]:pointer-events-none
      will-change-transform
      flex justify-center items-center
    "
    :class="{
      'active:scale-[0.96]': !disabled,
      'opacity-50 pointer-events-none': disabled,
    }"
    style="-webkit-tap-highlight-color: transparent;"
    @touchstart.passive
  >
    <slot />
  </button>
</template>
