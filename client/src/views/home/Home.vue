<script setup lang="ts">
import Carousel from '@/views/home/components/Carousel.vue';
import SearchBar from '@/views/home/components/SearchBar.vue';
import Products from '@/views/home/components/Products.vue';
</script>

<template>
  <div
    class="
      max-w-[1280px]
      mt-12 mx-auto
    "
  >
    <Carousel />
    <SearchBar />
    <Products />
  </div>
</template>
