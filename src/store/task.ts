import { defineStore } from "pinia";
import { ref } from "vue";

export const useCityStore = defineStore("city", () => {
  const cityValue = ref("北京市");
  const setCity = (name: string) => {
    cityValue.value = name;
  };
  return {
    cityValue,
    setCity,
  };
});

export const usePositionStore = defineStore("position", () => {
  const positionValue = ref("全部");
  const setPositionType = (name: string) => {
    positionValue.value = name;
  };
  return {
    positionValue,
    setPositionType,
  };
});

export const useScreenStore = defineStore("screen", () => {
  const serviceMode = ref<string>("");
  const taskCycle = ref<string>("");
  const salary = ref<string>("");

  const setServiceMode = (mode: string) => {
    serviceMode.value = mode;
  };

  const setTaskCycle = (cycle: string) => {
    taskCycle.value = cycle;
  };

  const setSalary = (selectSalary: string) => {
    salary.value = selectSalary;
  };
  return {
    serviceMode,
    taskCycle,
    salary,
    setServiceMode,
    setTaskCycle,
    setSalary,
  };
});
