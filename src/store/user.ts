import { defineStore } from "pinia";
import { ref } from "vue";
import { login } from "@/api/user";
export const useUserStore = defineStore(
  "user",
  () => {
    const userInfo = ref<any>({});
    const token = ref<string | null>(localStorage.getItem("token") || null);
    const role = ref<string>("");
    const loginUser = async (data: any) => {
      const res = await login(data);
      if (res.data) {
        userInfo.value = res.data.user_info;
        localStorage.setItem("token", res.data.token);
        role.value =
          res.data.user_info && res.data.user_info.role
            ? res.data.user_info.role
            : "";
      }
    };
    const clearUserInfo = () => {
      userInfo.value = {};
      token.value = null;
      role.value = "";
      localStorage.removeItem("token");
    };
    return {
      userInfo,
      role,
      loginUser,
      clearUserInfo,
    };
  },
  {
    persist: true,
  }
);
