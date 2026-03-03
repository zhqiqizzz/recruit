import { defineStore } from "pinia";
import { ref } from "vue";
import { useUserStore } from "@/store/user";
const userStore = useUserStore();
export const useCityStore = defineStore("city", () => {
  const cityValue = ref("北京");
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

export const useSearchStore = defineStore("search", () => {
  const HISTORY_KEY = `search_history_${userStore.userInfo.id}`;
  const historyList = ref(JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'));

  const addHistory = (term: string) => {
    if (!term.trim()) return;
    historyList.value = historyList.value.filter((item: any) => item !== term);
    historyList.value.unshift(term);
    if(historyList.value.length > 10) {
      historyList.value = historyList.value.slice(0, 10);
    }
    localStorage.setItem(HISTORY_KEY, JSON.stringify(historyList.value));
  }

  const clearHistory = () => {
    historyList.value = [];
    localStorage.removeItem(HISTORY_KEY);
  }
  
  return {
    historyList,
    addHistory,
    clearHistory,
  }
})