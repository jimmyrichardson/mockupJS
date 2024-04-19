import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useBgColorStore = defineStore('bgcolor', () => {
  const color = ref('rgb(2,6,23)')
  return { color }
})