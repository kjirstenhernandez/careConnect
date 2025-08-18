<!--
  NavBar Component

  Displays the main navigation bar for the app, including logo, app name, navigation links, and login button.
  Responsive design adapts layout for desktop and mobile screens.
-->
<template>
  <header class="bg-white/90 shadow-md backdrop-blur-md">
    <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-4 md:gap-0"
      >
        <div
          class="flex flex-col items-center md:flex-row md:items-center md:gap-3"
        >
          <a
            class="no-underline block text-teal-600"
            href="#"
          >
            <img
              class="max-w-16 md:w-12"
              src="../assets/logo.webp"
              alt="Logo"
            />
          </a>
          <span
            class="text-2xl font-bold text-[#335271] text-center md:text-left"
            >CareConnect</span
          >
        </div>
      <!-- hidden, later implementing with mobile hamburger-menu-->
        <div class="hidden md:block">
          <nav aria-label="Global">
            <ul class="flex items-center gap-15 text-md">
              <li>
                <RouterLink
                  to="/"
                  class="text-gray-500 transition hover:text-gray-500/75"
                >
                  Home
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/search/clinics"
                  class="text-gray-500 transition hover:text-gray-500/75"
                >
                  Find a Clinic
                </RouterLink>
              </li>

              <li>
                <RouterLink
                  to="/search/providers"
                  class="text-gray-500 transition hover:text-gray-500/75"
                >
                  Find a Provider
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>

        <div class="flex flex-col items-center gap-4 md:flex-row">
          <div class="sm:flex sm:gap-4">
            <a
              class="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm"
              href="#"
            >
              Login
            </a>
          </div>

          <div class="block md:hidden">
            <button
              class="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
  <RouterView />
</template>

<script setup lang="ts">
// Imports Vue reactivity and RouterLink for navigation
// showMobileNav: Controls visibility of mobile navigation menu (not yet implemented)
// toggleMobileNav: Toggles mobile navigation menu

import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const showMobileNav = ref(false);

function toggleMobileNav() {
  showMobileNav.value = !showMobileNav.value;
}
</script>
<!-- 
<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const showMobileNav = ref(false);

function toggleMobileNav() {
  showMobileNav.value = !showMobileNav.value;
}
</script> -->
