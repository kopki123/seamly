<script setup lang="ts">
import type { ComputedRef } from 'vue';
import {
  ref,
  inject,
  computed,
  onMounted,
} from 'vue';
import type { Rule } from './types';

const formItemValidateStates = ['', 'error', 'validating', 'success'] as const;
type FormItemValidateState = typeof formItemValidateStates[number];

const props = withDefaults(defineProps<{
  label?: string;
  prop?: string;
}>(), {
  label: '',
  prop: '',
});

const formContext = inject('context') as any;

const rules: ComputedRef<Rule[] | null> = computed(() => formContext.rules[props.prop]);

const validateState = ref<FormItemValidateState>('');
const caughtRuleIndex = ref<number>(-1);
const validateMessage = computed<string>(() => (validateState.value === 'error'
  ? formContext.rules[props.prop][caughtRuleIndex.value]?.message
  : ''
));

function setValidationState (state: 'error', ruleIndex?: number): void;
function setValidationState (state: Exclude<FormItemValidateState, '' | 'error'>): void;
function setValidationState (state: FormItemValidateState, ruleIndex: number = -1): void {
  validateState.value = state;
  caughtRuleIndex.value = ruleIndex;
}

function validate () {
  const value = formContext.model[props.prop];

  if (value) {
    setValidationState('validating');
  }

  if (validateState.value === '') {
    return;
  }

  if (rules.value) {
    rules.value.some((rule, index) => {
      if (rule.pattern && rule.pattern.test(value) === false) {
        setValidationState('error', index);
        return true;
      }

      if (rule.validator && rule.validator(rule, value) === false) {
        setValidationState('error', index);
        return true;
      }

      return false;
    });

    if (validateState.value === 'error') {
      return;
    }
  }

  setValidationState('success');
}

onMounted(() => {
  if (props.prop) {
    formContext?.addField({
      validateState,
      validate,
      setValidationState,
    });
  }
});

</script>

<template>
  <div
    class="
      relative
      w-full
      flex flex-col
    "
  >
    <slot name="label">
      <label
        v-if="label"
        :for="label"
        class="
          relative
          text-gray-700 font-medium
          mb-2
        "
      >
        {{ label }}
      </label>
    </slot>

    <slot />

    <div
      v-if="prop"
      class="
        text-xs text-[#FF0000]
      "
      :class="{
        'h-4 mt-1': rules?.length,
      }"
    >
      <Transition name="fade">
        <slot
          v-if="validateMessage"
          :error="validateMessage"
          name="error"
        >
          {{ validateMessage }}
        </slot>
      </Transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
.fade-move,
.fade-enter-active {
  transition: transform 0.25s, opacity 0.5s;
}

.fade-leave-active  {
  transition: transform 0.25s, opacity 0.1s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(0, -100%);
}

</style>
