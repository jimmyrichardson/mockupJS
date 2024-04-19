
<script setup>
import { useBgColorStore } from '@/stores/bgcolor';
const bgStore = useBgColorStore();

</script>

<template>
  <header class="bg-slate-950 text-white p-8" :style="{'background-color': bgStore.color }">
    <h1 class="text-6xl pb-4 mix-blend-exclusion font-switzer">MockupJS</h1>
    <p class="mix-blend-exclusion font-switzer">In-browser animation capture for social media</p>
  </header>
</template>