import { defineStore } from "pinia";

import { ref } from "vue";

export const useModalStore = defineStore("modal", () => {
  const isOpenModal = ref(false);
  const selectedCity = ref<number>(0);

  function openModal(cityId: number) {
    selectedCity.value = cityId;
    isOpenModal.value = true;
  }

  function closeModal() {
    selectedCity.value = 0;
    isOpenModal.value = false;
  }

  return {
    isOpenModal,
    selectedCity,
    openModal,
    closeModal,
  };
});
