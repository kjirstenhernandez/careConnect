<template>
  <section class="w-full overflow-hidden">
    <!-- <div v-if="!provider">
      <h1>Sorry</h1>
      <h2>This provider's page is currently unavailable</h2>
    </div>
    <div v-else></div> -->

    <!-- User Cover IMAGE -->
    <img
      src="../assets/hero-background.webp"
      alt="User Cover"
      class="w-full h-[25rem] -mt-15 opacity-80 mask-gradient absolute z-0"
    />
    <div
      class="profile-container mt-30 p-20 sm:p-16 md:p-20 lg:p-24 xl:p-20 w-auto flex flex-col items-center lg:flex-row px-4 sm:px-8 md:px-24 lg:px-24 xl:px-24 relative mx-30 bg-white rounded-xl shadow-lg p-6"
    >
      <!-- User Profile Image -->
      <div class="image-container mr-15 flex-shrink-0">
        <img
          v-if="provider && provider.imageUrl"
          :src="provider.imageUrl"
          class="rounded-lg min-w-[100px] w-full h-auto md:w-auto md:h-auto"
        /><img
          v-else
          src="../assets/provider-placeholder.webp"
          class="rounded-lg min-w-[100px] w-full h-auto md:w-auto md:h-auto"
        />
      </div>

      <div class="w-full">
        <!-- FullName -->
        <h1 class="text-center text-gray-800 text-4xl font-bold">
          Samuel Abera
        </h1>
        <!-- About -->
        <table class="text-xs my-3">
          <tbody>
            <tr>
              <td class="px-2 py-2 text-gray-500 font-semibold">Phone</td>
              <td class="px-2 py-2">{{ provider.phone }}</td>
            </tr>
            <tr v-if="provider.fax">
              <td class="px-2 py-2 text-gray-500 font-semibold">Fax</td>
              <td class="px-2 py-2">{{ provider.fax }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Social Links -->
        <div
          class="px-2 flex rounded-sm bg-gray-200 text-gray-500 dark:bg-gray-700 dark:bg-opacity-30 dark:text-gray-700 hover:text-gray-600 hover:dark:text-gray-400"
        >
          <a href="https://www.linkedin.com/in/samuel-abera-6593a2209/">
            <div
              data-title="LinkedIn"
              class="p-2 hover:text-primary hover:dark:text-primary"
            >
              <svg
                class="w-8 h-8 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z"
                  clip-rule="evenodd"
                />
                <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
              </svg>
            </div>
          </a>
          <a href="https://twitter.com/Samuel7Abera7">
            <div
              data-title="X"
              class="p-2 hover:text-primary hover:dark:text-primary"
            >
              <svg
                class="w-8 h-8 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z"
                />
              </svg>
            </div>
          </a>
          <a href="">
            <div
              data-title="Facebook"
              class="p-2 hover:text-blue-500 hover:dark:text-blue-500"
            >
              <svg
                class="w-8 h-8 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </a>
          <a href="https://www.youtube.com/@silentcoder7">
            <div
              data-title="Youtube"
              class="p-2 hover:text-primary hover:dark:text-primary"
            >
              <svg
                class="w-8 h-8 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </a>
        </div>

        <!-- Cards -->
        <div class="w-full flex gap-4 justify-center items-center mt-10">
          <!-- 1 -->
          <div
            class="xl:w-1/4 xl:h-32 lg:w-1/5 lg:h-32 md:w-1/5 md:h-28 sm:w-1/3 sm:h-[5rem] w-1/3 h-[4rem] flex justify-center items-center rounded-sm text-center text-lg px-6 py-4 border-2 border-dashed border-gray-300 dark:text-white dark:border-2 dark:border-dashed dark:border-gray-700"
          >
            27
          </div>

          <!-- 2 -->
          <div
            class="xl:w-1/4 xl:h-32 lg:w-1/5 lg:h-32 md:w-1/5 md:h-28 sm:w-1/3 sm:h-[5rem] w-1/3 h-[4rem] flex justify-center items-center rounded-sm text-center text-lg px-6 py-4 border-2 border-dashed border-gray-300 dark:text-white dark:border-2 dark:border-dashed dark:border-gray-700"
          >
            777
          </div>

          <!-- 3 -->
          <div
            class="xl:w-1/4 xl:h-32 lg:w-1/5 lg:h-32 md:w-1/5 md:h-28 sm:w-1/3 sm:h-[5rem] w-1/3 h-[4rem] flex justify-center items-center rounded-sm text-center text-lg px-6 py-4 border-2 border-dashed border-gray-300 dark:text-white dark:border-2 dark:border-dashed dark:border-gray-700"
          >
            34
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
const serverHost = import.meta.env.VITE_API_URL;

const route = useRoute();
const provider = window.history.state?.provider;
const providerId = route.params.id as string;

async function loadLocations() {
  const data = await fetch(`${serverHost}/providers`);
}
</script>

<style>
.mask-gradient {
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent,
    black 20%,
    black 80%,
    transparent
  );
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-size: cover;
  mask-image: linear-gradient(
    to bottom,
    transparent,
    black 20%,
    black 80%,
    transparent
  );
  mask-repeat: no-repeat;
  mask-size: cover;
}
</style>
