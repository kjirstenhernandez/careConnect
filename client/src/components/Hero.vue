<!-- Hero.vue -->
<template>
  <div
    class="flex flex-col items-center justify-center w-full bg-blue-100 h-[100vh] space-y-10 px-4 sm:px-6"
  >
    <h1
      class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl text-center"
    >
      An easier way to get
      <span class="text-[#EA3F48]">the Information You Need</span>
    </h1>
    <h2 class="text-2xl leading-8 text-gray-600 text-center">
      Find contact information for individual providers or entire clinics.
    </h2>

    <div
      class="flex flex-col sm:flex-row items-center gap-4 w-full max-w-xl mt-4"
    >
      <textInput
        placeholder="Clinic or Provider Name"
        textClass="w-full sm:w-[300px]"
      />
      <textInput
        placeholder="Location"
        textClass="w-full sm:w-[150px]"
      />
      <ButtonTemplate type="submit">Search</ButtonTemplate>
    </div>
  </div>
</template>

<script setup lang="ts">
import textInput from '@/components/basic/textInput.vue';
import ButtonTemplate from './basic/buttonTemplate.vue';
</script>
