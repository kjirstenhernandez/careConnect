<template>
  <div class="relative py-12 flex flex-col items-center lg:py-20">
    <div class="container flex flex-col items-center">
      <nav class="mt-8 sm:px-6 md:overflow-x-hidden">
        <ul
          class="scroll-wrapper flex space-x-6 overflow-x-scroll text-sm text-black-base md:overflow-x-hidden"
        >
          <li>
            <button
              :class="[
                'border-b-2 font-semibold uppercase tracking-widest border-transparent',
                type === 'providers' ? 'text-[#0E5387]' : 'text-black-base',
              ]"
              @click="handleNavClick('providers')"
            >
              Providers
            </button>
          </li>
          <li>
            <button
              :class="[
                'border-b-2 font-semibold uppercase tracking-widest border-transparent',
                type === 'clinics' ? 'text-[#0E5387]' : 'text-black-base',
              ]"
              @click="handleNavClick('clinics')"
            >
              Clinics
            </button>
          </li>
          <li>
            <button
              :class="[
                'border-b-2 font-semibold uppercase tracking-widest border-transparent',
                type === 'specialties' ? 'text-[#0E5387]' : 'text-black-base',
              ]"
              @click="handleNavClick('specialties')"
            >
              Specialties
            </button>
          </li>
        </ul>
      </nav>
      <div
        class="flex flex-col sm:flex-row items-center gap-4 w-full max-w-3xl mt-4"
      >
        <textInput
          :placeholder="`Find ${type}`"
          textClass="w-full sm:w-2/3"
        />
        <textInput
          placeholder="Location"
          textClass="w-full sm:w-1/3"
        />
        <ButtonTemplate
          type="submit"
          @click="handleSearchClick"
          >Search</ButtonTemplate
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import textInput from '@/components/basic/textInput.vue';
import ButtonTemplate from '../components/basic/buttonTemplate.vue';
import router from '@/router';

const route = useRoute();
const type = ref(route.params.type as string);

watch(
  () => route.params.type,
  (newType) => {
    type.value = newType as string;
    loadData();
  }
);

function loadData() {
  if (type.value === 'clinics') {
    console.log('load clinics');
  }
  if (type.value === 'providers') {
    console.log('load providers');
  }
}
function handleSearchClick() {
  console.log(`Searched ${type}`);
}

function handleNavClick(type: string) {
  router.push({ name: 'SearchPage', params: { type } });
}

onMounted(() => {
  loadData();
});
</script>
