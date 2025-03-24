<script setup lang="ts">
import Carousel from './components/Carousel.vue';
import SearchBar from './components/SearchBar.vue';
import Products from './components/Products.vue';
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
