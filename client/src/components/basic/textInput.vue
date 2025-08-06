<template>
  <input
    :placeholder="placeholder"
    :class="[
      'px-4 py-2 text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150',
      textClass,
    ]"
    type="text"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  placeholder?: string;
  textClass?: string;
}>();

const emit = defineEmits(['update:modelValue']);
</script>
