<script setup lang="ts">
function handleSubmit() {
  console.log('Form submitted');
}
</script>

<template>
  <main>
    <form @submit.prevent="handleSubmit()" class="p-24">
      <input type="url" class="bg-transparent border-white border-b-2 p-4" placeholder="Enter URL..." />
      <button type="submit" class="p-4 bg-slate-200 text-slate-950">
        Next
      </button>
    </form>
  </main>
</template>
