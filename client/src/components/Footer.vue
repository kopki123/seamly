<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>

<template>
  <footer
    class="
      shrink-0
      mt-16
      px-4 py-8
      bg-primary
      text-white
      shadow-[0_-5px_10px_rgba(0,0,0,0.1)]
    "
  >
    <div
      class="
        mx-auto
        max-w-[1280px]
        flex flex-col justify-between items-center gap-3
        sm:flex-row
      "
    >
      <div
        class="
          flex justify-between items-center gap-5
          text-xs
        "
      >
        <RouterLink to="/">聯絡我們</RouterLink>
        <RouterLink to="/">最新消息</RouterLink>
      </div>

      <div
        class="
          flex justify-between items-center gap-5
          text-xs
        "
      >
        <RouterLink to="/">網站使用條款</RouterLink>
        <RouterLink to="/">免責聲明</RouterLink>

        <p>&copy; {{ new Date().getFullYear() }} Seamly</p>
      </div>
    </div>
  </footer>
</template>
