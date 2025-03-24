<script setup lang="ts">
import { ref } from 'vue';
import imgLoadingFail from '@/assets/images/img-loading-fail.webp';
import Spinner from './Spinner.vue';

withDefaults(defineProps<{
  src: string;
  alt?: string;
}>(), {
  alt: '',
});

const isLoading = ref(true);
const isError = ref(false);

function handleImgLoading () {
	isLoading.value = false;
}

function handleImgError () {
	isLoading.value = false;
	isError.value = true;
}

</script>

<template>
  <div
		class="
			flex justify-center items-center
		"
	>
		<img
			v-if="!isError"
			v-show="!isLoading"
			:src="src"
			:alt="alt"
			@load="handleImgLoading"
			@error="handleImgError"
		>
		<div
			v-if="isLoading"
			class="w-1/5 h-1/5"
		>
			<Spinner />
		</div>

		<img
			v-if="isError"
			:src="imgLoadingFail"
			alt=""
			class="
				w-1/5 h-1/5
				object-cover
			"
		>
  </div>
</template>
