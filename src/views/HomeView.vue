<script setup lang="ts">
import { ref } from 'vue';

var formData = ref({
  url: null,
  submitted: false,
});

function handleSubmit() {
  console.log('Form submitted');
  formData.value.submitted = true;
}
</script>

<template>
  <main>
    <form v-if="!formData.submitted" @submit.prevent="handleSubmit()" class="p-24">
      <input v-model="formData.url" type="url" class="bg-transparent border-white border-b-2 p-4"
        placeholder="Enter URL..." />
      <button type="submit" class="p-4 bg-slate-200 text-slate-950">
        Next
      </button>
    </form>
    <div v-else class="p-24">
      <p>Form submitted! {{ formData.url }}</p>
    </div>
  </main>
</template>
