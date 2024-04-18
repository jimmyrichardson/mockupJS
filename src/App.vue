<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Heading from './components/Heading.vue'
</script>

<template>
  <Heading />
  <RouterView class="bg-slate-950 text-white min-h-screen" />
</template>

<style scoped></style>
