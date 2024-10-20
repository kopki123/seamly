<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { UserIcon, ShoppingCartIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/vue/24/outline';
import { useUserStore } from '@/stores/user';
import { useCartStore } from '@/stores/cart';
import IconButton from '@/components/base/button/IconButton.vue';

const userStore = useUserStore();
const cartStore = useCartStore();

async function logout () {
  const response = await userStore.logout();

  if (response.status === 'success') {
    window.location.replace('/');
  }
}

</script>

<template>
  <nav
    class="
      p-4
      bg-primary
    "
  >
    <div
      class="
        mx-auto
        max-w-[1280px]
        flex justify-between items-center
      "
    >
      <RouterLink
        to="/"
        class="
          text-xl text-primary-dark font-bold
          md:text-2xl lg:text-3xl
        "
      >
        Seamly
      </RouterLink>

      <ul class="flex justify-between items-center gap-4">
        <li v-if="userStore.isLoggedIn">
          <IconButton
            :icon="ArrowLeftStartOnRectangleIcon"
            class="w-[26px] h-[26px] text-white"
            @click="logout"
          />
        </li>
        <li v-if="userStore.isLoggedIn">
          <RouterLink to="/user">
            <UserIcon
              :icon="UserIcon"
              class="w-[26px] h-[26px] text-white"
            />
          </RouterLink>
        </li>
        <li>
          <RouterLink
            :to="userStore.isLoggedIn ? '/cart' : '/login'"
            class="relative"
          >
            <IconButton
              :icon="ShoppingCartIcon"
              class="w-[26px] h-[26px] text-white"
            />
            <p
              v-if="cartStore.numItemsInCart"
              v-text="cartStore.numItemsInCart"
              class="
                absolute top-[-6px] right-[-10px]
                w-5 h-5
                flex justify-center items-center
                text-white text-xs
                bg-primary-dark
                rounded-full
              "
            />
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>
