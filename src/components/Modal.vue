<script setup lang="ts">
import { reactive, ref, onBeforeMount } from "vue";

import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";

import { useModalStore } from "@/store/ModalStore";

import { sendForm } from "@/helpers/API";

import ErrorMessage from "./ErrorMessage.vue";
import CustomInput from "./CustomInput.vue";

import { onClickOutside } from "@vueuse/core";

import type { formType } from "@/types/form";

const modalStore = useModalStore();

onBeforeMount(() => {
  form.city_id = modalStore.selectedCity;
});

const form = reactive<formType>({
  phone: "",
  name: "",
  email: "",
  city_id: 0,
});

const citys = [
  {
    id: 1,
    name: "Москва",
  },
  {
    id: 2,
    name: "Санкт-Петербург",
  },
  {
    id: 3,
    name: "Казань",
  },
];

const rules = {
  name: { required },
  email: { required, email },
  phone: { required, minLength: minLength(18) },
};

const v$ = useVuelidate(rules, form);

const isOpenSelect = ref(false);

const resApi = ref<string | null>(null);

const isErrorApi = ref(false);

const target = ref(null);

onClickOutside(target, () => {
  modalStore.closeModal();
});

function clearForm() {
  form.phone = "";
  form.name = "";
  form.email = "";
  form.city_id = 0;
}

async function onSubmit() {
  const isValid = await v$.value.$validate();
  if (!isValid) return;
  let { phone, name, email, city_id } = form;
  phone = phone.replace(/[^\d+]/g, "");
  await sendForm({ phone, name, email, city_id })
    .then((res) => {
      resApi.value = res.data;
      clearForm();
    })
    .catch((err) => {
      console.error(err);
      isErrorApi.value = true;
      setTimeout(() => {
        isErrorApi.value = false;
      }, 3000);
    });
}
</script>

<template>
  <div
    class="bg-black/75 w-full h-full fixed top-0 flex items-center justify-center px-2"
  >
    <div
      ref="target"
      v-if="resApi"
      v-html="resApi"
      class="p-6 bg-white rounded-lg"
    ></div>
    <div
      ref="target"
      v-else
      class="p-6 bg-white rounded-lg w-full max-w-96 md:max-w-[669px] xl:max-w-[793px]"
    >
      <h3 class="font-medium text-2xl text-blackLight text-left mb-9">
        Заказать звонок
      </h3>
      <form
        class="flex flex-col md:flex-wrap md:flex-row text-gray100 gap-5 md:justify-between xl:justify-end"
        @submit.prevent="onSubmit"
      >
        <div class="flex flex-col relative">
          <CustomInput
            :error="!!v$.phone.$errors.length"
            v-model:model-value="form.phone"
            :placeholder="'+7 (___) ___-__-__'"
            :name="'tel'"
            :type="'tel'"
            :mask="'+7 (###) ###-##-##'"
            :lable="'Телефон*'"
          />
          <template v-for="error in v$.phone.$errors">
            <ErrorMessage
              v-if="error.$validator === 'required'"
              message="Обязательное поле"
            />
            <ErrorMessage
              v-if="error.$validator === 'minLength'"
              message="Заполните поле полностью"
            />
          </template>
        </div>
        <div class="flex flex-col relative">
          <CustomInput
            :error="!!v$.name.$errors.length"
            v-model:model-value="form.name"
            :placeholder="'Иван Иванов'"
            :name="'name'"
            :type="'text'"
            :lable="'Имя*'"
          />
          <ErrorMessage
            v-if="v$.name.$errors.length"
            message="Обязательное поле"
          />
        </div>
        <div class="flex flex-col relative">
          <CustomInput
            :error="!!v$.email.$errors.length"
            v-model:model-value="form.email"
            :placeholder="'you@example.com'"
            :name="'email'"
            :type="'text'"
            :lable="'Email*'"
          />
          <template v-for="error in v$.email.$errors">
            <ErrorMessage
              v-if="error.$validator === 'required'"
              message="Обязательное поле"
            />
            <ErrorMessage
              v-if="error.$validator === 'email'"
              message="Неправильный формат email"
            />
          </template>
        </div>
        <div
          class="flex flex-col [&>select]:border [&>select]:border-gray [&>select]:rounded-md [&>select]:shadow-sm [&>select]:shadow-gray [&>select]:py-2 [&>select]:px-3 relative md:grow xl:w-[170px]"
        >
          <label for="city">Город*</label>
          <img
            class="absolute right-2 top-2/3 w-3 h-2 duration-300"
            :class="isOpenSelect ? 'rotate-0' : 'rotate-180'"
            src="@/assets/arrow.svg"
            alt="arrow"
          />
          <select
            name="city"
            v-model="form.city_id"
            class="appearance-none h-[38px]"
            @click="isOpenSelect = !isOpenSelect"
            @blur="isOpenSelect = false"
          >
            <option v-for="city in citys" :value="city.id" :key="city.id">
              {{ city.name }}
            </option>
          </select>
        </div>

        <button
          class="bg-greenLight text-white rounded-md py-2 px-4 h-[38px] md:self-end"
        >
          Отправить
        </button>
      </form>
      <span class="text-red fixed" v-if="isErrorApi">Что-то пошло не так </span>
    </div>
  </div>
</template>
