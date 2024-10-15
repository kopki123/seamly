<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import useGlobalLoading from '@/components/base/loading';

const userStore = useUserStore();

onMounted(async () => {
  const { destroy } = useGlobalLoading();

  await userStore.getUserInfo();
  destroy();
});

</script>

<template>
  <div>
    <p>電子郵件地址： {{ userStore.email }}</p>
  </div>
</template>
