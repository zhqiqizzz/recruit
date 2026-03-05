import { defineStore } from "pinia";
import { ref } from "vue";
import { systemListApi, chatMessageListApi } from "@/api/message";
export const useMessageStore = defineStore('message', () => {
    const systemMessageList = ref<any[]>([]);
    const systemNewMessage = ref<any[]>([]);
    const chatMessageList = ref<any[]>([]);
    const getSystemMessageList = async () => {
        const res = await systemListApi({
            type: 0,    // 0 '系统通知'
            is_informtype: 2   //2 '人才服务应用'
        })
        systemMessageList.value = res.data
        if (systemMessageList.value.length > 0) {
            systemNewMessage.value = [systemMessageList.value[0]]
        }
    }
    const getChatMessageList = async () => {
        const res = await chatMessageListApi()
        chatMessageList.value = res.data
    }
    return {
        systemMessageList,
        systemNewMessage,
        chatMessageList,
        getSystemMessageList,
        getChatMessageList
    };
});