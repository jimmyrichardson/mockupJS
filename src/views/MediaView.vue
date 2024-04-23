<template>
  <main class="p-24" :style="{'background-color': $route.query.bg }">
    <iframe
      :src="$route.query.url"
      class="m-auto w-full h-screen">
    </iframe>
  </main>
</template>