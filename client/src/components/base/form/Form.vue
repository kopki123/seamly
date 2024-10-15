<script setup lang="ts">
import {
  ref,
  watch,
  provide,
  toRefs,
  reactive,
} from 'vue';
import type { Rule } from './types';

const props = withDefaults(defineProps<{
  model: object;
  inline?: boolean;
  rules?: null | { [key: string]: Rule[] }
  onSubmit: () => Promise<void>;
}>(), {
  inline: false,
  rules: null,
});

const fields: any[] = [];
const status = ref<'EDITABLE' | 'SUBMITTING'>('EDITABLE');

function validate () {
  const fieldsValidation: boolean[] = [];

  fields.forEach((filed) => {
    filed.setValidationState('validating');
    filed.validate();
    const isValid = filed.validateState.value !== 'error';
    fieldsValidation.push(isValid);
  });

  return fieldsValidation.every((isValid) => isValid);
}

function addField (field: any) {
  fields.push(field);
}

async function submit () {
  if (status.value === 'SUBMITTING') {
    return;
  }

  const activeElement = document.activeElement as (HTMLInputElement | HTMLButtonElement);

  activeElement?.blur();
  status.value = 'SUBMITTING';
  await props.onSubmit();
  status.value = 'EDITABLE';
  activeElement?.focus();
}

watch(() => props.model, () => {
  fields.forEach((filed) => filed.validate());
}, { deep: true });

provide(
  'context',
  reactive({
    ...toRefs(props),
    addField,
  }),
);

defineExpose({
  validate,
});

</script>

<template>
  <form
    :class="[
      inline ? '[&>*]:inline-flex' : '[&>*]:flex [&>*]:mb-[15px]',
    ]"
    @submit.prevent="submit"
  >
    <slot />
  </form>
</template>
