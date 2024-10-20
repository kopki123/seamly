<script setup lang="ts">
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation } from 'swiper/modules';

const modules = [Navigation, Pagination];
const carouselImgUrls = [
  'https://rhhmkjqbhjbtggyyuoie.supabase.co/storage/v1/object/public/main-bucket/1729006363481-slider-1.png',
  'https://rhhmkjqbhjbtggyyuoie.supabase.co/storage/v1/object/public/main-bucket/1729008984617-slider-2.png',
];

const pagination = {
  clickable: true,
};

</script>

<template>
  <Swiper
    :pagination="pagination"
    :navigation="true"
    :modules="modules"
    class="
      swiper
      w-full
      aspect-square
      sm:h-[768px]
    "
  >
    <SwiperSlide
      v-for="(img, index) in carouselImgUrls"
      :key="index"
    >
      <img
        :src="img"
        alt=""
        class="
          object-cover object-top
          w-full h-full
        "
      >
    </SwiperSlide>
  </Swiper>
</template>

<style>

.swiper {
  --swiper-theme-color: #B0A695;
  --swiper-navigation-color: #B0A695;
  --swiper-navigation-size: 30px;
}

</style>
