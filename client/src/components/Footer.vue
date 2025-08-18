<!-- Footer 
  Renders the website footer component. Includes the details for copyright information, and links that can be commented back in later when needed.  Currently only "Contact" link is visible, but has not been implemented.
-->
<template>
  <div class="w-screen mx-auto">
    <footer
      class="p-4 bg-white shadow md:flex md:items-center md:justify-between md:p-6"
    >
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
        >© 2025
        <a
          href="https://flowbite.com"
          class="hover:underline"
          target="_blank"
          >CareConnect by Utah Valley Eye Center™</a
        >. All Rights Reserved.
      </span>
      <ul class="flex flex-wrap items-center mt-3 sm:mt-0">
        <!-- Additonal links can be populated as needed -->
        <!-- <li>
          <a
            href="#"
            class="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400"
            >About</a
          >
        </li>
        <li>
          <a
            href="#"
            class="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400"
            >Privacy Policy</a
          >
        </li>
        <li>
          <a
            href="#"
            class="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400"
            >Licensing</a
          >
        </li> -->
        <li>
          <a
            href="#"
            class="text-sm text-gray-500 hover:underline dark:text-gray-400"
            >Contact</a
          >
        </li>
      </ul>
    </footer>
  </div>
</template>
