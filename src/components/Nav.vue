<template>
  <router-link class="mr-4 hover:underline" to="/" active-class="underline">Home</router-link>
  <router-link class="mr-4 hover:underline" to="/rtc" active-class="underline">Rtc</router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Nav",
});
</script>
