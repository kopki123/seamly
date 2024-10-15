<script setup lang="ts">
import { reactive, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { passwordPattern, emailPattern } from '@/utils/rules';
import Form from '@/components/base/form/Form.vue';
import FormItem from '@/components/base/form/FormItem.vue';
import type { Rule } from '@/components/base/form/types';
import TextButton from '@/components/base/button/TextButton.vue';
import Input from '@/components/base/input/Input.vue';
import { useUserStore } from '@/stores/user';
import useGlobalLoading from '@/components/base/loading';
import useMessage from '@/components/base/message';

const router = useRouter();
const userStore = useUserStore();

const ruleFormRef = ref();
const isSubmit = ref(false);
const form = reactive({
  email: '',
  password: '',
});

const rules = reactive<{ [key: string]: Rule[] }>({
  email: [
    {
      pattern: emailPattern,
      message: '請輸入有效email格式',
    },
  ],
  password: [
    {
      pattern: passwordPattern,
      message: '請輸入6-16位字母或數字',
    },
  ],
});

async function handleSubmit () {
  isSubmit.value = true;
  const isFormValidate = ruleFormRef.value.validate();

  if (!isFormValidate) {
    isSubmit.value = false;
    return;
  }

  const { destroy } = useGlobalLoading();
  const response = await userStore.login(form);
  isSubmit.value = false;
  destroy();

  if (response.status === 'error') {
    useMessage({ message: response.message, type: 'error' });
    return;
  }

  await router.replace('/');
}

</script>

<template>
  <Form
    ref="ruleFormRef"
    :model="form"
    :rules="rules"
    class="
      w-[90%]
      max-w-[450px]
      mx-auto mt-10
      p-8
      flex flex-col items-center
      bg-white
      rounded-2xl
    "
    @submit="handleSubmit"
  >
    <p
      class="text-xl font-bold text-center"
      v-text="'登入'"
    />

    <div
      class="
        mt-2 mb-4
        text-sm text-center
      "
    >
      尚未註冊？
      <RouterLink
        to="/register"
        class="text-primary"
      >
        立即註冊
      </RouterLink>
    </div>

    <FormItem label="電子郵件" prop="email">
      <Input v-model="form.email" type="email" />
    </FormItem>

    <FormItem label="密碼" prop="password">
      <Input v-model="form.password" type="password" />
    </FormItem>

    <TextButton
      text="登入"
      type="submit"
      :disabled="isSubmit"
      class="
        my-4
        bg-primary-dark
      "
    />
  </Form>
</template>
