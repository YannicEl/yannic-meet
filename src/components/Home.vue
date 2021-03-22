<template>
  <h1>Home</h1>

  <div>
    <pre>
      {{ data }}
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { db } from "../firebase";

const docPath = "test/test";

export default defineComponent({
  name: "Home",
  data() {
    return {
      data: null,
    };
  },
  firestore() {
    return {
      data: db.doc(docPath),
    };
  },
});
</script>
