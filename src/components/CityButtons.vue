<script setup lang="ts">
import { useModalStore } from "@/store/ModalStore";

const modalStore = useModalStore();
</script>

<template>
  <div
    class="container flex flex-col mx-auto md:mx-0 md:flex-row p-2 md:p-5 gap-4 [&>button]:rounded-md [&>button]:py-2 [&>button]:px-4 [&>button]:text-white [&>button]:duration-300"
  >
    <button class="bg-blue active:scale-105" @click="modalStore.openModal(1)">
      Заказать в Москву
    </button>
    <button class="bg-green active:scale-105" @click="modalStore.openModal(2)">
      Заказать в Санкт-Петербург
    </button>
  </div>
</template>
