<script setup lang="ts">
import CityButtons from "@/components/CityButtons.vue";
import Modal from "@/components/Modal.vue";

import { useModalStore } from "@/store/ModalStore";

const modalStore = useModalStore();
</script>

<template>
  <CityButtons />
  <Modal v-if="modalStore.isOpenModal" />
</template>
