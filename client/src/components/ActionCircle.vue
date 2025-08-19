<!--
  ActionCircle Component
  
  A reusable circular action button component that displays an icon with a text label.
  The component features a responsive design with hover effects and customizable styling.
-->
<template>
  <!-- Main circular button container -->
  <button
    :class="`${buttonClasses} ${buttonClassInfo || ''} `"
    @click="onClick"
    type="button"
  >
    <!-- Background Icon  -->
    <i
      :class="`bi-${icon} ${iconColor} ${iconClassInfo || ''}`"
      class="absolute text-7xl"
      aria-hidden="true"
    ></i>

    <!-- Foreground Label  -->
    <span :class="`${labelClasses} ${labelClassInfo || ''}`">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
/**
 * Props interface for the ActionCircle component
 *
 * @interface Props
 * @property {string} [buttonClassInfo] - Additional CSS classes to apply to the button element (optional)
 * @property {string} [labelClassInfo] - Additional CSS classes to apply to the label span (optional)
 * @property {string} [iconClassInfo] - Additional CSS classes to apply to the icon element (optional)
 * @property {string} label - The text label to display on the button
 * @property {string} icon - The Bootstrap icon class name without 'bi-' prefix
 * @property {string} iconColor - Tailwind CSS color class for the icon
 * @property {Function} [onClick] - Optional click handler function that receives MouseEvent
 */
defineProps<{
  buttonClassInfo?: string;
  labelClassInfo?: string;
  iconClassInfo?: string;
  label: string;
  icon: string;
  iconColor: string;
  onClick?: (event: MouseEvent) => void;
}>();

//  Default CSS classes for the button container
const buttonClasses =
  'relative flex items-center justify-center w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full shadow-md text-center hover:bg-[#62A8D0] transition';

// Default CSS classes for the label text
const labelClasses = 'z-10 font-bold text-gray-800 text-lg';
</script>
