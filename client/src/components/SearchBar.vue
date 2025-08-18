<!--
  SearchBar Component

  Provides a search interface with query and location inputs, plus a search button.
  Emits events to update parent component state and trigger searches.
-->
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

// Props:
// - type: Type of entity to search for (e.g., "Provider", "Clinic")
// - query: Main search query string
// - location: Location search string
const props = defineProps<{ type: string; query: string; location: string }>();

// Emits:
// - 'search': Triggered when the search button is clicked
// - 'update:query': Triggered when the query input changes
// - 'update:location': Triggered when the location input changes
const emit = defineEmits(['search', 'update:query', 'update:location']);

// Emits updated query value to parent
function onQueryInput(value: string) {
  emit('update:query', value);
}

// Emits updated location value to parent
function onLocationInput(value: string) {
  emit('update:location', value);
}
</script>
