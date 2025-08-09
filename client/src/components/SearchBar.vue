<template>
  <div
    class="flex flex-col sm:flex-row items-center gap-4 w-full max-w-3xl my-4"
  >
    <!-- Takes the main query input from user and emits it to the child component -->
    <textInput
      :placeholder="`Find ${props.type}`"
      textClass="w-full sm:w-2/3"
      v-model="props.query"
      @update:modelValue="onQueryInput"
    />
    <textInput
      placeholder="Location"
      textClass="w-full sm:w-1/3"
      v-model="props.location"
      @update:modelValue="onLocationInput"
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
import ButtonTemplate from './basic/buttonTemplate.vue';
import textInput from './basic/textInput.vue';

const props = defineProps<{ type: string; query: string; location: string }>();
const emit = defineEmits(['search', 'update:query', 'update:location']);

function onQueryInput(value: string) {
  emit('update:query', value);
}
function onLocationInput(value: string) {
  emit('update:location', value);
}
</script>
