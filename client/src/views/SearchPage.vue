<template>
  <div>
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
<script setup lang="ts"></script>
