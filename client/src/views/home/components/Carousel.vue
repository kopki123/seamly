<script setup lang="ts">
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation } from 'swiper/modules';
import slider1 from '@/assets/images/slider-1.webp';
import slider2 from '@/assets/images/slider-2.webp';

const modules = [Navigation, Pagination];
const carouselImgUrls = [
  slider1,
  slider2,
  slider1,
  slider2,
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
