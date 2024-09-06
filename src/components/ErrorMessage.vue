<script setup lang="ts">
defineProps<{
  message: string;
}>();
</script>

<template>
  <span class="text-red text-xs absolute -bottom-4 left-0 whitespace-nowrap">{{
    message
  }}</span>
</template>
