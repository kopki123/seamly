<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

</script>

<template>
  <Navbar />
  <div class="flex-[1_0_auto]">
    <RouterView />
  </div>
  <Footer />
</template>

<style lang="scss">

html,
body {
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
  user-select: none;
  font-family: "Noto Sans TC", sans-serif;
}

#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

img {
  pointer-events: none;
}

input {
  &[type="password"]::-ms-reveal {
    display: none;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  position: absolute;
  opacity: 0;
}
</style>
