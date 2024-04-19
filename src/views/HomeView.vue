<script setup>
import { ref } from 'vue';
import { useBgColorStore } from '@/stores/bgcolor';

const bgStore = useBgColorStore();

var formData = ref({
  url: '',
  submitted: false,
});

function handleSubmit() {
  if( formData.value.url === '' ) return;
  formData.value.submitted = true;
}

function handleEyeDropper() {
  const eyeDropper = new EyeDropper();
  eyeDropper.open().then(result => {
    bgStore.color = result.sRGBHex;
  });
}

function updateBg( color ){
  bgStore.color = color;
}

async function handleRecording() {
  const stream = await navigator.mediaDevices.getDisplayMedia({
    video: { cursor: "always" },
    audio: false
  });
  const mediaRecorder = new MediaRecorder(stream);

  const chunks = [];
  mediaRecorder.ondataavailable = e => chunks.push(e.data);

  mediaRecorder.start();

  mediaRecorder.onstop = e => {
    const blob = new Blob(chunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    // You can now use the url for your purposes, for example:
    const a = document.createElement('a');
    a.href = url;
    a.download = 'screen-recording.mp4';
    a.click();
  };

  // Stop recording after 5 seconds
  setTimeout(() => {
    mediaRecorder.stop();
  }, 5000);
}

</script>

<template>
  <main :style="{'background-color': bgStore.color }">
    <form v-if="!formData.submitted" @submit.prevent="handleSubmit()" class="p-24">
      <input
        v-model="formData.url"
        type="url"
        class="bg-transparent border-white border-b-2 p-4 font-switzer"
        placeholder="Enter URL..." />
      <button type="submit" class="p-4 bg-slate-200 border-b-2 text-slate-950 font-switzer">
        Next
      </button>
    </form>
    <div v-else class="p-24">
      <div>
        <h2 class="font-switzer">Screen:</h2>
        <button aria-label="Desktop" class="font-switzer">Desktop</button>
      </div>
      <div>
        <h2 class="font-switzer">Background color:</h2>
        <button aria-label="Black" class="bg-black w-10 h-10 border-white border-2 cursor-pointer" @click="updateBg('#000')"></button>
        <button aria-label="White" class="bg-white w-10 h-10 border-white border-2 cursor-pointer" @click="updateBg('#fff')"></button>
        <input
        v-model="bgStore.color"
        type="color"
        class="bg-white w-10 h-10 border-white border-2 cursor-pointer"
        @input="updateBg(bgStore.color)" />
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
          </svg>
        </button>
        <button aria-label="White" class="bg-transparent w-10 h-10 border-2 cursor-pointer" @click="handleEyeDropper">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m15 11.25 1.5 1.5.75-.75V8.758l2.276-.61a3 3 0 1 0-3.675-3.675l-.61 2.277H12l-.75.75 1.5 1.5M15 11.25l-8.47 8.47c-.34.34-.8.53-1.28.53s-.94.19-1.28.53l-.97.97-.75-.75.97-.97c.34-.34.53-.8.53-1.28s.19-.94.53-1.28L12.75 9M15 11.25 12.75 9" />
          </svg>
        </button>
        <button @click="handleRecording">RECORD</button>
      </div>
      <iframe
        :src="formData.url"
        class="m-auto w-full h-screen"></iframe>
    </div>
  </main>
</template>
