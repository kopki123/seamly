<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { verifyEmail } from '@/api/auth';
import { CheckCircleIcon } from '@heroicons/vue/24/outline';
import useMessage from '@/components/base/message';

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  const { token, email } = route.query;

  const response = await verifyEmail({
    verificationToken: token as string,
    email: email as string,
  });

  if (response.status === 'error') {
    useMessage({ message: response.message, type: 'error' });
    return;
  }

  useMessage({ message: '驗證成功，5秒後跳轉至登入頁', type: 'success' });
  setTimeout(() => {
    router.push({ name: 'login' });
  }, 5000);
});

</script>

<template>
  <div
    class="
      w-[200px]
      mt-12 mx-auto
      text-center
    "
  >
    <div class="flex justify-center items-center gap-2">
      <h1
        v-text="'帳號已驗證'"
        class="text-xl my-5"
      />
      <CheckCircleIcon class="w-6 h-6" />
    </div>

    <RouterLink
      to="/login"
      class="text-primary"
    >
      立即登入
    </RouterLink>
  </div>
</template>
