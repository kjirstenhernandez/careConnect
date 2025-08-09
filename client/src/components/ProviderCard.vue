<template>
  <div class="flex items-center h-screen w-full justify-center">
    <div class="max-w-xs">
      <div class="bg-white shadow-xl rounded-lg py-3">
        <div class="photo-wrapper p-2">
          <img
            class="w-32 h-32 rounded-full mx-auto"
            src="{{"
            imageUrl
            }}
            alt="{{ firstname lastName profile picture}}"
          />
        </div>
        <div class="p-2">
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
                <td class="px-2 py-2 text-gray-500 font-semibold">Address</td>
                <td class="px-2 py-2">Chatakpur-3, Dhangadhi Kailali</td>
              </tr>
              <tr>
                <td class="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                <td class="px-2 py-2">+977 9955221114</td>
              </tr>
              <tr>
                <td class="px-2 py-2 text-gray-500 font-semibold">Email</td>
                <td class="px-2 py-2">john@exmaple.com</td>
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
const router = useRouter();
const props = defineProps<{
  id: string;
  imageUrl?: string;
  firstName: string;
  lastName: string;
  specialty: string;
  credentials: string[];
}>();

function goToProfile() {
  router.push({ name: 'ProviderPage', params: { id: props.id } });
}
</script>
