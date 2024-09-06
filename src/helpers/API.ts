import axios from "axios";

import type { formType } from "@/types/form";

export function sendForm(form: formType) {
  const response = axios.post(
    "http://hh.autodrive-agency.ru/test-tasks/front/task-7/",
    {
      ...form,
    }
  );
  return response;
}
