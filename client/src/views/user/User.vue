<script setup lang="ts">
import { RouterLink } from 'vue-router';

const links = [
  { name: '會員資料', path: '/user' },
  { name: '訂單資料', path: '/user/orders' },
];

</script>

<template>
  <div
    class="
      h-full
      max-w-[1280px]
      mt-10 mx-auto
      px-4 sm:py-10 md:px-12
    "
  >
    <div
      class="
        md:h-full
        grid gap-8 md:grid-cols-12
      "
    >
      <div
        class="
          md:col-span-2
          pb-3 md:pb-0
          flex flex-col gap-3 md:items-center
          text-lg font-light
          border-b-2 md:border-b-0
        "
      >
        <RouterLink
          v-for="({ name, path }, index) in links"
          :key="index"
          :to="path"
        >
          {{ name }}
        </RouterLink>
      </div>

      <div class="md:col-span-10">
        <RouterView />
      </div>
    </div>
  </div>
</template>
