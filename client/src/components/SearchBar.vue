<template>
  <div
    class="flex flex-col sm:flex-row items-center gap-4 w-full max-w-3xl mt-4"
  >
    <textInput
      :placeholder="`Find ${type}`"
      textClass="w-full sm:w-2/3"
      v-model="query"
    />
    <textInput
      placeholder="Location"
      textClass="w-full sm:w-1/3"
      v-model="location"
    />
    <ButtonTemplate
      type="submit"
      @click="emit('search')"
      >Search</ButtonTemplate
    >
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps<{ type: string; query: string; location: string }>();
const emit = defineEmits(['search']);
</script>
