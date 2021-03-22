<template>
  <router-link class="mr-4 hover:underline" to="/" active-class="underline">Home</router-link>
  <router-link class="mr-4 hover:underline" to="/about" active-class="underline">About</router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Nav",
});
</script>
