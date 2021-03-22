<template>
  <router-link to="/" v-slot="{ isActive }">
    <span class="mr-4 hover:underline" :class="{ underline: isActive }">Home</span>
  </router-link>
  <router-link to="/about" v-slot="{ isActive }">
    <span class="mr-4 hover:underline" :class="{ underline: isActive }">About</span>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Nav",
});
</script>
