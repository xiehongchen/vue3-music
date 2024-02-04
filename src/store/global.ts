import { defineStore } from "pinia"

export const golbalStore = defineStore('user', () => {
  const state =  reactive({
    axiosLoading: false
  })
  const axiosLoading = computed(() => state.axiosLoading)

  function setAxiosLoading(loading: boolean) {
    state.axiosLoading = loading
  }

  return {
    axiosLoading,
    setAxiosLoading
  }

})

