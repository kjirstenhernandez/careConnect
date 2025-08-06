<template>
  <div class="pt-30 flex flex-col items-center gap-5 md:pt-20">
    <Hero />
    <br></br>
    <div
      class="flex flex-col mt-10 pb-10 gap-6 md:flex-row sm:mt-0"
    >
      <ActionCircle
        label="Find a Provider"
        labelClassInfo="text-white"
        icon="person-heart"
        icon-color="text-gray-200"
        iconClassInfo="opacity-20"
        :onClick="goToProviders"
        buttonClassInfo="bg-[#0E5387]"
      />
      <ActionCircle
        label="Find a Clinic"
        labelClassInfo="text-white"
        icon="hospital"
        icon-color="text-gray-200"
        iconClassInfo="opacity-20"
        :onClick="goToClinics"
        buttonClassInfo="bg-[#0E5387]"
      />
      <ActionCircle
        label="Find a Specialty"
        labelClassInfo="text-white"
        icon="file-medical"
        icon-color="text-gray-200"
        iconClassInfo="opacity-30"
        buttonClassInfo="bg-[#0E5387]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ActionCircle from '@/components/ActionCircle.vue';
import Hero from '@/components/Hero.vue';

function goToProviders() {
  console.log('Navigate to Doctor');
}
function goToSpecialty() {
  console.log('Navigate to Specialty');
}
function goToClinics() {
  console.log('Navigate to Clinic');
}
</script>
