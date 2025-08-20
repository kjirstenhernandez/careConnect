<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      'inline-flex items-center justify-center px-6 py-2 rounded-xl font-semibold   focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150',
      textColorHex,
      backgroundColor,
      backgroundHover,
    ]"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  textColorHex: string;
  backgroundColor: string;
  backgroundHover: string;
}>();

defineEmits(['click']);
</script>
