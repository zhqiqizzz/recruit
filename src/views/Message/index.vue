<script setup lang="ts">
import FooterTabbar from '@/components/FooterTabbar.vue';
import MessageList from '@/components/list/MessageList.vue';
import { useMessageStore } from '@/store/message';
import { onMounted } from 'vue';
const messageStore = useMessageStore();
onMounted(()=>{
    messageStore.getSystemMessageList()
    messageStore.getChatMessageList()
})
</script>

<template>
    <MessageList :messageList="messageStore.systemNewMessage" type = "system"/>
    <MessageList :messageList="messageStore.chatMessageList" type = "talk"/>
    <FooterTabbar />
</template>
<style scoped>
</style>