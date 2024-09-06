<script setup lang="ts">
import { computed } from "vue";

import { MaskInput } from "vue-3-mask";

const props = defineProps<{
  name: string;
  type: string;
  placeholder: string;
  modelValue: string;
  error?: boolean;
  lable: string;
  mask?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const inputText = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

function onInput(e: Event) {
  const target = e.target as HTMLInputElement;
  if (!props.mask && target) inputText.value = target.value;
}
</script>

<template>
  <label :for="name">{{ lable }}</label>
  <component
    :is="mask ? MaskInput : 'input'"
    :name="name"
    :type="type"
    :mask="mask"
    :placeholder="placeholder"
    v-model="inputText"
    class="border rounded-md shadow-sm shadow-gray py-2 px-3 relative md:w-[190px] h-[38px] xl:w-[170px]"
    :class="error ? 'border-red' : 'border-gray'"
    @input="onInput($event)"
  />
  <!-- <input
    :name="name"
    :type="type"
    :placeholder="placeholder"
    v-model="inputText"
    class="border rounded-md shadow-sm shadow-gray py-2 px-3 relative md:w-[190px] h-[38px] xl:w-[170px]"
    :class="error ? 'border-red' : 'border-gray'"
  /> -->
</template>
