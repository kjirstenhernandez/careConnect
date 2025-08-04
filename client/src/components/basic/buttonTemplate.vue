<template>
  <button
    :type="type"
    :disabled="disabled"
    class="inline-flex items-center justify-center px-6 py-2 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}>();

defineEmits(['click']);
</script>
