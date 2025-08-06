<template>
  <button
    :class="`${buttonClasses} ${buttonClassInfo || ''} `"
    @click="onClick"
    type="button"
  >
    <!-- Background Icon -->
    <i
      :class="`bi-${icon} ${iconColor} ${iconClassInfo || ''}`"
      class="absolute text-7xl"
      aria-hidden="true"
    ></i>

    <!-- Foreground Label -->
    <span :class="`${labelClasses} ${labelClassInfo || ''}`">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  buttonClassInfo?: string;
  labelClassInfo?: string;
  iconClassInfo?: string;
  label: string;
  icon: string;
  iconColor: string;
  onClick?: (event: MouseEvent) => void;
}>();

// Setting the default classes to let me add extra classes later
const buttonClasses =
  'relative flex items-center justify-center w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full border border-gray-400 shadow-md text-center hover:bg-blue-50 transition';
const labelClasses = 'z-10 font-bold text-gray-800 text-lg';
</script>
