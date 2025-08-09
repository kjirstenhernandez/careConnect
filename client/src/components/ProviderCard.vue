<template>
  <div>
    <div
      class="max-w-sm w-full bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
    >
      <div class="">
        <div class="bg-white rounded-lg py-3 photo-wrapper p-2">
          <img
            v-if="imageUrl && imageUrl != ''"
            class="w-32 h-32 rounded-full mx-auto"
            :src="imageUrl"
            alt="{{ firstname lastName }} profile picture"
          />
          <div
            v-else
            class="bg-white w-32 h-32 rounded-full mx-auto"
          >
            <img
              class="opacity-20 w-32 h-32 rounded-full"
              src="../assets/provider-placeholder.webp"
              alt="generic medical provider icon"
            />
          </div>
        </div>
        <div class="p-2 max-w-lg mx-auto space-y-6 px-7 text-center">
          <h3 class="text-center text-xl text-gray-900 font-medium leading-8">
            {{ firstName }} {{ lastName }}
            <span v-if="credentials.length"
              >, {{ credentials.join(', ') }}</span
            >
          </h3>
          <div class="text-center text-gray-400 text-xs font-semibold">
            <p>{{ specialty }}</p>
          </div>
          <table class="text-xs my-3">
            <tbody>
              <tr>
                <td class="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                <td class="px-2 py-2">{{ phone }}</td>
              </tr>
              <tr v-if="fax">
                <td class="px-2 py-2 text-gray-500 font-semibold">Fax</td>
                <td class="px-2 py-2">{{ fax }}</td>
              </tr>
            </tbody>
          </table>

          <div class="text-center my-3">
            <span
              class="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium"
              @click="goToProfile"
            >
              More Info
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import stethoscope from '../assets/stethoscope.png';

const router = useRouter();
const props = defineProps<{
  id: string;
  imageUrl?: string;
  firstName: string;
  lastName: string;
  specialty: string;
  credentials: string[];
  phone: string;
  fax: string;
}>();

function goToProfile() {
  router.push({ name: 'ProviderPage', params: { id: props.id } });
}
</script>
