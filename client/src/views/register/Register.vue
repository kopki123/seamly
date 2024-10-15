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
  const response = await userStore.register(form);
  isSubmit.value = false;
  destroy();

  if (response.status === 'error') {
    useMessage({ message: response.message, type: 'error' });
    return;
  }

  useMessage({ message: '請驗證電子郵件', type: 'success' });
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
      v-text="'註冊'"
    />

    <div
      class="
        mt-2 mb-4
        text-sm text-center
      "
    >
      已經擁有帳號？
      <RouterLink
        to="/login"
        class="text-primary"
      >
        立即登入
      </RouterLink>
    </div>

    <FormItem label="電子郵件" prop="email">
      <Input v-model="form.email" type="email" />
    </FormItem>

    <FormItem label="密碼" prop="password">
      <Input v-model="form.password" type="password" />
    </FormItem>

    <TextButton
      text="註冊"
      type="submit"
      :disabled="isSubmit"
      class="
        my-4
        bg-primary-dark
      "
    />
  </Form>
</template>
